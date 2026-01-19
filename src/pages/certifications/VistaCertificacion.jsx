import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Chip
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VistaCertificacion = () => {
  return (
    <Box
      sx={{
        width: '80%',
        p: 3
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}
      >
        CERTIFICACIÓN PATENTE ADUANAL
      </Typography>

      <Grid container spacing={3}>

        {/* ================= SECCIÓN IZQUIERDA ================= */}
        <Grid item xs={12} md={6}>
          {/* Apartado 1: CERTIFICACIÓN: PATENTE ADUANAL - Modificado como la imagen */}
          <Paper sx={{ p: 3, mb: 6 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                color: '#1a237e',
                fontSize: '1.1rem'
              }}
            >
              # ESTATUS
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 'bold', 
                  mr: 1,
                  color: '#333'
                }}
              >
                ESTATUS:
              </Typography>
              <Chip
                icon={<CheckCircleIcon />}
                label="VIGENTE"
                color="success"
                size="small"
                sx={{ fontWeight: 'bold' }}
              />
            </Box>

            {/* Fechas como en la imagen - ACOMODADAS BIEN */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666',
                  mb: 0.5
                }}
              >
                Fecha de Emisión:
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  backgroundColor: '#f8f9fa',
                  borderColor: '#e0e0e0',
                  mb: 2
                }}
              >
                <Typography sx={{ fontWeight: 'medium', color: '#333' }}>
                  11/01/2026
                </Typography>
              </Paper>
            </Box>

            <Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666',
                  mb: 0.5
                }}
              >
                Fecha vencimiento
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  backgroundColor: '#f8f9fa',
                  borderColor: '#e0e0e0'
                }}
              >
                <Typography sx={{ fontWeight: 'medium', color: '#333' }}>
                  11/01/2026
                </Typography>
              </Paper>
            </Box>

            {/* Se eliminaron los campos: Tipo de Certificación, Cifra arancelaria y Descripción */}
          </Paper>

          {/* Apartado 2: DETALLES DE LA CERTIFICACIÓN */}
          <Paper sx={{ p: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 3, 
                textAlign: 'center',
                color: '#1a237e'
              }}
            >
              DETALLES DE LA CERTIFICACIÓN
            </Typography>

            {/* Nuevo campo agregado: Número de Certificado */}
           

            {/* Tres campos adicionales de vista para detalles de certificación */}
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1, fontWeight: 500 }}>
                Tipo de Certificación
              </Typography>
              <TextField
                value="Patente Aduanal"
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1, fontWeight: 500 }}>
                Institución Emisora
              </Typography>
              <TextField
                value="Servicio de Administración Tributaria (SAT)"
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1, fontWeight: 500 }}>
                Ámbito de Validez
              </Typography>
              <TextField
                value="Nacional"
                fullWidth
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            {/* Cambios en las fechas: */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Fecha de expedición"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                  value="2026-01-11"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Fecha de vencimiento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                  value="2026-07-11"
                />
              </Grid>
            </Grid>

            {/* Nuevo campo agregado: Observaciones */}
            
          </Paper>
        </Grid>

        {/* ================= DOCUMENTO ================= */}
        <Grid item xs={12} md={9}>
          <Paper
            sx={{
              height: '100%',
              width:'420%',
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

export default VistaCertificacion;