import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  Folder as FolderIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Gavel as GavelIcon,
  Map as MapIcon
} from '@mui/icons-material';

const SiteMap = () => {
  const modules = [
    {
      title: 'Módulo de Autenticación',
      description: 'Acceso seguro y control por rol',
      color: '#3498db',
      icon: <SecurityIcon />,
      items: [
        { text: 'Inicio de Sesión', path: '/login' },
        { text: 'Recuperación de Contraseña', path: '/forgot-password' },
        { text: 'Cambio de Contraseña', path: '/password-change' },
        { text: 'Acuerdo de Privacidad', path: '/privacy-agreement' },
      ]
    },
    {
      title: 'Dashboard Principal',
      description: 'Vista general del sistema',
      color: '#2ecc71',
      icon: <DashboardIcon />,
      items: [
        { text: 'Dashboard Usuario', path: '/dashboard' },
        { text: 'Dashboard Comité', path: '/committee/dashboard' },
        { text: 'Dashboard Admin', path: '/admin/dashboard' },
      ]
    },
    {
      title: 'Gestión de Certificaciones',
      description: 'Núcleo del sistema - Control de certificaciones',
      color: '#9b59b6',
      icon: <DescriptionIcon />,
      items: [
        { text: 'Mis Certificaciones', path: '/certifications' },
        { text: 'Nueva Certificación', path: '/certifications/new' },
        { text: 'Detalle de Certificación', path: '/certifications/1' },
      ]
    },
    {
      title: 'Expediente Digital',
      description: 'Contenedor de documentación',
      color: '#f39c12',
      icon: <FolderIcon />,
      items: [
        { text: 'Mi Expediente', path: '/expediente' },
        { text: 'Configuración (Admin)', path: '/admin/expediente-config' },
      ]
    },
    {
      title: 'Comité de Cumplimiento',
      description: 'Validación de certificaciones',
      color: '#1a237e',
      icon: <GavelIcon />,
      items: [
        { text: 'Revisión de Certificaciones', path: '/committee/review' },
        { text: 'Dashboard Comité', path: '/committee/dashboard' },
      ]
    },
    {
      title: 'Administración',
      description: 'Gestión completa del sistema',
      color: '#1b5e20',
      icon: <SettingsIcon />,
      items: [
        { text: 'Gestión de Usuarios', path: '/admin/users' },
        { text: 'Revisión de Usuarios', path: '/admin/users/1/review' },
        { text: 'Configuración del Sistema', path: '/admin/system-config' },
        { text: 'Reportes', path: '/admin/reports' },
      ]
    },
    {
      title: 'Perfil y Configuración',
      description: 'Gestión personal',
      color: '#34495e',
      icon: <PersonIcon />,
      items: [
        { text: 'Mi Perfil', path: '/profile' },
        { text: 'Preferencias', path: '/profile#preferences' },
      ]
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <MapIcon sx={{ fontSize: 60, color: '#2c3e50', mb: 2 }} />
        <Typography variant="h3" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 2 }}>
          Mapa del Sitio
        </Typography>
        <Typography variant="h6" sx={{ color: '#7f8c8d', maxWidth: 800, mx: 'auto' }}>
          Explore la estructura completa del Sistema Integral de Consultoría y Asesoría Gremial
        </Typography>
      </Box>

      {/* Leyenda */}
      <Paper elevation={1} sx={{ p: 3, mb: 4, bgcolor: '#f8f9fa' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip label="USUARIO" color="primary" size="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Acceso para Agentes/Usuarios</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip label="COMITÉ" color="secondary" size="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Acceso para miembros del Comité</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip label="ADMIN" color="success" size="small" sx={{ mr: 1 }} />
              <Typography variant="body2">Acceso para Administradores</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Módulos */}
      <Grid container spacing={4}>
        {modules.map((module, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                borderLeft: `4px solid ${module.color}`,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: module.color, mr: 2 }}>
                    {module.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                      {module.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      {module.description}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List dense>
                  {module.items.map((item, idx) => (
                    <ListItem 
                      key={idx}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: '#2c3e50',
                        textDecoration: 'none',
                        borderRadius: 1,
                        mb: 0.5,
                        '&:hover': {
                          bgcolor: '#f5f7fa'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: module.color }}>
                        {idx + 1}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 'medium'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Flujo del sistema */}
      <Paper elevation={1} sx={{ p: 4, mt: 6, bgcolor: '#f0f7ff' }}>
        <Typography variant="h5" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          🔄 Flujo del Sistema SICAG
        </Typography>
        
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {[
            '1. Usuario crea expediente',
            '2. Registra certificaciones',
            '3. Carga evidencias',
            '4. Comité válida certificaciones',
            '5. Sistema calcula semáforo',
            '6. Genera alertas y estadísticas',
            '7. Asigna nivel de reconocimiento'
          ].map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'white' }}>
                <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 'medium' }}>
                  {step}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Información de contacto */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
          Para soporte técnico o preguntas sobre el sistema:
        </Typography>
        <Typography variant="body1" sx={{ color: '#2c3e50', fontWeight: 'bold', mt: 1 }}>
          soporte@sicag.com | +52 55 1234 5678
        </Typography>
        <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 2 }}>
          © 2026 SICAG - Sistema Integral de Consultoría y Asesoría Gremial
        </Typography>
      </Box>
    </Box>
  );
};

export default SiteMap;