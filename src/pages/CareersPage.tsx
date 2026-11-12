import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Editable } from '../components/Editable';
import { Send, MapPin, Clock, Briefcase, Mail, ArrowRight, GraduationCap } from 'lucide-react';
import { getCareerProgrammes, getPageSeo, type CareerProgrammeData, type PageSeoData } from '../sanity';

const defaultProgrammes: CareerProgrammeData[] = [
  {
    title: 'Articles of Clerkship',
    slug: 'articles-2028',
    statusBadge: '2027 Closed · 2028 Open',
    location: 'Sandton',
    duration: 'Two-Year Contract',
    audience: 'Candidate Attorney',
    notice: 'Kindly note that applications for articles of clerkship commencing in 2027 have closed.',
    description:
      'If you are interested in applying for articles of clerkship commencing in 2028, kindly send your CV and full academic transcript to admissions@steinscop.com or use the online application form via the Apply Now button.',
    admissionsEmail: 'admissions@steinscop.com',
    emailSubject: 'Application: Articles of Clerkship 2028',
    emailBody:
      'Dear Admissions Team,\n\nPlease find attached my CV and full academic transcript for consideration for Articles of Clerkship commencing in 2028.\n\nKind regards,',
  },
  {
    title: 'Winter Vacation Programme',
    slug: 'winter-vac-2027',
    statusBadge: '2026 Closed · 2027 Open',
    location: 'Sandton',
    duration: 'Vacation Programme',
    audience: 'Law Students',
    notice: 'Kindly note that applications for our winter vacation work programme for 2026 have closed.',
    description:
      'If you are interested in applying for our winter vacation work programme for 2027, kindly send your CV and full academic transcript to admissions@steinscop.com or use the online application form via the Apply Now button.',
    admissionsEmail: 'admissions@steinscop.com',
    emailSubject: 'Application: Winter Vacation Programme 2027',
    emailBody:
      'Dear Admissions Team,\n\nPlease find attached my CV and full academic transcript for consideration for the Winter Vacation Work Programme commencing in 2027.\n\nKind regards,',
  },
];

function formatDescriptionWithEmail(text: string, email: string) {
  if (!text.includes(email)) return text;
  const parts = text.split(email);
  return (
    <>
      {parts[0]}
      <a
        href={`mailto:${email}`}
        className="font-semibold text-brand-accent underline underline-offset-4 hover:text-brand-primary transition-colors"
      >
        {email}
      </a>
      {parts.slice(1).join(email)}
    </>
  );
}

