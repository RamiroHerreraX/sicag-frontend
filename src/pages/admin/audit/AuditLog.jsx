// src/pages/audit/AuditLog.jsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  Gavel as GavelIcon,
  Settings as SettingsIcon,
  Login as LoginIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon
} from '@mui/icons-material';

// Librerías para exportación
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Paleta corporativa
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
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3A6EA5'
  },
  text: {
    primary: '#0D2A4D',
    secondary: '#3A6EA5',
    light: '#6C5CE7'
  }
};

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Estados para exportación
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('excel');
  const [exportScope, setExportScope] = useState('filtered');
  const [exportLoading, setExportLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Datos de auditoría de ejemplo
  const auditLogs = [
    {
      id: 1,
      timestamp: '15/01/2026 10:30:15',
      user: { name: 'Admin Sistema', role: 'admin', avatar: 'AS' },
      action: 'LOGIN_SUCCESS',
      actionName: 'Inicio de sesión exitoso',
      entity: 'Sistema',
      entityId: 'N/A',
      details: 'Inicio de sesión desde IP 192.168.1.100',
      ip: '192.168.1.100',
      severity: 'info',
      icon: <LoginIcon />
    },
    {
      id: 2,
      timestamp: '15/01/2026 09:45:22',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'CERTIFICATION_CREATE',
      actionName: 'Certificación creada',
      entity: 'Certificación',
      entityId: 'CERT-2026-00145',
      details: 'Patente Aduanal creada para expediente EXP-2024-567',
      ip: '192.168.1.150',
      severity: 'success',
      icon: <AddIcon />
    },
    {
      id: 3,
      timestamp: '15/01/2026 08:20:18',
      user: { name: 'María González', role: 'comite', avatar: 'MG' },
      action: 'CERTIFICATION_APPROVE',
      actionName: 'Certificación aprobada',
      entity: 'Certificación',
      entityId: 'CERT-2026-00123',
      details: 'Cédula profesional aprobada con observaciones',
      ip: '192.168.1.120',
      severity: 'success',
      icon: <GavelIcon />
    },
    {
      id: 4,
      timestamp: '14/01/2026 16:45:33',
      user: { name: 'Admin Sistema', role: 'admin', avatar: 'AS' },
      action: 'USER_UPDATE',
      actionName: 'Usuario actualizado',
      entity: 'Usuario',
      entityId: 'USR-001',
      details: 'Estado cambiado de activo a inactivo',
      ip: '192.168.1.100',
      severity: 'warning',
      icon: <EditIcon />
    },
    {
      id: 5,
      timestamp: '14/01/2026 14:10:55',
      user: { name: 'Carlos Martínez', role: 'profesionista', avatar: 'CM' },
      action: 'DOCUMENT_UPLOAD',
      actionName: 'Documento cargado',
      entity: 'Documento',
      entityId: 'DOC-2026-78901',
      details: 'Comprobante de domicilio actualizado',
      ip: '192.168.1.130',
      severity: 'info',
      icon: <DescriptionIcon />
    },
    {
      id: 6,
      timestamp: '14/01/2026 11:30:42',
      user: { name: 'María González', role: 'comite', avatar: 'MG' },
      action: 'CERTIFICATION_REJECT',
      actionName: 'Certificación rechazada',
      entity: 'Certificación',
      entityId: 'CERT-2026-00111',
      details: 'Documentación insuficiente para patente aduanal',
      ip: '192.168.1.120',
      severity: 'error',
      icon: <DeleteIcon />
    },
    {
      id: 7,
      timestamp: '13/01/2026 18:15:28',
      user: { name: 'Admin Sistema', role: 'admin', avatar: 'AS' },
      action: 'SYSTEM_CONFIG_UPDATE',
      actionName: 'Configuración actualizada',
      entity: 'Sistema',
      entityId: 'CONFIG-001',
      details: 'Umbral del semáforo cambiado a 90%',
      ip: '192.168.1.100',
      severity: 'warning',
      icon: <SettingsIcon />
    },
    {
      id: 8,
      timestamp: '13/01/2026 15:40:19',
      user: { name: 'Ana López', role: 'empresario', avatar: 'AL' },
      action: 'PASSWORD_CHANGE',
      actionName: 'Contraseña cambiada',
      entity: 'Usuario',
      entityId: 'USR-004',
      details: 'Cambio de contraseña exitoso',
      ip: '192.168.1.140',
      severity: 'info',
      icon: <SecurityIcon />
    },
    {
      id: 9,
      timestamp: '13/01/2026 12:05:37',
      user: { name: 'Luis Rodríguez', role: 'agente', avatar: 'LR' },
      action: 'CERTIFICATION_UPDATE',
      actionName: 'Certificación actualizada',
      entity: 'Certificación',
      entityId: 'CERT-2026-00122',
      details: 'Fecha de vencimiento extendida',
      ip: '192.168.1.150',
      severity: 'info',
      icon: <EditIcon />
    },
    {
      id: 10,
      timestamp: '12/01/2026 17:25:44',
      user: { name: 'Admin Sistema', role: 'admin', avatar: 'AS' },
      action: 'USER_CREATE',
      actionName: 'Usuario creado',
      entity: 'Usuario',
      entityId: 'USR-009',
      details: 'Nuevo usuario registrado: Pedro Sánchez',
      ip: '192.168.1.100',
      severity: 'success',
      icon: <AddIcon />
    },
    {
      id: 11,
      timestamp: '12/01/2026 14:30:22',
      user: { name: 'María González', role: 'comite', avatar: 'MG' },
      action: 'COMMITTEE_REVIEW',
      actionName: 'Revisión de comité',
      entity: 'Certificación',
      entityId: 'CERT-2026-00156',
      details: 'Revisión de documentación completada',
      ip: '192.168.1.120',
      severity: 'success',
      icon: <GavelIcon />
    },
    {
      id: 12,
      timestamp: '11/01/2026 09:15:33',
      user: { name: 'Carlos Martínez', role: 'profesionista', avatar: 'CM' },
      action: 'PROFILE_UPDATE',
      actionName: 'Perfil actualizado',
      entity: 'Usuario',
      entityId: 'USR-007',
      details: 'Información de contacto actualizada',
      ip: '192.168.1.130',
      severity: 'info',
      icon: <PersonIcon />
    }
  ];

  const actionTypes = [
    { value: 'all', label: 'Todas las acciones' },
    { value: 'LOGIN', label: 'Accesos al sistema' },
    { value: 'USER', label: 'Gestión de usuarios' },
    { value: 'CERTIFICATION', label: 'Certificaciones' },
    { value: 'DOCUMENT', label: 'Documentos' },
    { value: 'SYSTEM', label: 'Configuración del sistema' },
    { value: 'SECURITY', label: 'Seguridad' },
  ];

  const users = [
    { value: 'all', label: 'Todos los usuarios' },
    { value: 'admin', label: 'Administradores' },
    { value: 'comite', label: 'Comité' },
    { value: 'agente', label: 'Agentes' },
    { value: 'profesionista', label: 'Profesionistas' },
    { value: 'empresario', label: 'Empresarios' },
  ];

  // Definición centralizada de las stat cards
  const statCards = [
    { label: 'Total de Eventos', value: stats => stats.total,          color: colors.status.info },
    { label: 'Hoy',             value: stats => stats.today,           color: colors.status.success },
    { label: 'Informativos',    value: stats => stats.bySeverity.info, color: colors.status.info },
    { label: 'Advertencias',    value: stats => stats.bySeverity.warning, color: colors.status.warning },
    { label: 'Errores',         value: stats => stats.bySeverity.error,   color: colors.status.error },
    { label: 'Acciones Admin',  value: stats => stats.byUserType.admin,   color: colors.accents.purple },
  ];

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'success': return colors.status.success;
      case 'info': return colors.status.info;
      case 'warning': return colors.status.warning;
      case 'error': return colors.status.error;
      default: return colors.text.secondary;
    }
  };

  const getSeverityText = (severity) => {
    switch(severity) {
      case 'success': return 'Éxito';
      case 'info': return 'Informativo';
      case 'warning': return 'Advertencia';
      case 'error': return 'Error';
      default: return severity;
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return colors.primary.dark;
      case 'comite': return colors.accents.purple;
      case 'agente': return colors.secondary.main;
      case 'profesionista': return colors.accents.blue;
      case 'empresario': return colors.status.warning;
      default: return colors.text.secondary;
    }
  };

  const getRoleText = (role) => {
    switch(role) {
      case 'admin': return 'Administrador';
      case 'comite': return 'Comité';
      case 'agente': return 'Agente';
      case 'profesionista': return 'Profesionista';
      case 'empresario': return 'Empresario';
      default: return role;
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      filterType === 'all' ? true : log.action.includes(filterType);
    
    const matchesUser = 
      filterUser === 'all' ? true : log.user.role === filterUser;
    
    return matchesSearch && matchesType && matchesUser;
  });

  const paginatedLogs = filteredLogs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Estadísticas
  const stats = {
    total: auditLogs.length,
    today: auditLogs.filter(log => log.timestamp.includes('15/01/2026')).length,
    bySeverity: {
      info: auditLogs.filter(log => log.severity === 'info').length,
      success: auditLogs.filter(log => log.severity === 'success').length,
      warning: auditLogs.filter(log => log.severity === 'warning').length,
      error: auditLogs.filter(log => log.severity === 'error').length,
    },
    byUserType: {
      admin: auditLogs.filter(log => log.user.role === 'admin').length,
      comite: auditLogs.filter(log => log.user.role === 'comite').length,
      agente: auditLogs.filter(log => log.user.role === 'agente').length,
      profesionista: auditLogs.filter(log => log.user.role === 'profesionista').length,
      empresario: auditLogs.filter(log => log.user.role === 'empresario').length,
    }
  };

  // Handlers para exportación
  const handleExportClick = () => {
    setExportDialogOpen(true);
  };

  const handleExportDialogClose = () => {
    setExportDialogOpen(false);
  };

  const handleExport = async () => {
    setExportLoading(true);
    
    try {
      const dataToExport = exportScope === 'all' ? auditLogs : filteredLogs;
      
      // Preparar datos para exportación
      const exportData = dataToExport.map(log => ({
        'Fecha': log.timestamp.split(' ')[0],
        'Hora': log.timestamp.split(' ')[1],
        'Usuario': log.user.name,
        'Rol': getRoleText(log.user.role),
        'Acción': log.actionName,
        'Tipo': getSeverityText(log.severity),
        'Entidad': log.entity,
        'ID Entidad': log.entityId,
        'Detalles': log.details,
        'IP': log.ip
      }));

      if (exportFormat === 'excel') {
        exportToExcel(exportData);
      } else {
        exportToPDF(exportData, dataToExport);
      }

      setSnackbar({
        open: true,
        message: `Log exportado exitosamente a ${exportFormat === 'excel' ? 'Excel' : 'PDF'}`,
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al exportar el log',
        severity: 'error'
      });
    } finally {
      setExportLoading(false);
      setExportDialogOpen(false);
    }
  };

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    
    const colWidths = [
      { wch: 12 }, { wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 25 },
      { wch: 12 }, { wch: 15 }, { wch: 15 }, { wch: 40 }, { wch: 15 }
    ];
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Auditoría');

    const summaryData = [
      ['Resumen de Auditoría'],
      [''],
      ['Total de Eventos', stats.total],
      ['Eventos de Hoy', stats.today],
      [''],
      ['Por Tipo:'],
      ['Informativos', stats.bySeverity.info],
      ['Éxitos', stats.bySeverity.success],
      ['Advertencias', stats.bySeverity.warning],
      ['Errores', stats.bySeverity.error],
      [''],
      ['Por Rol:'],
      ['Administradores', stats.byUserType.admin],
      ['Comité', stats.byUserType.comite],
      ['Agentes', stats.byUserType.agente],
      ['Profesionistas', stats.byUserType.profesionista],
      ['Empresarios', stats.byUserType.empresario],
      [''],
      ['Fecha de Exportación:', new Date().toLocaleString()],
      ['Filtros Aplicados:', filterType !== 'all' ? `Tipo: ${filterType}` : 'Todos', filterUser !== 'all' ? `Usuario: ${filterUser}` : 'Todos']
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen');

    const fileName = `auditoria_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const exportToPDF = (data, originalData) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.setTextColor(19, 59, 107);
    doc.text('Reporte de Auditoría', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha de exportación: ${new Date().toLocaleString()}`, 14, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(13, 42, 77);
    doc.text('Resumen', 14, 40);
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Total de Eventos: ${stats.total}`, 20, 48);
    doc.text(`Eventos de Hoy: ${stats.today}`, 20, 55);
    doc.text(`Informativos: ${stats.bySeverity.info} | Éxitos: ${stats.bySeverity.success} | Advertencias: ${stats.bySeverity.warning} | Errores: ${stats.bySeverity.error}`, 20, 62);
    
    if (filterType !== 'all' || filterUser !== 'all') {
      doc.text('Filtros aplicados:', 20, 72);
      if (filterType !== 'all') {
        const filterLabel = actionTypes.find(t => t.value === filterType)?.label || filterType;
        doc.text(`- Tipo: ${filterLabel}`, 25, 79);
      }
      if (filterUser !== 'all') {
        const userLabel = users.find(u => u.value === filterUser)?.label || filterUser;
        doc.text(`- Usuario: ${userLabel}`, 25, 86);
      }
    }

    const tableData = data.map(item => [
      item.Fecha, item.Hora, item.Usuario, item.Rol,
      item.Acción, item.Tipo, item.Entidad, item['ID Entidad']
    ]);

    autoTable(doc, {
      head: [['Fecha', 'Hora', 'Usuario', 'Rol', 'Acción', 'Tipo', 'Entidad', 'ID']],
      body: tableData,
      startY: filterType !== 'all' || filterUser !== 'all' ? 95 : 72,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { 
        fillColor: [19, 59, 107],
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: { fillColor: [240, 245, 250] },
      columnStyles: {
        0: { cellWidth: 20 }, 1: { cellWidth: 15 }, 2: { cellWidth: 30 },
        3: { cellWidth: 20 }, 4: { cellWidth: 35 }, 5: { cellWidth: 15 },
        6: { cellWidth: 20 }, 7: { cellWidth: 20 }
      }
    });

    const fileName = `auditoria_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      p: 2.5,
      backgroundColor: '#f5f7fa'
    }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h5" sx={{ color: colors.primary.dark, fontWeight: 'bold', mb: 0.5 }}>
              Auditoría y Trazabilidad
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Registro completo de todas las acciones realizadas en el sistema
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              size="small"
              onClick={handleExportClick}
              sx={{
                borderColor: colors.primary.main,
                color: colors.primary.main,
                '&:hover': {
                  borderColor: colors.primary.dark,
                  bgcolor: 'rgba(19, 59, 107, 0.08)'
                }
              }}
            >
              Exportar Log
            </Button>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              size="small"
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
                setFilterUser('all');
                setPage(1);
              }}
              sx={{ 
                bgcolor: colors.primary.main,
                '&:hover': { bgcolor: colors.primary.dark }
              }}
            >
              Actualizar
            </Button>
          </Stack>
        </Box>

        {/* =====================================================
            CARDS DE ESTADÍSTICAS — IGUAL ANCHO Y ALTO
            flex: 1 en cada Card garantiza que todas se repartan
            el espacio disponible de forma idéntica, sin importar
            el largo del texto o el número de dígitos.
        ====================================================== */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            // En móvil se apilan, en desktop van en fila
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          {[
            { label: 'Total de Eventos', value: stats.total,              color: colors.status.info    },
            { label: 'Hoy',             value: stats.today,              color: colors.status.success },
            { label: 'Informativos',    value: stats.bySeverity.info,    color: colors.status.info    },
            { label: 'Advertencias',    value: stats.bySeverity.warning, color: colors.status.warning },
            { label: 'Errores',         value: stats.bySeverity.error,   color: colors.status.error   },
            { label: 'Acciones Admin',  value: stats.byUserType.admin,   color: colors.accents.purple },
          ].map(({ label, value, color }) => (
            <Card
              key={label}
              sx={{
                borderLeft: `4px solid ${color}`,
                // flex: 1 → cada card ocupa exactamente 1/6 del espacio
                // disponible, sin importar el contenido
                flex: 1,
                minWidth: 0,   // evita que el texto fuerce el ancho
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <CardContent
                sx={{
                  p: 2,
                  textAlign: 'center',
                  '&:last-child': { pb: 2 },
                }}
              >
                <Typography variant="h4" sx={{ color, fontWeight: 'bold', mb: 0.5 }}>
                  {value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.text.secondary,
                    // Evita que el texto largo rompa el layout
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Filtros */}
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'white', borderRadius: '8px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar en auditoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: colors.text.secondary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputLabel-root.Mui-focused': { color: colors.primary.main },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: colors.primary.main
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: colors.text.secondary }}>Tipo de Acción</InputLabel>
                <Select
                  value={filterType}
                  label="Tipo de Acción"
                  onChange={(e) => setFilterType(e.target.value)}
                  sx={{ '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primary.main } }}
                >
                  {actionTypes.map(type => (
                    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: colors.text.secondary }}>Tipo de Usuario</InputLabel>
                <Select
                  value={filterUser}
                  label="Tipo de Usuario"
                  onChange={(e) => setFilterUser(e.target.value)}
                  sx={{ '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primary.main } }}
                >
                  {users.map(user => (
                    <MenuItem key={user.value} value={user.value}>{user.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterUser('all');
                    setPage(1);
                  }}
                  sx={{
                    borderColor: colors.primary.main,
                    color: colors.primary.main,
                    '&:hover': {
                      borderColor: colors.primary.dark,
                      bgcolor: 'rgba(19, 59, 107, 0.08)'
                    }
                  }}
                >
                  Limpiar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={1} sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          borderRadius: '8px'
        }}>
          <Box sx={{ 
            p: 2, 
            borderBottom: `1px solid ${colors.primary.light}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'white'
          }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
              Registro de Auditoría - {filteredLogs.length} eventos encontrados
            </Typography>
            
            <Stack direction="row" spacing={1}>
              <Chip 
                label={`${stats.today} eventos hoy`}
                size="small"
                sx={{ bgcolor: colors.primary.main, color: 'white', fontSize: '0.75rem' }}
              />
              <Chip 
                label={`${paginatedLogs.length} mostrados`}
                size="small"
                variant="outlined"
                sx={{ borderColor: colors.primary.main, color: colors.primary.main, fontSize: '0.75rem' }}
              />
            </Stack>
          </Box>

          {/* Tabla de auditoría */}
          <TableContainer sx={{ flex: 1 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '15%' }}>Fecha y Hora</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '20%' }}>Usuario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '20%' }}>Acción</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '15%' }}>Entidad</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '25%' }}>Detalles</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: colors.text.primary, width: '5%' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedLogs.map((log) => (
                  <TableRow 
                    key={log.id}
                    hover
                    sx={{ 
                      '&:hover': { bgcolor: 'rgba(19, 59, 107, 0.04)' },
                      borderLeft: `3px solid ${getSeverityColor(log.severity)}`,
                      '& .MuiTableCell-root': {
                        borderBottom: `1px solid ${colors.primary.light}`
                      }
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: colors.text.primary }}>
                          {log.timestamp.split(' ')[0]}
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                          {log.timestamp.split(' ')[1]}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: getRoleColor(log.user.role),
                            fontSize: '0.85rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {log.user.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: colors.text.primary }}>
                            {log.user.name}
                          </Typography>
                          <Chip 
                            label={log.user.role}
                            size="small"
                            sx={{ 
                              bgcolor: `${getRoleColor(log.user.role)}15`,
                              color: getRoleColor(log.user.role),
                              fontSize: '0.65rem',
                              height: 18
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ color: getSeverityColor(log.severity) }}>
                          {log.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: colors.text.primary }}>
                            {log.actionName}
                          </Typography>
                          <Chip 
                            label={log.severity}
                            size="small"
                            sx={{ 
                              bgcolor: `${getSeverityColor(log.severity)}15`,
                              color: getSeverityColor(log.severity),
                              fontSize: '0.65rem',
                              height: 18,
                              mt: 0.5
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', color: colors.text.primary }}>
                          {log.entity}
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                          ID: {log.entityId}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                          {log.details}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                            IP: {log.ip}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Tooltip title="Ver detalles">
                        <IconButton 
                          size="small"
                          sx={{ 
                            color: colors.primary.main,
                            '&:hover': { bgcolor: 'rgba(19, 59, 107, 0.08)' }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginación */}
          <Box sx={{ 
            p: 2, 
            borderTop: `1px solid ${colors.primary.light}`, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            bgcolor: 'white'
          }}>
            <Typography variant="caption" sx={{ color: colors.text.secondary }}>
              Mostrando {((page - 1) * rowsPerPage) + 1} - {Math.min(page * rowsPerPage, filteredLogs.length)} de {filteredLogs.length} eventos
            </Typography>
            <Pagination
              count={Math.ceil(filteredLogs.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              size="small"
              sx={{
                '& .MuiPaginationItem-root.Mui-selected': {
                  bgcolor: colors.primary.main,
                  color: 'white',
                  '&:hover': { bgcolor: colors.primary.dark }
                }
              }}
            />
          </Box>
        </Paper>

        {/* Información de auditoría */}
        <Paper elevation={0} sx={{ mt: 2, p: 2, bgcolor: 'white', borderRadius: '8px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1 }}>
                Distribución por Tipo de Acción
              </Typography>
              <Stack spacing={1}>
                {Object.entries({
                  'Accesos al sistema': auditLogs.filter(log => log.action.includes('LOGIN')).length,
                  'Gestión de usuarios': auditLogs.filter(log => log.action.includes('USER')).length,
                  'Certificaciones': auditLogs.filter(log => log.action.includes('CERTIFICATION')).length,
                  'Documentos': auditLogs.filter(log => log.action.includes('DOCUMENT')).length,
                }).map(([type, count]) => (
                  <Box key={type} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      {type}:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '60%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(count / stats.total) * 100}
                        sx={{ 
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': { bgcolor: colors.primary.main }
                        }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 24, color: colors.text.primary }}>
                        {count}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1 }}>
                Distribución por Rol de Usuario
              </Typography>
              <Stack spacing={1}>
                {Object.entries(stats.byUserType).map(([role, count]) => (
                  <Box key={role} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      {role === 'admin' ? 'Administradores' :
                       role === 'comite' ? 'Comité' :
                       role === 'agente' ? 'Agentes' :
                       role === 'profesionista' ? 'Profesionistas' : 'Empresarios'}:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '60%' }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={(count / stats.total) * 100}
                        sx={{ 
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': { bgcolor: getRoleColor(role) }
                        }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 'bold', minWidth: 24, color: colors.text.primary }}>
                        {count}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Diálogo de exportación */}
      <Dialog open={exportDialogOpen} onClose={handleExportDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          bgcolor: colors.primary.main, 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DownloadIcon />
            <Typography variant="h6">Exportar Log de Auditoría</Typography>
          </Box>
          <IconButton onClick={handleExportDialogClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ color: colors.text.primary, fontWeight: 'bold', mb: 1 }}>
              Formato de exportación
            </FormLabel>
            <RadioGroup value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
              <FormControlLabel 
                value="excel" 
                control={<Radio sx={{ color: colors.primary.main }} />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ExcelIcon sx={{ color: colors.status.success }} />
                    <Typography>Excel (.xlsx)</Typography>
                  </Box>
                } 
              />
              <FormControlLabel 
                value="pdf" 
                control={<Radio sx={{ color: colors.primary.main }} />} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PdfIcon sx={{ color: colors.status.error }} />
                    <Typography>PDF (.pdf)</Typography>
                  </Box>
                } 
              />
            </RadioGroup>
          </Box>

          <Box>
            <FormLabel component="legend" sx={{ color: colors.text.primary, fontWeight: 'bold', mb: 1 }}>
              Alcance de la exportación
            </FormLabel>
            <RadioGroup value={exportScope} onChange={(e) => setExportScope(e.target.value)}>
              <FormControlLabel 
                value="filtered" 
                control={<Radio sx={{ color: colors.primary.main }} />} 
                label={`Solo resultados filtrados (${filteredLogs.length} registros)`} 
              />
              <FormControlLabel 
                value="all" 
                control={<Radio sx={{ color: colors.primary.main }} />} 
                label={`Todos los registros (${auditLogs.length} registros)`} 
              />
            </RadioGroup>
          </Box>

          {exportScope === 'filtered' && (filterType !== 'all' || filterUser !== 'all' || searchTerm) && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Se exportarán {filteredLogs.length} registros con los filtros aplicados actualmente.
            </Alert>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2, borderTop: `1px solid ${colors.primary.light}` }}>
          <Button 
            onClick={handleExportDialogClose}
            variant="outlined"
            sx={{
              borderColor: colors.primary.main,
              color: colors.primary.main,
              '&:hover': { borderColor: colors.primary.dark, bgcolor: 'rgba(19, 59, 107, 0.08)' }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleExport}
            variant="contained"
            disabled={exportLoading}
            startIcon={exportLoading ? <RefreshIcon className="spin" /> : <DownloadIcon />}
            sx={{ bgcolor: colors.primary.main, '&:hover': { bgcolor: colors.primary.dark } }}
          >
            {exportLoading ? 'Exportando...' : 'Exportar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            bgcolor: snackbar.severity === 'success' ? colors.status.success : colors.status.error,
            color: 'white',
            '& .MuiAlert-icon': { color: 'white' }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Estilo para animación de spin */}
      <style>
        {`
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default AuditLog;