import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
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
  Tooltip,
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
  Pagination,
  Select,
  Tabs,
  Tab,
  FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Group as GroupIcon,
  PersonAdd as PersonAddIcon,
  VerifiedUser as VerifiedIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format, parseISO, isAfter, addMonths } from 'date-fns';
import { es } from 'date-fns/locale';

// Colores institucionales
const institutionalColors = {
  primary: '#133B6B',      // Azul oscuro principal
  secondary: '#1a4c7a',    // Azul medio
  accent: '#e9e9e9',       // Color para acentos (gris claro)
  background: '#f4f6f8',   // Fondo claro
  lightBlue: 'rgba(19, 59, 107, 0.08)',  // Azul transparente para hover
  darkBlue: '#0D2A4D',     // Azul más oscuro
  textPrimary: '#111827',  // Texto principal
  textSecondary: '#6b7280', // Texto secundario
  success: '#059669',      // Verde para éxito
  warning: '#d97706',      // Naranja para advertencias
  error: '#dc2626',        // Rojo para errores
  info: '#1976d2',         // Azul para información
};

// Datos iniciales actualizados sin el campo isActive
const initialUsers = [
  { 
    id: 1, 
    name: 'Luis Rodríguez Martínez', 
    email: 'luis.rodriguez@empresa.com', 
    role: 'agente', 
    roleName: 'Agente Aduanal',
    region: 'Norte',
    phone: '+52 55 1234 5678',
    color: '#526F78',
    avatar: 'LR',
    department: 'Operaciones',
    // El permiso lo da el usuario desde su dispositivo
    uploadPermission: 'no-permitido', // Estado inicial: no se puede subir documentos
    associationCertifications: [
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
    phone: '+52 55 8765 4321',
    color: '#1a237e',
    avatar: 'MG',
    department: 'Dirección',
    uploadPermission: 'no-permitido', // Sin permiso de subida inicialmente
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
  { 
    id: 3, 
    name: 'Carlos López Pérez', 
    email: 'carlos.lopez@consultor.com', 
    role: 'profesionista', 
    roleName: 'Consultor Externo',
    region: 'Sur',
    phone: '+52 55 9999 8888',
    color: '#2e7d32',
    avatar: 'CL',
    department: 'Consultoría',
    uploadPermission: 'permitido', // Usuario dio permiso desde su dispositivo
    associationCertifications: []
  },
  { 
    id: 4, 
    name: 'Ana Torres García', 
    email: 'ana.torres@auditor.com', 
    role: 'profesionista', 
    roleName: 'Auditor',
    region: 'Metropolitana',
    phone: '+52 55 7777 6666',
    color: '#2e7d32',
    avatar: 'AT',
    department: 'Auditoría',
    uploadPermission: 'no-permitido',
    associationCertifications: [
      {
        id: 1,
        name: 'Certificación de Auditor',
        description: 'Certificación para auditoría aduanal',
        type: 'legal',
        issueDate: '2024-05-01',
        expiryDate: '2025-05-01',
        status: 'active'
      }
    ]
  },
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
  const [selectedTab, setSelectedTab] = useState('todos');
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [openCertificationDialog, setOpenCertificationDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

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

  // Tipos de certificaciones
  const certificationTypes = [
    { value: 'operativa', label: 'Operativa', color: institutionalColors.primary },
    { value: 'fiscal', label: 'Fiscal', color: institutionalColors.success },
    { value: 'legal', label: 'Legal', color: '#9c27b0' },
    { value: 'administrativa', label: 'Administrativa', color: institutionalColors.warning },
    { value: 'seguridad', label: 'Seguridad', color: institutionalColors.error },
  ];

  // Regiones disponibles
  const regions = ['Norte', 'Centro', 'Sur', 'Metropolitana', 'Occidente', 'Noreste'];

  // Calcular estadísticas para las tabs
  const stats = useMemo(() => {
    const total = users.length;
    const withPermission = users.filter(u => u.uploadPermission === 'permitido').length;
    const withoutPermission = users.filter(u => u.uploadPermission === 'no-permitido').length;

    return {
      total,
      withPermission,
      withoutPermission
    };
  }, [users]);

  // Función de filtrado mejorada con tabs
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Filtro por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.roleName.toLowerCase().includes(term) ||
        user.department.toLowerCase().includes(term) ||
        user.region.toLowerCase().includes(term)
      );
    }

    // Filtro por pestaña seleccionada
    if (selectedTab === 'con-permisos') {
      filtered = filtered.filter(user => user.uploadPermission === 'permitido');
    } else if (selectedTab === 'sin-permisos') {
      filtered = filtered.filter(user => user.uploadPermission === 'no-permitido');
    }
    // Para 'todos' no aplicamos filtro adicional

    // Ordenamiento por nombre
    filtered.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    return filtered;
  }, [users, searchTerm, selectedTab]);

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
          region: 'Norte', // Región por defecto
          uploadPermission: 'no-permitido', // SIN permiso por defecto (el usuario debe dar permiso desde su dispositivo)
          associationCertifications: [],
          avatar: user.name.split(' ').map(n => n[0]).join(''),
          color: getRoleColor(user.role),
          phone: 'N/A',
          department: 'Nuevo'
        };

        setUsers(prev => [...prev, newAssociationUser]);
        setOpenAddUserDialog(false);
        
        setSnackbar({
          open: true,
          message: `Usuario ${user.name} agregado a la asociación correctamente. El usuario debe dar permiso de subida desde su dispositivo.`,
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

  const handleCheckPermissionStatus = useCallback(async (userId) => {
    setLoading(true);
    try {
      // Simular verificación del permiso desde el dispositivo del usuario
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = users.find(u => u.id === userId);
      
      setSnackbar({
        open: true,
        message: `El permiso de subida lo debe dar el usuario ${user.name} desde su dispositivo. No puedes modificar este permiso.`,
        severity: 'info'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al verificar el permiso',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  }, [users]);

  const handleAddCertification = (userId) => {
    const user = users.find(u => u.id === userId);
    
    // SOLO puedo ver certificaciones si el usuario me dio permiso
    if (user.uploadPermission !== 'permitido') {
      setSnackbar({
        open: true,
        message: 'No puedes subir certificaciones. Este usuario no ha dado permiso de subida desde su dispositivo.',
        severity: 'warning'
      });
      return;
    }
    
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

    // Verificar que el usuario tenga permiso
    if (!selectedUser || selectedUser.uploadPermission !== 'permitido') {
      setSnackbar({
        open: true,
        message: 'No tienes permiso para subir certificaciones para este usuario',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const certification = {
        id: Date.now(),
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
    // SOLO puedo editar si el usuario me dio permiso
    if (user.uploadPermission !== 'permitido') {
      setSnackbar({
        open: true,
        message: 'No puedes editar certificaciones. Este usuario no ha dado permiso de subida desde su dispositivo.',
        severity: 'warning'
      });
      return;
    }
    
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
    const user = users.find(u => u.id === userId);
    
    // SOLO puedo eliminar si el usuario me dio permiso
    if (user.uploadPermission !== 'permitido') {
      setSnackbar({
        open: true,
        message: 'No puedes eliminar certificaciones. Este usuario no ha dado permiso de subida desde su dispositivo.',
        severity: 'warning'
      });
      return;
    }

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

  const getRoleColor = (role) => {
    const colors = {
      admin: institutionalColors.success,
      comite: institutionalColors.primary,
      agente: '#526F78',
      profesionista: '#2e7d32',
      empresario: '#ed6c02'
    };
    return colors[role] || institutionalColors.textSecondary;
  };

  const getCertificationColor = (type) => {
    const certType = certificationTypes.find(t => t.value === type);
    return certType ? certType.color : institutionalColors.textSecondary;
  };

  // Definir las tabs (sin la de desactivados)
  const tabs = [
    { value: 'todos', label: `TODOS (${stats.total})`, icon: <GroupIcon /> },
    { value: 'con-permisos', label: `CON PERMISOS (${stats.withPermission})`, icon: <CheckCircleIcon /> },
    { value: 'sin-permisos', label: `SIN PERMISOS (${stats.withoutPermission})`, icon: <CancelIcon /> },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2, bgcolor: institutionalColors.background, p: 2 }}>
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
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper', border: `1px solid #e5e7eb` }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ color: institutionalColors.primary, fontWeight: 'bold', mb: 0.5 }}>
              Control de Asociados
            </Typography>
            <Typography variant="body1" sx={{ color: institutionalColors.textSecondary }}>
              Gestión de permisos y certificaciones de usuarios asociados
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => {
                  const data = filteredUsers.map(user => ({
                    Nombre: user.name,
                    Email: user.email,
                    Rol: user.roleName,
                    Región: user.region,
                    Departamento: user.department,
                    'Permiso Subida': user.uploadPermission === 'permitido' ? 'Permitido' : 'No Permitido',
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
                  a.download = `asociados_${new Date().toISOString().split('T')[0]}.csv`;
                  a.click();
                  
                  setSnackbar({
                    open: true,
                    message: 'Datos exportados correctamente',
                    severity: 'success'
                  });
                }}
                disabled={loading}
                sx={{
                  borderColor: institutionalColors.primary,
                  color: institutionalColors.primary,
                  '&:hover': {
                    borderColor: institutionalColors.secondary,
                    bgcolor: institutionalColors.lightBlue,
                  }
                }}
              >
                Exportar CSV
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAddIcon />}
                onClick={handleAddExistingUser}
                disabled={loading}
                sx={{
                  bgcolor: institutionalColors.primary,
                  '&:hover': { bgcolor: institutionalColors.secondary }
                }}
              >
                Agregar Asociado 
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Filtro de búsqueda */}
      <Paper elevation={1} sx={{ p: 2, border: `1px solid #e5e7eb` }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar asociados por nombre, email, rol, departamento o región..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: institutionalColors.textSecondary }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <CloseIcon sx={{ color: institutionalColors.textSecondary }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs de navegación */}
      <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: `1px solid #e5e7eb` }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => {
            setSelectedTab(newValue);
            setPage(1);
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            bgcolor: 'background.paper',
            '& .MuiTab-root.Mui-selected': {
              color: selectedTab === 'con-permisos' ? institutionalColors.success : 
                     selectedTab === 'sin-permisos' ? institutionalColors.error : institutionalColors.primary
            },
            '& .MuiTabs-indicator': {
              backgroundColor: selectedTab === 'con-permisos' ? institutionalColors.success : 
                             selectedTab === 'sin-permisos' ? institutionalColors.error : institutionalColors.primary
            }
          }}
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
              }}
            />
          ))}
        </Tabs>

        {/* Contenido principal */}
        <TableContainer sx={{ flex: 1 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <CircularProgress sx={{ color: institutionalColors.primary }} />
            </Box>
          ) : (
            <Table stickyHeader size="medium">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: institutionalColors.primary }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: institutionalColors.primary }}>Rol / Departamento</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: institutionalColors.primary }}>Región</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: institutionalColors.primary }}>Certificaciones</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: institutionalColors.primary }}>Permiso de Subida</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: institutionalColors.primary }} align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow 
                    key={user.id}
                    hover
                  >
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: getRoleColor(user.role),
                            fontWeight: 'bold',
                            color: 'white'
                          }}
                        >
                          {user.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold" sx={{ color: institutionalColors.textPrimary }}>
                            {user.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: institutionalColors.textSecondary }}>
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
                        <Typography variant="caption" display="block" sx={{ color: institutionalColors.textSecondary }}>
                          {user.department}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LocationIcon fontSize="small" sx={{ color: institutionalColors.textSecondary }} />
                        <Typography variant="body2" sx={{ color: institutionalColors.textPrimary }}>{user.region}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant="body1" fontWeight="bold" sx={{ color: institutionalColors.textPrimary }}>
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
                            sx={{
                              borderColor: institutionalColors.textSecondary,
                              color: institutionalColors.textSecondary
                            }}
                          />
                        )}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {user.uploadPermission === 'permitido' ? (
                          <>
                            <CheckCircleIcon sx={{ color: institutionalColors.success }} fontSize="small" />
                            <Typography variant="body2" sx={{ color: institutionalColors.success }}>
                              Permitido
                            </Typography>
                            <Typography variant="caption" sx={{ color: institutionalColors.textSecondary }} display="block">
                              (Usuario dio permiso)
                            </Typography>
                          </>
                        ) : (
                          <>
                            <CancelIcon sx={{ color: institutionalColors.error }} fontSize="small" />
                            <Typography variant="body2" sx={{ color: institutionalColors.error }}>
                              No Permitido
                            </Typography>
                            <Typography variant="caption" sx={{ color: institutionalColors.textSecondary }} display="block">
                              (Usuario debe dar permiso)
                            </Typography>
                          </>
                        )}
                      </Box>
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
                            sx={{ color: institutionalColors.primary }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={
                          user.uploadPermission === 'permitido' 
                            ? "Gestionar certificaciones" 
                            : "Sin permiso del usuario para subir documentos"
                        }>
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => {
                                if (user.uploadPermission === 'permitido') {
                                  handleAddCertification(user.id);
                                } else {
                                  setSnackbar({
                                    open: true,
                                    message: 'No puedes subir certificaciones. El usuario no ha dado permiso desde su dispositivo.',
                                    severity: 'warning'
                                  });
                                }
                              }}
                              sx={{ 
                                color: user.uploadPermission === 'permitido' ? institutionalColors.success : institutionalColors.textSecondary 
                              }}
                            >
                              <VerifiedIcon />
                            </IconButton>
                          </span>
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
            sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
          >
            <Typography variant="body2" sx={{ color: institutionalColors.textSecondary }}>
              Mostrando {((page - 1) * rowsPerPage) + 1} - {Math.min(page * rowsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
            </Typography>
            <Pagination
              count={Math.ceil(filteredUsers.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              size="small"
              sx={{
                '& .MuiPaginationItem-root.Mui-selected': {
                  bgcolor: institutionalColors.primary,
                  color: 'white',
                  '&:hover': {
                    bgcolor: institutionalColors.secondary,
                  }
                }
              }}
            />
          </Stack>
        )}

        {filteredUsers.length === 0 && !loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 8, flex: 1 }}>
            <GroupIcon sx={{ fontSize: 64, color: institutionalColors.textSecondary, mb: 2 }} />
            <Typography variant="h6" sx={{ color: institutionalColors.textSecondary }} gutterBottom>
              No se encontraron usuarios en esta categoría
            </Typography>
            <Typography variant="body2" sx={{ color: institutionalColors.textSecondary, mb: 3 }}>
              {selectedTab === 'todos' 
                ? 'No hay usuarios en la asociación' 
                : selectedTab === 'con-permisos'
                  ? 'No hay usuarios con permisos de subida'
                  : 'Todos los usuarios tienen permisos de subida'}
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleAddExistingUser}
              sx={{
                bgcolor: institutionalColors.primary,
                '&:hover': {
                  bgcolor: institutionalColors.secondary,
                }
              }}
            >
              Agregar Usuarios
            </Button>
          </Box>
        )}
      </Paper>

      {/* Diálogo para agregar usuarios existentes */}
      <Dialog open={openAddUserDialog} onClose={() => setOpenAddUserDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Stack direction="row" spacing={2} alignItems="center">
            <PersonAddIcon sx={{ color: institutionalColors.primary }} />
            <Typography variant="h6" sx={{ color: institutionalColors.textPrimary }}>Agregar Usuario Existente a la Asociación</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: institutionalColors.textSecondary }} paragraph>
            Selecciona un usuario existente en el sistema para agregarlo a tu asociación. 
            <strong> IMPORTANTE:</strong> El permiso para subir documentos lo debe dar el usuario desde su dispositivo.
          </Typography>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: institutionalColors.primary }}>Usuario</TableCell>
                  <TableCell sx={{ color: institutionalColors.primary }}>Email</TableCell>
                  <TableCell sx={{ color: institutionalColors.primary }}>Rol</TableCell>
                  <TableCell align="right" sx={{ color: institutionalColors.primary }}>Acción</TableCell>
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
                            fontWeight: 'bold',
                            color: 'white'
                          }}
                        >
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: institutionalColors.textPrimary }}>{user.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: institutionalColors.textSecondary }}>
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
                        sx={{
                          bgcolor: institutionalColors.primary,
                          '&:hover': {
                            bgcolor: institutionalColors.secondary,
                          }
                        }}
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
          <Typography variant="h6" sx={{ color: institutionalColors.textPrimary }}>
            {selectedCertification ? 'Editar Certificación' : 'Nueva Certificación'}
          </Typography>
          <Typography variant="caption" display="block" sx={{ color: institutionalColors.textSecondary }}>
            {selectedUser?.uploadPermission === 'permitido' 
              ? 'Permiso de subida concedido por el usuario'
              : 'No tienes permiso para subir documentos para este usuario'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ color: institutionalColors.textSecondary }}>
              Usuario: <strong>{selectedUser?.name}</strong>
            </Typography>
            
            {selectedUser?.uploadPermission !== 'permitido' ? (
              <Alert severity="warning" sx={{ mt: 1 }}>
                No puedes subir certificaciones. Este usuario no ha dado permiso de subida desde su dispositivo.
              </Alert>
            ) : (
              <>
                <TextField
                  label="Nombre de la certificación"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  fullWidth
                  required
                  disabled={!selectedUser || selectedUser.uploadPermission !== 'permitido'}
                />
                
                <TextField
                  label="Descripción"
                  value={newCertification.description}
                  onChange={(e) => setNewCertification({ ...newCertification, description: e.target.value })}
                  fullWidth
                  multiline
                  rows={2}
                  disabled={!selectedUser || selectedUser.uploadPermission !== 'permitido'}
                />
                
                <FormControl fullWidth>
                  <InputLabel sx={{ '&.Mui-focused': { color: institutionalColors.primary } }}>Tipo de certificación</InputLabel>
                  <Select
                    value={newCertification.type}
                    onChange={(e) => setNewCertification({ ...newCertification, type: e.target.value })}
                    label="Tipo de certificación"
                    disabled={!selectedUser || selectedUser.uploadPermission !== 'permitido'}
                    sx={{
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: institutionalColors.primary,
                      }
                    }}
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
                      disabled={!selectedUser || selectedUser.uploadPermission !== 'permitido'}
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
                      disabled={!selectedUser || selectedUser.uploadPermission !== 'permitido'}
                    />
                  </Grid>
                </Grid>
              </>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenCertificationDialog(false);
            setSelectedCertification(null);
          }} disabled={loading}>
            Cancelar
          </Button>
          {selectedUser?.uploadPermission === 'permitido' && (
            <Button
              onClick={handleSaveCertification}
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <SaveIcon />}
              sx={{
                bgcolor: institutionalColors.primary,
                '&:hover': {
                  bgcolor: institutionalColors.secondary,
                }
              }}
            >
              {loading ? 'Guardando...' : selectedCertification ? 'Actualizar' : 'Agregar'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Diálogo de detalles del usuario */}
      <Dialog 
        open={openDetailsDialog} 
        onClose={() => setOpenDetailsDialog(false)} 
        maxWidth="md"
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
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  {selectedUser.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: institutionalColors.textPrimary }}>{selectedUser.name}</Typography>
                  <Typography variant="body2" sx={{ color: institutionalColors.textSecondary }}>
                    {selectedUser.roleName} • {selectedUser.department}
                  </Typography>
                </Box>
              </Stack>
            </DialogTitle>

            <DialogContent dividers>
              <Grid container spacing={3}>
                {/* ================= INFO PERSONAL ================= */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary }} gutterBottom>
                    Información Personal
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <MailIcon sx={{ color: institutionalColors.textSecondary }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email" 
                        secondary={selectedUser.email}
                        primaryTypographyProps={{ sx: { color: institutionalColors.textSecondary } }}
                        secondaryTypographyProps={{ sx: { color: institutionalColors.textPrimary } }}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon sx={{ color: institutionalColors.textSecondary }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Teléfono"
                        secondary={selectedUser.phone}
                        primaryTypographyProps={{ sx: { color: institutionalColors.textSecondary } }}
                        secondaryTypographyProps={{ sx: { color: institutionalColors.textPrimary } }}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <LocationIcon sx={{ color: institutionalColors.textSecondary }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Región"
                        secondary={selectedUser.region}
                        primaryTypographyProps={{ sx: { color: institutionalColors.textSecondary } }}
                        secondaryTypographyProps={{ sx: { color: institutionalColors.textPrimary } }}
                      />
                    </ListItem>
                  </List>
                </Grid>

                {/* ================= CERTIFICACIONES ================= */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />

                  {/* HEADER + PERMISO CHIQUITO */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary }}>
                      Certificaciones de la Asociación
                    </Typography>

                    <Chip
                      size="small"
                      icon={
                        selectedUser.uploadPermission === 'permitido'
                          ? <CheckCircleIcon />
                          : <CancelIcon />
                      }
                      label={
                        selectedUser.uploadPermission === 'permitido'
                          ? 'Permiso de carga concedido'
                          : 'Permiso de carga no concedido'
                      }
                      sx={{
                        bgcolor: selectedUser.uploadPermission === 'permitido' 
                          ? `${institutionalColors.success}15` 
                          : `${institutionalColors.error}15`,
                        color: selectedUser.uploadPermission === 'permitido' 
                          ? institutionalColors.success 
                          : institutionalColors.error,
                        borderColor: selectedUser.uploadPermission === 'permitido' 
                          ? institutionalColors.success 
                          : institutionalColors.error
                      }}
                      variant="outlined"
                    />
                  </Box>

                  {selectedUser.associationCertifications?.length > 0 ? (
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ color: institutionalColors.primary }}>Certificación</TableCell>
                            <TableCell sx={{ color: institutionalColors.primary }}>Tipo</TableCell>
                            <TableCell sx={{ color: institutionalColors.primary }}>Emisión</TableCell>
                            <TableCell sx={{ color: institutionalColors.primary }}>Vencimiento</TableCell>
                            <TableCell align="right" sx={{ color: institutionalColors.primary }}>Acciones</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedUser.associationCertifications.map((cert) => (
                            <TableRow key={cert.id} hover>
                              <TableCell>
                                <Box>
                                  <Typography variant="body2" fontWeight="bold" sx={{ color: institutionalColors.textPrimary }}>
                                    {cert.name}
                                  </Typography>
                                </Box>
                              </TableCell>

                              <TableCell>
                                <Chip
                                  label={
                                    certificationTypes.find(
                                      t => t.value === cert.type
                                    )?.label || cert.type
                                  }
                                  size="small"
                                  sx={{
                                    bgcolor: `${getCertificationColor(cert.type)}15`,
                                    color: getCertificationColor(cert.type)
                                  }}
                                />
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ color: institutionalColors.textPrimary }}>
                                  {format(parseISO(cert.issueDate), 'dd/MM/yyyy', { locale: es })}
                                </Typography>
                              </TableCell>

                              <TableCell>
                                <Typography variant="body2" sx={{ color: institutionalColors.textPrimary }}>
                                  {format(parseISO(cert.expiryDate), 'dd/MM/yyyy', { locale: es })}
                                </Typography>
                                {isAfter(new Date(), parseISO(cert.expiryDate)) && (
                                  <Chip
                                    label="Vencida"
                                    size="small"
                                    sx={{ 
                                      mt: 0.5,
                                      bgcolor: `${institutionalColors.error}15`,
                                      color: institutionalColors.error
                                    }}
                                  />
                                )}
                              </TableCell>

                              <TableCell align="right">
                                <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                  <IconButton
                                    size="small"
                                    onClick={() => handleEditCertification(selectedUser, cert)}
                                    disabled={selectedUser.uploadPermission !== 'permitido'}
                                    sx={{ color: selectedUser.uploadPermission === 'permitido' ? institutionalColors.primary : institutionalColors.textSecondary }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>

                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      handleDeleteCertification(selectedUser.id, cert.id)
                                    }
                                    disabled={selectedUser.uploadPermission !== 'permitido'}
                                    sx={{ color: institutionalColors.error }}
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
                      <VerifiedIcon
                        sx={{ fontSize: 48, color: institutionalColors.textSecondary, mb: 2 }}
                      />
                      <Typography variant="body1" sx={{ color: institutionalColors.textSecondary }} gutterBottom>
                        No hay certificaciones registradas
                      </Typography>
                      <Typography variant="body2" sx={{ color: institutionalColors.textSecondary }}>
                        {selectedUser.uploadPermission === 'permitido'
                          ? 'Agrega certificaciones para este usuario'
                          : 'Este usuario no tiene permiso para agregar certificaciones'}
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
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default UserManagement;