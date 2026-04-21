import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = 'Contact | VNDX Sport Agency';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    // Simulated contact form - in production, integrate with email service
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-black pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.pexels.com/photos/8224057/pexels-photo-8224057.jpeg?auto=compress&cs=tinysrgb&w=1920)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">Parlons de votre projet</span>
          <h1 className="font-display text-7xl lg:text-8xl text-white mt-2">CONTACT</h1>
          <div className="w-16 h-1 bg-orange-500 mt-4" />
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Info */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-4xl text-white mb-2">PARLONS DE<br />VOTRE PROJET</h2>
            <div className="w-10 h-0.5 bg-orange-500 mb-8" />
            <p className="text-gray-300 leading-relaxed mb-10">
              Que vous soyez un athlète en quête d'accompagnement, un club à la recherche de talents, ou un sponsor souhaitant s'associer à nos athlètes, nous sommes à votre écoute.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Email</p>
                  <a href="mailto:Companyvndx@gmail.com" className="text-gray-400 text-sm hover:text-orange-500 transition-colors">
                    Companyvndx@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Téléphone</p>
                  <p className="text-gray-400 text-sm">+33 1 XX XX XX XX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Adresse</p>
                  <p className="text-gray-400 text-sm">Paris, France</p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/33600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 font-semibold hover:bg-[#1fba59] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contacter via WhatsApp
            </a>

            {/* Response time */}
            <div className="mt-8 glass p-5">
              <p className="text-orange-500 text-sm font-semibold mb-1">Délai de réponse</p>
              <p className="text-gray-300 text-sm">Nous répondons à toutes les demandes dans les <strong className="text-white">24-48 heures</strong> ouvrées.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h2 className="font-display text-4xl text-white mb-4">MESSAGE ENVOYÉ !</h2>
                <p className="text-gray-300 mb-8">Nous reviendrons vers vous dans les 24-48h.</p>
                <button onClick={() => setStatus('idle')} className="bg-orange-500 text-black px-8 py-4 font-bold hover:bg-orange-400 transition-colors">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Nom complet *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Prénom Nom"
                      required
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 text-sm focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="votre@email.com"
                      required
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 text-sm focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Sujet</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:border-orange-500 transition-colors"
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="athlete">Je suis un athlète</option>
                    <option value="club">Recruter un talent</option>
                    <option value="partenariat">Partenariat / Sponsor</option>
                    <option value="presse">Presse / Médias</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez votre demande..."
                    rows={7}
                    required
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 text-sm focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 px-4 py-3 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={14} /> Une erreur est survenue. Veuillez réessayer.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-orange-500 text-black py-4 font-bold text-base hover:bg-orange-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />Envoi...</>
                  ) : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
