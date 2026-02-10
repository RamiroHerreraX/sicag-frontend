// src/pages/audit/AuditLog.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  Divider,
  Avatar,
  LinearProgress,
  Pagination
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Restore as RestoreIcon,
  History as HistoryIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Gavel as GavelIcon,
  Settings as SettingsIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon,
  ArrowBack as ArrowBackIcon,
  Assignment as AssignmentIcon,
  GroupAdd as GroupAddIcon,
  Visibility as ProfileIcon,
  FileUpload as FileUploadIcon,
  PersonAdd as PersonAddIcon,
  Lock as LockIcon
} from '@mui/icons-material';

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Datos de auditoría modificados con mensajes personales
  const auditLogs = [
    {
      id: 1,
      timestamp: '15/01/2026 10:30:15',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'LOGIN_SUCCESS',
      actionName: 'Inicio de sesión exitoso',
      entity: 'Sistema',
      entityId: 'N/A',
      details: 'Inicié sesión en el sistema desde IP 192.168.1.100',
      ip: '192.168.1.100',
      severity: 'info',
      icon: <LoginIcon />
    },
    {
      id: 2,
      timestamp: '15/01/2026 09:45:22',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'CERTIFICATION_ASSIGN',
      actionName: 'Certificado asignado',
      entity: 'Certificación',
      entityId: 'CERT-2026-00145',
      details: 'Le agregué un certificado al usuario Luis Rodríguez',
      ip: '192.168.1.150',
      severity: 'success',
      icon: <AssignmentIcon />
    },
    {
      id: 3,
      timestamp: '15/01/2026 09:30:10',
      user: { name: 'Fernanda López', role: 'comite', avatar: 'FL' },
      action: 'PERMISSION_GRANT',
      actionName: 'Permisos otorgados',
      entity: 'Permisos',
      entityId: 'PERM-001',
      details: 'Fernanda me dio permisos para subir certificados',
      ip: '192.168.1.120',
      severity: 'success',
      icon: <LockIcon />
    },
    {
      id: 4,
      timestamp: '15/01/2026 08:20:18',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'PROFILE_VIEW',
      actionName: 'Perfil consultado',
      entity: 'Usuario',
      entityId: 'USR-005',
      details: 'Vi el perfil del usuario Carlos Martínez',
      ip: '192.168.1.100',
      severity: 'info',
      icon: <ProfileIcon />
    },
    {
      id: 5,
      timestamp: '14/01/2026 16:45:33',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'USER_ADD_ASSOCIATION',
      actionName: 'Usuario agregado',
      entity: 'Asociación',
      entityId: 'ASSOC-023',
      details: 'Agregué a María González a mi asociación',
      ip: '192.168.1.100',
      severity: 'success',
      icon: <GroupAddIcon />
    },
    {
      id: 6,
      timestamp: '14/01/2026 14:10:55',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'DOCUMENT_UPLOAD_SELF',
      actionName: 'Documento subido',
      entity: 'Mi Expediente',
      entityId: 'DOC-2026-78901',
      details: 'Subí un documento a mi expediente personal',
      ip: '192.168.1.130',
      severity: 'info',
      icon: <FileUploadIcon />
    },
    {
      id: 7,
      timestamp: '14/01/2026 11:30:42',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'USER_CREATE',
      actionName: 'Usuario creado',
      entity: 'Usuario',
      entityId: 'USR-012',
      details: 'Creé un nuevo usuario para Pedro Sánchez',
      ip: '192.168.1.100',
      severity: 'success',
      icon: <PersonAddIcon />
    },
    {
      id: 8,
      timestamp: '13/01/2026 18:15:28',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'LOGOUT',
      actionName: 'Sesión finalizada',
      entity: 'Sistema',
      entityId: 'N/A',
      details: 'Cerré sesión del sistema',
      ip: '192.168.1.100',
      severity: 'info',
      icon: <LogoutIcon />
    },
    {
      id: 9,
      timestamp: '13/01/2026 15:40:19',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'LOGIN_SUCCESS',
      actionName: 'Inicio de sesión',
      entity: 'Sistema',
      entityId: 'N/A',
      details: 'Inicié sesión nuevamente en el sistema',
      ip: '192.168.1.140',
      severity: 'info',
      icon: <LoginIcon />
    },
    {
      id: 10,
      timestamp: '13/01/2026 12:05:37',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'CERTIFICATION_ASSIGN',
      actionName: 'Certificado asignado',
      entity: 'Certificación',
      entityId: 'CERT-2026-00122',
      details: 'Le asigné un certificado a Ana López',
      ip: '192.168.1.150',
      severity: 'info',
      icon: <AssignmentIcon />
    },
    {
      id: 11,
      timestamp: '13/01/2026 10:15:22',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'PROFILE_VIEW',
      actionName: 'Perfil consultado',
      entity: 'Usuario',
      entityId: 'USR-003',
      details: 'Revisé el perfil de Luis Rodríguez',
      ip: '192.168.1.100',
      severity: 'info',
      icon: <ProfileIcon />
    },
    {
      id: 12,
      timestamp: '12/01/2026 17:25:44',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'USER_ADD_ASSOCIATION',
      actionName: 'Usuario agregado',
      entity: 'Asociación',
      entityId: 'ASSOC-024',
      details: 'Agregué a Juan Pérez a mi asociación',
      ip: '192.168.1.100',
      severity: 'success',
      icon: <GroupAddIcon />
    },
    {
      id: 13,
      timestamp: '12/01/2026 14:30:10',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'DOCUMENT_UPLOAD_SELF',
      actionName: 'Documento subido',
      entity: 'Mi Expediente',
      entityId: 'DOC-2026-78902',
      details: 'Subí mi certificado profesional a mi expediente',
      ip: '192.168.1.130',
      severity: 'info',
      icon: <FileUploadIcon />
    },
    {
      id: 14,
      timestamp: '12/01/2026 11:45:33',
      user: { name: 'Fernanda López', role: 'comite', avatar: 'FL' },
      action: 'PERMISSION_GRANT',
      actionName: 'Permisos otorgados',
      entity: 'Permisos',
      entityId: 'PERM-002',
      details: 'Fernanda me autorizó para gestionar certificados',
      ip: '192.168.1.120',
      severity: 'success',
      icon: <LockIcon />
    },
    {
      id: 15,
      timestamp: '12/01/2026 09:20:15',
      user: { name: 'Yo', role: 'admin', avatar: 'YO' },
      action: 'LOGIN_SUCCESS',
      actionName: 'Inicio de sesión',
      entity: 'Sistema',
      entityId: 'N/A',
      details: 'Accedí al sistema desde mi computadora',
      ip: '192.168.1.100',
      severity: 'info',
      icon: <LoginIcon />
    }
  ];

  const actionTypes = [
    { value: 'all', label: 'Todas mis acciones' },
    { value: 'LOGIN', label: 'Mis accesos al sistema' },
    { value: 'CERTIFICATION', label: 'Certificados asignados' },
    { value: 'PERMISSION', label: 'Permisos recibidos' },
    { value: 'PROFILE', label: 'Perfiles consultados' },
    { value: 'USER', label: 'Usuarios gestionados' },
    { value: 'DOCUMENT', label: 'Documentos subidos' },
  ];

  const users = [
    { value: 'all', label: 'Todos los usuarios' },
    { value: 'yo', label: 'Mis acciones' },
    { value: 'comite', label: 'Comité' },
    { value: 'agente', label: 'Agentes' },
    { value: 'profesionista', label: 'Profesionistas' },
    { value: 'empresario', label: 'Empresarios' },
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'success': return '#27ae60';
      case 'info': return '#3498db';
      case 'warning': return '#f39c12';
      case 'error': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return '#1b5e20';
      case 'comite': return '#1a237e';
      case 'agente': return '#526F78';
      case 'profesionista': return '#2ecc71';
      case 'empresario': return '#ed6c02';
      case 'yo': return '#1b5e20'; // Cambiado de morado a verde oscuro como admin
      default: return '#7f8c8d';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      filterType === 'all' ? true : log.action.includes(filterType);
    
    const matchesUser = 
      filterUser === 'all' ? true : 
      filterUser === 'yo' ? log.user.name === 'Yo' : log.user.role === filterUser;
    
    return matchesSearch && matchesType && matchesUser;
  });

  const paginatedLogs = filteredLogs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Estadísticas
  const stats = {
    total: auditLogs.length,
    today: auditLogs.filter(log => log.timestamp.includes('15/01/2026')).length,
    misAcciones: auditLogs.filter(log => log.user.name === 'Yo').length,
    permisosRecibidos: auditLogs.filter(log => log.action === 'PERMISSION_GRANT').length,
    certificadosAsignados: auditLogs.filter(log => log.action === 'CERTIFICATION_ASSIGN').length,
    documentosSubidos: auditLogs.filter(log => log.action === 'DOCUMENT_UPLOAD_SELF').length,
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
              Mis Actividades y Acciones
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Registro personal de todas las acciones que he realizado y recibido
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              size="small"
            >
              Exportar Mis Logs
            </Button>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              size="small"
            >
              Actualizar
            </Button>
          </Stack>
        </Box>

        {/* Estadísticas */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #1b5e20' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#1b5e20', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.misAcciones}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Mis Acciones
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #27ae60' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.today}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Hoy
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #2196f3' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.certificadosAsignados}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Certificados Asignados
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #ff9800' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.permisosRecibidos}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Permisos Recibidos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #4caf50' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.documentosSubidos}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Documentos Subidos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #2c3e50' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.total}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Total de Eventos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtros */}
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar en mis actividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Acción</InputLabel>
                <Select
                  value={filterType}
                  label="Tipo de Acción"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {actionTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Filtrar por Usuario</InputLabel>
                <Select
                  value={filterUser}
                  label="Filtrar por Usuario"
                  onChange={(e) => setFilterUser(e.target.value)}
                >
                  {users.map(user => (
                    <MenuItem key={user.value} value={user.value}>{user.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterUser('all');
                    setPage(1);
                  }}
                >
                  Limpiar Filtros
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box sx={{ 
            p: 2, 
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
              Registro de Mis Actividades - {filteredLogs.length} eventos encontrados
            </Typography>
            
            <Stack direction="row" spacing={1}>
              <Chip 
                label={`${stats.misAcciones} acciones mías`}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={`${paginatedLogs.length} mostrados`}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Box>

          {/* Tabla de auditoría */}
          <TableContainer sx={{ flex: 1 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Fecha y Hora</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Acción</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Entidad</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Detalles</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '5%' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedLogs.map((log) => (
                  <TableRow 
                    key={log.id}
                    hover
                    sx={{ 
                      '&:hover': { bgcolor: '#f8f9fa' },
                      borderLeft: `3px solid ${getSeverityColor(log.severity)}`
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {log.timestamp.split(' ')[0]}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          {log.timestamp.split(' ')[1]}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: getRoleColor(log.user.role),
                            fontSize: '0.85rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {log.user.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {log.user.name}
                          </Typography>
                          <Chip 
                            label={log.user.name === 'Yo' ? 'Yo' : log.user.role}
                            size="small"
                            sx={{ 
                              bgcolor: `${getRoleColor(log.user.role)}15`,
                              color: getRoleColor(log.user.role),
                              fontSize: '0.65rem',
                              height: 18
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ color: getSeverityColor(log.severity) }}>
                          {log.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {log.actionName}
                          </Typography>
                          <Chip 
                            label={log.severity}
                            size="small"
                            sx={{ 
                              bgcolor: `${getSeverityColor(log.severity)}15`,
                              color: getSeverityColor(log.severity),
                              fontSize: '0.65rem',
                              height: 18,
                              mt: 0.5
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {log.entity}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          ID: {log.entityId}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#5a6c7d' }}>
                          {log.details}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            IP: {log.ip}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Tooltip title="Ver detalles">
                        <IconButton size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginación */}
          <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
              Mostrando {((page - 1) * rowsPerPage) + 1} - {Math.min(page * rowsPerPage, filteredLogs.length)} de {filteredLogs.length} eventos
            </Typography>
            <Pagination
              count={Math.ceil(filteredLogs.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              size="small"
              color="primary"
            />
          </Box>
        </Paper>

        {/* Información de auditoría */}
        <Paper elevation={0} sx={{ mt: 2, p: 2, bgcolor: '#f8f9fa' }}>
          <Typography variant="subtitle1" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
            Resumen de Mis Actividades Recientes
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                Distribución de Mis Acciones
              </Typography>
              <Stack spacing={1}>
                {Object.entries({
                  'Certificados asignados': stats.certificadosAsignados,
                  'Documentos subidos': stats.documentosSubidos,
                  'Usuarios agregados': auditLogs.filter(log => log.action === 'USER_ADD_ASSOCIATION').length,
                  'Perfiles consultados': auditLogs.filter(log => log.action === 'PROFILE_VIEW').length,
                  'Inicios de sesión': auditLogs.filter(log => log.action === 'LOGIN_SUCCESS').length,
                }).map(([type, count]) => (
                  <Box key={type} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      {type}:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '60%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(count / stats.misAcciones) * 100}
                        sx={{ 
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#e0e0e0'
                        }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 24 }}>
                        {count}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                Acciones de Otros Usuarios Relacionadas Conmigo
              </Typography>
              <Stack spacing={1}>
                {Object.entries({
                  'Permisos otorgados por Fernanda': auditLogs.filter(log => 
                    log.action === 'PERMISSION_GRANT' && log.user.name === 'Fernanda López'
                  ).length,
                  'Acciones de comité': auditLogs.filter(log => 
                    log.user.role === 'comite' && log.user.name !== 'Yo'
                  ).length,
                  'Acciones de agentes': auditLogs.filter(log => 
                    log.user.role === 'agente'
                  ).length,
                }).map(([type, count]) => (
                  <Box key={type} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      {type}:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '60%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(count / (stats.total - stats.misAcciones)) * 100}
                        sx={{ 
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#e0e0e0'
                        }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 24 }}>
                        {count}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default AuditLog;