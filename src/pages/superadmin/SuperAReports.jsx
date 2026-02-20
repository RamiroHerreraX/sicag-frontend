// src/pages/admin/Reports.jsx
import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Collapse,
  Divider,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Assessment as AssessmentIcon,
  Group as GroupIcon,
  Warning as WarningIcon,
  Domain as DomainIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ShowChart as ShowChartIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";

// Importar componentes de Recharts
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

const InstanceReports = () => {
  const [reportType, setReportType] = useState("performance");
  const [dateRange, setDateRange] = useState("month");
  const [instanceFilter, setInstanceFilter] = useState("all");
  const [activePieIndex, setActivePieIndex] = useState(0);

  // Estados individuales para cada gráfica
  const [showLineChart, setShowLineChart] = useState(true);
  const [showPieChart, setShowPieChart] = useState(true);
  const [showBarChart, setShowBarChart] = useState(true);

  const reportTypes = [
    {
      value: "performance",
      label: "Rendimiento General",
      icon: <AssessmentIcon />,
    },
    { value: "users", label: "Análisis de Usuarios", icon: <GroupIcon /> },
    { value: "expedientes", label: "Expedientes", icon: <StorageIcon /> },
    { value: "uptime", label: "Disponibilidad", icon: <SpeedIcon /> },
    { value: "alerts", label: "Alertas", icon: <WarningIcon /> },
  ];

  const dateRanges = [
    { value: "today", label: "Hoy" },
    { value: "week", label: "Esta semana" },
    { value: "month", label: "Este mes" },
    { value: "quarter", label: "Este trimestre" },
    { value: "year", label: "Este año" },
  ];

  const instanceFilters = [
    { value: "all", label: "Todas las instancias" },
    { value: "CAAREM", label: "CAAREM" },
    { value: "ANAM", label: "ANAM" },
    { value: "SAT", label: "SAT" },
    { value: "SHCP", label: "SHCP" },
    { value: "Aduanas", label: "Aduanas" },
  ];

  // Datos base
  const baseInstanceData = [
    {
      name: "CAAREM",
      code: "CAA-001",
      uptime: 99.9,
      users: 245,
      activeUsers: 198,
      expedientes: 842,
      nuevosExpedientes: 45,
      status: "excelente",
      crecimiento: "+12%",
    },
    {
      name: "ANAM",
      code: "ANA-001",
      uptime: 99.8,
      users: 189,
      activeUsers: 152,
      expedientes: 615,
      nuevosExpedientes: 32,
      status: "bueno",
      crecimiento: "+8%",
    },
    {
      name: "SAT",
      code: "SAT-001",
      uptime: 99.7,
      users: 342,
      activeUsers: 278,
      expedientes: 1204,
      nuevosExpedientes: 78,
      status: "excelente",
      crecimiento: "+15%",
    },
    {
      name: "SHCP",
      code: "SHC-001",
      uptime: 99.5,
      users: 198,
      activeUsers: 165,
      expedientes: 534,
      nuevosExpedientes: 28,
      status: "bueno",
      crecimiento: "+5%",
    },
    {
      name: "Aduanas",
      code: "ADU-001",
      uptime: 99.6,
      users: 271,
      activeUsers: 235,
      expedientes: 647,
      nuevosExpedientes: 41,
      status: "excelente",
      crecimiento: "+10%",
    },
  ];

  // Datos de tendencia por mes
  const baseTrendData = [
    { mes: "Ene", CAAREM: 210, ANAM: 165, SAT: 298, SHCP: 172, Aduanas: 238 },
    { mes: "Feb", CAAREM: 218, ANAM: 171, SAT: 305, SHCP: 178, Aduanas: 245 },
    { mes: "Mar", CAAREM: 225, ANAM: 176, SAT: 315, SHCP: 183, Aduanas: 252 },
    { mes: "Abr", CAAREM: 232, ANAM: 180, SAT: 324, SHCP: 188, Aduanas: 258 },
    { mes: "May", CAAREM: 238, ANAM: 184, SAT: 332, SHCP: 192, Aduanas: 264 },
    { mes: "Jun", CAAREM: 245, ANAM: 189, SAT: 342, SHCP: 198, Aduanas: 271 },
  ];

  // Datos de expedientes por mes
  const expedientesTrendData = [
    { mes: "Ene", CAAREM: 720, ANAM: 540, SAT: 980, SHCP: 460, Aduanas: 550 },
    { mes: "Feb", CAAREM: 745, ANAM: 555, SAT: 1010, SHCP: 475, Aduanas: 565 },
    { mes: "Mar", CAAREM: 770, ANAM: 570, SAT: 1050, SHCP: 490, Aduanas: 585 },
    { mes: "Abr", CAAREM: 795, ANAM: 585, SAT: 1090, SHCP: 505, Aduanas: 605 },
    { mes: "May", CAAREM: 820, ANAM: 600, SAT: 1140, SHCP: 520, Aduanas: 625 },
    { mes: "Jun", CAAREM: 842, ANAM: 615, SAT: 1204, SHCP: 534, Aduanas: 647 },
  ];

  // Datos de uptime por mes
  const uptimeTrendData = [
    {
      mes: "Ene",
      CAAREM: 99.8,
      ANAM: 99.7,
      SAT: 99.6,
      SHCP: 99.4,
      Aduanas: 99.5,
    },
    {
      mes: "Feb",
      CAAREM: 99.8,
      ANAM: 99.7,
      SAT: 99.6,
      SHCP: 99.4,
      Aduanas: 99.5,
    },
    {
      mes: "Mar",
      CAAREM: 99.9,
      ANAM: 99.8,
      SAT: 99.7,
      SHCP: 99.5,
      Aduanas: 99.6,
    },
    {
      mes: "Abr",
      CAAREM: 99.9,
      ANAM: 99.8,
      SAT: 99.7,
      SHCP: 99.5,
      Aduanas: 99.6,
    },
    {
      mes: "May",
      CAAREM: 99.9,
      ANAM: 99.8,
      SAT: 99.7,
      SHCP: 99.5,
      Aduanas: 99.6,
    },
    {
      mes: "Jun",
      CAAREM: 99.9,
      ANAM: 99.8,
      SAT: 99.7,
      SHCP: 99.5,
      Aduanas: 99.6,
    },
  ];

  const handleDownloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");

    // Título
    doc.setFontSize(18);
    doc.text("Reporte de Instancias", 14, 15);

    doc.setFontSize(11);
    doc.text(`Tipo: ${reportType}`, 14, 25);
    doc.text(`Periodo: ${dateRange}`, 14, 32);
    doc.text(`Instancia: ${instanceFilter}`, 14, 39);

    // KPIs
    doc.setFontSize(14);
    doc.text("Resumen:", 14, 50);

    doc.setFontSize(11);
    doc.text(`Instancias: ${stats.totalInstances}`, 14, 58);
    doc.text(`Usuarios: ${stats.totalUsers}`, 14, 65);
    doc.text(`Expedientes: ${stats.totalExpedientes}`, 14, 72);

    // Tabla
    const tableColumn = [
      "Instancia",
      "Código",
      "Usuarios",
      "Activos",
      "Expedientes",
      "Nuevos",
      "Uptime",
      "Estado",
      "Crecimiento",
    ];

    const tableRows = filteredData.map((row) => [
      row.name,
      row.code,
      row.users,
      row.activeUsers,
      row.expedientes,
      row.nuevosExpedientes,
      `${row.uptime}%`,
      row.status,
      row.crecimiento,
    ]);

    autoTable(doc, {
      startY: 80,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("reporte_instancias.pdf");
  };
  // Filtrar datos según selección
  const filteredData = useMemo(() => {
    if (instanceFilter === "all") {
      return baseInstanceData;
    }
    return baseInstanceData.filter((item) => item.name === instanceFilter);
  }, [instanceFilter]);

  // Seleccionar datos de tendencia según tipo de reporte
  const trendData = useMemo(() => {
    switch (reportType) {
      case "users":
        return baseTrendData;
      case "expedientes":
        return expedientesTrendData;
      case "uptime":
        return uptimeTrendData;
      default:
        return baseTrendData;
    }
  }, [reportType]);

  const filteredTrendData = useMemo(() => {
    if (instanceFilter === "all") {
      return trendData;
    }
    return trendData.map((item) => ({
      mes: item.mes,
      [instanceFilter]: item[instanceFilter],
    }));
  }, [instanceFilter, trendData]);

  // Calcular estadísticas basadas en filtros
  const stats = useMemo(() => {
    const totalInstances = filteredData.length;
    const totalUsers = filteredData.reduce((sum, item) => sum + item.users, 0);
    const activeUsers = filteredData.reduce(
      (sum, item) => sum + item.activeUsers,
      0,
    );
    const totalExpedientes = filteredData.reduce(
      (sum, item) => sum + item.expedientes,
      0,
    );
    const nuevosExpedientes = filteredData.reduce(
      (sum, item) => sum + (item.nuevosExpedientes || 0),
      0,
    );
    const avgUptime =
      filteredData.reduce((sum, item) => sum + item.uptime, 0) / totalInstances;

    return {
      totalInstances,
      activeInstances: filteredData.length,
      totalUsers,
      activeUsers,
      totalExpedientes,
      nuevosExpedientes,
      avgUptime: avgUptime.toFixed(1),
      avgUsersPerInstance: Math.round(totalUsers / totalInstances) || 0,
      avgExpedientesPerInstance:
        Math.round(totalExpedientes / totalInstances) || 0,
    };
  }, [filteredData]);

  // Datos para gráfica de expedientes
  const expedientesChartData = useMemo(() => {
    return filteredData.map((item) => ({
      name: item.name,
      value: item.expedientes,
      color:
        item.name === "CAAREM"
          ? "#3498db"
          : item.name === "ANAM"
            ? "#2ecc71"
            : item.name === "SAT"
              ? "#e74c3c"
              : item.name === "SHCP"
                ? "#f39c12"
                : "#9b59b6",
    }));
  }, [filteredData]);

  // Datos para gráfica de usuarios
  const usersChartData = useMemo(() => {
    return filteredData.map((item) => ({
      name: item.name,
      activos: item.activeUsers,
      inactivos: item.users - item.activeUsers,
    }));
  }, [filteredData]);

  // Datos para alertas
  const alertasData = useMemo(() => {
    if (instanceFilter === "all") {
      return [
        { tipo: "Uptime crítico", cantidad: 1, color: "#e74c3c" },
        { tipo: "Expedientes duplicados", cantidad: 2, color: "#f39c12" },
        { tipo: "Actualizaciones pendientes", cantidad: 4, color: "#9b59b6" },
        { tipo: "Seguridad", cantidad: 2, color: "#3498db" },
      ];
    }
    const instance = filteredData[0];
    if (instance) {
      return [
        {
          tipo: "Uptime crítico",
          cantidad: instance.uptime < 99.5 ? 1 : 0,
          color: "#e74c3c",
        },
        { tipo: "Expedientes duplicados", cantidad: 1, color: "#f39c12" },
        { tipo: "Actualizaciones pendientes", cantidad: 2, color: "#9b59b6" },
        { tipo: "Seguridad", cantidad: 1, color: "#3498db" },
      ].filter((alert) => alert.cantidad > 0);
    }
    return [];
  }, [filteredData, instanceFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "excelente":
        return "#27ae60";
      case "bueno":
        return "#2ecc71";
      case "regular":
        return "#f39c12";
      case "critico":
        return "#e74c3c";
      default:
        return "#7f8c8d";
    }
  };

  const getTrendTitle = () => {
    switch (reportType) {
      case "users":
        return "Tendencia de Usuarios";
      case "expedientes":
        return "Tendencia de Expedientes";
      case "uptime":
        return "Tendencia de Disponibilidad";
      default:
        return "Tendencia General";
    }
  };

  const handleGenerateReport = () => {
    console.log("Generando reporte con:", {
      reportType,
      dateRange,
      instanceFilter,
    });
  };

  const onPieEnter = (_, index) => {
    setActivePieIndex(index);
  };

  // Funciones para toggle individual
  const toggleLineChart = () => {
    setShowLineChart(!showLineChart);
  };

  const togglePieChart = () => {
    setShowPieChart(!showPieChart);
  };

  const toggleBarChart = () => {
    setShowBarChart(!showBarChart);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: { xs: 2, md: 3 },
        bgcolor: "#f4f6f8",
      }}
    >
      {/* HEADER */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2, bgcolor: "white" }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#2c3e50" }}
            >
              Reportes de Instancias
            </Typography>
            <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
              {instanceFilter === "all"
                ? "Información estadística de todas las instancias"
                : `Información detallada de ${instanceFilter}`}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                size="small"
                onClick={handleDownloadPDF}
              >
                Exportar PDF
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* FILTROS */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Tipo de Reporte</InputLabel>
              <Select
                value={reportType}
                label="Tipo de Reporte"
                onChange={(e) => setReportType(e.target.value)}
              >
                {reportTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {type.icon}
                      {type.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Periodo</InputLabel>
              <Select
                value={dateRange}
                label="Periodo"
                onChange={(e) => setDateRange(e.target.value)}
              >
                {dateRanges.map((range) => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Instancia</InputLabel>
              <Select
                value={instanceFilter}
                label="Instancia"
                onChange={(e) => setInstanceFilter(e.target.value)}
              >
                {instanceFilters.map((filter) => (
                  <MenuItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleGenerateReport}
              >
                Generar
              </Button>
              <IconButton>
                <FilterIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      {/* KPI CARDS */}
      <Grid
        container
        spacing={2}
        sx={{
          mb: 3,
          width: "100%",
          margin: 0,
        }}
      >
        <Grid item xs={12} md sx={{ flexGrow: 1 }}>
          <Card sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Instancias
                  </Typography>

                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalInstances}
                  </Typography>
                </Box>

                <DomainIcon sx={{ fontSize: 40, color: "#3498db33" }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md sx={{ flexGrow: 1 }}>
          <Card sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Usuarios
                  </Typography>

                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalUsers}
                  </Typography>
                </Box>

                <GroupIcon sx={{ fontSize: 40, color: "#27ae6033" }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md sx={{ flexGrow: 1 }}>
          <Card sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Expedientes
                  </Typography>

                  <Typography variant="h4" fontWeight="bold">
                    {stats.totalExpedientes}
                  </Typography>
                </Box>

                <StorageIcon sx={{ fontSize: 40, color: "#f39c1233" }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <br />

      {/* TABLA DE INSTANCIAS - OCUPA TODO EL ANCHO */}
      <Paper sx={{ p: 2, borderRadius: 2, overflow: "hidden", mb: 3 }}>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Detalle de Instancias
        </Typography>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Instancia</strong>
                </TableCell>
                <TableCell>
                  <strong>Código</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Usuarios</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Activos</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Expedientes</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Nuevos</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Uptime</strong>
                </TableCell>
                <TableCell>
                  <strong>Estado</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Crecimiento</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.name} hover>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell align="right">{row.users}</TableCell>
                  <TableCell align="right">{row.activeUsers}</TableCell>
                  <TableCell align="right">{row.expedientes}</TableCell>
                  <TableCell align="right">{row.nuevosExpedientes}</TableCell>
                  <TableCell align="right">{row.uptime}%</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: getStatusColor(row.status) + "20",
                        color: getStatusColor(row.status),
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color={
                        row.crecimiento.includes("+")
                          ? "success.main"
                          : "error.main"
                      }
                    >
                      {row.crecimiento}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* SECCIÓN DE GRÁFICAS CON COLLAPSIBLES INDIVIDUALES */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          mb: 3,
          width: "100%",
        }}
      >
        <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
          Visualización de Datos
        </Typography>

        {/* LINE CHART */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" fontWeight="600">
                <ShowChartIcon
                  sx={{ mr: 1, verticalAlign: "middle", color: "#1976d2" }}
                />
                {getTrendTitle()}
              </Typography>
              <IconButton onClick={toggleLineChart} size="small">
                {showLineChart ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Collapse in={showLineChart} timeout="auto" unmountOnExit>
              <Box sx={{ height: 330 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredTrendData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tick={{ fontSize: 14 }} />
                    <YAxis tick={{ fontSize: 14 }} />
                    <RechartsTooltip />
                    <Legend wrapperStyle={{ fontSize: 14 }} />
                    <Line
                      type="monotone"
                      dataKey="CAAREM"
                      stroke="#1976d2"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="ANAM"
                      stroke="#2e7d32"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="SAT"
                      stroke="#d32f2f"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="SHCP"
                      stroke="#ed6c02"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="Aduanas"
                      stroke="#9c27b0"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Collapse>
          </Paper>
        </Grid>
        <br />
        {/* PIE CHART */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" fontWeight="600">
                <PieChartIcon
                  sx={{ mr: 1, verticalAlign: "middle", color: "#9c27b0" }}
                />
                Distribución de Expedientes
              </Typography>
              <IconButton onClick={togglePieChart} size="small">
                {showPieChart ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Collapse in={showPieChart} timeout="auto" unmountOnExit>
              <Box sx={{ height: 330 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expedientesChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      label
                    >
                      {expedientesChartData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Collapse>
          </Paper>
        </Grid>
        <br />
        {/* BAR CHART */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" fontWeight="600">
                <BarChartIcon
                  sx={{ mr: 1, verticalAlign: "middle", color: "#2e7d32" }}
                />
                Usuarios Activos
              </Typography>
              <IconButton onClick={toggleBarChart} size="small">
                {showBarChart ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Collapse in={showBarChart} timeout="auto" unmountOnExit>
              <Box sx={{ height: 330 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usersChartData}
                    margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                    <YAxis tick={{ fontSize: 14 }} />
                    <RechartsTooltip />
                    <Bar
                      dataKey="activos"
                      fill="#1976d2"
                      radius={[6, 6, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Collapse>
          </Paper>
        </Grid>
      </Paper>

      {/* ALERTAS (solo visible cuando hay) */}
    </Box>
  );
};

export default InstanceReports;
