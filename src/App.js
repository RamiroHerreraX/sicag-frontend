import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// Context
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts según tipo de usuario
import MainLayout from './layouts/MainLayout';
import CommitteeLayout from './layouts/CommitteeLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import PasswordChange from './pages/auth/PasswordChange';
import PrivacyAgreement from './pages/auth/PrivacyAgreement';

// Dashboard Pages (diferentes por rol)
import UserDashboard from './pages/dashboard/UserDashboard';
import CommitteeDashboard from './pages/dashboard/CommitteeDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Certifications
import Certifications from './pages/certifications/Certifications';
import CertificationDetail from './pages/certifications/CertificationDetail';
import NewCertification from './pages/certifications/NewCertification';

// Expediente
import Expediente from './pages/expediente/Expediente';
import ExpedienteConfig from './pages/expediente/ConfigExpediente';

// Profile
import Profile from './pages/profile/Profile';

// Admin Modules
import UserManagement from './pages/admin/UserManagement';
import UserReview from './pages/admin/UserReview';
import SystemConfig from './pages/admin/SystemConfig';

// Committee Modules
import CommitteeReview from './pages/committee/CommitteeReview';

// Mapa del sitio
import SiteMap from './pages/sitemap/SiteMap';

// Crear tema MUI
const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#3498db',
    },
    success: {
      main: '#27ae60',
    },
    warning: {
      main: '#f39c12',
    },
    error: {
      main: '#e74c3c',
    },
    background: {
      default: '#f5f7fa',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rutas públicas (autenticación) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/password-change" element={<PasswordChange />} />
              <Route path="/privacy-agreement" element={<PrivacyAgreement />} />
            </Route>

            {/* Rutas para USUARIO AGENTE */}
            <Route element={<ProtectedRoute allowedRoles={['agente', 'profesionista', 'empresario']}><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<UserDashboard />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/certifications/new" element={<NewCertification />} />
              <Route path="/certifications/:id" element={<CertificationDetail />} />
              <Route path="/expediente" element={<Expediente />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sitemap" element={<SiteMap />} />
            </Route>

            {/* Rutas para COMITÉ */}
            <Route element={<ProtectedRoute allowedRoles={['comite']}><CommitteeLayout /></ProtectedRoute>}>
              <Route path="/committee/dashboard" element={<CommitteeDashboard />} />
              <Route path="/committee/review" element={<CommitteeReview />} />
              <Route path="/committee/certifications/:id" element={<CertificationDetail />} />
            </Route>

            {/* Rutas para ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/users/:id/review" element={<UserReview />} />
              <Route path="/admin/system-config" element={<SystemConfig />} />
              <Route path="/admin/expediente-config" element={<ExpedienteConfig />} />
            </Route>

            {/* Ruta 404 */}
            <Route path="*" element={<div style={{ padding: '50px', textAlign: 'center' }}>404 - Página no encontrada</div>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;