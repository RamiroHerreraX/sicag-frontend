import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Tooltip,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  Security as SecurityIcon,
  CloudUpload as CloudUploadIcon,
  Gavel as GavelIcon,
  Balance as BalanceIcon,
  Verified as VerifiedIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  Send as SendIcon,
  School as SchoolIcon,
  Update as UpdateIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Group as GroupIcon,
  VerifiedUser as VerifiedUserIcon,
  WarningAmber as WarningAmberIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  Help as HelpIcon,
  Timeline as TimelineIcon,
  CalendarToday as CalendarIcon,
  FactCheck as FactCheckIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
  History as HistoryIcon,
  Comment as CommentIcon,
  AttachFile as AttachFileIcon,
  Schedule as ScheduleIcon
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

const Certifications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [associationDialog, setAssociationDialog] = useState(true);
  const [associationConsent, setAssociationConsent] = useState(null);

  // Estados para modales
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCert, setEditCert] = useState(null);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [deleteCert, setDeleteCert] = useState(null);

  // Estado para simular carga de archivos
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Datos de autorización
  const associationDetails = {
    name: 'Asociación de Agentes Aduanales del Estado',
    role: 'Rol auxiliar - Entidad Asociativa',
    permissions: [
      'Cargar evidencias institucionales (constancias, certificados)',
      'Subir documentación de cursos y capacitaciones',
      'Enviar documentación de pertenencia a la asociación',
      'Visualizar información general de agentes asociados',
      'Centralizar documentación común a varios agentes'
    ],
    restrictions: [
      'No puede validar certificaciones individuales',
      'No puede modificar expedientes personales',
      'No sustituye la responsabilidad individual del agente',
      'Acceso limitado a información específica',
      'No puede tomar decisiones en nombre del agente'
    ],
    benefits: [],
    considerations: []
  };

  // Datos mock de certificaciones (incluyendo las del expediente)
  const [certifications, setCertifications] = useState([
    { 
      id: 1, 
      type: 'PATENTE ADUANAL', 
      number: 'PA-2026-00145', 
      issueDate: '11/01/2026', 
      expirationDate: '11/01/2029', 
      status: 'Aceptados',
      progress: 100,
      documents: 5,
      lastUpdate: '15/01/2026',
      tipo: 'Patente Aduanal',
      autoridad: 'SAT - Servicio de Administración Tributaria',
      vigencia: '3 años',
      horas: 'N/A',
      ambito: 'Nacional',
      comentarios: 'Certificación en regla sin observaciones',
      historial: [
        { fecha: '11/01/2026', accion: 'Creación', usuario: 'Luis Rodríguez' },
        { fecha: '12/01/2026', accion: 'Validación inicial', usuario: 'Comité' },
        { fecha: '15/01/2026', accion: 'Actualización', usuario: 'Luis Rodríguez' }
      ],
      documentosAsociados: [
        { id: 'd1', nombre: 'patente_aduanal_oficial.pdf', tipo: 'PDF', tamaño: '1.2 MB', fecha: '11/01/2026' },
        { id: 'd2', nombre: 'comprobante_pago_derechos.pdf', tipo: 'PDF', tamaño: '0.8 MB', fecha: '11/01/2026' },
        { id: 'd3', nombre: 'anexo_tecnico_patente.pdf', tipo: 'PDF', tamaño: '2.1 MB', fecha: '12/01/2026' },
        { id: 'd4', nombre: 'constancia_inscripcion.pdf', tipo: 'PDF', tamaño: '0.5 MB', fecha: '13/01/2026' },
        { id: 'd5', nombre: 'certificado_firma_electronica.pdf', tipo: 'PDF', tamaño: '0.3 MB', fecha: '15/01/2026' }
      ]
    },
    { 
      id: 2, 
      type: 'OPINIÓN SAT POSITIVA', 
      number: 'OS-2025-03421', 
      issueDate: '15/11/2025', 
      expirationDate: '15/11/2026', 
      status: 'En revisión',
      progress: 30,
      documents: 3,
      lastUpdate: '10/01/2026',
      tipo: 'Opinión SAT',
      autoridad: 'SAT - Servicio de Administración Tributaria',
      vigencia: '1 año',
      horas: 'N/A',
      ambito: 'Nacional',
      comentarios: 'En espera de validación por el comité',
      historial: [
        { fecha: '15/11/2025', accion: 'Creación', usuario: 'Luis Rodríguez' },
        { fecha: '10/01/2026', accion: 'Documentación complementaria', usuario: 'Luis Rodríguez' }
      ],
      documentosAsociados: [
        { id: 'd6', nombre: 'opinion_cumplimiento_sat.pdf', tipo: 'PDF', tamaño: '0.9 MB', fecha: '15/11/2025' },
        { id: 'd7', nombre: 'constancia_situacion_fiscal.pdf', tipo: 'PDF', tamaño: '0.6 MB', fecha: '15/11/2025' },
        { id: 'd8', nombre: 'acuse_recibo_sat.pdf', tipo: 'PDF', tamaño: '0.4 MB', fecha: '10/01/2026' }
      ]
    },
    { 
      id: 3, 
      type: 'CÉDULA PROFESIONAL', 
      number: 'CP-2024-56789', 
      issueDate: '20/03/2024', 
      expirationDate: '20/03/2027', 
      status: 'Aceptados',
      progress: 100,
      documents: 4,
      lastUpdate: '05/01/2026',
      tipo: 'Cédula Profesional',
      autoridad: 'SEP - Secretaría de Educación Pública',
      vigencia: '3 años',
      horas: 'N/A',
      ambito: 'Nacional',
      comentarios: 'Documentación completa y vigente',
      historial: [
        { fecha: '20/03/2024', accion: 'Creación', usuario: 'Luis Rodríguez' },
        { fecha: '25/03/2024', accion: 'Aprobación', usuario: 'SEP' },
        { fecha: '05/01/2026', accion: 'Revisión', usuario: 'Sistema' }
      ],
      documentosAsociados: [
        { id: 'd9', nombre: 'cedula_profesional_electronica.pdf', tipo: 'PDF', tamaño: '1.1 MB', fecha: '20/03/2024' },
        { id: 'd10', nombre: 'titulo_universitario.pdf', tipo: 'PDF', tamaño: '2.3 MB', fecha: '20/03/2024' },
        { id: 'd11', nombre: 'certificado_estudios_completos.pdf', tipo: 'PDF', tamaño: '1.8 MB', fecha: '20/03/2024' },
        { id: 'd12', nombre: 'registro_profesional_sep.pdf', tipo: 'PDF', tamaño: '0.7 MB', fecha: '25/03/2024' }
      ]
    },
    { 
      id: 4, 
      type: 'PODER NOTARIAL', 
      number: 'PN-2025-12345', 
      issueDate: '10/08/2025', 
      expirationDate: '10/08/2026', 
      status: 'Información adicional',
      progress: 60,
      documents: 3,
      lastUpdate: '08/01/2026',
      tipo: 'Poder Notarial',
      autoridad: 'Notaría Pública 45',
      vigencia: '1 año',
      horas: 'N/A',
      ambito: 'Nacional',
      comentarios: 'Requiere documentación adicional para completar el expediente',
      historial: [
        { fecha: '10/08/2025', accion: 'Creación', usuario: 'Luis Rodríguez' },
        { fecha: '15/09/2025', accion: 'Revisión inicial', usuario: 'Comité' },
        { fecha: '08/01/2026', accion: 'Solicitud de información adicional', usuario: 'Comité' }
      ],
      documentosAsociados: [
        { id: 'd13', nombre: 'poder_notarial_escaneado.pdf', tipo: 'PDF', tamaño: '1.5 MB', fecha: '10/08/2025' },
        { id: 'd14', nombre: 'acta_constitutiva_modificaciones.pdf', tipo: 'PDF', tamaño: '2.8 MB', fecha: '10/08/2025' },
        { id: 'd15', nombre: 'identificacion_notario.pdf', tipo: 'PDF', tamaño: '0.5 MB', fecha: '10/08/2025' }
      ]
    },
    { 
      id: 5, 
      type: 'CONSTANCIA FISCAL', 
      number: 'CF-2026-00123', 
      issueDate: '05/01/2026', 
      expirationDate: '05/01/2027', 
      status: 'En revisión',
      progress: 40,
      documents: 3,
      lastUpdate: '14/01/2026',
      tipo: 'Constancia Fiscal',
      autoridad: 'SAT - RFC',
      vigencia: '1 año',
      horas: 'N/A',
      ambito: 'Nacional',
      comentarios: 'En proceso de validación fiscal',
      historial: [
        { fecha: '05/01/2026', accion: 'Creación', usuario: 'Luis Rodríguez' },
        { fecha: '14/01/2026', accion: 'Envío a validación', usuario: 'Luis Rodríguez' }
      ],
      documentosAsociados: [
        { id: 'd16', nombre: 'constancia_fiscal_actualizada.pdf', tipo: 'PDF', tamaño: '0.8 MB', fecha: '05/01/2026' },
        { id: 'd17', nombre: 'cedula_identificacion_fiscal.pdf', tipo: 'PDF', tamaño: '0.5 MB', fecha: '05/01/2026' },
        { id: 'd18', nombre: 'opinion_cumplimiento_2026.pdf', tipo: 'PDF', tamaño: '0.7 MB', fecha: '14/01/2026' }
      ]
    },
    { 
      id: 6, 
      type: 'REGISTRO INICIAL', 
      number: 'RI-2026-00001', 
      issueDate: '01/01/2026', 
      expirationDate: '01/01/2027', 
      status: 'Registro',
      progress: 20,
      documents: 1,
      lastUpdate: '01/01/2026',
      tipo: 'Registro Inicial',
      autoridad: 'SICAG',
      vigencia: '1 año',
      horas: 'N/A',
      ambito: 'Nacional',
      comentarios: 'Registro inicial pendiente de completar',
      historial: [
        { fecha: '01/01/2026', accion: 'Creación', usuario: 'Luis Rodríguez' }
      ],
      documentosAsociados: [
        { id: 'd19', nombre: 'solicitud_registro_inicial.pdf', tipo: 'PDF', tamaño: '0.4 MB', fecha: '01/01/2026' }
      ]
    },
    // Certificaciones del expediente
    { 
      id: 101, 
      type: 'CURSO DE ÉTICA PROFESIONAL', 
      number: 'CET-2025-101', 
      issueDate: '15/06/2025', 
      expirationDate: '15/06/2028', 
      status: 'Aceptados',
      progress: 100,
      documents: 2,
      lastUpdate: '15/06/2025',
      subseccion: 'Formación Ética',
      horas: 10,
      tipo: 'Curso de Ética',
      autoridad: 'Instituto de Ética Empresarial',
      vigencia: '3 años',
      ambito: 'Nacional',
      comentarios: 'Curso completado satisfactoriamente',
      historial: [
        { fecha: '15/06/2025', accion: 'Finalización', usuario: 'Luis Rodríguez' },
        { fecha: '20/06/2025', accion: 'Certificación emitida', usuario: 'Instituto' }
      ],
      documentosAsociados: [
        { id: 'd20', nombre: 'certificado_etica_profesional.pdf', tipo: 'PDF', tamaño: '0.8 MB', fecha: '15/06/2025' }
      ]
    },
    { 
      id: 102, 
      type: 'TALLER PREVENCIÓN CONFLICTOS', 
      number: 'TPC-2025-102', 
      issueDate: '22/08/2025', 
      expirationDate: '22/08/2028', 
      status: 'Aceptados',
      progress: 100,
      documents: 2,
      lastUpdate: '22/08/2025',
      subseccion: 'Formación Ética',
      horas: 6,
      tipo: 'Taller de Conflictos',
      autoridad: 'Centro de Cumplimiento Normativo',
      vigencia: '3 años',
      ambito: 'Nacional',
      comentarios: 'Taller práctico completado',
      historial: [
        { fecha: '22/08/2025', accion: 'Finalización', usuario: 'Luis Rodríguez' }
      ],
      documentosAsociados: [
        { id: 'd22', nombre: 'certificado_conflictos_interes.pdf', tipo: 'PDF', tamaño: '0.6 MB', fecha: '22/08/2025' }
      ]
    },
    { 
      id: 103, 
      type: 'SEMINARIO TRANSPARENCIA', 
      number: 'ST-2025-103', 
      issueDate: '05/10/2025', 
      expirationDate: '05/10/2028', 
      status: 'Aceptados',
      progress: 100,
      documents: 2,
      lastUpdate: '05/10/2025',
      subseccion: 'Formación Ética',
      horas: 4,
      tipo: 'Seminario',
      autoridad: 'Asociación Mexicana de Ética',
      vigencia: '3 años',
      ambito: 'Nacional',
      comentarios: 'Seminario de actualización',
      historial: [
        { fecha: '05/10/2025', accion: 'Finalización', usuario: 'Luis Rodríguez' }
      ],
      documentosAsociados: [
        { id: 'd24', nombre: 'seminario_anticorrupcion.pdf', tipo: 'PDF', tamaño: '0.9 MB', fecha: '05/10/2025' }
      ]
    },
    { 
      id: 201, 
      type: 'DIPLOMADO COMERCIO EXTERIOR', 
      number: 'DCE-2025-201', 
      issueDate: '10/02/2025', 
      expirationDate: '10/02/2028', 
      status: 'Aceptados',
      progress: 100,
      documents: 3,
      lastUpdate: '10/02/2025',
      subseccion: 'Actualización Técnica',
      horas: 40,
      tipo: 'Diplomado',
      autoridad: 'Universidad Aduanera de México',
      vigencia: '3 años',
      ambito: 'Internacional',
      comentarios: 'Diplomado completado con excelencia',
      historial: [
        { fecha: '10/02/2025', accion: 'Finalización', usuario: 'Luis Rodríguez' },
        { fecha: '15/02/2025', accion: 'Certificación emitida', usuario: 'Universidad' }
      ],
      documentosAsociados: [
        { id: 'd26', nombre: 'diplomado_comercio_exterior.pdf', tipo: 'PDF', tamaño: '1.5 MB', fecha: '10/02/2025' }
      ]
    },
    { 
      id: 202, 
      type: 'CURSO CLASIFICACIÓN ARANCELARIA', 
      number: 'CCA-2025-202', 
      issueDate: '18/04/2025', 
      expirationDate: '18/04/2028', 
      status: 'Aceptados',
      progress: 100,
      documents: 2,
      lastUpdate: '18/04/2025',
      subseccion: 'Actualización Técnica',
      horas: 20,
      tipo: 'Curso Especializado',
      autoridad: 'Instituto de Capacitación Aduanera',
      vigencia: '3 años',
      ambito: 'Nacional',
      comentarios: 'Curso de especialización',
      historial: [
        { fecha: '18/04/2025', accion: 'Finalización', usuario: 'Luis Rodríguez' }
      ],
      documentosAsociados: [
        { id: 'd29', nombre: 'curso_clasificacion_arancelaria.pdf', tipo: 'PDF', tamaño: '1.1 MB', fecha: '18/04/2025' }
      ]
    },
    { 
      id: 203, 
      type: 'TALLER REGULACIONES NO ARANCELARIAS', 
      number: 'TRNA-2025-203', 
      issueDate: '30/07/2025', 
      expirationDate: '30/07/2028', 
      status: 'Aceptados',
      progress: 100,
      documents: 2,
      lastUpdate: '30/07/2025',
      subseccion: 'Actualización Técnica',
      horas: 12,
      tipo: 'Taller Técnico',
      autoridad: 'Centro de Estudios Aduaneros',
      vigencia: '3 años',
      ambito: 'Nacional',
      comentarios: 'Taller de actualización regulatoria',
      historial: [
        { fecha: '30/07/2025', accion: 'Finalización', usuario: 'Luis Rodríguez' }
      ],
      documentosAsociados: [
        { id: 'd31', nombre: 'taller_regulaciones.pdf', tipo: 'PDF', tamaño: '0.8 MB', fecha: '30/07/2025' }
      ]
    },
    { 
      id: 204, 
      type: 'SEMINARIO VALORACIÓN ADUANERA', 
      number: 'SVA-2025-204', 
      issueDate: '12/09/2025', 
      expirationDate: '12/09/2028', 
      status: 'Aceptados',
      progress: 100,
      documents: 2,
      lastUpdate: '12/09/2025',
      subseccion: 'Actualización Técnica',
      horas: 8,
      tipo: 'Seminario Avanzado',
      autoridad: 'Asociación de Agentes Aduanales',
      vigencia: '3 años',
      ambito: 'Nacional',
      comentarios: 'Seminario de valoración aduanera',
      historial: [
        { fecha: '12/09/2025', accion: 'Finalización', usuario: 'Luis Rodríguez' }
      ],
      documentosAsociados: [
        { id: 'd33', nombre: 'seminario_valoracion_aduanera.pdf', tipo: 'PDF', tamaño: '0.7 MB', fecha: '12/09/2025' }
      ]
    },
  ]);

  // Función para simular carga de archivo
  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Funciones para abrir modales
  const handleOpenPreview = (cert) => {
    setPreviewCert(cert);
    setPreviewModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditCert(cert);
    setEditModalOpen(true);
  };

  const handleOpenDelete = (cert) => {
    setDeleteCert(cert);
    setDeleteConfirmModalOpen(true);
  };

  // Funciones para cerrar modales
  const handleClosePreview = () => {
    setPreviewModalOpen(false);
    setPreviewCert(null);
  };

  const handleCloseEdit = () => {
    setEditModalOpen(false);
    setEditCert(null);
  };

  const handleCloseDelete = () => {
    setDeleteConfirmModalOpen(false);
    setDeleteCert(null);
  };

  // Función para guardar cambios en edición
  const handleSaveEdit = () => {
    // Simular guardado
    
    handleCloseEdit();
  };

  // Función para confirmar eliminación
  const handleConfirmDelete = () => {
    if (deleteCert) {
      setCertifications(certifications.filter(c => c.id !== deleteCert.id));
      handleCloseDelete();
    }
  };

  // Función para manejar el consentimiento de la asociación
  const handleAssociationConsent = (consent) => {
    setAssociationConsent(consent);
    setAssociationDialog(false);
    console.log(`Usuario ${consent ? 'aceptó' : 'rechazó'} la autorización`);
  };

  // Estadísticas
  const stats = {
    total: certifications.length,
    valid: certifications.filter(c => c.status === 'Aceptados').length,
    expiring: certifications.filter(c => c.status === 'Por Vencer').length,
    review: certifications.filter(c => c.status === 'En revisión' || c.status === 'Información adicional').length,
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Registro': return 'info';
      case 'En revisión': return 'warning';
      case 'Aceptados': return 'success';
      case 'Información adicional': return 'primary';
      case 'Rechazado': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Registro': return <DescriptionIcon />;
      case 'En revisión': return <VisibilityIcon />;
      case 'Aceptados': return <CheckCircleIcon />;
      case 'Información adicional': return <InfoIcon />;
      case 'Rechazado': return <CancelIcon />;
      default: return <HelpIcon />;
    }
  };

  const filteredCerts = certifications.filter(cert => {
    const matchesSearch = 
      cert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || cert.status === filter;
    return matchesSearch && matchesFilter;
  });

 // Modal de vista previa (VER) - VERSIÓN MEJORADA Y PROFESIONAL
