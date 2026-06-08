import { motion } from 'motion/react';
import { Editable } from '../components/Editable';
import { EditableImage } from '../components/EditableImage';

const features = [
  { id: "01", title: "Corporate and Commercial" },
  { id: "02", title: "Litigation and Dispute Resolution" },
  { id: "03", title: "Banking and Finance" },
  { id: "04", title: "Property and Conveyancing" },
  { id: "05", title: "Insolvency and Restructuring" },
  { id: "06", title: "Employment and Labor" }
];

export default function Vault() {
  return (
    <section id="vault" className="bg-brand-cream py-14 lg:py-24 px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
        {/* Left Side: Image with Frame style */}
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <div className="relative aspect-[3/4] rounded-full overflow-hidden border-[12px] border-brand-primary/5 shadow-2xl">
            <EditableImage 
              id="vault_img"
              defaultSrc="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800"
              alt="Legal library"
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:col-span-7 order-1 lg:order-2 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold mb-6 block">
              <Editable id="vault_tag" defaultText="Specializations" />
            </span>
            <h2 className="text-4xl md:text-7xl font-serif text-brand-primary leading-[1.1] mb-8">
              <Editable id="vault_title_1" defaultText="Depth of" /> <br />
              <Editable id="vault_title_2" defaultText="Practice" className="italic" />
            </h2>
            <p className="text-lg md:text-xl text-brand-primary/70 font-light leading-relaxed mb-12">
              <Editable id="vault_desc" defaultText="Our comprehensive commercial legal practice covers every angle of the modern business environment." />
            </p>

            <div className="space-y-4 mb-16">
              {features.map((f, i) => (
                <motion.div 
                  key={f.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 group cursor-pointer border-b border-brand-primary/5 pb-4 last:border-0"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-brand-primary text-brand-cream text-[10px] rounded-full font-bold transition-all duration-300 group-hover:bg-brand-accent">
                    {f.id}
                  </span>
                  <span className="text-sm uppercase tracking-widest text-brand-primary group-hover:text-brand-accent transition-colors font-medium">
                    <Editable id={`vault_feature_${f.id}`} defaultText={f.title} />
                  </span>
                </motion.div>
              ))}
            </div>

            <a 
              href="/practice-areas" 
              className="inline-block px-12 py-5 bg-brand-primary text-brand-cream uppercase tracking-[2px] text-[10px] font-bold rounded-full hover:bg-brand-accent transition-all duration-500 shadow-sm"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
