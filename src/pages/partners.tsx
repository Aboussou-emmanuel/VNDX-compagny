import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Star, Quote } from 'lucide-react';
import { Partner, Testimonial } from '../types';
import { mockPartners, mockTestimonials } from '../data/mock';

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const benefits = [
  { title: 'Accès prioritaire', desc: 'Soyez les premiers à découvrir nos nouveaux talents avant leur mise en ligne publique.' },
  { title: 'Profils pré-qualifiés', desc: 'Chaque athlète est évalué par nos experts. Vous ne recevez que des profils qui correspondent à vos critères.' },
  { title: 'Accompagnement intégré', desc: 'Nous gérons la transition et l\'intégration de l\'athlète pour vous garantir un transfert serein.' },
  { title: 'Réseau exclusif', desc: 'Rejoignez un réseau de clubs, académies et sponsors partageant les mêmes exigences d\'excellence.' },
];

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const s1 = useInView();
  const s2 = useInView();
  const s3 = useInView();

  useEffect(() => {
    document.title = 'Partenaires | VNDX Sport Agency';
    setPartners(mockPartners);
    setTestimonials(mockTestimonials);
  }, []);

  return (
    <div className="bg-black pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1920)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Clubs, académies, sponsors</span>
          <h1 className="font-display text-7xl lg:text-8xl text-white mt-2">PARTENAIRES</h1>
          <div className="w-16 h-1 bg-orange-500 mt-4" />
          <p className="text-gray-300 text-xl mt-6 max-w-2xl">
            Un réseau d'excellence réunissant les meilleurs clubs, académies et sponsors du monde sportif.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section ref={s1.ref} className="py-24" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${s1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Pourquoi nous rejoindre</span>
            <h2 className="font-display text-6xl text-white mt-2">AVANTAGES PARTENAIRES</h2>
            <div className="w-16 h-1 bg-orange-500 mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className={`glass p-8 transition-all duration-700 card-hover ${s1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Building2 size={28} className="text-orange-500 mb-5" />
                <h3 className="text-white font-bold text-lg mb-3">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section ref={s2.ref} className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${s2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Ils nous font confiance</span>
            <h2 className="font-display text-6xl text-white mt-2">NOS PARTENAIRES</h2>
            <div className="w-16 h-1 bg-orange-500 mt-4" />
          </div>
          {partners.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {partners.map((p, i) => (
                <div
                  key={p.id}
                  className={`glass p-8 flex flex-col items-center gap-4 card-hover transition-all duration-700 ${s2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-16 h-16 overflow-hidden rounded-full">
                    <img src={p.logo_url} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">{p.name}</p>
                    <p className="text-orange-500 text-xs capitalize mt-0.5">{p.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['FC Olympique Lyon', 'Paris Basketball', 'Boxing Federation', 'Elite Sports Brand'].map((name, i) => (
                <div key={i} className="glass p-8 flex items-center justify-center h-32">
                  <span className="text-gray-400 font-semibold text-center text-sm">{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section ref={s3.ref} className="py-24" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${s3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Retours d'expérience</span>
            <h2 className="font-display text-6xl text-white mt-2">TÉMOIGNAGES</h2>
            <div className="w-16 h-1 bg-orange-500 mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`glass p-6 card-hover transition-all duration-700 ${s3.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Quote size={20} className="text-orange-500 mb-4" />
                <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">{t.content}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar_url} alt={t.name} className="w-10 h-10 object-cover rounded-full" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-orange-500 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={10} className="text-orange-500 fill-orange-500" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become partner CTA */}
      <section className="py-24 bg-orange-500 stripe-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-6xl lg:text-7xl text-black mb-6">DEVENEZ PARTENAIRE</h2>
          <p className="text-black/70 text-lg mb-10">
            Rejoignez notre réseau d'excellence et accédez en avant-première à nos meilleurs talents sportifs.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 font-bold text-base hover:bg-gray-900 transition-colors">
            Nous contacter <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
