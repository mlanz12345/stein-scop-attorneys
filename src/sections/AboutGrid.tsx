import { Editable } from '../components/Editable';
import { EditableImage } from '../components/EditableImage';

const blocks = [
  {
    id: 'directors',
    title: 'Renowned Expert Directors',
    body: 'Every matter at Stein Scop is handled directly by a Director — not delegated to junior associates. Our eight Directors bring an average of over two decades of individual practice to each instruction, ensuring that seniority and strategic insight are never rationed.',
    img: 'https://www.steinscop.com/wp-content/uploads/2023/04/glenn-stein.jpg',
  },
  {
    id: 'commercial',
    title: 'Comprehensive Commercial Practice',
    body: 'From mergers and acquisitions to banking and finance, property conveyancing to competition law — our practice covers the full spectrum of commercial legal work. We are a single-firm solution for businesses operating across South Africa and the broader African continent.',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'litigation',
    title: 'Superior Litigation Strategy',
    body: 'We are recognised for our ability to resolve difficult, high-stakes disputes. Our litigators have run large-scale commercial trials and motion proceedings across all South African High Courts, multiple arbitration forums, and cross-border jurisdictions including Nigeria, Zambia, and Mozambique.',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'local',
    title: 'Deep South African Market Insight',
    body: 'South Africa\'s regulatory environment, competitive landscape, and business culture are distinct. Our Directors have spent careers navigating these nuances — advising JSE-listed entities, multinational corporations, and leading local enterprises on their most sensitive commercial matters.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=800',
  },
];

export default function AboutGrid() {
  return (
    <section className="bg-white py-14 lg:py-24 px-12 lg:px-24 border-y border-brand-border">
      <div className="max-w-7xl mx-auto space-y-16">
        {blocks.map((block, i) => (
          <div
            key={block.id}
            className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            <div className="flex-1 space-y-8">
              <div className="w-12 h-0.5 bg-brand-accent/40" />
              <h2 className="text-4xl md:text-5xl font-serif text-brand-primary leading-tight">
                <Editable id={`about_block_${block.id}`} defaultText={block.title} />
              </h2>
              <p className="text-lg text-brand-primary/65 font-light leading-relaxed max-w-lg">
                <Editable id={`about_body_${block.id}`} defaultText={block.body} />
              </p>
            </div>
            <div className="flex-1 relative aspect-video lg:aspect-square overflow-hidden bg-brand-cream border border-brand-border">
              <EditableImage
                id={`about_img_${block.id}`}
                defaultSrc={block.img}
                alt={block.title}
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
