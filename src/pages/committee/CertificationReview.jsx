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
  Divider,
  IconButton,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Avatar,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Description as DescriptionIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
  History as HistoryIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  Timeline as TimelineIcon,
  Gavel as GavelIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

const CertificationReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [approvalStatus, setApprovalStatus] = useState('');
  const [comments, setComments] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [activeStep, setActiveStep] = useState(0);
  const [expandedPanels, setExpandedPanels] = useState({
    documentos: true,
    informacion: false,
    historial: false
  });

  // Datos mock de la certificación
  const certification = {
    id: id || '1',
    type: 'PATENTE ADUANAL',
    title: 'Certificación de Patente Aduanal',
    description: 'La patente aduanal autoriza a una persona física o moral para promover el despacho de las mercancías, en los diferentes regímenes aduaneros previstos en la Ley Aduanera, ante las autoridades aduaneras, actuando en nombre y por cuenta ajena.',
    status: 'PENDIENTE DE REVISIÓN',
    issueDate: '11/01/2026',
    expirationDate: '11/01/2029',
    applicant: {
      name: 'Luis Rodríguez Martínez',
      type: 'Agente Aduanal',
      curp: 'RODL800101HDFXYZ01',
      rfc: 'RODL800101ABC',
      region: 'Norte',
      email: 'luis.rodriguez@ejemplo.com',
      phone: '+52 55 1234 5678',
      complianceScore: 85,
      level: 'Avanzado'
    },
    applicationDate: '05/12/2025',
    certificationNumber: 'PA-2026-00145',
    evaluator: 'María González López',
    reviewDate: 'Pendiente',
    documents: [
      { id: 1, name: 'Solicitud Formal de Certificación', type: 'PDF', size: '1.2 MB', status: 'completo', uploadDate: '05/12/2025' },
      { id: 2, name: 'Identificación Oficial (INE)', type: 'JPG', size: '0.8 MB', status: 'completo', uploadDate: '05/12/2025' },
      { id: 3, name: 'Constancia de Examen Aprobado', type: 'PDF', size: '0.9 MB', status: 'completo', uploadDate: '28/11/2025' },
      { id: 4, name: 'Experiencia Profesional Comprobada', type: 'PDF', size: '2.1 MB', status: 'pendiente', uploadDate: '05/12/2025' },
      { id: 5, name: 'Constancia de Buró de Crédito', type: 'PDF', size: '1.5 MB', status: 'completo', uploadDate: '30/11/2025' },
    ],
    history: [
      { date: '05/12/2025', action: 'Solicitud enviada', user: 'Luis Rodríguez' },
      { date: '06/12/2025', action: 'Asignada para revisión', user: 'Sistema' },
      { date: '10/12/2025', action: 'Observación: Documento 4 requiere validación', user: 'Carlos Ruiz' },
    ]
  };

  const steps = [
    'Revisión de Documentación',
    'Validación de Requisitos',
    'Emisión de Dictamen'
  ];

  const handlePanelChange = (panel) => (event, isExpanded) => {
    setExpandedPanels({
      ...expandedPanels,
      [panel]: isExpanded
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDocumentAction = (action, document) => {
    switch(action) {
      case 'view':
        navigate(`/committee/document/${certification.id}/${document.id}`);
        break;
      case 'download':
        setNotification({
          show: true,
          type: 'info',
          message: `Descargando ${document.name}...`
        });
        break;
      default:
        break;
    }
  };

  const handleSubmitReview = () => {
    if (!approvalStatus) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Por favor, seleccione un resultado de evaluación'
      });
      return;
    }

    if (!comments && approvalStatus === 'reject') {
      setNotification({
        show: true,
        type: 'error',
        message: 'Para rechazar una certificación es necesario agregar comentarios'
      });
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmReview = () => {
    // Simular envío
    setTimeout(() => {
      setShowConfirmDialog(false);
      setNotification({
        show: true,
        type: 'success',
        message: `Certificación ${approvalStatus === 'approve' ? 'APROBADA' : 'RECHAZADA'} exitosamente`
      });
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/committee/dashboard');
      }, 2000);
    }, 1000);
  };

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)', // Altura completa menos AppBar
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Fijo */}
      <Paper elevation={0} sx={{ 
        p: 2, 
        mb: 2,
        bgcolor: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0',
        flexShrink: 0
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              component={Link}
              to="/committee/dashboard"
              size="small"
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Validación de Certificación Individual
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Chip 
                  label={certification.type}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  {certification.certificationNumber}
                </Typography>
                <Chip 
                  label="VALIDACIÓN INDIVIDUAL"
                  size="small"
                  color="info"
                  sx={{ fontSize: '0.65rem' }}
                />
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={certification.status}
              color="warning"
              icon={<WarningIcon />}
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
            >
              Exportar Revisión
            </Button>
          </Box>
        </Box>
        
        {/* Stepper compacto */}
        <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '0.75rem' } }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {notification.show && (
        <Alert 
          severity={notification.type} 
          sx={{ mb: 2, mx: 2 }}
          onClose={() => setNotification({ show: false, type: '', message: '' })}
        >
          {notification.message}
        </Alert>
      )}

      {/* Contenido Principal - Sin Scroll Vertical */}
      <Box sx={{ 
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        pb: 2
      }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Columna Izquierda - 60% */}
          <Grid item xs={12} md={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Acordeón para Documentos - Optimiza espacio */}
            <Paper elevation={1} sx={{ mb: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Accordion 
                expanded={expandedPanels.documentos}
                onChange={handlePanelChange('documentos')}
                sx={{ flex: 1 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon /> Documentación Requerida
                    <Chip 
                      label={`${certification.documents.filter(d => d.status === 'completo').length}/${certification.documents.length}`}
                      size="small"
                      color="primary"
                    />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <Grid container spacing={1}>
                    {certification.documents.map((doc) => (
                      <Grid item xs={12} key={doc.id}>
                        <Card variant="outlined" sx={{ 
                          '&:hover': { bgcolor: '#f8f9fa' },
                          borderLeft: doc.status === 'completo' ? '4px solid #4caf50' : '4px solid #ff9800'
                        }}>
                          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {doc.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                  {doc.type} • {doc.size} • {doc.uploadDate}
                                </Typography>
                              </Box>
                              <Stack direction="row" spacing={0.5}>
                                <Tooltip title="Ver documento">
                                  <IconButton 
                                    size="small"
                                    onClick={() => handleDocumentAction('view', doc)}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Descargar">
                                  <IconButton 
                                    size="small"
                                    onClick={() => handleDocumentAction('download', doc)}
                                  >
                                    <DownloadIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Chip 
                                  label={doc.status === 'completo' ? '✓' : '!'}
                                  size="small"
                                  color={doc.status === 'completo' ? 'success' : 'warning'}
                                  sx={{ width: 24, height: 24 }}
                                />
                              </Stack>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Paper>

            {/* Panel de Evaluación - Fijo en parte inferior */}
            <Paper elevation={1} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
                Dictamen Técnico de la Certificación
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2, fontSize: '0.8rem' }}>
                <Typography variant="body2">
                  <strong>ATENCIÓN:</strong> Esta validación aplica únicamente a la certificación individual {certification.certificationNumber}. 
                  No constituye aprobación del expediente completo.
                </Typography>
              </Alert>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={approvalStatus}
                      onChange={(e) => setApprovalStatus(e.target.value)}
                      row
                      sx={{ justifyContent: 'center', gap: 4 }}
                    >
                      <Tooltip title="La certificación cumple con todos los requisitos establecidos">
                        <FormControlLabel
                          value="approve"
                          control={<Radio color="success" />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CheckCircleIcon sx={{ color: '#27ae60' }} />
                              <Typography variant="body2">Certificación CONFORME</Typography>
                            </Box>
                          }
                        />
                      </Tooltip>
                      <Tooltip title="La certificación no cumple con los requisitos establecidos">
                        <FormControlLabel
                          value="reject"
                          control={<Radio color="error" />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CancelIcon sx={{ color: '#e74c3c' }} />
                              <Typography variant="body2">Certificación NO CONFORME</Typography>
                            </Box>
                          }
                        />
                      </Tooltip>
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Fundamentación técnica del dictamen (obligatorio en caso de no conformidad)..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    variant="outlined"
                    size="small"
                    required={approvalStatus === 'reject'}
                    helperText="Este dictamen quedará registrado en el historial de la certificación"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/committee/dashboard')}
                    >
                      Posponer
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitReview}
                      disabled={!approvalStatus}
                      startIcon={<GavelIcon />}
                      sx={{ minWidth: 200 }}
                    >
                      Registrar Dictamen
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Columna Derecha - 40% - Información Contextual */}
          <Grid item xs={12} md={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Información del Solicitante */}
            <Paper elevation={1} sx={{ p: 2, mb: 2, flex: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
                <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Información del Solicitante
              </Typography>
              
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Nombre
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {certification.applicant.name}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Nivel de Reconocimiento
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={certification.applicant.complianceScore}
                      sx={{ flex: 1, height: 6 }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      {certification.applicant.complianceScore}%
                    </Typography>
                  </Box>
                </Box>
                
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Región
                    </Typography>
                    <Typography variant="body2">{certification.applicant.region}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Tipo
                    </Typography>
                    <Chip 
                      label={certification.applicant.type}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                
                <Divider />
                
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  startIcon={<TimelineIcon />}
                  component={Link}
                  to={`/expediente?user=${certification.applicant.name}`}
                >
                  Consultar Expediente (Solo lectura)
                </Button>
              </Stack>
            </Paper>

            {/* Detalles de la Certificación */}
            <Paper elevation={1} sx={{ p: 2, mb: 2, flex: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
                <AssignmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Detalles de la Certificación
              </Typography>
              
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Tipo
                  </Typography>
                  <Typography variant="body2">{certification.title}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Vigencia
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      Emisión: {certification.issueDate}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                      Vence: {certification.expirationDate}
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Descripción
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    {certification.description.substring(0, 150)}...
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* Historial Rápido */}
            <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
                <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Historial Reciente
              </Typography>
              
              <Stack spacing={1} sx={{ maxHeight: '150px', overflowY: 'auto' }}>
                {certification.history.map((item, index) => (
                  <Box key={index} sx={{ p: 1, borderLeft: '2px solid #e0e0e0', pl: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      {item.action}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                      Por: {item.user} • {item.date}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Diálogo de Confirmación */}
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>
          Confirmar Dictamen Técnico
          <Typography variant="caption" sx={{ display: 'block', color: '#7f8c8d', mt: 0.5 }}>
            Esta acción aplica únicamente a la certificación {certification.certificationNumber}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            ¿Está seguro de registrar la certificación como 
            <strong> {approvalStatus === 'approve' ? 'CONFORME' : 'NO CONFORME'}</strong>?
          </Typography>
          
          {comments && (
            <Alert severity={approvalStatus === 'approve' ? 'info' : 'warning'} sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Fundamentación:</strong> {comments}
              </Typography>
            </Alert>
          )}
          
          <Alert severity="info" sx={{ mt: 2, fontSize: '0.8rem' }}>
            Este dictamen será registrado en el historial de auditoría y notificado al solicitante.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancelar</Button>
          <Button 
            onClick={confirmReview} 
            variant="contained" 
            color={approvalStatus === 'approve' ? 'success' : 'error'}
          >
            Confirmar Dictamen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CertificationReview;