import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowRight, User, Briefcase, FileText, ArrowUpRight, X } from 'lucide-react';
import { allMembers } from '../data/team';
import { getRedirects } from '../sanity';

const corePages = [
  { title: 'Home', path: '/' },
  { title: 'About Us', path: '/about' },
  { title: 'Practice Areas', path: '/practice-areas' },
  { title: 'Our Team', path: '/team' },
  { title: 'Careers', path: '/careers' },
  { title: 'Contact', path: '/contact' },
];

const featuredPracticeAreas = [
  'Commercial Litigation',
  'Mergers & Acquisitions',
  'Employment & Labour Law',
  'Technology & Media Law',
  'Insolvency & Business Rescue',
  'Mining & Energy Law',
];

const firmSectors = [
  'Corporate & Commercial Disputes',
  'B-BBEE & Cross-Border Transactions',
  'Private Equity & Banking',
  'Competition Commission Referrals',
  'Regulatory & Administrative Law',
  'Arbitration & Mediation',
];

export default function NotFoundPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Client-side fallback check: if this URL matches a dynamic Sanity redirect, redirect immediately
  useEffect(() => {
    let active = true;
    getRedirects().then((redirects) => {
      if (!active || !redirects || redirects.length === 0) return;
      const currentPath = location.pathname.toLowerCase().replace(/\/+$/, '');
      const match = redirects.find((r) => {
        const src = r.source.toLowerCase().replace(/\/+$/, '');
        return src === currentPath || src === location.pathname.toLowerCase();
      });
      if (match && match.destination) {
        if (match.destination.startsWith('http')) {
          window.location.replace(match.destination);
        } else {
          navigate(match.destination, { replace: true });
        }
      }
    });
    return () => {
      active = false;
    };
  }, [location.pathname, navigate]);

  // Filter search results across Attorneys, Practice Areas, and Core Pages
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return null;

    const matchedMembers = allMembers
      .filter((m) => m.name.toLowerCase().includes(q) || m.title.toLowerCase().includes(q))
      .slice(0, 4)
      .map((m) => ({
        type: 'Attorney',
        title: m.name,
        subtitle: m.title,
        path: `/team/${m.id}`,
        icon: User,
      }));

    const matchedPractices = featuredPracticeAreas
      .filter((p) => p.toLowerCase().includes(q))
      .slice(0, 3)
      .map((p) => ({
        type: 'Practice Area',
        title: p,
        subtitle: 'Specialisation',
        path: '/practice-areas',
        icon: Briefcase,
      }));

    const matchedPages = corePages
      .filter((p) => p.title.toLowerCase().includes(q))
      .slice(0, 2)
      .map((p) => ({
        type: 'Page',
        title: p.title,
        subtitle: 'Navigation',
        path: p.path,
        icon: FileText,
      }));

    return [...matchedMembers, ...matchedPractices, ...matchedPages];
  }, [query]);

  return (
    <main className="min-h-screen bg-[#0a111a] text-brand-cream pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between selection:bg-brand-accent selection:text-brand-primary">
      <Helmet>
        <title>Page Not Found (404) | Stein Scop Attorneys</title>
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content="The page you were looking for could not be found. Stein Scop Attorneys is a director-led commercial law firm in Sandton, Johannesburg."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto w-full pt-8 md:pt-16">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="text-[11px] uppercase tracking-[0.35em] text-brand-accent font-bold">
            Error 404 · Page Not Found
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.05] tracking-tight mb-8">
          Page Not Found.<br />
          <span className="italic text-brand-accent">Let's Redirect You.</span>
        </h1>

        {/* Description Copy */}
        <p className="text-base sm:text-lg text-white/70 max-w-2xl font-light leading-relaxed mb-12">
          The link may be out of date, or the address may have been typed incorrectly. Search below, or continue to one of the sections most visitors are looking for.
        </p>

        {/* Search Bar Container */}
        <div className="relative max-w-2xl mb-10">
          <div className="relative flex items-center border-b border-white/25 focus-within:border-brand-accent transition-colors pb-3">
            <Search className="w-5 h-5 text-brand-accent shrink-0 mr-3.5" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              placeholder="Search for a person or practice area"
              className="w-full bg-transparent text-white placeholder-white/40 text-base md:text-lg focus:outline-none"
              aria-label="Search for a person or practice area"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setIsSearching(false);
                }}
                className="text-white/40 hover:text-white transition-colors ml-2 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown Results */}
          {isSearching && searchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0e1724] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-30 divide-y divide-white/5">
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setIsSearching(false)}
                      className="flex items-center justify-between p-4 hover:bg-white/[0.04] transition-colors group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-all">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white group-hover:text-brand-accent transition-colors">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-white/40 tracking-wider uppercase">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })
              ) : (
                <div className="p-4 text-sm text-white/50 text-center">
                  No matching attorneys or practice areas found for "{query}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-20">
          <Link
            to="/"
            className="btn px-9 py-4 bg-brand-accent text-brand-primary uppercase tracking-[2px] text-[11px] font-bold rounded-full hover:bg-white hover:text-brand-primary transition-all duration-300 shadow-md"
          >
            Return Home
          </Link>
          <Link
            to="/contact"
            className="btn px-9 py-4 border border-white/25 text-white uppercase tracking-[2px] text-[11px] font-bold rounded-full hover:border-brand-accent hover:text-brand-accent transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Modular 3-Column Navigation Hub (Future-Proofed for Recent Articles) */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 text-sm">
          {/* Column 1: Core Navigation */}
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-bold">
              Core Navigation
            </h2>
            <ul className="space-y-2.5">
              {corePages.map((page) => (
                <li key={page.path}>
                  <Link
                    to={page.path}
                    className="text-white/70 hover:text-brand-accent transition-colors flex items-center justify-between group py-1"
                  >
                    <span>{page.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Key Practice Areas */}
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-bold">
              Practice Areas
            </h2>
            <ul className="space-y-2.5">
              {featuredPracticeAreas.map((area) => (
                <li key={area}>
                  <Link
                    to="/practice-areas"
                    className="text-white/70 hover:text-brand-accent transition-colors flex items-center justify-between group py-1"
                  >
                    <span>{area}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Commercial Mandates & Recent Content (Slot for articles once published) */}
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-bold">
              Key Sectors & Mandates
            </h2>
            <ul className="space-y-2.5">
              {firmSectors.map((sector) => (
                <li key={sector}>
                  <Link
                    to="/practice-areas"
                    className="text-white/70 hover:text-brand-accent transition-colors flex items-center justify-between group py-1"
                  >
                    <span>{sector}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
