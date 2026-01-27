import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  LinearProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  CameraAlt as CameraIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  VerifiedUser as VerifiedIcon,
  CalendarToday as CalendarIcon,
  AccountBalance as BalanceIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

const AssociationProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [editStatsMode, setEditStatsMode] = useState(false);
  
  // Datos de la asociación
  const [association, setAssociation] = useState({
    nombre: 'Asociación Aduanal del Norte, S.A. de C.V.',
    rfc: 'AAN240101XYZ',
    regimenFiscal: 'Personas Morales con Fines No Lucrativos',
    fechaConstitucion: '15/01/2020',
    representanteLegal: 'Luis Rodríguez Martínez',
    representanteRFC: 'RODL800101ABC',
    telefono: '+52 55 1234 5678',
    email: 'contacto@asociacionnorte.com',
    paginaWeb: 'www.asociacionnorte.com',
    regimenSAT: 'Régimen General',
    numeroCertificacionSAT: 'SAT-2020-001234',
    vigenciaCertificacionSAT: '15/01/2026',
    
    // Dirección
    domicilioFiscal: 'Av. Industrial 1234, Parque Industrial del Norte',
    colonia: 'Parque Industrial',
    ciudad: 'Monterrey',
    estado: 'Nuevo León',
    codigoPostal: '66470',
    
    // Contactos adicionales
    contactoAdministrativo: 'Ana Martínez González',
    telefonoAdministrativo: '+52 55 8765 4321',
    emailAdministrativo: 'administracion@asociacionnorte.com',
    contactoTecnico: 'Carlos López Hernández',
    telefonoTecnico: '+52 55 5555 5555',
    emailTecnico: 'soporte@asociacionnorte.com',
    
    // Configuración del sistema
    idioma: 'Español (MX)',
    zonaHoraria: 'UTC-06:00 (Centro de México)',
    formatoFecha: 'DD/MM/YYYY',
    formatoMoneda: 'MXN ($)',
    
    // Estadísticas de la asociación
    estadisticas: {
      totalAgentes: 45,
      agentesActivos: 28,
      agentesInactivos: 17,
      operacionesHoy: 156,
      promedioDiario: 180,
      cumplimientoSAT: 94,
      certificacionesActivas: 125,
      certificacionesPorVencer: 8,
      auditoriasPendientes: 3,
      satisfaccionClientes: 92
    }
  });

  const handleChange = (field) => (e) => {
    setAssociation({
      ...association,
      [field]: e.target.value
    });
  };

  const handleStatChange = (field) => (e) => {
    setAssociation({
      ...association,
      estadisticas: {
        ...association.estadisticas,
        [field]: parseInt(e.target.value) || 0
      }
    });
  };

  const handleSave = () => {
    setEditMode(false);
    setEditStatsMode(false);
  };

  return (
    <Box sx={{ 
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#f5f7fa',
      overflow: 'hidden'
    }}>
      {/* Header fijo */}
      <Paper elevation={0} sx={{ 
        p: 2, 
        mb: 2,
        bgcolor: 'white',
        borderRadius: 0,
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '100%'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BusinessIcon sx={{ fontSize: 40, color: '#3498db' }} />
            <Box>
              <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
                Perfil de la Asociación
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sistema de Gestión y Administración Aduanal
              </Typography>
            </Box>
          </Box>
          
          <Stack direction="row" spacing={1}>
            {!editMode ? (
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                onClick={() => setEditMode(true)}
                sx={{ 
                  fontWeight: '600',
                  textTransform: 'none',
                  bgcolor: '#3498db',
                  minWidth: 140
                }}
              >
                Editar Perfil
              </Button>
            ) : (
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                color="success"
                onClick={handleSave}
                sx={{ fontWeight: '600', textTransform: 'none', minWidth: 160 }}
              >
                Guardar Cambios
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>

      {/* Contenido principal con scroll */}
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        px: 2,
        pb: 2
      }}>
        <Grid container spacing={2}>
          {/* Primera fila - Tres tarjetas principales */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid rgba(52, 152, 219, 0.1)',
            }}>
              <CardContent sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                p: 2.5
              }}>
                {/* Logo de la Asociación */}
                <Box sx={{ position: 'relative', textAlign: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    width: 100, 
                    height: 100, 
                    fontSize: '2rem', 
                    bgcolor: '#3498db',
                    margin: '0 auto',
                    border: '4px solid #e8f4fd',
                    boxShadow: '0 4px 12px rgba(52, 152, 219, 0.2)'
                  }}>
                    <BusinessIcon sx={{ fontSize: 45 }} />
                  </Avatar>
                  {editMode && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 'calc(50% - 50px)',
                        bgcolor: 'white',
                        border: '2px solid #fff',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        '&:hover': { bgcolor: '#f5f5f5' }
                      }}
                      size="small"
                    >
                      <CameraIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                {/* Nombre de la Asociación */}
                <Typography variant="h6" fontWeight="bold" sx={{ 
                  mt: 1,
                  color: '#2c3e50',
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  lineHeight: 1.3
                }}>
                  {association.nombre}
                </Typography>

                {/* RFC y Estatus */}
                <Stack spacing={1} sx={{ mt: 2, mb: 2 }}>
                  <Chip 
                    label={`RFC: ${association.rfc}`}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: '600' }}
                  />
                  <Chip 
                    label="Certificada SAT"
                    color="success"
                    icon={<VerifiedIcon />}
                    sx={{ fontWeight: '600' }}
                  />
                </Stack>

                {/* Información básica */}
                <Box sx={{ 
                  width: '100%',
                  textAlign: 'left',
                  flex: 1
                }}>
                  <Box sx={{ 
                    mb: 1.5,
                    p: 1.2,
                    borderRadius: '8px',
                    bgcolor: 'rgba(52, 152, 219, 0.05)',
                    borderLeft: '4px solid #3498db'
                  }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.85rem' }}>
                      Representante Legal
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#2c3e50', 
                      fontWeight: '700',
                      fontSize: '0.95rem'
                    }}>
                      {association.representanteLegal}
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    p: 1.2,
                    borderRadius: '8px',
                    bgcolor: 'rgba(46, 204, 113, 0.05)',
                    borderLeft: '4px solid #2ecc71'
                  }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.85rem' }}>
                      Constitución
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#2c3e50', 
                      fontWeight: '700',
                      fontSize: '0.95rem'
                    }}>
                      {association.fechaConstitucion}
                    </Typography>
                  </Box>
                </Box>

                {/* Contacto principal */}
                <Box sx={{ 
                  mt: 2, 
                  pt: 1.5, 
                  borderTop: '1px solid rgba(0,0,0,0.08)'
                }}>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.85rem' }}>
                        {association.telefono}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" color="action" />
                      <Typography variant="body2" sx={{ color: '#7f8c8d', fontSize: '0.85rem' }}>
                        {association.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Estadísticas de la Asociación */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 2.5
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 'bold', 
                    color: '#2c3e50',
                    fontSize: '1.1rem'
                  }}>
                    Estadísticas
                  </Typography>
                  {editMode && (
                    <IconButton size="small" onClick={() => setEditStatsMode(!editStatsMode)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                <Stack spacing={2}>
                  {/* Agentes */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Agentes Totales
                      </Typography>
                      {editStatsMode ? (
                        <TextField
                          value={association.estadisticas.totalAgentes}
                          onChange={handleStatChange('totalAgentes')}
                          size="small"
                          type="number"
                          sx={{ width: 70 }}
                        />
                      ) : (
                        <Typography variant="body1" fontWeight="bold">
                          {association.estadisticas.totalAgentes}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Activos / Inactivos
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '0.9rem' }}>
                        {association.estadisticas.agentesActivos} / {association.estadisticas.agentesInactivos}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Operaciones */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Operaciones Hoy
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" sx={{ color: '#2ecc71', fontSize: '0.9rem' }}>
                        {association.estadisticas.operacionesHoy}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Promedio Diario
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '0.9rem' }}>
                        {association.estadisticas.promedioDiario}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Cumplimiento */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Cumplimiento SAT
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" sx={{ color: '#27ae60', fontSize: '0.9rem' }}>
                        {association.estadisticas.cumplimientoSAT}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={association.estadisticas.cumplimientoSAT}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: '#ecf0f1',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: association.estadisticas.cumplimientoSAT >= 90 ? '#27ae60' : '#f39c12'
                        }
                      }}
                    />
                  </Box>

                  <Divider />

                  {/* Certificaciones */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Certificaciones Activas
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '0.9rem' }}>
                        {association.estadisticas.certificacionesActivas}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Por Vencer (30 días)
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" sx={{ color: '#f39c12', fontSize: '0.9rem' }}>
                        {association.estadisticas.certificacionesPorVencer}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Indicadores de Calidad */}
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Satisfacción Clientes
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" sx={{ color: '#3498db', fontSize: '0.9rem' }}>
                        {association.estadisticas.satisfaccionClientes}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Auditorías Pendientes
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" sx={{ color: '#e74c3c', fontSize: '0.9rem' }}>
                        {association.estadisticas.auditoriasPendientes}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Configuración del Sistema */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ height: '100%', p: 2 }}>
                <Typography variant="h6" sx={{ 
                  mb: 2, 
                  fontWeight: 'bold', 
                  color: '#2c3e50',
                  fontSize: '1.1rem'
                }}>
                  Configuración
                </Typography>

                <Stack spacing={1.5}>
                  {/* Idioma */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1.2,
                    borderRadius: 0.6,
                    border: '1px solid #e0e0e0',
                    bgcolor: '#f8f9fa'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <LanguageIcon sx={{ 
                        mr: 1, 
                        color: '#3498db',
                        fontSize: '1.3rem'
                      }} />
                      <Box>
                        <Typography fontWeight="bold" variant="body1" sx={{ fontSize: '0.85rem' }}>
                          Idioma
                        </Typography>
                        {editMode ? (
                          <TextField
                            select
                            value={association.idioma}
                            onChange={handleChange('idioma')}
                            size="small"
                            sx={{ width: 160, mt: 0.5 }}
                          >
                            <MenuItem value="Español (MX)">Español (MX)</MenuItem>
                            <MenuItem value="Español (ES)">Español (ES)</MenuItem>
                            <MenuItem value="English">English</MenuItem>
                          </TextField>
                        ) : (
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {association.idioma}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* Zona Horaria */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1.2,
                    borderRadius: 0.6,
                    border: '1px solid #e0e0e0',
                    bgcolor: '#f8f9fa'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <CalendarIcon sx={{ 
                        mr: 1, 
                        color: '#2ecc71',
                        fontSize: '1.3rem'
                      }} />
                      <Box>
                        <Typography fontWeight="bold" variant="body1" sx={{ fontSize: '0.85rem' }}>
                          Zona Horaria
                        </Typography>
                        {editMode ? (
                          <TextField
                            select
                            value={association.zonaHoraria}
                            onChange={handleChange('zonaHoraria')}
                            size="small"
                            sx={{ width: 180, mt: 0.5 }}
                          >
                            <MenuItem value="UTC-06:00 (Centro de México)">UTC-06:00 (Centro)</MenuItem>
                            <MenuItem value="UTC-05:00 (Este)">UTC-05:00 (Este)</MenuItem>
                            <MenuItem value="UTC-07:00 (Pacífico)">UTC-07:00 (Pacífico)</MenuItem>
                          </TextField>
                        ) : (
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            {association.zonaHoraria}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* Seguridad */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    p: 1.2,
                    borderRadius: 0.6,
                    border: '1px solid #e0e0e0',
                    bgcolor: '#f8f9fa'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      <SecurityIcon sx={{ 
                        mr: 1, 
                        color: '#e74c3c',
                        fontSize: '1.3rem'
                      }} />
                      <Box>
                        <Typography fontWeight="bold" variant="body1" sx={{ fontSize: '0.85rem' }}>
                          Seguridad
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          Accesos y permisos
                        </Typography>
                      </Box>
                    </Box>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      sx={{ 
                        minWidth: '75px',
                        height: '28px',
                        fontSize: '0.7rem'
                      }}
                    >
                      Configurar
                    </Button>
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  {/* Contactos Especializados */}
                  <Box sx={{ 
                    p: 1.2,
                    borderRadius: 0.6,
                    bgcolor: '#f0f7ff',
                    border: '1px solid #d0e3ff'
                  }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ 
                      mb: 1, 
                      color: '#2c3e50',
                      fontSize: '0.8rem'
                    }}>
                      Contactos Especializados
                    </Typography>
                    
                    <Stack spacing={0.8}>
                      <Box>
                        <Typography variant="caption" fontWeight="medium" sx={{ display: 'block', fontSize: '0.75rem' }}>
                          Administrativo
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          {association.contactoAdministrativo}
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 0.3 }} />
                      
                      <Box>
                        <Typography variant="caption" fontWeight="medium" sx={{ display: 'block', fontSize: '0.75rem' }}>
                          Técnico
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          {association.contactoTecnico}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Segunda fila - Datos Fiscales y Legales (a la derecha de Configuración) */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Datos Fiscales y Legales - Ahora ocupa todo el ancho */}
          <Grid item xs={12}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 2,
                  pb: 1.5,
                  borderBottom: '2px solid #2c3e50'
                }}>
                  <Typography variant="h6" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}>
                    DATOS FISCALES Y LEGALES
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BalanceIcon sx={{ color: '#3498db' }} />
                    <Typography variant="caption" color="text.secondary">
                      Información fiscal y legal de la asociación
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  {/* Primera columna - Información fiscal */}
                  <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: '600', mb: 0.5, fontSize: '0.85rem' }}>
                          Régimen Fiscal:
                        </Typography>
                        {editMode ? (
                          <TextField
                            fullWidth
                            value={association.regimenFiscal}
                            onChange={handleChange('regimenFiscal')}
                            size="small"
                          />
                        ) : (
                          <Typography variant="body2" sx={{ fontSize: '0.9rem', p: 1, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                            {association.regimenFiscal}
                          </Typography>
                        )}
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: '600', mb: 0.5, fontSize: '0.85rem' }}>
                          Certificación SAT:
                        </Typography>
                        <Stack spacing={0.5}>
                          {editMode ? (
                            <TextField
                              fullWidth
                              value={association.numeroCertificacionSAT}
                              onChange={handleChange('numeroCertificacionSAT')}
                              size="small"
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: '0.9rem', p: 1, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                              {association.numeroCertificacionSAT}
                            </Typography>
                          )}
                          <Chip 
                            label={`Vigencia: ${association.vigenciaCertificacionSAT}`}
                            size="small"
                            color="success"
                            variant="outlined"
                            icon={<CalendarIcon fontSize="small" />}
                          />
                        </Stack>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: '600', mb: 0.5, fontSize: '0.85rem' }}>
                          Representante Legal:
                        </Typography>
                        <Stack spacing={0.5}>
                          {editMode ? (
                            <>
                              <TextField
                                fullWidth
                                value={association.representanteLegal}
                                onChange={handleChange('representanteLegal')}
                                size="small"
                                sx={{ mb: 1 }}
                              />
                              <TextField
                                fullWidth
                                value={association.representanteRFC}
                                onChange={handleChange('representanteRFC')}
                                size="small"
                              />
                            </>
                          ) : (
                            <>
                              <Typography variant="body2" sx={{ fontSize: '0.9rem', p: 1, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                                {association.representanteLegal}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                RFC: {association.representanteRFC}
                              </Typography>
                            </>
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                  </Grid>

                  {/* Segunda columna - Domicilio fiscal */}
                  <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: '600', mb: 0.5, fontSize: '0.85rem' }}>
                          Domicilio Fiscal:
                        </Typography>
                        {editMode ? (
                          <TextField
                            fullWidth
                            value={association.domicilioFiscal}
                            onChange={handleChange('domicilioFiscal')}
                            multiline
                            rows={2}
                            size="small"
                          />
                        ) : (
                          <Typography variant="body2" sx={{ fontSize: '0.9rem', p: 1, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                            {association.domicilioFiscal}
                          </Typography>
                        )}
                      </Box>

                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: '600', mb: 0.5, fontSize: '0.85rem' }}>
                            Colonia:
                          </Typography>
                          {editMode ? (
                            <TextField
                              fullWidth
                              value={association.colonia}
                              onChange={handleChange('colonia')}
                              size="small"
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: '0.9rem', p: 1, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                              {association.colonia}
                            </Typography>
                          )}
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: '600', mb: 0.5, fontSize: '0.85rem' }}>
                            Ciudad:
                          </Typography>
                          {editMode ? (
                            <TextField
                              fullWidth
                              value={association.ciudad}
                              onChange={handleChange('ciudad')}
                              size="small"
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: '0.9rem', p: 1, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                              {association.ciudad}
                            </Typography>
                          )}
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: '600', mb: 0.5, fontSize: '0.85rem' }}>
                            Estado:
                          </Typography>
                          {editMode ? (
                            <TextField
                              fullWidth
                              value={association.estado}
                              onChange={handleChange('estado')}
                              size="small"
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: '0.9rem', p: 1, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                              {association.estado}
                            </Typography>
                          )}
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: '600', mb: 0.5, fontSize: '0.85rem' }}>
                            Código Postal:
                          </Typography>
                          {editMode ? (
                            <TextField
                              fullWidth
                              value={association.codigoPostal}
                              onChange={handleChange('codigoPostal')}
                              size="small"
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: '0.9rem', p: 1, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                              {association.codigoPostal}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>

                      {/* Contactos */}
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: '600', mb: 1, fontSize: '0.85rem' }}>
                          Contactos:
                        </Typography>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <PhoneIcon fontSize="small" color="action" />
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.75rem' }}>
                                  Teléfono
                                </Typography>
                                {editMode ? (
                                  <TextField
                                    value={association.telefono}
                                    onChange={handleChange('telefono')}
                                    size="small"
                                    sx={{ mt: 0.5 }}
                                  />
                                ) : (
                                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    {association.telefono}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <EmailIcon fontSize="small" color="action" />
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.75rem' }}>
                                  Email
                                </Typography>
                                {editMode ? (
                                  <TextField
                                    value={association.email}
                                    onChange={handleChange('email')}
                                    size="small"
                                    sx={{ mt: 0.5 }}
                                  />
                                ) : (
                                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    {association.email}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LanguageIcon fontSize="small" color="action" />
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.75rem' }}>
                                  Página Web
                                </Typography>
                                {editMode ? (
                                  <TextField
                                    fullWidth
                                    value={association.paginaWeb}
                                    onChange={handleChange('paginaWeb')}
                                    size="small"
                                    sx={{ mt: 0.5 }}
                                  />
                                ) : (
                                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                    {association.paginaWeb}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>

                {editMode && (
                  <Box sx={{ 
                    mt: 3, 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: 1.5,
                    pt: 2,
                    borderTop: '1px solid rgba(0,0,0,0.1)'
                  }}>
                    <Button 
                      onClick={() => setEditMode(false)} 
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: '600', textTransform: 'none' }}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      onClick={handleSave} 
                      variant="contained" 
                      color="success"
                      size="small"
                      sx={{ fontWeight: '600', textTransform: 'none' }}
                    >
                      Guardar Cambios
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AssociationProfile;