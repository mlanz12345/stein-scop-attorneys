import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';

export default function AboutPage() {

  return (
    <main className="bg-brand-cream min-h-screen text-brand-primary">
      <Helmet>
        <title>About Us | Stein Scop Attorneys Inc.</title>
        <meta name="description" content="Stein Scop Attorneys Inc. was founded by Glenn Stein and Bradley Scop on the conviction that clients deserve direct access to the most senior legal minds. A director-led commercial law firm in Sandton, Johannesburg." />
        <meta property="og:title" content="About Us | Stein Scop Attorneys Inc." />
        <meta property="og:description" content="Founded by Glenn Stein and Bradley Scop — a director-led commercial law firm headquartered in Sandton, advising across South Africa and the African continent." />
      </Helmet>

      {/* Hero */}
      <section className="pt-36 pb-12 px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold">
              About the Firm
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight">
              Built on Strategy.<br />
              <span className="italic">Defined by Outcomes.</span>
            </h1>
            <p className="text-xl font-light text-brand-primary/60 max-w-2xl leading-relaxed">
              Stein Scop Attorneys Inc. is a Johannesburg-based commercial law firm providing senior-led legal counsel to leading South African and international businesses across the full spectrum of commercial law.
            </p>
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* Who We Are + Image */}
      <section className="py-16 px-12 lg:px-24 border-t border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-6 text-base font-light leading-relaxed">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-primary">
              Who We Are
            </h2>
            <p className="text-brand-primary/80">
              Founded by Glenn Stein and Bradley Scop — two of South Africa's most recognised commercial attorneys — the firm was established on a straightforward conviction: that clients engaged on complex, high-stakes matters deserve direct access to the most senior legal minds on every aspect of their matter.
            </p>
            <p className="text-brand-primary/80">
              Every mandate at Stein Scop is director-led from instruction to conclusion. This commitment to seniority is not a marketing position — it is the operating model of the firm, and it defines the quality and consistency of our advice across every practice area.
            </p>
            <p className="text-brand-primary/80">
              We work with listed entities, private companies, financial institutions, entrepreneurs, and high-net-worth individuals. The common thread is complexity — matters that demand senior judgment, not process.
            </p>
          </div>

          {/* Room image with Ken Burns */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl hover:scale-[1.02] transition-transform duration-700 ease-out">
              <img
                src="/room.png"
                alt="Stein Scop conference room"
                className="w-full h-full object-cover ken-burns"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Where We Operate */}
      <section className="py-16 px-12 lg:px-24 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Where We <span className="italic">Operate</span>
            </h2>
            <div className="space-y-5 text-base font-light leading-relaxed text-brand-primary/80">
              <p>
                Headquartered in Sandton, Johannesburg, the firm advises clients across South Africa and the broader African continent — including Nigeria, Zambia, Zimbabwe, the Democratic Republic of Congo, and Mozambique.
              </p>
              <p>
                Our cross-border transactional and dispute resolution experience spans the full range of African commercial frameworks. Our directors have developed deep networks across the continent's key regulatory bodies, competition authorities, and judicial institutions.
              </p>
              <p>
                For clients who require remote engagement, we offer fully equipped Microsoft Teams-enabled meeting facilities — allowing consultations and deal negotiations to be conducted seamlessly across geographies without compromising the quality of engagement.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2">
            {[
              { country: 'South Africa', detail: 'Headquartered in Sandton, Johannesburg' },
              { country: 'Nigeria', detail: 'Cross-border advisory and transactions' },
              { country: 'Zimbabwe', detail: 'Transactional and regulatory matters' },
              { country: 'Zambia', detail: 'Commercial and M&A mandates' },
              { country: 'DRC', detail: 'Mining and resources transactions' },
              { country: 'Mozambique', detail: 'Energy and infrastructure advisory' },
            ].map((loc) => (
              <div key={loc.country} className="border-t border-brand-border pt-4 space-y-1">
                <p className="text-sm font-bold text-brand-primary">{loc.country}</p>
                <p className="text-xs text-brand-primary/50 font-light leading-snug">{loc.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Convenience */}
      <section className="py-16 px-12 lg:px-24 border-t border-brand-border bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold mb-4 block">
              Client Convenience
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Counsel on Your <span className="italic">Terms</span>
            </h2>
            <div className="space-y-5 text-base font-light leading-relaxed text-brand-primary/80">
              <p>
                We understand that our clients operate in demanding commercial environments where time and accessibility matter. Stein Scop is structured to accommodate the way modern businesses work — without compromising the rigour of the legal service we deliver.
              </p>
              <p>
                Our Sandton offices feature fully equipped Microsoft Teams-enabled conference rooms, allowing clients to attend consultations, deal negotiations, and strategy sessions remotely with the same quality of engagement as an in-person meeting. Whether you are across the city or across the continent, seamless participation is assured.
              </p>
              <p>
                For matters requiring physical presence, our offices provide a discreet, professional environment befitting the sensitivity of the work we handle — with private meeting rooms available for board-level discussions, due diligence sessions, and multi-party negotiations.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 gap-6"
          >
            {[
              {
                label: 'Virtual Consultations',
                desc: 'Microsoft Teams-enabled conference rooms for remote client meetings, deal negotiations, and multi-party sessions across any geography.',
              },
              {
                label: 'In-Person Meetings',
                desc: 'Private, professionally equipped meeting rooms in our Sandton offices — designed for confidentiality and focused legal work.',
              },
              {
                label: 'Pan-African Accessibility',
                desc: 'Clients across sub-Saharan Africa engage with our directors directly, without the friction of time zone misalignment or communication intermediaries.',
              },
              {
                label: 'Responsive Communication',
                desc: 'Our directors are directly reachable. Clients are not managed through layers of administration — access to senior counsel is immediate.',
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-5 items-start border-t border-brand-border pt-5">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-brand-primary mb-1">{item.label}</p>
                  <p className="text-sm text-brand-primary/55 font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 px-12 lg:px-24 bg-brand-primary text-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">01</span>
              <h3 className="text-2xl font-serif">Director-Led Service</h3>
              <p className="text-brand-cream/60 font-light leading-relaxed text-sm">
                Every matter is handled by a director from start to finish. No delegation to junior associates. Our clients receive the full benefit of decades of expertise on every aspect of their instruction.
              </p>
            </div>
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">02</span>
              <h3 className="text-2xl font-serif">Strategy First</h3>
              <p className="text-brand-cream/60 font-light leading-relaxed text-sm">
                We do not quote the law — we apply it strategically in the context of your commercial objectives. Our directors bring both transactional depth and litigation experience to every mandate.
              </p>
            </div>
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">03</span>
              <h3 className="text-2xl font-serif">Pan-African Reach</h3>
              <p className="text-brand-cream/60 font-light leading-relaxed text-sm">
                With active experience across sub-Saharan Africa, we provide cross-border commercial counsel that reflects an on-the-ground understanding of African regulatory and commercial environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-12 lg:px-24 text-center bg-brand-primary text-brand-cream border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-5xl font-serif text-brand-cream">
            Ready to Work <span className="italic">With Us?</span>
          </h2>
          <p className="text-brand-cream/70 font-light leading-relaxed">
            Discover why South Africa's most prominent businesses trust Stein Scop Attorneys with their most sensitive and complex legal matters.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="/practice-areas"
              className="px-8 py-4 border-2 border-brand-cream text-brand-cream uppercase tracking-widest text-xs font-bold rounded-full hover:bg-brand-cream hover:text-brand-primary transition-all">
              Our Practice Areas
            </a>
            <a href="/team"
              className="px-8 py-4 bg-brand-accent text-white uppercase tracking-widest text-xs font-bold rounded-full hover:scale-105 transition-all">
              Meet the Team
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
