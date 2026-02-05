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
    { value: 'operativa', label: 'Operativa', color: '#2196f3' },
    { value: 'fiscal', label: 'Fiscal', color: '#4caf50' },
    { value: 'legal', label: 'Legal', color: '#9c27b0' },
    { value: 'administrativa', label: 'Administrativa', color: '#ff9800' },
    { value: 'seguridad', label: 'Seguridad', color: '#f44336' },
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

  // Definir las tabs (sin la de desactivados)
  const tabs = [
    { value: 'todos', label: `TODOS (${stats.total})`, icon: <GroupIcon /> },
    { value: 'con-permisos', label: `CON PERMISOS (${stats.withPermission})`, icon: <CheckCircleIcon /> },
    { value: 'sin-permisos', label: `SIN PERMISOS (${stats.withoutPermission})`, icon: <CancelIcon /> },
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
              Control de Asociados
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gestión de permisos y certificaciones de usuarios asociados
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={1} justifyContent="flex-end" flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTab('todos');
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
                Agregar Asociado 
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Filtro de búsqueda */}
      <Paper elevation={1} sx={{ p: 2 }}>
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
        </Grid>
      </Paper>

      {/* Tabs de navegación */}
      <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => {
            setSelectedTab(newValue);
            setPage(1);
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
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
                '&.Mui-selected': {
                  color: tab.value === 'con-permisos' ? 'success.main' : 
                         tab.value === 'sin-permisos' ? 'error.main' : 'primary.main'
                }
              }}
            />
          ))}
        </Tabs>

        {/* Contenido principal */}
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
                  <TableCell sx={{ fontWeight: 'bold' }}>Permiso de Subida</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="center">Acciones</TableCell>
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
                            fontWeight: 'bold'
                          }}
                        >
                          {user.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {user.name}
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
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LocationIcon fontSize="small" color="action" />
                        <Typography variant="body2">{user.region}</Typography>
                      </Stack>
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {user.uploadPermission === 'permitido' ? (
                          <>
                            <CheckCircleIcon color="success" fontSize="small" />
                            <Typography variant="body2" color="success.main">
                              Permitido
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
                              (Usuario dio permiso)
                            </Typography>
                          </>
                        ) : (
                          <>
                            <CancelIcon color="error" fontSize="small" />
                            <Typography variant="body2" color="error.main">
                              No Permitido
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block">
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
                            color="primary"
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
                              color={user.uploadPermission === 'permitido' ? 'success' : 'default'}
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
              No se encontraron usuarios en esta categoría
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {selectedTab === 'todos' 
                ? 'No hay usuarios en la asociación' 
                : selectedTab === 'con-permisos'
                  ? 'No hay usuarios con permisos de subida'
                  : 'Todos los usuarios tienen permisos de subida'}
            </Typography>
            <Button variant="contained" onClick={handleAddExistingUser}>
              Agregar Usuarios
            </Button>
          </Box>
        )}
      </Paper>

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
            <strong> IMPORTANTE:</strong> El permiso para subir documentos lo debe dar el usuario desde su dispositivo.
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
          <Typography variant="caption" display="block" color="text.secondary">
            {selectedUser?.uploadPermission === 'permitido' 
              ? 'Permiso de subida concedido por el usuario'
              : 'No tienes permiso para subir documentos para este usuario'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
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
                  <InputLabel>Tipo de certificación</InputLabel>
                  <Select
                    value={newCertification.type}
                    onChange={(e) => setNewCertification({ ...newCertification, type: e.target.value })}
                    label="Tipo de certificación"
                    disabled={!selectedUser || selectedUser.uploadPermission !== 'permitido'}
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
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
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
          {/* ================= INFO PERSONAL ================= */}
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
                <ListItemText
                  primary="Teléfono"
                  secondary={selectedUser.phone}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <LocationIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary="Región"
                  secondary={selectedUser.region}
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
              <Typography variant="subtitle2" color="text.secondary">
                Certificaciones de la Asociación
              </Typography>

              <Chip
                size="small"
                icon={
                  selectedUser.uploadPermission === 'concedido'
                    ? <CheckCircleIcon />
                    : <CancelIcon />
                }
                label={
                  selectedUser.uploadPermission === 'concedido'
                    ? 'Permiso de carga concedido'
                    : 'Permiso de carga no concedido'
                }
                color={
                  selectedUser.uploadPermission === 'concedido'
                    ? 'success'
                    : 'default'
                }
                variant="outlined"
              />
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
                          <Typography variant="body2">
                            {format(parseISO(cert.issueDate), 'dd/MM/yyyy', { locale: es })}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2">
                            {format(parseISO(cert.expiryDate), 'dd/MM/yyyy', { locale: es })}
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

                        <TableCell align="right">
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                            <IconButton
                              size="small"
                              onClick={() => handleEditCertification(selectedUser, cert)}
                              disabled={selectedUser.uploadPermission !== 'concedido'}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDeleteCertification(selectedUser.id, cert.id)
                              }
                              color="error"
                              disabled={selectedUser.uploadPermission !== 'concedido'}
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
                  sx={{ fontSize: 48, color: 'grey.400', mb: 2 }}
                />
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  No hay certificaciones registradas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.uploadPermission === 'concedido'
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