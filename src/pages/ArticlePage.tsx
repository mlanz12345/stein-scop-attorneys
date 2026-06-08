import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

  if (!article || !article.body) {
    return (
      <main className="bg-brand-cream min-h-screen flex items-center justify-center text-brand-primary">
        <div className="text-center space-y-6">
          <p className="text-brand-primary/40 text-sm uppercase tracking-widest">Article not found</p>
          <Link to="/insights" className="inline-flex items-center gap-2 text-brand-accent text-sm font-bold uppercase tracking-widest hover:gap-3 transition-all">
            <ArrowLeft size={14} /> Back to Insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">

      {/* Hero image */}
      <div className="relative h-[55vh] overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-primary/60" />
        <div className="absolute inset-0 flex items-end px-12 lg:px-24 pb-16">
          <div className="max-w-4xl">
            <span className="text-[9px] uppercase tracking-[0.4em] font-bold bg-brand-accent text-white px-3 py-1.5 mb-6 inline-block">
              {article.tag}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mt-4">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article body */}
      <section className="bg-white px-12 lg:px-24 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">

          {/* Meta */}
          <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest text-brand-primary/30 mb-12 pb-12 border-b border-brand-border">
            <span className="flex items-center gap-2"><Calendar size={11} />{article.date}</span>
            <span className="flex items-center gap-2"><Clock size={11} />{article.readTime}</span>
          </div>

          {/* Lead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl font-light text-brand-primary/70 leading-relaxed mb-10 italic"
          >
            {article.excerpt}
          </motion.p>

          {/* Body paragraphs */}
          <div className="space-y-7">
            {article.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
                className="text-base text-brand-primary/75 font-light leading-[1.9]"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-brand-accent my-16" />

          {/* CTA */}
          <div className="bg-brand-primary rounded-2xl p-10 text-brand-cream space-y-6">
            <h3 className="text-2xl font-serif">Consult Our Team on This Matter</h3>
            <p className="text-brand-cream/60 font-light text-sm leading-relaxed">
              Our directors have deep experience in {article.tag.toLowerCase()} and are directly involved in every matter we handle. If this article raises questions relevant to your situation, we welcome an initial consultation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-white text-[10px] uppercase tracking-[2px] font-bold rounded-full hover:scale-105 transition-all duration-300"
            >
              Get In Touch <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="bg-white px-12 lg:px-24 py-8 border-t border-brand-border">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary/40 hover:text-brand-accent transition-colors"
        >
          <ArrowLeft size={12} /> Back to Insights
        </Link>
      </div>
    </main>
  );
}
