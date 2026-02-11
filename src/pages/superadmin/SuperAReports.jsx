// src/pages/admin/Reports.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  IconButton,
  Tabs,
  Tab,
  Divider,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  InputAdornment
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Equalizer as EqualizerIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  Group as GroupIcon,
  Description as DescriptionIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Domain as DomainIcon,
  Storage as StorageIcon,
  Person as PersonIcon,
  Cloud as CloudIcon,
  Speed as SpeedIcon
} from '@mui/icons-material';

const InstanceReports = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [reportType, setReportType] = useState('performance');
  const [dateRange, setDateRange] = useState('month');
  const [instanceType, setInstanceType] = useState('all');

  const reportTypes = [
    { value: 'performance', label: 'Rendimiento', icon: <AssessmentIcon /> },
    { value: 'usage', label: 'Uso de Instancias', icon: <DomainIcon /> },
    { value: 'users', label: 'Usuarios por Instancia', icon: <GroupIcon /> },
    { value: 'uptime', label: 'Disponibilidad', icon: <SpeedIcon /> },
    { value: 'alerts', label: 'Alertas del Sistema', icon: <WarningIcon /> },
  ];

  const dateRanges = [
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'quarter', label: 'Este trimestre' },
    { value: 'year', label: 'Este año' },
    { value: 'custom', label: 'Personalizado' },
  ];

  const instanceTypes = [
    { value: 'all', label: 'Todas las instancias' },
    { value: 'active', label: 'Instancias Activas' },
    { value: 'maintenance', label: 'En Mantenimiento' },
    { value: 'inactive', label: 'Inactivas' },
    { value: 'academic', label: 'Académicas' },
    { value: 'operational', label: 'Operativas' },
  ];

  // Datos de ejemplo para reportes de instancias
  const instancePerformanceData = [
    { 
      name: 'Área de Ingeniería', 
      code: 'ENG-001', 
      uptime: 99.9, 
      users: 245, 
      activeUsers: 198, 
      storageUsed: '2.5 GB', 
      responseTime: '85 ms', 
      status: 'excelente' 
    },
    { 
      name: 'Área de Medicina', 
      code: 'MED-001', 
      uptime: 99.8, 
      users: 189, 
      activeUsers: 152, 
      storageUsed: '1.8 GB', 
      responseTime: '92 ms', 
      status: 'bueno' 
    },
    { 
      name: 'Programa de Posgrado', 
      code: 'POS-001', 
      uptime: 95.2, 
      users: 78, 
      activeUsers: 45, 
      storageUsed: '850 MB', 
      responseTime: '120 ms', 
      status: 'regular' 
    },
    { 
      name: 'Campus Virtual', 
      code: 'VIR-001', 
      uptime: 99.7, 
      users: 342, 
      activeUsers: 278, 
      storageUsed: '3.2 GB', 
      responseTime: '78 ms', 
      status: 'excelente' 
    },
    { 
      name: 'Departamento de Ciencias', 
      code: 'SCI-001', 
      uptime: 99.5, 
      users: 198, 
      activeUsers: 165, 
      storageUsed: '1.5 GB', 
      responseTime: '88 ms', 
      status: 'bueno' 
    },
  ];

  const systemStats = {
    totalInstances: 8,
    activeInstances: 5,
    maintenanceInstances: 1,
    inactiveInstances: 1,
    totalUsers: 1245,
    activeUsers: 1028,
    totalStorage: '12.4 GB',
    avgUptime: 99.8,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excelente': return '#27ae60';
      case 'bueno': return '#2ecc71';
      case 'regular': return '#f39c12';
      case 'critico': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
              Reportes de Instancias
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Información estadística y rendimiento de las instancias del sistema
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              size="small"
            >
              Imprimir
            </Button>
            <Button
              variant="outlined"
              startIcon={<EmailIcon />}
              size="small"
            >
              Enviar por Email
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              size="small"
            >
              Exportar PDF
            </Button>
          </Stack>
        </Box>

        {/* Filtros */}
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Reporte</InputLabel>
                <Select
                  value={reportType}
                  label="Tipo de Reporte"
                  onChange={(e) => setReportType(e.target.value)}
                >
                  {reportTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {type.icon}
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Período</InputLabel>
                <Select
                  value={dateRange}
                  label="Período"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  {dateRanges.map(range => (
                    <MenuItem key={range.value} value={range.value}>{range.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Instancia</InputLabel>
                <Select
                  value={instanceType}
                  label="Tipo de Instancia"
                  onChange={(e) => setInstanceType(e.target.value)}
                >
                  {instanceTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  size="small"
                >
                  Generar Reporte
                </Button>
                <IconButton size="small">
                  <FilterIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ flex: 1 }}>
          {/* Columna izquierda - Tabla de rendimiento */}
          <Grid item xs={12} md={8}>
            <Paper elevation={1} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Rendimiento por Instancia
                </Typography>
                <Chip 
                  label="Actualizado hoy 10:30 AM" 
                  size="small" 
                  color="primary"
                  variant="outlined"
                />
              </Box>

              {/* Tabla de datos */}
              <TableContainer sx={{ flex: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Instancia</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Código</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Uptime</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Usuarios</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Activos</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Estado</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {instancePerformanceData.map((row) => (
                      <TableRow key={row.code}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <DomainIcon sx={{ color: '#3498db', fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {row.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={row.code}
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={row.uptime}
                              sx={{ 
                                width: 60,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: '#f0f0f0',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: getStatusColor(row.status)
                                }
                              }}
                            />
                            <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: 45 }}>
                              {row.uptime}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {row.users}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                            {row.activeUsers}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={row.status.toUpperCase()}
                            size="small"
                            sx={{ 
                              bgcolor: `${getStatusColor(row.status)}15`,
                              color: getStatusColor(row.status),
                              fontWeight: 'bold'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Resumen */}
              <Box sx={{ mt: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: '8px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#3498db', fontWeight: 'bold' }}>
                        {systemStats.totalInstances}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Instancias Totales
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                        {systemStats.activeInstances}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Activas
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                        {systemStats.maintenanceInstances}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Mantenimiento
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                        {systemStats.inactiveInstances}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Inactivas
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Columna derecha - KPIs y métricas */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, mb: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                KPIs del Sistema de Instancias
              </Typography>

              <Stack spacing={3}>
                {/* Usuarios por instancia */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50' }}>
                      Distribución de Usuarios
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Total: {systemStats.totalUsers}
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={1} sx={{ mb: 1 }}>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                          {systemStats.activeUsers}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          Activos
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                          {systemStats.totalUsers - systemStats.activeUsers}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          Inactivos
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold' }}>
                          {Math.round((systemStats.activeUsers / systemStats.totalUsers) * 100)}%
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          Tasa Activos
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Usuarios por instancia
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {Math.round(systemStats.totalUsers / systemStats.totalInstances)}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.round((systemStats.activeUsers / systemStats.totalUsers) * 100)}
                    sx={{ 
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#f0f0f0'
                    }}
                  />
                </Box>

                <Divider />

                {/* Almacenamiento */}
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Uso de Almacenamiento
                  </Typography>
                  
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Total utilizado:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {systemStats.totalStorage}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Promedio por instancia:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        1.55 GB
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Crecimiento mensual:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                        +2.1 GB
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider />

                {/* Disponibilidad */}
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Disponibilidad del Sistema
                  </Typography>
                  
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Uptime global:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                        {systemStats.avgUptime}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Instancias 99%:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        4 de {systemStats.totalInstances}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Tiempo inactividad:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        1.2 horas/mes
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider />

                {/* Alertas del sistema */}
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Alertas Activas
                  </Typography>
                  
                  <Stack spacing={1}>
                    {[
                      { type: 'Uptime crítico', count: 1, color: '#e74c3c' },
                      { type: 'Alto uso CPU', count: 2, color: '#f39c12' },
                      { type: 'Actualizaciones', count: 4, color: '#9b59b6' },
                    ].map((alert, idx) => (
                      <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          {alert.type}:
                        </Typography>
                        <Chip 
                          label={alert.count}
                          size="small"
                          sx={{ 
                            bgcolor: `${alert.color}15`,
                            color: alert.color,
                            fontWeight: 'bold',
                            height: 20
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Divider />

                {/* Acciones rápidas */}
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2 }}>
                    Acciones Rápidas
                  </Typography>
                  
                  <Stack spacing={1}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<TimelineIcon />}
                      size="small"
                    >
                      Ver tendencias históricas
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<PieChartIcon />}
                      size="small"
                    >
                      Análisis comparativo
                    </Button>
                   
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default InstanceReports;