import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Lock as LockIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const PasswordChange = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const requirements = [
    { id: 'length', text: 'Mínimo 8 caracteres', met: false },
    { id: 'uppercase', text: 'Al menos una mayúscula', met: false },
    { id: 'number', text: 'Al menos un número', met: false },
    { id: 'special', text: 'Al menos un carácter especial', met: false }
  ];

  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    const updatedRequirements = [...requirements];

    // Longitud mínima
    if (password.length >= 8) {
      strength += 25;
      updatedRequirements[0].met = true;
    } else {
      updatedRequirements[0].met = false;
    }

    // Contiene mayúsculas
    if (/[A-Z]/.test(password)) {
      strength += 25;
      updatedRequirements[1].met = true;
    } else {
      updatedRequirements[1].met = false;
    }

    // Contiene números
    if (/[0-9]/.test(password)) {
      strength += 25;
      updatedRequirements[2].met = true;
    } else {
      updatedRequirements[2].met = false;
    }

    // Contiene caracteres especiales
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      strength += 25;
      updatedRequirements[3].met = true;
    } else {
      updatedRequirements[3].met = false;
    }

    setPasswordStrength(strength);
    return updatedRequirements;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      evaluatePasswordStrength(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validaciones
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    const updatedRequirements = evaluatePasswordStrength(formData.newPassword);
    const allRequirementsMet = updatedRequirements.every(req => req.met);

    if (!allRequirementsMet) {
      setMessage('La contraseña no cumple con todos los requisitos de seguridad');
      setLoading(false);
      return;
    }

    // Simular cambio de contraseña
    setTimeout(() => {
      setMessage('success');
      setLoading(false);
      
      // Redirigir después de éxito
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 1500);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return '#e74c3c';
    if (passwordStrength < 80) return '#f39c12';
    return '#27ae60';
  };

  const getStrengthText = () => {
    if (passwordStrength < 40) return 'Débil';
    if (passwordStrength < 80) return 'Moderada';
    return 'Fuerte';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          SICAG
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#2c3e50', mb: 2 }}>
          Cambio de Contraseña Obligatorio
        </Typography>
        
        <Alert severity="warning" sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Por políticas de seguridad, debes cambiar tu contraseña para continuar.
          </Typography>
          <Typography variant="body2">
            Por favor, establece una nueva contraseña segura para tu cuenta.
          </Typography>
        </Alert>

        {message === 'success' ? (
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body1">
              ¡Contraseña cambiada exitosamente! Redirigiendo al dashboard...
            </Typography>
          </Alert>
        ) : message && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="currentPassword"
                label="Contraseña Actual"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: '#7f8c8d' }} />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="newPassword"
                label="Nueva Contraseña"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: '#7f8c8d' }} />,
                }}
              />
              
              {formData.newPassword && (
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Seguridad:
                    </Typography>
                    <Typography variant="body2" sx={{ color: getStrengthColor(), fontWeight: 'bold' }}>
                      {getStrengthText()}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={passwordStrength} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getStrengthColor()
                      }
                    }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirmar Nueva Contraseña"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: '#7f8c8d' }} />,
                }}
                error={formData.confirmPassword && formData.newPassword !== formData.confirmPassword}
                helperText={formData.confirmPassword && formData.newPassword !== formData.confirmPassword ? 'Las contraseñas no coinciden' : ''}
              />
            </Grid>

            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    Requisitos de la contraseña:
                  </Typography>
                  <List dense>
                    {evaluatePasswordStrength(formData.newPassword).map((req, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {req.met ? (
                            <CheckIcon sx={{ color: '#27ae60' }} />
                          ) : (
                            <CloseIcon sx={{ color: '#e74c3c' }} />
                          )}
                        </ListItemIcon>
                        <ListItemText 
                          primary={req.text}
                          sx={{ 
                            color: req.met ? '#27ae60' : '#e74c3c',
                            textDecoration: req.met ? 'none' : 'none'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
                <Button
                  component={Link}
                  to="/login"
                  startIcon={<ArrowBackIcon />}
                  variant="outlined"
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Volver al inicio de sesión
                </Button>
                
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 200 }}
                >
                  {loading ? 'Cambiando contraseña...' : 'Cambiar Contraseña'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#7f8c8d', fontStyle: 'italic' }}>
            LUIS RODRIGUEZ
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PasswordChange;