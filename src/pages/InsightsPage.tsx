import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles, categories, featuredArticles } from '../data/articles';

export default function InsightsPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? featuredArticles
    : articles.filter(a => a.tag === active && !!a.body);

  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>Legal News &amp; Briefings | Stein Scop Attorneys Inc.</title>
        <meta name="description" content="Commercial law insights from Stein Scop Attorneys — covering M&A, employment law, litigation, insolvency, competition, mining, and more across South Africa." />
        <meta property="og:title" content="Legal News &amp; Briefings | Stein Scop Attorneys Inc." />
        <meta property="og:description" content="Expert commentary on South African commercial law from the directors of Stein Scop Attorneys Inc." />
      </Helmet>

      {/* Hero */}
      <section className="pt-36 pb-12 px-12 lg:px-24 bg-brand-cream border-b border-brand-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">Legal News &amp; Info</span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight">
              News &amp; <span className="italic">Briefings</span>
            </h1>
            <p className="text-xl font-light text-brand-primary/60 max-w-2xl leading-relaxed">
              Perspectives on commercial law, litigation strategy, and the legal developments shaping South African business.
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-white border-b border-brand-border px-12 lg:px-24 py-6 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-[9px] uppercase tracking-[0.3em] font-bold px-4 py-2 rounded-full border transition-all duration-200 ${
                  active === cat
                    ? 'bg-brand-primary text-white border-brand-primary'
                    : 'border-brand-border text-brand-primary/50 hover:border-brand-primary/40 hover:text-brand-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="bg-white py-14 lg:py-24 px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <Link to={`/insights/${article.slug}`} className="group block cursor-pointer">
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
                    <div className="pt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-accent group-hover:gap-3 transition-all duration-300">
                      Read More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
