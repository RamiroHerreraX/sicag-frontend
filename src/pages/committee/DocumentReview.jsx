// src/pages/committee/DocumentReview.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  TextField,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  IconButton,
  Tooltip,
  LinearProgress,
  Avatar,
  Badge,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Slider,
  Menu,
  MenuItem,
  Fade,
  Zoom,
  Container
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Download as DownloadIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  RotateLeft as RotateLeftIcon,
  RotateRight as RotateRightIcon,
  PictureAsPdf as PdfIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Event as EventIcon,
  Timer as TimerIcon,
  Security as SecurityIcon,
  History as HistoryIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Gavel as GavelIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  Compare as CompareIcon,
  TextFields as TextFieldsIcon,
  ExpandMore as ExpandMoreIcon,
  FileCopy as FileCopyIcon,
  Verified as VerifiedIcon,
  ErrorOutline as ErrorOutlineIcon,
  ChatBubbleOutline as ChatBubbleIcon,
  AttachFile as AttachFileIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  Assessment as AssessmentIcon,
  NoteAdd as NoteAddIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  Palette as PaletteIcon,
  GridView as GridViewIcon,
  ViewSidebar as ViewSidebarIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Paleta de colores corporativa CAAAREM (versión clara)
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
    warning: '#00C2D1',      // Advertencias en cyan
    error: '#0099FF',         // Errores en azul eléctrico
    info: '#3A6EA5',          // Información en azul claro
    success: '#00A8A8',       // Éxito en verde/teal
    purple: '#6C5CE7'         // Púrpura para énfasis
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
    subtle: '#f5f7fa'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #0D2A4D, #3A6EA5)',
    secondary: 'linear-gradient(135deg, #00A8A8, #00C2D1)',
  }
};

