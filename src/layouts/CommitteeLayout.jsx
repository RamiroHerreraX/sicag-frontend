// src/layouts/CommitteeLayout.jsx
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
  Stack
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Gavel as ReviewIcon,
  Description as CertificationsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowBack as ArrowBackIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { roleThemes, layoutConstants } from '../theme';

const CommitteeLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  // COLORES del tema comité
  const committeeTheme = roleThemes.committee;
  const primaryColor = committeeTheme.primary;
  const sidebarColor = committeeTheme.sidebar;
  const activeColor = committeeTheme.active;
  const textColor = committeeTheme.text;
  const iconColor = committeeTheme.icon;

  // MENÚ PRINCIPAL - Solo rutas que existen
  const menuItems = [
    { 
      text: 'DASHBOARD', 
      icon: <DashboardIcon />, 
      path: '/committee/dashboard',
      description: 'Panel de control general',
      badge: 0
    },
    { 
      text: 'REVISIÓN', 
      icon: <ReviewIcon />, 
      path: '/committee/review',
      description: 'Revisión de certificaciones',
      badge: 5 // Certificaciones pendientes
    },
    { 
      text: 'ALERTAS', 
      icon: <NotificationsIcon />, 
      path: '/committee/alerts',
      description: 'Alertas y notificaciones',
      badge: 3 // Alertas no leídas
    },
    { 
      text: 'PERFIL', 
      icon: <PersonIcon />, 
      path: '/committee/profile',
      description: 'Mi perfil y configuración',
      badge: 0
    },
  ];

  // Rutas que no están implementadas (comentadas)
  // { text: 'ASIGNACIONES', icon: <AssignmentIcon />, path: '/committee/assignments' },
  // { text: 'MÉTRICAS', icon: <TimelineIcon />, path: '/committee/metrics' },

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

  // Función para verificar si la ruta está activa
  const isActivePath = (path) => {
    if (path === '/committee/dashboard') {
      return location.pathname === '/committee/dashboard';
    }
    if (path === '/committee/review') {
      return location.pathname.startsWith('/committee/review') || 
             location.pathname.startsWith('/committee/document');
    }
    return location.pathname.startsWith(path);
  };

  // Contenido del drawer mejorado
  const drawerContent = (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      bgcolor: 'white',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
      borderRight: '1px solid rgba(0, 0, 0, 0.08)',
    }}>
      {/* Header del Drawer */}
      <Box sx={{ 
        p: open ? 3 : 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        bgcolor: '#f8fafc',
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
            bgcolor: primaryColor,
            fontSize: open ? '1.2rem' : '1rem',
            fontWeight: 'bold',
            border: '3px solid rgba(26, 35, 126, 0.1)',
          }}
        >
          {user?.name?.charAt(0) || 'C'}
        </Avatar>
        
        {open && (
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700,
                color: '#1a237e',
                lineHeight: 1.2,
                fontSize: '1rem',
              }}
            >
              {user?.name?.split(' ')[0] || 'Miembro'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#64748b',
                display: 'block',
                fontWeight: 500,
              }}
            >
              Comité de Cumplimiento
            </Typography>
          </Box>
        )}
        
        {open && (
          <Chip 
            label="Comité"
            size="small"
            sx={{ 
              bgcolor: 'rgba(26, 35, 126, 0.1)',
              color: primaryColor,
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
            color: '#64748b',
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          Navegación
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
                        bgcolor: 'rgba(26, 35, 126, 0.08)',
                        borderLeft: `3px solid ${primaryColor}`,
                        '&:hover': {
                          bgcolor: 'rgba(26, 35, 126, 0.12)',
                        },
                        '& .MuiListItemIcon-root': {
                          color: primaryColor,
                        },
                        '& .MuiTypography-root': {
                          color: primaryColor,
                          fontWeight: 600,
                        }
                      },
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                        transform: 'translateX(2px)',
                        transition: 'all 0.2s',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 40 : 'auto',
                        color: isActive ? primaryColor : '#64748b',
                        justifyContent: 'center',
                        mr: open ? 2 : 0,
                      }}
                    >
                      {item.badge > 0 ? (
                        <Badge 
                          badgeContent={item.badge} 
                          color="error" 
                          size="small"
                          sx={{
                            '& .MuiBadge-badge': {
                              fontSize: '0.6rem',
                              height: 16,
                              minWidth: 16,
                            }
                          }}
                        >
                          {item.icon}
                        </Badge>
                      ) : (
                        item.icon
                      )}
                    </ListItemIcon>
                    
                    {open && (
                      <ListItemText 
                        primary={item.text}
                        secondary={item.description}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: '0.85rem',
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? primaryColor : '#374151',
                            letterSpacing: '0.2px',
                          }
                        }}
                        secondaryTypographyProps={{
                          sx: {
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            mt: 0.25,
                          }
                        }}
                      />
                    )}
                    
                    {open && item.badge > 0 && (
                      <Chip 
                        label={item.badge}
                        size="small"
                        color="error"
                        sx={{ 
                          ml: 'auto',
                          height: 20,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
        
        {/* Espacio adicional para separación */}
        <Box sx={{ flex: 1 }} />
        
        {/* Enlaces de ayuda y configuración */}
        {open && (
          <Box sx={{ mt: 3, px: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#64748b',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                display: 'block',
                mb: 1,
              }}
            >
              Soporte
            </Typography>
            
            <List sx={{ p: 0 }}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                  }}
                  onClick={() => navigate('/sitemap')}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: '#64748b' }}>
                    <HelpIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Mapa del Sitio"
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: '#374151',
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    borderRadius: '8px',
                    px: 2,
                    py: 1,
                  }}
                  onClick={handleMenuOpen}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: '#64748b' }}>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Configuración"
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: '#374151',
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}
      </Box>

      {/* Footer del Drawer */}
      <Box sx={{ 
        p: open ? 2 : 1.5,
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        bgcolor: '#f8fafc',
      }}>
        {open ? (
          <Stack spacing={1.5}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ 
                color: '#94a3b8',
                fontSize: '0.7rem',
                fontWeight: 500,
                display: 'block',
              }}>
                SICAG Comité v1.0
              </Typography>
              <Typography variant="caption" sx={{ 
                color: '#94a3b8',
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
                borderColor: 'rgba(0, 0, 0, 0.12)',
                color: '#64748b',
                fontWeight: 600,
                fontSize: '0.85rem',
                py: 1,
                '&:hover': {
                  borderColor: primaryColor,
                  color: primaryColor,
                  bgcolor: 'rgba(26, 35, 126, 0.04)',
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
                  color: '#64748b',
                  '&:hover': {
                    color: primaryColor,
                    bgcolor: 'rgba(26, 35, 126, 0.08)',
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            
            <Typography variant="caption" sx={{ 
              color: '#94a3b8',
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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* AppBar superior - Mejorado */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'white',
          color: '#1a237e',
          width: '100%',
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar sx={{ 
          minHeight: `${layoutConstants.appBarHeight}px`,
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
                color: '#1a237e',
                '&:hover': {
                  bgcolor: 'rgba(26, 35, 126, 0.08)',
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
            onClick={() => navigate('/committee/dashboard')}
            >
              <Box sx={{ 
                width: 32, 
                height: 32,
                bgcolor: primaryColor,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '1rem',
                  }}
                >
                  S
                </Typography>
              </Box>
              
              <Typography 
                variant="h6" 
                noWrap 
                sx={{ 
                  fontWeight: 700,
                  color: '#1a237e',
                  fontSize: '1.25rem',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                SICAG
              </Typography>
              
              <Chip 
                label="COMITÉ"
                size="small"
                sx={{ 
                  bgcolor: 'rgba(26, 35, 126, 0.1)',
                  color: primaryColor,
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
              bgcolor: 'rgba(26, 35, 126, 0.05)',
              borderRadius: '6px',
            }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 600,
                  color: '#4f46e5',
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
            <Tooltip title="Alertas y notificaciones">
              <IconButton
                color="inherit"
                component={Link}
                to="/committee/alerts"
                sx={{ 
                  color: '#64748b',
                  position: 'relative',
                  '&:hover': {
                    color: primaryColor,
                    bgcolor: 'rgba(26, 35, 126, 0.08)',
                  }
                }}
              >
                <Badge 
                  badgeContent={8} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.6rem',
                      height: 16,
                      minWidth: 16,
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
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
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
                      color: '#1e293b',
                      fontSize: '0.9rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {user?.name?.split(' ')[0] || 'Miembro'}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    noWrap
                    sx={{ 
                      color: '#64748b',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    Comité de Cumplimiento
                  </Typography>
                </Box>
                
                <Avatar 
                  sx={{ 
                    width: 36,
                    height: 36,
                    bgcolor: primaryColor,
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    border: '2px solid rgba(26, 35, 126, 0.1)',
                  }}
                >
                  {user?.name?.charAt(0) || 'C'}
                </Avatar>
                
                <ArrowDropDownIcon sx={{ color: '#64748b', fontSize: 20 }} />
              </Box>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Menú de perfil */}
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
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 48,
                height: 48,
                bgcolor: primaryColor,
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {user?.name?.charAt(0) || 'C'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1a237e' }}>
                {user?.name || 'Miembro Comité'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                Comité de Cumplimiento
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip 
              label={user?.region || 'Todas'}
              size="small"
              icon={<LocationIcon />}
              sx={{ 
                bgcolor: 'rgba(26, 35, 126, 0.1)',
                color: primaryColor,
                fontWeight: 600,
              }}
            />
            <Chip 
              label="Activo"
              size="small"
              color="success"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>
        
        <MenuItem 
          component={Link}
          to="/committee/profile"
          onClick={handleProfileMenuClose}
          sx={{ py: 1.5, px: 2 }}
        >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Mi Perfil"
            secondary="Información personal y preferencias"
          />
        </MenuItem>
        
        <MenuItem 
          component={Link}
          to="/sitemap"
          onClick={handleProfileMenuClose}
          sx={{ py: 1.5, px: 2 }}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Ayuda y Soporte"
            secondary="Documentación y contacto"
          />
        </MenuItem>
        
        <Divider />
        
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            py: 1.5, 
            px: 2,
            color: '#dc2626',
            '&:hover': {
              bgcolor: 'rgba(220, 38, 38, 0.04)',
            }
          }}
        >
          <ListItemIcon sx={{ color: '#dc2626' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Cerrar Sesión"
            primaryTypographyProps={{ fontWeight: 600 }}
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
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Preferencias" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notificaciones" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Configuración de correo" />
        </MenuItem>
      </Menu>

      {/* Drawer (Barra lateral) */}
      <Box
        component="nav"
        sx={{ 
          width: { 
            sm: open ? layoutConstants.drawerWidth : layoutConstants.collapsedDrawerWidth 
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
              width: layoutConstants.drawerWidth,
              boxSizing: 'border-box',
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
              boxSizing: 'border-box',
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
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
          mt: `${layoutConstants.appBarHeight}px`,
          width: { 
            xs: '100%',
            sm: open ? `calc(100% - ${layoutConstants.drawerWidth}px)` : `calc(100% - ${layoutConstants.collapsedDrawerWidth}px)`
          },
          ml: { xs: 0, sm: 'auto' },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          bgcolor: '#f8fafc',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default CommitteeLayout;