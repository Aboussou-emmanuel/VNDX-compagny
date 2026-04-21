import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff, X, Check, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { BlogPost } from '../../types';

const emptyPost: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> = {
  title: '', slug: '', excerpt: '', content: '', image_url: '',
  category: 'actualite', author: '', published: false,
};

const categoryOptions = [
  { value: 'succes', label: 'Succès' },
  { value: 'conseils', label: 'Conseils' },
  { value: 'actualite', label: 'Actualité' },
  { value: 'evenement', label: 'Événement' },
];

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [form, setForm] = useState<typeof emptyPost & { id?: string }>({ ...emptyPost });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setPosts(data);
        setLoading(false);
      });
  };

  useEffect(() => { load(); }, []);

  const filtered = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const openCreate = () => {
    setForm({ ...emptyPost });
    setModal('create');
  };

  const openEdit = (post: BlogPost) => {
    setForm({ ...post });
    setModal('edit');
  };

  const handleSave = async () => {
    setSaving(true);
    const slug = form.slug || generateSlug(form.title);
    const { id, ...data } = { ...form, slug };
    if (modal === 'create') {
      await supabase.from('blog_posts').insert(data);
    } else if (id) {
      await supabase.from('blog_posts').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id);
    }
    setSaving(false);
    setModal(null);
    load();
  };

  const togglePublished = async (post: BlogPost) => {
    await supabase.from('blog_posts').update({ published: !post.published }).eq('id', post.id);
    load();
  };

  const deletePost = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl text-white">BLOG</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.filter((p) => p.published).length} articles publiés</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-orange-500 text-black px-5 py-2.5 font-semibold text-sm hover:bg-orange-400 transition-colors">
          <Plus size={16} /> Nouvel article
        </button>
      </div>

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

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center py-12 text-gray-500">Aucun article</p>
          ) : filtered.map((post) => (
            <div key={post.id} className="glass flex items-center gap-4 p-4 hover:border-white/15 transition-colors">
              <img src={post.image_url} alt={post.title} className="w-14 h-14 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-1.5 py-0.5 ${post.published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {post.published ? 'Publié' : 'Brouillon'}
                  </span>
                  <span className="text-gray-600 text-xs">{post.category}</span>
                </div>
                <h3 className="text-white text-sm font-medium truncate">{post.title}</h3>
                <p className="text-gray-500 text-xs truncate">{post.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => togglePublished(post)} className={`p-1.5 transition-colors ${post.published ? 'text-green-400 hover:text-gray-400' : 'text-gray-400 hover:text-green-400'}`}>
                  {post.published ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button onClick={() => openEdit(post)} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => deletePost(post.id)} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-gray-950 border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-display text-2xl text-white">{modal === 'create' ? 'NOUVEL' : 'MODIFIER L\''} ARTICLE</h2>
              <button onClick={() => setModal(null)} className="text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-white text-xs font-medium mb-1.5">Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-3 py-2.5 text-sm focus:border-orange-500 transition-colors"
                  placeholder="Titre de l'article"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Catégorie</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white px-3 py-2.5 text-sm focus:border-orange-500 transition-colors">
                    {categoryOptions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-white text-xs font-medium mb-1.5">Auteur</label>
                  <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-3 py-2.5 text-sm focus:border-orange-500 transition-colors" placeholder="Nom de l'auteur" />
                </div>
              </div>
              <div>
                <label className="block text-white text-xs font-medium mb-1.5">URL Image de couverture</label>
                <input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-3 py-2.5 text-sm focus:border-orange-500 transition-colors" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-white text-xs font-medium mb-1.5">Résumé</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-3 py-2.5 text-sm focus:border-orange-500 transition-colors resize-none" placeholder="Court résumé affiché dans la liste..." />
              </div>
              <div>
                <label className="block text-white text-xs font-medium mb-1.5">Contenu</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-3 py-2.5 text-sm focus:border-orange-500 transition-colors resize-none" placeholder="Contenu complet de l'article..." />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, published: !form.published })}
                  className={`w-10 h-5 relative transition-colors ${form.published ? 'bg-orange-500' : 'bg-white/20'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-white text-sm">Publier immédiatement</span>
              </label>
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
    </div>
  );
}
