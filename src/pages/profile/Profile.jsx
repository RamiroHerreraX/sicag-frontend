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
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Save as SaveIcon,
  CameraAlt as CameraIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  History as HistoryIcon
} from '@mui/icons-material';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [profile, setProfile] = useState({
    nombre: 'Luis Rodríguez',
    email: 'luis.rodriguez@ejemplo.com',
    telefono: '+52 55 1234 5678',
    rol: 'Agente Aduanal',
    nivel:'Nivel III',
    des_Nivel: 'Sistema Gremial Avanzado',
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
      email: 'luis.rodriguez@ejemplo.com'
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
        
      </Box>

      {/* ===== FILA SUPERIOR: TRES APARTADOS ===== */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* 1. Foto de Perfil */}
       <Grid item xs={12} md={3}>
  <Card sx={{ 
    height: '100%',
    borderRadius: 2,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px solid rgba(52, 152, 219, 0.1)',
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
          bgcolor: '#3498db',
          margin: '0 auto',
          border: '4px solid #e8f4fd',
          boxShadow: '0 4px 12px rgba(52, 152, 219, 0.2)'
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
        color: '#2c3e50',
        fontSize: '1.25rem',
        letterSpacing: '0.3px',
        textShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}>
        {profile.nombre}
      </Typography>

      {/* Rol */}
      <Chip 
        label={profile.rol} 
        color="primary" 
        size="medium" 
        sx={{ 
          mt: 1.5, 
          mb: 2, 
          fontWeight: '600',
          fontSize: '0.85rem',
          height: '28px',
          borderRadius: '16px',
          boxShadow: '0 2px 4px rgba(52, 152, 219, 0.15)'
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
          bgcolor: 'rgba(52, 152, 219, 0.05)',
          borderLeft: '4px solid #3498db'
        }}>
          
          <Typography variant="body1" sx={{ 
            color: '#2c3e50', 
            fontWeight: '700',
            fontSize: '1.1rem',
            lineHeight: 1.2
          }}>
            {profile.nivel}
            
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#2c3e50', 
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
          bgcolor: 'rgba(155, 89, 182, 0.05)',
          borderLeft: '4px solid #9b59b6'
        }}>
         
          <Typography variant="body1" sx={{ 
            color: '#2c3e50', 
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
        color: '#95a5a6',
        fontWeight: '500',
        fontSize: '0.85rem',
        mt: 2,
        pt: 2,
        borderTop: '1px solid rgba(0,0,0,0.08)'
      }}>
        Miembro desde: <span style={{ fontWeight: '600', color: '#7f8c8d' }}>{profile.fechaRegistro}</span>
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
                    null
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
    </Box>
  );
};

export default Profile;