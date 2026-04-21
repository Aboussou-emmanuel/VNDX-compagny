import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Compass, Search, ArrowRight, Check } from 'lucide-react';

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

const services = [
  {
    icon: Megaphone,
    category: 'Communication',
    tagline: 'Votre image, notre expertise',
    description: 'Dans le sport moderne, la performance ne suffit plus. Une image forte multiplie votre valeur marchande et ouvre des portes insoupçonnées. Nous construisons votre marque personnelle depuis zéro.',
    packages: [
      {
        name: 'Personal Branding',
        features: ['Création d\'identité visuelle', 'Bio professionnelle', 'Stratégie de contenu', 'Photoshoots sportifs'],
      },
      {
        name: 'Social Media Management',
        features: ['Gestion Instagram & TikTok', 'Création de contenus premium', 'Croissance d\'audience', 'Statistiques mensuelles'],
      },
      {
        name: 'Relations Presse',
        features: ['Communiqués de presse', 'Interviews médias', 'Couverture événementielle', 'Image publique'],
      },
    ],
    image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#f97316',
  },
  {
    icon: Compass,
    category: 'Stratégie',
    tagline: 'Une feuille de route vers le sommet',
    description: 'Chaque carrière est unique. Nous analysons votre profil, vos objectifs et votre marché pour construire une stratégie sur mesure qui maximise votre valeur à chaque étape.',
    packages: [
      {
        name: 'Conseil Carrière',
        features: ['Audit de profil', 'Plan de développement', 'Objectifs à 1, 3 et 5 ans', 'Suivi trimestriel'],
      },
      {
        name: 'Négociation & Contrats',
        features: ['Analyse des offres', 'Négociation salariale', 'Clauses de performance', 'Protection des intérêts'],
      },
      {
        name: 'Sponsoring',
        features: ['Identification sponsors', 'Pitch deck athlète', 'Négociation partenariats', 'Activation marque'],
      },
    ],
    image: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#f97316',
  },
  {
    icon: Search,
    category: 'Détection Talents',
    tagline: 'Du terrain au contrat professionnel',
    description: 'Notre réseau de scouts couvre toute la France et l\'Europe. Nous identifions les talents bruts, les évaluons et les mettons en relation avec les clubs et académies qui correspondent à leur niveau.',
    packages: [
      {
        name: 'Scouting & Évaluation',
        features: ['Évaluation physique & technique', 'Rapport de performance', 'Comparatif de marché', 'Test en conditions réelles'],
      },
      {
        name: 'Mise en Relation',
        features: ['Accès au réseau de clubs', 'Organisation de trials', 'Négociation de transferts', 'Suivi post-signature'],
      },
      {
        name: 'Highlights & Média',
        features: ['Production vidéo highlights', 'Diffusion aux recruteurs', 'Profil numérique complet', 'Mise à jour continue'],
      },
    ],
    image: 'https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#f97316',
  },
];

export default function Services() {
  const s1 = useInView();
  const s2 = useInView();
  const s3 = useInView();
  const cta = useInView();
  const sections = [s1, s2, s3];

  useEffect(() => {
    document.title = 'Services | VNDX Sport Agency';
  }, []);

  return (
    <div className="bg-black pt-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Notre offre complète</span>
          <h1 className="font-display text-7xl lg:text-8xl text-white mt-2">SERVICES</h1>
          <div className="w-16 h-1 bg-orange-500 mt-4" />
          <p className="text-gray-300 text-xl mt-6 max-w-2xl">
            Trois piliers d'expertise pour propulser votre carrière vers le niveau supérieur.
          </p>
        </div>
      </section>

      {/* Services detail */}
      {services.map((service, idx) => {
        const Icon = service.icon;
        const s = sections[idx];
        return (
          <section key={idx} ref={s.ref} className={`py-24 ${idx % 2 === 0 ? 'bg-black' : ''}`} style={idx % 2 !== 0 ? { background: '#0a0a0a' } : {}}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div
                  className={`transition-all duration-700 ${s.visible ? 'opacity-100 translate-x-0' : `opacity-0 ${idx % 2 === 0 ? '-translate-x-8' : 'translate-x-8'}`} ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500 flex items-center justify-center">
                      <Icon size={20} className="text-black" />
                    </div>
                    <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">{service.category}</span>
                  </div>
                  <h2 className="font-display text-5xl lg:text-6xl text-white mb-4">{service.tagline.toUpperCase()}</h2>
                  <div className="w-12 h-1 bg-orange-500 mb-6" />
                  <p className="text-gray-300 leading-relaxed text-lg mb-10">{service.description}</p>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {service.packages.map((pkg, j) => (
                      <div key={j} className="glass p-5 hover:border-orange-500/30 transition-colors">
                        <h4 className="text-white font-semibold text-sm mb-4">{pkg.name}</h4>
                        <ul className="space-y-2">
                          {pkg.features.map((f, k) => (
                            <li key={k} className="flex items-start gap-2 text-gray-400 text-xs">
                              <Check size={12} className="text-orange-500 shrink-0 mt-0.5" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className={`relative transition-all duration-700 delay-200 ${s.visible ? 'opacity-100 translate-x-0' : `opacity-0 ${idx % 2 === 0 ? 'translate-x-8' : '-translate-x-8'}`} ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <img
                    src={service.image}
                    alt={service.category}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500/10 border border-orange-500/30" />
                  <div className="absolute inset-0 border border-white/5" />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section ref={cta.ref} className="py-24 bg-orange-500 relative overflow-hidden stripe-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-700 ${cta.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-display text-6xl lg:text-7xl text-black mb-6">PRÊT À FRANCHIR<br />LE NIVEAU SUPÉRIEUR ?</h2>
            <p className="text-black/70 text-lg mb-10">
              Contactez-nous pour une consultation gratuite et découvrez comment VNDX peut transformer votre carrière.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/recrutement" className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 font-bold text-base hover:bg-gray-900 transition-colors">
                Déposer ma candidature <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-black text-black px-8 py-4 font-bold text-base hover:bg-black hover:text-white transition-all duration-200">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
