import React, { useState } from 'react';
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
  Drawer,
  Fab,
  Tabs,
  Tab,
  Tooltip
} from '@mui/material';
import {
  Domain as DomainIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  ChevronRight as ChevronRightIcon,
  Timer as TimerIcon,
  FilterList as FilterIcon,
  Storage as StorageIcon,
  Person as PersonIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const SystemInstancesDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [panelTab, setPanelTab] = useState(0);

  // Estadísticas de las instancias
  const systemStats = [
    { 
      title: 'Instancias Activas', 
      value: '8', 
      change: '+1', 
      icon: <DomainIcon />, 
      color: '#2c3e50', 
      trend: 'up', 
      detail: 'De 10 totales' 
    },
    { 
      title: 'Usuarios Totales', 
      value: '1,245', 
      change: '+45', 
      icon: <PersonIcon />, 
      color: '#3498db', 
      trend: 'up', 
      detail: 'En todas las instancias' 
    },
    { 
      title: 'Almacenamiento', 
      value: '12.4 GB', 
      change: '+2.1 GB', 
      icon: <StorageIcon />, 
      color: '#2ecc71', 
      trend: 'up', 
      detail: 'Uso total del sistema' 
    },
    { 
      title: 'Uptime Sistema', 
      value: '99.8%', 
      change: '+0.2%', 
      icon: <TrendingUpIcon />, 
      color: '#9b59b6', 
      trend: 'up', 
      detail: 'Disponibilidad mensual' 
    },
  ];

  // Alertas del sistema
  const systemAlerts = [
    { 
      id: 1, 
      type: 'warning', 
      title: 'Instancia en Mantenimiento', 
      count: 1, 
      icon: <WarningIcon />, 
      time: 'Desde ayer', 
      instance: 'Posgrado' 
    },
    { 
      id: 2, 
      type: 'error', 
      title: 'Backups Pendientes', 
      count: 2, 
      icon: <CloudIcon />, 
      time: 'Últimas 24h', 
      instance: 'Múltiples' 
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'Actualizaciones Disponibles', 
      count: 3, 
      icon: <NotificationsIcon />, 
      time: 'Próximos días', 
      instance: 'Sistema' 
    },
    { 
      id: 4, 
      type: 'success', 
      title: 'Todas las instancias OK', 
      count: 0, 
      icon: <CheckCircleIcon />, 
      time: 'Estado actual', 
      instance: 'General' 
    },
  ];

  // Actividad reciente
  const recentActivities = [
    { 
      id: 1, 
      user: 'Dr. Carlos Méndez', 
      action: 'Instancia creada', 
      time: '15 min', 
      type: 'add', 
      avatar: 'CM',
      instance: 'Ingeniería' 
    },
    { 
      id: 2, 
      user: 'Dra. Ana López', 
      action: 'Configuración actualizada', 
      time: '30 min', 
      type: 'config', 
      avatar: 'AL',
      instance: 'Medicina' 
    },
    { 
      id: 3, 
      user: 'Mtro. Roberto Díaz', 
      action: 'Backup realizado', 
      time: '1 h', 
      type: 'backup', 
      avatar: 'RD',
      instance: 'Posgrado' 
    },
    { 
      id: 4, 
      user: 'Super Administrador', 
      action: 'Seguridad reforzada', 
      time: '2 h', 
      type: 'security', 
      avatar: 'SA',
      instance: 'Global' 
    },
  ];

  // Instancias del sistema
  const systemInstances = [
    { 
      name: 'Área de Ingeniería', 
      code: 'ENG-001', 
      admin: 'Dr. Carlos Méndez', 
      users: 245, 
      status: 'active', 
      storage: '2.5 GB', 
      uptime: '99.9%' 
    },
    { 
      name: 'Área de Medicina', 
      code: 'MED-001', 
      admin: 'Dra. Ana López', 
      users: 189, 
      status: 'active', 
      storage: '1.8 GB', 
      uptime: '99.8%' 
    },
    { 
      name: 'Programa de Posgrado', 
      code: 'POS-001', 
      admin: 'Mtro. Roberto Díaz', 
      users: 78, 
      status: 'maintenance', 
      storage: '850 MB', 
      uptime: '95.2%' 
    },
    { 
      name: 'Área de Derecho', 
      code: 'LAW-001', 
      admin: 'Lic. Fernando Gómez', 
      users: 156, 
      status: 'inactive', 
      storage: '1.2 GB', 
      uptime: '0%' 
    },
    { 
      name: 'Campus Virtual', 
      code: 'VIR-001', 
      admin: 'Ing. Sofía Ramírez', 
      users: 342, 
      status: 'active', 
      storage: '3.2 GB', 
      uptime: '99.7%' 
    },
    { 
      name: 'Departamento de Ciencias', 
      code: 'SCI-001', 
      admin: 'Dr. Miguel Ángel Ruiz', 
      users: 198, 
      status: 'active', 
      storage: '1.5 GB', 
      uptime: '99.5%' 
    },
  ];

  // Estadísticas por tipo
  const instanceStats = [
    { 
      type: 'Activas', 
      count: 5, 
      percentage: 83, 
      status: 'excelente', 
      trend: '+1' 
    },
    { 
      type: 'En Mantenimiento', 
      count: 1, 
      percentage: 17, 
      status: 'regular', 
      trend: '0' 
    },
    { 
      type: 'Inactivas', 
      count: 1, 
      percentage: 17, 
      status: 'critico', 
      trend: '0' 
    },
    { 
      type: 'Usuarios Activos', 
      count: '1,208', 
      percentage: 97, 
      status: 'bueno', 
      trend: '+45' 
    },
  ];

  const panelTabs = [
    { label: 'Instancias', icon: <DomainIcon /> },
    { label: 'Alertas', icon: <WarningIcon /> },
    { label: 'Actividad', icon: <TimerIcon /> },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excelente': return '#27ae60';
      case 'bueno': return '#2ecc71';
      case 'regular': return '#f39c12';
      case 'critico': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const getInstanceStatusColor = (status) => {
    switch (status) {
      case 'active': return '#2ecc71';
      case 'maintenance': return '#f39c12';
      case 'inactive': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'add': return <DomainIcon sx={{ color: '#3498db', fontSize: 16 }} />;
      case 'config': return <SettingsIcon sx={{ color: '#f39c12', fontSize: 16 }} />;
      case 'backup': return <CloudIcon sx={{ color: '#2c3e50', fontSize: 16 }} />;
      case 'security': return <SecurityIcon sx={{ color: '#9b59b6', fontSize: 16 }} />;
      default: return <NotificationsIcon sx={{ fontSize: 16 }} />;
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{
      p: 2.5,
      backgroundColor: '#f5f7fa',
      minHeight: '100vh'
    }}>
      {/* Header compacto */}
      <Box sx={{
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1.5
      }}>
        <Box>
          <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
            Dashboard de Instancias
          </Typography>
          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
            Supervisión y estado de todas las instancias del sistema SICAG
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DomainIcon />}
            sx={{ fontSize: '0.75rem', py: 0.5 }}
          >
            Todas las Instancias
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<CloudIcon />}
            sx={{ fontSize: '0.75rem', py: 0.5 }}
          >
            Backups
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<SettingsIcon />}
            sx={{ fontSize: '0.75rem', py: 0.5 }}
          >
            Configuración
          </Button>

          <Divider orientation="vertical" flexItem sx={{ height: 24, mx: 1 }} />

          <Button
            variant="outlined"
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={toggleDrawer}
          >
            Panel
          </Button>
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
            Reporte
          </Button>
        </Box>
      </Box>

      {/* KPI Cards - 4 CARDS */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        mb: 3,
        width: '100%',
        '@media (max-width: 1200px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (max-width: 600px)': {
          gridTemplateColumns: '1fr',
        }
      }}>
        {systemStats.map((stat, index) => (
          <Card key={index} sx={{
            borderLeft: `4px solid ${stat.color}`,
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <CardContent sx={{
              p: 1.5,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 1,
                mb: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="body2" sx={{
                    color: '#7f8c8d',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.2
                  }}>
                    {stat.title}
                  </Typography>
                </Box>

                <Typography variant="h5" sx={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  lineHeight: 1,
                  textAlign: 'right'
                }}>
                  {stat.value}
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: 0.5
              }}>
                <Typography variant="caption" sx={{
                  color: '#95a5a6',
                  fontSize: '0.7rem',
                  lineHeight: 1.2,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {stat.detail}
                </Typography>

                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.25,
                  flexShrink: 0
                }}>
                  <Box sx={{
                    width: 0,
                    height: 0,
                    borderLeft: '3px solid transparent',
                    borderRight: '3px solid transparent',
                    borderBottom: stat.trend === 'up' ? '4px solid #27ae60' : '4px solid #e74c3c',
                    transform: stat.trend === 'up' ? 'none' : 'rotate(180deg)'
                  }} />
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      bgcolor: stat.trend === 'up' ? '#2ecc7120' : '#e74c3c20',
                      color: stat.trend === 'up' ? '#27ae60' : '#e74c3c',
                      fontWeight: 'bold',
                      fontSize: '0.65rem',
                      height: 20,
                      minWidth: 'auto',
                      '& .MuiChip-label': {
                        px: 0.5
                      }
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Tabla de Instancias y Estadísticas - CON MISMA ALTURA */}
      <Box sx={{ 
        display: 'flex',
        gap: 2,
        mb: 2,
        width: '100%',
        '@media (max-width: 1200px)': {
          flexDirection: 'column',
        }
      }}>
        {/* Tabla de Instancias - 70% */}
        <Box sx={{ 
          flex: 7,
          minHeight: '100%',
          '@media (max-width: 1200px)': {
            flex: '1 1 100%',
          }
        }}>
          <Card sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ 
              p: 2, 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '1rem' }}>
                  Instancias del Sistema
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Chip 
                    label="6 INSTANCIAS" 
                    size="small"
                    color="primary"
                    sx={{ fontSize: '0.65rem', height: 22 }}
                  />
                  <Chip 
                    label="5 ACTIVAS" 
                    size="small"
                    color="success"
                    sx={{ fontSize: '0.65rem', height: 22 }}
                  />
                </Box>
              </Box>

              <TableContainer sx={{ flex: 1 }}>
                <Table size="small" sx={{ tableLayout: 'fixed' }}>
                  <colgroup>
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                  </colgroup>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Nombre</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Código</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Administrador</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Usuarios</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {systemInstances.map((instance, index) => (
                      <TableRow 
                        key={index} 
                        hover
                        sx={{ '&:last-child td': { borderBottom: 0 } }}
                      >
                        <TableCell sx={{ py: 1, overflow: 'hidden' }}>
                          <Box>
                            <Typography variant="body2" sx={{ 
                              fontWeight: '500', 
                              color: '#2c3e50',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {instance.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                {instance.storage}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                • Uptime: {instance.uptime}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ 
                          py: 1, 
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap'
                        }}>
                          {instance.code}
                        </TableCell>
                        <TableCell sx={{ 
                          py: 1, 
                          fontSize: '0.875rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {instance.admin}
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Chip 
                            label={instance.status === 'active' ? 'ACTIVA' : 
                                   instance.status === 'maintenance' ? 'MANTENIMIENTO' : 'INACTIVA'}
                            size="small"
                            sx={{
                              bgcolor: `${getInstanceStatusColor(instance.status)}20`,
                              color: getInstanceStatusColor(instance.status),
                              fontWeight: 'bold',
                              fontSize: '0.7rem',
                              height: 20
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '500', color: '#2c3e50' }}>
                            {instance.users}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="Ver detalles">
                              <IconButton size="small">
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Configurar">
                              <IconButton size="small">
                                <SettingsIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
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
                  Mostrando 6 de 8 instancias totales
                </Typography>
                <Button 
                  size="small"
                  startIcon={<DomainIcon />}
                  sx={{ fontSize: '0.75rem' }}
                >
                  Ver todas
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Estadísticas de Instancias - 30% */}
        <Box sx={{ 
          flex: 3,
          minHeight: '100%',
          '@media (max-width: 1200px)': {
            flex: '1 1 100%',
          }
        }}>
          <Card sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <CardContent sx={{ 
              p: 2, 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold', fontSize: '1rem' }}>
                Estadísticas por Tipo
              </Typography>

              <Stack spacing={2} sx={{ flex: 1 }}>
                {instanceStats.map((stat, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {stat.type}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="caption" sx={{ 
                          color: stat.trend.startsWith('+') ? '#27ae60' : '#e74c3c',
                          fontWeight: 'bold'
                        }}>
                          {stat.trend}
                        </Typography>
                        <Chip 
                          label={stat.count}
                          size="small"
                          sx={{ 
                            bgcolor: `${getStatusColor(stat.status)}20`,
                            color: getStatusColor(stat.status),
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                            height: 20
                          }}
                        />
                      </Box>
                    </Box>

                    <LinearProgress 
                      variant="determinate" 
                      value={stat.percentage}
                      sx={{ 
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#ecf0f1',
                        mb: 1,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getStatusColor(stat.status),
                          borderRadius: 3
                        }
                      }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        {stat.percentage}% del total
                      </Typography>
                      <Chip 
                        label={stat.status.toUpperCase()}
                        size="small"
                        sx={{ 
                          bgcolor: `${getStatusColor(stat.status)}10`,
                          color: getStatusColor(stat.status),
                          fontSize: '0.6rem',
                          height: 18
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

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
          Sistema de Instancias SICAG • Última actualización: Hoy 10:30 AM
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CheckCircleIcon sx={{ fontSize: 12, color: '#27ae60' }} />
            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
              5/6 instancias operativas
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ height: 16 }} />
          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
            Uptime global: 99.8%
          </Typography>
        </Box>
      </Box>

      {/* Panel flotante (Drawer) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="persistent"
        PaperProps={{
          sx: {
            width: 380,
            maxWidth: '90vw',
            marginTop: '64px',
            height: 'calc(100vh - 64px)',
            borderLeft: '1px solid #e0e0e0',
            boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
            borderRadius: '8px 0 0 8px'
          }
        }}
      >
        <Box sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            pb: 2,
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
              Panel de Instancias
            </Typography>
            <IconButton
              size="small"
              onClick={toggleDrawer}
              sx={{
                color: '#7f8c8d',
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={panelTab}
              onChange={(e, newValue) => setPanelTab(newValue)}
              variant="fullWidth"
              sx={{ minHeight: 40 }}
            >
              {panelTabs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={tab.icon}
                  iconPosition="start"
                  label={tab.label}
                  sx={{
                    minHeight: 40,
                    fontSize: '0.75rem',
                    textTransform: 'none'
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflowY: 'auto'
          }}>
            {panelTab === 0 && (
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                    Resumen de Instancias
                  </Typography>
                  <Tooltip title="Filtrar">
                    <IconButton size="small">
                      <FilterIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Stack spacing={1.5}>
                  {systemInstances.slice(0, 4).map((instance) => (
                    <Paper
                      key={instance.code}
                      sx={{
                        p: 1.5,
                        bgcolor: 'white',
                        borderLeft: `3px solid ${getInstanceStatusColor(instance.status)}`
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Avatar sx={{
                          width: 32,
                          height: 32,
                          fontSize: '0.75rem',
                          bgcolor: getInstanceStatusColor(instance.status)
                        }}>
                          {instance.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '600', color: '#2c3e50' }}>
                            {instance.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            {instance.code} • {instance.admin.split(' ')[0]}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{
                          color: '#95a5a6',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          <PersonIcon sx={{ fontSize: 12 }} />
                          {instance.users} usuarios
                        </Typography>
                        <Chip 
                          label={instance.status === 'active' ? 'ACTIVA' : 
                                 instance.status === 'maintenance' ? 'MANTENIMIENTO' : 'INACTIVA'}
                          size="small"
                          sx={{
                            bgcolor: `${getInstanceStatusColor(instance.status)}15`,
                            color: getInstanceStatusColor(instance.status),
                            fontSize: '0.65rem',
                            height: 20
                          }}
                        />
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            )}

            {panelTab === 1 && (
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                    Alertas del Sistema
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Configurar alertas">
                      <IconButton size="small">
                        <SettingsIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Stack spacing={1.5}>
                  {systemAlerts.map((alert) => {
                    let borderColor, iconColor, badgeColor, hoverColor;

                    if (alert.type === 'warning') {
                      borderColor = '#f39c12';
                      iconColor = '#f39c12';
                      badgeColor = 'warning';
                      hoverColor = '#e67e22';
                    } else if (alert.type === 'error') {
                      borderColor = '#e74c3c';
                      iconColor = '#e74c3c';
                      badgeColor = 'error';
                      hoverColor = '#c0392b';
                    } else if (alert.type === 'info') {
                      borderColor = '#3498db';
                      iconColor = '#3498db';
                      badgeColor = 'info';
                      hoverColor = '#2980b9';
                    } else {
                      borderColor = '#27ae60';
                      iconColor = '#27ae60';
                      badgeColor = 'success';
                      hoverColor = '#229954';
                    }

                    return (
                      <Paper
                        key={alert.id}
                        sx={{
                          p: 1.5,
                          borderLeft: `4px solid ${borderColor}`,
                          bgcolor: 'white',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'translateX(-2px)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ color: iconColor }}>
                              {alert.icon}
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                {alert.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                {alert.instance} • {alert.time}
                              </Typography>
                            </Box>
                          </Box>
                          {alert.count > 0 ? (
                            <Badge
                              badgeContent={alert.count}
                              color={badgeColor}
                              sx={{
                                '& .MuiBadge-badge': {
                                  fontWeight: 'bold',
                                  fontSize: '0.7rem',
                                  minWidth: 20,
                                  height: 20
                                }
                              }}
                            />
                          ) : (
                            <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 20 }} />
                          )}
                        </Box>
                      </Paper>
                    );
                  })}
                </Stack>
              </Box>
            )}

            {panelTab === 2 && (
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                    Actividad Reciente
                  </Typography>
                  <Tooltip title="Filtrar actividad">
                    <IconButton size="small">
                      <FilterIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Stack spacing={1.5}>
                  {recentActivities.map((activity) => (
                    <Paper
                      key={activity.id}
                      sx={{
                        p: 1.5,
                        bgcolor: 'white',
                        borderLeft: `3px solid #3498db`
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Avatar sx={{
                          width: 32,
                          height: 32,
                          fontSize: '0.75rem',
                          bgcolor: '#3498db'
                        }}>
                          {activity.avatar}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '600', color: '#2c3e50' }}>
                            {activity.user}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            {activity.action} • {activity.instance}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{
                          color: '#95a5a6',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          <TimerIcon sx={{ fontSize: 12 }} />
                          {activity.time}
                        </Typography>
                        {getActivityIcon(activity.type)}
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>

          <Box sx={{
            pt: 2,
            mt: 2,
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ChevronRightIcon />}
              onClick={toggleDrawer}
              fullWidth
              sx={{
                color: '#3498db',
                borderColor: '#3498db'
              }}
            >
              Cerrar Panel
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Botón flotante para abrir panel */}
      {!drawerOpen && (
        <Fab
          color="default"
          aria-label="ver panel"
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            color: '#7f8c8d',
            border: '1px solid #e0e0e0',
            opacity: 0.8,
            '&:hover': {
              bgcolor: 'rgba(248, 249, 250, 0.95)',
              opacity: 1,
              boxShadow: '0px 4px 12px rgba(0,0,0,0.15)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
          size="small"
        >
          <VisibilityIcon sx={{ fontSize: 18 }} />
        </Fab>
      )}
    </Box>
  );
};

export default SystemInstancesDashboard;