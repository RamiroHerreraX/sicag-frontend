// src/theme.js
import { createTheme } from '@mui/material/styles';

// Definimos los temas específicos por rol
export const roleThemes = {
  user: {
    name: 'Usuario',
    primary: '#526F78',
    secondary: '#6A8A94',
    accent: '#E8F4F8',
    sidebar: '#FFFFFF',
    active: '#E8F4F8',
    text: '#000000',
    icon: '#526F78'
  },
  admin: {
    name: 'Administrador',
    primary: '#1b5e20',
    secondary: '#2e7d32',
    accent: '#81c784',
    sidebar: '#FFFFFF',
    active: '#E8F4F8',
    text: '#000000',
    icon: '#1b5e20'
  },
  committee: {
    name: 'Comité',
    primary: '#1a237e',
    secondary: '#283593',
    accent: '#4fc3f7',
    sidebar: '#FFFFFF',
    active: '#E8F4F8',
    text: '#000000',
    icon: '#1a237e'
  }
};

// Constantes de layout compartidas
export const layoutConstants = {
  drawerWidth: 200,
  collapsedDrawerWidth: 60,
  appBarHeight: 64
};

// Tema principal de MUI (se mantiene igual con algunos ajustes)
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Verde agrícola (compatible con admin theme)
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF9800', // Naranja
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#fff',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    // Agregamos colores para los temas específicos
    user: {
      main: roleThemes.user.primary,
      light: '#6A8A94',
      dark: '#40545C',
    },
    admin: {
      main: roleThemes.admin.primary,
      light: '#2e7d32',
      dark: '#0d4720',
    },
    committee: {
      main: roleThemes.committee.primary,
      light: '#283593',
      dark: '#0d1b5e',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.75rem',
      letterSpacing: '0.5px',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.43,
    },
    caption: {
      fontSize: '0.7rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 6,
        },
        contained: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          '&:hover': {
            boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: '2px 4px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
        sizeSmall: {
          height: 20,
          fontSize: '0.7rem',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontSize: '0.6rem',
          height: '16px',
          minWidth: '16px',
        },
      },
    },
    // Estilos para los layouts específicos
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: 'inherit',
        },
      },
    },
  },
});

// Exportamos tanto el tema como las configuraciones
export default theme;