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

  // Datos complementarios (reorganizados según la imagen)
  const datosComplementarios = [
    { 
      id: 'certificados',
      title: 'CERTIFICADOS',
      icon: <DescriptionIcon />,
      items: [
        { name: 'Patente Aduanal', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Opinión SAT', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Cédula Profesional', status: 'pendiente', icon: <WarningIcon /> },
      ]
    },
    { 
      id: 'documentacion',
      title: 'DOCUMENTACIÓN OFICIAL',
      icon: <DescriptionIcon />,
      items: [
        { name: 'Identificación oficial (INE, pasaporte)', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Comprobante de domicilio (reciente)', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Acta de nacimiento', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Fotografía digital reciente', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
    { 
      id: 'profesional',
      title: 'INFORMACIÓN PROFESIONAL',
      icon: <WorkIcon />,
      items: [
        { name: 'CV Actualizado', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Títulos Profesionales', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Cursos y Certificaciones', status: 'pendiente', icon: <WarningIcon /> },
      ]
    },
    { 
      id: 'legal',
      title: 'DOCUMENTACIÓN LEGAL Y FISCAL',
      icon: <BusinessIcon />,
      items: [
        { name: 'Constancia de Situación Fiscal', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Opinión de Cumplimiento', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Poderes Notariales', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
    { 
      id: 'laboral',
      title: 'INFORMACIÓN LABORAL',
      icon: <WorkIcon />,
      items: [
        { name: 'Contrato Laboral', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Cartas Recomendación', status: 'pendiente', icon: <WarningIcon /> },
        { name: 'Historial Laboral', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
    { 
      id: 'seguridad',
      title: 'INFORMACIÓN DE SEGURIDAD Y CUMPLIMIENTO',
      icon: <SecurityIcon />,
      items: [
        { name: 'Certificado de Antecedentes', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Declaración Patrimonial', status: 'pendiente', icon: <WarningIcon /> },
        { name: 'Constancia de No Inhabilitación', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
    { 
      id: 'digital',
      title: 'DOCUMENTACIÓN DIGITAL',
      icon: <CloudUploadIcon />,
      items: [
        { name: 'Firma Digital', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Certificado Digital SAT', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Tokens de Seguridad', status: 'pendiente', icon: <WarningIcon /> },
      ]
    },
    { 
      id: 'otros',
      title: 'OTROS ELEMENTOS RECOMENDADOS',
      icon: <AddIcon />,
      items: [
        { name: 'Pólizas de Seguro', status: 'completo', icon: <CheckCircleIcon /> },
        { name: 'Referencias Bancarias', status: 'pendiente', icon: <WarningIcon /> },
        { name: 'Cartas de Presentación', status: 'completo', icon: <CheckCircleIcon /> },
      ]
    },
  ];

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

      {/* Layout de 3 columnas: Datos Complementarios | Documentación Oficial | Datos Generales */}
      <Grid container spacing={3}>
        {/* Columna 1: Datos Complementarios */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                color: '#2c3e50', 
                mb: 3, 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                borderBottom: '2px solid #2c3e50',
                pb: 1
              }}>
                # DATOS COMPLEMENTARIOS
              </Typography>

              {datosComplementarios
                .filter(section => section.id !== 'documentacion')
                .map((section) => (
                  <Accordion 
                    key={section.id}
                    expanded={expanded === section.id}
                    onChange={handleAccordionChange(section.id)}
                    sx={{ 
                      mb: 1,
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px !important',
                      boxShadow: 'none',
                      '&:before': { display: 'none' }
                    }}
                  >
                    <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ 
                        backgroundColor: expanded === section.id ? '#f5f5f5' : 'transparent',
                        borderRadius: '8px',
                        minHeight: '56px'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                        <Box sx={{ color: '#2c3e50' }}>
                          {section.icon}
                        </Box>
                        <Typography sx={{ 
                          fontWeight: '600', 
                          color: '#2c3e50',
                          fontSize: '0.95rem',
                          flexGrow: 1
                        }}>
                          {section.title}
                        </Typography>
                        <Chip 
                          label={`${section.items.filter(item => item.status === 'completo').length}/${section.items.length}`}
                          size="small"
                          sx={{ 
                            height: '20px',
                            fontSize: '0.7rem',
                            fontWeight: '600'
                          }}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 2, pb: 2 }}>
                      <List dense sx={{ py: 0 }}>
                        {section.items.map((item, index) => (
                          <ListItem 
                            key={index}
                            sx={{ 
                              py: 1,
                              px: 0,
                              borderBottom: index < section.items.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none'
                            }}
                            secondaryAction={
                              <Stack direction="row" spacing={0.5}>
                                <IconButton size="small" sx={{ color: '#3498db' }}>
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" sx={{ color: '#27ae60' }}>
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
                                <CheckCircleIcon sx={{ color: '#27ae60', fontSize: '1.1rem' }} />
                              ) : (
                                <WarningIcon sx={{ color: '#f39c12', fontSize: '1.1rem' }} />
                              )}
                            </ListItemIcon>
                            <ListItemText 
                              primary={item.name}
                              primaryTypographyProps={{
                                color: item.status === 'completo' ? '#2c3e50' : '#7f8c8d',
                                fontWeight: item.status === 'completo' ? '500' : '400',
                                fontSize: '0.9rem',
                                lineHeight: 1.3
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
                          sx={{ fontSize: '0.8rem', textTransform: 'none' }}
                        >
                          Agregar Documento
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Columna 2: Documentación Oficial */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                color: '#2c3e50', 
                mb: 3, 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                borderBottom: '2px solid #2c3e50',
                pb: 1
              }}>
                # DOCUMENTACIÓN OFICIAL
              </Typography>

              <Stack spacing={2}>
                {datosComplementarios
                  .find(s => s.id === 'documentacion')
                  ?.items.map((doc, index) => (
                    <Paper 
                      key={index} 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        borderRadius: 1,
                        border: '1px solid rgba(0,0,0,0.1)',
                        transition: 'border-color 0.2s',
                        '&:hover': {
                          borderColor: '#3498db'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: '500',
                          color: '#2c3e50',
                          fontSize: '0.9rem',
                          lineHeight: 1.3
                        }}>
                          {doc.name}
                        </Typography>
                        {doc.status === 'completo' ? (
                          <CheckCircleIcon sx={{ color: '#27ae60', fontSize: '1.1rem' }} />
                        ) : (
                          <WarningIcon sx={{ color: '#f39c12', fontSize: '1.1rem' }} />
                        )}
                      </Box>
                      
                      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Button
                          size="small"
                          startIcon={<VisibilityIcon />}
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.75rem', 
                            py: 0.5,
                            flex: 1,
                            textTransform: 'none'
                          }}
                        >
                          VER
                        </Button>
                        <Button
                          size="small"
                          startIcon={<CloudUploadIcon />}
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.75rem', 
                            py: 0.5,
                            flex: 1,
                            textTransform: 'none'
                          }}
                        >
                          SUBIR
                        </Button>
                      </Stack>
                    </Paper>
                  ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna 3: Datos Generales */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3,
                pb: 2,
                borderBottom: '2px solid #2c3e50'
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#2c3e50', 
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}>
                  # DATOS GENERALES
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {!editMode ? (
                    <Button
                      startIcon={<EditIcon />}
                      size="small"
                      variant="outlined"
                      onClick={() => setEditMode(true)}
                      sx={{ 
                        fontWeight: '600',
                        textTransform: 'none',
                        fontSize: '0.85rem'
                      }}
                    >
                      MODIFICAR
                    </Button>
                  ) : (
                    <Button
                      startIcon={<EditIcon />}
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={handleSave}
                      sx={{ 
                        fontWeight: '600',
                        textTransform: 'none',
                        fontSize: '0.85rem'
                      }}
                    >
                      GUARDAR
                    </Button>
                  )}
                  {editMode && (
                    <Button
                      startIcon={<AddIcon />}
                      size="small"
                      onClick={() => setAddDialog(true)}
                      sx={{ 
                        fontWeight: '600',
                        textTransform: 'none',
                        fontSize: '0.85rem'
                      }}
                    >
                      Agregar Campo
                    </Button>
                  )}
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    NOMBRE COMPLETO:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.nombre}
                    onChange={handleInputChange('nombre')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    CURP:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.curp}
                    onChange={handleInputChange('curp')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    RFC:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.rfc}
                    onChange={handleInputChange('rfc')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    FECHA DE NACIMIENTO:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange('fechaNacimiento')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    LUGAR DE NACIMIENTO:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.lugarNacimiento}
                    onChange={handleInputChange('lugarNacimiento')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    NACIONALIDAD:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.nacionalidad}
                    onChange={handleInputChange('nacionalidad')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    ESTADO CIVIL:
                  </Typography>
                  <TextField
                    fullWidth
                    select
                    value={formData.estadoCivil}
                    onChange={handleInputChange('estadoCivil')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Soltero">Soltero</MenuItem>
                    <MenuItem value="Casado">Casado</MenuItem>
                    <MenuItem value="Divorciado">Divorciado</MenuItem>
                    <MenuItem value="Viudo">Viudo</MenuItem>
                    <MenuItem value="Unión Libre">Unión Libre</MenuItem>
                  </TextField>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    DOMICILIO FISCAL:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.domicilioFiscal}
                    onChange={handleInputChange('domicilioFiscal')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    DOMICILIO PARTICULAR:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.domicilioParticular}
                    onChange={handleInputChange('domicilioParticular')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    TELÉFONOS:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.telefono}
                    onChange={handleInputChange('telefono')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '600',
                    mb: 0.5,
                    fontSize: '0.9rem'
                  }}>
                    CORREO ELECTRÓNICO:
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>

              {editMode && (
                <Box sx={{ 
                  mt: 4, 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: 2,
                  pt: 2,
                  borderTop: '1px solid rgba(0,0,0,0.1)'
                }}>
                  <Button 
                    onClick={() => setEditMode(false)} 
                    variant="outlined"
                    sx={{ fontWeight: '600', textTransform: 'none' }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    variant="contained" 
                    color="success"
                    sx={{ fontWeight: '600', textTransform: 'none' }}
                  >
                    Guardar Cambios
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Resumen de estado abajo de todo */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Resumen de Estado
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold', mb: 1 }}>
                      {compliance}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', fontWeight: '500' }}>
                      Documentos Completos
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ color: '#27ae60', fontWeight: 'bold', mb: 1 }}>
                      3/5
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', fontWeight: '500' }}>
                      Certificaciones Vigentes
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold', mb: 1 }}>
                      2
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', fontWeight: '500' }}>
                      Próximos Vencimientos
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ color: '#e74c3c', fontWeight: 'bold', mb: 1 }}>
                      1
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', fontWeight: '500' }}>
                      Observaciones Pendientes
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
                  <strong>Próxima Revisión:</strong> 15/03/2026
                </Typography>
                <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                  El expediente se revisa semestralmente para mantenerlo actualizado.
                </Typography>
              </Box>
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