const DocumentReview = () => {
  const { certId, docId } = useParams();
  const navigate = useNavigate();
  const viewerRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const [approvalStatus, setApprovalStatus] = useState('');
  const [comments, setComments] = useState('');
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [viewMode, setViewMode] = useState('single'); // 'single', 'split', 'grid'
  const [annotationMode, setAnnotationMode] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  
  const [validationChecks, setValidationChecks] = useState({
    legible: { checked: false, comment: '' },
    complete: { checked: false, comment: '' },
    signed: { checked: false, comment: '' },
    dated: { checked: true, comment: '' },
    authentic: { checked: false, comment: '' },
    format: { checked: true, comment: '' },
    security: { checked: false, comment: '' }
  });

  // Datos mock mejorados
  const document = {
    id: docId || '1',
    name: 'Solicitud_Formal_Certificacion_Patente_Aduanal_2026.pdf',
    displayName: 'Solicitud Formal de Certificación',
    type: 'PDF',
    size: '1.2 MB',
    uploadDate: '05/12/2025 14:30',
    uploadBy: { 
      name: 'Luis Rodríguez', 
      avatar: 'LR', 
      role: 'Agente Aduanal',
      region: 'Norte',
      level: 'Avanzado'
    },
    dueDate: '30/01/2026',
    validationDate: '15/01/2026',
    status: 'PENDIENTE DE REVISIÓN',
    priority: 'ALTA',
    hash: 'a1b2c3d4e5f6789012345678901234567890123456789012345678901234',
    pages: 12,
    security: 'Nivel Alto',
    version: '1.0',
    previousVersions: 2,
    relatedCertification: {
      id: certId || '1',
      type: 'PATENTE ADUANAL',
      code: 'PA-2026-00145',
      applicant: 'Luis Rodríguez Martínez',
      region: 'Norte',
      status: 'En Revisión',
      totalDocs: 5,
      reviewedDocs: 2,
      complianceScore: 85
    },
    metadata: {
      creationDate: '01/12/2025 10:15',
      lastModified: '05/12/2025 14:30',
      author: 'Luis Rodríguez',
      software: 'Adobe Acrobat Pro DC',
      pageSize: 'A4',
      dpi: 300,
      colorProfile: 'CMYK',
      encryption: 'AES-256'
    },
    validationHistory: [
      { 
        id: 1,
        date: '10/12/2025 11:45', 
        user: { name: 'Carlos Ruiz', role: 'Comité' }, 
        action: 'Observación: Requiere firma digital', 
        status: 'warning',
        comments: 'La firma no es legible en la página 3'
      },
      { 
        id: 2,
        date: '05/12/2025 14:30', 
        user: { name: 'Sistema', role: 'Automático' }, 
        action: 'Documento cargado', 
        status: 'info',
        comments: 'Carga inicial del documento'
      },
    ],
    commonIssues: [
      { id: 1, issue: 'Firma ilegible o ausente', frequency: 'Alta', category: 'Formalidad' },
      { id: 2, issue: 'Fechas inconsistentes', frequency: 'Media', category: 'Consistencia' },
      { id: 3, issue: 'Datos personales incompletos', frequency: 'Alta', category: 'Completitud' },
      { id: 4, issue: 'Sello oficial faltante', frequency: 'Baja', category: 'Formalidad' },
      { id: 5, issue: 'Documento escaneado con baja calidad', frequency: 'Media', category: 'Calidad' },
      { id: 6, issue: 'Información desactualizada', frequency: 'Media', category: 'Vigencia' },
    ],
    requirements: [
      { id: 1, requirement: 'Firma original del solicitante', mandatory: true, met: true },
      { id: 2, requirement: 'Fecha de expedición vigente', mandatory: true, met: true },
      { id: 3, requirement: 'Datos completos del solicitante', mandatory: true, met: true },
      { id: 4, requirement: 'Sello de la institución emisora', mandatory: false, met: true },
      { id: 5, requirement: 'Traducción oficial (si aplica)', mandatory: false, met: false },
    ]
  };

  // Manejo del zoom con slider
  const handleZoomChange = (event, newValue) => {
    setZoom(newValue);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 400));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleZoomReset = () => setZoom(100);
  const handleRotateLeft = () => setRotation(prev => (prev - 90) % 360);
  const handleRotateRight = () => setRotation(prev => (prev + 90) % 360);
  const toggleFullscreen = () => setFullscreen(!fullscreen);

  // Manejo de validaciones
  const handleValidationCheck = (check) => {
    setValidationChecks(prev => ({
      ...prev,
      [check]: { ...prev[check], checked: !prev[check].checked }
    }));
  };

  const handleQuickComment = (comment) => {
    setComments(prev => prev ? `${prev}\n• ${comment}` : `• ${comment}`);
  };

  const handleSubmitEvaluation = () => {
    if (!approvalStatus) {
      return;
    }
    setShowValidationDialog(true);
  };

  const confirmEvaluation = () => {
    // Simular envío
    console.log('Evaluación enviada:', { 
      approvalStatus, 
      comments, 
      validationChecks,
      timestamp: new Date().toISOString()
    });
    setShowValidationDialog(false);
    
    // Mostrar confirmación
    setTimeout(() => {
      navigate(`/committee/review/${certId}`);
    }, 1500);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const tabs = [
    { label: 'Vista Previa', icon: <VisibilityIcon /> },
    { label: 'Validación', icon: <GavelIcon /> },
    { label: 'Metadatos', icon: <InfoIcon /> },
    { label: 'Historial', icon: <HistoryIcon /> },
  ];

  // Calcular progreso de validación
  const validationProgress = () => {
    const total = Object.keys(validationChecks).length;
    const completed = Object.values(validationChecks).filter(v => v.checked).length;
    return (completed / total) * 100;
  };

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: colors.background.subtle
    }}>
      {/* Header Compacto y Elegante */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2.5, 
          borderBottom: `1px solid ${colors.primary.light}`,
          bgcolor: colors.background.paper,
          borderRadius: 0
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Volver a la revisión de certificación">
                <IconButton
                  component={Link}
                  to={`/committee/review/${certId}`}
                  size="small"
                  sx={{ 
                    bgcolor: colors.background.subtle,
                    color: colors.primary.main,
                    '&:hover': { bgcolor: 'rgba(58, 110, 165, 0.08)' }
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              
              <Box>
                <Typography variant="h6" sx={{ 
                  color: colors.primary.dark, 
                  fontWeight: 700,
                  mb: 0.5,
                  fontSize: '1.1rem'
                }}>
                  Revisión de Documento
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PdfIcon sx={{ color: colors.status.error, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ 
                      color: colors.primary.dark, 
                      fontWeight: 500,
                      maxWidth: 300,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {document.displayName}
                    </Typography>
                  </Box>
                  
                  <Chip 
                    label={document.status}
                    size="small"
                    sx={{
                      bgcolor: colors.status.warning,
                      color: colors.primary.dark,
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                    icon={<WarningIcon sx={{ color: colors.primary.dark }} />}
                  />
                  
                  <Chip 
                    label={`Prioridad: ${document.priority}`}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.7rem',
                      color: document.priority === 'ALTA' ? colors.status.error : colors.status.warning,
                      borderColor: document.priority === 'ALTA' ? colors.status.error : colors.status.warning,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1.5} justifyContent="flex-end" alignItems="center">
              <Box sx={{ textAlign: 'right', mr: 2 }}>
                <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                  Certificación:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                  {document.relatedCertification.code}
                </Typography>
              </Box>
              
              <Tooltip title="Descargar documento">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    minWidth: 'auto', 
                    px: 1.5,
                    borderColor: colors.primary.light,
                    color: colors.primary.main,
                    '&:hover': {
                      borderColor: colors.primary.main,
                      bgcolor: 'rgba(19, 59, 107, 0.04)',
                    }
                  }}
                >
                  Descargar
                </Button>
              </Tooltip>
              
              <Tooltip title="Más opciones">
                <IconButton size="small" onClick={handleMenuOpen} sx={{ color: colors.text.secondary }}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    border: `1px solid ${colors.primary.light}`,
                  }
                }}
              >
                <MenuItem onClick={() => {}}>
                  <ListItemIcon>
                    <CompareIcon fontSize="small" sx={{ color: colors.primary.main }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: colors.primary.dark }}>Comparar versiones</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {}}>
                  <ListItemIcon>
                    <NoteAddIcon fontSize="small" sx={{ color: colors.primary.main }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: colors.primary.dark }}>Añadir anotación</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {}}>
                  <ListItemIcon>
                    <AssessmentIcon fontSize="small" sx={{ color: colors.primary.main }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: colors.primary.dark }}>Ver estadísticas</ListItemText>
                </MenuItem>
                <Divider sx={{ borderColor: colors.primary.light }} />
                <MenuItem onClick={() => navigate(`/committee/review/${certId}`)}>
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" sx={{ color: colors.primary.main }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: colors.primary.dark }}>Ir a certificación completa</ListItemText>
                </MenuItem>
              </Menu>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Barra de progreso */}
      <LinearProgress 
        variant="determinate" 
        value={validationProgress()} 
        sx={{ 
          height: 3,
          '& .MuiLinearProgress-bar': {
            bgcolor: validationProgress() === 100 ? colors.status.success : colors.primary.main
          }
        }}
      />

      {/* Contenido Principal */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'hidden', 
        display: 'flex', 
        p: 2,
        gap: 2
      }}>
        {/* Panel Izquierdo - Visor de Documento (60%) */}
        <Paper 
          elevation={1} 
          sx={{ 
            flex: 3,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 2,
            bgcolor: colors.background.paper,
            border: `1px solid ${colors.primary.light}20`,
          }}
        >
          {/* Barra Superior del Visor */}
          <Box sx={{ 
            p: 1.5, 
            borderBottom: `1px solid ${colors.primary.light}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: colors.background.subtle
          }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption" sx={{ color: colors.text.secondary, fontWeight: 600 }}>
                VISOR
              </Typography>
              
              <Divider orientation="vertical" flexItem sx={{ height: 20, borderColor: colors.primary.light }} />
              
              {/* Controles de Vista */}
              <Tooltip title="Vista única">
                <IconButton 
                  size="small" 
                  onClick={() => setViewMode('single')}
                  sx={{ 
                    color: viewMode === 'single' ? colors.primary.main : colors.text.secondary,
                  }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Vista dividida">
                <IconButton 
                  size="small" 
                  onClick={() => setViewMode('split')}
                  sx={{ 
                    color: viewMode === 'split' ? colors.primary.main : colors.text.secondary,
                  }}
                >
                  <ViewSidebarIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Vista en cuadrícula">
                <IconButton 
                  size="small" 
                  onClick={() => setViewMode('grid')}
                  sx={{ 
                    color: viewMode === 'grid' ? colors.primary.main : colors.text.secondary,
                  }}
                >
                  <GridViewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Divider orientation="vertical" flexItem sx={{ height: 20, borderColor: colors.primary.light }} />
              
              {/* Controles de Zoom */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 200 }}>
                <Tooltip title="Zoom out">
                  <IconButton size="small" onClick={handleZoomOut} sx={{ color: colors.text.secondary }}>
                    <ZoomOutIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                
                <Slider
                  size="small"
                  value={zoom}
                  onChange={handleZoomChange}
                  min={25}
                  max={400}
                  sx={{ 
                    mx: 1,
                    color: colors.primary.main,
                  }}
                />
                
                <Tooltip title="Zoom in">
                  <IconButton size="small" onClick={handleZoomIn} sx={{ color: colors.text.secondary }}>
                    <ZoomInIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                
                <Chip 
                  label={`${zoom}%`}
                  size="small"
                  onClick={handleZoomReset}
                  sx={{ 
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    bgcolor: colors.background.subtle,
                    color: colors.primary.dark,
                    border: `1px solid ${colors.primary.light}`,
                  }}
                />
              </Box>
            </Stack>
            
            <Stack direction="row" spacing={1}>
              {/* Controles de Rotación */}
              <Tooltip title="Rotar izquierda">
                <IconButton size="small" onClick={handleRotateLeft} sx={{ color: colors.text.secondary }}>
                  <RotateLeftIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Rotar derecha">
                <IconButton size="small" onClick={handleRotateRight} sx={{ color: colors.text.secondary }}>
                  <RotateRightIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Divider orientation="vertical" flexItem sx={{ height: 20, borderColor: colors.primary.light }} />
              
              {/* Modo Anotaciones */}
              <Tooltip title={annotationMode ? "Desactivar anotaciones" : "Activar anotaciones"}>
                <IconButton 
                  size="small" 
                  onClick={() => setAnnotationMode(!annotationMode)}
                  sx={{ 
                    color: annotationMode ? colors.primary.main : colors.text.secondary,
                  }}
                >
                  <ChatBubbleIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              {/* Pantalla Completa */}
              <Tooltip title={fullscreen ? "Salir pantalla completa" : "Pantalla completa"}>
                <IconButton size="small" onClick={toggleFullscreen} sx={{ color: colors.text.secondary }}>
                  {fullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Tabs de Contenido */}
          <Box sx={{ borderBottom: 1, borderColor: colors.primary.light }}>
            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                minHeight: 48,
                '& .MuiTab-root': {
                  minHeight: 48,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: colors.text.secondary,
                  '&.Mui-selected': {
                    color: colors.primary.main,
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: colors.primary.main,
                }
              }}
            >
              {tabs.map((tab, index) => (
                <Tab 
                  key={index}
                  icon={tab.icon}
                  iconPosition="start"
                  label={tab.label}
                />
              ))}
            </Tabs>
          </Box>

          {/* Área del Visor */}
          <Box 
            ref={viewerRef}
            sx={{ 
              flex: 1,
              overflow: 'auto',
              bgcolor: colors.background.subtle,
              position: 'relative'
            }}
          >
            {activeTab === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Simulación de Documento PDF Mejorada */}
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 4,
                  minHeight: '100%'
                }}>
                  <Paper 
                    elevation={3}
                    sx={{ 
                      width: '100%',
                      maxWidth: '800px',
                      minHeight: '600px',
                      bgcolor: colors.background.paper,
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative',
                      transform: `rotate(${rotation}deg)`,
                      transition: 'transform 0.3s ease',
                      transformOrigin: 'center center',
                      border: `1px solid ${colors.primary.light}20`,
                    }}
                  >
                    {/* Encabezado del Documento */}
                    <Box sx={{ 
                      p: 3, 
                      bgcolor: colors.primary.dark,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          SOLICITUD FORMAL DE CERTIFICACIÓN
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.9 }}>
                          Patente Aduanal - {document.relatedCertification.code}
                        </Typography>
                      </Box>
                      <Chip 
                        label="ORIGINAL"
                        size="small"
                        sx={{ 
                          bgcolor: 'white',
                          color: colors.primary.dark,
                          fontWeight: 700
                        }}
                      />
                    </Box>
                    
                    {/* Contenido del Documento */}
                    <Box sx={{ p: 4 }}>
                      {/* Información del Solicitante */}
                      <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" sx={{ 
                            mb: 2, 
                            color: colors.primary.dark,
                            fontWeight: 600,
                            borderBottom: `2px solid ${colors.primary.light}`,
                            pb: 1
                          }}>
                            DATOS DEL SOLICITANTE
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 0.5 }}>
                              Nombre Completo
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500, color: colors.primary.dark }}>
                              {document.uploadBy.name}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 0.5 }}>
                              Tipo de Usuario
                            </Typography>
                            <Typography variant="body1" sx={{ color: colors.primary.dark }}>
                              {document.uploadBy.role}
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 0.5 }}>
                              Región
                            </Typography>
                            <Typography variant="body1" sx={{ color: colors.primary.dark }}>
                              {document.uploadBy.region}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 0.5 }}>
                              Nivel de Reconocimiento
                            </Typography>
                            <Chip 
                              label={document.uploadBy.level}
                              size="small"
                              sx={{ 
                                bgcolor: colors.status.success,
                                color: 'white',
                                fontWeight: 600 
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      
                      {/* Sección de Firma */}
                      <Box sx={{ 
                        mt: 8, 
                        pt: 6, 
                        borderTop: `2px solid ${colors.primary.dark}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                      }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ 
                            color: colors.text.secondary, 
                            display: 'block', 
                            mb: 2,
                            fontWeight: 600
                          }}>
                            FIRMA DEL SOLICITANTE
                          </Typography>
                          <Box sx={{ 
                            width: '80%', 
                            height: 100, 
                            bgcolor: colors.background.subtle,
                            border: `2px dashed ${colors.primary.light}`,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {validationChecks.signed.checked ? (
                              <Box sx={{ textAlign: 'center' }}>
                                <VerifiedIcon sx={{ color: colors.status.success, fontSize: 40, mb: 1 }} />
                                <Typography variant="caption" sx={{ color: colors.status.success, fontWeight: 600 }}>
                                  FIRMA VERIFICADA
                                </Typography>
                              </Box>
                            ) : (
                              <Typography variant="caption" sx={{ color: colors.text.secondary, textAlign: 'center' }}>
                                <WarningIcon sx={{ fontSize: 20, mb: 0.5, display: 'block', mx: 'auto', color: colors.status.warning }} />
                                ÁREA DE FIRMA<br />
                                (Revisar legibilidad)
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        
                        <Box sx={{ flex: 1, textAlign: 'right' }}>
                          <Typography variant="caption" sx={{ 
                            color: colors.text.secondary, 
                            display: 'block', 
                            mb: 2,
                            fontWeight: 600
                          }}>
                            FECHA DE EXPEDICIÓN
                          </Typography>
                          <Box sx={{ 
                            p: 2,
                            bgcolor: colors.background.subtle,
                            border: `1px solid ${colors.primary.light}`,
                            borderRadius: 1,
                            display: 'inline-block'
                          }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                              {document.uploadDate.split(' ')[0]}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      
                      {/* Anotaciones (si están activas) */}
                      {annotationMode && (
                        <Fade in={annotationMode}>
                          <Box sx={{
                            position: 'absolute',
                            top: 200,
                            right: 50,
                            bgcolor: 'rgba(0, 194, 209, 0.1)',
                            borderLeft: `4px solid ${colors.status.warning}`,
                            p: 2,
                            borderRadius: 1,
                            maxWidth: 300,
                            boxShadow: 3,
                            border: `1px solid ${colors.primary.light}`,
                          }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: colors.status.warning, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <WarningIcon fontSize="small" /> OBSERVACIÓN
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.primary.dark, display: 'block', mt: 0.5 }}>
                              Verificar claridad y autenticidad de la firma digital en página 3.
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mt: 1, fontStyle: 'italic' }}>
                              — Revisor anterior
                            </Typography>
                          </Box>
                        </Fade>
                      )}
                    </Box>
                    
                    {/* Pie de Página */}
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: colors.background.subtle,
                      borderTop: `1px solid ${colors.primary.light}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Página 1 de {document.pages} • Documento ID: {docId}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, fontFamily: 'monospace' }}>
                        Hash: {document.hash.substring(0, 16)}...
                      </Typography>
                    </Box>
                  </Paper>
                  
                  {/* Navegación de Páginas */}
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    sx={{ 
                      mt: 3,
                      p: 1.5,
                      bgcolor: colors.background.paper,
                      borderRadius: 2,
                      boxShadow: 1,
                      border: `1px solid ${colors.primary.light}`,
                    }}
                  >
                    <Button 
                      variant="outlined" 
                      size="small"
                      disabled
                      sx={{
                        borderColor: colors.primary.light,
                        color: colors.text.secondary,
                      }}
                    >
                      ← Anterior
                    </Button>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {Array.from({ length: Math.min(document.pages, 6) }).map((_, idx) => (
                        <Chip 
                          key={idx}
                          label={idx + 1}
                          size="small"
                          variant={idx === 0 ? 'filled' : 'outlined'}
                          onClick={() => {}}
                          sx={{ 
                            cursor: 'pointer',
                            bgcolor: idx === 0 ? colors.primary.main : 'transparent',
                            color: idx === 0 ? 'white' : colors.primary.dark,
                            borderColor: colors.primary.light,
                          }}
                        />
                      ))}
                      {document.pages > 6 && (
                        <>
                          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                            ...
                          </Typography>
                          <Chip 
                            label={document.pages}
                            size="small"
                            variant="outlined"
                            onClick={() => {}}
                            sx={{ 
                              cursor: 'pointer',
                              borderColor: colors.primary.light,
                              color: colors.primary.dark,
                            }}
                          />
                        </>
                      )}
                    </Box>
                    
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{
                        borderColor: colors.primary.light,
                        color: colors.primary.main,
                        '&:hover': {
                          borderColor: colors.primary.main,
                          bgcolor: 'rgba(19, 59, 107, 0.04)',
                        }
                      }}
                    >
                      Siguiente →
                    </Button>
                  </Stack>
                </Box>
              </motion.div>
            )}
            
            {/* Otras pestañas... (mantener similar estructura) */}
            {activeTab !== 0 && (
              <Box sx={{ p: 3 }}>
                {/* Contenido de otras pestañas manteniendo consistencia */}
                <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, color: colors.primary.dark }}>
                  {tabs[activeTab].label}
                </Typography>
                {/* Contenido específico de cada tab */}
              </Box>
            )}
          </Box>
        </Paper>

        {/* Panel Derecho - Evaluación (40%) */}
        <Paper 
          elevation={1}
          sx={{ 
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 2,
            bgcolor: colors.background.paper,
            border: `1px solid ${colors.primary.light}20`,
          }}
        >
          {/* Header del Panel de Evaluación */}
          <Box sx={{ 
            p: 2.5, 
            bgcolor: colors.primary.dark,
            color: 'white'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              <GavelIcon /> EVALUACIÓN TÉCNICA
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Dictamen individual • {document.relatedCertification.type}
            </Typography>
          </Box>

          {/* Contenido del Panel de Evaluación */}
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto',
            p: 2.5
          }}>
            {/* Progreso de Validación */}
            <Card variant="outlined" sx={{ 
              p: 2, 
              mb: 3,
              borderColor: colors.primary.light,
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                  📋 PROGRESO DE VALIDACIÓN
                </Typography>
                <Typography variant="caption" sx={{ color: colors.text.secondary, fontWeight: 600 }}>
                  {Math.round(validationProgress())}% completado
                </Typography>
              </Box>
              
              <LinearProgress 
                variant="determinate" 
                value={validationProgress()} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  mb: 2,
                  bgcolor: colors.primary.light,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: validationProgress() === 100 ? colors.status.success : colors.primary.main
                  }
                }}
              />
              
              <Stack spacing={1.5}>
                {Object.entries(validationChecks).map(([key, check]) => {
                  const labels = {
                    legible: 'Legibilidad del documento',
                    complete: 'Información completa',
                    signed: 'Firma válida y legible',
                    dated: 'Fechas correctas',
                    authentic: 'Autenticidad verificada',
                    format: 'Formato correcto',
                    security: 'Seguridad del documento'
                  };
                  
                  return (
                    <Box 
                      key={key}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        p: 1.5,
                        borderRadius: 1,
                        cursor: 'pointer',
                        bgcolor: check.checked ? 'rgba(0, 168, 168, 0.08)' : colors.background.subtle,
                        border: `1px solid ${check.checked ? colors.status.success : colors.primary.light}`,
                        transition: 'all 0.2s',
                        '&:hover': { 
                          borderColor: check.checked ? colors.status.success : colors.primary.main,
                          transform: 'translateY(-1px)',
                          boxShadow: 1
                        }
                      }}
                      onClick={() => handleValidationCheck(key)}
                    >
                      {check.checked ? (
                        <CheckCircleIcon sx={{ color: colors.status.success, mr: 1.5 }} />
                      ) : (
                        <CancelIcon sx={{ color: colors.primary.light, mr: 1.5 }} />
                      )}
                      <Typography variant="body2" sx={{ 
                        flex: 1, 
                        fontWeight: check.checked ? 600 : 400,
                        color: check.checked ? colors.status.success : colors.primary.dark
                      }}>
                        {labels[key]}
                      </Typography>
                      {check.checked && (
                        <VerifiedIcon sx={{ color: colors.status.success, fontSize: 16 }} />
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Card>

            {/* Checklist de Requisitos */}
            <Card variant="outlined" sx={{ 
              p: 2, 
              mb: 3,
              borderColor: colors.primary.light,
            }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: colors.primary.dark }}>
                📋 CHECKLIST DE REQUISITOS
              </Typography>
              
              <List dense sx={{ bgcolor: colors.background.subtle, borderRadius: 1, p: 1 }}>
                {document.requirements.map((req) => (
                  <ListItem 
                    key={req.id}
                    sx={{ 
                      borderBottom: `1px solid ${colors.primary.light}`,
                      '&:last-child': { borderBottom: 'none' }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {req.mandatory ? (
                        req.met ? (
                          <CheckCircleIcon sx={{ color: colors.status.success }} />
                        ) : (
                          <ErrorOutlineIcon sx={{ color: colors.status.error }} />
                        )
                      ) : (
                        req.met ? (
                          <CheckCircleIcon sx={{ color: colors.primary.light }} />
                        ) : (
                          <CancelIcon sx={{ color: colors.primary.light }} />
                        )
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={req.requirement}
                      primaryTypographyProps={{
                        variant: 'body2',
                        sx: { 
                          color: req.mandatory && !req.met ? colors.status.error : colors.primary.dark,
                          fontWeight: req.mandatory ? 500 : 400
                        }
                      }}
                      secondary={req.mandatory ? 'Obligatorio' : 'Opcional'}
                      secondaryTypographyProps={{
                        variant: 'caption',
                        sx: { color: colors.text.secondary }
                      }}
                    />
                    {req.mandatory && (
                      <Chip 
                        label={req.met ? 'CUMPLE' : 'NO CUMPLE'}
                        size="small"
                        sx={{ 
                          fontWeight: 600, 
                          fontSize: '0.7rem',
                          bgcolor: req.met ? colors.status.success : colors.status.error,
                          color: 'white',
                        }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </Card>

            {/* Dictamen del Documento */}
            <Card variant="outlined" sx={{ 
              p: 2, 
              mb: 3,
              borderColor: colors.primary.light,
            }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: colors.primary.dark }}>
                ⚖️ DICTAMEN DEL DOCUMENTO
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                <RadioGroup
                  value={approvalStatus}
                  onChange={(e) => setApprovalStatus(e.target.value)}
                  sx={{ gap: 2 }}
                >
                  <Tooltip title="El documento cumple con todos los requisitos establecidos">
                    <Paper 
                      elevation={approvalStatus === 'approve' ? 3 : 0}
                      variant={approvalStatus === 'approve' ? 'elevation' : 'outlined'}
                      sx={{ 
                        p: 2.5,
                        border: `2px solid ${approvalStatus === 'approve' ? colors.status.success : colors.primary.light}`,
                        bgcolor: approvalStatus === 'approve' ? 'rgba(0, 168, 168, 0.04)' : colors.background.paper,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': { 
                          borderColor: colors.status.success,
                          bgcolor: 'rgba(0, 168, 168, 0.04)',
                        }
                      }}
                      onClick={() => setApprovalStatus('approve')}
                    >
                      <FormControlLabel
                        value="approve"
                        control={
                          <Radio 
                            checkedIcon={
                              <Box sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: colors.status.success,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <CheckCircleIcon sx={{ color: 'white', fontSize: 16 }} />
                              </Box>
                            }
                            sx={{
                              '& .MuiSvgIcon-root': {
                                color: colors.status.success,
                              }
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: colors.status.success,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <ThumbUpIcon sx={{ color: 'white' }} />
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 700, color: colors.status.success }}>
                                DOCUMENTO CONFORME
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                Cumple con todos los requisitos establecidos
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ margin: 0, width: '100%' }}
                      />
                    </Paper>
                  </Tooltip>
                  
                  <Tooltip title="El documento no cumple con los requisitos establecidos">
                    <Paper 
                      elevation={approvalStatus === 'reject' ? 3 : 0}
                      variant={approvalStatus === 'reject' ? 'elevation' : 'outlined'}
                      sx={{ 
                        p: 2.5,
                        border: `2px solid ${approvalStatus === 'reject' ? colors.status.error : colors.primary.light}`,
                        bgcolor: approvalStatus === 'reject' ? 'rgba(0, 153, 255, 0.04)' : colors.background.paper,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': { 
                          borderColor: colors.status.error,
                          bgcolor: 'rgba(0, 153, 255, 0.04)',
                        }
                      }}
                      onClick={() => setApprovalStatus('reject')}
                    >
                      <FormControlLabel
                        value="reject"
                        control={
                          <Radio 
                            checkedIcon={
                              <Box sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: colors.status.error,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <CancelIcon sx={{ color: 'white', fontSize: 16 }} />
                              </Box>
                            }
                            sx={{
                              '& .MuiSvgIcon-root': {
                                color: colors.status.error,
                              }
                            }}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: colors.status.error,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <ThumbDownIcon sx={{ color: 'white' }} />
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 700, color: colors.status.error }}>
                                DOCUMENTO NO CONFORME
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                Requiere observaciones específicas obligatorias
                              </Typography>
                            </Box>
                          </Box>
                        }
                        sx={{ margin: 0, width: '100%' }}
                      />
                    </Paper>
                  </Tooltip>
                </RadioGroup>
              </FormControl>

              {/* Comentarios y Observaciones */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                    📝 OBSERVACIONES TÉCNICAS
                  </Typography>
                  {approvalStatus === 'reject' && (
                    <Chip 
                      label="OBLIGATORIO"
                      size="small"
                      sx={{
                        bgcolor: colors.status.error,
                        color: 'white',
                        fontWeight: 700
                      }}
                      icon={<WarningIcon sx={{ color: 'white' }} />}
                    />
                  )}
                </Box>
                
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Fundamentación técnica del dictamen. Describa detalladamente las observaciones, incumplimientos o aspectos a considerar..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  required={approvalStatus === 'reject'}
                  error={approvalStatus === 'reject' && !comments}
                  helperText={approvalStatus === 'reject' && !comments ? 'Las observaciones son obligatorias para rechazar un documento' : 'Se recomienda ser específico y claro'}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      bgcolor: colors.background.subtle,
                      '& fieldset': {
                        borderColor: colors.primary.light,
                      },
                      '&:hover fieldset': {
                        borderColor: colors.primary.main,
                      },
                    },
                  }}
                />
                
                {/* Comentarios Rápidos */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 1, fontWeight: 600 }}>
                    Comentarios comunes:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {document.commonIssues.slice(0, 4).map((issue) => (
                      <Chip
                        key={issue.id}
                        label={issue.issue}
                        size="small"
                        variant="outlined"
                        onClick={() => handleQuickComment(issue.issue)}
                        sx={{ 
                          mb: 1,
                          borderColor: colors.primary.light,
                          color: colors.primary.dark,
                          '&:hover': { bgcolor: colors.background.subtle }
                        }}
                        icon={
                          issue.frequency === 'Alta' ? 
                            <WarningIcon sx={{ color: colors.status.error }} fontSize="small" /> : 
                          issue.frequency === 'Media' ? 
                            <WarningIcon sx={{ color: colors.status.warning }} fontSize="small" /> : 
                            <InfoIcon sx={{ color: colors.primary.light }} fontSize="small" />
                        }
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>

              {/* Acciones */}
              <Stack direction="row" spacing={1.5}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(`/committee/review/${certId}`)}
                  sx={{ 
                    py: 1.5,
                    fontWeight: 600,
                    borderColor: colors.primary.light,
                    color: colors.primary.main,
                    '&:hover': {
                      borderColor: colors.primary.main,
                      bgcolor: 'rgba(19, 59, 107, 0.04)',
                    }
                  }}
                >
                  VOLVER
                </Button>
                
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<GavelIcon />}
                  onClick={handleSubmitEvaluation}
                  disabled={!approvalStatus || (approvalStatus === 'reject' && !comments)}
                  sx={{ 
                    py: 1.5,
                    fontWeight: 700,
                    bgcolor: approvalStatus === 'reject' ? colors.status.error : colors.primary.main,
                    '&:hover': {
                      bgcolor: approvalStatus === 'reject' ? colors.accents.blue : colors.primary.dark,
                    },
                    '&.Mui-disabled': {
                      bgcolor: colors.primary.light,
                      color: colors.text.secondary
                    }
                  }}
                >
                  {approvalStatus === 'reject' ? 'RECHAZAR DOCUMENTO' : 'APROBAR DOCUMENTO'}
                </Button>
              </Stack>
            </Card>
            
            {/* Información Contextual */}
            <Card variant="outlined" sx={{ 
              p: 2,
              borderColor: colors.primary.light,
            }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: colors.primary.dark }}>
                ℹ️ INFORMACIÓN CONTEXTUAL
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 48, height: 48, bgcolor: colors.primary.main, fontWeight: 700 }}>
                      {document.uploadBy.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: colors.primary.dark }}>
                        {document.uploadBy.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        {document.uploadBy.role} • {document.uploadBy.region}
                      </Typography>
                      <Chip 
                        label={document.uploadBy.level}
                        size="small"
                        sx={{ 
                          mt: 0.5, 
                          fontSize: '0.7rem',
                          bgcolor: colors.status.success,
                          color: 'white',
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: colors.background.subtle, borderRadius: 1 }}>
                    <EventIcon sx={{ color: colors.text.secondary, mb: 0.5 }} />
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                      Subido
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                      {document.uploadDate.split(' ')[0]}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'rgba(0, 153, 255, 0.08)', borderRadius: 1 }}>
                    <TimerIcon sx={{ color: colors.status.error, mb: 0.5 }} />
                    <Typography variant="caption" sx={{ color: colors.status.error, display: 'block' }}>
                      Vence
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: colors.status.error }}>
                      {document.dueDate}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Paper>
      </Box>

      {/* Diálogo de Confirmación */}
      <Dialog 
        open={showValidationDialog} 
        onClose={() => setShowValidationDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            border: `1px solid ${colors.primary.light}`,
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: approvalStatus === 'reject' ? 'rgba(0, 153, 255, 0.08)' : 'rgba(0, 168, 168, 0.08)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {approvalStatus === 'reject' ? (
              <CancelIcon sx={{ color: colors.status.error }} />
            ) : (
              <CheckCircleIcon sx={{ color: colors.status.success }} />
            )}
            <Typography variant="h6" sx={{ 
              color: approvalStatus === 'reject' ? colors.status.error : colors.status.success 
            }}>
              Confirmar {approvalStatus === 'reject' ? 'Rechazo' : 'Aprobación'} del Documento
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Alert 
            severity={approvalStatus === 'reject' ? 'warning' : 'success'}
            sx={{ 
              mb: 3,
              bgcolor: approvalStatus === 'reject' ? 'rgba(0, 153, 255, 0.08)' : 'rgba(0, 168, 168, 0.08)',
              color: approvalStatus === 'reject' ? colors.status.error : colors.status.success,
            }}
          >
            <Typography variant="body2">
              <strong>¿Está seguro de que desea {approvalStatus === 'reject' ? 'RECHAZAR' : 'APROBAR'} este documento?</strong>
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: colors.text.secondary }}>
              Esta acción será registrada en el historial de auditoría y afectará el estatus de la certificación.
            </Typography>
          </Alert>
          
          {comments && (
            <Card variant="outlined" sx={{ 
              p: 2, 
              mb: 2,
              borderColor: colors.primary.light,
            }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: colors.primary.dark }}>
                Observaciones registradas:
              </Typography>
              <Typography variant="body2" sx={{ color: colors.primary.dark, whiteSpace: 'pre-wrap' }}>
                {comments}
              </Typography>
            </Card>
          )}
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {Object.entries(validationChecks)
              .filter(([_, check]) => check.checked)
              .map(([key]) => (
                <Chip 
                  key={key}
                  label={key}
                  size="small"
                  sx={{
                    bgcolor: colors.status.success,
                    color: 'white',
                  }}
                  variant="outlined"
                />
              ))}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            onClick={() => setShowValidationDialog(false)}
            variant="outlined"
            sx={{
              borderColor: colors.primary.light,
              color: colors.primary.main,
              '&:hover': {
                borderColor: colors.primary.main,
                bgcolor: 'rgba(19, 59, 107, 0.04)',
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={confirmEvaluation}
            variant="contained"
            startIcon={<GavelIcon />}
            sx={{
              bgcolor: approvalStatus === 'reject' ? colors.status.error : colors.status.success,
              '&:hover': {
                bgcolor: approvalStatus === 'reject' ? colors.accents.blue : colors.secondary.main,
              }
            }}
          >
            Confirmar {approvalStatus === 'reject' ? 'Rechazo' : 'Aprobación'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentReview;