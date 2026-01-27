import React, { useState } from 'react';
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
  Badge,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  People as PeopleIcon,
  Description as DescriptionIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Assignment as AssignmentIcon,
  AccountBalance as BalanceIcon,
  Receipt as ReceiptIcon,
  VerifiedUser as VerifiedIcon,
  CalendarToday as CalendarIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const AssociationDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [viewMode, setViewMode] = useState('overview');

  // Datos de la asociación actual
  const currentAssociation = {
    id: 'ASOC-001',
    name: 'Asociación Aduanal del Norte, S.A. de C.V.',
    region: 'Norte',
    rfc: 'AAN240101XYZ',
    status: 'Activa',
    membersCount: 45,
    startDate: '15/01/2020',
    compliance: 94
  };

  // Datos mock optimizados para vista de asociación
  const associationStats = [
    { 
      title: 'Agentes Activos', 
      value: '28', 
      change: '+3', 
      icon: PeopleIcon,
      color: '#3498db', 
      trend: 'up', 
      detail: 'De 32 totales',
      target: 35
    },
    { 
      title: 'Operaciones Hoy', 
      value: '156', 
      change: '+12%', 
      icon: ReceiptIcon,
      color: '#2ecc71', 
      trend: 'up', 
      detail: 'Meta: 180 diarias',
      target: 180
    },
    { 
      title: 'Pendientes Aprobación', 
      value: '14', 
      change: '-2', 
      icon: WarningIcon,
      color: '#f39c12', 
      trend: 'down', 
      detail: 'Reducción semanal',
      target: 10
    },
    { 
      title: 'Cumplimiento SAT', 
      value: '96%', 
      change: '+1.5%', 
      icon: TrendingUpIcon,
      color: '#9b59b6', 
      trend: 'up', 
      detail: 'Óptimo: >95%',
      target: 95
    },
  ];

  // Miembros de la asociación
  const associationMembers = [
    { id: 1, name: 'Luis Rodríguez', role: 'Agente Aduanal', status: 'Activo', compliance: 98, pending: 0, lastActivity: '15 min', avatar: 'LR', agentId: 'AA-001' },
    { id: 2, name: 'Ana Martínez', role: 'Agente Senior', status: 'Activo', compliance: 95, pending: 2, lastActivity: '30 min', avatar: 'AM', agentId: 'AA-002' },
    { id: 3, name: 'Carlos López', role: 'Agente', status: 'Activo', compliance: 92, pending: 1, lastActivity: '1 h', avatar: 'CL', agentId: 'AA-003' },
    { id: 4, name: 'María Sánchez', role: 'Agente Junior', status: 'Inactivo', compliance: 85, pending: 3, lastActivity: '2 días', avatar: 'MS', agentId: 'AA-004' },
    { id: 5, name: 'Pedro Ramírez', role: 'Agente Aduanal', status: 'Activo', compliance: 96, pending: 0, lastActivity: '45 min', avatar: 'PR', agentId: 'AA-005' },
    { id: 6, name: 'Laura González', role: 'Supervisor', status: 'Activo', compliance: 99, pending: 0, lastActivity: '20 min', avatar: 'LG', agentId: 'AA-006' },
  ];

  const complianceMetrics = [
    { metric: 'Tiempo Respuesta SAT', current: 92, target: 90, status: 'excelente' },
    { metric: 'Exactitud Declaraciones', current: 96, target: 95, status: 'excelente' },
    { metric: 'Cumplimiento Plazos', current: 88, target: 90, status: 'regular' },
    { metric: 'Satisfacción Clientes', current: 91, target: 90, status: 'excelente' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'excelente': return '#27ae60';
      case 'bueno': return '#2ecc71';
      case 'regular': return '#f39c12';
      case 'critico': return '#e74c3c';
      case 'Activo': return '#27ae60';
      case 'Inactivo': return '#e74c3c';
      case 'Pendiente': return '#f39c12';
      default: return '#7f8c8d';
    }
  };

  return (
    <Box sx={{ 
      p: 2.5,
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      {/* Header de la asociación */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ 
          p: 2, 
          backgroundColor: 'white', 
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          mb: 2
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <BusinessIcon sx={{ color: '#3498db', fontSize: 32 }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                    {currentAssociation.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                    <Chip 
                      label={currentAssociation.status}
                      color="success"
                      size="small"
                    />
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      RFC: {currentAssociation.rfc} • ID: {currentAssociation.id}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
              
              <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon sx={{ color: '#7f8c8d', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 'medium' }}>
                    {currentAssociation.region}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon sx={{ color: '#7f8c8d', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 'medium' }}>
                    {currentAssociation.membersCount} agentes
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon sx={{ color: '#7f8c8d', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 'medium' }}>
                    Desde {currentAssociation.startDate}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Período</InputLabel>
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  label="Período"
                >
                  <MenuItem value="day">Hoy</MenuItem>
                  <MenuItem value="week">Esta semana</MenuItem>
                  <MenuItem value="month">Este mes</MenuItem>
                  <MenuItem value="quarter">Este trimestre</MenuItem>
                  <MenuItem value="year">Este año</MenuItem>
                </Select>
              </FormControl>
              
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newValue) => newValue && setViewMode(newValue)}
                size="small"
              >
                <ToggleButton value="overview">
                  Vista General
                </ToggleButton>
                <ToggleButton value="details">
                  Detalles
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Indicador de cumplimiento general */}
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #ecf0f1' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Cumplimiento General de la Asociación
              </Typography>
              <Typography variant="h5" sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                {currentAssociation.compliance}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={currentAssociation.compliance}
              sx={{ 
                height: 10,
                borderRadius: 5,
                backgroundColor: '#ecf0f1',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: currentAssociation.compliance >= 95 ? '#27ae60' : 
                                  currentAssociation.compliance >= 90 ? '#f39c12' : '#e74c3c',
                  borderRadius: 5
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Layout principal: 2 columnas */}
      <Grid container spacing={2}>
        {/* Columna izquierda (más ancha) */}
        <Grid item xs={12} lg={8}>
          {/* KPI Cards - Reducidas */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {associationStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ 
                    height: '100%', 
                    borderLeft: `4px solid ${stat.color}`,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-2px)' }
                  }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Box sx={{ color: stat.color }}>
                              <IconComponent fontSize="small" />
                            </Box>
                            <Typography variant="caption" sx={{ color: '#7f8c8d', fontWeight: 500 }}>
                              {stat.title}
                            </Typography>
                          </Box>
                          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 0.5 }}>
                            {stat.value}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#95a5a6' }}>
                              {stat.detail}
                            </Typography>
                            <Chip 
                              label={stat.change}
                              size="small"
                              sx={{
                                bgcolor: stat.trend === 'up' ? '#2ecc7120' : '#e74c3c20',
                                color: stat.trend === 'up' ? '#27ae60' : '#e74c3c',
                                fontWeight: 'bold',
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                          </Box>
                          
                          {/* Progress bar for target */}
                          <Box sx={{ mt: 1.5 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={(parseInt(stat.value) / stat.target) * 100}
                              sx={{ 
                                height: 4,
                                borderRadius: 2,
                                backgroundColor: '#ecf0f1',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: stat.color,
                                  borderRadius: 2
                                }
                              }}
                            />
                            <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 0.5 }}>
                              Meta: {stat.target}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Miembros de la asociación - Ahora ocupa toda la columna izquierda */}
          <Card sx={{ mb: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold', fontSize: '1rem' }}>
                  Agentes de la Asociación
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Button 
                    size="small" 
                    startIcon={<PeopleIcon />}
                    sx={{ fontSize: '0.75rem' }}
                  >
                    Ver Todos
                  </Button>
                </Box>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Agente</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>ID Agente</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Rol</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Cumplimiento</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', py: 1, fontSize: '0.75rem' }}>Acción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {associationMembers.map((member) => (
                      <TableRow 
                        key={member.id} 
                        hover
                        sx={{ '&:last-child td': { borderBottom: 0 } }}
                      >
                        <TableCell sx={{ py: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar sx={{ 
                              width: 32, 
                              height: 32,
                              fontSize: '0.75rem',
                              bgcolor: getStatusColor(member.status)
                            }}>
                              {member.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: '500', color: '#2c3e50' }}>
                                {member.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                                {member.lastActivity}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1, fontSize: '0.875rem' }}>{member.agentId}</TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Chip 
                            label={member.role}
                            size="small"
                            sx={{
                              bgcolor: '#ecf0f1',
                              color: '#2c3e50',
                              fontWeight: '500',
                              fontSize: '0.7rem',
                              height: 20
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: getStatusColor(member.compliance >= 95 ? 'excelente' : member.compliance >= 90 ? 'bueno' : 'regular') }}>
                              {member.compliance}%
                            </Typography>
                            {member.pending > 0 && (
                              <Chip 
                                label={`${member.pending} pendientes`}
                                size="small"
                                color="warning"
                                sx={{ height: 18, fontSize: '0.65rem', mt: 0.5 }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Chip 
                            label={member.status}
                            size="small"
                            sx={{
                              bgcolor: `${getStatusColor(member.status)}20`,
                              color: getStatusColor(member.status),
                              fontWeight: 'bold',
                              fontSize: '0.7rem',
                              height: 20
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <IconButton size="small">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Estadísticas adicionales de la asociación */}
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ color: '#2c3e50', mb: 3, fontWeight: 'bold', fontSize: '1rem' }}>
                Desempeño de la Asociación
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                      Eficiencia Operativa
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={92}
                      sx={{ 
                        height: 8,
                        borderRadius: 4,
                        mb: 1,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#27ae60',
                          borderRadius: 4
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        92%
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Meta: 90%
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                      Capacidad de Agentes
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={87}
                      sx={{ 
                        height: 8,
                        borderRadius: 4,
                        mb: 1,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#f39c12',
                          borderRadius: 4
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        87%
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Meta: 95%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                      Satisfacción de Clientes
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={94}
                      sx={{ 
                        height: 8,
                        borderRadius: 4,
                        mb: 1,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#27ae60',
                          borderRadius: 4
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        94%
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Meta: 90%
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1, fontWeight: 'bold' }}>
                      Tasa de Retención
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={96}
                      sx={{ 
                        height: 8,
                        borderRadius: 4,
                        mb: 1,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#27ae60',
                          borderRadius: 4
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        96%
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Meta: 92%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Columna derecha (más estrecha) */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            {/* Métricas de cumplimiento */}
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold', fontSize: '1rem' }}>
                  Métricas de Cumplimiento
                </Typography>

                <Stack spacing={2}>
                  {complianceMetrics.map((metric, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: '600', color: '#2c3e50' }}>
                          {metric.metric}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Typography variant="body2" sx={{ 
                            fontWeight: 'bold', 
                            color: getStatusColor(metric.status)
                          }}>
                            {metric.current}%
                          </Typography>
                          <Chip 
                            label={metric.status}
                            size="small"
                            sx={{
                              bgcolor: `${getStatusColor(metric.status)}20`,
                              color: getStatusColor(metric.status),
                              fontWeight: 'bold',
                              fontSize: '0.65rem',
                              height: 18
                            }}
                          />
                        </Box>
                      </Box>
                      
                      <LinearProgress 
                        variant="determinate" 
                        value={metric.current}
                        sx={{ 
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: '#ecf0f1',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getStatusColor(metric.status),
                            borderRadius: 3
                          }
                        }}
                      />
                      
                      <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'block', mt: 0.5, textAlign: 'right' }}>
                        Meta: {metric.target}%
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Acciones rápidas para la asociación */}
                <Typography variant="subtitle2" sx={{ color: '#2c3e50', mb: 1.5, fontWeight: 'bold' }}>
                  Acciones Rápidas
                </Typography>
                
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<AssignmentIcon />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
                    >
                      Nuevo Reporte
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<PeopleIcon />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
                    >
                      Agregar Agente
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<ReceiptIcon />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
                    >
                      Registrar Operación
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<BalanceIcon />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
                    >
                      Ver Balance
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Estado del sistema SAT */}
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <BalanceIcon sx={{ color: '#2ecc71' }} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                      Estado SAT
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                      Conexión activa
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ 
                  p: 1.5, 
                  bgcolor: '#f8f9fa', 
                  borderRadius: 1,
                  border: '1px solid #ecf0f1'
                }}>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Última sincronización:
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#2c3e50', fontWeight: '500' }}>
                        Hoy 10:30 AM
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Operaciones transmitidas:
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#2c3e50', fontWeight: '500' }}>
                        156/156
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
                        Validaciones SAT:
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#27ae60', fontWeight: '500' }}>
                        100% exitosas
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>

            {/* Información adicional de la asociación */}
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ color: '#2c3e50', mb: 2, fontWeight: 'bold', fontSize: '1rem' }}>
                  Información de la Asociación
                </Typography>
                
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Año de Fundación:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      2020
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Tipo de Asociación:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      Aduanal
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Certificación SAT:
                    </Typography>
                    <Chip 
                      label="Vigente"
                      size="small"
                      color="success"
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#7f8c8d' }}>
                      Puntuación SAT:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#27ae60' }}>
                      9.8/10
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    fullWidth
                    startIcon={<DescriptionIcon />}
                  >
                    Ver Detalles Completos
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ 
        mt: 3,
        pt: 2,
        borderTop: '1px solid #dfe6e9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Typography variant="caption" sx={{ color: '#7f8c8d' }}>
          {currentAssociation.name} • Asociación Aduanal Certificada • Última actualización: Hoy 10:30 AM
        </Typography>
        <Typography variant="caption" sx={{ color: '#7f8c8d', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CheckCircleIcon sx={{ fontSize: 12, color: '#27ae60' }} />
          Cumplimiento SAT: {currentAssociation.compliance}%
        </Typography>
      </Box>
    </Box>
  );
};

export default AssociationDashboard;