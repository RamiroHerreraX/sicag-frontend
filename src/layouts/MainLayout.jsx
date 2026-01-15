import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Avatar,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as CertificationsIcon,
  Folder as ExpedienteIcon,
  Person as ProfileIcon,
  Map as SiteMapIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 280;

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'DASHBOARD', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'CERTIFICACIONES', icon: <CertificationsIcon />, path: '/certifications' },
    { text: 'EXPEDIENTE', icon: <ExpedienteIcon />, path: '/expediente' },
    { text: 'PERFIL', icon: <ProfileIcon />, path: '/profile' },
    { text: 'MAPA DEL SITIO', icon: <SiteMapIcon />, path: '/sitemap' },
  ];

  const drawer = (
    <Box sx={{ bgcolor: '#2c3e50', color: 'white', height: '100%' }}>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #34495e' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          SICAG
        </Typography>
        <Typography variant="caption" sx={{ color: '#bdc3c7' }}>
          Sistema Integral de Consultoría y Asesoría Gerencial
        </Typography>
      </Box>
      
      <Box sx={{ p: 2, mt: 2 }}>
        <Typography variant="overline" sx={{ color: '#bdc3c7', pl: 2 }}>
          FUNCIONALIDADES
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                color: 'white',
                borderRadius: 1,
                mb: 0.5,
                bgcolor: location.pathname === item.path ? '#34495e' : 'transparent',
                borderLeft: location.pathname === item.path ? '4px solid #3498db' : '4px solid transparent',
                '&:hover': {
                  bgcolor: '#34495e',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
      
      <Box sx={{ p: 3, mt: 'auto', borderTop: '1px solid #34495e' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: '#3498db', width: 56, height: 56, fontSize: '1.2rem' }}>
            {user?.avatar || 'U'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {user?.name || 'Usuario'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#bdc3c7' }}>
              {user?.role === 'agente' ? 'Agente Aduanal' : 
               user?.role === 'profesionista' ? 'Profesionista' : 
               user?.role === 'empresario' ? 'Empresario' : 'Usuario'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#bdc3c7', display: 'block' }}>
              Región: {user?.region}
            </Typography>
          </Box>
        </Box>
        <Button
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            color: '#bdc3c7',
            textTransform: 'none',
            '&:hover': {
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Cerrar sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar para móvil */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: '#2c3e50',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {location.pathname === '/dashboard' && 'Dashboard'}
            {location.pathname === '/certifications' && 'Certificaciones'}
            {location.pathname === '/expediente' && 'Expediente'}
            {location.pathname === '/profile' && 'Perfil'}
            {location.pathname === '/sitemap' && 'Mapa del Sitio'}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer para desktop */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, sm: 0 }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;