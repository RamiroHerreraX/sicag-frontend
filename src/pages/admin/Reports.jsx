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
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const Reports = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [reportType, setReportType] = useState('compliance');
  const [dateRange, setDateRange] = useState('month');
  const [region, setRegion] = useState('all');

  const reportTypes = [
    { value: 'compliance', label: 'Cumplimiento General', icon: <AssessmentIcon /> },
    { value: 'certifications', label: 'Certificaciones', icon: <DescriptionIcon /> },
    { value: 'users', label: 'Usuarios', icon: <GroupIcon /> },
    { value: 'committee', label: 'Comité', icon: <BarChartIcon /> },
    { value: 'trafficLight', label: 'Semáforo', icon: <EqualizerIcon /> },
    { value: 'alerts', label: 'Alertas', icon: <WarningIcon /> },
  ];

  const dateRanges = [
    { value: 'today', label: 'Hoy' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mes' },
    { value: 'quarter', label: 'Este trimestre' },
    { value: 'year', label: 'Este año' },
    { value: 'custom', label: 'Personalizado' },
  ];

  const regions = [
    { value: 'all', label: 'Todas las regiones' },
    { value: 'norte', label: 'Norte' },
    { value: 'centro', label: 'Centro' },
    { value: 'sur', label: 'Sur' },
    { value: 'metropolitana', label: 'Metropolitana' },
  ];

  // Datos de ejemplo para reportes
  const complianceData = [
    { region: 'Norte', total: 45, green: 35, yellow: 7, red: 3, compliance: 92 },
    { region: 'Centro', total: 68, green: 52, yellow: 10, red: 6, compliance: 88 },
    { region: 'Sur', total: 32, green: 22, yellow: 6, red: 4, compliance: 85 },
    { region: 'Metropolitana', total: 56, green: 48, yellow: 5, red: 3, compliance: 95 },
  ];

  const certificationStats = {
    total: 824,
    active: 745,
    pending: 45,
    expired: 24,
    rejected: 10,
    renewalRate: 85,
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
              Reportes y BI Gremial
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Información estadística consolidada para análisis del cumplimiento
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
                <InputLabel>Región</InputLabel>
                <Select
                  value={region}
                  label="Región"
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {regions.map(reg => (
                    <MenuItem key={reg.value} value={reg.value}>{reg.label}</MenuItem>
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
          {/* Columna izquierda - Estadísticas */}
          <Grid item xs={12} md={8}>
            <Paper elevation={1} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Reporte de Cumplimiento por Región
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
                      <TableCell sx={{ fontWeight: 'bold' }}>Región</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Total Usuarios</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                          <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 16 }} />
                          Verde
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                          <WarningIcon sx={{ color: '#f39c12', fontSize: 16 }} />
                          Amarillo
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'center' }}>
                          <WarningIcon sx={{ color: '#e74c3c', fontSize: 16 }} />
                          Rojo
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">% Cumplimiento</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Tendencia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {complianceData.map((row) => (
                      <TableRow key={row.region}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {row.region}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {row.total}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={row.green}
                            size="small"
                            sx={{ bgcolor: '#e8f5e9', color: '#27ae60' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={row.yellow}
                            size="small"
                            sx={{ bgcolor: '#fffde7', color: '#f39c12' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={row.red}
                            size="small"
                            sx={{ bgcolor: '#ffebee', color: '#e74c3c' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={row.compliance}
                              sx={{ 
                                width: 60,
                                height: 6,
                                borderRadius: 3,
                                bgcolor: '#f0f0f0',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: row.compliance >= 90 ? '#27ae60' : 
                                          row.compliance >= 70 ? '#f39c12' : '#e74c3c'
                                }
                              }}
                            />
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {row.compliance}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          {row.region === 'Metropolitana' ? (
                            <TrendingUpIcon sx={{ color: '#27ae60' }} />
                          ) : row.region === 'Sur' ? (
                            <TrendingDownIcon sx={{ color: '#e74c3c' }} />
                          ) : (
                            <EqualizerIcon sx={{ color: '#f39c12' }} />
                          )}
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
                        {complianceData.reduce((sum, row) => sum + row.total, 0)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Usuarios Totales
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                        {complianceData.reduce((sum, row) => sum + row.green, 0)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        En Verde
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                        {complianceData.reduce((sum, row) => sum + row.yellow, 0)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        En Amarillo
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                        {complianceData.reduce((sum, row) => sum + row.red, 0)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        En Rojo
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Columna derecha - KPIs y gráficos */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1} sx={{ p: 3, mb: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                KPIs del Sistema
              </Typography>

              <Stack spacing={3}>
                {/* Certificaciones */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50' }}>
                      Certificaciones
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Total: {certificationStats.total}
                    </Typography>
                  </Box>
                  
                  <Grid container spacing={1} sx={{ mb: 1 }}>
                    <Grid item xs={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                          {certificationStats.active}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          Activas
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                          {certificationStats.pending}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          Pendientes
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                          {certificationStats.expired}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          Vencidas
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#9b59b6', fontWeight: 'bold' }}>
                          {certificationStats.rejected}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          Rechazadas
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Tasa de Renovación
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {certificationStats.renewalRate}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={certificationStats.renewalRate}
                    sx={{ 
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#f0f0f0'
                    }}
                  />
                </Box>

                <Divider />

                {/* Comité */}
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Actividad del Comité
                  </Typography>
                  
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Revisiones este mes:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        156
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Tiempo promedio:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        2.3 días
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Tasa de aprobación:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                        92%
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider />

                {/* Alertas */}
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Alertas Activas
                  </Typography>
                  
                  <Stack spacing={1}>
                    {[
                      { type: 'Vencimientos', count: 12, color: '#e74c3c' },
                      { type: 'Pendientes', count: 8, color: '#f39c12' },
                      { type: 'Nuevos', count: 5, color: '#3498db' },
                      { type: 'Urgentes', count: 3, color: '#e74c3c' },
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
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<BarChartIcon />}
                      size="small"
                    >
                      Reporte detallado
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

export default Reports;