import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowRight, ChevronDown } from 'lucide-react';
import { Athlete, SPORTS, LEVELS, LEVEL_LABELS } from '../types';
import { mockAthletes } from '../data/mock';

export default function Talents() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [filtered, setFiltered] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const sportFilter = searchParams.get('sport') || '';
  const levelFilter = searchParams.get('level') || '';
  const ageMin = searchParams.get('ageMin') || '';
  const ageMax = searchParams.get('ageMax') || '';

  useEffect(() => {
    document.title = 'Nos Talents | VNDX Sport Agency';
    setAthletes(mockAthletes);
    setFiltered(mockAthletes);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = athletes;
    if (sportFilter) result = result.filter((a) => a.sport === sportFilter);
    if (levelFilter) result = result.filter((a) => a.level === levelFilter);
    if (ageMin) result = result.filter((a) => a.age >= parseInt(ageMin));
    if (ageMax) result = result.filter((a) => a.age <= parseInt(ageMax));
    if (search) result = result.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.position.toLowerCase().includes(search.toLowerCase()) || a.nationality.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [athletes, sportFilter, levelFilter, ageMin, ageMax, search]);

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearch('');
  };

  const hasFilters = sportFilter || levelFilter || ageMin || ageMax || search;

  const sportColors: Record<string, string> = {
    Football: 'bg-green-500/20 text-green-400',
    Basketball: 'bg-orange-500/20 text-orange-400',
    Boxe: 'bg-red-500/20 text-red-400',
    Karaté: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <div className="bg-black pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.pexels.com/photos/2834917/pexels-photo-2834917.jpeg?auto=compress&cs=tinysrgb&w=1920)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Notre vivier d'exception</span>
          <h1 className="font-display text-7xl lg:text-8xl text-white mt-2">NOS TALENTS</h1>
          <div className="w-16 h-1 bg-orange-500 mt-4" />
          <p className="text-gray-300 text-xl mt-6 max-w-2xl">
            Explorez notre sélection d'athlètes d'exception, pré-qualifiés et prêts à rejoindre votre structure.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 border-b border-white/10" style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher un athlète..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 pl-9 pr-4 py-2.5 text-sm focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Filter toggle on mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-gray-400 text-sm border border-white/10 px-4 py-2.5"
            >
              <Filter size={14} /> Filtres <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Filters */}
            <div className={`flex flex-wrap gap-3 lg:flex lg:gap-3 ${showFilters ? 'flex' : 'hidden lg:flex'}`}>
              <select
                value={sportFilter}
                onChange={(e) => setFilter('sport', e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 focus:border-orange-500 transition-colors"
              >
                <option value="">Tous les sports</option>
                {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select
                value={levelFilter}
                onChange={(e) => setFilter('level', e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 focus:border-orange-500 transition-colors"
              >
                <option value="">Tous les niveaux</option>
                {LEVELS.map((l) => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
              </select>
              <select
                value={ageMin}
                onChange={(e) => setFilter('ageMin', e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 focus:border-orange-500 transition-colors"
              >
                <option value="">Âge min.</option>
                {[16, 18, 20, 22, 25, 28].map((a) => <option key={a} value={a}>{a} ans</option>)}
              </select>
              <select
                value={ageMax}
                onChange={(e) => setFilter('ageMax', e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 focus:border-orange-500 transition-colors"
              >
                <option value="">Âge max.</option>
                {[20, 22, 25, 28, 32, 40].map((a) => <option key={a} value={a}>{a} ans</option>)}
              </select>
              {hasFilters && (
                <button onClick={clearFilters} className="text-orange-500 text-sm font-medium px-3 py-2.5 hover:text-orange-400 transition-colors border border-orange-500/30 hover:bg-orange-500/10">
                  Effacer
                </button>
              )}
            </div>

            <div className="hidden lg:block ml-auto text-gray-500 text-sm">
              {filtered.length} talent{filtered.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[420px] bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-xl mb-4">Aucun talent trouvé</p>
            <button onClick={clearFilters} className="text-orange-500 font-medium hover:text-orange-400 transition-colors">
              Effacer les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((athlete) => (
              <Link
                key={athlete.id}
                to={`/talents/${athlete.id}`}
                className="group relative overflow-hidden block card-hover"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={athlete.photo_url}
                    alt={athlete.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                {athlete.featured && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-black text-xs font-bold px-2 py-0.5 uppercase tracking-wide">
                    Vedette
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className={`text-xs font-semibold px-2 py-0.5 mb-2 inline-block uppercase tracking-wide ${sportColors[athlete.sport] || 'bg-white/10 text-white'}`}>
                    {athlete.sport}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight">{athlete.name}</h3>
                  <p className="text-gray-400 text-sm">{athlete.position}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-gray-500 text-xs">{athlete.age} ans</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span className="text-xs font-medium px-2 py-0.5 bg-white/10 text-gray-300">{LEVEL_LABELS[athlete.level] || athlete.level}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-orange-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    Voir le profil complet <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recruit CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-3xl text-white">VOUS N'AVEZ PAS TROUVÉ LE PROFIL IDÉAL ?</h3>
            <p className="text-gray-400 mt-2">Contactez-nous directement, nous avons accès à des profils non publiés.</p>
          </div>
          <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 bg-orange-500 text-black px-8 py-4 font-bold hover:bg-orange-400 transition-colors">
            Nous contacter <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
