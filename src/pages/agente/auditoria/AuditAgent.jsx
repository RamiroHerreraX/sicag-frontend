// src/pages/audit/AuditAgent.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  Divider,
  Avatar,
  LinearProgress,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TablePagination
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Restore as RestoreIcon,
  History as HistoryIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Gavel as GavelIcon,
  Settings as SettingsIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  CloudUpload as CloudUploadIcon,
  Verified as VerifiedIcon,
  Send as SendIcon,
  Business as BusinessIcon,
  LocationCity as LocationCityIcon,
  FactCheck as FactCheckIcon,
  Assessment as AssessmentIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  Pending as PendingIcon,
  Update as UpdateIcon,
  Close as CloseIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon
} from '@mui/icons-material';

// Paleta corporativa del UserManagement
const colors = {
  primary: {
    dark: '#0D2A4D',
    main: '#133B6B',
    light: '#3A6EA5'
  },
  secondary: {
    main: '#00A8A8',
    light: '#00C2D1',
    lighter: '#35D0FF'
  },
  accents: {
    blue: '#0099FF',
    purple: '#6C5CE7'
  },
  status: {
    success: '#00A8A8',
    warning: '#00C2D1',
    error: '#0099FF',
    info: '#3A6EA5'
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  }
};

const AuditAgent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterEntity, setFilterEntity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('auditoria'); // 'auditoria' o 'trazabilidad'
  const rowsPerPage = 10;

  // Estados para modales
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  // Estados personalizados basados en los que proporcionaste
  const statusConfig = {
    'Aceptados': {
      label: 'Aceptados',
      color: colors.status.success,
      bgColor: '#e8f5e9',
      icon: <CheckCircleIcon />,
      description: 'Certificación validada y activa'
    },
    'En revisión': {
      label: 'En revisión',
      color: colors.status.warning,
      bgColor: '#fff3e0',
      icon: <PendingIcon />,
      description: 'En proceso de validación por el comité'
    },
    'Información adicional': {
      label: 'Información adicional',
      color: colors.primary.main,
      bgColor: '#e3f2fd',
      icon: <InfoIcon />,
      description: 'Requiere documentación complementaria'
    },
    'Desactualizado': {
      label: 'Desactualizado',
      color: colors.status.warning,
      bgColor: '#fffde7',
      icon: <UpdateIcon />,
      description: 'Requiere actualización'
    },
    'Registro': {
      label: 'Registro',
      color: colors.primary.light,
      bgColor: '#e1f5fe',
      icon: <AddIcon />,
      description: 'Registro inicial pendiente de validación'
    },
    'Rechazado': {
      label: 'Rechazado',
      color: colors.status.error,
      bgColor: '#ffebee',
      icon: <ErrorIcon />,
      description: 'Certificación no aprobada o vencida'
    }
  };

  // Datos de auditoría específicos para AGENTE ADUANAL con estados actualizados
  const auditLogs = [
    {
      id: 1,
      timestamp: '15/01/2026 10:30:15',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'LOGIN_SUCCESS',
      actionName: 'Inicio de sesión exitoso',
      entity: 'Sistema',
      entityId: 'N/A',
      details: 'Inicio de sesión desde dispositivo principal',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Aceptados',
      icon: <LoginIcon />,
      
    },
    {
      id: 2,
      timestamp: '15/01/2026 09:45:22',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'CERTIFICATION_CREATE',
      actionName: 'Certificación creada',
      entity: 'Certificación',
      entityId: 'PA-2026-00145',
      details: 'Patente Aduanal creada para expediente EXP-2024-567',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'success',
      status: 'Aceptados',
      icon: <AddIcon />,
      
    },
    {
      id: 3,
      timestamp: '15/01/2026 08:20:18',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'CERTIFICATION_UPDATE',
      actionName: 'Certificación actualizada',
      entity: 'Certificación',
      entityId: 'PA-2026-00122',
      details: 'Fecha de vencimiento extendida para patente aduanal',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'En revisión',
      icon: <EditIcon />,
      
    },
    {
      id: 4,
      timestamp: '14/01/2026 16:45:33',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'DOCUMENT_UPLOAD',
      actionName: 'Documento cargado',
      entity: 'Documento',
      entityId: 'DOC-2026-78901',
      details: 'Comprobante de domicilio actualizado en expediente',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Aceptados',
      icon: <CloudUploadIcon />,
      
    },
    {
      id: 5,
      timestamp: '14/01/2026 14:10:55',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'DECLARACION_SUBMIT',
      actionName: 'Declaración enviada',
      entity: 'Declaración',
      entityId: 'DEC-2026-04567',
      details: 'Declaración de cumplimiento aduanero - Artículos 95-98',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'success',
      status: 'En revisión',
      icon: <AssignmentTurnedInIcon />,
     
    },
    {
      id: 6,
      timestamp: '14/01/2026 11:30:42',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'EXPEDIENTE_UPDATE',
      actionName: 'Expediente actualizado',
      entity: 'Expediente',
      entityId: 'EXP-2024-567',
      details: 'Información profesional actualizada (CV, certificaciones)',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Información adicional',
      icon: <DescriptionIcon />,
      
    },
    {
      id: 7,
      timestamp: '13/01/2026 18:15:28',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'ADUANA_ADD',
      actionName: 'Aduana agregada',
      entity: 'Aduana',
      entityId: 'ADQ-2024-00123',
      details: 'Aduana de Querétaro registrada como principal',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'success',
      status: 'Aceptados',
      icon: <LocationCityIcon />,
     
    },
    {
      id: 8,
      timestamp: '13/01/2026 15:40:19',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'PASSWORD_CHANGE',
      actionName: 'Contraseña cambiada',
      entity: 'Usuario',
      entityId: 'USR-003',
      details: 'Cambio de contraseña exitoso por política de seguridad',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Registro',
      icon: <SecurityIcon />,
      
    },
    {
      id: 9,
      timestamp: '13/01/2026 12:05:37',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'VALIDATION_SEND',
      actionName: 'Validación enviada',
      entity: 'Validación',
      entityId: 'VAL-2026-00122',
      details: 'Documentos de cumplimiento organizacional enviados a comité',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'warning',
      status: 'En revisión',
      icon: <SendIcon />,
      
    },
    {
      id: 10,
      timestamp: '12/01/2026 17:25:44',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'CERTIFICATION_DOWNLOAD',
      actionName: 'Certificación descargada',
      entity: 'Certificación',
      entityId: 'PA-2026-00145',
      details: 'Patente Aduanal descargada en formato PDF',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Aceptados',
      icon: <DownloadIcon />,
      
    },
    {
      id: 11,
      timestamp: '11/01/2026 10:15:33',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'PROFILE_UPDATE',
      actionName: 'Perfil actualizado',
      entity: 'Perfil',
      entityId: 'PRO-003',
      details: 'Información de contacto y preferencias actualizada',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Desactualizado',
      icon: <PersonIcon />,
     
    },
    {
      id: 12,
      timestamp: '10/01/2026 14:20:18',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'DECLARATION_SAVE',
      actionName: 'Declaración guardada',
      entity: 'Declaración',
      entityId: 'DEC-2026-04567',
      details: 'Borrador de declaración fiscal guardado',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Registro',
      icon: <FactCheckIcon />,
     
    },
    {
      id: 13,
      timestamp: '09/01/2026 11:45:22',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'AUDIT_VIEW',
      actionName: 'Auditoría consultada',
      entity: 'Auditoría',
      entityId: 'AUD-2026-0001',
      details: 'Consulta de historial de actividades del mes',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Aceptados',
      icon: <VisibilityIcon />,
      
    },
    {
      id: 14,
      timestamp: '08/01/2026 16:30:15',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'NOTIFICATION_READ',
      actionName: 'Notificación leída',
      entity: 'Notificación',
      entityId: 'NOT-2026-0034',
      details: 'Notificación de vencimiento de certificación leída',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Desactualizado',
      icon: <DescriptionIcon />,
     
    },
    {
      id: 15,
      timestamp: '07/01/2026 09:15:42',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'REPORT_GENERATE',
      actionName: 'Reporte generado',
      entity: 'Reporte',
      entityId: 'REP-2026-0001',
      details: 'Reporte de cumplimiento trimestral generado',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'success',
      status: 'Rechazado',
      icon: <AssessmentIcon />,
      
    },
    {
      id: 16,
      timestamp: '06/01/2026 14:20:30',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'CERTIFICATION_EXPIRE',
      actionName: 'Certificación vencida',
      entity: 'Certificación',
      entityId: 'PA-2025-00321',
      details: 'Patente Aduanal ha vencido - requiere renovación',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'warning',
      status: 'Rechazado',
      icon: <ErrorIcon />,
     
    },
    {
      id: 17,
      timestamp: '05/01/2026 10:45:18',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'DOCUMENT_REQUEST',
      actionName: 'Documento solicitado',
      entity: 'Documento',
      entityId: 'DOC-2026-04512',
      details: 'Solicitud de documentación complementaria para validación',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'info',
      status: 'Información adicional',
      icon: <InfoIcon />,
     
    },
    {
      id: 18,
      timestamp: '04/01/2026 16:10:55',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'CERTIFICATION_RENEW',
      actionName: 'Certificación renovada',
      entity: 'Certificación',
      entityId: 'PA-2026-00178',
      details: 'Renovación exitosa de patente aduanal',
      ipAddress: '192.168.1.105',
      device: 'Chrome / Windows',
      severity: 'success',
      status: 'Aceptados',
      icon: <CheckCircleIcon />,
     
    },
  ];

  // Acciones específicas que puede realizar el AGENTE
  const actionTypes = [
    { value: 'all', label: 'Todas las acciones' },
    { value: 'LOGIN', label: 'Accesos al sistema' },
    { value: 'CERTIFICATION', label: 'Gestión de Certificaciones' },
    { value: 'DOCUMENT', label: 'Documentos y Expediente' },
    { value: 'DECLARACION', label: 'Declaraciones' },
    { value: 'ADUANA', label: 'Gestión de Aduanas' },
    { value: 'PROFILE', label: 'Perfil y Configuración' },
    { value: 'SECURITY', label: 'Seguridad' },
    { value: 'REPORT', label: 'Reportes y Consultas' },
  ];

  // Entidades específicas del AGENTE
  const entities = [
    { value: 'all', label: 'Todas las entidades' },
    { value: 'Certificación', label: 'Certificaciones' },
    { value: 'Expediente', label: 'Expediente Digital' },
    { value: 'Declaración', label: 'Declaraciones' },
    { value: 'Aduana', label: 'Aduanas' },
    { value: 'Perfil', label: 'Perfil Personal' },
    { value: 'Documento', label: 'Documentos' },
    { value: 'Sistema', label: 'Sistema SICAG' },
  ];

  // Estados para filtro
  const statusFilter = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'Aceptados', label: 'Aceptados' },
    { value: 'En revisión', label: 'En revisión' },
    { value: 'Información adicional', label: 'Información adicional' },
    { value: 'Desactualizado', label: 'Desactualizado' },
    { value: 'Registro', label: 'Registro' },
    { value: 'Rechazado', label: 'Rechazado' },
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'success': return colors.status.success;
      case 'info': return colors.primary.main;
      case 'warning': return colors.status.warning;
      case 'error': return colors.status.error;
      default: return colors.text.secondary;
    }
  };

  const getActionIcon = (action) => {
    if (action.includes('CERTIFICATION')) return <VerifiedIcon />;
    if (action.includes('DOCUMENT') || action.includes('EXPEDIENTE')) return <DescriptionIcon />;
    if (action.includes('DECLARACION')) return <ReceiptIcon />;
    if (action.includes('ADUANA')) return <LocationCityIcon />;
    if (action.includes('LOGIN') || action.includes('LOGOUT')) return <LoginIcon />;
    if (action.includes('PROFILE')) return <PersonIcon />;
    if (action.includes('SECURITY') || action.includes('PASSWORD')) return <SecurityIcon />;
    if (action.includes('REPORT') || action.includes('AUDIT')) return <AssessmentIcon />;
    return <DescriptionIcon />;
  };

  const getStatusChip = (status) => {
    const config = statusConfig[status] || statusConfig['Registro'];
    
    return (
      <Tooltip title={config.description}>
        <Chip
          icon={config.icon}
          label={config.label}
          size="small"
          sx={{
            backgroundColor: config.bgColor,
            color: config.color,
            border: `1px solid ${config.color}40`,
            fontWeight: '600',
            fontSize: '0.75rem',
            height: '24px',
            '& .MuiChip-icon': {
              color: config.color,
              fontSize: '16px'
            }
          }}
        />
      </Tooltip>
    );
  };

  // Función para abrir modal de detalles
  const handleOpenDetailModal = (log) => {
    setSelectedLog(log);
    setDetailModalOpen(true);
  };

  // Función para cerrar modal de detalles
  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedLog(null);
  };

  // Función para abrir modal de certificación
  const handleOpenCertModal = (cert) => {
    setSelectedCert(cert);
    setCertModalOpen(true);
  };

  // Función para cerrar modal de certificación
  const handleCloseCertModal = () => {
    setCertModalOpen(false);
    setSelectedCert(null);
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.actionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      filterType === 'all' ? true : log.action.includes(filterType);
    
    const matchesEntity = 
      filterEntity === 'all' ? true : log.entity === filterEntity;
    
    const matchesStatus = 
      filterStatus === 'all' ? true : log.status === filterStatus;
    
    return matchesSearch && matchesType && matchesEntity && matchesStatus;
  });

  const paginatedLogs = filteredLogs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Estadísticas específicas para AGENTE
  const stats = {
    total: auditLogs.length,
    today: auditLogs.filter(log => log.timestamp.includes('15/01/2026')).length,
    thisWeek: auditLogs.filter(log => {
      const date = parseInt(log.timestamp.split('/')[0]);
      return date >= 4 && date <= 15;
    }).length,
    bySeverity: {
      success: auditLogs.filter(log => log.severity === 'success').length,
      info: auditLogs.filter(log => log.severity === 'info').length,
      warning: auditLogs.filter(log => log.severity === 'warning').length,
      error: auditLogs.filter(log => log.severity === 'error').length,
    },
    byStatus: {
      aceptados: auditLogs.filter(log => log.status === 'Aceptados').length,
      enRevision: auditLogs.filter(log => log.status === 'En revisión').length,
      infoAdicional: auditLogs.filter(log => log.status === 'Información adicional').length,
      desactualizado: auditLogs.filter(log => log.status === 'Desactualizado').length,
      registro: auditLogs.filter(log => log.status === 'Registro').length,
      rechazado: auditLogs.filter(log => log.status === 'Rechazado').length,
    },
    byEntity: {
      certificaciones: auditLogs.filter(log => log.entity === 'Certificación').length,
      expediente: auditLogs.filter(log => log.entity === 'Expediente').length,
      declaraciones: auditLogs.filter(log => log.entity === 'Declaración').length,
      aduanas: auditLogs.filter(log => log.entity === 'Aduana').length,
      perfil: auditLogs.filter(log => log.entity === 'Perfil').length,
    }
  };

  // Trazabilidad de certificaciones específicas del agente
  const certificationTrace = [
    {
      id: 1,
      certification: 'Patente Aduanal PA-2026-00145',
      status: 'Aceptados',
      tipo: 'Patente Aduanal',
      numero: 'PA-2026-00145',
      fechaEmision: '11/01/2026',
      fechaVencimiento: '11/01/2029',
      documentos: [
        { nombre: 'patente_aduanal.pdf', tipo: 'PDF', tamaño: '1.2 MB' },
        { nombre: 'comprobante_pago.pdf', tipo: 'PDF', tamaño: '0.8 MB' }
      ],
      timeline: [
        { date: '11/01/2026 09:00', action: 'Certificación creada', user: 'Luis Rodríguez', status: 'Registro' },
        { date: '11/01/2026 10:30', action: 'Documentos subidos', user: 'Luis Rodríguez', status: 'Información adicional' },
        { date: '12/01/2026 14:15', action: 'Enviada a validación', user: 'Luis Rodríguez', status: 'En revisión' },
        { date: '13/01/2026 11:20', action: 'Aprobada por comité', user: 'María González', status: 'Aceptados' },
        { date: '15/01/2026 09:45', action: 'Actualización de fecha', user: 'Luis Rodríguez', status: 'Aceptados' },
      ]
    },
    {
      id: 2,
      certification: 'Opinión SAT OS-2025-03421',
      status: 'En revisión',
      tipo: 'Opinión SAT',
      numero: 'OS-2025-03421',
      fechaEmision: '15/11/2025',
      fechaVencimiento: '15/11/2026',
      documentos: [
        { nombre: 'opinion_sat.pdf', tipo: 'PDF', tamaño: '0.9 MB' }
      ],
      timeline: [
        { date: '15/11/2025 10:00', action: 'Certificación creada', user: 'Luis Rodríguez', status: 'Registro' },
        { date: '10/01/2026 15:30', action: 'Documentación complementaria', user: 'Luis Rodríguez', status: 'Información adicional' },
        { date: '10/01/2026 16:45', action: 'Enviada a revisión', user: 'Luis Rodríguez', status: 'En revisión' },
      ]
    },
    {
      id: 3,
      certification: 'Cédula Profesional CP-2024-56789',
      status: 'Desactualizado',
      tipo: 'Cédula Profesional',
      numero: 'CP-2024-56789',
      fechaEmision: '20/03/2024',
      fechaVencimiento: '20/03/2027',
      documentos: [
        { nombre: 'cedula_profesional.pdf', tipo: 'PDF', tamaño: '1.1 MB' },
        { nombre: 'titulo_universitario.pdf', tipo: 'PDF', tamaño: '2.3 MB' }
      ],
      timeline: [
        { date: '20/03/2024 09:30', action: 'Registro inicial', user: 'Luis Rodríguez', status: 'Registro' },
        { date: '25/03/2024 14:20', action: 'Aprobación inicial', user: 'Carlos Martínez', status: 'Aceptados' },
        { date: '05/01/2026 11:15', action: 'Notificación de actualización', user: 'Sistema', status: 'Desactualizado' },
      ]
    }
  ];

  // Modal de detalles de actividad
  const DetailModal = () => (
    <Dialog 
      open={detailModalOpen} 
      onClose={handleCloseDetailModal}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      {selectedLog && (
        <>
          <DialogTitle sx={{ 
            borderBottom: `1px solid ${colors.primary.main}20`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ color: getSeverityColor(selectedLog.severity) }}>
                {getActionIcon(selectedLog.action)}
              </Box>
              <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 'bold' }}>
                Detalles de la Actividad
              </Typography>
            </Box>
            <IconButton onClick={handleCloseDetailModal} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent sx={{ py: 3 }}>
            <Grid container spacing={3}>
              {/* Información principal */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ color: colors.primary.main, mb: 2, fontWeight: 'bold' }}>
                      Información General
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Acción realizada
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.primary, fontWeight: 'bold' }}>
                        {selectedLog.actionName}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Descripción completa
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.primary }}>
                        {selectedLog.details}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Fecha y hora
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.primary }}>
                        {selectedLog.timestamp}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Estado
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        {getStatusChip(selectedLog.status)}
                      </Box>
                    </Box>
                    
                    <Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Severidad
                      </Typography>
                      <Chip 
                        label={selectedLog.severity}
                        size="small"
                        sx={{ 
                          bgcolor: `${getSeverityColor(selectedLog.severity)}15`,
                          color: getSeverityColor(selectedLog.severity),
                          fontSize: '0.75rem',
                          mt: 0.5
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Información de entidad y metadatos */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ color: colors.primary.main, mb: 2, fontWeight: 'bold' }}>
                      Entidad y Metadatos
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Entidad afectada
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.primary, fontWeight: 'bold' }}>
                        {selectedLog.entity}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        ID de entidad
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.primary }}>
                        {selectedLog.entityId}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Usuario
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: colors.primary.main }}>
                          {selectedLog.user.avatar}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: colors.text.primary }}>
                          {selectedLog.user.name} ({selectedLog.user.role})
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Dirección IP
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.primary }}>
                        {selectedLog.ipAddress || '192.168.1.105'}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Dispositivo / Navegador
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.primary }}>
                        {selectedLog.device || 'Chrome / Windows'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Metadatos específicos según el tipo de acción */}
              {selectedLog.metadata && Object.keys(selectedLog.metadata).length > 0 && (
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: colors.primary.main, mb: 2, fontWeight: 'bold' }}>
                        Información adicional
                      </Typography>
                      
                      <Grid container spacing={2}>
                        {Object.entries(selectedLog.metadata).map(([key, value]) => (
                          <Grid item xs={12} sm={6} md={4} key={key}>
                            <Box>
                              <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                              </Typography>
                              <Typography variant="body2" sx={{ color: colors.text.primary, fontWeight: '500' }}>
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${colors.primary.main}20` }}>
            <Button 
              onClick={handleCloseDetailModal}
              variant="outlined"
              sx={{ 
                textTransform: 'none',
                color: colors.primary.main,
                borderColor: colors.primary.main
              }}
            >
              Cerrar
            </Button>
            <Button 
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ 
                textTransform: 'none',
                bgcolor: colors.primary.main,
                '&:hover': { bgcolor: colors.primary.dark }
              }}
            >
              Exportar este evento
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );

  // Modal de vista previa de certificación - VERSIÓN COMPACTA Y ORGANIZADA
const CertPreviewModal = () => (
  <Dialog 
    open={certModalOpen} 
    onClose={handleCloseCertModal}
    maxWidth="md"
    fullWidth
    PaperProps={{
      sx: { 
        borderRadius: 2,
        overflow: 'hidden'
      }
    }}
  >
    {selectedCert && (
      <>
        {/* Header con gradiente */}
        <DialogTitle sx={{ 
          background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.main} 100%)`,
          color: 'white',
          py: 2,
          px: 3
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <VerifiedIcon sx={{ fontSize: 24 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedCert.certification}
              </Typography>
            </Box>
            <IconButton onClick={handleCloseCertModal} size="small" sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ py: 2, px: 3, bgcolor: '#f8fafc' }}>
          {/* Fila de estado y fechas clave - MÁS COMPACTA */}
          <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'white', borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: '50%', 
                    bgcolor: `${statusConfig[selectedCert.status]?.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {statusConfig[selectedCert.status]?.icon || <InfoIcon sx={{ fontSize: 18 }} />}
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                      Estado actual
                    </Typography>
                    <Box sx={{ mt: 0.25 }}>
                      {getStatusChip(selectedCert.status)}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CalendarIcon sx={{ fontSize: 18, color: colors.primary.main }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                      Emisión
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: '500', fontSize: '0.9rem' }}>
                      {selectedCert.fechaEmision}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <UpdateIcon sx={{ fontSize: 18, color: colors.status.warning }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                      Vencimiento
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: '500', fontSize: '0.9rem' }}>
                      {selectedCert.fechaVencimiento}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* SECCIÓN PRINCIPAL - DOS COLUMNAS ORGANIZADAS */}
          <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'white', borderRadius: 2 }}>
            <Grid container spacing={3}>
              {/* Columna izquierda - Detalles de Certificación */}
              <Grid item xs={12} md={6}>
                <Box sx={{ borderRight: { md: `1px solid ${colors.primary.main}20` }, pr: { md: 2 } }}>
                  <Typography variant="subtitle2" sx={{ 
                    color: colors.primary.main, 
                    mb: 1.5, 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    <FactCheckIcon sx={{ fontSize: 18 }} />
                    Detalles de la Certificación
                  </Typography>
                  
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.7rem' }}>
                        Tipo
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: '500', fontSize: '0.9rem' }}>
                        {selectedCert.tipo || 'Patente Aduanal'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.7rem' }}>
                        Número
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: '500', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                        {selectedCert.numero || 'PA-2026-00145'}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.7rem' }}>
                        Autoridad emisora
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                        SAT - Servicio de Administración Tributaria
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.7rem' }}>
                        Última actualización
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                        15/01/2026
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              
              {/* Columna derecha - Información Adicional */}
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="subtitle2" sx={{ 
                    color: colors.primary.main, 
                    mb: 1.5, 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    <DescriptionIcon sx={{ fontSize: 18 }} />
                    Información Adicional
                  </Typography>
                  
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.7rem' }}>
                        Vigencia
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                        3 años
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.7rem' }}>
                        Horas acreditadas
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: '500', fontSize: '0.9rem' }}>
                        40 horas
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.7rem' }}>
                        Ámbito
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                        Nacional
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.7rem' }}>
                        Estatus
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.status.success, fontWeight: '500', fontSize: '0.9rem' }}>
                        Vigente
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Documentos asociados - MÁS COMPACTO */}
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'white', borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ 
              color: colors.primary.main, 
              mb: 1.5, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              fontSize: '0.9rem'
            }}>
              <DownloadIcon sx={{ fontSize: 18 }} />
              Documentos Asociados ({selectedCert.documents?.length || 2})
            </Typography>
            
            <Grid container spacing={1.5}>
              {(selectedCert.documents || [
                { nombre: 'certificado_oficial.pdf', tipo: 'PDF', tamaño: '1.2 MB' },
                { nombre: 'anexo_tecnico.pdf', tipo: 'PDF', tamaño: '0.8 MB' }
              ]).map((doc, index) => (
                <Grid item xs={12} key={index}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.5,
                      border: `1px solid ${colors.primary.main}20`,
                      borderRadius: 1,
                      '&:hover': {
                        borderColor: colors.primary.main,
                        bgcolor: '#f8f9fa'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {doc.tipo === 'PDF' ? 
                        <PdfIcon sx={{ color: colors.status.error, fontSize: 20 }} /> : 
                        <FileIcon sx={{ color: colors.primary.main, fontSize: 20 }} />
                      }
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: '500', fontSize: '0.9rem' }}>
                          {doc.nombre}
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                          {doc.tipo} • {doc.tamaño}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box>
                      <Tooltip title="Ver">
                        <IconButton size="small" sx={{ color: colors.primary.main }}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Descargar">
                        <IconButton size="small" sx={{ color: colors.status.success }}>
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 2, 
          borderTop: `1px solid ${colors.primary.main}20`,
          bgcolor: '#f8fafc',
          justifyContent: 'flex-end',
          gap: 1
        }}>
          <Button 
            onClick={handleCloseCertModal}
            variant="outlined"
            size="small"
            sx={{ 
              textTransform: 'none',
              color: colors.primary.main,
              borderColor: colors.primary.main,
              px: 2
            }}
          >
            Cerrar
          </Button>
          <Button 
            variant="contained"
            size="small"
            startIcon={<DownloadIcon />}
            sx={{ 
              textTransform: 'none',
              bgcolor: colors.primary.main,
              '&:hover': { bgcolor: colors.primary.dark },
              px: 2
            }}
          >
            Descargar
          </Button>
        </DialogActions>
      </>
    )}
  </Dialog>
);

  const renderAuditView = () => (
    <>
      {/* Estadísticas - Versión con CSS Grid */}
<Box sx={{ width: '100%', mb: 3 }}>
  <Box sx={{ 
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr 1fr',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(5, 1fr)'
    },
    gap: 1.5
  }}>
    <Card sx={{ borderLeft: `4px solid ${colors.primary.main}` }}>
      <CardContent sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: colors.primary.main, fontWeight: 'bold', mb: 0.5 }}>
          {stats.total}
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          Total de Eventos
        </Typography>
      </CardContent>
    </Card>
    
    <Card sx={{ borderLeft: `4px solid ${colors.status.success}` }}>
      <CardContent sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: colors.status.success, fontWeight: 'bold', mb: 0.5 }}>
          {stats.byStatus.aceptados}
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          Aceptados
        </Typography>
      </CardContent>
    </Card>
    
    <Card sx={{ borderLeft: `4px solid ${colors.status.warning}` }}>
      <CardContent sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: colors.status.warning, fontWeight: 'bold', mb: 0.5 }}>
          {stats.byStatus.enRevision}
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          En Revisión
        </Typography>
      </CardContent>
    </Card>
    
    <Card sx={{ borderLeft: `4px solid ${colors.status.warning}` }}>
      <CardContent sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: colors.status.warning, fontWeight: 'bold', mb: 0.5 }}>
          {stats.byStatus.desactualizado}
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          Desactualizados
        </Typography>
      </CardContent>
    </Card>
    
    <Card sx={{ borderLeft: `4px solid ${colors.status.error}` }}>
      <CardContent sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: colors.status.error, fontWeight: 'bold', mb: 0.5 }}>
          {stats.byStatus.rechazado}
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          Rechazados
        </Typography>
      </CardContent>
    </Card>
  </Box>
</Box>

      {/* Filtros */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={2.5}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar en auditoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: colors.primary.main }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: colors.text.primary }}>Tipo de Acción</InputLabel>
              <Select
                value={filterType}
                label="Tipo de Acción"
                onChange={(e) => setFilterType(e.target.value)}
              >
                {actionTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: colors.text.primary }}>Entidad</InputLabel>
              <Select
                value={filterEntity}
                label="Entidad"
                onChange={(e) => setFilterEntity(e.target.value)}
              >
                {entities.map(entity => (
                  <MenuItem key={entity.value} value={entity.value}>{entity.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: colors.text.primary }}>Estado</InputLabel>
              <Select
                value={filterStatus}
                label="Estado"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statusFilter.map(status => (
                  <MenuItem key={status.value} value={status.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {status.value !== 'all' && statusConfig[status.value]?.icon}
                      {status.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterEntity('all');
                  setFilterStatus('all');
                  setPage(1);
                }}
                sx={{
                  color: colors.primary.main,
                  borderColor: colors.primary.main
                }}
              >
                Limpiar
              </Button>
              <Button
                fullWidth
                variant="contained"
                size="small"
                startIcon={<DownloadIcon />}
                sx={{
                  bgcolor: colors.primary.main,
                  '&:hover': { bgcolor: colors.primary.dark }
                }}
              >
                Exportar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de auditoría */}
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Box sx={{ 
          p: 2, 
          borderBottom: `1px solid ${colors.primary.main}20`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
            Mi Historial de Actividades - {filteredLogs.length} eventos
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <Chip 
              label={`${stats.today} eventos hoy`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ color: colors.primary.main, borderColor: colors.primary.main }}
            />
            <Chip 
              label={`${paginatedLogs.length} mostrados`}
              size="small"
              variant="outlined"
              sx={{ color: colors.text.secondary, borderColor: colors.text.secondary }}
            />
          </Stack>
        </Box>

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '15%' }}>Fecha y Hora</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '20%' }}>Acción Realizada</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '15%' }}>Entidad</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '15%' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '30%' }}>Detalles</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '5%' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLogs.map((log) => (
                <TableRow 
                  key={log.id}
                  hover
                  sx={{ 
                    '&:hover': { bgcolor: '#f8f9fa' },
                    borderLeft: `3px solid ${getSeverityColor(log.severity)}`
                  }}
                >
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
                        {log.timestamp.split(' ')[0]}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        {log.timestamp.split(' ')[1]}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ color: getSeverityColor(log.severity) }}>
                        {getActionIcon(log.action)}
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', color: colors.text.primary }}>
                          {log.actionName}
                        </Typography>
                        <Chip 
                          label={log.severity}
                          size="small"
                          sx={{ 
                            bgcolor: `${getSeverityColor(log.severity)}15`,
                            color: getSeverityColor(log.severity),
                            fontSize: '0.65rem',
                            height: 18,
                            mt: 0.5
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'medium', color: colors.text.primary }}>
                        {log.entity}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        ID: {log.entityId}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    {getStatusChip(log.status)}
                  </TableCell>
                  
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        {log.details}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>
                    <Tooltip title="Ver detalles completos">
                      <IconButton 
                        size="small" 
                        sx={{ color: colors.primary.main }}
                        onClick={() => handleOpenDetailModal(log)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <Box sx={{ p: 2, borderTop: `1px solid ${colors.primary.main}20`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
            Mostrando {((page - 1) * rowsPerPage) + 1} - {Math.min(page * rowsPerPage, filteredLogs.length)} de {filteredLogs.length} eventos
          </Typography>
          <Pagination
            count={Math.ceil(filteredLogs.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            size="small"
            sx={{
              '& .MuiPaginationItem-root': {
                color: colors.primary.main,
                '&.Mui-selected': {
                  backgroundColor: colors.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: colors.primary.dark,
                  }
                }
              }
            }}
          />
        </Box>
      </Paper>
    </>
  );

  const renderTraceabilityView = () => (
    <Box>
      <Alert severity="info" sx={{ mb: 3, backgroundColor: `${colors.primary.main}10` }}>
        <Typography variant="body2" sx={{ color: colors.text.primary }}>
          <strong>Trazabilidad de Certificaciones:</strong> Seguimiento completo del ciclo de vida de cada certificación, desde su creación hasta su estado actual.
        </Typography>
      </Alert>

      {certificationTrace.map((cert) => (
        <Paper key={cert.id} sx={{ p: 3, mb: 3, borderLeft: `4px solid ${statusConfig[cert.status]?.color || colors.primary.main}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 'bold', mb: 1 }}>
                {cert.certification}
              </Typography>
              {getStatusChip(cert.status)}
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={() => handleOpenCertModal(cert)}
              sx={{
                color: colors.primary.main,
                borderColor: colors.primary.main
              }}
            >
              Ver Certificación
            </Button>
          </Box>

          <Typography variant="subtitle2" sx={{ color: colors.text.secondary, mb: 2, fontWeight: 'bold' }}>
            📋 Historial de Trazabilidad
          </Typography>

          <Box sx={{ pl: 2 }}>
            {cert.timeline.map((step, index) => (
              <Box key={index} sx={{ mb: 2.5, position: 'relative', pl: 3 }}>
                {/* Línea vertical */}
                {index < cert.timeline.length - 1 && (
                  <Box sx={{
                    position: 'absolute',
                    left: 8,
                    top: 24,
                    bottom: -24,
                    width: '2px',
                    backgroundColor: '#e0e0e0'
                  }} />
                )}
                
                {/* Punto */}
                <Box sx={{
                  position: 'absolute',
                  left: 3,
                  top: 4,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: statusConfig[step.status]?.color || colors.primary.main,
                  border: '2px solid white',
                  boxShadow: '0 0 0 2px #e0e0e0'
                }} />
                
                {/* Contenido */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
                      {step.action}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      {step.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar 
                      sx={{ 
                        width: 20, 
                        height: 20, 
                        fontSize: '0.7rem',
                        bgcolor: step.user === 'Luis Rodríguez' ? colors.primary.main : colors.status.success
                      }}
                    >
                      {step.user.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      {step.user}
                    </Typography>
                    {step.user === 'Luis Rodríguez' && (
                      <Chip 
                        label="Tú"
                        size="small"
                        sx={{ height: 16, fontSize: '0.6rem', bgcolor: colors.primary.main, color: 'white' }}
                      />
                    )}
                    <Box sx={{ ml: 1 }}>
                      {getStatusChip(step.status)}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      ))}

      
    </Box>
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 0.5 }}>
              Auditoría y Trazabilidad - Agente Aduanal
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Registro completo de todas tus acciones en el sistema SICAG
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, newMode) => newMode && setViewMode(newMode)}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  color: colors.text.secondary,
                  '&.Mui-selected': {
                    color: colors.primary.main,
                    backgroundColor: `${colors.primary.main}15`,
                    borderColor: colors.primary.main
                  }
                }
              }}
            >
              <ToggleButton value="auditoria" sx={{ textTransform: 'none' }}>
                <HistoryIcon sx={{ mr: 1 }} />
                Mi Auditoría
              </ToggleButton>
              <ToggleButton value="trazabilidad" sx={{ textTransform: 'none' }}>
                <TimelineIcon sx={{ mr: 1 }} />
                Trazabilidad
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              size="small"
              onClick={() => window.location.reload()}
              sx={{
                bgcolor: colors.primary.main,
                '&:hover': { bgcolor: colors.primary.dark }
              }}
            >
              Actualizar
            </Button>
          </Stack>
        </Box>

        {/* Información del agente */}
        <Paper sx={{ p: 2, mb: 3, bgcolor: `${colors.primary.main}10` }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: colors.primary.main,
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}
                >
                  LR
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
                    Luis Rodríguez - Agente Aduanal
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    Nivel II • Aduana Principal: Querétaro • Miembro desde: 15/01/2024
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<CheckCircleIcon />}
                  label="8 aceptados"
                  size="small"
                  sx={{ 
                    bgcolor: '#e8f5e9',
                    color: colors.status.success,
                    borderColor: colors.status.success
                  }}
                  variant="outlined"
                />
                <Chip 
                  icon={<PendingIcon />}
                  label="3 en revisión"
                  size="small"
                  sx={{ 
                    color: colors.status.warning,
                    bgcolor: '#fff3e0',
                    borderColor: colors.status.warning
                  }}
                  variant="outlined"
                />
                <Chip 
                  icon={<UpdateIcon />}
                  label="2 desactualizados"
                  size="small"
                  sx={{ 
                    color: colors.status.warning,
                    bgcolor: '#fffde7',
                    borderColor: colors.status.warning
                  }}
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {viewMode === 'auditoria' ? renderAuditView() : renderTraceabilityView()}

        {/* Información adicional */}
        <Paper elevation={0} sx={{ mt: 2, p: 2, bgcolor: '#f8f9fa' }}>
          <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontWeight: 'bold' }}>
             Distribución de Tus Actividades por Estado
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: colors.text.secondary, mb: 0.5, display: 'block' }}>
                  Estados principales:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ minWidth: 140, color: colors.text.primary }}>
                    Aceptados:
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.byStatus.aceptados / stats.total) * 100}
                    sx={{ 
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': { bgcolor: colors.status.success }
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 30, color: colors.text.primary }}>
                    {stats.byStatus.aceptados}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: colors.text.secondary, mb: 0.5, display: 'block' }}>
                  En revisión:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ minWidth: 140, color: colors.text.primary }}>
                    Validación:
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.byStatus.enRevision / stats.total) * 100}
                    sx={{ 
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': { bgcolor: colors.status.warning }
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 30, color: colors.text.primary }}>
                    {stats.byStatus.enRevision}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: colors.text.secondary, mb: 0.5, display: 'block' }}>
                  Atención requerida:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ minWidth: 140, color: colors.text.primary }}>
                    Desactualizados:
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.byStatus.desactualizado / stats.total) * 100}
                    sx={{ 
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': { bgcolor: colors.status.warning }
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 30, color: colors.text.primary }}>
                    {stats.byStatus.desactualizado}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: colors.text.secondary, mb: 0.5, display: 'block' }}>
                  Rechazados:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ minWidth: 140, color: colors.text.primary }}>
                    No aprobados:
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(stats.byStatus.rechazado / stats.total) * 100}
                    sx={{ 
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': { bgcolor: colors.status.error }
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 30, color: colors.text.primary }}>
                    {stats.byStatus.rechazado}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2, borderColor: `${colors.primary.main}20` }} />
          
          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
            <strong>Nota:</strong> Esta auditoría registra todas tus acciones en el sistema para garantizar transparencia y cumplimiento. 
            Los registros se mantienen por 5 años según normativa vigente.
          </Typography>
        </Paper>
      </Box>

      {/* Modales */}
      <DetailModal />
      <CertPreviewModal />
    </Box>
  );
};

export default AuditAgent;