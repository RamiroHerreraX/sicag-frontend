import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Alert,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Help as HelpIcon,
  Cancel as CancelIcon,
  Info as InfoIcon,
  Description as DescriptionIcon,
  Security as SecurityIcon,
  Group as GroupIcon,
  VerifiedUser as VerifiedUserIcon,
  WarningAmber as WarningAmberIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

// Paleta corporativa del UserManagement
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

const Certifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [associationDialog, setAssociationDialog] = useState(true);
  const [associationConsent, setAssociationConsent] = useState(null);

  // Datos de autorización con toda la información
  const associationDetails = {
    name: 'Asociación de Agentes Aduanales del Estado',
    role: 'Rol auxiliar - Entidad Asociativa',
    permissions: [
      'Cargar evidencias institucionales (constancias, certificados)',
      'Subir documentación de cursos y capacitaciones',
      'Enviar documentación de pertenencia a la asociación',
      'Visualizar información general de agentes asociados',
      'Centralizar documentación común a varios agentes'
    ],
    restrictions: [
      'No puede validar certificaciones individuales',
      'No puede modificar expedientes personales',
      'No sustituye la responsabilidad individual del agente',
      'Acceso limitado a información específica',
      'No puede tomar decisiones en nombre del agente'
    ],
    benefits: [
     
    ],
    considerations: [
      
    ]
  };

  // Datos mock de certificaciones
  const [certifications, setCertifications] = useState([
    { 
      id: 1, 
      type: 'PATENTE ADUANAL', 
      number: 'PA-2026-00145', 
      issueDate: '11/01/2026', 
      expirationDate: '11/01/2029', 
      status: 'Aceptados',
      progress: 100,
      documents: 5,
      lastUpdate: '15/01/2026'
    },
    { 
      id: 2, 
      type: 'OPINIÓN SAT POSITIVA', 
      number: 'OS-2025-03421', 
      issueDate: '15/11/2025', 
      expirationDate: '15/11/2026', 
      status: 'En revisión',
      progress: 30,
      documents: 3,
      lastUpdate: '10/01/2026'
    },
    { 
      id: 3, 
      type: 'CÉDULA PROFESIONAL', 
      number: 'CP-2024-56789', 
      issueDate: '20/03/2024', 
      expirationDate: '20/03/2027', 
      status: 'Aceptados',
      progress: 100,
      documents: 4,
      lastUpdate: '05/01/2026'
    },
    { 
      id: 4, 
      type: 'PODER NOTARIAL', 
      number: 'PN-2025-12345', 
      issueDate: '10/08/2025', 
      expirationDate: '10/08/2026', 
      status: 'Información adicional',
      progress: 60,
      documents: 2,
      lastUpdate: '08/01/2026'
    },
    { 
      id: 5, 
      type: 'CONSTANCIA FISCAL', 
      number: 'CF-2026-00123', 
      issueDate: '05/01/2026', 
      expirationDate: '05/01/2027', 
      status: 'En revisión',
      progress: 40,
      documents: 3,
      lastUpdate: '14/01/2026'
    },
    { 
      id: 6, 
      type: 'REGISTRO INICIAL', 
      number: 'RI-2026-00001', 
      issueDate: '01/01/2026', 
      expirationDate: '01/01/2027', 
      status: 'Registro',
      progress: 20,
      documents: 1,
      lastUpdate: '01/01/2026'
    },
   
  ]);

  // Estadísticas
  const stats = {
    total: certifications.length,
    valid: certifications.filter(c => c.status === 'Aceptados').length,
    expiring: certifications.filter(c => c.status === 'Por Vencer').length,
    review: certifications.filter(c => c.status === 'En revisión' || c.status === 'Información adicional').length,
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Registro': return 'info';
      case 'En revisión': return 'warning';
      case 'Aceptados': return 'success';
      case 'Información adicional': return 'primary';
      case 'Rechazado': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Registro': return <DescriptionIcon />;
      case 'En revisión': return <VisibilityIcon />;
      case 'Aceptados': return <CheckCircleIcon />;
      case 'Información adicional': return <InfoIcon />;
      case 'Rechazado': return <CancelIcon />;
      default: return <HelpIcon />;
    }
  };

  const handleDeleteClick = (cert) => {
    setSelectedCert(cert);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCert) {
      setCertifications(certifications.filter(c => c.id !== selectedCert.id));
      setDeleteDialog(false);
      setSelectedCert(null);
    }
  };

  const handleAssociationConsent = (consent) => {
    setAssociationConsent(consent);
    setAssociationDialog(false);
    console.log(`Usuario ${consent ? 'aceptó' : 'rechazó'} la autorización`);
    
  };

  const filteredCerts = certifications.filter(cert => {
    const matchesSearch = 
      cert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || cert.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box>
      {/* Diálogo de Autorización MEJORADO - OCUPA TODA LA ALTURA */}
      {associationDialog && associationConsent === null && (
        <Dialog 
          open={associationDialog} 
          maxWidth="lg"
          fullWidth
          fullScreen={false}
          PaperProps={{
            sx: { 
              height: '90vh',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column'
            }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: colors.primary.dark, 
            color: 'white',
            py: 2,
            flexShrink: 0
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SecurityIcon sx={{ fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Autorización para Asociación de Agentes Aduanales
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.9 }}>
                  Decisión importante para la gestión de tus certificaciones
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          
          <DialogContent dividers sx={{ 
            flex: 1,
            overflow: 'auto',
            py: 2,
            px: 3
          }}>
            {/* Información de la asociación */}
            <Alert severity="info" sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <GroupIcon />
                <Typography variant="subtitle2" fontWeight="bold">
                  {associationDetails.name}
                </Typography>
              </Box>
              <Typography variant="body2">
                Esta asociación funciona como entidad auxiliar dentro del sistema, permitiendo centralizar información común y documentación compartida, sin sustituir tu responsabilidad individual.
              </Typography>
            </Alert>

            {/* COMPARACIÓN LADO A LADO CON SCROLL INDEPENDIENTE */}
            <Grid container spacing={3} sx={{ height: 'calc(100% - 120px)', mb: 2 }}>
              {/* COLUMNA IZQUIERDA - ACEPTAR */}
              <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Paper 
                  elevation={3}
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    border: `2px solid ${colors.status.success}`,
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  {/* Encabezado */}
                  <Box sx={{ 
                    bgcolor: colors.status.success, 
                    p: 2,
                    textAlign: 'center',
                    flexShrink: 0
                  }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      <CheckIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      SI ACEPTAS LA AUTORIZACIÓN
                    </Typography>
                  </Box>

                  {/* Contenido con scroll */}
                  <Box sx={{ 
                    flex: 1, 
                    overflow: 'auto',
                    p: 2.5
                  }}>
                    {/* Permisos */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: colors.status.success, mb: 1.5, display: 'flex', alignItems: 'center' }}>
                        <ArrowForwardIcon sx={{ mr: 1, fontSize: 18 }} />
                        Tu asociación PODRÁ:
                      </Typography>
                      <Box sx={{ pl: 1 }}>
                        {associationDetails.permissions.map((permission, index) => (
                          <Box 
                            key={index}
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'flex-start', 
                              mb: 1.5
                            }}
                          >
                            <CheckCircleIcon sx={{ color: colors.status.success, mr: 1.5, mt: 0.2, fontSize: 16 }} />
                            <Typography variant="body2" color={colors.text.primary}>
                              {permission}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    

                    {/* Ventaja resumida */}
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Ventaja clave: Reduce carga administrativa y centraliza evidencias comunes
                      </Typography>
                    </Alert>
                  </Box>
                </Paper>
              </Grid>

              {/* COLUMNA DERECHA - RECHAZAR */}
              <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Paper 
                  elevation={3}
                  sx={{ 
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    border: `2px solid ${colors.status.error}`,
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  {/* Encabezado */}
                  <Box sx={{ 
                    bgcolor: colors.status.error, 
                    p: 2,
                    textAlign: 'center',
                    flexShrink: 0
                  }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                      <CloseIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      SI RECHAZAS LA AUTORIZACIÓN
                    </Typography>
                  </Box>

                  {/* Contenido con scroll */}
                  <Box sx={{ 
                    flex: 1, 
                    overflow: 'auto',
                    p: 2.5
                  }}>
                    {/* Restricciones */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: colors.status.error, mb: 1.5, display: 'flex', alignItems: 'center' }}>
                        <ArrowForwardIcon sx={{ mr: 1, fontSize: 18 }} />
                        Tu asociación NO PODRÁ:
                      </Typography>
                      <Box sx={{ pl: 1 }}>
                        {associationDetails.restrictions.map((restriction, index) => (
                          <Box 
                            key={index}
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'flex-start', 
                              mb: 1.5
                            }}
                          >
                            <CancelIcon sx={{ color: colors.status.error, mr: 1.5, mt: 0.2, fontSize: 16 }} />
                            <Typography variant="body2" color={colors.text.primary}>
                              {restriction}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    

                    {/* Consideración resumida */}
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold">
                        Consideración clave: Gestión completamente individual de toda la documentación
                      </Typography>
                    </Alert>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Nota importante */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 2, 
                bgcolor: '#e8f4fd',
                border: '1px solid #90caf9',
                borderRadius: 1
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <InfoIcon sx={{ color: colors.primary.main }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: colors.primary.main, fontWeight: 'bold', mb: 0.5 }}>
                    Nota importante sobre responsabilidades
                  </Typography>
                  <Typography variant="body2" color={colors.text.secondary}>
                    Independientemente de tu decisión, <strong>eres el único responsable</strong> del cumplimiento de tus obligaciones como agente aduanal.
                    La asociación funciona como entidad auxiliar y <strong>NO sustituye tu responsabilidad individual</strong>.
                    Esta autorización puede ser modificada en cualquier momento desde la sección de configuración de tu cuenta.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </DialogContent>

          {/* Acciones */}
          <DialogActions sx={{ 
            justifyContent: 'space-between', 
            p: 2.5,
            bgcolor: '#f8f9fa',
            borderTop: `1px solid ${colors.primary.main}20`,
            flexShrink: 0
          }}>
            <Button 
              onClick={() => handleAssociationConsent(false)}
              variant="contained"
              startIcon={<CloseIcon />}
              sx={{ 
                px: 3,
                fontWeight: 'bold',
                minWidth: 140,
                bgcolor: colors.status.error,
                '&:hover': { bgcolor: colors.primary.dark }
              }}
            >
              No Autorizar
            </Button>
            
            <Button 
              onClick={() => {
                setAssociationDialog(false);
               
              }}
              variant="outlined"
              sx={{ 
                px: 3,
                fontWeight: 'bold',
                color: colors.primary.main,
                borderColor: colors.primary.main
              }}
            >
              Decidir después
            </Button>
            
            <Button 
              onClick={() => handleAssociationConsent(true)}
              variant="contained"
              startIcon={<CheckIcon />}
              sx={{ 
                px: 3,
                fontWeight: 'bold',
                minWidth: 140,
                bgcolor: colors.status.success,
                '&:hover': { bgcolor: colors.primary.dark }
              }}
            >
              Autorizar
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 1 }}>
            Mis Certificaciones
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary }}>
            Gestiona todas tus certificaciones en el sistema SICAG
          </Typography>
          
          {associationConsent !== null && (
            <Box sx={{ mt: 1 }}>
              <Chip
                icon={associationConsent ? <VerifiedUserIcon /> : <WarningAmberIcon />}
                label={`Autorización asociación: ${associationConsent ? 'ACTIVA' : 'INACTIVA'}`}
                color={associationConsent ? "success" : "warning"}
                size="small"
                variant="outlined"
              />
            </Box>
          )}
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/certifications/new"
          sx={{ 
            bgcolor: colors.primary.main, 
            '&:hover': { bgcolor: colors.primary.dark } 
          }}
        >
          Nueva Certificación
        </Button>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: `4px solid ${colors.primary.main}` }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: colors.primary.main, fontWeight: 'bold', mb: 1 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                Total Certificaciones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: `4px solid ${colors.status.success}` }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: colors.status.success, fontWeight: 'bold', mb: 1 }}>
                {stats.valid}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                Vigentes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: `4px solid ${colors.status.warning}` }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: colors.status.warning, fontWeight: 'bold', mb: 1 }}>
                {stats.expiring}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                Por Vencer
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: `4px solid ${colors.status.error}` }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: colors.status.error, fontWeight: 'bold', mb: 1 }}>
                {stats.review}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                En Revisión
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros y búsqueda */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar por tipo o número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: colors.primary.main }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Filtrar por estado"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterIcon sx={{ color: colors.primary.main }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">Todos los estados</MenuItem>
              <MenuItem value="Aceptados">Vigentes</MenuItem>
              <MenuItem value="Por Vencer">Por Vencer</MenuItem>
              <MenuItem value="En revisión">En Revisión</MenuItem>
              <MenuItem value="Información adicional">Observaciones</MenuItem>
              <MenuItem value="Rechazado">Vencidas</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                color: colors.primary.main,
                borderColor: colors.primary.main
              }}
            >
              Exportar Lista
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de certificaciones */}
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f7fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Tipo de Certificación</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Número</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Emisión / Vencimiento</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Progreso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Documentos</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Última Actualización</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: colors.primary.dark }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCerts.map((cert) => (
                <TableRow key={cert.id} hover>
                  <TableCell>
                    <Typography sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                      {cert.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                      {cert.number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                        Emisión: {cert.issueDate}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: cert.status === 'POR VENCER' ? colors.status.warning : colors.text.secondary,
                        display: 'block'
                      }}>
                        Vence: {cert.expirationDate}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={cert.status}
                      color={getStatusColor(cert.status)}
                      icon={getStatusIcon(cert.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box 
                          sx={{ 
                            height: 8, 
                            width: '100%', 
                            bgcolor: `${colors.primary.main}15`,
                            borderRadius: 4,
                            overflow: 'hidden'
                          }}
                        >
                          <Box 
                            sx={{ 
                              height: '100%', 
                              width: `${cert.progress}%`,
                              bgcolor: 
                                cert.progress > 70 ? colors.status.success :
                                cert.progress > 30 ? colors.status.warning : colors.status.error
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                        {cert.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography align="center" sx={{ fontWeight: 'bold', color: colors.primary.dark }}>
                      {cert.documents}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      {cert.lastUpdate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton 
                        size="small" 
                        component={Link}
                        to="/vista-certification"
                        sx={{ color: colors.primary.main }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        component={Link}
                        to="/new-user-certification"
                        sx={{ color: colors.status.warning }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteClick(cert)}
                        sx={{ color: colors.status.error }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle sx={{ color: colors.primary.dark }}>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: colors.text.primary }}>
            ¿Está seguro de que desea eliminar la certificación "{selectedCert?.type}"?
          </Typography>
          <Typography variant="body2" sx={{ color: colors.status.error, mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" sx={{ bgcolor: colors.status.error, '&:hover': { bgcolor: colors.primary.dark } }}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Información adicional */}
      <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: '#f8f9fa' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ color: colors.primary.dark, mb: 2, fontWeight: 'bold' }}>
               Guía Rápida
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              • <strong style={{ color: colors.status.success }}>Aceptados:</strong> Certificación validada y activa<br />
              • <strong style={{ color: colors.status.warning }}>En revisión:</strong> En proceso de validación por el comité<br />
              • <strong style={{ color: colors.primary.main }}>Información adicional:</strong> Requiere documentación complementaria<br />
              • <strong style={{ color: colors.primary.light }}>Registro:</strong> Registro inicial pendiente de validación<br />
              • <strong style={{ color: colors.status.error }}>Rechazado:</strong> Certificación no aprobada o vencida
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ color: colors.primary.dark, mb: 2, fontWeight: 'bold' }}>
               Acciones Disponibles
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              • <strong>Ver:</strong> Consultar detalles completos<br />
              • <strong>Editar:</strong> Modificar información (si está permitido)<br />
              • <strong>Eliminar:</strong> Remover certificación (solo si no ha sido validada)<br />
              • <strong>Nueva:</strong> Registrar nueva certificación
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Certifications;