// src/pages/admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Stack,
  InputAdornment,
  Avatar,
  Badge,
  Tooltip,
  Switch,
  FormControlLabel,
  LinearProgress,
  Tabs,
  Tab,
  Pagination,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Security as SecurityIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Group as GroupIcon,
  PersonAdd as PersonAddIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [filterInstance, setFilterInstance] = useState('all');
  const rowsPerPage = 10;

  // Lista de instancias disponibles
  const instances = [
    { id: 'all', name: 'Todas las instancias', description: 'Todas las áreas del sistema' },
    { id: 'instancia-administrativa', name: 'Instancia Administrativa', description: 'Área administrativa principal' },
    { id: 'instancia-ingenieria', name: 'Instancia de Ingeniería', description: 'Departamento de ingeniería y desarrollo' },
    { id: 'instancia-finanzas', name: 'Instancia de Finanzas', description: 'Gestión financiera y contable' },
    { id: 'instancia-recursos-humanos', name: 'Instancia de Recursos Humanos', description: 'Gestión de personal y nóminas' },
    { id: 'instancia-operaciones', name: 'Instancia de Operaciones', description: 'Operaciones y logística' },
    { id: 'instancia-calidad', name: 'Instancia de Calidad', description: 'Control de calidad y auditoría interna' },
    { id: 'instancia-comercial', name: 'Instancia Comercial', description: 'Ventas y atención al cliente' },
    { id: 'instancia-legal', name: 'Instancia Legal', description: 'Asuntos jurídicos y cumplimiento' },
    { id: 'instancia-soporte', name: 'Instancia de Soporte', description: 'Soporte técnico y TI' },
  ];

  // Datos mock mejorados con campo de instancia
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Luis Rodríguez', 
      email: 'luis@ejemplo.com', 
      role: 'agente', 
      roleName: 'Agente Aduanal',
      region: 'Norte', 
      status: 'active', 
      lastAccess: '15/01/2026 10:30',
      registrationDate: '15/01/2024',
      phone: '+52 55 1234 5678',
      compliance: 85,
      certifications: 8,
      pending: 2,
      color: '#526F78',
      avatar: 'LR',
      instance: 'instancia-operaciones',
      instanceName: 'Instancia de Operaciones',
      lastAccessInstance: 'instancia-operaciones'
    },
    { 
      id: 2, 
      name: 'María González', 
      email: 'maria@ejemplo.com', 
      role: 'comite', 
      roleName: 'Comité',
      region: 'Centro', 
      status: 'active', 
      lastAccess: '14/01/2026 14:20',
      registrationDate: '20/03/2024',
      phone: '+52 55 8765 4321',
      compliance: 92,
      certifications: 12,
      pending: 0,
      color: '#1a237e',
      avatar: 'MG',
      instance: 'instancia-calidad',
      instanceName: 'Instancia de Calidad',
      lastAccessInstance: 'instancia-calidad'
    },
    { 
      id: 3, 
      name: 'Carlos Martínez', 
      email: 'carlos@ejemplo.com', 
      role: 'profesionista', 
      roleName: 'Profesionista',
      region: 'Sur', 
      status: 'inactive', 
      lastAccess: '10/01/2026 09:15',
      registrationDate: '05/06/2024',
      phone: '+52 55 5555 5555',
      compliance: 78,
      certifications: 5,
      pending: 1,
      color: '#2e7d32',
      avatar: 'CM',
      instance: 'instancia-ingenieria',
      instanceName: 'Instancia de Ingeniería',
      lastAccessInstance: 'instancia-ingenieria'
    },
    { 
      id: 4, 
      name: 'Ana López', 
      email: 'ana@ejemplo.com', 
      role: 'empresario', 
      roleName: 'Empresario',
      region: 'Metropolitana', 
      status: 'active', 
      lastAccess: '15/01/2026 11:45',
      registrationDate: '12/08/2024',
      phone: '+52 55 9999 8888',
      compliance: 88,
      certifications: 6,
      pending: 0,
      color: '#ed6c02',
      avatar: 'AL',
      instance: 'instancia-finanzas',
      instanceName: 'Instancia de Finanzas',
      lastAccessInstance: 'instancia-finanzas'
    },
    { 
      id: 5, 
      name: 'Pedro Sánchez', 
      email: 'pedro@ejemplo.com', 
      role: 'admin', 
      roleName: 'Administrador',
      region: 'Todas', 
      status: 'active', 
      lastAccess: '15/01/2026 08:30',
      registrationDate: '01/01/2024',
      phone: '+52 55 7777 6666',
      compliance: 95,
      certifications: 15,
      pending: 0,
      color: '#1b5e20',
      avatar: 'PS',
      instance: 'instancia-administrativa',
      instanceName: 'Instancia Administrativa',
      lastAccessInstance: 'instancia-administrativa'
    },
    { 
      id: 6, 
      name: 'Laura Díaz', 
      email: 'laura@ejemplo.com', 
      role: 'comite', 
      roleName: 'Comité',
      region: 'Occidente', 
      status: 'active', 
      lastAccess: '13/01/2026 16:10',
      registrationDate: '15/09/2024',
      phone: '+52 55 3333 2222',
      compliance: 90,
      certifications: 10,
      pending: 1,
      color: '#1a237e',
      avatar: 'LD',
      instance: 'instancia-recursos-humanos',
      instanceName: 'Instancia de Recursos Humanos',
      lastAccessInstance: 'instancia-recursos-humanos'
    },
    { 
      id: 7, 
      name: 'Roberto Vargas', 
      email: 'roberto@ejemplo.com', 
      role: 'profesionista', 
      roleName: 'Profesionista',
      region: 'Noreste', 
      status: 'active', 
      lastAccess: '14/01/2026 13:45',
      registrationDate: '22/10/2024',
      phone: '+52 55 4444 3333',
      compliance: 82,
      certifications: 7,
      pending: 1,
      color: '#2e7d32',
      avatar: 'RV',
      instance: 'instancia-legal',
      instanceName: 'Instancia Legal',
      lastAccessInstance: 'instancia-legal'
    },
    { 
      id: 8, 
      name: 'Gabriela Torres', 
      email: 'gabriela@ejemplo.com', 
      role: 'empresario', 
      roleName: 'Empresario',
      region: 'Centro', 
      status: 'active', 
      lastAccess: '15/01/2026 09:20',
      registrationDate: '30/11/2024',
      phone: '+52 55 2222 1111',
      compliance: 91,
      certifications: 9,
      pending: 0,
      color: '#ed6c02',
      avatar: 'GT',
      instance: 'instancia-comercial',
      instanceName: 'Instancia Comercial',
      lastAccessInstance: 'instancia-comercial'
    },
    { 
      id: 9, 
      name: 'Miguel Ángel Cruz', 
      email: 'miguel@ejemplo.com', 
      role: 'agente', 
      roleName: 'Agente Aduanal',
      region: 'Sur', 
      status: 'active', 
      lastAccess: '13/01/2026 15:30',
      registrationDate: '18/07/2024',
      phone: '+52 55 6666 7777',
      compliance: 87,
      certifications: 6,
      pending: 1,
      color: '#526F78',
      avatar: 'MC',
      instance: 'instancia-soporte',
      instanceName: 'Instancia de Soporte',
      lastAccessInstance: 'instancia-soporte'
    },
    { 
      id: 10, 
      name: 'Sofía Mendoza', 
      email: 'sofia@ejemplo.com', 
      role: 'admin', 
      roleName: 'Administrador',
      region: 'Todas', 
      status: 'active', 
      lastAccess: '15/01/2026 07:45',
      registrationDate: '10/02/2024',
      phone: '+52 55 8888 9999',
      compliance: 98,
      certifications: 18,
      pending: 0,
      color: '#1b5e20',
      avatar: 'SM',
      instance: 'instancia-administrativa',
      instanceName: 'Instancia Administrativa',
      lastAccessInstance: 'instancia-administrativa'
    },
  ]);

  // Estadísticas
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    byRole: {
      agente: users.filter(u => u.role === 'agente').length,
      comite: users.filter(u => u.role === 'comite').length,
      profesionista: users.filter(u => u.role === 'profesionista').length,
      empresario: users.filter(u => u.role === 'empresario').length,
      admin: users.filter(u => u.role === 'admin').length,
    },
    byInstance: instances.reduce((acc, instance) => {
      if (instance.id !== 'all') {
        acc[instance.id] = users.filter(user => user.instance === instance.id).length;
      }
      return acc;
    }, {})
  };

  // Filtros
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.instanceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      selectedTab === 'all' ? true :
      selectedTab === 'active' ? user.status === 'active' :
      selectedTab === 'inactive' ? user.status === 'inactive' :
      user.role === selectedTab;
    
    const matchesInstance = 
      filterInstance === 'all' ? true : user.instance === filterInstance;
    
    return matchesSearch && matchesTab && matchesInstance;
  });

  // Paginación
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return '#1b5e20';
      case 'comite': return '#1a237e';
      case 'agente': return '#526F78';
      case 'profesionista': return '#2e7d32';
      case 'empresario': return '#ed6c02';
      default: return '#7f8c8d';
    }
  };

  const getInstanceColor = (instanceId) => {
    const colors = {
      'instancia-administrativa': '#1b5e20',
      'instancia-ingenieria': '#1565c0',
      'instancia-finanzas': '#8e24aa',
      'instancia-recursos-humanos': '#ff6f00',
      'instancia-operaciones': '#00838f',
      'instancia-calidad': '#c62828',
      'instancia-comercial': '#6a1b9a',
      'instancia-legal': '#2e7d32',
      'instancia-soporte': '#37474f'
    };
    return colors[instanceId] || '#7f8c8d';
  };

  const getInstanceDisplayName = (instanceId) => {
    const instance = instances.find(i => i.id === instanceId);
    return instance ? instance.name.split(' ')[1] || instance.name : instanceId;
  };

  const tabs = [
    { value: 'all', label: `Todos (${stats.total})`, icon: <GroupIcon /> },
    { value: 'active', label: `Activos (${stats.active})`, icon: <CheckCircleIcon /> },
    { value: 'inactive', label: `Inactivos (${stats.inactive})`, icon: <CancelIcon /> },
    { value: 'agente', label: `Agentes (${stats.byRole.agente})`, icon: <SecurityIcon /> },
    { value: 'comite', label: `Comité (${stats.byRole.comite})`, icon: <GroupIcon /> },
    { value: 'profesionista', label: `Profesionistas (${stats.byRole.profesionista})`, icon: <SecurityIcon /> },
    { value: 'empresario', label: `Empresarios (${stats.byRole.empresario})`, icon: <SecurityIcon /> },
    { value: 'admin', label: `Admins (${stats.byRole.admin})`, icon: <SecurityIcon /> },
  ];

  // Función para limpiar todos los filtros
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTab('all');
    setFilterInstance('all');
    setPage(1);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
              Gestión de Usuarios
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Administre los usuarios del sistema SICAG - {filteredUsers.length} usuarios encontrados
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              size="small"
            >
              Exportar
            </Button>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{ bgcolor: '#1b5e20', '&:hover': { bgcolor: '#2e7d32' } }}
            >
              Nuevo Usuario
            </Button>
          </Stack>
        </Box>

        {/* Filtros rápidos */}
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar por nombre, email o rol..."
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
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Filtrar por Instancia</InputLabel>
                <Select
                  value={filterInstance}
                  label="Filtrar por Instancia"
                  onChange={(e) => setFilterInstance(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <BusinessIcon fontSize="small" />
                    </InputAdornment>
                  }
                >
                  {instances.map(instance => (
                    <MenuItem key={instance.id} value={instance.id}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2">{instance.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          {instance.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={clearAllFilters}
                  startIcon={<RefreshIcon />}
                >
                  Limpiar Filtros
                </Button>
                <Chip 
                  label={`Total: ${stats.total}`} 
                  size="small" 
                  color="primary" 
                  variant="outlined" 
                />
                <Chip 
                  label={`Activos: ${stats.active}`} 
                  size="small" 
                  color="success" 
                  variant="outlined" 
                />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Tabs de navegación */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={selectedTab} 
          onChange={(e, newValue) => {
            setSelectedTab(newValue);
            setPage(1);
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 48 }}
        >
          {tabs.map((tab) => (
            <Tab 
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              iconPosition="start"
              label={tab.label}
              sx={{ 
                minHeight: 48,
                textTransform: 'none',
                fontSize: '0.85rem',
                fontWeight: selectedTab === tab.value ? 600 : 400,
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {/* Tabla de usuarios */}
        <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TableContainer sx={{ flex: 1 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Instancia Asignada</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Certificaciones</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Cumplimiento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    hover
                    sx={{ 
                      '&:hover': { bgcolor: '#f8f9fa' },
                      opacity: user.status === 'inactive' ? 0.7 : 1
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar 
                          sx={{ 
                            width: 36, 
                            height: 36, 
                            bgcolor: user.color,
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {user.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                            {user.name}
                            {user.status === 'inactive' && (
                              <Chip 
                                label="INACTIVO" 
                                size="small" 
                                color="error"
                                sx={{ ml: 1, height: 18, fontSize: '0.65rem' }}
                              />
                            )}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                            {user.email}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <PhoneIcon sx={{ fontSize: 12, color: '#7f8c8d' }} />
                            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                              {user.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Chip 
                        label={user.roleName}
                        size="small"
                        sx={{ 
                          bgcolor: `${getRoleColor(user.role)}15`,
                          color: getRoleColor(user.role),
                          fontWeight: 600,
                          border: `1px solid ${getRoleColor(user.role)}30`
                        }}
                      />
                      <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 0.5 }}>
                        {user.region}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <BusinessIcon 
                          sx={{ 
                            fontSize: 16, 
                            color: getInstanceColor(user.instance) 
                          }} 
                        />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {getInstanceDisplayName(user.instance)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                            {user.instanceName.split(' ').slice(2).join(' ') || 'Área asignada'}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {user.certifications}
                        </Typography>
                        {user.pending > 0 && (
                          <Chip 
                            label={`${user.pending} pendientes`}
                            size="small"
                            color="warning"
                            sx={{ height: 18, fontSize: '0.65rem', mt: 0.5 }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Tooltip title={`${user.compliance}% de cumplimiento`}>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                              {user.compliance}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={user.compliance}
                            sx={{ 
                              height: 6,
                              borderRadius: 3,
                              bgcolor: '#f0f0f0',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: user.compliance >= 90 ? '#27ae60' : 
                                        user.compliance >= 70 ? '#f39c12' : '#e74c3c'
                              }
                            }}
                          />
                        </Box>
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
              Mostrando {((page - 1) * rowsPerPage) + 1} - {Math.min(page * rowsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
              {filterInstance !== 'all' && ` en ${instances.find(i => i.id === filterInstance)?.name}`}
            </Typography>
            <Pagination
              count={Math.ceil(filteredUsers.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              size="small"
              color="primary"
            />
          </Box>
        </Paper>
      </Box>

      {/* Estadísticas en footer */}
      <Paper elevation={0} sx={{ mt: 2, p: 2, bgcolor: '#f8f9fa' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3} md={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold' }}>
                {stats.total}
              </Typography>
              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                Total Usuarios
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                {stats.active}
              </Typography>
              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                Activos
              </Typography>
            </Box>
          </Grid>
          
          {/* Instancias más activas */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
              Instancias con más usuarios
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {Object.entries(stats.byInstance)
                .filter(([_, count]) => count > 0)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([instanceId, count]) => {
                  const instance = instances.find(i => i.id === instanceId);
                  return (
                    <Chip
                      key={instanceId}
                      label={`${instance?.name.split(' ')[1]}: ${count}`}
                      size="small"
                      sx={{
                        bgcolor: `${getInstanceColor(instanceId)}15`,
                        color: getInstanceColor(instanceId),
                        mb: 0.5
                      }}
                    />
                  );
                })}
            </Stack>
          </Grid>

          {/* Total por rol */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
              Distribución por rol
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {Object.entries(stats.byRole).map(([role, count]) => (
                <Chip
                  key={role}
                  label={`${role === 'agente' ? 'Agentes' : 
                         role === 'comite' ? 'Comité' : 
                         role === 'profesionista' ? 'Profesionistas' : 
                         role === 'empresario' ? 'Empresarios' : 'Admins'}: ${count}`}
                  size="small"
                  sx={{
                    bgcolor: `${getRoleColor(role)}15`,
                    color: getRoleColor(role),
                    mb: 0.5
                  }}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Dialog para crear/editar usuario */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser?.id ? 'Editar Usuario' : 'Nuevo Usuario'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nombre completo"
              fullWidth
              value={selectedUser?.name || ''}
              onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={selectedUser?.email || ''}
              onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
            />
            <TextField
              label="Teléfono"
              fullWidth
              value={selectedUser?.phone || ''}
              onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
            />
            <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                value={selectedUser?.role || 'agente'}
                label="Rol"
                onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
              >
                <MenuItem value="agente">Agente Aduanal</MenuItem>
                <MenuItem value="comite">Comité</MenuItem>
                <MenuItem value="profesionista">Profesionista</MenuItem>
                <MenuItem value="empresario">Empresario</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Instancia</InputLabel>
              <Select
                value={selectedUser?.instance || 'instancia-administrativa'}
                label="Instancia"
                onChange={(e) => setSelectedUser({...selectedUser, instance: e.target.value})}
                startAdornment={
                  <InputAdornment position="start">
                    <BusinessIcon fontSize="small" />
                  </InputAdornment>
                }
              >
                {instances.filter(i => i.id !== 'all').map(instance => (
                  <MenuItem key={instance.id} value={instance.id}>
                    {instance.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Región</InputLabel>
              <Select
                value={selectedUser?.region || 'Norte'}
                label="Región"
                onChange={(e) => setSelectedUser({...selectedUser, region: e.target.value})}
              >
                <MenuItem value="Norte">Norte</MenuItem>
                <MenuItem value="Sur">Sur</MenuItem>
                <MenuItem value="Centro">Centro</MenuItem>
                <MenuItem value="Metropolitana">Metropolitana</MenuItem>
                <MenuItem value="Occidente">Occidente</MenuItem>
                <MenuItem value="Noreste">Noreste</MenuItem>
                <MenuItem value="Todas">Todas las regiones</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={selectedUser?.status === 'active'}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser, 
                    status: e.target.checked ? 'active' : 'inactive'
                  })}
                />
              }
              label="Usuario activo"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              if (selectedUser?.id) {
                // Editar usuario existente
                setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
              } else {
                // Crear nuevo usuario
                const newUser = {
                  ...selectedUser,
                  id: users.length + 1,
                  avatar: selectedUser.name.split(' ').map(n => n[0]).join(''),
                  roleName: selectedUser.role === 'agente' ? 'Agente Aduanal' :
                           selectedUser.role === 'comite' ? 'Comité' :
                           selectedUser.role === 'profesionista' ? 'Profesionista' :
                           selectedUser.role === 'empresario' ? 'Empresario' : 'Administrador',
                  color: getRoleColor(selectedUser.role),
                  instanceName: instances.find(i => i.id === selectedUser.instance)?.name || 'Instancia',
                  lastAccessInstance: selectedUser.instance,
                  lastAccess: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                  registrationDate: new Date().toLocaleDateString('es-ES'),
                  compliance: 0,
                  certifications: 0,
                  pending: 0,
                };
                setUsers([...users, newUser]);
              }
              setOpenDialog(false);
              setSelectedUser(null);
            }}
          >
            {selectedUser?.id ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;