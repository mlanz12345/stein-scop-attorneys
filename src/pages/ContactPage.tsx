import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Editable } from '../components/Editable';
import { PhoneCall, Mail, MapPin, Clock, ArrowRight, Video, MessageCircle, CheckCircle } from 'lucide-react';
import React, { useState } from 'react';

const directors = [
  { name: 'Glenn Stein', focus: 'M&A · Technology · Litigation' },
  { name: 'Bradley Scop', focus: 'M&A · Mining · Banking' },
  { name: 'Sian van der Weele', focus: 'Commercial Litigation · Insolvency' },
  { name: 'Safiyyah Buckas', focus: 'Employment · Labour Law' },
  { name: 'Casper Badenhorst', focus: 'Competition · Corporate Governance' },
  { name: 'Brooke Roxburgh', focus: 'M&A · Corporate Commercial' },
  { name: 'Jemma Brasler', focus: 'Employment · Executive Matters' },
];

const contactDetails = [
  {
    icon: <PhoneCall size={16} className="text-brand-accent" />,
    label: 'Phone',
    content: (
      <a href="tel:+27113808080" className="text-lg font-serif hover:text-brand-accent transition-colors">
        +27 (0)11 380 80 80
      </a>
    ),
  },
  {
    icon: <MessageCircle size={16} className="text-brand-accent" />,
    label: 'WhatsApp',
    content: (
      <a href="https://wa.me/27113808080" target="_blank" rel="noopener noreferrer"
        className="text-lg font-serif hover:text-brand-accent transition-colors">
        +27 (0)11 380 80 80
      </a>
    ),
  },
  {
    icon: <Mail size={16} className="text-brand-accent" />,
    label: 'Email',
    content: (
      <a href="mailto:info@steinscop.com"
        className="text-lg font-serif hover:text-brand-accent transition-colors">
        info@steinscop.com
      </a>
    ),
  },
  {
    icon: <Video size={16} className="text-brand-accent" />,
    label: 'Virtual Meeting',
    content: (
      <a href="mailto:info@steinscop.com?subject=Virtual%20Consultation%20Request&body=I%20would%20like%20to%20request%20a%20virtual%20consultation%20via%20Microsoft%20Teams."
        className="text-lg font-serif hover:text-brand-accent transition-colors">
        Request a Teams Meeting
      </a>
    ),
  },
  {
    icon: <MapPin size={16} className="text-brand-accent" />,
    label: 'Office',
    content: (
      <p className="text-base font-light leading-relaxed text-brand-primary/80">
        Second Floor, Capital Hill<br />
        6 Benmore Road, Morningside<br />
        Sandton, Gauteng, 2057
      </p>
    ),
  },
  {
    icon: <Clock size={16} className="text-brand-accent" />,
    label: 'Office Hours',
    content: (
      <p className="text-base font-light text-brand-primary/80">
        Monday — Friday<br />08:00 — 17:00
      </p>
    ),
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [preferredContact, setPreferredContact] = useState('email');
  const [matterType, setMatterType] = useState('New Client Enquiry');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>Contact Us | Stein Scop Attorneys Inc.</title>
        <meta name="description" content="Contact Stein Scop Attorneys Inc. at our Sandton office. Call +27 (0)11 380 80 80, email info@steinscop.com, or submit an enquiry. We respond within one business day." />
        <meta property="og:title" content="Contact Us | Stein Scop Attorneys Inc." />
        <meta property="og:description" content="Reach our Sandton office by phone, email, WhatsApp or Microsoft Teams. 6 Benmore Road, Morningside, Sandton." />
      </Helmet>

      {/* Hero */}
      <section className="pt-36 pb-12 px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">Connect</span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight md:whitespace-nowrap">
              <Editable id="contact_hero_title" defaultText="Engage Our" /> <span className="italic"><Editable id="contact_hero_title_2" defaultText="Expertise" /></span>
            </h1>
            <p className="text-xl font-light text-brand-primary/60 leading-relaxed max-w-none">
              Reach out to our Sandton office to discuss your commercial legal requirements or schedule a consultation with one of our directors.
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="py-14 lg:py-24 px-12 lg:px-24 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: contact info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {contactDetails.map(({ icon, label, content }) => (
                <div key={label} className="flex items-start gap-4 p-5 rounded-2xl border border-brand-border bg-brand-cream/20 hover:bg-brand-cream/40 hover:border-brand-accent/30 hover:-translate-y-0.5 transition-all duration-300 shadow-sm group">
                  <div className="w-10 h-10 rounded-full bg-white border border-brand-border flex items-center justify-center shrink-0 mt-0.5 group-hover:border-brand-accent transition-colors shadow-inner">
                    {icon}
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[9px] uppercase tracking-[0.35em] font-bold text-brand-accent">{label}</p>
                    <div className="text-brand-primary">
                      {content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response commitment */}
            <div className="flex items-center gap-3 pt-6 border-t border-brand-border">
              <CheckCircle size={14} className="text-brand-accent shrink-0" />
              <p className="text-xs text-brand-primary/50 font-light">
                We respond to all enquiries within one business day.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <div className="bg-brand-cream/40 p-10 lg:p-14 rounded-2xl border border-brand-border shadow-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 py-12"
                >
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} className="text-brand-accent" />
                  </div>
                  <h3 className="text-3xl font-serif">Message Received</h3>
                  <p className="text-brand-primary/50 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. A director will review your enquiry and respond within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[10px] uppercase tracking-widest font-bold text-brand-accent hover:text-brand-primary transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">

                  {/* Segment 01 / Personal Details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-brand-border/40 pb-2">
                      <span className="font-mono text-xs text-brand-accent font-bold">01</span>
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/50">Personal Details</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group/field">
                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/40 group-focus-within/field:text-brand-accent transition-colors duration-200">Full Name</label>
                        <input required type="text" placeholder="Jane Smith"
                          className="w-full bg-white border border-brand-border rounded-lg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/25 shadow-sm" />
                      </div>
                      <div className="space-y-2 group/field">
                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/40 group-focus-within/field:text-brand-accent transition-colors duration-200">Email Address</label>
                        <input required type="email" placeholder="jane@company.com"
                          className="w-full bg-white border border-brand-border rounded-lg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/25 shadow-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group/field">
                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/40 group-focus-within/field:text-brand-accent transition-colors duration-200">Phone Number</label>
                        <input type="tel" placeholder="+27 (0)11 000 0000"
                          className="w-full bg-white border border-brand-border rounded-lg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/25 shadow-sm" />
                      </div>
                      <div className="space-y-2 group/field">
                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/40 group-focus-within/field:text-brand-accent transition-colors duration-200">Company / Organisation</label>
                        <input type="text" placeholder="Acme (Pty) Ltd"
                          className="w-full bg-white border border-brand-border rounded-lg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/25 shadow-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Segment 02 / Matter Specification */}
                  <div className="space-y-6 pt-2">
                    <div className="flex items-center gap-3 border-b border-brand-border/40 pb-2">
                      <span className="font-mono text-xs text-brand-accent font-bold">02</span>
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/50">Matter Specification</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 group/field">
                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/40 group-focus-within/field:text-brand-accent transition-colors duration-200">Practice Area</label>
                        <div className="relative">
                          <select className="w-full bg-white border border-brand-border rounded-lg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all appearance-none cursor-pointer text-brand-primary pr-10 shadow-sm">
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
                            <ArrowRight size={12} className="rotate-90" />
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/40">Matter Type</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: 'New Client Enquiry', label: 'New Client' },
                            { value: 'Existing Client', label: 'Existing' },
                            { value: 'Urgent Matter', label: 'Urgent' },
                            { value: 'General Enquiry', label: 'General' },
                          ].map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setMatterType(opt.value)}
                              className={`py-2.5 px-3 rounded-lg border text-center transition-all duration-300 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap ${
                                matterType === opt.value
                                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                                  : 'bg-white border-brand-border text-brand-primary/60 hover:border-brand-accent/40 hover:text-brand-primary hover:bg-brand-cream/10'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Segment 03 / Details & Communication */}
                  <div className="space-y-6 pt-2">
                    <div className="flex items-center gap-3 border-b border-brand-border/40 pb-2">
                      <span className="font-mono text-xs text-brand-accent font-bold">03</span>
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/50">Details &amp; Communication</span>
                    </div>

                    {/* Preferred contact method */}
                    <div className="space-y-3">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/40">Preferred Response Method</label>
                      <div className="flex flex-wrap gap-2.5">
                        {[
                          { value: 'email', label: 'Email', icon: <Mail size={12} /> },
                          { value: 'phone', label: 'Phone Call', icon: <PhoneCall size={12} /> },
                          { value: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle size={12} /> },
                          { value: 'teams', label: 'MS Teams', icon: <Video size={12} /> },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setPreferredContact(opt.value)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-[10px] uppercase tracking-wider font-bold transition-all duration-200 ${
                              preferredContact === opt.value
                                ? 'bg-brand-primary text-white border-brand-primary'
                                : 'border-brand-border text-brand-primary/50 hover:border-brand-primary/40 hover:bg-white'
                            }`}
                          >
                            {opt.icon} {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2 group/field">
                      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-primary/40 group-focus-within/field:text-brand-accent transition-colors duration-200">Message</label>
                      <textarea required rows={4} placeholder="Briefly describe how we can assist you…"
                        className="w-full bg-white border border-brand-border rounded-lg px-4 py-3 text-sm focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/25 resize-none shadow-sm" />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button type="submit"
                      className="w-full py-4 bg-brand-primary text-brand-cream uppercase tracking-[3px] text-[10px] font-bold rounded-full hover:bg-brand-accent transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group">
                      {/* Sliding glass reflection sheen effect on hover */}
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-sheen pointer-events-none" />
                      <span className="relative z-10 flex items-center gap-3">Send Enquiry <ArrowRight size={13} /></span>
                    </button>
                    <p className="text-center text-[10px] text-brand-primary/30 uppercase tracking-widest">
                      We respond within one business day
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Speak directly to a director */}
      <section className="py-14 px-12 lg:px-24 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[9px] uppercase tracking-[0.4em] text-brand-accent font-bold mb-3 block">Prefer Direct Access</span>
            <h2 className="text-3xl md:text-4xl font-serif">Speak to a <span className="italic">Director</span></h2>
            <p className="text-sm text-brand-primary/50 font-light mt-3 max-w-xl">
              Every matter at Stein Scop is director-led. Reach out directly to the director whose practice area best matches your matter.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {directors.map((d) => (
              <a key={d.name} href="mailto:info@steinscop.com"
                className="group p-5 border border-brand-border rounded-xl hover:border-brand-accent transition-all duration-300 space-y-1.5">
                <p className="text-sm font-semibold text-brand-primary group-hover:text-brand-accent transition-colors">{d.name}</p>
                <p className="text-[10px] text-brand-primary/40 font-light leading-snug">{d.focus}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[420px] border-t border-brand-border relative overflow-hidden">
        <iframe
          title="Stein Scop Attorneys Office"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.9!2d28.0573!3d-26.0956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9573e9b5e5a5a5%3A0x0!2sCapital+Hill%2C+6+Benmore+Rd%2C+Morningside%2C+Sandton%2C+2196!5e0!3m2!1sen!2sza!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(1) contrast(1.1)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-6 left-6 bg-brand-primary text-brand-cream px-6 py-4 shadow-xl">
          <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-accent mb-1">Sandton Office</p>
          <p className="text-sm font-light">6 Benmore Road, Morningside, Sandton</p>
        </div>
      </section>

    </main>
  );
}
