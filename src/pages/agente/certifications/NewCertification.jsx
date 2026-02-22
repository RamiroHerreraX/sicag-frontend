import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Stack,
  MenuItem,
  InputAdornment,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  LinearProgress,
  Avatar
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  Info as InfoIcon,
  CloudUpload as CloudUploadIcon,
  AttachFile as AttachFileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Paleta corporativa del UserManagement (igual que en las otras páginas)
const colors = {
  primary: {
    dark: '#0D2A4D',
    main: '#133B6B',
    light: '#3A6EA5'
  },
  secondary: {
    main: '#00A8A8',
    light: '#00C2D1',
    lighter: '#35D0FF'
  },
  accents: {
    blue: '#0099FF',
    purple: '#6C5CE7'
  },
  status: {
    success: '#00A8A8',
    warning: '#00C2D1',
    error: '#0099FF',
    info: '#3A6EA5'
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  }
};

const NewCertification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo: '',
    descripcion: '',
    fechaEmision: '',
    fechaVencimiento: '',
    numero: '',
    autoridad: ''
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [touched, setTouched] = useState({});

  const tiposCertificacion = [
    'Patente Aduanal',
    'Opinión SAT Positiva',
    'Cédula Profesional',
    'Poder Notarial',
    'Constancia Fiscal',
    'Registro Inicial',
    'Permiso de Operación',
    'Registro Federal',
    'Curso de Ética Profesional',
    'Diplomado Comercio Exterior'
  ];

  const autoridades = [
    'SAT - Servicio de Administración Tributaria',
    'SEP - Secretaría de Educación Pública',
    'Notaría Pública',
    'SICAG',
    'Instituto de Ética Empresarial',
    'Universidad Aduanera de México',
    'Asociación de Agentes Aduanales'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    
    // Simular progreso de carga
    setUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
          return 0;
        }
        return prev + 20;
      });
    }, 300);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <PdfIcon sx={{ color: colors.status.error }} />;
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return <ImageIcon sx={{ color: colors.accents.blue }} />;
    return <FileIcon sx={{ color: colors.primary.main }} />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requiredFields = ['tipo', 'fechaEmision', 'fechaVencimiento'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError('Por favor complete los campos obligatorios');
      return;
    }

    if (files.length === 0) {
      setError('Debe adjuntar al menos un documento');
      return;
    }

    setError('');
    
    // Simular envío exitoso
    setTimeout(() => {
      navigate('/certifications');
    }, 1500);
  };

  const isFieldError = (field) => {
    return touched[field] && !formData[field];
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/certifications')}
            sx={{ 
              mb: 1,
              color: colors.primary.main,
              '&:hover': { backgroundColor: `${colors.primary.main}10` }
            }}
          >
            Volver
          </Button>
          <Typography variant="h4" sx={{ color: colors.primary.dark, fontWeight: 'bold' }}>
            Nueva Certificación
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary }}>
            Complete el formulario para registrar una nueva certificación en el sistema
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            backgroundColor: `${colors.status.error}10`,
            color: colors.status.error,
            border: `1px solid ${colors.status.error}20`
          }}
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Columna izquierda - Formulario (más compacto) */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${colors.primary.main}20`,
              height: '100%'
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ 
                color: colors.primary.main, 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <InfoIcon fontSize="small" />
                Información de la Certificación
              </Typography>
              <Divider sx={{ mt: 1, borderColor: colors.primary.main + '20' }} />
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                {/* Tipo de Certificación */}
                <FormControl fullWidth size="small" error={isFieldError('tipo')}>
                  <InputLabel sx={{ color: colors.text.primary }}>Tipo de Certificación *</InputLabel>
                  <Select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    onBlur={() => handleBlur('tipo')}
                    label="Tipo de Certificación *"
                    size="small"
                    sx={{
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.primary.main
                      }
                    }}
                  >
                    {tiposCertificacion.map((tipo) => (
                      <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                    ))}
                  </Select>
                  {isFieldError('tipo') && (
                    <FormHelperText>Este campo es obligatorio</FormHelperText>
                  )}
                </FormControl>

                {/* Número de Certificación */}
                <TextField
                  fullWidth
                  size="small"
                  label="Número de Certificación"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="Ej: PA-2026-00145"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionIcon sx={{ color: colors.primary.main, fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: colors.primary.main
                      }
                    }
                  }}
                />

                {/* Autoridad Emisora */}
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: colors.text.primary }}>Autoridad Emisora</InputLabel>
                  <Select
                    name="autoridad"
                    value={formData.autoridad}
                    onChange={handleChange}
                    label="Autoridad Emisora"
                    size="small"
                    sx={{
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.primary.main
                      }
                    }}
                  >
                    {autoridades.map((autoridad) => (
                      <MenuItem key={autoridad} value={autoridad}>{autoridad}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Descripción */}
                <TextField
                  fullWidth
                  size="small"
                  label="Descripción"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  placeholder="Describa el propósito y detalles de esta certificación..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: colors.primary.main
                      }
                    }
                  }}
                />

                {/* Fechas */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Fecha de Emisión *"
                      name="fechaEmision"
                      type="date"
                      value={formData.fechaEmision}
                      onChange={handleChange}
                      onBlur={() => handleBlur('fechaEmision')}
                      required
                      error={isFieldError('fechaEmision')}
                      helperText={isFieldError('fechaEmision') ? 'Este campo es obligatorio' : ''}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon sx={{ color: colors.primary.main, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: colors.primary.main
                          }
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Fecha de Vencimiento *"
                      name="fechaVencimiento"
                      type="date"
                      value={formData.fechaVencimiento}
                      onChange={handleChange}
                      onBlur={() => handleBlur('fechaVencimiento')}
                      required
                      error={isFieldError('fechaVencimiento')}
                      helperText={isFieldError('fechaVencimiento') ? 'Este campo es obligatorio' : ''}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarIcon sx={{ color: colors.primary.main, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&.Mui-focused fieldset': {
                            borderColor: colors.primary.main
                          }
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Información adicional */}
                <Alert 
                  severity="success" 
                  sx={{ 
                    backgroundColor: `${colors.status.success}10`,
                    color: colors.text.primary,
                    border: `1px solid ${colors.status.success}20`,
                    mt: 1,
                    py: 0.5
                  }}
                >
                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                    <strong>Nota:</strong> Los documentos serán revisados por el comité de validación.
                  </Typography>
                </Alert>
              </Stack>
            </form>
          </Paper>
        </Grid>

        {/* Columna derecha - Documentos y Botones */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              border: `1px solid ${colors.primary.main}20`,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Encabezado de documentos */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Avatar sx={{ bgcolor: colors.primary.main + '20', color: colors.primary.main, width: 32, height: 32 }}>
                <AttachFileIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: colors.primary.main, fontWeight: 'bold' }}>
                  Documentos Adjuntos
                </Typography>
                <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                  Agregue los documentos que respaldan esta certificación
                </Typography>
              </Box>
            </Box>

            {/* Área de carga */}
            <Paper 
              variant="outlined"
              sx={{ 
                p: 8,
                mb: 2,
                border: `2px dashed ${colors.primary.main}40`,
                borderRadius: 2,
                bgcolor: '#f8f9fa',
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: colors.primary.main,
                  bgcolor: '#ffffff'
                }
              }}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload">
                <CloudUploadIcon sx={{ fontSize: 32, color: colors.primary.main, mb: 0.5 }} />
                <Typography variant="body2" sx={{ color: colors.text.primary, fontWeight: '500' }}>
                  Haz clic para seleccionar archivos
                </Typography>
                <Typography variant="caption" sx={{ color: colors.text.secondary, display: 'block' }}>
                  PDF, JPG, PNG, DOC, DOCX (Máx. 10MB)
                </Typography>
              </label>
            </Paper>

            {/* Barra de progreso de carga */}
            {uploading && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                    Subiendo archivos...
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.primary.main, fontWeight: 'bold' }}>
                    {uploadProgress}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={uploadProgress} 
                  sx={{ 
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: colors.primary.main
                    }
                  }}
                />
              </Box>
            )}

            {/* Lista de archivos cargados */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', maxHeight: 200, mb: 2 }}>
              {files.length > 0 ? (
                <Box>
                  <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1, fontSize: '0.8rem' }}>
                    Archivos cargados ({files.length})
                  </Typography>
                  <Stack spacing={1}>
                    {files.map((file, index) => (
                      <Paper 
                        key={index} 
                        variant="outlined" 
                        sx={{ 
                          p: 1.5,
                          border: `1px solid ${colors.primary.main}20`,
                          '&:hover': {
                            borderColor: colors.primary.main,
                            bgcolor: '#f8f9fa'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            {getFileIcon(file.name)}
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '500', color: colors.text.primary, fontSize: '0.8rem' }}>
                                {file.name.length > 25 ? file.name.substring(0, 25) + '...' : file.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.7rem' }}>
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </Typography>
                            </Box>
                          </Box>
                          <Chip 
                            label="Eliminar" 
                            size="small" 
                            icon={<CloseIcon sx={{ fontSize: 14 }} />}
                            onClick={() => handleRemoveFile(index)}
                            sx={{ 
                              bgcolor: `${colors.status.error}15`,
                              color: colors.status.error,
                              height: 24,
                              '& .MuiChip-label': { fontSize: '0.7rem', px: 1 },
                              '&:hover': { bgcolor: `${colors.status.error}25` }
                            }}
                          />
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              ) : (
                <Alert 
                  severity="info" 
                  sx={{ 
                    backgroundColor: `${colors.primary.main}10`,
                    color: colors.text.primary,
                    border: `1px solid ${colors.primary.main}20`,
                    py: 0.5
                  }}
                >
                  <Typography variant="caption">No hay documentos cargados. Adjunte al menos un documento.</Typography>
                </Alert>
              )}
            </Box>

            {/* Botones de acción */}
            <Divider sx={{ my: 2, borderColor: colors.primary.main + '20' }} />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate('/certifications')}
                size="small"
                sx={{ 
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  color: colors.primary.main,
                  borderColor: colors.primary.main,
                  '&:hover': {
                    borderColor: colors.primary.dark,
                    backgroundColor: `${colors.primary.main}10`
                  }
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={uploading}
                size="small"
                sx={{ 
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  bgcolor: colors.primary.main,
                  '&:hover': { bgcolor: colors.primary.dark }
                }}
              >
                Guardar
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewCertification;