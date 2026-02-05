import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Fade,
  Zoom,
  Autocomplete
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
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  VerifiedUser as VerifiedIcon,
  Warning as WarningIcon,
  BarChart as ChartIcon,
  Email as EmailIcon,
  Notifications as NotificationsIcon,
  LockReset as ResetPasswordIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  FileCopy as FileCopyIcon,
  DateRange as DateRangeIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { format, parseISO, isAfter, subDays, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';

// Datos iniciales mejorados
const initialUsers = [
  { 
    id: 1, 
    name: 'Luis Rodríguez Martínez', 
    email: 'luis.rodriguez@empresa.com', 
    role: 'agente', 
    roleName: 'Agente Aduanal',
    region: 'Norte', 
    status: 'active', 
    lastAccess: '2026-01-15T10:30:00',
    registrationDate: '2024-01-15',
    phone: '+52 55 1234 5678',
    compliance: 85,
    certifications: 8,
    pending: 2,
    color: '#526F78',
    avatar: 'LR',
    department: 'Operaciones',
    notifications: true,
    twoFactor: true,
    lastPasswordChange: '2026-01-01',
    documents: ['RFC', 'Cédula', 'Certificación SAT'],
    associationStatus: 'active', // Nuevo campo: estado en la asociación
    associationCertifications: [ // Nuevo campo: certificaciones de la asociación
      {
        id: 1,
        name: 'Certificación Aduanal Básica',
        description: 'Certificación para operaciones básicas de importación',
        type: 'operativa',
        issueDate: '2024-01-20',
        expiryDate: '2025-01-20',
        status: 'active'
      },
      {
        id: 2,
        name: 'Certificación SAT Nivel 2',
        description: 'Certificación para declaraciones de valor',
        type: 'fiscal',
        issueDate: '2024-03-15',
        expiryDate: '2025-03-15',
        status: 'active'
      }
    ]
  },
  { 
    id: 2, 
    name: 'María González López', 
    email: 'maria.gonzalez@comite.com', 
    role: 'comite', 
    roleName: 'Miembro del Comité',
    region: 'Centro', 
    status: 'active', 
    lastAccess: '2026-01-14T14:20:00',
    registrationDate: '2024-03-20',
    phone: '+52 55 8765 4321',
    compliance: 92,
    certifications: 12,
    pending: 0,
    color: '#1a237e',
    avatar: 'MG',
    department: 'Dirección',
    notifications: true,
    twoFactor: false,
    lastPasswordChange: '2026-01-10',
    documents: ['RFC', 'Acta Constitutiva'],
    associationStatus: 'active',
    associationCertifications: [
      {
        id: 1,
        name: 'Certificación de Comité',
        description: 'Certificación para miembros del comité directivo',
        type: 'administrativa',
        issueDate: '2024-04-01',
        expiryDate: '2025-04-01',
        status: 'active'
      }
    ]
  },
  // ... otros usuarios con estructura similar
];

// Usuarios disponibles para agregar a la asociación
const availableUsers = [
  { id: 101, name: 'Juan Pérez Gómez', email: 'juan.perez@externo.com', role: 'profesionista', roleName: 'Consultor Externo' },
  { id: 102, name: 'Ana Ruiz Sánchez', email: 'ana.ruiz@consultora.com', role: 'profesionista', roleName: 'Auditor Aduanal' },
  { id: 103, name: 'Carlos Méndez Torres', email: 'carlos.mendez@empresa.com', role: 'empresario', roleName: 'Representante Comercial' },
  { id: 104, name: 'Laura Castro Díaz', email: 'laura.castro@legal.com', role: 'profesionista', roleName: 'Asesor Legal' },
];

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false); // Nuevo diálogo
  const [openCertificationDialog, setOpenCertificationDialog] = useState(false); // Diálogo para certificaciones
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState(null); // Certificación seleccionada
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [filterRegion, setFilterRegion] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [actionMenuAnchor, setActionMenuAnchor] = useState(null);
  const [selectedActionUser, setSelectedActionUser] = useState(null);

  const rowsPerPage = 10;

  const [users, setUsers] = useState(initialUsers);

  // Estados para el formulario de nueva certificación
  const [newCertification, setNewCertification] = useState({
    name: '',
    description: '',
    type: 'operativa',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: addMonths(new Date(), 12).toISOString().split('T')[0]
  });

  // Constantes
  const regions = ['Todas', 'Norte', 'Centro', 'Sur', 'Metropolitana', 'Occidente'];
  const roles = [
    { value: 'agente', label: 'Agente Aduanal', description: 'Usuarios con acceso a operaciones aduanales' },
    { value: 'comite', label: 'Miembro del Comité', description: 'Usuarios del comité directivo' },
    { value: 'profesionista', label: 'Consultor Aduanal', description: 'Profesionistas externos' },
    { value: 'empresario', label: 'Representante Legal', description: 'Empresarios y representantes' },
    { value: 'admin', label: 'Administrador', description: 'Administradores del sistema' },
  ];

  // Tipos de certificaciones
  const certificationTypes = [
    { value: 'operativa', label: 'Operativa', color: '#2196f3' },
    { value: 'fiscal', label: 'Fiscal', color: '#4caf50' },
    { value: 'legal', label: 'Legal', color: '#9c27b0' },
    { value: 'administrativa', label: 'Administrativa', color: '#ff9800' },
    { value: 'seguridad', label: 'Seguridad', color: '#f44336' },
  ];

  // Formatear fechas
  const formatDate = (dateString, formatStr = 'dd/MM/yyyy HH:mm') => {
    try {
      return format(parseISO(dateString), formatStr, { locale: es });
    } catch {
      return dateString;
    }
  };

  // Calcular días desde el último acceso
  const getDaysSinceLastAccess = (lastAccess) => {
    const last = parseISO(lastAccess);
    const now = new Date();
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Estadísticas
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter(u => u.associationStatus === 'active').length;
    const inactive = users.filter(u => u.associationStatus === 'inactive').length;
    const withTwoFactor = users.filter(u => u.twoFactor).length;
    const recentAccess = users.filter(u => getDaysSinceLastAccess(u.lastAccess) <= 7).length;
    const expiredPasswords = users.filter(u => {
      const lastChange = parseISO(u.lastPasswordChange);
      return isAfter(subDays(new Date(), 90), lastChange);
    }).length;

    // Contar certificaciones activas
    const activeCertifications = users.reduce((acc, user) => {
      return acc + (user.associationCertifications?.filter(c => c.status === 'active').length || 0);
    }, 0);

    const byRole = roles.reduce((acc, role) => {
      acc[role.value] = users.filter(u => u.role === role.value).length;
      return acc;
    }, {});

    const byRegion = regions.slice(1).reduce((acc, region) => {
      acc[region] = users.filter(u => u.region === region).length;
      return acc;
    }, {});

    return {
      total,
      active,
      inactive,
      withTwoFactor,
      recentAccess,
      expiredPasswords,
      activeCertifications,
      byRole,
      byRegion
    };
  }, [users]);

  // Función de filtrado mejorada
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Filtro por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.roleName.toLowerCase().includes(term) ||
        user.department.toLowerCase().includes(term)
      );
    }

    // Filtro por pestaña
    if (selectedTab !== 'all') {
      filtered = filtered.filter(user => {
        if (selectedTab === 'active') return user.associationStatus === 'active';
        if (selectedTab === 'inactive') return user.associationStatus === 'inactive';
        if (selectedTab === 'withTwoFactor') return user.twoFactor;
        if (selectedTab === 'recent') return getDaysSinceLastAccess(user.lastAccess) <= 7;
        if (selectedTab === 'certifications') return user.associationCertifications?.length > 0;
        return user.role === selectedTab;
      });
    }

    // Filtros adicionales
    if (filterRegion !== 'all') {
      filtered = filtered.filter(user => user.region === filterRegion);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.associationStatus === filterStatus);
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'lastAccess' || sortField === 'registrationDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchTerm, selectedTab, filterRegion, filterStatus, sortField, sortDirection]);

  // Paginación
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, page]);

  // Funciones de manejo
  const handleAddExistingUser = () => {
    setOpenAddUserDialog(true);
  };

  const handleAddUserToAssociation = (user) => {
    setLoading(true);
    try {
      // Simular llamada API
      setTimeout(() => {
        const newAssociationUser = {
          ...user,
          associationStatus: 'active',
          associationCertifications: [],
          status: 'active',
          region: 'Norte',
          department: 'Nuevo',
          compliance: 0,
          certifications: 0,
          pending: 0,
          avatar: user.name.split(' ').map(n => n[0]).join(''),
          color: getRoleColor(user.role),
          documents: [],
          notifications: true,
          twoFactor: false,
          lastPasswordChange: new Date().toISOString().split('T')[0],
          registrationDate: new Date().toISOString().split('T')[0],
          lastAccess: new Date().toISOString()
        };

        setUsers(prev => [...prev, newAssociationUser]);
        setOpenAddUserDialog(false);
        
        setSnackbar({
          open: true,
          message: `Usuario ${user.name} agregado a la asociación correctamente`,
          severity: 'success'
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al agregar el usuario',
        severity: 'error'
      });
      setLoading(false);
    }
  };

  const handleToggleAssociationStatus = useCallback(async (id) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => prev.map(user =>
        user.id === id
          ? { 
              ...user, 
              associationStatus: user.associationStatus === 'active' ? 'inactive' : 'active' 
            }
          : user
      ));

      const user = users.find(u => u.id === id);
      setSnackbar({
        open: true,
        message: `Usuario ${user.name} ${user.associationStatus === 'active' ? 'desactivado' : 'activado'} en la asociación correctamente`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al cambiar el estado del usuario',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [users]);

  const handleAddCertification = (userId) => {
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setNewCertification({
      name: '',
      description: '',
      type: 'operativa',
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: addMonths(new Date(), 12).toISOString().split('T')[0]
    });
    setOpenCertificationDialog(true);
  };

  const handleSaveCertification = async () => {
    if (!newCertification.name) {
      setSnackbar({
        open: true,
        message: 'El nombre de la certificación es obligatorio',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const certification = {
        id: Date.now(), // ID temporal
        ...newCertification,
        status: 'active'
      };

      setUsers(prev => prev.map(user =>
        user.id === selectedUser.id
          ? { 
              ...user, 
              associationCertifications: [...(user.associationCertifications || []), certification] 
            }
          : user
      ));

      setOpenCertificationDialog(false);
      setSnackbar({
        open: true,
        message: 'Certificación agregada correctamente',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al guardar la certificación',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditCertification = (user, certification) => {
    setSelectedUser(user);
    setSelectedCertification(certification);
    setNewCertification({
      name: certification.name,
      description: certification.description,
      type: certification.type,
      issueDate: certification.issueDate,
      expiryDate: certification.expiryDate
    });
    setOpenCertificationDialog(true);
  };

  const handleDeleteCertification = async (userId, certificationId) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setUsers(prev => prev.map(user =>
        user.id === userId
          ? { 
              ...user, 
              associationCertifications: user.associationCertifications.filter(c => c.id !== certificationId)
            }
          : user
      ));

      setSnackbar({
        open: true,
        message: 'Certificación eliminada correctamente',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al eliminar la certificación',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCertificationStatus = async (userId, certificationId) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setUsers(prev => prev.map(user =>
        user.id === userId
          ? { 
              ...user, 
              associationCertifications: user.associationCertifications.map(c =>
                c.id === certificationId
                  ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
                  : c
              )
            }
          : user
      ));

      setSnackbar({
        open: true,
        message: 'Estado de certificación actualizado',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al actualizar la certificación',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: '#1b5e20',
      comite: '#1a237e',
      agente: '#526F78',
      profesionista: '#2e7d32',
      empresario: '#ed6c02'
    };
    return colors[role] || '#7f8c8d';
  };

  const getCertificationColor = (type) => {
    const certType = certificationTypes.find(t => t.value === type);
    return certType ? certType.color : '#7f8c8d';
  };

  const tabs = [
    { value: 'all', label: `Todos (${stats.total})`, icon: <GroupIcon /> },
    { value: 'active', label: `Activos Asoc. (${stats.active})`, icon: <CheckCircleIcon /> },
    { value: 'inactive', label: `Inactivos Asoc. (${stats.inactive})`, icon: <CancelIcon /> },
    { value: 'withTwoFactor', label: `2FA (${stats.withTwoFactor})`, icon: <SecurityIcon /> },
    { value: 'recent', label: `Recientes (${stats.recentAccess})`, icon: <CalendarIcon /> },
    { value: 'certifications', label: `Con Certif. (${stats.activeCertifications})`, icon: <VerifiedIcon /> },
    ...roles.map(role => ({
      value: role.value,
      label: `${role.label} (${stats.byRole[role.value]})`,
      icon: <SecurityIcon />
    }))
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Header */}
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 0.5 }}>
              Gestión de Usuarios - Asociación
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Administración de usuarios de la asociación aduanal
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTab('all');
                  setFilterRegion('all');
                  setFilterStatus('all');
                  setSortField('name');
                  setSortDirection('asc');
                  setPage(1);
                }}
                disabled={loading}
              >
                Limpiar Filtros
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => {
                  const data = filteredUsers.map(user => ({
                    Nombre: user.name,
                    Email: user.email,
                    Rol: user.roleName,
                    Región: user.region,
                    'Estado Asociación': user.associationStatus === 'active' ? 'Activo' : 'Inactivo',
                    'Último Acceso': formatDate(user.lastAccess),
                    Certificaciones: user.associationCertifications?.length || 0
                  }));

                  const csv = [
                    Object.keys(data[0]).join(','),
                    ...data.map(row => Object.values(row).join(','))
                  ].join('\n');

                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `usuarios_asociacion_${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                  
                  setSnackbar({
                    open: true,
                    message: 'Datos exportados correctamente',
                    severity: 'success'
                  });
                }}
                disabled={loading}
              >
                Exportar CSV
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={handleAddExistingUser}
                disabled={loading}
                sx={{
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Agregar Usuario 
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Filtros */}
      <Paper elevation={1} sx={{ p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Región</InputLabel>
              <Select
                value={filterRegion}
                onChange={(e) => {
                  setFilterRegion(e.target.value);
                  setPage(1);
                }}
                label="Región"
              >
                <MenuItem value="all">Todas las regiones</MenuItem>
                {regions.slice(1).map(region => (
                  <MenuItem key={region} value={region}>{region}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Estado Asoc.</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setPage(1);
                }}
                label="Estado Asoc."
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="active">Activos</MenuItem>
                <MenuItem value="inactive">Inactivos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Chip 
                label={`Total: ${filteredUsers.length}`}
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={`Activos: ${stats.active}`}
                color="success"
                variant="outlined"
              />
              <Chip 
                label={`Certif.: ${stats.activeCertifications}`}
                color="info"
                variant="outlined"
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs y contenido */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => {
              setSelectedTab(newValue);
              setPage(1);
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                sx={{ minHeight: 48 }}
              />
            ))}
          </Tabs>

          <TableContainer sx={{ flex: 1 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Table stickyHeader size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Usuario</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Rol / Departamento</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Región</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Certificaciones</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Estado Asociación</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Último Acceso</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow 
                      key={user.id}
                      hover
                      sx={{
                        opacity: user.associationStatus === 'inactive' ? 0.7 : 1,
                        bgcolor: user.associationStatus === 'inactive' ? 'action.hover' : 'inherit'
                      }}
                    >
                      <TableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: getRoleColor(user.role),
                              fontWeight: 'bold'
                            }}
                          >
                            {user.avatar}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {user.name}
                              {user.associationStatus === 'inactive' && (
                                <Chip
                                  label="INACTIVO ASOC."
                                  size="small"
                                  color="error"
                                  sx={{ ml: 1 }}
                                />
                              )}
                              {user.twoFactor && (
                                <VerifiedIcon
                                  fontSize="small"
                                  color="primary"
                                  sx={{ ml: 1, verticalAlign: 'middle' }}
                                />
                              )}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Box>
                          <Chip
                            label={user.roleName}
                            size="small"
                            sx={{
                              bgcolor: `${getRoleColor(user.role)}15`,
                              color: getRoleColor(user.role),
                              fontWeight: 600,
                              mb: 0.5
                            }}
                          />
                          <Typography variant="caption" display="block" color="text.secondary">
                            {user.department}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">{user.region}</Typography>
                      </TableCell>

                      <TableCell>
                        <Stack spacing={0.5}>
                          <Typography variant="body1" fontWeight="bold">
                            {user.associationCertifications?.length || 0}
                          </Typography>
                          {user.associationCertifications?.slice(0, 2).map((cert, index) => (
                            <Chip
                              key={index}
                              label={cert.name}
                              size="small"
                              sx={{
                                bgcolor: `${getCertificationColor(cert.type)}15`,
                                color: getCertificationColor(cert.type),
                                maxWidth: 120
                              }}
                            />
                          ))}
                          {user.associationCertifications?.length > 2 && (
                            <Chip
                              label={`+${user.associationCertifications.length - 2} más`}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Stack spacing={0.5}>
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                checked={user.associationStatus === 'active'}
                                onChange={() => handleToggleAssociationStatus(user.id)}
                                color="success"
                                disabled={loading}
                              />
                            }
                            label={user.associationStatus === 'active' ? 'Activo' : 'Inactivo'}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(user.registrationDate, 'dd/MM/yyyy')}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(user.lastAccess, 'dd/MM/yyyy')}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(user.lastAccess, 'HH:mm')}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Tooltip title="Ver detalles">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setSelectedUser(user);
                                setOpenDetailsDialog(true);
                              }}
                              color="primary"
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Agregar certificación">
                            <IconButton
                              size="small"
                              onClick={() => handleAddCertification(user.id)}
                              color="success"
                            >
                              <VerifiedIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Más opciones">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                setSelectedActionUser(user);
                                setActionMenuAnchor(e.currentTarget);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          {/* Paginación */}
          {filteredUsers.length > 0 && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}
            >
              <Typography variant="body2" color="text.secondary">
                Mostrando {((page - 1) * rowsPerPage) + 1} - {Math.min(page * rowsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
              </Typography>
              <Pagination
                count={Math.ceil(filteredUsers.length / rowsPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size="small"
              />
            </Stack>
          )}

          {filteredUsers.length === 0 && !loading && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 8, flex: 1 }}>
              <GroupIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No se encontraron usuarios en la asociación
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Agrega usuarios existentes a tu asociación
              </Typography>
              <Button variant="contained" onClick={handleAddExistingUser}>
                Agregar Usuarios
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Diálogo para agregar usuarios existentes */}
      <Dialog open={openAddUserDialog} onClose={() => setOpenAddUserDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" spacing={2} alignItems="center">
            <PersonAddIcon color="primary" />
            <Typography variant="h6">Agregar Usuario Existente a la Asociación</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            Selecciona un usuario existente en el sistema para agregarlo a tu asociación.
          </Typography>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell align="right">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availableUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: getRoleColor(user.role),
                            fontWeight: 'bold'
                          }}
                        >
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2">{user.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.roleName}
                        size="small"
                        sx={{
                          bgcolor: `${getRoleColor(user.role)}15`,
                          color: getRoleColor(user.role)
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleAddUserToAssociation(user)}
                        disabled={loading}
                      >
                        Agregar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddUserDialog(false)} disabled={loading}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para agregar/editar certificación */}
      <Dialog open={openCertificationDialog} onClose={() => setOpenCertificationDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedCertification ? 'Editar Certificación' : 'Nueva Certificación'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Usuario: <strong>{selectedUser?.name}</strong>
            </Typography>
            
            <TextField
              label="Nombre de la certificación"
              value={newCertification.name}
              onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
              fullWidth
              required
            />
            
            <TextField
              label="Descripción"
              value={newCertification.description}
              onChange={(e) => setNewCertification({ ...newCertification, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
            
            <FormControl fullWidth>
              <InputLabel>Tipo de certificación</InputLabel>
              <Select
                value={newCertification.type}
                onChange={(e) => setNewCertification({ ...newCertification, type: e.target.value })}
                label="Tipo de certificación"
              >
                {certificationTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: type.color
                        }}
                      />
                      <span>{type.label}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Fecha de emisión"
                  type="date"
                  value={newCertification.issueDate}
                  onChange={(e) => setNewCertification({ ...newCertification, issueDate: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Fecha de vencimiento"
                  type="date"
                  value={newCertification.expiryDate}
                  onChange={(e) => setNewCertification({ ...newCertification, expiryDate: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenCertificationDialog(false);
            setSelectedCertification(null);
          }} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleSaveCertification}
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            {loading ? 'Guardando...' : selectedCertification ? 'Actualizar' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de detalles del usuario */}
      <Dialog 
        open={openDetailsDialog} 
        onClose={() => setOpenDetailsDialog(false)} 
        maxWidth="lg"
        fullWidth
      >
        {selectedUser && (
          <>
            <DialogTitle>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: getRoleColor(selectedUser.role),
                    fontWeight: 'bold'
                  }}
                >
                  {selectedUser.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedUser.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.roleName} • {selectedUser.department}
                  </Typography>
                </Box>
              </Stack>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Información Personal
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <MailIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email" 
                        secondary={selectedUser.email}
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon color="action" />
                      </ListItemIcon>
                      <ListItemText primary="Teléfono" secondary={selectedUser.phone} />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <LocationIcon color="action" />
                      </ListItemIcon>
                      <ListItemText primary="Región" secondary={selectedUser.region} />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Estado en la Asociación
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Fecha de Registro" 
                        secondary={formatDate(selectedUser.registrationDate, 'dd MMMM yyyy')}
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <CalendarIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Último Acceso" 
                        secondary={formatDate(selectedUser.lastAccess)}
                      />
                    </ListItem>
                    
                    <ListItem>
                      <ListItemIcon>
                        <SecurityIcon color="action" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Estado" 
                        secondary={
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                checked={selectedUser.associationStatus === 'active'}
                                onChange={() => handleToggleAssociationStatus(selectedUser.id)}
                                color="success"
                              />
                            }
                            label={selectedUser.associationStatus === 'active' ? 'Activo en Asociación' : 'Inactivo en Asociación'}
                          />
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Certificaciones de la Asociación
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddCertification(selectedUser.id)}
                    >
                      Agregar Certificación
                    </Button>
                  </Box>
                  
                  {selectedUser.associationCertifications?.length > 0 ? (
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Certificación</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Emisión</TableCell>
                            <TableCell>Vencimiento</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedUser.associationCertifications.map((cert) => (
                            <TableRow key={cert.id} hover>
                              <TableCell>
                                <Box>
                                  <Typography variant="body2" fontWeight="bold">
                                    {cert.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {cert.description}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={certificationTypes.find(t => t.value === cert.type)?.label || cert.type}
                                  size="small"
                                  sx={{
                                    bgcolor: `${getCertificationColor(cert.type)}15`,
                                    color: getCertificationColor(cert.type)
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {formatDate(cert.issueDate, 'dd/MM/yyyy')}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {formatDate(cert.expiryDate, 'dd/MM/yyyy')}
                                </Typography>
                                {isAfter(new Date(), parseISO(cert.expiryDate)) && (
                                  <Chip
                                    label="Vencida"
                                    size="small"
                                    color="error"
                                    sx={{ mt: 0.5 }}
                                  />
                                )}
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      size="small"
                                      checked={cert.status === 'active'}
                                      onChange={() => handleToggleCertificationStatus(selectedUser.id, cert.id)}
                                      color="success"
                                    />
                                  }
                                  label=""
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleEditCertification(selectedUser, cert)}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDeleteCertification(selectedUser.id, cert.id)}
                                    color="error"
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <VerifiedIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                      <Typography variant="body1" color="text.secondary" gutterBottom>
                        No hay certificaciones registradas
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Agrega certificaciones para este usuario
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDetailsDialog(false)}>
                Cerrar
              </Button>
              <Button
                variant="contained"
                onClick={() => handleAddCertification(selectedUser.id)}
              >
                Agregar Certificación
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default UserManagement;