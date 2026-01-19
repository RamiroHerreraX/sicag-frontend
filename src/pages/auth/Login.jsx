import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Card,
  CardContent
} from '@mui/material';
import { Lock as LockIcon, Email as EmailIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Por favor complete todos los campos');
      }

      // Simular login según tipo de usuario
      setTimeout(() => {
        const userData = login({ email, password });
        
        // Redirigir según rol
        switch(userData.role) {
          case 'comite':
            navigate('/committee/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/dashboard');
        }
      }, 1000);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    let demoEmail = '';
    switch(role) {
      case 'agente':
        demoEmail = 'agente@demo.com';
        break;
      case 'comite':
        demoEmail = 'comite@demo.com';
        break;
      case 'admin':
        demoEmail = 'admin@demo.com';
        break;
    }
    
    setEmail(demoEmail);
    setPassword('demo123');
    
    // Auto-submit after a short delay
    setTimeout(() => {
      const userData = login({ email: demoEmail, password: 'demo123' });
      switch(role) {
        case 'comite':
          navigate('/committee/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    }, 500);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          SICAG
        </Typography>
        <Typography variant="h6" sx={{ color: '#7f8c8d' }}>
          LUIS RODRIGUEZ
        </Typography>
        <Typography variant="body1" sx={{ color: '#7f8c8d', mt: 2 }}>
          Sistema Integral de Consultoría y Asesoría Gremial
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#2c3e50', mb: 3 }}>
          Iniciar Sesión
        </Typography>
        <Typography variant="body2" align="center" sx={{ color: '#7f8c8d', mb: 3 }}>
          Ingresa tus credenciales para acceder al sistema
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: '#7f8c8d' }} />,
              }}
            />
            
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: <LockIcon sx={{ mr: 1, color: '#7f8c8d' }} />,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </Stack>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#3498db' }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </Box>

        {/* Demo Login Buttons */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle2" align="center" sx={{ color: '#7f8c8d', mb: 2 }}>
            Acceso rápido para demostración:
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleDemoLogin('agente')}
              size="small"
            >
              Acceso Agente
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDemoLogin('comite')}
              size="small"
            >
              Acceso Comité
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => handleDemoLogin('admin')}
              size="small"
            >
              Acceso Admin
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
          © 2024 SICAG. Todos los derechos reservados.
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;