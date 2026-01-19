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
  Pagination
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
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Datos mock mejorados
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
      avatar: 'LR'
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
      avatar: 'MG'
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
      avatar: 'CM'
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
      avatar: 'AL'
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
      avatar: 'PS'
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
      avatar: 'LD'
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
    }
  };

  // Filtros
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.roleName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      selectedTab === 'all' ? true :
      selectedTab === 'active' ? user.status === 'active' :
      selectedTab === 'inactive' ? user.status === 'inactive' :
      user.role === selectedTab;
    
    return matchesSearch && matchesTab;
  });

  // Paginación
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAddUser = () => {
    setSelectedUser({
      name: '',
      email: '',
      role: 'agente',
      region: 'Norte',
      status: 'active'
    });
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser({ ...user });
    setOpenDialog(true);
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { 
        ...user, 
        status: user.status === 'active' ? 'inactive' : 'active' 
      } : user
    ));
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

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
              onClick={handleAddUser}
              sx={{ bgcolor: '#1b5e20', '&:hover': { bgcolor: '#2e7d32' } }}
            >
              Nuevo Usuario
            </Button>
          </Stack>
        </Box>

        {/* Filtros rápidos */}
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
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
                <Chip 
                  label={`Inactivos: ${stats.inactive}`} 
                  size="small" 
                  color="error" 
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
                  <TableCell sx={{ fontWeight: 'bold', width: '25%' }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Región</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Certificaciones</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Cumplimiento</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Último Acceso</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', width: '10%' }} align="center">Acciones</TableCell>
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
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationIcon sx={{ fontSize: 14, color: '#7f8c8d' }} />
                        <Typography variant="body2">{user.region}</Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Registro: {user.registrationDate}
                      </Typography>
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
                    
                    <TableCell>
                      <Typography variant="body2">
                        {user.lastAccess.split(' ')[0]}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        {user.lastAccess.split(' ')[1]}
                      </Typography>
                    </TableCell>
                    
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <Tooltip title="Revisar perfil">
                          <IconButton 
                            size="small"
                            component={Link}
                            to={`/admin/users/${user.id}/review`}
                            sx={{ color: '#3498db' }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Editar usuario">
                          <IconButton 
                            size="small"
                            onClick={() => handleEditUser(user)}
                            sx={{ color: '#f39c12' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title={user.status === 'active' ? 'Desactivar' : 'Activar'}>
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                checked={user.status === 'active'}
                                onChange={() => handleToggleStatus(user.id)}
                                color={user.status === 'active' ? 'success' : 'default'}
                              />
                            }
                            label=""
                          />
                        </Tooltip>
                        
                        <Tooltip title="Más opciones">
                          <IconButton size="small">
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

          {/* Paginación */}
          <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
              Mostrando {((page - 1) * rowsPerPage) + 1} - {Math.min(page * rowsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
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
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold' }}>
                {stats.total}
              </Typography>
              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                Total Usuarios
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                {stats.active}
              </Typography>
              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                Activos
              </Typography>
            </Box>
          </Grid>
          {Object.entries(stats.byRole).map(([role, count]) => (
            <Grid item xs={6} sm={4} md={2} key={role}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: getRoleColor(role), fontWeight: 'bold' }}>
                  {count}
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                  {role === 'agente' ? 'Agentes' : 
                   role === 'comite' ? 'Comité' : 
                   role === 'profesionista' ? 'Profesionistas' : 
                   role === 'empresario' ? 'Empresarios' : 'Admins'}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserManagement;