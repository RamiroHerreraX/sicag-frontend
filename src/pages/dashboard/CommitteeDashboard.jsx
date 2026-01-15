import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  LinearProgress
} from '@mui/material';
import {
  Gavel as GavelIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  NotificationsActive as NotificationsIcon
} from '@mui/icons-material';

const CommitteeDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: '#2c3e50', mb: 4, fontWeight: 'bold' }}>
        Dashboard del Comité
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Resumen de Revisiones
              </Typography>
              <Grid container spacing={3}>
                {[
                  { title: 'Pendientes', value: 12, color: '#f39c12' },
                  { title: 'En Proceso', value: 5, color: '#3498db' },
                  { title: 'Completadas Hoy', value: 8, color: '#2ecc71' },
                  { title: 'Requieren 2da Opinión', value: 3, color: '#e74c3c' },
                ].map((stat, idx) => (
                  <Grid item xs={12} sm={6} md={3} key={idx}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: `${stat.color}10` }}>
                      <Typography variant="h4" sx={{ color: stat.color, fontWeight: 'bold' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                        {stat.title}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Próximas Revisiones Asignadas
              </Typography>
              <Stack spacing={2}>
                {[
                  { type: 'Patente Aduanal', user: 'Luis Rodríguez', priority: 'Alta', time: '2 días' },
                  { type: 'Opinión SAT', user: 'Ana López', priority: 'Media', time: '3 días' },
                  { type: 'Cédula Profesional', user: 'Carlos Martínez', priority: 'Baja', time: '5 días' },
                ].map((item, idx) => (
                  <Paper key={idx} variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {item.type}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                          {item.user} • Vence en {item.time}
                        </Typography>
                      </Box>
                      <Chip 
                        label={item.priority}
                        color={item.priority === 'Alta' ? 'error' : item.priority === 'Media' ? 'warning' : 'success'}
                        size="small"
                      />
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Mi Productividad
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
                    Revisiones este mes
                  </Typography>
                  <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4 }} />
                  <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 1 }}>
                    45 de 60 revisiones
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
                    Tiempo promedio por revisión
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                    2.5 días
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Acciones Rápidas
              </Typography>
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<GavelIcon />}
                  sx={{ justifyContent: 'flex-start', bgcolor: '#1a237e' }}
                >
                  Iniciar Revisión
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AssignmentIcon />}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Mis Asignaciones
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<TimelineIcon />}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Ver Métricas
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<NotificationsIcon />}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Configurar Alertas
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommitteeDashboard;