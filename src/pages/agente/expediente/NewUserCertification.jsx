import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const NuevaCertificacion = () => {
  return (
    <Box
      sx={{
        width: '80%',     // 🔑 CLAVE: sin maxWidth
        p: 3
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}
      >
        Modificar Certificación
      </Typography>

      <Grid container spacing={3}>

        {/* ================= FORMULARIO ================= */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3 }}>
            <TextField
              label="Tipo de Certificación"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Cifra arancelaria"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Descripción"
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 3 }}
            />

            <Typography sx={{ mb: 1, fontWeight: 500 }}>
              Cargar Certificado
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<UploadFileIcon />}
              sx={{ mb: 3 }}
            >
              SELECCIONAR ARCHIVO
            </Button>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Fecha emisión"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Fecha vencimiento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* ================= DOCUMENTO ================= */}
        <Grid item xs={12} md={9}>
          <Paper
            sx={{
              height: '100%',
              width:'280%',
              minHeight: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f2f2f2',
              border: '2px dashed #c0c0c0'
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: '#666', fontWeight: 600 }}
            >
              DOCUMENTO
            </Typography>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default NuevaCertificacion;
