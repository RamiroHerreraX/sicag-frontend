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
  Chip,
  Avatar,
  alpha
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  Folder as FolderIcon,
  Person as PersonIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Gavel as GavelIcon,
  Login as LoginIcon,
  LockReset as LockResetIcon,
  PrivacyTip as PrivacyTipIcon,
  AdminPanelSettings as AdminIcon,
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  Flag as FlagIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  AssignmentTurnedIn as AuditIcon,
  History as HistoryIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

// Paleta corporativa del UserManagement
const colors = {
  primary: {
    dark: '#0D2A4D',
    main: '#133B6B',
    light: '#3A6EA5'
  },
  secondary: {
    main: '#00A8A8',
    light: '#00C2D1',
    lighter: '#35D0FF'
  },
  accents: {
    blue: '#0099FF',
    purple: '#6C5CE7'
  },
  status: {
    success: '#00A8A8',
    warning: '#00C2D1',
    error: '#0099FF',
    info: '#3A6EA5'
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  },
  drawerBg: '#133B6B',
  appBarBg: 'linear-gradient(135deg, #133B6B 0%, #133B6B 100%)'
};

const SiteMap = () => {
  // Estadísticas del mapa
  const stats = [
    { label: 'Módulos', value: '8', color: colors.primary.main, icon: <DashboardIcon /> },
    { label: 'Rutas', value: '42', color: colors.status.success, icon: <TimelineIcon /> },
    { label: 'Roles', value: '3', color: colors.status.warning, icon: <GroupIcon /> },
    { label: 'Versión', value: '2.0', color: colors.accents.purple, icon: <InfoIcon /> },
  ];

  // Módulos por rol
  const modulesByRole = [
    {
      role: 'USUARIO',
      roleColor: colors.primary.main,
      roleIcon: <PersonIcon />,
      description: 'Agentes Aduanales y Usuarios',
      modules: [
        { name: 'Dashboard Personal', icon: <DashboardIcon />, path: '/dashboard' },
        { name: 'Expediente Digital', icon: <FolderIcon />, path: '/expediente' },
        { name: 'Mis Certificaciones', icon: <DescriptionIcon />, path: '/certifications' },
        { name: 'Declaraciones', icon: <AssignmentIcon />, path: '/declaraciones' },
        { name: 'Auditoría Personal', icon: <AuditIcon />, path: '/audit-agent' },
        { name: 'Mi Perfil', icon: <PersonIcon />, path: '/profile' },
      ]
    },
    {
      role: 'COMITÉ',
      roleColor: colors.status.warning,
      roleIcon: <GavelIcon />,
      description: 'Miembros del Comité de Cumplimiento',
      modules: [
        { name: 'Dashboard Comité', icon: <DashboardIcon />, path: '/committee/dashboard' },
        { name: 'Revisión de Certificaciones', icon: <AssignmentIcon />, path: '/committee/review' },
        { name: 'Validaciones Pendientes', icon: <InfoIcon />, path: '/committee/review/pending' },
        { name: 'Estadísticas', icon: <TimelineIcon />, path: '/committee/stats' },
        { name: 'Auditoría del Comité', icon: <AuditIcon />, path: '/committee/audit' },
      ]
    },
    {
      role: 'ADMINISTRADOR',
      roleColor: colors.status.success,
      roleIcon: <AdminIcon />,
      description: 'Administradores del Sistema',
      modules: [
        { name: 'Dashboard Admin', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { name: 'Gestión de Usuarios', icon: <GroupIcon />, path: '/admin/users' },
        { name: 'Configuración del Sistema', icon: <SettingsIcon />, path: '/admin/system-config' },
        { name: 'Reportes', icon: <AssignmentIcon />, path: '/admin/reports' },
        { name: 'Auditoría Global', icon: <HistoryIcon />, path: '/admin/audit' },
        { name: 'Regiones y Aduanas', icon: <LocationIcon />, path: '/admin/regions' },
      ]
    }
  ];

  // Módulos de autenticación (transversales)
  const authModules = [
    { name: 'Inicio de Sesión', path: '/login', icon: <LoginIcon /> },
    { name: 'Recuperación de Contraseña', path: '/forgot-password', icon: <LockResetIcon /> },
    { name: 'Cambio de Contraseña', path: '/password-change', icon: <LockResetIcon /> },
    { name: 'Acuerdo de Privacidad', path: '/privacy-agreement', icon: <PrivacyTipIcon /> },
  ];

  return (
    <Box sx={{ width: '100%', bgcolor: '#f5f7fa' }}>
      {/* Header con diseño del navbar */}
      <Paper 
        elevation={0}
        sx={{ 
          background: colors.appBarBg,
          color: 'white',
          borderRadius: 0,
          py: { xs: 3, sm: 4, md: 5 },
          mb: { xs: 3, sm: 4 },
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            zIndex: 0
          }
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          zIndex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexWrap: 'wrap', 
          gap: 2,
          width: '90%',
          maxWidth: '1600px',
          mx: 'auto',
          textAlign: 'center'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1.5, sm: 2, md: 3 }, 
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'center'
          }}>
            <Avatar 
              sx={{ 
                width: { xs: 56, sm: 64, md: 80 }, 
                height: { xs: 56, sm: 64, md: 80 }, 
                bgcolor: 'white',
                color: colors.primary.dark,
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: '3px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              V
            </Avatar>
            <Box>
              <Typography variant="h2" sx={{ 
                fontWeight: '800', 
                letterSpacing: 2, 
                mb: 1, 
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3.2rem' } 
              }}>
                MAPA DEL SITIO
              </Typography>
              <Typography variant="h6" sx={{ 
                opacity: 0.9, 
                fontWeight: 400, 
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' } 
              }}>
               VUGAA Ventanilla Única de Gestión de Agentes Aduanales
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Contenedor principal con ancho porcentual */}
      <Box sx={{ 
        width: '95%',
        maxWidth: '1800px',
        mx: 'auto', 
        px: { xs: 1, sm: 2, md: 3 }
      }}>
        {/* Estadísticas rápidas */}
        <Box sx={{ width: '100%', mb: { xs: 4, sm: 5, md: 6 } }}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr 1fr'
            },
            gap: { xs: 2, sm: 2.5, md: 3, lg: 4 },
            width: '100%'
          }}>
            {stats.map((stat, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: `${stat.color}30`,
                  background: `linear-gradient(135deg, ${alpha(stat.color, 0.05)} 0%, white 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 20px ${alpha(stat.color, 0.25)}`,
                    borderColor: stat.color
                  }
                }}
              >
                <Box>
                  <Typography variant="h2" sx={{ 
                    color: stat.color, 
                    fontWeight: '800', 
                    lineHeight: 1, 
                    fontSize: { xs: '2.2rem', sm: '2.5rem', md: '2.8rem', lg: '3.2rem' } 
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    color: colors.text.secondary, 
                    mt: 1, 
                    fontWeight: '500', 
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } 
                  }}>
                    {stat.label}
                  </Typography>
                </Box>
                <Avatar sx={{ 
                  bgcolor: alpha(stat.color, 0.1), 
                  color: stat.color, 
                  width: { xs: 48, sm: 56, md: 64 }, 
                  height: { xs: 48, sm: 56, md: 64 } 
                }}>
                  {React.cloneElement(stat.icon, { sx: { fontSize: { xs: 24, sm: 28, md: 32 } } })}
                </Avatar>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Módulos por Rol */}
        <Box sx={{ width: '100%', mb: { xs: 4, sm: 5, md: 6 } }}>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr 1fr'
            },
            gap: { xs: 2, sm: 2.5, md: 3, lg: 4 },
            width: '100%'
          }}>
            {modulesByRole.map((roleSection, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  border: '2px solid',
                  borderColor: `${roleSection.roleColor}30`,
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${alpha(roleSection.roleColor, 0.2)}`,
                    borderColor: roleSection.roleColor
                  }
                }}
              >
                {/* Header del rol */}
                <Box
                  sx={{
                    p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                    background: `linear-gradient(135deg, ${roleSection.roleColor} 0%, ${alpha(roleSection.roleColor, 0.8)} 100%)`,
                    color: 'white'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2, md: 2.5 } }}>
                    <Avatar sx={{ 
                      bgcolor: 'white', 
                      color: roleSection.roleColor, 
                      width: { xs: 48, sm: 52, md: 56, lg: 60 }, 
                      height: { xs: 48, sm: 52, md: 56, lg: 60 } 
                    }}>
                      {React.cloneElement(roleSection.roleIcon, { sx: { fontSize: { xs: 24, sm: 26, md: 28, lg: 30 } } })}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ 
                        fontWeight: '800', 
                        letterSpacing: 1, 
                        fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem', lg: '1.4rem' } 
                      }}>
                        {roleSection.role}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        opacity: 0.9, 
                        display: 'block', 
                        fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.85rem' } 
                      }}>
                        {roleSection.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Lista de módulos */}
                <Box sx={{ flex: 1, overflow: 'auto', maxHeight: { xs: 280, sm: 300, md: 320, lg: 350 } }}>
                  <Box sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
                    {roleSection.modules.map((module, idx) => (
                      <Box
                        key={idx}
                        component={Link}
                        to={module.path}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: { xs: 1.5, sm: 2 },
                          borderRadius: 1.5,
                          mb: { xs: 0.5, sm: 0.75, md: 1 },
                          textDecoration: 'none',
                          color: colors.text.primary,
                          py: { xs: 1, sm: 1.2, md: 1.5 },
                          px: { xs: 1.5, sm: 1.8, md: 2 },
                          '&:hover': {
                            bgcolor: alpha(roleSection.roleColor, 0.08),
                          }
                        }}
                      >
                        <Box sx={{ 
                          minWidth: { xs: 32, sm: 36, md: 40, lg: 44 }, 
                          color: roleSection.roleColor,
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          {React.cloneElement(module.icon, { sx: { fontSize: { xs: 18, sm: 20, md: 22 } } })}
                        </Box>
                        <Typography variant="body1" sx={{ 
                          fontWeight: '500',
                          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem', lg: '1rem' }
                        }}>
                          {module.name}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Footer con contador */}
                <Box sx={{ 
                  p: { xs: 1.5, sm: 2, md: 2.5 }, 
                  borderTop: `1px solid ${alpha(roleSection.roleColor, 0.2)}`,
                  bgcolor: alpha(roleSection.roleColor, 0.02)
                }}>
                  <Typography variant="body2" sx={{ 
                    color: roleSection.roleColor, 
                    fontWeight: '600',
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' }
                  }}>
                    {roleSection.modules.length} módulos disponibles
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Módulos de Autenticación - Ocupa 100% del ancho */}
        <Box sx={{ width: '100%', mb: { xs: 4, sm: 5, md: 6 } }}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              borderRadius: 3,
              border: '2px solid',
              borderColor: `${colors.primary.main}30`,
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 24px ${alpha(colors.primary.main, 0.2)}`,
                borderColor: colors.primary.main
              }
            }}
          >
            {/* Header de Autenticación */}
            <Box
              sx={{
                p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${alpha(colors.primary.main, 0.8)} 100%)`,
                color: 'white'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2, md: 2.5 } }}>
                <Avatar sx={{ 
                  bgcolor: 'white', 
                  color: colors.primary.main, 
                  width: { xs: 48, sm: 52, md: 56, lg: 60 }, 
                  height: { xs: 48, sm: 52, md: 56, lg: 60 } 
                }}>
                  <SecurityIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: '800', 
                    letterSpacing: 1, 
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem', lg: '1.4rem' } 
                  }}>
                    Autenticación y Seguridad
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    opacity: 0.9, 
                    display: 'block', 
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.85rem' } 
                  }}>
                    Módulos comunes para todos los roles
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Grid de módulos de autenticación - 4 columnas en desktop */}
            <Box sx={{ flex: 1, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr 1fr'
                },
                gap: { xs: 1.5, sm: 2, md: 2.5 }
              }}>
                {authModules.map((module, index) => (
                  <Card
                    key={index}
                    component={Link}
                    to={module.path}
                    sx={{
                      textDecoration: 'none',
                      border: '1px solid',
                      borderColor: `${colors.primary.main}20`,
                      transition: 'all 0.2s',
                      height: '100%',
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: colors.primary.main,
                        bgcolor: alpha(colors.primary.main, 0.02),
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${alpha(colors.primary.main, 0.1)}`
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      p: { xs: 1.5, sm: 2, md: 2.5 }, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: { xs: 1.5, sm: 2 },
                      flexDirection: 'row'
                    }}>
                      <Avatar sx={{ 
                        bgcolor: alpha(colors.primary.main, 0.1), 
                        color: colors.primary.main, 
                        width: { xs: 32, sm: 36, md: 40 }, 
                        height: { xs: 32, sm: 36, md: 40 } 
                      }}>
                        {module.icon}
                      </Avatar>
                      <Typography variant="body1" sx={{ 
                        fontWeight: '600', 
                        color: colors.text.primary, 
                        fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' } 
                      }}>
                        {module.name}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Footer con contador */}
            <Box sx={{ 
              p: { xs: 1.5, sm: 2, md: 2.5 }, 
              borderTop: `1px solid ${alpha(colors.primary.main, 0.2)}`,
              bgcolor: alpha(colors.primary.main, 0.02)
            }}>
              <Typography variant="body2" sx={{ 
                color: colors.primary.main, 
                fontWeight: '600',
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' }
              }}>
                {authModules.length} módulos disponibles
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Flujo del Sistema - Ocupa 100% del ancho */}
        <Box sx={{ width: '100%', mb: { xs: 4, sm: 5, md: 6 } }}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              borderRadius: 3,
              border: '2px solid',
              borderColor: `${colors.primary.dark}30`,
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 24px ${alpha(colors.primary.dark, 0.2)}`,
                borderColor: colors.primary.dark
              }
            }}
          >
            {/* Header de Flujo */}
            <Box
              sx={{
                p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
                background: `linear-gradient(135deg, ${colors.primary.dark} 0%, ${alpha(colors.primary.dark, 0.8)} 100%)`,
                color: 'white'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2, md: 2.5 } }}>
                <Avatar sx={{ 
                  bgcolor: 'white', 
                  color: colors.primary.dark, 
                  width: { xs: 48, sm: 52, md: 56, lg: 60 }, 
                  height: { xs: 48, sm: 52, md: 56, lg: 60 } 
                }}>
                  <TimelineIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: '800', 
                    letterSpacing: 1, 
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem', lg: '1.4rem' } 
                  }}>
                    Flujo del Sistema
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    opacity: 0.9, 
                    display: 'block', 
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.85rem' } 
                  }}>
                    Proceso completo de certificación y cumplimiento
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Grid de pasos del flujo - 6 columnas en desktop */}
            <Box sx={{ flex: 1, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr',
                  lg: '1fr 1fr 1fr 1fr 1fr 1fr'
                },
                gap: { xs: 1.5, sm: 2, md: 2.5 }
              }}>
                {[
                  { step: '01', text: 'Registro y Autenticación' },
                  { step: '02', text: 'Creación de Expediente' },
                  { step: '03', text: 'Carga de Certificaciones' },
                  { step: '04', text: 'Validación por Comité' },
                  { step: '05', text: 'Generación de Reportes' },
                  { step: '06', text: 'Asignación de Nivel' }
                ].map((item, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: { xs: 1.5, sm: 2, md: 2.5 },
                      bgcolor: alpha(colors.primary.dark, 0.03),
                      border: '1px solid',
                      borderColor: `${colors.primary.dark}20`,
                      borderRadius: 2,
                      textAlign: 'center',
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        borderColor: colors.primary.dark,
                        bgcolor: alpha(colors.primary.dark, 0.05)
                      }
                    }}
                  >
                    <Typography variant="h4" sx={{ 
                      fontWeight: '800', 
                      color: colors.primary.main, 
                      mb: 0.5, 
                      fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.6rem', lg: '1.8rem' } 
                    }}>
                      {item.step}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: colors.text.primary, 
                      fontWeight: '500', 
                      display: 'block',
                      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.85rem' }
                    }}>
                      {item.text}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>

            {/* Footer con contador */}
            <Box sx={{ 
              p: { xs: 1.5, sm: 2, md: 2.5 }, 
              borderTop: `1px solid ${alpha(colors.primary.dark, 0.2)}`,
              bgcolor: alpha(colors.primary.dark, 0.02)
            }}>
              <Typography variant="body2" sx={{ 
                color: colors.primary.dark, 
                fontWeight: '600',
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' }
              }}>
                6 pasos en el proceso
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Footer con información de contacto */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
            background: '#f8fafc',
            borderRadius: 3,
            border: '1px solid',
            borderColor: `${colors.primary.main}20`,
            width: '100%',
            mb: 4
          }}
        >
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr 1fr'
            },
            gap: { xs: 2, sm: 2 },
            alignItems: 'center',
            width: '100%'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
              <Avatar sx={{ 
                bgcolor: colors.primary.main, 
                color: 'white', 
                width: { xs: 36, sm: 40, md: 44 }, 
                height: { xs: 36, sm: 40, md: 44 }, 
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } 
              }}>
                V
              </Avatar>
              <Typography variant="body1" sx={{ 
                color: colors.text.secondary,
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem', lg: '1rem' }
              }}>
                © 2026 VUGGA - Todos los derechos reservados
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ 
                color: colors.primary.main, 
                fontWeight: '600',
                fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem', lg: '1.1rem' }
              }}>
                soporte@vugga.com
              </Typography>
              <Typography variant="body2" sx={{ 
                color: colors.text.secondary,
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem', lg: '0.95rem' }
              }}>
                +52 55 1234 5678
              </Typography>
            </Box>
            <Box sx={{ 
              textAlign: { xs: 'center', md: 'right' }
            }}>
              <Chip
                label="Versión 2.0.0"
                size="medium"
                sx={{
                  bgcolor: alpha(colors.primary.main, 0.1),
                  color: colors.primary.main,
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                  height: { xs: 24, sm: 26, md: 28 }
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SiteMap;