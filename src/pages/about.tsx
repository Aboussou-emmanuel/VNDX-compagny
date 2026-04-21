import { useEffect, useRef, useState } from 'react';
import { Shield, Target, Zap, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { TeamMember } from '../types';

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

const values = [
  { icon: Shield, title: 'Intégrité', desc: 'Nous agissons avec honnêteté et transparence dans toutes nos relations avec les athlètes, clubs et partenaires.' },
  { icon: Target, title: 'Excellence', desc: 'Nous visons le plus haut standard dans chaque service que nous fournissons, sans jamais compromettre la qualité.' },
  { icon: Zap, title: 'Innovation', desc: 'Nous utilisons les outils les plus avancés pour détecter les talents et maximiser leur visibilité.' },
  { icon: Award, title: 'Résultats', desc: 'Notre succès se mesure au succès de nos athlètes. Chaque décision est orientée vers des résultats concrets.' },
];

const milestones = [
  { year: '2016', event: 'Fondation de VNDX Sport Agency à Paris' },
  { year: '2018', event: 'Premier partenariat avec un club de Ligue 1' },
  { year: '2020', event: 'Expansion aux sports de combat (Boxe & Karaté)' },
  { year: '2022', event: '100ème athlète professionnel accompagné' },
  { year: '2023', event: 'Ouverture du département Basketball' },
  { year: '2024', event: 'Plus de 200 athlètes sous représentation' },
];

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const missionSection = useInView();
  const valuesSection = useInView();
  const timelineSection = useInView();
  const teamSection = useInView();

  useEffect(() => {
    document.title = 'À Propos | VNDX Sport Agency';
    supabase.from('team_members').select('*').eq('active', true).order('order_index').then(({ data }) => {
      if (data) setTeam(data);
    });
  }, []);

  return (
    <div className="bg-black pt-20">
      {/* HERO */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Notre histoire</span>
          <h1 className="font-display text-7xl lg:text-8xl text-white mt-2">À PROPOS</h1>
          <div className="w-16 h-1 bg-orange-500 mt-4" />
        </div>
      </section>

      {/* MISSION */}
      <section ref={missionSection.ref} className="py-24" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-700 ${missionSection.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Notre mission</span>
              <h2 className="font-display text-5xl lg:text-6xl text-white mt-2 mb-6">
                PROPULSER LES<br /><span className="gradient-text">CHAMPIONS</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                VNDX Sport Agency est née d'une conviction simple : le talent ne suffit pas. Les meilleurs athlètes méritent un accompagnement d'exception pour transformer leur potentiel en carrière durable.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Depuis 2016, nous accompagnons des centaines d'athlètes dans leur développement professionnel, en combinant expertise sportive, stratégie de communication et un réseau inégalé de clubs et sponsors partenaires.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[{ v: '200+', l: 'Athlètes' }, { v: '50+', l: 'Clubs partenaires' }, { v: '4', l: 'Sports' }].map((s, i) => (
                  <div key={i} className="border-l-2 border-orange-500 pl-4">
                    <div className="font-display text-3xl text-white">{s.v}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wide mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative transition-all duration-700 delay-200 ${missionSection.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <img
                src="https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Mission"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-500 p-6">
                <p className="font-display text-4xl text-black">8</p>
                <p className="text-black/70 text-xs uppercase tracking-wide font-medium">Années d'expérience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section ref={valuesSection.ref} className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${valuesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Ce qui nous définit</span>
            <h2 className="font-display text-6xl text-white mt-2">NOS VALEURS</h2>
            <div className="w-16 h-1 bg-orange-500 mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className={`glass p-8 group hover:border-orange-500/30 transition-all duration-700 card-hover ${valuesSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-200">
                    <Icon size={22} className="text-orange-500 group-hover:text-black transition-colors duration-200" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section ref={timelineSection.ref} className="py-24" style={{ background: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 text-center transition-all duration-700 ${timelineSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Notre parcours</span>
            <h2 className="font-display text-6xl text-white mt-2">CHRONOLOGIE</h2>
            <div className="w-16 h-1 bg-orange-500 mt-4 mx-auto" />
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/10" />
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`flex items-center gap-8 mb-12 transition-all duration-700 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} ${timelineSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="font-display text-orange-500 text-3xl">{m.year}</div>
                  <p className="text-gray-300 text-sm mt-1">{m.event}</p>
                </div>
                <div className="w-4 h-4 bg-orange-500 rounded-full shrink-0 relative z-10" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section ref={teamSection.ref} className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${teamSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Les experts</span>
            <h2 className="font-display text-6xl text-white mt-2">NOTRE ÉQUIPE</h2>
            <div className="w-16 h-1 bg-orange-500 mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={member.id}
                className={`group relative overflow-hidden card-hover transition-all duration-700 ${teamSection.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-orange-500 text-xs font-semibold uppercase tracking-wide mb-1">{member.role}</p>
                  <h3 className="text-white font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-400 text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
