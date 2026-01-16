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
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  CameraAlt as CameraIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  History as HistoryIcon
} from '@mui/icons-material';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    nombre: 'Luis Rodríguez',
    email: 'luis.rodriguez@ejemplo.com',
    telefono: '+52 55 1234 5678',
    rol: 'Agente Aduanal',
    region: 'Norte',
    fechaRegistro: '15/01/2024',
    ultimoAcceso: '15/01/2026 10:30 AM'
  });

  const handleChange = (field) => (e) => {
    setProfile({
      ...profile,
      [field]: e.target.value
    });
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Mi Perfil
        </Typography>
        <Button
          variant={editMode ? 'contained' : 'outlined'}
          startIcon={editMode ? <SaveIcon /> : <EditIcon />}
          onClick={editMode ? handleSave : () => setEditMode(true)}
          color={editMode ? 'success' : 'primary'}
        >
          {editMode ? 'Guardar Cambios' : 'Editar Perfil'}
        </Button>
      </Box>

      {/* ===== FILA SUPERIOR: TRES APARTADOS ===== */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* 1. Foto de Perfil */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ 
              textAlign: 'center', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              py: 3
            }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar sx={{ 
                  width: 120, 
                  height: 120, 
                  fontSize: '2.8rem', 
                  bgcolor: '#3498db',
                  margin: '0 auto'
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
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                    size="small"
                  >
                    <CameraIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                {profile.nombre}
              </Typography>

              <Chip 
                label={profile.rol} 
                color="primary" 
                size="medium" 
                sx={{ mt: 1.5, mb: 1.5, fontWeight: 'medium' }} 
              />

              <Typography variant="body1" sx={{ 
                color: '#2c3e50', 
                fontWeight: 'medium',
                mb: 0.5
              }}>
                {profile.region}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'text.secondary',
                mt: 1
              }}>
                Miembro desde: {profile.fechaRegistro}
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
                color: '#2c3e50',
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
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Certificaciones Activas
                  </Typography>
                  <Typography variant="h3" fontWeight="bold" sx={{ color: '#2c3e50' }}>
                    8
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  textAlign: 'center',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: '#fff8e1'
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    En Revisión
                  </Typography>
                  <Typography variant="h3" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                    2
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  textAlign: 'center',
                  p: 1.5,
                  borderRadius: 1,
                  bgcolor: '#ffebee'
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Por Vencer (30 días)
                  </Typography>
                  <Typography variant="h3" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                    1
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  pt: 2, 
                  mt: 2,
                  borderTop: '1px solid #e0e0e0',
                  textAlign: 'center'
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Último Acceso
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 'medium',
                    color: '#2c3e50'
                  }}>
                    {profile.ultimoAcceso}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* 3. Preferencias y Configuración (REDUCIDO) */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', p: 2 }}>
              <Typography variant="h6" sx={{ 
                mb: 2.5, 
                fontWeight: 'bold', 
                color: '#2c3e50'
              }}>
                Preferencias y Configuración
              </Typography>

              <Grid container spacing={2} sx={{ height: 'calc(100% - 50px)' }}>
                {/* Columna 1 de preferencias - Compacta */}
                <Grid item xs={12} md={7}>
                  <Stack spacing={2}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 0.8,
                      border: '1px solid #e0e0e0',
                      bgcolor: '#f8f9fa'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <NotificationsIcon sx={{ 
                          mr: 1.5, 
                          color: '#3498db',
                          fontSize: '1.5rem'
                        }} />
                        <Box>
                          <Typography fontWeight="bold" variant="body1" sx={{ fontSize: '0.9rem' }}>
                            Notificaciones
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Configurar alertas
                          </Typography>
                        </Box>
                      </Box>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ 
                          minWidth: '85px',
                          height: '32px',
                          fontSize: '0.75rem'
                        }}
                      >
                        Configurar
                      </Button>
                    </Box>

                    <Divider />

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 0.8,
                      border: '1px solid #e0e0e0',
                      bgcolor: '#f8f9fa'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <SecurityIcon sx={{ 
                          mr: 1.5, 
                          color: '#e74c3c',
                          fontSize: '1.5rem'
                        }} />
                        <Box>
                          <Typography fontWeight="bold" variant="body1" sx={{ fontSize: '0.9rem' }}>
                            Seguridad
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Contraseña y verificación
                          </Typography>
                        </Box>
                      </Box>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ 
                          minWidth: '85px',
                          height: '32px',
                          fontSize: '0.75rem'
                        }}
                      >
                        Gestionar
                      </Button>
                    </Box>

                    <Divider />

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 0.8,
                      border: '1px solid #e0e0e0',
                      bgcolor: '#f8f9fa'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <HistoryIcon sx={{ 
                          mr: 1.5, 
                          color: '#9b59b6',
                          fontSize: '1.5rem'
                        }} />
                        <Box>
                          <Typography fontWeight="bold" variant="body1" sx={{ fontSize: '0.9rem' }}>
                            Historial
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Registro de accesos
                          </Typography>
                        </Box>
                      </Box>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ 
                          minWidth: '85px',
                          height: '32px',
                          fontSize: '0.75rem'
                        }}
                      >
                        Ver
                      </Button>
                    </Box>
                  </Stack>
                </Grid>

                {/* Columna 2 de preferencias - Compacta */}
                <Grid item xs={12} md={5}>
                  <Box sx={{ 
                    height: '100%',
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: '#f0f7ff',
                    border: '1px solid #d0e3ff',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ 
                      mb: 1.5, 
                      color: '#2c3e50',
                      fontSize: '0.85rem'
                    }}>
                      Configuraciones Adicionales
                    </Typography>
                    
                    <Stack spacing={1.5} sx={{ flex: 1 }}>
                      <Box>
                        <Typography variant="caption" fontWeight="medium" sx={{ 
                          display: 'block', 
                          mb: 0.25
                        }}>
                          Idioma
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Español (MX)
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 0.5 }} />
                      
                      <Box>
                        <Typography variant="caption" fontWeight="medium" sx={{ 
                          display: 'block', 
                          mb: 0.25
                        }}>
                          Zona Horaria
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          UTC-06:00
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 0.5 }} />
                      
                      <Box>
                        <Typography variant="caption" fontWeight="medium" sx={{ 
                          display: 'block', 
                          mb: 0.25
                        }}>
                          Privacidad
                        </Typography>
                        <Typography variant="caption" color="text-secondary">
                          Perfil visible
                        </Typography>
                      </Box>
                    </Stack>
                    
                    <Button 
                      variant="contained" 
                      size="small"
                      sx={{ 
                        mt: 1.5,
                        fontSize: '0.75rem',
                        height: '30px'
                      }}
                    >
                      Más Opciones
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ===== FILA INFERIOR: INFORMACIÓN PERSONAL ===== */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                fontWeight: 'bold', 
                color: '#2c3e50',
                display: 'flex',
                alignItems: 'center'
              }}>
                Información Personal
                {editMode && (
                  <Chip 
                    label="Modo Edición" 
                    color="warning" 
                    size="small" 
                    sx={{ ml: 2 }} 
                  />
                )}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre Completo"
                    value={profile.nombre}
                    onChange={handleChange('nombre')}
                    disabled={!editMode}
                    variant={editMode ? 'outlined' : 'filled'}
                    sx={{ mb: 3 }}
                    size="medium"
                    InputProps={{
                      sx: { fontSize: '1rem' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    value={profile.email}
                    onChange={handleChange('email')}
                    disabled={!editMode}
                    variant={editMode ? 'outlined' : 'filled'}
                    sx={{ mb: 3 }}
                    size="medium"
                    InputProps={{
                      sx: { fontSize: '1rem' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    value={profile.telefono}
                    onChange={handleChange('telefono')}
                    disabled={!editMode}
                    variant={editMode ? 'outlined' : 'filled'}
                    sx={{ mb: 3 }}
                    size="medium"
                    InputProps={{
                      sx: { fontSize: '1rem' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Rol"
                    value={profile.rol}
                    disabled
                    variant="filled"
                    sx={{ mb: 3 }}
                    size="medium"
                    InputProps={{
                      sx: { fontSize: '1rem' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Región"
                    value={profile.region}
                    disabled={!editMode}
                    variant={editMode ? 'outlined' : 'filled'}
                    sx={{ mb: 3 }}
                    size="medium"
                    InputProps={{
                      sx: { fontSize: '1rem' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Registro"
                    value={profile.fechaRegistro}
                    disabled
                    variant="filled"
                    sx={{ mb: 3 }}
                    size="medium"
                    InputProps={{
                      sx: { fontSize: '1rem' }
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;