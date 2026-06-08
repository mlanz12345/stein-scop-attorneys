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
    <div className="bg-brand-accent py-5 overflow-hidden border-y border-brand-accent/50">
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
