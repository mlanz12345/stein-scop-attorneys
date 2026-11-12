import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';

function ConsentAwareTelemetry() {
  const [allowAnalytics, setAllowAnalytics] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem('ss_cookie_consent');
      if (!raw) return false;
      return JSON.parse(raw)?.choice === 'all';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>;
      setAllowAnalytics(custom.detail === 'all');
    };
    window.addEventListener('cookie-consent-updated', handler);
    return () => window.removeEventListener('cookie-consent-updated', handler);
  }, []);

  if (!allowAnalytics) return null;

  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

const rootElement = document.getElementById('root')!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
    <ConsentAwareTelemetry />
  </StrictMode>
);

createRoot(rootElement).render(app);
