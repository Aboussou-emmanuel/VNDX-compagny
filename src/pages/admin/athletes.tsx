import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Star, X, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Athlete, SPORTS, LEVELS, LEVEL_LABELS } from '../../types';

const emptyAthlete: Omit<Athlete, 'id' | 'created_at' | 'updated_at'> = {
  name: '', sport: '', position: '', age: 18, level: 'amateur', nationality: '',
  bio: '', photo_url: '', video_url: '', stats: {}, featured: false, active: true,
};

export default function AdminAthletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [form, setForm] = useState<typeof emptyAthlete & { id?: string }>({ ...emptyAthlete });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    supabase.from('athletes').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setAthletes(data);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const filtered = athletes.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.sport.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setForm({ ...emptyAthlete });
    setModal('create');
  };

  const openEdit = (athlete: Athlete) => {
    setForm({ ...athlete });
    setModal('edit');
  };

  const handleSave = async () => {
    setSaving(true);
    const { id, ...data } = form;
    if (modal === 'create') {
      await supabase.from('athletes').insert({ ...data, stats: form.stats || {} });
    } else if (id) {
      await supabase.from('athletes').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id);
    }
    setSaving(false);
    setModal(null);
    load();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('athletes').update({ active: false }).eq('id', id);
    setDeleteId(null);
    load();
  };

  const toggleFeatured = async (athlete: Athlete) => {
    await supabase.from('athletes').update({ featured: !athlete.featured }).eq('id', athlete.id);
    load();
  };

  const Field = ({ label, field, type = 'text', placeholder = '' }: { label: string; field: keyof typeof form; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-white text-xs font-medium mb-1.5">{label}</label>
      <input
        type={type}
        value={(form[field] as string | number) || ''}
        onChange={(e) => setForm({ ...form, [field]: type === 'number' ? parseInt(e.target.value) || 0 : e.target.value })}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-3 py-2.5 text-sm focus:border-orange-500 transition-colors"
      />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl text-white">ATHLÈTES</h1>
          <p className="text-gray-500 text-sm mt-1">{athletes.filter((a) => a.active).length} athlètes actifs</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-orange-500 text-black px-5 py-2.5 font-semibold text-sm hover:bg-orange-400 transition-colors">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 pl-9 pr-4 py-2.5 text-sm focus:border-orange-500 transition-colors"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="glass overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {['Athlète', 'Sport', 'Poste', 'Âge', 'Niveau', 'Vedette', 'Actions'].map((h) => (
                  <th key={h} className="text-left text-gray-500 text-xs uppercase tracking-wider px-4 py-3 font-medium first:pl-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">Aucun athlète trouvé</td>
                </tr>
              ) : filtered.map((athlete) => (
                <tr key={athlete.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="pl-6 pr-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={athlete.photo_url} alt={athlete.name} className="w-9 h-9 rounded object-cover" />
                      <div>
                        <p className="text-white text-sm font-medium">{athlete.name}</p>
                        <p className="text-gray-500 text-xs">{athlete.nationality}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-300 text-sm">{athlete.sport}</td>
                  <td className="px-4 py-4 text-gray-400 text-sm">{athlete.position}</td>
                  <td className="px-4 py-4 text-gray-400 text-sm">{athlete.age} ans</td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400">{LEVEL_LABELS[athlete.level] || athlete.level}</span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => toggleFeatured(athlete)} className={`p-1.5 transition-colors ${athlete.featured ? 'text-orange-500' : 'text-gray-600 hover:text-gray-400'}`}>
                      <Star size={14} className={athlete.featured ? 'fill-orange-500' : ''} />
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(athlete)} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => setDeleteId(athlete.id)} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-gray-950 border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-display text-2xl text-white">{modal === 'create' ? 'AJOUTER' : 'MODIFIER'} UN ATHLÈTE</h2>
              <button onClick={() => setModal(null)} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nom complet *" field="name" placeholder="Prénom Nom" />
                <Field label="Âge *" field="age" type="number" placeholder="21" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Sport *</label>
                  <select value={form.sport} onChange={(e) => setForm({ ...form, sport: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm focus:border-orange-500 transition-colors">
                    <option value="">Choisir</option>
                    {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Niveau *</label>
                  <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm focus:border-orange-500 transition-colors">
                    {LEVELS.map((l) => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Poste / Discipline" field="position" placeholder="ex: Attaquant" />
                <Field label="Nationalité" field="nationality" placeholder="ex: France" />
              </div>
              <Field label="URL Photo" field="photo_url" placeholder="https://..." />
              <Field label="URL Vidéo (YouTube embed)" field="video_url" placeholder="https://www.youtube.com/embed/..." />
              <div>
                <label className="block text-white text-xs font-medium mb-1.5">Biographie</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} placeholder="Description de l'athlète..." className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-3 py-2.5 text-sm focus:border-orange-500 transition-colors resize-none" />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setForm({ ...form, featured: !form.featured })}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border transition-colors ${form.featured ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-white/10 text-gray-400 hover:text-white'}`}
                >
                  <Star size={14} className={form.featured ? 'fill-orange-500' : ''} />
                  Talent vedette
                </button>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex items-center gap-3 justify-end">
              <button onClick={() => setModal(null)} className="px-5 py-2.5 border border-white/10 text-gray-400 hover:text-white text-sm font-medium transition-colors">Annuler</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-orange-500 text-black px-6 py-2.5 font-semibold text-sm hover:bg-orange-400 transition-colors disabled:opacity-50">
                {saving ? <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Check size={14} />}
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-gray-950 border border-white/10 w-full max-w-sm p-8 text-center">
            <Trash2 size={32} className="text-red-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Désactiver cet athlète ?</h3>
            <p className="text-gray-400 text-sm mb-6">Il ne sera plus visible sur le site public. Cette action est réversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-white/10 text-gray-400 hover:text-white text-sm font-medium transition-colors">Annuler</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors">Désactiver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
