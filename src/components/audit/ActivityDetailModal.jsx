// src/components/audit/ActivityDetailModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Chip,
  Paper,
  Grid,
  Divider,
  Avatar,
  Button,
  Stack
} from "@mui/material";

import {
  History as HistoryIcon,
  Info as InfoIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  Fingerprint as FingerprintIcon,
  Computer as ComputerIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from "@mui/icons-material";

/* =========================
   HELPERS
========================= */

const getSeverityColor = (severity) => {
  switch (severity) {
    case "success":
      return "#27ae60";
    case "info":
      return "#3498db";
    case "warning":
      return "#f39c12";
    case "error":
      return "#e74c3c";
    default:
      return "#7f8c8d";
  }
};

const getSeverityIcon = (severity) => {
  const color = getSeverityColor(severity);

  switch (severity) {
    case "success":
      return <CheckCircleIcon sx={{ color }} />;
    case "warning":
      return <WarningIcon sx={{ color }} />;
    case "error":
      return <ErrorIcon sx={{ color }} />;
    default:
      return <InfoIcon sx={{ color }} />;
  }
};

const getRoleColor = (role) => {
  switch (role) {
    case "admin":
      return "#1b5e20";
    case "comite":
      return "#1a237e";
    case "agente":
      return "#526F78";
    case "profesionista":
      return "#2ecc71";
    case "empresario":
      return "#ed6c02";
    default:
      return "#7f8c8d";
  }
};

/* =========================
   COMPONENT
========================= */

const ActivityDetailModal = ({ open, onClose, activity }) => {
  if (!activity) return null;

  const severityColor = getSeverityColor(activity.severity);
  const roleColor = getRoleColor(activity.user.role);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden"
        }
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          borderBottom: "1px solid #eee",
          bgcolor: "#fafafa",
          py: 2.5
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">

          <Stack direction="row" spacing={1.5} alignItems="center">

            {getSeverityIcon(activity.severity)}

            <Box>
              <Typography fontWeight="bold" fontSize={18}>
                Detalles de la Actividad
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Evento #{activity.id}
              </Typography>

            </Box>

          </Stack>

          <Chip
            label={activity.severity}
            size="small"
            sx={{
              bgcolor: `${severityColor}15`,
              color: severityColor,
              fontWeight: 600,
              textTransform: "capitalize"
            }}
          />

        </Stack>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent sx={{ py: 3 }}>

        <Grid container spacing={3}>

          {/* ACCION */}
          <Grid item xs={12}>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>

              <Typography fontWeight="bold" mb={2}>
                Información de la Acción
              </Typography>

              <Grid container spacing={2}>

                <Grid item xs={12} md={6}>

                  <Stack spacing={2}>

                    <Stack direction="row" spacing={1.5}>
                      <HistoryIcon fontSize="small" color="action" />
                      <Box>
                        <Typography variant="caption">Fecha y Hora</Typography>
                        <Typography fontWeight={500}>
                          {activity.timestamp}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1.5}>
                      <InfoIcon fontSize="small" color="action" />
                      <Box>
                        <Typography variant="caption">Acción</Typography>
                        <Typography fontWeight={500}>
                          {activity.actionName}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1.5}>
                      <BusinessIcon fontSize="small" color="action" />
                      <Box>
                        <Typography variant="caption">Instancia</Typography>
                        <Typography fontWeight={500}>
                          {activity.instanceName}
                        </Typography>
                      </Box>
                    </Stack>

                  </Stack>

                </Grid>

                <Grid item xs={12} md={6}>

                  <Stack spacing={2}>

                    <Stack direction="row" spacing={1.5}>
                      <DescriptionIcon fontSize="small" color="action" />
                      <Box>
                        <Typography variant="caption">Entidad</Typography>
                        <Typography fontWeight={500}>
                          {activity.entity}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1.5}>
                      <FingerprintIcon fontSize="small" color="action" />
                      <Box>
                        <Typography variant="caption">ID Entidad</Typography>
                        <Typography fontWeight={500}>
                          {activity.entityId}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1.5}>
                      <ComputerIcon fontSize="small" color="action" />
                      <Box>
                        <Typography variant="caption">IP</Typography>
                        <Typography fontWeight={500}>
                          {activity.ip}
                        </Typography>
                      </Box>
                    </Stack>

                  </Stack>

                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />

                  <Typography fontWeight="bold" mb={1}>
                    Detalles
                  </Typography>

                  <Typography color="text.secondary">
                    {activity.details}
                  </Typography>

                </Grid>

              </Grid>

            </Paper>

          </Grid>

          {/* USUARIO */}
          <Grid item xs={12} md={6}>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>

              <Typography fontWeight="bold" mb={2}>
                Usuario
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">

                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: roleColor,
                    fontWeight: "bold"
                  }}
                >
                  {activity.user.avatar}
                </Avatar>

                <Box>

                  <Typography fontWeight="bold">
                    {activity.user.name}
                  </Typography>

                  <Chip
                    label={activity.user.role}
                    size="small"
                    sx={{
                      bgcolor: `${roleColor}15`,
                      color: roleColor,
                      mt: 0.5
                    }}
                  />

                </Box>

              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>

                <Stack direction="row" spacing={1}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography>
                    {activity.user.email}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <FingerprintIcon fontSize="small" color="action" />
                  <Typography>
                    ID: USR-{activity.id}
                  </Typography>
                </Stack>

              </Stack>

            </Paper>

          </Grid>

          {/* METADATA */}
          <Grid item xs={12} md={6}>

            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>

              <Typography fontWeight="bold" mb={2}>
                Metadatos
              </Typography>

              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <Typography variant="caption">
                    Evento
                  </Typography>
                  <Typography fontWeight={500}>
                    EVT-{activity.id.toString().padStart(6, "0")}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption">
                    Versión
                  </Typography>
                  <Typography fontWeight={500}>
                    v2.1.0
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption">
                    Módulo
                  </Typography>
                  <Typography fontWeight={500}>
                    {activity.instanceName}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption">
                    Traza
                  </Typography>
                  <Typography fontWeight={500}>
                    #{activity.id}
                  </Typography>
                </Grid>

              </Grid>

            </Paper>

          </Grid>

        </Grid>

      </DialogContent>

      {/* FOOTER */}
      <DialogActions sx={{ borderTop: "1px solid #eee", p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ borderRadius: 2 }}
        >
          Cerrar
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default ActivityDetailModal;