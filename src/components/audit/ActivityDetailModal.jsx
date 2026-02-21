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
  Divider,
  Avatar,
  Button,
  Stack,
  Grid,
} from "@mui/material";

import {
  History as HistoryIcon,
  Info as InfoIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  Fingerprint as FingerprintIcon,
  Computer as ComputerIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

/* helpers */

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

export default function ActivityDetailModal({ open, onClose, activity }) {
  if (!activity) return null;

  const severityColor = getSeverityColor(activity.severity);
  const roleColor = getRoleColor(activity.user.role);

  const Item = ({ icon, label, value }) => (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon}
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography fontWeight={500}>{value}</Typography>
      </Box>
    </Stack>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      {/* HEADER */}
      <DialogTitle sx={{ borderBottom: "1px solid #eee", bgcolor: "#fafafa" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            {getSeverityIcon(activity.severity)}

            <Box>
              <Typography fontWeight={700}>Detalles de la Actividad</Typography>

              <Typography variant="caption" color="text.secondary">
                Evento #{activity.id}
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={activity.severity}
            size="small"
            sx={{
              bgcolor: severityColor + "20",
              color: severityColor,
              fontWeight: 600,
            }}
          />
        </Stack>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent sx={{ py: 3 }}>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          {/* INFO ACCION */}
          <Typography fontWeight={700} mb={2}>
            Información de la Acción
          </Typography>

          {/* GRID EN COLUMNAS */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Item
                icon={<HistoryIcon fontSize="small" color="action" />}
                label="Fecha y Hora"
                value={activity.timestamp}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Item
                icon={<InfoIcon fontSize="small" color="action" />}
                label="Acción"
                value={activity.actionName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Item
                icon={<BusinessIcon fontSize="small" color="action" />}
                label="Instancia"
                value={activity.instanceName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Item
                icon={<DescriptionIcon fontSize="small" color="action" />}
                label="Entidad"
                value={activity.entity}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Item
                icon={<FingerprintIcon fontSize="small" color="action" />}
                label="ID Entidad"
                value={activity.entityId}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Item
                icon={<ComputerIcon fontSize="small" color="action" />}
                label="IP"
                value={activity.ip}
              />
            </Grid>
            <Typography fontWeight={700} mb={2}>
              Usuario
            </Typography>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: roleColor,
                fontWeight: 700,
                 fontSize: 14
              }}
            >
              {activity.user.avatar}
            </Avatar>

            <Box>
              <Typography fontWeight={700}>{activity.user.name}</Typography>

              <Chip
                label={activity.user.role}
                size="small"
                sx={{
                  bgcolor: roleColor + "20",
                  color: roleColor,
                  mt: 0.5,
                }}
              />

              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {activity.user.email}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                ID: USR-{activity.id}
              </Typography>
            </Box>
          </Grid>
 </Paper>
      </DialogContent>

      {/* FOOTER */}
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ borderRadius: 2, px: 4 }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
