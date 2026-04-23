import { useEffect, useState, useCallback } from 'react';
import { Eye, X, Mail, Phone, ExternalLink, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Application, LEVEL_LABELS } from '../../types';

const statusOptions = ['pending', 'reviewed', 'accepted', 'rejected'] as const;
const statusLabels: Record<string, string> = {
  pending: 'En attente', reviewed: 'Examinée', accepted: 'Acceptée', rejected: 'Refusée',
};
const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  reviewed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<Application | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    let query = supabase.from('applications').select('*').order('created_at', { ascending: false });
    if (statusFilter) query = query.eq('status', statusFilter);
    query.then(({ data }: {data: Application[] }) => {
      setApplications(data);
      setLoading(false);
    });

  }, [statusFilter]);

  useEffect(() => { load(); }, [statusFilter, load]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('applications').update({ status }).eq('id', id);
    load();
    if (selected?.id === id) setSelected({ ...selected, status: status as Application['status'] });
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl text-white">CANDIDATURES</h1>
          <p className="text-gray-500 text-sm mt-1">{applications.length} candidature{applications.length > 1 ? 's' : ''}</p>
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm pr-8 focus:border-orange-500 appearance-none transition-colors"
          >
            <option value="">Tous les statuts</option>
            {statusOptions.map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? '' : s)}
            className={`glass p-4 text-center border transition-colors ${statusFilter === s ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/5 hover:border-white/15'}`}
          >
            <p className={`text-2xl font-display ${statusColors[s].split(' ')[1]}`}>
              {applications.filter((a) => a.status === s).length}
            </p>
            <p className="text-gray-500 text-xs mt-1">{statusLabels[s]}</p>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="glass overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {['Candidat', 'Sport / Niveau', 'Contact', 'Date', 'Statut', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-gray-500 text-xs uppercase tracking-wider px-4 py-3 font-medium first:pl-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-500">Aucune candidature</td></tr>
              ) : applications.map((app) => (
                <tr key={app.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="pl-6 pr-4 py-4">
                    <p className="text-white text-sm font-medium">{app.full_name}</p>
                    <p className="text-gray-500 text-xs">{app.age} ans · {app.nationality}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-gray-300 text-sm">{app.sport}</p>
                    <p className="text-gray-500 text-xs">{LEVEL_LABELS[app.level] || app.level}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-gray-300 text-xs">{app.email}</p>
                    <p className="text-gray-500 text-xs">{app.phone}</p>
                  </td>
                  <td className="px-4 py-4 text-gray-400 text-xs">{formatDate(app.created_at)}</td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className={`text-xs px-2 py-1 border font-medium appearance-none cursor-pointer pr-5 ${statusColors[app.status] || 'bg-white/10 text-gray-400 border-white/20'}`}
                      >
                        {statusOptions.map((s) => <option key={s} value={s}>{statusLabels[s]}</option>)}
                      </select>
                      <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => setSelected(app)} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-gray-950 border border-white/10 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-white font-bold text-lg">{selected.full_name}</h2>
                <p className="text-gray-500 text-xs">{formatDate(selected.created_at)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { l: 'Sport', v: selected.sport },
                  { l: 'Niveau', v: LEVEL_LABELS[selected.level] || selected.level },
                  { l: 'Poste', v: selected.position },
                  { l: 'Nationalité', v: selected.nationality },
                  { l: 'Âge', v: `${selected.age} ans` },
                ].map(({ l, v }) => (
                  <div key={l} className="glass p-3">
                    <p className="text-gray-500 text-xs mb-0.5">{l}</p>
                    <p className="text-white text-sm font-medium">{v || '—'}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <a href={`mailto:${selected.email}`} className="flex items-center gap-3 glass p-3 hover:border-white/20 transition-colors group">
                  <Mail size={14} className="text-orange-500" />
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{selected.email}</span>
                </a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-3 glass p-3 hover:border-white/20 transition-colors group">
                    <Phone size={14} className="text-orange-500" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{selected.phone}</span>
                  </a>
                )}
                {selected.video_url && (
                  <a href={selected.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 glass p-3 hover:border-orange-500/30 transition-colors group">
                    <ExternalLink size={14} className="text-orange-500" />
                    <span className="text-orange-400 text-sm group-hover:text-orange-300 transition-colors">Voir la vidéo highlights</span>
                  </a>
                )}
              </div>

              {selected.bio && (
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Présentation</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{selected.bio}</p>
                </div>
              )}

              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-2">Changer le statut</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`px-4 py-2 text-xs font-semibold border transition-all ${selected.status === s ? statusColors[s] : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-white'}`}
                    >
                      {statusLabels[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
