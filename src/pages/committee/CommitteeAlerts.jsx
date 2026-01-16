// src/pages/committee/CommitteeAlerts.jsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  IconButton,
  Tabs,
  Tab,
  Divider,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  // NUEVOS COMPONENTES
  Badge,
  Tooltip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Event as EventIcon,
  FilterList as FilterIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  MarkEmailRead as MarkReadIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon,
  OpenInNew as OpenInNewIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  // NUEVOS ICONOS - AGREGAR PlaceIcon AQUÍ
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  AutoDelete as AutoDeleteIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  CircleNotifications as CircleNotificationsIcon,
  ExpandMore as ExpandMoreIcon,
  Speed as SpeedIcon,
  Insights as InsightsIcon,
  Place as PlaceIcon  // <-- AGREGAR ESTA LÍNEA
} from '@mui/icons-material';

const CommitteeAlerts = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('unread');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [notificationSettings, setNotificationSettings] = useState({
    vencimientos: true,
    rechazos: true,
    observaciones: true,
    asignaciones: true,
    aprobaciones: true,
    email: true,
    push: false
  });

  // Datos mock de alertas mejoradas
  const alerts = [
    { 
      id: 1, 
      type: 'warning', 
      title: 'Vencimiento Próximo', 
      message: 'Certificación de Patente Aduanal vence en 2 días. Se requiere acción inmediata para evitar incumplimiento.', 
      date: '15/01/2026 10:30', 
      time: 'Hace 2 horas',
      read: false,
      priority: 'alta',
      source: 'PATENTE ADUANAL',
      certificationNumber: 'PA-2026-00145',
      user: { name: 'Luis Rodríguez', avatar: 'LR', type: 'Agente Aduanal' },
      region: 'Norte',
      actions: ['review', 'extend', 'contact'],
      requiresAction: true,
      deadline: '17/01/2026',
      category: 'vencimiento'
    },
    { 
      id: 2, 
      type: 'error', 
      title: 'Certificación Rechazada', 
      message: 'La certificación de Opinión SAT fue rechazada por documentos incompletos. El solicitante ha sido notificado y requiere cargar documentación faltante.', 
      date: '14/01/2026 15:45', 
      time: 'Hace 1 día',
      read: false,
      priority: 'alta',
      source: 'OPINIÓN SAT',
      certificationNumber: 'OS-2025-03421',
      user: { name: 'Ana López', avatar: 'AL', type: 'Profesionista' },
      region: 'Centro',
      actions: ['review', 'contact'],
      requiresAction: true,
      category: 'rechazo'
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'Nueva Asignación', 
      message: 'Se te ha asignado una nueva certificación para revisión: Cédula Profesional del solicitante Carlos Martínez.', 
      date: '14/01/2026 09:15', 
      time: 'Hace 1 día',
      read: true,
      priority: 'media',
      source: 'Sistema',
      certificationNumber: 'CP-2024-56789',
      user: { name: 'Carlos Martínez', avatar: 'CM', type: 'Profesionista' },
      region: 'Sur',
      actions: ['review'],
      requiresAction: true,
      category: 'asignacion'
    },
    { 
      id: 4, 
      type: 'warning', 
      title: 'Observación Pendiente', 
      message: 'La certificación de Cédula Profesional requiere información adicional. El solicitante ha sido contactado.', 
      date: '13/01/2026 16:20', 
      time: 'Hace 2 días',
      read: false,
      priority: 'media',
      source: 'CÉDULA PROFESIONAL',
      certificationNumber: 'CP-2024-56789',
      user: { name: 'Carlos Martínez', avatar: 'CM', type: 'Profesionista' },
      region: 'Sur',
      actions: ['review', 'contact'],
      requiresAction: true,
      category: 'observacion'
    },
    { 
      id: 5, 
      type: 'success', 
      title: 'Certificación Aprobada', 
      message: 'Tu revisión de la certificación de Poder Notarial ha sido completada y aprobada exitosamente.', 
      date: '12/01/2026 11:10', 
      time: 'Hace 3 días',
      read: true,
      priority: 'baja',
      source: 'PODER NOTARIAL',
      certificationNumber: 'PN-2025-12345',
      user: { name: 'María González', avatar: 'MG', type: 'Empresario' },
      region: 'Metropolitana',
      actions: ['view'],
      requiresAction: false,
      category: 'aprobacion'
    },
    { 
      id: 6, 
      type: 'error', 
      title: 'Error en Sistema', 
      message: 'Problema de sincronización detectado en los documentos de Constancia Fiscal. El equipo técnico está trabajando en la solución.', 
      date: '11/01/2026 14:05', 
      time: 'Hace 4 días',
      read: true,
      priority: 'alta',
      source: 'Sistema',
      certificationNumber: null,
      user: null,
      region: null,
      actions: ['dismiss'],
      requiresAction: false,
      category: 'sistema'
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setExpandedAlert(null);
  };

  const handleAlertClick = (id) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };

  const handleMarkAsRead = (id, e) => {
    e.stopPropagation();
    // Lógica para marcar como leída
    console.log('Marcar como leída:', id);
  };

  const handleQuickAction = (alert, action, e) => {
    e.stopPropagation();
    switch(action) {
      case 'review':
        window.location.href = `/committee/review/${alert.certificationNumber?.split('-')[2]}`;
        break;
      case 'extend':
        console.log('Extender certificación:', alert.id);
        break;
      case 'contact':
        console.log('Contactar solicitante:', alert.user?.name);
        break;
      case 'dismiss':
        console.log('Descartar alerta:', alert.id);
        break;
      default:
        break;
    }
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return <WarningIcon />;
      case 'error': return <ErrorIcon />;
      case 'info': return <InfoIcon />;
      case 'success': return <CheckCircleIcon />;
      default: return <NotificationsIcon />;
    }
  };

  const getAlertColor = (type) => {
    switch(type) {
      case 'warning': return '#f39c12';
      case 'error': return '#e74c3c';
      case 'info': return '#3498db';
      case 'success': return '#27ae60';
      default: return '#7f8c8d';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'alta': return <ErrorIcon fontSize="small" />;
      case 'media': return <WarningIcon fontSize="small" />;
      case 'baja': return <InfoIcon fontSize="small" />;
      default: return null;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesTab = 
      tabValue === 0 ? true : // Todas
      tabValue === 1 ? !alert.read : // No leídas
      tabValue === 2 ? alert.priority === 'alta' : // Urgentes
      tabValue === 3 ? alert.type === 'success' : // Completadas
      tabValue === 4 ? alert.requiresAction : // Requieren acción
      true;
    
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'read' ? alert.read : !alert.read);
    const matchesPriority = filterPriority === 'all' || alert.priority === filterPriority;
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.user?.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesType && matchesStatus && matchesPriority && matchesSearch;
  });

  const stats = {
    total: alerts.length,
    unread: alerts.filter(a => !a.read).length,
    requiresAction: alerts.filter(a => a.requiresAction).length,
    urgent: alerts.filter(a => a.priority === 'alta').length,
    today: alerts.filter(a => a.time.includes('horas')).length,
    warnings: alerts.filter(a => a.type === 'warning').length,
    errors: alerts.filter(a => a.type === 'error').length
  };

  const categoryStats = {
    vencimiento: alerts.filter(a => a.category === 'vencimiento').length,
    rechazo: alerts.filter(a => a.category === 'rechazo').length,
    asignacion: alerts.filter(a => a.category === 'asignacion').length,
    observacion: alerts.filter(a => a.category === 'observacion').length,
    aprobacion: alerts.filter(a => a.category === 'aprobacion').length
  };

  const tabs = [
    { label: 'Todas', value: 0, badge: stats.total },
    { label: 'No Leídas', value: 1, badge: stats.unread, color: 'error' },
    { label: 'Urgentes', value: 2, badge: stats.urgent, color: 'warning' },
    { label: 'Pendientes', value: 4, badge: stats.requiresAction, color: 'info' },
    { label: 'Resueltas', value: 3, badge: alerts.length - stats.requiresAction }
  ];

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      p: 2
    }}>
      {/* Header Compacto */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
              <NotificationsIcon sx={{ color: '#1a237e' }} />
              Centro de Alertas
            </Typography>
            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
              Monitoreo y gestión de notificaciones del sistema
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
            >
              Exportar
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<SettingsIcon />}
              onClick={() => setShowSettings(true)}
            >
              Configurar
            </Button>
          </Stack>
        </Box>

        {/* Filtros Rápidos en Línea */}
        <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: '#f8f9fa' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar alertas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm('')}>
                        <RefreshIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                size="small"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label="Tipo"
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="warning">Advertencias</MenuItem>
                <MenuItem value="error">Errores</MenuItem>
                <MenuItem value="info">Información</MenuItem>
                <MenuItem value="success">Completadas</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                size="small"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                label="Prioridad"
              >
                <MenuItem value="all">Todas</MenuItem>
                <MenuItem value="alta">Alta</MenuItem>
                <MenuItem value="media">Media</MenuItem>
                <MenuItem value="baja">Baja</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <TextField
                select
                fullWidth
                size="small"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Estado"
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="unread">No leídas</MenuItem>
                <MenuItem value="read">Leídas</MenuItem>
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setFilterType('all');
                  setFilterStatus('unread');
                  setFilterPriority('all');
                  setSearchTerm('');
                  setTabValue(0);
                }}
              >
                Limpiar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Contenido Principal */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Columna Izquierda - 70% */}
          <Grid item xs={12} lg={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Tabs Compactas */}
            <Paper elevation={1} sx={{ mb: 2 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ minHeight: 48 }}
              >
                {tabs.map((tab) => (
                  <Tab 
                    key={tab.value}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {tab.label}
                        {tab.badge > 0 && (
                          <Chip 
                            label={tab.badge}
                            size="small"
                            color={tab.color || 'default'}
                            sx={{ height: 20, minWidth: 20 }}
                          />
                        )}
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Paper>

            {/* Lista de Alertas - Scroll Interno */}
            <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Box sx={{ 
                p: 2, 
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  {filteredAlerts.length} alertas encontradas
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Marcar todas como leídas">
                    <IconButton size="small">
                      <MarkReadIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Configurar vista">
                    <IconButton size="small">
                      <SortIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>

              <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
                {filteredAlerts.map((alert) => (
                  <Card 
                    key={alert.id}
                    elevation={0}
                    sx={{
                      mb: 1,
                      borderLeft: `4px solid ${getAlertColor(alert.type)}`,
                      bgcolor: alert.read ? 'transparent' : '#f8f9fa',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f0f0f0' },
                      transition: 'all 0.2s'
                    }}
                    onClick={() => handleAlertClick(alert.id)}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box sx={{ color: getAlertColor(alert.type) }}>
                                {getAlertIcon(alert.type)}
                              </Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                {alert.title}
                              </Typography>
                              {alert.priority === 'alta' && !alert.read && (
                                <Chip 
                                  icon={getPriorityIcon(alert.priority)}
                                  label="URGENTE"
                                  size="small"
                                  color="error"
                                  sx={{ height: 20, fontSize: '0.65rem' }}
                                />
                              )}
                            </Box>
                            
                            <Stack direction="row" spacing={0.5}>
                              {!alert.read && (
                                <Tooltip title="Marcar como leída">
                                  <IconButton 
                                    size="small"
                                    onClick={(e) => handleMarkAsRead(alert.id, e)}
                                  >
                                    <MarkReadIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                              <IconButton size="small">
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="body2" sx={{ color: '#5a6c7d', mb: 1.5 }}>
                            {alert.message}
                          </Typography>
                        </Grid>

                        {/* Información Compacta */}
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                              {alert.user && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                    {alert.user.avatar}
                                  </Avatar>
                                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                    {alert.user.name}
                                  </Typography>
                                </Box>
                              )}
                              
                              {alert.certificationNumber && (
                                <Chip 
                                  label={alert.certificationNumber}
                                  size="small"
                                  variant="outlined"
                                  sx={{ height: 20 }}
                                />
                              )}
                              
                              {alert.region && (
                                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                  <PlaceIcon sx={{ fontSize: '0.8rem', verticalAlign: 'middle', mr: 0.5 }} />
                                  {alert.region}
                                </Typography>
                              )}
                            </Stack>
                            
                            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                              <EventIcon sx={{ fontSize: '0.8rem', verticalAlign: 'middle', mr: 0.5 }} />
                              {alert.time}
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Panel Expandible */}
                        {expandedAlert === alert.id && (
                          <Grid item xs={12} sx={{ mt: 2, pt: 2, borderTop: '1px dashed #e0e0e0' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#7f8c8d' }}>
                                ACCIONES DISPONIBLES:
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                {alert.actions.includes('review') && alert.certificationNumber && (
                                  <Button
                                    size="small"
                                    variant="contained"
                                    startIcon={<OpenInNewIcon />}
                                    onClick={(e) => handleQuickAction(alert, 'review', e)}
                                    sx={{ bgcolor: '#1a237e' }}
                                  >
                                    Revisar
                                  </Button>
                                )}
                                {alert.actions.includes('extend') && (
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={(e) => handleQuickAction(alert, 'extend', e)}
                                  >
                                    Extender
                                  </Button>
                                )}
                                {alert.actions.includes('contact') && (
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={(e) => handleQuickAction(alert, 'contact', e)}
                                  >
                                    Contactar
                                  </Button>
                                )}
                              </Stack>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                ))}

                {filteredAlerts.length === 0 && (
                  <Box sx={{ p: 8, textAlign: 'center' }}>
                    <CircleNotificationsIcon sx={{ fontSize: 60, color: '#bdc3c7', mb: 2 }} />
                    <Typography variant="h6" sx={{ color: '#7f8c8d', mb: 1 }}>
                      No hay alertas que coincidan
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#95a5a6' }}>
                      Intenta ajustar los filtros de búsqueda
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Columna Derecha - 30% - Paneles Informativos */}
          <Grid item xs={12} lg={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Estadísticas Rápidas */}
            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 1 }}>
                <InsightsIcon /> Resumen de Estado
              </Typography>
              
              <Grid container spacing={1.5}>
                {[
                  { label: 'Sin Leer', value: stats.unread, color: '#e74c3c', icon: <NotificationsIcon /> },
                  { label: 'Urgentes', value: stats.urgent, color: '#f39c12', icon: <TimerIcon /> },
                  { label: 'Pendientes', value: stats.requiresAction, color: '#3498db', icon: <AssignmentTurnedInIcon /> },
                  { label: 'Hoy', value: stats.today, color: '#27ae60', icon: <SpeedIcon /> },
                ].map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                      }}>
                        <Box sx={{ color: stat.color, mb: 1 }}>
                          {stat.icon}
                        </Box>
                        <Typography variant="h5" sx={{ color: stat.color, fontWeight: 'bold', lineHeight: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Distribución por Categoría */}
            <Paper elevation={1} sx={{ p: 2, mb: 2, flex: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUpIcon /> Distribución
              </Typography>
              
              <Stack spacing={1.5}>
                {Object.entries(categoryStats).map(([category, count]) => {
                  const percentage = (count / stats.total) * 100;
                  const colors = {
                    vencimiento: '#f39c12',
                    rechazo: '#e74c3c',
                    asignacion: '#3498db',
                    observacion: '#9b59b6',
                    aprobacion: '#27ae60'
                  };
                  
                  return (
                    <Box key={category}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ textTransform: 'capitalize', color: '#5a6c7d' }}>
                          {category}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: colors[category] }}>
                          {count} ({percentage.toFixed(0)}%)
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={percentage}
                        sx={{ 
                          height: 4,
                          borderRadius: 2,
                          bgcolor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: colors[category]
                          }
                        }}
                      />
                    </Box>
                  );
                })}
              </Stack>
            </Paper>

            {/* Acciones Rápidas */}
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
                Acciones Rápidas
              </Typography>
              
              <Stack spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<MarkReadIcon />}
                  disabled={stats.unread === 0}
                  sx={{ justifyContent: 'flex-start', bgcolor: '#1a237e' }}
                >
                  Marcar todas como leídas
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Descargar reporte
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AutoDeleteIcon />}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Limpiar antiguas
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                  onClick={() => setShowSettings(true)}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Configurar notificaciones
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Diálogo de Configuración */}
      <Dialog open={showSettings} onClose={() => setShowSettings(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsIcon />
            Configuración de Alertas
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold', color: '#2c3e50' }}>
            Tipos de alertas a recibir:
          </Typography>
          
          <Grid container spacing={2}>
            {[
              { key: 'vencimientos', label: 'Vencimientos próximos', icon: <TimerIcon /> },
              { key: 'rechazos', label: 'Certificaciones rechazadas', icon: <ErrorIcon /> },
              { key: 'observaciones', label: 'Observaciones pendientes', icon: <WarningIcon /> },
              { key: 'asignaciones', label: 'Nuevas asignaciones', icon: <AssignmentTurnedInIcon /> },
              { key: 'aprobaciones', label: 'Aprobaciones completadas', icon: <CheckCircleIcon /> },
            ].map((item) => (
              <Grid item xs={12} key={item.key}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ color: '#1a237e' }}>
                        {item.icon}
                      </Box>
                      <Typography>{item.label}</Typography>
                    </Box>
                    <Switch
                      checked={notificationSettings[item.key]}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        [item.key]: e.target.checked
                      })}
                      color="primary"
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold', color: '#2c3e50' }}>
            Métodos de entrega:
          </Typography>
          
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.email}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    email: e.target.checked
                  })}
                />
              }
              label={
                <Box>
                  <Typography>Notificaciones por correo</Typography>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Recibe alertas importantes en tu correo electrónico
                  </Typography>
                </Box>
              }
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={notificationSettings.push}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    push: e.target.checked
                  })}
                />
              }
              label={
                <Box>
                  <Typography>Notificaciones en sistema</Typography>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Alertas push mientras usas la plataforma
                  </Typography>
                </Box>
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSettings(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={() => setShowSettings(false)}
            sx={{ bgcolor: '#1a237e' }}
          >
            Guardar Configuración
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommitteeAlerts;