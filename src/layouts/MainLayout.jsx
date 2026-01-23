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
  ListItemButton,
  ListItemIcon, 
  ListItemText,
  Avatar,
  Button,
  IconButton,
  Divider,
  Badge,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as CertificationsIcon,
  Assignment as DeclaracionesIcon,
  Folder as ExpedienteIcon,
  Person as ProfileIcon,
  Map as SiteMapIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 200; // Mantenido igual
const collapsedDrawerWidth = 60; // Mantenido igual

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(!isMobile);

  // COLORES VIVOS como en las imágenes de MANIFESTA+
  const primaryColor = '#2E86C1'; // Azul vivo más brillante
  const accentColor = '#1ABC9C'; // Color acento verde azulado como en la imagen
  const sidebarColor = '#FFFFFF';
  const activeColor = '#E8F4F8';
  const hoverColor = '#F0F8FF'; // Azul muy claro para hover
  const textColor = '#000000';
  const lightTextColor = '#666666';
  const iconColor = '#2E86C1';
  const appBarGradient = 'linear-gradient(135deg, #2E86C1 0%, #3498DB 100%)'; // Gradiente más vivo

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'DASHBOARD', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'EXPEDIENTE', icon: <ExpedienteIcon />, path: '/expediente' },
    { text: 'CERTIFICACIONES', icon: <CertificationsIcon />, path: '/certifications' },
    { text: 'DECLARACIONES', icon: <DeclaracionesIcon />, path: '/declaraciones' },
    { text: 'PERFIL', icon: <ProfileIcon />, path: '/profile' },
    { text: 'MAPA DEL SITIO', icon: <SiteMapIcon />, path: '/sitemap' },
  ];

  const drawerContent = (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      color: textColor,
      width: '100%',
    }}>
      {/* ESPACIO EN LA PARTE SUPERIOR PARA BAJAR EL CONTENIDO */}
      <Box sx={{ 
        flex: 0,
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
      }}>
        {/* ETIQUETA "FUNCIONALIDADES" ENCIMA DEL MENÚ */}
        <Box sx={{ 
          width: '100%',
          padding: theme.spacing(2),
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa',
        }}>
          {open ? (
            <Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  letterSpacing: '1px',
                  color: primaryColor, // Azul vivo
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                Funcionalidades
              </Typography>
              <Divider sx={{ 
                backgroundColor: primaryColor, // Azul vivo
                opacity: 0.5,
                height: '2px',
              }} />
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: primaryColor, // Azul vivo
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                F
              </Typography>
              <Divider sx={{ 
                backgroundColor: primaryColor, // Azul vivo
                opacity: 0.5,
                height: '2px',
              }} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Menú - CENTRADO VERTICALMENTE */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '50vh',
        mt: 1,
      }}>
        <List sx={{ 
          padding: theme.spacing(1.5),
        }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem 
                key={item.text} 
                disablePadding 
                component={Link}
                to={item.path}
                sx={{ 
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  marginBottom: 1,
                }}
              >
                <ListItemButton
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'flex-start' : 'center',
                    px: 2,
                    py: 1.25,
                    borderRadius: '8px', // Bordes más redondeados
                    marginTop: 0.5,
                    marginBottom: 0.5,
                    backgroundColor: isActive ? activeColor : 'transparent',
                    borderLeft: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      backgroundColor: activeColor,
                      color: primaryColor,
                      '&:hover': {
                        backgroundColor: alpha(activeColor, 0.9),
                      },
                      '& .MuiTypography-root': {
                        fontWeight: 700,
                        color: primaryColor,
                      },
                      '& .MuiListItemIcon-root': {
                        color: accentColor,
                      }
                    },
                    '&:hover': {
                      backgroundColor: hoverColor,
                      transform: 'translateX(2px)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                      color: isActive ? accentColor : iconColor,
                      fontSize: '1.25rem',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    sx={{ 
                      opacity: open ? 1 : 0,
                      '& .MuiTypography-root': {
                        fontSize: '0.8125rem',
                        fontWeight: isActive ? 700 : 500,
                        letterSpacing: '0.3px',
                        color: isActive ? primaryColor : textColor,
                      }
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer del Drawer - EN LA PARTE INFERIOR */}
      <Box sx={{ 
        mt: 'auto',
        p: 2, 
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa',
      }}>
        {open && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ 
              color: primaryColor, // Azul vivo
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'block',
              textAlign: 'center',
              letterSpacing: '0.5px',
            }}>
              SICAG v1.0
            </Typography>
          </Box>
        )}
        {open ? (
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            fullWidth
            sx={{
              backgroundColor: '#FFFFFF',
              color: primaryColor, // Azul vivo
              border: '1px solid #e0e0e0',
              '&:hover': {
                backgroundColor: hoverColor,
                borderColor: primaryColor,
                transform: 'translateY(-1px)',
              },
              padding: '10px',
              borderRadius: '8px',
              textTransform: 'none',
              justifyContent: 'flex-start',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            Cerrar sesión
          </Button>
        ) : (
          <IconButton
            onClick={handleLogout}
            sx={{
              backgroundColor: '#FFFFFF',
              color: primaryColor, // Azul vivo
              border: '1px solid #e0e0e0',
              '&:hover': {
                backgroundColor: hoverColor,
                borderColor: primaryColor,
                transform: 'translateY(-1px)',
              },
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <LogoutIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar superior */}
      <AppBar
        position="fixed"
        sx={{
          background: appBarGradient,
          color: 'white',
          width: '100%',
          zIndex: theme.zIndex.drawer + 1,
          boxShadow: '0 4px 20px rgba(46, 134, 193, 0.3)', // Sombra más pronunciada
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Toolbar sx={{ 
          minHeight: '64px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          {/* Lado izquierdo - Menú hamburguesa y logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={isMobile ? handleDrawerToggle : handleDesktopDrawerToggle}
              edge="start"
              sx={{ 
                mr: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Logo SICAG con estilo moderno */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
            }}>
              <Box sx={{
                width: 34,
                height: 34,
                backgroundColor: '#FFFFFF',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: primaryColor,
                    fontSize: '1.1rem',
                    lineHeight: 1,
                  }}
                >
                  S
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                noWrap 
                component="div" 
                sx={{ 
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  fontSize: '1.25rem',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                }}
              >
                SICAG
              </Typography>
            </Box>
          </Box>

          {/* Lado derecho - Información del usuario */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Nombre del usuario */}
            <Box sx={{ 
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              alignItems: 'flex-end',
              mr: 2,
            }}>
              <Typography 
                variant="subtitle1" 
                noWrap
                sx={{ 
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '0.2px',
                  color: '#FFFFFF',
                }}
              >
                {user?.name || 'LUIS RODRIGUEZ'}
              </Typography>
              <Typography 
                variant="caption" 
                noWrap
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                }}
              >
                {user?.role === 'agente' ? 'Agente Aduanal' : 
                 user?.role === 'profesionista' ? 'Profesionista' : 
                 user?.role === 'empresario' ? 'Empresario' : 'Usuario'}
              </Typography>
            </Box>
            
            {/* Avatar con estilo mejorado */}
            <Avatar 
              sx={{ 
                width: 36,
                height: 36,
                backgroundColor: '#FFFFFF',
                color: primaryColor,
                fontSize: '16px',
                fontWeight: 'bold',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                mr: 1,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            
            {/* Flecha hacia abajo */}
            <IconButton 
              color="inherit" 
              size="small"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              <ArrowDropDownIcon />
            </IconButton>
            
            {/* Separador vertical */}
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                mx: 2,
                height: '24px',
                alignSelf: 'center',
              }}
            />
            
            {/* Icono de notificaciones con estilo */}
            <IconButton 
              color="inherit"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Badge 
                badgeContent={3} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#E74C3C',
                    fontSize: '0.6rem',
                    height: '18px',
                    minWidth: '18px',
                    fontWeight: 'bold',
                  }
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (Barra lateral) */}
      <Box
        component="nav"
        sx={{ 
          width: { sm: open ? drawerWidth : collapsedDrawerWidth },
          flexShrink: { sm: 0 },
          zIndex: theme.zIndex.drawer,
        }}
      >
        {/* Drawer temporal para móviles */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: sidebarColor,
              color: textColor,
              boxShadow: '2px 0 20px rgba(46, 134, 193, 0.15)',
              borderRight: '1px solid #e0e0e0',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Drawer permanente para desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: open ? drawerWidth : collapsedDrawerWidth,
              backgroundColor: sidebarColor,
              color: textColor,
              borderRight: '1px solid #e0e0e0',
              boxSizing: 'border-box',
              overflowX: 'hidden',
              boxShadow: '1px 0 12px rgba(46, 134, 193, 0.1)',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open={open}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Contenido principal - CON MÁS ESPACIO */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, sm: 3, md: 3.5 },
          mt: '64px',
          width: { 
            xs: '100%',
            sm: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${collapsedDrawerWidth}px)`
          },
          ml: { xs: 0, sm: 'auto' },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: '#F8FAFF', // Fondo azul muy claro
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;