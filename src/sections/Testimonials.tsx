import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: 'Stein Scop navigated an extraordinarily complex cross-border acquisition for us with a level of precision that ultimately saved the deal. Their Directors were personally involved from term sheet to closing — that seniority made the difference.',
    author: 'Chief Executive Officer',
    role: 'Pan-African Fintech — M&A Client',
    detail: 'Cross-border acquisition · Three jurisdictions',
  },
  {
    id: 2,
    quote: 'When we faced a R100m+ shareholder dispute, we needed more than legal representation — we needed a strategic partner who understood the commercial stakes. Stein Scop delivered a settlement outcome that exceeded every benchmark we had set.',
    author: 'Chief Financial Officer',
    role: 'JSE-Listed Entity — Commercial Litigation',
    detail: 'Gauteng High Court · Settled in 4 months',
  },
  {
    id: 3,
    quote: 'Their insolvency team guided our business through rescue proceedings with exceptional care for every stakeholder — employees, creditors, and shareholders alike. A world-class firm operating at the highest standard of South African commercial law.',
    author: 'Managing Director',
    role: 'National Retail Group — Business Rescue',
    detail: 'Chapter 6 rescue · 500+ jobs preserved',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(c => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent(c => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-brand-cream py-14 lg:py-24 px-12 lg:px-24 border-t border-brand-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: label + controls */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">Client Voices</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-primary leading-tight">
              What Our<br /><span className="italic">Clients Say</span>
            </h2>
            <div className="w-12 h-px bg-brand-accent" />
            <div className="flex gap-4 pt-8">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-14 h-14 rounded-full border border-brand-primary/20 flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-all duration-300 text-brand-primary"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-14 h-14 rounded-full border border-brand-primary/20 flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-all duration-300 text-brand-primary"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex gap-2 pt-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-0.5 transition-all duration-500 ${i === current ? 'w-8 bg-brand-accent' : 'w-4 bg-brand-primary/20'}`}
                />
              ))}
            </div>
          </div>

          {/* Right: quote card */}
          <div className="lg:col-span-8 relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-12 lg:p-16 border border-brand-border shadow-sm relative"
              >
                <Quote className="absolute top-8 right-10 w-12 h-12 text-brand-accent/10" />
                <blockquote className="text-xl md:text-2xl font-serif text-brand-primary leading-relaxed mb-10 italic">
                  "{testimonials[current].quote}"
                </blockquote>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-px bg-brand-accent mt-3 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-brand-primary">{testimonials[current].author}</p>
                    <p className="text-[10px] uppercase tracking-widest text-brand-accent mt-1">{testimonials[current].role}</p>
                    <p className="text-[10px] text-brand-primary/35 mt-2 font-mono">{testimonials[current].detail}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
