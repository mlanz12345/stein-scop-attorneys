import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    tag: 'Corporate Law',
    title: 'Navigating Cross-Border M&A in the African Context',
    excerpt: 'As African economies continue to integrate, cross-border acquisitions present unique challenges around multi-regulator approval, currency risk, and cultural due diligence.',
    date: 'April 2025',
    readTime: '8 min read',
    img: 'https://www.steinscop.com/wp-content/uploads/2023/05/HeroMain.jpg',
  },
  {
    id: 2,
    tag: 'Insolvency',
    title: 'Business Rescue: Protecting Stakeholder Value in Distress',
    excerpt: "South Africa's business rescue framework under Chapter 6 of the Companies Act offers a structured pathway for financially distressed entities — but timing and strategy are everything.",
    date: 'March 2025',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    tag: 'Employment Law',
    title: 'Executive Dismissal and Restraint of Trade in 2025',
    excerpt: 'Recent Labour Court decisions are reshaping the enforceability of restraint of trade clauses for senior executives, with significant implications for JSE-listed entities.',
    date: 'February 2025',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Insights() {
  return (
    <section className="bg-white py-14 lg:py-24 px-12 lg:px-24 border-t border-brand-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold mb-4 block">Legal Insights</span>
            <h2 className="text-5xl md:text-7xl font-serif text-brand-primary">
              Thought<br /><span className="italic">Leadership</span>
            </h2>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] font-bold text-brand-primary hover:text-brand-accent transition-colors group"
          >
            All Articles
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden mb-8 relative">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 p-5">
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold bg-brand-accent text-white px-3 py-1.5">
                    {article.tag}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-brand-primary/30">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-serif text-brand-primary leading-snug group-hover:text-brand-accent transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-sm text-brand-primary/60 font-light leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="pt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent">
                  Read More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
