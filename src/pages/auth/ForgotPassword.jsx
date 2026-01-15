import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Email as EmailIcon } from '@mui/icons-material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envío de correo
    setTimeout(() => {
      setMessage(`Se han enviado instrucciones de restablecimiento a ${email}`);
      setLoading(false);
    }, 1500);
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
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#2c3e50', mb: 2 }}>
          ¿Olvidaste tu Contraseña?
        </Typography>
        
        <Typography variant="body1" align="center" sx={{ color: '#7f8c8d', mb: 4 }}>
          Ingresa tu correo electrónico para recibir instrucciones de restablecimiento.
        </Typography>

        {message && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: <EmailIcon sx={{ mr: 1, color: '#7f8c8d' }} />,
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
              {loading ? 'Enviando...' : 'Solicitar Restablecimiento'}
            </Button>
          </Stack>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            component={Link}
            to="/login"
            startIcon={<ArrowBackIcon />}
            sx={{ color: '#3498db' }}
          >
            Volver al inicio de sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;