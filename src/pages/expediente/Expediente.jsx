import React, { useState } from 'react';
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
  Divider,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  Security as SecurityIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const Expediente = () => {
  const [editMode, setEditMode] = useState(false);
  const [expanded, setExpanded] = useState('panel1');
  const [addDialog, setAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    nombre: 'Luis Rodríguez',
    curp: 'RODL800101HDFXYZ01',
    rfc: 'RODL800101ABC',
    fechaNacimiento: '01/01/1980',
    lugarNacimiento: 'Ciudad de México',
    nacionalidad: 'Mexicana',
    estadoCivil: 'Casado',
    domicilioFiscal: 'Av. Principal 123, Col. Centro, CDMX',
    domicilioParticular: 'Calle Secundaria 456, Col. Juárez, CDMX',
    telefono: '+52 55 1234 5678',
    email: 'luis.rodriguez@ejemplo.com'
  });

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSave = () => {
    setEditMode(false);
    // En una implementación real, aquí se enviarían los datos al servidor
  };

  // Datos complementarios
  const datosComplementarios = [
    { 
      id: 'certificados',
      title: 'CERTIFICADOS',
      items: [
        { name: 'Patente Aduanal', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Opinión SAT', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Cédula Profesional', status: 'pendiente', icon: <WarningIcon /> },
      ]
    },
    { 
      id: 'documentacion',
      title: 'DOCUMENTACIÓN OFICIAL',
      items: [
        { name: 'INE / Pasaporte', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Comprobante Domicilio', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Acta de Nacimiento', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Fotografía Digital', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
    { 
      id: 'profesional',
      title: 'INFORMACIÓN PROFESIONAL',
      items: [
        { name: 'CV Actualizado', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Títulos Profesionales', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Cursos y Certificaciones', status: 'pendiente', icon: <WarningIcon /> },
      ]
    },
    { 
      id: 'legal',
      title: 'DOCUMENTACIÓN LEGAL Y FISCAL',
      items: [
        { name: 'Constancia de Situación Fiscal', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Opinión de Cumplimiento', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Poderes Notariales', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
  ];

  const getStatusColor = (status) => {
    return status === 'completo' ? 'success' : 'warning';
  };

  const calculateCompliance = () => {
    const allItems = datosComplementarios.flatMap(section => section.items);
    const completed = allItems.filter(item => item.status === 'completo').length;
    return Math.round((completed / allItems.length) * 100);
  };

  const compliance = calculateCompliance();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            Expediente Digital
          </Typography>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
            Documentación completa para el cumplimiento normativo
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Exportar Expediente
          </Button>
          <Button
            variant={editMode ? 'contained' : 'outlined'}
            startIcon={<EditIcon />}
            onClick={() => setEditMode(!editMode)}
            color={editMode ? 'success' : 'primary'}
          >
            {editMode ? 'Guardar Cambios' : 'Modificar'}
          </Button>
        </Stack>
      </Box>

      {/* Indicador de cumplimiento */}
      <Card sx={{ mb: 4, bgcolor: compliance >= 90 ? '#e8f5e9' : 
                                     compliance >= 70 ? '#fffde7' : '#ffebee' }}>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold', mr: 2 }}>
                  Nivel de Cumplimiento
                </Typography>
                <Chip 
                  label={compliance >= 90 ? 'ALTO CUMPLIMIENTO' : 
                         compliance >= 70 ? 'CUMPLIMIENTO MEDIO' : 'CUMPLIMIENTO BAJO'}
                  color={compliance >= 90 ? 'success' : 
                         compliance >= 70 ? 'warning' : 'error'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                {compliance >= 90 ? 'Tu expediente está completo y vigente' : 
                 compliance >= 70 ? 'Faltan algunos documentos por completar' : 
                 'Requiere atención inmediata para completar la documentación'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ 
                  color: compliance >= 90 ? '#27ae60' : 
                         compliance >= 70 ? '#f39c12' : '#e74c3c',
                  fontWeight: 'bold'
                }}>
                  {compliance}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={compliance}
                  sx={{ 
                    height: 10,
                    borderRadius: 5,
                    mt: 1,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: compliance >= 90 ? '#27ae60' : 
                                       compliance >= 70 ? '#f39c12' : '#e74c3c'
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Columna izquierda - Datos generales */}
        <Grid item xs={12} md={7}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  DATOS GENERALES
                </Typography>
                {editMode && (
                  <Button
                    startIcon={<AddIcon />}
                    size="small"
                    onClick={() => setAddDialog(true)}
                  >
                    Agregar Campo
                  </Button>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="NOMBRE COMPLETO"
                    value={formData.nombre}
                    onChange={handleInputChange('nombre')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CURP"
                    value={formData.curp}
                    onChange={handleInputChange('curp')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="RFC"
                    value={formData.rfc}
                    onChange={handleInputChange('rfc')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="FECHA DE NACIMIENTO"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange('fechaNacimiento')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="LUGAR DE NACIMIENTO"
                    value={formData.lugarNacimiento}
                    onChange={handleInputChange('lugarNacimiento')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="NACIONALIDAD"
                    value={formData.nacionalidad}
                    onChange={handleInputChange('nacionalidad')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="ESTADO CIVIL"
                    value={formData.estadoCivil}
                    onChange={handleInputChange('estadoCivil')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  >
                    <MenuItem value="Soltero">Soltero</MenuItem>
                    <MenuItem value="Casado">Casado</MenuItem>
                    <MenuItem value="Divorciado">Divorciado</MenuItem>
                    <MenuItem value="Viudo">Viudo</MenuItem>
                    <MenuItem value="Unión Libre">Unión Libre</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="DOMICILIO FISCAL"
                    value={formData.domicilioFiscal}
                    onChange={handleInputChange('domicilioFiscal')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="DOMICILIO PARTICULAR"
                    value={formData.domicilioParticular}
                    onChange={handleInputChange('domicilioParticular')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="TELÉFONOS"
                    value={formData.telefono}
                    onChange={handleInputChange('telefono')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="CORREO ELECTRÓNICO"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
              </Grid>

              {editMode && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button onClick={() => setEditMode(false)} variant="outlined">
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} variant="contained" color="success">
                    Guardar Cambios
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Foto de usuario */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                FOTO DE USUARIO
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    bgcolor: '#3498db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  LR
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 2 }}>
                    Foto de perfil actualizada el 10/01/2026
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    disabled={!editMode}
                  >
                    Actualizar Foto
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna derecha - Datos complementarios */}
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                DATOS COMPLEMENTARIOS
              </Typography>

              {datosComplementarios.map((section) => (
                <Accordion 
                  key={section.id}
                  expanded={expanded === section.id}
                  onChange={handleAccordionChange(section.id)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {section.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {section.items.map((item, index) => (
                        <ListItem 
                          key={index}
                          secondaryAction={
                            <Stack direction="row" spacing={1}>
                              <IconButton size="small">
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small">
                                <DownloadIcon fontSize="small" />
                              </IconButton>
                              {editMode && (
                                <IconButton size="small" color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              )}
                            </Stack>
                          }
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {item.status === 'completo' ? (
                              <CheckCircleIcon sx={{ color: '#27ae60' }} />
                            ) : (
                              <WarningIcon sx={{ color: '#f39c12' }} />
                            )}
                          </ListItemIcon>
                          <ListItemText 
                            primary={item.name}
                            primaryTypographyProps={{
                              color: item.status === 'completo' ? '#2c3e50' : '#7f8c8d',
                              fontWeight: item.status === 'completo' ? 'medium' : 'normal'
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        startIcon={<AddIcon />}
                        size="small"
                        disabled={!editMode}
                      >
                        Agregar Documento
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>

          {/* Resumen de estado */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Resumen de Estado
              </Typography>
              
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Documentos Completos:</Typography>
                  <Chip 
                    label={`${calculateCompliance()}%`}
                    color={compliance >= 90 ? 'success' : 
                           compliance >= 70 ? 'warning' : 'error'}
                    size="small"
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Certificaciones Vigentes:</Typography>
                  <Chip label="3/5" color="success" size="small" />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Próximos Vencimientos:</Typography>
                  <Chip label="2" color="warning" size="small" />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Observaciones Pendientes:</Typography>
                  <Chip label="1" color="error" size="small" />
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 2 }}>
                <strong>Próxima Revisión:</strong> 15/03/2026
              </Typography>
              <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                El expediente se revisa semestralmente para mantenerlo actualizado.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Diálogo para agregar campo */}
      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar Nuevo Campo</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre del Campo"
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Valor"
            sx={{ mt: 2 }}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            select
            label="Sección"
            sx={{ mt: 2 }}
            defaultValue=""
          >
            <MenuItem value="personal">Datos Personales</MenuItem>
            <MenuItem value="contacto">Información de Contacto</MenuItem>
            <MenuItem value="profesional">Datos Profesionales</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialog(false)}>Cancelar</Button>
          <Button onClick={() => setAddDialog(false)} variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Expediente;