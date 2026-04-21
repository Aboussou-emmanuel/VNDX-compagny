import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, Newspaper, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Stats {
  athletes: number;
  applications: number;
  pending: number;
  posts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ athletes: 0, applications: 0, pending: 0, posts: 0 });
  const [recentApps, setRecentApps] = useState<{ id: string; full_name: string; sport: string; created_at: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from('athletes').select('id', { count: 'exact', head: true }).eq('active', true),
      supabase.from('applications').select('id', { count: 'exact', head: true }),
      supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('published', true),
      supabase.from('applications').select('id, full_name, sport, created_at, status').order('created_at', { ascending: false }).limit(5),
    ]).then(([ath, app, pend, posts, recApps]) => {
      setStats({
        athletes: ath.count ?? 0,
        applications: app.count ?? 0,
        pending: pend.count ?? 0,
        posts: posts.count ?? 0,
      });
      if (recApps.data) setRecentApps(recApps.data);
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: 'Athlètes actifs', value: stats.athletes, icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10', href: '/admin/athletes' },
    { label: 'Candidatures', value: stats.applications, icon: FileText, color: 'text-blue-400', bg: 'bg-blue-400/10', href: '/admin/applications' },
    { label: 'En attente', value: stats.pending, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', href: '/admin/applications' },
    { label: 'Articles publiés', value: stats.posts, icon: Newspaper, color: 'text-green-400', bg: 'bg-green-400/10', href: '/admin/blog' },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    reviewed: 'bg-blue-500/20 text-blue-400',
    accepted: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
  };
  const statusLabels: Record<string, string> = {
    pending: 'En attente', reviewed: 'Examinée', accepted: 'Acceptée', rejected: 'Refusée',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-4xl text-white">TABLEAU DE BORD</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble de l'agence VNDX</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <Link key={i} to={s.href} className="glass p-6 hover:border-white/20 transition-colors group">
              <div className={`w-10 h-10 ${s.bg} flex items-center justify-center mb-4`}>
                <Icon size={18} className={s.color} />
              </div>
              <div className={`font-display text-4xl ${s.color} mb-1`}>{s.value}</div>
              <p className="text-gray-400 text-xs">{s.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="glass p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold">Dernières candidatures</h2>
            <Link to="/admin/applications" className="text-orange-500 text-xs font-medium flex items-center gap-1 hover:text-orange-400">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          {recentApps.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune candidature pour l'instant.</p>
          ) : (
            <div className="space-y-3">
              {recentApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white text-sm font-medium">{app.full_name}</p>
                    <p className="text-gray-500 text-xs">{app.sport} · {new Date(app.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 font-medium ${statusColors[app.status] || 'bg-white/10 text-gray-400'}`}>
                    {statusLabels[app.status] || app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="glass p-6">
          <h2 className="text-white font-semibold mb-5">Actions rapides</h2>
          <div className="space-y-3">
            {[
              { label: 'Ajouter un athlète', href: '/admin/athletes', icon: Users, desc: 'Créer un nouveau profil athlète' },
              { label: 'Voir les candidatures', href: '/admin/applications', icon: FileText, desc: 'Traiter les demandes en attente' },
              { label: 'Publier un article', href: '/admin/blog', icon: Newspaper, desc: 'Créer un nouvel article blog' },
              { label: 'Voir le site public', href: '/', icon: TrendingUp, desc: 'Aperçu du site en production' },
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <Link
                  key={i}
                  to={action.href}
                  target={action.href === '/' ? '_blank' : undefined}
                  className="flex items-center gap-4 p-4 bg-white/3 hover:bg-white/8 border border-white/5 hover:border-white/15 transition-all group"
                >
                  <div className="w-9 h-9 bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium group-hover:text-orange-400 transition-colors">{action.label}</p>
                    <p className="text-gray-500 text-xs">{action.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance indicator */}
      <div className="mt-6 glass p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={18} className="text-orange-500" />
          <h2 className="text-white font-semibold">Taux de placement</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: '85%' }} />
          </div>
          <span className="text-orange-500 font-display text-2xl">85%</span>
        </div>
        <p className="text-gray-500 text-xs mt-2">Des athlètes accompagnés signent un contrat professionnel</p>
      </div>
    </div>
  );
}
