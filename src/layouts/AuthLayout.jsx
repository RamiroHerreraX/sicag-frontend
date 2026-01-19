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
          
            
        </Box>
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;