import { Mail, Phone } from 'lucide-react';
import { Editable } from '../components/Editable';

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-primary text-brand-cream">

      {/* ── Statement bar ─────────────────────────────────── */}
      <div className="border-b border-white/10 px-12 lg:px-24 py-16 text-center">
        <p className="font-serif italic text-brand-cream/80 leading-tight"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
          Strategy · Insight · Outcome
        </p>
        <div className="w-12 h-px bg-brand-accent mx-auto mt-6" />
      </div>

      {/* ── Columns ───────────────────────────────────────── */}
      <div className="px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-lg font-serif italic text-white/90 leading-relaxed">
              Stein Scop Attorneys Inc.
            </p>
            <p className="text-xs text-white/35 font-light leading-relaxed max-w-xs">
              A director-led commercial law firm headquartered in Sandton, Johannesburg — advising clients across South Africa and the African continent.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-12">

            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.35em] text-brand-accent font-bold">
                Office
              </h4>
              <p className="text-sm font-light text-white/50 leading-relaxed">
                <Editable id="footer_address_line_1" defaultText="Second Floor, Capital Hill" /><br />
                <Editable id="footer_address_line_2" defaultText="6 Benmore Road, Morningside" /><br />
                Sandton, Gauteng, 2057
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.35em] text-brand-accent font-bold">
                Connect
              </h4>
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
              <h4 className="text-[10px] uppercase tracking-[0.35em] text-brand-accent font-bold">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm font-light text-white/50">
                <li><a href="/about" className="hover:text-brand-accent transition-colors">About Us</a></li>
                <li><a href="/practice-areas" className="hover:text-brand-accent transition-colors">Practice Areas</a></li>
                <li><a href="/team" className="hover:text-brand-accent transition-colors">Our Team</a></li>
                <li><a href="/insights" className="hover:text-brand-accent transition-colors">Insights</a></li>
                <li><a href="/careers" className="hover:text-brand-accent transition-colors">Careers</a></li>
                <li><a href="/contact" className="hover:text-brand-accent transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Legal bar ─────────────────────────────────────── */}
      <div className="border-t border-white/10 px-12 lg:px-24 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] uppercase tracking-[2px] text-white/25">
            &copy; {new Date().getFullYear()} Stein Scop Attorneys Inc. All rights reserved.
          </span>
          <div className="flex gap-8 text-[10px] uppercase tracking-[2px] text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">PAIA Manual</a>
            <a href="#" className="hover:text-white/50 transition-colors">POPIA Policy</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
