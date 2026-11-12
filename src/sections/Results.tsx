import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Editable } from '../components/Editable';

const cases = [
  {
    id: 'litigation_1',
    tag: 'High Court Litigation',
    outcome: 'Landmark Settlement',
    title: 'R100m+ Shareholder Dispute',
    desc: 'Achieved a landmark settlement in a complex shareholder dispute in the Gauteng High Court, employing intricate valuation strategies to secure an outcome exceeding client expectations.',
  },
  {
    id: 'arbitration_1',
    tag: 'International Arbitration',
    outcome: 'Operational Rights Secured',
    title: 'Multi-Jurisdictional Mining Arbitration',
    desc: 'Successfully represented a global mining conglomerate across multiple jurisdictions, securing vital operational rights and resolving a dispute that threatened continental operations.',
  },
  {
    id: 'merger_1',
    tag: 'Corporate M&A',
    outcome: 'Acquisition Completed',
    title: 'Pan-African Fintech Acquisition',
    desc: 'Facilitated the cross-border acquisition of a leading pan-African fintech company, navigating complex multi-regulator approvals and competition law across three jurisdictions.',
  },
  {
    id: 'insolvency_1',
    tag: 'Business Rescue',
    outcome: '500+ Jobs Preserved',
    title: 'Major Retail Restructuring',
    desc: 'Guided a distressed retail group through a complex business rescue process, stabilising creditor relations and preserving over 500 jobs in a matter of months.',
  },
  {
    id: 'property_1',
    tag: 'Property & Conveyancing',
    outcome: 'Full-Cycle Advisory',
    title: 'R2bn Sandton Development',
    desc: 'Provided comprehensive legal advisory for a R2 billion mixed-use development in Sandton — from zoning and environmental approvals through to sectional title conveyancing.',
  },
  {
    id: 'employment_1',
    tag: 'Employment Law',
    outcome: 'Resolved in 60 Days',
    title: 'Executive Dismissal — JSE Entity',
    desc: 'Resolved a high-profile restraint of trade and executive dismissal matter for a JSE-listed entity with full discretion, avoiding costly Labour Court proceedings entirely.',
  },
];

function CaseCard({
  item,
  i,
  isLast,
  nextTitle,
}: {
  item: typeof cases[0];
  i: number;
  isLast: boolean;
  nextTitle?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this card relative to the top of the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  // Scale down slightly and dim as it gets covered by the next card
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  return (
    <div
      ref={cardRef}
      className="sticky top-0 bg-black border-t border-white/15 px-6 md:px-12 lg:px-24 pt-24 lg:pt-28 pb-20 lg:pb-24 origin-top"
      style={{ zIndex: i + 1 }}
    >
      <motion.div style={{ scale, opacity }} className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-16">
          {/* Large Numerals — reveals in crisp white as user scrolls to each section */}
          <div className="lg:w-1/4 shrink-0 overflow-hidden">
            <motion.span
              initial={i === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block font-sans font-bold text-white leading-none select-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
              style={{ fontSize: 'clamp(4.5rem, 9vw, 9rem)', letterSpacing: '-0.04em' }}
            >
              {String(i + 1).padStart(2, '0')}
            </motion.span>
          </div>

          {/* Case Content */}
          <div className="lg:w-3/4 flex-1">
            {/* Tag + Outcome */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-medium">
                {item.tag}
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-accent font-medium">
                {item.outcome}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-3xl md:text-5xl font-serif lining-nums text-white mb-6 leading-tight max-w-3xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              <Editable id={`result_title_${item.id}`} defaultText={item.title} />
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-2xl">
              <Editable id={`result_desc_${item.id}`} defaultText={item.desc} />
            </p>

            {/* Next or CTA */}
            {isLast ? (
              <Link
                to="/contact"
                className="btn inline-block mt-10 px-8 py-3 border border-brand-accent/50 text-brand-accent text-[10px] uppercase tracking-[2px] font-bold rounded-full hover:bg-brand-accent hover:text-brand-primary transition-all duration-300"
              >
                Discuss Your Matter &rarr;
              </Link>
            ) : (
              <p className="mt-10 text-[10px] uppercase tracking-[0.4em] text-brand-accent font-bold">
                Next — {nextTitle}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Results() {
  return (
    <section id="results" className="relative bg-black text-white">
      {/* Header */}
      <div className="bg-black py-16 lg:py-20 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold block mb-4">
              <Editable id="results_tag" defaultText="Track Record" />
            </span>
            <h2
              className="text-5xl md:text-7xl font-serif text-white leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              <Editable id="results_title" defaultText="Proven Results" />
            </h2>
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/40">
            Selected Case Outcomes
          </span>
        </div>
      </div>

      {/* Sticky stacking cards — each card slides over the previous with progressive depth transitions */}
      {cases.map((item, i) => (
        <CaseCard
          key={item.id}
          item={item}
          i={i}
          isLast={i === cases.length - 1}
          nextTitle={i < cases.length - 1 ? cases[i + 1].title : undefined}
        />
      ))}
    </section>
  );
}
