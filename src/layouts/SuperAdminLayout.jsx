// src/layouts/SuperAdminLayout.jsx
import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
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
} from "@mui/material";
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
  Domain as DomainIcon,
  Layers as LayersIcon,
  DataObject as DataObjectIcon,
  Hub as HubIcon,
  Cloud as CloudIcon,
  Backup as BackupIcon,
  CorporateFare as CorporateFareIcon,
  Apartment as ApartmentIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { roleThemes, layoutConstants } from "../theme";

const SuperAdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  // COLORES AZULES PROFESIONALES (reemplazando el morado)
  const superAdminTheme = roleThemes.superadmin || {
    primary: "#1976d2", // Azul primario profesional
    secondary: "#2196f3",
    sidebar: "#f8fafc",
    active: "#1565c0",
    text: "#1e293b",
    icon: "#1976d2",
  };

  const primaryColor = superAdminTheme.primary;
  const sidebarColor = superAdminTheme.sidebar;
  const activeColor = superAdminTheme.active;
  const textColor = superAdminTheme.text;
  const iconColor = superAdminTheme.icon;

  // MENÚ PRINCIPAL para Super Administrador - Solo acceso multi-sistema
  const menuItems = [
    {
      text: "DASHBOARD",
      icon: <DashboardIcon />,
      path: "/supera/dashboard",
      description: "Panel de control multi-sistema",
      badge: 0,
    },
    {
      text: "INSTANCIAS",
      icon: <LayersIcon />,
      path: "/supera/instancias",
      description: "Gestión de áreas y sistemas",
      badge: 2, // Instancias nuevas
      highlight: true,
    },
    {
      text: "USUARIOS",
      icon: <UsersIcon />,
      path: "/supera/users",
      description: "Gestión de usuarios y roles",
      badge: 3, // Usuarios pendientes de revisión
    },
    {
      text: "EXPEDIENTES",
      icon: <ExpedienteIcon />,
      path: "/supera/expediente-config",
      description: "Configuración de expedientes",
      badge: 0,
    },
    {
      text: "REPORTES",
      icon: <ReportsIcon />,
      path: "/supera/reports",
      description: "Reportes y estadísticas",
      badge: 5, // Reportes nuevos
    },
    {
      text: "AUDITORÍA",
      icon: <HistoryIcon />,
      path: "/supera/audit",
      description: "Registro de todas las instancias",
      badge: 0,
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
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
    return location.pathname.startsWith(path);
  };

  // Contenido del drawer mejorado para Super Admin
  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#ffffff",
        boxShadow: "0px 4px 20px rgba(25, 118, 210, 0.1)",
        borderRight: "1px solid rgba(25, 118, 210, 0.08)",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      {/* Header del Drawer */}
      <Box
        sx={{
          p: open ? 3 : 2,
          borderBottom: "1px solid rgba(25, 118, 210, 0.08)",
          bgcolor: "#f8fafc",
          display: "flex",
          flexDirection: open ? "row" : "column",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          gap: open ? 2 : 0,
          minHeight: 80,
        }}
      >
        <Avatar
          sx={{
            width: open ? 48 : 40,
            height: open ? 48 : 40,
            bgcolor: primaryColor,
            fontSize: open ? "1.2rem" : "1rem",
            fontWeight: "bold",
            border: "3px solid rgba(25, 118, 210, 0.2)",
          }}
        >
          SA
        </Avatar>

        {open && (
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                color: primaryColor,
                lineHeight: 1.2,
                fontSize: "1rem",
              }}
            >
              {user?.name?.split(" ")[0] || "Supera"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#1565c0",
                display: "block",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            >
              Super Administrador
            </Typography>
          </Box>
        )}

        {open && (
          <Chip
            label="SUPERA"
            size="small"
            sx={{
              bgcolor: "rgba(25, 118, 210, 0.15)",
              color: primaryColor,
              fontWeight: 800,
              fontSize: "0.7rem",
              height: 22,
              border: "1px solid rgba(25, 118, 210, 0.3)",
            }}
          />
        )}
      </Box>

      {/* Menú Principal */}
      <Box
        sx={{
          flex: 1,
          p: open ? 2 : 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 1,
            color: primaryColor,
            fontWeight: 800,
            fontSize: "0.7rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
            opacity: open ? 1 : 0,
            transition: "opacity 0.2s",
            bgcolor: "rgba(25, 118, 210, 0.05)",
            borderRadius: "4px",
            mt: 1,
          }}
        >
          Gestión Multi-Sistema
        </Typography>

        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const isActive = isActivePath(item.path);
            const isHighlight = item.highlight;

            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  mb: 0.5,
                  "&:last-child": { mb: 0 },
                }}
              >
                <Tooltip
                  title={!open ? `${item.text} - ${item.description}` : ""}
                  placement="right"
                  arrow
                >
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={isActive}
                    sx={{
                      minHeight: 48,
                      borderRadius: "8px",
                      px: open ? 2 : 1.5,
                      py: 1.5,
                      mx: open ? 0 : 0.5,
                      borderLeft: isHighlight ? "3px solid #1976d2" : "none",
                      background: isHighlight
                        ? "linear-gradient(90deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)"
                        : "transparent",
                      "&.Mui-selected": {
                        bgcolor: "rgba(25, 118, 210, 0.1)",
                        borderLeft: `3px solid ${primaryColor}`,
                        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.1)",
                        "&:hover": {
                          bgcolor: "rgba(25, 118, 210, 0.15)",
                        },
                        "& .MuiListItemIcon-root": {
                          color: primaryColor,
                        },
                        "& .MuiTypography-root": {
                          color: primaryColor,
                          fontWeight: 700,
                        },
                      },
                      "&:hover": {
                        bgcolor: "rgba(25, 118, 210, 0.05)",
                        transform: "translateX(3px)",
                        transition: "all 0.2s",
                        boxShadow: "0 2px 4px rgba(25, 118, 210, 0.1)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 40 : "auto",
                        color: isActive ? primaryColor : "#1565c0",
                        justifyContent: "center",
                        mr: open ? 2 : 0,
                      }}
                    >
                      {item.badge > 0 ? (
                        <Badge
                          badgeContent={item.badge}
                          color="primary"
                          size="small"
                          sx={{
                            "& .MuiBadge-badge": {
                              fontSize: "0.6rem",
                              height: 16,
                              minWidth: 16,
                              bgcolor: primaryColor,
                            },
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
                            fontSize: "0.85rem",
                            fontWeight: isActive ? 700 : 600,
                            color: isActive ? primaryColor : "#0d47a1",
                            letterSpacing: "0.1px",
                          },
                        }}
                        secondaryTypographyProps={{
                          sx: {
                            fontSize: "0.75rem",
                            color: isActive ? "#1e293b" : "#64b5f6",
                            mt: 0.25,
                          },
                        }}
                      />
                    )}

                    {open && item.badge > 0 && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          ml: "auto",
                          height: 20,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          bgcolor: primaryColor,
                          color: "white",
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

        {/* Información del sistema */}
        {open && (
          <Box sx={{ mt: 3, px: 2 }}>
            <Divider sx={{ mb: 2, borderColor: "rgba(25, 118, 210, 0.1)" }} />
            <Typography
              variant="caption"
              sx={{
                color: primaryColor,
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                display: "block",
                mb: 1,
              }}
            >
              Sistema
            </Typography>

            <List sx={{ p: 0 }}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    borderRadius: "8px",
                    px: 2,
                    py: 1,
                  }}
                  onClick={() => navigate("/sitemap")}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "#1565c0" }}>
                    <HelpIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Documentación"
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: "#0d47a1",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    minHeight: 40,
                    borderRadius: "8px",
                    px: 2,
                    py: 1,
                  }}
                  onClick={handleMenuOpen}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "#1565c0" }}>
                    <ConfigIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Configuración"
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        color: "#0d47a1",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}
      </Box>

      {/* Footer del Drawer */}
      <Box
        sx={{
          p: open ? 2 : 1.5,
          borderTop: "1px solid rgba(25, 118, 210, 0.08)",
          bgcolor: "#f8fafc",
        }}
      >
        {open ? (
          <Stack spacing={1.5}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#1565c0",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  display: "block",
                }}
              >
                SICAG Multi-System v1.0
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#64b5f6",
                  fontSize: "0.65rem",
                  display: "block",
                }}
              >
                {user?.region ? `Región: ${user.region}` : "Todas las regiones"}
              </Typography>
              <Chip
                label="5 instancias activas"
                size="small"
                variant="outlined"
                sx={{
                  mt: 1,
                  fontSize: "0.65rem",
                  borderColor: "rgba(25, 118, 210, 0.3)",
                  color: "#1565c0",
                }}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                bgcolor: primaryColor,
                fontWeight: 700,
                fontSize: "0.85rem",
                py: 1,
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  bgcolor: "#1565c0",
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
                },
              }}
            >
              Cerrar Sesión
            </Button>
          </Stack>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Tooltip title="Cerrar sesión" placement="right">
              <IconButton
                onClick={handleLogout}
                size="small"
                sx={{
                  color: primaryColor,
                  bgcolor: "rgba(25, 118, 210, 0.1)",
                  "&:hover": {
                    color: "white",
                    bgcolor: primaryColor,
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>

            <Typography
              variant="caption"
              sx={{
                color: "#64b5f6",
                fontSize: "0.6rem",
                fontWeight: 600,
              }}
            >
              v1.0
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* AppBar superior - Super Admin */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "white",
          color: primaryColor,
          width: "100%",
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: "1px solid rgba(25, 118, 210, 0.08)",
          boxShadow: "0px 2px 10px rgba(25, 118, 210, 0.05)",
          background: "linear-gradient(90deg, #ffffff 0%, #f8fafc 100%)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: `${layoutConstants.appBarHeight}px`,
            px: { xs: 2, sm: 3 },
          }}
        >
          {/* Lado izquierdo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              gap: 2,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="toggle drawer"
              onClick={
                isMobile ? handleDrawerToggle : handleDesktopDrawerToggle
              }
              edge="start"
              sx={{
                color: primaryColor,
                "&:hover": {
                  bgcolor: "rgba(25, 118, 210, 0.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo y título */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
              onClick={() => navigate("/supera/dashboard")}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: primaryColor,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "white",
                    fontWeight: 900,
                    fontSize: "1.2rem",
                  }}
                >
                  SA
                </Typography>
              </Box>

              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 800,
                  color: primaryColor,
                  fontSize: "1.4rem",
                  display: { xs: "none", sm: "block" },
                }}
              >
                SICAG
              </Typography>

              <Chip
                label="SUPERA"
                size="small"
                sx={{
                  bgcolor: "rgba(25, 118, 210, 0.15)",
                  color: primaryColor,
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  height: 24,
                  display: { xs: "none", md: "flex" },
                  border: "1px solid rgba(25, 118, 210, 0.3)",
                }}
              />
            </Box>

            {/* Indicador de ruta actual */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                ml: 3,
                px: 2,
                py: 0.5,
                bgcolor: "rgba(25, 118, 210, 0.08)",
                borderRadius: "8px",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: primaryColor,
                  fontSize: "0.8rem",
                }}
              >
                {menuItems.find((item) => isActivePath(item.path))?.text ||
                  "Dashboard"}
              </Typography>
            </Box>
          </Box>

          {/* Lado derecho */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Botón de notificaciones globales */}
            <Tooltip title="Alertas globales">
              <IconButton
                color="inherit"
                sx={{
                  color: primaryColor,
                  position: "relative",
                  "&:hover": {
                    color: "#1565c0",
                    bgcolor: "rgba(25, 118, 210, 0.1)",
                  },
                }}
              >
                <Badge
                  badgeContent={12}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.6rem",
                      height: 18,
                      minWidth: 18,
                      bgcolor: primaryColor,
                    },
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
                alignSelf: "center",
                mx: 1,
                borderColor: "rgba(25, 118, 210, 0.2)",
              }}
            />

            {/* Perfil del Super Admin */}
            <Tooltip title="Mi perfil de Supera">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1,
                  borderRadius: "8px",
                  cursor: "pointer",
                  bgcolor: "rgba(25, 118, 210, 0.05)",
                  "&:hover": {
                    bgcolor: "rgba(25, 118, 210, 0.1)",
                  },
                }}
                onClick={handleProfileMenuOpen}
              >
                <Box
                  sx={{
                    textAlign: "right",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{
                      fontWeight: 700,
                      color: primaryColor,
                      fontSize: "0.9rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {user?.name?.split(" ")[0] || "Supera"}
                  </Typography>
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      color: "#1565c0",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    Super Administrador
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: primaryColor,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    border: "2px solid rgba(25, 118, 210, 0.3)",
                    boxShadow: "0 2px 4px rgba(25, 118, 210, 0.2)",
                  }}
                >
                  {user?.name?.charAt(0) || "S"}
                </Avatar>

                <ArrowDropDownIcon sx={{ color: primaryColor, fontSize: 20 }} />
              </Box>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Menú de perfil - Super Admin */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 300,
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(25, 118, 210, 0.1)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: "#f8fafc",
            borderBottom: "1px solid rgba(25, 118, 210, 0.08)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: primaryColor,
                fontSize: "1.4rem",
                fontWeight: "bold",
                border: "3px solid rgba(25, 118, 210, 0.2)",
              }}
            >
              {user?.name?.charAt(0) || "S"}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: primaryColor,
                }}
              >
                {user?.name || "Super Administrador"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "#1565c0", fontWeight: 600 }}
              >
                Acceso Multi-Sistema
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label={user?.region || "Todas las regiones"}
              size="small"
              icon={<LocationIcon />}
              sx={{
                bgcolor: "rgba(25, 118, 210, 0.1)",
                color: primaryColor,
                fontWeight: 700,
                mb: 0.5,
              }}
            />
            <Chip
              label="Supera"
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 700, mb: 0.5 }}
            />
            <Chip
              label="5 instancias"
              size="small"
              sx={{
                bgcolor: "rgba(25, 118, 210, 0.1)",
                color: primaryColor,
                fontWeight: 700,
                mb: 0.5,
              }}
            />
          </Stack>
        </Box>

        <MenuItem onClick={handleProfileMenuClose} sx={{ py: 1.5, px: 2 }}>
          <ListItemIcon sx={{ color: primaryColor }}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary="Mi Perfil"
            secondary="Perfil de Super Administrador"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </MenuItem>

        <MenuItem
          component={Link}
          to="/supera/instancias"
          onClick={handleProfileMenuClose}
          sx={{ py: 1.5, px: 2 }}
        >
          <ListItemIcon sx={{ color: primaryColor }}>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="Gestión de Instancias"
            secondary="Administrar todas las áreas"
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </MenuItem>

        <MenuItem
          component={Link}
          to="/sitemap"
          onClick={handleProfileMenuClose}
          sx={{ py: 1.5, px: 2 }}
        >
          <ListItemIcon sx={{ color: primaryColor }}>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText
            primary="Documentación"
            secondary="Guías y soporte técnico"
          />
        </MenuItem>

        <Divider sx={{ borderColor: "rgba(25, 118, 210, 0.1)" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.5,
            px: 2,
            color: "#d32f2f",
            "&:hover": {
              bgcolor: "rgba(211, 47, 47, 0.04)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#d32f2f" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Cerrar Sesión"
            primaryTypographyProps={{ fontWeight: 700 }}
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
            borderRadius: "12px",
            border: "1px solid rgba(25, 118, 210, 0.1)",
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon sx={{ color: primaryColor }}>
            <ConfigIcon />
          </ListItemIcon>
          <ListItemText primary="Preferencias" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon sx={{ color: primaryColor }}>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notificaciones" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon sx={{ color: primaryColor }}>
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
            sm: open
              ? layoutConstants.drawerWidth
              : layoutConstants.collapsedDrawerWidth,
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: layoutConstants.drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Drawer permanente para desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: open
                ? layoutConstants.drawerWidth
                : layoutConstants.collapsedDrawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid rgba(25, 118, 210, 0.08)",
              transition: theme.transitions.create("width", {
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
            xs: "100%",
            sm: open
              ? `calc(100% - ${layoutConstants.drawerWidth}px)`
              : `calc(100% - ${layoutConstants.collapsedDrawerWidth}px)`,
          },
          ml: { xs: 0, sm: "auto" },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          bgcolor: "#f8fafc",
          minHeight: "calc(100vh - 64px)",
          background:
            "radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.03) 0%, transparent 50%)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SuperAdminLayout;
