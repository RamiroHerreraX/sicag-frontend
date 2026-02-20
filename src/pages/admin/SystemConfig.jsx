// src/pages/admin/SystemConfig.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  Slider,
  MenuItem,
  InputAdornment,
  Alert,
  Tabs,
  Tab,
  Stack,
  IconButton,
  Tooltip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Save as SaveIcon,
  Restore as RestoreIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Timer as TimerIcon,
  Assessment as AssessmentIcon,
  Backup as BackupIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Lock as LockIcon,
  Description as DescriptionIcon,
  DataThresholding as DataThresholdingIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  HowToReg as HowToRegIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Gavel as GavelIcon,
  Article as ArticleIcon,
  Folder as FolderIcon,
  Public as PublicIcon,
  FileCopy as FileCopyIcon,
  CloudUpload as CloudUploadIcon,
  CalendarToday as CalendarTodayIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Storage as StorageIcon,
  LocationOn as LocationOnIcon,
  Flag as FlagIcon,
  Map as MapIcon,
  Star as StarIcon,
  EmojiEvents as EmojiEventsIcon,
  MilitaryTech as MilitaryTechIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  Search as SearchIcon,
  Info as InfoIcon,
  People as PeopleIcon,
  AssignmentInd as AssignmentIndIcon,
  PendingActions as PendingActionsIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Phone as PhoneIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';

// Paleta corporativa
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

