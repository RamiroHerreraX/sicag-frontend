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
    // En una implementación real, aquí se guardarían los cambios
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

      <Grid container spacing={3}>
        {/* Columna izquierda - Información personal */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Información Personal
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre Completo"
                    value={profile.nombre}
                    onChange={handleChange('nombre')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    value={profile.email}
                    onChange={handleChange('email')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    value={profile.telefono}
                    onChange={handleChange('telefono')}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Rol"
                    value={profile.rol}
                    disabled
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Región"
                    value={profile.region}
                    disabled={!editMode}
                    variant={editMode ? "outlined" : "filled"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Registro"
                    value={profile.fechaRegistro}
                    disabled
                    variant="filled"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Sección de preferencias */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Preferencias y Configuración
              </Typography>
              
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <NotificationsIcon sx={{ mr: 2, color: '#3498db' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                        Notificaciones
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                        Configurar alertas y recordatorios
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="outlined" size="small">
                    Configurar
                  </Button>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SecurityIcon sx={{ mr: 2, color: '#27ae60' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                        Seguridad
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                        Cambiar contraseña y verificación
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="outlined" size="small">
                    Gestionar
                  </Button>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HistoryIcon sx={{ mr: 2, color: '#f39c12' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                        Historial de Actividad
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                        Ver registro de accesos y acciones
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="outlined" size="small">
                    Ver Historial
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna derecha - Avatar y estadísticas */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    fontSize: '3rem',
                    bgcolor: '#3498db',
                    mb: 2
                  }}
                >
                  LR
                </Avatar>
                {editMode && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      bgcolor: 'white',
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                  >
                    <CameraIcon />
                  </IconButton>
                )}
              </Box>

              <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
                {profile.nombre}
              </Typography>
              
              <Chip 
                label={profile.rol}
                color="primary"
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
                {profile.region}
              </Typography>
              
              <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                Miembro desde: {profile.fechaRegistro}
              </Typography>
            </CardContent>
          </Card>

          {/* Estadísticas rápidas */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Mi Actividad
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 0.5 }}>
                    Certificaciones Activas
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                    8
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 0.5 }}>
                    En Revisión
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                    2
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 0.5 }}>
                    Por Vencer (30 días)
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                    1
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 0.5 }}>
                    Último Acceso
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#2c3e50', fontWeight: 'medium' }}>
                    {profile.ultimoAcceso}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;