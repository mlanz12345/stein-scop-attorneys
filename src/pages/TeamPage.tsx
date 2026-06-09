import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { Editable } from '../components/Editable';
import { directors, consultants, seniorAssociates, associates, candidateAttorneys, management, type TeamMember } from '../data/team';

function MemberCard({ member, index }: { member: TeamMember; index: number; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col p-4 rounded-2xl border border-transparent hover:border-brand-accent/20 hover:bg-brand-cream/30 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {/* ── Photo ──────────────────────────────── */}
      <Link
        to={`/team/${member.id}`}
        className="block relative aspect-[3/4] overflow-hidden mb-4 bg-brand-primary/8 rounded-lg"
      >
        {/* Curtain reveal: motion.div clips the img from bottom to top */}
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 + 0.1, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
          />
        </motion.div>

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-brand-primary/70 via-transparent to-transparent flex items-end p-4 rounded-lg">
          <span className="flex items-center gap-1.5 text-white text-[9px] uppercase tracking-[2px] font-bold translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            View Profile <ArrowRight size={10} />
          </span>
        </div>
      </Link>

      {/* ── Text ───────────────────────────────── */}
      <div className="mb-3 space-y-1">
        <h3 className="text-base font-semibold text-brand-primary leading-snug tracking-[-0.01em]">
          <Editable id={`team_name_${member.id}`} defaultText={member.name} />
        </h3>
        <p className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-bold">
          <Editable id={`team_title_${member.id}`} defaultText={member.title} />
        </p>
        <p className="text-[11px] text-brand-primary/70 font-mono tracking-wide">
          {member.qualifications}
        </p>
      </div>

      {/* Up to 2 practice tags */}
      <div className="flex flex-wrap gap-1.5 mb-auto">
        {member.practiceAreas.slice(0, 2).map((area) => (
          <span
            key={area}
            className="px-2.5 py-1 border border-brand-primary/30 text-brand-primary text-[10px] uppercase tracking-wider rounded-full text-center leading-normal"
          >
            {area}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-brand-border">
        <Link
          to={`/team/${member.id}`}
          className="text-[10px] uppercase tracking-[2px] font-bold text-brand-primary/60 flex items-center gap-1.5 hover:text-brand-accent transition-colors duration-300"
        >
          View Profile <ArrowRight size={11} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const [activeSection, setActiveSection] = useState('directors');
  const [searchQuery, setSearchQuery] = useState('');

  const teamSections = [
    { id: 'directors', label: 'Directors', data: directors },
    { id: 'consultants', label: 'Consultants', data: consultants },
    { id: 'senior-associates', label: 'Senior Associates', data: seniorAssociates },
    { id: 'associates', label: 'Associates', data: associates },
    { id: 'candidate-attorneys', label: 'Candidate Attorneys', data: candidateAttorneys },
    { id: 'management', label: 'Management', data: management },
  ];

  useEffect(() => {
    if (searchQuery) return; // Disable observer if search is active

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-120px 0px -60% 0px' } // Fits top-[72px] navbar + scroll target offset
    );

    teamSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [searchQuery]);

  // Search filtering logic
  const filterMembers = (list: TeamMember[]) => {
    if (!searchQuery) return list;
    const query = searchQuery.toLowerCase();
    return list.filter((member) => 
      member.name.toLowerCase().includes(query) ||
      member.title.toLowerCase().includes(query) ||
      member.qualifications.toLowerCase().includes(query) ||
      member.practiceAreas.some(area => area.toLowerCase().includes(query))
    );
  };

  const filteredDirectors = filterMembers(directors);
  const filteredConsultants = filterMembers(consultants);
  const filteredSeniorAssociates = filterMembers(seniorAssociates);
  const filteredAssociates = filterMembers(associates);
  const filteredCandidateAttorneys = filterMembers(candidateAttorneys);
  const filteredManagement = filterMembers(management);

  const totalMatches = 
    filteredDirectors.length +
    filteredConsultants.length +
    filteredSeniorAssociates.length +
    filteredAssociates.length +
    filteredCandidateAttorneys.length +
    filteredManagement.length;

  return (
    <main className="pt-28 bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>Our Team | Stein Scop Attorneys Inc.</title>
        <meta name="description" content="Meet the directors, consultants, associates and candidate attorneys at Stein Scop Attorneys Inc. Every matter is led by a director from instruction to conclusion." />
        <meta property="og:title" content="Our Team | Stein Scop Attorneys Inc." />
        <meta property="og:description" content="Director-led legal team based in Sandton, Johannesburg. Meet Glenn Stein, Bradley Scop, and the full Stein Scop team." />
      </Helmet>
      
      {/* Hero section */}
      <section className="pb-12 px-6 md:px-12 lg:px-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-5"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">
              <Editable id="team_header_tag" defaultText="The Team" />
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight">
              <Editable id="team_header_title" defaultText="Our Experts" />
            </h1>
            <p className="text-xl font-light text-brand-primary/60 max-w-2xl leading-relaxed">
              <Editable id="team_header_desc" defaultText="Every matter is led by a Director. Our team are renowned for resolving difficult cases through superior strategy and unwavering dedication to client outcomes." />
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Grid section */}
      <section className="bg-white border-t border-brand-border py-14 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Search bar */}
          <div className="relative max-w-md mb-12">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-primary/45">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search experts by name, expertise, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white border border-brand-border rounded-full text-sm font-light text-brand-primary placeholder-brand-primary/45 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-brand-primary/40 hover:text-brand-accent transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sticky Sub-Navigation */}
          {!searchQuery && (
            <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-brand-border/60 py-4 mb-12 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24 flex gap-6 overflow-x-auto no-scrollbar select-none">
              {teamSections.map((sec) => {
                const hasMembers = sec.data.length > 0;
                if (!hasMembers) return null;
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className={`text-xs uppercase tracking-[2px] font-bold whitespace-nowrap transition-colors duration-300 border-b-2 pb-2 ${
                      isActive
                        ? 'text-brand-accent border-brand-accent'
                        : 'text-brand-primary/50 border-transparent hover:text-brand-primary hover:border-brand-primary/20'
                    }`}
                  >
                    {sec.label}
                  </a>
                );
              })}
            </div>
          )}

          {/* Filtered Content Sections */}
          {totalMatches > 0 ? (
            <div className="space-y-20">
              {/* Directors */}
              {filteredDirectors.length > 0 && (
                <div id="directors" className="scroll-mt-28">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Directors
                  </p>
                  <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {filteredDirectors.map((member, i) => (
                      <MemberCard key={member.id} member={member} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Consultants */}
              {filteredConsultants.length > 0 && (
                <div id="consultants" className="scroll-mt-28 pt-14 border-t border-brand-border">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Consultants
                  </p>
                  <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {filteredConsultants.map((member, i) => (
                      <MemberCard key={member.id} member={member} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Senior Associates */}
              {filteredSeniorAssociates.length > 0 && (
                <div id="senior-associates" className="scroll-mt-28 pt-14 border-t border-brand-border">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Senior Associates
                  </p>
                  <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {filteredSeniorAssociates.map((member, i) => (
                      <MemberCard key={member.id} member={member} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Associates */}
              {filteredAssociates.length > 0 && (
                <div id="associates" className="scroll-mt-28 pt-14 border-t border-brand-border">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Associates
                  </p>
                  <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {filteredAssociates.map((member, i) => (
                      <MemberCard key={member.id} member={member} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Candidate Attorneys */}
              {filteredCandidateAttorneys.length > 0 && (
                <div id="candidate-attorneys" className="scroll-mt-28 pt-14 border-t border-brand-border">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Candidate Attorneys
                  </p>
                  <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {filteredCandidateAttorneys.map((member, i) => (
                      <MemberCard key={member.id} member={member} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {/* Management */}
              {filteredManagement.length > 0 && (
                <div id="management" className="scroll-mt-28 pt-14 border-t border-brand-border">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Management
                  </p>
                  <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {filteredManagement.map((member, i) => (
                      <MemberCard key={member.id} member={member} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24 space-y-4">
              <p className="text-lg font-serif text-brand-primary/60">
                No legal experts found matching "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs uppercase tracking-widest font-bold text-brand-accent hover:underline"
              >
                Clear Search Query
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Join section */}
      <section className="py-20 bg-brand-primary text-brand-cream px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-cream">
            <Editable id="team_join_title" defaultText="Join a Team of Strategic Excellence" />
          </h2>
          <p className="text-brand-cream/70 max-w-2xl mx-auto leading-relaxed font-light">
            <Editable id="team_join_desc" defaultText="We are always looking for exceptional legal talent. If you have the drive and expertise to match our standards, we want to hear from you." />
          </p>
          <a
            href="/careers"
            className="inline-block px-12 py-4 bg-brand-accent text-white uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:scale-105 transition-transform"
          >
            Explore Careers
          </a>
        </div>
      </section>
    </main>
  );
}
