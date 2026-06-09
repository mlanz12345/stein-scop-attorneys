import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useEdit } from '../context/EditContext';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { isEditing, setIsEditing } = useEdit();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 100);
  });

  // Secret admin shortcut: Ctrl+Shift+E
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        setIsEditing(!isEditing);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setIsEditing]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Practice Areas', href: '/practice-areas' },
    { name: 'Our Team', href: '/team' },
    { name: 'Insights', href: '/insights' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const isTransparent = !isScrolled && location.pathname === '/';

  return (
    <motion.nav
      animate={{
        height: isScrolled ? 72 : 100,
        backgroundColor: isScrolled ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
        borderColor: isScrolled ? 'rgba(226,232,240,1)' : 'rgba(226,232,240,0)',
        boxShadow: isScrolled ? '0 1px 3px 0 rgb(0 0 0 / 0.1)' : 'none',
      }}
      className="fixed top-0 left-0 w-full z-50 px-8 lg:px-16 flex justify-between items-center border-b"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <motion.img
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          src="/logo-new.png"
          alt="Stein Scop"
          fetchPriority="high"
          className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${
            isTransparent ? 'brightness-100' : 'brightness-0'
          }`}
        />
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, i) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link
              to={link.href}
              className={`text-[12px] font-semibold uppercase tracking-[1px] hover:text-brand-accent transition-colors ${
                isTransparent ? 'text-white/90' : 'text-brand-text'
              } ${location.pathname === link.href ? 'text-brand-accent' : ''}`}
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Phone CTA */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="tel:+27113808080"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[1.5px] transition-all duration-500 ${
            isTransparent
              ? 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-brand-primary'
              : 'bg-brand-primary text-white hover:bg-brand-accent'
          }`}
        >
          <Phone size={12} />
          +27 11 380 80 80
        </a>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={isTransparent ? 'text-white' : 'text-brand-primary'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white p-8 flex flex-col space-y-5 md:hidden border-b border-brand-border shadow-xl text-brand-primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-semibold uppercase tracking-[1px] hover:text-brand-accent transition-colors ${
                location.pathname === link.href ? 'text-brand-accent' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="tel:+27113808080"
            className="flex items-center gap-2 text-sm font-bold text-brand-accent"
          >
            <Phone size={14} /> +27 11 380 80 80
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
