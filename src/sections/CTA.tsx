import { motion } from 'motion/react';
import { Editable } from '../components/Editable';

export default function CTA() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-primary">

      {/* Background video - Reset to original natural speed */}
      <video
        src="/new.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-primary/55" />

      {/* Content */}
      <div className="relative z-10 text-center px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          <h2 className="text-4xl md:text-6xl font-serif italic text-brand-cream leading-tight tracking-tight">
            <Editable id="cta_title_1" defaultText="Secure Your Commercial Future." />
          </h2>

          <div className="max-w-xl mx-auto space-y-8">
            <p className="text-lg md:text-xl text-brand-cream/80 font-light leading-relaxed">
              <Editable id="cta_desc" defaultText="Reach out to Stein Scop Attorneys Inc. for expert commercial counsel and superior litigation strategy." />
            </p>
            <a
              href="/contact"
              className="inline-block px-12 py-6 bg-brand-accent text-white uppercase tracking-[3px] text-[10px] font-bold rounded-full hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl relative overflow-hidden group"
            >
              {/* Sliding glass reflection sheen effect on hover */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:animate-sheen pointer-events-none" />
              <span className="relative z-10">Contact Our Team</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
