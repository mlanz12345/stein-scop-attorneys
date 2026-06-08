import { motion } from 'motion/react';
import { Editable } from '../components/Editable';

export default function Intro() {
  return (
    <section id="intro" className="bg-brand-cream py-14 lg:py-24 px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center text-brand-primary">
        {/* Left Side: Content */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold mb-6 block">
              <Editable id="intro_tag" defaultText="The Approach" />
            </span>
            <h2 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">
              <Editable id="intro_title_1" defaultText="Strategy" /> <br />
              <Editable id="intro_title_2" defaultText="Over Scale" className="italic" />
            </h2>
            <div className="w-12 h-px bg-brand-accent mb-12" />

            <div className="space-y-8 text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
              <p className="font-medium text-brand-primary">
                <Editable id="intro_sub" defaultText="Comprehensive Commercial Legal Excellence" />
              </p>
              <p className="text-brand-primary/70 text-lg">
                <Editable id="intro_desc" defaultText="Stein Scop Attorneys Inc. is a law firm conducting a comprehensive commercial legal practice covering all aspects of commercial law and litigation. Our experts are renowned for resolving difficult cases through superior strategy and outcomes." />
              </p>
            </div>

            <div className="mt-16">
              <a
                href="/about"
                className="inline-block px-10 py-4 border-2 border-brand-primary text-brand-primary uppercase tracking-[2px] text-[11px] font-bold rounded-full hover:bg-brand-primary hover:text-brand-cream transition-all duration-300"
              >
                More About Us
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Conference room with Ken Burns animation */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="aspect-[4/5] overflow-hidden rounded-t-[100px] md:rounded-t-[200px]">
            <img
              src="/chess.png"
              alt="Stein Scop strategic approach"
              className="w-full h-full object-cover ken-burns"
            />
          </div>
          <div className="absolute inset-0 border border-brand-primary/10 rounded-t-[100px] md:rounded-t-[200px] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
