import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Description as DescriptionIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const UserReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewAction, setReviewAction] = useState('');
  const [reviewComments, setReviewComments] = useState('');

  // Datos mock del usuario
  const user = {
    id: id || '1',
    name: 'Luis Rodríguez Martínez',
    email: 'luis.rodriguez@ejemplo.com',
    role: 'Agente Aduanal',
    status: 'EN REVISIÓN',
    region: 'Norte',
    registrationDate: '15/01/2024',
    lastAccess: '15/01/2026 10:30 AM',
    certifications: 8,
    pendingReviews: 2,
    complianceRate: 85,
    documents: [
      { id: 1, name: 'Identificación Oficial', status: 'APROBADO', date: '10/01/2026' },
      { id: 2, name: 'Comprobante de Domicilio', status: 'APROBADO', date: '10/01/2026' },
      { id: 3, name: 'Cédula Profesional', status: 'PENDIENTE', date: '12/01/2026' },
      { id: 4, name: 'Constancia Fiscal', status: 'APROBADO', date: '11/01/2026' },
    ],
    certificationsList: [
      { id: 1, type: 'Patente Aduanal', status: 'VIGENTE', expiration: '11/01/2029' },
      { id: 2, type: 'Opinión SAT', status: 'POR VENCER', expiration: '30/01/2026' },
      { id: 3, type: 'Poder Notarial', status: 'VIGENTE', expiration: '15/08/2026' },
    ],
    activityLog: [
      { id: 1, action: 'Nueva certificación registrada', date: '15/01/2026 09:15' },
      { id: 2, action: 'Actualización de perfil', date: '14/01/2026 14:30' },
      { id: 3, action: 'Documento cargado', date: '13/01/2026 11:45' },
    ]
  };

  const handleReviewAction = (action) => {
    setReviewAction(action);
    setReviewDialog(true);
  };

  const confirmReview = () => {
    // Simular envío de revisión
    setTimeout(() => {
      setReviewDialog(false);
      alert(`Usuario ${reviewAction === 'approve' ? 'APROBADO' : 'RECHAZADO'} exitosamente`);
      navigate('/admin/users');
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'APROBADO': return 'success';
      case 'PENDIENTE': return 'warning';
      case 'RECHAZADO': return 'error';
      case 'VIGENTE': return 'success';
      case 'POR VENCER': return 'warning';
      case 'EN REVISIÓN': return 'info';
      default: return 'default';
    }
  };

  const getComplianceColor = (rate) => {
    if (rate >= 90) return '#27ae60';
    if (rate >= 70) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin/users')}
            sx={{ mb: 1 }}
          >
            Volver
          </Button>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
            Revisión de Usuario
          </Typography>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
            Análisis completo del usuario: {user.name}
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            onClick={() => handleReviewAction('reject')}
          >
            Rechazar Usuario
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={() => handleReviewAction('approve')}
          >
            Aprobar Usuario
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Columna izquierda - Información del usuario */}
        <Grid item xs={12} md={8}>
          {/* Información básica */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Información del Usuario
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <PersonIcon sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Nombre Completo
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {user.name}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <BusinessIcon sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <SecurityIcon sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Rol
                      </Typography>
                      <Chip 
                        label={user.role}
                        color="primary"
                        size="small"
                      />
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <EventIcon sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Fecha de Registro
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {user.registrationDate}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Estadísticas */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#3498db', fontWeight: 'bold', mb: 1 }}>
                      {user.certifications}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Certificaciones
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold', mb: 1 }}>
                      {user.pendingReviews}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Pendientes
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ color: getComplianceColor(user.complianceRate), fontWeight: 'bold', mb: 1 }}>
                      {user.complianceRate}%
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Cumplimiento
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Certificaciones */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Certificaciones del Usuario
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Estatus</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Vencimiento</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.certificationsList.map((cert) => (
                      <TableRow key={cert.id} hover>
                        <TableCell>{cert.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={cert.status}
                            color={getStatusColor(cert.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{cert.expiration}</TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna derecha - Documentos y actividad */}
        <Grid item xs={12} md={4}>
          {/* Documentos */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Documentación Verificada
              </Typography>

              <Stack spacing={2}>
                {user.documents.map((doc) => (
                  <Paper key={doc.id} variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon sx={{ mr: 1, color: '#7f8c8d' }} />
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {doc.name}
                        </Typography>
                      </Box>
                      <Chip 
                        label={doc.status}
                        color={getStatusColor(doc.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Verificado: {doc.date}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Actividad reciente */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Actividad Reciente
              </Typography>

              <Stack spacing={2}>
                {user.activityLog.map((activity) => (
                  <Box key={activity.id} sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ color: '#2c3e50', mb: 0.5 }}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      {activity.date}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Indicador de cumplimiento */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Nivel de Cumplimiento
              </Typography>

              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h2" sx={{ 
                  color: getComplianceColor(user.complianceRate),
                  fontWeight: 'bold',
                  mb: 1
                }}>
                  {user.complianceRate}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={user.complianceRate}
                  sx={{ 
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getComplianceColor(user.complianceRate)
                    }
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ color: '#7f8c8d', textAlign: 'center' }}>
                {user.complianceRate >= 90 ? 'Alto Cumplimiento' : 
                 user.complianceRate >= 70 ? 'Cumplimiento Medio' : 'Cumplimiento Bajo'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Diálogo de revisión */}
      <Dialog open={reviewDialog} onClose={() => setReviewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {reviewAction === 'approve' ? 'Aprobar Usuario' : 'Rechazar Usuario'}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            ¿Está seguro de {reviewAction === 'approve' ? 'aprobar' : 'rechazar'} al usuario {user.name}?
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comentarios / Observaciones"
            placeholder="Ingrese los motivos de la decisión..."
            value={reviewComments}
            onChange={(e) => setReviewComments(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialog(false)}>Cancelar</Button>
          <Button 
            onClick={confirmReview} 
            variant="contained"
            color={reviewAction === 'approve' ? 'success' : 'error'}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserReview;