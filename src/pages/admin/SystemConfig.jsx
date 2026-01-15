import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
  Slider,
  MenuItem,
  InputAdornment,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Restore as RestoreIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Timer as TimerIcon,
  Assessment as AssessmentIcon,
  Backup as BackupIcon
} from '@mui/icons-material';

const SystemConfig = () => {
  const [config, setConfig] = useState({
    // Configuración general
    systemName: 'SICAG',
    maintenanceMode: false,
    allowRegistrations: true,
    
    // Configuración de certificaciones
    certificationValidity: 365,
    renewalWarningDays: 30,
    maxCertificationsPerUser: 10,
    
    // Configuración de comité
    committeeReviewDays: 5,
    requiredCommitteeApprovals: 2,
    autoEscalationDays: 3,
    
    // Configuración de alertas
    emailNotifications: true,
    renewalAlerts: true,
    committeeAlerts: true,
    systemAlerts: true,
    
    // Configuración de semáforo
    greenThreshold: 90,
    yellowThreshold: 70,
    redThreshold: 50,
    
    // Configuración de backup
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: 30
  });

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setConfig({
      ...config,
      [field]: value
    });
  };

  const handleSliderChange = (field) => (event, newValue) => {
    setConfig({
      ...config,
      [field]: newValue
    });
  };

  const handleSave = () => {
    // Simular guardado
    setTimeout(() => {
      alert('Configuración guardada exitosamente');
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('¿Está seguro de restaurar la configuración por defecto?')) {
      setConfig({
        systemName: 'SICAG',
        maintenanceMode: false,
        allowRegistrations: true,
        certificationValidity: 365,
        renewalWarningDays: 30,
        maxCertificationsPerUser: 10,
        committeeReviewDays: 5,
        requiredCommitteeApprovals: 2,
        autoEscalationDays: 3,
        emailNotifications: true,
        renewalAlerts: true,
        committeeAlerts: true,
        systemAlerts: true,
        greenThreshold: 90,
        yellowThreshold: 70,
        redThreshold: 50,
        autoBackup: true,
        backupFrequency: 'daily',
        retentionDays: 30
      });
    }
  };

  const sections = [
    {
      id: 'general',
      title: 'Configuración General',
      icon: <AssessmentIcon />,
      color: '#3498db'
    },
    {
      id: 'certifications',
      title: 'Certificaciones',
      icon: <TimerIcon />,
      color: '#2ecc71'
    },
    {
      id: 'committee',
      title: 'Comité de Cumplimiento',
      icon: <SecurityIcon />,
      color: '#9b59b6'
    },
    {
      id: 'alerts',
      title: 'Alertas y Notificaciones',
      icon: <NotificationsIcon />,
      color: '#f39c12'
    },
    {
      id: 'trafficLight',
      title: 'Semáforo de Cumplimiento',
      icon: <AssessmentIcon />,
      color: '#e74c3c'
    },
    {
      id: 'backup',
      title: 'Backup y Respaldo',
      icon: <BackupIcon />,
      color: '#34495e'
    }
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          Configuración del Sistema
        </Typography>
        <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
          Configure los parámetros y reglas del sistema SICAG
        </Typography>
      </Box>

      {/* Alertas de estado */}
      <Alert severity="info" sx={{ mb: 4 }}>
        Los cambios en la configuración afectarán a todos los usuarios del sistema.
      </Alert>

      <Grid container spacing={3}>
        {/* Columna izquierda - Configuraciones */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            {sections.map((section) => (
              <Accordion key={section.id} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ color: section.color, mr: 2 }}>
                      {section.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {section.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {section.id === 'general' && (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Nombre del Sistema"
                          value={config.systemName}
                          onChange={handleChange('systemName')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.maintenanceMode}
                              onChange={handleChange('maintenanceMode')}
                              color="warning"
                            />
                          }
                          label="Modo Mantenimiento"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.allowRegistrations}
                              onChange={handleChange('allowRegistrations')}
                              color="primary"
                            />
                          }
                          label="Permitir Registros"
                        />
                      </Grid>
                    </Grid>
                  )}

                  {section.id === 'certifications' && (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 2 }}>
                          Vigencia de Certificaciones
                        </Typography>
                        <Box sx={{ px: 2 }}>
                          <Slider
                            value={config.certificationValidity}
                            onChange={handleSliderChange('certificationValidity')}
                            min={30}
                            max={730}
                            step={30}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value} días`}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', textAlign: 'center' }}>
                          {config.certificationValidity} días
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Días de Advertencia"
                          type="number"
                          value={config.renewalWarningDays}
                          onChange={handleChange('renewalWarningDays')}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">días</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Máx. Certificaciones por Usuario"
                          type="number"
                          value={config.maxCertificationsPerUser}
                          onChange={handleChange('maxCertificationsPerUser')}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {section.id === 'committee' && (
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Días para Revisión"
                          type="number"
                          value={config.committeeReviewDays}
                          onChange={handleChange('committeeReviewDays')}
                          InputProps={{
                            endAdornment: <InputAdornment position="end">días</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Aprobaciones Requeridas"
                          type="number"
                          value={config.requiredCommitteeApprovals}
                          onChange={handleChange('requiredCommitteeApprovals')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Escalación Automática"
                          type="number"
                          value={config.autoEscalationDays}
                          onChange={handleChange('autoEscalationDays')}
                          helperText="Días para escalar al supervisor"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">días</InputAdornment>,
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {section.id === 'alerts' && (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.emailNotifications}
                              onChange={handleChange('emailNotifications')}
                              color="primary"
                            />
                          }
                          label="Notificaciones por Email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.renewalAlerts}
                              onChange={handleChange('renewalAlerts')}
                              color="warning"
                            />
                          }
                          label="Alertas de Renovación"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.committeeAlerts}
                              onChange={handleChange('committeeAlerts')}
                              color="secondary"
                            />
                          }
                          label="Alertas del Comité"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.systemAlerts}
                              onChange={handleChange('systemAlerts')}
                              color="info"
                            />
                          }
                          label="Alertas del Sistema"
                        />
                      </Grid>
                    </Grid>
                  )}

                  {section.id === 'trafficLight' && (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 2 }}>
                          Umbrales del Semáforo (% de cumplimiento)
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ px: 2 }}>
                          <Slider
                            value={[config.redThreshold, config.yellowThreshold, config.greenThreshold]}
                            onChange={(event, newValue) => {
                              setConfig({
                                ...config,
                                redThreshold: newValue[0],
                                yellowThreshold: newValue[1],
                                greenThreshold: newValue[2]
                              });
                            }}
                            min={0}
                            max={100}
                            step={5}
                            valueLabelDisplay="auto"
                            disableSwap
                          />
                        </Box>
                        <Grid container spacing={1} sx={{ mt: 2 }}>
                          <Grid item xs={4}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                              <Typography variant="caption" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                                ROJO: {'<'} {config.redThreshold}%
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fffde7' }}>
                              <Typography variant="caption" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                                AMARILLO: {config.redThreshold}-{config.yellowThreshold}%
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={4}>
                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                              <Typography variant="caption" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                                VERDE: {'>'} {config.yellowThreshold}%
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}

                  {section.id === 'backup' && (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={config.autoBackup}
                              onChange={handleChange('autoBackup')}
                              color="primary"
                            />
                          }
                          label="Backup Automático"
                        />
                      </Grid>
                      {config.autoBackup && (
                        <>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              select
                              label="Frecuencia"
                              value={config.backupFrequency}
                              onChange={handleChange('backupFrequency')}
                            >
                              <MenuItem value="hourly">Cada hora</MenuItem>
                              <MenuItem value="daily">Diario</MenuItem>
                              <MenuItem value="weekly">Semanal</MenuItem>
                              <MenuItem value="monthly">Mensual</MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Retención"
                              type="number"
                              value={config.retentionDays}
                              onChange={handleChange('retentionDays')}
                              InputProps={{
                                endAdornment: <InputAdornment position="end">días</InputAdornment>,
                              }}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>

          {/* Botones de acción */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              startIcon={<RestoreIcon />}
              onClick={handleReset}
            >
              Restaurar Valores
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ minWidth: 200 }}
            >
              Guardar Configuración
            </Button>
          </Box>
        </Grid>

        {/* Columna derecha - Vista previa y estado */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Estado del Sistema
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: config.maintenanceMode ? '#fffde7' : '#e8f5e9' }}>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                      Modo Mantenimiento
                    </Typography>
                    <Chip 
                      label={config.maintenanceMode ? 'ACTIVO' : 'INACTIVO'} 
                      color={config.maintenanceMode ? 'warning' : 'success'} 
                      size="small"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: config.allowRegistrations ? '#e8f5e9' : '#ffebee' }}>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                      Registros
                    </Typography>
                    <Chip 
                      label={config.allowRegistrations ? 'PERMITIDOS' : 'BLOQUEADOS'} 
                      color={config.allowRegistrations ? 'success' : 'error'} 
                      size="small"
                    />
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                Resumen de Configuración
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                  Vigencia Certificaciones:
                </Typography>
                <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  {config.certificationValidity} días
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                  Días para Revisión Comité:
                </Typography>
                <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  {config.committeeReviewDays} días
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                  Umbral Semáforo Verde:
                </Typography>
                <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  {'>'} {config.yellowThreshold}%
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold' }}>
                Últimos Cambios
              </Typography>

              <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f7fa', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                  15/01/2026 10:30 AM
                </Typography>
                <Typography variant="body2">
                  Se ajustó el umbral del semáforo a {config.greenThreshold}%
                </Typography>
              </Box>

              <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f7fa', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                  14/01/2026 03:15 PM
                </Typography>
                <Typography variant="body2">
                  Se activaron las notificaciones por email
                </Typography>
              </Box>

              <Box sx={{ p: 2, bgcolor: '#f5f7fa', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                  13/01/2026 09:00 AM
                </Typography>
                <Typography variant="body2">
                  Se configuró backup automático diario
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemConfig;