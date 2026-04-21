import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

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

const categoryLabels: Record<string, string> = {
  succes: 'Succès',
  conseils: 'Conseils',
  actualite: 'Actualité',
  evenement: 'Événement',
};

const categoryColors: Record<string, string> = {
  succes: 'bg-green-500/20 text-green-400',
  conseils: 'bg-blue-500/20 text-blue-400',
  actualite: 'bg-orange-500/20 text-orange-400',
  evenement: 'bg-purple-500/20 text-purple-400',
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filtered, setFiltered] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const s1 = useInView();

  useEffect(() => {
    document.title = 'Blog & Actualités | VNDX Sport Agency';
    supabase.from('blog_posts').select('*').eq('published', true).order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) { setPosts(data); setFiltered(data); }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFiltered(category ? posts.filter((p) => p.category === category) : posts);
  }, [category, posts]);

  const categories = [...new Set(posts.map((p) => p.category))];
  const featured = filtered[0];
  const rest = filtered.slice(1);

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-black pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=1920)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Actualités & Conseils</span>
          <h1 className="font-display text-7xl lg:text-8xl text-white mt-2">BLOG</h1>
          <div className="w-16 h-1 bg-orange-500 mt-4" />
        </div>
      </section>

      {/* Category filters */}
      <div className="border-b border-white/10 sticky top-20 z-40" style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <button
              onClick={() => setCategory('')}
              className={`shrink-0 px-4 py-2 text-sm font-medium transition-all ${!category ? 'bg-orange-500 text-black' : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
            >
              Tout
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 px-4 py-2 text-sm font-medium transition-all ${category === c ? 'bg-orange-500 text-black' : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}
              >
                {categoryLabels[c] || c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section ref={s1.ref} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-xl">Aucun article trouvé</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <div className={`mb-12 transition-all duration-700 ${s1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Link to={`/blog/${featured.slug}`} className="group relative overflow-hidden block card-hover">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative overflow-hidden">
                      <img src={featured.image_url} alt={featured.title} className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ minHeight: 320 }} />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
                    </div>
                    <div className="bg-white/5 p-8 lg:p-12 flex flex-col justify-center border border-white/10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 uppercase tracking-wide ${categoryColors[featured.category] || 'bg-white/10 text-white'}`}>
                          {categoryLabels[featured.category] || featured.category}
                        </span>
                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          <Calendar size={11} />{formatDate(featured.created_at)}
                        </span>
                      </div>
                      <h2 className="font-display text-3xl lg:text-4xl text-white mb-4 group-hover:text-orange-400 transition-colors">{featured.title}</h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                      <div className="flex items-center gap-2 text-orange-500 text-sm font-semibold group-hover:gap-3 transition-all">
                        Lire l'article <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className={`group overflow-hidden block card-hover transition-all duration-700 ${s1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 ${categoryColors[post.category] || 'bg-white/20 text-white'}`}>
                        {categoryLabels[post.category] || post.category}
                      </span>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/5 border-t-0">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                        <Calendar size={11} />{formatDate(post.created_at)}
                        <span className="mx-1">·</span>
                        <Tag size={11} />{post.author}
                      </div>
                      <h3 className="text-white font-bold text-base mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                      <div className="mt-4 flex items-center gap-1 text-orange-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Lire la suite <ArrowRight size={11} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
