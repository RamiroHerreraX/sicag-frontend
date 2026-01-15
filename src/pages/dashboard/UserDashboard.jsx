import React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  LinearProgress,
  Chip,
  Button
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';

const UserDashboard = () => {
  // Datos mock para el dashboard
  const stats = [
    { title: 'Certificaciones Vigentes', value: '8', color: '#27ae60', icon: <CheckCircleIcon /> },
    { title: 'Certificaciones por Vencer', value: '3', color: '#f39c12', icon: <WarningIcon /> },
    { title: 'Certificaciones Rechazadas', value: '1', color: '#e74c3c', icon: <ErrorIcon /> },
    { title: 'Nivel de Cumplimiento', value: '85%', color: '#3498db', icon: <TrendingUpIcon /> },
  ];

  const alerts = [
    { type: 'warning', message: 'Certificación de Patente Aduanal vence en 15 días', date: '15/01/2026' },
    { type: 'info', message: 'Opinión SAT Positiva requiere renovación', date: '20/01/2026' },
    { type: 'error', message: 'Cédula Profesional: Requiere mejor legibilidad', date: '10/01/2026' },
  ];

  const recentCertifications = [
    { name: 'Patente Aduanal', status: 'Vigente', expiration: '11/01/2029', progress: 100 },
    { name: 'Opinión SAT Positiva', status: 'Por Vencer', expiration: '30/01/2026', progress: 30 },
    { name: 'Cédula Profesional', status: 'Observaciones', expiration: '15/03/2026', progress: 60 },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          Dashboard de Cumplimiento
        </Typography>
        <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
          Bienvenido al Sistema Integral de Consultoría y Asesoría Gerencial
        </Typography>
      </Box>

      {/* Estatus Global */}
      <Card sx={{ mb: 4, bgcolor: '#e8f5e9' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                ESTATUS GLOBAL
              </Typography>
              <Typography variant="body2" sx={{ color: '#27ae60', mt: 1 }}>
                <Chip 
                  label="ALTO CUMPLIMIENTO" 
                  color="success" 
                  size="small" 
                  sx={{ mr: 1 }}
                />
                Todas tus certificaciones están vigentes
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                NIVEL AVANZADO
              </Typography>
              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                Próxima revisión 12/2025
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: stat.color, fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', mt: 1 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Resumen de Certificaciones */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                RESUMEN DE CERTIFICACIONES
              </Typography>
              
              <Stack spacing={2}>
                {recentCertifications.map((cert, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {cert.name}
                      </Typography>
                      <Chip 
                        label={cert.status}
                        size="small"
                        color={
                          cert.status === 'Vigente' ? 'success' :
                          cert.status === 'Por Vencer' ? 'warning' : 'error'
                        }
                      />
                    </Box>
                    
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Vencimiento: {cert.expiration}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={cert.progress}
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            backgroundColor: '#f0f0f0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 
                                cert.progress > 70 ? '#27ae60' :
                                cert.progress > 30 ? '#f39c12' : '#e74c3c'
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        {cert.progress}%
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant="outlined" color="primary">
                  Ver todas las certificaciones
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Alertas y Notificaciones */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <NotificationsIcon sx={{ mr: 1, color: '#f39c12' }} />
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Alertas y Notificaciones
                </Typography>
              </Box>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                    Vencimientos Próximos
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: '#fffde7' }}>
                    <Typography variant="body2">
                      • Certificación de Patente Aduanal vence en 15 días
                    </Typography>
                    <Typography variant="body2">
                      • Poder Notarial requiere actualización
                    </Typography>
                    <Typography variant="body2">
                      • Opinión SAT Positiva (15 días)
                    </Typography>
                  </Paper>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                    Observaciones Pendientes
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: '#ffebee' }}>
                    <Typography variant="body2">
                      • Cédula Profesional: Mejorar legibilidad
                    </Typography>
                    <Typography variant="body2">
                      • Opinión SAT: Adjuntar línea de captura
                    </Typography>
                    <Typography variant="body2">
                      • Contrato Laboral: Falta firma
                    </Typography>
                  </Paper>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                    Historial de Alertas
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip label="Rechazo" color="error" size="small" />
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        05/01/2026
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      Certificación de Representación Legal rechazada
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 1 }}>
                      Estado: No Leído
                    </Typography>
                  </Paper>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;