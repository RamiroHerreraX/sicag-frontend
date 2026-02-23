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
  InputLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel as MuiFormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge
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
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Close as CloseIcon,
  GroupAdd as GroupAddIcon
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
  },
  semaforo: {
    rojo: '#D32F2F',
    amarillo: '#FFC107',
    verde: '#388E3C'
  }
};

const SystemConfig = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedEvaluator, setSelectedEvaluator] = useState('');
  const [showCards, setShowCards] = useState(true);

  // Estados para los diálogos de creación y edición
  const [newCertificacionDialog, setNewCertificacionDialog] = useState(false);
  const [editCertificacionDialog, setEditCertificacionDialog] = useState(false);
  const [viewCertificacionDialog, setViewCertificacionDialog] = useState(false);

  const [newDeclaracionDialog, setNewDeclaracionDialog] = useState(false);
  const [editDeclaracionDialog, setEditDeclaracionDialog] = useState(false);
  const [viewDeclaracionDialog, setViewDeclaracionDialog] = useState(false);

  const [viewRolDialog, setViewRolDialog] = useState(false);

  const [newRegionDialog, setNewRegionDialog] = useState(false);
  const [editRegionDialog, setEditRegionDialog] = useState(false);
  const [viewRegionDialog, setViewRegionDialog] = useState(false);

  const [newComiteDialog, setNewComiteDialog] = useState(false);
  const [editComiteDialog, setEditComiteDialog] = useState(false);
  const [viewComiteDialog, setViewComiteDialog] = useState(false);

  const [newAsociacionDialog, setNewAsociacionDialog] = useState(false);
  const [editAsociacionDialog, setEditAsociacionDialog] = useState(false);
  const [viewAsociacionDialog, setViewAsociacionDialog] = useState(false);

  const [newNivelDialog, setNewNivelDialog] = useState(false);
  const [editNivelDialog, setEditNivelDialog] = useState(false);
  const [viewNivelDialog, setViewNivelDialog] = useState(false);

  const [assignAdvancedDialog, setAssignAdvancedDialog] = useState(false);

  // Estados para el elemento seleccionado
  const [selectedItem, setSelectedItem] = useState(null);

  // Estados para asignación avanzada
  const [selectedEvaluators, setSelectedEvaluators] = useState([]);

  // Estados para los nuevos registros
  const [newCertificacion, setNewCertificacion] = useState({
    nombre_certificacion: '',
    descripcion: '',
    tipo: 'Profesional',
    estatus: 1
  });

  const [newDeclaracion, setNewDeclaracion] = useState({
    nombre: '',
    articulo: '',
    descripcion: '',
    tipo: 'Obligatoria',
    estatus: 1,
    fecha_registro: new Date().toISOString().split('T')[0]
  });

  const [newRol, setNewRol] = useState({
    nombre: '',
    descripcion: '',
    nivel: 3,
    estatus: true
  });

  const [newRegion, setNewRegion] = useState({
    nombre_region: '',
    estado: '',
    pais: 'México',
    estatus: 1
  });

  const [newComite, setNewComite] = useState({
    id_usuario: '',
    nombre_usuario: '',
    cargo: 'Vocal',
    area: '',
    permiso_aprobar: 1,
    estatus: 1,
    fecha_ingreso: new Date().toISOString().split('T')[0]
  });

  const [newAsociacion, setNewAsociacion] = useState({
    codigo: '',
    nombre: '',
    rfc: '',
    region: '',
    miembros_activos: 0,
    miembros_totales: 0,
    cumplimiento: 0,
    estatus: 'Activa',
    fecha_registro: new Date().toISOString().split('T')[0],
    director: '',
    telefono: '',
    email: ''
  });

  const [newNivel, setNewNivel] = useState({
    nombre_nivel: '',
    descripcion: '',
    estatus: 1
  });

  const [config, setConfig] = useState({
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

  const [comite, setComite] = useState([
    {
      id_comite: 1,
      id_usuario: 101,
      nombre_usuario: 'Juan Pérez López',
      cargo: 'Presidente',
      area: 'Certificaciones',
      permiso_aprobar: 1,
      estatus: 1,
      fecha_ingreso: '2023-01-15',
      carga_trabajo_actual: 0
    },
    {
      id_comite: 2,
      id_usuario: 102,
      nombre_usuario: 'María González Sánchez',
      cargo: 'Secretario',
      area: 'Declaraciones',
      permiso_aprobar: 1,
      estatus: 1,
      fecha_ingreso: '2023-02-20',
      carga_trabajo_actual: 2
    },
    {
      id_comite: 3,
      id_usuario: 103,
      nombre_usuario: 'Carlos Rodríguez Martínez',
      cargo: 'Vocal',
      area: 'Revisión Técnica',
      permiso_aprobar: 1,
      estatus: 1,
      fecha_ingreso: '2023-03-10',
      carga_trabajo_actual: 1
    },
    {
      id_comite: 4,
      id_usuario: 104,
      nombre_usuario: 'Ana Patricia López',
      cargo: 'Vocal',
      area: 'Evaluación Documental',
      permiso_aprobar: 1,
      estatus: 1,
      fecha_ingreso: '2023-04-15',
      carga_trabajo_actual: 0
    }
  ]);

  const [certificaciones, setCertificaciones] = useState([
    {
      id_certificacion: 1,
      nombre_certificacion: 'Certificación en Gestión Aduanera',
      descripcion: 'Certificación para agentes aduanales en gestión y procedimientos aduaneros',
      tipo: 'Profesional',
      estatus: 1,
      fecha_creacion: '2023-01-10'
    },
    {
      id_certificacion: 2,
      nombre_certificacion: 'Certificación en Legislación Fiscal',
      descripcion: 'Capacitación en legislación fiscal y obligaciones tributarias',
      tipo: 'Especialización',
      estatus: 1,
      fecha_creacion: '2023-02-15'
    },
    {
      id_certificacion: 3,
      nombre_certificacion: 'Certificación en Comercio Exterior',
      descripcion: 'Formación en procedimientos de comercio exterior y logística internacional',
      tipo: 'Profesional',
      estatus: 1,
      fecha_creacion: '2023-03-20'
    },
    {
      id_certificacion: 4,
      nombre_certificacion: 'Certificación en Valoración Aduanera',
      descripcion: 'Especialización en valoración de mercancías y aranceles',
      tipo: 'Especialización',
      estatus: 1,
      fecha_creacion: '2023-04-05'
    },
    {
      id_certificacion: 5,
      nombre_certificacion: 'Certificación Básica Aduanal',
      descripcion: 'Certificación inicial para nuevos agentes aduanales',
      tipo: 'Básica',
      estatus: 0,
      fecha_creacion: '2023-01-25'
    },
    {
      id_certificacion: 6,
      nombre_certificacion: 'Certificación en Auditoría Aduanera',
      descripcion: 'Formación en procedimientos de auditoría y fiscalización aduanera',
      tipo: 'Avanzada',
      estatus: 1,
      fecha_creacion: '2023-06-12'
    }
  ]);

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
    },
    {
      id_agente: 9,
      id_usuario: 209,
      nombre: 'Gabriela Torres',
      email: 'gabriela@ejemplo.com',
      region: 'Norte',
      telefono: '+52 81 9876 5432',
      documentos_pendientes: 2,
      fecha_subida: '07/01/2026',
      documentos: [
        { tipo: 'Carta de Antecedentes', fecha: '03/01/2026', estado: 'Pendiente' },
        { tipo: 'Declaración Patrimonial', fecha: '05/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: null,
      estatus_evaluacion: 'pendiente'
    },
    {
      id_agente: 10,
      id_usuario: 210,
      nombre: 'Javier Mendoza',
      email: 'javier@ejemplo.com',
      region: 'Centro',
      telefono: '+52 55 4444 3333',
      documentos_pendientes: 3,
      fecha_subida: '06/01/2026',
      documentos: [
        { tipo: 'Certificación de Estudios', fecha: '02/01/2026', estado: 'Pendiente' },
        { tipo: 'Constancia de No Delitos Fiscales', fecha: '04/01/2026', estado: 'Pendiente' },
        { tipo: 'Aviso de Retiro de SAT', fecha: '05/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: null,
      estatus_evaluacion: 'pendiente'
    },
    {
      id_agente: 11,
      id_usuario: 211,
      nombre: 'Sofía Ramírez',
      email: 'sofia@ejemplo.com',
      region: 'Noroeste',
      telefono: '+52 664 1234 5678',
      documentos_pendientes: 1,
      fecha_subida: '05/01/2026',
      documentos: [
        { tipo: 'Declaración Patrimonial', fecha: '02/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: null,
      estatus_evaluacion: 'pendiente'
    },
    {
      id_agente: 12,
      id_usuario: 212,
      nombre: 'Miguel Ángel Castro',
      email: 'miguel@ejemplo.com',
      region: 'Golfo',
      telefono: '+52 229 9876 5432',
      documentos_pendientes: 3,
      fecha_subida: '04/01/2026',
      documentos: [
        { tipo: 'Carta de Antecedentes', fecha: '01/01/2026', estado: 'Pendiente' },
        { tipo: 'Certificación de Estudios', fecha: '02/01/2026', estado: 'Pendiente' },
        { tipo: 'Aviso de Retiro de SAT', fecha: '03/01/2026', estado: 'Pendiente' }
      ],
      evaluador_asignado: null,
      estatus_evaluacion: 'pendiente'
    },
    {
      id_agente: 13,
      id_usuario: 213,
      nombre: 'Patricia Núñez',
      email: 'patricia@ejemplo.com',
      region: 'Centro Occidente',
      telefono: '+52 477 8765 4321',
      documentos_pendientes: 2,
      fecha_subida: '03/01/2026',
      documentos: [
        { tipo: 'Declaración Patrimonial', fecha: '30/12/2025', estado: 'Pendiente' },
        { tipo: 'Constancia de No Delitos Fiscales', fecha: '02/01/2026', estado: 'Pendiente' }
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

  // Estados para filtros por estatus
  const [filterEstatusCertificaciones, setFilterEstatusCertificaciones] = useState('todos');
  const [filterEstatusDeclaraciones, setFilterEstatusDeclaraciones] = useState('todos');
  const [filterEstatusRoles, setFilterEstatusRoles] = useState('todos');
  const [filterEstatusRegiones, setFilterEstatusRegiones] = useState('todos');
  const [filterEstatusComite, setFilterEstatusComite] = useState('todos');
  const [filterEstatusNiveles, setFilterEstatusNiveles] = useState('todos');
  const [filterEstatusAsociaciones, setFilterEstatusAsociaciones] = useState('todos');
  const [filterEstatusAgentes, setFilterEstatusAgentes] = useState('todos');

  // Filtrar certificaciones
  const filteredCertificaciones = certificaciones.filter(cert => {
    const matchesSearch = cert.nombre_certificacion.toLowerCase().includes(searchCertificaciones.toLowerCase()) ||
      cert.descripcion.toLowerCase().includes(searchCertificaciones.toLowerCase()) ||
      cert.tipo.toLowerCase().includes(searchCertificaciones.toLowerCase());

    let matchesEstatus = true;
    if (filterEstatusCertificaciones === 'activos') {
      matchesEstatus = cert.estatus === 1;
    } else if (filterEstatusCertificaciones === 'inactivos') {
      matchesEstatus = cert.estatus === 0;
    } else if (filterEstatusCertificaciones === 'profesional') {
      matchesEstatus = cert.tipo === 'Profesional';
    } else if (filterEstatusCertificaciones === 'especializacion') {
      matchesEstatus = cert.tipo === 'Especialización';
    } else if (filterEstatusCertificaciones === 'basica') {
      matchesEstatus = cert.tipo === 'Básica';
    } else if (filterEstatusCertificaciones === 'avanzada') {
      matchesEstatus = cert.tipo === 'Avanzada';
    }

    return matchesSearch && matchesEstatus;
  });

  // Filtrar declaraciones
  const filteredDeclaraciones = declaraciones.filter(dec => {
    const matchesSearch = dec.nombre.toLowerCase().includes(searchDeclaraciones.toLowerCase()) ||
      dec.articulo.toLowerCase().includes(searchDeclaraciones.toLowerCase()) ||
      dec.tipo.toLowerCase().includes(searchDeclaraciones.toLowerCase());

    let matchesEstatus = true;
    if (filterEstatusDeclaraciones === 'activos') {
      matchesEstatus = dec.estatus === 1;
    } else if (filterEstatusDeclaraciones === 'inactivos') {
      matchesEstatus = dec.estatus === 0;
    } else if (filterEstatusDeclaraciones === 'obligatoria') {
      matchesEstatus = dec.tipo === 'Obligatoria';
    } else if (filterEstatusDeclaraciones === 'anual') {
      matchesEstatus = dec.tipo === 'Anual';
    } else if (filterEstatusDeclaraciones === 'requisito') {
      matchesEstatus = dec.tipo === 'Requisito';
    } else if (filterEstatusDeclaraciones === 'complementaria') {
      matchesEstatus = dec.tipo === 'Complementaria';
    }

    return matchesSearch && matchesEstatus;
  });

  // Filtrar roles
  const filteredRoles = roles.filter(rol => {
    const matchesSearch = rol.nombre.toLowerCase().includes(searchRoles.toLowerCase()) ||
      rol.descripcion.toLowerCase().includes(searchRoles.toLowerCase());

    let matchesEstatus = true;
    if (filterEstatusRoles === 'activos') {
      matchesEstatus = rol.estatus === true;
    } else if (filterEstatusRoles === 'inactivos') {
      matchesEstatus = rol.estatus === false;
    }

    return matchesSearch && matchesEstatus;
  });

  // Filtrar regiones
  const filteredRegiones = regiones.filter(region => {
    const matchesSearch = region.nombre_region.toLowerCase().includes(searchRegiones.toLowerCase()) ||
      region.estado.toLowerCase().includes(searchRegiones.toLowerCase());

    let matchesEstatus = true;
    if (filterEstatusRegiones === 'activos') {
      matchesEstatus = region.estatus === 1;
    } else if (filterEstatusRegiones === 'inactivos') {
      matchesEstatus = region.estatus === 0;
    }

    return matchesSearch && matchesEstatus;
  });

  // Filtrar comité
  const filteredComite = comite.filter(miembro => {
    const matchesSearch = miembro.nombre_usuario.toLowerCase().includes(searchComite.toLowerCase()) ||
      miembro.cargo.toLowerCase().includes(searchComite.toLowerCase()) ||
      miembro.area.toLowerCase().includes(searchComite.toLowerCase());

    let matchesEstatus = true;
    if (filterEstatusComite === 'activos') {
      matchesEstatus = miembro.estatus === 1;
    } else if (filterEstatusComite === 'inactivos') {
      matchesEstatus = miembro.estatus === 0;
    } else if (filterEstatusComite === 'permiso') {
      matchesEstatus = miembro.permiso_aprobar === 1;
    }

    return matchesSearch && matchesEstatus;
  });

  // Filtrar niveles de reconocimiento
  const filteredNivelesReconocimiento = nivelesReconocimiento.filter(nivel => {
    const matchesSearch = nivel.nombre_nivel.toLowerCase().includes(searchNivelesReconocimiento.toLowerCase()) ||
      nivel.descripcion.toLowerCase().includes(searchNivelesReconocimiento.toLowerCase());

    let matchesEstatus = true;
    if (filterEstatusNiveles === 'activos') {
      matchesEstatus = nivel.estatus === 1;
    } else if (filterEstatusNiveles === 'inactivos') {
      matchesEstatus = nivel.estatus === 0;
    } else if (filterEstatusNiveles === 'gremial') {
      matchesEstatus = nivel.nombre_nivel.includes('Gremial');
    } else if (filterEstatusNiveles === 'academico') {
      matchesEstatus = nivel.nombre_nivel.includes('Académico');
    } else if (filterEstatusNiveles === 'profesional') {
      matchesEstatus = nivel.nombre_nivel.includes('Profesional');
    }

    return matchesSearch && matchesEstatus;
  });

  // Filtrar asociaciones
  const filteredAsociaciones = asociaciones.filter(asoc => {
    const matchesSearch = asoc.nombre.toLowerCase().includes(searchAsociaciones.toLowerCase()) ||
      asoc.codigo.toLowerCase().includes(searchAsociaciones.toLowerCase()) ||
      asoc.region.toLowerCase().includes(searchAsociaciones.toLowerCase());

    let matchesEstatus = true;
    if (filterEstatusAsociaciones === 'activas') {
      matchesEstatus = asoc.estatus === 'Activa';
    } else if (filterEstatusAsociaciones === 'suspendidas') {
      matchesEstatus = asoc.estatus === 'Suspendida';
    } else if (filterEstatusAsociaciones === 'revision') {
      matchesEstatus = asoc.estatus === 'En Revisión';
    } else if (filterEstatusAsociaciones === 'alto') {
      matchesEstatus = asoc.cumplimiento >= 95;
    }

    return matchesSearch && matchesEstatus;
  });

  // Filtrar agentes pendientes
  const filteredAgentesPendientes = agentesPendientes.filter(agente => {
    const matchesSearch = agente.nombre.toLowerCase().includes(searchAgentesPendientes.toLowerCase()) ||
      agente.email.toLowerCase().includes(searchAgentesPendientes.toLowerCase()) ||
      agente.region.toLowerCase().includes(searchAgentesPendientes.toLowerCase());

    let matchesEstatus = true;
    if (filterEstatusAgentes === 'pendientes') {
      matchesEstatus = agente.estatus_evaluacion === 'pendiente';
    } else if (filterEstatusAgentes === 'asignados') {
      matchesEstatus = agente.estatus_evaluacion === 'asignado';
    } else if (filterEstatusAgentes === 'revision') {
      matchesEstatus = agente.estatus_evaluacion === 'en_revision';
    }

    return matchesSearch && matchesEstatus;
  });

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

    // Actualizar carga de trabajo del evaluador
    setComite(comite.map(miembro =>
      miembro.nombre_usuario === selectedEvaluator
        ? { ...miembro, carga_trabajo_actual: miembro.carga_trabajo_actual + 1 }
        : miembro
    ));

    setAssignDialogOpen(false);
    setSelectedAgent(null);
    setSelectedEvaluator('');
  };

  // Funciones para crear nuevos registros
  const handleCreateCertificacion = () => {
    if (!newCertificacion.nombre_certificacion || !newCertificacion.descripcion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const newId = Math.max(...certificaciones.map(c => c.id_certificacion)) + 1;
    const certificacionToAdd = {
      ...newCertificacion,
      id_certificacion: newId,
      fecha_creacion: new Date().toISOString().split('T')[0]
    };

    setCertificaciones([...certificaciones, certificacionToAdd]);
    setNewCertificacionDialog(false);
    setNewCertificacion({
      nombre_certificacion: '',
      descripcion: '',
      tipo: 'Profesional',
      estatus: 1
    });
  };

  const handleCreateDeclaracion = () => {
    if (!newDeclaracion.nombre || !newDeclaracion.articulo || !newDeclaracion.descripcion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const newId = Math.max(...declaraciones.map(d => d.id_declaracion)) + 1;
    const declaracionToAdd = {
      ...newDeclaracion,
      id_declaracion: newId,
      fecha_registro: new Date().toISOString().split('T')[0]
    };

    setDeclaraciones([...declaraciones, declaracionToAdd]);
    setNewDeclaracionDialog(false);
    setNewDeclaracion({
      nombre: '',
      articulo: '',
      descripcion: '',
      tipo: 'Obligatoria',
      estatus: 1,
      fecha_registro: new Date().toISOString().split('T')[0]
    });
  };

  const handleCreateRegion = () => {
    if (!newRegion.nombre_region || !newRegion.estado || !newRegion.pais) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const newId = Math.max(...regiones.map(r => r.id_region)) + 1;
    setRegiones([...regiones, { ...newRegion, id_region: newId }]);
    setNewRegionDialog(false);
    setNewRegion({
      nombre_region: '',
      estado: '',
      pais: 'México',
      estatus: 1
    });
  };

  const handleCreateComite = () => {
    if (!newComite.nombre_usuario || !newComite.area) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const newId = Math.max(...comite.map(c => c.id_comite)) + 1;
    const newIdUsuario = Math.max(...comite.map(c => c.id_usuario)) + 1;
    setComite([...comite, {
      ...newComite,
      id_comite: newId,
      id_usuario: newIdUsuario,
      carga_trabajo_actual: 0
    }]);
    setNewComiteDialog(false);
    setNewComite({
      id_usuario: '',
      nombre_usuario: '',
      cargo: 'Vocal',
      area: '',
      permiso_aprobar: 1,
      estatus: 1,
      fecha_ingreso: new Date().toISOString().split('T')[0]
    });
  };

  const handleCreateAsociacion = () => {
    if (!newAsociacion.nombre || !newAsociacion.rfc || !newAsociacion.region || !newAsociacion.director) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const newId = Math.max(...asociaciones.map(a => a.id_asociacion)) + 1;
    const newCodigo = `ASOC-${newId.toString().padStart(3, '0')}`;
    setAsociaciones([...asociaciones, {
      ...newAsociacion,
      id_asociacion: newId,
      codigo: newCodigo
    }]);
    setNewAsociacionDialog(false);
    setNewAsociacion({
      codigo: '',
      nombre: '',
      rfc: '',
      region: '',
      miembros_activos: 0,
      miembros_totales: 0,
      cumplimiento: 0,
      estatus: 'Activa',
      fecha_registro: new Date().toISOString().split('T')[0],
      director: '',
      telefono: '',
      email: ''
    });
  };

  const handleCreateNivel = () => {
    if (!newNivel.nombre_nivel || !newNivel.descripcion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const newId = Math.max(...nivelesReconocimiento.map(n => n.id_nivel)) + 1;
    setNivelesReconocimiento([...nivelesReconocimiento, { ...newNivel, id_nivel: newId }]);
    setNewNivelDialog(false);
    setNewNivel({
      nombre_nivel: '',
      descripcion: '',
      estatus: 1
    });
  };

  // Funciones para editar registros
  const handleEditCertificacion = () => {
    setCertificaciones(certificaciones.map(cert =>
      cert.id_certificacion === selectedItem.id_certificacion ? selectedItem : cert
    ));
    setEditCertificacionDialog(false);
    setSelectedItem(null);
  };

  const handleEditDeclaracion = () => {
    setDeclaraciones(declaraciones.map(dec =>
      dec.id_declaracion === selectedItem.id_declaracion ? selectedItem : dec
    ));
    setEditDeclaracionDialog(false);
    setSelectedItem(null);
  };

  const handleEditRegion = () => {
    setRegiones(regiones.map(region =>
      region.id_region === selectedItem.id_region ? selectedItem : region
    ));
    setEditRegionDialog(false);
    setSelectedItem(null);
  };

  const handleEditComite = () => {
    setComite(comite.map(miembro =>
      miembro.id_comite === selectedItem.id_comite ? selectedItem : miembro
    ));
    setEditComiteDialog(false);
    setSelectedItem(null);
  };

  const handleEditAsociacion = () => {
    setAsociaciones(asociaciones.map(asoc =>
      asoc.id_asociacion === selectedItem.id_asociacion ? selectedItem : asoc
    ));
    setEditAsociacionDialog(false);
    setSelectedItem(null);
  };

  const handleEditNivel = () => {
    setNivelesReconocimiento(nivelesReconocimiento.map(nivel =>
      nivel.id_nivel === selectedItem.id_nivel ? selectedItem : nivel
    ));
    setEditNivelDialog(false);
    setSelectedItem(null);
  };

  // Función para asignación avanzada simplificada
  const handleOpenAdvancedAssignment = () => {
    // Resetear estados
    setSelectedEvaluators([]);
    setAssignAdvancedDialog(true);
  };

  const handleToggleEvaluator = (evaluatorName) => {
    setSelectedEvaluators(prev => {
      if (prev.includes(evaluatorName)) {
        return prev.filter(e => e !== evaluatorName);
      } else {
        return [...prev, evaluatorName];
      }
    });
  };

  const handleConfirmAdvancedAssignment = () => {
    if (selectedEvaluators.length === 0) {
      alert('Por favor seleccione al menos un evaluador');
      return;
    }

    // Obtener todos los agentes pendientes
    const agentsToAssign = agentesPendientes.filter(a => a.estatus_evaluacion === 'pendiente');

    if (agentsToAssign.length === 0) {
      alert('No hay agentes pendientes para asignar');
      return;
    }

    // Distribución equitativa
    const baseCount = Math.floor(agentsToAssign.length / selectedEvaluators.length);
    const remainder = agentsToAssign.length % selectedEvaluators.length;

    const assignments = selectedEvaluators.map((evaluator, index) => ({
      evaluator,
      cantidad: index < remainder ? baseCount + 1 : baseCount
    }));

    // Crear copia de agentes
    let agentsCopy = [...agentesPendientes];
    let agentIndex = 0;

    // Asignar agentes según configuración
    assignments.forEach(({ evaluator, cantidad }) => {
      for (let i = 0; i < cantidad; i++) {
        if (agentIndex < agentsToAssign.length) {
          const agentId = agentsToAssign[agentIndex].id_agente;
          agentsCopy = agentsCopy.map(agente =>
            agente.id_agente === agentId
              ? {
                ...agente,
                evaluador_asignado: evaluator,
                estatus_evaluacion: 'asignado'
              }
              : agente
          );
          agentIndex++;
        }
      }
    });

    // Actualizar carga de trabajo de evaluadores
    const newComite = comite.map(miembro => {
      const asignacion = assignments.find(a => a.evaluator === miembro.nombre_usuario);
      if (asignacion) {
        return {
          ...miembro,
          carga_trabajo_actual: miembro.carga_trabajo_actual + asignacion.cantidad
        };
      }
      return miembro;
    });

    setAgentesPendientes(agentsCopy);
    setComite(newComite);
    setAssignAdvancedDialog(false);
  };

  const evaluadoresDisponibles = filteredComite
    .filter(miembro => miembro.estatus === 1 && miembro.permiso_aprobar === 1)
    .map(miembro => miembro.nombre_usuario);

  // Función para resetear filtros
  const resetFilters = (section) => {
    switch (section) {
      case 'certificaciones':
        setSearchCertificaciones('');
        setFilterEstatusCertificaciones('todos');
        break;
      case 'declaraciones':
        setSearchDeclaraciones('');
        setFilterEstatusDeclaraciones('todos');
        break;
      case 'roles':
        setSearchRoles('');
        setFilterEstatusRoles('todos');
        break;
      case 'regiones':
        setSearchRegiones('');
        setFilterEstatusRegiones('todos');
        break;
      case 'comite':
        setSearchComite('');
        setFilterEstatusComite('todos');
        break;
      case 'niveles':
        setSearchNivelesReconocimiento('');
        setFilterEstatusNiveles('todos');
        break;
      case 'asociaciones':
        setSearchAsociaciones('');
        setFilterEstatusAsociaciones('todos');
        break;
      case 'agentes':
        setSearchAgentesPendientes('');
        setFilterEstatusAgentes('todos');
        break;
      default:
        break;
    }
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

  // Funciones auxiliares
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

  const getTipoReconocimiento = (nombre) => {
    if (nombre?.includes('Gremial')) return 'Gremial';
    if (nombre?.includes('Académico')) return 'Académico';
    if (nombre?.includes('Profesional')) return 'Profesional';
    return 'General';
  };

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

  const getCumplimientoColor = (porcentaje) => {
    if (porcentaje >= 95) return colors.secondary.main;
    if (porcentaje >= 90) return colors.accents.blue;
    return colors.primary.dark;
  };

  const getAsociacionIniciales = (nombre) => {
    return nombre
      .split(' ')
      .filter(word => word.length > 0 && word[0].toUpperCase() === word[0])
      .map(word => word[0])
      .join('')
      .substring(0, 2);
  };

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

  const getAgenteIniciales = (nombre) => {
    return nombre
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

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
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            mb: 2,
            width: '100%',
            '@media (max-width: 1200px)': {
              gridTemplateColumns: 'repeat(2, 1fr)',
            },
            '@media (max-width: 600px)': {
              gridTemplateColumns: '1fr',
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
            {/* Certificaciones */}
            {activeTab === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label="Todos"
                        variant={filterEstatusCertificaciones === 'todos' ? "filled" : "outlined"}
                        sx={filterEstatusCertificaciones === 'todos' ?
                          { bgcolor: colors.primary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.main, color: colors.primary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusCertificaciones('todos')}
                      />
                      <Chip
                        label="Activos"
                        variant={filterEstatusCertificaciones === 'activos' ? "filled" : "outlined"}
                        sx={filterEstatusCertificaciones === 'activos' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusCertificaciones('activos')}
                      />
                      <Chip
                        label="Inactivos"
                        variant={filterEstatusCertificaciones === 'inactivos' ? "filled" : "outlined"}
                        sx={filterEstatusCertificaciones === 'inactivos' ?
                          { bgcolor: colors.primary.dark, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.dark, color: colors.primary.dark, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusCertificaciones('inactivos')}
                      />
                      <Chip
                        label="Profesional"
                        variant={filterEstatusCertificaciones === 'profesional' ? "filled" : "outlined"}
                        sx={filterEstatusCertificaciones === 'profesional' ?
                          { bgcolor: colors.primary.dark, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.dark, color: colors.primary.dark, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusCertificaciones('profesional')}
                      />
                      <Chip
                        label="Especialización"
                        variant={filterEstatusCertificaciones === 'especializacion' ? "filled" : "outlined"}
                        sx={filterEstatusCertificaciones === 'especializacion' ?
                          { bgcolor: colors.accents.purple, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.accents.purple, color: colors.accents.purple, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusCertificaciones('especializacion')}
                      />
                      <Chip
                        label="Básica"
                        variant={filterEstatusCertificaciones === 'basica' ? "filled" : "outlined"}
                        sx={filterEstatusCertificaciones === 'basica' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusCertificaciones('basica')}
                      />
                      <Chip
                        label="Avanzada"
                        variant={filterEstatusCertificaciones === 'avanzada' ? "filled" : "outlined"}
                        sx={filterEstatusCertificaciones === 'avanzada' ?
                          { bgcolor: colors.accents.blue, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.accents.blue, color: colors.accents.blue, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusCertificaciones('avanzada')}
                      />
                      {(searchCertificaciones || filterEstatusCertificaciones !== 'todos') && (
                        <Chip
                          label="Limpiar filtros"
                          variant="outlined"
                          icon={<CloseIcon />}
                          onClick={() => resetFilters('certificaciones')}
                          sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Mostrando: {filteredCertificaciones.length} de {certificaciones.length} certificaciones
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setNewCertificacionDialog(true)}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nueva Certificación
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar certificación por nombre, descripción o tipo..."
                    value={searchCertificaciones}
                    onChange={(e) => setSearchCertificaciones(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchCertificaciones && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchCertificaciones('')}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    size="small"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Tabla de Certificaciones */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '5%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '25%' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '40%' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '12%' }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '8%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCertificaciones.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron certificaciones que coincidan con los filtros
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => resetFilters('certificaciones')}
                              sx={{ mt: 1, color: colors.primary.main }}
                            >
                              Limpiar filtros
                            </Button>
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
                                }}
                              />
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
                                    onClick={() => {
                                      setSelectedItem(cert);
                                      setViewCertificacionDialog(true);
                                    }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar certificación">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                    onClick={() => {
                                      setSelectedItem({ ...cert });
                                      setEditCertificacionDialog(true);
                                    }}
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
                  <Grid item xs={4}>
                    <Paper
                      sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f0fe', cursor: 'pointer' }}
                      onClick={() => {
                        setFilterEstatusCertificaciones('profesional');
                        setSearchCertificaciones('');
                      }}
                    >
                      <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                        {certificaciones.filter(c => c.tipo === 'Profesional').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.primary.dark }}>
                        Profesionales
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper
                      sx={{ p: 2, textAlign: 'center', bgcolor: '#f0ebff', cursor: 'pointer' }}
                      onClick={() => {
                        setFilterEstatusCertificaciones('especializacion');
                        setSearchCertificaciones('');
                      }}
                    >
                      <Typography variant="h6" sx={{ color: colors.accents.purple, fontWeight: 'bold' }}>
                        {certificaciones.filter(c => c.tipo === 'Especialización').length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.accents.purple }}>
                        Especializaciones
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper
                      sx={{ p: 2, textAlign: 'center', bgcolor: '#e0f7f7', cursor: 'pointer' }}
                      onClick={() => {
                        setFilterEstatusCertificaciones('activos');
                        setSearchCertificaciones('');
                      }}
                    >
                      <Typography variant="h6" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                        {certificaciones.filter(c => c.estatus === 1).length}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.secondary.main }}>
                        Activas
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Declaraciones */}
            {activeTab === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label="Todos"
                        variant={filterEstatusDeclaraciones === 'todos' ? "filled" : "outlined"}
                        sx={filterEstatusDeclaraciones === 'todos' ?
                          { bgcolor: colors.primary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.main, color: colors.primary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusDeclaraciones('todos')}
                      />
                      <Chip
                        label="Activos"
                        variant={filterEstatusDeclaraciones === 'activos' ? "filled" : "outlined"}
                        sx={filterEstatusDeclaraciones === 'activos' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusDeclaraciones('activos')}
                      />
                      <Chip
                        label="Inactivos"
                        variant={filterEstatusDeclaraciones === 'inactivos' ? "filled" : "outlined"}
                        sx={filterEstatusDeclaraciones === 'inactivos' ?
                          { bgcolor: colors.primary.dark, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.dark, color: colors.primary.dark, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusDeclaraciones('inactivos')}
                      />
                      <Chip
                        label="Obligatorias"
                        variant={filterEstatusDeclaraciones === 'obligatoria' ? "filled" : "outlined"}
                        sx={filterEstatusDeclaraciones === 'obligatoria' ?
                          { bgcolor: colors.primary.dark, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.dark, color: colors.primary.dark, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusDeclaraciones('obligatoria')}
                      />
                      <Chip
                        label="Anuales"
                        variant={filterEstatusDeclaraciones === 'anual' ? "filled" : "outlined"}
                        sx={filterEstatusDeclaraciones === 'anual' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusDeclaraciones('anual')}
                      />
                      <Chip
                        label="Requisitos"
                        variant={filterEstatusDeclaraciones === 'requisito' ? "filled" : "outlined"}
                        sx={filterEstatusDeclaraciones === 'requisito' ?
                          { bgcolor: colors.accents.purple, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.accents.purple, color: colors.accents.purple, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusDeclaraciones('requisito')}
                      />
                      <Chip
                        label="Complementarias"
                        variant={filterEstatusDeclaraciones === 'complementaria' ? "filled" : "outlined"}
                        sx={filterEstatusDeclaraciones === 'complementaria' ?
                          { bgcolor: colors.accents.blue, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.accents.blue, color: colors.accents.blue, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusDeclaraciones('complementaria')}
                      />
                      {(searchDeclaraciones || filterEstatusDeclaraciones !== 'todos') && (
                        <Chip
                          label="Limpiar filtros"
                          variant="outlined"
                          icon={<CloseIcon />}
                          onClick={() => resetFilters('declaraciones')}
                          sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Mostrando: {filteredDeclaraciones.length} de {declaraciones.length} declaraciones
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setNewDeclaracionDialog(true)}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nueva Declaración
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar declaración por nombre, artículo o tipo..."
                    value={searchDeclaraciones}
                    onChange={(e) => setSearchDeclaraciones(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchDeclaraciones && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchDeclaraciones('')}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    size="small"
                    sx={{ maxWidth: 500 }}
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
                              No se encontraron declaraciones que coincidan con los filtros
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => resetFilters('declaraciones')}
                              sx={{ mt: 1, color: colors.primary.main }}
                            >
                              Limpiar filtros
                            </Button>
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
                                    onClick={() => {
                                      setSelectedItem(declaracion);
                                      setViewDeclaracionDialog(true);
                                    }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar declaración">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                    onClick={() => {
                                      setSelectedItem({ ...declaracion });
                                      setEditDeclaracionDialog(true);
                                    }}
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
              </Box>
            )}

            {/* Roles */}
            {activeTab === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Header informativo */}
                <Alert severity="info" sx={{ mb: 2 }}>
                  Los roles del sistema son configurables únicamente por el Super Administrador.
                  Como Administrador, usted puede consultar los roles disponibles y asignarlos
                  a los usuarios del sistema.
                </Alert>

                {/* Filtros y búsqueda (solo para consulta) */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                      Mostrando: {filteredRoles.length} de {roles.length} roles
                    </Typography>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar rol por nombre o descripción..."
                    value={searchRoles}
                    onChange={(e) => setSearchRoles(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchRoles && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchRoles('')}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    size="small"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Tabla de Roles - SOLO VISUALIZACIÓN Y ASIGNACIÓN */}
                <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '25%' }}>Nombre del Rol</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '40%' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Nivel</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Estatus</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRoles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron roles que coincidan con los filtros
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
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Regiones */}
            {activeTab === 3 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label="Todos"
                        variant={filterEstatusRegiones === 'todos' ? "filled" : "outlined"}
                        sx={filterEstatusRegiones === 'todos' ?
                          { bgcolor: colors.primary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.main, color: colors.primary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusRegiones('todos')}
                      />
                      <Chip
                        label="Activas"
                        variant={filterEstatusRegiones === 'activos' ? "filled" : "outlined"}
                        sx={filterEstatusRegiones === 'activos' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusRegiones('activos')}
                      />
                      <Chip
                        label="Inactivas"
                        variant={filterEstatusRegiones === 'inactivos' ? "filled" : "outlined"}
                        sx={filterEstatusRegiones === 'inactivos' ?
                          { bgcolor: colors.primary.dark, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.dark, color: colors.primary.dark, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusRegiones('inactivos')}
                      />
                      {(searchRegiones || filterEstatusRegiones !== 'todos') && (
                        <Chip
                          label="Limpiar filtros"
                          variant="outlined"
                          icon={<CloseIcon />}
                          onClick={() => resetFilters('regiones')}
                          sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Mostrando: {filteredRegiones.length} de {regiones.length} regiones
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setNewRegionDialog(true)}
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
                      endAdornment: searchRegiones && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchRegiones('')}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    size="small"
                    sx={{ maxWidth: 500 }}
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
                      {filteredRegiones.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron regiones que coincidan con los filtros
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => resetFilters('regiones')}
                              sx={{ mt: 1, color: colors.primary.main }}
                            >
                              Limpiar filtros
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRegiones.map((region) => (
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
                                    onClick={() => {
                                      setSelectedItem(region);
                                      setViewRegionDialog(true);
                                    }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar región">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                    onClick={() => {
                                      setSelectedItem({ ...region });
                                      setEditRegionDialog(true);
                                    }}
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
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {/* Comité */}
            {activeTab === 4 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label="Todos"
                        variant={filterEstatusComite === 'todos' ? "filled" : "outlined"}
                        sx={filterEstatusComite === 'todos' ?
                          { bgcolor: colors.primary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.main, color: colors.primary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusComite('todos')}
                      />
                      <Chip
                        label="Activos"
                        variant={filterEstatusComite === 'activos' ? "filled" : "outlined"}
                        sx={filterEstatusComite === 'activos' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusComite('activos')}
                      />
                      <Chip
                        label="Inactivos"
                        variant={filterEstatusComite === 'inactivos' ? "filled" : "outlined"}
                        sx={filterEstatusComite === 'inactivos' ?
                          { bgcolor: colors.primary.dark, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.dark, color: colors.primary.dark, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusComite('inactivos')}
                      />
                      <Chip
                        label="Con Permiso Aprobar"
                        variant={filterEstatusComite === 'permiso' ? "filled" : "outlined"}
                        sx={filterEstatusComite === 'permiso' ?
                          { bgcolor: colors.accents.blue, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.accents.blue, color: colors.accents.blue, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusComite('permiso')}
                      />
                      {(searchComite || filterEstatusComite !== 'todos') && (
                        <Chip
                          label="Limpiar filtros"
                          variant="outlined"
                          icon={<CloseIcon />}
                          onClick={() => resetFilters('comite')}
                          sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Mostrando: {filteredComite.length} de {comite.length} miembros
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setNewComiteDialog(true)}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nuevo Miembro
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar miembro por nombre, cargo o área..."
                    value={searchComite}
                    onChange={(e) => setSearchComite(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchComite && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchComite('')}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    size="small"
                    sx={{ maxWidth: 500 }}
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
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Carga Actual</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Permiso Aprobar</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Estatus</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '20%' }} align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredComite.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              No se encontraron miembros que coincidan con los filtros
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => resetFilters('comite')}
                              sx={{ mt: 1, color: colors.primary.main }}
                            >
                              Limpiar filtros
                            </Button>
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
                              <Badge
                                badgeContent={miembro.carga_trabajo_actual}
                                color={miembro.carga_trabajo_actual > 10 ? "error" : miembro.carga_trabajo_actual > 5 ? "warning" : "success"}
                                sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', height: 16, minWidth: 16 } }}
                              >
                                <AssignmentIndIcon sx={{ color: colors.primary.main }} />
                              </Badge>
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
                                    onClick={() => {
                                      setSelectedItem(miembro);
                                      setViewComiteDialog(true);
                                    }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar miembro">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                    onClick={() => {
                                      setSelectedItem({ ...miembro });
                                      setEditComiteDialog(true);
                                    }}
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
              </Box>
            )}

            {/* Asociaciones */}
            {activeTab === 5 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label="Todos"
                        variant={filterEstatusAsociaciones === 'todos' ? "filled" : "outlined"}
                        sx={filterEstatusAsociaciones === 'todos' ?
                          { bgcolor: colors.primary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.main, color: colors.primary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusAsociaciones('todos')}
                      />
                      <Chip
                        label="Activas"
                        variant={filterEstatusAsociaciones === 'activas' ? "filled" : "outlined"}
                        sx={filterEstatusAsociaciones === 'activas' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusAsociaciones('activas')}
                      />
                      <Chip
                        label="Suspendidas"
                        variant={filterEstatusAsociaciones === 'suspendidas' ? "filled" : "outlined"}
                        sx={filterEstatusAsociaciones === 'suspendidas' ?
                          { bgcolor: colors.primary.dark, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.dark, color: colors.primary.dark, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusAsociaciones('suspendidas')}
                      />
                      <Chip
                        label="En Revisión"
                        variant={filterEstatusAsociaciones === 'revision' ? "filled" : "outlined"}
                        sx={filterEstatusAsociaciones === 'revision' ?
                          { bgcolor: colors.accents.blue, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.accents.blue, color: colors.accents.blue, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusAsociaciones('revision')}
                      />
                      <Chip
                        label="Alto Cumplimiento"
                        variant={filterEstatusAsociaciones === 'alto' ? "filled" : "outlined"}
                        sx={filterEstatusAsociaciones === 'alto' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusAsociaciones('alto')}
                      />
                      {(searchAsociaciones || filterEstatusAsociaciones !== 'todos') && (
                        <Chip
                          label="Limpiar filtros"
                          variant="outlined"
                          icon={<CloseIcon />}
                          onClick={() => resetFilters('asociaciones')}
                          sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Mostrando: {filteredAsociaciones.length} de {asociaciones.length} asociaciones
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setNewAsociacionDialog(true)}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nueva Asociación
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
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
                      endAdornment: searchAsociaciones && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchAsociaciones('')}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
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
                              No se encontraron asociaciones que coincidan con los filtros
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => resetFilters('asociaciones')}
                              sx={{ mt: 1, color: colors.primary.main }}
                            >
                              Limpiar filtros
                            </Button>
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
                                    onClick={() => {
                                      setSelectedItem(asociacion);
                                      setViewAsociacionDialog(true);
                                    }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar asociación">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                    onClick={() => {
                                      setSelectedItem({ ...asociacion });
                                      setEditAsociacionDialog(true);
                                    }}
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

            {/* Agentes Pendientes */}
            {activeTab === 6 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label="Todos"
                        variant={filterEstatusAgentes === 'todos' ? "filled" : "outlined"}
                        sx={filterEstatusAgentes === 'todos' ?
                          { bgcolor: colors.primary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.main, color: colors.primary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusAgentes('todos')}
                      />
                      <Chip
                        label="Pendientes"
                        variant={filterEstatusAgentes === 'pendientes' ? "filled" : "outlined"}
                        sx={filterEstatusAgentes === 'pendientes' ?
                          { bgcolor: colors.primary.dark, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.dark, color: colors.primary.dark, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusAgentes('pendientes')}
                      />
                      <Chip
                        label="Asignados"
                        variant={filterEstatusAgentes === 'asignados' ? "filled" : "outlined"}
                        sx={filterEstatusAgentes === 'asignados' ?
                          { bgcolor: colors.accents.blue, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.accents.blue, color: colors.accents.blue, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusAgentes('asignados')}
                      />
                      <Chip
                        label="En Revisión"
                        variant={filterEstatusAgentes === 'revision' ? "filled" : "outlined"}
                        sx={filterEstatusAgentes === 'revision' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusAgentes('revision')}
                      />
                      {(searchAgentesPendientes || filterEstatusAgentes !== 'todos') && (
                        <Chip
                          label="Limpiar filtros"
                          variant="outlined"
                          icon={<CloseIcon />}
                          onClick={() => resetFilters('agentes')}
                          sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Mostrando: {filteredAgentesPendientes.length} de {agentesPendientes.length} agentes
                      </Typography>

                      {/* Único botón para asignación masiva */}
                      <Button
                        variant="contained"
                        startIcon={<GroupAddIcon />}
                        onClick={handleOpenAdvancedAssignment}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Asignación Masiva
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
                      endAdornment: searchAgentesPendientes && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchAgentesPendientes('')}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    size="small"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Tabla de Agentes Pendientes */}
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
                              No se encontraron agentes que coincidan con los filtros
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => resetFilters('agentes')}
                              sx={{ mt: 1, color: colors.primary.main }}
                            >
                              Limpiar filtros
                            </Button>
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
                                ID: {agente.id_usuario}
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
                                <Tooltip title="Ver documentos">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.primary.main }}
                                    onClick={() => {
                                      const docList = agente.documentos.map(d => `• ${d.tipo} (${d.fecha})`).join('\n');
                                      alert(`Documentos de ${agente.nombre}:\n\n${docList}`);
                                    }}
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
              </Box>
            )}

            {/* Niveles de Reconocimiento */}
            {activeTab === 7 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Filtros, búsqueda y estadísticas */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label="Todos"
                        variant={filterEstatusNiveles === 'todos' ? "filled" : "outlined"}
                        sx={filterEstatusNiveles === 'todos' ?
                          { bgcolor: colors.primary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.main, color: colors.primary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusNiveles('todos')}
                      />
                      <Chip
                        label="Activos"
                        variant={filterEstatusNiveles === 'activos' ? "filled" : "outlined"}
                        sx={filterEstatusNiveles === 'activos' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusNiveles('activos')}
                      />
                      <Chip
                        label="Inactivos"
                        variant={filterEstatusNiveles === 'inactivos' ? "filled" : "outlined"}
                        sx={filterEstatusNiveles === 'inactivos' ?
                          { bgcolor: colors.primary.dark, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.dark, color: colors.primary.dark, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusNiveles('inactivos')}
                      />
                      <Chip
                        label="Gremial"
                        variant={filterEstatusNiveles === 'gremial' ? "filled" : "outlined"}
                        sx={filterEstatusNiveles === 'gremial' ?
                          { bgcolor: colors.primary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.primary.main, color: colors.primary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusNiveles('gremial')}
                      />
                      <Chip
                        label="Académico"
                        variant={filterEstatusNiveles === 'academico' ? "filled" : "outlined"}
                        sx={filterEstatusNiveles === 'academico' ?
                          { bgcolor: colors.accents.purple, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.accents.purple, color: colors.accents.purple, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusNiveles('academico')}
                      />
                      <Chip
                        label="Profesional"
                        variant={filterEstatusNiveles === 'profesional' ? "filled" : "outlined"}
                        sx={filterEstatusNiveles === 'profesional' ?
                          { bgcolor: colors.secondary.main, color: 'white', cursor: 'pointer' } :
                          { borderColor: colors.secondary.main, color: colors.secondary.main, cursor: 'pointer' }}
                        onClick={() => setFilterEstatusNiveles('profesional')}
                      />
                      {(searchNivelesReconocimiento || filterEstatusNiveles !== 'todos') && (
                        <Chip
                          label="Limpiar filtros"
                          variant="outlined"
                          icon={<CloseIcon />}
                          onClick={() => resetFilters('niveles')}
                          sx={{ borderColor: colors.primary.main, color: colors.primary.main }}
                        />
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        Mostrando: {filteredNivelesReconocimiento.length} de {nivelesReconocimiento.length} niveles
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setNewNivelDialog(true)}
                        sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
                      >
                        Nuevo Nivel
                      </Button>
                    </Box>
                  </Box>

                  {/* Campo de búsqueda */}
                  <TextField
                    fullWidth
                    placeholder="Buscar nivel por nombre o descripción..."
                    value={searchNivelesReconocimiento}
                    onChange={(e) => setSearchNivelesReconocimiento(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: colors.primary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchNivelesReconocimiento && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchNivelesReconocimiento('')}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    size="small"
                    sx={{ maxWidth: 500 }}
                  />
                </Box>

                {/* Tabla de Niveles */}
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
                              No se encontraron niveles que coincidan con los filtros
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => resetFilters('niveles')}
                              sx={{ mt: 1, color: colors.primary.main }}
                            >
                              Limpiar filtros
                            </Button>
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
                                    onClick={() => {
                                      setSelectedItem(nivel);
                                      setViewNivelDialog(true);
                                    }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar nivel">
                                  <IconButton
                                    size="small"
                                    sx={{ color: colors.accents.blue }}
                                    onClick={() => {
                                      setSelectedItem({ ...nivel });
                                      setEditNivelDialog(true);
                                    }}
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
              </Box>
            )}

            {/* Semáforo */}
            {activeTab === 8 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Configuración de Umbrales */}
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
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                            <ErrorIcon sx={{ color: colors.semaforo.rojo, fontSize: 32, mb: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: colors.semaforo.rojo, fontWeight: 'bold' }}>
                              ROJO
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.semaforo.rojo }}>
                              {'<'} {config.redThreshold}%
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff8e1' }}>
                            <WarningIcon sx={{ color: colors.semaforo.amarillo, fontSize: 32, mb: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: colors.semaforo.amarillo, fontWeight: 'bold' }}>
                              AMARILLO
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.semaforo.amarillo }}>
                              {config.redThreshold}% - {config.yellowThreshold}%
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                            <CheckCircleIcon sx={{ color: colors.semaforo.verde, fontSize: 32, mb: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: colors.semaforo.verde, fontWeight: 'bold' }}>
                              VERDE
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.semaforo.verde }}>
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

                {/* Vista Previa */}
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
                        bgcolor: colors.semaforo.rojo,
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
                      <Typography variant="body2" sx={{ color: colors.semaforo.rojo, fontWeight: 'bold' }}>
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
                        bgcolor: colors.semaforo.amarillo,
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
                      <Typography variant="body2" sx={{ color: colors.semaforo.amarillo, fontWeight: 'bold' }}>
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
                        bgcolor: colors.semaforo.verde,
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
                      <Typography variant="body2" sx={{ color: colors.semaforo.verde, fontWeight: 'bold' }}>
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

      {/* Diálogos de creación */}
      {/* Diálogo Nueva Certificación */}
      <Dialog open={newCertificacionDialog} onClose={() => setNewCertificacionDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SchoolIcon sx={{ color: colors.primary.main }} />
              <Typography variant="h6" sx={{ color: colors.primary.dark }}>Nueva Certificación</Typography>
            </Box>
            <IconButton onClick={() => setNewCertificacionDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de la Certificación"
                value={newCertificacion.nombre_certificacion}
                onChange={(e) => setNewCertificacion({ ...newCertificacion, nombre_certificacion: e.target.value })}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                value={newCertificacion.descripcion}
                onChange={(e) => setNewCertificacion({ ...newCertificacion, descripcion: e.target.value })}
                required
                multiline
                rows={3}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={newCertificacion.tipo}
                  label="Tipo"
                  onChange={(e) => setNewCertificacion({ ...newCertificacion, tipo: e.target.value })}
                >
                  <MenuItem value="Profesional">Profesional</MenuItem>
                  <MenuItem value="Especialización">Especialización</MenuItem>
                  <MenuItem value="Básica">Básica</MenuItem>
                  <MenuItem value="Avanzada">Avanzada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Estatus</InputLabel>
                <Select
                  value={newCertificacion.estatus}
                  label="Estatus"
                  onChange={(e) => setNewCertificacion({ ...newCertificacion, estatus: e.target.value })}
                >
                  <MenuItem value={1}>Activo</MenuItem>
                  <MenuItem value={0}>Inactivo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewCertificacionDialog(false)} sx={{ color: colors.text.secondary }}>
            Cancelar
          </Button>
          <Button
            onClick={handleCreateCertificacion}
            variant="contained"
            sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
          >
            Crear Certificación
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo Editar Certificación */}
      <Dialog open={editCertificacionDialog} onClose={() => setEditCertificacionDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EditIcon sx={{ color: colors.accents.blue }} />
              <Typography variant="h6" sx={{ color: colors.primary.dark }}>Editar Certificación</Typography>
            </Box>
            <IconButton onClick={() => setEditCertificacionDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de la Certificación"
                  value={selectedItem.nombre_certificacion}
                  onChange={(e) => setSelectedItem({ ...selectedItem, nombre_certificacion: e.target.value })}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  value={selectedItem.descripcion}
                  onChange={(e) => setSelectedItem({ ...selectedItem, descripcion: e.target.value })}
                  required
                  multiline
                  rows={3}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    value={selectedItem.tipo}
                    label="Tipo"
                    onChange={(e) => setSelectedItem({ ...selectedItem, tipo: e.target.value })}
                  >
                    <MenuItem value="Profesional">Profesional</MenuItem>
                    <MenuItem value="Especialización">Especialización</MenuItem>
                    <MenuItem value="Básica">Básica</MenuItem>
                    <MenuItem value="Avanzada">Avanzada</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Estatus</InputLabel>
                  <Select
                    value={selectedItem.estatus}
                    label="Estatus"
                    onChange={(e) => setSelectedItem({ ...selectedItem, estatus: e.target.value })}
                  >
                    <MenuItem value={1}>Activo</MenuItem>
                    <MenuItem value={0}>Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditCertificacionDialog(false)} sx={{ color: colors.text.secondary }}>
            Cancelar
          </Button>
          <Button
            onClick={handleEditCertificacion}
            variant="contained"
            sx={{ bgcolor: colors.accents.blue, '&:hover': { bgcolor: colors.primary.main } }}
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo Ver Certificación */}
      <Dialog open={viewCertificacionDialog} onClose={() => setViewCertificacionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VisibilityIcon sx={{ color: colors.primary.main }} />
              <Typography variant="h6" sx={{ color: colors.primary.dark }}>Detalles de Certificación</Typography>
            </Box>
            <IconButton onClick={() => setViewCertificacionDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ color: colors.text.secondary }}>ID:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
                    #{selectedItem.id_certificacion}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ color: colors.text.secondary }}>Nombre:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                    {selectedItem.nombre_certificacion}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ color: colors.text.secondary }}>Descripción:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                    {selectedItem.descripcion}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ color: colors.text.secondary }}>Tipo:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Chip
                    label={selectedItem.tipo}
                    size="small"
                    sx={{
                      bgcolor: getTipoBgColor(selectedItem.tipo),
                      color: getTipoColor(selectedItem.tipo),
                    }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ color: colors.text.secondary }}>Estatus:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Chip
                    label={selectedItem.estatus === 1 ? "ACTIVA" : "INACTIVA"}
                    size="small"
                    sx={{
                      bgcolor: selectedItem.estatus === 1 ? colors.secondary.main : colors.primary.dark,
                      color: 'white',
                    }}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="subtitle2" sx={{ color: colors.text.secondary }}>Fecha creación:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                    {selectedItem.fecha_creacion}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewCertificacionDialog(false)} sx={{ color: colors.primary.main }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para asignar evaluador individual */}
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

      {/* Diálogo para asignación avanzada simplificada */}
      <Dialog open={assignAdvancedDialog} onClose={() => setAssignAdvancedDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GroupAddIcon sx={{ color: colors.primary.main }} />
              <Typography variant="h6" sx={{ color: colors.primary.dark }}>Asignación Masiva de Evaluadores</Typography>
            </Box>
            <IconButton onClick={() => setAssignAdvancedDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Información de agentes a asignar */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, bgcolor: '#e8f0fe' }}>
                <Typography variant="subtitle2" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 1 }}>
                  Agentes a asignar
                </Typography>
                <Typography variant="h4" sx={{ color: colors.primary.main, fontWeight: 'bold' }}>
                  {agentesPendientes.filter(a => a.estatus_evaluacion === 'pendiente').length}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                  agentes pendientes de asignación
                </Typography>
              </Paper>
            </Grid>

            {/* Selección de evaluadores */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 2 }}>
                Seleccionar Evaluadores
              </Typography>
              <Grid container spacing={1}>
                {evaluadoresDisponibles.map((evaluador) => {
                  const miembro = comite.find(m => m.nombre_usuario === evaluador);
                  return (
                    <Grid item xs={12} sm={6} key={evaluador}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          cursor: 'pointer',
                          bgcolor: selectedEvaluators.includes(evaluador) ? '#e8f0fe' : 'white',
                          borderColor: selectedEvaluators.includes(evaluador) ? colors.primary.main : '#e0e0e0',
                          '&:hover': { bgcolor: '#f5f5f5' }
                        }}
                        onClick={() => handleToggleEvaluator(evaluador)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Checkbox
                            checked={selectedEvaluators.includes(evaluador)}
                            size="small"
                            sx={{ p: 0 }}
                          />
                          <PersonIcon sx={{ color: colors.primary.main, fontSize: 18 }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                              {evaluador}
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                              Carga actual: {miembro?.carga_trabajo_actual || 0} agentes
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>

            {/* Resumen de asignación */}
            {selectedEvaluators.length > 0 && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                  <Typography variant="subtitle2" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 1 }}>
                    Distribución Equitativa
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.primary.dark, mb: 2 }}>
                    Los agentes se distribuirán equitativamente entre los evaluadores seleccionados.
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                        Agentes a asignar: {agentesPendientes.filter(a => a.estatus_evaluacion === 'pendiente').length}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                        Evaluadores seleccionados: {selectedEvaluators.length}
                      </Typography>
                    </Box>
                    <Chip
                      label="Ver distribución"
                      color="primary"
                      size="small"
                      onClick={() => {
                        const totalAgents = agentesPendientes.filter(a => a.estatus_evaluacion === 'pendiente').length;
                        const base = Math.floor(totalAgents / selectedEvaluators.length);
                        const resto = totalAgents % selectedEvaluators.length;

                        let preview = "Distribución propuesta:\n\n";
                        selectedEvaluators.forEach((evaluador, i) => {
                          preview += `${evaluador}: ${i < resto ? base + 1 : base} agentes\n`;
                        });
                        alert(preview);
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignAdvancedDialog(false)} sx={{ color: colors.text.secondary }}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmAdvancedAssignment}
            variant="contained"
            disabled={selectedEvaluators.length === 0}
            sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
          >
            Confirmar Asignación Masiva
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SystemConfig;