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
  MessageCircle, 
  CheckCircle, 
  ChevronDown, 
  X, 
  Briefcase, 
  GraduationCap, 
  UploadCloud, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const directors = [
  { name: 'Glenn Stein', focus: 'M&A · Technology · Litigation' },
  { name: 'Bradley Scop', focus: 'M&A · Mining · Banking' },
  { name: 'Sian van der Weele', focus: 'Commercial Litigation · Insolvency' },
  { name: 'Safiyyah Buckas', focus: 'Employment · Labour Law' },
  { name: 'Casper Badenhorst', focus: 'Competition · Corporate Governance' },
  { name: 'Jemma Brasler', focus: 'Employment · Executive Matters' },
  { name: 'Simone Meades', focus: 'Commercial Litigation · Corporate Advisory' },
  { name: 'Nanri Labuschagne', focus: 'Commercial Litigation · Mining · Administrative Law' },
];

export default function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const programmeParam = searchParams.get('programme');
  const isCareerMode = typeParam === 'careers' || Boolean(programmeParam);

  const [submitted, setSubmitted] = useState(false);
  const [preferredContact, setPreferredContact] = useState('email');
  const [matterType, setMatterType] = useState('New Client Enquiry');
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setSubmitted(true);
  };

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
      label: isCareerMode ? 'Admissions Email' : 'Email',
      content: isCareerMode ? (
        <div className="space-y-0.5">
          <a href="mailto:admissions@steinscop.com"
            className="text-xl font-serif hover:text-brand-accent transition-colors text-white block">
            admissions@steinscop.com
          </a>
          <span className="text-[10px] uppercase tracking-wider text-brand-accent font-semibold block">
            Allocated to Graduate Admissions
          </span>
        </div>
      ) : (
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
        <a href={`mailto:${isCareerMode ? 'admissions' : 'info'}@steinscop.com?subject=Virtual%20Consultation%20Request&body=I%20would%20like%20to%20request%20a%20virtual%20meeting%20via%20Microsoft%20Teams.`}
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        <title>{isCareerMode ? 'Admissions & Careers | Stein Scop Attorneys' : 'Contact Us | Stein Scop Attorneys'}</title>
        <meta name="description" content={isCareerMode ? 'Apply for Articles of Clerkship or the Winter Vacation Programme at Stein Scop Attorneys in Sandton. Submit your application directly to admissions@steinscop.com.' : 'Contact Stein Scop Attorneys at our Sandton office. Call +27 (0)11 380 80 80, email info@steinscop.com, or submit an enquiry. We respond within one business day.'} />
        <meta property="og:title" content={isCareerMode ? 'Admissions & Careers | Stein Scop Attorneys' : 'Contact Us | Stein Scop Attorneys'} />
        <meta property="og:description" content="Reach our Sandton office by phone, email, WhatsApp or Microsoft Teams. 6 Benmore Road, Morningside, Sandton." />
      </Helmet>

      {/* Hero */}
      <section className="pt-36 pb-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">
              {isCareerMode ? 'Admissions & Recruitment' : 'Connect'}
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight">
              {isCareerMode ? (
                <>
                  Join Our <span className="italic">Practice</span>
                </>
              ) : (
                <>
                  <Editable id="contact_hero_title" defaultText="Engage Our" /> <span className="italic"><Editable id="contact_hero_title_2" defaultText="Expertise" /></span>
                </>
              )}
            </h1>
            <p className="text-xl font-light text-brand-primary/60 leading-relaxed max-w-2xl">
              {isCareerMode ? (
                `Applications for ${getProgrammeTitle()} are processed directly by our graduate admissions committee at admissions@steinscop.com.`
              ) : (
                'Reach out to our Sandton office to discuss your commercial legal requirements or schedule a consultation with one of our directors.'
              )}
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="pb-20 lg:pb-32 px-6 md:px-12 lg:px-24 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          
          {/* Mode Switcher Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-brand-border/60">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-widest text-brand-primary/40 font-bold">Enquiry Focus:</span>
              <div className="inline-flex p-1 bg-white border border-brand-border/80 rounded-full shadow-xs">
                <button
                  type="button"
                  onClick={() => setSearchParams({})}
                  className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all ${
                    !isCareerMode
                      ? 'bg-brand-primary text-white shadow-xs'
                      : 'text-brand-primary/60 hover:text-brand-primary'
                  }`}
                >
                  Legal &amp; Client Matters
                </button>
                <button
                  type="button"
                  onClick={() => setSearchParams({ type: 'careers' })}
                  className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all ${
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
              <div className="flex items-center gap-2 text-xs text-brand-accent font-semibold bg-brand-accent/10 px-3.5 py-1.5 rounded-full border border-brand-accent/20">
                <Mail size={13} />
                <span>Target: admissions@steinscop.com</span>
              </div>
            ) : (
              <Link to="/careers" className="text-xs text-brand-accent hover:underline font-semibold flex items-center gap-1.5">
                Looking for Articles or Vac Work? View Careers <ArrowRight size={12} />
              </Link>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch relative">
            {/* Left Column: Dark navy connect panel */}
            <motion.div
              variants={leftColumnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="w-full lg:w-[calc(50%-32px)] bg-brand-primary text-brand-cream p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-between space-y-10 rounded-3xl border border-brand-border/60 shadow-xl overflow-hidden z-10"
            >
              <div className="space-y-8">
                <div className="space-y-2">
                  <span className="text-[9px] uppercase tracking-[0.45em] text-brand-accent font-bold">
                    {isCareerMode ? 'Admissions Channel' : 'Direct Channels'}
                  </span>
                  <h2 className="text-3xl font-serif text-white">
                    {isCareerMode ? 'Recruitment ' : 'Get in '}<span className="italic">{isCareerMode ? 'Desk' : 'Touch'}</span>
                  </h2>
                  <div className="w-10 h-px bg-brand-accent/40" />
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 gap-4 sm:gap-5"
                >
                  {contactDetails.map(({ icon, label, content }) => (
                    <motion.div
                      key={label}
                      variants={itemVariants}
                      className="flex items-center justify-between gap-4 sm:gap-5 p-4 sm:p-5 md:p-6 rounded-2xl border border-white/[0.04] bg-[#111726] hover:border-brand-accent/30 hover:bg-[#151c2e] transition-all duration-300 shadow-sm group"
                    >
                      <div className="flex items-center gap-4 sm:gap-5">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-brand-accent group-hover:bg-brand-accent/[0.06] transition-all duration-300 text-brand-accent bg-transparent">
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
                  {isCareerMode 
                    ? 'Admissions applications are logged directly with the Recruitment Committee.'
                    : 'We respond to all enquiries within one business day.'}
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
              className="lg:hidden w-full h-px bg-brand-accent/25 my-6 sm:my-8 origin-center z-0"
            />

            {/* Right Column: form */}
            <motion.div
              layout
              variants={rightColumnVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
              className={
                isExpanded
                  ? "fixed inset-0 z-50 bg-white p-6 md:p-12 lg:p-16 overflow-y-auto flex flex-col items-center justify-start rounded-none"
                  : "w-full lg:w-[calc(50%-32px)] p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 flex flex-col justify-center bg-white rounded-3xl border border-brand-border/60 shadow-xl overflow-hidden z-10 cursor-pointer hover:border-brand-accent/50 hover:shadow-2xl transition-all duration-300 group/form"
              }
            >
              {isExpanded && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-brand-cream text-brand-primary/60 hover:text-brand-primary transition-all duration-200 z-50 flex items-center gap-2 text-xs uppercase tracking-wider font-semibold"
                >
                  <span>Exit Focus Mode</span>
                  <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-sans bg-brand-cream border border-brand-border rounded shadow-xs text-brand-primary/50">ESC</kbd>
                  <X size={14} />
                </button>
              )}

              {!isExpanded && (
                <div className="absolute top-6 right-6 text-[9px] uppercase tracking-widest font-bold text-brand-primary/30 group-hover/form:text-brand-accent transition-colors duration-300 flex items-center gap-1.5 pointer-events-none">
                  <span>Focus View</span>
                  <ArrowRight size={10} className="-rotate-45" />
                </div>
              )}

              <div className={isExpanded ? "w-full max-w-2xl my-auto py-8 relative" : "w-full"}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-12"
                  >
                    <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle size={32} className="text-brand-accent" />
                    </div>
                    <h3 className="text-3xl font-serif">
                      {isCareerMode ? 'Application Received' : 'Message Received'}
                    </h3>
                    <p className="text-brand-primary/60 text-sm max-w-md mx-auto leading-relaxed">
                      {isCareerMode ? (
                        <>
                          Thank you{fullName ? `, ${fullName}` : ''}. Your application for <strong className="text-brand-primary">{getProgrammeTitle()}</strong> along with your CV and academic transcript has been received and allocated directly to <span className="font-semibold text-brand-accent">admissions@steinscop.com</span>. Our recruitment committee will review your submission.
                        </>
                      ) : (
                        'Thank you for reaching out. A director will review your enquiry and respond within one business day.'
                      )}
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setCvFile(null);
                        setTranscriptFile(null);
                      }}
                      className="text-[10px] uppercase tracking-widest font-bold text-brand-accent hover:text-brand-primary transition-colors"
                    >
                      {isCareerMode ? 'Submit Another Application' : 'Send Another Message'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Career Target Banner */}
                    {isCareerMode && (
                      <div className="p-4 rounded-2xl bg-brand-cream/50 border border-brand-accent/30 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-brand-accent" />
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-accent">
                            Admissions Allocation
                          </span>
                        </div>
                        <h4 className="text-base font-serif text-brand-primary font-medium">
                          {getProgrammeTitle()}
                        </h4>
                        <p className="text-xs text-brand-primary/60 leading-relaxed">
                          This submission will be allocated and delivered to <strong className="text-brand-primary">admissions@steinscop.com</strong>. The commercial matter selector has been bypassed below.
                        </p>
                      </div>
                    )}

                    {/* Segment 01 / Personal Details */}
                    <div className="space-y-8">
                      <div className="flex items-center gap-3 border-b border-brand-border/40 pb-3 mb-2">
                        <span className="font-mono text-xs text-brand-accent font-bold">01</span>
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80">
                          {isCareerMode ? 'Applicant Details' : 'Personal Details'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                        <div className="flex flex-col gap-2.5 group/field">
                          <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80 group-focus-within/field:text-brand-accent transition-colors duration-200">
                            Full Name *
                          </label>
                          <input 
                            required 
                            type="text" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Jane Smith"
                            className="w-full bg-brand-cream/35 border border-brand-border/60 rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/35 shadow-sm text-brand-primary font-medium" 
                          />
                        </div>
                        <div className="flex flex-col gap-2.5 group/field">
                          <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80 group-focus-within/field:text-brand-accent transition-colors duration-200">
                            Email Address *
                          </label>
                          <input 
                            required 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane@university.ac.za"
                            className="w-full bg-brand-cream/35 border border-brand-border/60 rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/35 shadow-sm text-brand-primary font-medium" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                        <div className="flex flex-col gap-2.5 group/field">
                          <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80 group-focus-within/field:text-brand-accent transition-colors duration-200">
                            Phone Number
                          </label>
                          <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+27 (0)72 000 0000"
                            className="w-full bg-brand-cream/35 border border-brand-border/60 rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/35 shadow-sm text-brand-primary font-medium" 
                          />
                        </div>
                        <div className="flex flex-col gap-2.5 group/field">
                          <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80 group-focus-within/field:text-brand-accent transition-colors duration-200">
                            {isCareerMode ? 'University / Institution' : 'Company / Organisation'}
                          </label>
                          <input 
                            type="text" 
                            value={organisation}
                            onChange={(e) => setOrganisation(e.target.value)}
                            placeholder={isCareerMode ? "e.g. Wits / UCT / UP" : "Acme (Pty) Ltd"}
                            className="w-full bg-brand-cream/35 border border-brand-border/60 rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/35 shadow-sm text-brand-primary font-medium" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Segment 02 / Matter Specification (Greyed out when in career mode) */}
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between border-b border-brand-border/40 pb-3 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-brand-accent font-bold">02</span>
                          <span className={`text-[11px] uppercase tracking-[0.25em] font-bold ${isCareerMode ? 'text-brand-primary/40' : 'text-brand-primary/80'}`}>
                            Matter Specification
                          </span>
                        </div>
                        {isCareerMode && (
                          <span className="text-[10px] uppercase tracking-wider text-brand-accent font-bold bg-brand-cream/80 px-2 py-0.5 rounded">
                            Bypassed for Admissions
                          </span>
                        )}
                      </div>

                      {isCareerMode ? (
                        <div className="p-4 rounded-xl border border-dashed border-brand-border/80 bg-brand-cream/20 space-y-1.5 opacity-50 select-none">
                          <p className="text-xs font-semibold text-brand-primary/60">
                            Legal Practice Areas and Client Matter Types are not required.
                          </p>
                          <p className="text-[11px] text-brand-primary/40 leading-relaxed">
                            Your submission is automatically categorized as an applicant profile and directed to the Admissions Committee at admissions@steinscop.com.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                          <div className="flex flex-col gap-2.5 group/field">
                            <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80 group-focus-within/field:text-brand-accent transition-colors duration-200">
                              Practice Area
                            </label>
                            <div className="relative">
                              <select className="w-full bg-brand-cream/35 border border-brand-border/60 rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all appearance-none cursor-pointer text-brand-primary pr-10 shadow-sm font-medium">
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

                          <div className="flex flex-col gap-2.5">
                            <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80">Matter Type</label>
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
                                  className={`py-3 px-3 rounded-lg border text-center transition-all duration-300 text-[10px] uppercase tracking-wider font-bold whitespace-nowrap ${
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
                      )}
                    </div>

                    {/* Segment 03 / Document Upload (Shown when in career mode) */}
                    {isCareerMode && (
                      <div className="space-y-6 pt-4">
                        <div className="flex items-center justify-between border-b border-brand-border/40 pb-3 mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-brand-accent font-bold">03</span>
                            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80">
                              Required Documents
                            </span>
                          </div>
                          <span className="text-[10px] uppercase tracking-wider text-brand-accent font-semibold">
                            PDF, DOC, DOCX up to 10MB
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                          {/* CV Upload Box */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80 flex items-center justify-between">
                              <span>Curriculum Vitae (CV) *</span>
                              {cvFile && <span className="text-[10px] font-mono text-brand-accent">{formatFileSize(cvFile.size)}</span>}
                            </label>
                            
                            <input
                              type="file"
                              ref={cvInputRef}
                              accept=".pdf,.doc,.docx"
                              className="hidden"
                              onChange={(e) => handleCvChange(e.target.files?.[0] || null)}
                            />

                            {cvFile ? (
                              <div className="p-4 rounded-xl border border-brand-accent/40 bg-brand-cream/30 flex items-center justify-between gap-3 shadow-xs">
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
                                className={`p-6 rounded-xl border-2 border-dashed text-center flex flex-col items-center justify-center gap-2 transition-all group ${
                                  cvError 
                                    ? 'border-red-400 bg-red-50/30' 
                                    : 'border-brand-border/80 bg-brand-cream/20 hover:border-brand-accent hover:bg-brand-cream/40'
                                }`}
                              >
                                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform">
                                  <UploadCloud size={20} />
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                                    Click or drop your CV here
                                  </p>
                                  <p className="text-[10px] text-brand-primary/40">
                                    PDF or Word document (Max 10MB)
                                  </p>
                                </div>
                              </button>
                            )}
                            {cvError && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                                <AlertCircle size={11} /> {cvError}
                              </p>
                            )}
                          </div>

                          {/* Academic Transcript Upload Box */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80 flex items-center justify-between">
                              <span>Academic Transcript *</span>
                              {transcriptFile && <span className="text-[10px] font-mono text-brand-accent">{formatFileSize(transcriptFile.size)}</span>}
                            </label>
                            
                            <input
                              type="file"
                              ref={transcriptInputRef}
                              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                              className="hidden"
                              onChange={(e) => handleTranscriptChange(e.target.files?.[0] || null)}
                            />

                            {transcriptFile ? (
                              <div className="p-4 rounded-xl border border-brand-accent/40 bg-brand-cream/30 flex items-center justify-between gap-3 shadow-xs">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-9 h-9 rounded-lg bg-brand-accent/15 flex items-center justify-center shrink-0 text-brand-accent">
                                    <GraduationCap size={18} />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-semibold text-brand-primary truncate">{transcriptFile.name}</p>
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
                                className={`p-6 rounded-xl border-2 border-dashed text-center flex flex-col items-center justify-center gap-2 transition-all group ${
                                  transcriptError 
                                    ? 'border-red-400 bg-red-50/30' 
                                    : 'border-brand-border/80 bg-brand-cream/20 hover:border-brand-accent hover:bg-brand-cream/40'
                                }`}
                              >
                                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform">
                                  <GraduationCap size={20} />
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                                    Click or drop Transcript here
                                  </p>
                                  <p className="text-[10px] text-brand-primary/40">
                                    Official university grades (PDF or image)
                                  </p>
                                </div>
                              </button>
                            )}
                            {transcriptError && (
                              <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium mt-1">
                                <AlertCircle size={11} /> {transcriptError}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Segment 03 / 04 Details & Communication */}
                    <div className="space-y-8 pt-4">
                      <div className="flex items-center gap-3 border-b border-brand-border/40 pb-3 mb-2">
                        <span className="font-mono text-xs text-brand-accent font-bold">
                          {isCareerMode ? '04' : '03'}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80">
                          {isCareerMode ? 'Cover Statement & Communication' : 'Details & Communication'}
                        </span>
                      </div>

                      {/* Preferred contact method */}
                      <div className="flex flex-col gap-2.5">
                        <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80">
                          Preferred Response Method
                        </label>
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
                              className={`flex items-center gap-2 px-4 py-3 rounded-full border text-[10px] uppercase tracking-wider font-bold transition-all duration-200 ${
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

                      {/* Message / Cover note */}
                      <div className="flex flex-col gap-2.5 group/field">
                        <label className="text-[11px] uppercase tracking-[0.25em] font-bold text-brand-primary/80 group-focus-within/field:text-brand-accent transition-colors duration-200">
                          {isCareerMode ? 'Cover Note / Academic Background (Optional)' : 'Message *'}
                        </label>
                        <textarea 
                          rows={4} 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder={isCareerMode 
                            ? "Share any relevant academic achievements, intended graduation date, or areas of legal interest..." 
                            : "Briefly describe how we can assist you…"}
                          className="w-full bg-brand-cream/35 border border-brand-border/60 rounded-lg px-4 py-3.5 text-sm focus:bg-white focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(197,160,89,0.15)] transition-all placeholder:text-brand-primary/35 resize-none shadow-sm text-brand-primary font-medium" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <button 
                        type="submit"
                        className="w-full py-4 bg-brand-primary text-brand-cream uppercase tracking-[3px] text-[10px] font-bold rounded-full hover:bg-brand-accent transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group shadow-md hover:shadow-lg"
                      >
                        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-sheen pointer-events-none" />
                        <span className="relative z-10 flex items-center gap-3">
                          {isCareerMode ? 'Submit Application to Admissions' : 'Send Enquiry'} <ArrowRight size={13} />
                        </span>
                      </button>
                      <p className="text-center text-[10px] text-brand-primary/40 uppercase tracking-widest">
                        {isCareerMode 
                          ? 'Routed directly to admissions@steinscop.com'
                          : 'We respond within one business day'}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Speak directly to a director */}
      <section className="py-14 px-6 md:px-12 lg:px-24 bg-white border-t border-brand-border">
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
    </main>
  );
}
