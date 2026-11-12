import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'ss_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleReopen = () => setVisible(true);
    window.addEventListener('open-cookie-banner', handleReopen);
    return () => window.removeEventListener('open-cookie-banner', handleReopen);
  }, []);

  const handleChoice = (choice: 'all' | 'essential') => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ choice, timestamp: new Date().toISOString() })
    );
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: choice }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-5 z-[90] sm:max-w-lg"
        >
          <div className="bg-brand-primary/95 text-brand-cream border border-white/12 rounded-xl px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.35)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <p className="text-[11px] leading-relaxed text-brand-cream/75 font-light">
              We use cookies for core site functionality and anonymous analytics. Read our{' '}
              <Link
                to="/privacy"
                onClick={() => setVisible(false)}
                className="text-brand-accent underline underline-offset-4 hover:text-brand-cream transition-colors font-normal"
              >
                POPIA &amp; Privacy Policy
              </Link>
              .
            </p>

            <div className="flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleChoice('essential')}
                className="px-3.5 py-1.5 rounded-full border border-white/15 text-brand-cream/80 hover:text-white hover:border-white/35 text-[9px] uppercase tracking-[1.5px] font-bold transition-colors cursor-pointer"
              >
                Essential
              </button>
              <button
                type="button"
                onClick={() => handleChoice('all')}
                className="px-4 py-1.5 rounded-full bg-brand-accent text-white hover:bg-white hover:text-brand-primary text-[9px] uppercase tracking-[1.5px] font-bold transition-colors cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
