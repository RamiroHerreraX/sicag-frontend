import React from 'react';
import { HashRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
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
import AssociationLayout from './layouts/AssociationLayout'; // NUEVO LAYOUT

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import PasswordChange from './pages/auth/PasswordChange';
import PrivacyAgreement from './pages/auth/PrivacyAgreement';

// Dashboard Pages (diferentes por rol)
import UserDashboard from './pages/agente/dashboard/UserDashboard';
import CommitteeDashboard from './pages/committee/CommitteeDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AssociationDashboard from './pages/association/AssociationDashboard'; // NUEVO DASHBOARD

// Certifications
import Certifications from './pages/agente/certifications/Certifications';
import CertificationDetail from './pages/agente/certifications/CertificationDetail';
import NewCertification from './pages/agente/certifications/NewCertification';
import NewUserCertification from './pages/agente/expediente/NewUserCertification';
import Declaraciones from './pages/agente/expediente/Declaraciones';
import VistaCertificacion from './pages/agente/certifications/VistaCertificacion';

// Expediente
import Expediente from './pages/agente/expediente/Expediente';
import ExpedienteConfig from './pages/expediente/ConfigExpediente';

// Profile
import Profile from './pages/agente/profile/Profile';

// Admin Modules
import UserManagement from './pages/admin/UserManagement';
import UserReview from './pages/admin/UserReview';
import SystemConfig from './pages/admin/SystemConfig';
import Reports from './pages/admin/Reports';
import AuditLog from './pages/audit/AuditLog';

// Committee Modules
import CommitteeReview from './pages/committee/CommitteeReview';
import CertificationReview from './pages/committee/CertificationReview';
import DocumentReview from './pages/committee/DocumentReview';
import CommitteeAlerts from './pages/committee/CommitteeAlerts';
import CommitteeProfile from './pages/committee/CommitteeProfile';
/*import CommitteeAssignments from './pages/committee/CommitteeAssignments';
import CommitteeMetrics from './pages/committee/CommitteeMetrics';*/

// Association Modules - NUEVOS
import ControlAsociados from './pages/association/ControlAsociados';
import AlertsAsociacion from './pages/association/AlertsAsociacion'; // NUEVO
import AssociationProfile from './pages/association/AssociationProfile'; // NUEVO

// Mapa del sitio
import SiteMap from './pages/sitemap/SiteMap';

// Importar tema personalizado
import theme from './theme';

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
            <Route 
              element={
                <ProtectedRoute allowedRoles={['agente', 'profesionista', 'empresario']}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/certifications/new" element={<NewCertification />} />
              <Route path="/certifications/:id" element={<CertificationDetail />} />
              <Route path="/new-user-certification" element={<NewUserCertification />} />
              <Route path="/vista-certification" element={<VistaCertificacion />} />
              <Route path="/declaraciones" element={<Declaraciones />} />
              <Route path="/expediente" element={<Expediente />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sitemap" element={<SiteMap />} />
            </Route>

            {/* Rutas para COMITÉ */}
            <Route 
              path="/committee" 
              element={
                <ProtectedRoute allowedRoles={['comite']}>
                  <CommitteeLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<CommitteeDashboard />} />
              <Route path="review" element={<CommitteeReview />} /> {/* Lista de revisiones */}
              <Route path="review/:id" element={<CertificationReview />} /> {/* Revisión específica */}
              <Route path="document/:certId/:docId" element={<DocumentReview />} /> {/* Visor documento */}
              <Route path="alerts" element={<CommitteeAlerts />} />
              {/*<Route path="assignments" element={<CommitteeAssignments />} />
              <Route path="metrics" element={<CommitteeMetrics />} />*/}
              <Route path="profile" element={<CommitteeProfile />} />
            </Route>

            {/* Rutas para ASOCIACIÓN */}
            <Route 
              path="/association" 
              element={
                <ProtectedRoute allowedRoles={['asociacion']}>
                  <AssociationLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<AssociationDashboard />} />
              <Route path="alerts" element={<AlertsAsociacion />} />
              <Route path="control-asociados" element={<ControlAsociados />} />
              <Route path="profile" element={<AssociationProfile />} />
            </Route>

            {/* Rutas para ADMIN */}
            <Route 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/users/:id/review" element={<UserReview />} />
              <Route path="/admin/system-config" element={<SystemConfig />} />
              <Route path="/admin/expediente-config" element={<ExpedienteConfig />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/audit" element={<AuditLog />} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            {/* Ruta 404 */}
            <Route path="*" element={<div style={{ padding: '50px', textAlign: 'center' }}>404 - Página no encontrada</div>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;