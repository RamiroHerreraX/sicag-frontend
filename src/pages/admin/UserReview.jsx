// src/pages/admin/UserReview.jsx
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
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3A6EA5'
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  }
};

const UserReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const getStatusColor = (status) => {
    switch(status) {
      case 'APROBADO': return colors.status.success;
      case 'PENDIENTE': return colors.status.warning;
      case 'RECHAZADO': return colors.status.error;
      case 'VIGENTE': return colors.status.success;
      case 'POR VENCER': return colors.status.warning;
      case 'EN REVISIÓN': return colors.status.info;
      default: return colors.text.secondary;
    }
  };

  const getStatusVariant = (status) => {
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
    if (rate >= 90) return colors.status.success;
    if (rate >= 70) return colors.status.warning;
    return colors.status.error;
  };

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 2.5,
      backgroundColor: '#f5f7fa'
    }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin/users')}
            sx={{ 
              mb: 1,
              color: colors.primary.main,
              '&:hover': {
                bgcolor: 'rgba(19, 59, 107, 0.08)'
              }
            }}
          >
            Volver
          </Button>
          <Typography variant="h4" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
            Revisión de Usuario
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary }}>
            Análisis completo del usuario: {user.name}
          </Typography>
        </Box>
        
        <Chip 
          label={user.status}
          size="medium"
          sx={{ 
            bgcolor: `${getStatusColor(user.status)}15`,
            color: getStatusColor(user.status),
            fontWeight: 'bold',
            fontSize: '0.9rem',
            p: 1.5
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {/* Columna izquierda - Información del usuario */}
        <Grid item xs={12} md={8}>
          {/* Información básica */}
          <Card sx={{ mb: 3, borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.text.primary, mb: 3, fontWeight: 'bold' }}>
                Información del Usuario
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <PersonIcon sx={{ color: colors.primary.main }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Nombre Completo
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
                        {user.name}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <BusinessIcon sx={{ color: colors.primary.main }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <SecurityIcon sx={{ color: colors.primary.main }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Rol
                      </Typography>
                      <Chip 
                        label={user.role}
                        size="small"
                        sx={{ 
                          bgcolor: colors.primary.main,
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <EventIcon sx={{ color: colors.primary.main }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Fecha de Registro
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
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
                  <Paper sx={{ 
                    p: 2, 
                    textAlign: 'center',
                    border: `1px solid ${colors.primary.light}`,
                    borderRadius: '8px'
                  }}>
                    <Typography variant="h4" sx={{ color: colors.primary.main, fontWeight: 'bold', mb: 1 }}>
                      {user.certifications}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      Certificaciones
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ 
                    p: 2, 
                    textAlign: 'center',
                    border: `1px solid ${colors.status.warning}`,
                    borderRadius: '8px'
                  }}>
                    <Typography variant="h4" sx={{ color: colors.status.warning, fontWeight: 'bold', mb: 1 }}>
                      {user.pendingReviews}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      Pendientes
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ 
                    p: 2, 
                    textAlign: 'center',
                    border: `1px solid ${getComplianceColor(user.complianceRate)}`,
                    borderRadius: '8px'
                  }}>
                    <Typography variant="h4" sx={{ color: getComplianceColor(user.complianceRate), fontWeight: 'bold', mb: 1 }}>
                      {user.complianceRate}%
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      Cumplimiento
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Certificaciones */}
          <Card sx={{ mb: 3, borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.text.primary, mb: 3, fontWeight: 'bold' }}>
                Certificaciones del Usuario
              </Typography>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary }}>Estatus</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary }}>Vencimiento</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.certificationsList.map((cert) => (
                      <TableRow key={cert.id} hover>
                        <TableCell sx={{ color: colors.text.primary }}>{cert.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={cert.status}
                            color={getStatusVariant(cert.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell sx={{ color: colors.text.secondary }}>{cert.expiration}</TableCell>
                        <TableCell>
                          <IconButton 
                            size="small"
                            sx={{ 
                              color: colors.primary.main,
                              '&:hover': {
                                bgcolor: 'rgba(19, 59, 107, 0.08)'
                              }
                            }}
                          >
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
          <Card sx={{ mb: 3, borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.text.primary, mb: 3, fontWeight: 'bold' }}>
                Documentación Verificada
              </Typography>

              <Stack spacing={2}>
                {user.documents.map((doc) => (
                  <Paper key={doc.id} variant="outlined" sx={{ 
                    p: 2,
                    borderColor: colors.primary.light,
                    '&:hover': {
                      borderColor: colors.primary.main,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon sx={{ mr: 1, color: colors.primary.main }} />
                        <Typography variant="body2" sx={{ fontWeight: 'medium', color: colors.text.primary }}>
                          {doc.name}
                        </Typography>
                      </Box>
                      <Chip 
                        label={doc.status}
                        color={getStatusVariant(doc.status)}
                        size="small"
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      Verificado: {doc.date}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Actividad reciente */}
          <Card sx={{ mb: 3, borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.text.primary, mb: 3, fontWeight: 'bold' }}>
                Actividad Reciente
              </Typography>

              <Stack spacing={2}>
                {user.activityLog.map((activity) => (
                  <Box key={activity.id} sx={{ 
                    p: 2, 
                    bgcolor: 'rgba(19, 59, 107, 0.04)', 
                    borderRadius: 1,
                    borderLeft: `3px solid ${colors.primary.main}`
                  }}>
                    <Typography variant="body2" sx={{ color: colors.text.primary, mb: 0.5 }}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      {activity.date}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Indicador de cumplimiento */}
          <Card sx={{ borderRadius: '8px' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: colors.text.primary, mb: 3, fontWeight: 'bold' }}>
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

              <Typography variant="body2" sx={{ 
                color: colors.text.secondary, 
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                {user.complianceRate >= 90 ? 'Alto Cumplimiento' : 
                 user.complianceRate >= 70 ? 'Cumplimiento Medio' : 'Cumplimiento Bajo'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserReview;