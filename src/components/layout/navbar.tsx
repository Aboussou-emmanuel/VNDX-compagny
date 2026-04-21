import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À Propos', href: '/a-propos' },
  { label: 'Services', href: '/services' },
  { label: 'Talents', href: '/talents' },
  { label: 'Partenaires', href: '/partenaires' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(249,115,22,0.15)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-orange-500 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <span className="font-display text-black text-xl font-bold leading-none">V</span>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-white text-2xl tracking-widest">VNDX</span>
            <span className="text-orange-500 text-xs font-medium tracking-[0.2em] uppercase">Sport Agency</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
                isActive(link.href)
                  ? 'text-orange-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-orange-500 transition-all duration-300 ${
                isActive(link.href) ? 'w-4/5' : 'w-0 group-hover:w-4/5'
              }`} />
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/recrutement"
            className="px-5 py-2.5 border border-orange-500 text-orange-500 text-sm font-semibold hover:bg-orange-500 hover:text-black transition-all duration-200"
          >
            Soumettre mon profil
          </Link>
          <Link
            to="/talents"
            className="px-5 py-2.5 bg-orange-500 text-black text-sm font-semibold hover:bg-orange-400 transition-all duration-200 flex items-center gap-1.5"
          >
            Recruter <ChevronRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(0,0,0,0.98)', backdropFilter: 'blur(20px)' }}
      >
        <div className="px-6 py-6 flex flex-col gap-2 border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`py-3 px-4 text-base font-medium border-b border-white/5 transition-colors ${
                isActive(link.href) ? 'text-orange-500' : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <Link to="/recrutement" className="py-3 text-center border border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-black transition-all duration-200">
              Soumettre mon profil
            </Link>
            <Link to="/talents" className="py-3 text-center bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-all duration-200">
              Recruter un talent
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
