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
  TableRow
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
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  DataThresholding as DataThresholdingIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  HowToReg as HowToRegIcon,
  School as SchoolIcon,
  AccessTime as AccessTimeIcon,
  Category as CategoryIcon,
  Gavel as GavelIcon,
  Article as ArticleIcon,
  Folder as FolderIcon,
  Groups as GroupsIcon,
  Public as PublicIcon,
  Balance as BalanceIcon,
  Traffic as TrafficIcon,
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
  Search as SearchIcon
} from '@mui/icons-material';

const SystemConfig = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [config, setConfig] = useState({
    // General
    systemName: 'SICAG',
    maintenanceMode: false,
    allowRegistrations: true,
    maxLoginAttempts: 3,
    sessionTimeout: 30,

    // Configuración general de certificaciones
    certificationValidity: 365,
    renewalWarningDays: 30,
    maxCertificationsPerUser: 10,
    autoRenewal: true,

    // Configuración general de declaraciones
    declarationValidity: 365,
    declarationWarningDays: 30,
    maxDeclarationsPerUser: 10,
    declarationAutoRenewal: true,

    // Catálogo Documentos
    tiposDocumento: [
      {
        id: 1,
        nombre: 'Carta de Antecedentes',
        descripcion: 'Documento oficial que certifica los antecedentes penales',
        estatus: true
      },
      {
        id: 2,
        nombre: 'Declaración Patrimonial',
        descripcion: 'Declaración oficial de bienes y patrimonio',
        estatus: true
      },
      {
        id: 3,
        nombre: 'Certificación de Estudios',
        descripcion: 'Documento que acredita estudios realizados',
        estatus: true
      },
      {
        id: 4,
        nombre: 'Constancia de No Delitos Fiscales',
        descripcion: 'Constancia emitida por autoridad fiscal',
        estatus: true
      },
      {
        id: 5,
        nombre: 'Aviso de Retiro de SAT',
        descripcion: 'Documento oficial del Servicio de Administración Tributaria',
        estatus: false
      }
    ],

    // Notificaciones
    emailNotifications: true,
    smsNotifications: false,
    renewalAlerts: true,
    committeeAlerts: true,
    systemAlerts: true,
    alertFrequency: 'daily',

    // Semáforo
    greenThreshold: 90,
    yellowThreshold: 70,
    redThreshold: 50,
    autoRecalculation: true,

    // Backup
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: 30,
    cloudBackup: false,

    // Seguridad
    passwordExpiry: 90,
    twoFactorAuth: false,
    ipWhitelist: false,
    auditLogRetention: 365
  });

  const [changes, setChanges] = useState([]);
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

  // Datos estáticos para la tabla Documentos_Expediente
  const [documentosExpediente, setDocumentosExpediente] = useState([
    {
      id_documento: 1,
      id_expediente: 1001,
      numero_expediente: 'EXP-2023-001',
      id_apartado: 1,
      nombre_apartado: 'Identificación',
      id_tipo_documento: 1,
      tipo_documento: 'Carta de Antecedentes',
      nombre_archivo: 'antecedentes_penales.pdf',
      ruta_archivo: '/documentos/expedientes/1001/antecedentes_penales.pdf',
      fecha_carga: '2023-05-10 10:30:00',
      vigencia_inicio: '2023-05-01',
      vigencia_fin: '2024-04-30',
      tamaño_archivo: '2.5 MB',
      usuario_carga: 'Juan Pérez',
      estatus_documento: 'Vigente'
    },
    {
      id_documento: 2,
      id_expediente: 1001,
      numero_expediente: 'EXP-2023-001',
      id_apartado: 2,
      nombre_apartado: 'Formación',
      id_tipo_documento: 3,
      tipo_documento: 'Certificación de Estudios',
      nombre_archivo: 'titulo_universitario.pdf',
      ruta_archivo: '/documentos/expedientes/1001/titulo_universitario.pdf',
      fecha_carga: '2023-05-12 14:20:00',
      vigencia_inicio: '2022-06-15',
      vigencia_fin: '2025-06-15',
      tamaño_archivo: '1.8 MB',
      usuario_carga: 'María González',
      estatus_documento: 'Vigente'
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

  // Estados para filtros de búsqueda
  const [searchCertificaciones, setSearchCertificaciones] = useState('');
  const [searchDeclaraciones, setSearchDeclaraciones] = useState('');
  const [searchDocumentosExpediente, setSearchDocumentosExpediente] = useState('');
  const [searchRoles, setSearchRoles] = useState('');
  const [searchRegiones, setSearchRegiones] = useState('');
  const [searchTiposDocumento, setSearchTiposDocumento] = useState('');
  const [searchComite, setSearchComite] = useState('');
  const [searchNivelesReconocimiento, setSearchNivelesReconocimiento] = useState('');

  // Filtrar certificaciones por nombre
  const filteredCertificaciones = certificaciones.filter(cert =>
    cert.nombre_certificacion.toLowerCase().includes(searchCertificaciones.toLowerCase())
  );

  // Filtrar declaraciones por nombre
  const filteredDeclaraciones = declaraciones.filter(declaracion =>
    declaracion.nombre.toLowerCase().includes(searchDeclaraciones.toLowerCase())
  );

  // Filtrar documentos de expediente por nombre de archivo, tipo de documento o número de expediente
  const filteredDocumentosExpediente = documentosExpediente.filter(doc =>
    doc.nombre_archivo.toLowerCase().includes(searchDocumentosExpediente.toLowerCase()) ||
    doc.tipo_documento.toLowerCase().includes(searchDocumentosExpediente.toLowerCase()) ||
    doc.numero_expediente.toLowerCase().includes(searchDocumentosExpediente.toLowerCase())
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

  // Filtrar tipos de documento por nombre
  const filteredTiposDocumento = config.tiposDocumento.filter(doc =>
    doc.nombre.toLowerCase().includes(searchTiposDocumento.toLowerCase())
  );

  // Filtrar comité por nombre de usuario
  const filteredComite = comite.filter(miembro =>
    miembro.nombre_usuario.toLowerCase().includes(searchComite.toLowerCase())
  );

  // Filtrar niveles de reconocimiento por nombre
  const filteredNivelesReconocimiento = nivelesReconocimiento.filter(nivel =>
    nivel.nombre_nivel.toLowerCase().includes(searchNivelesReconocimiento.toLowerCase())
  );

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const oldValue = config[field];

    setConfig({
      ...config,
      [field]: value
    });

    // Registrar cambio
    setChanges(prev => [...prev, {
      field,
      oldValue,
      newValue: value,
      timestamp: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    }]);
  };

  const handleSliderChange = (field) => (event, newValue) => {
    const oldValue = config[field];

    setConfig({
      ...config,
      [field]: newValue
    });

    setChanges(prev => [...prev, {
      field,
      oldValue,
      newValue,
      timestamp: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    }]);
  };

  const handleSave = () => {
    // Simular guardado
    setTimeout(() => {
      alert('Configuración guardada exitosamente');
      setChanges([]);
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('¿Está seguro de restaurar todos los valores por defecto?')) {
      setConfig({
        systemName: 'SICAG',
        maintenanceMode: false,
        allowRegistrations: true,
        maxLoginAttempts: 3,
        sessionTimeout: 30,
        certificationValidity: 365,
        renewalWarningDays: 30,
        maxCertificationsPerUser: 10,
        autoRenewal: true,
        declarationValidity: 365,
        declarationWarningDays: 30,
        maxDeclarationsPerUser: 10,
        declarationAutoRenewal: true,
        tiposDocumento: [
          {
            id: 1,
            nombre: 'Carta de Antecedentes',
            descripcion: 'Documento oficial que certifica los antecedentes penales',
            estatus: true
          },
          {
            id: 2,
            nombre: 'Declaración Patrimonial',
            descripcion: 'Declaración oficial de bienes y patrimonio',
            estatus: true
          },
          {
            id: 3,
            nombre: 'Certificación de Estudios',
            descripcion: 'Documento que acredita estudios realizados',
            estatus: true
          },
          {
            id: 4,
            nombre: 'Constancia de No Delitos Fiscales',
            descripcion: 'Constancia emitida por autoridad fiscal',
            estatus: true
          },
          {
            id: 5,
            nombre: 'Aviso de Retiro de SAT',
            descripcion: 'Documento oficial del Servicio de Administración Tributaria',
            estatus: false
          }
        ],
        emailNotifications: true,
        smsNotifications: false,
        renewalAlerts: true,
        committeeAlerts: true,
        systemAlerts: true,
        alertFrequency: 'daily',
        greenThreshold: 90,
        yellowThreshold: 70,
        redThreshold: 50,
        autoRecalculation: true,
        autoBackup: true,
        backupFrequency: 'daily',
        backupTime: '02:00',
        retentionDays: 30,
        cloudBackup: false,
        passwordExpiry: 90,
        twoFactorAuth: false,
        ipWhitelist: false,
        auditLogRetention: 365
      });
      setChanges([]);
    }
  };

  // Función para manejar estado de roles
  const handleToggleRoleStatus = (id) => {
    setRoles(roles.map(rol =>
      rol.id === id ? { ...rol, estatus: !rol.estatus } : rol
    ));
  };

  // Función para manejar estado de documentos
  const handleToggleDocumentoStatus = (id) => {
    setConfig({
      ...config,
      tiposDocumento: config.tiposDocumento.map(doc =>
        doc.id === id ? { ...doc, estatus: !doc.estatus } : doc
      )
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

  const tabs = [
    { label: 'General', icon: <AssessmentIcon /> },
    { label: 'Catálogo Certificaciones', icon: <SchoolIcon /> },
    { label: 'Catálogo Declaraciones', icon: <GavelIcon /> },
    { label: 'Documentos de Expedientes', icon: <FolderIcon /> },
    { label: 'Roles', icon: <HowToRegIcon /> },
    { label: 'Regiones', icon: <PublicIcon /> },
    { label: 'Catálogo Documentos', icon: <DescriptionIcon /> },
    { label: 'Comité', icon: <SecurityIcon /> },
    { label: 'Notificaciones', icon: <NotificationsIcon /> },
    { label: 'Niveles Reconocimiento', icon: <EmojiEventsIcon /> },
    { label: 'Backup', icon: <BackupIcon /> },
    { label: 'Seguridad', icon: <LockIcon /> },
  ];

  const getSystemHealth = () => {
    let score = 100;
    if (config.maintenanceMode) score -= 10;
    if (!config.autoBackup) score -= 20;
    if (!config.emailNotifications) score -= 5;
    if (config.retentionDays < 7) score -= 15;
    if (!config.twoFactorAuth) score -= 10;

    return Math.max(0, score);
  };

  const systemHealth = getSystemHealth();

  // Función para obtener el color según el tipo de certificación
  const getTipoColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'profesional':
        return '#1976d2';
      case 'especialización':
        return '#7b1fa2';
      case 'básica':
        return '#2e7d32';
      case 'avanzada':
        return '#f57c00';
      case 'tecnológica':
        return '#0288d1';
      case 'complementaria':
        return '#5d4037';
      default:
        return '#616161';
    }
  };

  // Función para obtener el color de fondo según el tipo de certificación
  const getTipoBgColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'profesional':
        return '#e3f2fd';
      case 'especialización':
        return '#f3e5f5';
      case 'básica':
        return '#e8f5e9';
      case 'avanzada':
        return '#fff3e0';
      case 'tecnológica':
        return '#e1f5fe';
      case 'complementaria':
        return '#efebe9';
      default:
        return '#f5f5f5';
    }
  };

  // Función para obtener el color según el tipo de declaración
  const getDeclaracionTipoColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'obligatoria':
        return '#d32f2f';
      case 'anual':
        return '#1976d2';
      case 'requisito':
        return '#388e3c';
      case 'complementaria':
        return '#f57c00';
      default:
        return '#616161';
    }
  };

  // Función para obtener el color de fondo según el tipo de declaración
  const getDeclaracionTipoBgColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'obligatoria':
        return '#ffebee';
      case 'anual':
        return '#e3f2fd';
      case 'requisito':
        return '#e8f5e9';
      case 'complementaria':
        return '#fff3e0';
      default:
        return '#f5f5f5';
    }
  };

  // Función para obtener el color según el estatus del documento
  const getDocumentoEstatusColor = (estatus) => {
    switch (estatus?.toLowerCase()) {
      case 'vigente':
        return '#2e7d32';
      case 'por vencer':
        return '#f57c00';
      case 'vencido':
        return '#d32f2f';
      default:
        return '#616161';
    }
  };

  // Función para obtener el color de fondo según el estatus del documento
  const getDocumentoEstatusBgColor = (estatus) => {
    switch (estatus?.toLowerCase()) {
      case 'vigente':
        return '#e8f5e9';
      case 'por vencer':
        return '#fff3e0';
      case 'vencido':
        return '#ffebee';
      default:
        return '#f5f5f5';
    }
  };

  // Función para obtener el color según el apartado
  const getApartadoColor = (apartado) => {
    switch (apartado?.toLowerCase()) {
      case 'identificación':
        return '#1976d2';
      case 'formación':
        return '#7b1fa2';
      case 'declaraciones':
        return '#2e7d32';
      case 'fiscal':
        return '#f57c00';
      case 'profesional':
        return '#5d4037';
      default:
        return '#616161';
    }
  };

  // Función para obtener el color de fondo según el apartado
  const getApartadoBgColor = (apartado) => {
    switch (apartado?.toLowerCase()) {
      case 'identificación':
        return '#e3f2fd';
      case 'formación':
        return '#f3e5f5';
      case 'declaraciones':
        return '#e8f5e9';
      case 'fiscal':
        return '#fff3e0';
      case 'profesional':
        return '#efebe9';
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
        return '#ff9800'; // Naranja
      case 'ii':
      case '2':
        return '#9c27b0'; // Morado
      case 'iii':
      case '3':
        return '#2196f3'; // Azul
      default:
        return '#757575'; // Gris
    }
  };

  // Función para obtener el color de fondo según el nivel
  const getNivelBgColor = (nivel) => {
    const nivelNum = nivel?.match(/Nivel (\w+)/i)?.[1];
    switch (nivelNum?.toLowerCase()) {
      case 'i':
      case '1':
        return '#fff3e0'; // Naranja claro
      case 'ii':
      case '2':
        return '#f3e5f5'; // Morado claro
      case 'iii':
      case '3':
        return '#e3f2fd'; // Azul claro
      default:
        return '#f5f5f5'; // Gris claro
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
        return '#4caf50';
      case 'académico':
        return '#ff5722';
      case 'profesional':
        return '#673ab7';
      default:
        return '#607d8b';
    }
  };

  // Función para obtener el color de fondo del tipo de reconocimiento
  const getTipoReconocimientoBgColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
      case 'gremial':
        return '#e8f5e9';
      case 'académico':
        return '#ffebee';
      case 'profesional':
        return '#f3e5f5';
      default:
        return '#eceff1';
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2, overflow: 'hidden' }}>
      {/* Header - Manteniendo el diseño original */}
      <Box sx={{ mb: 2, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
              Configuración del Sistema
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Configure los parámetros globales del sistema SICAG
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<RestoreIcon />}
              onClick={handleReset}
              size="small"
            >
              Restaurar
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={changes.length === 0}
              size="small"
            >
              Guardar Cambios ({changes.length})
            </Button>
          </Stack>
        </Box>

        {/* Alertas - Manteniendo diseño original */}
        <Alert
          severity="info"
          icon={<WarningIcon />}
          sx={{ mb: 2 }}
        >
          Los cambios en la configuración afectarán a todos los usuarios del sistema. Cambios no guardados: {changes.length}
        </Alert>
      </Box>

      {/* Layout principal - Reorganizado */}
      <Box sx={{ display: 'flex', gap: 2, flex: 1, overflow: 'hidden' }}>
        {/* Columna izquierda - Tarjetas y configuración */}
        <Box sx={{ flex: 3, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          {/* Estado del sistema - Tarjetas uniformes en una sola fila */}
          <Box sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f0f0f0',
              borderRadius: 3,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#c0c0c0',
              borderRadius: 3,
            }
          }}>
            {/* Tarjeta 1: Salud del Sistema */}
            <Card sx={{
              borderLeft: '4px solid #3498db',
              height: 120,
              minWidth: 200,
              flexShrink: 0,
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
                <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold', mb: 1 }}>
                  {systemHealth}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
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
                      bgcolor: systemHealth >= 80 ? '#27ae60' :
                        systemHealth >= 60 ? '#f39c12' : '#e74c3c'
                    }
                  }}
                />
              </CardContent>
            </Card>

            {/* Tarjeta 2: Mantenimiento */}
            <Card sx={{
              borderLeft: `4px solid ${config.maintenanceMode ? '#f39c12' : '#27ae60'}`,
              height: 120,
              minWidth: 200,
              flexShrink: 0,
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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {config.maintenanceMode ? 'ACTIVO' : 'INACTIVO'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Mantenimiento
                    </Typography>
                  </Box>
                  {config.maintenanceMode ?
                    <WarningIcon sx={{ color: '#f39c12' }} /> :
                    <CheckCircleIcon sx={{ color: '#27ae60' }} />
                  }
                </Box>
              </CardContent>
            </Card>

            {/* Tarjeta 3: Vigencia Certificaciones */}
            <Card sx={{
              borderLeft: '4px solid #9b59b6',
              height: 120,
              minWidth: 200,
              flexShrink: 0,
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
                <Typography variant="h6" sx={{ color: '#9b59b6', fontWeight: 'bold', mb: 1 }}>
                  {config.certificationValidity}d
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Vigencia Certificaciones
                </Typography>
              </CardContent>
            </Card>

            {/* Tarjeta 4: Registros */}
            <Card sx={{
              borderLeft: '4px solid #2ecc71',
              height: 120,
              minWidth: 200,
              flexShrink: 0,
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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {config.allowRegistrations ? 'ACTIVO' : 'INACTIVO'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Registros
                    </Typography>
                  </Box>
                  {config.allowRegistrations ?
                    <CheckCircleIcon sx={{ color: '#27ae60' }} /> :
                    <LockIcon sx={{ color: '#e74c3c' }} />
                  }
                </Box>
              </CardContent>
            </Card>

            {/* Tarjeta 5: Backup Automático */}
            <Card sx={{
              borderLeft: `4px solid ${config.autoBackup ? '#27ae60' : '#e74c3c'}`,
              height: 120,
              minWidth: 200,
              flexShrink: 0,
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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {config.autoBackup ? 'ACTIVO' : 'INACTIVO'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Backup Automático
                    </Typography>
                  </Box>
                  {config.autoBackup ?
                    <CheckCircleIcon sx={{ color: '#27ae60' }} /> :
                    <ErrorIcon sx={{ color: '#e74c3c' }} />
                  }
                </Box>
              </CardContent>
            </Card>

          </Box>

          {/* Tabs de configuración - Manteniendo diseño original */}
          <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
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

            {/* Contenido de los tabs - Manteniendo diseño original */}
            <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
              {activeTab === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre del Sistema"
                      value={config.systemName}
                      onChange={handleChange('systemName')}
                      helperText="Nombre que se muestra en la aplicación"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.maintenanceMode}
                          onChange={handleChange('maintenanceMode')}
                          color="warning"
                        />
                      }
                      label="Modo Mantenimiento"
                    />
                    <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', ml: 4 }}>
                      Bloquea el acceso a todos los usuarios excepto administradores
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.allowRegistrations}
                          onChange={handleChange('allowRegistrations')}
                          color="primary"
                        />
                      }
                      label="Permitir Nuevos Registros"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Límite de Intentos de Login"
                      type="number"
                      value={config.maxLoginAttempts}
                      onChange={handleChange('maxLoginAttempts')}
                      InputProps={{ inputProps: { min: 1, max: 10 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Timeout de Sesión (min)"
                      type="number"
                      value={config.sessionTimeout}
                      onChange={handleChange('sessionTimeout')}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">min</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              )}

              {activeTab === 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Configuración general */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                      Configuración General de Certificaciones
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Vigencia Predeterminada (días)"
                          type="number"
                          value={config.certificationValidity}
                          onChange={handleChange('certificationValidity')}
                          helperText="Vigencia por defecto para nuevas certificaciones"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">días</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Días de Advertencia"
                          type="number"
                          value={config.renewalWarningDays}
                          onChange={handleChange('renewalWarningDays')}
                          helperText="Días previos al vencimiento para alertar"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">días</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Máx. Certificaciones por Usuario"
                          type="number"
                          value={config.maxCertificationsPerUser}
                          onChange={handleChange('maxCertificationsPerUser')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.autoRenewal}
                              onChange={handleChange('autoRenewal')}
                              color="primary"
                            />
                          }
                          label="Renovación Automática"
                        />
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Filtros, búsqueda y estadísticas */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="Todos"
                          variant="filled"
                          color="primary"
                          clickable
                        />
                        <Chip
                          label="Activos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Inactivos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Profesional"
                          variant="outlined"
                          clickable
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Total: {filteredCertificaciones.length} certificaciones
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Activas: {filteredCertificaciones.filter(c => c.estatus === 1).length}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          sx={{ bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }}
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
                            <SearchIcon />
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
                          <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Nombre</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Descripción</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '12%' }}>Tipo</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '8%' }} align="center">Horas previstas</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '8%' }} align="center">Vigencia prevista</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '8%' }} align="center">Estatus</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '14%' }} align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredCertificaciones.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
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
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  #{cert.id_certificacion}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  {cert.nombre_certificacion}
                                </Typography>
                                {cert.fecha_creacion && (
                                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                    Creado: {cert.fecha_creacion}
                                  </Typography>
                                )}
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
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
                                  <AccessTimeIcon sx={{ color: '#3498db', fontSize: 16 }} />
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                    {cert.horas_acreditadas}
                                  </Typography>
                                </Box>
                              </TableCell>

                              <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                  <TimerIcon sx={{ color: '#9b59b6', fontSize: 16 }} />
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                    {cert.vigencia_meses} m
                                  </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                  ≈ {(cert.vigencia_meses * 30).toLocaleString()} días
                                </Typography>
                              </TableCell>

                              <TableCell align="center">
                                <Chip
                                  label={cert.estatus === 1 ? "ACTIVA" : "INACTIVA"}
                                  size="small"
                                  color={cert.estatus === 1 ? "success" : "error"}
                                  sx={{
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
                                      sx={{ color: '#3498db' }}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Editar certificación">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#f39c12' }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title={cert.estatus === 1 ? 'Desactivar' : 'Activar'}>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleToggleCertificacionStatus(cert.id_certificacion)}
                                      sx={{ color: cert.estatus === 1 ? '#e74c3c' : '#2ecc71' }}
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
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                          {filteredCertificaciones.filter(c => c.tipo === 'Profesional').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#1976d2' }}>
                          Profesionales
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5' }}>
                        <Typography variant="h6" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                          {filteredCertificaciones.filter(c => c.tipo === 'Especialización').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7b1fa2' }}>
                          Especializaciones
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                          {filteredCertificaciones.filter(c => c.estatus === 1).length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                          Activas
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
                        <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                          {Math.round(filteredCertificaciones.reduce((acc, curr) => acc + curr.horas_acreditadas, 0) / Math.max(filteredCertificaciones.length, 1))}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#f57c00' }}>
                          Promedio Horas
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 2 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Configuración general */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                      Configuración General de Declaraciones
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Vigencia Predeterminada (días)"
                          type="number"
                          value={config.declarationValidity}
                          onChange={handleChange('declarationValidity')}
                          helperText="Vigencia por defecto para nuevas declaraciones"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">días</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Días de Advertencia"
                          type="number"
                          value={config.declarationWarningDays}
                          onChange={handleChange('declarationWarningDays')}
                          helperText="Días previos al vencimiento para alertar"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">días</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Máx. Declaraciones por Usuario"
                          type="number"
                          value={config.maxDeclarationsPerUser}
                          onChange={handleChange('maxDeclarationsPerUser')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.declarationAutoRenewal}
                              onChange={handleChange('declarationAutoRenewal')}
                              color="primary"
                            />
                          }
                          label="Renovación Automática"
                        />
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Filtros, búsqueda y estadísticas */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="Todos"
                          variant="filled"
                          color="primary"
                          clickable
                        />
                        <Chip
                          label="Activos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Inactivos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Obligatorias"
                          variant="outlined"
                          clickable
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Total: {filteredDeclaraciones.length} declaraciones
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Activas: {filteredDeclaraciones.filter(d => d.estatus === 1).length}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          sx={{ bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }}
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
                            <SearchIcon />
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
                          <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Nombre</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '15%' }} align="center">Artículo</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '35%' }}>Descripción</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Tipo</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '8%' }} align="center">Estatus</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '12%' }} align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredDeclaraciones.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
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
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  #{declaracion.id_declaracion}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  {declaracion.nombre}
                                </Typography>
                                {declaracion.fecha_registro && (
                                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                    Registro: {declaracion.fecha_registro}
                                  </Typography>
                                )}
                              </TableCell>

                              <TableCell align="center">
                                <Paper sx={{
                                  p: 1,
                                  bgcolor: '#e3f2fd',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  minWidth: 60
                                }}>
                                  <ArticleIcon sx={{ color: '#1976d2', fontSize: 16, mr: 0.5 }} />
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                    {declaracion.articulo}
                                  </Typography>
                                </Paper>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
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
                                  color={declaracion.estatus === 1 ? "success" : "error"}
                                  sx={{
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
                                      sx={{ color: '#3498db' }}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Editar declaración">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#f39c12' }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title={declaracion.estatus === 1 ? 'Desactivar' : 'Activar'}>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleToggleDeclaracionStatus(declaracion.id_declaracion)}
                                      sx={{ color: declaracion.estatus === 1 ? '#e74c3c' : '#2ecc71' }}
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
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                        <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                          {filteredDeclaraciones.filter(d => d.tipo === 'Obligatoria').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#d32f2f' }}>
                          Obligatorias
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                          {filteredDeclaraciones.filter(d => d.tipo === 'Anual').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#1976d2' }}>
                          Anuales
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                        <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                          {filteredDeclaraciones.filter(d => d.tipo === 'Requisito').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#388e3c' }}>
                          Requisitos
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
                        <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                          {filteredDeclaraciones.filter(d => d.estatus === 1).length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#f57c00' }}>
                          Activas
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 3 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Configuración general */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                      Configuración de Gestión de Expedientes
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Tamaño Máximo por Archivo (MB)"
                          type="number"
                          value="10"
                          helperText="Tamaño máximo permitido para documentos"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">MB</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Formatos Permitidos"
                          value="PDF, DOC, DOCX, JPG, PNG"
                          helperText="Formatos de archivo aceptados"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Retención Documentos (días)"
                          type="number"
                          value="1825"
                          helperText="Días de retención de documentos digitalizados"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">días</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={true}
                              color="primary"
                            />
                          }
                          label="Digitalización Automática"
                        />
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Filtros, búsqueda y estadísticas */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="Todos"
                          variant="filled"
                          color="primary"
                          clickable
                        />
                        <Chip
                          label="Vigentes"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Por Vencer"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Vencidos"
                          variant="outlined"
                          clickable
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Total: {filteredDocumentosExpediente.length} documentos
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Vigentes: {filteredDocumentosExpediente.filter(d => d.estatus_documento === 'Vigente').length}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                          sx={{ bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }}
                        >
                          Subir Documento
                        </Button>
                      </Box>
                    </Box>

                    {/* Campo de búsqueda */}
                    <TextField
                      fullWidth
                      placeholder="Buscar por nombre de archivo, tipo de documento o número de expediente..."
                      value={searchDocumentosExpediente}
                      onChange={(e) => setSearchDocumentosExpediente(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      size="small"
                      sx={{ maxWidth: 500 }}
                    />
                  </Box>

                  {/* Tabla de Documentos de Expediente */}
                  <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Expediente</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '12%' }}>Apartado</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Documento</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '18%' }}>Archivo</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Vigencia</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Estatus</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredDocumentosExpediente.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                                No se encontraron documentos que coincidan con la búsqueda
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredDocumentosExpediente.map((documento) => (
                            <TableRow
                              key={documento.id_documento}
                              hover
                              sx={{
                                '&:hover': { bgcolor: '#f8f9fa' },
                                opacity: documento.estatus_documento === 'Vencido' ? 0.7 : 1
                              }}
                            >
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  #{documento.id_documento}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                    {documento.numero_expediente}
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                    ID: {documento.id_expediente}
                                  </Typography>
                                </Box>
                              </TableCell>

                              <TableCell>
                                <Chip
                                  label={documento.nombre_apartado}
                                  size="small"
                                  sx={{
                                    bgcolor: getApartadoBgColor(documento.nombre_apartado),
                                    color: getApartadoColor(documento.nombre_apartado),
                                    fontWeight: 500,
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}
                                />
                              </TableCell>

                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <FileCopyIcon sx={{ color: '#1976d2', fontSize: 16 }} />
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                      {documento.tipo_documento}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                      ID Tipo: {documento.id_tipo_documento}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>

                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <InsertDriveFileIcon sx={{ color: '#f57c00', fontSize: 16 }} />
                                  <Box sx={{ maxWidth: 180 }}>
                                    <Typography variant="body2" sx={{
                                      color: '#2c3e50',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}>
                                      {documento.nombre_archivo}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <StorageIcon sx={{ color: '#7f8c8d', fontSize: 12 }} />
                                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                        {documento.tamaño_archivo}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </TableCell>

                              <TableCell align="center">
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <CalendarTodayIcon sx={{ color: '#9b59b6', fontSize: 14 }} />
                                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                      {documento.vigencia_fin}
                                    </Typography>
                                  </Box>
                                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                    Carga: {documento.fecha_carga.split(' ')[0]}
                                  </Typography>
                                </Box>
                              </TableCell>

                              <TableCell align="center">
                                <Chip
                                  label={documento.estatus_documento}
                                  size="small"
                                  sx={{
                                    bgcolor: getDocumentoEstatusBgColor(documento.estatus_documento),
                                    color: getDocumentoEstatusColor(documento.estatus_documento),
                                    fontWeight: 600,
                                    minWidth: 90
                                  }}
                                />
                              </TableCell>

                              <TableCell align="center">
                                <Stack direction="row" spacing={0.5} justifyContent="center">
                                  <Tooltip title="Ver documento">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#3498db' }}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Descargar">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#2ecc71' }}
                                    >
                                      <CloudUploadIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Eliminar">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#e74c3c' }}
                                    >
                                      <BlockIcon fontSize="small" />
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

                  {/* Estadísticas de Documentos */}
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                          {filteredDocumentosExpediente.filter(d => d.estatus_documento === 'Vigente').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                          Vigentes
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
                        <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                          {filteredDocumentosExpediente.filter(d => d.estatus_documento === 'Por Vencer').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#f57c00' }}>
                          Por Vencer
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                        <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                          {filteredDocumentosExpediente.filter(d => d.estatus_documento === 'Vencido').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#d32f2f' }}>
                          Vencidos
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                          {new Set(filteredDocumentosExpediente.map(d => d.id_expediente)).size}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#1976d2' }}>
                          Expedientes
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Distribución por apartado */}
                  <Paper sx={{ p: 2, mt: 2, bgcolor: '#fafafa' }}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Distribución por Apartado
                    </Typography>
                    <Grid container spacing={1}>
                      {Array.from(new Set(filteredDocumentosExpediente.map(d => d.nombre_apartado))).map((apartado, index) => {
                        const count = filteredDocumentosExpediente.filter(d => d.nombre_apartado === apartado).length;
                        const percentage = Math.round((count / Math.max(filteredDocumentosExpediente.length, 1)) * 100);
                        return (
                          <Grid item xs={6} key={index}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FolderIcon sx={{ color: getApartadoColor(apartado), fontSize: 16 }} />
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                                  {apartado}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: getApartadoColor(apartado) }}>
                                  {count}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
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
                                  bgcolor: getApartadoColor(apartado)
                                }
                              }}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Paper>

                  {/* Resumen de formatos */}
                  <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Resumen de Documentos
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
                          Usuarios que cargaron documentos:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {Array.from(new Set(filteredDocumentosExpediente.map(d => d.usuario_carga))).map((usuario, idx) => (
                            <Chip
                              key={idx}
                              label={usuario}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
                          Tipos de documento más frecuentes:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {Array.from(new Set(filteredDocumentosExpediente.map(d => d.tipo_documento))).slice(0, 3).map((tipo, idx) => (
                            <Chip
                              key={idx}
                              label={tipo}
                              size="small"
                              sx={{
                                bgcolor: getTipoBgColor(tipo),
                                color: getTipoColor(tipo)
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>
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
                          color="primary"
                          clickable
                        />
                        <Chip
                          label="Activos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Inactivos"
                          variant="outlined"
                          clickable
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Total: {filteredRoles.length} roles
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Activos: {filteredRoles.filter(r => r.estatus).length}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          sx={{ bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }}
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
                            <SearchIcon />
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
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Nombre del Rol</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>Descripción</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Nivel</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Estatus</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '15%' }} align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredRoles.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
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
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  #{rol.id}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  {rol.nombre}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                                  {rol.descripcion}
                                </Typography>
                              </TableCell>

                              <TableCell align="center">
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                                  <Box sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: '50%',
                                    bgcolor: rol.nivel === 1 ? '#e74c3c' :
                                      rol.nivel === 2 ? '#f39c12' :
                                        rol.nivel === 3 ? '#3498db' :
                                          rol.nivel === 4 ? '#2ecc71' : '#9b59b6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                                      {rol.nivel}
                                    </Typography>
                                  </Box>
                                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
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
                                  color={rol.estatus ? "success" : "error"}
                                  sx={{
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
                                      sx={{ color: '#3498db' }}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Editar rol">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#f39c12' }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title={rol.estatus ? 'Desactivar' : 'Activar'}>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleToggleRoleStatus(rol.id)}
                                      sx={{ color: rol.estatus ? '#e74c3c' : '#2ecc71' }}
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

              {activeTab === 5 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Filtros, búsqueda y estadísticas */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="Todos"
                          variant="filled"
                          color="primary"
                          clickable
                        />
                        <Chip
                          label="Activos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Inactivos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="México"
                          variant="outlined"
                          clickable
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Total: {filteredRegiones.length} regiones
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Activas: {filteredRegiones.filter(r => r.estatus === 1).length}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          sx={{ bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }}
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
                            <SearchIcon />
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
                          <TableCell sx={{ fontWeight: 'bold', width: '8%' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Nombre Región</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Estado</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>País</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Estatus</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '12%' }} align="center">Acciones</TableCell>
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
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                #{region.id_region}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PublicIcon sx={{ color: '#3498db', fontSize: 16 }} />
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  {region.nombre_region}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon sx={{ color: '#7f8c8d', fontSize: 16 }} />
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                                  {region.estado}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FlagIcon sx={{ color: '#e74c3c', fontSize: 16 }} />
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                                  {region.pais}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell align="center">
                              <Chip
                                label={region.estatus === 1 ? "ACTIVA" : "INACTIVA"}
                                size="small"
                                color={region.estatus === 1 ? "success" : "error"}
                                sx={{
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
                                    sx={{ color: '#3498db' }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Editar región">
                                  <IconButton
                                    size="small"
                                    sx={{ color: '#f39c12' }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title={region.estatus === 1 ? 'Desactivar' : 'Activar'}>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleToggleRegionStatus(region.id_region)}
                                    sx={{ color: region.estatus === 1 ? '#e74c3c' : '#2ecc71' }}
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
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                          {filteredRegiones.length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#1976d2' }}>
                          Total Regiones
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                          {filteredRegiones.filter(r => r.estatus === 1).length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                          Activas
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                        <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                          {filteredRegiones.filter(r => r.estatus === 0).length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#d32f2f' }}>
                          Inactivas
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5' }}>
                        <Typography variant="h6" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                          {new Set(filteredRegiones.map(r => r.pais)).size}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7b1fa2' }}>
                          Países
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Mapa de regiones */}
                  <Paper sx={{ p: 2, mt: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                      Distribución por Estado
                    </Typography>
                    <Grid container spacing={1}>
                      {Array.from(new Set(filteredRegiones.map(r => r.estado))).map((estado, index) => {
                        const count = filteredRegiones.filter(r => r.estado === estado).length;
                        return (
                          <Grid item xs={6} key={index}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MapIcon sx={{ color: '#3498db', fontSize: 16 }} />
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                                  {estado}
                                </Typography>
                              </Box>
                              <Chip
                                label={count}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Paper>
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
                          color="primary"
                          clickable
                        />
                        <Chip
                          label="Activos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Inactivos"
                          variant="outlined"
                          clickable
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Total: {filteredTiposDocumento.length} tipos
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Activos: {filteredTiposDocumento.filter(d => d.estatus).length}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          sx={{ bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }}
                        >
                          Nuevo Tipo
                        </Button>
                      </Box>
                    </Box>

                    {/* Campo de búsqueda */}
                    <TextField
                      fullWidth
                      placeholder="Buscar tipo de documento por nombre..."
                      value={searchTiposDocumento}
                      onChange={(e) => setSearchTiposDocumento(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      size="small"
                      sx={{ maxWidth: 400 }}
                    />
                  </Box>

                  {/* Tabla de Tipos de Documento */}
                  <TableContainer sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Nombre del Documento</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '45%' }}>Descripción</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Estatus</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '15%' }} align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredTiposDocumento.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                                No se encontraron tipos de documento que coincidan con la búsqueda
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredTiposDocumento.map((documento) => (
                            <TableRow
                              key={documento.id}
                              hover
                              sx={{
                                '&:hover': { bgcolor: '#f8f9fa' },
                                opacity: documento.estatus === false ? 0.7 : 1
                              }}
                            >
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  #{documento.id}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  {documento.nombre}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                                  {documento.descripcion}
                                </Typography>
                              </TableCell>

                              <TableCell align="center">
                                <Chip
                                  label={documento.estatus ? "ACTIVO" : "INACTIVO"}
                                  size="small"
                                  color={documento.estatus ? "success" : "error"}
                                  sx={{
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
                                      sx={{ color: '#3498db' }}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Editar documento">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#f39c12' }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title={documento.estatus ? 'Desactivar' : 'Activar'}>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleToggleDocumentoStatus(documento.id)}
                                      sx={{ color: documento.estatus ? '#e74c3c' : '#2ecc71' }}
                                    >
                                      {documento.estatus ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
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

              {activeTab === 7 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Filtros, búsqueda y estadísticas */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="Todos"
                          variant="filled"
                          color="primary"
                          clickable
                        />
                        <Chip
                          label="Activos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Con Permiso Aprobar"
                          variant="outlined"
                          clickable
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Total: {filteredComite.length} miembros
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Activos: {filteredComite.filter(m => m.estatus === 1).length}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Con permiso: {filteredComite.filter(m => m.permiso_aprobar === 1).length}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          sx={{ bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }}
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
                            <SearchIcon />
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
                          <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Usuario</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Cargo</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Área</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Permiso Aprobar</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Estatus</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '20%' }} align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredComite.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
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
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  #{miembro.id_comite}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <PersonIcon sx={{ color: '#3498db', fontSize: 16 }} />
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                      {miembro.nombre_usuario}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
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
                                    bgcolor: miembro.cargo === 'Presidente' ? '#e3f2fd' :
                                      miembro.cargo === 'Secretario' ? '#f3e5f5' :
                                        miembro.cargo === 'Vocal' ? '#e8f5e9' :
                                          miembro.cargo === 'Coordinador' ? '#fff3e0' : '#f5f5f5',
                                    color: miembro.cargo === 'Presidente' ? '#1976d2' :
                                      miembro.cargo === 'Secretario' ? '#7b1fa2' :
                                        miembro.cargo === 'Vocal' ? '#2e7d32' :
                                          miembro.cargo === 'Coordinador' ? '#f57c00' : '#616161',
                                    fontWeight: 500
                                  }}
                                />
                              </TableCell>

                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <BusinessIcon sx={{ color: '#7f8c8d', fontSize: 16 }} />
                                  <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                                    {miembro.area}
                                  </Typography>
                                </Box>
                              </TableCell>

                              <TableCell align="center">
                                <Chip
                                  label={miembro.permiso_aprobar === 1 ? "SI" : "NO"}
                                  size="small"
                                  color={miembro.permiso_aprobar === 1 ? "success" : "default"}
                                  icon={miembro.permiso_aprobar === 1 ? <HowToRegIcon fontSize="small" /> : null}
                                  sx={{
                                    fontWeight: 600,
                                    minWidth: 60
                                  }}
                                />
                              </TableCell>

                              <TableCell align="center">
                                <Chip
                                  label={miembro.estatus === 1 ? "ACTIVO" : "INACTIVO"}
                                  size="small"
                                  color={miembro.estatus === 1 ? "success" : "error"}
                                  sx={{
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
                                      sx={{ color: '#3498db' }}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Editar miembro">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#f39c12' }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Cambiar permiso de aprobación">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleTogglePermisoAprobar(miembro.id_comite)}
                                      sx={{ color: miembro.permiso_aprobar === 1 ? '#e74c3c' : '#2ecc71' }}
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
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
                        <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                          {filteredComite.filter(m => m.cargo === 'Presidente').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#1976d2' }}>
                          Presidentes
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5' }}>
                        <Typography variant="h6" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                          {filteredComite.filter(m => m.cargo === 'Secretario').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7b1fa2' }}>
                          Secretarios
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                          {filteredComite.filter(m => m.cargo === 'Vocal').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                          Vocales
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
                        <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                          {filteredComite.filter(m => m.permiso_aprobar === 1).length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#f57c00' }}>
                          Con Permiso
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 8 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2 }}>
                      Configuración de Notificaciones
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.emailNotifications}
                          onChange={handleChange('emailNotifications')}
                          color="primary"
                        />
                      }
                      label="Notificaciones por Email"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.smsNotifications}
                          onChange={handleChange('smsNotifications')}
                          color="primary"
                        />
                      }
                      label="Notificaciones por SMS"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.renewalAlerts}
                          onChange={handleChange('renewalAlerts')}
                          color="warning"
                        />
                      }
                      label="Alertas de Renovación"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.committeeAlerts}
                          onChange={handleChange('committeeAlerts')}
                          color="secondary"
                        />
                      }
                      label="Alertas del Comité"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.systemAlerts}
                          onChange={handleChange('systemAlerts')}
                          color="info"
                        />
                      }
                      label="Alertas del Sistema"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Frecuencia de Alertas"
                      value={config.alertFrequency}
                      onChange={handleChange('alertFrequency')}
                    >
                      <MenuItem value="immediate">Inmediato</MenuItem>
                      <MenuItem value="hourly">Cada hora</MenuItem>
                      <MenuItem value="daily">Diario</MenuItem>
                      <MenuItem value="weekly">Semanal</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              )}

              {activeTab === 9 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Configuración de Umbrales del Semáforo */}
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
                      Configuración de Umbrales del Semáforo
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 2 }}>
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
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                          <Grid item xs={4}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                              <ErrorIcon sx={{ color: '#e74c3c', fontSize: 32, mb: 1 }} />
                              <Typography variant="subtitle2" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                                ROJO
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#e74c3c' }}>
                                {'<'} {config.redThreshold}%
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fffde7' }}>
                              <WarningIcon sx={{ color: '#f39c12', fontSize: 32, mb: 1 }} />
                              <Typography variant="subtitle2" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                                AMARILLO
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#f39c12' }}>
                                {config.redThreshold}% - {config.yellowThreshold}%
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                              <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 32, mb: 1 }} />
                              <Typography variant="subtitle2" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                                VERDE
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#27ae60' }}>
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
                              color="primary"
                            />
                          }
                          label="Cálculo Automático del Semáforo"
                        />
                        <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', ml: 4 }}>
                          Recalcula automáticamente el semáforo cuando cambian las certificaciones o declaraciones
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Filtros, búsqueda y estadísticas */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="Todos"
                          variant="filled"
                          color="primary"
                          clickable
                        />
                        <Chip
                          label="Activos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Inactivos"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Gremial"
                          variant="outlined"
                          clickable
                        />
                        <Chip
                          label="Profesional"
                          variant="outlined"
                          clickable
                        />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Total: {filteredNivelesReconocimiento.length} niveles
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          Activos: {filteredNivelesReconocimiento.filter(n => n.estatus === 1).length}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          sx={{ bgcolor: '#3498db', '&:hover': { bgcolor: '#2980b9' } }}
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
                            <SearchIcon />
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
                          <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>ID</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Nombre del Nivel</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '45%' }}>Descripción</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Estatus</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredNivelesReconocimiento.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
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
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                  #{nivel.id_nivel}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {getNivelIcon(nivel.nombre_nivel)}
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
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
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                                  {nivel.descripcion}
                                </Typography>
                              </TableCell>

                              <TableCell align="center">
                                <Chip
                                  label={nivel.estatus === 1 ? "ACTIVO" : "INACTIVO"}
                                  size="small"
                                  color={nivel.estatus === 1 ? "success" : "error"}
                                  sx={{
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
                                      sx={{ color: '#3498db' }}
                                    >
                                      <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Editar nivel">
                                    <IconButton
                                      size="small"
                                      sx={{ color: '#f39c12' }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title={nivel.estatus === 1 ? 'Desactivar' : 'Activar'}>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleToggleNivelStatus(nivel.id_nivel)}
                                      sx={{ color: nivel.estatus === 1 ? '#e74c3c' : '#2ecc71' }}
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
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                          {filteredNivelesReconocimiento.filter(n => getTipoReconocimiento(n.nombre_nivel) === 'Gremial').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                          Niveles Gremiales
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                        <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                          {filteredNivelesReconocimiento.filter(n => getTipoReconocimiento(n.nombre_nivel) === 'Académico').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#d32f2f' }}>
                          Niveles Académicos
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5' }}>
                        <Typography variant="h6" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                          {filteredNivelesReconocimiento.filter(n => getTipoReconocimiento(n.nombre_nivel) === 'Profesional').length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7b1fa2' }}>
                          Niveles Profesionales
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
                        <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                          {filteredNivelesReconocimiento.filter(n => n.estatus === 1).length}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#f57c00' }}>
                          Activos
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Distribución por Nivel */}
                  <Paper sx={{ p: 2, mt: 2, bgcolor: '#fafafa' }}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
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
                                <Typography variant="body2" sx={{ color: '#2c3e50' }}>
                                  {nivel}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', color: getNivelColor(nivel) }}>
                                  {count}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
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
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
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

              {activeTab === 10 && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.autoBackup}
                          onChange={handleChange('autoBackup')}
                          color="primary"
                        />
                      }
                      label="Backup Automático"
                    />
                  </Grid>

                  {config.autoBackup && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          select
                          label="Frecuencia"
                          value={config.backupFrequency}
                          onChange={handleChange('backupFrequency')}
                        >
                          <MenuItem value="hourly">Cada hora</MenuItem>
                          <MenuItem value="daily">Diario</MenuItem>
                          <MenuItem value="weekly">Semanal</MenuItem>
                          <MenuItem value="monthly">Mensual</MenuItem>
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Hora del Backup"
                          type="time"
                          value={config.backupTime}
                          onChange={handleChange('backupTime')}
                          InputLabelProps={{ shrink: true }}
                          inputProps={{ step: 300 }} // 5 min
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Retención"
                          type="number"
                          value={config.retentionDays}
                          onChange={handleChange('retentionDays')}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">días</InputAdornment>,
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.cloudBackup}
                              onChange={handleChange('cloudBackup')}
                              color="primary"
                            />
                          }
                          label="Backup en la Nube"
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              )}

              {activeTab === 11 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Expiración de Contraseña"
                      type="number"
                      value={config.passwordExpiry}
                      onChange={handleChange('passwordExpiry')}
                      helperText="Días para forzar cambio de contraseña"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">días</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.twoFactorAuth}
                          onChange={handleChange('twoFactorAuth')}
                          color="primary"
                        />
                      }
                      label="Autenticación de Dos Factores"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={config.ipWhitelist}
                          onChange={handleChange('ipWhitelist')}
                          color="primary"
                        />
                      }
                      label="Lista Blanca de IPs"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Retención Auditoría"
                      type="number"
                      value={config.auditLogRetention}
                      onChange={handleChange('auditLogRetention')}
                      helperText="Días de retención de logs"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">días</InputAdornment>,
                      }}
                    />
                  </Grid>
                </Grid>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Columna derecha - Más angosta y mejorada */}
        <Box sx={{ flex: 1, minWidth: 280, maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
          {/* Vista Previa del Sistema - Altura fija */}
          <Paper elevation={1} sx={{ p: 2, height: '40%', minHeight: 200, maxHeight: 250 }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
              Vista Previa del Sistema
            </Typography>

            <Box sx={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Nombre del Sistema:
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {config.systemName}
                    </Typography>
                  </Paper>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Estado Actual:
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: config.maintenanceMode ? '#fffde7' : '#e8f5e9' }}>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                          Mantenimiento
                        </Typography>
                        <Chip
                          label={config.maintenanceMode ? 'ACTIVO' : 'INACTIVO'}
                          size="small"
                          color={config.maintenanceMode ? 'warning' : 'success'}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: config.allowRegistrations ? '#e8f5e9' : '#ffebee' }}>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                          Registros
                        </Typography>
                        <Chip
                          label={config.allowRegistrations ? 'PERMITIDOS' : 'BLOQUEADOS'}
                          size="small"
                          color={config.allowRegistrations ? 'success' : 'error'}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Resumen de Configuración:
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Certificaciones Activas:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {certificaciones.filter(c => c.estatus === 1).length}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Declaraciones Activas:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {declaraciones.filter(d => d.estatus === 1).length}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Regiones Activas:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {regiones.filter(r => r.estatus === 1).length}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Niveles Reconocimiento Activos:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {nivelesReconocimiento.filter(n => n.estatus === 1).length}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Umbral Semáforo Verde:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {'>'} {config.yellowThreshold}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Backup Automático:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: config.autoBackup ? '#27ae60' : '#e74c3c' }}>
                        {config.autoBackup ? 'ACTIVO' : 'INACTIVO'}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Paper>

          {/* Historial de cambios - Altura fija con scroll */}
          <Paper elevation={1} sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', minHeight: 300 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexShrink: 0 }}>
              <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Cambios Recientes
              </Typography>
              <Chip
                label={`${changes.length} cambios`}
                size="small"
                color="primary"
              />
            </Box>

            {changes.length > 0 ? (
              <Box sx={{
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Lista de cambios con altura fija y scroll */}
                <Box sx={{
                  flex: 1,
                  overflowY: 'auto',
                  pr: 1,
                  '&::-webkit-scrollbar': {
                    width: 8,
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f5f5f5',
                    borderRadius: 4,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#bdbdbd',
                    borderRadius: 4,
                    '&:hover': {
                      backgroundColor: '#9e9e9e',
                    }
                  }
                }}>
                  {changes.map((change, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 1.5,
                        mb: 1,
                        bgcolor: '#f8f9fa',
                        borderLeft: '3px solid #3498db',
                        '&:last-child': {
                          mb: 0
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" sx={{
                          fontWeight: 'bold',
                          color: '#2c3e50',
                          fontSize: '0.75rem',
                          textTransform: 'capitalize'
                        }}>
                          {change.field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </Typography>
                        <Typography variant="caption" sx={{
                          color: '#7f8c8d',
                          fontSize: '0.7rem'
                        }}>
                          {change.timestamp}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ color: '#7f8c8d', fontSize: '0.75rem' }}>
                          De:
                        </Typography>
                        <Typography variant="caption" sx={{
                          fontWeight: 'bold',
                          color: '#e74c3c',
                          fontSize: '0.75rem',
                          maxWidth: '40%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {change.oldValue.toString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d', fontSize: '0.75rem', mx: 0.5 }}>
                          →
                        </Typography>
                        <Typography variant="caption" sx={{
                          fontWeight: 'bold',
                          color: '#27ae60',
                          fontSize: '0.75rem',
                          maxWidth: '40%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {change.newValue.toString()}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 48, mb: 2 }} />
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  No hay cambios pendientes
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default SystemConfig;