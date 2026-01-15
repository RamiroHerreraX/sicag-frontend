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
  Badge
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Gavel as ReviewIcon,
  Description as CertificationsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 280;

const CommitteeLayout = () => {
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
    { text: 'DASHBOARD COMITÉ', icon: <DashboardIcon />, path: '/committee/dashboard' },
    { text: 'REVISIÓN', icon: <ReviewIcon />, path: '/committee/review', badge: 5 },
    { text: 'ALERTAS', icon: <NotificationsIcon />, path: '/committee/alerts', badge: 3 },
  ];

  const drawer = (
    <Box sx={{ bgcolor: '#1a237e', color: 'white', height: '100%' }}>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #283593' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          SICAG
        </Typography>
        <Typography variant="caption" sx={{ color: '#bdc3c7' }}>
          Módulo del Comité
        </Typography>
      </Box>
      
      <Box sx={{ p: 2, mt: 2 }}>
        <Typography variant="overline" sx={{ color: '#bdc3c7', pl: 2 }}>
          FUNCIONALIDADES COMITÉ
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
                bgcolor: location.pathname === item.path ? '#283593' : 'transparent',
                borderLeft: location.pathname === item.path ? '4px solid #4fc3f7' : '4px solid transparent',
                '&:hover': {
                  bgcolor: '#283593',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="error">
                    {item.icon}
                  </Badge>
                ) : item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
      
      <Box sx={{ p: 3, mt: 'auto', borderTop: '1px solid #283593' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: '#4fc3f7', width: 56, height: 56, fontSize: '1.2rem' }}>
            {user?.avatar || 'C'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {user?.name || 'Miembro Comité'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#bdc3c7' }}>
              Comité de Cumplimiento
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
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: '#1a237e',
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
            Comité de Cumplimiento
          </Typography>
        </Toolbar>
      </AppBar>

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

export default CommitteeLayout;