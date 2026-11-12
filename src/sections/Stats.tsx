import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, v => Math.round(v));
  // Use amount: 0.1 so it triggers reliably on mobile viewports as well as desktop
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return rounded.on('change', v => {
      if (ref.current) ref.current.textContent = `${prefix}${v}${suffix}`;
    });
  }, [rounded, prefix, suffix]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

const stats = [
  { value: 30, suffix: '+', label: 'Years of Combined Expertise', sub: 'Per founding director' },
  { value: 8, suffix: '', label: 'Expert Directors', sub: 'Directly on every matter' },
  { prefix: 'R', value: 2, suffix: 'bn+', label: 'In Transactions Advised', sub: 'Across all practice areas' },
  { value: 500, suffix: '+', label: 'Complex Matters Resolved', sub: 'Commercial litigation & advisory' },
];

export default function Stats() {
  return (
    <section className="bg-black py-14 lg:py-20 px-6 md:px-12 lg:px-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y border-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-8 group hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle top ambient indicator on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              {/* Glowing base slider expanding on card hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="flex items-baseline font-serif lining-nums text-brand-cream group-hover:text-brand-accent transition-colors duration-500">
                {stat.prefix && (
                  <span className="text-3xl md:text-4xl font-sans font-light text-brand-accent mr-1 tracking-tight select-none">
                    {stat.prefix}
                  </span>
                )}
                <span className="text-5xl md:text-7xl leading-none">
                  <AnimatedNumber value={stat.value} />
                </span>
                {stat.suffix && (
                  <span className="text-2xl md:text-3xl font-sans font-light text-brand-accent ml-1 tracking-tight select-none">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/90 leading-snug group-hover:text-white transition-colors">
                  {stat.label}
                </p>
                <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-white/55">
                  {stat.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
