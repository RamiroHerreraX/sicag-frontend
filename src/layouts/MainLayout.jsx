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
  alpha,
  Menu,
  MenuItem,
  Tooltip,
  Chip,
  Stack
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
  ArrowDropDown as ArrowDropDownIcon,
  AssignmentTurnedIn as AuditIcon,
  Gavel as DeclaracionesIcon2,
  Help as HelpIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 200;
const collapsedDrawerWidth = 60;

// MISMOS COLORES que CommitteeLayout
const committeeTheme = {
  primary: '#1a237e', // Azul índigo oscuro del CommitteeLayout
  secondary: '#4f46e5', // Púrpura azulado para acentos
  sidebar: '#FFFFFF',
  active: 'rgba(26, 35, 126, 0.08)', // Color de fondo para item activo
  text: '#1e293b',
  icon: '#64748b',
  appBarBg: 'white',
  hoverBg: 'rgba(0, 0, 0, 0.04)',
  border: 'rgba(0, 0, 0, 0.08)',
  grayLight: '#f8fafc',
  grayMedium: '#94a3b8',
  darkBlue: '#1a237e'
};

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(!isMobile);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [settingsAnchorEl, setSettingsAnchorEl] = React.useState(null);

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

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleSettingsMenuOpen = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setSettingsAnchorEl(null);
  };

  // Función para verificar si la ruta está activa - IGUAL que CommitteeLayout
  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { text: 'DASHBOARD', icon: <DashboardIcon />, path: '/dashboard', description: 'Panel de control general' },
    { text: 'EXPEDIENTE', icon: <ExpedienteIcon />, path: '/expediente', description: 'Gestión de expedientes' },
    { text: 'CERTIFICADOS', icon: <CertificationsIcon />, path: '/certifications', description: 'Certificaciones y documentos' },
    { text: 'DECLARACIÓN', icon: <DeclaracionesIcon2 />, path: '/declaraciones', description: 'Declaraciones aduanales' },
    { text: 'AUDITORIA', icon: <AuditIcon />, path: '/audit-agent', description: 'Auditoría y cumplimiento' },
    { text: 'PERFIL', icon: <ProfileIcon />, path: '/profile', description: 'Mi perfil y configuración' },
    { text: 'MAPA DEL SITIO', icon: <SiteMapIcon />, path: '/sitemap', description: 'Navegación del sitio' },
  ];

  // drawerContent IDÉNTICO al CommitteeLayout en estructura y estilos
  const drawerContent = (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      bgcolor: committeeTheme.sidebar,
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
      borderRight: `1px solid ${committeeTheme.border}`,
    }}>
      {/* Header del Drawer - IGUAL que CommitteeLayout */}
      <Box sx={{ 
        p: open ? 3 : 2,
        borderBottom: `1px solid ${committeeTheme.border}`,
        bgcolor: committeeTheme.grayLight,
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
            bgcolor: committeeTheme.primary,
            fontSize: open ? '1.2rem' : '1rem',
            fontWeight: 'bold',
            border: `3px solid ${alpha(committeeTheme.primary, 0.1)}`,
          }}
        >
          {user?.name?.charAt(0) || 'U'}
        </Avatar>
        
        {open && (
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 700,
                color: committeeTheme.darkBlue,
                lineHeight: 1.2,
                fontSize: '1rem',
              }}
            >
              {user?.name?.split(' ')[0] || 'Usuario'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: committeeTheme.grayMedium,
                display: 'block',
                fontWeight: 500,
              }}
            >
              {user?.role === 'agente' ? 'Agente Aduanal' : 
               user?.role === 'profesionista' ? 'Profesionista' : 
               user?.role === 'empresario' ? 'Empresario' : 'Usuario'}
            </Typography>
          </Box>
        )}
        
        {open && (
          <Chip 
            label="SICAG"
            size="small"
            sx={{ 
              bgcolor: alpha(committeeTheme.primary, 0.1),
              color: committeeTheme.primary,
              fontWeight: 700,
              fontSize: '0.7rem',
              height: 20,
            }}
          />
        )}
      </Box>

      {/* Menú Principal - IGUAL que CommitteeLayout */}
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
            color: committeeTheme.grayMedium,
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            opacity: open ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          Funcionalidades
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
                      minHeight: 56,
                      borderRadius: '8px',
                      px: open ? 2 : 1.5,
                      py: 2,
                      mx: open ? 0 : 0.5,
                      '&.Mui-selected': {
                        bgcolor: alpha(committeeTheme.primary, 0.08),
                        borderLeft: `3px solid ${committeeTheme.secondary}`,
                        '&:hover': {
                          bgcolor: alpha(committeeTheme.primary, 0.12),
                        },
                        '& .MuiListItemIcon-root': {
                          color: committeeTheme.primary,
                        },
                        '& .MuiTypography-root': {
                          color: committeeTheme.primary,
                          fontWeight: 600,
                        }
                      },
                      '&:hover': {
                        bgcolor: committeeTheme.hoverBg,
                        transform: 'translateX(2px)',
                        transition: 'all 0.2s',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 40 : 'auto',
                        color: isActive ? committeeTheme.primary : committeeTheme.grayMedium,
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
                            color: isActive ? committeeTheme.primary : '#374151',
                            letterSpacing: '0.2px',
                          }
                        }}
                        secondaryTypographyProps={{
                          sx: {
                            fontSize: '0.75rem',
                            color: committeeTheme.grayMedium,
                            mt: 0.25,
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
        
        {/* Enlaces de ayuda y configuración - IGUAL que CommitteeLayout */}
        {open && (
          <Box sx={{ mt: 3, px: 2 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: committeeTheme.grayMedium,
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
                  <ListItemIcon sx={{ minWidth: 40, color: committeeTheme.grayMedium }}>
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
                  onClick={handleSettingsMenuOpen}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: committeeTheme.grayMedium }}>
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

      {/* Footer del Drawer - IGUAL que CommitteeLayout */}
      <Box sx={{ 
        p: open ? 2 : 1.5,
        borderTop: `1px solid ${committeeTheme.border}`,
        bgcolor: committeeTheme.grayLight,
      }}>
        {open ? (
          <Stack spacing={1.5}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" sx={{ 
                color: committeeTheme.grayMedium,
                fontSize: '0.7rem',
                fontWeight: 500,
                display: 'block',
              }}>
                SICAG v1.0
              </Typography>
              <Typography variant="caption" sx={{ 
                color: committeeTheme.grayMedium,
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
                borderColor: committeeTheme.border,
                color: committeeTheme.grayMedium,
                fontWeight: 600,
                fontSize: '0.85rem',
                py: 1,
                '&:hover': {
                  borderColor: committeeTheme.primary,
                  color: committeeTheme.primary,
                  bgcolor: alpha(committeeTheme.primary, 0.04),
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
                  color: committeeTheme.grayMedium,
                  '&:hover': {
                    color: committeeTheme.primary,
                    bgcolor: alpha(committeeTheme.primary, 0.08),
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            
            <Typography variant="caption" sx={{ 
              color: committeeTheme.grayMedium,
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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: committeeTheme.grayLight }}>
      {/* AppBar superior - IGUAL que CommitteeLayout */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: committeeTheme.appBarBg,
          color: committeeTheme.darkBlue,
          width: '100%',
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: `1px solid ${committeeTheme.border}`,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar sx={{ 
          minHeight: '64px',
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
                color: committeeTheme.darkBlue,
                '&:hover': {
                  bgcolor: alpha(committeeTheme.primary, 0.08),
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
            onClick={() => navigate('/dashboard')}
            >
              <Box sx={{ 
                width: 32, 
                height: 32,
                bgcolor: committeeTheme.primary,
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
                  color: committeeTheme.darkBlue,
                  fontSize: '1.25rem',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                SICAG
              </Typography>
              
              <Chip 
                label={user?.role === 'agente' ? 'AGENTE' : 
                       user?.role === 'profesionista' ? 'PROFESIONISTA' : 
                       user?.role === 'empresario' ? 'EMPRESARIO' : 'USUARIO'}
                size="small"
                sx={{ 
                  bgcolor: alpha(committeeTheme.primary, 0.1),
                  color: committeeTheme.primary,
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
              bgcolor: alpha(committeeTheme.primary, 0.05),
              borderRadius: '6px',
            }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 600,
                  color: committeeTheme.secondary,
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
            <Tooltip title="Notificaciones">
              <IconButton
                color="inherit"
                component={Link}
                to="/notifications"
                sx={{ 
                  color: committeeTheme.grayMedium,
                  '&:hover': {
                    color: committeeTheme.primary,
                    bgcolor: alpha(committeeTheme.primary, 0.08),
                  }
                }}
              >
                <Badge 
                  badgeContent={3} 
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
                    bgcolor: committeeTheme.hoverBg,
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
                      color: committeeTheme.text,
                      fontSize: '0.9rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {user?.name?.split(' ')[0] || 'Usuario'}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    noWrap
                    sx={{ 
                      color: committeeTheme.grayMedium,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    {user?.role === 'agente' ? 'Agente Aduanal' : 
                     user?.role === 'profesionista' ? 'Profesionista' : 
                     user?.role === 'empresario' ? 'Empresario' : 'Usuario'}
                  </Typography>
                </Box>
                
                <Avatar 
                  sx={{ 
                    width: 36,
                    height: 36,
                    bgcolor: committeeTheme.primary,
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    border: `2px solid ${alpha(committeeTheme.primary, 0.1)}`,
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
                
                <ArrowDropDownIcon sx={{ color: committeeTheme.grayMedium, fontSize: 20 }} />
              </Box>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Menú de perfil - IGUAL que CommitteeLayout */}
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
        <Box sx={{ p: 2, bgcolor: committeeTheme.grayLight, borderBottom: `1px solid ${committeeTheme.border}` }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 48,
                height: 48,
                bgcolor: committeeTheme.primary,
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: committeeTheme.darkBlue }}>
                {user?.name || 'Usuario'}
              </Typography>
              <Typography variant="caption" sx={{ color: committeeTheme.grayMedium, fontWeight: 500 }}>
                {user?.role === 'agente' ? 'Agente Aduanal' : 
                 user?.role === 'profesionista' ? 'Profesionista' : 
                 user?.role === 'empresario' ? 'Empresario' : 'Usuario'}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip 
              label={user?.region || 'Todas'}
              size="small"
              icon={<LocationIcon />}
              sx={{ 
                bgcolor: alpha(committeeTheme.primary, 0.1),
                color: committeeTheme.primary,
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
          to="/profile"
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

      {/* Menú de configuración - IGUAL que CommitteeLayout */}
      <Menu
        anchorEl={settingsAnchorEl}
        open={Boolean(settingsAnchorEl)}
        onClose={handleSettingsMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: '12px',
          }
        }}
      >
        <MenuItem onClick={handleSettingsMenuClose}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Preferencias" />
        </MenuItem>
        <MenuItem onClick={handleSettingsMenuClose}>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notificaciones" />
        </MenuItem>
        <MenuItem onClick={handleSettingsMenuClose}>
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
              width: open ? drawerWidth : collapsedDrawerWidth,
              boxSizing: 'border-box',
              borderRight: `1px solid ${committeeTheme.border}`,
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
          mt: '64px',
          width: { 
            xs: '100%',
            sm: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${collapsedDrawerWidth}px)`
          },
          ml: { xs: 0, sm: 'auto' },
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          bgcolor: committeeTheme.grayLight,
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;