import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Editable } from '../components/Editable';
import { directors, consultants, seniorAssociates, associates, candidateAttorneys, management, type TeamMember } from '../data/team';

function MemberCard({ member, index }: { member: TeamMember; index: number; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col"
    >
      {/* ── Photo ──────────────────────────────── */}
      <Link
        to={`/team/${member.id}`}
        className="block relative aspect-[3/4] overflow-hidden mb-4 bg-brand-primary/8"
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
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-brand-primary/70 via-transparent to-transparent flex items-end p-4">
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
            className="px-2.5 py-1 border border-brand-primary/30 text-brand-primary text-[10px] uppercase tracking-wider rounded-full whitespace-nowrap"
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
  return (
    <main className="pt-28 pb-14 bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>Our Team | Stein Scop Attorneys Inc.</title>
        <meta name="description" content="Meet the directors, consultants, associates and candidate attorneys at Stein Scop Attorneys Inc. Every matter is led by a director from instruction to conclusion." />
        <meta property="og:title" content="Our Team | Stein Scop Attorneys Inc." />
        <meta property="og:description" content="Director-led legal team based in Sandton, Johannesburg. Meet Glenn Stein, Bradley Scop, and the full Stein Scop team." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-12 lg:px-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-5 mb-14"
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

        {/* Directors */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
            Directors
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {directors.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Consultants */}
        <div className="mt-20 pt-14 border-t border-brand-border">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
            Consultants
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {consultants.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Senior Associates */}
        <div className="mt-20 pt-14 border-t border-brand-border">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
            Senior Associates
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {seniorAssociates.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Associates */}
        <div className="mt-20 pt-14 border-t border-brand-border">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
            Associates
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {associates.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Candidate Attorneys */}
        <div className="mt-20 pt-14 border-t border-brand-border">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
            Candidate Attorneys
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {candidateAttorneys.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Management */}
        <div className="mt-20 pt-14 border-t border-brand-border">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-bold mb-8">
            Management
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {management.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Join section */}
      <section className="mt-20 py-14 border-t border-brand-border px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary">
            <Editable id="team_join_title" defaultText="Join a Team of Strategic Excellence" />
          </h2>
          <p className="text-brand-primary/55 max-w-2xl mx-auto leading-relaxed font-light">
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
