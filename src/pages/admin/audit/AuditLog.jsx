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
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Datos de auditoría de ejemplo
  const auditLogs = [
    {
      id: 1,
      timestamp: '15/01/2026 10:30:15',
      user: { name: 'Admin Sistema', role: 'admin', avatar: 'AS' },
      action: 'LOGIN_SUCCESS',
      actionName: 'Inicio de sesión exitoso',
      entity: 'Sistema',
      entityId: 'N/A',
      details: 'Inicio de sesión desde IP 192.168.1.100',
      ip: '192.168.1.100',
      severity: 'info',
      icon: <LoginIcon />
    },
    {
      id: 2,
      timestamp: '15/01/2026 09:45:22',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'CERTIFICATION_CREATE',
      actionName: 'Certificación creada',
      entity: 'Certificación',
      entityId: 'CERT-2026-00145',
      details: 'Patente Aduanal creada para expediente EXP-2024-567',
      ip: '192.168.1.150',
      severity: 'success',
      icon: <AddIcon />
    },
    {
      id: 3,
      timestamp: '15/01/2026 08:20:18',
      user: { name: 'María González', role: 'comite', avatar: 'MG' },
      action: 'CERTIFICATION_APPROVE',
      actionName: 'Certificación aprobada',
      entity: 'Certificación',
      entityId: 'CERT-2026-00123',
      details: 'Cédula profesional aprobada con observaciones',
      ip: '192.168.1.120',
      severity: 'success',
      icon: <GavelIcon />
    },
    {
      id: 4,
      timestamp: '14/01/2026 16:45:33',
      user: { name: 'Admin Sistema', role: 'admin', avatar: 'AS' },
      action: 'USER_UPDATE',
      actionName: 'Usuario actualizado',
      entity: 'Usuario',
      entityId: 'USR-001',
      details: 'Estado cambiado de activo a inactivo',
      ip: '192.168.1.100',
      severity: 'warning',
      icon: <EditIcon />
    },
    {
      id: 5,
      timestamp: '14/01/2026 14:10:55',
      user: { name: 'Carlos Martínez', role: 'profesionista', avatar: 'CM' },
      action: 'DOCUMENT_UPLOAD',
      actionName: 'Documento cargado',
      entity: 'Documento',
      entityId: 'DOC-2026-78901',
      details: 'Comprobante de domicilio actualizado',
      ip: '192.168.1.130',
      severity: 'info',
      icon: <DescriptionIcon />
    },
    {
      id: 6,
      timestamp: '14/01/2026 11:30:42',
      user: { name: 'María González', role: 'comite', avatar: 'MG' },
      action: 'CERTIFICATION_REJECT',
      actionName: 'Certificación rechazada',
      entity: 'Certificación',
      entityId: 'CERT-2026-00111',
      details: 'Documentación insuficiente para patente aduanal',
      ip: '192.168.1.120',
      severity: 'error',
      icon: <DeleteIcon />
    },
    {
      id: 7,
      timestamp: '13/01/2026 18:15:28',
      user: { name: 'Admin Sistema', role: 'admin', avatar: 'AS' },
      action: 'SYSTEM_CONFIG_UPDATE',
      actionName: 'Configuración actualizada',
      entity: 'Sistema',
      entityId: 'CONFIG-001',
      details: 'Umbral del semáforo cambiado a 90%',
      ip: '192.168.1.100',
      severity: 'warning',
      icon: <SettingsIcon />
    },
    {
      id: 8,
      timestamp: '13/01/2026 15:40:19',
      user: { name: 'Ana López', role: 'empresario', avatar: 'AL' },
      action: 'PASSWORD_CHANGE',
      actionName: 'Contraseña cambiada',
      entity: 'Usuario',
      entityId: 'USR-004',
      details: 'Cambio de contraseña exitoso',
      ip: '192.168.1.140',
      severity: 'info',
      icon: <SecurityIcon />
    },
    {
      id: 9,
      timestamp: '13/01/2026 12:05:37',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'CERTIFICATION_UPDATE',
      actionName: 'Certificación actualizada',
      entity: 'Certificación',
      entityId: 'CERT-2026-00122',
      details: 'Fecha de vencimiento extendida',
      ip: '192.168.1.150',
      severity: 'info',
      icon: <EditIcon />
    },
    {
      id: 10,
      timestamp: '12/01/2026 17:25:44',
      user: { name: 'Admin Sistema', role: 'admin', avatar: 'AS' },
      action: 'USER_CREATE',
      actionName: 'Usuario creado',
      entity: 'Usuario',
      entityId: 'USR-009',
      details: 'Nuevo usuario registrado: Pedro Sánchez',
      ip: '192.168.1.100',
      severity: 'success',
      icon: <AddIcon />
    },
  ];

  const actionTypes = [
    { value: 'all', label: 'Todas las acciones' },
    { value: 'LOGIN', label: 'Accesos al sistema' },
    { value: 'USER', label: 'Gestión de usuarios' },
    { value: 'CERTIFICATION', label: 'Certificaciones' },
    { value: 'DOCUMENT', label: 'Documentos' },
    { value: 'SYSTEM', label: 'Configuración del sistema' },
    { value: 'SECURITY', label: 'Seguridad' },
  ];

  const users = [
    { value: 'all', label: 'Todos los usuarios' },
    { value: 'admin', label: 'Administradores' },
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
      filterUser === 'all' ? true : log.user.role === filterUser;
    
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
    bySeverity: {
      info: auditLogs.filter(log => log.severity === 'info').length,
      success: auditLogs.filter(log => log.severity === 'success').length,
      warning: auditLogs.filter(log => log.severity === 'warning').length,
      error: auditLogs.filter(log => log.severity === 'error').length,
    },
    byUserType: {
      admin: auditLogs.filter(log => log.user.role === 'admin').length,
      comite: auditLogs.filter(log => log.user.role === 'comite').length,
      agente: auditLogs.filter(log => log.user.role === 'agente').length,
      profesionista: auditLogs.filter(log => log.user.role === 'profesionista').length,
      empresario: auditLogs.filter(log => log.user.role === 'empresario').length,
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
              Auditoría y Trazabilidad
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Registro completo de todas las acciones realizadas en el sistema
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              size="small"
            >
              Exportar Log
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
            <Card sx={{ borderLeft: '4px solid #3498db' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#3498db', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.total}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Total de Eventos
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
            <Card sx={{ borderLeft: '4px solid #3498db' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#3498db', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.bySeverity.info}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Informativos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #f39c12' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.bySeverity.warning}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Advertencias
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #e74c3c' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#e74c3c', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.bySeverity.error}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Errores
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={6} sm={4} md={2}>
            <Card sx={{ borderLeft: '4px solid #9b59b6' }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#9b59b6', fontWeight: 'bold', mb: 0.5 }}>
                  {stats.byUserType.admin}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  Acciones Admin
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
                placeholder="Buscar en auditoría..."
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
                <InputLabel>Tipo de Usuario</InputLabel>
                <Select
                  value={filterUser}
                  label="Tipo de Usuario"
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
              Registro de Auditoría - {filteredLogs.length} eventos encontrados
            </Typography>
            
            <Stack direction="row" spacing={1}>
              <Chip 
                label={`${stats.today} eventos hoy`}
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
                            label={log.user.role}
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                Distribución por Tipo de Acción
              </Typography>
              <Stack spacing={1}>
                {Object.entries({
                  'Accesos al sistema': auditLogs.filter(log => log.action.includes('LOGIN')).length,
                  'Gestión de usuarios': auditLogs.filter(log => log.action.includes('USER')).length,
                  'Certificaciones': auditLogs.filter(log => log.action.includes('CERTIFICATION')).length,
                  'Documentos': auditLogs.filter(log => log.action.includes('DOCUMENT')).length,
                }).map(([type, count]) => (
                  <Box key={type} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      {type}:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '60%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(count / stats.total) * 100}
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
                Distribución por Rol de Usuario
              </Typography>
              <Stack spacing={1}>
                {Object.entries(stats.byUserType).map(([role, count]) => (
                  <Box key={role} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      {role === 'admin' ? 'Administradores' :
                       role === 'comite' ? 'Comité' :
                       role === 'agente' ? 'Agentes' :
                       role === 'profesionista' ? 'Profesionistas' : 'Empresarios'}:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '60%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(count / stats.total) * 100}
                        sx={{ 
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getRoleColor(role)
                          }
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