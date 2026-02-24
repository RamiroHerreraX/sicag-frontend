// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
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
  Menu,
  MenuItem,
  Tooltip,
  Chip,
  Stack,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Settings as ConfigIcon,
  Folder as ExpedienteIcon,
  Assessment as ReportsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Description as DescriptionIcon,
  History as HistoryIcon,
  Help as HelpIcon,
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// Colores institucionales actualizados para que coincidan con SuperAdminLayout
const colors = {
  // Sidebar color - AHORA AZUL OSCURO #133B6B
  sidebar: {
    main: '#133B6B', // Azul oscuro principal
    dark: '#133B6B', // Mismo azul para mantener consistencia
    light: '#133B6B', // Mismo azul
  },
  // Secondary colors
  secondary: {
    main: '#e9e9e9', // Color de acento gris claro
    light: '#ffffff',
    lighter: '#ffffff'
  },
  // Accent colors
  accents: {
    blue: '#e9e9e9', // Cambiado a gris claro
    purple: '#ef4444' // Rojo para notificaciones
  },
  // Status colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
    light: 'rgba(255, 255, 255, 0.6)',
    muted: 'rgba(255, 255, 255, 0.5)',
  },
  // Background colors
  background: {
    light: '#f8fafc',
    hover: 'rgba(255, 255, 255, 0.1)',
    selected: 'rgba(255, 255, 255, 0.15)',
    white: '#FFFFFF'
  }
};

