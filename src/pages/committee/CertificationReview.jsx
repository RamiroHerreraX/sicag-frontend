// src/pages/committee/CertificationReview.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Avatar,
  Card,
  CardContent,
  Tooltip,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Description as DescriptionIcon,
  History as HistoryIcon,
  Gavel as GavelIcon,
  Assignment as AssignmentIcon,
  HowToVote as HowToVoteIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent } from '@mui/lab';
import { motion, AnimatePresence } from 'framer-motion';

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

const CertificationReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  
  // ESTADO MEJORADO PARA REVISIÓN TÉCNICA
  const [technicalReview, setTechnicalReview] = useState({
    status: 'pending', // 'pending', 'in_progress', 'completed'
    assignedTo: {
      name: 'Carlos Ruiz',
      avatar: 'CR',
      role: 'Secretario Técnico'
    },
    // Rúbrica de revisión
    checklist: {
      documentacionCompleta: { checked: false, comment: '' },
      autenticidadVerificada: { checked: false, comment: '' },
      firmasValidas: { checked: false, comment: '' },
      fechasCorrectas: { checked: false, comment: '' },
      cumplimientoNormativo: { checked: false, comment: '' },
      evidenciasLegibles: { checked: true, comment: '' }
    },
    technicalComments: '',
    reviewDate: null
  });

  // ESTADO MEJORADO PARA VALIDACIÓN COLEGIADA
  const [collegiateVote, setCollegiateVote] = useState({
    status: 'pending', // 'pending', 'in_progress', 'completed'
    result: null, // 'approved', 'rejected'
    votes: [
      { 
        id: 1, 
        member: 'María González', 
        role: 'Presidenta', 
        avatar: 'MG',
        vote: null,
        comment: '',
        votedAt: null,
        color: colors.primary.main
      },
      { 
        id: 2, 
        member: 'Juan Pérez', 
        role: 'Vocal', 
        avatar: 'JP',
        vote: null,
        comment: '',
        votedAt: null,
        color: colors.secondary.main
      },
      { 
        id: 3, 
        member: 'Laura Sánchez', 
        role: 'Vocal', 
        avatar: 'LS',
        vote: null,
        comment: '',
        votedAt: null,
        color: colors.accents.purple
      }
    ],
    finalComment: '',
    votingOpenedAt: null,
    votingClosedAt: null
  });

  const [currentVote, setCurrentVote] = useState({ memberId: null, value: '', comment: '' });

  // Datos mock de la certificación
  const certification = {
    id: id || '1',
    type: 'PATENTE ADUANAL',
    title: 'Certificación de Patente Aduanal',
    description: 'La patente aduanal autoriza a una persona física o moral para promover el despacho de las mercancías...',
    // El estado se calcula en base a los sub-estados
    status: technicalReview.status === 'completed' && collegiateVote.status === 'pending' ? 'LISTA PARA VOTACIÓN' :
            collegiateVote.status === 'in_progress' ? 'EN VOTACIÓN COLEGIADA' :
            collegiateVote.status === 'completed' ? (collegiateVote.result === 'approved' ? 'APROBADA' : 'RECHAZADA') :
            'EN REVISIÓN TÉCNICA',
    statusColor: technicalReview.status === 'completed' && collegiateVote.status === 'pending' ? 'success' :
                 collegiateVote.status === 'in_progress' ? 'info' :
                 collegiateVote.status === 'completed' ? (collegiateVote.result === 'approved' ? 'success' : 'error') :
                 'warning',
    issueDate: '11/01/2026',
    expirationDate: '11/01/2029',
    applicant: {
      name: 'Luis Rodríguez Martínez',
      type: 'Agente Aduanal',
      avatar: 'LR',
      curp: 'RODL800101HDFXYZ01',
      rfc: 'RODL800101ABC',
      region: 'Norte',
      email: 'luis.rodriguez@ejemplo.com',
      phone: '+52 55 1234 5678',
      complianceScore: 85,
      level: 'Avanzado'
    },
    certificationNumber: 'PA-2026-00145',
    documents: [
      { id: 1, name: 'Solicitud Formal', type: 'PDF', size: '1.2 MB', status: 'completo', uploadDate: '05/12/2025' },
      { id: 2, name: 'Identificación Oficial', type: 'JPG', size: '0.8 MB', status: 'completo', uploadDate: '05/12/2025' },
      { id: 3, name: 'Constancia de Examen', type: 'PDF', size: '0.9 MB', status: 'completo', uploadDate: '28/11/2025' },
      { id: 4, name: 'Experiencia Profesional', type: 'PDF', size: '2.1 MB', status: 'completo', uploadDate: '05/12/2025' },
      { id: 5, name: 'Constancia de Buró', type: 'PDF', size: '1.5 MB', status: 'completo', uploadDate: '30/11/2025' },
    ],
    validationHistory: [
      { 
        date: '05/12/2025 14:30', 
        action: 'Solicitud enviada', 
        user: 'Luis Rodríguez',
        role: 'Agente Aduanal',
        type: 'submission'
      },
      { 
        date: '06/12/2025 09:15', 
        action: 'Asignada para revisión técnica', 
        user: 'Sistema',
        role: 'Automático',
        type: 'assignment'
      },
      { 
        date: '06/12/2025 10:00', 
        action: 'Revisión técnica iniciada', 
        user: 'Carlos Ruiz',
        role: 'Secretario Técnico',
        type: 'technical_start'
      },
    ]
  };

  const steps = [
    {
      label: 'Revisión Técnica',
      description: 'El Secretario Técnico evalúa la documentación',
      status: technicalReview.status,
      icon: <AssignmentIcon />
    },
    {
      label: 'Validación Colegiada',
      description: 'El pleno del Comité emite su voto',
      status: collegiateVote.status,
      icon: <HowToVoteIcon />
    },
    {
      label: 'Dictamen Final',
      description: 'Resultado de la certificación',
      status: collegiateVote.status === 'completed' ? 'completed' : 'pending',
      icon: <GavelIcon />
    }
  ];

  // HANDLERS MEJORADOS

  // Revisión Técnica
  const handleTechnicalCheck = (check) => {
    setTechnicalReview({
      ...technicalReview,
      checklist: {
        ...technicalReview.checklist,
        [check]: { ...technicalReview.checklist[check], checked: !technicalReview.checklist[check].checked }
      }
    });
  };

  const handleTechnicalComment = (check, comment) => {
    setTechnicalReview({
      ...technicalReview,
      checklist: {
        ...technicalReview.checklist,
        [check]: { ...technicalReview.checklist[check], comment }
      }
    });
  };

  const submitTechnicalReview = () => {
    const allChecked = Object.values(technicalReview.checklist).every(item => item.checked);
    
    if (!allChecked) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Debes completar todos los puntos de la lista de verificación'
      });
      return;
    }

    setTechnicalReview({
      ...technicalReview,
      status: 'completed',
      reviewDate: new Date().toISOString()
    });

    setCollegiateVote({
      ...collegiateVote,
      status: 'pending',
      votingOpenedAt: new Date().toISOString()
    });

    setActiveStep(1);
    
    setNotification({
      show: true,
      type: 'success',
      message: 'Revisión técnica completada. La certificación está lista para votación colegiada.'
    });
  };

  // Validación Colegiada
  const submitVote = () => {
    if (!currentVote.value) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Debes seleccionar un sentido de voto'
      });
      return;
    }

    const updatedVotes = collegiateVote.votes.map(vote => 
      vote.id === currentVote.memberId 
        ? { 
            ...vote, 
            vote: currentVote.value, 
            comment: currentVote.comment,
            votedAt: new Date().toISOString()
          }
        : vote
    );

    setCollegiateVote({
      ...collegiateVote,
      status: 'in_progress',
      votes: updatedVotes
    });

    // Verificar si ya todos votaron
    const allVoted = updatedVotes.every(v => v.vote !== null);
    
    if (allVoted) {
      // Calcular resultado por mayoría simple
      const approveCount = updatedVotes.filter(v => v.vote === 'approve').length;
      const result = approveCount >= 2 ? 'approved' : 'rejected';
      
      setCollegiateVote({
        ...collegiateVote,
        status: 'completed',
        result,
        votes: updatedVotes,
        votingClosedAt: new Date().toISOString()
      });

      setActiveStep(2);
      
      setNotification({
        show: true,
        type: 'success',
        message: `Votación completada. Certificación ${result === 'approved' ? 'APROBADA' : 'RECHAZADA'} por mayoría.`
      });
    } else {
      setNotification({
        show: true,
        type: 'info',
        message: 'Voto registrado. Esperando votos de los demás miembros.'
      });
    }

    setCurrentVote({ memberId: null, value: '', comment: '' });
  };

  const openVoteDialog = (member) => {
    setCurrentVote({ memberId: member.id, value: '', comment: '' });
    setShowConfirmDialog(true);
  };

  const getProgressPercentage = () => {
    if (technicalReview.status === 'completed' && collegiateVote.status === 'completed') return 100;
    if (technicalReview.status === 'completed') return 66;
    if (technicalReview.status === 'in_progress') return 33;
    return 0;
  };

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: colors.background.subtle
    }}>
      {/* Header */}
      <Paper elevation={0} sx={{ 
        p: 2.5, 
        borderBottom: `1px solid ${colors.primary.light}`, 
        bgcolor: colors.background.paper 
      }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                component={Link}
                to="/committee/review"
                size="small"
                sx={{ 
                  bgcolor: colors.background.subtle, 
                  color: colors.primary.main,
                  '&:hover': { bgcolor: 'rgba(58, 110, 165, 0.08)' } 
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              
              <Box>
                <Typography variant="h6" sx={{ color: colors.primary.dark, fontWeight: 700, mb: 0.5 }}>
                  Validación de Certificación
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Chip 
                    label={certification.type}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(19, 59, 107, 0.08)', 
                      color: colors.primary.main, 
                      fontWeight: 600 
                    }}
                  />
                  <Typography variant="caption" sx={{ color: colors.text.secondary, fontFamily: 'monospace' }}>
                    {certification.certificationNumber}
                  </Typography>
                  <Chip 
                    label={certification.status}
                    size="small"
                    sx={{
                      bgcolor: certification.statusColor === 'success' ? colors.status.success :
                               certification.statusColor === 'info' ? colors.status.info :
                               certification.statusColor === 'error' ? colors.status.error :
                               colors.status.warning,
                      color: 'white',
                      fontWeight: 600
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
                  Progreso General
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 200 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={getProgressPercentage()} 
                    sx={{ 
                      flex: 1, 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: colors.primary.light,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: colors.primary.main
                      }
                    }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                    {getProgressPercentage()}%
                  </Typography>
                </Box>
              </Box>
              
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                sx={{ 
                  minWidth: 'auto',
                  borderColor: colors.primary.light,
                  color: colors.primary.main,
                  '&:hover': {
                    borderColor: colors.primary.main,
                    bgcolor: 'rgba(19, 59, 107, 0.04)',
                  }
                }}
              >
                Exportar
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mt: 3 }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel 
                StepIconComponent={() => (
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: index <= activeStep ? colors.primary.main : colors.primary.light,
                    color: index <= activeStep ? 'white' : colors.text.secondary
                  }}>
                    {step.icon}
                  </Box>
                )}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                    {step.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                    {step.description}
                  </Typography>
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {notification.show && (
        <Alert 
          severity={notification.type} 
          sx={{ 
            m: 2,
            bgcolor: notification.type === 'success' ? 'rgba(0, 168, 168, 0.08)' :
                     notification.type === 'error' ? 'rgba(0, 153, 255, 0.08)' :
                     'rgba(58, 110, 165, 0.08)',
            color: notification.type === 'success' ? colors.status.success :
                   notification.type === 'error' ? colors.status.error :
                   colors.primary.main,
          }}
          onClose={() => setNotification({ show: false, type: '', message: '' })}
        >
          {notification.message}
        </Alert>
      )}

      {/* Contenido Principal */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', p: 2, gap: 2 }}>
        {/* Columna Izquierda - 60% */}
        <Grid container spacing={2} sx={{ flex: 3, height: '100%' }}>
          <Grid item xs={12} sx={{ height: '100%' }}>
            <Paper sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden',
              border: `1px solid ${colors.primary.light}20`,
            }}>
              {/* Tabs de contenido */}
              <Tabs 
                value={tabValue} 
                onChange={(e, v) => setTabValue(v)}
                sx={{ 
                  borderBottom: 1, 
                  borderColor: colors.primary.light, 
                  px: 2, 
                  bgcolor: colors.background.subtle,
                  '& .MuiTab-root': {
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
                <Tab icon={<DescriptionIcon />} iconPosition="start" label="Documentación" />
                <Tab icon={<HistoryIcon />} iconPosition="start" label="Historial" />
                <Tab icon={<AssessmentIcon />} iconPosition="start" label="Detalles" />
              </Tabs>

              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {tabValue === 0 && (
                  <Grid container spacing={1.5}>
                    {certification.documents.map((doc) => (
                      <Grid item xs={12} key={doc.id}>
                        <Card variant="outlined" sx={{ 
                          '&:hover': { bgcolor: colors.background.subtle },
                          borderLeft: `4px solid ${colors.status.success}`,
                          borderColor: colors.primary.light,
                        }}>
                          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                                  {doc.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  {doc.type} • {doc.size} • {doc.uploadDate}
                                </Typography>
                              </Box>
                              <Stack direction="row" spacing={0.5}>
                                <Tooltip title="Ver documento">
                                  <IconButton 
                                    size="small"
                                    onClick={() => navigate(`/committee/document/${certification.id}/${doc.id}`)}
                                    sx={{ color: colors.text.secondary }}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Descargar">
                                  <IconButton size="small" sx={{ color: colors.text.secondary }}>
                                    <DownloadIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {tabValue === 1 && (
                  <Timeline position="right" sx={{ m: 0, p: 0 }}>
                    {certification.validationHistory.map((item, index) => (
                      <TimelineItem key={index}>
                        <TimelineOppositeContent sx={{ flex: 0.2, color: colors.text.secondary }}>
                          {item.date}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot sx={{ 
                            bgcolor: 
                              item.type === 'submission' ? colors.status.success :
                              item.type === 'assignment' ? colors.status.warning :
                              item.type === 'technical_start' ? colors.status.info : colors.accents.purple
                          }} />
                          {index < certification.validationHistory.length - 1 && <TimelineConnector sx={{ bgcolor: colors.primary.light }} />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                            {item.action}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                            Por: {item.user} • {item.role}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                )}

                {tabValue === 2 && (
                  <Stack spacing={2}>
                    <Card variant="outlined" sx={{ 
                      p: 2,
                      borderColor: colors.primary.light,
                    }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: colors.primary.dark }}>
                        Información General
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                            Tipo
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.primary.dark }}>{certification.type}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                            Número
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.primary.dark }}>{certification.certificationNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                            Emisión
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.primary.dark }}>{certification.issueDate}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: colors.status.error, display: 'block', fontWeight: 600 }}>
                            Vencimiento
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.status.error, fontWeight: 600 }}>
                            {certification.expirationDate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>

                    <Card variant="outlined" sx={{ 
                      p: 2,
                      borderColor: colors.primary.light,
                    }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: colors.primary.dark }}>
                        Solicitante
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ width: 48, height: 48, bgcolor: colors.primary.main }}>
                          {certification.applicant.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                            {certification.applicant.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                            {certification.applicant.type} • {certification.applicant.region}
                          </Typography>
                        </Box>
                      </Box>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                            CURP
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.primary.dark }}>{certification.applicant.curp}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                            RFC
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.primary.dark }}>{certification.applicant.rfc}</Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Stack>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Columna Derecha - 40% - Panel de Validación */}
        <Paper sx={{ 
          flex: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          border: `1px solid ${colors.primary.light}20`,
        }}>
          {/* Header del panel según la etapa */}
          <Box sx={{ 
            p: 2.5, 
            bgcolor: activeStep === 0 ? colors.primary.dark : 
                     activeStep === 1 ? colors.status.success : 
                     colors.accents.purple,
            color: 'white'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              {activeStep === 0 && <AssignmentIcon />}
              {activeStep === 1 && <HowToVoteIcon />}
              {activeStep === 2 && <GavelIcon />}
              {steps[activeStep].label}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              {steps[activeStep].description}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: 'auto', p: 2.5 }}>
            {/* Etapa 1: Revisión Técnica */}
            {activeStep === 0 && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Stack spacing={3}>
                    {/* Asignado a */}
                    <Card variant="outlined" sx={{ 
                      p: 2, 
                      bgcolor: colors.background.subtle,
                      borderColor: colors.primary.light,
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: colors.primary.main }}>{technicalReview.assignedTo.avatar}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                            {technicalReview.assignedTo.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                            {technicalReview.assignedTo.role} • Asignado para revisión técnica
                          </Typography>
                        </Box>
                      </Box>
                    </Card>

                    {/* Checklist de Validación */}
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                      📋 Lista de Verificación Técnica
                    </Typography>

                    {Object.entries(technicalReview.checklist).map(([key, item]) => {
                      const labels = {
                        documentacionCompleta: 'Documentación completa',
                        autenticidadVerificada: 'Autenticidad verificada',
                        firmasValidas: 'Firmas válidas y legibles',
                        fechasCorrectas: 'Fechas correctas y vigentes',
                        cumplimientoNormativo: 'Cumple requisitos normativos',
                        evidenciasLegibles: 'Evidencias legibles'
                      };

                      return (
                        <Card key={key} variant="outlined" sx={{ 
                          p: 2,
                          borderColor: colors.primary.light,
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleTechnicalCheck(key)}
                              sx={{ color: item.checked ? colors.status.success : colors.primary.light, mt: 0.5 }}
                            >
                              {item.checked ? <CheckCircleIcon /> : <CheckBoxOutlineBlankIcon />}
                            </IconButton>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: colors.primary.dark }}>
                                {labels[key]}
                              </Typography>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="Observaciones (opcional)"
                                value={item.comment}
                                onChange={(e) => handleTechnicalComment(key, e.target.value)}
                                variant="outlined"
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: colors.primary.light,
                                    },
                                    '&:hover fieldset': {
                                      borderColor: colors.primary.main,
                                    },
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </Card>
                      );
                    })}

                    {/* Comentarios Generales */}
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Observaciones generales de la revisión técnica"
                      value={technicalReview.technicalComments}
                      onChange={(e) => setTechnicalReview({ ...technicalReview, technicalComments: e.target.value })}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: colors.primary.light,
                          },
                          '&:hover fieldset': {
                            borderColor: colors.primary.main,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: colors.text.secondary,
                        },
                      }}
                    />

                    {/* Acción */}
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={submitTechnicalReview}
                      disabled={!Object.values(technicalReview.checklist).every(item => item.checked)}
                      sx={{ 
                        py: 1.5,
                        bgcolor: colors.primary.main,
                        '&:hover': { bgcolor: colors.primary.dark },
                        '&.Mui-disabled': {
                          bgcolor: colors.primary.light,
                        }
                      }}
                    >
                      Completar Revisión Técnica
                    </Button>

                    <Alert severity="info" sx={{ 
                      fontSize: '0.8rem',
                      bgcolor: 'rgba(58, 110, 165, 0.08)',
                      color: colors.primary.dark,
                      '& .MuiAlert-icon': {
                        color: colors.primary.main
                      }
                    }}>
                      <strong>Nota:</strong> Una vez completada la revisión técnica, la certificación pasará a votación colegiada del pleno del Comité.
                    </Alert>
                  </Stack>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Etapa 2: Validación Colegiada */}
            {activeStep === 1 && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Stack spacing={3}>
                    {/* Estado de la votación */}
                    <Card variant="outlined" sx={{ 
                      p: 2, 
                      bgcolor: colors.background.subtle,
                      borderColor: colors.primary.light,
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: colors.status.success }}>
                          VOTACIÓN COLEGIADA EN PROGRESO
                        </Typography>
                        <Chip 
                          label={`${collegiateVote.votes.filter(v => v.vote !== null).length}/3 votos emitidos`}
                          size="small"
                          sx={{
                            bgcolor: colors.status.info,
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      </Box>
                    </Card>

                    {/* Miembros del Comité */}
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.status.success }}>
                      👥 Miembros del Comité
                    </Typography>

                    {collegiateVote.votes.map((member) => (
                      <Card key={member.id} variant="outlined" sx={{ 
                        p: 2,
                        borderColor: colors.primary.light,
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: member.color }}>{member.avatar}</Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: colors.primary.dark }}>
                              {member.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                              {member.role}
                            </Typography>
                          </Box>
                          
                          {member.vote === null ? (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => openVoteDialog(member)}
                              disabled={member.vote !== null}
                              sx={{ 
                                bgcolor: member.color, 
                                '&:hover': { bgcolor: member.color, opacity: 0.8 },
                                '&.Mui-disabled': {
                                  bgcolor: colors.primary.light,
                                }
                              }}
                            >
                              Votar
                            </Button>
                          ) : (
                            <Box sx={{ textAlign: 'right' }}>
                              <Chip 
                                label={member.vote === 'approve' ? 'APROBADO' : 'RECHAZADO'}
                                size="small"
                                sx={{
                                  bgcolor: member.vote === 'approve' ? colors.status.success : colors.status.error,
                                  color: 'white',
                                  fontWeight: 600,
                                  mb: 0.5
                                }}
                              />
                              {member.comment && (
                                <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                                  {member.comment}
                                </Typography>
                              )}
                            </Box>
                          )}
                        </Box>
                      </Card>
                    ))}

                    {/* Verificación de quórum */}
                    <Alert severity="info" sx={{ 
                      fontSize: '0.8rem',
                      bgcolor: 'rgba(58, 110, 165, 0.08)',
                      color: colors.primary.dark,
                      '& .MuiAlert-icon': {
                        color: colors.primary.main
                      }
                    }}>
                      <strong>Quórum requerido:</strong> Se necesitan 3 votos para emitir un dictamen por mayoría.
                      {collegiateVote.votes.filter(v => v.vote !== null).length >= 2 && (
                        <Box sx={{ mt: 1, color: colors.status.success }}>
                          ✓ Se ha alcanzado el quórum mínimo. La decisión se tomará por mayoría simple.
                        </Box>
                      )}
                    </Alert>
                  </Stack>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Etapa 3: Dictamen Final */}
            {activeStep === 2 && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Stack spacing={3} alignItems="center">
                    <Box sx={{ 
                      width: 120, 
                      height: 120, 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: collegiateVote.result === 'approved' ? 'rgba(0, 168, 168, 0.08)' : 'rgba(0, 153, 255, 0.08)',
                      color: collegiateVote.result === 'approved' ? colors.status.success : colors.status.error,
                      mb: 2
                    }}>
                      {collegiateVote.result === 'approved' ? (
                        <CheckCircleIcon sx={{ fontSize: 80 }} />
                      ) : (
                        <CancelIcon sx={{ fontSize: 80 }} />
                      )}
                    </Box>

                    <Typography variant="h5" sx={{ 
                      fontWeight: 700,
                      color: collegiateVote.result === 'approved' ? colors.status.success : colors.status.error
                    }}>
                      CERTIFICACIÓN {collegiateVote.result === 'approved' ? 'APROBADA' : 'RECHAZADA'}
                    </Typography>

                    <Typography variant="body2" sx={{ color: colors.text.secondary, textAlign: 'center' }}>
                      Por mayoría del Comité de Cumplimiento
                    </Typography>

                    <Card variant="outlined" sx={{ 
                      width: '100%', 
                      p: 2,
                      borderColor: colors.primary.light,
                    }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: colors.primary.dark }}>
                        Resultado de la votación:
                      </Typography>
                      
                      {collegiateVote.votes.map((member) => (
                        <Box key={member.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: member.color, fontSize: '0.75rem' }}>
                              {member.avatar}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: colors.primary.dark }}>{member.name}</Typography>
                          </Box>
                          <Chip 
                            label={member.vote === 'approve' ? 'A Favor' : 'En Contra'}
                            size="small"
                            sx={{
                              bgcolor: member.vote === 'approve' ? colors.status.success : colors.status.error,
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                        </Box>
                      ))}
                    </Card>

                    <Button
                      fullWidth
                      variant="contained"
                      component={Link}
                      to="/committee/review"
                      startIcon={<ArrowBackIcon />}
                      sx={{ 
                        bgcolor: colors.primary.main,
                        '&:hover': { bgcolor: colors.primary.dark }
                      }}
                    >
                      Volver al listado
                    </Button>
                  </Stack>
                </motion.div>
              </AnimatePresence>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Diálogo de Votación */}
      <Dialog 
        open={showConfirmDialog} 
        onClose={() => setShowConfirmDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            border: `1px solid ${colors.primary.light}`,
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: colors.primary.dark }}>
            <HowToVoteIcon sx={{ color: colors.primary.main }} />
            Emitir Voto
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3, color: colors.text.secondary }}>
            Selecciona el sentido de tu voto para esta certificación
          </Typography>

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                border: currentVote.value === 'approve' ? `2px solid ${colors.status.success}` : `1px solid ${colors.primary.light}`,
                bgcolor: currentVote.value === 'approve' ? 'rgba(0, 168, 168, 0.04)' : 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentVote({ ...currentVote, value: 'approve' })}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThumbUpIcon sx={{ color: colors.status.success }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: colors.status.success }}>
                  A FAVOR
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', ml: 4 }}>
                La certificación cumple con todos los requisitos
              </Typography>
            </Paper>

            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2,
                border: currentVote.value === 'reject' ? `2px solid ${colors.status.error}` : `1px solid ${colors.primary.light}`,
                bgcolor: currentVote.value === 'reject' ? 'rgba(0, 153, 255, 0.04)' : 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentVote({ ...currentVote, value: 'reject' })}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThumbDownIcon sx={{ color: colors.status.error }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: colors.status.error }}>
                  EN CONTRA
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', ml: 4 }}>
                La certificación no cumple con los requisitos establecidos
              </Typography>
            </Paper>
          </Stack>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Fundamentación del voto"
            placeholder="Explica las razones de tu voto (opcional)"
            value={currentVote.comment}
            onChange={(e) => setCurrentVote({ ...currentVote, comment: e.target.value })}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: colors.primary.light,
                },
                '&:hover fieldset': {
                  borderColor: colors.primary.main,
                },
              },
              '& .MuiInputLabel-root': {
                color: colors.text.secondary,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            onClick={() => setShowConfirmDialog(false)} 
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
            onClick={() => {
              submitVote();
              setShowConfirmDialog(false);
            }}
            variant="contained"
            disabled={!currentVote.value}
            sx={{ 
              bgcolor: colors.primary.main,
              '&:hover': { bgcolor: colors.primary.dark },
              '&.Mui-disabled': {
                bgcolor: colors.primary.light,
              }
            }}
          >
            Confirmar Voto
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CertificationReview;