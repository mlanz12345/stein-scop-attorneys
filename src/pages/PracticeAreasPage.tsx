import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { Editable } from '../components/Editable';

const practices = [
  {
    id: 'mergers',
    tag: 'Mergers & Acquisitions',
    title: 'Mergers and Acquisitions',
    desc: 'Including due diligence investigations, acquisitions and disposals, shareholders\' agreements, restructuring, joint ventures, management buy-outs, schemes of arrangements and general corporate transactions.',
    img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800',
    detail: 'Due Diligence · Acquisitions · Joint Ventures',
  },
  {
    id: 'deal_structuring',
    tag: 'Corporate Law',
    title: 'Deal and Transaction Structuring',
    desc: 'Including business structures, commercial contracts and agreements, corporate reorganisation, due diligence investigations, assets, shares and business sales and purchases, corporate restructuring, drafting, negotiating and reviewing all forms of commercial and business contracts.',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    detail: 'Commercial Contracts · Restructuring · Drafting',
  },
  {
    id: 'security',
    tag: 'Securities Law',
    title: 'Security',
    desc: 'Including advising on compliance with securities laws and disclosure, public and private offerings of equity and debt securities and dealings with oversight bodies.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    detail: 'Securities · Equity · Debt Offerings',
  },
  {
    id: 'insolvency',
    tag: 'Insolvency',
    title: 'Insolvency and Business Rescue',
    desc: 'Including restructuring advice (including advising on filing for business rescue, the appointment of business rescue practitioners and overseeing the business rescue process), instituting and opposing liquidation proceedings and advising stakeholders, directors, employees and creditors.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    detail: 'Business Rescue · Liquidation · Creditors',
  },
  {
    id: 'dispute',
    tag: 'Litigation',
    title: 'Dispute Resolution and Litigation',
    desc: 'Including all commercial disputes, insolvency related litigation, media litigation, debt collection, banking litigation, cross-border litigation, intellectual property-related disputes, administrative matters and constitutional litigation.',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    detail: 'Commercial Disputes · Cross-Border · IP',
  },
  {
    id: 'antitrust',
    tag: 'Competition Law',
    title: 'Antitrust and Competition',
    desc: 'Including competition compliance and risk management, mergers, investigations and referrals and compliance matters.',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    detail: 'Competition Compliance · Mergers · Investigations',
  },
  {
    id: 'comms',
    tag: 'Technology & Media',
    title: 'Communications, Media, Technology and Telecommunications',
    desc: 'Including advising on licensing and regulatory compliance, assisting in dealing with the Independent Communications Authority of South Africa, the competition authorities and the civil courts, media-related contracts, media disputes, IT contracts and telecommunication-related contracts.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    detail: 'ICASA · Media Contracts · IT Law',
  },
  {
    id: 'mining',
    tag: 'Mining Law',
    title: 'Mining',
    desc: 'Including advising on regulatory and compliance matters, banking and finance, mergers and acquisitions and due diligence investigations.',
    img: '/mining-law.jpg',
    detail: 'Regulatory · M&A · Due Diligence',
  },
  {
    id: 'employment',
    tag: 'Employment Law',
    title: 'Employment and Labour',
    desc: 'Including drafting and reviewing employment agreements, policies and procedures, litigation and private dispute resolution, M&A employment related issues.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    detail: 'Employment Agreements · CCMA · Labour Court',
  },
];

export default function PracticeAreasPage() {
  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>Practice Areas | Stein Scop Attorneys Inc.</title>
        <meta name="description" content="Stein Scop Attorneys advises across M&A, commercial litigation, employment & labour, insolvency & business rescue, competition law, mining law, securities law, and communications & technology." />
        <meta property="og:title" content="Practice Areas | Stein Scop Attorneys Inc." />
        <meta property="og:description" content="Expert legal counsel across M&A, litigation, employment, insolvency, competition, mining, securities, and technology law in South Africa." />
      </Helmet>

      {/* Hero */}
      <section className="pt-36 pb-12 px-12 lg:px-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">
              <Editable id="practice_hero_tag" defaultText="Specializations" />
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight italic">
              <Editable id="practice_hero_title" defaultText="Our Practice" />
            </h1>
            <p className="text-xl font-light text-brand-primary/60 max-w-2xl leading-relaxed">
              <Editable id="practice_hero_desc" defaultText="Stein Scop Attorneys Inc. provides end-to-end legal solutions across the entire commercial spectrum, driven by deep market insight." />
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Cards — same format as Insights */}
      <section className="bg-white py-14 lg:py-24 px-12 lg:px-24 border-t border-brand-border">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold mb-4 block">Practice Areas</span>
              <h2 className="text-5xl md:text-7xl font-serif text-brand-primary">
                Areas of<br /><span className="italic">Expertise</span>
              </h2>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] font-bold text-brand-primary hover:text-brand-accent transition-colors group"
            >
              Consult Our Team
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {practices.map((practice, i) => (
              <motion.article
                key={practice.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-video overflow-hidden mb-8 relative">
                  <img
                    src={practice.img}
                    alt={practice.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold bg-brand-accent text-white px-3 py-1.5">
                      {practice.tag}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-brand-primary/30">
                    <span>Commercial Law</span>
                    <span>{practice.detail}</span>
                  </div>
                  <h3 className="text-xl font-serif text-brand-primary leading-snug group-hover:text-brand-accent transition-colors duration-300">
                    <Editable id={`practice_title_${practice.id}`} defaultText={practice.title} />
                  </h3>
                  <p className="text-sm text-brand-primary/60 font-light leading-relaxed">
                    <Editable id={`practice_desc_${practice.id}`} defaultText={practice.desc} />
                  </p>
                  <a
                    href="/contact"
                    className="pt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent group-hover:gap-3 transition-all duration-300"
                  >
                    Consult an Expert <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-14 px-12 lg:px-24 bg-brand-primary text-brand-cream">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-serif leading-tight">
            <Editable id="practice_why_title" defaultText="Why Prominent Firms" /><br />
            <span className="italic">
              <Editable id="practice_why_title_2" defaultText="Choose Us" />
            </span>
          </h2>
          <p className="text-brand-cream/70 text-lg md:text-xl font-light leading-relaxed">
            <Editable id="practice_why_desc" defaultText="We don't just quote the law; we apply it strategically to protect your interests. Our directors are directly involved in every matter, providing a level of seniority and insight that larger firms often delegate." />
          </p>
        </div>
      </section>
    </main>
  );
}