// Constantes de layout
const layoutConfig = {
  drawerWidth: 300,
  collapsedDrawerWidth: 72,
  appBarHeight: 64
};

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  // COLORES - AHORA USAN #133B6B
  const sidebarColor = colors.sidebar.main;
  const secondaryColor = colors.secondary.main;
  const accentBlue = colors.accents.blue;
  const accentPurple = colors.accents.purple;

  // MENÚ PRINCIPAL - INCLUYE PERFIL
  const menuItems = [
    { 
      text: 'DASHBOARD', 
      icon: <DashboardIcon />, 
      path: '/admin/dashboard',
      description: 'Panel de control general',
    },
    { 
      text: 'USUARIOS', 
      icon: <UsersIcon />, 
      path: '/admin/users',
      description: 'Gestión de usuarios y roles',
    },
    { 
      text: 'EXPEDIENTES', 
      icon: <ExpedienteIcon />, 
      path: '/admin/expediente-config',
      description: 'Configuración de expedientes',
    },
    { 
      text: 'REPORTES', 
      icon: <ReportsIcon />, 
      path: '/admin/reports',
      description: 'Reportes y estadísticas',
    },
    { 
      text: 'CONFIGURACIÓN', 
      icon: <ConfigIcon />, 
      path: '/admin/system-config',
      description: 'Configuración del sistema',
    },
    { 
      text: 'AUDITORÍA', 
      icon: <HistoryIcon />, 
      path: '/admin/audit',
      description: 'Registro de auditoría',
    }
  ];

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleAlertsClick = () => {
    navigate('/admin/alerts');
  };

  const isActivePath = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin/dashboard';
    }
    if (path === '/admin/users') {
      return location.pathname.startsWith('/admin/users') && 
             !location.pathname.includes('/review');
    }
    return location.pathname.startsWith(path);
  };

  // Contenido del drawer - AHORA CON #133B6B
  const drawerContent = (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      bgcolor: sidebarColor,
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
      borderRight: `1px solid rgba(255, 255, 255, 0.1)`,
    }}>
      {/* Header del Drawer */}
      <Box sx={{ 
        p: open ? 3 : 2,
        borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
        bgcolor: 'transparent',
        display: 'flex',
        flexDirection: open ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: open ? 'flex-start' : 'center',
        gap: open ? 2 : 0,
        minHeight: 80,
      }}>
        <Avatar 
          sx={{ 
            width: open ? 48 : 40,
            height: open ? 48 : 40,
            bgcolor: '#ffffff',
            color: sidebarColor,
            fontSize: open ? '1.2rem' : '1rem',
            fontWeight: 'bold',
            border: `3px solid rgba(255, 255, 255, 0.3)`,
          }}
        >
          {user?.name?.charAt(0) || 'A'}
        </Avatar>
        
        {open && (
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700,
                color: colors.text.primary,
                lineHeight: 1.2,
                fontSize: '1rem',
              }}
            >
              {user?.name?.split(' ')[0] || 'Admin'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: colors.text.secondary,
                display: 'block',
                fontWeight: 500,
              }}
            >
              Administrador del Sistema
            </Typography>
          </Box>
        )}
        
        {open && (
          <Chip 
            label="Admin"
            size="small"
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: colors.text.primary,
              fontWeight: 700,
              fontSize: '0.7rem',
              height: 20,
            }}
          />
        )}
      </Box>

      {/* Menú Principal */}
      <Box sx={{ 
        flex: 1,
        p: open ? 2 : 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}>
        <Typography 
          variant="caption" 
          sx={{ 
            px: 2,
            py: 1,
            color: colors.text.light,
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          Administración
        </Typography>
        
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const isActive = isActivePath(item.path);
            return (
              <ListItem 
                key={item.text} 
                disablePadding 
                sx={{ 
                  mb: 0.5,
                  '&:last-child': { mb: 0 }
                }}
              >
                <Tooltip 
                  title={!open ? `${item.text} - ${item.description}` : ''} 
                  placement="right"
                  arrow
                >
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={isActive}
                    sx={{
                      minHeight: 48,
                      borderRadius: '8px',
                      px: open ? 2 : 1.5,
                      py: 1.5,
                      mx: open ? 0 : 0.5,
                      '&.Mui-selected': {
                        bgcolor: colors.background.selected,
                        borderLeft: `3px solid ${colors.secondary.main}`,
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '& .MuiListItemIcon-root': {
                          color: colors.text.primary,
                        },
                        '& .MuiTypography-root': {
                          color: colors.text.primary,
                          fontWeight: 600,
                        }
                      },
                      '&:hover': {
                        bgcolor: colors.background.hover,
                        transform: 'translateX(2px)',
                        transition: 'all 0.2s',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 40 : 'auto',
                        color: isActive ? colors.text.primary : colors.text.secondary,
                        justifyContent: 'center',
                        mr: open ? 2 : 0,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    
                    {open && (
                      <ListItemText 
                        primary={item.text}
                        secondary={item.description}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: '0.85rem',
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? colors.text.primary : colors.text.secondary,
                            letterSpacing: '0.2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }
                        }}
                        secondaryTypographyProps={{
                          sx: {
                            fontSize: '0.75rem',
                            color: colors.text.light,
                            mt: 0.25,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
        
        <Box sx={{ flex: 1 }} />
      </Box>

      {/* Footer del Drawer */}
      <Box sx={{ 
        p: open ? 2 : 1.5,
        borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
        bgcolor: 'transparent',
      }}>
        {open ? (
          <Stack spacing={1.5}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ 
                color: colors.text.light,
                fontSize: '0.7rem',
                fontWeight: 500,
                display: 'block',
              }}>
                SICAG Admin v1.0
              </Typography>
              <Typography variant="caption" sx={{ 
                color: colors.text.light,
                fontSize: '0.65rem',
                display: 'block',
              }}>
                Región: {user?.region || 'Todas'}
              </Typography>
            </Box>
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: colors.text.primary,
                fontWeight: 600,
                fontSize: '0.85rem',
                py: 1,
                '&:hover': {
                  borderColor: colors.secondary.main,
                  color: colors.secondary.main,
                  bgcolor: 'rgba(233, 233, 233, 0.1)',
                },
              }}
            >
              Cerrar Sesión
            </Button>
          </Stack>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Cerrar sesión" placement="right">
              <IconButton
                onClick={handleLogout}
                size="small"
                sx={{
                  color: colors.text.secondary,
                  '&:hover': {
                    color: colors.secondary.main,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            
            <Typography variant="caption" sx={{ 
              color: colors.text.light,
              fontSize: '0.6rem',
              fontWeight: 500,
            }}>
              v1.0
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: colors.background.light }}>
      {/* AppBar superior */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: sidebarColor,
          color: colors.text.primary,
          width: '100%',
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Toolbar sx={{ 
          minHeight: `${layoutConfig.appBarHeight}px`,
          px: { xs: 2, sm: 3 },
        }}>
          {/* Lado izquierdo */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flex: 1,
            gap: 2 
          }}>
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={isMobile ? handleDrawerToggle : handleDesktopDrawerToggle}
              edge="start"
              sx={{ 
                color: colors.text.primary,
                '&:hover': {
                  bgcolor: colors.background.hover,
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Logo y título */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
            onClick={() => navigate('/admin/dashboard')}
            >
              <Box sx={{ 
                width: 32, 
                height: 32,
                bgcolor: '#ffffff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: sidebarColor,
                    fontWeight: 800,
                    fontSize: '1rem',
                  }}
                >
                  A
                </Typography>
              </Box>
              
              <Typography 
                variant="h6" 
                noWrap 
                sx={{ 
                  fontWeight: 700,
                  color: colors.text.primary,
                  fontSize: '1.25rem',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                SICAG
              </Typography>
              
              <Chip 
                label="ADMIN"
                size="small"
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: colors.text.primary,
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  height: 22,
                  display: { xs: 'none', md: 'flex' }
                }}
              />
            </Box>
            
            {/* Indicador de ruta actual */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              ml: 3,
              px: 2,
              py: 0.5,
              bgcolor: colors.background.hover,
              borderRadius: '6px',
            }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 600,
                  color: colors.text.primary,
                  fontSize: '0.8rem',
                }}
              >
                {menuItems.find(item => isActivePath(item.path))?.text || 'Dashboard'}
              </Typography>
            </Box>
          </Box>

          {/* Lado derecho */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Botón de notificaciones */}
            <Tooltip title="Ver todas las alertas">
              <IconButton
                color="inherit"
                onClick={handleAlertsClick}
                sx={{ 
                  color: colors.text.secondary,
                  position: 'relative',
                  '&:hover': {
                    color: colors.text.primary,
                    bgcolor: colors.background.hover,
                  }
                }}
              >
                <Badge 
                  badgeContent={8} 
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.6rem',
                      height: 16,
                      minWidth: 16,
                      bgcolor: colors.accents.purple,
                      color: colors.text.primary
                    }
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            {/* Separador */}
            <Divider 
              orientation="vertical" 
              flexItem 
              sx={{ 
                height: 24,
                alignSelf: 'center',
                mx: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            />
            
            {/* Perfil del usuario */}
            <Tooltip title="Mi perfil">
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: colors.background.hover,
                  }
                }}
                onClick={handleProfileMenuOpen}
              >
                <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                  <Typography 
                    variant="body2" 
                    noWrap
                    sx={{ 
                      fontWeight: 600,
                      color: colors.text.primary,
                      fontSize: '0.9rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {user?.name?.split(' ')[0] || 'Admin'}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    noWrap
                    sx={{ 
                      color: colors.text.secondary,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    Administrador del Sistema
                  </Typography>
                </Box>
                
                <Avatar 
                  sx={{ 
                    width: 36,
                    height: 36,
                    bgcolor: '#ffffff',
                    color: sidebarColor,
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    border: `2px solid ${colors.secondary.light}`,
                  }}
                >
                  {user?.name?.charAt(0) || 'A'}
                </Avatar>
                
                <ArrowDropDownIcon sx={{ color: colors.text.secondary, fontSize: 20 }} />
              </Box>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Menú de perfil - CORREGIDO PARA NAVEGAR AL PERFIL */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 280,
            borderRadius: '12px',
            overflow: 'hidden',
          }
        }}
      >
        <Box sx={{ p: 2, bgcolor: sidebarColor, borderBottom: `1px solid rgba(255, 255, 255, 0.1)` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 48,
                height: 48,
                bgcolor: '#ffffff',
                color: sidebarColor,
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: colors.text.primary }}>
                {user?.name || 'Administrador'}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.text.secondary, fontWeight: 500 }}>
                Administrador del Sistema
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip 
              label={user?.region || 'Todas'}
              size="small"
              icon={<LocationIcon />}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: colors.text.primary,
                fontWeight: 600,
              }}
            />
            <Chip 
              label="Admin"
              size="small"
              variant="outlined"
              sx={{ 
                fontWeight: 600,
                borderColor: colors.secondary.main,
                color: colors.text.primary
              }}
            />
          </Box>
        </Box>
        
        {/* OPCIÓN DE PERFIL CORREGIDA - AHORA NAVEGA A /admin/profile */}
        <MenuItem 
          component={Link}
          to="/admin/profile"
          onClick={handleProfileMenuClose}
          sx={{ py: 1.5, px: 2 }}
        >
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: sidebarColor }} />
          </ListItemIcon>
          <ListItemText 
            primary="Mi Perfil"
            secondary="Información personal y preferencias"
            primaryTypographyProps={{ sx: { color: sidebarColor } }}
            secondaryTypographyProps={{ sx: { color: 'rgba(19, 59, 107, 0.6)' } }}
          />
        </MenuItem>
        
        <MenuItem 
          component={Link}
          to="/sitemap"
          onClick={handleProfileMenuClose}
          sx={{ py: 1.5, px: 2 }}
        >
          <ListItemIcon>
            <HelpIcon sx={{ color: sidebarColor }} />
          </ListItemIcon>
          <ListItemText 
            primary="Ayuda y Soporte"
            secondary="Documentación y contacto"
            primaryTypographyProps={{ sx: { color: sidebarColor } }}
            secondaryTypographyProps={{ sx: { color: 'rgba(19, 59, 107, 0.6)' } }}
          />
        </MenuItem>
        
        <Divider sx={{ borderColor: 'rgba(19, 59, 107, 0.08)' }} />
        
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            py: 1.5, 
            px: 2,
            color: sidebarColor,
            '&:hover': {
              bgcolor: 'rgba(233, 233, 233, 0.04)',
            }
          }}
        >
          <ListItemIcon sx={{ color: '#ef4444' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Cerrar Sesión"
            primaryTypographyProps={{ fontWeight: 600, sx: { color: '#ef4444' } }}
          />
        </MenuItem>
      </Menu>

      {/* Menú de configuración */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: '12px',
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ConfigIcon sx={{ color: sidebarColor }} />
          </ListItemIcon>
          <ListItemText 
            primary="Preferencias"
            primaryTypographyProps={{ sx: { color: sidebarColor } }}
          />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <NotificationsIcon sx={{ color: '#e9e9e9' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Notificaciones"
            primaryTypographyProps={{ sx: { color: sidebarColor } }}
          />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EmailIcon sx={{ color: '#ef4444' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Configuración de correo"
            primaryTypographyProps={{ sx: { color: sidebarColor } }}
          />
        </MenuItem>
      </Menu>

      {/* Drawer (Barra lateral) */}
      <Box
        component="nav"
        sx={{ 
          width: { 
            sm: open ? layoutConfig.drawerWidth : layoutConfig.collapsedDrawerWidth 
          },
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
              width: layoutConfig.drawerWidth,
              boxSizing: 'border-box',
              bgcolor: sidebarColor,
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
              width: open ? layoutConfig.drawerWidth : layoutConfig.collapsedDrawerWidth,
              boxSizing: 'border-box',
              borderRight: `1px solid rgba(255, 255, 255, 0.1)`,
              bgcolor: sidebarColor,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
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
          p: { xs: 2, sm: 3, md: 3.5, lg: 4 },
          mt: `${layoutConfig.appBarHeight}px`,
          width: { 
            xs: '100%',
            sm: open ? `calc(100% - ${layoutConfig.drawerWidth}px)` : `calc(100% - ${layoutConfig.collapsedDrawerWidth}px)`
          },
          ml: { xs: 0, sm: 'auto' },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          bgcolor: colors.background.light,
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;