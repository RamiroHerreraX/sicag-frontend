// src/pages/admin/SystemConfig.jsx
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
  Tabs,
  Tab,
  Stack,
  IconButton,
  Tooltip,
  LinearProgress,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel
} from '@mui/material';
import {
  Save as SaveIcon,
  Restore as RestoreIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Timer as TimerIcon,
  Assessment as AssessmentIcon,
  Backup as BackupIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  History as HistoryIcon,
  Help as HelpIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  DataThresholding as DataThresholdingIcon
} from '@mui/icons-material';

const SystemConfig = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [config, setConfig] = useState({
    // General
    systemName: 'SICAG',
    maintenanceMode: false,
    allowRegistrations: true,
    maxLoginAttempts: 3,
    sessionTimeout: 30,
    
    // Certificaciones
    certificationValidity: 365,
    renewalWarningDays: 30,
    maxCertificationsPerUser: 10,
    autoRenewal: true,
    
    // Comité
    committeeReviewDays: 5,
    requiredCommitteeApprovals: 2,
    autoEscalationDays: 3,
    committeeQuorum: 3,
    
    // Notificaciones
    emailNotifications: true,
    smsNotifications: false,
    renewalAlerts: true,
    committeeAlerts: true,
    systemAlerts: true,
    alertFrequency: 'daily',
    
    // Semáforo
    greenThreshold: 90,
    yellowThreshold: 70,
    redThreshold: 50,
    autoRecalculation: true,
    
    // Backup
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: 30,
    cloudBackup: false,
    
    // Seguridad
    passwordExpiry: 90,
    twoFactorAuth: false,
    ipWhitelist: false,
    auditLogRetention: 365
  });

  const [changes, setChanges] = useState([]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const oldValue = config[field];
    
    setConfig({
      ...config,
      [field]: value
    });

    // Registrar cambio
    setChanges(prev => [...prev, {
      field,
      oldValue,
      newValue: value,
      timestamp: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    }]);
  };

  const handleSliderChange = (field) => (event, newValue) => {
    const oldValue = config[field];
    
    setConfig({
      ...config,
      [field]: newValue
    });

    setChanges(prev => [...prev, {
      field,
      oldValue,
      newValue,
      timestamp: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    }]);
  };

  const handleSave = () => {
    // Simular guardado
    setTimeout(() => {
      alert('Configuración guardada exitosamente');
      setChanges([]);
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('¿Está seguro de restaurar todos los valores por defecto?')) {
      setConfig({
        systemName: 'SICAG',
        maintenanceMode: false,
        allowRegistrations: true,
        maxLoginAttempts: 3,
        sessionTimeout: 30,
        certificationValidity: 365,
        renewalWarningDays: 30,
        maxCertificationsPerUser: 10,
        autoRenewal: true,
        committeeReviewDays: 5,
        requiredCommitteeApprovals: 2,
        autoEscalationDays: 3,
        committeeQuorum: 3,
        emailNotifications: true,
        smsNotifications: false,
        renewalAlerts: true,
        committeeAlerts: true,
        systemAlerts: true,
        alertFrequency: 'daily',
        greenThreshold: 90,
        yellowThreshold: 70,
        redThreshold: 50,
        autoRecalculation: true,
        autoBackup: true,
        backupFrequency: 'daily',
        backupTime: '02:00',
        retentionDays: 30,
        cloudBackup: false,
        passwordExpiry: 90,
        twoFactorAuth: false,
        ipWhitelist: false,
        auditLogRetention: 365
      });
      setChanges([]);
    }
  };

  const tabs = [
    { label: 'General', icon: <AssessmentIcon /> },
    { label: 'Certificaciones', icon: <TimerIcon /> },
    { label: 'Comité', icon: <SecurityIcon /> },
    { label: 'Notificaciones', icon: <NotificationsIcon /> },
    { label: 'Semáforo', icon: <DataThresholdingIcon /> },
    { label: 'Backup', icon: <BackupIcon /> },
    { label: 'Seguridad', icon: <LockIcon /> },
  ];

  const getSystemHealth = () => {
    let score = 100;
    if (config.maintenanceMode) score -= 10;
    if (!config.autoBackup) score -= 20;
    if (!config.emailNotifications) score -= 5;
    if (config.retentionDays < 7) score -= 15;
    if (!config.twoFactorAuth) score -= 10;
    
    return Math.max(0, score);
  };

  const systemHealth = getSystemHealth();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
              Configuración del Sistema
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              Configure los parámetros globales del sistema SICAG
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<RestoreIcon />}
              onClick={handleReset}
              size="small"
            >
              Restaurar
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={changes.length === 0}
              sx={{ minWidth: 180 }}
            >
              Guardar Cambios ({changes.length})
            </Button>
          </Stack>
        </Box>

        {/* Alertas */}
        <Alert 
          severity="info" 
          icon={<WarningIcon />}
          sx={{ mb: 2 }}
        >
          Los cambios en la configuración afectarán a todos los usuarios del sistema. Cambios no guardados: {changes.length}
        </Alert>

        {/* Estado del sistema */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderLeft: '4px solid #3498db' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold', mb: 1 }}>
                  {systemHealth}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 1 }}>
                  Salud del Sistema
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={systemHealth}
                  sx={{ 
                    height: 6,
                    borderRadius: 3,
                    bgcolor: '#f0f0f0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: systemHealth >= 80 ? '#27ae60' : 
                              systemHealth >= 60 ? '#f39c12' : '#e74c3c'
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderLeft: `4px solid ${config.maintenanceMode ? '#f39c12' : '#27ae60'}` }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {config.maintenanceMode ? 'ACTIVO' : 'INACTIVO'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Mantenimiento
                    </Typography>
                  </Box>
                  {config.maintenanceMode ? 
                    <WarningIcon sx={{ color: '#f39c12' }} /> : 
                    <CheckCircleIcon sx={{ color: '#27ae60' }} />
                  }
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderLeft: '4px solid #9b59b6' }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ color: '#9b59b6', fontWeight: 'bold', mb: 1 }}>
                  {config.certificationValidity}d
                </Typography>
                <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                  Vigencia Certificaciones
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderLeft: `4px solid ${config.autoBackup ? '#27ae60' : '#e74c3c'}` }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {config.autoBackup ? 'ACTIVO' : 'INACTIVO'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Backup Automático
                    </Typography>
                  </Box>
                  {config.autoBackup ? 
                    <CheckCircleIcon sx={{ color: '#27ae60' }} /> : 
                    <ErrorIcon sx={{ color: '#e74c3c' }} />
                  }
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <Grid container spacing={2} sx={{ flex: 1 }}>
          {/* Columna izquierda - Configuración */}
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={activeTab} 
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {tabs.map((tab, index) => (
                    <Tab 
                      key={index}
                      icon={tab.icon}
                      iconPosition="start"
                      label={tab.label}
                      sx={{ 
                        minHeight: 48,
                        textTransform: 'none',
                        fontSize: '0.9rem'
                      }}
                    />
                  ))}
                </Tabs>
              </Box>

              {/* Contenido de los tabs */}
              <Box sx={{ p: 3, flex: 1, overflowY: 'auto' }}>
                {activeTab === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Nombre del Sistema"
                        value={config.systemName}
                        onChange={handleChange('systemName')}
                        helperText="Nombre que se muestra en la aplicación"
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
                      <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', ml: 4 }}>
                        Bloquea el acceso a todos los usuarios excepto administradores
                      </Typography>
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
                        label="Permitir Nuevos Registros"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Límite de Intentos de Login"
                        type="number"
                        value={config.maxLoginAttempts}
                        onChange={handleChange('maxLoginAttempts')}
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Timeout de Sesión (min)"
                        type="number"
                        value={config.sessionTimeout}
                        onChange={handleChange('sessionTimeout')}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">min</InputAdornment>,
                        }}
                      />
                    </Grid>
                  </Grid>
                )}

                {activeTab === 1 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2 }}>
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
                      <Typography variant="caption" sx={{ color: '#7f8c8d', textAlign: 'center', display: 'block' }}>
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
                        helperText="Días previos al vencimiento para alertar"
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
                    
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={config.autoRenewal}
                            onChange={handleChange('autoRenewal')}
                            color="primary"
                          />
                        }
                        label="Renovación Automática"
                      />
                      <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', ml: 4 }}>
                        Renueva automáticamente certificaciones con evidencia válida
                      </Typography>
                    </Grid>
                  </Grid>
                )}

                {activeTab === 2 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Días para Revisión"
                        type="number"
                        value={config.committeeReviewDays}
                        onChange={handleChange('committeeReviewDays')}
                        helperText="Días máximos para revisión"
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
                        helperText="Mínimo de miembros para aprobación"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Escalación Automática"
                        type="number"
                        value={config.autoEscalationDays}
                        onChange={handleChange('autoEscalationDays')}
                        helperText="Días para escalar a supervisor"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">días</InputAdornment>,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Quórum Mínimo"
                        type="number"
                        value={config.committeeQuorum}
                        onChange={handleChange('committeeQuorum')}
                        helperText="Miembros mínimos para reunión"
                      />
                    </Grid>
                  </Grid>
                )}

                {activeTab === 3 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2 }}>
                        Configuración de Notificaciones
                      </Typography>
                    </Grid>
                    
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
                            checked={config.smsNotifications}
                            onChange={handleChange('smsNotifications')}
                            color="primary"
                          />
                        }
                        label="Notificaciones por SMS"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
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
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Frecuencia de Alertas"
                        value={config.alertFrequency}
                        onChange={handleChange('alertFrequency')}
                      >
                        <MenuItem value="immediate">Inmediato</MenuItem>
                        <MenuItem value="hourly">Cada hora</MenuItem>
                        <MenuItem value="daily">Diario</MenuItem>
                        <MenuItem value="weekly">Semanal</MenuItem>
                      </TextField>
                    </Grid>
                  </Grid>
                )}

                {activeTab === 4 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 2 }}>
                        Umbrales del Semáforo de Cumplimiento
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 3 }}>
                        Configure los porcentajes mínimos para cada nivel del semáforo
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ px: 2 }}>
                        <Slider
                          value={[config.redThreshold, config.yellowThreshold, config.greenThreshold]}
                          onChange={(event, newValue) => {
                            handleSliderChange('redThreshold')(event, newValue[0]);
                            handleSliderChange('yellowThreshold')(event, newValue[1]);
                            handleSliderChange('greenThreshold')(event, newValue[2]);
                          }}
                          min={0}
                          max={100}
                          step={5}
                          valueLabelDisplay="auto"
                          disableSwap
                        />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                            <ErrorIcon sx={{ color: '#e74c3c', fontSize: 32, mb: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: '#e74c3c', fontWeight: 'bold' }}>
                              ROJO
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#e74c3c' }}>
                              {'<'} {config.redThreshold}%
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fffde7' }}>
                            <WarningIcon sx={{ color: '#f39c12', fontSize: 32, mb: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: '#f39c12', fontWeight: 'bold' }}>
                              AMARILLO
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#f39c12' }}>
                              {config.redThreshold}% - {config.yellowThreshold}%
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                            <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 32, mb: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                              VERDE
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#27ae60' }}>
                              {'>'} {config.yellowThreshold}%
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                    
                    <Grid item xs={12} sx={{ mt: 3 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={config.autoRecalculation}
                            onChange={handleChange('autoRecalculation')}
                            color="primary"
                          />
                        }
                        label="Cálculo Automático"
                      />
                      <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', ml: 4 }}>
                        Recalcula automáticamente el semáforo cuando cambian las certificaciones
                      </Typography>
                    </Grid>
                  </Grid>
                )}

                {activeTab === 5 && (
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
                            label="Hora del Backup"
                            type="time"
                            value={config.backupTime}
                            onChange={handleChange('backupTime')}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ step: 300 }} // 5 min
                          />
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
                        
                        <Grid item xs={12} sm={6}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={config.cloudBackup}
                                onChange={handleChange('cloudBackup')}
                                color="primary"
                              />
                            }
                            label="Backup en la Nube"
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                )}

                {activeTab === 6 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Expiración de Contraseña"
                        type="number"
                        value={config.passwordExpiry}
                        onChange={handleChange('passwordExpiry')}
                        helperText="Días para forzar cambio de contraseña"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">días</InputAdornment>,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={config.twoFactorAuth}
                            onChange={handleChange('twoFactorAuth')}
                            color="primary"
                          />
                        }
                        label="Autenticación de Dos Factores"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={config.ipWhitelist}
                            onChange={handleChange('ipWhitelist')}
                            color="primary"
                          />
                        }
                        label="Lista Blanca de IPs"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Retención Auditoría"
                        type="number"
                        value={config.auditLogRetention}
                        onChange={handleChange('auditLogRetention')}
                        helperText="Días de retención de logs"
                        InputProps={{
                          endAdornment: <InputAdornment position="end">días</InputAdornment>,
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Columna derecha - Vista previa y cambios */}
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* Vista previa del sistema */}
            <Paper elevation={1} sx={{ p: 2, mb: 2, flex: 1 }}>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
                Vista Previa del Sistema
              </Typography>
              
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Nombre del Sistema:
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      {config.systemName}
                    </Typography>
                  </Paper>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Estado Actual:
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: config.maintenanceMode ? '#fffde7' : '#e8f5e9' }}>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                          Mantenimiento
                        </Typography>
                        <Chip 
                          label={config.maintenanceMode ? 'ACTIVO' : 'INACTIVO'} 
                          size="small"
                          color={config.maintenanceMode ? 'warning' : 'success'}
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: config.allowRegistrations ? '#e8f5e9' : '#ffebee' }}>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                          Registros
                        </Typography>
                        <Chip 
                          label={config.allowRegistrations ? 'PERMITIDOS' : 'BLOQUEADOS'} 
                          size="small"
                          color={config.allowRegistrations ? 'success' : 'error'}
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
                
                <Divider />
                
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                    Resumen de Configuración:
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Vigencia Certificaciones:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {config.certificationValidity} días
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Días Revisión Comité:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {config.committeeReviewDays} días
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Umbral Semáforo Verde:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        {'>'} {config.yellowThreshold}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Backup Automático:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 'bold', color: config.autoBackup ? '#27ae60' : '#e74c3c' }}>
                        {config.autoBackup ? 'ACTIVO' : 'INACTIVO'}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </Paper>

            {/* Historial de cambios */}
            <Paper elevation={1} sx={{ p: 2, flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Cambios Recientes
                </Typography>
                <Chip 
                  label={`${changes.length} cambios`}
                  size="small"
                  color="primary"
                />
              </Box>
              
              {changes.length > 0 ? (
                <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                  {changes.slice(0, 5).map((change, index) => (
                    <Paper 
                      key={index} 
                      sx={{ 
                        p: 1.5, 
                        mb: 1,
                        bgcolor: '#f8f9fa',
                        borderLeft: '3px solid #3498db'
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                          {change.field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                          {change.timestamp}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        De: {change.oldValue} → A: {change.newValue}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 48, mb: 2 }} />
                  <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                    No hay cambios pendientes
                  </Typography>
                </Box>
              )}
              
              {changes.length > 5 && (
                <Button
                  fullWidth
                  variant="text"
                  size="small"
                  sx={{ mt: 2 }}
                >
                  Ver todos los cambios ({changes.length})
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SystemConfig;