const SystemConfig = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedEvaluator, setSelectedEvaluator] = useState('');
  const [showCards, setShowCards] = useState(true); // Estado para mostrar/ocultar tarjetas

  const [config, setConfig] = useState({
    // Semáforo
    greenThreshold: 90,
    yellowThreshold: 70,
    redThreshold: 50,
    autoRecalculation: true
  });

  const [roles, setRoles] = useState([
    {
      id: 1,
      nombre: 'Administrador',
      descripcion: 'Acceso completo al sistema con control total sobre usuarios, configuraciones y reportes',
      nivel: 1,
      estatus: true
    },
    {
      id: 2,
      nombre: 'Comité',
      descripcion: 'Rol para miembros del comité de certificaciones con permisos de revisión y aprobación',
      nivel: 2,
      estatus: true
    },
    {
      id: 3,
      nombre: 'Agente Aduanal',
      descripcion: 'Acceso para agentes aduanales con permisos de gestión de certificaciones y declaraciones',
      nivel: 3,
      estatus: true
    }
  ]);

  // Datos estáticos para la tabla Comité
  const [comite, setComite] = useState([
    {
      id_comite: 1,
      id_usuario: 101,
      nombre_usuario: 'Juan Pérez López',
      cargo: 'Presidente',
      area: 'Certificaciones',
      permiso_aprobar: 1,
      estatus: 1,
      fecha_ingreso: '2023-01-15'
    },
    {
      id_comite: 2,
      id_usuario: 102,
      nombre_usuario: 'María González Sánchez',
      cargo: 'Secretario',
      area: 'Declaraciones',
      permiso_aprobar: 1,
      estatus: 1,
      fecha_ingreso: '2023-02-20'
    },
    {
      id_comite: 3,
      id_usuario: 103,
      nombre_usuario: 'Carlos Rodríguez Martínez',
      cargo: 'Vocal',
      area: 'Revisión Técnica',
      permiso_aprobar: 1,
      estatus: 1,
      fecha_ingreso: '2023-03-10'
    }
  ]);

  // Datos estáticos para la tabla Catalogo_Certificaciones
  const [certificaciones, setCertificaciones] = useState([
    {
      id_certificacion: 1,
      nombre_certificacion: 'Certificación en Gestión Aduanera',
      descripcion: 'Certificación para agentes aduanales en gestión y procedimientos aduaneros',
      tipo: 'Profesional',
      horas_acreditadas: 120,
      vigencia_meses: 24,
      estatus: 1,
      fecha_creacion: '2023-01-10'
    },
    {
      id_certificacion: 2,
      nombre_certificacion: 'Certificación en Legislación Fiscal',
      descripcion: 'Capacitación en legislación fiscal y obligaciones tributarias',
      tipo: 'Especialización',
      horas_acreditadas: 80,
      vigencia_meses: 18,
      estatus: 1,
      fecha_creacion: '2023-02-15'
    },
    {
      id_certificacion: 3,
      nombre_certificacion: 'Certificación en Comercio Exterior',
      descripcion: 'Formación en procedimientos de comercio exterior y logística internacional',
      tipo: 'Profesional',
      horas_acreditadas: 150,
      vigencia_meses: 36,
      estatus: 1,
      fecha_creacion: '2023-03-20'
    },
    {
      id_certificacion: 4,
      nombre_certificacion: 'Certificación en Valoración Aduanera',
      descripcion: 'Especialización en valoración de mercancías y aranceles',
      tipo: 'Especialización',
      horas_acreditadas: 60,
      vigencia_meses: 12,
      estatus: 1,
      fecha_creacion: '2023-04-05'
    },
    {
      id_certificacion: 5,
      nombre_certificacion: 'Certificación Básica Aduanal',
      descripcion: 'Certificación inicial para nuevos agentes aduanales',
      tipo: 'Básica',
      horas_acreditadas: 200,
      vigencia_meses: 12,
      estatus: 0,
      fecha_creacion: '2023-01-25'
    },
    {
      id_certificacion: 6,
      nombre_certificacion: 'Certificación en Auditoría Aduanera',
      descripcion: 'Formación en procedimientos de auditoría y fiscalización aduanera',
      tipo: 'Avanzada',
      horas_acreditadas: 100,
      vigencia_meses: 24,
      estatus: 1,
      fecha_creacion: '2023-06-12'
    }
  ]);

  // Datos estáticos para la tabla Declaraciones
  const [declaraciones, setDeclaraciones] = useState([
    {
      id_declaracion: 1,
      nombre: 'Declaración de Intereses',
      articulo: 'Art. 28',
      descripcion: 'Declaración de posibles conflictos de interés',
      estatus: 1,
      fecha_registro: '2023-03-05',
      tipo: 'Obligatoria'
    },
    {
      id_declaracion: 2,
      nombre: 'Declaración de Ausencia de Delitos Fiscales',
      articulo: 'Art. 45',
      descripcion: 'Declaración jurada de no tener delitos fiscales',
      estatus: 1,
      fecha_registro: '2023-04-20',
      tipo: 'Requisito'
    },
    {
      id_declaracion: 3,
      nombre: 'Declaración de Cumplimiento Normativo',
      articulo: 'Art. 22',
      descripcion: 'Declaración de cumplimiento de normativas aplicables',
      estatus: 0,
      fecha_registro: '2023-01-30',
      tipo: 'Complementaria'
    },
    {
      id_declaracion: 4,
      nombre: 'Declaración de Cumplimiento Fiscal',
      articulo: 'Art. 42',
      descripcion: 'Declaración de estar al corriente en obligaciones fiscales',
      estatus: 1,
      fecha_registro: '2023-08-25',
      tipo: 'Anual'
    }
  ]);

  // Datos estáticos para la tabla Regiones
  const [regiones, setRegiones] = useState([
    {
      id_region: 1,
      nombre_region: 'Región Norte',
      estado: 'Chihuahua',
      pais: 'México',
      estatus: 1
    },
    {
      id_region: 2,
      nombre_region: 'Región Centro',
      estado: 'Ciudad de México',
      pais: 'México',
      estatus: 1
    },
    {
      id_region: 3,
      nombre_region: 'Región Sureste',
      estado: 'Yucatán',
      pais: 'México',
      estatus: 0
    },
    {
      id_region: 4,
      nombre_region: 'Región Noroeste',
      estado: 'Baja California',
      pais: 'México',
      estatus: 1
    },
    {
      id_region: 5,
      nombre_region: 'Región Pacífico Sur',
      estado: 'Guerrero',
      pais: 'México',
      estatus: 1
    },
    {
      id_region: 6,
      nombre_region: 'Región Centro Occidente',
      estado: 'Jalisco',
      pais: 'México',
      estatus: 1
    },
    {
      id_region: 7,
      nombre_region: 'Región Fronteriza',
      estado: 'Tamaulipas',
      pais: 'México',
      estatus: 0
    },
    {
      id_region: 8,
      nombre_region: 'Región Golfo',
      estado: 'Veracruz',
      pais: 'México',
      estatus: 1
    }
  ]);

  // Datos estáticos para la tabla Niveles_Reconocimiento
  const [nivelesReconocimiento, setNivelesReconocimiento] = useState([
    {
      id_nivel: 1,
      nombre_nivel: 'Nivel I: Reconocimiento Gremial Básico',
      descripcion: 'Reconocimiento inicial por participación en actividades gremiales y cumplimiento mínimo de estándares profesionales',
      estatus: 1
    },
    {
      id_nivel: 2,
      nombre_nivel: 'Nivel II: Reconocimiento Gremial Intermedio',
      descripcion: 'Reconocimiento por experiencia demostrada, formación continua y contribución significativa al gremio',
      estatus: 1
    },
    {
      id_nivel: 3,
      nombre_nivel: 'Nivel III: Reconocimiento Gremial Avanzado',
      descripcion: 'Máximo reconocimiento por excelencia profesional, liderazgo en el sector y aportes excepcionales al gremio',
      estatus: 1
    }
  ]);

  // DATOS ESTÁTICOS PARA LA TABLA ASOCIACIONES
  const [asociaciones, setAsociaciones] = useState([
    {
      id_asociacion: 1,
      codigo: 'ASOC-001',
      nombre: 'Asociación Aduanal del Norte, S.A. de C.V.',
      rfc: 'AAN240101XYZ',
      region: 'Norte',
      miembros_activos: 28,
      miembros_totales: 32,
      cumplimiento: 96,
      estatus: 'Activa',
      fecha_registro: '2020-01-15',
      director: 'Juan Carlos Méndez',
      telefono: '81 1234 5678',
      email: 'contacto@aduannorte.com.mx'
    },
    {
      id_asociacion: 2,
      codigo: 'ASOC-002',
      nombre: 'Asociación de Agentes Aduanales del Centro',
      rfc: 'AAC220315ABC',
      region: 'Centro',
      miembros_activos: 42,
      miembros_totales: 45,
      cumplimiento: 94,
      estatus: 'Activa',
      fecha_registro: '2019-03-15',
      director: 'María Elena Ruiz',
      telefono: '55 9876 5432',
      email: 'info@aaduana-centro.mx'
    },
    {
      id_asociacion: 3,
      codigo: 'ASOC-003',
      nombre: 'Asociación Fronteriza de Comercio Exterior',
      rfc: 'AFE210512DEF',
      region: 'Fronteriza',
      miembros_activos: 18,
      miembros_totales: 25,
      cumplimiento: 88,
      estatus: 'Activa',
      fecha_registro: '2021-05-12',
      director: 'Roberto Sánchez',
      telefono: '656 4567 8901',
      email: 'contacto@afronteriza.com'
    },
    {
      id_asociacion: 4,
      codigo: 'ASOC-004',
      nombre: 'Asociación Pacífico de Agentes Aduanales',
      rfc: 'APA200801GHI',
      region: 'Pacífico Sur',
      miembros_activos: 22,
      miembros_totales: 22,
      cumplimiento: 91,
      estatus: 'Activa',
      fecha_registro: '2020-08-01',
      director: 'Ana Patricia López',
      telefono: '33 3456 7890',
      email: 'administracion@apacifico.mx'
    },
    {
      id_asociacion: 5,
      codigo: 'ASOC-005',
      nombre: 'Asociación Sureste Aduanal, S.A. de C.V.',
      rfc: 'ASA190911JKL',
      region: 'Sureste',
      miembros_activos: 15,
      miembros_totales: 20,
      cumplimiento: 85,
      estatus: 'En Revisión',
      fecha_registro: '2019-09-11',
      director: 'Carlos Manuel Torres',
      telefono: '999 1234 5678',
      email: 'sureste@aduana-sureste.com'
    },
    {
      id_asociacion: 6,
      codigo: 'ASOC-006',
      nombre: 'Asociación Noroeste de Agentes Aduanales',
      rfc: 'ANA220214MNO',
      region: 'Noroeste',
      miembros_activos: 30,
      miembros_totales: 35,
      cumplimiento: 93,
      estatus: 'Activa',
      fecha_registro: '2022-02-14',
      director: 'Laura Guadalupe Pérez',
      telefono: '664 7890 1234',
      email: 'nororiente@aaduana-noroeste.mx'
    },
    {
      id_asociacion: 7,
      codigo: 'ASOC-007',
      nombre: 'Asociación Golfo de México Aduanal',
      rfc: 'AGA230307PQR',
      region: 'Golfo',
      miembros_activos: 25,
      miembros_totales: 28,
      cumplimiento: 90,
      estatus: 'Activa',
      fecha_registro: '2023-03-07',
      director: 'Fernando Martínez',
      telefono: '229 8765 4321',
      email: 'golfo@aduana-golfo.org'
    },
    {
      id_asociacion: 8,
      codigo: 'ASOC-008',
      nombre: 'Asociación de Comercio Exterior del Bajío',
      rfc: 'ACB180625STU',
      region: 'Centro Occidente',
      miembros_activos: 35,
      miembros_totales: 40,
      cumplimiento: 95,
      estatus: 'Suspendida',
      fecha_registro: '2018-06-25',
      director: 'Ricardo González',
      telefono: '477 2345 6789',
      email: 'bajio@comercio-exterior.mx'
    }
  ]);

  // NUEVA TABLA: Agentes con Documentos Pendientes
  const [agentesPendientes, setAgentesPendientes] = useState([
    {
      id_agente: 1,
      id_usuario: 201,
      nombre: 'Luis Rodríguez',
      email: 'luis@ejemplo.com',
      region: 'Norte',
      telefono: '+52 55 1234 5678',
      documentos_pendientes: 3,
      fecha_subida: '15/01/2026',
      documentos: [
        { tipo: 'Carta de Antecedentes', fecha: '10/01/2026', estado: 'Pendiente' },
        { tipo: 'Declaración Patrimonial', fecha: '12/01/2026', estado: 'Pendiente' },
        { tipo: 'Certificación de Estudios', fecha: '14/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: null,
      estatus_evaluacion: 'pendiente'
    },
    {
      id_agente: 2,
      id_usuario: 202,
      nombre: 'Carlos Martínez',
      email: 'carlos@ejemplo.com',
      region: 'Sur',
      telefono: '+52 55 5555 5555',
      documentos_pendientes: 2,
      fecha_subida: '14/01/2026',
      documentos: [
        { tipo: 'Carta de Antecedentes', fecha: '09/01/2026', estado: 'Pendiente' },
        { tipo: 'Constancia de No Delitos Fiscales', fecha: '13/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: null,
      estatus_evaluacion: 'pendiente'
    },
    {
      id_agente: 3,
      id_usuario: 203,
      nombre: 'Ana López',
      email: 'ana@ejemplo.com',
      region: 'Metropolitana',
      telefono: '+52 55 9999 8888',
      documentos_pendientes: 1,
      fecha_subida: '13/01/2026',
      documentos: [
        { tipo: 'Declaración Patrimonial', fecha: '11/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: 'María González Sánchez',
      estatus_evaluacion: 'asignado'
    },
    {
      id_agente: 4,
      id_usuario: 204,
      nombre: 'Roberto Sánchez',
      email: 'roberto@ejemplo.com',
      region: 'Fronteriza',
      telefono: '+52 656 4567 8901',
      documentos_pendientes: 4,
      fecha_subida: '12/01/2026',
      documentos: [
        { tipo: 'Carta de Antecedentes', fecha: '08/01/2026', estado: 'Pendiente' },
        { tipo: 'Declaración Patrimonial', fecha: '09/01/2026', estado: 'Pendiente' },
        { tipo: 'Certificación de Estudios', fecha: '10/01/2026', estado: 'Pendiente' },
        { tipo: 'Aviso de Retiro de SAT', fecha: '11/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: null,
      estatus_evaluacion: 'pendiente'
    },
    {
      id_agente: 5,
      id_usuario: 205,
      nombre: 'Laura Díaz',
      email: 'laura@ejemplo.com',
      region: 'Occidente',
      telefono: '+52 55 3333 2222',
      documentos_pendientes: 2,
      fecha_subida: '11/01/2026',
      documentos: [
        { tipo: 'Certificación de Estudios', fecha: '07/01/2026', estado: 'Pendiente' },
        { tipo: 'Constancia de No Delitos Fiscales', fecha: '10/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: 'Juan Pérez López',
      estatus_evaluacion: 'en_revision'
    },
    {
      id_agente: 6,
      id_usuario: 206,
      nombre: 'Pedro Sánchez',
      email: 'pedro@ejemplo.com',
      region: 'Centro',
      telefono: '+52 55 7777 6666',
      documentos_pendientes: 1,
      fecha_subida: '10/01/2026',
      documentos: [
        { tipo: 'Declaración Patrimonial', fecha: '06/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: 'Carlos Rodríguez Martínez',
      estatus_evaluacion: 'asignado'
    },
    {
      id_agente: 7,
      id_usuario: 207,
      nombre: 'Fernando Martínez',
      email: 'fernando@ejemplo.com',
      region: 'Golfo',
      telefono: '+52 229 8765 4321',
      documentos_pendientes: 3,
      fecha_subida: '09/01/2026',
      documentos: [
        { tipo: 'Carta de Antecedentes', fecha: '05/01/2026', estado: 'Pendiente' },
        { tipo: 'Declaración Patrimonial', fecha: '07/01/2026', estado: 'Pendiente' },
        { tipo: 'Certificación de Estudios', fecha: '08/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: null,
      estatus_evaluacion: 'pendiente'
    },
    {
      id_agente: 8,
      id_usuario: 208,
      nombre: 'Ricardo González',
      email: 'ricardo@ejemplo.com',
      region: 'Centro Occidente',
      telefono: '+52 477 2345 6789',
      documentos_pendientes: 2,
      fecha_subida: '08/01/2026',
      documentos: [
        { tipo: 'Carta de Antecedentes', fecha: '04/01/2026', estado: 'Pendiente' },
        { tipo: 'Declaración Patrimonial', fecha: '06/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: null,
      estatus_evaluacion: 'pendiente'
    }
  ]);

  // Estados para filtros de búsqueda
  const [searchCertificaciones, setSearchCertificaciones] = useState('');
  const [searchDeclaraciones, setSearchDeclaraciones] = useState('');
  const [searchRoles, setSearchRoles] = useState('');
  const [searchRegiones, setSearchRegiones] = useState('');
  const [searchComite, setSearchComite] = useState('');
  const [searchNivelesReconocimiento, setSearchNivelesReconocimiento] = useState('');
  const [searchAsociaciones, setSearchAsociaciones] = useState('');
  const [searchAgentesPendientes, setSearchAgentesPendientes] = useState('');

  // Filtrar certificaciones por nombre
  const filteredCertificaciones = certificaciones.filter(cert =>
    cert.nombre_certificacion.toLowerCase().includes(searchCertificaciones.toLowerCase())
  );

  // Filtrar declaraciones por nombre
  const filteredDeclaraciones = declaraciones.filter(declaracion =>
    declaracion.nombre.toLowerCase().includes(searchDeclaraciones.toLowerCase())
  );

  // Filtrar roles por nombre
  const filteredRoles = roles.filter(rol =>
    rol.nombre.toLowerCase().includes(searchRoles.toLowerCase())
  );

  // Filtrar regiones por nombre
  const filteredRegiones = regiones.filter(region =>
    region.nombre_region.toLowerCase().includes(searchRegiones.toLowerCase()) ||
    region.estado.toLowerCase().includes(searchRegiones.toLowerCase())
  );

  // Filtrar comité por nombre de usuario
  const filteredComite = comite.filter(miembro =>
    miembro.nombre_usuario.toLowerCase().includes(searchComite.toLowerCase())
  );

  // Filtrar niveles de reconocimiento por nombre
  const filteredNivelesReconocimiento = nivelesReconocimiento.filter(nivel =>
    nivel.nombre_nivel.toLowerCase().includes(searchNivelesReconocimiento.toLowerCase())
  );

  // Filtrar asociaciones por nombre, código o región
  const filteredAsociaciones = asociaciones.filter(asociacion =>
    asociacion.nombre.toLowerCase().includes(searchAsociaciones.toLowerCase()) ||
    asociacion.codigo.toLowerCase().includes(searchAsociaciones.toLowerCase()) ||
    asociacion.region.toLowerCase().includes(searchAsociaciones.toLowerCase())
  );

  // Filtrar agentes pendientes por nombre, email o región
  const filteredAgentesPendientes = agentesPendientes.filter(agente =>
    agente.nombre.toLowerCase().includes(searchAgentesPendientes.toLowerCase()) ||
    agente.email.toLowerCase().includes(searchAgentesPendientes.toLowerCase()) ||
    agente.region.toLowerCase().includes(searchAgentesPendientes.toLowerCase())
  );

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setConfig({
      ...config,
      [field]: value
    });
  };

  const handleSliderChange = (field) => (event, newValue) => {
    setConfig({
      ...config,
      [field]: newValue
    });
  };

  // Función para manejar estado de roles
  const handleToggleRoleStatus = (id) => {
    setRoles(roles.map(rol =>
      rol.id === id ? { ...rol, estatus: !rol.estatus } : rol
    ));
  };

  // Función para manejar estado de miembros del comité
  const handleToggleComiteStatus = (id) => {
    setComite(comite.map(miembro =>
      miembro.id_comite === id ? { ...miembro, estatus: miembro.estatus === 1 ? 0 : 1 } : miembro
    ));
  };

  // Función para manejar permiso de aprobar
  const handleTogglePermisoAprobar = (id) => {
    setComite(comite.map(miembro =>
      miembro.id_comite === id ? { ...miembro, permiso_aprobar: miembro.permiso_aprobar === 1 ? 0 : 1 } : miembro
    ));
  };

  // Función para manejar estado de certificaciones
  const handleToggleCertificacionStatus = (id) => {
    setCertificaciones(certificaciones.map(cert =>
      cert.id_certificacion === id ? { ...cert, estatus: cert.estatus === 1 ? 0 : 1 } : cert
    ));
  };

  // Función para manejar estado de declaraciones
  const handleToggleDeclaracionStatus = (id) => {
    setDeclaraciones(declaraciones.map(dec =>
      dec.id_declaracion === id ? { ...dec, estatus: dec.estatus === 1 ? 0 : 1 } : dec
    ));
  };

  // Función para manejar estado de regiones
  const handleToggleRegionStatus = (id) => {
    setRegiones(regiones.map(region =>
      region.id_region === id ? { ...region, estatus: region.estatus === 1 ? 0 : 1 } : region
    ));
  };

  // Función para manejar estado de niveles de reconocimiento
  const handleToggleNivelStatus = (id) => {
    setNivelesReconocimiento(nivelesReconocimiento.map(nivel =>
      nivel.id_nivel === id ? { ...nivel, estatus: nivel.estatus === 1 ? 0 : 1 } : nivel
    ));
  };

  // Función para manejar estado de asociaciones
  const handleToggleAsociacionStatus = (id) => {
    setAsociaciones(asociaciones.map(asoc =>
      asoc.id_asociacion === id ? {
        ...asoc,
        estatus: asoc.estatus === 'Activa' ? 'Suspendida' :
          asoc.estatus === 'Suspendida' ? 'En Revisión' : 'Activa'
      } : asoc
    ));
  };

  // Función para asignar evaluador a agente
  const handleAssignEvaluator = (idAgente) => {
    const agente = agentesPendientes.find(a => a.id_agente === idAgente);
    setSelectedAgent(agente);
    setSelectedEvaluator('');
    setAssignDialogOpen(true);
  };

  // Función para confirmar asignación de evaluador
  const handleConfirmAssignment = () => {
    if (!selectedEvaluator) {
      alert('Por favor seleccione un evaluador');
      return;
    }

    setAgentesPendientes(agentesPendientes.map(agente =>
      agente.id_agente === selectedAgent.id_agente
        ? {
            ...agente,
            evaluador_asignado: selectedEvaluator,
            estatus_evaluacion: 'asignado'
          }
        : agente
    ));

    setAssignDialogOpen(false);
    setSelectedAgent(null);
    setSelectedEvaluator('');
    alert('Evaluador asignado exitosamente');
  };

  const tabs = [
    { label: 'Catálogo Certificaciones', icon: <SchoolIcon /> },
    { label: 'Catálogo Declaraciones', icon: <GavelIcon /> },
    { label: 'Roles', icon: <HowToRegIcon /> },
    { label: 'Regiones', icon: <PublicIcon /> },
    { label: 'Comité', icon: <SecurityIcon /> },
    { label: 'Asociaciones', icon: <BusinessIcon /> },
    { label: 'Agentes Pendientes', icon: <PendingActionsIcon /> },
    { label: 'Niveles Reconocimiento', icon: <EmojiEventsIcon /> },
    { label: 'Semáforo', icon: <DataThresholdingIcon /> }
  ];

  const getSystemHealth = () => {
    let score = 100;
    return Math.max(0, score);
  };

  const systemHealth = getSystemHealth();

  // Función para obtener el color según el tipo de certificación
  const getTipoColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'profesional':
        return colors.primary.dark;
      case 'especialización':
        return colors.accents.purple;
      case 'básica':
        return colors.secondary.main;
      case 'avanzada':
        return colors.accents.blue;
      default:
        return colors.text.secondary;
    }
  };

  // Función para obtener el color de fondo según el tipo de certificación
  const getTipoBgColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'profesional':
        return '#e8f0fe';
      case 'especialización':
        return '#f0ebff';
      case 'básica':
        return '#e0f7f7';
      case 'avanzada':
        return '#e6f0ff';
      default:
        return '#f5f5f5';
    }
  };

  // Función para obtener el color según el tipo de declaración
  const getDeclaracionTipoColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'obligatoria':
        return colors.primary.dark;
      case 'anual':
        return colors.secondary.main;
      case 'requisito':
        return colors.accents.purple;
      case 'complementaria':
        return colors.accents.blue;
      default:
        return colors.text.secondary;
    }
  };

  // Función para obtener el color de fondo según el tipo de declaración
  const getDeclaracionTipoBgColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'obligatoria':
        return '#e8f0fe';
      case 'anual':
        return '#e0f7f7';
      case 'requisito':
        return '#f0ebff';
      case 'complementaria':
        return '#e6f0ff';
      default:
        return '#f5f5f5';
    }
  };

  // Función para obtener el icono según el nivel
  const getNivelIcon = (nivel) => {
    const nivelNum = nivel?.match(/Nivel (\w+)/i)?.[1];
    switch (nivelNum?.toLowerCase()) {
      case 'i':
      case '1':
        return <StarIcon />;
      case 'ii':
      case '2':
        return <MilitaryTechIcon />;
      case 'iii':
      case '3':
        return <WorkspacePremiumIcon />;
      default:
        return <EmojiEventsIcon />;
    }
  };

  // Función para obtener el color según el nivel
  const getNivelColor = (nivel) => {
    const nivelNum = nivel?.match(/Nivel (\w+)/i)?.[1];
    switch (nivelNum?.toLowerCase()) {
      case 'i':
      case '1':
        return colors.primary.main;
      case 'ii':
      case '2':
        return colors.secondary.main;
      case 'iii':
      case '3':
        return colors.accents.blue;
      default:
        return colors.text.secondary;
    }
  };

  // Función para obtener el color de fondo según el nivel
  const getNivelBgColor = (nivel) => {
    const nivelNum = nivel?.match(/Nivel (\w+)/i)?.[1];
    switch (nivelNum?.toLowerCase()) {
      case 'i':
      case '1':
        return '#e8f0fe';
      case 'ii':
      case '2':
        return '#e0f7f7';
      case 'iii':
      case '3':
        return '#e6f0ff';
      default:
        return '#f5f5f5';
    }
  };

  // Función para obtener el tipo de reconocimiento
  const getTipoReconocimiento = (nombre) => {
    if (nombre?.includes('Gremial')) return 'Gremial';
    if (nombre?.includes('Académico')) return 'Académico';
    if (nombre?.includes('Profesional')) return 'Profesional';
    return 'General';
  };

  // Función para obtener el color del tipo de reconocimiento
  const getTipoReconocimientoColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'gremial':
        return colors.primary.main;
      case 'académico':
        return colors.accents.purple;
      case 'profesional':
        return colors.secondary.main;
      default:
        return colors.text.secondary;
    }
  };

  // Función para obtener el color de fondo del tipo de reconocimiento
  const getTipoReconocimientoBgColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'gremial':
        return '#e8f0fe';
      case 'académico':
        return '#f0ebff';
      case 'profesional':
        return '#e0f7f7';
      default:
        return '#eceff1';
    }
  };

  // Función para obtener el color según el estatus de la asociación
  const getAsociacionEstatusColor = (estatus) => {
    switch (estatus?.toLowerCase()) {
      case 'activa':
        return colors.secondary.main;
      case 'suspendida':
        return colors.primary.dark;
      case 'en revisión':
        return colors.accents.blue;
      default:
        return colors.text.secondary;
    }
  };

  // Función para obtener el color de fondo según el estatus de la asociación
  const getAsociacionEstatusBgColor = (estatus) => {
    switch (estatus?.toLowerCase()) {
      case 'activa':
        return '#e0f7f7';
      case 'suspendida':
        return '#e8f0fe';
      case 'en revisión':
        return '#e6f0ff';
      default:
        return '#f8f9fa';
    }
  };

  // Función para obtener el color según el nivel de cumplimiento
  const getCumplimientoColor = (porcentaje) => {
    if (porcentaje >= 95) return colors.secondary.main;
    if (porcentaje >= 90) return colors.accents.blue;
    return colors.primary.dark;
  };

  // Función para obtener las iniciales del nombre de la asociación
  const getAsociacionIniciales = (nombre) => {
    return nombre
      .split(' ')
      .filter(word => word.length > 0 && word[0].toUpperCase() === word[0])
      .map(word => word[0])
      .join('')
      .substring(0, 2);
  };

  // Función para obtener el color según el estatus de evaluación
  const getEstatusEvaluacionColor = (estatus) => {
    switch (estatus?.toLowerCase()) {
      case 'pendiente':
        return colors.primary.dark;
      case 'asignado':
        return colors.accents.blue;
      case 'en_revision':
        return colors.secondary.main;
      case 'completado':
        return colors.secondary.light;
      default:
        return colors.text.secondary;
    }
  };

  // Función para obtener el color de fondo según el estatus de evaluación
  const getEstatusEvaluacionBgColor = (estatus) => {
    switch (estatus?.toLowerCase()) {
      case 'pendiente':
        return '#e8f0fe';
      case 'asignado':
        return '#e6f0ff';
      case 'en_revision':
        return '#e0f7f7';
      case 'completado':
        return '#d0f0f0';
      default:
        return '#f8f9fa';
    }
  };

  // Función para obtener el texto del estatus de evaluación
  const getEstatusEvaluacionText = (estatus) => {
    switch (estatus?.toLowerCase()) {
      case 'pendiente':
        return 'PENDIENTE';
      case 'asignado':
        return 'ASIGNADO';
      case 'en_revision':
        return 'EN REVISIÓN';
      case 'completado':
        return 'COMPLETADO';
      default:
        return 'DESCONOCIDO';
    }
  };

  // Función para obtener las iniciales del agente
  const getAgenteIniciales = (nombre) => {
    return nombre
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // Obtener miembros del comité para el diálogo de asignación
  const evaluadoresDisponibles = filteredComite
    .filter(miembro => miembro.estatus === 1 && miembro.permiso_aprobar === 1)
    .map(miembro => miembro.nombre_usuario);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ mb: 2, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Typography variant="h5" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 0.5 }}>
              Configuración del Sistema
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Configure los parámetros globales del sistema SICAG
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="small"
            startIcon={showCards ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            onClick={() => setShowCards(!showCards)}
            sx={{ color: colors.primary.main, borderColor: colors.primary.main }}
          >
            {showCards ? 'Ocultar Resumen' : 'Mostrar Resumen'}
          </Button>
        </Box>

        <Alert
          severity="info"
          icon={<WarningIcon />}
          sx={{ 
            mb: 2,
            bgcolor: '#e6f0ff',
            color: colors.primary.dark,
            '& .MuiAlert-icon': {
              color: colors.accents.blue
            }
          }}
        >
          Los cambios en la configuración afectarán a todos los usuarios del sistema.
        </Alert>

        {/* Tarjetas de estado del sistema - Ocultables */}
        {showCards && (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // 4 columnas de igual ancho
            gap: 2,
            mb: 2,
            width: '100%',
            '@media (max-width: 1200px)': {
              gridTemplateColumns: 'repeat(2, 1fr)', // 2 columnas en pantallas medianas
            },
            '@media (max-width: 600px)': {
              gridTemplateColumns: '1fr', // 1 columna en móviles
            }
          }}>
            {/* Tarjeta 1: Salud del Sistema */}
            <Card sx={{
              borderLeft: `4px solid ${colors.primary.main}`,
              height: 120,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{
                p: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Typography variant="h6" sx={{ color: colors.primary.main, fontWeight: 'bold', mb: 1 }}>
                  {systemHealth}%
                </Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Salud del Sistema
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={systemHealth}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    mt: 1,
                    bgcolor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: systemHealth >= 80 ? colors.secondary.main :
                        systemHealth >= 60 ? colors.accents.blue : colors.primary.dark
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* Tarjeta 2: Certificaciones Activas */}
            <Card sx={{
              borderLeft: `4px solid ${colors.accents.purple}`,
              height: 120,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{
                p: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Typography variant="h6" sx={{ color: colors.accents.purple, fontWeight: 'bold', mb: 1 }}>
                  {certificaciones.filter(c => c.estatus === 1).length}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Certificaciones Activas
                </Typography>
              </CardContent>
            </Card>

            {/* Tarjeta 3: Declaraciones Activas */}
            <Card sx={{
              borderLeft: `4px solid ${colors.secondary.main}`,
              height: 120,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{
                p: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Typography variant="h6" sx={{ color: colors.secondary.main, fontWeight: 'bold', mb: 1 }}>
                  {declaraciones.filter(d => d.estatus === 1).length}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Declaraciones Activas
                </Typography>
              </CardContent>
            </Card>

            {/* Tarjeta 4: Regiones Activas */}
            <Card sx={{
              borderLeft: `4px solid ${colors.accents.blue}`,
              height: 120,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <CardContent sx={{
                p: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Typography variant="h6" sx={{ color: colors.accents.blue, fontWeight: 'bold', mb: 1 }}>
                  {regiones.filter(r => r.estatus === 1).length}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Regiones Activas
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  color: colors.text.secondary,
                  '&.Mui-selected': {
                    color: colors.primary.main
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: colors.primary.main
                }
              }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  iconPosition="start"
                  label={tab.label}
                  sx={{
                    minHeight: 48,
                    textTransform: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Contenido de los tabs */}
          <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
            {activeTab === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="Todos"
                        variant="filled"
                        sx={{ bgcolor: colors.primary.main, color: 'white' }}
                        clickable
                      />
                      <Chip
                        label="Activos"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        clickable
                      />
                      <Chip
                        label="Inactivos"
                        variant="outlined"
                        sx={{ borderColor: colors.text.secondary, color: colors.text.secondary }}
                        clickable
                      />
                      <Chip
                        label="Profesional"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.dark, color: colors.primary.dark }}
                        clickable
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Total: {filteredCertificaciones.length} certificaciones
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Activas: {filteredCertificaciones.filter(c => c.estatus === 1).length}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nueva Certificación
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar certificación por nombre..."
                    value={searchCertificaciones}
                    onChange={(e) => setSearchCertificaciones(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Tabla de Certificaciones */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '5%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '25%' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '30%' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '12%' }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '8%' }} align="center">Horas previstas</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '8%' }} align="center">Vigencia prevista</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '8%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '14%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCertificaciones.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron certificaciones que coincidan con la búsqueda
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredCertificaciones.map((cert) => (
                          <TableRow
                            key={cert.id_certificacion}
                            hover
                            sx={{
                              '&:hover': { bgcolor: '#f8f9fa' },
                              opacity: cert.estatus === 0 ? 0.7 : 1
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                #{cert.id_certificacion}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                {cert.nombre_certificacion}
                              </Typography>
                              {cert.fecha_creacion && (
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  Creado: {cert.fecha_creacion}
                                </Typography>
                              )}
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                {cert.descripcion}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Chip
                                label={cert.tipo}
                                size="small"
                                sx={{
                                  bgcolor: getTipoBgColor(cert.tipo),
                                  color: getTipoColor(cert.tipo),
                                  fontWeight: 500,
                                  maxWidth: '100%',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                <AccessTimeIcon sx={{ color: colors.primary.main, fontSize: 16 }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                  {cert.horas_acreditadas}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                <TimerIcon sx={{ color: colors.accents.purple, fontSize: 16 }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                  {cert.vigencia_meses} m
                                </Typography>
                              </Box>
                              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                ≈ {(cert.vigencia_meses * 30).toLocaleString()} días
                              </Typography>
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={cert.estatus === 1 ? "ACTIVA" : "INACTIVA"}
                                size="small"
                                sx={{
                                  bgcolor: cert.estatus === 1 ? colors.secondary.main : colors.primary.dark,
                                  color: 'white',
                                  fontWeight: 600,
                                  minWidth: 80
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              <Stack direction="row" spacing={0.5} justifyContent="center">
                                <Tooltip title="Ver detalles">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.primary.main }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar certificación">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title={cert.estatus === 1 ? 'Desactivar' : 'Activar'}>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleToggleCertificacionStatus(cert.id_certificacion)}
                                    sx={{ color: cert.estatus === 1 ? colors.primary.dark : colors.secondary.main }}
                                  >
                                    {cert.estatus === 1 ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Estadísticas de Certificaciones */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f0fe' }}>
                      <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                        {filteredCertificaciones.filter(c => c.tipo === 'Profesional').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.primary.dark }}>
                        Profesionales
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f0ebff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.purple, fontWeight: 'bold' }}>
                        {filteredCertificaciones.filter(c => c.tipo === 'Especialización').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.purple }}>
                        Especializaciones
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7f7' }}>
                      <Typography variant="h6" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                        {filteredCertificaciones.filter(c => c.estatus === 1).length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary.main }}>
                        Activas
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e6f0ff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.blue, fontWeight: 'bold' }}>
                        {Math.round(filteredCertificaciones.reduce((acc, curr) => acc + curr.horas_acreditadas, 0) / Math.max(filteredCertificaciones.length, 1))}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.blue }}>
                        Promedio Horas
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="Todos"
                        variant="filled"
                        sx={{ bgcolor: colors.primary.main, color: 'white' }}
                        clickable
                      />
                      <Chip
                        label="Activos"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        clickable
                      />
                      <Chip
                        label="Inactivos"
                        variant="outlined"
                        sx={{ borderColor: colors.text.secondary, color: colors.text.secondary }}
                        clickable
                      />
                      <Chip
                        label="Obligatorias"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.dark, color: colors.primary.dark }}
                        clickable
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Total: {filteredDeclaraciones.length} declaraciones
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Activas: {filteredDeclaraciones.filter(d => d.estatus === 1).length}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nueva Declaración
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar declaración por nombre..."
                    value={searchDeclaraciones}
                    onChange={(e) => setSearchDeclaraciones(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Tabla de Declaraciones */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '5%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '25%' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }} align="center">Artículo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '35%' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '8%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '12%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredDeclaraciones.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron declaraciones que coincidan con la búsqueda
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDeclaraciones.map((declaracion) => (
                          <TableRow
                            key={declaracion.id_declaracion}
                            hover
                            sx={{
                              '&:hover': { bgcolor: '#f8f9fa' },
                              opacity: declaracion.estatus === 0 ? 0.7 : 1
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                #{declaracion.id_declaracion}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                {declaracion.nombre}
                              </Typography>
                              {declaracion.fecha_registro && (
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  Registro: {declaracion.fecha_registro}
                                </Typography>
                              )}
                            </TableCell>

                            <TableCell align="center">
                              <Paper sx={{
                                p: 1,
                                bgcolor: '#e8f0fe',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: 60
                              }}>
                                <ArticleIcon sx={{ color: colors.primary.main, fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.main }}>
                                  {declaracion.articulo}
                                </Typography>
                              </Paper>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                {declaracion.descripcion}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Chip
                                label={declaracion.tipo}
                                size="small"
                                sx={{
                                  bgcolor: getDeclaracionTipoBgColor(declaracion.tipo),
                                  color: getDeclaracionTipoColor(declaracion.tipo),
                                  fontWeight: 500,
                                  maxWidth: '100%',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={declaracion.estatus === 1 ? "ACTIVA" : "INACTIVA"}
                                size="small"
                                sx={{
                                  bgcolor: declaracion.estatus === 1 ? colors.secondary.main : colors.primary.dark,
                                  color: 'white',
                                  fontWeight: 600,
                                  minWidth: 80
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              <Stack direction="row" spacing={0.5} justifyContent="center">
                                <Tooltip title="Ver detalles">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.primary.main }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar declaración">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title={declaracion.estatus === 1 ? 'Desactivar' : 'Activar'}>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleToggleDeclaracionStatus(declaracion.id_declaracion)}
                                    sx={{ color: declaracion.estatus === 1 ? colors.primary.dark : colors.secondary.main }}
                                  >
                                    {declaracion.estatus === 1 ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Estadísticas de Declaraciones */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f0fe' }}>
                      <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                        {filteredDeclaraciones.filter(d => d.tipo === 'Obligatoria').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.primary.dark }}>
                        Obligatorias
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7f7' }}>
                      <Typography variant="h6" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                        {filteredDeclaraciones.filter(d => d.tipo === 'Anual').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary.main }}>
                        Anuales
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f0ebff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.purple, fontWeight: 'bold' }}>
                        {filteredDeclaraciones.filter(d => d.tipo === 'Requisito').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.purple }}>
                        Requisitos
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e6f0ff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.blue, fontWeight: 'bold' }}>
                        {filteredDeclaraciones.filter(d => d.estatus === 1).length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.blue }}>
                        Activas
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="Todos"
                        variant="filled"
                        sx={{ bgcolor: colors.primary.main, color: 'white' }}
                        clickable
                      />
                      <Chip
                        label="Activos"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        clickable
                      />
                      <Chip
                        label="Inactivos"
                        variant="outlined"
                        sx={{ borderColor: colors.text.secondary, color: colors.text.secondary }}
                        clickable
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Total: {filteredRoles.length} roles
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Activos: {filteredRoles.filter(r => r.estatus).length}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nuevo Rol
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar rol por nombre..."
                    value={searchRoles}
                    onChange={(e) => setSearchRoles(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Tabla de Roles */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '25%' }}>Nombre del Rol</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '40%' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Nivel</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRoles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron roles que coincidan con la búsqueda
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRoles.map((rol) => (
                          <TableRow
                            key={rol.id}
                            hover
                            sx={{
                              '&:hover': { bgcolor: '#f8f9fa' },
                              opacity: rol.estatus === false ? 0.7 : 1
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                #{rol.id}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                {rol.nombre}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                {rol.descripcion}
                              </Typography>
                            </TableCell>

                            <TableCell align="center">
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: '50%',
                                  bgcolor: rol.nivel === 1 ? colors.primary.dark :
                                    rol.nivel === 2 ? colors.secondary.main :
                                      rol.nivel === 3 ? colors.primary.light :
                                        rol.nivel === 4 ? colors.accents.blue : colors.accents.purple,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                                    {rol.nivel}
                                  </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  {rol.nivel === 1 ? 'Alto' :
                                    rol.nivel === 2 ? 'Medio' :
                                      rol.nivel === 3 ? 'Básico' : 'Limitado'}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={rol.estatus ? "ACTIVO" : "INACTIVO"}
                                size="small"
                                sx={{
                                  bgcolor: rol.estatus ? colors.secondary.main : colors.primary.dark,
                                  color: 'white',
                                  fontWeight: 600,
                                  minWidth: 80
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              <Stack direction="row" spacing={0.5} justifyContent="center">
                                <Tooltip title="Ver detalles">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.primary.main }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar rol">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title={rol.estatus ? 'Desactivar' : 'Activar'}>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleToggleRoleStatus(rol.id)}
                                    sx={{ color: rol.estatus ? colors.primary.dark : colors.secondary.main }}
                                  >
                                    {rol.estatus ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {activeTab === 3 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="Todos"
                        variant="filled"
                        sx={{ bgcolor: colors.primary.main, color: 'white' }}
                        clickable
                      />
                      <Chip
                        label="Activos"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        clickable
                      />
                      <Chip
                        label="Inactivos"
                        variant="outlined"
                        sx={{ borderColor: colors.text.secondary, color: colors.text.secondary }}
                        clickable
                      />
                      <Chip
                        label="México"
                        variant="outlined"
                        sx={{ borderColor: colors.secondary.main, color: colors.secondary.main }}
                        clickable
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Total: {filteredRegiones.length} regiones
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Activas: {filteredRegiones.filter(r => r.estatus === 1).length}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nueva Región
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar región por nombre o estado..."
                    value={searchRegiones}
                    onChange={(e) => setSearchRegiones(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Tabla de Regiones */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '8%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '25%' }}>Nombre Región</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '25%' }}>Estado</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '20%' }}>País</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '12%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRegiones.map((region) => (
                        <TableRow
                          key={region.id_region}
                          hover
                          sx={{
                            '&:hover': { bgcolor: '#f8f9fa' },
                            opacity: region.estatus === 0 ? 0.7 : 1
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                              #{region.id_region}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <PublicIcon sx={{ color: colors.primary.main, fontSize: 16 }} />
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                {region.nombre_region}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationOnIcon sx={{ color: colors.text.secondary, fontSize: 16 }} />
                              <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                {region.estado}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FlagIcon sx={{ color: colors.primary.dark, fontSize: 16 }} />
                              <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                {region.pais}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="center">
                            <Chip
                              label={region.estatus === 1 ? "ACTIVA" : "INACTIVA"}
                              size="small"
                              sx={{
                                bgcolor: region.estatus === 1 ? colors.secondary.main : colors.primary.dark,
                                color: 'white',
                                fontWeight: 600,
                                minWidth: 80
                              }}
                            />
                          </TableCell>

                          <TableCell align="center">
                            <Stack direction="row" spacing={0.5} justifyContent="center">
                              <Tooltip title="Ver detalles">
                                <IconButton
                                  size="small"
                                  sx={{ color: colors.primary.main }}
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Editar región">
                                <IconButton
                                  size="small"
                                  sx={{ color: colors.accents.blue }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title={region.estatus === 1 ? 'Desactivar' : 'Activar'}>
                                <IconButton
                                  size="small"
                                  onClick={() => handleToggleRegionStatus(region.id_region)}
                                  sx={{ color: region.estatus === 1 ? colors.primary.dark : colors.secondary.main }}
                                >
                                  {region.estatus === 1 ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Estadísticas de Regiones */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f0fe' }}>
                      <Typography variant="h6" sx={{ color: colors.primary.main, fontWeight: 'bold' }}>
                        {filteredRegiones.length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.primary.main }}>
                        Total Regiones
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7f7' }}>
                      <Typography variant="h6" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                        {filteredRegiones.filter(r => r.estatus === 1).length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary.main }}>
                        Activas
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f0fe' }}>
                      <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                        {filteredRegiones.filter(r => r.estatus === 0).length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.primary.dark }}>
                        Inactivas
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f0ebff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.purple, fontWeight: 'bold' }}>
                        {new Set(filteredRegiones.map(r => r.pais)).size}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.purple }}>
                        Países
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Mapa de regiones */}
                <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
                  <Typography variant="subtitle2" sx={{ color: colors.primary.dark, mb: 2, fontWeight: 'bold' }}>
                    Distribución por Estado
                  </Typography>
                  <Grid container spacing={1}>
                    {Array.from(new Set(filteredRegiones.map(r => r.estado))).map((estado, index) => {
                      const count = filteredRegiones.filter(r => r.estado === estado).length;
                      return (
                        <Grid item xs={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <MapIcon sx={{ color: colors.primary.main, fontSize: 16 }} />
                              <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                {estado}
                              </Typography>
                            </Box>
                            <Chip
                              label={count}
                              size="small"
                              variant="outlined"
                              sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                            />
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              </Box>
            )}

            {activeTab === 4 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="Todos"
                        variant="filled"
                        sx={{ bgcolor: colors.primary.main, color: 'white' }}
                        clickable
                      />
                      <Chip
                        label="Activos"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        clickable
                      />
                      <Chip
                        label="Con Permiso Aprobar"
                        variant="outlined"
                        sx={{ borderColor: colors.secondary.main, color: colors.secondary.main }}
                        clickable
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Total: {filteredComite.length} miembros
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Activos: {filteredComite.filter(m => m.estatus === 1).length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Con permiso: {filteredComite.filter(m => m.permiso_aprobar === 1).length}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nuevo Miembro
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar miembro por nombre..."
                    value={searchComite}
                    onChange={(e) => setSearchComite(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Tabla de Comité */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '5%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '20%' }}>Usuario</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }}>Cargo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '20%' }}>Área</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Permiso Aprobar</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '20%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredComite.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron miembros que coincidan con la búsqueda
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredComite.map((miembro) => (
                          <TableRow
                            key={miembro.id_comite}
                            hover
                            sx={{
                              '&:hover': { bgcolor: '#f8f9fa' },
                              opacity: miembro.estatus === 0 ? 0.7 : 1
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                #{miembro.id_comite}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon sx={{ color: colors.primary.main, fontSize: 16 }} />
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                    {miembro.nombre_usuario}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                    ID: {miembro.id_usuario}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Chip
                                label={miembro.cargo}
                                size="small"
                                sx={{
                                  bgcolor: miembro.cargo === 'Presidente' ? '#e8f0fe' :
                                    miembro.cargo === 'Secretario' ? '#f0ebff' :
                                      miembro.cargo === 'Vocal' ? '#e0f7f7' :
                                        miembro.cargo === 'Coordinador' ? '#e6f0ff' : '#f5f5f5',
                                  color: miembro.cargo === 'Presidente' ? colors.primary.dark :
                                    miembro.cargo === 'Secretario' ? colors.accents.purple :
                                      miembro.cargo === 'Vocal' ? colors.secondary.main :
                                        miembro.cargo === 'Coordinador' ? colors.accents.blue : colors.text.secondary,
                                  fontWeight: 500
                                }}
                              />
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BusinessIcon sx={{ color: colors.text.secondary, fontSize: 16 }} />
                                <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                  {miembro.area}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={miembro.permiso_aprobar === 1 ? "SI" : "NO"}
                                size="small"
                                icon={miembro.permiso_aprobar === 1 ? <HowToRegIcon fontSize="small" /> : null}
                                sx={{
                                  bgcolor: miembro.permiso_aprobar === 1 ? colors.secondary.main : colors.primary.dark,
                                  color: 'white',
                                  fontWeight: 600,
                                  minWidth: 60
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={miembro.estatus === 1 ? "ACTIVO" : "INACTIVO"}
                                size="small"
                                sx={{
                                  bgcolor: miembro.estatus === 1 ? colors.secondary.main : colors.primary.dark,
                                  color: 'white',
                                  fontWeight: 600,
                                  minWidth: 80
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              <Stack direction="row" spacing={0.5} justifyContent="center">
                                <Tooltip title="Ver detalles">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.primary.main }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar miembro">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Cambiar permiso de aprobación">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleTogglePermisoAprobar(miembro.id_comite)}
                                    sx={{ color: miembro.permiso_aprobar === 1 ? colors.primary.dark : colors.secondary.main }}
                                  >
                                    {miembro.permiso_aprobar === 1 ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Estadísticas del Comité */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f0fe' }}>
                      <Typography variant="h6" sx={{ color: colors.primary.main, fontWeight: 'bold' }}>
                        {filteredComite.filter(m => m.cargo === 'Presidente').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.primary.main }}>
                        Presidentes
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f0ebff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.purple, fontWeight: 'bold' }}>
                        {filteredComite.filter(m => m.cargo === 'Secretario').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.purple }}>
                        Secretarios
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7f7' }}>
                      <Typography variant="h6" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                        {filteredComite.filter(m => m.cargo === 'Vocal').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary.main }}>
                        Vocales
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e6f0ff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.blue, fontWeight: 'bold' }}>
                        {filteredComite.filter(m => m.permiso_aprobar === 1).length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.blue }}>
                        Con Permiso
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeTab === 5 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Configuración general de Asociaciones */}

                {/* Filtros, búsqueda y estadísticas para Asociaciones */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="Todos"
                        variant="filled"
                        sx={{ bgcolor: colors.primary.main, color: 'white' }}
                        clickable
                      />
                      <Chip
                        label="Activas"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        clickable
                      />
                      <Chip
                        label="Suspendidas"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.dark, color: colors.primary.dark }}
                        clickable
                      />
                      <Chip
                        label="En Revisión"
                        variant="outlined"
                        sx={{ borderColor: colors.accents.blue, color: colors.accents.blue }}
                        clickable
                      />
                      <Chip
                        label="Alto Cumplimiento"
                        variant="outlined"
                        sx={{ borderColor: colors.secondary.main, color: colors.secondary.main }}
                        clickable
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Total: {filteredAsociaciones.length} asociaciones
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Activas: {filteredAsociaciones.filter(a => a.estatus === 'Activa').length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Agentes: {filteredAsociaciones.reduce((acc, curr) => acc + curr.miembros_totales, 0)}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nueva Asociación
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda para Asociaciones */}
                  <TextField
                    fullWidth
                    placeholder="Buscar asociación por nombre, código o región..."
                    value={searchAsociaciones}
                    onChange={(e) => setSearchAsociaciones(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Tabla de Asociaciones */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '5%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '20%' }}>Asociación</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Código</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }}>Región</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Miembros</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Cumplimiento</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }} align="center">Contacto</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAsociaciones.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron asociaciones que coincidan con la búsqueda
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAsociaciones.map((asociacion) => (
                          <TableRow
                            key={asociacion.id_asociacion}
                            hover
                            sx={{
                              '&:hover': { bgcolor: '#f8f9fa' },
                              opacity: asociacion.estatus === 'Suspendida' ? 0.7 : 1
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                #{asociacion.id_asociacion}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Avatar sx={{
                                  width: 36,
                                  height: 36,
                                  fontSize: '0.9rem',
                                  bgcolor: colors.primary.main
                                }}>
                                  {getAsociacionIniciales(asociacion.nombre)}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                    {asociacion.nombre}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                    RFC: {asociacion.rfc}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={asociacion.codigo}
                                size="small"
                                sx={{
                                  bgcolor: '#e8f0fe',
                                  color: colors.primary.main,
                                  fontWeight: 600,
                                  fontSize: '0.75rem'
                                }}
                              />
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon sx={{ color: colors.text.secondary, fontSize: 16 }} />
                                <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                  {asociacion.region}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <PeopleIcon sx={{ color: colors.primary.main, fontSize: 16 }} />
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                    {asociacion.miembros_activos}/{asociacion.miembros_totales}
                                  </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  {Math.round((asociacion.miembros_activos / asociacion.miembros_totales) * 100)}% activos
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                <Typography variant="body2" sx={{
                                  fontWeight: 'bold',
                                  color: getCumplimientoColor(asociacion.cumplimiento)
                                }}>
                                  {asociacion.cumplimiento}%
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={asociacion.cumplimiento}
                                  sx={{
                                    width: '80%',
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: '#ecf0f1',
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: getCumplimientoColor(asociacion.cumplimiento),
                                      borderRadius: 3
                                    }
                                  }}
                                />
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={asociacion.estatus}
                                size="small"
                                sx={{
                                  bgcolor: getAsociacionEstatusBgColor(asociacion.estatus),
                                  color: getAsociacionEstatusColor(asociacion.estatus),
                                  fontWeight: 600,
                                  minWidth: 100
                                }}
                              />
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Typography variant="caption" sx={{
                                  fontWeight: 'medium',
                                  color: colors.primary.dark,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}>
                                  {asociacion.director}
                                </Typography>
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  {asociacion.telefono}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Stack direction="row" spacing={0.5} justifyContent="center">
                                <Tooltip title="Ver detalles">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.primary.main }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar asociación">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Cambiar estatus">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleToggleAsociacionStatus(asociacion.id_asociacion)}
                                    sx={{
                                      color: asociacion.estatus === 'Activa' ? colors.primary.dark :
                                        asociacion.estatus === 'Suspendida' ? colors.accents.blue : colors.secondary.main
                                    }}
                                  >
                                    {asociacion.estatus === 'Activa' ? <BlockIcon fontSize="small" /> :
                                      asociacion.estatus === 'Suspendida' ? <WarningIcon fontSize="small" /> :
                                        <CheckCircleIcon fontSize="small" />}
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {activeTab === 6 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="Todos"
                        variant="filled"
                        sx={{ bgcolor: colors.primary.main, color: 'white' }}
                        clickable
                      />
                      <Chip
                        label="Pendientes"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.dark, color: colors.primary.dark }}
                        clickable
                      />
                      <Chip
                        label="Asignados"
                        variant="outlined"
                        sx={{ borderColor: colors.accents.blue, color: colors.accents.blue }}
                        clickable
                      />
                      <Chip
                        label="En Revisión"
                        variant="outlined"
                        sx={{ borderColor: colors.secondary.main, color: colors.secondary.main }}
                        clickable
                      />
                      <Chip
                        label="Con Retraso"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.dark, color: colors.primary.dark }}
                        clickable
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Total: {filteredAgentesPendientes.length} agentes
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Pendientes: {filteredAgentesPendientes.filter(a => a.estatus_evaluacion === 'pendiente').length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Documentos: {filteredAgentesPendientes.reduce((acc, curr) => acc + curr.documentos_pendientes, 0)}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AssignmentTurnedInIcon />}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Asignar Masivamente
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar agente por nombre, email o región..."
                    value={searchAgentesPendientes}
                    onChange={(e) => setSearchAgentesPendientes(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Tabla de Agentes con Documentos Pendientes */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '5%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '20%' }}>Agente</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '12%' }}>Región</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }} align="center">Documentos Pendientes</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }} align="center">Fecha Subida</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }}>Evaluador Asignado</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '8%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredAgentesPendientes.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron agentes con documentos pendientes que coincidan con la búsqueda
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAgentesPendientes.map((agente) => (
                          <TableRow
                            key={agente.id_agente}
                            hover
                            sx={{
                              '&:hover': { bgcolor: '#f8f9fa' },
                              opacity: agente.estatus_evaluacion === 'pendiente' ? 1 : 0.9
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                #{agente.id_agente}
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                ID Usuario: {agente.id_usuario}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Avatar sx={{
                                  width: 36,
                                  height: 36,
                                  fontSize: '0.9rem',
                                  bgcolor: colors.primary.main,
                                  fontWeight: 'bold'
                                }}>
                                  {getAgenteIniciales(agente.nombre)}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                    {agente.nombre}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                                    {agente.email}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                    <PhoneIcon sx={{ fontSize: 12, color: colors.text.secondary }} />
                                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                      {agente.telefono}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocationOnIcon sx={{ fontSize: 14, color: colors.text.secondary }} />
                                <Typography variant="body2">{agente.region}</Typography>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                                  {agente.documentos_pendientes}
                                </Typography>
                                <Tooltip title={
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                      Documentos Pendientes:
                                    </Typography>
                                    {agente.documentos.map((doc, idx) => (
                                      <Typography key={idx} variant="caption" sx={{ display: 'block' }}>
                                        • {doc.tipo} ({doc.fecha})
                                      </Typography>
                                    ))}
                                  </Box>
                                }>
                                  <Chip
                                    label="Ver detalles"
                                    size="small"
                                    variant="outlined"
                                    sx={{ height: 20, fontSize: '0.65rem', borderColor: colors.primary.main, color: colors.primary.main }}
                                  />
                                </Tooltip>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <CalendarTodayIcon sx={{ color: colors.accents.purple, fontSize: 14 }} />
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                    {agente.fecha_subida}
                                  </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  Última actualización
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell>
                              {agente.evaluador_asignado ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <PersonIcon sx={{ color: colors.secondary.main, fontSize: 16 }} />
                                  <Typography variant="body2" sx={{ color: colors.primary.dark, fontWeight: 'medium' }}>
                                    {agente.evaluador_asignado}
                                  </Typography>
                                </Box>
                              ) : (
                                <Typography variant="body2" sx={{ color: colors.text.secondary, fontStyle: 'italic' }}>
                                  No asignado
                                </Typography>
                              )}
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={getEstatusEvaluacionText(agente.estatus_evaluacion)}
                                size="small"
                                sx={{
                                  bgcolor: getEstatusEvaluacionBgColor(agente.estatus_evaluacion),
                                  color: getEstatusEvaluacionColor(agente.estatus_evaluacion),
                                  fontWeight: 600,
                                  minWidth: 100
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              <Stack direction="row" spacing={0.5} justifyContent="center">
                                <Tooltip title="Ver documentos del agente">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.primary.main }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Asignar evaluador">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleAssignEvaluator(agente.id_agente)}
                                    sx={{ 
                                      color: agente.evaluador_asignado ? colors.accents.blue : colors.secondary.main,
                                      bgcolor: agente.evaluador_asignado ? '#e6f0ff' : '#e0f7f7',
                                      '&:hover': {
                                        bgcolor: agente.evaluador_asignado ? '#d0e6ff' : '#c0f0f0'
                                      }
                                    }}
                                  >
                                    <AssignmentIndIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Estadísticas de Agentes Pendientes */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f0fe' }}>
                      <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                        {filteredAgentesPendientes.filter(a => a.estatus_evaluacion === 'pendiente').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.primary.dark }}>
                        Sin Asignar
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e6f0ff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.blue, fontWeight: 'bold' }}>
                        {filteredAgentesPendientes.filter(a => a.estatus_evaluacion === 'asignado').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.blue }}>
                        Asignados
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7f7' }}>
                      <Typography variant="h6" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                        {filteredAgentesPendientes.filter(a => a.estatus_evaluacion === 'en_revision').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary.main }}>
                        En Revisión
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f0ebff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.purple, fontWeight: 'bold' }}>
                        {filteredAgentesPendientes.reduce((acc, curr) => acc + curr.documentos_pendientes, 0)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.purple }}>
                        Total Documentos
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Distribución por Región */}
                <Paper sx={{ p: 2, mt: 2, bgcolor: '#fafafa' }}>
                  <Typography variant="subtitle2" sx={{ color: colors.primary.dark, mb: 2, fontWeight: 'bold' }}>
                    Distribución de Agentes Pendientes por Región
                  </Typography>
                  <Grid container spacing={1}>
                    {Array.from(new Set(filteredAgentesPendientes.map(a => a.region))).map((region, index) => {
                      const count = filteredAgentesPendientes.filter(a => a.region === region).length;
                      const totalDocumentos = filteredAgentesPendientes
                        .filter(a => a.region === region)
                        .reduce((acc, curr) => acc + curr.documentos_pendientes, 0);
                      const percentage = Math.round((count / Math.max(filteredAgentesPendientes.length, 1)) * 100);
                      return (
                        <Grid item xs={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationOnIcon sx={{ color: colors.primary.main, fontSize: 16 }} />
                              <Box>
                                <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                  {region}
                                </Typography>
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  {totalDocumentos} documentos
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.main }}>
                                {count}
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                ({percentage}%)
                              </Typography>
                            </Box>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              mt: 0.5,
                              bgcolor: '#e0e0e0',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: colors.primary.main
                              }
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>

                {/* Tipos de Documentos Más Comunes */}
                <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
                  <Typography variant="subtitle2" sx={{ color: colors.primary.dark, mb: 2, fontWeight: 'bold' }}>
                    Tipos de Documentos Más Comunes Pendientes
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {['Carta de Antecedentes', 'Declaración Patrimonial', 'Certificación de Estudios', 
                          'Constancia de No Delitos Fiscales', 'Aviso de Retiro de SAT'].map((tipo, idx) => {
                          const count = filteredAgentesPendientes.reduce((acc, agente) => {
                            return acc + agente.documentos.filter(doc => doc.tipo === tipo).length;
                          }, 0);
                          return (
                            <Chip
                              key={idx}
                              label={`${tipo}: ${count}`}
                              size="small"
                              sx={{
                                bgcolor: getTipoBgColor(tipo),
                                color: getTipoColor(tipo),
                                fontWeight: 500
                              }}
                            />
                          );
                        })}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            )}

            {activeTab === 7 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label="Todos"
                        variant="filled"
                        sx={{ bgcolor: colors.primary.main, color: 'white' }}
                        clickable
                      />
                      <Chip
                        label="Activos"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        clickable
                      />
                      <Chip
                        label="Inactivos"
                        variant="outlined"
                        sx={{ borderColor: colors.text.secondary, color: colors.text.secondary }}
                        clickable
                      />
                      <Chip
                        label="Gremial"
                        variant="outlined"
                        sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        clickable
                      />
                      <Chip
                        label="Profesional"
                        variant="outlined"
                        sx={{ borderColor: colors.secondary.main, color: colors.secondary.main }}
                        clickable
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Total: {filteredNivelesReconocimiento.length} niveles
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Activas: {filteredNivelesReconocimiento.filter(n => n.estatus === 1).length}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nuevo Nivel
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar nivel de reconocimiento por nombre..."
                    value={searchNivelesReconocimiento}
                    onChange={(e) => setSearchNivelesReconocimiento(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    sx={{ maxWidth: 400 }}
                  />
                </Box>

                {/* Tabla de Niveles de Reconocimiento */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '5%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '30%' }}>Nombre del Nivel</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '45%' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredNivelesReconocimiento.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron niveles que coincidan con la búsqueda
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredNivelesReconocimiento.map((nivel) => (
                          <TableRow
                            key={nivel.id_nivel}
                            hover
                            sx={{
                              '&:hover': { bgcolor: '#f8f9fa' },
                              opacity: nivel.estatus === 0 ? 0.7 : 1
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                #{nivel.id_nivel}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {getNivelIcon(nivel.nombre_nivel)}
                                <Box>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                    {nivel.nombre_nivel}
                                  </Typography>
                                  <Chip
                                    label={getTipoReconocimiento(nivel.nombre_nivel)}
                                    size="small"
                                    sx={{
                                      bgcolor: getTipoReconocimientoBgColor(getTipoReconocimiento(nivel.nombre_nivel)),
                                      color: getTipoReconocimientoColor(getTipoReconocimiento(nivel.nombre_nivel)),
                                      fontSize: '0.65rem',
                                      height: 18,
                                      mt: 0.5
                                    }}
                                  />
                                </Box>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                {nivel.descripcion}
                              </Typography>
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={nivel.estatus === 1 ? "ACTIVO" : "INACTIVO"}
                                size="small"
                                sx={{
                                  bgcolor: nivel.estatus === 1 ? colors.secondary.main : colors.primary.dark,
                                  color: 'white',
                                  fontWeight: 600,
                                  minWidth: 80
                                }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              <Stack direction="row" spacing={0.5} justifyContent="center">
                                <Tooltip title="Ver detalles">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.primary.main }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar nivel">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title={nivel.estatus === 1 ? 'Desactivar' : 'Activar'}>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleToggleNivelStatus(nivel.id_nivel)}
                                    sx={{ color: nivel.estatus === 1 ? colors.primary.dark : colors.secondary.main }}
                                  >
                                    {nivel.estatus === 1 ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Estadísticas de Niveles de Reconocimiento */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f0fe' }}>
                      <Typography variant="h6" sx={{ color: colors.primary.main, fontWeight: 'bold' }}>
                        {filteredNivelesReconocimiento.filter(n => getTipoReconocimiento(n.nombre_nivel) === 'Gremial').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.primary.main }}>
                        Niveles Gremiales
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f0ebff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.purple, fontWeight: 'bold' }}>
                        {filteredNivelesReconocimiento.filter(n => getTipoReconocimiento(n.nombre_nivel) === 'Académico').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.purple }}>
                        Niveles Académicos
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7f7' }}>
                      <Typography variant="h6" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                        {filteredNivelesReconocimiento.filter(n => getTipoReconocimiento(n.nombre_nivel) === 'Profesional').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary.main }}>
                        Niveles Profesionales
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e6f0ff' }}>
                      <Typography variant="h6" sx={{ color: colors.accents.blue, fontWeight: 'bold' }}>
                        {filteredNivelesReconocimiento.filter(n => n.estatus === 1).length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.blue }}>
                        Activos
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Distribución por Nivel */}
                <Paper sx={{ p: 2, mt: 2, bgcolor: '#fafafa' }}>
                  <Typography variant="subtitle2" sx={{ color: colors.primary.dark, mb: 2, fontWeight: 'bold' }}>
                    Distribución por Nivel
                  </Typography>
                  <Grid container spacing={1}>
                    {Array.from(new Set(filteredNivelesReconocimiento.map(n => {
                      const nivelNum = n.nombre_nivel?.match(/Nivel (\w+)/i)?.[1];
                      return `Nivel ${nivelNum?.toUpperCase() || 'N/A'}`;
                    }))).map((nivel, index) => {
                      const count = filteredNivelesReconocimiento.filter(n => {
                        const nivelNum = n.nombre_nivel?.match(/Nivel (\w+)/i)?.[1];
                        return `Nivel ${nivelNum?.toUpperCase() || 'N/A'}` === nivel;
                      }).length;
                      const percentage = Math.round((count / Math.max(filteredNivelesReconocimiento.length, 1)) * 100);
                      return (
                        <Grid item xs={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getNivelIcon(nivel)}
                              <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                                {nivel}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: getNivelColor(nivel) }}>
                                {count}
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                ({percentage}%)
                              </Typography>
                            </Box>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              mt: 0.5,
                              bgcolor: '#e0e0e0',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getNivelColor(nivel)
                              }
                            }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>

                {/* Resumen de Tipos */}
                <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
                  <Typography variant="subtitle2" sx={{ color: colors.primary.dark, mb: 2, fontWeight: 'bold' }}>
                    Resumen por Tipo de Reconocimiento
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {Array.from(new Set(filteredNivelesReconocimiento.map(n => getTipoReconocimiento(n.nombre_nivel)))).map((tipo, idx) => {
                          const count = filteredNivelesReconocimiento.filter(n => getTipoReconocimiento(n.nombre_nivel) === tipo).length;
                          return (
                            <Chip
                              key={idx}
                              label={`${tipo}: ${count}`}
                              size="small"
                              sx={{
                                bgcolor: getTipoReconocimientoBgColor(tipo),
                                color: getTipoReconocimientoColor(tipo),
                                fontWeight: 500
                              }}
                            />
                          );
                        })}
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            )}

            {activeTab === 8 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Configuración de Umbrales del Semáforo */}
                <Paper sx={{ p: 2, bgcolor: '#f8f9fa', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 2 }}>
                    Configuración de Umbrales del Semáforo
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 2 }}>
                        Configure los porcentajes mínimos para cada nivel del semáforo de cumplimiento
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ px: 2 }}>
                        <Slider
                          value={[config.redThreshold, config.yellowThreshold, config.greenThreshold]}
                          onChange={(event, newValue) => {
                            handleSliderChange('redThreshold')(event, newValue[0]);
                            handleSliderChange('yellowThreshold')(event, newValue[1]);
                            handleSliderChange('greenThreshold')(event, newValue[2]);
                          }}
                          min={0}
                          max={100}
                          step={5}
                          valueLabelDisplay="auto"
                          disableSwap
                          sx={{
                            '& .MuiSlider-thumb': {
                              height: 20,
                              width: 20,
                              backgroundColor: '#fff',
                              border: '2px solid currentColor',
                              '&:focus, &:hover, &.Mui-active': {
                                boxShadow: 'inherit',
                              },
                            },
                            '& .MuiSlider-track': {
                              height: 8,
                              borderRadius: 4,
                            },
                            '& .MuiSlider-rail': {
                              height: 8,
                              borderRadius: 4,
                              opacity: 0.3,
                              backgroundColor: '#bfbfbf',
                            },
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f0fe' }}>
                            <ErrorIcon sx={{ color: colors.primary.dark, fontSize: 32, mb: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                              ROJO
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.primary.dark }}>
                              {'<'} {config.redThreshold}%
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e6f0ff' }}>
                            <WarningIcon sx={{ color: colors.accents.blue, fontSize: 32, mb: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: colors.accents.blue, fontWeight: 'bold' }}>
                              AMARILLO
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.accents.blue }}>
                              {config.redThreshold}% - {config.yellowThreshold}%
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7f7' }}>
                            <CheckCircleIcon sx={{ color: colors.secondary.main, fontSize: 32, mb: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                              VERDE
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.secondary.main }}>
                              {'>'} {config.yellowThreshold}%
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 3 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={config.autoRecalculation}
                            onChange={handleChange('autoRecalculation')}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: colors.primary.main,
                                '&:hover': {
                                  backgroundColor: '#e8f0fe',
                                },
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: colors.primary.main,
                              },
                            }}
                          />
                        }
                        label="Cálculo Automático del Semáforo"
                      />
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', ml: 4 }}>
                        Recalcula automáticamente el semáforo cuando cambian las certificaciones o declaraciones
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Vista Previa del Semáforo */}
                <Paper sx={{ p: 3, bgcolor: '#ffffff' }}>
                  <Typography variant="subtitle1" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 2 }}>
                    Vista Previa del Semáforo
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: colors.primary.dark,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1,
                        mx: 'auto'
                      }}>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                          {config.redThreshold}%
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                        ROJO
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Crítico
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: colors.accents.blue,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1,
                        mx: 'auto'
                      }}>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                          {config.yellowThreshold}%
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: colors.accents.blue, fontWeight: 'bold' }}>
                        AMARILLO
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Precaución
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                      <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: colors.secondary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1,
                        mx: 'auto'
                      }}>
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                          {config.greenThreshold}%
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                        VERDE
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Óptimo
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Diálogo para asignar evaluador */}
      <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AssignmentIndIcon sx={{ color: colors.primary.main }} />
            <Typography variant="h6" sx={{ color: colors.primary.dark }}>Asignar Evaluador</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAgent && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: colors.primary.dark, mb: 2 }}>
                Seleccione un evaluador para el agente:
              </Typography>
              
              <Box sx={{ mb: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ color: colors.primary.dark, mb: 1 }}>
                  Agente Seleccionado:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: colors.primary.main, fontSize: '0.9rem' }}>
                    {getAgenteIniciales(selectedAgent.nombre)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                      {selectedAgent.nombre}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      {selectedAgent.documentos_pendientes} documentos pendientes • {selectedAgent.region}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="evaluator-select-label" sx={{ color: colors.primary.main }}>Seleccionar Evaluador</InputLabel>
                <Select
                  labelId="evaluator-select-label"
                  value={selectedEvaluator}
                  label="Seleccionar Evaluador"
                  onChange={(e) => setSelectedEvaluator(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.main,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.dark,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.main,
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>Seleccionar evaluador...</em>
                  </MenuItem>
                  {evaluadoresDisponibles.map((evaluador, index) => (
                    <MenuItem key={index} value={evaluador}>
                      {evaluador}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mt: 3 }}>
                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                  Evaluadores disponibles: Miembros del comité con permiso para aprobar
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialogOpen(false)} sx={{ color: colors.text.secondary }}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmAssignment} 
            variant="contained"
            disabled={!selectedEvaluator}
            sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
          >
            Asignar Evaluador
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SystemConfig;