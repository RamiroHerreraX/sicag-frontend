import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import { FiberNew as NewIcon } from "@mui/icons-material";

const CreateInstanceDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "primary.light",
              color: "primary.main",
              width: 40,
              height: 40,
            }}
          >
            <NewIcon />
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight={700}>
              Crear Nueva Instancia
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete la información para registrar una nueva instancia
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Nombre */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Nombre *
            </Typography>
            <TextField fullWidth size="small" />
          </Grid>

          {/* Código */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Código *
            </Typography>
            <TextField fullWidth size="small" />
          </Grid>

          {/* Estado */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Estado
            </Typography>
            <FormControl fullWidth size="small">
              <Select defaultValue="active">
                <MenuItem value="active">Activa</MenuItem>
                <MenuItem value="inactive">Inactiva</MenuItem>
                <MenuItem value="suspended">Suspendida</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Activa */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Activa
            </Typography>
            <FormControl fullWidth size="small">
              <Select defaultValue={true}>
                <MenuItem value={true}>Sí</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Color Primario */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Color Primario
            </Typography>
            <TextField
              type="color"
              fullWidth
              size="small"
              defaultValue="#1976d2"
            />
          </Grid>

          {/* Color Secundario */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Color Secundario
            </Typography>
            <TextField
              type="color"
              fullWidth
              size="small"
              defaultValue="#ff9800"
            />
          </Grid>

          {/* Color Acento */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Color Acento
            </Typography>
            <TextField
              type="color"
              fullWidth
              size="small"
              defaultValue="#4caf50"
            />
          </Grid>

          {/* Admin Nombre */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Nombre del Administrador
            </Typography>
            <TextField fullWidth size="small" />
          </Grid>

          {/* Admin Email */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Email del Administrador
            </Typography>
            <TextField fullWidth size="small" type="email" />
          </Grid>

          {/* Descripción */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Descripción
            </Typography>
            <TextField fullWidth multiline rows={3} size="small" />
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      {/* ACTIONS */}
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="text" sx={{ textTransform: "none" }}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            textTransform: "none",
            px: 3,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          Crear Instancia
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateInstanceDialog;
