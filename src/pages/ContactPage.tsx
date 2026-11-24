import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import { Editable } from '../components/Editable';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Video,
  CheckCircle,
  ChevronDown,
  X,
  Briefcase,
  GraduationCap,
  UploadCloud,
  FileText,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import React, { useState, useRef } from 'react';
import { directors as teamDirectors } from '../data/team';

export default function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const programmeParam = searchParams.get('programme');
  const isCareerMode = typeParam === 'careers' || Boolean(programmeParam);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [preferredContact, setPreferredContact] = useState('email');
  const [practiceArea, setPracticeArea] = useState('Mergers & Acquisitions');
  const [matterType, setMatterType] = useState('New Client Enquiry');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [message, setMessage] = useState('');

  // Career Upload Files
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [transcriptError, setTranscriptError] = useState<string | null>(null);

  const cvInputRef = useRef<HTMLInputElement>(null);
  const transcriptInputRef = useRef<HTMLInputElement>(null);

  const getProgrammeTitle = () => {
    if (programmeParam === 'articles-2028') return 'Articles of Clerkship (Commencing 2028)';
    if (programmeParam === 'winter-vac-2027') return 'Winter Vacation Programme (2027)';
    return 'Articles & Graduate Recruitment';
  };

  const handleCvChange = (file: File | null) => {
    if (!file) {
      setCvFile(null);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setCvError('CV file exceeds 10MB limit');
      return;
    }
    setCvError(null);
    setCvFile(file);
  };

  const handleTranscriptChange = (file: File | null) => {
    if (!file) {
      setTranscriptFile(null);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setTranscriptError('Transcript file exceeds 10MB limit');
      return;
    }
    setTranscriptError(null);
    setTranscriptFile(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1] || '';
        resolve(base64);
      };
      reader.onerror = (err) => reject(err);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (isCareerMode) {
      if (!cvFile) {
        setCvError('Please upload your Curriculum Vitae (CV)');
        return;
      }
      if (!transcriptFile) {
        setTranscriptError('Please upload your Academic Transcript');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const attachments: Array<{ filename: string; content: string }> = [];

      if (cvFile) {
        const cvBase64 = await fileToBase64(cvFile);
        attachments.push({ filename: cvFile.name, content: cvBase64 });
      }

      if (transcriptFile) {
        const transcriptBase64 = await fileToBase64(transcriptFile);
        attachments.push({ filename: transcriptFile.name, content: transcriptBase64 });
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: isCareerMode ? 'careers' : 'enquiry',
          fullName,
          email,
          phone,
          company: organisation,
          practiceArea: isCareerMode ? undefined : practiceArea,
          matterType: isCareerMode ? undefined : matterType,
          preferredContact,
          programme: isCareerMode ? getProgrammeTitle() : undefined,
          message,
          attachments,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setSubmitError(
        err?.message || 'Something went wrong sending your message. Please try again or email us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>{isCareerMode ? 'Admissions & Careers | Stein Scop Attorneys' : 'Contact Us | Stein Scop Attorneys'}</title>
        <meta
          name="description"
          content={
            isCareerMode
              ? 'Apply for Articles of Clerkship or the Winter Vacation Programme at Stein Scop Attorneys in Sandton. Submit your application directly to admissions@steinscop.com.'
              : 'Contact Stein Scop Attorneys at our Sandton office. Call +27 (0)11 380 80 80, email info@steinscop.com, or submit an enquiry. We respond within one business day.'
          }
        />
        <meta
          property="og:title"
          content={isCareerMode ? 'Admissions & Careers | Stein Scop Attorneys' : 'Contact Us | Stein Scop Attorneys'}
        />
        <meta
          property="og:description"
          content="Reach our Sandton office by phone, email, or Microsoft Teams. 6 Benmore Road, Morningside, Sandton."
        />
      </Helmet>

      {/* Hero — Matches Practice Areas standard */}
      <section className="pt-36 pb-12 px-6 md:px-12 lg:px-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">
              {isCareerMode ? 'Admissions & Recruitment' : 'Connect'}
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight italic">
              {isCareerMode ? (
                <>Join Our Practice</>
              ) : (
                <>
                  <Editable id="contact_hero_title" defaultText="Engage Our" />{' '}
                  <Editable id="contact_hero_title_2" defaultText="Expertise" />
                </>
              )}
            </h1>
            <p className="text-xl font-light text-brand-primary/60 leading-relaxed max-w-2xl">
              {isCareerMode
                ? `Applications for ${getProgrammeTitle()} are reviewed directly by our graduate recruitment team at admissions@steinscop.com.`
                : 'Reach out to our Sandton office to discuss your commercial legal requirements or schedule a consultation with one of our directors.'}
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Main Section — Option 1: Architectural 5-Col / 7-Col Split on Crisp White Canvas */}
      <section className="bg-white py-14 lg:py-24 px-6 md:px-12 lg:px-24 border-t border-brand-border">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Single Unified Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-brand-border">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.25em] text-brand-primary/50 font-bold">
                Enquiry Type:
              </span>
              <div className="inline-flex p-1 bg-brand-cream border border-brand-border rounded-full">
                <button
                  type="button"
                  onClick={() => setSearchParams({}, { replace: true })}
                  className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold transition-all cursor-pointer ${
                    !isCareerMode
                      ? 'bg-brand-primary text-white shadow-xs'
                      : 'text-brand-primary/60 hover:text-brand-primary'
                  }`}
                >
                  Client Enquiries
                </button>
                <button
                  type="button"
                  onClick={() => setSearchParams({ type: 'careers' }, { replace: true })}
                  className={`px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold transition-all cursor-pointer ${
                    isCareerMode
                      ? 'bg-brand-accent text-white shadow-xs'
                      : 'text-brand-primary/60 hover:text-brand-primary'
                  }`}
                >
                  Careers &amp; Admissions
                </button>
              </div>
            </div>

            {isCareerMode ? (
              <div className="flex items-center gap-2 text-xs text-brand-accent font-semibold bg-brand-accent/10 px-4 py-2 rounded-full border border-brand-accent/25">
                <Mail size={13} />
                <span>Sent directly to admissions@steinscop.com</span>
              </div>
            ) : (
              <Link
                to="/careers"
                className="text-xs text-brand-accent hover:text-brand-primary font-semibold flex items-center gap-1.5 transition-colors"
              >
                Looking for Articles or Vacation Work? View Careers <ArrowRight size={13} />
              </Link>
            )}
          </div>

          {/* 5-Col / 7-Col Architectural Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* LEFT (5 Cols): Dark Navy Contact Information Panel */}
            <div className="lg:col-span-5 bg-brand-primary text-brand-cream rounded-2xl p-8 sm:p-10 border border-brand-accent/30 shadow-xl flex flex-col justify-between space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-accent via-brand-accent/50 to-transparent" />

              <div className="space-y-8">
                {/* Panel Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.35em] text-brand-accent font-bold block mb-2">
                      {isCareerMode ? 'Admissions Office' : 'Contact Details'}
                    </span>
                    <h2 className="text-3xl font-serif text-white">
                      Get in <span className="italic">Touch</span>
                    </h2>
                  </div>
                  <span className="text-xs text-white/50 font-light">
                    Office Hours: 08:00 – 17:00
                  </span>
                </div>

                {/* Clean Hairline Contact Rows */}
                <div className="divide-y divide-white/10">
                  {/* Phone */}
                  <div className="py-5 first:pt-0 flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-brand-accent shrink-0 group-hover:border-brand-accent transition-colors">
                      <PhoneCall size={17} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-bold">
                        Phone
                      </p>
                      <a
                        href="tel:+27113808080"
                        className="text-xl font-serif lining-nums text-white hover:text-brand-accent transition-colors block"
                      >
                        +27 (0)11 380 80 80
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="py-5 flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-brand-accent shrink-0 group-hover:border-brand-accent transition-colors">
                      <Mail size={17} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-bold">
                        {isCareerMode ? 'Admissions Email' : 'Email'}
                      </p>
                      <a
                        href={isCareerMode ? 'mailto:admissions@steinscop.com' : 'mailto:info@steinscop.com'}
                        className="text-xl font-serif text-white hover:text-brand-accent transition-colors block break-all"
                      >
                        {isCareerMode ? 'admissions@steinscop.com' : 'info@steinscop.com'}
                      </a>
                    </div>
                  </div>

                  {/* Virtual Meeting */}
                  <div className="py-5 flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-brand-accent shrink-0 group-hover:border-brand-accent transition-colors">
                      <Video size={17} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-bold">
                        Virtual Meeting
                      </p>
                      <a
                        href={`mailto:${
                          isCareerMode ? 'admissions' : 'info'
                        }@steinscop.com?subject=Virtual%20Consultation%20Request&body=I%20would%20like%20to%20request%20a%20virtual%20meeting%20via%20Microsoft%20Teams.`}
                        className="text-lg font-serif text-white hover:text-brand-accent transition-colors block"
                      >
                        Request a Microsoft Teams Meeting
                      </a>
                    </div>
                  </div>

                  {/* Office Address */}
                  <div className="py-5 flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-brand-accent shrink-0 group-hover:border-brand-accent transition-colors">
                      <MapPin size={17} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-bold">
                        Office Address
                      </p>
                      <p className="text-sm font-light leading-relaxed text-white/80">
                        Second Floor, Capital Hill<br />
                        6 Benmore Road, Morningside<br />
                        Sandton, Gauteng, 2057
                      </p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="py-5 pb-0 flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-brand-accent shrink-0 group-hover:border-brand-accent transition-colors">
                      <Clock size={17} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-bold">
                        Office Hours
                      </p>
                      <p className="text-sm font-light text-white/80">
                        Monday – Friday · 08:00 – 17:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Response time + Google Maps link */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={14} className="text-brand-accent shrink-0" />
                  <span className="text-xs text-white/65 font-light">
                    {isCareerMode
                      ? 'Reviewed by the Recruitment Team'
                      : 'We respond within one business day'}
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=Capital+Hill,6+Benmore+Road,Morningside,Sandton,2057"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-accent hover:text-white transition-colors font-medium"
                >
                  Open in Google Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* RIGHT (7 Cols): Clean Executive Enquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 sm:p-10 lg:p-12 border border-brand-border shadow-sm flex flex-col justify-between">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 my-auto py-16"
                >
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-brand-accent" />
                  </div>
                  <h3 className="text-3xl font-serif text-brand-primary">
                    {isCareerMode ? 'Application Received' : 'Message Received'}
                  </h3>
                  <p className="text-brand-primary/65 text-sm max-w-md mx-auto leading-relaxed font-light">
                    {isCareerMode ? (
                      <>
                        Thank you{fullName ? `, ${fullName}` : ''}. Your application for{' '}
                        <strong className="text-brand-primary font-medium">{getProgrammeTitle()}</strong> along with your CV and academic transcript has been sent to{' '}
                        <span className="font-medium text-brand-accent">admissions@steinscop.com</span>.
                      </>
                    ) : (
                      'Thank you for getting in touch. One of our directors will review your message and respond within one business day.'
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setCvFile(null);
                      setTranscriptFile(null);
                    }}
                    className="btn text-[11px] uppercase tracking-[0.2em] font-bold text-brand-accent hover:text-brand-primary transition-colors cursor-pointer"
                  >
                    {isCareerMode ? 'Submit Another Application' : 'Send Another Message'}
                  </button>
                </motion.div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
                  {/* GTM Tracking Hidden Inputs */}
                  <input type="hidden" id="nature-of-enquiry" name="nature-of-enquiry" value="New Client" />
                  <input type="hidden" id="preferred-contact" name="preferred-contact" value="Email" />

                  {/* Form Header */}
                  <div className="border-b border-brand-border pb-6 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.35em] text-brand-accent font-bold block mb-2">
                        {isCareerMode ? 'Graduate Application' : 'Online Enquiry'}
                      </span>
                      <h2 className="text-3xl font-serif text-brand-primary">
                        {isCareerMode ? (
                          <>
                            Submit Your <span className="italic">Application</span>
                          </>
                        ) : (
                          <>
                            Send a <span className="italic">Message</span>
                          </>
                        )}
                      </h2>
                    </div>
                    <span className="text-xs text-brand-primary/50 font-light">
                      Fields marked with * are required
                    </span>
                  </div>

                  {/* Career Mode Programme Banner */}
                  {isCareerMode && (
                    <div className="p-4 rounded-xl bg-brand-cream/60 border border-brand-accent/35 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Briefcase size={16} className="text-brand-accent shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
                            Selected Programme
                          </p>
                          <p className="text-sm font-serif text-brand-primary font-medium">
                            {getProgrammeTitle()}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-brand-primary/55 hidden sm:inline">
                        admissions@steinscop.com
                      </span>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full bg-brand-cream/40 border border-brand-border rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all placeholder:text-brand-primary/35 text-brand-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={isCareerMode ? 'jane@university.ac.za' : 'jane@company.co.za'}
                        className="w-full bg-brand-cream/40 border border-brand-border rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all placeholder:text-brand-primary/35 text-brand-primary"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Company / University */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+27 (0)72 000 0000"
                        className="w-full bg-brand-cream/40 border border-brand-border rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all placeholder:text-brand-primary/35 text-brand-primary"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80">
                        {isCareerMode ? 'University / Institution' : 'Company / Organisation'}
                      </label>
                      <input
                        type="text"
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        placeholder={isCareerMode ? 'e.g. Wits / UCT / UP' : 'Company Name'}
                        className="w-full bg-brand-cream/40 border border-brand-border rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all placeholder:text-brand-primary/35 text-brand-primary"
                      />
                    </div>
                  </div>

                  {/* Row 3: Practice Area & Enquiry Type (Client Mode) OR Document Uploads (Career Mode) */}
                  {!isCareerMode ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80">
                          Practice Area
                        </label>
                        <div className="relative">
                          <select
                            id="practice-area"
                            value={practiceArea}
                            onChange={(e) => setPracticeArea(e.target.value)}
                            className="w-full bg-brand-cream/40 border border-brand-border rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all appearance-none cursor-pointer text-brand-primary pr-10"
                          >
                            <option>Mergers &amp; Acquisitions</option>
                            <option>Deal &amp; Transaction Structuring</option>
                            <option>Dispute Resolution &amp; Litigation</option>
                            <option>Insolvency &amp; Business Rescue</option>
                            <option>Employment &amp; Labour</option>
                            <option>Competition Law</option>
                            <option>Securities Law</option>
                            <option>Mining Law</option>
                            <option>Communications &amp; Technology</option>
                            <option>General Enquiry</option>
                          </select>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-brand-primary/40">
                            <ChevronDown size={15} />
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80">
                          Nature of Enquiry
                        </label>
                        <div data-field="nature-of-enquiry" className="grid grid-cols-2 gap-2">
                          {[
                            { value: 'New Client Enquiry', label: 'New Client' },
                            { value: 'Existing Client', label: 'Existing Client' },
                            { value: 'Urgent Matter', label: 'Urgent' },
                            { value: 'General Enquiry', label: 'General' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setMatterType(opt.value);
                                const input = document.getElementById('nature-of-enquiry') as HTMLInputElement | null;
                                if (input) input.value = opt.label;
                              }}
                              className={`py-2.5 px-3 rounded-lg border text-center transition-all text-[10px] uppercase tracking-wider font-bold cursor-pointer ${
                                matterType === opt.value
                                  ? 'bg-brand-primary text-white border-brand-primary'
                                  : 'bg-brand-cream/30 border-brand-border text-brand-primary/65 hover:border-brand-accent/50 hover:text-brand-primary'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* CV Upload Box */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80 flex items-center justify-between">
                          <span>Curriculum Vitae (CV) *</span>
                          {cvFile && (
                            <span className="text-[10px] font-mono text-brand-accent">
                              {formatFileSize(cvFile.size)}
                            </span>
                          )}
                        </label>

                        <input
                          type="file"
                          ref={cvInputRef}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => handleCvChange(e.target.files?.[0] || null)}
                        />

                        {cvFile ? (
                          <div className="p-4 rounded-xl border border-brand-accent/40 bg-brand-cream/30 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-brand-accent/15 flex items-center justify-center shrink-0 text-brand-accent">
                                <FileText size={18} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-brand-primary truncate">{cvFile.name}</p>
                                <p className="text-[10px] text-brand-accent font-medium flex items-center gap-1">
                                  <CheckCircle size={10} className="text-emerald-600" /> Ready to submit
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCvChange(null)}
                              className="p-1.5 hover:bg-white rounded-full text-brand-primary/40 hover:text-red-600 transition-colors shrink-0"
                              title="Remove CV"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => cvInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              if (e.dataTransfer.files?.[0]) handleCvChange(e.dataTransfer.files[0]);
                            }}
                            className={`p-5 rounded-xl border-2 border-dashed text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                              cvError
                                ? 'border-red-400 bg-red-50/30'
                                : 'border-brand-border bg-brand-cream/25 hover:border-brand-accent hover:bg-brand-cream/50'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-brand-accent">
                              <UploadCloud size={18} />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-xs font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">
                                Upload your CV
                              </p>
                              <p className="text-[10px] text-brand-primary/45">PDF or Word (Max 10MB)</p>
                            </div>
                          </button>
                        )}
                        {cvError && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                            <AlertCircle size={11} /> {cvError}
                          </p>
                        )}
                      </div>

                      {/* Academic Transcript Upload Box */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80 flex items-center justify-between">
                          <span>Academic Transcript *</span>
                          {transcriptFile && (
                            <span className="text-[10px] font-mono text-brand-accent">
                              {formatFileSize(transcriptFile.size)}
                            </span>
                          )}
                        </label>

                        <input
                          type="file"
                          ref={transcriptInputRef}
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) => handleTranscriptChange(e.target.files?.[0] || null)}
                        />

                        {transcriptFile ? (
                          <div className="p-4 rounded-xl border border-brand-accent/40 bg-brand-cream/30 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-brand-accent/15 flex items-center justify-center shrink-0 text-brand-accent">
                                <GraduationCap size={18} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-brand-primary truncate">
                                  {transcriptFile.name}
                                </p>
                                <p className="text-[10px] text-brand-accent font-medium flex items-center gap-1">
                                  <CheckCircle size={10} className="text-emerald-600" /> Ready to submit
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleTranscriptChange(null)}
                              className="p-1.5 hover:bg-white rounded-full text-brand-primary/40 hover:text-red-600 transition-colors shrink-0"
                              title="Remove Transcript"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => transcriptInputRef.current?.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              if (e.dataTransfer.files?.[0]) handleTranscriptChange(e.dataTransfer.files[0]);
                            }}
                            className={`p-5 rounded-xl border-2 border-dashed text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                              transcriptError
                                ? 'border-red-400 bg-red-50/30'
                                : 'border-brand-border bg-brand-cream/25 hover:border-brand-accent hover:bg-brand-cream/50'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-brand-accent">
                              <GraduationCap size={18} />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-xs font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">
                                Upload Transcript
                              </p>
                              <p className="text-[10px] text-brand-primary/45">Official university results</p>
                            </div>
                          </button>
                        )}
                        {transcriptError && (
                          <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                            <AlertCircle size={11} /> {transcriptError}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Row 4: Preferred Contact Method */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80">
                      Preferred Contact Method
                    </label>
                    <div data-field="preferred-contact" className="flex flex-wrap gap-2.5">
                      {[
                        { value: 'email', label: 'Email', icon: <Mail size={12} /> },
                        { value: 'phone', label: 'Phone Call', icon: <PhoneCall size={12} /> },
                        { value: 'teams', label: 'MS Teams', icon: <Video size={12} /> },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setPreferredContact(opt.value);
                            const input = document.getElementById('preferred-contact') as HTMLInputElement | null;
                            if (input) input.value = opt.label;
                          }}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                            preferredContact === opt.value
                              ? 'bg-brand-primary text-white border-brand-primary'
                              : 'bg-brand-cream/30 border-brand-border text-brand-primary/60 hover:border-brand-primary/40 hover:text-brand-primary'
                          }`}
                        >
                          {opt.icon} {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Message */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase tracking-[0.2em] font-bold text-brand-primary/80">
                      {isCareerMode ? 'Cover Note (Optional)' : 'Message *'}
                    </label>
                    <textarea
                      required={!isCareerMode}
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        isCareerMode
                          ? 'Share any relevant academic achievements, intended graduation date, or areas of interest…'
                          : 'Briefly describe how we can assist you…'
                      }
                      className="w-full bg-brand-cream/40 border border-brand-border rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all placeholder:text-brand-primary/35 resize-none text-brand-primary"
                    />
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-start gap-2.5">
                      <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
                      <div>{submitError}</div>
                    </div>
                  )}

                  {/* Footer Row: POPIA Notice + Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-brand-border/80">
                    <p className="text-xs text-brand-primary/55 font-light">
                      Handled in accordance with our{' '}
                      <Link to="/privacy" className="text-brand-accent underline underline-offset-4 hover:text-brand-primary">
                        POPIA Privacy Policy
                      </Link>
                      .
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn px-10 py-4 bg-brand-primary text-brand-cream uppercase tracking-[2.5px] text-[10px] font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group shadow-md cursor-pointer shrink-0 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-accent'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2.5">
                        {isSubmitting ? (
                          <>
                            <Loader2 size={13} className="animate-spin text-brand-accent" />
                            {isCareerMode ? 'Sending Application...' : 'Sending Message...'}
                          </>
                        ) : (
                          <>
                            {isCareerMode ? 'Submit Application' : 'Send Message'} <ArrowRight size={13} />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Speak directly to a director */}
      <section className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 bg-brand-cream border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-bold mb-3 block">
                Direct Access
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-primary">
                Speak to a <span className="italic">Director</span>
              </h2>
              <p className="text-base text-brand-primary/65 font-light mt-3 max-w-xl">
                Every matter at Stein Scop is director-led. Reach out directly to the director whose practice area best matches your enquiry.
              </p>
            </div>
            <Link
              to="/team"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold text-brand-primary hover:text-brand-accent transition-colors pb-1 group shrink-0"
            >
              View Full Team
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
            {teamDirectors.map((d) => (
              <div
                key={d.id}
                className="bg-white border border-brand-border hover:border-brand-accent/60 rounded-xl p-4 sm:p-5 flex items-center gap-3.5 sm:gap-4 transition-all duration-300 shadow-xs hover:shadow-md group h-full"
              >
                <Link
                  to={`/team/${d.id}`}
                  className="ss-watermark-stage w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 flex items-center justify-center"
                  style={
                    d.hasNewPortrait
                      ? undefined
                      : { background: 'radial-gradient(circle at 50% 40%, #8a7e68 0%, #6f6450 100%)' }
                  }
                >
                  {d.hasNewPortrait ? (
                    <img
                      src={d.image}
                      alt={d.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <img
                      src="/stein-scop-knight-watermark.png"
                      alt={`${d.name} - Stein Scop Attorneys`}
                      loading="lazy"
                      decoding="async"
                      width={161}
                      height={260}
                      className="ss-knight-spin w-5 sm:w-6 h-auto opacity-[0.3]"
                    />
                  )}
                </Link>
                <div className="min-w-0 flex-1 space-y-1">
                  <Link
                    to={`/team/${d.id}`}
                    className="text-base font-serif text-brand-primary group-hover:text-brand-accent transition-colors block truncate"
                  >
                    {d.name}
                  </Link>
                  <p className="text-[11px] text-brand-primary/60 font-light leading-snug">
                    {d.practiceAreas
                      .slice(0, 2)
                      .map((area) =>
                        area === 'Competition Law & Regulatory Matters' ? 'Competition Law' : area
                      )
                      .join(' · ')}
                  </p>
                  <a
                    href={`mailto:${d.email}?subject=${encodeURIComponent(
                      `Attention: ${d.name} — Enquiry`
                    )}&body=${encodeURIComponent(`Dear ${d.name},\n\n`)}`}
                    className="btn inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-brand-accent hover:text-brand-primary transition-colors pt-0.5"
                  >
                    <Mail size={11} /> Email Director
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
