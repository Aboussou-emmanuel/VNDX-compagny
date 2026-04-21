import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

const quickLinks = [
  { label: 'À Propos', href: '/a-propos' },
  { label: 'Services', href: '/services' },
  { label: 'Nos Talents', href: '/talents' },
  { label: 'Recrutement', href: '/recrutement' },
  { label: 'Partenaires', href: '/partenaires' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const sports = ['Football', 'Basketball', 'Boxe', 'Karaté'];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      {/* Top Banner */}
      <div className="bg-orange-500 py-4 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8 text-black font-display text-lg tracking-widest">
              VNDX SPORT AGENCY
              <span className="text-black/40">✦</span>
              EXCELLENCE ATHLÉTIQUE
              <span className="text-black/40">✦</span>
              RECRUTEMENT D'ÉLITE
              <span className="text-black/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <span className="font-display text-black text-xl">V</span>
              </div>
              <div>
                <div className="font-display text-white text-2xl tracking-widest">VNDX</div>
                <div className="text-orange-500 text-xs tracking-[0.2em] uppercase">Sport Agency</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Nous propulsons les athlètes d'exception vers le sommet. Communication, stratégie et détection de talents au service de votre carrière.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6 after:block after:w-8 after:h-0.5 after:bg-orange-500 after:mt-2">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6 after:block after:w-8 after:h-0.5 after:bg-orange-500 after:mt-2">
              Sports
            </h3>
            <ul className="space-y-3">
              {sports.map((sport) => (
                <li key={sport}>
                  <Link
                    to={`/talents?sport=${sport}`}
                    className="text-gray-400 text-sm hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {sport}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 after:block after:w-8 after:h-0.5 after:bg-orange-500 after:mt-2">
                Admin
              </h3>
              <Link to="/admin" className="text-gray-500 text-xs hover:text-orange-500 transition-colors">
                Espace Administration
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-6 after:block after:w-8 after:h-0.5 after:bg-orange-500 after:mt-2">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-orange-500 mt-0.5 shrink-0" />
                <a href="mailto:Companyvndx@gmail.com" className="text-gray-400 text-sm hover:text-white transition-colors">
                  Companyvndx@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-orange-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">+33 1 XX XX XX XX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-orange-500 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">Paris, France</span>
              </li>
            </ul>
            <a
              href="https://wa.me/33600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#1fba59] transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} VNDX Sport Agency. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Mentions légales</Link>
            <Link to="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
