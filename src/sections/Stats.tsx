import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useRef } from 'react';

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, v => Math.round(v));
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, { duration: 2, ease: [0.16, 1, 0.3, 1] });
      return controls.stop;
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return rounded.on('change', v => {
      if (ref.current) ref.current.textContent = `${prefix}${v}${suffix}`;
    });
  }, [rounded, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const stats = [
  { value: 30, suffix: '+', label: 'Years of Combined Expertise', sub: 'Per founding director' },
  { value: 8, suffix: '', label: 'Expert Directors', sub: 'Directly on every matter' },
  { prefix: 'R', value: 2, suffix: 'bn+', label: 'In Transactions Advised', sub: 'Across all practice areas' },
  { value: 500, suffix: '+', label: 'Complex Matters Resolved', sub: 'Commercial litigation & advisory' },
];

export default function Stats() {
  return (
    <section className="bg-brand-primary py-14 lg:py-20 px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="bg-brand-primary p-10 lg:p-16 flex flex-col justify-between gap-8 group"
            >
              <div className="text-5xl md:text-7xl font-serif text-brand-cream leading-none group-hover:text-brand-accent transition-colors duration-500">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/80 leading-snug">{stat.label}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
