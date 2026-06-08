import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Editable } from '../components/Editable';
import { Send, MapPin, Clock, Briefcase } from 'lucide-react';

export default function CareersPage() {
  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>Careers | Stein Scop Attorneys Inc.</title>
        <meta name="description" content="Join Stein Scop Attorneys Inc. — a high-performance commercial law firm in Sandton. We are looking for exceptional candidate attorneys, associates, and senior legal professionals." />
        <meta property="og:title" content="Careers | Stein Scop Attorneys Inc." />
        <meta property="og:description" content="Build your legal career at Stein Scop Attorneys. Current openings for commercial associates and candidate attorneys in Sandton, Johannesburg." />
      </Helmet>
      {/* Hero */}
      <section className="pt-36 pb-12 px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">
              <Editable id="careers_hero_tag" defaultText="Opportunities" />
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight italic">
              <Editable id="careers_hero_title" defaultText="Join Our Legacy" />
            </h1>
            <p className="text-xl md:text-2xl font-light text-brand-primary/70 max-w-3xl leading-relaxed">
              <Editable id="careers_hero_desc" defaultText="Build your professional future with a firm that values strategic thinking, commercial acumen, and relentless dedication to client outcomes." />
            </p>
            <div className="w-24 h-1 bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-14 px-12 lg:px-24 border-t border-brand-border">
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
            <p className="text-brand-cream/60 font-light">
              We are always looking for exceptional candidates at all levels, from candidate attorneys to senior associates. If you believe your skills align with our firm, reach out to us.
            </p>
            <a 
              href="mailto:careers@steinscop.com" 
              className="inline-flex items-center gap-4 px-12 py-5 bg-brand-accent text-white uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:scale-105 transition-all shadow-xl"
            >
              Send Your CV <Send size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Current Openings Placeholder */}
      <section className="py-14 px-12 lg:px-24 bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-serif">Current Openings</h2>
            <p className="text-brand-primary/40 text-sm font-mono italic">Sandton, Johannesburg</p>
          </div>
          
          <div className="space-y-12">
             <div className="relative group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 py-8 border-b border-brand-border group-hover:px-4 transition-all duration-300">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif">Commercial Associate</h3>
                    <div className="flex gap-6 text-xs text-brand-primary/40 uppercase tracking-widest">
                       <span className="flex items-center gap-2"><MapPin size={12} /> Sandton</span>
                       <span className="flex items-center gap-2"><Clock size={12} /> Full-time</span>
                       <span className="flex items-center gap-2"><Briefcase size={12} /> 3-5 Years PQE</span>
                    </div>
                  </div>
                  <a href="/contact" className="px-8 py-3 border border-brand-primary rounded-full text-[10px] uppercase tracking-widest font-bold group-hover:bg-brand-primary group-hover:text-white transition-all">
                    Apply Now
                  </a>
                </div>
             </div>

             <div className="relative group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 py-8 border-b border-brand-border group-hover:px-4 transition-all duration-300">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif">Candidate Attorney (2026)</h3>
                    <div className="flex gap-6 text-xs text-brand-primary/40 uppercase tracking-widest">
                       <span className="flex items-center gap-2"><MapPin size={12} /> Sandton</span>
                       <span className="flex items-center gap-2"><Clock size={12} /> Contract</span>
                       <span className="flex items-center gap-2"><Briefcase size={12} /> Law Degree</span>
                    </div>
                  </div>
                  <a href="/contact" className="px-8 py-3 border border-brand-primary rounded-full text-[10px] uppercase tracking-widest font-bold group-hover:bg-brand-primary group-hover:text-white transition-all">
                    Apply Now
                  </a>
                </div>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
