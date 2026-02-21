import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Tabs,
  Tab,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Save as SaveIcon,
  CameraAlt as CameraIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  History as HistoryIcon,
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
  LocationCity as LocationCityIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Language as LanguageIcon,
  Schedule as ScheduleIcon,
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AccountBalance as AccountBalanceIcon,
  LocationOn as LocationIcon,
  ContactPhone as ContactPhoneIcon
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

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [aduanaDialog, setAduanaDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [newAduana, setNewAduana] = useState({
    nombre: '',
    tipo: 'Secundaria',
    numeroRegistro: '',
    fechaRegistro: '',
    estado: 'Activa'
  });

  const [aduanaList, setAduanaList] = useState([
    { 
      id: 1, 
      nombre: 'Aduana de Querétaro', 
      tipo: 'Principal', 
      numeroRegistro: 'ADQ-2024-00123', 
      fechaRegistro: '15/01/2024',
      estado: 'Activa'
    },
    { 
      id: 2, 
      nombre: 'Aduana de Ciudad de México', 
      tipo: 'Secundaria', 
      numeroRegistro: 'ADCDMX-2024-00456', 
      fechaRegistro: '20/03/2024',
      estado: 'Activa'
    },
    { 
      id: 3, 
      nombre: 'Aduana de Guadalajara', 
      tipo: 'Secundaria', 
      numeroRegistro: 'ADGDL-2024-00789', 
      fechaRegistro: '10/06/2024',
      estado: 'Activa'
    }
  ]);

  const [profile, setProfile] = useState({
    nombre: 'Luis Rodríguez',
    email: 'luis.rodriguez@ejemplo.com',
    telefono: '+52 55 1234 5678',
    rol: 'Agente Aduanal',
    nivel:'Nivel II',
    des_Nivel: 'Sistema Gremial Intermedio',
    region: 'Norte',
    fechaRegistro: '15/01/2024',
    ultimoAcceso: '15/01/2026 10:30 AM'
  });
  
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
    telefonoAlternativo: '+52 55 9876 5432',
    email: 'luis.rodriguez@ejemplo.com',
    emailAlternativo: 'contacto@agenteaduana.com'
  });

  const [preferences, setPreferences] = useState({
    idioma: 'es',
    zonaHoraria: 'America/Mexico_City',
    privacidad: 'publico',
    notificacionesEmail: true,
    notificacionesSMS: false,
    tema: 'claro'
  });

  const handleChange = (field) => (e) => {
    setProfile({
      ...profile,
      [field]: e.target.value
    });
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handlePreferenceChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setPreferences({
      ...preferences,
      [field]: value
    });
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleAduanaChange = (field) => (e) => {
    setNewAduana({
      ...newAduana,
      [field]: e.target.value
    });
  };

  const handleAddAduana = () => {
    if (newAduana.nombre && newAduana.numeroRegistro) {
      const hasPrincipal = aduanaList.some(aduana => aduana.tipo === 'Principal');
      
      const aduanaToAdd = {
        id: aduanaList.length + 1,
        ...newAduana,
        tipo: hasPrincipal && newAduana.tipo === 'Principal' ? 'Secundaria' : newAduana.tipo
      };

      setAduanaList([...aduanaList, aduanaToAdd]);
      setNewAduana({
        nombre: '',
        tipo: 'Secundaria',
        numeroRegistro: '',
        fechaRegistro: '',
        estado: 'Activa'
      });
      setAduanaDialog(false);
    }
  };

  const handleDeleteAduana = (id) => {
    setAduanaList(aduanaList.filter(aduana => aduana.id !== id));
  };

  const handleSetPrincipal = (id) => {
    const updatedAduanas = aduanaList.map(aduana => ({
      ...aduana,
      tipo: aduana.id === id ? 'Principal' : 'Secundaria'
    }));
    setAduanaList(updatedAduanas);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
          Mi Perfil
        </Typography>
      </Box>

      {/* ===== FILA SUPERIOR: CUATRO APARTADOS CON NUEVO ORDEN Y ANCHO ===== */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* 1. Foto de Perfil */}
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: `0 4px 12px ${colors.primary.main}15`,
            border: `1px solid ${colors.primary.main}20`,
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          }}>
            <CardContent sx={{ 
              textAlign: 'center', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              py: 3,
              px: 2
            }}>
              {/* Avatar */}
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar sx={{ 
                  width: 120, 
                  height: 120, 
                  fontSize: '2.8rem', 
                  bgcolor: colors.primary.main,
                  margin: '0 auto',
                  border: `4px solid ${colors.primary.main}20`,
                  boxShadow: `0 4px 12px ${colors.primary.main}30`
                }}>
                  LR
                </Avatar>
                {editMode && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 'calc(50% - 60px)',
                      bgcolor: 'white',
                      border: '2px solid #fff',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                    size="small"
                  >
                    <CameraIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {/* Nombre */}
              <Typography variant="h6" fontWeight="bold" sx={{ 
                mt: 2,
                color: colors.text.primary,
                fontSize: '1.25rem',
                letterSpacing: '0.3px',
                textShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}>
                {profile.nombre}
              </Typography>

              {/* Rol */}
              <Chip 
                label={profile.rol} 
                size="medium" 
                sx={{ 
                  mt: 1.5, 
                  mb: 2, 
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  height: '28px',
                  borderRadius: '16px',
                  boxShadow: `0 2px 4px ${colors.primary.main}30`,
                  bgcolor: colors.primary.main,
                  color: 'white'
                }} 
              />

              {/* Sección de información */}
              <Box sx={{ 
                width: '100%',
                mb: 2
              }}>
                {/* Nivel */}
                <Box sx={{ 
                  mb: 2,
                  p: 1.5,
                  borderRadius: '10px',
                  bgcolor: `${colors.primary.main}10`,
                  borderLeft: `4px solid ${colors.primary.main}`
                }}>
                  
                  <Typography variant="body1" sx={{ 
                    color: colors.text.primary, 
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    lineHeight: 1.2
                  }}>
                    {profile.nivel}
                    
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: colors.text.primary, 
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    lineHeight: 1.3
                  }}>
                    {profile.des_Nivel}
                  </Typography>
                </Box>

                
                {/* Región */}
                <Box sx={{ 
                  p: 1.5,
                  borderRadius: '10px',
                  bgcolor: `${colors.accents.purple}10`,
                  borderLeft: `4px solid ${colors.accents.purple}`
                }}>
                 
                  <Typography variant="body1" sx={{ 
                    color: colors.text.primary, 
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    lineHeight: 1.2
                  }}>
                    Region {profile.region}
                  </Typography>
                </Box>
              </Box>

              {/* Fecha de registro */}
              <Typography variant="body2" sx={{ 
                color: colors.text.secondary,
                fontWeight: '500',
                fontSize: '0.85rem',
                mt: 2,
                pt: 2,
                borderTop: `1px solid ${colors.primary.main}20`
              }}>
                Miembro desde: <span style={{ fontWeight: '600', color: colors.text.primary }}>{profile.fechaRegistro}</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 2. Mi Actividad */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                fontWeight: 'bold', 
                color: colors.text.primary,
                textAlign: 'center'
              }}>
                Mi Actividad
              </Typography>

              <Stack spacing={3}>
                <Box sx={{ 
                  textAlign: 'center',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: '#f8f9fa'
                }}>
                  <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 0.5 }}>
                    Certificaciones Activas
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" sx={{ color: colors.text.primary }}>
                    8
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  textAlign: 'center',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: `${colors.status.warning}15`
                }}>
                  <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 0.5 }}>
                    En Revisión
                  </Typography>
                  <Typography variant="h3" sx={{ color: colors.status.warning, fontWeight: 'bold' }}>
                    2
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  textAlign: 'center',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: `${colors.status.error}15`
                }}>
                  <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 0.5 }}>
                    Por Vencer (30 días)
                  </Typography>
                  <Typography variant="h3" sx={{ color: colors.status.error, fontWeight: 'bold' }}>
                    1
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  pt: 2, 
                  mt: 2,
                  borderTop: `1px solid ${colors.primary.main}20`,
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 0.5 }}>
                    Último Acceso
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 'medium',
                    color: colors.text.primary
                  }}>
                    {profile.ultimoAcceso}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. MIS ADUANAS */}
        <Grid item xs={12} md={3.2}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 2.5
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 'bold', 
                  color: colors.text.primary,
                  fontSize: '1rem'
                }}>
                  Mis Aduanas
                </Typography>
                <Button 
                  variant="contained" 
                  size="small"
                  startIcon={<AddCircleIcon />}
                  onClick={() => setAduanaDialog(true)}
                  disabled={aduanaList.length >= 4}
                  sx={{ 
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    height: '28px',
                    minWidth: '75px',
                    p: '2px 10px',
                    bgcolor: colors.primary.main,
                    '&:hover': { bgcolor: colors.primary.dark }
                  }}
                >
                  Agregar
                </Button>
              </Box>

              <Box sx={{ 
                height: 'calc(100% - 60px)',
                p: 1.5,
                borderRadius: 1,
                bgcolor: `${colors.primary.main}10`,
                border: `1px solid ${colors.primary.main}30`,
                overflow: 'auto'
              }}>
                <Stack spacing={1}>
                  {aduanaList.map((aduana) => (
                    <Paper 
                      key={aduana.id}
                      elevation={0}
                      sx={{ 
                        p: 1,
                        borderRadius: 0.8,
                        border: `1px solid ${colors.primary.main}20`,
                        bgcolor: aduana.tipo === 'Principal' ? `${colors.status.warning}15` : 'white',
                        borderLeft: `3px solid ${aduana.tipo === 'Principal' ? colors.status.warning : colors.primary.main}`
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <LocationCityIcon sx={{ 
                              mr: 1, 
                              color: aduana.tipo === 'Principal' ? colors.status.warning : colors.primary.main,
                              fontSize: '1rem'
                            }} />
                            <Typography variant="caption" fontWeight="bold" sx={{ fontSize: '0.75rem', color: colors.text.primary }}>
                              {aduana.nombre.length > 22 ? `${aduana.nombre.substring(0, 22)}...` : aduana.nombre}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.65rem', display: 'block', pl: 2 }}>
                            <strong>Registro:</strong> {aduana.numeroRegistro}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: 2, mt: 0.5 }}>
                            <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.65rem' }}>
                              <strong>Fecha:</strong> {aduana.fechaRegistro}
                            </Typography>
                            {aduana.tipo === 'Principal' && (
                              <Chip
                                label="Principal"
                                size="small"
                                sx={{ 
                                  height: 18, 
                                  fontSize: '0.6rem',
                                  bgcolor: colors.status.warning,
                                  color: 'white'
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, ml: 1 }}>
                          <Tooltip title={aduana.tipo === 'Principal' ? "Aduana principal" : "Establecer como principal"}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleSetPrincipal(aduana.id)}
                              disabled={aduana.tipo === 'Principal'}
                              sx={{ 
                                color: aduana.tipo === 'Principal' ? colors.status.warning : colors.text.secondary,
                                p: 0.25
                              }}
                            >
                              {aduana.tipo === 'Principal' ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                            </IconButton>
                          </Tooltip>
                          
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteAduana(aduana.id)}
                            sx={{ color: colors.status.error, p: 0.25 }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                  
                  {aduanaList.length === 0 && (
                    <Box sx={{ 
                      textAlign: 'center', 
                      py: 3,
                      color: colors.text.secondary
                    }}>
                      <LocationCityIcon sx={{ fontSize: 32, mb: 1, opacity: 0.3 }} />
                      <Typography variant="body2" sx={{ mb: 1, fontSize: '0.8rem', color: colors.text.primary }}>
                        No hay aduanas registradas
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<AddCircleIcon />}
                        onClick={() => setAduanaDialog(true)}
                        sx={{ 
                          fontSize: '0.7rem',
                          color: colors.primary.main,
                          borderColor: colors.primary.main
                        }}
                      >
                        Agregar primera aduana
                      </Button>
                    </Box>
                  )}
                </Stack>
                
                <Typography variant="caption" sx={{ 
                  mt: 2, 
                  display: 'block',
                  fontStyle: 'italic',
                  fontSize: '0.65rem',
                  textAlign: 'center',
                  color: colors.text.secondary
                }}>
                  Límite: 4 aduanas (1 principal + 3 secundarias)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 4. Preferencias y Comunicación MEJORADA */}
        <Grid item xs={12} md={2.8}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                fontWeight: 'bold', 
                color: colors.text.primary,
                fontSize: '0.95rem'
              }}>
                Preferencias y Comunicación
              </Typography>

              <Stack spacing={2} sx={{ flex: 1 }}>
                {/* Notificaciones */}
                <Paper elevation={0} sx={{ 
                  p: 1.2,
                  borderRadius: 0.8,
                  border: `1px solid ${colors.primary.main}20`,
                  bgcolor: '#f8f9fa'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <NotificationsIcon sx={{ 
                      mr: 1, 
                      color: colors.primary.main,
                      fontSize: '1.3rem'
                    }} />
                    <Typography fontWeight="bold" variant="body2" sx={{ fontSize: '0.8rem', color: colors.text.primary }}>
                      Notificaciones
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 3.5 }}>
                    <FormControlLabel
                      control={
                        <Switch 
                          size="small" 
                          checked={preferences.notificacionesEmail}
                          onChange={handlePreferenceChange('notificacionesEmail')}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: colors.secondary.main,
                              '&:hover': {
                                backgroundColor: `${colors.secondary.main}20`,
                              },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: colors.secondary.main,
                            },
                          }}
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: colors.text.primary }}>Email</Typography>}
                      sx={{ mb: 0.5 }}
                    />
                    <FormControlLabel
                      control={
                        <Switch 
                          size="small" 
                          checked={preferences.notificacionesSMS}
                          onChange={handlePreferenceChange('notificacionesSMS')}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: colors.secondary.main,
                              '&:hover': {
                                backgroundColor: `${colors.secondary.main}20`,
                              },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: colors.secondary.main,
                            },
                          }}
                        />
                      }
                      label={<Typography variant="caption" sx={{ color: colors.text.primary }}>SMS</Typography>}
                    />
                  </Box>
                </Paper>

                {/* Seguridad */}
                <Paper elevation={0} sx={{ 
                  p: 1.2,
                  borderRadius: 0.8,
                  border: `1px solid ${colors.primary.main}20`,
                  bgcolor: '#f8f9fa'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <SecurityIcon sx={{ 
                      mr: 1, 
                      color: colors.status.error,
                      fontSize: '1.3rem'
                    }} />
                    <Typography fontWeight="bold" variant="body2" sx={{ fontSize: '0.8rem', color: colors.text.primary }}>
                      Seguridad
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    size="small"
                    fullWidth
                    sx={{ 
                      mt: 1,
                      fontSize: '0.7rem',
                      height: '26px',
                      color: colors.primary.main,
                      borderColor: colors.primary.main
                    }}
                  >
                    Cambiar Contraseña
                  </Button>
                </Paper>

                {/* Historial */}
                <Paper elevation={0} sx={{ 
                  p: 1.2,
                  borderRadius: 0.8,
                  border: `1px solid ${colors.primary.main}20`,
                  bgcolor: '#f8f9fa'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <HistoryIcon sx={{ 
                      mr: 1, 
                      color: colors.accents.purple,
                      fontSize: '1.3rem'
                    }} />
                    <Typography fontWeight="bold" variant="body2" sx={{ fontSize: '0.8rem', color: colors.text.primary }}>
                      Historial
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    size="small"
                    fullWidth
                    sx={{ 
                      mt: 1,
                      fontSize: '0.7rem',
                      height: '26px',
                      color: colors.primary.main,
                      borderColor: colors.primary.main
                    }}
                  >
                    Ver Actividad
                  </Button>
                </Paper>

                {/* NUEVO: Configuración General */}
                <Paper elevation={0} sx={{ 
                  p: 1.2,
                  borderRadius: 0.8,
                  border: `1px solid ${colors.primary.main}20`,
                  bgcolor: '#f8f9fa',
                  mt: 'auto'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <LanguageIcon sx={{ 
                      mr: 1, 
                      color: colors.status.success,
                      fontSize: '1.3rem'
                    }} />
                    <Typography fontWeight="bold" variant="body2" sx={{ fontSize: '0.8rem', color: colors.text.primary }}>
                      Configuración
                    </Typography>
                  </Box>
                  <Box sx={{ pl: 3.5 }}>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block', mb: 0.5 }}>
                      <ScheduleIcon sx={{ fontSize: '0.7rem', mr: 0.5, verticalAlign: 'middle' }} />
                      Zona: {preferences.zonaHoraria}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                      <VisibilityIcon sx={{ fontSize: '0.7rem', mr: 0.5, verticalAlign: 'middle' }} />
                      Tema: {preferences.tema === 'claro' ? 'Claro' : 'Oscuro'}
                    </Typography>
                  </Box>
                </Paper>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ===== DATOS GENERALES CON MEJOR ESTRUCTURA ===== */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          {/* Header con Tabs */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            pb: 2,
            borderBottom: `2px solid ${colors.primary.dark}`
          }}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h5" sx={{ 
                color: colors.primary.dark, 
                fontWeight: 'bold',
                mb: 2
              }}>
                📋 Información del Agente Aduanal
              </Typography>
              
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange} sx={{ minHeight: 36 }}>
                  <Tab 
                    label="Datos Personales" 
                    icon={<ContactPhoneIcon sx={{ fontSize: 18 }} />}
                    iconPosition="start"
                    sx={{ 
                      fontSize: '0.85rem', 
                      minHeight: 40,
                      color: colors.text.secondary,
                      '&.Mui-selected': {
                        color: colors.primary.main
                      }
                    }}
                  />
                  <Tab 
                    label="Información de Contacto" 
                    icon={<EmailIcon sx={{ fontSize: 18 }} />}
                    iconPosition="start"
                    sx={{ 
                      fontSize: '0.85rem', 
                      minHeight: 40,
                      color: colors.text.secondary,
                      '&.Mui-selected': {
                        color: colors.primary.main
                      }
                    }}
                  />
                  <Tab 
                    label="Información Fiscal" 
                    icon={<AccountBalanceIcon sx={{ fontSize: 18 }} />}
                    iconPosition="start"
                    sx={{ 
                      fontSize: '0.85rem', 
                      minHeight: 40,
                      color: colors.text.secondary,
                      '&.Mui-selected': {
                        color: colors.primary.main
                      }
                    }}
                  />
                </Tabs>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              {!editMode ? (
                <Button
                  startIcon={<EditIcon />}
                  variant="outlined"
                  onClick={() => setEditMode(true)}
                  sx={{ 
                    fontWeight: '600',
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    color: colors.primary.main,
                    borderColor: colors.primary.main
                  }}
                >
                  MODIFICAR
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => setEditMode(false)} 
                    variant="outlined"
                    sx={{ 
                      fontWeight: '600', 
                      textTransform: 'none', 
                      fontSize: '0.85rem',
                      color: colors.primary.main,
                      borderColor: colors.primary.main
                    }}
                  >
                    CANCELAR
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    variant="contained" 
                    startIcon={<SaveIcon />}
                    sx={{ 
                      fontWeight: '600', 
                      textTransform: 'none', 
                      fontSize: '0.85rem',
                      bgcolor: colors.status.success,
                      '&:hover': { bgcolor: colors.primary.dark }
                    }}
                  >
                    GUARDAR
                  </Button>
                </>
              )}
            </Box>
          </Box>

          {/* Contenido de Tabs */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {/* Datos Personales - Izquierda */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  border: `1px solid ${colors.primary.main}20`,
                  borderRadius: 2,
                  bgcolor: '#f8f9fa',
                  height: '100%'
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    color: colors.text.primary, 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <ContactPhoneIcon sx={{ color: colors.primary.main }} />
                    Datos Personales
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Nombre Completo"
                        fullWidth
                        value={formData.nombre}
                        onChange={handleInputChange('nombre')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="CURP"
                        fullWidth
                        value={formData.curp}
                        onChange={handleInputChange('curp')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="RFC"
                        fullWidth
                        value={formData.rfc}
                        onChange={handleInputChange('rfc')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Fecha de Nacimiento"
                        type="date"
                        fullWidth
                        value={formData.fechaNacimiento}
                        onChange={handleInputChange('fechaNacimiento')}
                        disabled={!editMode}
                        size="small"
                        InputLabelProps={{ shrink: true, sx: { color: colors.text.primary } }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Lugar de Nacimiento"
                        fullWidth
                        value={formData.lugarNacimiento}
                        onChange={handleInputChange('lugarNacimiento')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Nacionalidad"
                        fullWidth
                        value={formData.nacionalidad}
                        onChange={handleInputChange('nacionalidad')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Estado Civil"
                        select
                        fullWidth
                        value={formData.estadoCivil}
                        onChange={handleInputChange('estadoCivil')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      >
                        <MenuItem value="Soltero">Soltero</MenuItem>
                        <MenuItem value="Casado">Casado</MenuItem>
                        <MenuItem value="Divorciado">Divorciado</MenuItem>
                        <MenuItem value="Viudo">Viudo</MenuItem>
                        <MenuItem value="Unión Libre">Unión Libre</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={3}>
              {/* Contacto Principal */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  border: `1px solid ${colors.primary.main}20`,
                  borderRadius: 2,
                  bgcolor: '#f8f9fa',
                  height: '100%'
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    color: colors.text.primary, 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <PhoneIcon sx={{ color: colors.primary.main }} />
                    Contacto Principal
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Teléfono Principal"
                        fullWidth
                        value={formData.telefono}
                        onChange={handleInputChange('telefono')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: <PhoneIcon sx={{ mr: 1, color: colors.primary.main, fontSize: '1rem' }} />
                        }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Teléfono Alternativo"
                        fullWidth
                        value={formData.telefonoAlternativo}
                        onChange={handleInputChange('telefonoAlternativo')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: <PhoneIcon sx={{ mr: 1, color: colors.accents.purple, fontSize: '1rem' }} />
                        }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        label="Correo Electrónico Principal"
                        fullWidth
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ mr: 1, color: colors.status.error, fontSize: '1rem' }} />
                        }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        label="Correo Electrónico Alternativo"
                        fullWidth
                        type="email"
                        value={formData.emailAlternativo}
                        onChange={handleInputChange('emailAlternativo')}
                        disabled={!editMode}
                        size="small"
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ mr: 1, color: colors.status.warning, fontSize: '1rem' }} />
                        }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Ubicación y Acceso */}
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  border: `1px solid ${colors.primary.main}20`,
                  borderRadius: 2,
                  bgcolor: '#f8f9fa',
                  height: '100%'
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    color: colors.text.primary, 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <LocationIcon sx={{ color: colors.primary.main }} />
                    Ubicación y Acceso
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Último Acceso"
                        fullWidth
                        value={profile.ultimoAcceso}
                        disabled
                        size="small"
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: <HistoryIcon sx={{ mr: 1, color: colors.accents.purple, fontSize: '1rem' }} />
                        }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        label="Miembro Desde"
                        fullWidth
                        value={profile.fechaRegistro}
                        disabled
                        size="small"
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: <ScheduleIcon sx={{ mr: 1, color: colors.status.success, fontSize: '1rem' }} />
                        }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ 
                        p: 2,
                        borderRadius: 1,
                        bgcolor: `${colors.primary.main}10`,
                        mt: 2
                      }}>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: colors.text.primary, mb: 0.5 }}>
                          Estado de la Cuenta
                        </Typography>
                        <Typography variant="body1" sx={{ color: colors.text.primary }}>
                          Activa • Última actualización: Hoy
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={3}>
              {/* Información Fiscal */}
              <Grid item xs={12}>
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  border: `1px solid ${colors.primary.main}20`,
                  borderRadius: 2,
                  bgcolor: '#f8f9fa'
                }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    color: colors.text.primary, 
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <AccountBalanceIcon sx={{ color: colors.primary.main }} />
                    Información Fiscal
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Domicilio Fiscal (Oficial)"
                        fullWidth
                        value={formData.domicilioFiscal}
                        onChange={handleInputChange('domicilioFiscal')}
                        disabled={!editMode}
                        size="small"
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Domicilio Particular"
                        fullWidth
                        value={formData.domicilioParticular}
                        onChange={handleInputChange('domicilioParticular')}
                        disabled={!editMode}
                        size="small"
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ sx: { color: colors.text.primary } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ 
                        p: 2,
                        borderRadius: 1,
                        bgcolor: `${colors.accents.purple}10`,
                        mt: 2
                      }}>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: colors.text.primary, mb: 0.5 }}>
                          Información de Identificación Fiscal
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              <strong>RFC:</strong> {formData.rfc}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                              <strong>CURP:</strong> {formData.curp}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Diálogo para agregar nueva aduana */}
      <Dialog open={aduanaDialog} onClose={() => setAduanaDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: colors.text.primary }}>
            <AddCircleIcon sx={{ color: colors.primary.main }} />
            Agregar Nueva Aduana
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Nombre de la Aduana"
              fullWidth
              value={newAduana.nombre}
              onChange={handleAduanaChange('nombre')}
              required
              helperText="Ej: Aduana de Querétaro, Aduana de Ciudad de México"
              InputLabelProps={{ sx: { color: colors.text.primary } }}
            />
            
            <FormControl fullWidth>
              <InputLabel sx={{ color: colors.text.primary }}>Tipo de Aduana</InputLabel>
              <Select
                value={newAduana.tipo}
                onChange={handleAduanaChange('tipo')}
                label="Tipo de Aduana"
              >
                <MenuItem value="Principal">Principal</MenuItem>
                <MenuItem value="Secundaria">Secundaria</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Número de Registro"
              fullWidth
              value={newAduana.numeroRegistro}
              onChange={handleAduanaChange('numeroRegistro')}
              required
              helperText="Número oficial de registro en la aduana"
              InputLabelProps={{ sx: { color: colors.text.primary } }}
            />
            
            <TextField
              label="Fecha de Registro"
              type="date"
              fullWidth
              value={newAduana.fechaRegistro}
              onChange={handleAduanaChange('fechaRegistro')}
              InputLabelProps={{ shrink: true, sx: { color: colors.text.primary } }}
              helperText="Fecha en que se registró en esta aduana"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAduanaDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleAddAduana} 
            variant="contained" 
            disabled={!newAduana.nombre || !newAduana.numeroRegistro || aduanaList.length >= 4}
            sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;