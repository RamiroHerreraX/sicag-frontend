import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Event as EventIcon
} from '@mui/icons-material';

const Certifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  // Datos mock de certificaciones
  const [certifications, setCertifications] = useState([
    { 
      id: 1, 
      type: 'PATENTE ADUANAL', 
      number: 'PA-2026-00145', 
      issueDate: '11/01/2026', 
      expirationDate: '11/01/2029', 
      status: 'VIGENTE',
      progress: 100,
      documents: 5,
      lastUpdate: '15/01/2026'
    },
    { 
      id: 2, 
      type: 'OPINIÓN SAT POSITIVA', 
      number: 'OS-2025-03421', 
      issueDate: '15/11/2025', 
      expirationDate: '15/11/2026', 
      status: 'POR VENCER',
      progress: 30,
      documents: 3,
      lastUpdate: '10/01/2026'
    },
    { 
      id: 3, 
      type: 'CÉDULA PROFESIONAL', 
      number: 'CP-2024-56789', 
      issueDate: '20/03/2024', 
      expirationDate: '20/03/2027', 
      status: 'VIGENTE',
      progress: 100,
      documents: 4,
      lastUpdate: '05/01/2026'
    },
    { 
      id: 4, 
      type: 'PODER NOTARIAL', 
      number: 'PN-2025-12345', 
      issueDate: '10/08/2025', 
      expirationDate: '10/08/2026', 
      status: 'OBSERVACIONES',
      progress: 60,
      documents: 2,
      lastUpdate: '08/01/2026'
    },
    { 
      id: 5, 
      type: 'CONSTANCIA FISCAL', 
      number: 'CF-2026-00123', 
      issueDate: '05/01/2026', 
      expirationDate: '05/01/2027', 
      status: 'EN REVISIÓN',
      progress: 40,
      documents: 3,
      lastUpdate: '14/01/2026'
    },
  ]);

  const stats = {
    total: certifications.length,
    valid: certifications.filter(c => c.status === 'VIGENTE').length,
    expiring: certifications.filter(c => c.status === 'POR VENCER').length,
    review: certifications.filter(c => c.status === 'EN REVISIÓN').length,
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'VIGENTE': return 'success';
      case 'POR VENCER': return 'warning';
      case 'EN REVISIÓN': return 'info';
      case 'OBSERVACIONES': return 'error';
      case 'VENCIDA': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'VIGENTE': return <CheckCircleIcon />;
      case 'POR VENCER': return <WarningIcon />;
      case 'EN REVISIÓN': return <WarningIcon />;
      case 'OBSERVACIONES': return <ErrorIcon />;
      default: return <EventIcon />;
    }
  };

  const handleDeleteClick = (cert) => {
    setSelectedCert(cert);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCert) {
      setCertifications(certifications.filter(c => c.id !== selectedCert.id));
      setDeleteDialog(false);
      setSelectedCert(null);
    }
  };

  const filteredCerts = certifications.filter(cert => {
    const matchesSearch = 
      cert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      cert.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            Mis Certificaciones
          </Typography>
          <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
            Gestiona todas tus certificaciones en el sistema SICAG
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/certifications/new"
          sx={{ bgcolor: '#2c3e50', '&:hover': { bgcolor: '#34495e' } }}
        >
          Nueva Certificación
        </Button>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #3498db' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#3498db', fontWeight: 'bold', mb: 1 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Total Certificaciones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #2ecc71' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#2ecc71', fontWeight: 'bold', mb: 1 }}>
                {stats.valid}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Vigentes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #f39c12' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#f39c12', fontWeight: 'bold', mb: 1 }}>
                {stats.expiring}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                Por Vencer
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderLeft: '4px solid #e74c3c' }}>
            <CardContent>
              <Typography variant="h3" sx={{ color: '#e74c3c', fontWeight: 'bold', mb: 1 }}>
                {stats.review}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                En Revisión
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros y búsqueda */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar por tipo o número..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              select
              label="Filtrar por estado"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">Todos los estados</MenuItem>
              <MenuItem value="VIGENTE">Vigentes</MenuItem>
              <MenuItem value="POR VENCER">Por Vencer</MenuItem>
              <MenuItem value="EN REVISIÓN">En Revisión</MenuItem>
              <MenuItem value="OBSERVACIONES">Observaciones</MenuItem>
              <MenuItem value="VENCIDA">Vencidas</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              Exportar Lista
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de certificaciones */}
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f7fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Tipo de Certificación</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Número</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Emisión / Vencimiento</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Progreso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Documentos</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Última Actualización</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCerts.map((cert) => (
                <TableRow key={cert.id} hover>
                  <TableCell>
                    <Typography sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {cert.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      {cert.number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block' }}>
                        Emisión: {cert.issueDate}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: cert.status === 'POR VENCER' ? '#f39c12' : '#7f8c8d',
                        display: 'block'
                      }}>
                        Vence: {cert.expirationDate}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={cert.status}
                      color={getStatusColor(cert.status)}
                      icon={getStatusIcon(cert.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box 
                          sx={{ 
                            height: 8, 
                            width: '100%', 
                            bgcolor: '#f0f0f0',
                            borderRadius: 4,
                            overflow: 'hidden'
                          }}
                        >
                          <Box 
                            sx={{ 
                              height: '100%', 
                              width: `${cert.progress}%`,
                              bgcolor: 
                                cert.progress > 70 ? '#2ecc71' :
                                cert.progress > 30 ? '#f39c12' : '#e74c3c'
                            }}
                          />
                        </Box>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        {cert.progress}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography align="center" sx={{ fontWeight: 'bold' }}>
                      {cert.documents}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      {cert.lastUpdate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton 
                        size="small" 
                        component={Link}
                        to={`/certifications/${cert.id}`}
                        sx={{ color: '#3498db' }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        sx={{ color: '#f39c12' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteClick(cert)}
                        sx={{ color: '#e74c3c' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar la certificación "{selectedCert?.type}"?
          </Typography>
          <Typography variant="body2" sx={{ color: '#e74c3c', mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Información adicional */}
      <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: '#f8f9fa' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
              📋 Guía Rápida
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              • <strong>Vigente:</strong> Certificación activa y válida<br />
              • <strong>Por Vencer:</strong> Vence en menos de 90 días<br />
              • <strong>En Revisión:</strong> En proceso de validación por el comité<br />
              • <strong>Observaciones:</strong> Requiere atención o documentación adicional
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
              ⚡ Acciones Disponibles
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
              • <strong>Ver:</strong> Consultar detalles completos<br />
              • <strong>Editar:</strong> Modificar información (si está permitido)<br />
              • <strong>Eliminar:</strong> Remover certificación (solo si no ha sido validada)<br />
              • <strong>Nueva:</strong> Registrar nueva certificación
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Certifications;