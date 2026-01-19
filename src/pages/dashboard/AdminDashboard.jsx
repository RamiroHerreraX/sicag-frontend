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
  LinearProgress,
  Badge,
  Avatar,
  AvatarGroup
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
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';

const AdminDashboard = () => {
  // Datos mock optimizados para vista compacta
  const systemStats = [
    { title: 'Usuarios Activos', value: '156', change: '+12%', icon: <PeopleIcon />, color: '#3498db', trend: 'up', detail: 'De 180 totales' },
    { title: 'Certificaciones Hoy', value: '24', change: '+5%', icon: <DescriptionIcon />, color: '#2ecc71', trend: 'up', detail: 'Meta: 30 diarias' },
    { title: 'Pendientes Revisión', value: '18', change: '-3%', icon: <WarningIcon />, color: '#f39c12', trend: 'down', detail: 'Reducción semanal' },
    { title: 'Tasa Cumplimiento', value: '92%', change: '+2%', icon: <TrendingUpIcon />, color: '#9b59b6', trend: 'up', detail: 'Óptimo: >90%' },
  ];

  const alerts = [
    { id: 1, type: 'warning', title: 'Certificaciones Pendientes', count: 5, icon: <WarningIcon />, time: 'Ahora' },
    { id: 2, type: 'error', title: 'Usuarios Inactivos', count: 8, icon: <PeopleIcon />, time: '2 días' },
    { id: 3, type: 'info', title: 'Vencimientos Próx.', count: 12, icon: <NotificationsIcon />, time: 'Próxima sem.' },
    { id: 4, type: 'success', title: 'Sistema OK', count: 0, icon: <CheckCircleIcon />, time: 'Actualizado' },
  ];

  const recentActivities = [
    { id: 1, user: 'Luis Rodríguez', action: 'Nueva certificación', time: '15 min', type: 'add', avatar: 'LR' },
    { id: 2, user: 'María González', action: 'Certificación aprobada', time: '30 min', type: 'approve', avatar: 'MG' },
    { id: 3, user: 'Carlos Martínez', action: 'Usuario creado', time: '1 h', type: 'user', avatar: 'CM' },
    { id: 4, user: 'Ana López', action: 'Config. actualizada', time: '2 h', type: 'config', avatar: 'AL' },
  ];

  const regionalStats = [
    { region: 'Norte', users: 45, certifications: 120, compliance: 95, status: 'excelente', trend: '+3%' },
    { region: 'Centro', users: 68, certifications: 180, compliance: 92, status: 'bueno', trend: '+1%' },
    { region: 'Sur', users: 32, certifications: 85, compliance: 88, status: 'regular', trend: '-2%' },
    { region: 'Metropolitana', users: 56, certifications: 150, compliance: 96, status: 'excelente', trend: '+4%' },
  ];

  const committeeDashboard = [
    { type: 'PATENTE ADUANAL', user: 'Luis Rodríguez', region: 'Norte', date: '15/01/2026', status: 'PENDIENTE', priority: 'alta', days: 2 },
    { type: 'OPINIÓN SAT', user: 'Carlos Martínez', region: 'Sur', date: '14/01/2026', status: 'EN REVISIÓN', priority: 'media', days: 1 },
    { type: 'CÉDULA PROFESIONAL', user: 'Ana López', region: 'Centro', date: '13/01/2026', status: 'PENDIENTE', priority: 'baja', days: 3 },
    { type: 'PODER NOTARIAL', user: 'Pedro Sánchez', region: 'Metropolitana', date: '12/01/2026', status: 'REQUIERE INFO', priority: 'alta', days: 4 },
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
      case 'add': return <DescriptionIcon sx={{ color: '#3498db', fontSize: 16 }} />;
      case 'approve': return <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 16 }} />;
      case 'user': return <PeopleIcon sx={{ color: '#9b59b6', fontSize: 16 }} />;
      case 'config': return <SettingsIcon sx={{ color: '#f39c12', fontSize: 16 }} />;
      case 'report': return <DownloadIcon sx={{ color: '#34495e', fontSize: 16 }} />;
      default: return <NotificationsIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'alta': return { color: '#e74c3c', label: 'ALTA' };
      case 'media': return { color: '#f39c12', label: 'MEDIA' };
      case 'baja': return { color: '#3498db', label: 'BAJA' };
      default: return { color: '#7f8c8d', label: 'NORMAL' };
    }
  };

  return (
    <Box sx={{ 
      p: 2.5,
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      {/* Header compacto */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
        <Box>
          <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
            Dashboard Administrativo
          </Typography>
          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
            Vista completa del sistema SICAG - Monitoreo y control total
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
          >
            Actualizar
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<DownloadIcon />}
            sx={{ bgcolor: '#3498db' }}
          >
            Exportar
          </Button>
        </Box>
      </Box>

      {/* Layout principal: 2 columnas */}
      <Grid container spacing={2}>
        {/* Columna izquierda (más ancha) */}
        <Grid item xs={12} lg={8}>
          {/* KPI Cards - Reducidas */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {systemStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  borderLeft: `4px solid ${stat.color}`,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)' }
                }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Box sx={{ color: stat.color }}>
                            {stat.icon}
                          </Box>
                          <Typography variant="caption" sx={{ color: '#7f8c8d', fontWeight: 500 }}>
                            {stat.title}
                          </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#95a5a6', display: 'block', mb: 1 }}>
                          {stat.detail}
                        </Typography>
                        <Chip 
                          label={stat.change}
                          size="small"
                          sx={{
                            bgcolor: stat.trend === 'up' ? '#2ecc7120' : '#e74c3c20',
                            color: stat.trend === 'up' ? '#27ae60' : '#e74c3c',
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                            height: 20
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Dos columnas dentro de la izquierda */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {/* Alertas del sistema - Compactas */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '1rem' }}>
                      Alertas del Sistema
                    </Typography>
                    <IconButton size="small">
                      <SettingsIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Stack spacing={1.5}>
                    {alerts.map((alert) => (
                      <Paper 
                        key={alert.id}
                        variant="outlined" 
                        sx={{ 
                          p: 1.5, 
                          borderLeft: `4px solid ${
                            alert.type === 'warning' ? '#f39c12' :
                            alert.type === 'error' ? '#e74c3c' :
                            alert.type === 'info' ? '#3498db' : '#27ae60'
                          }`
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ 
                              color: alert.type === 'warning' ? '#f39c12' :
                                     alert.type === 'error' ? '#e74c3c' :
                                     alert.type === 'info' ? '#3498db' : '#27ae60'
                            }}>
                              {alert.icon}
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                {alert.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                {alert.time}
                              </Typography>
                            </Box>
                          </Box>
                          {alert.count > 0 ? (
                            <Badge 
                              badgeContent={alert.count}
                              color={alert.type === 'warning' ? 'warning' : 
                                     alert.type === 'error' ? 'error' : 'info'}
                              sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}
                            />
                          ) : (
                            <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 20 }} />
                          )}
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Actividad reciente - Compacta */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '1rem' }}>
                      Actividad Reciente
                    </Typography>
                    <Button size="small" startIcon={<DownloadIcon />} sx={{ fontSize: '0.75rem' }}>
                      Exportar
                    </Button>
                  </Box>

                  <Stack spacing={1.5}>
                    {recentActivities.map((activity) => (
                      <Box
                        key={activity.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          p: 1.5,
                          borderRadius: 1,
                          backgroundColor: '#f8f9fa',
                          '&:hover': {
                            backgroundColor: '#ecf0f1'
                          }
                        }}
                      >
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32,
                          fontSize: '0.75rem',
                          bgcolor: activity.type === 'add' ? '#3498db' :
                                   activity.type === 'approve' ? '#27ae60' :
                                   activity.type === 'user' ? '#9b59b6' : '#f39c12'
                        }}>
                          {activity.avatar}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '600', color: '#2c3e50' }}>
                            {activity.user}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            {activity.action}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ 
                          color: '#95a5a6',
                          bgcolor: '#f1f5f9',
                          px: 1,
                          py: 0.25,
                          borderRadius: 2,
                          fontWeight: '500'
                        }}>
                          {activity.time}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Dashboard del Comité - Compacto */}
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '1rem' }}>
                  Dashboard del Comité
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Chip 
                    label="5 PENDIENTES" 
                    size="small"
                    color="warning"
                    sx={{ fontSize: '0.65rem', height: 22 }}
                  />
                  <Chip 
                    label="3 VENCIMIENTOS" 
                    size="small"
                    color="error"
                    sx={{ fontSize: '0.65rem', height: 22 }}
                  />
                </Box>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Tipo</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Usuario</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Fecha</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Acción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {committeeDashboard.map((row, index) => {
                      const priority = getPriorityBadge(row.priority);
                      return (
                        <TableRow 
                          key={index} 
                          hover
                          sx={{ '&:last-child td': { borderBottom: 0 } }}
                        >
                          <TableCell sx={{ py: 1 }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '500', color: '#2c3e50' }}>
                                {row.type}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                <Chip 
                                  label={priority.label}
                                  size="small"
                                  sx={{
                                    bgcolor: `${priority.color}15`,
                                    color: priority.color,
                                    fontWeight: 'bold',
                                    fontSize: '0.65rem',
                                    height: 18
                                  }}
                                />
                                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                  {row.region}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 1, fontSize: '0.875rem' }}>{row.user}</TableCell>
                          <TableCell sx={{ py: 1, fontSize: '0.875rem' }}>{row.date}</TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                              <Chip 
                                label={row.status}
                                size="small"
                                sx={{
                                  bgcolor: row.status === 'PENDIENTE' ? '#f39c1220' :
                                           row.status === 'EN REVISIÓN' ? '#3498db20' :
                                           '#e74c3c20',
                                  color: row.status === 'PENDIENTE' ? '#d35400' :
                                         row.status === 'EN REVISIÓN' ? '#2980b9' :
                                         '#c0392b',
                                  fontWeight: 'bold',
                                  fontSize: '0.7rem',
                                  height: 20
                                }}
                              />
                              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                {row.days} días
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <Button 
                              size="small" 
                              variant="outlined"
                              sx={{ 
                                fontSize: '0.75rem',
                                py: 0.25,
                                minWidth: 'auto'
                              }}
                            >
                              Evaluar
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mt: 2,
                pt: 1.5,
                borderTop: '1px solid #ecf0f1'
              }}>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Mostrando 4 de 18 certificaciones
                </Typography>
                <Button 
                  size="small"
                  startIcon={<DownloadIcon />}
                  sx={{ fontSize: '0.75rem' }}
                >
                  Reporte completo
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna derecha (más estrecha) */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            {/* Cumplimiento por región */}
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold', fontSize: '1rem' }}>
                  Cumplimiento por Región
                </Typography>

                <Stack spacing={2}>
                  {regionalStats.map((region, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {region.region}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="caption" sx={{ 
                            color: region.trend.startsWith('+') ? '#27ae60' : '#e74c3c',
                            fontWeight: 'bold'
                          }}>
                            {region.trend}
                          </Typography>
                          <Chip 
                            label={`${region.compliance}%`}
                            size="small"
                            sx={{ 
                              bgcolor: `${getStatusColor(region.status)}20`,
                              color: getStatusColor(region.status),
                              fontWeight: 'bold',
                              fontSize: '0.7rem',
                              height: 20
                            }}
                          />
                        </Box>
                      </Box>

                      <LinearProgress 
                        variant="determinate" 
                        value={region.compliance}
                        sx={{ 
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: '#ecf0f1',
                          mb: 1,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getStatusColor(region.status),
                            borderRadius: 3
                          }
                        }}
                      />

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

                <Divider sx={{ my: 2 }} />

                {/* Estado del sistema */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircleIcon sx={{ color: '#27ae60' }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                      Sistema Operativo
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Todos los servicios funcionando
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Acciones rápidas */}
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold', fontSize: '1rem' }}>
                  Acciones Rápidas
                </Typography>
                
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<PeopleIcon />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
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
                      sx={{ 
                        justifyContent: 'flex-start',
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
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
                      sx={{ 
                        justifyContent: 'flex-start',
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
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
                      sx={{ 
                        justifyContent: 'flex-start',
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
                    >
                      Alertas
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Usuarios activos */}
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                    Usuarios Activos Ahora
                  </Typography>
                  <AvatarGroup max={6} sx={{ justifyContent: 'flex-start', '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.75rem' } }}>
                    {['LR', 'MG', 'CM', 'AL', 'PS', 'JR', 'MM', 'RS'].map((initials, idx) => (
                      <Avatar key={idx} sx={{ bgcolor: ['#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#e74c3c', '#34495e'][idx % 6] }}>
                        {initials}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 0.5 }}>
                    8 usuarios activos en este momento
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Footer compacto */}
      <Box sx={{ 
        mt: 3,
        pt: 2,
        borderTop: '1px solid #dfe6e9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
          SICAG v2.1 • Última actualización: Hoy 10:30 AM
        </Typography>
        <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CheckCircleIcon sx={{ fontSize: 12, color: '#27ae60' }} />
          Sistema al 100%
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminDashboard;