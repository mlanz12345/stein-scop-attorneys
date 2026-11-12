import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Video, ShieldCheck, Globe2, MessageSquare, ArrowRight, Award, Compass, Scale } from 'lucide-react';
import africaMapData from '../data/africaMapData.json';

type JurisdictionCode = 'ZAF' | 'NGA' | 'COD' | 'MOZ' | 'ZMB' | 'ZWE';

interface JurisdictionMeta {
  code: JurisdictionCode;
  index: string;
  region: string;
  hub: string;
  coords: string;
  name: string;
  detail: string;
  sectors: string;
}

const JURISDICTIONS: Record<JurisdictionCode, JurisdictionMeta> = {
  ZAF: {
    code: 'ZAF',
    index: '01',
    region: 'PRIMARY SEAT · HQ',
    hub: 'Sandton, Johannesburg',
    coords: '26.11°S · 28.06°E',
    name: 'South Africa',
    detail: 'Firm headquarters in the Sandton financial district, directing domestic and multi-jurisdictional corporate mandates, High Court commercial litigation, and appellate matters.',
    sectors: 'Commercial Litigation · Corporate & M&A · Insolvency',
  },
  NGA: {
    code: 'NGA',
    index: '02',
    region: 'West Africa',
    hub: 'Lagos · Abuja',
    coords: '6.52°N · 3.38°E',
    name: 'Nigeria',
    detail: 'Cross-border M&A, banking covenants, and regulatory compliance.',
    sectors: 'Banking & Finance · Cross-Border M&A · Regulatory',
  },
  COD: {
    code: 'COD',
    index: '03',
    region: 'Central Africa',
    hub: 'Kinshasa · Katanga',
    coords: '11.66°S · 27.48°E',
    name: 'Democratic Republic of Congo',
    detail: 'Mining concessions, mineral titles, and resource joint ventures.',
    sectors: 'Mining Concessions · Mineral Titles · Joint Ventures',
  },
  MOZ: {
    code: 'MOZ',
    index: '04',
    region: 'SADC East',
    hub: 'Maputo · Beira',
    coords: '25.97°S · 32.57°E',
    name: 'Mozambique',
    detail: 'Energy, ports, infrastructure development, and cross-border arbitration.',
    sectors: 'Energy & Gas · Port Infrastructure · Arbitration',
  },
  ZMB: {
    code: 'ZMB',
    index: '05',
    region: 'Copperbelt',
    hub: 'Lusaka · Ndola',
    coords: '15.39°S · 28.29°E',
    name: 'Zambia',
    detail: 'Commercial restructuring, mining supply chain, and corporate mandates.',
    sectors: 'Mining Supply Chain · Restructuring · Corporate',
  },
  ZWE: {
    code: 'ZWE',
    index: '06',
    region: 'SADC North',
    hub: 'Harare · Bulawayo',
    coords: '17.82°S · 31.05°E',
    name: 'Zimbabwe',
    detail: 'Transactional structuring, corporate advisory, and dispute resolution.',
    sectors: 'Transactional Structuring · Corporate Advisory · Disputes',
  },
};

const JURISDICTION_ORDER: JurisdictionCode[] = ['ZAF', 'NGA', 'COD', 'MOZ', 'ZMB', 'ZWE'];

export default function AboutPage() {
  const [activeCode, setActiveCode] = useState<JurisdictionCode>('ZAF');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveCode((prev) => {
        const nextIdx = (JURISDICTION_ORDER.indexOf(prev) + 1) % JURISDICTION_ORDER.length;
        return JURISDICTION_ORDER[nextIdx];
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeJurisdiction = JURISDICTIONS[activeCode];

  const handleSelectJurisdiction = (code: JurisdictionCode) => {
    setIsPaused(true);
    setActiveCode(code);
  };

  const handleResumeCycle = () => {
    setIsPaused(false);
  };

  return (
    <main className="min-h-screen text-brand-primary">
      <Helmet>
        <title>About Us | Stein Scop Attorneys</title>
        <meta name="description" content="Stein Scop Attorneys was founded by Glenn Stein and Bradley Scop on the conviction that clients deserve direct access to the most senior legal minds. A director-led commercial law firm in Sandton, Johannesburg." />
        <meta property="og:title" content="About Us | Stein Scop Attorneys" />
        <meta property="og:description" content="Founded by Glenn Stein and Bradley Scop — a director-led commercial law firm headquartered in Sandton, advising across South Africa and the African continent." />
      </Helmet>

      {/* ── 1. Hero Section (bg-brand-cream: Architectural Warm Grey/Cream) ── */}
      <section className="pt-36 pb-12 px-6 md:px-12 lg:px-24 bg-brand-cream border-b border-brand-border/60">
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
            
            <h1 className="text-6xl md:text-8xl font-serif leading-tight italic">
              Strategy &amp; Leadership
            </h1>
            
            <p className="text-xl font-light text-brand-primary/60 max-w-2xl leading-relaxed">
              Stein Scop Attorneys Inc. is a Johannesburg-based commercial law firm providing senior-led counsel to leading South African and multinational enterprises across the full spectrum of corporate, transactional, and dispute resolution mandates.
            </p>
            
            <div className="w-16 h-px bg-brand-accent" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. "Who We Are" (bg-white: Crisp Clean Editorial Canvas) ── */}
      <section className="bg-white py-20 lg:py-28 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-bold mb-3 block">
              Identity & Senior-Led Model
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-primary">
              Who We <span className="italic">Are</span>
            </h2>
          </motion.div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-base font-light leading-relaxed">
              <div className="border-l-2 border-brand-accent pl-6 py-1">
                <p className="text-brand-primary text-xl md:text-2xl font-serif italic leading-snug">
                  "Clients engaged on complex, high-stakes matters deserve direct access to the most senior legal minds on every aspect of their mandate."
                </p>
              </div>

              <p className="text-brand-primary/85 text-lg leading-relaxed pt-2">
                Founded by Glenn Stein and Bradley Scop — two of South Africa's most recognised commercial attorneys — the firm was established to break from the conventional leverage model of corporate law firms.
              </p>
              
              <p className="text-brand-primary/80">
                Every mandate at Stein Scop is director-led from instruction to conclusion. This commitment to seniority is not a marketing position — it is the operating architecture of the firm. Our clients work directly with the partners whose reputations and experience they hired, never delegated down to junior associates.
              </p>
              
              <p className="text-brand-primary/80">
                We advise JSE-listed corporations, private equity firms, financial institutions, and ambitious entrepreneurs. The common denominator is complexity: instructions where seasoned legal judgment and tactical precision determine the commercial outcome.
              </p>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/team"
                  className="btn inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-brand-accent hover:text-brand-primary transition-colors group"
                >
                  Meet Our Directors
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Conference Room Image with Architectural Luxury Border */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-brand-border/60 group">
                <picture>
                  <source type="image/avif" srcSet="/room.avif" />
                  <img
                    src="/room.png"
                    alt="Stein Scop executive boardroom"
                    loading="lazy"
                    decoding="async"
                    width={1024}
                    height={508}
                    className="absolute inset-0 w-full h-full object-cover ken-burns group-hover:scale-105 transition-transform duration-700"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Architectural Badge */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/90 bg-black/60 backdrop-blur-md px-5 py-3.5 rounded-xl border border-white/15">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-accent" />
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-white">Executive Conference Suites</p>
                      <p className="text-[10px] text-white/60 tracking-wider uppercase font-mono">Sandton, Johannesburg</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                    Teams-Enabled
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section Divider into Dark Theater ── */}
      <div className="bg-black py-8 px-12 lg:px-24 flex items-center justify-center relative z-10 border-t border-white/10">
        <div className="w-full max-w-7xl flex items-center justify-center gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-accent/30 to-brand-accent/50" />
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-1 rounded-full bg-brand-accent/50" />
            <div className="w-2.5 h-2.5 rotate-45 border border-brand-accent/60 bg-black shadow-[0_0_12px_rgba(197,160,89,0.35)]" />
            <span className="w-1 h-1 rounded-full bg-brand-accent/50" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-brand-accent/30 to-brand-accent/50" />
        </div>
      </div>

      {/* ── 3. Operating Principles (bg-black: Dark Editorial Theater) ── */}
      <section className="bg-black py-20 lg:py-28 px-6 md:px-12 lg:px-24 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold block">
              Core Tenets
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-brand-cream">
              The Principles That <span className="italic font-light">Guide Every Matter</span>
            </h2>
            <p className="text-white/60 font-light leading-relaxed text-base">
              We hold ourselves to an uncompromising benchmark of legal excellence, strategic clarity, and senior accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
            {/* Pillar 01 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 group hover:bg-white/[0.02] transition-colors"
            >
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-full border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                  <Award size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-accent/70 block mb-2">01 / Senior Leadership</span>
                  <h3 className="text-2xl font-serif text-brand-cream group-hover:text-brand-accent transition-colors">
                    Director-Led Service
                  </h3>
                </div>
                <p className="text-white/60 font-light leading-relaxed text-sm">
                  Every matter is directed by a partner from instruction to final order or deal close. No delegation to junior teams. Clients receive the undivided focus and tactical acumen of senior legal minds on every detail.
                </p>
              </div>
              <div className="h-0.5 w-12 bg-brand-accent/40 group-hover:w-full group-hover:bg-brand-accent transition-all duration-500" />
            </motion.div>

            {/* Pillar 02 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 group hover:bg-white/[0.02] transition-colors"
            >
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-full border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                  <Scale size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-accent/70 block mb-2">02 / Commercial Insight</span>
                  <h3 className="text-2xl font-serif text-brand-cream group-hover:text-brand-accent transition-colors">
                    Strategy-First Counsel
                  </h3>
                </div>
                <p className="text-white/60 font-light leading-relaxed text-sm">
                  We don't merely recite statutes — we architect solutions tailored to your balance sheet and long-term business goals. Our counsel fuses transactional pragmatism with relentless litigation strength.
                </p>
              </div>
              <div className="h-0.5 w-12 bg-brand-accent/40 group-hover:w-full group-hover:bg-brand-accent transition-all duration-500" />
            </motion.div>

            {/* Pillar 03 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 group hover:bg-white/[0.02] transition-colors"
            >
              <div className="space-y-6">
                <div className="w-10 h-10 rounded-full border border-brand-accent/40 flex items-center justify-center text-brand-accent">
                  <Compass size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-brand-accent/70 block mb-2">03 / Cross-Border Scope</span>
                  <h3 className="text-2xl font-serif text-brand-cream group-hover:text-brand-accent transition-colors">
                    Pan-African Execution
                  </h3>
                </div>
                <p className="text-white/60 font-light leading-relaxed text-sm">
                  From mining rights in the DRC to infrastructure ventures in Mozambique, our directors navigate complex local regulatory environments and cross-border commercial dynamics seamlessly across sub-Saharan Africa.
                </p>
              </div>
              <div className="h-0.5 w-12 bg-brand-accent/40 group-hover:w-full group-hover:bg-brand-accent transition-all duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. "Where We Operate" (bg-brand-cream: Class-A Cartographic Telemetry + Architectural Dossier) ── */}
      <section className="bg-brand-cream py-20 lg:py-28 px-6 md:px-12 lg:px-24 border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Editorial Header Row */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold block">
              Regional Presence
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-5">
                <h2 className="text-4xl md:text-6xl font-serif text-brand-primary leading-tight">
                  Where We <span className="italic font-normal">Operate</span>
                </h2>
              </div>
              <div className="lg:col-span-7 text-base font-light leading-relaxed text-brand-primary/75">
                Headquartered in the Sandton financial precinct in Johannesburg, Stein Scop routinely acts for domestic and international corporations across key African growth markets—pairing senior partner direction with entrenched local regulatory networks across mining, energy, logistics, and telecommunications.
              </div>
            </div>
          </div>

          {/* Main Interactive Split: Left Cartographic Command Theater (5 cols) + Right Architectural Dossier Grid (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* LEFT: Dark Cartographic Command Theater */}
            <div
              className="lg:col-span-5 bg-brand-primary rounded-2xl border border-brand-accent/30 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px]"
              onMouseLeave={handleResumeCycle}
            >
              {/* Ambient Radial Gold Glow + Subtle Scanline */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_72%,rgba(197,166,124,0.16),transparent_65%)] pointer-events-none" />
              <div className="absolute inset-x-0 h-24 map-scanline pointer-events-none" />

              {/* Map Top Telemetry Bar */}
              <div className="relative z-10 px-6 pt-5 pb-3.5 border-b border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
                    Pan-African Command Network
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/50 tracking-wider">
                  {activeJurisdiction.coords}
                </span>
              </div>

              {/* High-Precision 50m GeoJSON Africa SVG */}
              <div className="relative flex-1 flex items-center justify-center px-3 py-2">
                <svg
                  viewBox="80 180 620 570"
                  className="w-full h-full max-h-[370px] select-none overflow-visible"
                  role="img"
                  aria-label="Interactive map of Stein Scop jurisdictions across Sub-Saharan Africa"
                >
                  <defs>
                    <linearGradient id="activeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c5a67c" stopOpacity="0.72" />
                      <stop offset="100%" stopColor="#8c6d40" stopOpacity="0.42" />
                    </linearGradient>
                    <linearGradient id="arcGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#c5a67c" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#f5deb3" stopOpacity="0.35" />
                    </linearGradient>
                    <filter id="goldGlow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Cartographic Graticule Lines */}
                  <line x1="80" y1="340" x2="700" y2="340" stroke="rgba(197,166,124,0.12)" strokeDasharray="3 6" strokeWidth="0.8" />
                  <text x="92" y="334" fill="rgba(197,166,124,0.35)" fontSize="9.5" fontFamily="monospace" letterSpacing="0.15em">
                    0° EQUATOR
                  </text>

                  <line x1="80" y1="595" x2="700" y2="595" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 5" strokeWidth="0.8" />
                  <text x="92" y="589" fill="rgba(255,255,255,0.22)" fontSize="9.5" fontFamily="monospace" letterSpacing="0.15em">
                    23.5°S CAPRICORN
                  </text>

                  <line x1="462.4" y1="180" x2="462.4" y2="740" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />

                  {/* 1. African Continent Base Polygons */}
                  <g>
                    {africaMapData.baseFeatures.map((feature) => (
                      <path
                        key={feature.id}
                        d={feature.d || ''}
                        fill="#131c2e"
                        stroke="rgba(255, 255, 255, 0.07)"
                        strokeWidth={0.75}
                      />
                    ))}
                  </g>

                  {/* 2. The 6 Active Stein Scop Jurisdictions */}
                  <g>
                    {africaMapData.targetFeatures.map((feature) => {
                      const code = feature.targetId as JurisdictionCode;
                      const isActive = activeCode === code;
                      const isHQ = code === 'ZAF';
                      return (
                        <path
                          key={feature.id}
                          d={feature.d || ''}
                          fill={
                            isActive
                              ? 'url(#activeGoldGrad)'
                              : isHQ
                                ? 'rgba(197, 166, 124, 0.32)'
                                : 'rgba(197, 166, 124, 0.18)'
                          }
                          stroke={isActive ? '#f3dfb8' : isHQ ? '#c5a67c' : 'rgba(197, 166, 124, 0.55)'}
                          strokeWidth={isActive ? 1.8 : isHQ ? 1.4 : 1.1}
                          filter={isActive ? 'url(#goldGlow)' : undefined}
                          className="cursor-pointer transition-all duration-500"
                          onMouseEnter={() => handleSelectJurisdiction(code)}
                          onClick={() => handleSelectJurisdiction(code)}
                        />
                      );
                    })}
                  </g>

                  {/* 3. Great-Circle Flight Arcs & Travelling Gold Telemetry Packets */}
                  <g className="pointer-events-none">
                    {africaMapData.arcs.map((arc, i) => {
                      const isActive = activeCode === arc.targetId;
                      return (
                        <g key={arc.targetId}>
                          <path
                            d={arc.d}
                            fill="none"
                            stroke="rgba(197, 166, 124, 0.18)"
                            strokeWidth={1.1}
                            strokeDasharray="3 4"
                          />
                          <path
                            d={arc.d}
                            className={`arc-beam ${isActive ? 'active-arc' : ''}`}
                            style={{ animationDelay: `-${i * 0.9}s` }}
                          />
                          <circle r={isActive ? 3.6 : 2.8} fill="#e5c896" filter="url(#goldGlow)">
                            <animateMotion
                              dur={`${3.2 + i * 0.4}s`}
                              repeatCount="indefinite"
                              path={arc.d}
                              keyPoints="0;1"
                              keyTimes="0;1"
                              calcMode="linear"
                            />
                          </circle>
                        </g>
                      );
                    })}
                  </g>

                  {/* 4. City Hubs & Sonar Ripples */}
                  <g>
                    {africaMapData.hubs.map((hub) => {
                      const code = hub.id as JurisdictionCode;
                      const isActive = activeCode === code;
                      const labelX = hub.x + (hub.labelOffset ? hub.labelOffset[0] : 12);
                      const labelY = hub.y + (hub.labelOffset ? hub.labelOffset[1] : 4);
                      const anchor = hub.labelOffset && hub.labelOffset[0] < 0 ? 'end' : 'start';

                      if (hub.isHQ) {
                        return (
                          <g
                            key={hub.id}
                            className="cursor-pointer"
                            onMouseEnter={() => handleSelectJurisdiction(code)}
                            onClick={() => handleSelectJurisdiction(code)}
                          >
                            <circle cx={hub.x} cy={hub.y} r={26} className="hq-sonar" />
                            <circle cx={hub.x} cy={hub.y} r={26} className="hq-sonar hq-sonar-delay" />
                            <circle cx={hub.x} cy={hub.y} r={11} fill="rgba(197,166,124,0.28)" />
                            <circle
                              cx={hub.x}
                              cy={hub.y}
                              r={5.5}
                              fill="#c5a67c"
                              stroke="#ffffff"
                              strokeWidth={2}
                              filter="url(#goldGlow)"
                            />
                            <text
                              x={labelX}
                              y={labelY}
                              textAnchor={anchor}
                              fill="#f5deb3"
                              fontSize="12.5"
                              fontFamily="monospace"
                              fontWeight="700"
                              letterSpacing="0.16em"
                              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))' }}
                            >
                              SANDTON HQ
                            </text>
                          </g>
                        );
                      }

                      const shortLabel =
                        hub.name === 'Democratic Republic of Congo' ? 'DR CONGO' : hub.name.toUpperCase();

                      return (
                        <g
                          key={hub.id}
                          className="cursor-pointer"
                          onMouseEnter={() => handleSelectJurisdiction(code)}
                          onClick={() => handleSelectJurisdiction(code)}
                        >
                          <circle
                            cx={hub.x}
                            cy={hub.y}
                            r={14}
                            className="node-pulse"
                            stroke={isActive ? '#c5a67c' : 'none'}
                            strokeWidth={isActive ? 1 : 0}
                          />
                          <circle cx={hub.x} cy={hub.y} r={7} fill="rgba(197,166,124,0.18)" />
                          <circle
                            cx={hub.x}
                            cy={hub.y}
                            r={isActive ? 5.8 : 3.8}
                            fill={isActive ? '#ffffff' : '#c5a67c'}
                            stroke="#0a0f1a"
                            strokeWidth={1.2}
                            className="transition-all duration-300"
                          />
                          <text
                            x={labelX}
                            y={labelY}
                            textAnchor={anchor}
                            fill={isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.68)'}
                            fontSize={isActive ? '12.5' : '11.5'}
                            fontFamily="monospace"
                            fontWeight="600"
                            letterSpacing="0.14em"
                            className="transition-all duration-300"
                            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.85))' }}
                          >
                            {shortLabel}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* Live Bottom Jurisdiction Telemetry HUD */}
              <div className="relative z-10 m-4 mt-0 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold">
                      {activeJurisdiction.index} / {activeJurisdiction.region}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-serif text-white">
                    {activeJurisdiction.name} — <span className="text-white/75 font-light">{activeJurisdiction.hub}</span>
                  </p>
                  <p className="text-xs text-white/60 font-light">
                    {activeJurisdiction.sectors}
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent border border-brand-accent/40 bg-brand-accent/10 px-2.5 py-1 rounded">
                    Direct Partner Reach
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: Architectural Jurisdiction Dossier Grid (7 cols) */}
            <div
              className="lg:col-span-7 flex flex-col justify-between space-y-4"
              onMouseLeave={handleResumeCycle}
            >
              {/* Flagship HQ Card (South Africa) */}
              <div
                onMouseEnter={() => handleSelectJurisdiction('ZAF')}
                onClick={() => handleSelectJurisdiction('ZAF')}
                className={`bg-brand-primary text-white rounded-xl p-6 sm:p-7 border transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer ${
                  activeCode === 'ZAF'
                    ? 'border-brand-accent shadow-[0_8px_30px_rgba(197,166,124,0.18)]'
                    : 'border-brand-accent/40 hover:border-brand-accent/80'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-accent via-brand-accent/60 to-transparent" />
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-[0.22em] text-brand-accent font-semibold">
                      01 / Primary Command Hub · Sandton HQ
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/50 tracking-wider">
                    JOHANNESBURG · ZA
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h3 className="text-2xl font-serif text-brand-cream">South Africa</h3>
                  <span className="text-xs uppercase tracking-[0.16em] text-brand-accent/90 font-medium">
                    High Courts &amp; SCA Practice
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {JURISDICTIONS.ZAF.detail}
                </p>
              </div>

              {/* 5 Cross-Border Corridors in Architectural Hairline Grid */}
              <div className="bg-white border border-brand-border rounded-xl overflow-hidden divide-y divide-brand-border shadow-sm flex-1 flex flex-col justify-between">
                {/* Top Row: Nigeria & DRC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-brand-border flex-1">
                  {(['NGA', 'COD'] as JurisdictionCode[]).map((code) => {
                    const item = JURISDICTIONS[code];
                    const isActive = activeCode === code;
                    return (
                      <div
                        key={code}
                        onMouseEnter={() => handleSelectJurisdiction(code)}
                        onClick={() => handleSelectJurisdiction(code)}
                        className={`p-6 group transition-all duration-300 cursor-pointer flex flex-col justify-between relative ${
                          isActive ? 'bg-brand-cream/80' : 'hover:bg-brand-cream/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="text-xs font-mono uppercase tracking-[0.18em] text-brand-accent font-semibold">
                              {item.index} / {item.region}
                            </span>
                            <span className="text-[11px] font-mono text-brand-primary/45">
                              {item.hub}
                            </span>
                          </div>
                          <h3
                            className={`text-xl font-serif transition-colors mb-2 ${
                              isActive ? 'text-brand-accent' : 'text-brand-primary group-hover:text-brand-accent'
                            }`}
                          >
                            {item.name}
                          </h3>
                          <p className="text-xs text-brand-primary/65 font-light leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                        <div
                          className={`h-0.5 transition-all duration-500 mt-5 ${
                            isActive
                              ? 'w-full bg-brand-accent'
                              : 'w-8 bg-brand-accent/40 group-hover:w-full group-hover:bg-brand-accent'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Row: Mozambique, Zambia, Zimbabwe */}
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-border flex-1">
                  {(['MOZ', 'ZMB', 'ZWE'] as JurisdictionCode[]).map((code) => {
                    const item = JURISDICTIONS[code];
                    const isActive = activeCode === code;
                    return (
                      <div
                        key={code}
                        onMouseEnter={() => handleSelectJurisdiction(code)}
                        onClick={() => handleSelectJurisdiction(code)}
                        className={`p-6 group transition-all duration-300 cursor-pointer flex flex-col justify-between relative ${
                          isActive ? 'bg-brand-cream/80' : 'hover:bg-brand-cream/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="text-xs font-mono uppercase tracking-[0.15em] text-brand-accent font-semibold">
                              {item.index} / {item.region}
                            </span>
                          </div>
                          <h3
                            className={`text-xl font-serif transition-colors mb-2 ${
                              isActive ? 'text-brand-accent' : 'text-brand-primary group-hover:text-brand-accent'
                            }`}
                          >
                            {item.name}
                          </h3>
                          <p className="text-xs text-brand-primary/65 font-light leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                        <div
                          className={`h-0.5 transition-all duration-500 mt-5 ${
                            isActive
                              ? 'w-full bg-brand-accent'
                              : 'w-8 bg-brand-accent/40 group-hover:w-full group-hover:bg-brand-accent'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. "Counsel on Your Terms" (bg-white: Full-Bleed Architectural Grid) ── */}
      <section className="bg-white py-20 lg:py-28 px-6 md:px-12 lg:px-24 border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
          >
            <div className="max-w-2xl space-y-4">
              <span className="text-xs uppercase tracking-[0.4em] text-brand-accent font-bold block">
                Modern Engagement
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-brand-primary leading-tight">
                Counsel on Your <span className="italic font-normal">Terms</span>
              </h2>
              <p className="text-brand-primary/70 font-light text-base md:text-lg leading-relaxed pt-1">
                We understand that board members, general counsel, and investors operate under tight schedules. Stein Scop combines private boardroom discretion with enterprise video-conferencing technology.
              </p>
            </div>

            <Link
              to="/contact"
              className="btn inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-bold text-brand-primary hover:text-brand-accent transition-colors shrink-0 pb-1 group"
            >
              Schedule a Consultation
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Architectural 4-Column Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-brand-border border-y border-brand-border">
            {[
              {
                num: '01',
                icon: Video,
                tag: 'Remote Suites',
                title: 'Virtual Consultations',
                desc: 'High-definition Microsoft Teams suites for deal closings, mediations, and international board consultations across time zones.',
              },
              {
                num: '02',
                icon: ShieldCheck,
                tag: 'Sandton Suites',
                title: 'Private Boardrooms',
                desc: 'Acoustically isolated Sandton executive suites reserved for sensitive due diligence, settlement talks, and executive sessions.',
              },
              {
                num: '03',
                icon: Globe2,
                tag: 'Cross-Border',
                title: 'Pan-African Direct Access',
                desc: 'Direct contact with lead partners across sub-Saharan jurisdictions without administrative friction or intermediary gatekeeping.',
              },
              {
                num: '04',
                icon: MessageSquare,
                tag: 'Partner Reach',
                title: 'Immediate Senior Reach',
                desc: 'Our partners remain directly accessible via mobile and direct channels for time-critical commercial instructions.',
              },
            ].map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 sm:p-10 lg:p-12 flex flex-col group hover:bg-brand-cream/45 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Top ambient highlight on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                  {/* Expanding gold underline on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  {/* Top Row: Index Numeral + Minimalist Icon (Locked single-line baseline) */}
                  <div className="flex items-center justify-between gap-2 mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-brand-accent font-semibold whitespace-nowrap">
                      {feature.num} / {feature.tag}
                    </span>
                    <div className="w-9 h-9 rounded-full border border-brand-border group-hover:border-brand-accent/60 group-hover:bg-white flex items-center justify-center text-brand-primary/50 group-hover:text-brand-accent transition-all duration-500 shrink-0">
                      <IconComponent size={16} />
                    </div>
                  </div>

                  {/* Heading (Consistent 2-line height so all paragraphs start on the exact same line) */}
                  <h3 className="text-xl md:text-2xl font-serif text-brand-primary group-hover:text-brand-accent transition-colors duration-300 leading-snug mb-4 lg:min-h-[3.5rem] flex items-start">
                    {feature.title}
                  </h3>

                  {/* Body Copy */}
                  <p className="text-sm text-brand-primary/65 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}