const PreviewModal = () => (
  <Dialog 
    open={previewModalOpen} 
    onClose={handleClosePreview}
    maxWidth="sm"
    fullWidth
    PaperProps={{
      sx: { 
        borderRadius: 2.5,
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }
    }}
  >
    {previewCert && (
      <>
        {/* Header con gradiente y badge de estado */}
        <DialogTitle sx={{ 
          background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.main} 100%)`,
          color: 'white',
          py: 2.5,
          px: 3,
          position: 'relative'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                borderRadius: '50%', 
                width: 48, 
                height: 48, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <VerifiedIcon sx={{ fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                  {previewCert.type}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                  {previewCert.number}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={previewCert.status}
                size="small"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                  height: 24,
                  '& .MuiChip-label': { px: 1.5 }
                }}
              />
              <IconButton onClick={handleClosePreview} size="small" sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3, bgcolor: '#f8fafc' }}>
          {/* Tarjeta de métricas clave - Diseño compacto y elegante */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 3, 
              bgcolor: 'white', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.05)'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Estado
                  </Typography>
                  <Box sx={{ mt: 0.5, display: 'flex', justifyContent: 'center' }}>
                    <Chip 
                      label={previewCert.status}
                      size="small"
                      sx={{ 
                        bgcolor: previewCert.status === 'Aceptados' ? '#e8f5e9' : 
                                previewCert.status === 'En revisión' ? '#fff3e0' :
                                previewCert.status === 'Información adicional' ? '#e3f2fd' :
                                previewCert.status === 'Registro' ? '#e1f5fe' :
                                '#ffebee',
                        color: previewCert.status === 'Aceptados' ? colors.status.success : 
                               previewCert.status === 'En revisión' ? colors.status.warning :
                               previewCert.status === 'Información adicional' ? colors.primary.main :
                               previewCert.status === 'Registro' ? colors.primary.light :
                               colors.status.error,
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        height: 24
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Emisión
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '600', mt: 0.5, fontSize: '0.85rem' }}>
                    {previewCert.issueDate}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Vencimiento
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: '600', mt: 0.5, fontSize: '0.85rem', color: colors.status.warning }}>
                    {previewCert.expirationDate}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* SECCIÓN DE INFORMACIÓN - TARJETA ÚNICA CON DIVISIONES ELEGANTES */}
          <Paper 
            elevation={0} 
            sx={{ 
              mb: 3, 
              bgcolor: 'white', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}
          >
            {/* Título de sección */}
            <Box sx={{ 
              px: 2.5, 
              py: 1.5, 
              borderBottom: '1px solid',
              borderColor: 'rgba(0,0,0,0.05)',
              bgcolor: '#f9f9f9'
            }}>
              <Typography variant="subtitle2" sx={{ color: colors.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <FactCheckIcon sx={{ fontSize: 18 }} />
                Detalles de la Certificación
              </Typography>
            </Box>
            
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3px', mb: 0.5 }}>
                      Tipo
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: '500', fontSize: '0.9rem' }}>
                      {previewCert.tipo || previewCert.type.split(' ')[0]}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3px', mb: 0.5 }}>
                      Número
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: '500', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                      {previewCert.number}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3px', mb: 0.5 }}>
                      Autoridad
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                      {previewCert.autoridad?.split(' - ')[0] || 'SAT'}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3px', mb: 0.5 }}>
                      Última actualización
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                      {previewCert.lastUpdate}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* División */}
            <Box sx={{ 
              height: '1px', 
              bgcolor: 'rgba(0,0,0,0.05)',
              mx: 2.5
            }} />

            {/* Segunda sección */}
            <Box sx={{ 
              px: 2.5, 
              py: 1.5, 
              bgcolor: '#f9f9f9'
            }}>
              <Typography variant="subtitle2" sx={{ color: colors.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoIcon sx={{ fontSize: 18 }} />
                Información Complementaria
              </Typography>
            </Box>
            
            <Box sx={{ p: 2.5 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3px', mb: 0.5 }}>
                    Vigencia
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: '500' }}>
                    {previewCert.vigencia || '3 años'}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3px', mb: 0.5 }}>
                    Horas
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: '500' }}>
                    {typeof previewCert.horas === 'number' ? `${previewCert.horas}h` : previewCert.horas || 'N/A'}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3px', mb: 0.5 }}>
                    Ámbito
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                    {previewCert.ambito || 'Nacional'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                        Progreso de documentación
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}>
                        {previewCert.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={previewCert.progress} 
                      sx={{ 
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: previewCert.progress > 70 ? colors.status.success :
                                 previewCert.progress > 30 ? colors.status.warning : colors.status.error
                        }
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Documentos asociados - Diseño de lista compacta */}
          <Paper 
            elevation={0} 
            sx={{ 
              mb: 3, 
              bgcolor: 'white', 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              px: 2.5, 
              py: 1.5, 
              borderBottom: '1px solid',
              borderColor: 'rgba(0,0,0,0.05)',
              bgcolor: '#f9f9f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="subtitle2" sx={{ color: colors.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachFileIcon sx={{ fontSize: 18 }} />
                Documentos ({previewCert.documents})
              </Typography>
              <Button 
                size="small" 
                startIcon={<DownloadIcon />}
                sx={{ 
                  textTransform: 'none', 
                  fontSize: '0.75rem',
                  color: colors.primary.main
                }}
              >
                Todos
              </Button>
            </Box>
            
            <Box sx={{ p: 1.5 }}>
              {previewCert.documentosAsociados.slice(0, 3).map((doc, index) => (
                <Box 
                  key={doc.id || index}
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 1,
                    '&:hover': { bgcolor: '#f5f5f5' },
                    borderBottom: index < previewCert.documentosAsociados.slice(0, 3).length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {doc.tipo === 'PDF' ? 
                      <PdfIcon sx={{ color: colors.status.error, fontSize: 20 }} /> : 
                      <FileIcon sx={{ color: colors.primary.main, fontSize: 20 }} />
                    }
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: '500', fontSize: '0.85rem' }}>
                        {doc.nombre.length > 30 ? doc.nombre.substring(0, 30) + '...' : doc.nombre}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.65rem' }}>
                        {doc.tamaño}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Tooltip title="Ver">
                      <IconButton size="small" sx={{ color: colors.primary.main }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ))}
              
              {previewCert.documents > 3 && (
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                  <Typography variant="caption" sx={{ color: colors.primary.main, fontWeight: '500', cursor: 'pointer' }}>
                    +{previewCert.documents - 3} documentos más
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>

          {/* Comentarios - Solo si existen */}
          {previewCert.comentarios && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: '#fff9e6', 
                borderRadius: 2,
                border: '1px solid',
                borderColor: '#ffd966',
                display: 'flex',
                gap: 1.5
              }}
            >
              <CommentIcon sx={{ color: '#f1c40f', fontSize: 20 }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#b36b00', display: 'block', mb: 0.5, fontWeight: 'bold', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Observaciones
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f4f00', fontSize: '0.85rem' }}>
                  {previewCert.comentarios}
                </Typography>
              </Box>
            </Paper>
          )}
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 2, 
          borderTop: '1px solid rgba(0,0,0,0.05)',
          bgcolor: '#f8fafc',
          justifyContent: 'space-between'
        }}>
          <Button 
            onClick={handleClosePreview}
            variant="text"
            sx={{ 
              textTransform: 'none',
              color: colors.text.secondary
            }}
          >
            Cerrar
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
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
            <Button 
              variant="contained"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => {
                handleClosePreview();
                handleOpenEdit(previewCert);
              }}
              sx={{ 
                textTransform: 'none',
                bgcolor: colors.status.warning,
                '&:hover': { bgcolor: colors.primary.dark },
                px: 2
              }}
            >
              Editar
            </Button>
          </Box>
        </DialogActions>
      </>
    )}
  </Dialog>
);

  // Modal de edición (EDITAR)
  const EditModal = () => (
    <Dialog 
      open={editModalOpen} 
      onClose={handleCloseEdit}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      {editCert && (
        <>
          <DialogTitle sx={{ 
            bgcolor: colors.status.warning,
            color: 'white',
            py: 2,
            px: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EditIcon />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Editar Certificación
              </Typography>
            </Box>
            <IconButton onClick={handleCloseEdit} size="small" sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent sx={{ py: 3, px: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tipo de certificación"
                  defaultValue={editCert.type}
                  size="small"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Número de certificación"
                  defaultValue={editCert.number}
                  size="small"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fecha de emisión"
                  type="date"
                  defaultValue={editCert.issueDate.split('/').reverse().join('-')}
                  size="small"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fecha de vencimiento"
                  type="date"
                  defaultValue={editCert.expirationDate.split('/').reverse().join('-')}
                  size="small"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Autoridad emisora"
                  defaultValue={editCert.autoridad}
                  size="small"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comentarios"
                  defaultValue={editCert.comentarios}
                  multiline
                  rows={3}
                  size="small"
                  margin="normal"
                />
              </Grid>
            </Grid>

            {/* Sección de documentos */}
            <Typography variant="subtitle2" sx={{ color: colors.primary.main, mt: 3, mb: 2, fontWeight: 'bold' }}>
              Documentos Asociados
            </Typography>

            <Grid container spacing={1}>
              {editCert.documentosAsociados.map((doc, index) => (
                <Grid item xs={12} key={doc.id || index}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.5,
                      border: `1px solid ${colors.primary.main}20`,
                      borderRadius: 1,
                      bgcolor: '#f8f9fa'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <PdfIcon sx={{ color: colors.status.error }} />
                      <Box>
                        <Typography variant="body2">{doc.nombre}</Typography>
                        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                          {doc.tamaño} • {doc.fecha}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Tooltip title="Reemplazar">
                        <IconButton size="small" sx={{ color: colors.primary.main }}>
                          <CloudUploadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton size="small" sx={{ color: colors.status.error }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Área para subir nuevos documentos */}
            <Paper 
              variant="outlined" 
              sx={{ 
                mt: 2,
                p: 2,
                border: `2px dashed ${colors.primary.main}40`,
                borderRadius: 2,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { borderColor: colors.primary.main, bgcolor: '#f8f9fa' }
              }}
              onClick={() => !uploading && simulateUpload()}
            >
              <input type="file" style={{ display: 'none' }} id="file-upload" />
              <CloudUploadIcon sx={{ color: colors.primary.main, fontSize: 32, mb: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: '500' }}>
                {uploading ? 'Subiendo archivo...' : 'Haz clic para agregar un nuevo documento'}
              </Typography>
              {uploading && (
                <Box sx={{ mt: 1 }}>
                  <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 6, borderRadius: 3 }} />
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                    {uploadProgress}% completado
                  </Typography>
                </Box>
              )}
              <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mt: 0.5 }}>
                Formatos permitidos: PDF, DOC, DOCX (Máx. 10MB)
              </Typography>
            </Paper>
          </DialogContent>
          
          <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${colors.primary.main}20` }}>
            <Button onClick={handleCloseEdit} variant="outlined" sx={{ color: colors.primary.main, borderColor: colors.primary.main }}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} variant="contained" sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}>
              Guardar Cambios
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );

  // Modal de confirmación de eliminación (ELIMINAR)
  const DeleteConfirmModal = () => (
    <Dialog 
      open={deleteConfirmModalOpen} 
      onClose={handleCloseDelete}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      {deleteCert && (
        <>
          <DialogTitle sx={{ 
            bgcolor: colors.status.error,
            color: 'white',
            py: 2,
            px: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <DeleteIcon />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Confirmar Eliminación
              </Typography>
            </Box>
            <IconButton onClick={handleCloseDelete} size="small" sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent sx={{ py: 3, px: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                bgcolor: `${colors.status.error}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <WarningAmberIcon sx={{ fontSize: 40, color: colors.status.error }} />
              </Box>
              <Typography variant="h6" sx={{ color: colors.text.primary, mb: 1 }}>
                ¿Estás seguro de eliminar esta certificación?
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                Esta acción no se puede deshacer. Se eliminarán permanentemente:
              </Typography>
            </Box>

            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8f9fa', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 1, 
                  bgcolor: colors.primary.main + '15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <DescriptionIcon sx={{ color: colors.primary.main }} />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {deleteCert.type}
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                    {deleteCert.number}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 1.5 }} />
              
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                    Fecha de emisión
                  </Typography>
                  <Typography variant="body2">{deleteCert.issueDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                    Fecha de vencimiento
                  </Typography>
                  <Typography variant="body2">{deleteCert.expirationDate}</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Se eliminarán {deleteCert.documents} documentos asociados
              </Typography>
            </Alert>

            <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', textAlign: 'center' }}>
              Esta certificación y todos sus documentos serán eliminados permanentemente del sistema.
            </Typography>
          </DialogContent>
          
          <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${colors.primary.main}20` }}>
            <Button 
              onClick={handleCloseDelete} 
              variant="outlined" 
              fullWidth
              sx={{ color: colors.primary.main, borderColor: colors.primary.main }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleConfirmDelete} 
              variant="contained" 
              fullWidth
              startIcon={<DeleteIcon />}
              sx={{ bgcolor: colors.status.error, '&:hover': { bgcolor: colors.primary.dark } }}
            >
              Eliminar Permanentemente
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Diálogo de Autorización */}
      {associationDialog && associationConsent === null && (
        <Dialog 
          open={associationDialog} 
          maxWidth="lg"
          fullWidth
          fullScreen={false}
          PaperProps={{
            sx: { 
              height: '90vh',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column'
            }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: colors.primary.dark, 
            color: 'white',
            py: 2,
            flexShrink: 0
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SecurityIcon sx={{ fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Autorización para Asociación de Agentes Aduanales
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.9 }}>
                  Decisión importante para la gestión de tus certificaciones
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          
          <DialogContent dividers sx={{ 
            flex: 1,
            overflow: 'auto',
            py: 2,
            px: 3
          }}>
            {/* Información de la asociación */}
            <Alert severity="info" sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <GroupIcon />
                <Typography variant="subtitle2" fontWeight="bold">
                  {associationDetails.name}
                </Typography>
              </Box>
              <Typography variant="body2">
                Esta asociación funciona como entidad auxiliar dentro del sistema, permitiendo centralizar información común y documentación compartida, sin sustituir tu responsabilidad individual.
              </Typography>
            </Alert>

            {/* COMPARACIÓN LADO A LADO */}
            <Grid container spacing={3} sx={{ height: 'calc(100% - 120px)', mb: 2 }}>
              {/* COLUMNA IZQUIERDA - ACEPTAR */}
              <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Paper 
                  elevation={3}
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    border: `2px solid ${colors.status.success}`,
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{ 
                    bgcolor: colors.status.success, 
                    p: 2,
                    textAlign: 'center',
                    flexShrink: 0
                  }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      <CheckIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      SI ACEPTAS LA AUTORIZACIÓN
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, overflow: 'auto', p: 2.5 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: colors.status.success, mb: 1.5, display: 'flex', alignItems: 'center' }}>
                        <ArrowForwardIcon sx={{ mr: 1, fontSize: 18 }} />
                        Tu asociación PODRÁ:
                      </Typography>
                      <Box sx={{ pl: 1 }}>
                        {associationDetails.permissions.map((permission, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                            <CheckCircleIcon sx={{ color: colors.status.success, mr: 1.5, mt: 0.2, fontSize: 16 }} />
                            <Typography variant="body2" color={colors.text.primary}>
                              {permission}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Ventaja clave: Reduce carga administrativa y centraliza evidencias comunes
                      </Typography>
                    </Alert>
                  </Box>
                </Paper>
              </Grid>

              {/* COLUMNA DERECHA - RECHAZAR */}
              <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Paper 
                  elevation={3}
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    border: `2px solid ${colors.status.error}`,
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <Box sx={{ 
                    bgcolor: colors.status.error, 
                    p: 2,
                    textAlign: 'center',
                    flexShrink: 0
                  }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      <CloseIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      SI RECHAZAS LA AUTORIZACIÓN
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, overflow: 'auto', p: 2.5 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: colors.status.error, mb: 1.5, display: 'flex', alignItems: 'center' }}>
                        <ArrowForwardIcon sx={{ mr: 1, fontSize: 18 }} />
                        Tu asociación NO PODRÁ:
                      </Typography>
                      <Box sx={{ pl: 1 }}>
                        {associationDetails.restrictions.map((restriction, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                            <CancelIcon sx={{ color: colors.status.error, mr: 1.5, mt: 0.2, fontSize: 16 }} />
                            <Typography variant="body2" color={colors.text.primary}>
                              {restriction}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Alert severity="warning" sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Consideración clave: Gestión completamente individual de toda la documentación
                      </Typography>
                    </Alert>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Nota importante */}
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#e8f4fd', border: '1px solid #90caf9', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <InfoIcon sx={{ color: colors.primary.main }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: colors.primary.main, fontWeight: 'bold', mb: 0.5 }}>
                    Nota importante sobre responsabilidades
                  </Typography>
                  <Typography variant="body2" color={colors.text.secondary}>
                    Independientemente de tu decisión, <strong>eres el único responsable</strong> del cumplimiento de tus obligaciones como agente aduanal.
                    La asociación funciona como entidad auxiliar y <strong>NO sustituye tu responsabilidad individual</strong>.
                    Esta autorización puede ser modificada en cualquier momento desde la sección de configuración de tu cuenta.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </DialogContent>

          {/* Acciones del diálogo */}
          <DialogActions sx={{ 
            justifyContent: 'space-between', 
            p: 2.5,
            bgcolor: '#f8f9fa',
            borderTop: `1px solid ${colors.primary.main}20`,
            flexShrink: 0
          }}>
            <Button 
              onClick={() => handleAssociationConsent(false)}
              variant="contained"
              startIcon={<CloseIcon />}
              sx={{ 
                px: 3,
                fontWeight: 'bold',
                minWidth: 140,
                bgcolor: colors.status.error,
                '&:hover': { bgcolor: colors.primary.dark }
              }}
            >
              No Autorizar
            </Button>
            
            <Button 
              onClick={() => setAssociationDialog(false)}
              variant="outlined"
              sx={{ 
                px: 3,
                fontWeight: 'bold',
                color: colors.primary.main,
                borderColor: colors.primary.main
              }}
            >
              Decidir después
            </Button>
            
            <Button 
              onClick={() => handleAssociationConsent(true)}
              variant="contained"
              startIcon={<CheckIcon />}
              sx={{ 
                px: 3,
                fontWeight: 'bold',
                minWidth: 140,
                bgcolor: colors.status.success,
                '&:hover': { bgcolor: colors.primary.dark }
              }}
            >
              Autorizar
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 1 }}>
            Mis Certificaciones
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary }}>
            Gestiona todas tus certificaciones en el sistema SICAG
          </Typography>
          
          {associationConsent !== null && (
            <Box sx={{ mt: 1 }}>
              <Chip
                icon={associationConsent ? <VerifiedUserIcon /> : <WarningAmberIcon />}
                label={`Autorización asociación: ${associationConsent ? 'ACTIVA' : 'INACTIVA'}`}
                color={associationConsent ? "success" : "warning"}
                size="small"
                variant="outlined"
              />
            </Box>
          )}
        </Box>
        
        <Stack direction="row" spacing={2}>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to="/certifications/new"
            sx={{ 
              bgcolor: colors.primary.main, 
              '&:hover': { bgcolor: colors.primary.dark } 
            }}
          >
            Nueva Certificación
          </Button>
        </Stack>
      </Box>

      

      {/* Estadísticas y Búsqueda/Filtros - Misma fila */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {/* Estadísticas - Lado izquierdo (4 cards) */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ borderLeft: `4px solid ${colors.primary.main}`, height: '100%' }}>
                <CardContent>
                  <Typography variant="h3" sx={{ color: colors.primary.main, fontWeight: 'bold', mb: 0.5 }}>
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    Total Certificaciones
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
           <Grid item xs={6} sm={3}>
              <Card 
                sx={{ 
                  borderLeft: `4px solid ${colors.status.success}`, 
                  height: '95px',
                  width: '113.5px',
                  margin: '0 auto'
                }}
              >
                <CardContent>
                  <Typography variant="h3" sx={{ color: colors.status.success, fontWeight: 'bold', mb: 0.5 }}>
                    {stats.valid}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    Vigentes
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Card 
                sx={{ 
                  borderLeft: `4px solid ${colors.status.warning}`, 
                  height: '95px',
                  width: '113.5px',
                  margin: '0 auto'
                }}
              >
                <CardContent>
                  <Typography variant="h3" sx={{ color: colors.status.warning, fontWeight: 'bold', mb: 0.5 }}>
                    {stats.expiring}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    Por Vencer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Card 
                sx={{ 
                  borderLeft: `4px solid ${colors.status.error}`, 
                  height: '95px',
                  width: '113.5px',
                  margin: '0 auto'
                }}
              >
                <CardContent>
                  <Typography variant="h3" sx={{ color: colors.status.error, fontWeight: 'bold', mb: 0.5 }}>
                    {stats.review}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    En Revisión
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Barra de búsqueda y filtros - Lado derecho */}
        <Grid item xs={12} md={5}>
          <Paper elevation={1} sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Buscar por tipo o número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: colors.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Filtrar por estado"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FilterIcon sx={{ color: colors.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="all">Todos los estados</MenuItem>
                  <MenuItem value="Aceptados">Vigentes</MenuItem>
                  <MenuItem value="Por Vencer">Por Vencer</MenuItem>
                  <MenuItem value="En revisión">En Revisión</MenuItem>
                  <MenuItem value="Información adicional">Observaciones</MenuItem>
                  <MenuItem value="Rechazado">Vencidas</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabla de certificaciones */}
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f7fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Tipo de Certificación</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Número</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Emisión / Vencimiento</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Progreso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Documentos</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Última Actualización</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCerts.map((cert) => (
                <TableRow key={cert.id} hover>
                  <TableCell>
                    <Typography sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                      {cert.type}
                    </Typography>
                    {cert.subseccion && (
                      <Chip 
                        label={cert.subseccion}
                        size="small"
                        sx={{ 
                          mt: 0.5,
                          fontSize: '0.7rem',
                          height: '20px',
                          backgroundColor: cert.subseccion === 'Formación Ética' ? colors.accents.blue : colors.secondary.main,
                          color: 'white'
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                      {cert.number}
                    </Typography>
                    {cert.horas && (
                      <Typography variant="caption" sx={{ color: colors.primary.main, display: 'block' }}>
                        {cert.horas} horas
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Emisión: {cert.issueDate}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: cert.status === 'Por Vencer' ? colors.status.warning : colors.text.secondary,
                        display: 'block'
                      }}>
                        Vence: {cert.expirationDate}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={cert.status}
                      color={getStatusColor(cert.status)}
                      icon={getStatusIcon(cert.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box 
                          sx={{ 
                            height: 8, 
                            width: '100%', 
                            bgcolor: `${colors.primary.main}15`,
                            borderRadius: 4,
                            overflow: 'hidden'
                          }}
                        >
                          <Box 
                            sx={{ 
                              height: '100%', 
                              width: `${cert.progress}%`,
                              bgcolor: 
                                cert.progress > 70 ? colors.status.success :
                                cert.progress > 30 ? colors.status.warning : colors.status.error
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        {cert.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography align="center" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                      {cert.documents}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      {cert.lastUpdate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack 
                      direction="row" 
                      spacing={0.5} 
                      justifyContent="center"
                      sx={{
                        '& .MuiIconButton-root': {
                          width: 32,
                          height: 32,
                          backgroundColor: '#f8f9fa',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }
                        }
                      }}
                    >
                      <Tooltip title="Ver detalles">
                        <IconButton 
                          size="small"
                          onClick={() => handleOpenPreview(cert)}
                          sx={{ 
                            color: colors.primary.main,
                            '&:hover': { backgroundColor: `${colors.primary.main}15` }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton 
                          size="small"
                          onClick={() => handleOpenEdit(cert)}
                          sx={{ 
                            color: colors.status.warning,
                            '&:hover': { backgroundColor: `${colors.status.warning}15` }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton 
                          size="small"
                          onClick={() => handleOpenDelete(cert)}
                          sx={{ 
                            color: colors.status.error,
                            '&:hover': { backgroundColor: `${colors.status.error}15` }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      

      {/* Nuevos modales */}
      <PreviewModal />
      <EditModal />
      <DeleteConfirmModal />

      {/* Información adicional */}
      <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: '#f8f9fa' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ color: colors.primary.dark, mb: 2, fontWeight: 'bold' }}>
              Guía Rápida
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              • <strong style={{ color: colors.status.success }}>Aceptados:</strong> Certificación validada y activa<br />
              • <strong style={{ color: colors.status.warning }}>En revisión:</strong> En proceso de validación por el comité<br />
              • <strong style={{ color: colors.primary.main }}>Información adicional:</strong> Requiere documentación complementaria<br />
              • <strong style={{ color: colors.primary.light }}>Registro:</strong> Registro inicial pendiente de validación<br />
              • <strong style={{ color: colors.status.error }}>Rechazado:</strong> Certificación no aprobada o vencida
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ color: colors.primary.dark, mb: 2, fontWeight: 'bold' }}>
              Requisitos de Horas
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              • <strong style={{ color: colors.accents.blue }}>Formación Ética:</strong> 20 horas requeridas (completadas)<br />
              • <strong style={{ color: colors.secondary.main }}>Actualización Técnica:</strong> 80 horas requeridas (completadas)<br />
              • <strong>Total:</strong> 100 horas requeridas para cumplimiento normativo<br />
              • <CheckCircleIcon sx={{ color: colors.status.success, fontSize: 14, verticalAlign: 'middle' }} /> Estado actual: <strong style={{ color: colors.status.success }}>CUMPLE</strong>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Certifications;