import { motion } from 'motion/react';
import { Gavel, Scale, Users, FileText, Globe, Landmark } from 'lucide-react';
import { Editable } from '../components/Editable';

const expertises = [
  {
    id: "strategic_litigation",
    title: "Strategic Commercial Litigation",
    desc: "Resolving complex commercial disputes with high-stakes precision and innovative legal strategies."
  },
  {
    id: "corporate_advisory",
    title: "Comprehensive Corporate Advisory",
    desc: "Guiding businesses through mergers, acquisitions, and regulatory compliance with commercial foresight."
  },
  {
    id: "insolvency_rescue",
    title: "Insolvency & Business Rescue",
    desc: "Providing expert navigation through distress, debt restructuring, and turnaround management."
  },
  {
    id: "banking_finance",
    title: "Banking & Finance Law",
    desc: "Advising on structured finance, asset-based lending, and intricate financial regulatory matters."
  },
  {
    id: "property_conveyancing",
    title: "Commercial Property & Conveyancing",
    desc: "Full-service real estate legal support for large-scale developments and property transactions."
  },
  {
    id: "employment_compliance",
    title: "Employment & Labor Compliance",
    desc: "Mitigating workforce risk through strategic counsel and efficient dispute resolution."
  }
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-24 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold mb-4 block">
              <Editable id="expertise_tag" defaultText="Our Approach" />
            </span>
            <h2 className="text-5xl md:text-7xl font-serif mb-6 text-brand-primary">
              <Editable id="expertise_title" defaultText="Always Ahead" />
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold">01 — Expertise</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 lg:px-12">
          {expertises.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 bg-brand-cream border border-brand-border shadow-xs hover:shadow-md transition-all duration-500 relative flex flex-col items-start"
            >
              <div className="w-10 h-0.5 bg-brand-primary/20 mb-6 group-hover:bg-brand-accent transition-colors" />
              <h3 className="text-xl mb-4 font-serif font-semibold text-brand-primary">
                <Editable id={`expertise_title_${item.id}`} defaultText={item.title} />
              </h3>
              <p className="text-brand-text-light text-sm leading-relaxed mb-6">
                <Editable id={`expertise_desc_${item.id}`} defaultText={item.desc} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
