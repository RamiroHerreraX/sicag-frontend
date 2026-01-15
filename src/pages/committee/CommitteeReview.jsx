import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Gavel as GavelIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Place as PlaceIcon
} from '@mui/icons-material';

const CommitteeReview = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedCertification, setSelectedCertification] = useState(null);

  // Datos mock de certificaciones para revisión
  const certifications = [
    { 
      id: 1, 
      type: 'PATENTE ADUANAL', 
      applicant: 'Luis Rodríguez', 
      region: 'Norte', 
      uploadDate: '15/01/2026', 
      status: 'PENDIENTE', 
      priority: 'ALTA',
      documents: 5,
      daysPending: 2
    },
    { 
      id: 2, 
      type: 'OPINIÓN SAT', 
      applicant: 'Carlos Martínez', 
      region: 'Sur', 
      uploadDate: '14/01/2026', 
      status: 'EN REVISIÓN', 
      priority: 'MEDIA',
      documents: 3,
      daysPending: 3
    },
    { 
      id: 3, 
      type: 'CÉDULA PROFESIONAL', 
      applicant: 'Ana López', 
      region: 'Centro', 
      uploadDate: '13/01/2026', 
      status: 'PENDIENTE', 
      priority: 'BAJA',
      documents: 4,
      daysPending: 4
    },
    { 
      id: 4, 
      type: 'PODER NOTARIAL', 
      applicant: 'Pedro Sánchez', 
      region: 'Metropolitana', 
      uploadDate: '12/01/2026', 
      status: 'REQUIERE INFO', 
      priority: 'ALTA',
      documents: 2,
      daysPending: 5
    },
    { 
      id: 5, 
      type: 'CONSTANCIA FISCAL', 
      applicant: 'Laura Díaz', 
      region: 'Norte', 
      uploadDate: '11/01/2026', 
      status: 'PENDIENTE', 
      priority: 'MEDIA',
      documents: 6,
      daysPending: 6
    },
  ];

  const handleReview = (id) => {
    const cert = certifications.find(c => c.id === id);
    setSelectedCertification(cert);
    // En una implementación real, redirigiría a la página de revisión detallada
    window.location.href = `/committee/certifications/${id}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDIENTE': return 'warning';
      case 'EN REVISIÓN': return 'info';
      case 'REQUIERE INFO': return 'error';
      case 'APROBADA': return 'success';
      case 'RECHAZADA': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'ALTA': return 'error';
      case 'MEDIA': return 'warning';
      case 'BAJA': return 'success';
      default: return 'default';
    }
  };

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = 
      cert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.applicant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      cert.status === filter ||
      cert.priority === filter;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    pending: certifications.filter(c => c.status === 'PENDIENTE').length,
    inReview: certifications.filter(c => c.status === 'EN REVISIÓN').length,
    requiresInfo: certifications.filter(c => c.status === 'REQUIERE INFO').length,
    total: certifications.length
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          Revisión de Certificaciones
        </Typography>
        <Typography variant="body1" sx={{ color: '#7f8c8d' }}>
          Comité de Cumplimiento - Validación de certificaciones
        </Typography>
      </Box>

      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff3e0' }}>
            <CardContent>
              <Typography variant="h3" align="center" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                {stats.pending}
              </Typography>
              <Typography variant="body2" align="center" sx={{ color: '#7f8c8d' }}>
                Pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h3" align="center" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                {stats.inReview}
              </Typography>
              <Typography variant="body2" align="center" sx={{ color: '#7f8c8d' }}>
                En Revisión
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#ffebee' }}>
            <CardContent>
              <Typography variant="h3" align="center" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                {stats.requiresInfo}
              </Typography>
              <Typography variant="body2" align="center" sx={{ color: '#7f8c8d' }}>
                Requieren Info
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h3" align="center" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" align="center" sx={{ color: '#7f8c8d' }}>
                Total
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
              placeholder="Buscar por tipo o solicitante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: '#7f8c8d' }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filtrar por</InputLabel>
              <Select
                value={filter}
                label="Filtrar por"
                onChange={(e) => setFilter(e.target.value)}
                startAdornment={<FilterIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="PENDIENTE">Pendientes</MenuItem>
                <MenuItem value="EN REVISIÓN">En Revisión</MenuItem>
                <MenuItem value="REQUIERE INFO">Requiere Info</MenuItem>
                <MenuItem value="ALTA">Prioridad Alta</MenuItem>
                <MenuItem value="MEDIA">Prioridad Media</MenuItem>
                <MenuItem value="BAJA">Prioridad Baja</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              Exportar Reporte
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabla de certificaciones */}
      <Paper elevation={1}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#1a237e', color: 'white' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tipo</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Asociado</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Región</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha de Carga</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estatus</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Prioridad</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Documentos</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Días</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Evaluar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCertifications.map((cert) => (
                <TableRow key={cert.id} hover>
                  <TableCell>
                    <Typography sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      {cert.type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PersonIcon sx={{ color: '#7f8c8d', fontSize: 16 }} />
                      <Typography>{cert.applicant}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PlaceIcon sx={{ color: '#7f8c8d', fontSize: 16 }} />
                      <Typography>{cert.region}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EventIcon sx={{ color: '#7f8c8d', fontSize: 16 }} />
                      <Typography>{cert.uploadDate}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={cert.status}
                      color={getStatusColor(cert.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={cert.priority}
                      color={getPriorityColor(cert.priority)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography align="center" sx={{ fontWeight: 'bold' }}>
                      {cert.documents}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      align="center" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: cert.daysPending > 5 ? '#e74c3c' : 
                               cert.daysPending > 3 ? '#f39c12' : '#27ae60'
                      }}
                    >
                      {cert.daysPending} días
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<GavelIcon />}
                      onClick={() => handleReview(cert.id)}
                      sx={{ 
                        bgcolor: '#1a237e',
                        '&:hover': { bgcolor: '#283593' }
                      }}
                    >
                      Revisar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Instrucciones */}
      <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: '#f5f7fa' }}>
        <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold' }}>
          Instrucciones del Comité
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                Procedimiento de Revisión:
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                1. Verificar documentación completa<br />
                2. Validar autenticidad de documentos<br />
                3. Revisar cumplimiento de requisitos<br />
                4. Calificar como Aprobada/Rechazada<br />
                5. Registrar observaciones si aplica
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                Criterios de Prioridad:
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                • <strong style={{ color: '#e74c3c' }}>ALTA:</strong> Vencimiento próximo o requerimientos críticos<br />
                • <strong style={{ color: '#f39c12' }}>MEDIA:</strong> Requiere validación adicional<br />
                • <strong style={{ color: '#27ae60' }}>BAJA:</strong> Sin observaciones o vencimiento lejano
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CommitteeReview;