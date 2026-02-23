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
        color: '#1a237e'
      },
      { 
        id: 2, 
        member: 'Juan Pérez', 
        role: 'Vocal', 
        avatar: 'JP',
        vote: null,
        comment: '',
        votedAt: null,
        color: '#2e7d32'
      },
      { 
        id: 3, 
        member: 'Laura Sánchez', 
        role: 'Vocal', 
        avatar: 'LS',
        vote: null,
        comment: '',
        votedAt: null,
        color: '#9c27b0'
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
      bgcolor: '#f8fafc'
    }}>
      {/* Header */}
      <Paper elevation={0} sx={{ p: 2.5, borderBottom: '1px solid #e0e0e0', bgcolor: 'white' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                component={Link}
                to="/committee/review"
                size="small"
                sx={{ bgcolor: '#f0f4f8', '&:hover': { bgcolor: '#e3e8f0' } }}
              >
                <ArrowBackIcon />
              </IconButton>
              
              <Box>
                <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 700, mb: 0.5 }}>
                  Validación de Certificación
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Chip 
                    label={certification.type}
                    size="small"
                    sx={{ bgcolor: '#e8eaf6', color: '#1a237e', fontWeight: 600 }}
                  />
                  <Typography variant="caption" sx={{ color: '#64748b', fontFamily: 'monospace' }}>
                    {certification.certificationNumber}
                  </Typography>
                  <Chip 
                    label={certification.status}
                    size="small"
                    color={certification.statusColor}
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1.5} justifyContent="flex-end" alignItems="center">
              <Box sx={{ textAlign: 'right', mr: 2 }}>
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                  Progreso General
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 200 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={getProgressPercentage()} 
                    sx={{ flex: 1, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#1a237e' }}>
                    {getProgressPercentage()}%
                  </Typography>
                </Box>
              </Box>
              
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                sx={{ minWidth: 'auto' }}
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
                    bgcolor: index <= activeStep ? '#1a237e' : '#e0e0e0',
                    color: index <= activeStep ? 'white' : '#9e9e9e'
                  }}>
                    {step.icon}
                  </Box>
                )}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {step.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
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
          sx={{ m: 2 }}
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
            <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Tabs de contenido */}
              <Tabs 
                value={tabValue} 
                onChange={(e, v) => setTabValue(v)}
                sx={{ borderBottom: 1, borderColor: 'divider', px: 2, bgcolor: '#f8fafc' }}
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
                          '&:hover': { bgcolor: '#f8f9fa' },
                          borderLeft: '4px solid #4caf50'
                        }}>
                          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {doc.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#64748b' }}>
                                  {doc.type} • {doc.size} • {doc.uploadDate}
                                </Typography>
                              </Box>
                              <Stack direction="row" spacing={0.5}>
                                <Tooltip title="Ver documento">
                                  <IconButton 
                                    size="small"
                                    onClick={() => navigate(`/committee/document/${certification.id}/${doc.id}`)}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Descargar">
                                  <IconButton size="small">
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
                        <TimelineOppositeContent sx={{ flex: 0.2, color: '#64748b' }}>
                          {item.date}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot sx={{ 
                            bgcolor: 
                              item.type === 'submission' ? '#4caf50' :
                              item.type === 'assignment' ? '#ff9800' :
                              item.type === 'technical_start' ? '#2196f3' : '#9c27b0'
                          }} />
                          {index < certification.validationHistory.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item.action}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            Por: {item.user} • {item.role}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                )}

                {tabValue === 2 && (
                  <Stack spacing={2}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#1a237e' }}>
                        Información General
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                            Tipo
                          </Typography>
                          <Typography variant="body2">{certification.type}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                            Número
                          </Typography>
                          <Typography variant="body2">{certification.certificationNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                            Emisión
                          </Typography>
                          <Typography variant="body2">{certification.issueDate}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: '#e74c3c', display: 'block', fontWeight: 600 }}>
                            Vencimiento
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#e74c3c', fontWeight: 600 }}>
                            {certification.expirationDate}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>

                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#1a237e' }}>
                        Solicitante
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ width: 48, height: 48, bgcolor: '#1a237e' }}>
                          {certification.applicant.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {certification.applicant.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {certification.applicant.type} • {certification.applicant.region}
                          </Typography>
                        </Box>
                      </Box>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                            CURP
                          </Typography>
                          <Typography variant="body2">{certification.applicant.curp}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                            RFC
                          </Typography>
                          <Typography variant="body2">{certification.applicant.rfc}</Typography>
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
        <Paper sx={{ flex: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header del panel según la etapa */}
          <Box sx={{ 
            p: 2.5, 
            bgcolor: activeStep === 0 ? '#1a237e' : activeStep === 1 ? '#2e7d32' : '#9c27b0',
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
                    <Card variant="outlined" sx={{ p: 2, bgcolor: '#f8fafc' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#1a237e' }}>{technicalReview.assignedTo.avatar}</Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {technicalReview.assignedTo.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {technicalReview.assignedTo.role} • Asignado para revisión técnica
                          </Typography>
                        </Box>
                      </Box>
                    </Card>

                    {/* Checklist de Validación */}
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1a237e' }}>
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
                        <Card key={key} variant="outlined" sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleTechnicalCheck(key)}
                              sx={{ color: item.checked ? '#4caf50' : '#bdbdbd', mt: 0.5 }}
                            >
                              {item.checked ? <CheckCircleIcon /> : <CheckBoxOutlineBlankIcon />}
                            </IconButton>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {labels[key]}
                              </Typography>
                              <TextField
                                fullWidth
                                size="small"
                                placeholder="Observaciones (opcional)"
                                value={item.comment}
                                onChange={(e) => handleTechnicalComment(key, e.target.value)}
                                variant="outlined"
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
                        bgcolor: '#1a237e',
                        '&:hover': { bgcolor: '#283593' }
                      }}
                    >
                      Completar Revisión Técnica
                    </Button>

                    <Alert severity="info" sx={{ fontSize: '0.8rem' }}>
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
                    <Card variant="outlined" sx={{ p: 2, bgcolor: '#f8fafc' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                          VOTACIÓN COLEGIADA EN PROGRESO
                        </Typography>
                        <Chip 
                          label={`${collegiateVote.votes.filter(v => v.vote !== null).length}/3 votos emitidos`}
                          size="small"
                          color="info"
                        />
                      </Box>
                    </Card>

                    {/* Miembros del Comité */}
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                      👥 Miembros del Comité
                    </Typography>

                    {collegiateVote.votes.map((member) => (
                      <Card key={member.id} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: member.color }}>{member.avatar}</Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {member.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                              {member.role}
                            </Typography>
                          </Box>
                          
                          {member.vote === null ? (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => openVoteDialog(member)}
                              disabled={member.vote !== null}
                              sx={{ bgcolor: member.color, '&:hover': { bgcolor: member.color, opacity: 0.8 } }}
                            >
                              Votar
                            </Button>
                          ) : (
                            <Box sx={{ textAlign: 'right' }}>
                              <Chip 
                                label={member.vote === 'approve' ? 'APROBADO' : 'RECHAZADO'}
                                size="small"
                                color={member.vote === 'approve' ? 'success' : 'error'}
                                sx={{ mb: 0.5 }}
                              />
                              {member.comment && (
                                <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                  {member.comment}
                                </Typography>
                              )}
                            </Box>
                          )}
                        </Box>
                      </Card>
                    ))}

                    {/* Verificación de quórum */}
                    <Alert severity="info" sx={{ fontSize: '0.8rem' }}>
                      <strong>Quórum requerido:</strong> Se necesitan 3 votos para emitir un dictamen por mayoría.
                      {collegiateVote.votes.filter(v => v.vote !== null).length >= 2 && (
                        <Box sx={{ mt: 1, color: '#4caf50' }}>
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
                      bgcolor: collegiateVote.result === 'approved' ? '#e8f5e8' : '#ffebee',
                      color: collegiateVote.result === 'approved' ? '#4caf50' : '#f44336',
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
                      color: collegiateVote.result === 'approved' ? '#4caf50' : '#f44336'
                    }}>
                      CERTIFICACIÓN {collegiateVote.result === 'approved' ? 'APROBADA' : 'RECHAZADA'}
                    </Typography>

                    <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
                      Por mayoría del Comité de Cumplimiento
                    </Typography>

                    <Card variant="outlined" sx={{ width: '100%', p: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        Resultado de la votación:
                      </Typography>
                      
                      {collegiateVote.votes.map((member) => (
                        <Box key={member.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: member.color, fontSize: '0.75rem' }}>
                              {member.avatar}
                            </Avatar>
                            <Typography variant="body2">{member.name}</Typography>
                          </Box>
                          <Chip 
                            label={member.vote === 'approve' ? 'A Favor' : 'En Contra'}
                            size="small"
                            color={member.vote === 'approve' ? 'success' : 'error'}
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
                      sx={{ bgcolor: '#1a237e' }}
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
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HowToVoteIcon sx={{ color: '#1a237e' }} />
            Emitir Voto
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
            Selecciona el sentido de tu voto para esta certificación
          </Typography>

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                border: currentVote.value === 'approve' ? '2px solid #4caf50' : '1px solid #e0e0e0',
                bgcolor: currentVote.value === 'approve' ? '#f1f9f1' : 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentVote({ ...currentVote, value: 'approve' })}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThumbUpIcon sx={{ color: '#4caf50' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#4caf50' }}>
                  A FAVOR
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', ml: 4 }}>
                La certificación cumple con todos los requisitos
              </Typography>
            </Paper>

            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2,
                border: currentVote.value === 'reject' ? '2px solid #f44336' : '1px solid #e0e0e0',
                bgcolor: currentVote.value === 'reject' ? '#fef2f2' : 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentVote({ ...currentVote, value: 'reject' })}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ThumbDownIcon sx={{ color: '#f44336' }} />
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#f44336' }}>
                  EN CONTRA
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', ml: 4 }}>
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
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setShowConfirmDialog(false)} variant="outlined">
            Cancelar
          </Button>
          <Button 
            onClick={() => {
              submitVote();
              setShowConfirmDialog(false);
            }}
            variant="contained"
            disabled={!currentVote.value}
            sx={{ bgcolor: '#1a237e' }}
          >
            Confirmar Voto
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CertificationReview;