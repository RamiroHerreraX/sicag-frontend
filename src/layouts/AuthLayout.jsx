// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { roleThemes } from '../theme';

const AuthLayout = () => {
  const theme = useTheme();
  const userTheme = roleThemes.user;

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
          <Typography variant="h2" sx={{ 
            color: userTheme.primary, 
            fontWeight: 'bold', 
            mb: 1,
            letterSpacing: '1px'
          }}>
            SICAG
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#7f8c8d',
            fontWeight: 500
          }}>
            LUIS RODRIGUEZ
          </Typography>
          <Typography variant="body1" sx={{ 
            color: '#7f8c8d', 
            mt: 2,
            fontSize: '0.95rem'
          }}>
            Sistema Integral de Consultoría y Asesoría Gerencial
          </Typography>
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;