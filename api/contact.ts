import net from 'net';
import tls from 'tls';
import crypto from 'crypto';

interface AttachmentInput {
  filename: string;
  content: string; // base64
}

interface SmtpOptions {
  host: string;
  port: number;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
  toEmail: string;
  replyToEmail: string;
  subject: string;
  html: string;
  attachments: AttachmentInput[];
}

function wrapBase64(b64: string): string {
  const clean = b64.replace(/\s+/g, '');
  const lines: string[] = [];
  for (let i = 0; i < clean.length; i += 76) {
    lines.push(clean.slice(i, i + 76));
  }
  return lines.join('\r\n');
}

function encodeHeaderValue(val: string): string {
  // Encode non-ASCII subjects safely using UTF-8 Base64 RFC 2047
  if (/^[\x20-\x7E]*$/.test(val)) {
    return val;
  }
  return `=?UTF-8?B?${Buffer.from(val, 'utf8').toString('base64')}?=`;
}

function buildMimeMessage(opts: SmtpOptions): string {
  const boundary = `----=_SteinScopPart_${crypto.randomBytes(12).toString('hex')}`;
  const msgId = `<${crypto.randomBytes(16).toString('hex')}@steinscop.com>`;
  const dateHeader = new Date().toUTCString();
  const htmlBase64 = wrapBase64(Buffer.from(opts.html, 'utf8').toString('base64'));

  const headers = [
    `Date: ${dateHeader}`,
    `Message-ID: ${msgId}`,
    `From: "${opts.fromName}" <${opts.fromEmail}>`,
    `To: <${opts.toEmail}>`,
    `Reply-To: <${opts.replyToEmail}>`,
    `Subject: ${encodeHeaderValue(opts.subject)}`,
    `MIME-Version: 1.0`,
  ];

  if (!opts.attachments || opts.attachments.length === 0) {
    headers.push(`Content-Type: text/html; charset="UTF-8"`);
    headers.push(`Content-Transfer-Encoding: base64`);
    return `${headers.join('\r\n')}\r\n\r\n${htmlBase64}\r\n`;
  }

  headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);

  const parts: string[] = [];

  // HTML Body part
  parts.push(
    [
      `--${boundary}`,
      `Content-Type: text/html; charset="UTF-8"`,
      `Content-Transfer-Encoding: base64`,
      ``,
      htmlBase64,
    ].join('\r\n')
  );

  // Attachment parts
  for (const att of opts.attachments) {
    const safeFilename = (att.filename || 'attachment.pdf').replace(/["\r\n]/g, '');
    parts.push(
      [
        `--${boundary}`,
        `Content-Type: application/octet-stream; name="${safeFilename}"`,
        `Content-Disposition: attachment; filename="${safeFilename}"`,
        `Content-Transfer-Encoding: base64`,
        ``,
        wrapBase64(att.content),
      ].join('\r\n')
    );
  }

  parts.push(`--${boundary}--`);

  return `${headers.join('\r\n')}\r\n\r\n${parts.join('\r\n')}\r\n`;
}

/**
 * Native Node STARTTLS SMTP client for Mimecast (port 587)
 */
function sendViaMimecastSmtp(opts: SmtpOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    let currentSocket: net.Socket | tls.TLSSocket = net.createConnection({
      host: opts.host,
      port: opts.port,
    });

    let buffer = '';
    let settled = false;
    let waitResolver: ((resp: { code: number; text: string }) => void) | null = null;
    let waitRejecter: ((err: Error) => void) | null = null;

    const timeout = setTimeout(() => {
      fail(new Error(`SMTP connection timed out after 15s (${opts.host}:${opts.port})`));
    }, 15000);

    function cleanup() {
      clearTimeout(timeout);
      try {
        currentSocket.destroy();
      } catch {
        // Ignore socket destroy errors
      }
    }

    function fail(err: Error) {
      if (settled) return;
      settled = true;
      cleanup();
      if (waitRejecter) {
        const rej = waitRejecter;
        waitResolver = null;
        waitRejecter = null;
        rej(err);
      }
      reject(err);
    }

    function onData(chunk: Buffer) {
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\r\n');
      // Keep incomplete last line in buffer
      buffer = lines.pop() ?? '';

      let collected: string[] = [];
      for (const line of lines) {
        if (!line) continue;
        collected.push(line);
        // RFC 5321: final line of response has 3 digits followed by space (or end of line)
        if (/^\d{3}(?: |$)/.test(line)) {
          const code = parseInt(line.slice(0, 3), 10);
          const text = collected.join('\n');
          collected = [];
          if (waitResolver) {
            const res = waitResolver;
            waitResolver = null;
            waitRejecter = null;
            res({ code, text });
          }
        }
      }
    }

    function attachListeners(sock: net.Socket | tls.TLSSocket) {
      sock.on('data', onData);
      sock.on('error', (err) => fail(err));
      sock.on('close', () => {
        if (!settled) {
          fail(new Error('SMTP socket closed unexpectedly'));
        }
      });
    }

    attachListeners(currentSocket);

    function readResponse(): Promise<{ code: number; text: string }> {
      return new Promise((res, rej) => {
        waitResolver = res;
        waitRejecter = rej;
      });
    }

    function sendCommand(cmd: string, expectedCodes: number[]): Promise<{ code: number; text: string }> {
      currentSocket.write(`${cmd}\r\n`);
      return readResponse().then((resp) => {
        if (!expectedCodes.includes(resp.code)) {
          throw new Error(`SMTP error (${resp.code}): ${resp.text}`);
        }
        return resp;
      });
    }

    (async () => {
      try {
        // 1. Wait for 220 banner
        const banner = await readResponse();
        if (banner.code !== 220) {
          throw new Error(`Unexpected SMTP banner (${banner.code}): ${banner.text}`);
        }

        // 2. Initial EHLO
        await sendCommand('EHLO steinscop.com', [250]);

        // 3. Upgrade to TLS via STARTTLS
        await sendCommand('STARTTLS', [220]);

        // Detach listeners from plain socket before TLS upgrade
        currentSocket.removeAllListeners('data');
        currentSocket.removeAllListeners('error');
        currentSocket.removeAllListeners('close');

        currentSocket = await new Promise<tls.TLSSocket>((tlsRes, tlsRej) => {
          const tlsSock = tls.connect(
            {
              socket: currentSocket as net.Socket,
              servername: opts.host,
              minVersion: 'TLSv1.2',
            },
            () => tlsRes(tlsSock)
          );
          tlsSock.once('error', tlsRej);
        });

        buffer = '';
        attachListeners(currentSocket);

        // 4. EHLO over encrypted TLS channel
        await sendCommand('EHLO steinscop.com', [250]);

        // 5. Authenticate via AUTH LOGIN
        await sendCommand('AUTH LOGIN', [334]);
        await sendCommand(Buffer.from(opts.user, 'utf8').toString('base64'), [334]);
        await sendCommand(Buffer.from(opts.pass, 'utf8').toString('base64'), [235]);

        // 6. Envelope MAIL FROM & RCPT TO
        await sendCommand(`MAIL FROM:<${opts.fromEmail}>`, [250]);
        await sendCommand(`RCPT TO:<${opts.toEmail}>`, [250, 251]);

        // 7. DATA transmission
        await sendCommand('DATA', [354]);
        const mimeMessage = buildMimeMessage(opts);
        // Dot-stuff lines beginning with '.' per RFC 5321
        const dotStuffed = mimeMessage.replace(/\r\n\./g, '\r\n..');
        await sendCommand(`${dotStuffed}\r\n.`, [250]);

        // 8. QUIT cleanly
        try {
          currentSocket.write('QUIT\r\n');
        } catch {
          // Ignore quit error
        }

        settled = true;
        cleanup();
        resolve();
      } catch (err: any) {
        fail(err instanceof Error ? err : new Error(String(err)));
      }
    })();
  });
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const MIMECAST_HOST = process.env.MIMECAST_SMTP_HOST || 'za-smtp-outbound-2.mimecast.co.za';
  const MIMECAST_FALLBACK_HOST = 'za-smtp-outbound-1.mimecast.co.za';
  const MIMECAST_PORT = Number(process.env.MIMECAST_SMTP_PORT || 587);

  const INFO_EMAIL = 'info@steinscop.com';
  const INFO_PASS = process.env.MIMECAST_INFO_PASS || '';

  const ADMISSIONS_EMAIL = 'admissions@steinscop.com';
  const ADMISSIONS_PASS = process.env.MIMECAST_ADMISSIONS_PASS || '';

  const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: 'Invalid JSON body' });
      }
    }

    const {
      type = 'enquiry',
      fullName,
      email,
      phone,
      company,
      practiceArea,
      matterType,
      preferredContact,
      urgency,
      message,
      programme,
      attachments = [],
    } = body || {};

    if (!fullName || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const isCareer = type === 'careers';
    const targetRecipient = isCareer ? ADMISSIONS_EMAIL : INFO_EMAIL;
    const primaryPass = isCareer ? ADMISSIONS_PASS : INFO_PASS;

    const subject = isCareer
      ? `Career Application: ${fullName} — ${programme || 'Articles / Vacation Work'}`
      : `Website Enquiry: ${fullName}${company ? ` (${company})` : ''} — ${practiceArea || matterType || 'General'}`;

    const formattedAttachments: AttachmentInput[] = (attachments || []).map(
      (att: { filename: string; content: string }) => ({
        filename: att.filename,
        content: att.content,
      })
    );

    const buildHtml = (noticeText?: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f9; padding: 40px 20px; color: #1a2233;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="background-color: #0b0f19; padding: 28px 32px; border-bottom: 2px solid #c5a059;">
            <div style="color: #c5a059; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; margin-bottom: 6px;">
              Stein Scop Attorneys
            </div>
            <h1 style="color: #ffffff; font-size: 22px; margin: 0; font-family: Georgia, serif; font-weight: 400;">
              ${isCareer ? 'Graduate / Career Application' : 'New Website Client Enquiry'}
            </h1>
          </div>

          ${
            noticeText
              ? `<div style="background-color: #fef3c7; border-bottom: 1px solid #fde68a; padding: 12px 24px; font-size: 12px; color: #92400e;">
                  <strong>Delivery Notice:</strong> ${noticeText}
                </div>`
              : ''
          }

          <!-- Details Table -->
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #6b7280; font-size: 13px; width: 150px; text-transform: uppercase; letter-spacing: 1px;">Applicant / Client</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #111827; font-weight: 600; font-size: 15px;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email Address</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #111827; font-size: 14px;"><a href="mailto:${email}" style="color: #111827; text-decoration: underline;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Telephone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #111827; font-size: 14px;">${phone || 'Not provided'}</td>
              </tr>
              ${
                company
                  ? `<tr>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">${isCareer ? 'University / Entity' : 'Company / Entity'}</td>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #111827; font-size: 14px;">${company}</td>
                    </tr>`
                  : ''
              }
              ${
                isCareer
                  ? `<tr>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Programme</td>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #c5a059; font-weight: 600; font-size: 14px;">${programme || 'Articles / Vacation Work'}</td>
                    </tr>`
                  : `<tr>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Practice Area</td>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #111827; font-size: 14px;">${practiceArea || 'General Commercial Advisory'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Matter Type</td>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #111827; font-size: 14px;">${matterType || urgency || 'New Client Enquiry'}</td>
                    </tr>`
              }
              ${
                preferredContact
                  ? `<tr>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Preferred Contact</td>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #111827; font-size: 14px; text-transform: uppercase;">${preferredContact}</td>
                    </tr>`
                  : ''
              }
              ${
                formattedAttachments.length > 0
                  ? `<tr>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Attached Files</td>
                      <td style="padding: 10px 0; border-bottom: 1px solid #f1f3f5; color: #111827; font-size: 14px; font-weight: 500;">
                        ${formattedAttachments.map((a) => `• ${a.filename}`).join('<br>')}
                      </td>
                    </tr>`
                  : ''
              }
            </table>

            <!-- Message / Notes -->
            <div style="margin-top: 24px;">
              <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                ${isCareer ? 'Applicant Notes / Cover Letter' : 'Matter Specification / Message'}
              </div>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
                ${message || 'No additional notes provided.'}
              </div>
            </div>

            <!-- Reply Button -->
            <div style="margin-top: 32px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #0b0f19; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 4px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                Reply Directly to ${fullName}
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 18px 32px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; text-align: center;">
            Sent automatically via Stein Scop Attorneys website contact system.
          </div>

        </div>
      </div>
    `;

    // 1. Primary Delivery: Mimecast Outbound SMTP (za-smtp-outbound-2.mimecast.co.za:587)
    const smtpAttempts: Array<{ host: string; user: string; pass: string }> = [
      { host: MIMECAST_HOST, user: targetRecipient, pass: primaryPass },
      { host: MIMECAST_FALLBACK_HOST, user: targetRecipient, pass: primaryPass },
    ];

    // If career application and admissions mailbox auth isn't active yet, also try authenticating with info@steinscop.com
    if (isCareer) {
      smtpAttempts.push({ host: MIMECAST_HOST, user: INFO_EMAIL, pass: INFO_PASS });
    }

    let mimecastLastError: Error | null = null;
    for (const attempt of smtpAttempts) {
      try {
        await sendViaMimecastSmtp({
          host: attempt.host,
          port: MIMECAST_PORT,
          user: attempt.user,
          pass: attempt.pass,
          fromName: 'Stein Scop Website',
          fromEmail: attempt.user,
          toEmail: targetRecipient,
          replyToEmail: email,
          subject,
          html: buildHtml(),
          attachments: formattedAttachments,
        });

        return res.status(200).json({
          success: true,
          transport: 'mimecast',
          host: attempt.host,
          recipient: targetRecipient,
        });
      } catch (smtpErr: any) {
        mimecastLastError = smtpErr;
        console.warn(`Mimecast attempt via ${attempt.host} (${attempt.user}) failed:`, smtpErr?.message || smtpErr);
      }
    }

    // 2. Automatic Safety Backup: Resend API (ensures zero lost enquiries if Mimecast password is still propagating)
    const sendPayload = {
      from: 'Stein Scop Website <onboarding@resend.dev>',
      to: [targetRecipient],
      reply_to: email,
      subject,
      html: buildHtml(),
      attachments: formattedAttachments,
    };

    let resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendPayload),
    });

    let resendData = await resendRes.json();

    if (!resendRes.ok && resendRes.status === 403 && resendData?.message?.includes('testing emails')) {
      const fallbackRecipient = 'maurizio.lanzillotti@gmail.com';
      const fallbackNotice = `Intended for ${targetRecipient}. Mimecast SMTP returned: "${mimecastLastError?.message || 'Auth pending'}", so this enquiry was delivered via backup relay.`;

      const fallbackPayload = {
        ...sendPayload,
        to: [fallbackRecipient],
        html: buildHtml(fallbackNotice),
      };

      resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fallbackPayload),
      });

      resendData = await resendRes.json();
    }

    if (!resendRes.ok) {
      return res.status(500).json({
        error: mimecastLastError?.message || resendData?.message || 'Failed to dispatch email.',
      });
    }

    return res.status(200).json({
      success: true,
      transport: 'resend-fallback',
      id: resendData.id,
      recipient: targetRecipient,
    });
  } catch (error: any) {
    console.error('Contact handler error:', error);
    return res.status(500).json({
      error: error?.message || 'Internal server error while dispatching email.',
    });
  }
}
