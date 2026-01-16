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
      bgcolor: '#f8fafc'
    }}>
      {/* Header Compacto y Elegante */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2.5, 
          borderBottom: '1px solid #e0e0e0',
          bgcolor: 'white',
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
                    bgcolor: '#f0f4f8',
                    '&:hover': { bgcolor: '#e3e8f0' }
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
              
              <Box>
                <Typography variant="h6" sx={{ 
                  color: '#1a237e', 
                  fontWeight: 700,
                  mb: 0.5,
                  fontSize: '1.1rem'
                }}>
                  Revisión de Documento
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PdfIcon sx={{ color: '#e74c3c', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ 
                      color: '#2c3e50', 
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
                    color="warning"
                    icon={<WarningIcon />}
                    sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                  />
                  
                  <Chip 
                    label={`Prioridad: ${document.priority}`}
                    size="small"
                    color={document.priority === 'ALTA' ? 'error' : 'warning'}
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1.5} justifyContent="flex-end" alignItems="center">
              <Box sx={{ textAlign: 'right', mr: 2 }}>
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                  Certificación:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a237e' }}>
                  {document.relatedCertification.code}
                </Typography>
              </Box>
              
              <Tooltip title="Descargar documento">
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  sx={{ minWidth: 'auto', px: 1.5 }}
                >
                  Descargar
                </Button>
              </Tooltip>
              
              <Tooltip title="Más opciones">
                <IconButton size="small" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => {}}>
                  <ListItemIcon>
                    <CompareIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Comparar versiones</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {}}>
                  <ListItemIcon>
                    <NoteAddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Añadir anotación</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {}}>
                  <ListItemIcon>
                    <AssessmentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Ver estadísticas</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate(`/committee/review/${certId}`)}>
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Ir a certificación completa</ListItemText>
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
            bgcolor: validationProgress() === 100 ? '#27ae60' : '#3498db'
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
            bgcolor: 'white'
          }}
        >
          {/* Barra Superior del Visor */}
          <Box sx={{ 
            p: 1.5, 
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: '#f8fafc'
          }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                VISOR
              </Typography>
              
              <Divider orientation="vertical" flexItem sx={{ height: 20 }} />
              
              {/* Controles de Vista */}
              <Tooltip title="Vista única">
                <IconButton 
                  size="small" 
                  onClick={() => setViewMode('single')}
                  color={viewMode === 'single' ? 'primary' : 'default'}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Vista dividida">
                <IconButton 
                  size="small" 
                  onClick={() => setViewMode('split')}
                  color={viewMode === 'split' ? 'primary' : 'default'}
                >
                  <ViewSidebarIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Vista en cuadrícula">
                <IconButton 
                  size="small" 
                  onClick={() => setViewMode('grid')}
                  color={viewMode === 'grid' ? 'primary' : 'default'}
                >
                  <GridViewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Divider orientation="vertical" flexItem sx={{ height: 20 }} />
              
              {/* Controles de Zoom */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 200 }}>
                <Tooltip title="Zoom out">
                  <IconButton size="small" onClick={handleZoomOut}>
                    <ZoomOutIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                
                <Slider
                  size="small"
                  value={zoom}
                  onChange={handleZoomChange}
                  min={25}
                  max={400}
                  sx={{ mx: 1 }}
                />
                
                <Tooltip title="Zoom in">
                  <IconButton size="small" onClick={handleZoomIn}>
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
                    fontWeight: 600
                  }}
                />
              </Box>
            </Stack>
            
            <Stack direction="row" spacing={1}>
              {/* Controles de Rotación */}
              <Tooltip title="Rotar izquierda">
                <IconButton size="small" onClick={handleRotateLeft}>
                  <RotateLeftIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Rotar derecha">
                <IconButton size="small" onClick={handleRotateRight}>
                  <RotateRightIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Divider orientation="vertical" flexItem sx={{ height: 20 }} />
              
              {/* Modo Anotaciones */}
              <Tooltip title={annotationMode ? "Desactivar anotaciones" : "Activar anotaciones"}>
                <IconButton 
                  size="small" 
                  onClick={() => setAnnotationMode(!annotationMode)}
                  color={annotationMode ? 'primary' : 'default'}
                >
                  <ChatBubbleIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              {/* Pantalla Completa */}
              <Tooltip title={fullscreen ? "Salir pantalla completa" : "Pantalla completa"}>
                <IconButton size="small" onClick={toggleFullscreen}>
                  {fullscreen ? <FullscreenExitIcon fontSize="small" /> : <FullscreenIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Tabs de Contenido */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                  fontWeight: 500
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
              bgcolor: '#f5f5f5',
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
                      bgcolor: 'white',
                      borderRadius: 2,
                      overflow: 'hidden',
                      position: 'relative',
                      transform: `rotate(${rotation}deg)`,
                      transition: 'transform 0.3s ease',
                      transformOrigin: 'center center'
                    }}
                  >
                    {/* Encabezado del Documento */}
                    <Box sx={{ 
                      p: 3, 
                      bgcolor: '#1a237e',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          SOLICITUD FORMAL DE CERTIFICACIÓN
                        </Typography>
                        <Typography variant="caption">
                          Patente Aduanal - {document.relatedCertification.code}
                        </Typography>
                      </Box>
                      <Chip 
                        label="ORIGINAL"
                        size="small"
                        sx={{ 
                          bgcolor: 'white',
                          color: '#1a237e',
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
                            color: '#2c3e50',
                            fontWeight: 600,
                            borderBottom: '2px solid #e0e0e0',
                            pb: 1
                          }}>
                            DATOS DEL SOLICITANTE
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 0.5 }}>
                              Nombre Completo
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {document.uploadBy.name}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 0.5 }}>
                              Tipo de Usuario
                            </Typography>
                            <Typography variant="body1">
                              {document.uploadBy.role}
                            </Typography>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 0.5 }}>
                              Región
                            </Typography>
                            <Typography variant="body1">
                              {document.uploadBy.region}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 0.5 }}>
                              Nivel de Reconocimiento
                            </Typography>
                            <Chip 
                              label={document.uploadBy.level}
                              size="small"
                              color="success"
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      
                      {/* Sección de Firma */}
                      <Box sx={{ 
                        mt: 8, 
                        pt: 6, 
                        borderTop: '2px solid #2c3e50',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                      }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" sx={{ 
                            color: '#64748b', 
                            display: 'block', 
                            mb: 2,
                            fontWeight: 600
                          }}>
                            FIRMA DEL SOLICITANTE
                          </Typography>
                          <Box sx={{ 
                            width: '80%', 
                            height: 100, 
                            bgcolor: '#f8fafc',
                            border: '2px dashed #cbd5e1',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {validationChecks.signed.checked ? (
                              <Box sx={{ textAlign: 'center' }}>
                                <VerifiedIcon sx={{ color: '#27ae60', fontSize: 40, mb: 1 }} />
                                <Typography variant="caption" sx={{ color: '#27ae60', fontWeight: 600 }}>
                                  FIRMA VERIFICADA
                                </Typography>
                              </Box>
                            ) : (
                              <Typography variant="caption" sx={{ color: '#94a3b8', textAlign: 'center' }}>
                                <WarningIcon sx={{ fontSize: 20, mb: 0.5, display: 'block', mx: 'auto' }} />
                                ÁREA DE FIRMA<br />
                                (Revisar legibilidad)
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        
                        <Box sx={{ flex: 1, textAlign: 'right' }}>
                          <Typography variant="caption" sx={{ 
                            color: '#64748b', 
                            display: 'block', 
                            mb: 2,
                            fontWeight: 600
                          }}>
                            FECHA DE EXPEDICIÓN
                          </Typography>
                          <Box sx={{ 
                            p: 2,
                            bgcolor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: 1,
                            display: 'inline-block'
                          }}>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#1a237e' }}>
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
                            bgcolor: 'rgba(255, 244, 229, 0.95)',
                            borderLeft: '4px solid #f39c12',
                            p: 2,
                            borderRadius: 1,
                            maxWidth: 300,
                            boxShadow: 3
                          }}>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#d35400', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <WarningIcon fontSize="small" /> OBSERVACIÓN
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#7d6608', display: 'block', mt: 0.5 }}>
                              Verificar claridad y autenticidad de la firma digital en página 3.
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#95a5a6', display: 'block', mt: 1, fontStyle: 'italic' }}>
                              — Revisor anterior
                            </Typography>
                          </Box>
                        </Fade>
                      )}
                    </Box>
                    
                    {/* Pie de Página */}
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: '#f8fafc',
                      borderTop: '1px solid #e2e8f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        Página 1 de {document.pages} • Documento ID: {docId}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b', fontFamily: 'monospace' }}>
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
                      bgcolor: 'white',
                      borderRadius: 2,
                      boxShadow: 1
                    }}
                  >
                    <Button 
                      variant="outlined" 
                      size="small"
                      disabled
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
                          color="primary"
                          onClick={() => {}}
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                      {document.pages > 6 && (
                        <>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            ...
                          </Typography>
                          <Chip 
                            label={document.pages}
                            size="small"
                            variant="outlined"
                            onClick={() => {}}
                            sx={{ cursor: 'pointer' }}
                          />
                        </>
                      )}
                    </Box>
                    
                    <Button 
                      variant="outlined" 
                      size="small"
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
                <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 600, color: '#2c3e50' }}>
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
            bgcolor: 'white'
          }}
        >
          {/* Header del Panel de Evaluación */}
          <Box sx={{ 
            p: 2.5, 
            bgcolor: '#1a237e',
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
            <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                  📋 PROGRESO DE VALIDACIÓN
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
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
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: validationProgress() === 100 ? '#27ae60' : '#3498db'
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
                        bgcolor: check.checked ? '#e8f5e9' : '#f8fafc',
                        border: `1px solid ${check.checked ? '#27ae60' : '#e2e8f0'}`,
                        transition: 'all 0.2s',
                        '&:hover': { 
                          borderColor: check.checked ? '#27ae60' : '#cbd5e1',
                          transform: 'translateY(-1px)',
                          boxShadow: 1
                        }
                      }}
                      onClick={() => handleValidationCheck(key)}
                    >
                      {check.checked ? (
                        <CheckCircleIcon sx={{ color: '#27ae60', mr: 1.5 }} />
                      ) : (
                        <CancelIcon sx={{ color: '#cbd5e1', mr: 1.5 }} />
                      )}
                      <Typography variant="body2" sx={{ 
                        flex: 1, 
                        fontWeight: check.checked ? 600 : 400,
                        color: check.checked ? '#27ae60' : '#475569'
                      }}>
                        {labels[key]}
                      </Typography>
                      {check.checked && (
                        <VerifiedIcon sx={{ color: '#27ae60', fontSize: 16 }} />
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Card>

            {/* Checklist de Requisitos */}
            <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#2c3e50' }}>
                📋 CHECKLIST DE REQUISITOS
              </Typography>
              
              <List dense sx={{ bgcolor: '#f8fafc', borderRadius: 1, p: 1 }}>
                {document.requirements.map((req) => (
                  <ListItem 
                    key={req.id}
                    sx={{ 
                      borderBottom: '1px solid #e2e8f0',
                      '&:last-child': { borderBottom: 'none' }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {req.mandatory ? (
                        req.met ? (
                          <CheckCircleIcon sx={{ color: '#27ae60' }} />
                        ) : (
                          <ErrorOutlineIcon sx={{ color: '#e74c3c' }} />
                        )
                      ) : (
                        req.met ? (
                          <CheckCircleIcon sx={{ color: '#95a5a6' }} />
                        ) : (
                          <CancelIcon sx={{ color: '#95a5a6' }} />
                        )
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={req.requirement}
                      primaryTypographyProps={{
                        variant: 'body2',
                        color: req.mandatory && !req.met ? 'error' : 'textPrimary',
                        fontWeight: req.mandatory ? 500 : 400
                      }}
                      secondary={req.mandatory ? 'Obligatorio' : 'Opcional'}
                      secondaryTypographyProps={{
                        variant: 'caption',
                        color: 'textSecondary'
                      }}
                    />
                    {req.mandatory && (
                      <Chip 
                        label={req.met ? 'CUMPLE' : 'NO CUMPLE'}
                        size="small"
                        color={req.met ? 'success' : 'error'}
                        sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </Card>

            {/* Dictamen del Documento */}
            <Card variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#2c3e50' }}>
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
                        border: `2px solid ${approvalStatus === 'approve' ? '#27ae60' : '#e2e8f0'}`,
                        bgcolor: approvalStatus === 'approve' ? '#f0f9f0' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': { 
                          borderColor: '#27ae60',
                          bgcolor: '#f0f9f0'
                        }
                      }}
                      onClick={() => setApprovalStatus('approve')}
                    >
                      <FormControlLabel
                        value="approve"
                        control={
                          <Radio 
                            color="success" 
                            checkedIcon={
                              <Box sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#27ae60',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <CheckCircleIcon sx={{ color: 'white', fontSize: 16 }} />
                              </Box>
                            }
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: '#27ae60',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <ThumbUpIcon sx={{ color: 'white' }} />
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 700, color: '#27ae60' }}>
                                DOCUMENTO CONFORME
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#64748b' }}>
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
                        border: `2px solid ${approvalStatus === 'reject' ? '#e74c3c' : '#e2e8f0'}`,
                        bgcolor: approvalStatus === 'reject' ? '#fef0f0' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': { 
                          borderColor: '#e74c3c',
                          bgcolor: '#fef0f0'
                        }
                      }}
                      onClick={() => setApprovalStatus('reject')}
                    >
                      <FormControlLabel
                        value="reject"
                        control={
                          <Radio 
                            color="error"
                            checkedIcon={
                              <Box sx={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                bgcolor: '#e74c3c',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}>
                                <CancelIcon sx={{ color: 'white', fontSize: 16 }} />
                              </Box>
                            }
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: '#e74c3c',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <ThumbDownIcon sx={{ color: 'white' }} />
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 700, color: '#e74c3c' }}>
                                DOCUMENTO NO CONFORME
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#64748b' }}>
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
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                    📝 OBSERVACIONES TÉCNICAS
                  </Typography>
                  {approvalStatus === 'reject' && (
                    <Chip 
                      label="OBLIGATORIO"
                      size="small"
                      color="error"
                      icon={<WarningIcon />}
                      sx={{ fontWeight: 700 }}
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
                      bgcolor: '#f8fafc'
                    }
                  }}
                />
                
                {/* Comentarios Rápidos */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1, fontWeight: 600 }}>
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
                          '&:hover': { bgcolor: '#e2e8f0' }
                        }}
                        icon={
                          issue.frequency === 'Alta' ? 
                            <WarningIcon color="error" fontSize="small" /> : 
                          issue.frequency === 'Media' ? 
                            <WarningIcon color="warning" fontSize="small" /> : 
                            <InfoIcon fontSize="small" />
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
                    fontWeight: 600
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
                    bgcolor: approvalStatus === 'reject' ? '#e74c3c' : '#1a237e',
                    '&:hover': {
                      bgcolor: approvalStatus === 'reject' ? '#c0392b' : '#283593'
                    },
                    '&.Mui-disabled': {
                      bgcolor: '#cbd5e1',
                      color: '#94a3b8'
                    }
                  }}
                >
                  {approvalStatus === 'reject' ? 'RECHAZAR DOCUMENTO' : 'APROBAR DOCUMENTO'}
                </Button>
              </Stack>
            </Card>
            
            {/* Información Contextual */}
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#2c3e50' }}>
                ℹ️ INFORMACIÓN CONTEXTUAL
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 48, height: 48, bgcolor: '#1a237e', fontWeight: 700 }}>
                      {document.uploadBy.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                        {document.uploadBy.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                        {document.uploadBy.role} • {document.uploadBy.region}
                      </Typography>
                      <Chip 
                        label={document.uploadBy.level}
                        size="small"
                        color="success"
                        sx={{ mt: 0.5, fontSize: '0.7rem' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: '#f8fafc', borderRadius: 1 }}>
                    <EventIcon sx={{ color: '#64748b', mb: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                      Subido
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                      {document.uploadDate.split(' ')[0]}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: '#fef0f0', borderRadius: 1 }}>
                    <TimerIcon sx={{ color: '#e74c3c', mb: 0.5 }} />
                    <Typography variant="caption" sx={{ color: '#e74c3c', display: 'block' }}>
                      Vence
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#e74c3c' }}>
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
      >
        <DialogTitle sx={{ bgcolor: approvalStatus === 'reject' ? '#fef0f0' : '#f0f9f0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {approvalStatus === 'reject' ? (
              <CancelIcon sx={{ color: '#e74c3c' }} />
            ) : (
              <CheckCircleIcon sx={{ color: '#27ae60' }} />
            )}
            <Typography variant="h6" sx={{ color: approvalStatus === 'reject' ? '#e74c3c' : '#27ae60' }}>
              Confirmar {approvalStatus === 'reject' ? 'Rechazo' : 'Aprobación'} del Documento
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Alert 
            severity={approvalStatus === 'reject' ? 'warning' : 'success'}
            sx={{ mb: 3 }}
          >
            <Typography variant="body2">
              <strong>¿Está seguro de que desea {approvalStatus === 'reject' ? 'RECHAZAR' : 'APROBAR'} este documento?</strong>
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
              Esta acción será registrada en el historial de auditoría y afectará el estatus de la certificación.
            </Typography>
          </Alert>
          
          {comments && (
            <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Observaciones registradas:
              </Typography>
              <Typography variant="body2" sx={{ color: '#5a6c7d', whiteSpace: 'pre-wrap' }}>
                {comments}
              </Typography>
            </Card>
          )}
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {Object.entries(validationChecks)
              .filter(([_, check]) => check.checked)
              .map(([key]) => (
                <Chip 
                  key={key}
                  label={key}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              ))}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            onClick={() => setShowValidationDialog(false)}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button 
            onClick={confirmEvaluation}
            variant="contained"
            color={approvalStatus === 'reject' ? 'error' : 'success'}
            startIcon={<GavelIcon />}
          >
            Confirmar {approvalStatus === 'reject' ? 'Rechazo' : 'Aprobación'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentReview;