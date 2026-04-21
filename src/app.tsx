import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authcontext';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import AdminLayout from './components/admin/adminlayout';
import ProtectedRoute from './components/admin/protectedroute';

import Home from './pages/home';
import About from './pages/about';
import Services from './pages/services';
import Talents from './pages/talents';
import TalentDetail from './pages/talentdetail';
import Recruitment from './pages/recruitment';
import Partners from './pages/partners';
import Blog from './pages/blog';
import Contact from './pages/contact';

import AdminLogin from './pages/admin/login';
import AdminDashboard from './pages/admin/dashboard';
import AdminAthletes from './pages/admin/athletes';
import AdminApplications from './pages/admin/applications';
import AdminBlog from './pages/admin/blogadmin';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function AdminRoutes() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/athletes" element={<AdminAthletes />} />
          <Route path="/applications" element={<AdminApplications />} />
          <Route path="/blog" element={<AdminBlog />} />
        </Routes>
      </AdminLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Public routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/a-propos" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/talents" element={<PublicLayout><Talents /></PublicLayout>} />
          <Route path="/talents/:id" element={<PublicLayout><TalentDetail /></PublicLayout>} />
          <Route path="/recrutement" element={<PublicLayout><Recruitment /></PublicLayout>} />
          <Route path="/partenaires" element={<PublicLayout><Partners /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
