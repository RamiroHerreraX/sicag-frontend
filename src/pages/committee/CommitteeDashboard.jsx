// src/pages/committee/CommitteeDashboard.jsx
import React, { useState } from 'react';
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
  TextField,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  LinearProgress,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  Avatar,
  Badge,
  Tabs,
  Tab,
  CircularProgress,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Gavel as GavelIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Speed as SpeedIcon,
  Timer as TimerIcon,
  Assignment as AssignmentIcon,
  PriorityHigh as PriorityHighIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  ViewColumn as ViewColumnIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  AutoAwesome as AutoAwesomeIcon,
  Insights as InsightsIcon,
  BarChart as BarChartIcon,
  FolderOpen as FolderOpenIcon,
  RocketLaunch as RocketLaunchIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Paleta de colores corporativa CAAAREM (versión clara)
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
    warning: '#00C2D1',
    error: '#0099FF',
    info: '#3A6EA5'
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
    subtle: '#f5f7fa'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #0D2A4D, #3A6EA5)',
    secondary: 'linear-gradient(135deg, #00A8A8, #00C2D1)',
  }
};

const CommitteeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [activeView, setActiveView] = useState('grid');
  const [sortBy, setSortBy] = useState('priority');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Datos mock mejorados
  const certifications = [
    { 
      id: 1, 
      type: 'PATENTE ADUANAL', 
      applicant: { name: 'Luis Rodríguez', type: 'agente', avatar: 'LR', complianceScore: 85 }, 
      region: 'Norte', 
      uploadDate: '15/01/2026',
      daysPending: 2,
      dueDate: '17/01/2026',
      status: 'PENDIENTE', 
      priority: 'ALTA',
      documents: { total: 5, completed: 4, pending: 1 },
      reviewTime: '2.3 días',
      category: 'Regulatoria',
      lastAction: 'Asignado a Comité',
      assignedTo: 'María González',
      color: colors.primary.main
    },
    { 
      id: 2, 
      type: 'OPINIÓN SAT POSITIVA', 
      applicant: { name: 'Ana López', type: 'profesionista', avatar: 'AL', complianceScore: 92 }, 
      region: 'Centro', 
      uploadDate: '14/01/2026',
      daysPending: 3,
      dueDate: '28/01/2026',
      status: 'EN REVISIÓN', 
      priority: 'ALTA',
      documents: { total: 3, completed: 3, pending: 0 },
      reviewTime: '1.8 días',
      category: 'Fiscal',
      lastAction: 'En validación técnica',
      assignedTo: 'Carlos Ruiz',
      color: colors.secondary.main
    },
    { 
      id: 3, 
      type: 'CÉDULA PROFESIONAL', 
      applicant: { name: 'Carlos Martínez', type: 'empresario', avatar: 'CM', complianceScore: 78 }, 
      region: 'Sur', 
      uploadDate: '13/01/2026',
      daysPending: 4,
      dueDate: '25/01/2026',
      status: 'PENDIENTE', 
      priority: 'MEDIA',
      documents: { total: 4, completed: 2, pending: 2 },
      reviewTime: '3.1 días',
      category: 'Profesional',
      lastAction: 'Esperando documentación',
      assignedTo: 'Laura Díaz',
      color: colors.accents.purple
    },
    { 
      id: 4, 
      type: 'PODER NOTARIAL', 
      applicant: { name: 'María González', type: 'agente', avatar: 'MG', complianceScore: 65 }, 
      region: 'Metropolitana', 
      uploadDate: '12/01/2026',
      daysPending: 5,
      dueDate: '18/01/2026',
      status: 'REQUIERE INFO', 
      priority: 'ALTA',
      documents: { total: 2, completed: 1, pending: 1 },
      reviewTime: '4.2 días',
      category: 'Legal',
      lastAction: 'Solicitada información adicional',
      assignedTo: 'Pedro Sánchez',
      color: colors.status.warning
    },
    { 
      id: 5, 
      type: 'CONSTANCIA FISCAL', 
      applicant: { name: 'Pedro Sánchez', type: 'profesionista', avatar: 'PS', complianceScore: 88 }, 
      region: 'Norte', 
      uploadDate: '11/01/2026',
      daysPending: 6,
      dueDate: '20/01/2026',
      status: 'PENDIENTE', 
      priority: 'MEDIA',
      documents: { total: 6, completed: 5, pending: 1 },
      reviewTime: '2.1 días',
      category: 'Fiscal',
      lastAction: 'En cola de revisión',
      assignedTo: 'Ana López',
      color: colors.accents.blue
    },
  ];

  // Calcular estadísticas dinámicas
  const calculateStats = () => {
    const today = new Date();
    const urgentThreshold = new Date();
    urgentThreshold.setDate(today.getDate() + 3);
    
    return {
      total: certifications.length,
      pending: certifications.filter(c => c.status === 'PENDIENTE').length,
      inReview: certifications.filter(c => c.status === 'EN REVISIÓN').length,
      requiresInfo: certifications.filter(c => c.status === 'REQUIERE INFO').length,
      highPriority: certifications.filter(c => c.priority === 'ALTA').length,
      urgent: certifications.filter(c => {
        const [day, month, year] = c.dueDate.split('/');
        const dueDate = new Date(`${year}-${month}-${day}`);
        return dueDate <= urgentThreshold;
      }).length,
      assignedToMe: certifications.filter(c => c.assignedTo === 'María González').length,
      avgReviewTime: (certifications.reduce((sum, c) => {
        const time = parseFloat(c.reviewTime);
        return sum + (isNaN(time) ? 0 : time);
      }, 0) / certifications.length).toFixed(1)
    };
  };

  const stats = calculateStats();

  const types = ['PATENTE ADUANAL', 'OPINIÓN SAT', 'CÉDULA PROFESIONAL', 'PODER NOTARIAL', 'CONSTANCIA FISCAL'];
  const regions = ['Norte', 'Centro', 'Sur', 'Metropolitana', 'Occidente'];
  const statuses = ['PENDIENTE', 'EN REVISIÓN', 'REQUIERE INFO', 'APROBADA', 'RECHAZADA'];
  const priorities = ['ALTA', 'MEDIA', 'BAJA'];
  const categories = ['Regulatoria', 'Fiscal', 'Legal', 'Profesional'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDIENTE': return 'warning';
      case 'EN REVISIÓN': return 'info';
      case 'REQUIERE INFO': return 'error';
      case 'APROBADA': return 'success';
      case 'RECHAZADA': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'ALTA': return 'error';
      case 'MEDIA': return 'warning';
      case 'BAJA': return 'success';
      default: return 'default';
    }
  };

  const getUserTypeColor = (type) => {
    switch(type) {
      case 'agente': return colors.primary.main;
      case 'profesionista': return colors.secondary.main;
      case 'empresario': return colors.status.warning;
      default: return colors.text.secondary;
    }
  };

  const getDaysColor = (days) => {
    if (days <= 2) return colors.status.error;
    if (days <= 4) return colors.status.warning;
    return colors.status.success;
  };

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = 
      cert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || cert.type === filterType;
    const matchesRegion = filterRegion === 'all' || cert.region === filterRegion;
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || cert.priority === filterPriority;

    return matchesSearch && matchesType && matchesRegion && matchesStatus && matchesPriority;
  });

  const sortedCertifications = [...filteredCertifications].sort((a, b) => {
    switch(sortBy) {
      case 'priority':
        const priorityOrder = { 'ALTA': 0, 'MEDIA': 1, 'BAJA': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'days':
        return a.daysPending - b.daysPending;
      case 'date':
        const [aDay, aMonth, aYear] = a.uploadDate.split('/');
        const [bDay, bMonth, bYear] = b.uploadDate.split('/');
        return new Date(`${bYear}-${bMonth}-${bDay}`) - new Date(`${aYear}-${aMonth}-${aDay}`);
      default:
        return 0;
    }
  });

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      p: 2,
      bgcolor: colors.background.subtle
    }}>
      {/* Header Compacto */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ 
              color: colors.primary.dark, 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1 
            }}>
              <InsightsIcon sx={{ color: colors.primary.main }} />
              Panel de Control del Comité
            </Typography>
            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
              Gestión y validación de certificaciones individuales
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1} alignItems="center">
            
            
            <Button
              variant="contained"
              size="small"
              startIcon={<RocketLaunchIcon />}
              component={Link}
              to="/committee/review"
              sx={{ 
                bgcolor: colors.primary.main,
                '&:hover': { 
                  bgcolor: colors.primary.dark,
                }
              }}
            >
              Revisión Rápida
            </Button>
          </Stack>
        </Box>

        {/* Filtros Rápidos */}
        <Paper elevation={0} sx={{ 
          p: 2, 
          mb: 2, 
          bgcolor: colors.background.paper,
          border: `1px solid ${colors.primary.light}20`,
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar certificaciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: colors.primary.dark,
                    '& fieldset': {
                      borderColor: colors.primary.light,
                    },
                    '&:hover fieldset': {
                      borderColor: colors.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primary.dark,
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: colors.text.secondary }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm('')} sx={{ color: colors.text.secondary }}>
                        <RefreshIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: colors.text.secondary }}>Prioridad</InputLabel>
                <Select
                  value={filterPriority}
                  label="Prioridad"
                  onChange={(e) => setFilterPriority(e.target.value)}
                  sx={{
                    color: colors.primary.dark,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.light,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.dark,
                    },
                  }}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  <MenuItem value="ALTA">Alta</MenuItem>
                  <MenuItem value="MEDIA">Media</MenuItem>
                  <MenuItem value="BAJA">Baja</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: colors.text.secondary }}>Estado</InputLabel>
                <Select
                  value={filterStatus}
                  label="Estado"
                  onChange={(e) => setFilterStatus(e.target.value)}
                  sx={{
                    color: colors.primary.dark,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.light,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.dark,
                    },
                  }}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="PENDIENTE">Pendiente</MenuItem>
                  <MenuItem value="EN REVISIÓN">En Revisión</MenuItem>
                  <MenuItem value="REQUIERE INFO">Requiere Info</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: colors.text.secondary }}>Región</InputLabel>
                <Select
                  value={filterRegion}
                  label="Región"
                  onChange={(e) => setFilterRegion(e.target.value)}
                  sx={{
                    color: colors.primary.dark,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.light,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary.dark,
                    },
                  }}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  {regions.map(region => (
                    <MenuItem key={region} value={region}>{region}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Filtros avanzados">
                  <IconButton 
                    size="small"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    sx={{ 
                      color: showAdvancedFilters ? colors.primary.main : colors.text.secondary,
                      '&:hover': {
                        bgcolor: 'rgba(19, 59, 107, 0.04)',
                      }
                    }}
                  >
                    <FilterIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ordenar">
                  <IconButton size="small" sx={{ color: colors.text.secondary }}>
                    <SortIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cambiar vista">
                  <IconButton 
                    size="small"
                    onClick={() => setActiveView(activeView === 'grid' ? 'list' : 'grid')}
                    sx={{ color: colors.text.secondary }}
                  >
                    <ViewColumnIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>

          {/* Filtros Avanzados */}
          {showAdvancedFilters && (
            <Box sx={{ 
              mt: 2, 
              pt: 2, 
              borderTop: `1px dashed ${colors.primary.light}` 
            }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ color: colors.text.secondary }}>Tipo</InputLabel>
                    <Select
                      value={filterType}
                      label="Tipo"
                      onChange={(e) => setFilterType(e.target.value)}
                      sx={{
                        color: colors.primary.dark,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: colors.primary.light,
                        },
                      }}
                    >
                      <MenuItem value="all">Todos</MenuItem>
                      {types.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ color: colors.text.secondary }}>Categoría</InputLabel>
                    <Select
                      value="all"
                      label="Categoría"
                      sx={{
                        color: colors.primary.dark,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: colors.primary.light,
                        },
                      }}
                    >
                      <MenuItem value="all">Todas</MenuItem>
                      {categories.map(cat => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ color: colors.text.secondary }}>Ordenar por</InputLabel>
                    <Select
                      value={sortBy}
                      label="Ordenar por"
                      onChange={(e) => setSortBy(e.target.value)}
                      sx={{
                        color: colors.primary.dark,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: colors.primary.light,
                        },
                      }}
                    >
                      <MenuItem value="priority">Prioridad</MenuItem>
                      <MenuItem value="days">Días pendientes</MenuItem>
                      <MenuItem value="date">Fecha de carga</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setFilterType('all');
                      setFilterRegion('all');
                      setFilterStatus('all');
                      setFilterPriority('all');
                      setSearchTerm('');
                    }}
                    sx={{
                      borderColor: colors.primary.light,
                      color: colors.primary.main,
                      '&:hover': {
                        borderColor: colors.primary.main,
                        bgcolor: 'rgba(19, 59, 107, 0.04)',
                      }
                    }}
                  >
                    Limpiar Filtros
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Contenido Principal */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Columna Principal - 70% */}
          <Grid item xs={12} lg={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* KPI Cards Compactas */}
            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              {[
                { 
                  label: 'Urgentes', 
                  value: stats.urgent, 
                  color: colors.status.error, 
                  icon: <PriorityHighIcon />,
                  tooltip: 'Certificaciones con vencimiento en 3 días o menos'
                },
                { 
                  label: 'Pendientes', 
                  value: stats.pending, 
                  color: colors.status.warning, 
                  icon: <TimerIcon />,
                  tooltip: 'Certificaciones pendientes de revisión'
                },
                { 
                  label: 'Asignadas', 
                  value: stats.assignedToMe, 
                  color: colors.primary.main, 
                  icon: <AssignmentIcon />,
                  tooltip: 'Certificaciones asignadas a mí'
                },
                { 
                  label: 'En Revisión', 
                  value: stats.inReview, 
                  color: colors.accents.blue, 
                  icon: <AssessmentIcon />,
                  tooltip: 'Certificaciones en proceso de revisión'
                },
                { 
                  label: 'Tiempo Prom.', 
                  value: `${stats.avgReviewTime}d`, 
                  color: colors.status.success, 
                  icon: <SpeedIcon />,
                  tooltip: 'Tiempo promedio de revisión'
                },
                { 
                  label: 'Total', 
                  value: stats.total, 
                  color: colors.accents.purple, 
                  icon: <FolderOpenIcon />,
                  tooltip: 'Total de certificaciones activas'
                },
              ].map((kpi, index) => (
                <Grid item xs={6} sm={4} md={2} key={index}>
                  <Tooltip title={kpi.tooltip}>
                    <Card 
                      sx={{ 
                        p: 1.5, 
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        bgcolor: colors.background.paper,
                        border: `1px solid ${colors.primary.light}20`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 3,
                          borderColor: colors.primary.light,
                        }
                      }}
                    >
                      <Box sx={{ color: kpi.color, mb: 1 }}>
                        {kpi.icon}
                      </Box>
                      <Typography variant="h6" sx={{ color: kpi.color, fontWeight: 'bold', lineHeight: 1 }}>
                        {kpi.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        {kpi.label}
                      </Typography>
                    </Card>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>

            {/* Vista de Certificaciones */}
            <Paper elevation={1} sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden',
              bgcolor: colors.background.paper,
              border: `1px solid ${colors.primary.light}20`,
            }}>
              <Box sx={{ 
                p: 2, 
                borderBottom: `1px solid ${colors.primary.light}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                  {sortedCertifications.length} certificaciones para revisión
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip 
                    label={`${stats.highPriority} PRIORIDAD ALTA`}
                    size="small"
                    sx={{
                      bgcolor: colors.status.error,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                    icon={<PriorityHighIcon sx={{ color: 'white' }} />}
                  />
                  <Chip 
                    label={`${stats.urgent} URGENTES`}
                    size="small"
                    sx={{
                      bgcolor: colors.status.warning,
                      color: colors.primary.dark,
                      fontWeight: 'bold',
                    }}
                    icon={<WarningIcon sx={{ color: colors.primary.dark }} />}
                  />
                </Stack>
              </Box>

              {/* Tabla de Certificaciones - Scroll Interno */}
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <TableContainer>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          width: '25%',
                          bgcolor: colors.background.subtle,
                          color: colors.primary.dark,
                          borderBottom: `2px solid ${colors.primary.main}`,
                        }}>Certificación</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          width: '20%',
                          bgcolor: colors.background.subtle,
                          color: colors.primary.dark,
                          borderBottom: `2px solid ${colors.primary.main}`,
                        }}>Solicitante</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          width: '10%',
                          bgcolor: colors.background.subtle,
                          color: colors.primary.dark,
                          borderBottom: `2px solid ${colors.primary.main}`,
                        }}>Estado</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          width: '15%',
                          bgcolor: colors.background.subtle,
                          color: colors.primary.dark,
                          borderBottom: `2px solid ${colors.primary.main}`,
                        }}>Tiempo</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          width: '10%',
                          bgcolor: colors.background.subtle,
                          color: colors.primary.dark,
                          borderBottom: `2px solid ${colors.primary.main}`,
                        }}>Documentos</TableCell>
                        <TableCell sx={{ 
                          fontWeight: 'bold', 
                          width: '20%',
                          bgcolor: colors.background.subtle,
                          color: colors.primary.dark,
                          borderBottom: `2px solid ${colors.primary.main}`,
                        }} align="right">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedCertifications.map((cert) => (
                        <TableRow 
                          key={cert.id} 
                          hover
                          sx={{ 
                            '&:hover': { 
                              bgcolor: 'rgba(58, 110, 165, 0.04)',
                            },
                            borderLeft: `4px solid ${cert.color}`,
                            cursor: 'pointer',
                            '& td': {
                              color: colors.primary.dark,
                              borderBottom: `1px solid ${colors.primary.light}`,
                            }
                          }}
                          onClick={() => window.location.href = `/committee/review/${cert.id}`}
                        >
                          <TableCell>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                                {cert.type}
                              </Typography>
                              <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                                <PlaceIcon sx={{ color: colors.text.secondary, fontSize: 12 }} />
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  {cert.region}
                                </Typography>
                                <Chip 
                                  label={cert.category}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    height: 18, 
                                    ml: 1,
                                    color: colors.text.secondary,
                                    borderColor: colors.primary.light,
                                  }}
                                />
                              </Stack>
                            </Box>
                          </TableCell>
                          
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar 
                                sx={{ 
                                  width: 28, 
                                  height: 28, 
                                  fontSize: '0.75rem',
                                  bgcolor: getUserTypeColor(cert.applicant.type)
                                }}
                              >
                                {cert.applicant.avatar}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'medium', color: colors.primary.dark }}>
                                  {cert.applicant.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LinearProgress 
                                    variant="determinate" 
                                    value={cert.applicant.complianceScore}
                                    sx={{ 
                                      width: 40, 
                                      height: 4,
                                      borderRadius: 2,
                                      bgcolor: colors.primary.light,
                                      '& .MuiLinearProgress-bar': {
                                        bgcolor: colors.primary.main,
                                      }
                                    }}
                                  />
                                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                    {cert.applicant.complianceScore}%
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </TableCell>
                          
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Chip 
                                label={cert.status}
                                size="small"
                                sx={{
                                  height: 20,
                                  bgcolor: cert.status === 'PENDIENTE' ? colors.status.warning :
                                          cert.status === 'EN REVISIÓN' ? colors.accents.blue :
                                          cert.status === 'REQUIERE INFO' ? colors.status.error :
                                          colors.primary.main,
                                  color: cert.status === 'PENDIENTE' ? colors.primary.dark : 'white',
                                  fontWeight: 'bold',
                                }}
                              />
                              <Chip 
                                label={cert.priority}
                                size="small"
                                variant="outlined"
                                sx={{
                                  height: 18,
                                  color: cert.priority === 'ALTA' ? colors.status.error :
                                         cert.priority === 'MEDIA' ? colors.status.warning :
                                         colors.status.success,
                                  borderColor: cert.priority === 'ALTA' ? colors.status.error :
                                              cert.priority === 'MEDIA' ? colors.status.warning :
                                              colors.status.success,
                                }}
                              />
                            </Stack>
                          </TableCell>
                          
                          <TableCell>
                            <Box>
                              <Typography variant="body2" sx={{ 
                                fontWeight: 'bold',
                                color: getDaysColor(cert.daysPending)
                              }}>
                                {cert.daysPending} días
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                Vence: {cert.dueDate}
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                                Prom: {cert.reviewTime}
                              </Typography>
                            </Box>
                          </TableCell>
                          
                          <TableCell>
                            <Tooltip title={`${cert.documents.completed}/${cert.documents.total} documentos completos`}>
                              <Box>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={(cert.documents.completed / cert.documents.total) * 100}
                                  sx={{ 
                                    height: 6,
                                    borderRadius: 3,
                                    mb: 0.5,
                                    bgcolor: colors.primary.light,
                                    '& .MuiLinearProgress-bar': {
                                      bgcolor: colors.primary.main,
                                    }
                                  }}
                                />
                                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                                  {cert.documents.completed}/{cert.documents.total}
                                </Typography>
                              </Box>
                            </Tooltip>
                          </TableCell>
                          
                          <TableCell align="right">
                            <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                              <Tooltip title="Revisar certificación">
                                <Button
                                  component={Link}
                                  to={`/committee/review/${cert.id}`}
                                  variant="contained"
                                  size="small"
                                  startIcon={<GavelIcon />}
                                  onClick={(e) => e.stopPropagation()}
                                  sx={{ 
                                    bgcolor: colors.primary.main,
                                    '&:hover': { 
                                      bgcolor: colors.primary.dark,
                                    },
                                    minWidth: 'auto',
                                    px: 1.5
                                  }}
                                >
                                  Revisar
                                </Button>
                              </Tooltip>
                              <Tooltip title="Más opciones">
                                <IconButton size="small" onClick={(e) => e.stopPropagation()} sx={{ color: colors.text.secondary }}>
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Columna Derecha - 30% */}
          <Grid item xs={12} lg={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Alertas Inmediatas */}
            <Paper elevation={1} sx={{ 
              p: 2, 
              mb: 2, 
              flex: 1,
              bgcolor: colors.background.paper,
              border: `1px solid ${colors.primary.light}20`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.primary.dark, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationsIcon sx={{ color: colors.status.error }} />
                  Alertas Críticas
                </Typography>
                <Badge badgeContent={3} sx={{ '& .MuiBadge-badge': { bgcolor: colors.status.error, color: 'white' } }}>
                  <IconButton size="small" sx={{ color: colors.text.secondary }}>
                    <MoreVertIcon />
                  </IconButton>
                </Badge>
              </Box>
              
              <Stack spacing={1.5}>
                {[
                  { 
                    type: 'error', 
                    title: 'Vencimiento Inminente', 
                    message: 'Patente Aduanal vence mañana', 
                    cert: 'PA-2026-00145',
                    time: 'Hace 30 min',
                    action: 'revisar'
                  },
                  { 
                    type: 'warning', 
                    title: 'Documentación Pendiente', 
                    message: 'Falta 1 documento en Cédula Profesional', 
                    cert: 'CP-2024-56789',
                    time: 'Hace 2 horas',
                    action: 'solicitar'
                  },
                  { 
                    type: 'info', 
                    title: 'Nueva Asignación', 
                    message: 'Te han asignado Constancia Fiscal', 
                    cert: 'CF-2025-78901',
                    time: 'Hace 3 horas',
                    action: 'revisar'
                  },
                ].map((alert, idx) => (
                  <Card 
                    key={idx} 
                    variant="outlined"
                    sx={{ 
                      p: 1.5,
                      bgcolor: 'transparent',
                      borderColor: colors.primary.light,
                      borderLeft: `3px solid ${
                        alert.type === 'error' ? colors.status.error :
                        alert.type === 'warning' ? colors.status.warning : colors.accents.blue
                      }`
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                        {alert.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        {alert.time}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, mb: 1, display: 'block' }}>
                      {alert.message}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip 
                        label={alert.cert}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          color: colors.text.secondary,
                          borderColor: colors.primary.light,
                        }}
                      />
                      <Button
                        size="small"
                        variant="text"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ 
                          textTransform: 'none',
                          color: colors.primary.main,
                          '&:hover': { color: colors.primary.dark }
                        }}
                      >
                        {alert.action === 'revisar' ? 'Revisar ahora' : 'Solicitar'}
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Stack>
              
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/committee/alerts"
                sx={{ 
                  mt: 2,
                  borderColor: colors.primary.light,
                  color: colors.primary.main,
                  '&:hover': {
                    borderColor: colors.primary.main,
                    bgcolor: 'rgba(19, 59, 107, 0.04)',
                  }
                }}
              >
                Ver todas las alertas
              </Button>
            </Paper>

            {/* Métricas Personales */}
            <Paper elevation={1} sx={{ 
              p: 2, 
              mb: 2, 
              flex: 1,
              bgcolor: colors.background.paper,
              border: `1px solid ${colors.primary.light}20`,
            }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: colors.primary.dark, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesomeIcon sx={{ color: colors.accents.purple }} /> Mi Desempeño
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      Revisadas este mes
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: colors.primary.main }}>
                      15/20 (75%)
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={75}
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      bgcolor: colors.primary.light,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: colors.primary.main,
                      }
                    }}
                  />
                </Box>
                
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Card variant="outlined" sx={{ 
                      p: 1.5, 
                      textAlign: 'center',
                      bgcolor: 'transparent',
                      borderColor: colors.primary.light,
                    }}>
                      <Typography variant="h6" sx={{ color: colors.status.success, fontWeight: 'bold' }}>
                        92%
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Aprobación
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card variant="outlined" sx={{ 
                      p: 1.5, 
                      textAlign: 'center',
                      bgcolor: 'transparent',
                      borderColor: colors.primary.light,
                    }}>
                      <Typography variant="h6" sx={{ color: colors.accents.blue, fontWeight: 'bold' }}>
                        2.3d
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Tiempo promedio
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
                
                <Box>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 1 }}>
                    Próximas revisiones programadas:
                  </Typography>
                  <Stack spacing={0.5}>
                    {['Hoy - 10:00 AM', 'Hoy - 2:00 PM', 'Mañana - 9:00 AM'].map((time, idx) => (
                      <Box key={idx} sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        p: 1,
                        borderBottom: idx < 2 ? `1px solid ${colors.primary.light}` : 'none',
                      }}>
                        <Typography variant="caption" sx={{ color: colors.primary.dark }}>
                          {time}
                        </Typography>
                        <Chip 
                          label="Programado"
                          size="small"
                          sx={{
                            bgcolor: 'rgba(0, 168, 168, 0.1)',
                            color: colors.secondary.main,
                            borderColor: colors.secondary.main,
                          }}
                          variant="outlined"
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>

            {/* Acciones Rápidas */}
            <Paper elevation={1} sx={{ 
              p: 2,
              bgcolor: colors.background.paper,
              border: `1px solid ${colors.primary.light}20`,
            }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: colors.primary.dark }}>
                Acciones Directas
              </Typography>
              
              <Stack spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<GavelIcon />}
                  component={Link}
                  to="/committee/review"
                  sx={{ 
                    justifyContent: 'flex-start', 
                    bgcolor: colors.primary.main,
                    '&:hover': { 
                      bgcolor: colors.primary.dark,
                    }
                  }}
                >
                  Iniciar nueva revisión
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<BarChartIcon />}
                  sx={{ 
                    justifyContent: 'flex-start',
                    borderColor: colors.primary.light,
                    color: colors.primary.main,
                    '&:hover': {
                      borderColor: colors.primary.main,
                      bgcolor: 'rgba(19, 59, 107, 0.04)',
                    }
                  }}
                >
                  Ver métricas completas
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    justifyContent: 'flex-start',
                    borderColor: colors.primary.light,
                    color: colors.primary.main,
                    '&:hover': {
                      borderColor: colors.primary.main,
                      bgcolor: 'rgba(19, 59, 107, 0.04)',
                    }
                  }}
                >
                  Descargar reporte
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={() => window.location.reload()}
                  sx={{ 
                    justifyContent: 'flex-start',
                    borderColor: colors.primary.light,
                    color: colors.primary.main,
                    '&:hover': {
                      borderColor: colors.primary.main,
                      bgcolor: 'rgba(19, 59, 107, 0.04)',
                    }
                  }}
                >
                  Actualizar datos
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CommitteeDashboard;