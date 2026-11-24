import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { Editable } from '../components/Editable';
import { directors, consultants, seniorAssociates, associates, candidateAttorneys, management, type TeamMember } from '../data/team';
import { getAttorneys, urlFor } from '../sanity';

const MemberCard = React.memo(function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 4) * 0.05, duration: 0.45, ease: 'easeOut' }}
      className="group flex flex-col p-3 rounded-2xl hover:bg-brand-cream/40 transition-colors duration-300"
    >
      {/* ── Photo ──────────────────────────────── */}
      <Link
        to={`/team/${member.id}`}
        className="team-member block relative aspect-[3/4] overflow-hidden mb-4 rounded-lg"
        data-member-name={member.name}
        data-member-role={member.title}
      >
        {member.hasNewPortrait ? (
          <img
            src={member.image}
            alt={`${member.name} - ${member.title}`}
            loading={index < 4 ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        ) : (
          <div
            className="ss-watermark-stage w-full h-full flex flex-col items-center justify-center relative select-none group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            style={{ background: 'radial-gradient(circle at 50% 40%, #8a7e68 0%, #6f6450 100%)' }}
          >
            <img
              src="/stein-scop-knight-watermark.png"
              alt={`${member.name} - Stein Scop Attorneys`}
              loading={index < 4 ? 'eager' : 'lazy'}
              decoding="async"
              width={161}
              height={260}
              className="ss-knight-spin w-20 h-auto opacity-[0.28]"
            />
            <span className="absolute bottom-3.5 text-[9px] uppercase tracking-[0.24em] font-semibold text-white/50">
              Portrait Forthcoming
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent flex items-end p-4 rounded-lg">
          <span className="flex items-center gap-1.5 text-white text-[9px] uppercase tracking-[2px] font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
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
        {member.practiceAreas.slice(0, 2).map((area) => {
          const cardLabel =
            area === 'Competition Law & Regulatory Matters' ? 'Competition Law' : area;
          return (
            <span
              key={area}
              className="px-2.5 py-1 border border-brand-primary/30 text-brand-primary text-[10px] uppercase tracking-wider rounded-full text-center leading-normal"
            >
              {cardLabel}
            </span>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-brand-border">
        <Link
          to={`/team/${member.id}`}
          className="team-member text-[10px] uppercase tracking-[2px] font-bold text-brand-primary/60 flex items-center gap-1.5 hover:text-brand-accent transition-colors duration-300"
          data-member-name={member.name}
          data-member-role={member.title}
        >
          View Profile <ArrowRight size={11} />
        </Link>
      </div>
    </motion.div>
  );
});

export default function TeamPage() {
  const [activeSection, setActiveSection] = useState('directors');
  const [searchQuery, setSearchQuery] = useState('');
  const [sanityMap, setSanityMap] = useState<Record<string, any>>({});
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchTracking = (value: string) => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    const query = value.trim();
    if (!query) return;
    searchTimer.current = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'site_search',
          search_term: query,
          page_path: window.location.pathname,
        });
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    let active = true;
    getAttorneys().then((data) => {
      if (!active || !Array.isArray(data)) return;
      const map: Record<string, any> = {};
      for (const item of data) {
        if (item.slug) map[item.slug] = item;
      }
      setSanityMap(map);
    });
    return () => {
      active = false;
    };
  }, []);

  const {
    liveDirectors,
    liveConsultants,
    liveSeniorAssociates,
    liveAssociates,
    liveCandidateAttorneys,
    liveManagement,
  } = useMemo(() => {
    const mergeWithSanity = (list: TeamMember[]): TeamMember[] =>
      list.map((m) => {
        const live = sanityMap[m.id];
        if (!live) return m;
        const sanityCroppedUrl = live.image ? urlFor(live.image)?.width(800).auto('format').quality(85).url() : null;
        return {
          ...m,
          name: live.name || m.name,
          title: live.title || m.title,
          qualifications: live.qualifications ?? m.qualifications,
          practiceAreas: live.practiceAreas?.length ? live.practiceAreas : m.practiceAreas,
          image: sanityCroppedUrl || live.imageUrl || m.image,
          hasNewPortrait: typeof live.hasNewPortrait === 'boolean' ? live.hasNewPortrait : m.hasNewPortrait,
        };
      });

    return {
      liveDirectors: mergeWithSanity(directors),
      liveConsultants: mergeWithSanity(consultants),
      liveSeniorAssociates: mergeWithSanity(seniorAssociates),
      liveAssociates: mergeWithSanity(associates),
      liveCandidateAttorneys: mergeWithSanity(candidateAttorneys),
      liveManagement: mergeWithSanity(management),
    };
  }, [sanityMap]);

  const teamSections = [
    { id: 'directors', label: 'Directors', data: liveDirectors },
    { id: 'consultants', label: 'Consultants', data: liveConsultants },
    { id: 'senior-associates', label: 'Senior Associates', data: liveSeniorAssociates },
    { id: 'associates', label: 'Associates', data: liveAssociates },
    { id: 'candidate-attorneys', label: 'Candidate Attorneys', data: liveCandidateAttorneys },
    { id: 'management', label: 'Management', data: liveManagement },
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

  const filteredDirectors = filterMembers(liveDirectors);
  const filteredConsultants = filterMembers(liveConsultants);
  const filteredSeniorAssociates = filterMembers(liveSeniorAssociates);
  const filteredAssociates = filterMembers(liveAssociates);
  const filteredCandidateAttorneys = filterMembers(liveCandidateAttorneys);
  const filteredManagement = filterMembers(liveManagement);

  const totalMatches = 
    filteredDirectors.length +
    filteredConsultants.length +
    filteredSeniorAssociates.length +
    filteredAssociates.length +
    filteredCandidateAttorneys.length +
    filteredManagement.length;

  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>Our Team | Stein Scop Attorneys</title>
        <meta name="description" content="Meet the directors, consultants, associates and candidate attorneys at Stein Scop Attorneys. Every matter is led by a director from instruction to conclusion." />
        <meta property="og:title" content="Our Team | Stein Scop Attorneys" />
        <meta property="og:description" content="Director-led legal team based in Sandton, Johannesburg. Meet Glenn Stein, Bradley Scop, and the full Stein Scop team." />
      </Helmet>
      
      {/* Hero section */}
      <section className="pt-36 pb-12 px-6 md:px-12 lg:px-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">
              <Editable id="team_header_tag" defaultText="The Team" />
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight italic">
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
              id="team-search"
              type="text"
              placeholder="Search experts by name, expertise, or title..."
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                handleSearchTracking(val);
              }}
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
            <div className="sticky top-[72px] z-30 bg-white border-b border-brand-border/60 py-4 mb-12 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24 flex gap-6 overflow-x-auto no-scrollbar select-none">
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
                  <h2 className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Directors
                  </h2>
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
                  <h2 className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Consultants
                  </h2>
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
                  <h2 className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Senior Associates
                  </h2>
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
                  <h2 className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Associates
                  </h2>
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
                  <h2 className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Candidate Attorneys
                  </h2>
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
                  <h2 className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
                    Management
                  </h2>
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
      <section className="py-12 md:py-16 bg-brand-primary text-brand-cream px-6 md:px-12 border-t border-white/10">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-cream">
            <Editable id="team_join_title" defaultText="Join a Team of Strategic Excellence" />
          </h2>
          <p className="text-brand-cream/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
            <Editable id="team_join_desc" defaultText="We are always looking for exceptional legal talent. If you have the drive and expertise to match our standards, we want to hear from you." />
          </p>
          <div className="pt-2">
            <a
              href="/careers"
              className="inline-block px-10 py-3.5 bg-brand-accent text-white uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:scale-105 transition-transform"
            >
              Explore Careers
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
