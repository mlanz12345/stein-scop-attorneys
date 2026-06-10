import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Editable } from '../components/Editable';
import { PhoneCall, Mail, MapPin, Clock, ArrowRight, Video, MessageCircle, CheckCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

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
    icon: <PhoneCall size={20} className="text-brand-accent" />,
    label: 'Phone',
    content: (
      <a href="tel:+27113808080" className="text-xl font-serif lining-nums hover:text-brand-accent transition-colors text-white">
        +27 (0)11 380 80 80
      </a>
    ),
  },
  {
    icon: <MessageCircle size={20} className="text-brand-accent" />,
    label: 'WhatsApp',
    content: (
      <a href="https://wa.me/27113808080" target="_blank" rel="noopener noreferrer"
        className="text-xl font-serif lining-nums hover:text-brand-accent transition-colors text-white">
        +27 (0)11 380 80 80
      </a>
    ),
  },
  {
    icon: <Mail size={20} className="text-brand-accent" />,
    label: 'Email',
    content: (
      <a href="mailto:info@steinscop.com"
        className="text-xl font-serif hover:text-brand-accent transition-colors text-white">
        info@steinscop.com
      </a>
    ),
  },
  {
    icon: <Video size={20} className="text-brand-accent" />,
    label: 'Virtual Meeting',
    content: (
      <a href="mailto:info@steinscop.com?subject=Virtual%20Consultation%20Request&body=I%20would%20like%20to%20request%20a%20virtual%20consultation%20via%20Microsoft%20Teams."
        className="text-xl font-serif hover:text-brand-accent transition-colors text-white">
        Request a Teams Meeting
      </a>
    ),
  },
  {
    icon: <MapPin size={20} className="text-brand-accent" />,
    label: 'Office',
    content: (
      <p className="text-sm font-light leading-relaxed text-white/80">
        Second Floor, Capital Hill<br />
        6 Benmore Road, Morningside<br />
        Sandton, Gauteng, 2057
      </p>
    ),
  },
  {
    icon: <Clock size={20} className="text-brand-accent" />,
    label: 'Office Hours',
    content: (
      <p className="text-sm font-light text-white/80">
        Monday — Friday<br />08:00 — 17:00
      </p>
    ),
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [preferredContact, setPreferredContact] = useState('email');
  const [matterType, setMatterType] = useState('New Client Enquiry');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const leftColumnVariants: any = {
    hidden: { 
      opacity: 0, 
      x: isMobile ? 0 : 50, 
      y: isMobile ? 30 : 0 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const rightColumnVariants: any = {
    hidden: { 
      opacity: 0, 
      x: isMobile ? 0 : -50, 
      y: isMobile ? -30 : 0 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const desktopDividerVariants: any = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const mobileDividerVariants: any = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
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
      <section className="pt-36 pb-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">Connect</span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight">
              <Editable id="contact_hero_title" defaultText="Engage Our" /> <span className="italic"><Editable id="contact_hero_title_2" defaultText="Expertise" /></span>
            </h1>
            <p className="text-xl font-light text-brand-primary/60 leading-relaxed max-w-2xl">
              Reach out to our Sandton office to discuss your commercial legal requirements or schedule a consultation with one of our directors.
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="pb-20 lg:pb-32 px-6 md:px-12 lg:px-24 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch relative">
            {/* Left Column: Dark navy connect panel */}
            <motion.div
              variants={leftColumnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-[calc(50%-32px)] bg-brand-primary text-brand-cream p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between space-y-10 rounded-3xl border border-brand-border/60 shadow-xl overflow-hidden z-10"
            >
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.45em] text-brand-accent font-bold">Direct Channels</span>
                  <h2 className="text-3xl font-serif text-white">Get in <span className="italic">Touch</span></h2>
                  <div className="w-10 h-px bg-brand-accent/40" />
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 gap-5"
                >
                  {contactDetails.map(({ icon, label, content }) => (
                    <motion.div
                      key={label}
                      variants={itemVariants}
                      className="flex items-center justify-between gap-5 p-6 rounded-2xl border border-white/[0.04] bg-[#111726] hover:border-brand-accent/30 hover:bg-[#151c2e] transition-all duration-300 shadow-sm group"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-accent group-hover:bg-brand-accent/[0.06] transition-all duration-300 text-brand-accent bg-transparent">
                          {icon}
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-brand-accent">{label}</p>
                          <div className="text-white">
                            {content}
                          </div>
                        </div>
                      </div>
                      {label === 'Virtual Meeting' && (
                        <div className="w-6 h-6 rounded-full border border-brand-accent/40 flex items-center justify-center shrink-0 group-hover:border-brand-accent transition-colors duration-300 mr-2" />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Response commitment */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                <CheckCircle size={14} className="text-brand-accent shrink-0 animate-pulse" />
                <p className="text-xs text-white/60 font-light">
                  We respond to all enquiries within one business day.
                </p>
              </div>
            </motion.div>

            {/* Middle Divider Line */}
            {/* Desktop Divider */}
            <motion.div 
              variants={desktopDividerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-brand-accent/30 -translate-x-1/2 origin-center z-0"
            />
            {/* Mobile Divider */}
            <motion.div 
              variants={mobileDividerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:hidden w-full h-px bg-brand-accent/25 my-4 origin-center z-0"
            />

            {/* Right Column: form */}
            <motion.div
              variants={rightColumnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-[calc(50%-32px)] p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-center bg-white rounded-3xl border border-brand-border/60 shadow-xl overflow-hidden z-10"
            >
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
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/80">Personal Details</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 group/field">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/75 group-focus-within/field:text-brand-accent transition-colors duration-200">Full Name</label>
                        <input required type="text" placeholder="Jane Smith"
                          className="w-full bg-brand-cream/30 border border-brand-border/60 rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/40 shadow-sm text-brand-primary" />
                      </div>
                      <div className="space-y-2 group/field">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/75 group-focus-within/field:text-brand-accent transition-colors duration-200">Email Address</label>
                        <input required type="email" placeholder="jane@company.com"
                          className="w-full bg-brand-cream/30 border border-brand-border/60 rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/40 shadow-sm text-brand-primary" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 group/field">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/75 group-focus-within/field:text-brand-accent transition-colors duration-200">Phone Number</label>
                        <input type="tel" placeholder="+27 (0)11 000 0000"
                          className="w-full bg-brand-cream/30 border border-brand-border/60 rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/40 shadow-sm text-brand-primary" />
                      </div>
                      <div className="space-y-2 group/field">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/75 group-focus-within/field:text-brand-accent transition-colors duration-200">Company / Organisation</label>
                        <input type="text" placeholder="Acme (Pty) Ltd"
                          className="w-full bg-brand-cream/30 border border-brand-border/60 rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/40 shadow-sm text-brand-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Segment 02 / Matter Specification */}
                  <div className="space-y-6 pt-2">
                    <div className="flex items-center gap-3 border-b border-brand-border/40 pb-2">
                      <span className="font-mono text-xs text-brand-accent font-bold">02</span>
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/80">Matter Specification</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 group/field">
                        <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/75 group-focus-within/field:text-brand-accent transition-colors duration-200">Practice Area</label>
                        <div className="relative">
                          <select className="w-full bg-brand-cream/30 border border-brand-border/60 rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all appearance-none cursor-pointer text-brand-primary pr-10 shadow-sm">
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
                        <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/75">Matter Type</label>
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
                                  : 'bg-brand-cream/20 border-brand-border/60 text-brand-primary/60 hover:border-brand-accent/40 hover:text-brand-primary hover:bg-brand-cream/40'
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
                      <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/80">Details &amp; Communication</span>
                    </div>

                    {/* Preferred contact method */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/75">Preferred Response Method</label>
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
                                : 'bg-brand-cream/20 border-brand-border/60 text-brand-primary/50 hover:border-brand-primary/40 hover:bg-brand-cream/40'
                            }`}
                          >
                            {opt.icon} {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2 group/field">
                      <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-primary/75 group-focus-within/field:text-brand-accent transition-colors duration-200">Message</label>
                      <textarea required rows={4} placeholder="Briefly describe how we can assist you…"
                        className="w-full bg-brand-cream/30 border border-brand-border/60 rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/40 resize-none shadow-sm text-brand-primary" />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button type="submit"
                      className="w-full py-4 bg-brand-primary text-brand-cream uppercase tracking-[3px] text-[10px] font-bold rounded-full hover:bg-brand-accent transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group shadow-md hover:shadow-lg">
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-sheen pointer-events-none" />
                      <span className="relative z-10 flex items-center gap-3">Send Enquiry <ArrowRight size={13} /></span>
                    </button>
                    <p className="text-center text-[10px] text-brand-primary/30 uppercase tracking-widest">
                      We respond within one business day
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
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
