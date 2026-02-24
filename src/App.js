import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

// Context
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts según tipo de usuario
import MainLayout from "./layouts/MainLayout";
import CommitteeLayout from "./layouts/CommitteeLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import AssociationLayout from "./layouts/AssociationLayout"; 
import SuperAdminLayout from "./layouts/SuperAdminLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import PasswordChange from "./pages/auth/PasswordChange";
import PrivacyAgreement from "./pages/auth/PrivacyAgreement";

//Pagina de redirección
import PaginaRedireccion from './pages/Pagina_Principal/pagina_redireccion';
import PaginaLegalCompleta from './pages/Pagina_Principal/pagina_legal';

// Dashboard Pages (diferentes por rol)
import UserDashboard from "./pages/agente/dashboard/UserDashboard";
import UserDashboard2 from "./pages/agente/dashboard/DashboarDos";
import CommitteeDashboard from "./pages/committee/CommitteeDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
// NUEVO DASHBOARD

// Certifications agente
import Certifications from "./pages/agente/certifications/Certifications";
import CertificationDetail from "./pages/agente/certifications/CertificationDetail";
import NewCertification from "./pages/agente/certifications/NewCertification";
import NewUserCertification from "./pages/agente/expediente/NewUserCertification";
import Declaraciones from "./pages/agente/expediente/Declaraciones";
import VistaCertificacion from "./pages/agente/certifications/VistaCertificacion";
import Notificaciones from "./pages/agente/notifications/AlertsAgent";

// Expediente
import Expediente from "./pages/agente/expediente/Expediente";

// Profile
import Profile from "./pages/agente/profile/Profile";

// Auditoria
import AuditAgent from './pages/agente/auditoria/AuditAgent';

// Admin Modules
import UserManagement from "./pages/admin/UserManagement";
import UserReview from "./pages/admin/UserReview";
import SystemConfig from "./pages/admin/SystemConfig";
import Reports from "./pages/admin/Reports";
import AuditLog from "./pages/admin/audit/AuditLog";
import ExpedienteConfig from "./pages/admin/ConfigExpediente";
import GeneralAlerts from "./pages/admin/GeneralAlerts";
import AdminProfrofile from './pages/admin/AdminProfile';

// Committee Modules
import CommitteeReview from "./pages/committee/CommitteeReview";
import CertificationReview from "./pages/committee/CertificationReview";
import DocumentReview from "./pages/committee/DocumentReview";
import CommitteeAlerts from "./pages/committee/CommitteeAlerts";
import CommitteeProfile from "./pages/committee/CommitteeProfile";
import CommitteeAssignments from './pages/committee/CommitteeAssignments';
import CollegiateVoting from './pages/committee/CollegiateVoting';
import CommitteeRepository from './pages/committee/CommitteeRepository';
import CommitteeMinutes from './pages/committee/CommitteeMinutes';
/*import CommitteeAssignments from './pages/committee/CommitteeAssignments';
import CommitteeMetrics from './pages/committee/CommitteeMetrics';*/

// Association Modules 
import AssociationDashboard from "./pages/association/AssociationDashboard";
import ControlAsociados from "./pages/association/ControlAsociados";
import AlertsAsociacion from "./pages/association/AlertsAsociacion"; // NUEVO
import AssociationProfile from "./pages/association/AssociationProfile"; // NUEVO
import ExpedienteAssociation from "./pages/association/ExpedienteAsociados";
import AssociationAuditLog from "./pages/association/AssociationAuditLog";

//  SuperAdministrador 
import SuperASystemInstances from './pages/superadmin/SuperASystemInstances';
import SuperAAdminDashboard from "./pages/superadmin/SuperAAdminDashboard";
import SuperAUserManagement from "./pages/superadmin/SuperAUserManagement";
import SuperASystemConfig from "./pages/superadmin/SuperASystemConfig";
import SuperAAuditLog from "./pages/superadmin/SuperAAuditLog";
import SuperAExpedienteConfig from "./pages/superadmin/SuperAConfigExpediente";
import SuperAReports from "./pages/superadmin/SuperAReports";
import SuperAProfile from "./pages/superadmin/SuperAProfile";
import SuperAAlerts from "./pages/superadmin/SuperAAlerts";

