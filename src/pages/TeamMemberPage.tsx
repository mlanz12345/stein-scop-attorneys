import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';
import { allMembers } from '../data/team';

function splitBio(bio: string): string[] {
  const sentences = bio.match(/[^.!?]+[.!?]+/g) ?? [bio];
  const mid = Math.ceil(sentences.length / 2);
  return [
    sentences.slice(0, mid).join('').trim(),
    sentences.slice(mid).join('').trim(),
  ].filter(Boolean);
}

export default function TeamMemberPage() {
  const { id } = useParams<{ id: string }>();
  const member = allMembers.find((m) => m.id === id);

  if (!member) {
    return (
      <main className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-brand-primary/40 uppercase tracking-widest text-xs">Profile not found</p>
          <Link to="/team" className="text-brand-accent underline text-sm">Back to Team</Link>
        </div>
      </main>
    );
  }

  const [firstPara, secondPara] = splitBio(member.bio);

  return (
    <main className="min-h-screen flex flex-col">

      {/* ── Hero split ──────────────────────────────────────────────── */}
      <section
        className="flex flex-col md:flex-row min-h-[614px] relative overflow-hidden mt-[100px]"
        style={{ background: '#0a111a' }}
      >
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center relative z-10"
        >
          <p className="text-brand-accent text-xs tracking-[0.3em] font-semibold uppercase mb-4">
            {member.title}
          </p>

          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6">
            {member.name}
          </h1>

          <p className="text-white/40 text-sm tracking-widest uppercase mb-8">
            {member.qualifications}
          </p>

          <div className="w-12 h-px bg-white/20 mb-8" />

          <div className="flex flex-wrap gap-3 mb-12">
            {member.practiceAreas.map((area) => (
              <span
                key={area}
                className="px-4 py-1.5 rounded-full border border-white/20 text-xs tracking-wider text-white/60 uppercase hover:border-brand-accent transition-colors cursor-default"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/45">
            <a href={`mailto:${member.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} /> {member.email}
            </a>
            <a href="tel:+27113808080"
              className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} /> +27 (0)11 380 80 80
            </a>
          </div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="w-full md:w-1/2 relative min-h-[400px] bg-white"
        >
          <img
            src={member.image}
            alt={`Portrait of ${member.name}`}
            className="absolute inset-0 w-full h-full object-contain object-center"
          />
        </motion.div>
      </section>

      {/* ── Bio ─────────────────────────────────────────────────────── */}
      <section className="bg-brand-cream py-24 px-8 md:px-24 flex flex-col md:flex-row gap-12 flex-grow">
        <div className="w-full md:w-1/4 pt-1">
          <p className="text-brand-accent text-xs tracking-[0.2em] font-semibold uppercase sticky top-28">
            Profile
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-3/4 max-w-4xl space-y-6"
        >
          <p className="text-lg md:text-xl text-brand-primary font-normal leading-relaxed">
            {firstPara}
          </p>
          {secondPara && (
            <p className="text-base text-brand-primary/60 font-light leading-relaxed">
              {secondPara}
            </p>
          )}

          <div className="flex gap-4 pt-6 border-t border-brand-border">
            <a
              href={`mailto:${member.email}`}
              className="px-8 py-4 bg-brand-primary text-brand-cream uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:bg-brand-accent transition-all duration-500"
            >
              Send an Email
            </a>
            <Link
              to="/team"
              className="px-8 py-4 border border-brand-border text-brand-primary uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:border-brand-accent hover:text-brand-accent transition-all duration-500"
            >
              All Attorneys
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
