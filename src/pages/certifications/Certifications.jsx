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
    { 
      id: 7, 
      type: 'CERTIFICADO RECHAZADO', 
      number: 'CR-2025-99999', 
      issueDate: '01/12/2025', 
      expirationDate: '01/12/2026', 
      status: 'Rechazado',
      progress: 0,
      documents: 0,
      lastUpdate: '20/12/2025'
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
    alert(consent 
      ? 'Has autorizado a tu asociación para cargar documentos en tu nombre. Podrás revocar esta autorización en cualquier momento desde la configuración de tu cuenta.'
      : 'Has rechazado la autorización. Tu asociación no podrá cargar documentos en tu nombre. Podrás cambiar esta configuración más tarde si lo deseas.'
    );
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
            bgcolor: '#2c3e50', 
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
                    border: '2px solid #2ecc71',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  {/* Encabezado */}
                  <Box sx={{ 
                    bgcolor: '#2ecc71', 
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
                      <Typography variant="subtitle1" fontWeight="bold" color="success.dark" sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
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
                            <CheckCircleIcon sx={{ color: '#2ecc71', mr: 1.5, mt: 0.2, fontSize: 16 }} />
                            <Typography variant="body2" color="text.primary">
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
                    border: '2px solid #e74c3c',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  {/* Encabezado */}
                  <Box sx={{ 
                    bgcolor: '#e74c3c', 
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
                      <Typography variant="subtitle1" fontWeight="bold" color="error.dark" sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
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
                            <CancelIcon sx={{ color: '#e74c3c', mr: 1.5, mt: 0.2, fontSize: 16 }} />
                            <Typography variant="body2" color="text.primary">
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
                <InfoIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="primary" fontWeight="bold" sx={{ mb: 0.5 }}>
                    Nota importante sobre responsabilidades
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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
            borderTop: '1px solid #e0e0e0',
            flexShrink: 0
          }}>
            <Button 
              onClick={() => handleAssociationConsent(false)}
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              sx={{ 
                px: 3,
                fontWeight: 'bold',
                minWidth: 140
              }}
            >
              No Autorizar
            </Button>
            
            <Button 
              onClick={() => {
                setAssociationDialog(false);
                alert('Puedes configurar esta autorización más tarde desde "Configuración → Asociación"');
              }}
              variant="outlined"
              color="primary"
              sx={{ 
                px: 3,
                fontWeight: 'bold'
              }}
            >
              Decidir después
            </Button>
            
            <Button 
              onClick={() => handleAssociationConsent(true)}
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              sx={{ 
                px: 3,
                fontWeight: 'bold',
                minWidth: 140
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
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            Mis Certificaciones
          </Typography>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
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
          sx={{ bgcolor: '#2c3e50', '&:hover': { bgcolor: '#34495e' } }}
        >
          Nueva Certificación
        </Button>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #3498db' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#3498db', fontWeight: 'bold', mb: 1 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Total Certificaciones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #2ecc71' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#2ecc71', fontWeight: 'bold', mb: 1 }}>
                {stats.valid}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Vigentes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #f39c12' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#f39c12', fontWeight: 'bold', mb: 1 }}>
                {stats.expiring}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Por Vencer
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #e74c3c' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#e74c3c', fontWeight: 'bold', mb: 1 }}>
                {stats.review}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                En Revisión
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Resto del código permanece igual */}
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
                    <SearchIcon />
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
                    <FilterIcon />
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
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Tipo de Certificación</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Número</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Emisión / Vencimiento</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Progreso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Documentos</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Última Actualización</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCerts.map((cert) => (
                <TableRow key={cert.id} hover>
                  <TableCell>
                    <Typography sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {cert.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      {cert.number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                        Emisión: {cert.issueDate}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: cert.status === 'POR VENCER' ? '#f39c12' : '#7f8c8d',
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
                            bgcolor: '#f0f0f0',
                            borderRadius: 4,
                            overflow: 'hidden'
                          }}
                        >
                          <Box 
                            sx={{ 
                              height: '100%', 
                              width: `${cert.progress}%`,
                              bgcolor: 
                                cert.progress > 70 ? '#2ecc71' :
                                cert.progress > 30 ? '#f39c12' : '#e74c3c'
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        {cert.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography align="center" sx={{ fontWeight: 'bold' }}>
                      {cert.documents}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      {cert.lastUpdate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton 
                        size="small" 
                        component={Link}
                        to={`/certifications/${cert.id}`}
                        sx={{ color: '#3498db' }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        sx={{ color: '#f39c12' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteClick(cert)}
                        sx={{ color: '#e74c3c' }}
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
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar la certificación "{selectedCert?.type}"?
          </Typography>
          <Typography variant="body2" sx={{ color: '#e74c3c', mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Información adicional */}
      <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: '#f8f9fa' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
              📋 Guía Rápida
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              • <strong>Vigente:</strong> Certificación activa y válida<br />
              • <strong>Por Vencer:</strong> Vence en menos de 90 días<br />
              • <strong>En Revisión:</strong> En proceso de validación por el comité<br />
              • <strong>Observaciones:</strong> Requiere atención o documentación adicional
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
              ⚡ Acciones Disponibles
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
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