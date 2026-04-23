import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, ExternalLink, ChevronRight } from 'lucide-react';
import { Athlete, LEVEL_LABELS } from '../types';
import { mockAthletes } from '../data/mock';

export default function TalentDetail() {
  const { id } = useParams<{ id: string }>();
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [related, setRelated] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const data = mockAthletes.find(a => a.id === id);
    setAthlete(data || null);
    setLoading(false);
    if (data) {
      document.title = `${data.name} | VNDX Sport Agency`;
      const rel = mockAthletes.filter(a => a.sport === data.sport && a.id !== id).slice(0, 3);
      setRelated(rel);
    }
  }, [id]);

  const sportColors: Record<string, string> = {
    Football: 'text-green-400 bg-green-400/10 border-green-400/20',
    Basketball: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    Boxe: 'text-red-400 bg-red-400/10 border-red-400/20',
    Karaté: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="min-h-screen bg-black pt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-white text-xl">Athlète introuvable</p>
        <Link to="/talents" className="text-orange-500 hover:text-orange-400 flex items-center gap-2">
          <ArrowLeft size={16} /> Retour aux talents
        </Link>
      </div>
    );
  }

  const statEntries = Object.entries(athlete.stats);

  return (
    <div className="bg-black pt-20 min-h-screen">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link to="/talents" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
          <ArrowLeft size={16} /> Retour aux talents
        </Link>
      </div>

      {/* Hero profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <img
              src={athlete.photo_url}
              alt={athlete.name}
              className="w-full h-[600px] object-cover"
            />
            {athlete.featured && (
              <div className="absolute top-4 left-4 bg-orange-500 text-black text-xs font-bold px-3 py-1.5 uppercase tracking-widest">
                Talent Vedette
              </div>
            )}
            <div className="absolute inset-0 border border-white/5" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-orange-500/20 bg-orange-500/5" />
          </div>

          {/* Info */}
          <div className="lg:pt-8">
            <div className={`inline-flex items-center gap-2 border px-3 py-1.5 text-sm font-semibold mb-4 ${sportColors[athlete.sport] || 'text-gray-400 bg-white/5 border-white/10'}`}>
              {athlete.sport}
            </div>
            <h1 className="font-display text-6xl lg:text-7xl text-white mb-2">{athlete.name.toUpperCase()}</h1>
            <p className="text-gray-400 text-xl mb-6">{athlete.position}</p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar size={14} className="text-orange-500" />
                {athlete.age} ans
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={14} className="text-orange-500" />
                {athlete.nationality}
              </div>
              <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wide">
                {LEVEL_LABELS[athlete.level] || athlete.level}
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-3 after:block after:w-8 after:h-0.5 after:bg-orange-500 after:mt-1.5">Biographie</h3>
              <p className="text-gray-300 leading-relaxed">{athlete.bio}</p>
            </div>

            {/* Stats */}
            {statEntries.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 after:block after:w-8 after:h-0.5 after:bg-orange-500 after:mt-1.5">Statistiques</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {statEntries.map(([key, value]) => (
                    <div key={key} className="glass p-4 text-center">
                      <div className="font-display text-3xl text-orange-500">{value}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wide mt-1 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-black px-8 py-4 font-bold hover:bg-orange-400 transition-colors orange-glow"
              >
                Recruter cet athlète <ChevronRight size={16} />
              </Link>
              <Link
                to="/talents"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 font-bold hover:border-white transition-colors"
              >
                Voir d'autres talents
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      {athlete.video_url && (
        <section className="py-16 border-t border-white/10" style={{ background: '#0a0a0a' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Highlights</span>
              <h2 className="font-display text-4xl text-white mt-1">VIDÉO</h2>
              <div className="w-10 h-0.5 bg-orange-500 mt-3" />
            </div>
            <div className="relative aspect-video w-full bg-black border border-white/10">
              <iframe
                src={athlete.video_url}
                title={`Highlights ${athlete.name}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 border-t border-white/10 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Même sport</span>
              <h2 className="font-display text-4xl text-white mt-1">AUTRES TALENTS</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link key={rel.id} to={`/talents/${rel.id}`} className="group relative overflow-hidden block card-hover">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img src={rel.photo_url} alt={rel.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold">{rel.name}</h3>
                    <p className="text-gray-400 text-sm">{rel.position} · {rel.age} ans</p>
                    <div className="mt-2 flex items-center gap-1 text-orange-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Voir profil <ExternalLink size={10} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
