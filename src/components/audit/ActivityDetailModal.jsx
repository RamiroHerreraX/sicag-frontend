// src/components/audit/ActivityDetailModal.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Chip,
  Paper,
  Grid,
  Divider,
  Avatar,
  Button
} from '@mui/material';
import {
  History as HistoryIcon,
  Info as InfoIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  Fingerprint as FingerprintIcon,
  Computer as ComputerIcon,
  Person as PersonIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const getSeverityColor = (severity) => {
  switch(severity) {
    case 'success': return '#27ae60';
    case 'info': return '#3498db';
    case 'warning': return '#f39c12';
    case 'error': return '#e74c3c';
    default: return '#7f8c8d';
  }
};

const getSeverityIcon = (severity) => {
  switch(severity) {
    case 'success': return <CheckCircleIcon sx={{ color: '#27ae60' }} />;
    case 'info': return <InfoIcon sx={{ color: '#3498db' }} />;
    case 'warning': return <WarningIcon sx={{ color: '#f39c12' }} />;
    case 'error': return <ErrorIcon sx={{ color: '#e74c3c' }} />;
    default: return <InfoIcon sx={{ color: '#7f8c8d' }} />;
  }
};

const getRoleColor = (role) => {
  switch(role) {
    case 'admin': return '#1b5e20';
    case 'comite': return '#1a237e';
    case 'agente': return '#526F78';
    case 'profesionista': return '#2ecc71';
    case 'empresario': return '#ed6c02';
    default: return '#7f8c8d';
  }
};

const ActivityDetailModal = ({ open, onClose, activity }) => {
  if (!activity) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24
        }
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid #e0e0e0',
        pb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          {getSeverityIcon(activity.severity)}
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            Detalles de la Actividad
          </Typography>
        </Box>
        <Chip 
          label={activity.severity}
          size="small"
          sx={{ 
            bgcolor: `${getSeverityColor(activity.severity)}15`,
            color: getSeverityColor(activity.severity),
            fontWeight: 'bold'
          }}
        />
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Información de la acción */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 1 }}>
              Información de la Acción
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <HistoryIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Fecha y Hora
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {activity.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <InfoIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Tipo de Acción
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {activity.actionName}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Instancia
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {activity.instanceName}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <DescriptionIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Entidad
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {activity.entity}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <FingerprintIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        ID de Entidad
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {activity.entityId}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ComputerIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        IP
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {activity.ip}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1 }}>
                Detalles completos
              </Typography>
              <Typography variant="body2" sx={{ color: '#5a6c7d' }}>
                {activity.details}
              </Typography>
            </Paper>
          </Grid>
          
          {/* Información del usuario */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 1 }}>
              Información del Usuario
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 48, 
                    height: 48, 
                    bgcolor: getRoleColor(activity.user.role),
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {activity.user.avatar}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    {activity.user.name}
                  </Typography>
                  <Chip 
                    label={activity.user.role}
                    size="small"
                    sx={{ 
                      bgcolor: `${getRoleColor(activity.user.role)}15`,
                      color: getRoleColor(activity.user.role),
                      fontWeight: 'medium',
                      mt: 0.5
                    }}
                  />
                </Box>
              </Box>
              
              <Divider sx={{ my: 1.5 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PersonIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                <Typography variant="body2" sx={{ color: '#5a6c7d' }}>
                  {activity.user.email || 'usuario@ejemplo.com'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FingerprintIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                <Typography variant="body2" sx={{ color: '#5a6c7d' }}>
                  ID: USR-00{activity.id}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          {/* Información técnica */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 1 }}>
              Información Técnica
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <ComputerIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Navegador / Dispositivo
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5a6c7d' }}>
                    {activity.userAgent || 'Chrome/Windows'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <BusinessIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Ubicación aproximada
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5a6c7d' }}>
                    {activity.location || 'México'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FingerprintIcon fontSize="small" sx={{ color: '#7f8c8d' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    ID de Sesión
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#5a6c7d' }}>
                    {activity.sessionId || 'SESS-123456789'}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          {/* Metadatos adicionales */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: '#7f8c8d', mb: 1 }}>
              Metadatos
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8f9fa' }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    ID del Evento
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    EVT-{activity.id.toString().padStart(6, '0')}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Versión
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    v2.1.0
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Módulo
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {activity.instanceName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                    Traza
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    #{activity.id}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ borderTop: '1px solid #e0e0e0', p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
        <Button 
          variant="contained" 
          startIcon={<DownloadIcon />}
        >
          Exportar Detalle
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivityDetailModal;