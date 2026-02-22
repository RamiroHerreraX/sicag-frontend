import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Collapse
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
  Update as UpdateIcon
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

const Expediente = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [expanded, setExpanded] = useState('panel1');
  const [addDialog, setAddDialog] = useState({
    open: false,
    sectionId: '',
    subseccion: '',
    tipoDocumento: '',
    archivo: null,
    nombreArchivo: '',
    fecha: new Date().toISOString().split('T')[0],
    horas: ''
  });
  const [validacionDialog, setValidacionDialog] = useState({
    open: false,
    apartado: '',
    titulo: '',
    fecha: ''
  });
  const [uploadDialog, setUploadDialog] = useState({
    open: false,
    tipo: '',
    titulo: '',
    archivo: null,
    nombreArchivo: ''
  });
  const [estadosValidacion, setEstadosValidacion] = useState({});
  
  // Estado para certificados con subsecciones y horas
  const [certificadosData, setCertificadosData] = useState({
    formacionEtica: {
      titulo: 'Formación Ética y Cumplimiento',
      horasRequeridas: 20,
      horasAcumuladas: 20, // Ya cumplido
      certificaciones: [
        {
          id: 1,
          nombre: 'Curso de Ética Profesional y Código de Conducta',
          institucion: 'Instituto de Ética Empresarial',
          fecha: '2025-06-15',
          horas: 10,
          documento: 'certificado_etica_profesional.pdf',
          estado: 'completo'
        },
        {
          id: 2,
          nombre: 'Taller de Prevención de Conflictos de Interés',
          institucion: 'Centro de Cumplimiento Normativo',
          fecha: '2025-08-22',
          horas: 6,
          documento: 'certificado_conflictos_interes.pdf',
          estado: 'completo'
        },
        {
          id: 3,
          nombre: 'Seminario de Transparencia y Anticorrupción',
          institucion: 'Asociación Mexicana de Ética',
          fecha: '2025-10-05',
          horas: 4,
          documento: 'seminario_anticorrupcion.pdf',
          estado: 'completo'
        }
      ]
    },
    actualizacionTecnica: {
      titulo: 'Actualización Técnica y Aduanera',
      horasRequeridas: 80,
      horasAcumuladas: 80, // Ya cumplido
      certificaciones: [
        {
          id: 4,
          nombre: 'Diplomado en Comercio Exterior y Legislación Aduanera',
          institucion: 'Universidad Aduanera de México',
          fecha: '2025-02-10',
          horas: 40,
          documento: 'diplomado_comercio_exterior.pdf',
          estado: 'completo'
        },
        {
          id: 5,
          nombre: 'Curso de Clasificación Arancelaria Avanzada',
          institucion: 'Instituto de Capacitación Aduanera',
          fecha: '2025-04-18',
          horas: 20,
          documento: 'curso_clasificacion_arancelaria.pdf',
          estado: 'completo'
        },
        {
          id: 6,
          nombre: 'Taller de Regulaciones y Restricciones No Arancelarias',
          institucion: 'Centro de Estudios Aduaneros',
          fecha: '2025-07-30',
          horas: 12,
          documento: 'taller_regulaciones.pdf',
          estado: 'completo'
        },
        {
          id: 7,
          nombre: 'Seminario de Valoración Aduanera',
          institucion: 'Asociación de Agentes Aduanales',
          fecha: '2025-09-12',
          horas: 8,
          documento: 'seminario_valoracion_aduanera.pdf',
          estado: 'completo'
        }
      ]
    }
  });

  const [formData, setFormData] = useState({
    nombre: 'Luis Rodríguez',
    curp: 'RODL800101HDFXYZ01',
    rfc: 'RODL800101ABC',
    fechaNacimiento: '01/01/1980',
    lugarNacimiento: 'Ciudad de México',
    nacionalidad: 'Mexicana',
    estadoCivil: 'Casado',
    domicilioFiscal: 'Av. Principal 123, Col. Centro, CDMX',
    domicilioParticular: 'Calle Secundaria 456, Col. Juárez, CDMX',
    telefono: '+52 55 1234 5678',
    email: 'luis.rodriguez@ejemplo.com'
  });

  // Estados para Cumplimiento Organizacional
  const [cumplimientoData, setCumplimientoData] = useState({
    seguridadCadenaSuministro: {
      descripcion: `Sistema de gestión de seguridad para la cadena de suministro que previene
riesgos logísticos y asegura la integridad de los bienes.`,
      vigencia: '2026-12-31',
      documento: 'sistema_seguridad_cadena_suministros_v2.pdf',
      estado: 'aprobado',
      fechaRevision: '15/01/2026'
    },
    antisobornos: {
      descripcion: `Políticas y procedimientos para prevenir, detectar y responder
a actos de soborno y corrupción en operaciones comerciales.`,
      vigencia: '',
      documento: null,
      estado: 'pendiente',
      fechaRevision: null
    }
  });

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSave = () => {
    setEditMode(false);
    // En una implementación real, aquí se enviarían los datos al servidor
  };

  const handleUploadCertification = () => {
    
  };
  
  const handleSeeCertification = () => {
    
  };

  // Funciones para Cumplimiento Organizacional
  const handleDocumentoUpload = (tipo) => {
    const nuevoEstado = {
      ...cumplimientoData,
      [tipo]: {
        ...cumplimientoData[tipo],
        documento: `documento_${tipo}_${Date.now()}.pdf`,
        estado: 'en_revision',
        fechaRevision: new Date().toLocaleDateString()
      }
    };
    setCumplimientoData(nuevoEstado);
  };

  const handleVerDocumento = (tipo) => {
    console.log('Ver documento:', tipo);
  };

  // Función para manejar cambios en descripción
  const handleDescripcionChange = (tipo, valor) => {
    const nuevoEstado = {
      ...cumplimientoData,
      [tipo]: {
        ...cumplimientoData[tipo],
        descripcion: valor
      }
    };
    setCumplimientoData(nuevoEstado);
  };

  // Función para manejar cambios en vigencia
  const handleVigenciaChange = (tipo, valor) => {
    const nuevoEstado = {
      ...cumplimientoData,
      [tipo]: {
        ...cumplimientoData[tipo],
        vigencia: valor
      }
    };
    setCumplimientoData(nuevoEstado);
  };

  // Función para abrir el diálogo de validación
  const handleAbrirValidacionDialog = (apartado, titulo) => {
    const fechaActual = new Date().toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    setValidacionDialog({
      open: true,
      apartado,
      titulo,
      fecha: fechaActual
    });
  };

  // Función para cerrar el diálogo de validación
  const handleCerrarValidacionDialog = () => {
    setValidacionDialog({
      open: false,
      apartado: '',
      titulo: '',
      fecha: ''
    });
  };

  // Función para confirmar la validación
  const handleConfirmarValidacion = () => {
    const { apartado, fecha } = validacionDialog;
    
    // Actualizar el estado de validación para este apartado
    setEstadosValidacion(prev => ({
      ...prev,
      [apartado]: {
        enviado: true,
        fechaEnvio: fecha,
        estado: 'en_revision'
      }
    }));

    // Cerrar el diálogo
    handleCerrarValidacionDialog();
  };

  // Función para ver el estado de validación
  const obtenerEstadoValidacion = (apartado) => {
    return estadosValidacion[apartado] || { enviado: false, fechaEnvio: null, estado: 'pendiente' };
  };

  // Función para abrir el diálogo de agregar documento
  const handleOpenAddDialog = (sectionId, subseccion = '') => {
    setAddDialog({
      open: true,
      sectionId: sectionId,
      subseccion: subseccion,
      tipoDocumento: '',
      archivo: null,
      nombreArchivo: '',
      fecha: new Date().toISOString().split('T')[0],
      horas: ''
    });
  };

  // Función para guardar nueva certificación
  const handleGuardarCertificacion = () => {
    if (addDialog.tipoDocumento && addDialog.archivo && addDialog.horas) {
      const nuevaCertificacion = {
        id: Date.now(),
        nombre: addDialog.tipoDocumento,
        institucion: 'Pendiente',
        fecha: addDialog.fecha,
        horas: parseInt(addDialog.horas),
        documento: addDialog.nombreArchivo,
        estado: 'pendiente'
      };

      if (addDialog.subseccion === 'formacionEtica') {
        setCertificadosData(prev => ({
          ...prev,
          formacionEtica: {
            ...prev.formacionEtica,
            certificaciones: [...prev.formacionEtica.certificaciones, nuevaCertificacion],
            horasAcumuladas: prev.formacionEtica.horasAcumuladas + parseInt(addDialog.horas)
          }
        }));
      } else if (addDialog.subseccion === 'actualizacionTecnica') {
        setCertificadosData(prev => ({
          ...prev,
          actualizacionTecnica: {
            ...prev.actualizacionTecnica,
            certificaciones: [...prev.actualizacionTecnica.certificaciones, nuevaCertificacion],
            horasAcumuladas: prev.actualizacionTecnica.horasAcumuladas + parseInt(addDialog.horas)
          }
        }));
      }

      alert(`Certificación "${addDialog.nombreArchivo}" agregada correctamente a ${addDialog.subseccion === 'formacionEtica' ? 'Formación Ética' : 'Actualización Técnica'}`);
      
      // Cerrar el diálogo
      setAddDialog({
        open: false,
        sectionId: '',
        subseccion: '',
        tipoDocumento: '',
        archivo: null,
        nombreArchivo: '',
        fecha: new Date().toISOString().split('T')[0],
        horas: ''
      });
    }
  };

  // Función para abrir el diálogo de carga de documentos de cumplimiento
  const handleOpenUploadDialog = (tipo, titulo) => {
  setUploadDialog({
    open: true,
    tipo: tipo,
    titulo: titulo,
    archivo: null,
    nombreArchivo: ''
  });
};

const handleCumplimientoFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    setUploadDialog({
      ...uploadDialog,
      archivo: file,
      nombreArchivo: file.name
    });
  }
};

const handleGuardarDocumentoCumplimiento = () => {
  if (uploadDialog.archivo) {
    const tipo = uploadDialog.tipo;
    
    // Actualizar el estado con el documento cargado
    const nuevoEstado = {
      ...cumplimientoData,
      [tipo]: {
        ...cumplimientoData[tipo],
        documento: uploadDialog.nombreArchivo,
        estado: 'en_revision',
        fechaRevision: new Date().toLocaleDateString()
      }
    };
    setCumplimientoData(nuevoEstado);
    
    // Mostrar mensaje de éxito
    alert(`Documento "${uploadDialog.nombreArchivo}" subido correctamente para ${uploadDialog.titulo}`);
    
    // Cerrar el diálogo
    setUploadDialog({
      open: false,
      tipo: '',
      titulo: '',
      archivo: null,
      nombreArchivo: ''
    });
  }
};

  // Función para manejar la selección de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAddDialog({
        ...addDialog,
        archivo: file,
        nombreArchivo: file.name
      });
    }
  };

  // Función para manejar la subida de archivo en cumplimiento
  const handleCumplimientoFileChange = (event, tipo) => {
    const file = event.target.files[0];
    if (file) {
      // Simular carga exitosa
      setTimeout(() => {
        const nuevoEstado = {
          ...cumplimientoData,
          [tipo]: {
            ...cumplimientoData[tipo],
            documento: file.name,
            estado: 'en_revision',
            fechaRevision: new Date().toLocaleDateString()
          }
        };
        setCumplimientoData(nuevoEstado);
        
        // Cerrar el modal
        setUploadDialog({ open: false, tipo: '', titulo: '' });
      }, 500);
    }
  };

  // Lista unificada de todos los apartados
  const informacionComplementaria = [
    { 
      id: 'certificados',
      title: 'CERTIFICADOS DE NIVEL GREMIAL',
      icon: <DescriptionIcon />,
      items: [] // Vacío porque ahora manejamos certificados por separado
    },
    { 
      id: 'cumplimiento_organizacional',
      title: 'CUMPLIMIENTO ORGANIZACIONAL',
      icon: <VerifiedIcon />,
      items: []
    },
    { 
      id: 'documentacion',
      title: 'DOCUMENTACIÓN OFICIAL',
      icon: <DescriptionIcon />,
      items: [
        { name: 'Identificación oficial (INE, pasaporte)', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Comprobante de domicilio (reciente)', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Acta de nacimiento', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Fotografía digital reciente', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
    { 
      id: 'profesional',
      title: 'INFORMACIÓN PROFESIONAL',
      icon: <WorkIcon />,
      items: [
        { name: 'CV Actualizado', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Títulos Profesionales', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Cursos y Certificaciones', status: 'pendiente', icon: <WarningIcon /> },
      ]
    },
    { 
      id: 'legal',
      title: 'DOCUMENTACIÓN LEGAL Y FISCAL',
      icon: <BusinessIcon />,
      items: [
        { name: 'Constancia de Situación Fiscal', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Opinión de Cumplimiento', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Poderes Notariales', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
    { 
      id: 'laboral',
      title: 'INFORMACIÓN LABORAL',
      icon: <WorkIcon />,
      items: [
        { name: 'Contrato Laboral', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Cartas Recomendación', status: 'pendiente', icon: <WarningIcon /> },
        { name: 'Historial Laboral', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
    { 
      id: 'seguridad',
      title: 'INFORMACIÓN DE SEGURIDAD Y CUMPLIMIENTO',
      icon: <SecurityIcon />,
      items: [
        { name: 'Certificado de Antecedentes', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Declaración Patrimonial', status: 'pendiente', icon: <WarningIcon /> },
        { name: 'Constancia de No Inhabilitación', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
    { 
      id: 'digital',
      title: 'DOCUMENTACIÓN DIGITAL',
      icon: <CloudUploadIcon />,
      items: [
        { name: 'Firma Digital', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Certificado Digital SAT', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Tokens de Seguridad', status: 'pendiente', icon: <WarningIcon /> },
      ]
    },
    { 
      id: 'otros',
      title: 'OTROS ELEMENTOS RECOMENDADOS',
      icon: <AddIcon />,
      items: [
        { name: 'Pólizas de Seguro', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Referencias Bancarias', status: 'pendiente', icon: <WarningIcon /> },
        { name: 'Cartas de Presentación', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
  ];

  // Configuración de items que deben tener iconos opacos
  const opacosItems = [
    { section: 'certificados', itemName: 'Cédula Profesional' },
    { section: 'otros', itemName: 'Referencias Bancarias' },
    { section: 'digital', itemName: 'Tokens de Seguridad' },
    { section: 'seguridad', itemName: 'Declaración Patrimonial' },
    { section: 'laboral', itemName: 'Cartas Recomendación' },
    { section: 'profesional', itemName: 'Cursos y Certificaciones' }
  ];

  // Array de secciones que tienen el botón "Agregar Documento" siempre habilitado
  const seccionesConBotonAgregar = ['certificados', 'profesional', 'laboral', 'seguridad', 'digital', 'otros'];

  // Función para verificar si un item debe ser opaco
  const esItemOpaco = (sectionId, itemName) => {
    return opacosItems.some(item => item.section === sectionId && item.itemName === itemName);
  };

  const calculateCompliance = () => {
    const allItems = informacionComplementaria.flatMap(section => section.items);
    const completed = allItems.filter(item => item.status === 'completo').length;
    return Math.round((completed / allItems.length) * 100);
  };

  const compliance = calculateCompliance();

  // Función para renderizar Certificados con subsecciones
  const renderCertificados = () => {
    const section = informacionComplementaria.find(s => s.id === 'certificados');
    const estadoValidacion = obtenerEstadoValidacion(section.id);
    
    return (
      <Accordion 
        key={section.id}
        expanded={expanded === section.id}
        onChange={handleAccordionChange(section.id)}
        sx={{ 
          mb: 2,
          border: '2px solid',
          borderColor: colors.accents.blue,
          borderRadius: '8px !important',
          boxShadow: `0 2px 12px ${colors.accents.blue}20`,
          '&:before': { display: 'none' }
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            backgroundColor: expanded === section.id ? '#e3f2fd' : 'white',
            borderRadius: '8px',
            minHeight: '70px'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#e3f2fd',
              color: colors.accents.blue
            }}>
              {section.icon}
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ 
                fontWeight: '700', 
                color: colors.text.primary,
                fontSize: '1rem',
                mb: 0.5
              }}>
                {section.title}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={`${Object.values(certificadosData).filter(c => c.horasAcumuladas >= c.horasRequeridas).length}/2`}
                size="small"
                color="success"
                sx={{ 
                  height: '24px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}
              />
              {estadoValidacion.enviado && (
                <Chip 
                  icon={<CheckCircleIcon />}
                  label="En revisión"
                  size="small"
                  color="info"
                  sx={{ height: '24px' }}
                />
              )}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3, pb: 3 }}>
          
          {/* Estado de validación si ya fue enviado */}
          {estadoValidacion.enviado && (
            <Alert 
              severity="info" 
              sx={{ mb: 3, backgroundColor: '#e3f2fd' }}
              icon={<VerifiedIcon />}
            >
              <Typography variant="body2">
                <strong>Documentos enviados a revisión por el comité</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Los documentos de esta sección se enviaron el {estadoValidacion.fechaEnvio}
              </Typography>
            </Alert>
          )}
          
          {/* Subsección 1: Formación Ética y Cumplimiento */}
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              mb: 4,
              borderRadius: 2,
              border: `2px solid ${colors.primary.main}20`,
              '&:hover': {
                borderColor: colors.accents.blue
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: '600',
                color: colors.text.primary,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                <SchoolIcon sx={{ color: colors.accents.blue }} />
                Formación Ética y Cumplimiento
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    Horas requeridas: <strong>20</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    Horas acumuladas: <strong>{certificadosData.formacionEtica.horasAcumuladas}</strong>
                  </Typography>
                </Box>
                <Chip 
                  label={certificadosData.formacionEtica.horasAcumuladas >= certificadosData.formacionEtica.horasRequeridas ? "CUMPLE" : "PENDIENTE"}
                  color={certificadosData.formacionEtica.horasAcumuladas >= certificadosData.formacionEtica.horasRequeridas ? "success" : "warning"}
                  size="small"
                  sx={{ fontWeight: '600' }}
                />
              </Box>
            </Box>
            
            {/* Lista de certificaciones */}
            {certificadosData.formacionEtica.certificaciones.length > 0 ? (
              <List dense sx={{ py: 0, mb: 2 }}>
                {certificadosData.formacionEtica.certificaciones.map((cert) => (
                  <ListItem 
                    key={cert.id}
                    sx={{ 
                      py: 1.5,
                      px: 2,
                      mb: 1,
                      borderRadius: 1,
                      backgroundColor: '#fff',
                      border: `1px solid ${colors.primary.main}20`,
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        borderColor: colors.primary.main
                      }
                    }}
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: colors.primary.main,
                            backgroundColor: `${colors.primary.main}15`,
                            '&:hover': { backgroundColor: `${colors.primary.main}25` }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: colors.status.success,
                            backgroundColor: '#e8f5e9',
                            '&:hover': { backgroundColor: '#c8e6c9' }
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        {editMode && (
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: colors.status.error,
                              backgroundColor: '#ffebee',
                              '&:hover': { backgroundColor: '#ffcdd2' }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Stack>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 44 }}>
                      <CheckCircleIcon sx={{ 
                        color: colors.status.success, 
                        fontSize: '1.5rem',
                        backgroundColor: '#e8f5e9',
                        borderRadius: '50%',
                        p: 0.5
                      }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '600' }}>
                            {cert.nombre}
                          </Typography>
                          <Chip 
                            label={`${cert.horas} hrs`}
                            size="small"
                            sx={{ 
                              height: '20px',
                              fontSize: '0.7rem',
                              backgroundColor: colors.primary.light,
                              color: 'white'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                          {cert.institucion} • {new Date(cert.fecha).toLocaleDateString('es-MX')}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Alert severity="info" sx={{ mb: 2 }}>
                No hay certificaciones cargadas en esta sección
              </Alert>
            )}
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              p: 2,
              backgroundColor: '#f8f9fa',
              borderRadius: 2,
              border: `1px solid ${colors.primary.main}20`
            }}>
            <Button
                startIcon={<AddIcon />}
                size="small"
                variant="outlined"
                onClick={() => handleOpenAddDialog('certificados', 'formacionEtica')}
                sx={{ 
                  fontSize: '0.85rem', 
                  textTransform: 'none',
                  px: 3,
                  color: colors.primary.main,
                  borderColor: colors.primary.main
                }}
              >
                Agregar Certificación
              </Button>
            </Box>
          </Paper>

          {/* Subsección 2: Actualización Técnica y Aduanera */}
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              border: `2px solid ${colors.primary.main}20`,
              '&:hover': {
                borderColor: colors.secondary.main
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: '600',
                color: colors.text.primary,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                <UpdateIcon sx={{ color: colors.secondary.main }} />
                Actualización Técnica y Aduanera
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    Horas requeridas: <strong>80</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    Horas acumuladas: <strong>{certificadosData.actualizacionTecnica.horasAcumuladas}</strong>
                  </Typography>
                </Box>
                <Chip 
                  label={certificadosData.actualizacionTecnica.horasAcumuladas >= certificadosData.actualizacionTecnica.horasRequeridas ? "CUMPLE" : "PENDIENTE"}
                  color={certificadosData.actualizacionTecnica.horasAcumuladas >= certificadosData.actualizacionTecnica.horasRequeridas ? "success" : "warning"}
                  size="small"
                  sx={{ fontWeight: '600' }}
                />
              </Box>
            </Box>
            
            {/* Lista de certificaciones */}
            {certificadosData.actualizacionTecnica.certificaciones.length > 0 ? (
              <List dense sx={{ py: 0, mb: 2 }}>
                {certificadosData.actualizacionTecnica.certificaciones.map((cert) => (
                  <ListItem 
                    key={cert.id}
                    sx={{ 
                      py: 1.5,
                      px: 2,
                      mb: 1,
                      borderRadius: 1,
                      backgroundColor: '#fff',
                      border: `1px solid ${colors.primary.main}20`,
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        borderColor: colors.primary.main
                      }
                    }}
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: colors.primary.main,
                            backgroundColor: `${colors.primary.main}15`,
                            '&:hover': { backgroundColor: `${colors.primary.main}25` }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: colors.status.success,
                            backgroundColor: '#e8f5e9',
                            '&:hover': { backgroundColor: '#c8e6c9' }
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        {editMode && (
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: colors.status.error,
                              backgroundColor: '#ffebee',
                              '&:hover': { backgroundColor: '#ffcdd2' }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Stack>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 44 }}>
                      <CheckCircleIcon sx={{ 
                        color: colors.status.success, 
                        fontSize: '1.5rem',
                        backgroundColor: '#e8f5e9',
                        borderRadius: '50%',
                        p: 0.5
                      }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '600' }}>
                            {cert.nombre}
                          </Typography>
                          <Chip 
                            label={`${cert.horas} hrs`}
                            size="small"
                            sx={{ 
                              height: '20px',
                              fontSize: '0.7rem',
                              backgroundColor: colors.secondary.main,
                              color: 'white'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                          {cert.institucion} • {new Date(cert.fecha).toLocaleDateString('es-MX')}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Alert severity="info" sx={{ mb: 2 }}>
                No hay certificaciones cargadas en esta sección
              </Alert>
            )}
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              p: 2,
              backgroundColor: '#f8f9fa',
              borderRadius: 2,
              border: `1px solid ${colors.primary.main}20`
            }}>
               <Button
                startIcon={<AddIcon />}
                size="small"
                variant="outlined"
                onClick={() => handleOpenAddDialog('certificados', 'actualizacionTecnica')}
                sx={{ 
                  fontSize: '0.85rem', 
                  textTransform: 'none',
                  px: 3,
                  color: colors.primary.main,
                  borderColor: colors.primary.main
                }}
              >
                Agregar Certificación
              </Button>
            </Box>
          </Paper>
          
          {/* Botón de validación */}
          <Box sx={{ 
            mt: 3, 
            p: 2.5, 
            backgroundColor: '#f8f9fa', 
            borderRadius: 2,
            border: `1px solid ${colors.primary.main}20`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: '600', color: colors.text.primary, mb: 0.5 }}>
                  Validación de Certificaciones
                </Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Una vez completadas las certificaciones requeridas, envíelas para revisión por el comité
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => handleAbrirValidacionDialog(section.id, section.title)}
                disabled={estadoValidacion.enviado}
                sx={{ 
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  bgcolor: colors.primary.main,
                  '&:hover': { bgcolor: colors.primary.dark }
                }}
              >
                {estadoValidacion.enviado ? 'Enviado para Revisión' : 'Enviar para Validación'}
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  // Función para renderizar Cumplimiento Organizacional
  const renderCumplimientoOrganizacional = () => {
    const section = informacionComplementaria.find(s => s.id === 'cumplimiento_organizacional');
    const estadoValidacion = obtenerEstadoValidacion(section.id);
    
    return (
      <Accordion 
        key={section.id}
        expanded={expanded === section.id}
        onChange={handleAccordionChange(section.id)}
        sx={{ 
          mb: 2,
          border: '2px solid',
          borderColor: colors.status.success,
          borderRadius: '8px !important',
          boxShadow: `0 2px 12px ${colors.status.success}20`,
          '&:before': { display: 'none' }
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            backgroundColor: expanded === section.id ? '#f1f8e9' : 'white',
            borderRadius: '8px',
            minHeight: '70px'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#e8f5e9',
              color: colors.status.success
            }}>
              {section.icon}
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ 
                fontWeight: '700', 
                color: colors.text.primary,
                fontSize: '1rem',
                mb: 0.5
              }}>
                {section.title}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={`${Object.values(cumplimientoData).filter(d => d.documento).length}/2`}
                size="small"
                color={Object.values(cumplimientoData).filter(d => d.documento).length === 2 ? "success" : "warning"}
                sx={{ 
                  height: '24px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}
              />
              {estadoValidacion.enviado && (
                <Chip 
                  icon={<CheckCircleIcon />}
                  label="En revisión"
                  size="small"
                  color="info"
                  sx={{ height: '24px' }}
                />
              )}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3, pb: 3 }}>
          
          {/* Estado de validación si ya fue enviado */}
          {estadoValidacion.enviado && (
            <Alert 
              severity="info" 
              sx={{ mb: 3, backgroundColor: '#e3f2fd' }}
              icon={<VerifiedIcon />}
            >
              <Typography variant="body2">
                <strong>Documentos enviados a revisión por el comité</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Los documentos de esta sección se enviaron el {estadoValidacion.fechaEnvio}
              </Typography>
            </Alert>
          )}
          
          {/* Subsección: Sistema de seguridad de Cadena de Suministros - YA CARGADO Y VALIDADO */}
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              border: `2px solid ${colors.status.success}`,
              backgroundColor: '#f1f8e9',
              '&:hover': {
                borderColor: colors.primary.main
              }
            }}
          >
            <Typography variant="h6" sx={{ 
              fontWeight: '600',
              color: colors.text.primary,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}>
              <SecurityIcon sx={{ color: colors.status.success }} />
              Sistema de seguridad de Cadena de Suministros
              <Chip 
                label="VALIDADO"
                size="small"
                sx={{ 
                  ml: 1,
                  bgcolor: colors.status.success,
                  color: 'white',
                  fontWeight: '600',
                  height: 24
                }}
              />
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Descripción del Sistema"
                  value={cumplimientoData.seguridadCadenaSuministro.descripcion}
                  onChange={(e) => handleDescripcionChange('seguridadCadenaSuministro', e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  helperText="Describa el sistema de gestión de seguridad para la cadena de suministro"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de Vigencia"
                  value={cumplimientoData.seguridadCadenaSuministro.vigencia || ''}
                  onChange={(e) => handleVigenciaChange('seguridadCadenaSuministro', e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  helperText="Fecha hasta la cual es válido el sistema"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                      <Typography variant="body2" sx={{ color: colors.text.primary, fontWeight: '500', flex: 1 }}>
                        Documento cargado: {cumplimientoData.seguridadCadenaSuministro.documento}
                      </Typography>
                      <Chip 
                        label="APROBADO"
                        size="small"
                        sx={{ 
                          bgcolor: colors.status.success,
                          color: 'white',
                          fontWeight: '600'
                        }}
                      />
                    </Box>
                    {cumplimientoData.seguridadCadenaSuministro.fechaRevision && (
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 2 }}>
                        Última revisión: {cumplimientoData.seguridadCadenaSuministro.fechaRevision}
                      </Typography>
                    )}
                    <Stack direction="row" spacing={2}>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        variant="outlined"
                        onClick={() => handleVerDocumento('seguridadCadenaSuministro')}
                        sx={{ 
                          textTransform: 'none',
                          color: colors.primary.main,
                          borderColor: colors.primary.main
                        }}
                      >
                        Ver Documento
                      </Button>
                      <Button
                        size="small"
                        startIcon={<CloudUploadIcon />}
                        variant="outlined"
                        onClick={() => handleDocumentoUpload('seguridadCadenaSuministro')}
                        sx={{ 
                          textTransform: 'none',
                          color: colors.primary.main,
                          borderColor: colors.primary.main
                        }}
                      >
                        Reemplazar
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Subsección: Antisobornos - SIN DOCUMENTO CARGADO */}
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `2px solid ${colors.primary.main}20`,
              '&:hover': {
                borderColor: colors.status.error
              }
            }}
          >
            <Typography variant="h6" sx={{ 
              fontWeight: '600',
              color: colors.text.primary,
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}>
              <GavelIcon sx={{ color: colors.status.error }} />
              Políticas Antisobornos
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Descripción de las Políticas"
                  value={cumplimientoData.antisobornos.descripcion}
                  onChange={(e) => handleDescripcionChange('antisobornos', e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  helperText="Describa las políticas y procedimientos antisoborno"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Fecha de Vigencia"
                  value={cumplimientoData.antisobornos.vigencia || ''}
                  onChange={(e) => handleVigenciaChange('antisobornos', e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  helperText="Fecha hasta la cual son válidas las políticas"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                  {cumplimientoData.antisobornos.documento ? (
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Typography variant="body2" sx={{ color: colors.text.primary, fontWeight: '500', flex: 1 }}>
                          Documento cargado: {cumplimientoData.antisobornos.documento}
                        </Typography>
                        <Chip 
                          label={cumplimientoData.antisobornos.estado === 'en_revision' ? "EN REVISIÓN" : "APROBADO"}
                          size="small"
                          color={cumplimientoData.antisobornos.estado === 'en_revision' ? "warning" : "success"}
                        />
                      </Box>
                      {cumplimientoData.antisobornos.fechaRevision && (
                        <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 2 }}>
                          Última revisión: {cumplimientoData.antisobornos.fechaRevision}
                        </Typography>
                      )}
                      <Stack direction="row" spacing={2}>
                        <Button
                          size="small"
                          startIcon={<VisibilityIcon />}
                          variant="outlined"
                          onClick={() => handleVerDocumento('antisobornos')}
                          sx={{ 
                            textTransform: 'none',
                            color: colors.primary.main,
                            borderColor: colors.primary.main
                          }}
                        >
                          Ver Documento
                        </Button>
                        <Button
                          size="small"
                          startIcon={<CloudUploadIcon />}
                          variant="outlined"
                          onClick={() => handleDocumentoUpload('antisobornos')}
                          sx={{ 
                            textTransform: 'none',
                            color: colors.primary.main,
                            borderColor: colors.primary.main
                          }}
                        >
                          Reemplazar
                        </Button>
                      </Stack>
                    </Box>
                  ) : (
                   <Button
  fullWidth
  startIcon={<CloudUploadIcon />}
  variant="contained"
  onClick={() => handleOpenUploadDialog('antisobornos', 'Políticas Antisobornos')}
  sx={{ 
    textTransform: 'none', 
    py: 1.5,
    bgcolor: colors.status.error,
    '&:hover': { bgcolor: colors.primary.dark }
  }}
>
  Cargar Documento de Políticas
</Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Botón de validación */}
          <Box sx={{ 
            mt: 3, 
            p: 2.5, 
            backgroundColor: '#f8f9fa', 
            borderRadius: 2,
            border: `1px solid ${colors.primary.main}20`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: '600', color: colors.text.primary, mb: 0.5 }}>
                  Validación de Documentos
                </Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Una vez completados los documentos, envíelos para revisión por el comité
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => handleAbrirValidacionDialog(section.id, section.title)}
                disabled={estadoValidacion.enviado}
                sx={{ 
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  bgcolor: colors.primary.main,
                  '&:hover': { bgcolor: colors.primary.dark }
                }}
              >
                {estadoValidacion.enviado ? 'Enviado para Revisión' : 'Enviar para Validación'}
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  // Función para renderizar Documentación Oficial
  const renderDocumentacionOficial = (section) => {
    const completedDocs = section.items.filter(item => item.status === 'completo').length;
    const totalDocs = section.items.length;
    const estadoValidacion = obtenerEstadoValidacion(section.id);
    
    return (
      <Accordion 
        key={section.id}
        expanded={expanded === section.id}
        onChange={handleAccordionChange(section.id)}
        sx={{ 
          mb: 2,
          border: '2px solid',
          borderColor: colors.accents.purple,
          borderRadius: '8px !important',
          boxShadow: `0 2px 12px ${colors.accents.purple}20`,
          '&:before': { display: 'none' }
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            backgroundColor: expanded === section.id ? '#f3e5f5' : 'white',
            borderRadius: '8px',
            minHeight: '70px'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: '#f3e5f5',
              color: colors.accents.purple
            }}>
              {section.icon}
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ 
                fontWeight: '700', 
                color: colors.text.primary,
                fontSize: '1rem',
                mb: 0.5
              }}>
                {section.title}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={`${completedDocs}/${totalDocs}`}
                size="small"
                color={completedDocs === totalDocs ? "success" : "warning"}
                sx={{ 
                  height: '24px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}
              />
              {estadoValidacion.enviado && (
                <Chip 
                  icon={<CheckCircleIcon />}
                  label="En revisión"
                  size="small"
                  color="info"
                  sx={{ height: '24px' }}
                />
              )}
              <LinearProgress 
                variant="determinate" 
                value={(completedDocs / totalDocs) * 100}
                sx={{ 
                  width: '60px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: `${colors.primary.main}15`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: colors.accents.purple
                  }
                }}
              />
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3, pb: 3 }}>
          {/* Estado de validación si ya fue enviado */}
          {estadoValidacion.enviado && (
            <Alert 
              severity="info" 
              sx={{ mb: 3, backgroundColor: '#f3e5f5' }}
              icon={<VerifiedIcon />}
            >
              <Typography variant="body2">
                <strong>Documentos enviados a revisión por el comité</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Los documentos de esta sección se enviaron el {estadoValidacion.fechaEnvio}
              </Typography>
            </Alert>
          )}
          
          <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 3, lineHeight: 1.6 }}>
            Documentación oficial requerida para el expediente. Verifique y actualice cada documento según corresponda.
          </Typography>
          
          <Grid container spacing={2}>
            {section.items.map((doc, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2.5, 
                    borderRadius: 2,
                    border: `2px solid ${colors.primary.main}20`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: colors.accents.purple,
                      boxShadow: `0 4px 12px ${colors.accents.purple}20`
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: '600',
                      color: colors.text.primary,
                      fontSize: '0.95rem',
                      lineHeight: 1.3,
                      flex: 1
                    }}>
                      {doc.name}
                    </Typography>
                    <Box sx={{ ml: 1 }}>
                      {doc.status === 'completo' ? (
                        <CheckCircleIcon sx={{ color: colors.status.success, fontSize: '1.5rem' }} />
                      ) : (
                        <WarningIcon sx={{ color: colors.status.warning, fontSize: '1.5rem' }} />
                      )}
                    </Box>
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }} />
                  
                  <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      size="small"
                      startIcon={<VisibilityIcon />}
                      variant="outlined"
                      onClick={handleSeeCertification}
                      sx={{ 
                        fontSize: '0.8rem', 
                        py: 1,
                        textTransform: 'none',
                        color: colors.primary.main,
                        borderColor: colors.primary.main
                      }}
                    >
                      VER DOCUMENTO
                    </Button>
                    <Button
                      fullWidth
                      size="small"
                      startIcon={<CloudUploadIcon />}
                      variant="contained"
                      onClick={handleUploadCertification}
                      sx={{ 
                        fontSize: '0.8rem', 
                        py: 1,
                        textTransform: 'none',
                        bgcolor: colors.secondary.main,
                        '&:hover': { bgcolor: colors.secondary.light }
                      }}
                    >
                      ACTUALIZAR
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          {/* Botón de validación */}
          <Box sx={{ 
            mt: 3, 
            p: 2.5, 
            backgroundColor: '#f8f9fa', 
            borderRadius: 2,
            border: `1px solid ${colors.primary.main}20`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: '600', color: colors.text.primary, mb: 0.5 }}>
                  Validación de Documentos
                </Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Una vez completados los documentos, envíelos para revisión por el comité
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => handleAbrirValidacionDialog(section.id, section.title)}
                disabled={estadoValidacion.enviado || completedDocs < totalDocs}
                sx={{ 
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  bgcolor: colors.primary.main,
                  '&:hover': { bgcolor: colors.primary.dark }
                }}
              >
                {estadoValidacion.enviado ? 'Enviado para Revisión' : 'Enviar para Validación'}
              </Button>
            </Box>
            
            {completedDocs < totalDocs && !estadoValidacion.enviado && (
              <Alert severity="warning" sx={{ mt: 2, py: 1 }}>
                <Typography variant="body2">
                  Complete todos los documentos antes de enviar para validación
                </Typography>
              </Alert>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  // Función para renderizar secciones normales
  const renderSeccionNormal = (section) => {
    const completedItems = section.items.filter(item => item.status === 'completo').length;
    const totalItems = section.items.length;
    const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    const estadoValidacion = obtenerEstadoValidacion(section.id);
    
    return (
      <Accordion 
        key={section.id}
        expanded={expanded === section.id}
        onChange={handleAccordionChange(section.id)}
        sx={{ 
          mb: 2,
          border: '2px solid',
          borderColor: completionPercentage === 100 ? colors.status.success : colors.status.warning,
          borderRadius: '8px !important',
          boxShadow: `0 2px 12px ${completionPercentage === 100 ? colors.status.success + '20' : colors.status.warning + '20'}`,
          '&:before': { display: 'none' }
        }}
      >
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          sx={{ 
            backgroundColor: expanded === section.id ? '#f8f9fa' : 'white',
            borderRadius: '8px',
            minHeight: '70px',
            transition: 'all 0.2s'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: completionPercentage === 100 ? '#e8f5e9' : '#fff3e0',
              color: completionPercentage === 100 ? colors.status.success : colors.status.warning
            }}>
              {section.icon}
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ 
                fontWeight: '700', 
                color: colors.text.primary,
                fontSize: '1rem',
                mb: 0.5
              }}>
                {section.title}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'center', minWidth: '60px' }}>
                <Typography variant="h6" sx={{ 
                  color: completionPercentage === 100 ? colors.status.success : colors.status.warning,
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}>
                  {Math.round(completionPercentage)}%
                </Typography>
                <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                  Completado
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip 
                  label={`${completedItems}/${totalItems}`}
                  size="small"
                  color={completionPercentage === 100 ? "success" : "warning"}
                  sx={{ 
                    height: '24px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}
                />
                {estadoValidacion.enviado && (
                  <Chip 
                    icon={<CheckCircleIcon />}
                    label="En revisión"
                    size="small"
                    color="info"
                    sx={{ height: '24px' }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3, pb: 3 }}>
          {/* Estado de validación si ya fue enviado */}
          {estadoValidacion.enviado && (
            <Alert 
              severity="info" 
              sx={{ mb: 3, backgroundColor: '#f8f9fa' }}
              icon={<VerifiedIcon />}
            >
              <Typography variant="body2">
                <strong>Documentos enviados a revisión por el comité</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Los documentos de esta sección se enviaron el {estadoValidacion.fechaEnvio}
              </Typography>
            </Alert>
          )}
          
          <List dense sx={{ py: 0, mb: 3 }}>
            {section.items.map((item, index) => (
              <ListItem 
                key={index}
                sx={{ 
                  py: 2,
                  px: 2,
                  mb: 1,
                  borderRadius: 1,
                  backgroundColor: '#fff',
                  border: `1px solid ${colors.primary.main}20`,
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    borderColor: colors.primary.main
                  }
                }}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    {/* Verificar si este item debe ser opaco */}
                    {esItemOpaco(section.id, item.name) ? (
                      // Items opacos: mostrar iconos con opacidad reducida
                      <>
                        <IconButton 
                          size="small" 
                          disabled
                          sx={{ 
                            color: colors.primary.main,
                            backgroundColor: `${colors.primary.main}15`,
                            '&:hover': { backgroundColor: `${colors.primary.main}25` },
                            opacity: 0.4,
                            cursor: 'not-allowed'
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          disabled
                          sx={{ 
                            color: colors.status.success,
                            backgroundColor: '#e8f5e9',
                            '&:hover': { backgroundColor: '#c8e6c9' },
                            opacity: 0.4,
                            cursor: 'not-allowed'
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        {editMode && (
                          <IconButton 
                            size="small" 
                            disabled
                            sx={{ 
                              color: colors.status.error,
                              backgroundColor: '#ffebee',
                              '&:hover': { backgroundColor: '#ffcdd2' },
                              opacity: 0.4,
                              cursor: 'not-allowed'
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </>
                    ) : (
                      // Items normales: mostrar iconos normales
                      <>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: colors.primary.main,
                            backgroundColor: `${colors.primary.main}15`,
                            '&:hover': { backgroundColor: `${colors.primary.main}25` }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: colors.status.success,
                            backgroundColor: '#e8f5e9',
                            '&:hover': { backgroundColor: '#c8e6c9' }
                          }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        {editMode && (
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: colors.status.error,
                              backgroundColor: '#ffebee',
                              '&:hover': { backgroundColor: '#ffcdd2' }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </>
                    )}
                  </Stack>
                }
              >
                <ListItemIcon sx={{ minWidth: 44 }}>
                  {item.status === 'completo' ? (
                    <CheckCircleIcon sx={{ 
                      color: colors.status.success, 
                      fontSize: '1.5rem',
                      backgroundColor: '#e8f5e9',
                      borderRadius: '50%',
                      p: 0.5
                    }} />
                  ) : (
                    <WarningIcon sx={{ 
                      color: colors.status.warning, 
                      fontSize: '1.5rem',
                      backgroundColor: '#fff3e0',
                      borderRadius: '50%',
                      p: 0.5
                    }} />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary={item.name}
                  primaryTypographyProps={{
                    color: item.status === 'completo' ? colors.text.primary : colors.text.secondary,
                    fontWeight: item.status === 'completo' ? '600' : '500',
                    fontSize: '0.95rem',
                    lineHeight: 1.4
                  }}
                />
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            p: 2,
            backgroundColor: '#f8f9fa',
            borderRadius: 2,
            border: `1px solid ${colors.primary.main}20`
          }}>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              {section.items.length} documentos en esta sección
            </Typography>
            <Button
              startIcon={<AddIcon />}
              size="small"
              variant="outlined"
              disabled={!seccionesConBotonAgregar.includes(section.id) && !editMode}
              onClick={() => {
                if (seccionesConBotonAgregar.includes(section.id)) {
                  handleOpenAddDialog(section.id);
                }
              }}
              sx={{ 
                fontSize: '0.85rem', 
                textTransform: 'none',
                px: 3,
                color: colors.primary.main,
                borderColor: colors.primary.main,
                opacity: seccionesConBotonAgregar.includes(section.id) ? 1 : (editMode ? 1 : 0.5)
              }}
            >
              Agregar Documento
            </Button>
          </Box>
          
          {/* Botón de validación */}
          <Box sx={{ 
            mt: 3, 
            p: 2.5, 
            backgroundColor: '#f8f9fa', 
            borderRadius: 2,
            border: `1px solid ${colors.primary.main}20`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: '600', color: colors.text.primary, mb: 0.5 }}>
                  Validación de Documentos
                </Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Una vez completados los documentos, envíelos para revisión por el comité
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => handleAbrirValidacionDialog(section.id, section.title)}
                disabled={estadoValidacion.enviado || completedItems < totalItems}
                sx={{ 
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  bgcolor: colors.primary.main,
                  '&:hover': { bgcolor: colors.primary.dark }
                }}
              >
                {estadoValidacion.enviado ? 'Enviado para Revisión' : 'Enviar para Validación'}
              </Button>
            </Box>
            
            {completedItems < totalItems && !estadoValidacion.enviado && (
              <Alert severity="warning" sx={{ mt: 2, py: 1 }}>
                <Typography variant="body2">
                  Complete todos los documentos ({completedItems}/{totalItems}) antes de enviar para validación
                </Typography>
              </Alert>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 1 }}>
            Expediente Digital
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary }}>
            Documentación completa para el cumplimiento normativo
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ 
              textTransform: 'none',
              color: colors.primary.main,
              borderColor: colors.primary.main
            }}
          >
            Exportar Expediente
          </Button>
        </Stack>
      </Box>

      {/* Nivel de Cumplimiento con Resumen de Estado integrado */}
      <Card sx={{ 
        mb: 4, 
        bgcolor: compliance >= 90 ? '#e8f5e9' : 
                 compliance >= 70 ? '#fffde7' : '#ffebee'
      }}>
        <CardContent>
          <Grid container alignItems="center" spacing={3}>
            {/* Sección izquierda: Porcentaje + Información de estado */}
            <Grid item xs={12} md={7}>
              <Grid container spacing={2} alignItems="center">
                {/* Porcentaje grande */}
                <Grid item xs={4} sm={3} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ 
                      color: compliance >= 90 ? colors.status.success : 
                             compliance >= 70 ? colors.status.warning : colors.status.error,
                      fontWeight: 'bold',
                      mb: 0.5,
                      fontSize: { xs: '3rem', sm: '3.5rem' }
                    }}>
                      {compliance}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.text.secondary, fontWeight: '500' }}>
                      Cumplimiento
                    </Typography>
                  </Box>
                </Grid>
                
                {/* Separador vertical */}
                <Grid item xs="auto" sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Divider orientation="vertical" sx={{ height: '60px' }} />
                </Grid>
                
                {/* Información de estado y progreso */}
                <Grid item xs={8} sm={8} md={8}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: 'bold', fontSize: '1.1rem' }}>
                      Nivel de Cumplimiento
                    </Typography>
                    <Chip 
                      label={compliance >= 90 ? 'ALTO CUMPLIMIENTO' : 
                             compliance >= 70 ? 'CUMPLIMIENTO MEDIO' : 'CUMPLIMIENTO BAJO'}
                      color={compliance >= 90 ? 'success' : 
                             compliance >= 70 ? 'warning' : 'error'}
                      size="small"
                      sx={{ height: '24px' }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 2 }}>
                    {compliance >= 90 ? 'Tu expediente está completo y vigente' : 
                     compliance >= 70 ? 'Faltan algunos documentos por completar' : 
                     'Requiere atención inmediata para completar la documentación'}
                  </Typography>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={compliance}
                    sx={{ 
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: compliance >= 90 ? colors.status.success : 
                                         compliance >= 70 ? colors.status.warning : colors.status.error
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            {/* Separador vertical principal */}
            <Grid item xs="auto" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Divider orientation="vertical" sx={{ height: '80px' }} />
            </Grid>
            
            {/* Sección derecha: Estadísticas del Resumen de Estado */}
            <Grid item xs={12} md={4}>
              <Grid container spacing={1.5}>
                {/* Primera fila de estadísticas */}
                <Grid item xs={6}>
                  <Paper sx={{ p: 1.5, textAlign: 'center', borderRadius: 2, height: '100%' }}>
                    <Typography variant="h5" sx={{ color: colors.status.success, fontWeight: 'bold', mb: 0.5 }}>
                      7/7
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, fontWeight: '500', fontSize: '0.7rem' }}>
                      Certificaciones Vigentes
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper sx={{ p: 1.5, textAlign: 'center', borderRadius: 2, height: '100%' }}>
                    <Typography variant="h5" sx={{ color: colors.status.warning, fontWeight: 'bold', mb: 0.5 }}>
                      2
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, fontWeight: '500', fontSize: '0.7rem' }}>
                      Próx. Vencimientos
                    </Typography>
                  </Paper>
                </Grid>
                
                {/* Segunda fila de estadísticas */}
                <Grid item xs={6}>
                  <Paper sx={{ p: 1.5, textAlign: 'center', borderRadius: 2, height: '100%' }}>
                    <Typography variant="h5" sx={{ color: colors.status.error, fontWeight: 'bold', mb: 0.5 }}>
                      1
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, fontWeight: '500', fontSize: '0.7rem' }}>
                      Observaciones
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper sx={{ p: 1.5, textAlign: 'center', borderRadius: 2, height: '100%' }}>
                    <Typography variant="h6" sx={{ color: colors.primary.main, fontWeight: 'bold', mb: 0.5, fontSize: '1rem' }}>
                      15/03/26
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, fontWeight: '500', fontSize: '0.7rem' }}>
                      Próx. Revisión
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
              El expediente se revisa semestralmente para mantenerlo actualizado.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Lista completa de todos los apartados en una sola columna */}
      <Box>
        <Typography variant="h5" sx={{ 
          color: colors.primary.dark, 
          mb: 3, 
          fontWeight: 'bold',
          borderBottom: `3px solid ${colors.primary.dark}`,
          pb: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          # INFORMACIÓN COMPLEMENTARIA COMPLETA
        </Typography>
        
        {/* Renderizar todos los apartados en orden */}
        {informacionComplementaria.map((section) => {
          if (section.id === 'certificados') {
            return renderCertificados();
          } else if (section.id === 'cumplimiento_organizacional') {
            return renderCumplimientoOrganizacional();
          } else if (section.id === 'documentacion') {
            return renderDocumentacionOficial(section);
          } else {
            return renderSeccionNormal(section);
          }
        })}
      </Box>

      {/* Diálogo para agregar documento */}
      <Dialog open={addDialog.open} onClose={() => setAddDialog({...addDialog, open: false})} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${colors.primary.main}20`, 
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: colors.primary.dark,
          fontWeight: 'bold'
        }}>
          <CloudUploadIcon sx={{ color: colors.primary.main }} />
          Subir Nueva Certificación
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Grid container spacing={2.5}>
            {/* Subsección (solo visible para certificados) */}
            {addDialog.sectionId === 'certificados' && (
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontWeight: '600' }}>
                  Subsección <span style={{ color: colors.status.error }}>*</span>
                </Typography>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={addDialog.subseccion}
                  onChange={(e) => setAddDialog({...addDialog, subseccion: e.target.value})}
                  placeholder="Seleccione la subsección"
                  required
                  sx={{ mt: 1 }}
                >
                  <MenuItem value="formacionEtica">Formación Ética y Cumplimiento</MenuItem>
                  <MenuItem value="actualizacionTecnica">Actualización Técnica y Aduanera</MenuItem>
                </TextField>
              </Grid>
            )}

            {/* Tipo de Documento */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontWeight: '600' }}>
                Nombre de la Certificación <span style={{ color: colors.status.error }}>*</span>
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={addDialog.tipoDocumento}
                onChange={(e) => setAddDialog({...addDialog, tipoDocumento: e.target.value})}
                placeholder="Ej: Diplomado en Comercio Exterior"
                required
                sx={{ mt: 1 }}
              />
            </Grid>

            {/* Horas de la certificación */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontWeight: '600' }}>
                Horas de la Certificación <span style={{ color: colors.status.error }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type="number"
                size="small"
                value={addDialog.horas}
                onChange={(e) => setAddDialog({...addDialog, horas: e.target.value})}
                placeholder="Ej: 20"
                required
                inputProps={{ min: 1 }}
                sx={{ mt: 1 }}
              />
            </Grid>

            {/* Fecha del Documento */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontWeight: '600' }}>
                Fecha de Expedición
              </Typography>
              <TextField
                fullWidth
                type="date"
                size="small"
                value={addDialog.fecha}
                onChange={(e) => setAddDialog({...addDialog, fecha: e.target.value})}
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 1 }}
              />
            </Grid>

            {/* Área de subida de archivo */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontWeight: '600' }}>
                Archivo <span style={{ color: colors.status.error }}>*</span>
              </Typography>
              
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 3,
                  border: `2px dashed ${addDialog.archivo ? colors.status.success : colors.primary.main}40`,
                  borderRadius: 2,
                  backgroundColor: addDialog.archivo ? '#f8f9fa' : 'transparent',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  textAlign: 'center',
                  '&:hover': {
                    borderColor: colors.primary.main,
                    backgroundColor: '#f8f9fa'
                  }
                }}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                
                {addDialog.archivo ? (
                  <>
                    <CheckCircleIcon sx={{ color: colors.status.success, fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: colors.text.primary, fontWeight: '500' }}>
                      {addDialog.nombreArchivo}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mt: 1 }}>
                      Archivo seleccionado correctamente
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddDialog({...addDialog, archivo: null, nombreArchivo: ''});
                      }}
                      sx={{ mt: 1, color: colors.status.error, borderColor: colors.status.error }}
                    >
                      Quitar archivo
                    </Button>
                  </>
                ) : (
                  <>
                    <CloudUploadIcon sx={{ color: colors.primary.main, fontSize: 40, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: colors.text.primary, fontWeight: '500' }}>
                      Haz clic para seleccionar un archivo
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mt: 1 }}>
                      Formatos permitidos: PDF, DOC, DOCX, JPG, PNG (Máx. 10MB)
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>

            {/* Información adicional */}
            <Grid item xs={12}>
              <Alert severity="info" sx={{ backgroundColor: `${colors.primary.main}10`, fontSize: '0.85rem', mt: 1 }}>
                <Typography variant="body2">
                  <strong>Nota:</strong> Las certificaciones subidas serán revisadas por el comité de cumplimiento.
                  Asegúrese de que la documentación sea legible y las horas sean correctas.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.primary.main}20` }}>
          <Button 
            onClick={() => setAddDialog({...addDialog, open: false})}
            variant="outlined"
            sx={{ 
              textTransform: 'none',
              color: colors.primary.main,
              borderColor: colors.primary.main
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleGuardarCertificacion}
            variant="contained"
            disabled={!addDialog.tipoDocumento || !addDialog.archivo || !addDialog.horas || (addDialog.sectionId === 'certificados' && !addDialog.subseccion)}
            sx={{ 
              textTransform: 'none',
              bgcolor: colors.primary.main,
              '&:hover': { bgcolor: colors.primary.dark },
              '&.Mui-disabled': {
                bgcolor: '#e0e0e0'
              }
            }}
          >
            Subir Certificación
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para subir documento de cumplimiento */}
<Dialog 
  open={uploadDialog.open} 
  onClose={() => setUploadDialog({ open: false, tipo: '', titulo: '', archivo: null, nombreArchivo: '' })} 
  maxWidth="sm" 
  fullWidth
>
  <DialogTitle sx={{ 
    borderBottom: `1px solid ${colors.primary.main}20`, 
    pb: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: colors.primary.dark,
    fontWeight: 'bold'
  }}>
    <CloudUploadIcon sx={{ color: colors.primary.main }} />
    Subir Documento: {uploadDialog.titulo}
  </DialogTitle>
  
  <DialogContent sx={{ pt: 3, pb: 2 }}>
    <Grid container spacing={2.5}>
      {/* Fecha de Vigencia */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontWeight: '600' }}>
          Fecha de Vigencia
        </Typography>
        <TextField
          fullWidth
          type="date"
          size="small"
          value={cumplimientoData[uploadDialog.tipo]?.vigencia || ''}
          onChange={(e) => handleVigenciaChange(uploadDialog.tipo, e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Área de subida de archivo */}
      <Grid item xs={12}>
        <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontWeight: '600' }}>
          Archivo <span style={{ color: colors.status.error }}>*</span>
        </Typography>
        
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 3,
            border: `2px dashed ${uploadDialog.archivo ? colors.status.success : colors.primary.main}40`,
            borderRadius: 2,
            backgroundColor: uploadDialog.archivo ? '#f8f9fa' : 'transparent',
            transition: 'all 0.2s',
            cursor: 'pointer',
            textAlign: 'center',
            '&:hover': {
              borderColor: colors.primary.main,
              backgroundColor: '#f8f9fa'
            }
          }}
          onClick={() => document.getElementById('cumplimiento-file-upload').click()}
        >
          <input
            id="cumplimiento-file-upload"
            type="file"
            style={{ display: 'none' }}
            accept=".pdf,.doc,.docx"
            onChange={handleCumplimientoFileSelect}
          />
          
          {uploadDialog.archivo ? (
            <>
              <CheckCircleIcon sx={{ color: colors.status.success, fontSize: 40, mb: 1 }} />
              <Typography variant="body1" sx={{ color: colors.text.primary, fontWeight: '500' }}>
                {uploadDialog.nombreArchivo}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mt: 1 }}>
                Archivo seleccionado correctamente
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadDialog({
                    ...uploadDialog,
                    archivo: null,
                    nombreArchivo: ''
                  });
                }}
                sx={{ mt: 1, color: colors.status.error, borderColor: colors.status.error }}
              >
                Quitar archivo
              </Button>
            </>
          ) : (
            <>
              <CloudUploadIcon sx={{ color: colors.primary.main, fontSize: 40, mb: 1 }} />
              <Typography variant="body1" sx={{ color: colors.text.primary, fontWeight: '500' }}>
                Haz clic para seleccionar un archivo
              </Typography>
              <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mt: 1 }}>
                Formatos permitidos: PDF, DOC, DOCX (Máx. 10MB)
              </Typography>
            </>
          )}
        </Paper>
      </Grid>

      {/* Información adicional */}
      <Grid item xs={12}>
        <Alert severity="info" sx={{ backgroundColor: `${colors.primary.main}10`, fontSize: '0.85rem' }}>
          <Typography variant="body2">
            <strong>Nota:</strong> Los documentos de cumplimiento organizacional serán revisados por el comité.
            Asegúrese de que la documentación esté completa y vigente.
          </Typography>
        </Alert>
      </Grid>
    </Grid>
  </DialogContent>
  
  <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.primary.main}20` }}>
    <Button 
      onClick={() => setUploadDialog({ open: false, tipo: '', titulo: '', archivo: null, nombreArchivo: '' })}
      variant="outlined"
      sx={{ 
        textTransform: 'none',
        color: colors.primary.main,
        borderColor: colors.primary.main
      }}
    >
      Cancelar
    </Button>
    <Button 
      onClick={handleGuardarDocumentoCumplimiento}
      variant="contained"
      disabled={!uploadDialog.archivo}
      sx={{ 
        textTransform: 'none',
        bgcolor: colors.primary.main,
        '&:hover': { bgcolor: colors.primary.dark },
        '&.Mui-disabled': {
          bgcolor: '#e0e0e0'
        }
      }}
    >
      Subir Documento
    </Button>
  </DialogActions>
</Dialog>

      {/* Diálogo de confirmación de validación */}
      <Dialog open={validacionDialog.open} onClose={handleCerrarValidacionDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: `1px solid ${colors.primary.main}20`, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <SendIcon sx={{ color: colors.primary.main }} />
            <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: '600' }}>
              Enviar Documentos para Validación
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Alert severity="info" sx={{ mb: 3, backgroundColor: '#e3f2fd' }}>
            <Typography variant="body2" sx={{ fontWeight: '600', color: colors.primary.main }}>
              Confirmación de Envío
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              ¿Está seguro de enviar los documentos para revisión por el comité?
            </Typography>
          </Alert>
          
          <Paper variant="outlined" sx={{ p: 2.5, mb: 3, backgroundColor: '#f8f9fa' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: colors.text.secondary, fontWeight: '500', mb: 0.5 }}>
                  Apartado a validar:
                </Typography>
                <Typography variant="body1" sx={{ color: colors.primary.dark, fontWeight: '600' }}>
                  {validacionDialog.titulo}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: colors.text.secondary, fontWeight: '500', mb: 0.5 }}>
                  Fecha de envío:
                </Typography>
                <Typography variant="body1" sx={{ color: colors.primary.dark, fontWeight: '600' }}>
                  {validacionDialog.fecha}
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ color: colors.text.secondary, fontWeight: '500', mb: 0.5 }}>
                  Estado:
                </Typography>
                <Chip 
                  label="Enviado a revisión por el comité"
                  color="info"
                  size="small"
                  sx={{ fontWeight: '500' }}
                />
              </Grid>
            </Grid>
          </Paper>
          
          <Alert severity="warning" sx={{ backgroundColor: '#fff8e1' }}>
            <Typography variant="body2">
              <strong>Nota importante:</strong> Una vez enviados, los documentos no podrán ser modificados hasta que el comité complete la revisión.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: `1px solid ${colors.primary.main}20` }}>
          <Button 
            onClick={handleCerrarValidacionDialog}
            variant="outlined"
            sx={{ 
              textTransform: 'none',
              color: colors.primary.main,
              borderColor: colors.primary.main
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmarValidacion}
            variant="contained"
            startIcon={<SendIcon />}
            sx={{ 
              textTransform: 'none',
              bgcolor: colors.primary.main,
              '&:hover': { bgcolor: colors.primary.dark }
            }}
          >
            Confirmar Envío
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Expediente;