export default function CareersPage() {
  const [programmes, setProgrammes] = useState<CareerProgrammeData[]>(defaultProgrammes);
  const [pageHero, setPageHero] = useState<PageSeoData | null>(null);

  useEffect(() => {
    let active = true;
    getCareerProgrammes().then((data) => {
      if (active && data && data.length > 0) {
        setProgrammes(data);
      }
    });
    getPageSeo('careers').then((data) => {
      if (active && data) {
        setPageHero(data);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>Careers | Stein Scop Attorneys</title>
        <meta name="description" content="Join Stein Scop Attorneys — a high-performance commercial law firm in Sandton. We are looking for exceptional candidate attorneys, associates, and senior legal professionals." />
        <meta property="og:title" content="Careers | Stein Scop Attorneys" />
        <meta property="og:description" content="Build your legal career at Stein Scop Attorneys. Current openings for commercial associates and candidate attorneys in Sandton, Johannesburg." />
      </Helmet>
      {/* Hero */}
      <section className="pt-36 pb-12 px-6 md:px-12 lg:px-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">
              <Editable id="careers_hero_tag" defaultText={pageHero?.heroTag || "Opportunities"} />
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight italic">
              <Editable id="careers_hero_title" defaultText={pageHero?.heroTitle || "Join Our Legacy"} />
            </h1>
            <p className="text-xl font-light text-brand-primary/60 max-w-2xl leading-relaxed">
              <Editable id="careers_hero_desc" defaultText={pageHero?.heroSubtitle || "Build your professional future with a firm that values strategic thinking, commercial acumen, and relentless dedication to client outcomes."} />
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-14 px-12 lg:px-24 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif">
              <Editable id="careers_culture_title" defaultText="The Stein Scop Culture" />
            </h2>
            <p className="text-lg text-brand-primary/70 font-light leading-relaxed">
              <Editable id="careers_culture_desc" defaultText="We foster an environment of high performance and intellectual curiosity. Our team members work directly with senior directors on complex commercial matters, providing unparalleled growth opportunities for ambitious legal professionals." />
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <h4 className="text-sm uppercase tracking-widest font-bold text-brand-accent">Mentorship</h4>
                <p className="text-xs text-brand-primary/60">Direct oversight from industry-leading directors.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm uppercase tracking-widest font-bold text-brand-accent">Excellence</h4>
                <p className="text-xs text-brand-primary/60">A standard that defines every document we draft.</p>
              </div>
            </div>
          </div>
          <div className="bg-brand-primary p-12 rounded-2xl text-brand-cream space-y-12">
            <h3 className="text-3xl font-serif">Speculative Application</h3>
            <p className="text-brand-cream/60 font-light leading-relaxed">
              We are always looking for exceptional candidates at all levels, from candidate attorneys to senior associates. If you believe your skills align with our firm, reach out to our admissions team.
            </p>
            <a 
              href="mailto:admissions@steinscop.com?subject=Speculative%20Application%20-%20Stein%20Scop%20Attorneys" 
              className="career-apply btn inline-flex items-center gap-4 px-12 py-5 bg-brand-accent text-white uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:scale-105 transition-all shadow-xl"
              data-programme="speculative"
              data-application-type="email_direct"
            >
              Send Your CV <Send size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Graduate & Student Programmes */}
      <section className="py-16 lg:py-24 px-6 md:px-12 lg:px-24 bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent block mb-2">Graduate &amp; Student Recruitment</span>
              <h2 className="text-3xl md:text-5xl font-serif">Programmes &amp; Clerkship</h2>
            </div>
            <p className="text-brand-primary/40 text-sm font-mono italic">Sandton, Johannesburg</p>
          </div>
          
          <div className="space-y-8">
            {programmes.map((prog) => {
              const email = prog.admissionsEmail || 'admissions@steinscop.com';
              const subject = prog.emailSubject || `Application: ${prog.title}`;
              const body =
                prog.emailBody ||
                `Dear Admissions Team,\n\nPlease find attached my CV and full academic transcript for consideration for ${prog.title}.\n\nKind regards,`;
              const AudienceIcon = prog.audience?.toLowerCase().includes('student') ? GraduationCap : Briefcase;
              const programmeKey =
                prog.slug?.toLowerCase().includes('vac') || prog.title?.toLowerCase().includes('vacation')
                  ? 'vacation'
                  : 'articles';

              return (
                <div
                  key={prog.slug}
                  className="p-8 md:p-12 rounded-3xl border border-brand-border/80 bg-brand-cream/15 hover:border-brand-accent/40 transition-all duration-300 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-brand-border/60">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl md:text-3xl font-serif text-brand-primary">{prog.title}</h3>
                        {prog.statusBadge && (
                          <span className="px-3 py-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 text-[10px] uppercase font-bold tracking-wider rounded-full">
                            {prog.statusBadge}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-5 text-xs text-brand-primary/50 uppercase tracking-widest pt-1">
                        {prog.location && (
                          <span className="flex items-center gap-2">
                            <MapPin size={13} className="text-brand-accent" /> {prog.location}
                          </span>
                        )}
                        {prog.duration && (
                          <span className="flex items-center gap-2">
                            <Clock size={13} className="text-brand-accent" /> {prog.duration}
                          </span>
                        )}
                        {prog.audience && (
                          <span className="flex items-center gap-2">
                            <AudienceIcon size={13} className="text-brand-accent" /> {prog.audience}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        to={`/contact?type=careers&programme=${encodeURIComponent(prog.slug)}`}
                        className="career-apply btn inline-flex items-center gap-2.5 px-8 py-3.5 bg-brand-primary text-brand-cream text-[10px] uppercase tracking-[2px] font-bold rounded-full hover:bg-brand-accent transition-all duration-300 shadow-sm"
                        data-programme={programmeKey}
                        data-application-type="apply_now"
                      >
                        Apply Now <ArrowRight size={13} />
                      </Link>
                      <a
                        href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                        className="career-apply inline-flex items-center gap-2 px-6 py-3.5 border border-brand-border/80 text-brand-primary/70 hover:text-brand-primary hover:border-brand-accent text-[10px] uppercase tracking-[2px] font-bold rounded-full transition-all duration-300"
                        data-programme={programmeKey}
                        data-application-type="email_direct"
                      >
                        <Mail size={13} /> Email Direct
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3.5 max-w-4xl text-brand-primary/75 font-light leading-relaxed text-sm md:text-base">
                    {prog.notice && (
                      <p className="text-brand-primary/80 font-medium">{prog.notice}</p>
                    )}
                    <p>{formatDescriptionWithEmail(prog.description, email)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
