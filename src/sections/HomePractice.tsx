const practices = [
  {
    id: 'corp_comm',
    title: 'Corporate and Commercial',
    desc: 'Advising on mergers and acquisitions, joint ventures, and complex commercial agreements. We provide strategic counsel for business structures and corporate governance across South Africa and the broader African continent.',
  },
  {
    id: 'litigation',
    title: 'Litigation and Dispute Resolution',
    desc: 'Renowned for resolving high-stakes commercial disputes. Our strategy-first approach ensures alignment with client commercial objectives during complex litigation across all South African High Courts, the Supreme Court of Appeal, and international arbitration forums.',
  },
  {
    id: 'banking',
    title: 'Banking and Finance',
    desc: 'Expertise in structured finance, regulatory compliance, and debt restructuring. We advise both lenders and borrowers — including leading financial institutions and development finance institutions — on sophisticated financial instruments and transactions.',
  },
  {
    id: 'property',
    title: 'Property and Conveyancing',
    desc: 'Comprehensive legal support for real estate developments, commercial property transfers, and zoning regulations in the Gauteng region and beyond. We provide full-cycle advisory from zoning approvals through to sectional title conveyancing.',
  },
  {
    id: 'insolvency',
    title: 'Insolvency and Restructuring',
    desc: 'Guiding distressed companies, creditors, and affected parties through the full spectrum of insolvency and restructuring proceedings — including business rescue, provisional and final liquidations, and judicial management.',
  },
  {
    id: 'employment',
    title: 'Employment and Labor',
    desc: 'Advising JSE-listed entities and private enterprises on executive appointments and terminations, restraint of trade, workforce restructuring, and representation in the CCMA and Labour Courts. We manage sensitive workforce issues with the discretion they demand.',
  },
];

export default function HomePractice() {
  return (
    <div>
      {/* Header */}
      <div className="bg-white py-14 px-12 lg:px-24 border-t border-brand-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif text-brand-primary">
              Featured Practice<br /><span className="italic">Areas</span>
            </h2>
          </div>
          <a
            href="/practice-areas"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold text-brand-primary hover:text-brand-accent transition-colors"
          >
            All Practice Areas &rarr;
          </a>
        </div>
      </div>

      {/* Sticky stack — each card slides over the previous */}
      {practices.map((p, i) => (
        <section
          key={p.id}
          className="sticky top-0 bg-white border-t border-black/15 px-12 lg:px-24 pt-10 pb-16"
          style={{ zIndex: i + 1 }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-brand-primary mb-6 leading-tight max-w-2xl">
              {p.title}
            </h2>
            <p className="text-base md:text-lg text-brand-primary/60 font-light leading-relaxed max-w-xl">
              {p.desc}
            </p>
            {i === practices.length - 1 && (
              <a
                href="/practice-areas"
                className="inline-block mt-10 px-8 py-3 border border-brand-primary/30 text-brand-primary text-[10px] uppercase tracking-[2px] font-bold rounded-full hover:border-brand-accent hover:text-brand-accent transition-all duration-300"
              >
                See All Practice Areas
              </a>
            )}
            {i < practices.length - 1 && (
              <p className="mt-8 text-[9px] uppercase tracking-[0.4em] text-brand-primary font-bold">
                Next — {practices[i + 1].title}
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
