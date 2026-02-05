import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
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
  Assignment as AssignmentIcon
} from '@mui/icons-material';

const CertificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState(null);
  const [comments, setComments] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  // Datos mock de la certificación
  const certification = {
    id: id || '1',
    type: 'PATENTE ADUANAL',
    title: 'Certificación de Patente Aduanal',
    description: 'La patente aduanal autoriza a una persona física o moral para promover el despacho de las mercancías, en los diferentes regímenes aduaneros previstos en la Ley Aduanera, ante las autoridades aduaneras, actuando en nombre y por cuenta ajena.',
    status: 'PENDIENTE DE REVISIÓN',
    issueDate: '11/01/2026',
    expirationDate: '11/01/2029',
    applicant: 'Luis Rodríguez Martínez',
    applicationDate: '05/12/2025',
    certificationNumber: 'PA-2026-00145',
    evaluator: 'María González López',
    reviewDate: 'Pendiente',
    documents: [
      { id: 1, name: 'Solicitud Formal de Certificación', type: 'PDF', size: '1.2 MB', date: '05/12/2025' },
      { id: 2, name: 'Identificación Oficial', type: 'JPG', size: '0.8 MB', date: '05/12/2025' },
      { id: 3, name: 'Constancia de Examen Aprobado', type: 'PDF', size: '0.9 MB', date: '28/11/2025' },
      { id: 4, name: 'Experiencia Profesional Comprobada', type: 'PDF', size: '2.1 MB', date: '05/12/2025' },
      { id: 5, name: 'Constancia de Buró de Crédito', type: 'PDF', size: '1.5 MB', date: '30/11/2025' },
    ]
  };

  const handleActionSelect = (action) => {
    setSelectedAction(action);
  };

  const handleSubmitReview = () => {
    if (!selectedAction) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Por favor, seleccione una acción (Aprobar o Denegar)'
      });
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmReview = () => {
    // Simular envío de revisión
    setTimeout(() => {
      setShowConfirmDialog(false);
      setNotification({
        show: true,
        type: 'success',
        message: `Certificación ${selectedAction === 'approve' ? 'APROBADA' : 'DENEGADA'} exitosamente`
      });
      
      // Actualizar estado localmente
      certification.status = selectedAction === 'approve' ? 'APROBADA' : 'RECHAZADA';
      certification.reviewDate = new Date().toLocaleDateString('es-ES');
      
      // Limpiar selección
      setSelectedAction(null);
      setComments('');
    }, 1000);
  };

  const handleDocumentAction = (action, documentName) => {
    setNotification({
      show: true,
      type: 'info',
      message: `${action === 'download' ? 'Descargando' : 'Viendo'} ${documentName}...`
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'APROBADA': return 'success';
      case 'RECHAZADA': return 'error';
      case 'PENDIENTE DE REVISIÓN': return 'warning';
      case 'VIGENTE': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header con acciones */}
      <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Button
              startIcon={<ArrowBackIcon />}
              component={Link}
              to="/certifications"
              sx={{ mb: 1 }}
            >
              Volver
            </Button>
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
              CERTIFICACIÓN: {certification.type}
            </Typography>
            <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
              Revisión y evaluación de certificación
            </Typography>
          </Box>
          
          <Box>
            <Chip 
              label={certification.status}
              color={getStatusColor(certification.status)}
              size="large"
              sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
            />
          </Box>
        </Box>

        {/* Fechas */}
        <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Fecha de Emisión:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              {certification.issueDate}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Fecha de Vencimiento:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              {certification.expirationDate}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {notification.show && (
        <Alert 
          severity={notification.type} 
          sx={{ mb: 3 }}
          onClose={() => setNotification({ show: false, type: '', message: '' })}
        >
          {notification.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Columna izquierda - Detalles y evaluación */}
        <Grid item xs={12} md={7}>
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold', borderBottom: '2px solid #f0f0f0', pb: 1 }}>
              DETALLES DE LA CERTIFICACIÓN
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 1 }}>
                  Tipo de Certificación
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {certification.title}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 1 }}>
                  Descripción
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                  <Typography variant="body2">
                    {certification.description}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 1 }}>
                  Solicitante
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1, color: '#7f8c8d' }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {certification.applicant}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 1 }}>
                  Fecha de Solicitud
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EventIcon sx={{ mr: 1, color: '#7f8c8d' }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {certification.applicationDate}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Sección de evaluación */}
          <Paper elevation={1} sx={{ p: 3, bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" align="center" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
              CALIFICAR
            </Typography>
            
            <Typography variant="body2" align="center" sx={{ color: '#7f8c8d', mb: 4 }}>
              Seleccione una opción para aprobar o denegar esta certificación
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 4 }}>
              <Button
                variant={selectedAction === 'approve' ? 'contained' : 'outlined'}
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={() => handleActionSelect('approve')}
                sx={{ 
                  minWidth: 180,
                  py: 1.5,
                  borderWidth: selectedAction === 'approve' ? 0 : 2,
                  borderColor: '#2ecc71'
                }}
              >
                APROBAR
              </Button>
              
              <Button
                variant={selectedAction === 'deny' ? 'contained' : 'outlined'}
                color="error"
                startIcon={<CancelIcon />}
                onClick={() => handleActionSelect('deny')}
                sx={{ 
                  minWidth: 180,
                  py: 1.5,
                  borderWidth: selectedAction === 'deny' ? 0 : 2,
                  borderColor: '#e74c3c'
                }}
              >
                DENEGAR
              </Button>
            </Stack>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                Comentarios / Observaciones
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Ingrese sus comentarios u observaciones sobre la certificación..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                variant="outlined"
              />
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmitReview}
                disabled={!selectedAction}
                sx={{ minWidth: 200 }}
              >
                Guardar Evaluación
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Columna derecha - Documentos e información adicional */}
        <Grid item xs={12} md={5}>
          {/* Documentos */}
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold', borderBottom: '2px solid #f0f0f0', pb: 1 }}>
              DOCUMENTOS ADJUNTOS
            </Typography>
            
            <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 2 }}>
              Documentación presentada para la solicitud de certificación
            </Typography>

            <List>
              {certification.documents.map((doc) => (
                <Paper key={doc.id} variant="outlined" sx={{ mb: 2, p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DescriptionIcon sx={{ mr: 2, color: '#3498db', fontSize: 32 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {doc.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        {doc.type} • {doc.size} • {doc.date}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDocumentAction('view', doc.name)}
                        sx={{ color: '#f39c12' }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDocumentAction('download', doc.name)}
                        sx={{ color: '#3498db' }}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Stack>
                  </Box>
                </Paper>
              ))}
            </List>
          </Paper>

          {/* Información adicional */}
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold', borderBottom: '2px solid #f0f0f0', pb: 1 }}>
              INFORMACIÓN ADICIONAL
            </Typography>

            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 0.5 }}>
                  Número de Certificación
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {certification.certificationNumber}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 0.5 }}>
                  Revisor Asignado
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AssignmentIcon sx={{ mr: 1, color: '#7f8c8d', fontSize: 20 }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {certification.evaluator}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 0.5 }}>
                  Fecha de Revisión
                </Typography>
                <Typography variant="body1" sx={{ 
                  fontWeight: 'bold', 
                  color: certification.reviewDate === 'Pendiente' ? '#f39c12' : '#2c3e50'
                }}>
                  {certification.reviewDate}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Diálogo de confirmación */}
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>Confirmar Evaluación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea {selectedAction === 'approve' ? 'APROBAR' : 'DENEGAR'} esta certificación?
          </Typography>
          {comments && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Comentarios:</strong> {comments}
              </Typography>
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancelar</Button>
          <Button 
            onClick={confirmReview} 
            variant="contained" 
            color={selectedAction === 'approve' ? 'success' : 'error'}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CertificationDetail;