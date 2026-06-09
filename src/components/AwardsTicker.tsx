import { motion } from 'motion/react';

const items = [
  'Chambers & Partners Ranked',
  'Best Law Firms — Commercial',
  'Legal 500 Recommended',
  'African Legal Awards Finalist',
  'JSE Advisory Excellence',
  'Top M&A Law Firm · South Africa',
  'Business Rescue Specialists',
  'Chambers & Partners Ranked',
  'Best Law Firms — Commercial',
  'Legal 500 Recommended',
  'African Legal Awards Finalist',
  'JSE Advisory Excellence',
  'Top M&A Law Firm · South Africa',
  'Business Rescue Specialists',
];

export default function AwardsTicker() {
  return (
    <div className="relative bg-brand-accent py-5 overflow-hidden border-y border-brand-accent/50">
      {/* Edge blending gradients to smoothly fade entering/exiting items */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-accent via-brand-accent/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-accent via-brand-accent/70 to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap gap-0"
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-10 text-[10px] uppercase tracking-[0.35em] text-white font-bold px-8">
            {item}
            <span className="inline-block w-1 h-1 rounded-full bg-white/40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
