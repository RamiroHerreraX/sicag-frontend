// src/pages/admin/GeneralAlerts.jsx
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
  TextField,
  MenuItem,
  Avatar,
  InputAdornment,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Event as EventIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  OpenInNew as OpenInNewIcon,
  MoreVert as MoreVertIcon,
  MarkEmailRead as MarkReadIcon,
  Sort as SortIcon,
  CircleNotifications as CircleNotificationsIcon,
  Place as PlaceIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  Description as DescriptionIcon,
  Folder as FolderIcon,
  Security as SecurityIcon,
  Payment as PaymentIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  WarningAmber as WarningAmberIcon,
  AdminPanelSettings as AdminPanelSettingsIcon  // Esta es la importación que faltaba
} from '@mui/icons-material';

// Paleta corporativa del primer código
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
    success: '#00A8A8',      // Verde del corporativo
    warning: '#F39C12',       // Amarillo/naranja para advertencias
    error: '#E74C3C',         // Rojo para errores
    info: '#3A6EA5'           // Azul info
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  }
};

const GeneralAlerts = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('unread');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAlert, setExpandedAlert] = useState(null);

  // Datos mock de alertas generales del sistema
  const alerts = [
    { 
      id: 1, 
      type: 'error', 
      title: 'Error de Conexión con SAT', 
      message: 'El servicio de validación del SAT no responde. Se están reintentando las solicitudes automáticamente.', 
      date: '22/02/2026 09:15', 
      time: 'Hace 15 minutos',
      read: false,
      priority: 'alta',
      source: 'Sistema SAT',
      module: 'Validación Fiscal',
      affectedUsers: 234,
      actions: ['monitor', 'dismiss'],
      requiresAction: false,
      category: 'sistema'
    },
    { 
      id: 2, 
      type: 'warning', 
      title: 'Vencimientos Masivos Próximos', 
      message: '45 certificaciones vencen en los próximos 7 días. 12 de ellas requieren revisión de comité.', 
      date: '22/02/2026 08:30', 
      time: 'Hace 1 hora',
      read: false,
      priority: 'alta',
      source: 'Sistema de Certificaciones',
      module: 'Vencimientos',
      details: {
        total: 45,
        committee: 12,
        urgent: 8
      },
      actions: ['view', 'export'],
      requiresAction: true,
      category: 'vencimiento'
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'Mantenimiento Programado', 
      message: 'El sistema estará en mantenimiento el sábado 25 de febrero de 02:00 a 06:00 hrs.', 
      date: '21/02/2026 14:20', 
      time: 'Ayer',
      read: true,
      priority: 'media',
      source: 'Administración',
      module: 'Sistema',
      actions: ['dismiss', 'remind'],
      requiresAction: false,
      category: 'mantenimiento'
    },
    { 
      id: 4, 
      type: 'warning', 
      title: 'Documentos Pendientes de Revisión', 
      message: 'Hay 23 documentos en espera de revisión por comité. Tiempo promedio de espera: 3.5 días.', 
      date: '21/02/2026 11:45', 
      time: 'Ayer',
      read: false,
      priority: 'media',
      source: 'Comité de Revisión',
      module: 'Documentos',
      details: {
        pending: 23,
        avgWait: '3.5 días'
      },
      actions: ['review', 'assign'],
      requiresAction: true,
      category: 'revision'
    },
    { 
      id: 5, 
      type: 'success', 
      title: 'Actualización Completada', 
      message: 'La actualización del sistema a la versión 2.5.0 se completó exitosamente. Nuevas funcionalidades disponibles.', 
      date: '20/02/2026 16:10', 
      time: 'Hace 2 días',
      read: true,
      priority: 'baja',
      source: 'Sistema',
      module: 'Actualizaciones',
      actions: ['view'],
      requiresAction: false,
      category: 'sistema'
    },
    { 
      id: 6, 
      type: 'error', 
      title: 'Error en Carga de Documentos', 
      message: 'Se detectaron errores en la carga de 15 documentos del módulo de expedientes. Los usuarios afectados han sido notificados.', 
      date: '20/02/2026 10:30', 
      time: 'Hace 2 días',
      read: false,
      priority: 'alta',
      source: 'Módulo Expedientes',
      module: 'Documentos',
      affectedUsers: 15,
      actions: ['review', 'retry'],
      requiresAction: true,
      category: 'error'
    },
    { 
      id: 7, 
      type: 'info', 
      title: 'Nuevo Rol Creado', 
      message: 'Se ha creado el rol "Supervisor Regional" con permisos específicos para 5 regiones.', 
      date: '19/02/2026 09:20', 
      time: 'Hace 3 días',
      read: true,
      priority: 'baja',
      source: 'Administración',
      module: 'Usuarios',
      actions: ['view'],
      requiresAction: false,
      category: 'usuario'
    },
    { 
      id: 8, 
      type: 'warning', 
      title: 'Límite de Almacenamiento', 
      message: 'El almacenamiento del sistema está al 85%. Considere archivar documentos antiguos o ampliar capacidad.', 
      date: '18/02/2026 15:40', 
      time: 'Hace 4 días',
      read: false,
      priority: 'media',
      source: 'Sistema',
      module: 'Almacenamiento',
      details: {
        used: '85%',
        total: '500GB',
        available: '75GB'
      },
      actions: ['view', 'dismiss'],
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
      case 'view':
        console.log('Ver detalles:', alert.id);
        break;
      case 'export':
        console.log('Exportar datos');
        break;
      case 'review':
        console.log('Revisar documentos');
        break;
      case 'assign':
        console.log('Asignar revisores');
        break;
      case 'monitor':
        console.log('Monitorear servicio');
        break;
      case 'retry':
        console.log('Reintentar procesos');
        break;
      case 'dismiss':
        console.log('Descartar alerta:', alert.id);
        break;
      case 'remind':
        console.log('Recordar después');
        break;
      default:
        break;
    }
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return <WarningAmberIcon sx={{ color: colors.status.warning }} />;
      case 'error': return <ErrorIcon sx={{ color: colors.status.error }} />;
      case 'info': return <InfoIcon sx={{ color: colors.status.info }} />;
      case 'success': return <CheckCircleIcon sx={{ color: colors.status.success }} />;
      default: return <NotificationsIcon sx={{ color: colors.text.secondary }} />;
    }
  };

  const getAlertColor = (type) => {
    switch(type) {
      case 'warning': return colors.status.warning;
      case 'error': return colors.status.error;
      case 'info': return colors.status.info;
      case 'success': return colors.status.success;
      default: return colors.text.secondary;
    }
  };

  const getModuleIcon = (module) => {
    switch(module) {
      case 'Validación Fiscal':
      case 'Vencimientos':
        return <SecurityIcon fontSize="small" />;
      case 'Documentos':
      case 'Expedientes':
        return <DescriptionIcon fontSize="small" />;
      case 'Usuarios':
        return <PersonIcon fontSize="small" />;
      case 'Sistema':
      case 'Almacenamiento':
        return <FolderIcon fontSize="small" />;
      case 'Actualizaciones':
        return <RefreshIcon fontSize="small" />;
      default:
        return <AssignmentIcon fontSize="small" />;
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'alta': return <ErrorIcon fontSize="small" sx={{ color: colors.status.error }} />;
      case 'media': return <WarningIcon fontSize="small" sx={{ color: colors.status.warning }} />;
      case 'baja': return <InfoIcon fontSize="small" sx={{ color: colors.status.info }} />;
      default: return null;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesTab = 
      tabValue === 0 ? true : // Todas
      tabValue === 1 ? !alert.read : // No leídas
      tabValue === 2 ? alert.priority === 'alta' : // Urgentes
      tabValue === 3 ? alert.type === 'success' : // Completadas
      true;
    
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'read' ? alert.read : !alert.read);
    const matchesPriority = filterPriority === 'all' || alert.priority === filterPriority;
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesType && matchesStatus && matchesPriority && matchesSearch;
  });

  const stats = {
    total: alerts.length,
    unread: alerts.filter(a => !a.read).length,
    requiresAction: alerts.filter(a => a.requiresAction).length,
    urgent: alerts.filter(a => a.priority === 'alta').length,
    today: alerts.filter(a => a.time.includes('minutos') || a.time.includes('hora')).length,
    warnings: alerts.filter(a => a.type === 'warning').length,
    errors: alerts.filter(a => a.type === 'error').length
  };

  const tabs = [
    { label: 'Todas', value: 0, badge: stats.total },
    { label: 'No Leídas', value: 1, badge: stats.unread },
    { label: 'Urgentes', value: 2, badge: stats.urgent },
    { label: 'Resueltas', value: 3, badge: stats.total - stats.requiresAction }
  ];

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 2.5,
      backgroundColor: '#f5f7fa'
    }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: colors.primary.dark, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Badge badgeContent={stats.unread} color="error">
                <NotificationsIcon sx={{ color: colors.primary.main }} />
              </Badge>
              Centro de Notificaciones
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Alertas y notificaciones generales del sistema
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Chip
                icon={<AdminPanelSettingsIcon />}
                label="Panel de Control"
                size="small"
                sx={{ 
                  bgcolor: colors.primary.dark,
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                Monitoreo en tiempo real
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Filtros */}
        <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'white', borderRadius: '8px' }}>
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
                      <SearchIcon fontSize="small" sx={{ color: colors.text.secondary }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm('')}>
                        <RefreshIcon fontSize="small" sx={{ color: colors.text.secondary }} />
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
                sx={{
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.primary.main
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.primary.main
                  }
                }}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="warning">Advertencias</MenuItem>
                <MenuItem value="error">Errores</MenuItem>
                <MenuItem value="info">Información</MenuItem>
                <MenuItem value="success">Éxito</MenuItem>
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
                sx={{
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.primary.main
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.primary.main
                  }
                }}
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
                sx={{
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.primary.main
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.primary.main
                  }
                }}
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
                sx={{
                  borderColor: colors.primary.main,
                  color: colors.primary.main,
                  '&:hover': {
                    borderColor: colors.primary.dark,
                    bgcolor: 'rgba(19, 59, 107, 0.08)'
                  }
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
        {/* Tabs */}
        <Paper elevation={1} sx={{ mb: 2, borderRadius: '8px' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              minHeight: 48,
              '& .MuiTab-root.Mui-selected': {
                color: colors.primary.main,
                fontWeight: 'bold'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: colors.primary.main
              }
            }}
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
                        sx={{ 
                          height: 20, 
                          minWidth: 20,
                          bgcolor: tab.value === 2 ? colors.status.error : 
                                  tab.value === 1 ? colors.primary.main : 
                                  colors.text.secondary,
                          color: 'white'
                        }}
                      />
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Paper>

        {/* Lista de Alertas */}
        <Paper elevation={1} sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          borderRadius: '8px'
        }}>
          <Box sx={{ 
            p: 2, 
            borderBottom: `1px solid ${colors.primary.light}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'white'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
              {filteredAlerts.length} {filteredAlerts.length === 1 ? 'alerta encontrada' : 'alertas encontradas'}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Tooltip title="Marcar todas como leídas">
                <IconButton size="small" sx={{ color: colors.primary.main }}>
                  <MarkReadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Ordenar">
                <IconButton size="small" sx={{ color: colors.primary.main }}>
                  <SortIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', p: 1.5, bgcolor: '#f8f9fa' }}>
            {filteredAlerts.map((alert) => (
              <Card 
                key={alert.id}
                elevation={0}
                sx={{
                  mb: 1.5,
                  borderLeft: `4px solid ${getAlertColor(alert.type)}`,
                  bgcolor: alert.read ? 'white' : 'rgba(19, 59, 107, 0.04)',
                  cursor: 'pointer',
                  '&:hover': { 
                    bgcolor: 'rgba(19, 59, 107, 0.08)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 0.2s'
                }}
                onClick={() => handleAlertClick(alert.id)}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box>
                            {getAlertIcon(alert.type)}
                          </Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
                            {alert.title}
                          </Typography>
                          {alert.priority === 'alta' && !alert.read && (
                            <Chip 
                              icon={getPriorityIcon(alert.priority)}
                              label="URGENTE"
                              size="small"
                              sx={{ 
                                height: 20, 
                                fontSize: '0.65rem',
                                bgcolor: colors.status.error,
                                color: 'white'
                              }}
                            />
                          )}
                        </Box>
                        
                        <Stack direction="row" spacing={0.5}>
                          {!alert.read && (
                            <Tooltip title="Marcar como leída">
                              <IconButton 
                                size="small"
                                onClick={(e) => handleMarkAsRead(alert.id, e)}
                                sx={{ color: colors.primary.main }}
                              >
                                <MarkReadIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <IconButton size="small" sx={{ color: colors.text.secondary }}>
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 1.5 }}>
                        {alert.message}
                      </Typography>
                    </Grid>

                    {/* Información Compacta */}
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {getModuleIcon(alert.module)}
                            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                              {alert.module}
                            </Typography>
                          </Box>
                          
                          <Chip 
                            label={alert.source}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              height: 20,
                              borderColor: colors.primary.main,
                              color: colors.primary.main,
                              fontSize: '0.65rem'
                            }}
                          />
                          
                          {alert.affectedUsers && (
                            <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <GroupIcon sx={{ fontSize: '0.8rem', color: colors.primary.main }} />
                              {alert.affectedUsers} usuarios
                            </Typography>
                          )}
                        </Stack>
                        
                        <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <EventIcon sx={{ fontSize: '0.8rem', color: colors.primary.main }} />
                          {alert.time}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Detalles adicionales si existen */}
                    {alert.details && (
                      <Grid item xs={12}>
                        <Box sx={{ 
                          display: 'flex', 
                          gap: 2, 
                          flexWrap: 'wrap',
                          p: 1, 
                          bgcolor: 'rgba(19, 59, 107, 0.04)',
                          borderRadius: '4px',
                          mt: 1
                        }}>
                          {Object.entries(alert.details).map(([key, value]) => (
                            <Typography key={key} variant="caption" sx={{ color: colors.text.primary }}>
                              <strong>{key}:</strong> {value}
                            </Typography>
                          ))}
                        </Box>
                      </Grid>
                    )}

                    {/* Panel Expandible */}
                    {expandedAlert === alert.id && (
                      <Grid item xs={12} sx={{ mt: 2, pt: 2, borderTop: `1px dashed ${colors.primary.light}` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ fontWeight: 'bold', color: colors.text.secondary }}>
                            ACCIONES DISPONIBLES:
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            {alert.actions.includes('view') && (
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={<OpenInNewIcon />}
                                onClick={(e) => handleQuickAction(alert, 'view', e)}
                                sx={{ 
                                  bgcolor: colors.primary.main,
                                  '&:hover': { bgcolor: colors.primary.dark }
                                }}
                              >
                                Ver detalles
                              </Button>
                            )}
                            {alert.actions.includes('review') && (
                              <Button
                                size="small"
                                variant="contained"
                                onClick={(e) => handleQuickAction(alert, 'review', e)}
                                sx={{ 
                                  bgcolor: colors.primary.main,
                                  '&:hover': { bgcolor: colors.primary.dark }
                                }}
                              >
                                Revisar
                              </Button>
                            )}
                            {alert.actions.includes('monitor') && (
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={(e) => handleQuickAction(alert, 'monitor', e)}
                                sx={{
                                  borderColor: colors.primary.main,
                                  color: colors.primary.main,
                                  '&:hover': {
                                    borderColor: colors.primary.dark,
                                    bgcolor: 'rgba(19, 59, 107, 0.08)'
                                  }
                                }}
                              >
                                Monitorear
                              </Button>
                            )}
                            {alert.actions.includes('export') && (
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={(e) => handleQuickAction(alert, 'export', e)}
                                sx={{
                                  borderColor: colors.primary.main,
                                  color: colors.primary.main,
                                  '&:hover': {
                                    borderColor: colors.primary.dark,
                                    bgcolor: 'rgba(19, 59, 107, 0.08)'
                                  }
                                }}
                              >
                                Exportar
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
                <CircleNotificationsIcon sx={{ fontSize: 60, color: colors.text.secondary, mb: 2 }} />
                <Typography variant="h6" sx={{ color: colors.text.secondary, mb: 1 }}>
                  No hay alertas que coincidan
                </Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Intenta ajustar los filtros de búsqueda
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default GeneralAlerts;