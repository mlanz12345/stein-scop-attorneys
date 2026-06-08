import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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

const numVariants = {
  initial: (dir: number) => ({ y: dir * 40, opacity: 0 }),
  animate: { y: 0, opacity: 1 },
  exit:    (dir: number) => ({ y: dir * -40, opacity: 0 }),
};

export default function Results() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeIndexRef = useRef(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Use viewport coordinates so the trigger is always 15% below the
      // container's top edge — unaffected by positioning context quirks.
      const containerTop = container.getBoundingClientRect().top;
      const triggerY = containerTop + container.clientHeight * 0.15;

      // Last item whose top edge has crossed (or is at) the trigger line.
      let newIndex = 0;
      itemRefs.current.forEach((ref, i) => {
        if (!ref) return;
        if (ref.getBoundingClientRect().top <= triggerY) newIndex = i;
      });

      if (newIndex !== activeIndexRef.current) {
        setDirection(newIndex > activeIndexRef.current ? 1 : -1);
        activeIndexRef.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="results"
      style={{ background: '#000000', height: '100vh' }}
      className="text-white flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-12 lg:px-24 pt-28 pb-4 shrink-0">
        <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold block mb-4">
          <Editable id="results_tag" defaultText="Track Record" />
        </span>
        <h2
          className="text-5xl md:text-6xl font-serif text-white leading-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          <Editable id="results_title" defaultText="Proven Results" />
        </h2>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden px-12 lg:px-24">

        {/* Left — static number, clipped to column width */}
        <div className="hidden lg:flex w-[38%] shrink-0 items-start pt-6 overflow-hidden select-none">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.span
              key={activeIndex}
              custom={direction}
              variants={numVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
              className="block font-sans font-bold text-white leading-none"
              style={{ fontSize: 'clamp(5rem, 11vw, 11rem)', letterSpacing: '-0.04em' }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Right — scrollable records */}
        <div
          ref={scrollRef}
          className="w-full lg:w-[62%] overflow-y-auto no-scrollbar"
        >
          {cases.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="py-14 border-t border-white/[0.08] first:border-t-0"
            >
              {/* Mobile index */}
              <span className="block lg:hidden text-white/20 text-sm font-light tracking-widest mb-5">
                {String(i + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
              </span>

              {/* Tag + outcome */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[9px] uppercase tracking-[0.35em] text-white/30 font-medium">
                  {item.tag}
                </span>
                <span className="w-px h-3 bg-white/15" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-brand-accent font-medium">
                  {item.outcome}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                <Editable id={`result_title_${item.id}`} defaultText={item.title} />
              </h3>

              {/* Description */}
              <p className="text-sm text-white/40 font-light max-w-lg" style={{ lineHeight: 1.75 }}>
                <Editable id={`result_desc_${item.id}`} defaultText={item.desc} />
              </p>
            </div>
          ))}

          {/* Spacer so the last item can scroll past the trigger */}
          <div className="h-[40vh]" />
        </div>
      </div>
    </section>
  );
}
