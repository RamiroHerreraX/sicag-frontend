import React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  LinearProgress,
  Chip,
  Button
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Done as DoneIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const UserDashboard = () => {
  // Datos mock para el dashboard
  const stats = [
    { title: 'Certificaciones Vigentes', value: '2', color: '#27ae60', icon: <CheckCircleIcon /> },
    { title: 'Certificaciones por Vencer', value: '0', color: '#f39c12', icon: <WarningIcon /> },
    { title: 'Certificaciones Rechazadas', value: '1', color: '#e74c3c', icon: <ErrorIcon /> },
    { title: 'Nivel de Cumplimiento', value: '76%', color: '#eaee12', icon: <TrendingUpIcon /> },
  ];

  const alerts = [
    { type: 'warning', message: 'Certificación de Patente Aduanal vence en 15 días', date: '15/01/2026' },
    { type: 'info', message: 'Opinión SAT Positiva requiere renovación', date: '20/01/2026' },
    { type: 'error', message: 'Cédula Profesional: Requiere mejor legibilidad', date: '10/01/2026' },
  ];

  const recentCertifications = [
    { name: 'Patente Aduanal', status: 'Vigente', expiration: '11/01/2029', progress: 100 },
    { name: 'Opinión SAT Positiva', status: 'Por Vencer', expiration: '30/01/2026', progress: 30 },
    { name: 'Cédula Profesional', status: 'Observaciones', expiration: '15/03/2026', progress: 60 },
  ];

  return (
    <Box sx={{ maxWidth: '1300px', px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ 
          color: '#2c3e50', 
          fontWeight: '800', 
          mb: 1.5,
          fontSize: { xs: '1.75rem', sm: '2rem' }
        }}>
          Dashboard de Cumplimiento
        </Typography>
        <Typography variant="body1" sx={{ 
          color: '#7f8c8d',
          fontSize: { xs: '0.95rem', sm: '1rem' }
        }}>
          Bienvenido al Sistema Integral de Consultoría y Asesoría Gremial
        </Typography>
      </Box>

      {/* Estatus Global - AUMENTADO EL ESPACIO ABAJO */}
      <Card sx={{ 
        mb: 8,  // Cambiado de mb: 6 a mb: 8 para más espacio vertical
        bgcolor: '#f9faab',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid rgba(177, 194, 27, 0.1)',
        maxWidth: '1050px',
        margin: '20px auto',
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 3
          }}>
            {/* Primer elemento: Estatus Global */}
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', sm: 'flex-start' }
            }}>
              <Typography variant="h6" sx={{ 
                color: '#2c3e50', 
                fontWeight: '700',
                fontSize: '1.1rem',
                mb: 1
              }}>
                ESTATUS GLOBAL
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Chip 
                  label="CUMPLIMIENTO MEDIO" 
                  color="warning" 
                  size="medium"
                  sx={{ 
                    fontWeight: '600',
                    fontSize: '0.75rem',
                    alignSelf: 'flex-start'
                  }}
                />
                <Typography variant="body2" sx={{ 
                  color: '#ae8327',
                  fontWeight: '500',
                  mt: 0.5
                }}>
                  La mayoría de tus certificaciones están vigentes
                </Typography>
              </Box>
            </Box>

            {/* Segundo elemento: Tres aspectos con iconos de aprobación */}
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              borderLeft: { sm: '1px solid rgba(0,0,0,0.1)' },
              borderRight: { sm: '1px solid rgba(0,0,0,0.1)' },
              pl: { sm: 3 },
              pr: { sm: 3 }
            }}>
              {/* Aspecto 1 */}
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                <DoneIcon sx={{ 
                  color: '#4caf50',
                  fontSize: '1.2rem'
                }} />
                <Typography variant="body2" sx={{ 
                  color: '#5d4037',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Formación ética y cumplimiento: <span style={{ fontWeight: '600', color: '#2e7d32' }}>20 hrs</span>
                </Typography>
              </Box>
              
              {/* Aspecto 2 */}
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                <DoneIcon sx={{ 
                  color: '#4caf50',
                  fontSize: '1.2rem'
                }} />
                <Typography variant="body2" sx={{ 
                  color: '#5d4037',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Actualización técnica aduanera: <span style={{ fontWeight: '600', color: '#2e7d32' }}>80 hrs</span>
                </Typography>
              </Box>
              
              {/* Aspecto 3 */}
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}>
                <CloseIcon sx={{ 
                  color: '#f44336',
                  fontSize: '1.2rem'
                }} />
                <Typography variant="body2" sx={{ 
                  color: '#5d4037',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Antisobornos y cadena de suministros
                </Typography>
              </Box>
            </Box>

            {/* Tercer elemento: Nivel III */}
            <Box sx={{ 
              flex: 1,
              textAlign: { xs: 'left', sm: 'center' }
            }}>
              <Typography variant="h4" sx={{ 
                color: '#2c3e50', 
                fontWeight: '800',
                fontSize: { xs: '2rem', sm: '2.5rem' }
              }}>
                NIVEL II
              </Typography>
              <Typography variant="subtitle2" sx={{ 
                color: '#1a5276',
                fontWeight: '600',
                fontSize: '0.95rem',
                mb: 1
              }}>
                Sistema Gremial Intermedio
              </Typography>
              <Typography variant="caption" sx={{ 
                color: '#7f8c8d',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>
                Próxima revisión 12/2025
              </Typography>
            </Box>
            
          </Box>
        </CardContent>
      </Card>

      {/* Estadísticas - Expandidas al ancho del Estatus Global */}
      <Box sx={{ 
        mb: 8,  // Cambiado de mb: 5 a mb: 8 para más espacio vertical
        maxWidth: '1050px',
        
        width: '100%',
        margin: '20px auto'
      }}>
        <Grid container spacing={2} justifyContent="space-between">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={5.8} md={2.8} key={index}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                },
                width: '100%'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: 1
                  }}>
                    <Box>
                      <Typography variant="h3" sx={{ 
                        color: stat.color, 
                        fontWeight: '800',
                        fontSize: { xs: '2.5rem', sm: '3rem' },
                        lineHeight: 1
                      }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      color: stat.color,
                      fontSize: { xs: '2rem', sm: '2.5rem' }
                    }}>
                      {stat.icon}
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    color: '#7f8c8d',
                    fontWeight: '500',
                    fontSize: '0.9rem',
                    mt: 2
                  }}>
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contenedor para las dos secciones inferiores - Mismo ancho que Estatus Global */}
      <Box sx={{ 
        maxWidth: '1050px',
        margin: '0 auto',
        width: '105000px'
      }}>
        <Grid container spacing={4}>  {/* Cambiado de spacing={3} a spacing={4} para más separación */}
          
          {/* Resumen de Certificaciones - Expandido */}
          <Grid item xs={12} md={6}>  {/* Cambiado de md={8} a md={6} para hacerlo más ancho */}
            <Card sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              height: '100%',
              width: '570px',
              maxWidth: '800px auto'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  maxWidth: '800px '
                }}>
                  <Typography variant="h6" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '700',
                    fontSize: '1.1rem'
                  }}>
                    RESUMEN DE CERTIFICACIONES
                  </Typography>
                  <Chip 
                    label={`${recentCertifications.length} certificaciones`}
                    size="small"
                    sx={{ 
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      fontWeight: '500'
                    }}
                  />
                </Box>
                
                <Stack spacing={2.5}>
                  {recentCertifications.map((cert, index) => (
                    <Paper 
                      key={index} 
                      variant="outlined" 
                      sx={{ 
                        p: 2.5,
                        borderRadius: 1.5,
                        border: '1px solid rgba(0,0,0,0.1)',
                        transition: 'border-color 0.2s',
                        '&:hover': {
                          borderColor: '#3498db'
                        }
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        mb: 2,
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 1, sm: 0 }
                      }}>
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: '600',
                          fontSize: '1rem',
                          color: '#2c3e50'
                        }}>
                          {cert.name}
                        </Typography>
                        <Chip 
                          label={cert.status}
                          size="small"
                          sx={{ 
                            fontWeight: '600',
                            fontSize: '0.75rem',
                            backgroundColor: 
                              cert.status === 'Vigente' ? '#e8f5e9' :
                              cert.status === 'Por Vencer' ? '#fff3e0' : '#ffebee',
                            color: 
                              cert.status === 'Vigente' ? '#2e7d32' :
                              cert.status === 'Por Vencer' ? '#f57c00' : '#d32f2f'
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 2.5 }}>
                        <Typography variant="caption" sx={{ 
                          color: '#7f8c8d',
                          fontWeight: '500',
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          <span style={{ fontWeight: '600' }}>Vencimiento:</span> {cert.expiration}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={cert.progress}
                            sx={{ 
                              height: 8, 
                              borderRadius: 4,
                              backgroundColor: '#f5f5f5',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                backgroundColor: 
                                  cert.progress > 70 ? '#27ae60' :
                                  cert.progress > 30 ? '#f39c12' : '#e74c3c'
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ 
                          color: '#2c3e50',
                          fontWeight: '600',
                          fontSize: '0.85rem',
                          minWidth: '40px'
                        }}>
                          {cert.progress}%
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
                
                <Box sx={{ 
                  mt: 4, 
                  textAlign: 'center',
                  pt: 3,
                  borderTop: '1px solid rgba(0,0,0,0.08)'
                }}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    sx={{ 
                      fontWeight: '600',
                      textTransform: 'none',
                      px: 4,
                      py: 1
                    }}
                  >
                    Ver todas las certificaciones
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Alertas y Notificaciones - Expandido */}
          <Grid item xs={12} md={6}>  {/* Cambiado de md={4} a md={6} para hacerlo más ancho y que quede a la misma altura */}
            <Card sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              height: '100%',
              width: '100%'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.08)'
                }}>
                  <NotificationsIcon sx={{ 
                    mr: 1.5, 
                    color: '#f39c12',
                    fontSize: '1.5rem'
                  }} />
                  <Typography variant="h6" sx={{ 
                    color: '#2c3e50', 
                    fontWeight: '700',
                    fontSize: '1.1rem'
                  }}>
                    Alertas y Notificaciones
                  </Typography>
                  <Chip 
                    label="3 nuevas" 
                    color="warning" 
                    size="small"
                    sx={{ 
                      ml: 'auto',
                      fontWeight: '600'
                    }}
                  />
                </Box>

                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ 
                      color: '#2c3e50', 
                      mb: 1.5, 
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}>
                      <WarningIcon sx={{ fontSize: '1rem', color: '#f39c12' }} />
                      Vencimientos Próximos
                    </Typography>
                    <Paper variant="outlined" sx={{ 
                      p: 2.5, 
                      bgcolor: '#fffde7',
                      borderRadius: 1.5,
                      border: '1px solid #fff3e0'
                    }}>
                      {['Certificación de Patente Aduanal vence en 15 días', 
                        'Poder Notarial requiere actualización', 
                        'Opinión SAT Positiva (15 días)'].map((item, idx) => (
                        <Box key={idx} sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          mb: idx < 2 ? 1.5 : 0
                        }}>
                          <Box sx={{ 
                            width: 6, 
                            height: 6, 
                            backgroundColor: '#f39c12',
                            borderRadius: '50%',
                            mt: 0.75,
                            mr: 1.5
                          }} />
                          <Typography variant="body2" sx={{ 
                            color: '#5d4037',
                            fontWeight: '500',
                            fontSize: '0.9rem'
                          }}>
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Paper>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ 
                      color: '#2c3e50', 
                      mb: 1.5, 
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}>
                      <ErrorIcon sx={{ fontSize: '1rem', color: '#e74c3c' }} />
                      Observaciones Pendientes
                    </Typography>
                    <Paper variant="outlined" sx={{ 
                      p: 2.5, 
                      bgcolor: '#ffebee',
                      borderRadius: 1.5,
                      border: '1px solid #ffcdd2'
                    }}>
                      {['Cédula Profesional: Mejorar legibilidad', 
                        'Opinión SAT: Adjuntar línea de captura', 
                        'Contrato Laboral: Falta firma'].map((item, idx) => (
                        <Box key={idx} sx={{ 
                          display: 'flex', 
                          alignItems: 'flex-start',
                          mb: idx < 2 ? 1.5 : 0
                        }}>
                          <Box sx={{ 
                            width: 6, 
                            height: 6, 
                            backgroundColor: '#e74c3c',
                            borderRadius: '50%',
                            mt: 0.75,
                            mr: 1.5
                          }} />
                          <Typography variant="body2" sx={{ 
                            color: '#c62828',
                            fontWeight: '500',
                            fontSize: '0.9rem'
                          }}>
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Paper>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ 
                      color: '#2c3e50', 
                      mb: 1.5, 
                      fontWeight: '600',
                      fontSize: '0.95rem'
                    }}>
                      Historial de Alertas
                    </Typography>
                    <Paper variant="outlined" sx={{ 
                      p: 2.5, 
                      borderRadius: 1.5,
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 1.5
                      }}>
                        <Chip 
                          label="Rechazo" 
                          size="small"
                          sx={{ 
                            backgroundColor: '#ffebee',
                            color: '#d32f2f',
                            fontWeight: '600'
                          }}
                        />
                        <Typography variant="caption" sx={{ 
                          color: '#7f8c8d',
                          fontWeight: '500',
                          fontSize: '0.8rem'
                        }}>
                          05/01/2026
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ 
                        color: '#2c3e50',
                        fontWeight: '500',
                        mb: 1,
                        fontSize: '0.9rem'
                      }}>
                        Certificación de Representación Legal rechazada
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#f39c12',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        display: 'block'
                      }}>
                        Estado: No Leído
                      </Typography>
                    </Paper>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDashboard;