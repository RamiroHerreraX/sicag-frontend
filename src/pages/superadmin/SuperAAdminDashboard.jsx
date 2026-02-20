import React, { useState } from 'react';
import {
  Box,
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
  Storage as StorageIcon,
  Person as PersonIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

const SystemInstancesDashboard = () => {
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
      title: 'Uptime Sistema', 
      value: '99.8%', 
      change: '+0.2%', 
      icon: <TrendingUpIcon />, 
      color: '#9b59b6', 
      trend: 'up', 
      detail: 'Disponibilidad mensual' 
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
      uptime: '99.9%' 
    },
    { 
      name: 'Área de Medicina', 
      code: 'MED-001', 
      admin: 'Dra. Ana López', 
      users: 189, 
      status: 'active', 
      uptime: '99.8%' 
    },
    { 
      name: 'Programa de Posgrado', 
      code: 'POS-001', 
      admin: 'Mtro. Roberto Díaz', 
      users: 78, 
      status: 'maintenance', 
      uptime: '95.2%' 
    },
    { 
      name: 'Área de Derecho', 
      code: 'LAW-001', 
      admin: 'Lic. Fernando Gómez', 
      users: 156, 
      status: 'inactive', 
      uptime: '0%' 
    },
    { 
      name: 'Campus Virtual', 
      code: 'VIR-001', 
      admin: 'Ing. Sofía Ramírez', 
      users: 342, 
      status: 'active', 
      uptime: '99.7%' 
    },
    { 
      name: 'Departamento de Ciencias', 
      code: 'SCI-001', 
      admin: 'Dr. Miguel Ángel Ruiz', 
      users: 198, 
      status: 'active', 
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
          
          <Divider orientation="vertical" flexItem sx={{ height: 24, mx: 1 }} />

          
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
    </Box>
  );
};

export default SystemInstancesDashboard;