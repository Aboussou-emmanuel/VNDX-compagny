import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Newspaper, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/authcontext';

const navItems = [
  { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { label: 'Athlètes', href: '/admin/athletes', icon: Users },
  { label: 'Candidatures', href: '/admin/applications', icon: FileText },
  { label: 'Blog', href: '/admin/blog', icon: Newspaper },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const isActive = (href: string) => href === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(href);

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            <span className="font-display text-black text-lg">V</span>
          </div>
          <div>
            <div className="font-display text-white text-lg tracking-widest">VNDX</div>
            <div className="text-orange-500 text-xs">Administration</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150 group ${
                isActive(item.href)
                  ? 'bg-orange-500 text-black'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {item.label}
              {isActive(item.href) && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 font-bold text-xs">
            {user?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.email || 'Admin'}</p>
<p className="text-gray-500 text-xs">{user?.role ? (user.role === 'admin' ? 'Administrateur' : 'Utilisateur') : 'Chargement...'}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-4 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 text-sm font-medium transition-all duration-150"
        >
          <LogOut size={14} /> Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-black">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10" style={{ background: '#0a0a0a' }}>
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/80" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 flex flex-col border-r border-white/10" style={{ background: '#0a0a0a' }}>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-white/10 flex items-center gap-4 px-6" style={{ background: '#0a0a0a' }}>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            {navItems.find((n) => isActive(n.href))?.label || 'Admin'}
          </div>
          <Link to="/" className="ml-auto text-gray-500 text-xs hover:text-gray-300 transition-colors">
            ← Voir le site
          </Link>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
