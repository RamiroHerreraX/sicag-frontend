import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  LinearProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  Description as DescriptionIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
  // Datos mock para el dashboard de admin
  const systemStats = [
    { title: 'Usuarios Activos', value: '156', change: '+12%', icon: <PeopleIcon />, color: '#3498db' },
    { title: 'Certificaciones Hoy', value: '24', change: '+5%', icon: <DescriptionIcon />, color: '#2ecc71' },
    { title: 'Pendientes Revisión', value: '18', change: '-3%', icon: <WarningIcon />, color: '#f39c12' },
    { title: 'Tasa Cumplimiento', value: '92%', change: '+2%', icon: <TrendingUpIcon />, color: '#9b59b6' },
  ];

  const alerts = [
    { id: 1, type: 'warning', title: 'Certificaciones Pendientes', count: 5, icon: <WarningIcon /> },
    { id: 2, type: 'error', title: 'Usuarios Inactivos', count: 8, icon: <PeopleIcon /> },
    { id: 3, type: 'info', title: 'Vencimientos Próx.', count: 12, icon: <NotificationsIcon /> },
    { id: 4, type: 'success', title: 'Sistema OK', count: 0, icon: <CheckCircleIcon /> },
  ];

  const recentActivities = [
    { id: 1, user: 'Luis Rodríguez', action: 'Nueva certificación', time: 'Hace 15 min', type: 'add' },
    { id: 2, user: 'María González', action: 'Certificación aprobada', time: 'Hace 30 min', type: 'approve' },
    { id: 3, user: 'Carlos Martínez', action: 'Usuario creado', time: 'Hace 1 hora', type: 'user' },
    { id: 4, user: 'Ana López', action: 'Config. actualizada', time: 'Hace 2 horas', type: 'config' },
    { id: 5, user: 'Pedro Sánchez', action: 'Reporte generado', time: 'Hace 3 horas', type: 'report' },
  ];

  const regionalStats = [
    { region: 'Norte', users: 45, certifications: 120, compliance: 95, status: 'excelente' },
    { region: 'Centro', users: 68, certifications: 180, compliance: 92, status: 'bueno' },
    { region: 'Sur', users: 32, certifications: 85, compliance: 88, status: 'regular' },
    { region: 'Metropolitana', users: 56, certifications: 150, compliance: 96, status: 'excelente' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'excelente': return '#27ae60';
      case 'bueno': return '#2ecc71';
      case 'regular': return '#f39c12';
      case 'critico': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case 'add': return <DescriptionIcon sx={{ color: '#3498db' }} />;
      case 'approve': return <CheckCircleIcon sx={{ color: '#27ae60' }} />;
      case 'user': return <PeopleIcon sx={{ color: '#9b59b6' }} />;
      case 'config': return <SettingsIcon sx={{ color: '#f39c12' }} />;
      case 'report': return <DownloadIcon sx={{ color: '#34495e' }} />;
      default: return <NotificationsIcon />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          Dashboard Administrativo
        </Typography>
        <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
          Vista completa del sistema SICAG - Monitoreo y control total
        </Typography>
      </Box>

      {/* Estadísticas del sistema */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {systemStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', borderLeft: `4px solid ${stat.color}` }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h3" sx={{ color: stat.color, fontWeight: 'bold', mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Chip 
                      label={stat.change}
                      size="small"
                      color={stat.change.includes('+') ? 'success' : 'error'}
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </Box>
                  <Box sx={{ color: stat.color, fontSize: 40 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Columna izquierda - Alertas y actividades */}
        <Grid item xs={12} md={8}>
          {/* Alertas del sistema */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Alertas del Sistema
                </Typography>
                <Button size="small" startIcon={<SettingsIcon />}>
                  Configurar Alertas
                </Button>
              </Box>

              <Grid container spacing={2}>
                {alerts.map((alert) => (
                  <Grid item xs={12} sm={6} key={alert.id}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        borderLeft: `4px solid ${
                          alert.type === 'warning' ? '#f39c12' :
                          alert.type === 'error' ? '#e74c3c' :
                          alert.type === 'info' ? '#3498db' : '#27ae60'
                        }`
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            color: alert.type === 'warning' ? '#f39c12' :
                                   alert.type === 'error' ? '#e74c3c' :
                                   alert.type === 'info' ? '#3498db' : '#27ae60',
                            mr: 2
                          }}>
                            {alert.icon}
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                              {alert.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                              {alert.count > 0 ? `${alert.count} elementos` : 'Todo en orden'}
                            </Typography>
                          </Box>
                        </Box>
                        {alert.count > 0 && (
                          <Chip 
                            label={alert.count}
                            size="small"
                            color={alert.type === 'warning' ? 'warning' :
                                   alert.type === 'error' ? 'error' :
                                   alert.type === 'info' ? 'info' : 'success'}
                          />
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Actividad reciente */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Actividad Reciente del Sistema
                </Typography>
                <Button size="small" startIcon={<DownloadIcon />}>
                  Exportar Log
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Usuario</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Acción</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Hora</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Ver</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentActivities.map((activity) => (
                      <TableRow key={activity.id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getActivityIcon(activity.type)}
                            <Typography sx={{ ml: 1, fontWeight: 'medium' }}>
                              {activity.user}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            {activity.time}
                          </Typography>
                        </TableCell>
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

        {/* Columna derecha - Estadísticas regionales */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Cumplimiento por Región
              </Typography>

              <Stack spacing={3}>
                {regionalStats.map((region, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {region.region}
                      </Typography>
                      <Chip 
                        label={`${region.compliance}%`}
                        size="small"
                        sx={{ 
                          bgcolor: getStatusColor(region.status),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={region.compliance}
                        sx={{ 
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getStatusColor(region.status)
                          }
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        👥 {region.users} usuarios
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        📄 {region.certifications} certs.
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Acciones rápidas */}
              <Box>
                <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                  Acciones Rápidas
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<PeopleIcon />}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Gestionar Usuarios
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<DescriptionIcon />}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Ver Reportes
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<SettingsIcon />}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Configurar
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<NotificationsIcon />}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      Alertas
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sección inferior - Dashboard del Comité */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
            Dashboard del Comité - Vista Administrativa
          </Typography>

          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f7fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Tipo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Asociado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Región</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Fecha de Carga</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Estatus</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { type: 'PATENTE ADUANAL', user: 'Luis Rodríguez', region: 'Norte', date: '15/01/2026', status: 'PENDIENTE', committeeStatus: 'REVISAR' },
                  { type: 'OPINIÓN SAT', user: 'Carlos Martínez', region: 'Sur', date: '14/01/2026', status: 'EN REVISIÓN', committeeStatus: 'EN PROCESO' },
                  { type: 'CÉDULA PROFESIONAL', user: 'Ana López', region: 'Centro', date: '13/01/2026', status: 'PENDIENTE', committeeStatus: 'N/A' },
                  { type: 'PODER NOTARIAL', user: 'Pedro Sánchez', region: 'Metropolitana', date: '12/01/2026', status: 'REQUIERE INFO', committeeStatus: 'N/A' },
                ].map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {row.type}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell>{row.region}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status}
                        size="small"
                        color={
                          row.status === 'PENDIENTE' ? 'warning' :
                          row.status === 'EN REVISIÓN' ? 'info' :
                          row.status === 'REQUIERE INFO' ? 'error' : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={row.committeeStatus}
                        size="small"
                        variant="outlined"
                        color={row.committeeStatus === 'REVISAR' ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined">
                          Evaluar
                        </Button>
                        <IconButton size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <Box>
              <Chip label="5 CERTIFICACIONES PENDIENTES" color="warning" variant="outlined" sx={{ mr: 1 }} />
              <Chip label="5 VALIDADAS HOY" color="success" variant="outlined" sx={{ mr: 1 }} />
              <Chip label="3 VENCIMIENTOS" color="error" variant="outlined" />
            </Box>
            <Button variant="contained" startIcon={<DownloadIcon />}>
              Descargar Reporte
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;