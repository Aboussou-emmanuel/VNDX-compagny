import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Star, Trophy, Users, TrendingUp, Play, Quote } from 'lucide-react';
import { Athlete, Testimonial } from '../types';
import { mockAthletes, mockTestimonials } from '../data/mock';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const heroImages = [
  'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&cs=tinysrgb&w=1920',
];

const stats = [
  { value: '200+', label: 'Athlètes accompagnés', icon: Users },
  { value: '85%', label: 'Taux de placement pro', icon: TrendingUp },
  { value: '50+', label: 'Clubs partenaires', icon: Trophy },
  { value: '8', label: 'Années d\'expérience', icon: Star },
];

const services = [
  {
    number: '01',
    title: 'Communication',
    description: 'Construisez une image de marque puissante. Nous créons votre identité digitale et gérons votre présence sur les réseaux sociaux.',
    items: ['Personal Branding', 'Gestion réseaux sociaux', 'Relations presse', 'Contenu vidéo'],
    href: '/services',
    bg: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    number: '02',
    title: 'Stratégie',
    description: 'Une feuille de route claire pour atteindre vos objectifs. Nous définissons chaque étape de votre progression vers le sommet.',
    items: ['Planification carrière', 'Négociation contrats', 'Conseil positioning', 'Mentoring'],
    href: '/services',
    bg: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    number: '03',
    title: 'Détection Talents',
    description: 'Notre réseau de scouts identifie les pépites et les connecte aux clubs et structures qui leur correspondent.',
    items: ['Scouting national', 'Mise en relation clubs', 'Évaluation performance', 'Vidéo highlights'],
    href: '/talents',
    bg: 'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const statsSection = useInView();
  const servicesSection = useInView();
  const talentsSection = useInView();
  const testimonialsSection = useInView();

  useEffect(() => {
    const interval = setInterval(() => setHeroIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Use mock data immediately
    setAthletes(mockAthletes);
    setTestimonials(mockTestimonials);
  }, []);

  const sportIcon = (sport: string) => {
    const icons: Record<string, string> = {
      Football: '⚽', Basketball: '🏀', Boxe: '🥊', Karaté: '🥋',
    };
    return icons[sport] || '🏆';
  };

  return (
    <div className="bg-black">
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background */}
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: i === heroIdx ? 1 : 0,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 40%)' }} />

        {/* Orange accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-4 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-orange-400 text-sm font-medium tracking-widest uppercase">Agence d'Élite Sportive</span>
            </div>
            <h1 className="font-display text-7xl sm:text-8xl lg:text-[9rem] leading-none text-white mb-6 animate-fade-up">
              ÉLEVER
              <br />
              <span className="gradient-text">L'EXCELLENCE</span>
              <br />
              SPORTIVE
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-xl leading-relaxed mb-10 animate-fade-up delay-200">
              Communication, stratégie et détection de talents — Nous propulsons les athlètes d'exception vers le sommet de leur discipline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <Link
                to="/recrutement"
                className="group inline-flex items-center justify-center gap-3 bg-orange-500 text-black px-8 py-4 font-bold text-base hover:bg-orange-400 transition-all duration-200 orange-glow"
              >
                Soumettre mon profil
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/talents"
                className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-8 py-4 font-bold text-base hover:bg-white hover:text-black transition-all duration-200"
              >
                <Play size={16} />
                Voir nos talents
              </Link>
            </div>
          </div>
        </div>

        {/* Hero indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className={`h-0.5 transition-all duration-300 ${i === heroIdx ? 'w-8 bg-orange-500' : 'w-4 bg-white/30'}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 right-8 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-xs uppercase tracking-widest rotate-90 origin-center mb-4">Scroll</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* STATS */}
      <section ref={statsSection.ref} className="py-20 bg-orange-500 relative overflow-hidden stripe-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className={`text-center transition-all duration-700 ${statsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Icon size={28} className="text-black/60 mx-auto mb-3" />
                  <div className="font-display text-5xl lg:text-6xl text-black">{s.value}</div>
                  <div className="text-black/70 text-sm font-medium mt-1">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servicesSection.ref} className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${servicesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Ce que nous faisons</span>
            <h2 className="font-display text-6xl lg:text-7xl text-white mt-2">NOS SERVICES</h2>
            <div className="w-16 h-1 bg-orange-500 mt-4" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className={`relative group overflow-hidden transition-all duration-700 card-hover ${servicesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${s.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                <div className="relative z-10 p-8 h-full flex flex-col min-h-[440px]">
                  <span className="font-display text-orange-500/30 text-7xl font-bold leading-none mb-4">{s.number}</span>
                  <h3 className="font-display text-4xl text-white mb-4">{s.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{s.description}</p>
                  <ul className="space-y-2 mb-8">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={s.href}
                    className="mt-auto inline-flex items-center gap-2 text-orange-500 font-semibold text-sm group-hover:gap-4 transition-all duration-200"
                  >
                    En savoir plus <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TALENTS */}
      <section ref={talentsSection.ref} className="py-28" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div className={`transition-all duration-700 ${talentsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Nos talents en vedette</span>
              <h2 className="font-display text-6xl lg:text-7xl text-white mt-2">TALENTS</h2>
              <div className="w-16 h-1 bg-orange-500 mt-4" />
            </div>
            <Link
              to="/talents"
              className="inline-flex items-center gap-2 border border-orange-500 text-orange-500 px-6 py-3 text-sm font-semibold hover:bg-orange-500 hover:text-black transition-all duration-200 shrink-0"
            >
              Voir tous les talents <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {athletes.length === 0 ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-96 bg-white/5 animate-pulse" />
              ))
            ) : athletes.map((athlete, i) => (
              <Link
                key={athlete.id}
                to={`/talents/${athlete.id}`}
                className={`group relative overflow-hidden block transition-all duration-700 card-hover ${talentsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={athlete.photo_url}
                    alt={athlete.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold bg-orange-500 text-black px-2 py-0.5 uppercase tracking-wide">
                      {athlete.sport}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg">{athlete.name}</h3>
                  <p className="text-gray-400 text-sm">{athlete.position} · {athlete.age} ans</p>
                  <div className="mt-3 flex items-center gap-2 text-orange-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    Voir le profil <ArrowRight size={12} />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-2xl">{sportIcon(athlete.sport)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-28 bg-black relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Vous êtes un athlète ?</span>
              <h2 className="font-display text-6xl lg:text-7xl text-white mt-2 mb-6">
                REJOIGNEZ<br />L'ÉLITE
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Vous avez le talent, nous avons le réseau. Soumettez votre profil et laissez notre équipe d'experts vous propulser vers le niveau supérieur.
              </p>
              <Link
                to="/recrutement"
                className="inline-flex items-center gap-3 bg-orange-500 text-black px-8 py-4 font-bold text-base hover:bg-orange-400 transition-all duration-200 orange-glow"
              >
                Déposer ma candidature <ArrowRight size={18} />
              </Link>
            </div>
            <div>
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Vous êtes un club ou agent ?</span>
              <h2 className="font-display text-6xl lg:text-7xl text-white mt-2 mb-6">
                RECRUTEZ<br />MIEUX
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Accédez à notre vivier de talents pré-sélectionnés et identifiez les profils qui correspondent exactement à vos besoins.
              </p>
              <Link
                to="/talents"
                className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 font-bold text-base hover:bg-white hover:text-black transition-all duration-200"
              >
                Explorer les talents <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialsSection.ref} className="py-28" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${testimonialsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Ils nous font confiance</span>
            <h2 className="font-display text-6xl lg:text-7xl text-white mt-2">TÉMOIGNAGES</h2>
            <div className="w-16 h-1 bg-orange-500 mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`glass p-6 transition-all duration-700 card-hover ${testimonialsSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Quote size={24} className="text-orange-500 mb-4" />
                <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">{t.content}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar_url} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-orange-500 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-orange-500 fill-orange-500" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS */}
      <section className="py-16 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-10">Nos sports de prédilection</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['Football', 'Basketball', 'Boxe', 'Karaté'].map((sport) => (
              <div key={sport} className="flex items-center gap-3 group cursor-pointer">
                <span className="text-3xl">{sport === 'Football' ? '⚽' : sport === 'Basketball' ? '🏀' : sport === 'Boxe' ? '🥊' : '🥋'}</span>
                <span className="font-display text-2xl text-white/50 group-hover:text-white transition-colors tracking-widest">{sport.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}