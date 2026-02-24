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
  Select,
  Alert,
  Snackbar,
  FormLabel,
  Radio,
  RadioGroup,
  Divider,
  Input
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
  Close as CloseIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon,
  SwapHoriz as SwapHorizIcon,
  Info as InfoIcon,
  VisibilityOff as VisibilityOffIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Librerías para exportación
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Paleta corporativa
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
    success: '#00A8A8',
    warning: '#00C2D1',
    error: '#0099FF',
    info: '#3A6EA5'
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  }
};

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' o 'edit'
  const rowsPerPage = 10;

  // Estado para la contraseña
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Estados para exportación
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('excel');
  const [exportScope, setExportScope] = useState('filtered');
  const [exportLoading, setExportLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
      color: colors.primary.main,
      avatar: 'LR',
      password: 'hashed_password_here'
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
      color: colors.accents.purple,
      avatar: 'MG',
      password: 'hashed_password_here'
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
      color: colors.accents.blue,
      avatar: 'CM',
      password: 'hashed_password_here'
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
      color: colors.secondary.main,
      avatar: 'AL',
      password: 'hashed_password_here'
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
      color: colors.primary.dark,
      avatar: 'PS',
      password: 'hashed_password_here'
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
      color: colors.accents.purple,
      avatar: 'LD',
      password: 'hashed_password_here'
    },
  ]);

  // Roles disponibles
  const availableRoles = [
    { value: 'admin', label: 'Administrador', color: colors.primary.dark },
    { value: 'comite', label: 'Comité', color: colors.accents.purple },
    { value: 'agente', label: 'Agente Aduanal', color: colors.primary.main },
    { value: 'profesionista', label: 'Profesionista', color: colors.accents.blue },
    { value: 'empresario', label: 'Empresario', color: colors.secondary.main }
  ];

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
    setDialogMode('add');
    setSelectedUser({
      name: '',
      email: '',
      role: 'agente',
      region: 'Norte',
      status: 'active',
      phone: '',
      roleName: 'Agente Aduanal'
    });
    setPassword('');
    setOpenDialog(true);
  };

  const handleEditUser = (user) => {
    setDialogMode('edit');
    setSelectedUser({ ...user });
    setPassword('');
    setOpenDialog(true);
  };

  const handleChangeRole = (user) => {
    setSelectedUser({ ...user });
    setOpenRoleDialog(true);
  };

  const handleSaveRole = () => {
    if (!selectedUser?.role) return;

    setUsers(users.map(user =>
      user.id === selectedUser.id ? {
        ...selectedUser,
        roleName: getRoleName(selectedUser.role),
        color: getRoleColor(selectedUser.role)
      } : user
    ));

    setSnackbar({
      open: true,
      message: `Rol de ${selectedUser.name} actualizado a ${getRoleName(selectedUser.role)} exitosamente`,
      severity: 'success'
    });

    setOpenRoleDialog(false);
  };

  const handleSaveUser = () => {
    if (!selectedUser.name || !selectedUser.email) {
      setSnackbar({
        open: true,
        message: 'Por favor complete los campos obligatorios',
        severity: 'error'
      });
      return;
    }

    if (dialogMode === 'add') {
      const emailExists = users.some(user => user.email.toLowerCase() === selectedUser.email.toLowerCase());
      if (emailExists) {
        setSnackbar({
          open: true,
          message: 'Ya existe un usuario con este email',
          severity: 'error'
        });
        return;
      }

      const newUser = {
        ...selectedUser,
        id: Math.max(...users.map(u => u.id), 0) + 1,
        registrationDate: new Date().toLocaleDateString('es-MX'),
        lastAccess: 'Nunca',
        certifications: 0,
        pending: 0,
        compliance: 0,
        avatar: selectedUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
        color: getRoleColor(selectedUser.role),
        password: 'hashed_' + password
      };
      setUsers([...users, newUser]);
      setSnackbar({
        open: true,
        message: 'Usuario creado exitosamente',
        severity: 'success'
      });
    } else {
      setUsers(users.map(user =>
        user.id === selectedUser.id ? {
          ...selectedUser,
          roleName: getRoleName(selectedUser.role),
          color: getRoleColor(selectedUser.role),
          avatar: selectedUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        } : user
      ));
      setSnackbar({
        open: true,
        message: 'Usuario actualizado exitosamente',
        severity: 'success'
      });
    }
    setOpenDialog(false);
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? {
        ...user,
        status: user.status === 'active' ? 'inactive' : 'active'
      } : user
    ));
    setSnackbar({
      open: true,
      message: 'Estado del usuario actualizado',
      severity: 'success'
    });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== id));
      setSnackbar({
        open: true,
        message: 'Usuario eliminado exitosamente',
        severity: 'success'
      });
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return colors.primary.dark;
      case 'comite': return colors.accents.purple;
      case 'agente': return colors.primary.main;
      case 'profesionista': return colors.accents.blue;
      case 'empresario': return colors.secondary.main;
      default: return colors.text.secondary;
    }
  };

  const getRoleName = (role) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'comite': return 'Comité';
      case 'agente': return 'Agente Aduanal';
      case 'profesionista': return 'Profesionista';
      case 'empresario': return 'Empresario';
      default: return role;
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'comite': return 'Comité';
      case 'agente': return 'Agente';
      case 'profesionista': return 'Profesionista';
      case 'empresario': return 'Empresario';
      default: return role;
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

  // Handlers para exportación
  const handleExportClick = () => {
    setExportDialogOpen(true);
  };

  const handleExportDialogClose = () => {
    setExportDialogOpen(false);
  };

  const handleExport = async () => {
    setExportLoading(true);

    try {
      const dataToExport = exportScope === 'all' ? users : filteredUsers;

      const exportData = dataToExport.map(user => ({
        'Nombre': user.name,
        'Email': user.email,
        'Rol': getRoleText(user.role),
        'Rol Específico': user.roleName,
        'Región': user.region,
        'Estado': user.status === 'active' ? 'Activo' : 'Inactivo',
        'Teléfono': user.phone,
        'Fecha Registro': user.registrationDate,
        'Último Acceso': user.lastAccess,
        'Certificaciones': user.certifications,
        'Pendientes': user.pending,
        'Cumplimiento %': user.compliance
      }));

      if (exportFormat === 'excel') {
        exportToExcel(exportData);
      } else {
        exportToPDF(exportData, dataToExport);
      }

      setSnackbar({
        open: true,
        message: `Usuarios exportados exitosamente a ${exportFormat === 'excel' ? 'Excel' : 'PDF'}`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al exportar usuarios',
        severity: 'error'
      });
    } finally {
      setExportLoading(false);
      setExportDialogOpen(false);
    }
  };

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);

    const colWidths = [
      { wch: 20 }, { wch: 30 }, { wch: 15 }, { wch: 20 },
      { wch: 15 }, { wch: 10 }, { wch: 15 }, { wch: 12 },
      { wch: 15 }, { wch: 12 }, { wch: 10 }, { wch: 12 }
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

    const summaryData = [
      ['Resumen de Usuarios'],
      [''],
      ['Total de Usuarios', stats.total],
      ['Usuarios Activos', stats.active],
      ['Usuarios Inactivos', stats.inactive],
      [''],
      ['Por Rol:'],
      ['Administradores', stats.byRole.admin],
      ['Comité', stats.byRole.comite],
      ['Agentes', stats.byRole.agente],
      ['Profesionistas', stats.byRole.profesionista],
      ['Empresarios', stats.byRole.empresario],
      [''],
      ['Fecha de Exportación:', new Date().toLocaleString()],
      ['Filtros Aplicados:', selectedTab !== 'all' ? `Vista: ${selectedTab}` : 'Todos', searchTerm ? `Búsqueda: ${searchTerm}` : '']
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen');

    const fileName = `usuarios_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const exportToPDF = (data, originalData) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(19, 59, 107);
    doc.text('Reporte de Usuarios', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha de exportación: ${new Date().toLocaleString()}`, 14, 30);

    doc.setFontSize(12);
    doc.setTextColor(13, 42, 77);
    doc.text('Resumen', 14, 40);

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Total de Usuarios: ${stats.total}`, 20, 48);
    doc.text(`Usuarios Activos: ${stats.active}`, 20, 55);
    doc.text(`Usuarios Inactivos: ${stats.inactive}`, 20, 62);

    if (selectedTab !== 'all' || searchTerm) {
      doc.text('Filtros aplicados:', 20, 72);
      if (selectedTab !== 'all') {
        doc.text(`- Vista: ${selectedTab}`, 25, 79);
      }
      if (searchTerm) {
        doc.text(`- Búsqueda: ${searchTerm}`, 25, 86);
      }
    }

    const tableData = data.map(item => [
      item.Nombre, item.Email, item.Rol, item.Región,
      item.Estado, item.Certificaciones, `${item['Cumplimiento %']}%`
    ]);

    autoTable(doc, {
      head: [['Nombre', 'Email', 'Rol', 'Región', 'Estado', 'Cert.', 'Cumpl.']],
      body: tableData,
      startY: (selectedTab !== 'all' || searchTerm) ? 95 : 72,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: {
        fillColor: [19, 59, 107],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [240, 245, 250] },
      columnStyles: {
        0: { cellWidth: 35 }, 1: { cellWidth: 40 }, 2: { cellWidth: 20 },
        3: { cellWidth: 20 }, 4: { cellWidth: 15 }, 5: { cellWidth: 12 },
        6: { cellWidth: 15 }
      }
    });

    const fileName = `usuarios_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 0.5 }}>
              Gestión de Usuarios
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Administre los usuarios del sistema SICAG - {filteredUsers.length} usuarios encontrados
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              size="small"
              onClick={handleExportClick}
              sx={{
                color: colors.primary.main,
                borderColor: colors.primary.main,
                '&:hover': {
                  borderColor: colors.primary.dark,
                  backgroundColor: '#e8f0fe'
                }
              }}
            >
              Exportar
            </Button>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={handleAddUser}
              sx={{
                bgcolor: colors.primary.main,
                '&:hover': { bgcolor: colors.primary.dark }
              }}
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
                      <SearchIcon fontSize="small" sx={{ color: colors.primary.main }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm('')}>
                        <CancelIcon fontSize="small" sx={{ color: colors.text.secondary }} />
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
                  sx={{
                    borderColor: colors.primary.main,
                    color: colors.primary.main
                  }}
                  variant="outlined"
                />
                <Chip
                  label={`Activos: ${stats.active}`}
                  size="small"
                  sx={{
                    borderColor: colors.secondary.main,
                    color: colors.secondary.main
                  }}
                  variant="outlined"
                />
                <Chip
                  label={`Inactivos: ${stats.inactive}`}
                  size="small"
                  sx={{
                    borderColor: colors.primary.dark,
                    color: colors.primary.dark
                  }}
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
          sx={{
            minHeight: 48,
            '& .MuiTab-root': {
              color: colors.text.secondary,
              '&.Mui-selected': {
                color: colors.primary.main
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: colors.primary.main
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
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '25%' }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }}>Región</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }}>Certificaciones</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }}>Cumplimiento</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '15%' }}>Último Acceso</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark, width: '10%' }} align="center">Acciones</TableCell>
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
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                            {user.name}
                            {user.status === 'inactive' && (
                              <Chip
                                label="INACTIVO"
                                size="small"
                                sx={{
                                  ml: 1,
                                  height: 18,
                                  fontSize: '0.65rem',
                                  bgcolor: colors.primary.dark,
                                  color: 'white'
                                }}
                              />
                            )}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                            {user.email}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                            <PhoneIcon sx={{ fontSize: 12, color: colors.text.secondary }} />
                            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
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
                        <LocationIcon sx={{ fontSize: 14, color: colors.text.secondary }} />
                        <Typography variant="body2" sx={{ color: colors.primary.dark }}>{user.region}</Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        Registro: {user.registrationDate}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                          {user.certifications}
                        </Typography>
                        {user.pending > 0 && (
                          <Chip
                            label={`${user.pending} pendientes`}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: '0.65rem',
                              mt: 0.5,
                              bgcolor: colors.accents.blue,
                              color: 'white'
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Tooltip title={`${user.compliance}% de cumplimiento`}>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
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
                                bgcolor: user.compliance >= 90 ? colors.secondary.main :
                                  user.compliance >= 70 ? colors.accents.blue : colors.primary.dark
                              }
                            }}
                          />
                        </Box>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" sx={{ color: colors.primary.dark }}>
                        {user.lastAccess.split(' ')[0]}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
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
                            sx={{ color: colors.primary.main }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Cambiar rol del usuario">
                          <IconButton
                            size="small"
                            onClick={() => handleChangeRole(user)}
                            sx={{
                              color: colors.accents.purple,
                              bgcolor: '#f0ebff',
                              '&:hover': {
                                bgcolor: '#e0d6ff'
                              }
                            }}
                          >
                            <SwapHorizIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Editar usuario">
                          <IconButton
                            size="small"
                            onClick={() => handleEditUser(user)}
                            sx={{ color: colors.accents.blue }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar usuario">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteUser(user.id)}
                            sx={{ color: colors.status.error }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={user.status === 'active' ? 'Desactivar' : 'Activar'}>
                          <FormControlLabel
                            control={
                              <Switch
                                size="small"
                                checked={user.status === 'active'}
                                onChange={() => handleToggleStatus(user.id)}
                                sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: colors.secondary.main,
                                    '&:hover': {
                                      backgroundColor: '#e0f7f7',
                                    },
                                  },
                                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: colors.secondary.main,
                                  },
                                }}
                              />
                            }
                            label=""
                          />
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
            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
              Mostrando {((page - 1) * rowsPerPage) + 1} - {Math.min(page * rowsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
            </Typography>
            <Pagination
              count={Math.ceil(filteredUsers.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              size="small"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: colors.primary.main,
                  '&.Mui-selected': {
                    backgroundColor: colors.primary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: colors.primary.dark,
                    }
                  }
                }
              }}
            />
          </Box>
        </Paper>
      </Box>

      {/* Estadísticas en footer */}
      <Paper elevation={0} sx={{ mt: 2, p: 2, bgcolor: '#f8f9fa' }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: colors.primary.main, fontWeight: 'bold' }}>
                {stats.total}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                Total Usuarios
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: colors.secondary.main, fontWeight: 'bold' }}>
                {stats.active}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
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
                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
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

      {/* Diálogo para cambiar rol */}
      <Dialog open={openRoleDialog} onClose={() => setOpenRoleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          bgcolor: colors.accents.purple,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SwapHorizIcon />
            <Typography variant="h6">Cambiar Rol de Usuario</Typography>
          </Box>
          <IconButton onClick={() => setOpenRoleDialog(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          {selectedUser && (
            <>
              <Box sx={{ mb: 3, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ color: colors.primary.dark, mb: 1 }}>
                  Usuario Seleccionado:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: getRoleColor(selectedUser.role),
                      fontSize: '1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {selectedUser.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                      {selectedUser.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                      {selectedUser.email}
                    </Typography>
                    <Chip
                      label={`Rol actual: ${selectedUser.roleName}`}
                      size="small"
                      sx={{
                        mt: 0.5,
                        bgcolor: `${getRoleColor(selectedUser.role)}15`,
                        color: getRoleColor(selectedUser.role),
                        fontSize: '0.7rem',
                        height: 20
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3 }}>
                Seleccione el nuevo rol que desea asignar al usuario. El cambio afectará sus permisos y accesos en el sistema.
              </Alert>

              <FormControl fullWidth>
                <InputLabel id="change-role-label">Nuevo Rol</InputLabel>
                <Select
                  labelId="change-role-label"
                  value={selectedUser.role}
                  label="Nuevo Rol"
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    role: e.target.value,
                    roleName: getRoleName(e.target.value)
                  })}
                >
                  {availableRoles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: role.color,
                            mr: 1
                          }}
                        />
                        <Typography sx={{ flex: 1 }}>{role.label}</Typography>
                        {selectedUser.role === role.value && (
                          <Chip
                            label="Actual"
                            size="small"
                            sx={{
                              bgcolor: colors.secondary.main,
                              color: 'white',
                              height: 20,
                              fontSize: '0.65rem'
                            }}
                          />
                        )}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mt: 3 }}>
                <Typography variant="caption" sx={{ color: colors.text.secondary, fontWeight: 'bold' }}>
                  Implicaciones del cambio de rol:
                </Typography>
                <Box sx={{ mt: 1, pl: 2 }}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                    • Los permisos del usuario se actualizarán automáticamente
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                    • El acceso a módulos específicos cambiará según el nuevo rol
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                    • Se notificará al usuario del cambio por correo electrónico
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: `1px solid ${colors.primary.light}` }}>
          <Button
            onClick={() => setOpenRoleDialog(false)}
            variant="outlined"
            sx={{
              borderColor: colors.primary.main,
              color: colors.primary.main,
              '&:hover': { borderColor: colors.primary.dark, bgcolor: 'rgba(19, 59, 107, 0.08)' }
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveRole}
            variant="contained"
            sx={{ bgcolor: colors.accents.purple, '&:hover': { bgcolor: colors.primary.dark } }}
          >
            Confirmar Cambio de Rol
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de usuario - COMPLETAMENTE SIMPLIFICADO */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          bgcolor: colors.primary.main,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {dialogMode === 'add' ? <PersonAddIcon /> : <EditIcon />}
            <Typography variant="h6">
              {dialogMode === 'add' ? 'Nuevo Usuario' : 'Editar Usuario'}
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenDialog(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre completo"
                value={selectedUser?.name || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={selectedUser?.email || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                required
                size="small"
              />
            </Grid>

            {/* Solo campo de contraseña simple en modo agregar */}
            {dialogMode === 'add' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" sx={{ color: colors.primary.main }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Rol</InputLabel>
                <Select
                  value={selectedUser?.role || 'agente'}
                  label="Rol"
                  onChange={(e) => setSelectedUser({
                    ...selectedUser,
                    role: e.target.value,
                    roleName: getRoleName(e.target.value)
                  })}
                >
                  {availableRoles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: role.color }} />
                        {role.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Región</InputLabel>
                <Select
                  value={selectedUser?.region || 'Norte'}
                  label="Región"
                  onChange={(e) => setSelectedUser({ ...selectedUser, region: e.target.value })}
                >
                  <MenuItem value="Norte">Norte</MenuItem>
                  <MenuItem value="Centro">Centro</MenuItem>
                  <MenuItem value="Sur">Sur</MenuItem>
                  <MenuItem value="Occidente">Occidente</MenuItem>
                  <MenuItem value="Metropolitana">Metropolitana</MenuItem>
                  <MenuItem value="Todas">Todas</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teléfono"
                value={selectedUser?.phone || ''}
                onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedUser?.status === 'active'}
                    onChange={(e) => setSelectedUser({
                      ...selectedUser,
                      status: e.target.checked ? 'active' : 'inactive'
                    })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: colors.secondary.main,
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: colors.secondary.main,
                      },
                    }}
                  />
                }
                label="Usuario activo"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: `1px solid ${colors.primary.light}` }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{
              borderColor: colors.primary.main,
              color: colors.primary.main,
              '&:hover': { borderColor: colors.primary.dark, bgcolor: 'rgba(19, 59, 107, 0.08)' }
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveUser}
            variant="contained"
            sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
          >
            {dialogMode === 'add' ? 'Crear Usuario' : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de exportación */}
      <Dialog open={exportDialogOpen} onClose={handleExportDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{
          bgcolor: colors.primary.main,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DownloadIcon />
            <Typography variant="h6">Exportar Usuarios</Typography>
          </Box>
          <IconButton onClick={handleExportDialogClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ color: colors.text.primary, fontWeight: 'bold', mb: 1 }}>
              Formato de exportación
            </FormLabel>
            <RadioGroup value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              <FormControlLabel
                value="excel"
                control={<Radio sx={{ color: colors.primary.main }} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ExcelIcon sx={{ color: colors.status.success }} />
                    <Typography>Excel (.xlsx)</Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="pdf"
                control={<Radio sx={{ color: colors.primary.main }} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PdfIcon sx={{ color: colors.status.error }} />
                    <Typography>PDF (.pdf)</Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </Box>

          <Box>
            <FormLabel component="legend" sx={{ color: colors.text.primary, fontWeight: 'bold', mb: 1 }}>
              Alcance de la exportación
            </FormLabel>
            <RadioGroup value={exportScope} onChange={(e) => setExportScope(e.target.value)}>
              <FormControlLabel
                value="filtered"
                control={<Radio sx={{ color: colors.primary.main }} />}
                label={`Solo resultados filtrados (${filteredUsers.length} usuarios)`}
              />
              <FormControlLabel
                value="all"
                control={<Radio sx={{ color: colors.primary.main }} />}
                label={`Todos los usuarios (${users.length} usuarios)`}
              />
            </RadioGroup>
          </Box>

          {exportScope === 'filtered' && (selectedTab !== 'all' || searchTerm) && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Se exportarán {filteredUsers.length} usuarios con los filtros aplicados actualmente.
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: `1px solid ${colors.primary.light}` }}>
          <Button
            onClick={handleExportDialogClose}
            variant="outlined"
            sx={{
              borderColor: colors.primary.main,
              color: colors.primary.main,
              '&:hover': { borderColor: colors.primary.dark, bgcolor: 'rgba(19, 59, 107, 0.08)' }
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleExport}
            variant="contained"
            disabled={exportLoading}
            startIcon={exportLoading ? <RefreshIcon className="spin" /> : <DownloadIcon />}
            sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
          >
            {exportLoading ? 'Exportando...' : 'Exportar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            bgcolor: snackbar.severity === 'success' ? colors.status.success :
              snackbar.severity === 'error' ? colors.status.error :
                colors.status.info,
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Estilo para animación de spin */}
      <style>
        {`
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default UserManagement;