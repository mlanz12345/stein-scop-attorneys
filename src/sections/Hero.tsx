import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Editable } from '../components/Editable';
import VideoBackground from '../components/VideoBackground';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden bg-brand-primary text-brand-cream">
      {/* Dynamic Background Video - Requested by User */}
      <VideoBackground 
        src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8"
        overlayOpacity={0.6}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-12 lg:px-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-accent mb-6 block font-bold">
              <Editable id="hero_tag" defaultText="Stein Scop Attorneys Inc" />
            </span>
            <h1 className="font-serif font-normal leading-[1.05] mb-8" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)' }}>
              <Editable id="hero_title_main" defaultText="Strategic Commercial" /><br />
              <span className="italic">
                <Editable id="hero_title_sub" defaultText="Law Practice" />
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col gap-8 max-w-lg"
          >
            <p className="text-base leading-relaxed text-brand-cream/70 font-light">
              <Editable id="hero_desc" defaultText="A unique South African legal practice resolving difficult cases with strategic precision." />
            </p>

            <a
              href="/practice-areas"
              className="inline-block w-fit px-10 py-4 border border-white/25 text-white uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:border-brand-accent hover:text-brand-accent transition-all duration-500"
            >
              Practise Areas
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[18px] h-[30px] rounded-full border border-white/20 flex justify-center p-1.5">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-brand-accent" 
          />
        </div>
        <span className="text-[8px] uppercase tracking-[0.25em] text-white/40 font-bold font-sans">Scroll</span>
      </motion.div>
    </section>
  );
}
