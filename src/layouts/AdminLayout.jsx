// src/layouts/AdminLayout.jsx
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
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Settings as ConfigIcon,
  Folder as ExpedienteIcon,
  Security as SecurityIcon,
  Assessment as ReportsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Gavel as ReviewIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { roleThemes, layoutConstants } from '../theme';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(!isMobile);

  // COLORES del tema administrador
  const adminTheme = roleThemes.admin;
  const primaryColor = adminTheme.primary;
  const sidebarColor = adminTheme.sidebar;
  const activeColor = adminTheme.active;
  const textColor = adminTheme.text;
  const iconColor = adminTheme.icon;

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
    { text: 'DASHBOARD', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'USUARIOS', icon: <UsersIcon />, path: '/admin/users' },
    { text: 'REVISIÓN', icon: <ReviewIcon />, path: '/admin/users/review' },
    { text: 'EXPEDIENTES', icon: <ExpedienteIcon />, path: '/admin/expediente-config' },
    { text: 'CONFIGURACIÓN', icon: <ConfigIcon />, path: '/admin/system-config' },
    { text: 'REPORTES', icon: <ReportsIcon />, path: '/admin/reports' },
  ];

  // Contenido del drawer
  const drawerContent = (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      color: textColor,
      width: '100%',
    }}>
      {/* ESPACIO EN LA PARTE SUPERIOR */}
      <Box sx={{ 
        flex: 0,
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
      }}>
        {/* ETIQUETA "ADMINISTRACIÓN" ENCIMA DEL MENÚ */}
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
                  color: textColor,
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                Administración
              </Typography>
              <Divider sx={{ 
                backgroundColor: primaryColor,
                opacity: 0.3,
              }} />
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: textColor,
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                A
              </Typography>
              <Divider sx={{ 
                backgroundColor: primaryColor,
                opacity: 0.3,
              }} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Menú */}
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
          {menuItems.map((item) => (
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
                selected={location.pathname === item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'flex-start' : 'center',
                  px: 2,
                  py: 1.25,
                  borderRadius: '4px',
                  marginTop: 0.5,
                  marginBottom: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: activeColor,
                    color: primaryColor,
                    '&:hover': {
                      backgroundColor: activeColor,
                    },
                    '& .MuiTypography-root': {
                      fontWeight: 600,
                      color: primaryColor,
                    },
                    '& .MuiListItemIcon-root': {
                      color: primaryColor,
                    }
                  },
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: iconColor,
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
                      fontWeight: 500,
                      letterSpacing: '0.3px',
                      color: textColor,
                    }
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer del Drawer */}
      <Box sx={{ 
        mt: 'auto',
        p: 2, 
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa',
      }}>
        {open && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ 
              color: '#666',
              fontSize: '0.75rem',
              display: 'block',
              textAlign: 'center',
            }}>
              SICAG Admin v1.0
            </Typography>
          </Box>
        )}
        {open ? (
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            fullWidth
            sx={{
              backgroundColor: '#f0f0f0',
              color: textColor,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
              padding: '10px',
              borderRadius: '4px',
              textTransform: 'none',
              justifyContent: 'flex-start',
            }}
          >
            Cerrar sesión
          </Button>
        ) : (
          <IconButton
            onClick={handleLogout}
            sx={{
              backgroundColor: '#f0f0f0',
              color: textColor,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
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
          backgroundColor: primaryColor,
          color: 'white',
          width: '100%',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ 
          minHeight: `${layoutConstants.appBarHeight}px`,
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
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Logo SICAG */}
            <Typography 
              variant="h6" 
              noWrap 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: '1px',
              }}
            >
              SICAG
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                ml: 2,
                opacity: 0.8,
                display: { xs: 'none', md: 'block' }
              }}
            >
              | Módulo Administrativo
            </Typography>
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
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {user?.name || 'Administrador Sistema'}
              </Typography>
              <Typography 
                variant="caption" 
                noWrap
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Administrador
              </Typography>
            </Box>
            
            {/* Avatar */}
            <Avatar 
              sx={{ 
                width: 36,
                height: 36,
                backgroundColor: adminTheme.secondary,
                fontSize: '15px',
                fontWeight: 'bold',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                mr: 1,
              }}
            >
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            
            {/* Flecha hacia abajo */}
            <IconButton color="inherit" size="small">
              <ArrowDropDownIcon />
            </IconButton>
            
            {/* Separador vertical */}
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                mx: 2,
                height: '24px',
                alignSelf: 'center',
              }}
            />
            
            {/* Icono de notificaciones */}
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
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
          width: { sm: open ? layoutConstants.drawerWidth : layoutConstants.collapsedDrawerWidth },
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
              width: layoutConstants.drawerWidth,
              backgroundColor: sidebarColor,
              color: textColor,
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
              width: open ? layoutConstants.drawerWidth : layoutConstants.collapsedDrawerWidth,
              backgroundColor: sidebarColor,
              color: textColor,
              borderRight: '1px solid #e0e0e0',
              boxSizing: 'border-box',
              overflowX: 'hidden',
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

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, sm: 3, md: 3.5 },
          mt: `${layoutConstants.appBarHeight}px`,
          width: { 
            xs: '100%',
            sm: open ? `calc(100% - ${layoutConstants.drawerWidth}px)` : `calc(100% - ${layoutConstants.collapsedDrawerWidth}px)`
          },
          ml: { xs: 0, sm: 'auto' },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;