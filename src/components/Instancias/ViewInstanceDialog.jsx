// src/pages/superadmin/components/ViewInstanceDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Avatar,
  Chip,
  Box,
  Grid,
  Divider
} from "@mui/material";
import { Visibility as VisibilityIcon } from "@mui/icons-material";

// Colores institucionales
const institutionalColors = {
  primary: '#133B6B',      // Azul oscuro principal
  secondary: '#1a4c7a',    // Azul medio
  accent: '#e9e9e9',       // Color para acentos (gris claro)
  background: '#f8f9fa',   // Fondo claro
  lightBlue: 'rgba(19, 59, 107, 0.08)',  // Azul transparente para hover
  darkBlue: '#0D2A4D',     // Azul más oscuro
  textPrimary: '#2c3e50',  // Texto principal
  textSecondary: '#7f8c8d', // Texto secundario
  success: '#27ae60',      // Verde para éxito
  warning: '#f39c12',      // Naranja para advertencias
  error: '#e74c3c',        // Rojo para errores
  info: '#3498db',         // Azul para información
};

const ViewInstanceDialog = ({ open, onClose, instance }) => {

  if (!instance) return null;

  const estadoColor = {
    active: "success",
    inactive: "default",
    suspended: "error"
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          border: `1px solid ${institutionalColors.lightBlue}`,
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle sx={{ bgcolor: institutionalColors.background }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={instance.logoUrl}
            sx={{
              bgcolor: instance.colorPrimario || institutionalColors.primary,
              width: 50,
              height: 50
            }}
          >
            {instance.nombre?.charAt(0)}
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: institutionalColors.primary }}>
              {instance.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: institutionalColors.textSecondary }}>
              Código: {instance.codigo}
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: institutionalColors.lightBlue }}>
        <Stack spacing={3}>
          {/* Estado */}
          <Box>
            <Chip
              label={instance.estado || "active"}
              color={estadoColor[instance.estado] || "default"}
              variant="outlined"
            />
            <Chip
              label={instance.activa ? "Activa" : "Inactiva"}
              sx={{ 
                ml: 1,
                bgcolor: instance.activa ? `${institutionalColors.success}15` : `${institutionalColors.textSecondary}15`,
                color: instance.activa ? institutionalColors.success : institutionalColors.textSecondary,
              }}
            />
          </Box>

          {/* Descripción */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary, mb: 0.5 }}>
              Descripción
            </Typography>
            <Typography sx={{ color: institutionalColors.textPrimary }}>
              {instance.descripcion || "Sin descripción"}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: institutionalColors.lightBlue }} />

          {/* Información general */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary, mb: 0.5 }}>
                Administrador
              </Typography>
              <Typography sx={{ color: institutionalColors.textPrimary }}>
                {instance.adminNombre || "No asignado"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary, mb: 0.5 }}>
                Email Administrador
              </Typography>
              <Typography sx={{ color: institutionalColors.textPrimary }}>
                {instance.adminEmail || "No asignado"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary, mb: 0.5 }}>
                Fecha de creación
              </Typography>
              <Typography sx={{ color: institutionalColors.textPrimary }}>
                {instance.fechaCreacion
                  ? new Date(instance.fechaCreacion).toLocaleString()
                  : "No disponible"}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary, mb: 0.5 }}>
                Logo URL
              </Typography>
              <Typography sx={{ color: institutionalColors.textPrimary }}>
                {instance.logoUrl || "No asignado"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: institutionalColors.lightBlue }} />

          {/* Colores */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary, mb: 1.5 }}>
              Colores del Sistema
            </Typography>

            <Stack direction="row" spacing={2}>
              <Box>
                <Typography variant="caption" sx={{ color: institutionalColors.textSecondary }}>
                  Primario
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 20,
                    bgcolor: instance.colorPrimario || institutionalColors.primary,
                    borderRadius: 1,
                    border: `1px solid ${institutionalColors.lightBlue}`,
                  }}
                />
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: institutionalColors.textSecondary }}>
                  Secundario
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 20,
                    bgcolor: instance.colorSecundario || institutionalColors.secondary,
                    borderRadius: 1,
                    border: `1px solid ${institutionalColors.lightBlue}`,
                  }}
                />
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: institutionalColors.textSecondary }}>
                  Acento
                </Typography>
                <Box
                  sx={{
                    width: 40,
                    height: 20,
                    bgcolor: instance.colorAcento || institutionalColors.success,
                    borderRadius: 1,
                    border: `1px solid ${institutionalColors.lightBlue}`,
                  }}
                />
              </Box>
            </Stack>
          </Box>

          <Divider sx={{ borderColor: institutionalColors.lightBlue }} />

          {/* Estadísticas */}
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary, mb: 0.5 }}>
                Usuarios
              </Typography>
              <Typography variant="h6" sx={{ color: institutionalColors.primary }}>
                {instance.totalUsuarios || 0}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary, mb: 0.5 }}>
                Certificaciones
              </Typography>
              <Typography variant="h6" sx={{ color: institutionalColors.primary }}>
                {instance.totalCertificaciones || 0}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography variant="subtitle2" sx={{ color: institutionalColors.textSecondary, mb: 0.5 }}>
                Cursos
              </Typography>
              <Typography variant="h6" sx={{ color: institutionalColors.primary }}>
                {instance.totalCursos || 0}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: institutionalColors.background }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            bgcolor: institutionalColors.primary,
            '&:hover': {
              bgcolor: institutionalColors.secondary,
            }
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewInstanceDialog;