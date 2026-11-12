import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Editable } from '../components/Editable';

interface FooterProps {
  hideStatement?: boolean;
}

export default function Footer({ hideStatement = false }: FooterProps) {
  return (
    <footer id="contact" className="bg-brand-primary text-brand-cream">

      {/* ── Statement bar ─────────────────────────────────── */}
      {!hideStatement && (
        <div className="border-b border-white/10 px-12 lg:px-24 py-16 text-center">
          <p className="font-serif italic text-brand-cream/80 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Strategy · Insight · Outcome
          </p>
          <div className="w-12 h-px bg-brand-accent mx-auto mt-6" />
        </div>
      )}

      {/* ── Columns ───────────────────────────────────────── */}
      <div className="px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-lg font-serif italic text-white/90 leading-relaxed">
              Stein Scop Attorneys Inc.
            </p>
            <p className="text-xs text-white/60 font-light leading-relaxed max-w-xs">
              A director-led commercial law firm headquartered in Sandton, Johannesburg — advising clients across South Africa and the African continent.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12">

            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.35em] text-brand-accent font-bold">
                Office
              </h3>
              <p className="text-sm font-light text-white/50 leading-relaxed">
                <a
                  href="https://maps.google.com/?q=Second+Floor+Capital+Hill+6+Benmore+Road+Morningside+Sandton"
                  className="address-link hover:text-brand-accent transition-colors block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Editable id="footer_address_line_1" defaultText="Second Floor, Capital Hill" /><br />
                  <Editable id="footer_address_line_2" defaultText="6 Benmore Road, Morningside" /><br />
                  Sandton, Gauteng, 2057
                </a>
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.35em] text-brand-accent font-bold">
                Connect
              </h3>
              <ul className="space-y-4 text-sm font-light text-white/70">
                <li>
                  <a href="tel:+27113808080"
                    className="hover:text-brand-accent transition-colors flex items-center gap-2">
                    <Phone size={12} />
                    <Editable id="footer_phone" defaultText="+27 (0)11 380 80 80" />
                  </a>
                </li>
                <li>
                  <a href="mailto:info@steinscop.com"
                    className="hover:text-brand-accent transition-colors flex items-center gap-2">
                    <Mail size={12} />
                    <Editable id="footer_email" defaultText="info@steinscop.com" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.35em] text-brand-accent font-bold">
                Quick Links
              </h3>
              <ul className="space-y-3 text-sm font-light text-white/50">
                <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
                <li><Link to="/practice-areas" className="hover:text-brand-accent transition-colors">Practice Areas</Link></li>
                <li><Link to="/team" className="hover:text-brand-accent transition-colors">Our Team</Link></li>
                <li><Link to="/careers" className="hover:text-brand-accent transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-brand-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Legal bar ─────────────────────────────────────── */}
      <div className="border-t border-white/10 px-6 md:px-12 lg:px-24 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[2px] text-white/60">
            &copy; {new Date().getFullYear()} Stein Scop Attorneys Inc. (Reg. No. 2015/306625/21). All rights reserved.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] uppercase tracking-[2px] text-white/65">
            <Link to="/privacy" className="hover:text-brand-accent transition-colors">
              POPIA Privacy Policy
            </Link>
            <span className="text-white/15">·</span>
            <Link to="/privacy?tab=paia" className="hover:text-brand-accent transition-colors">
              PAIA Manual
            </Link>
            <span className="text-white/15">·</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-banner'))}
              className="uppercase tracking-[2px] hover:text-brand-accent transition-colors cursor-pointer"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
