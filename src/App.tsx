/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, MotionConfig, useScroll, useSpring, useMotionValue } from 'motion/react';
import { BrowserRouter, MemoryRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Results from './sections/Results';
import Stats from './sections/Stats';
import CTA from './sections/CTA';
import HomePractice from './sections/HomePractice';
import Footer from './sections/Footer';
import Preloader from './components/Preloader';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { EditProvider } from './context/EditContext';
import { AdminToolbar } from './components/AdminToolbar';

import TeamPage from './pages/TeamPage';
import TeamMemberPage from './pages/TeamMemberPage';
import AboutPage from './pages/AboutPage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import CookieBanner from './components/CookieBanner';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: React.JSX.Element | React.JSX.Element[] }) {
  const location = useLocation();
  return (
    <div key={location.pathname}>
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <Helmet>
        <title>Commercial Law Firm | Stein Scop Attorneys</title>
        <meta name="description" content="Stein Scop Attorneys is a director-led commercial law firm in Sandton, Johannesburg, advising clients across South Africa and the African continent on M&A, litigation, employment, mining, and more." />
        <meta property="og:title" content="Commercial Law Firm | Stein Scop Attorneys" />
        <meta property="og:description" content="Director-led commercial law firm in Sandton advising on M&A, litigation, employment, mining and more across South Africa and Africa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.steinscop.com" />
      </Helmet>
      <Hero />
      <Intro />
      <Results />

      {/* Elegant Section Divider */}
      <div className="bg-black py-8 px-12 lg:px-24 flex items-center justify-center relative z-10">
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

      <Stats />
      <HomePractice />
      <CTA />
    </main>
  );
}

import { getPageSeo, getSiteSettings, type PageSeoData } from './sanity';

function SanityLiveSeo() {
  const { pathname } = useLocation();
  const [pageSeo, setPageSeo] = useState<PageSeoData | null>(null);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    getSiteSettings().then((data) => {
      if (data) setSiteSettings(data);
    });
  }, []);

  useEffect(() => {
    // Attorney profile routes handle their own live Sanity fetch in TeamMemberPage
    if (pathname.startsWith('/team/')) {
      setPageSeo(null);
      return;
    }
    const slug = pathname === '/' ? 'home' : pathname.replace(/^\//, '');
    let active = true;
    getPageSeo(slug).then((data) => {
      if (active) setPageSeo(data);
    });
    return () => {
      active = false;
    };
  }, [pathname]);

  const defaultSeo = siteSettings?.defaultSeo;
  const metaTitle = pageSeo?.metaTitle || defaultSeo?.metaTitle;
  const metaDescription = pageSeo?.metaDescription || defaultSeo?.metaDescription;
  const canonicalUrl = pageSeo?.canonicalUrl || defaultSeo?.canonicalUrl;
  const noIndex = pageSeo?.noIndex ?? defaultSeo?.noIndex;
  const keywords = pageSeo?.keywords?.length ? pageSeo.keywords : defaultSeo?.keywords;
  const ogImageUrl = pageSeo?.ogImageUrl || defaultSeo?.ogImageUrl;
  const structuredData = pageSeo?.structuredData || defaultSeo?.structuredData;

  const rawGsc = siteSettings?.googleSiteVerification?.trim() || 'jIYet-YQeDqd2ymKePJMEivj8N9cSyJB6aDUFJVuStk';
  const gscMatch = rawGsc.match(/content=["']([^"']+)["']/i);
  const gscVerification = gscMatch ? gscMatch[1] : rawGsc;

  const rawGa = (siteSettings?.googleAnalyticsId || 'GTM-NCVSCLRN').trim();
  const gtmMatch = rawGa.match(/\b(GTM-[A-Z0-9]+)\b/i);
  const gtagMatch = rawGa.match(/\b((?:G|GT|AW|UA)-[A-Z0-9-]+)\b/i);
  const gtmId = gtmMatch ? gtmMatch[1].toUpperCase() : null;
  const gaId = !gtmId && gtagMatch ? gtagMatch[1].toUpperCase() : null;

  // Dynamically load GA4 / GTM from Sanity on the client during idle time if not already injected in static HTML
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadAnalytics = () => {
      if (gtmId) {
        const scriptId = `sanity-gtm-${gtmId}`;
        if (!document.getElementById(scriptId) && !document.querySelector(`script[src*="gtm.js?id=${gtmId}"]`)) {
          const w = window as any;
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          const s = document.createElement('script');
          s.id = scriptId;
          s.async = true;
          s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
          document.head.appendChild(s);
        }
      } else if (gaId) {
        const scriptId = `sanity-ga-${gaId}`;
        const w = window as any;
        if (!document.getElementById(scriptId) && !document.querySelector(`script[src*="gtag/js?id=${gaId}"]`)) {
          w.dataLayer = w.dataLayer || [];
          w.gtag = function gtag() {
            w.dataLayer.push(arguments);
          };
          w.gtag('js', new Date());
          w.gtag('config', gaId);

          const s = document.createElement('script');
          s.id = scriptId;
          s.async = true;
          s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
          document.head.appendChild(s);
        }
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadAnalytics, { timeout: 2500 });
    } else {
      setTimeout(loadAnalytics, 1000);
    }
  }, [gaId, gtmId]);

  // Track SPA route changes in GA4 / GTM
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const w = window as any;
    if (gtmId) {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: 'page_view', page_path: pathname });
    } else if (gaId && typeof w.gtag === 'function') {
      w.gtag('config', gaId, { page_path: pathname });
    }
  }, [pathname, gaId, gtmId]);

  return (
    <Helmet>
      {metaTitle && <title>{metaTitle}</title>}
      {metaDescription && <meta name="description" content={metaDescription} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex !== undefined && (
        <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      )}
      {keywords?.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {gscVerification && <meta name="google-site-verification" content={gscVerification} />}
      {metaTitle && <meta property="og:title" content={metaTitle} />}
      {metaDescription && <meta property="og:description" content={metaDescription} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      {metaTitle && <meta name="twitter:title" content={metaTitle} />}
      {metaDescription && <meta name="twitter:description" content={metaDescription} />}
      {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}
      {structuredData && <script type="application/ld+json">{structuredData}</script>}
    </Helmet>
  );
}

interface AppProps {
  url?: string;
}

function CustomCursor() {
  const [active, setActive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { damping: 28, stiffness: 280, mass: 0.5 });
  const y = useSpring(cursorY, { damping: 28, stiffness: 280, mass: 0.5 });

  useEffect(() => {
    // Only attach mousemove listener on devices with a fine pointer (desktop) and not bot
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      navigator.webdriver
    ) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (!active) setActive(true);
      cursorX.set(e.clientX - 14);
      cursorY.set(e.clientY - 14);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, active]);

  if (!active) return null;

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-7 h-7 rounded-full border border-brand-accent/70 pointer-events-none z-[9999] will-change-transform"
      style={{ x, y }}
    />
  );
}

