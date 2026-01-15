import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f7fa',
        padding: 2
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            SICAG
          </Typography>
          <Typography variant="h6" sx={{ color: '#7f8c8d' }}>
            LUIS RODRIGUEZ
          </Typography>
          <Typography variant="body1" sx={{ color: '#7f8c8d', mt: 2 }}>
            Sistema Integral de Consultoría y Asesoría Gerencial
          </Typography>
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;