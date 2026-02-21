import React, { useState, useRef } from 'react'; 
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  LinearProgress,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  Pagination
} from '@mui/material';
import {
  People as PeopleIcon,
  Description as DescriptionIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  Verified as VerifiedIcon,
  Folder as FolderIcon
} from '@mui/icons-material';


const AssociationDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
    const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const tableRef = useRef(null);

  // Datos de la asociación
  const associationData = {
    info: {
      id: 'ASOC-001',
      name: 'Asociación Aduanal del Norte, S.A. de C.V.',
      region: 'Norte',
      rfc: 'AAN240101XYZ',
      status: 'Activa',
      membersCount: 45,
      startDate: '15/01/2020',
      compliance: 94
    },
    areas: [
      { 
        title: 'Agentes Activos', 
        value: '32', 
        change: '+3', 
        icon: PeopleIcon,
        color: '#2563eb', 
        detail: 'Meta: 35',
        progress: 91
      },
      { 
        title: 'Pendientes Aprobación', 
        value: '8', 
        change: '-2', 
        icon: WarningIcon,
        color: '#dc2626', 
        detail: 'Reducción semanal',
        progress: 80
      }
    ],
    metrics: [
      { name: 'Cumplimiento de Declaraciones', value: 96, target: 95, status: 'excelente', icon: DescriptionIcon },
      { name: 'Cumplimiento Certificaciones', value: 88, target: 90, status: 'regular', icon: VerifiedIcon },
      { name: 'Cumplimiento de Expedientes', value: 91, target: 90, status: 'excelente', icon: FolderIcon }
    ],
    members: [
      { id: 'AA-001', name: 'Luis Rodríguez', role: 'Agente Aduanal', compliance: 98, status: 'activo' },
    { id: 'AA-002', name: 'María López', role: 'Agente Aduanal', compliance: 87, status: 'activo' },
    { id: 'AA-003', name: 'Carlos Pérez', role: 'Agente Aduanal', compliance: 92, status: 'activo' },
    { id: 'AA-004', name: 'Ana Gómez', role: 'Agente Aduanal', compliance: 75, status: 'pendiente' },
    { id: 'AA-005', name: 'Jorge Hernández', role: 'Agente Aduanal', compliance: 65, status: 'inactivo' },
    { id: 'AA-006', name: 'Sofía Martínez', role: 'Agente Aduanal', compliance: 88, status: 'activo' },
    { id: 'AA-007', name: 'Ricardo Torres', role: 'Agente Aduanal', compliance: 90, status: 'activo' },
    { id: 'AA-008', name: 'Lucía Fernández', role: 'Agente Aduanal', compliance: 80, status: 'pendiente' },
    { id: 'AA-009', name: 'Fernando Castillo', role: 'Agente Aduanal', compliance: 70, status: 'inactivo' },
    { id: 'AA-010', name: 'Patricia Ruiz', role: 'Agente Aduanal', compliance: 95, status: 'activo' },
    { id: 'AA-011', name: 'Miguel Ramírez', role: 'Agente Aduanal', compliance: 85, status: 'activo' },
    { id: 'AA-012', name: 'Gabriela Sánchez', role: 'Agente Aduanal', compliance: 77, status: 'pendiente' },
    { id: 'AA-013', name: 'Eduardo Jiménez', role: 'Agente Aduanal', compliance: 69, status: 'inactivo' },
    { id: 'AA-014', name: 'Valeria Ortega', role: 'Agente Aduanal', compliance: 93, status: 'activo' },
    { id: 'AA-015', name: 'Diego Morales', role: 'Agente Aduanal', compliance: 82, status: 'activo' },
    ]
  };

  
  const getStatusColor = (status) => {
    const colors = {
      excelente: '#059669',
      regular: '#d97706',
      activo: '#059669',
      inactivo: '#6b7280',
      pendiente: '#d97706'
    };
    return colors[status] || colors.inactivo;
  };

    // Paginar miembros
  const paginatedMembers = associationData.members.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(associationData.members.length / rowsPerPage);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f3f4f6',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header de la Asociación */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 4,
            borderRadius: 3,
            border: '1px solid #e5e7eb'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ 
                  p: 1.5, 
                  bgcolor: '#2563eb', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BusinessIcon sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
                    {associationData.info.name}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip 
                      label={associationData.info.status}
                      size="small"
                      sx={{ 
                        bgcolor: '#d1fae5',
                        color: '#065f46',
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      RFC: {associationData.info.rfc} • ID: {associationData.info.id}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon sx={{ color: '#6b7280', fontSize: 18 }} />
                      <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                        {associationData.info.region}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PeopleIcon sx={{ color: '#6b7280', fontSize: 18 }} />
                      <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                        {associationData.info.membersCount} agentes
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon sx={{ color: '#6b7280', fontSize: 18 }} />
                      <Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>
                        Desde {associationData.info.startDate}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Grid>

         
          </Grid>
         
        </Paper>

<Grid container sx={{ mb: 4, display: 'flex', flexWrap: 'nowrap', gap: 2 }}>
  {associationData.areas.concat(associationData.metrics).map((item, index) => {
    const IconComponent = item.icon;
    return (
      <Box key={index} sx={{ flex: '0 0 19%', minWidth: 0 }}> {/* Ajuste para que no se salga */}
        <Card
          sx={{
            borderRadius: 3,
            border: '1px solid #e5e7eb',
            boxShadow: 'none',
            transition: 'all 0.2s',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    p: 1,
                    bgcolor: `${item.color ? item.color + '10' : getStatusColor(item.status) + '10'}`,
                    borderRadius: 2,
                  }}
                >
                  <IconComponent
                    sx={{ color: item.color || getStatusColor(item.status), fontSize: 24 }}
                  />
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#111827' }}>
                  {item.title || item.name}
                </Typography>
              </Box>
              {item.change && (
                <Chip
                  label={item.change}
                  size="small"
                  sx={{
                    bgcolor: item.change.includes('+') ? '#d1fae5' : '#fee2e2',
                    color: item.change.includes('+') ? '#065f46' : '#991b1b',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />
              )}
            </Box>

            {item.value && (
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#111827' }}>
                  {item.value}
                </Typography>
                {item.detail && (
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    {item.detail}
                  </Typography>
                )}
              </Box>
            )}

            {item.progress && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={item.progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: item.color || getStatusColor(item.status),
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            )}

            {item.target && item.value && (
              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                Meta: {item.target}%
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  })}
</Grid>

        {/* Tabla de Agentes */}
  <Paper sx={{ borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'hidden', mb: 4 }}>
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
              Agentes de la Asociación
            </Typography>
          </Box>

          <TableContainer ref={tableRef}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Agente</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>ID Agente</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Rol</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Cumplimiento</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedMembers.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 36, height: 36, bgcolor: getStatusColor(member.status), fontSize: '0.875rem', fontWeight: 600 }}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827' }}>
                          {member.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell><Typography variant="body2" sx={{ color: '#6b7280' }}>{member.id}</Typography></TableCell>
                    <TableCell>
                      <Chip label={member.role} size="small" sx={{ bgcolor: '#f3f4f6', color: '#374151', fontWeight: 500, fontSize: '0.75rem' }} />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#059669' }}>{member.compliance}%</Typography>
                        {member.compliance >= 95 && <CheckCircleIcon sx={{ color: '#059669', fontSize: 16 }} />}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={member.status} 
                        size="small" 
                        sx={{ 
                          bgcolor: member.status === 'activo' ? '#d1fae5' : '#fee2e2',
                          color: member.status === 'activo' ? '#065f46' : '#991b1b',
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" sx={{ color: '#6b7280' }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginación */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={(e, value) => {
                  setPage(value);
                  tableRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                color="primary"
              />
            </Box>
          )}
        </Paper>

      </Container>
    </Box>
  );
};

export default AssociationDashboard;