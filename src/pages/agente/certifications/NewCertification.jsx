import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  MenuItem,
  InputAdornment,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Upload as UploadIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const NewCertification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo: '',
    descripcion: '',
    fechaEmision: '',
    fechaVencimiento: ''
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const tiposCertificacion = [
    'Patente Aduanal',
    'Opinión SAT Positiva',
    'Cédula Profesional',
    'Poder Notarial',
    'Constancia Fiscal',
    'Permiso de Operación',
    'Registro Federal'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.fechaEmision || !formData.fechaVencimiento) {
      setError('Por favor complete los campos obligatorios');
      return;
    }

    if (files.length === 0) {
      setError('Debe adjuntar al menos un documento');
      return;
    }

    // Simular envío exitoso
    setTimeout(() => {
      navigate('/certifications');
    }, 1500);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/certifications')}
            sx={{ mb: 1 }}
          >
            Volver
          </Button>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
            Nueva Certificación
          </Typography>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
            Complete el formulario para registrar una nueva certificación
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ color: '#2c3e50', mb: 4, fontWeight: 'bold', borderBottom: '2px solid #f0f0f0', pb: 2 }}>
          Información de la Certificación
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Tipo de Certificación *"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                {tiposCertificacion.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Describa el propósito y detalles de esta certificación..."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha de Emisión *"
                name="fechaEmision"
                type="date"
                value={formData.fechaEmision}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha de Vencimiento *"
                name="fechaVencimiento"
                type="date"
                value={formData.fechaVencimiento}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Sección de documentos */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                    Documentos Adjuntos
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<UploadIcon />}
                      sx={{ mb: 2 }}
                    >
                      Cargar Certificado
                      <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                    </Button>
                    <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', ml: 1 }}>
                      Formatos aceptados: PDF, JPG, PNG, DOC (Máx. 10MB por archivo)
                    </Typography>
                  </Box>

                  {files.length > 0 ? (
                    <Stack spacing={1}>
                      {files.map((file, index) => (
                        <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                {file.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </Typography>
                            </Box>
                            <Chip 
                              label="Eliminar" 
                              size="small" 
                              color="error"
                              onClick={() => handleRemoveFile(index)}
                            />
                          </Box>
                        </Paper>
                      ))}
                    </Stack>
                  ) : (
                    <Alert severity="info">
                      No hay documentos cargados. Por favor, adjunte al menos un documento.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Botones de acción */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={() => navigate('/certifications')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{ minWidth: 150 }}
                >
                  Guardar Certificación
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewCertification;