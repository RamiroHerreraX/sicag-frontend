// src/pages/superadmin/SystemInstances.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Avatar,
  Tab,
  Tabs,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Badge,
  LinearProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TablePagination,
  Toolbar,
  alpha,
  lighten,
  darken
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  ContentCopy as DuplicateIcon,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Security as SecurityIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  Palette as PaletteIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  PlayArrow as EnableIcon,
  Pause as DisableIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  CloudUpload as CloudUploadIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon,
  FiberNew as NewIcon,
  Archive as ArchiveIcon,
  DataObject as DataObjectIcon,
  Schema as SchemaIcon,
  Layers as LayersIcon,
  Domain as DomainIcon,
  Apartment as ApartmentIcon,
  CorporateFare as CorporateFareIcon,
  AccountTree as AccountTreeIcon,
  Hub as HubIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Storage as StorageIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Numbers as NumbersIcon,
  Book as BookIcon
} from '@mui/icons-material';

const SystemInstances = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDuplicateDialog, setOpenDuplicateDialog] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Datos de las instancias del sistema
  const systemInstances = [
    {
      id: 1,
      name: 'Área de Ingeniería',
      code: 'ENG-001',
      description: 'Sistema de certificaciones para la Facultad de Ingeniería',
      status: 'active',
      users: 245,
      certifications: 15,
      courses: 8,
      lastBackup: '15/01/2026 03:00',
      modules: {
        certifications: true,
        courses: false,
        recognition: true,
        documents: true,
        audit: true,
        reports: false
      },
      colors: {
        primary: '#1b5e20',
        secondary: '#4caf50',
        accent: '#8bc34a'
      },
      created: '10/01/2024',
      admin: 'Dr. Carlos Méndez',
      email: 'carlos.mendez@institucion.edu',
      region: 'Centro',
      storageUsed: '2.5 GB',
      lastActivity: '15/01/2026 10:30'
    },
    {
      id: 2,
      name: 'Área de Medicina',
      code: 'MED-001',
      description: 'Sistema para certificaciones médicas y especialidades',
      status: 'active',
      users: 189,
      certifications: 12,
      courses: 6,
      lastBackup: '14/01/2026 03:00',
      modules: {
        certifications: true,
        courses: true,
        recognition: true,
        documents: true,
        audit: true,
        reports: true
      },
      colors: {
        primary: '#0d47a1',
        secondary: '#2196f3',
        accent: '#64b5f6'
      },
      created: '15/03/2024',
      admin: 'Dra. Ana López',
      email: 'ana.lopez@institucion.edu',
      region: 'Norte',
      storageUsed: '1.8 GB',
      lastActivity: '14/01/2026 16:45'
    },
    {
      id: 3,
      name: 'Programa de Posgrado',
      code: 'POS-001',
      description: 'Gestión de certificaciones para programas de posgrado',
      status: 'maintenance',
      users: 78,
      certifications: 8,
      courses: 4,
      lastBackup: '13/01/2026 03:00',
      modules: {
        certifications: true,
        courses: true,
        recognition: false,
        documents: true,
        audit: false,
        reports: false
      },
      colors: {
        primary: '#4a148c',
        secondary: '#7b1fa2',
        accent: '#ba68c8'
      },
      created: '20/06/2024',
      admin: 'Mtro. Roberto Díaz',
      email: 'roberto.diaz@institucion.edu',
      region: 'Centro',
      storageUsed: '850 MB',
      lastActivity: '13/01/2026 09:15'
    },
    {
      id: 4,
      name: 'Área de Derecho',
      code: 'LAW-001',
      description: 'Certificaciones y colegiaturas para abogados',
      status: 'inactive',
      users: 156,
      certifications: 10,
      courses: 5,
      lastBackup: '10/01/2026 03:00',
      modules: {
        certifications: true,
        courses: false,
        recognition: false,
        documents: true,
        audit: true,
        reports: false
      },
      colors: {
        primary: '#bf360c',
        secondary: '#e64a19',
        accent: '#ff8a65'
      },
      created: '05/09/2024',
      admin: 'Lic. Fernando Gómez',
      email: 'fernando.gomez@institucion.edu',
      region: 'Sur',
      storageUsed: '1.2 GB',
      lastActivity: '10/01/2026 14:20'
    },
    {
      id: 5,
      name: 'Campus Virtual',
      code: 'VIR-001',
      description: 'Plataforma de certificaciones en línea',
      status: 'active',
      users: 342,
      certifications: 20,
      courses: 15,
      lastBackup: '15/01/2026 03:00',
      modules: {
        certifications: true,
        courses: true,
        recognition: true,
        documents: true,
        audit: true,
        reports: true
      },
      colors: {
        primary: '#00695c',
        secondary: '#009688',
        accent: '#4db6ac'
      },
      created: '12/11/2024',
      admin: 'Ing. Sofía Ramírez',
      email: 'sofia.ramirez@institucion.edu',
      region: 'Nacional',
      storageUsed: '3.2 GB',
      lastActivity: '15/01/2026 11:45'
    },
    {
      id: 6,
      name: 'Departamento de Ciencias',
      code: 'SCI-001',
      description: 'Certificaciones para ciencias básicas y aplicadas',
      status: 'active',
      users: 198,
      certifications: 14,
      courses: 9,
      lastBackup: '14/01/2026 03:00',
      modules: {
        certifications: true,
        courses: true,
        recognition: true,
        documents: true,
        audit: false,
        reports: true
      },
      colors: {
        primary: '#827717',
        secondary: '#9e9d24',
        accent: '#cddc39'
      },
      created: '22/02/2024',
      admin: 'Dr. Miguel Ángel Ruiz',
      email: 'miguel.ruiz@institucion.edu',
      region: 'Centro',
      storageUsed: '1.5 GB',
      lastActivity: '14/01/2026 08:30'
    },
    {
      id: 7,
      name: 'Programa de Extensión',
      code: 'EXT-001',
      description: 'Certificaciones para cursos de extensión universitaria',
      status: 'draft',
      users: 45,
      certifications: 3,
      courses: 2,
      lastBackup: '12/01/2026 03:00',
      modules: {
        certifications: true,
        courses: false,
        recognition: false,
        documents: true,
        audit: false,
        reports: false
      },
      colors: {
        primary: '#37474f',
        secondary: '#546e7a',
        accent: '#78909c'
      },
      created: '30/12/2024',
      admin: 'Lic. Patricia Castro',
      email: 'patricia.castro@institucion.edu',
      region: 'Nacional',
      storageUsed: '350 MB',
      lastActivity: '12/01/2026 12:10'
    },
    {
      id: 8,
      name: 'Área de Arquitectura',
      code: 'ARC-001',
      description: 'Sistema para colegiaturas y certificaciones profesionales',
      status: 'active',
      users: 167,
      certifications: 11,
      courses: 7,
      lastBackup: '13/01/2026 03:00',
      modules: {
        certifications: true,
        courses: true,
        recognition: true,
        documents: true,
        audit: true,
        reports: true
      },
      colors: {
        primary: '#3e2723',
        secondary: '#5d4037',
        accent: '#8d6e63'
      },
      created: '18/07/2024',
      admin: 'Arq. Luis Fernando Morales',
      email: 'luis.morales@institucion.edu',
      region: 'Norte',
      storageUsed: '1.1 GB',
      lastActivity: '13/01/2026 15:40'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'active', label: 'Activas', color: '#4caf50' },
    { value: 'inactive', label: 'Inactivas', color: '#f44336' },
    { value: 'maintenance', label: 'En mantenimiento', color: '#ff9800' },
    { value: 'draft', label: 'Borrador', color: '#9e9e9e' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#4caf50';
      case 'inactive': return '#f44336';
      case 'maintenance': return '#ff9800';
      case 'draft': return '#9e9e9e';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <CheckCircleIcon fontSize="small" />;
      case 'inactive': return <ErrorIcon fontSize="small" />;
      case 'maintenance': return <WarningIcon fontSize="small" />;
      case 'draft': return <EditIcon fontSize="small" />;
      default: return null;
    }
  };

  const filteredInstances = systemInstances.filter(instance => {
    const matchesSearch = 
      instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.admin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' ? true : instance.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateInstance = () => {
    setOpenCreateDialog(true);
    setActiveStep(0);
  };

  const handleDuplicateInstance = (instance) => {
    setSelectedInstance(instance);
    setOpenDuplicateDialog(true);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredInstances.map((n) => n.id);
      setSelectedRows(newSelected);
      return;
    }
    setSelectedRows([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    setSelectedRows(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  const CreateInstanceDialog = () => (
    <Dialog 
      open={openCreateDialog} 
      onClose={() => setOpenCreateDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <NewIcon color="primary" />
          <Typography variant="h6">Crear Nueva Instancia</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} orientation="vertical">
          {/* Paso 1: Configuración básica */}
          <Step>
            <StepLabel>Configuración Básica</StepLabel>
            <StepContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre del Área/Sistema"
                    placeholder="Ej: Área de Ingeniería Civil"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Código Único"
                    placeholder="Ej: ENG-CIV-001"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Tipo de Instancia</InputLabel>
                    <Select label="Tipo de Instancia" defaultValue="">
                      <MenuItem value="academic">Área Académica</MenuItem>
                      <MenuItem value="department">Departamento</MenuItem>
                      <MenuItem value="program">Programa Educativo</MenuItem>
                      <MenuItem value="campus">Campus/Sede</MenuItem>
                      <MenuItem value="enterprise">Empresa/Organización</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    multiline
                    rows={3}
                    placeholder="Descripción del propósito de esta instancia..."
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Administrador Principal"
                    placeholder="Nombre del administrador asignado"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleNextStep}>
                  Continuar
                </Button>
              </Box>
            </StepContent>
          </Step>

          {/* Paso 2: Módulos a habilitar */}
          <Step>
            <StepLabel>Selección de Módulos</StepLabel>
            <StepContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Selecciona los módulos que estarán disponibles en esta instancia
              </Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  {[
                    { id: 'certifications', label: 'Gestión de Certificaciones', icon: <DescriptionIcon /> },
                    { id: 'courses', label: 'Programas y Cursos', icon: <SchoolIcon /> },
                    { id: 'recognition', label: 'Niveles de Reconocimiento', icon: <CheckCircleIcon /> },
                    { id: 'documents', label: 'Gestión Documental', icon: <DescriptionIcon /> },
                    { id: 'audit', label: 'Auditoría y Trazabilidad', icon: <SecurityIcon /> },
                    { id: 'reports', label: 'Reportes y Analytics', icon: <DashboardIcon /> }
                  ].map((module) => (
                    <Grid item xs={12} md={6} key={module.id}>
                      <Paper elevation={0} sx={{ p: 2, border: '1px solid #e0e0e0' }}>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {module.icon}
                              <Typography variant="body2">{module.label}</Typography>
                            </Box>
                          }
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button onClick={handleBackStep}>Atrás</Button>
                <Button variant="contained" onClick={handleNextStep}>
                  Continuar
                </Button>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
      </DialogContent>
    </Dialog>
  );

  const DuplicateInstanceDialog = () => (
    <Dialog 
      open={openDuplicateDialog} 
      onClose={() => setOpenDuplicateDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <DuplicateIcon color="primary" />
          <Typography variant="h6">Duplicar Instancia</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {selectedInstance && (
          <>
            <Alert severity="info" sx={{ mb: 2 }}>
              Se duplicará la estructura completa de: <strong>{selectedInstance.name}</strong>
            </Alert>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nuevo Nombre"
                  defaultValue={`${selectedInstance.name} - Copia`}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nuevo Código"
                  defaultValue={`${selectedInstance.code}-COPY`}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel>Administrador Asignado</InputLabel>
                  <Select label="Administrador Asignado" defaultValue="">
                    <MenuItem value="current">Mantener mismo administrador</MenuItem>
                    <MenuItem value="new">Asignar nuevo administrador</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDuplicateDialog(false)}>Cancelar</Button>
        <Button variant="contained" onClick={() => setOpenDuplicateDialog(false)}>
          Duplicar Instancia
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
              Super Administración - Instancias del Sistema
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Gestión de múltiples áreas, programas y entidades independientes
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<BackupIcon />}
              size="small"
            >
              Backup Global
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              onClick={handleCreateInstance}
            >
              Nueva Instancia
            </Button>
          </Stack>
        </Box>

        {/* Tabs */}
        <Paper sx={{ mb: 2 }}>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<DomainIcon />} label="Todas las Instancias" />
            <Tab icon={<PeopleIcon />} label="Administradores" />
            <Tab icon={<SettingsIcon />} label="Configuración Global" />
            <Tab icon={<SecurityIcon />} label="Seguridad" />
            <Tab icon={<CloudUploadIcon />} label="Migraciones" />
          </Tabs>
        </Paper>

        {/* Filtros y búsqueda */}
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8f9fa' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar por nombre, código, administrador..."
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
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filterStatus}
                  label="Estado"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  {statusOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {option.color && (
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: option.color }} />
                        )}
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setSelectedRows([]);
                }}
              >
                Limpiar Filtros
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Contenido principal */}
      {selectedTab === 0 && (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Estadísticas */}


          {/* Tabla de instancias */}
          <Paper sx={{ width: '100%', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Toolbar
              sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
              }}
            >
              <Box sx={{ flex: '1 1 100%' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Instancias del Sistema
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {filteredInstances.length} instancias encontradas
                </Typography>
              </Box>
              
              {selectedRows.length > 0 && (
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                    {selectedRows.length} seleccionados
                  </Typography>
                  <IconButton size="small">
                    <EnableIcon />
                  </IconButton>
                  <IconButton size="small">
                    <DisableIcon />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              )}
            </Toolbar>
            
            <TableContainer sx={{ flex: 1 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedRows.length > 0 && selectedRows.length < filteredInstances.length}
                        checked={filteredInstances.length > 0 && selectedRows.length === filteredInstances.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell>Instancia</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell align="center">Usuarios</TableCell>
                    <TableCell align="center">Certificaciones</TableCell>
                    <TableCell>Administrador</TableCell>
                    <TableCell>Última Actividad</TableCell>
                    <TableCell align="center">Almacenamiento</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInstances
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((instance) => {
                      const isItemSelected = isSelected(instance.id);
                      
                      return (
                        <TableRow
                          hover
                          key={instance.id}
                          selected={isItemSelected}
                          onClick={(event) => handleClick(event, instance.id)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isItemSelected} />
                          </TableCell>
                          
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  bgcolor: instance.colors.primary,
                                  fontSize: '1rem',
                                  fontWeight: 'bold'
                                }}
                              >
                                {instance.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {instance.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {instance.code} • {instance.description}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  <CalendarIcon sx={{ fontSize: '0.8rem', verticalAlign: 'middle', mr: 0.5 }} />
                                  Creada: {instance.created}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          
                          <TableCell>
                            <Chip
                              size="small"
                              label={instance.status === 'active' ? 'Activa' : 
                                     instance.status === 'inactive' ? 'Inactiva' : 
                                     instance.status === 'maintenance' ? 'Mantenimiento' : 'Borrador'}
                              icon={getStatusIcon(instance.status)}
                              sx={{ 
                                bgcolor: `${getStatusColor(instance.status)}15`,
                                color: getStatusColor(instance.status),
                                fontWeight: 'medium',
                                minWidth: 100
                              }}
                            />
                          </TableCell>
                          
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                              <PersonIcon fontSize="small" color="action" />
                              <Typography variant="body2" fontWeight="bold">
                                {instance.users}
                              </Typography>
                            </Box>
                          </TableCell>
                          
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                              <BookIcon fontSize="small" color="action" />
                              <Typography variant="body2" fontWeight="bold">
                                {instance.certifications}
                              </Typography>
                            </Box>
                          </TableCell>
                          
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 28, height: 28, fontSize: '0.8rem' }}>
                                {instance.admin.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2">{instance.admin}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {instance.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          
                          <TableCell>
                            <Box>
                              <Typography variant="body2">
                                {instance.lastActivity}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Backup: {instance.lastBackup}
                              </Typography>
                            </Box>
                          </TableCell>
                          
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                              <StorageIcon fontSize="small" color="action" />
                              <Typography variant="body2" fontWeight="bold">
                                {instance.storageUsed}
                              </Typography>
                            </Box>
                          </TableCell>
                          
                          <TableCell align="center">
                            <Stack direction="row" spacing={0.5} justifyContent="center">
                              <Tooltip title="Ver detalles">
                                <IconButton size="small">
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Editar configuración">
                                <IconButton size="small">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Duplicar instancia">
                                <IconButton 
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDuplicateInstance(instance);
                                  }}
                                >
                                  <DuplicateIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Más opciones">
                                <IconButton size="small">
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  
                  {filteredInstances.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <DomainIcon sx={{ fontSize: 60, color: '#e0e0e0', mb: 2 }} />
                          <Typography variant="body1" color="text.secondary" gutterBottom>
                            No se encontraron instancias
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Intenta con otros términos de búsqueda o filtros
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredInstances.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
          </Paper>
        </Box>
      )}

      {selectedTab === 1 && (
        <Paper elevation={1} sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 3, color: '#2c3e50' }}>
            Gestión de Administradores por Área
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Administrador</TableCell>
                  <TableCell>Áreas Asignadas</TableCell>
                  <TableCell>Permisos</TableCell>
                  <TableCell>Último Acceso</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>CM</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">Dr. Carlos Méndez</Typography>
                        <Typography variant="caption" color="text.secondary">carlos.mendez@institucion.edu</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label="Ingeniería" sx={{ mr: 0.5 }} />
                    <Chip size="small" label="Campus Virtual" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <Chip size="small" label="Completo" color="primary" />
                      <Chip size="small" label="Solo lectura" variant="outlined" />
                    </Stack>
                  </TableCell>
                  <TableCell>15/01/2026 10:30</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>AL</Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">Dra. Ana López</Typography>
                        <Typography variant="caption" color="text.secondary">ana.lopez@institucion.edu</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label="Medicina" sx={{ mr: 0.5 }} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <Chip size="small" label="Completo" color="primary" />
                    </Stack>
                  </TableCell>
                  <TableCell>14/01/2026 16:45</TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {selectedTab === 2 && (
        <Paper elevation={1} sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 3, color: '#2c3e50' }}>
            Configuración Global del Sistema
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon color="primary" />
                    Políticas de Seguridad
                  </Typography>
                  
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Encriptación de datos en reposo"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Autenticación de dos factores obligatoria"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Registro de auditoría detallado"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Separación lógica estricta entre áreas"
                    />
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BackupIcon color="primary" />
                    Políticas de Backup
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Frecuencia de backup automático"
                    select
                    size="small"
                    defaultValue="daily"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="hourly">Cada hora</MenuItem>
                    <MenuItem value="daily">Diario</MenuItem>
                    <MenuItem value="weekly">Semanal</MenuItem>
                  </TextField>
                  
                  <TextField
                    fullWidth
                    label="Retención de backups"
                    select
                    size="small"
                    defaultValue="30"
                  >
                    <MenuItem value="7">7 días</MenuItem>
                    <MenuItem value="30">30 días</MenuItem>
                    <MenuItem value="90">90 días</MenuItem>
                    <MenuItem value="365">1 año</MenuItem>
                  </TextField>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Diálogos */}
      <CreateInstanceDialog />
      <DuplicateInstanceDialog />
    </Box>
  );
};

export default SystemInstances;