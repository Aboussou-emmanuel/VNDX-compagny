import { useEffect, useState } from 'react';
import { CheckCircle, Upload, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SPORTS, LEVELS, LEVEL_LABELS } from '../types';

interface FormData {
  full_name: string;
  age: string;
  sport: string;
  level: string;
  position: string;
  nationality: string;
  video_url: string;
  bio: string;
  email: string;
  phone: string;
}

const initialForm: FormData = {
  full_name: '', age: '', sport: '', level: '', position: '',
  nationality: '', video_url: '', bio: '', email: '', phone: '',
};

export default function Recruitment() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = 'Candidature | VNDX Sport Agency';
  }, []);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.full_name.trim()) e.full_name = 'Nom requis';
    if (!form.age || parseInt(form.age) < 14 || parseInt(form.age) > 50) e.age = 'Âge invalide (14-50)';
    if (!form.sport) e.sport = 'Sport requis';
    if (!form.level) e.level = 'Niveau requis';
    if (!form.position.trim()) e.position = 'Poste requis';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide';
    if (!form.phone.trim()) e.phone = 'Téléphone requis';
    if (!form.bio.trim() || form.bio.length < 30) e.bio = 'Décrivez-vous en au moins 30 caractères';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    const { error } = await supabase.from('applications').insert({
      ...form,
      age: parseInt(form.age),
    });
    setStatus(error ? 'error' : 'success');
    if (!error) setForm(initialForm);
  };

  const field = (key: keyof FormData, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-white text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className={`w-full bg-white/5 border text-white placeholder-gray-600 px-4 py-3 text-sm transition-colors focus:border-orange-500 ${errors[key] ? 'border-red-500' : 'border-white/10'}`}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors[key]}</p>}
    </div>
  );

  return (
    <div className="bg-black pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&cs=tinysrgb&w=1920)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Rejoignez l'agence</span>
          <h1 className="font-display text-7xl lg:text-8xl text-white mt-2">CANDIDATURE</h1>
          <div className="w-16 h-1 bg-orange-500 mt-4" />
          <p className="text-gray-300 text-xl mt-6 max-w-2xl">
            Vous êtes un athlète avec le potentiel pour atteindre le sommet ? Soumettez votre profil et notre équipe vous contactera sous 48h.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-16 border-t border-white/10" style={{ background: '#0a0a0a' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { n: '01', title: 'Soumettez votre profil', desc: 'Remplissez le formulaire avec vos informations et votre lien vidéo' },
              { n: '02', title: 'Évaluation par nos experts', desc: 'Notre équipe analyse votre profil sous 48 heures' },
              { n: '03', title: 'Entretien & Intégration', desc: 'Si votre profil correspond, nous vous proposons un accompagnement personnalisé' },
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="font-display text-5xl text-orange-500/30 leading-none">{step.n}</div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {status === 'success' ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="font-display text-4xl text-white mb-4">CANDIDATURE ENVOYÉE !</h2>
              <p className="text-gray-300 text-lg mb-8">Notre équipe va analyser votre profil et vous contacter dans les 48 heures.</p>
              <button onClick={() => setStatus('idle')} className="bg-orange-500 text-black px-8 py-4 font-bold hover:bg-orange-400 transition-colors">
                Soumettre une autre candidature
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-8">
                <h2 className="font-display text-4xl text-white">VOTRE PROFIL</h2>
                <div className="w-10 h-0.5 bg-orange-500 mt-3" />
              </div>

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 px-4 py-3 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} /> Une erreur est survenue. Veuillez réessayer.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {field('full_name', 'Nom complet *', 'text', 'Prénom Nom')}
                {field('age', 'Âge *', 'number', '18')}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Sport *</label>
                  <select
                    value={form.sport}
                    onChange={(e) => setForm({ ...form, sport: e.target.value })}
                    className={`w-full bg-white/5 border text-white px-4 py-3 text-sm transition-colors focus:border-orange-500 ${errors.sport ? 'border-red-500' : 'border-white/10'}`}
                  >
                    <option value="">Choisir un sport</option>
                    {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.sport && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.sport}</p>}
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Niveau *</label>
                  <select
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                    className={`w-full bg-white/5 border text-white px-4 py-3 text-sm transition-colors focus:border-orange-500 ${errors.level ? 'border-red-500' : 'border-white/10'}`}
                  >
                    <option value="">Choisir un niveau</option>
                    {LEVELS.map((l) => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
                  </select>
                  {errors.level && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.level}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {field('position', 'Poste / Discipline *', 'text', 'ex: Attaquant, Meneur, Kata...')}
                {field('nationality', 'Nationalité', 'text', 'ex: France')}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {field('email', 'Email *', 'email', 'votre@email.com')}
                {field('phone', 'Téléphone *', 'tel', '+33 6 XX XX XX XX')}
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <span className="flex items-center gap-2"><Upload size={14} className="text-orange-500" />Lien vidéo highlights</span>
                </label>
                <input
                  type="url"
                  value={form.video_url}
                  onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 text-sm transition-colors focus:border-orange-500"
                />
                <p className="text-gray-500 text-xs mt-1">YouTube, Vimeo ou tout autre lien vidéo public</p>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Présentez-vous *</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Parlez de votre parcours sportif, vos objectifs et ce que vous recherchez..."
                  rows={5}
                  className={`w-full bg-white/5 border text-white placeholder-gray-600 px-4 py-3 text-sm transition-colors focus:border-orange-500 resize-none ${errors.bio ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.bio && <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.bio}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-orange-500 text-black py-4 font-bold text-base hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : 'Soumettre ma candidature'}
              </button>

              <p className="text-gray-500 text-xs text-center">
                En soumettant ce formulaire, vous acceptez que VNDX Sport Agency traite vos données dans le cadre de votre candidature.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