// Mapa del sitio
import SiteMap from "./pages/sitemap/SiteMap";

// Importar tema personalizado
import theme from "./theme";

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

            <Route path="/inicio" element={<PaginaRedireccion />} />
            <Route path="/legal" element={<PaginaLegalCompleta />} />
            <Route path="/sitemap" element={<SiteMap />} />

            {/* Rutas para USUARIO AGENTE */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["agente", "profesionista", "empresario"]}
                >
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/dashboards" element={<UserDashboard2 />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route
                path="/certifications/new"
                element={<NewCertification />}
              />
              <Route
                path="/certifications/:id"
                element={<CertificationDetail />}
              />
              <Route
                path="/new-user-certification"
                element={<NewUserCertification />}
              />
              <Route
                path="/vista-certification"
                element={<VistaCertificacion />}
              />
              <Route path="/declaraciones" element={<Declaraciones />} />
              <Route path="/expediente" element={<Expediente />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/audit-agent" element={<AuditAgent />} />
              <Route path="/notificaciones" element={<Notificaciones />} />
            </Route>

            {/* Rutas para COMITÉ */}
<Route
  path="/committee"
  element={
    <ProtectedRoute allowedRoles={["comite"]}>
      <CommitteeLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Navigate to="dashboard" />} />
  <Route path="dashboard" element={<CommitteeDashboard />} />
  <Route path="review" element={<CommitteeReview />} />
  <Route path="review/:id" element={<CertificationReview />} />
  <Route path="document/:certId/:docId" element={<DocumentReview />} />
  <Route path="alerts" element={<CommitteeAlerts />} />
  <Route path="assignments" element={<CommitteeAssignments />} />
  <Route path="voting" element={<CollegiateVoting />} />
  <Route path="repository" element={<CommitteeRepository />} />
  <Route path="minutes" element={<CommitteeMinutes />} />
  <Route path="profile" element={<CommitteeProfile />} />
</Route>

            {/* Rutas para ASOCIACIÓN */}
            <Route
              path="/association"
              element={
                <ProtectedRoute allowedRoles={["asociacion"]}>
                  <AssociationLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<AssociationDashboard />} />
              <Route path="alerts" element={<AlertsAsociacion />} />
              <Route path="control-asociados" element={<ControlAsociados />} />
              <Route path="expediente" element={<ExpedienteAssociation />} />
              <Route path="profile" element={<AssociationProfile />} />
              <Route path="audit" element={<AssociationAuditLog />} />
            </Route>

            {/* Rutas para SUPER-ADMIN */}
            <Route
              path="/supera"
              element={
                <ProtectedRoute allowedRoles={["supera"]}>
                  <SuperAdminLayout/>
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<SuperAAdminDashboard />} />
              <Route path="instancias" element={<SuperASystemInstances />} />
              <Route path="users" element={<SuperAUserManagement />} />
              <Route path="system-config" element={<SuperASystemConfig />} />
              <Route path="expediente-config"element={<SuperAExpedienteConfig />}/>
              <Route path="reports" element={<SuperAReports />} />
              <Route path="audit" element={<SuperAAuditLog />} />
              <Route path="profile" element={<SuperAProfile />} />
               <Route path="alerts" element={<SuperAAlerts />} />
            </Route>


            {/* Rutas para ADMIN */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/users/:id/review" element={<UserReview />} />
              <Route path="/admin/system-config" element={<SystemConfig />} />
              <Route
                path="/admin/expediente-config"
                element={<ExpedienteConfig />}
              />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/audit" element={<AuditLog />} />
              <Route path="/admin/alerts" element={<GeneralAlerts/>} />
              <Route path="/admin/profile" element={<AdminProfrofile/>} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="/" element={<Navigate to="/inicio" />} />

            {/* Ruta 404 */}
            <Route
              path="*"
              element={
                <div style={{ padding: "50px", textAlign: "center" }}>
                  404 - Página no encontrada
                </div>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