function AppContent({ showPreloader, scaleX }: { showPreloader: boolean; scaleX: any }) {
  const location = useLocation();
  const isSSR = typeof window === 'undefined';

  return (
    <>
      <ScrollToTop />
      <SanityLiveSeo />
      <div className="relative [overflow-x:clip]">
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-0.5 bg-brand-accent origin-left z-[100]"
          style={{ scaleX }}
        />

        {/* Custom Cursor — single ring */}
        <CustomCursor />

        <Navbar />

        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about-us" element={<Navigate to="/about" replace />} />
            <Route path="/practice-areas" element={<PracticeAreasPage />} />
            <Route path="/services" element={<Navigate to="/practice-areas" replace />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/our-team" element={<Navigate to="/team" replace />} />
            <Route path="/attorneys" element={<Navigate to="/team" replace />} />
            <Route path="/team/:id" element={<TeamMemberPage />} />
            <Route path="/our-team/:id" element={<TeamMemberPage />} />
            <Route path="/attorney/:id" element={<TeamMemberPage />} />
            <Route path="/attorneys/:id" element={<TeamMemberPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="/popia" element={<Navigate to="/privacy" replace />} />
            <Route path="/paia" element={<Navigate to="/privacy?tab=paia" replace />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>

        <Footer hideStatement={location.pathname !== '/'} />
        <CookieBanner />
        <AdminToolbar />
      </div>
    </>
  );
}

export default function App({ url }: AppProps = {}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showPreloader, setShowPreloader] = useState(() => {
    return typeof window !== 'undefined' ? !sessionStorage.getItem('ss_visited') : false;
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('ss_visited', '1');
    setShowPreloader(false);
  };

  const isSSR = typeof window === 'undefined';
  const RouterComponent = isSSR ? MemoryRouter : BrowserRouter;
  const routerProps = isSSR ? { initialEntries: [url || '/'] } : {};

  return (
    <MotionConfig reducedMotion="user">
      <EditProvider>
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

        <RouterComponent {...routerProps}>
          <AppContent showPreloader={showPreloader} scaleX={scaleX} />
        </RouterComponent>
      </EditProvider>
    </MotionConfig>
  );
}
