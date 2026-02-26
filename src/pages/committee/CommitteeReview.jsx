// src/pages/committee/CommitteeReview.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  Badge,
  Avatar,
  LinearProgress,
  Divider,
  InputAdornment,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Gavel as GavelIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Place as PlaceIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
  ViewColumn as ViewColumnIcon,
  MoreVert as MoreVertIcon,
  Timer as TimerIcon,
  PriorityHigh as PriorityHighIcon,
  Assignment as AssignmentIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as AutoAwesomeIcon,
  Insights as InsightsIcon,
  FolderOpen as FolderOpenIcon,
  CalendarMonth as CalendarMonthIcon
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
    warning: '#00C2D1',      // Advertencias en cyan
    error: '#0099FF',         // Errores en azul eléctrico
    info: '#3A6EA5',          // Información en azul claro
    success: '#00A8A8',       // Éxito en verde/teal
    purple: '#6C5CE7'         // Púrpura para énfasis
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

const CommitteeReview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [activeView, setActiveView] = useState('list'); // 'list' o 'grid'
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [batchActionDialog, setBatchActionDialog] = useState(false);

  // Datos mock mejorados para revisión
  const certifications = [
    { 
      id: 1, 
      type: 'PATENTE ADUANAL', 
      code: 'PA-2026-00145',
      applicant: { 
        name: 'Luis Rodríguez', 
        type: 'agente', 
        avatar: 'LR',
        complianceScore: 85,
        level: 'Avanzado'
      }, 
      region: 'Norte', 
      uploadDate: '15/01/2026',
      daysPending: 2,
      dueDate: '17/01/2026',
      status: 'PENDIENTE', 
      priority: 'ALTA',
      documents: { total: 5, completed: 4, pending: 1 },
      category: 'Regulatoria',
      assignedTo: 'María González',
      lastActivity: 'Hace 2 horas',
      reviewEstimate: '1.5 horas',
      color: colors.primary.main
    },
    { 
      id: 2, 
      type: 'OPINIÓN SAT POSITIVA', 
      code: 'OS-2025-03421',
      applicant: { 
        name: 'Carlos Martínez', 
        type: 'empresario', 
        avatar: 'CM',
        complianceScore: 78,
        level: 'Intermedio'
      }, 
      region: 'Sur', 
      uploadDate: '14/01/2026',
      daysPending: 3,
      dueDate: '28/01/2026',
      status: 'EN REVISIÓN', 
      priority: 'ALTA',
      documents: { total: 3, completed: 3, pending: 0 },
      category: 'Fiscal',
      assignedTo: 'Carlos Ruiz',
      lastActivity: 'En progreso',
      reviewEstimate: '45 minutos',
      color: colors.secondary.main
    },
    { 
      id: 3, 
      type: 'CÉDULA PROFESIONAL', 
      code: 'CP-2024-56789',
      applicant: { 
        name: 'Ana López', 
        type: 'profesionista', 
        avatar: 'AL',
        complianceScore: 92,
        level: 'Avanzado'
      }, 
      region: 'Centro', 
      uploadDate: '13/01/2026',
      daysPending: 4,
      dueDate: '25/01/2026',
      status: 'PENDIENTE', 
      priority: 'MEDIA',
      documents: { total: 4, completed: 2, pending: 2 },
      category: 'Profesional',
      assignedTo: 'Laura Díaz',
      lastActivity: 'Hace 1 día',
      reviewEstimate: '2 horas',
      color: colors.accents.purple
    },
    { 
      id: 4, 
      type: 'PODER NOTARIAL', 
      code: 'PN-2025-12345',
      applicant: { 
        name: 'Pedro Sánchez', 
        type: 'agente', 
        avatar: 'PS',
        complianceScore: 65,
        level: 'Básico'
      }, 
      region: 'Metropolitana', 
      uploadDate: '12/01/2026',
      daysPending: 5,
      dueDate: '18/01/2026',
      status: 'REQUIERE INFO', 
      priority: 'ALTA',
      documents: { total: 2, completed: 1, pending: 1 },
      category: 'Legal',
      assignedTo: 'Pedro Sánchez',
      lastActivity: 'Esperando respuesta',
      reviewEstimate: '30 minutos',
      color: colors.status.warning
    },
    { 
      id: 5, 
      type: 'CONSTANCIA FISCAL', 
      code: 'CF-2025-78901',
      applicant: { 
        name: 'Laura Díaz', 
        type: 'profesionista', 
        avatar: 'LD',
        complianceScore: 88,
        level: 'Avanzado'
      }, 
      region: 'Norte', 
      uploadDate: '11/01/2026',
      daysPending: 6,
      dueDate: '20/01/2026',
      status: 'PENDIENTE', 
      priority: 'MEDIA',
      documents: { total: 6, completed: 5, pending: 1 },
      category: 'Fiscal',
      assignedTo: 'Ana López',
      lastActivity: 'Hace 2 días',
      reviewEstimate: '1 hora',
      color: colors.accents.blue
    },
  ];

  // Estadísticas dinámicas
  const calculateStats = () => {
    const urgentThreshold = 3; // días para ser considerado urgente
    
    return {
      total: certifications.length,
      pending: certifications.filter(c => c.status === 'PENDIENTE').length,
      inReview: certifications.filter(c => c.status === 'EN REVISIÓN').length,
      requiresInfo: certifications.filter(c => c.status === 'REQUIERE INFO').length,
      highPriority: certifications.filter(c => c.priority === 'ALTA').length,
      urgent: certifications.filter(c => c.daysPending <= urgentThreshold).length,
      assignedToMe: certifications.filter(c => c.assignedTo === 'María González').length,
      avgReviewTime: '1.8 horas'
    };
  };

  const stats = calculateStats();

  // Filtros y opciones
  const statusOptions = ['PENDIENTE', 'EN REVISIÓN', 'REQUIERE INFO', 'APROBADA', 'RECHAZADA'];
  const priorityOptions = ['ALTA', 'MEDIA', 'BAJA'];
  const regionOptions = ['Norte', 'Centro', 'Sur', 'Metropolitana', 'Occidente'];
  const typeOptions = ['PATENTE ADUANAL', 'OPINIÓN SAT', 'CÉDULA PROFESIONAL', 'PODER NOTARIAL', 'CONSTANCIA FISCAL'];
  const categoryOptions = ['Regulatoria', 'Fiscal', 'Legal', 'Profesional'];

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

  const getDaysColor = (days) => {
    if (days <= 2) return colors.status.error;
    if (days <= 4) return colors.status.warning;
    return colors.status.success;
  };

  const getComplianceColor = (score) => {
    if (score >= 85) return colors.status.success;
    if (score >= 70) return colors.status.warning;
    return colors.status.error;
  };

  // Filtrado y ordenamiento
  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = 
      cert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || cert.priority === filterPriority;
    const matchesRegion = filterRegion === 'all' || cert.region === filterRegion;
    const matchesType = filterType === 'all' || cert.type === filterType;

    return matchesSearch && matchesStatus && matchesPriority && matchesRegion && matchesType;
  });

  // Ordenamiento
  const sortedCertifications = [...filteredCertifications].sort((a, b) => {
    switch(sortBy) {
      case 'priority':
        const priorityOrder = { 'ALTA': 0, 'MEDIA': 1, 'BAJA': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'days':
        return a.daysPending - b.daysPending;
      case 'date':
        return new Date(b.uploadDate.split('/').reverse().join('-')) - 
               new Date(a.uploadDate.split('/').reverse().join('-'));
      case 'compliance':
        return b.applicant.complianceScore - a.applicant.complianceScore;
      default:
        return 0;
    }
  });

  // Manejo de selección múltiple
  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === sortedCertifications.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedCertifications.map(cert => cert.id));
    }
  };

  const handleBatchAction = (action) => {
    console.log(`Acción ${action} en certificaciones:`, selectedRows);
    setBatchActionDialog(false);
    setSelectedRows([]);
  };

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
            <Typography variant="h5" sx={{ color: colors.primary.dark, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
              <GavelIcon sx={{ color: colors.primary.main }} />
              Revisión de Certificaciones
            </Typography>
            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
              Validación individual de certificaciones - Comité de Cumplimiento
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              sx={{
                borderColor: colors.primary.light,
                color: colors.primary.main,
                '&:hover': {
                  borderColor: colors.primary.main,
                  bgcolor: 'rgba(19, 59, 107, 0.04)',
                }
              }}
            >
              Exportar
            </Button>
            {selectedRows.length > 0 && (
              <Button
                variant="contained"
                size="small"
                startIcon={<AssignmentIcon />}
                onClick={() => setBatchActionDialog(true)}
                sx={{ 
                  bgcolor: colors.primary.main,
                  '&:hover': { bgcolor: colors.primary.dark }
                }}
              >
                Acciones ({selectedRows.length})
              </Button>
            )}
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
                  }}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  {statusOptions.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  }}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  {priorityOptions.map(priority => (
                    <MenuItem key={priority} value={priority}>{priority}</MenuItem>
                  ))}
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
                  }}
                >
                  <MenuItem value="all">Todas</MenuItem>
                  {regionOptions.map(region => (
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
                    onClick={() => setActiveView(activeView === 'list' ? 'grid' : 'list')}
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
                      {typeOptions.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
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
                      <MenuItem value="compliance">Cumplimiento</MenuItem>
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
                      {categoryOptions.map(cat => (
                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Button
                    fullWidth
                    size="small"
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={() => {
                      setFilterStatus('all');
                      setFilterPriority('all');
                      setFilterRegion('all');
                      setFilterType('all');
                      setSearchTerm('');
                      setSortBy('priority');
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

      {/* Contenido Principal - Tabla Expandida */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* KPI Rápidas - Fila superior */}
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
              label: 'Asignadas a mí', 
              value: stats.assignedToMe, 
              color: colors.primary.main, 
              icon: <AssignmentIcon />,
              tooltip: 'Certificaciones asignadas a tu usuario'
            },
            { 
              label: 'Alta Prioridad', 
              value: stats.highPriority, 
              color: colors.accents.purple, 
              icon: <WarningIcon />,
              tooltip: 'Certificaciones con prioridad ALTA'
            },
            { 
              label: 'Tiempo Prom.', 
              value: stats.avgReviewTime, 
              color: colors.accents.blue, 
              icon: <SpeedIcon />,
              tooltip: 'Tiempo promedio de revisión'
            },
            { 
              label: 'Total', 
              value: stats.total, 
              color: colors.status.success, 
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

        {/* Tabla de Certificaciones - OCUPA TODO EL ESPACIO DISPONIBLE */}
        <Paper elevation={1} sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          border: `1px solid ${colors.primary.light}20`,
        }}>
          <Box sx={{ 
            p: 2, 
            borderBottom: `1px solid ${colors.primary.light}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: colors.background.subtle
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
              {sortedCertifications.length} certificaciones para revisión
            </Typography>
            
            <Stack direction="row" spacing={1} alignItems="center">
              {selectedRows.length > 0 && (
                <Chip 
                  label={`${selectedRows.length} seleccionadas`}
                  size="small"
                  sx={{
                    bgcolor: colors.primary.main,
                    color: 'white',
                    height: 20,
                    fontSize: '0.7rem'
                  }}
                  onDelete={() => setSelectedRows([])}
                />
              )}
              <IconButton size="small" sx={{ color: colors.text.secondary }}>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* Tabla - Scroll Interno */}
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <TableContainer>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ width: 40 }}>
                      <Tooltip title="Seleccionar todo">
                        <input
                          type="checkbox"
                          checked={selectedRows.length === sortedCertifications.length && sortedCertifications.length > 0}
                          onChange={handleSelectAll}
                          style={{ cursor: 'pointer' }}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '25%', color: colors.primary.dark }}>Certificación</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '20%', color: colors.primary.dark }}>Solicitante</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '10%', color: colors.primary.dark }}>Estado</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '15%', color: colors.primary.dark }}>Tiempo</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '10%', color: colors.primary.dark }}>Documentos</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', width: '20%', color: colors.primary.dark }} align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedCertifications.map((cert) => (
                    <TableRow 
                      key={cert.id} 
                      hover
                      selected={selectedRows.includes(cert.id)}
                      onClick={() => handleRowSelect(cert.id)}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(58, 110, 165, 0.04)' },
                        borderLeft: `4px solid ${cert.color}`,
                        bgcolor: selectedRows.includes(cert.id) ? 'rgba(58, 110, 165, 0.08)' : 'transparent'
                      }}
                    >
                      <TableCell padding="checkbox">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(cert.id)}
                          onChange={() => handleRowSelect(cert.id)}
                          onClick={(e) => e.stopPropagation()}
                          style={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                      
                      <TableCell>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                            {cert.type}
                          </Typography>
                          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                            <Typography variant="caption" sx={{ color: colors.text.secondary, fontFamily: 'monospace' }}>
                              {cert.code}
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
                              bgcolor: colors.primary.main
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
                                    bgcolor: getComplianceColor(cert.applicant.complianceScore)
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
                            Est: {cert.reviewEstimate}
                          </Typography>
                        </Box>
                      </TableCell>
                      
                      <TableCell>
                        <Tooltip title={`${cert.documents.completed}/${cert.documents.total} documentos`}>
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
                          <Tooltip title="Ver detalles">
                            <IconButton 
                              size="small"
                              component={Link}
                              to={`/committee/review/${cert.id}`}
                              onClick={(e) => e.stopPropagation()}
                              sx={{ color: colors.text.secondary }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
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
                                '&:hover': { bgcolor: colors.primary.dark },
                                minWidth: 'auto',
                                px: 1.5
                              }}
                            >
                              Revisar
                            </Button>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {sortedCertifications.length === 0 && (
              <Box sx={{ p: 8, textAlign: 'center' }}>
                <FolderOpenIcon sx={{ fontSize: 60, color: colors.primary.light, mb: 2 }} />
                <Typography variant="h6" sx={{ color: colors.text.secondary, mb: 1 }}>
                  No hay certificaciones que coincidan
                </Typography>
                <Typography variant="body2" sx={{ color: colors.primary.light }}>
                  Intenta ajustar los filtros de búsqueda
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Diálogo de Acciones Masivas */}
      <Dialog 
        open={batchActionDialog} 
        onClose={() => setBatchActionDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            border: `1px solid ${colors.primary.light}`,
          }
        }}
      >
        <DialogTitle sx={{ color: colors.primary.dark }}>
          Acciones en Lote ({selectedRows.length} certificaciones)
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 3, color: colors.text.secondary }}>
            Selecciona una acción para aplicar a todas las certificaciones seleccionadas:
          </Typography>
          
          <Grid container spacing={2}>
            {[
              { icon: <AssignmentIcon />, label: 'Asignar a', color: colors.accents.blue },
              { icon: <CheckCircleIcon />, label: 'Marcar como revisadas', color: colors.status.success },
              { icon: <WarningIcon />, label: 'Cambiar prioridad', color: colors.status.warning },
              { icon: <DownloadIcon />, label: 'Exportar selección', color: colors.accents.purple },
            ].map((action, idx) => (
              <Grid item xs={6} key={idx}>
                <Card 
                  sx={{ 
                    p: 2, 
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: `1px solid ${colors.primary.light}`,
                    '&:hover': {
                      borderColor: action.color,
                      bgcolor: `${action.color}10`
                    }
                  }}
                  onClick={() => handleBatchAction(action.label.toLowerCase())}
                >
                  <Box sx={{ color: action.color, mb: 1 }}>
                    {action.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium', color: colors.primary.dark }}>
                    {action.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Alert severity="info" sx={{ 
            mt: 3, 
            fontSize: '0.8rem',
            bgcolor: 'rgba(58, 110, 165, 0.08)',
            color: colors.primary.dark,
            '& .MuiAlert-icon': {
              color: colors.primary.main
            }
          }}>
            Esta acción se aplicará a {selectedRows.length} certificaciones seleccionadas.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setBatchActionDialog(false)}
            sx={{ color: colors.text.secondary }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => setBatchActionDialog(false)}
            variant="outlined"
            sx={{
              borderColor: colors.primary.light,
              color: colors.primary.main,
              '&:hover': {
                borderColor: colors.primary.main,
                bgcolor: 'rgba(19, 59, 107, 0.04)',
              }
            }}
          >
            Continuar después
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommitteeReview;