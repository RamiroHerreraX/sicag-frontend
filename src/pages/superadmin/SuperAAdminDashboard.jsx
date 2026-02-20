import React, { useState } from "react";
import {
  Box,
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
  Tooltip,
} from "@mui/material";
import {
  Domain as DomainIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";

import FolderIcon from "@mui/icons-material/Folder";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";


const SystemInstancesDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("24h");

  // Estadísticas de las instancias - Ampliado a 6 cards
  const systemStats = [
    {
      title: "Instancias Activas",
      value: "8",
      change: "+1",
      icon: <DomainIcon />,
      color: "#2c3e50",
      trend: "up",
      detail: "De 10 totales",
    },
    {
      title: "Usuarios Totales",
      value: "1,245",
      change: "+45",
      icon: <PersonIcon />,
      color: "#3498db",
      trend: "up",
      detail: "En todas las instancias",
    },
    {
      title: "Administradores",
      value: "15",
      change: "+2",
      icon: <AdminPanelSettingsIcon />,
      color: "#2ecc71",
      trend: "up",
      detail: "En todas las instancias",
    },
    {
      title: "Expedientes Totales",
      value: "3,842",
      change: "+124",
      icon: <FolderIcon />,
      color: "#f39c12",
      trend: "up",
      detail: "En todas las instancias",
    },
  ];

  // Instancias del sistema - Ampliado con más detalles
  const systemInstances = [
    {
      name: "Área de Ingeniería",
      code: "ENG-001",
      admin: "Dr. Carlos Méndez",
      users: 245,
      status: "active",
      uptime: "99.9%",
      cpu: "45%",
      memory: "32%",
      storage: "128/256 GB",
      lastBackup: "Hoy 02:00",
      alerts: 0,
      version: "v2.1.0",
    },
    {
      name: "Área de Medicina",
      code: "MED-001",
      admin: "Dra. Ana López",
      users: 189,
      status: "active",
      uptime: "99.8%",
      cpu: "52%",
      memory: "41%",
      storage: "189/256 GB",
      lastBackup: "Hoy 02:15",
      alerts: 1,
      version: "v2.1.0",
    },
    {
      name: "Programa de Posgrado",
      code: "POS-001",
      admin: "Mtro. Roberto Díaz",
      users: 78,
      status: "maintenance",
      uptime: "95.2%",
      cpu: "28%",
      memory: "35%",
      storage: "98/128 GB",
      lastBackup: "Ayer 23:00",
      alerts: 2,
      version: "v2.0.5",
    },
    {
      name: "Área de Derecho",
      code: "LAW-001",
      admin: "Lic. Fernando Gómez",
      users: 156,
      status: "inactive",
      uptime: "0%",
      cpu: "0%",
      memory: "0%",
      storage: "156/256 GB",
      lastBackup: "Hace 3 días",
      alerts: 3,
      version: "v2.0.0",
    },
    {
      name: "Campus Virtual",
      code: "VIR-001",
      admin: "Ing. Sofía Ramírez",
      users: 342,
      status: "active",
      uptime: "99.7%",
      cpu: "68%",
      memory: "72%",
      storage: "245/512 GB",
      lastBackup: "Hoy 02:30",
      alerts: 0,
      version: "v2.2.0",
    },
    {
      name: "Departamento de Ciencias",
      code: "SCI-001",
      admin: "Dr. Miguel Ángel Ruiz",
      users: 198,
      status: "active",
      uptime: "99.5%",
      cpu: "38%",
      memory: "44%",
      storage: "134/256 GB",
      lastBackup: "Hoy 02:45",
      alerts: 0,
      version: "v2.1.0",
    },
  ];
const instanceStats = [
  {
    type: "Instancias Activas",
    count: 5,
    percentage: 100,
    status: "excelente",
    trend: "+1",
    icon: <CheckCircleOutlineIcon sx={{ color: "#27ae60" }} />,
  },
  {
    type: "Instancias Inactivas",
    count: 0,
    percentage: 0,
    status: "excelente",
    trend: "0",
    icon: <ErrorOutlineIcon sx={{ color: "#95a5a6" }} />,
  },
  {
    type: "Expedientes Totales",
    count: "3,842",
    percentage: 100,
    status: "excelente",
    trend: "+124",
    icon: <FolderIcon sx={{ color: "#f39c12" }} />,
  },
  {
    type: "Usuarios Totales",
    count: "1,245",
    percentage: 100,
    status: "excelente",
    trend: "+45",
    icon: <PersonIcon sx={{ color: "#3498db" }} />,
  },
];
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

  const getInstanceStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#2ecc71";
      case "maintenance":
        return "#f39c12";
      case "inactive":
        return "#e74c3c";
      default:
        return "#7f8c8d";
    }
  };

  return (
    <Box
      sx={{
        p: 2.5,
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Header mejorado */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ color: "#2c3e50", fontWeight: "bold", mb: 0.5 }}
          >
            Dashboard de Instancias
          </Typography>
          <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
            Supervisión y estado de todas las instancias del sistema SICAG
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          

          
        </Box>
      </Box>

  {/* KPI Cards - 4 CARDS */}
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 2,
    mb: 3,
    width: "100%",
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  }}
>
  {systemStats.map((stat, index) => (
    <Card
      key={index}
      sx={{
        borderLeft: `4px solid ${stat.color}`,
        height: 120,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          p: 1.5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ color: stat.color }}>{stat.icon}</Box>
            <Typography
              variant="body2"
              sx={{
                color: "#7f8c8d",
                fontWeight: 500,
                fontSize: "0.75rem",
                lineHeight: 1.2,
              }}
            >
              {stat.title}
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: "#2c3e50",
              fontWeight: "bold",
              fontSize: "1.5rem",
              lineHeight: 1,
              textAlign: "right",
            }}
          >
            {stat.value}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 0.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#95a5a6",
              fontSize: "0.7rem",
              lineHeight: 1.2,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {stat.detail}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.25,
              flexShrink: 0,
            }}
          >
            {stat.trend !== "stable" && (
              <Box
                sx={{
                  width: 0,
                  height: 0,
                  borderLeft: "3px solid transparent",
                  borderRight: "3px solid transparent",
                  borderBottom:
                    stat.trend === "up"
                      ? "4px solid #27ae60"
                      : "4px solid #e74c3c",
                  transform:
                    stat.trend === "up" ? "none" : "rotate(180deg)",
                }}
              />
            )}
            <Chip
              label={stat.change}
              size="small"
              sx={{
                bgcolor:
                  stat.trend === "up"
                    ? "#2ecc7120"
                    : stat.trend === "down"
                    ? "#e74c3c20"
                    : "#7f8c8d20",
                color:
                  stat.trend === "up"
                    ? "#27ae60"
                    : stat.trend === "down"
                    ? "#e74c3c"
                    : "#7f8c8d",
                fontWeight: "bold",
                fontSize: "0.65rem",
                height: 20,
                minWidth: "auto",
                "& .MuiChip-label": {
                  px: 0.5,
                },
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  ))}
</Box>

      {/* Primera fila - Tabla y Estadísticas */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          width: "100%",
          "@media (max-width: 1200px)": {
            flexDirection: "column",
          },
        }}
      >
        {/* Tabla de Instancias - 60% */}
        <Box
          sx={{
            flex: 6,
            minHeight: "100%",
            "@media (max-width: 1200px)": {
              flex: "1 1 100%",
            },
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                p: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#2c3e50",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Instancias del Sistema
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Chip
                    label="6 INSTANCIAS"
                    size="small"
                    color="primary"
                    sx={{ fontSize: "0.65rem", height: 22 }}
                  />
                  <Chip
                    label="5 ACTIVAS"
                    size="small"
                    color="success"
                    sx={{ fontSize: "0.65rem", height: 22 }}
                  />
                </Box>
              </Box>

              <TableContainer sx={{ flex: 1, maxHeight: 360 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                      <TableCell
                        sx={{ fontWeight: "bold", py: 1, fontSize: "0.75rem" }}
                      >
                        Instancia
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", py: 1, fontSize: "0.75rem" }}
                      >
                        Estado
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", py: 1, fontSize: "0.75rem" }}
                      >
                        Uptime
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", py: 1, fontSize: "0.75rem" }}
                      >
                        CPU
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", py: 1, fontSize: "0.75rem" }}
                      >
                        Memoria
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", py: 1, fontSize: "0.75rem" }}
                      >
                        Usuarios
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold", py: 1, fontSize: "0.75rem" }}
                      >
                        Acciones
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {systemInstances.map((instance, index) => (
                      <TableRow key={index} hover>
                        <TableCell sx={{ py: 1 }}>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "500", color: "#2c3e50" }}
                            >
                              {instance.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "#7f8c8d" }}
                            >
                              {instance.code} • v{instance.version}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Chip
                            label={
                              instance.status === "active"
                                ? "ACTIVA"
                                : instance.status === "maintenance"
                                  ? "MANT"
                                  : "INACTIVA"
                            }
                            size="small"
                            sx={{
                              bgcolor: `${getInstanceStatusColor(instance.status)}20`,
                              color: getInstanceStatusColor(instance.status),
                              fontWeight: "bold",
                              fontSize: "0.7rem",
                              height: 20,
                              width: 70,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                instance.uptime === "0%"
                                  ? "#e74c3c"
                                  : "#2c3e50",
                              fontWeight:
                                instance.uptime === "0%" ? "bold" : "normal",
                            }}
                          >
                            {instance.uptime}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <LinearProgress
                              variant="determinate"
                              value={parseInt(instance.cpu)}
                              sx={{
                                width: 50,
                                height: 4,
                                borderRadius: 2,
                                bgcolor: "#ecf0f1",
                                "& .MuiLinearProgress-bar": {
                                  bgcolor:
                                    parseInt(instance.cpu) > 70
                                      ? "#e74c3c"
                                      : parseInt(instance.cpu) > 50
                                        ? "#f39c12"
                                        : "#27ae60",
                                },
                              }}
                            />
                            <Typography variant="caption">
                              {instance.cpu}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <LinearProgress
                              variant="determinate"
                              value={parseInt(instance.memory)}
                              sx={{
                                width: 50,
                                height: 4,
                                borderRadius: 2,
                                bgcolor: "#ecf0f1",
                                "& .MuiLinearProgress-bar": {
                                  bgcolor:
                                    parseInt(instance.memory) > 70
                                      ? "#e74c3c"
                                      : parseInt(instance.memory) > 50
                                        ? "#f39c12"
                                        : "#27ae60",
                                },
                              }}
                            />
                            <Typography variant="caption">
                              {instance.memory}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "500" }}
                          >
                            {instance.users}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 1 }}>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Tooltip title="Ver detalles">
                              <IconButton size="small">
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Configurar">
                              <IconButton size="small">
                                <SettingsIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  pt: 1.5,
                  borderTop: "1px solid #ecf0f1",
                }}
              >
                <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
                  Mostrando 6 de 8 instancias totales • Último backup: Hoy 02:45
                </Typography>
                <Button
                  size="small"
                  endIcon={<DomainIcon />}
                  sx={{ fontSize: "0.75rem" }}
                >
                  Ver todas
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Estadísticas de Instancias - 40% */}
        <Box
          sx={{
            flex: 4,
            minHeight: "100%",
            "@media (max-width: 1200px)": {
              flex: "1 1 100%",
            },
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                p: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#2c3e50",
                  mb: 2,
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Estadísticas por Tipo
              </Typography>

              <Stack spacing={2.5} sx={{ flex: 1 }}>
                {instanceStats.map((stat, index) => (
                  <Box key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {stat.icon}
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", color: "#2c3e50" }}
                        >
                          {stat.type}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: stat.trend.startsWith("+")
                              ? "#27ae60"
                              : stat.trend === "0"
                                ? "#7f8c8d"
                                : "#e74c3c",
                            fontWeight: "bold",
                          }}
                        >
                          {stat.trend}
                        </Typography>
                        <Chip
                          label={stat.count}
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor(stat.status)}20`,
                            color: getStatusColor(stat.status),
                            fontWeight: "bold",
                            fontSize: "0.7rem",
                            height: 20,
                          }}
                        />
                      </Box>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={stat.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#ecf0f1",
                        mb: 1,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getStatusColor(stat.status),
                          borderRadius: 4,
                        },
                      }}
                    />

                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
                        {stat.percentage}% del total
                      </Typography>
                      <Chip
                        label={stat.status.toUpperCase()}
                        size="small"
                        sx={{
                          bgcolor: `${getStatusColor(stat.status)}10`,
                          color: getStatusColor(stat.status),
                          fontSize: "0.6rem",
                          height: 18,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
                  Rendimiento global
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: 1,
                        bgcolor: "#27ae60",
                      }}
                    />
                    <Typography variant="caption">Óptimo</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: 1,
                        bgcolor: "#f39c12",
                      }}
                    />
                    <Typography variant="caption">Regular</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: 1,
                        bgcolor: "#e74c3c",
                      }}
                    />
                    <Typography variant="caption">Crítico</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Footer mejorado */}
      <Box
        sx={{
          mt: 3,
          pt: 2,
          borderTop: "1px solid #dfe6e9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
            Sistema de Instancias SICAG • Última actualización: Hoy 10:30 AM
          </Typography>
          <Chip
            label="v2.1.0"
            size="small"
            variant="outlined"
            sx={{ height: 20, fontSize: "0.6rem" }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CheckCircleIcon sx={{ fontSize: 12, color: "#27ae60" }} />
            <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
              5/6 instancias operativas
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ height: 16 }} />
          <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
            Uptime global: 82.3%
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ height: 16 }} />
          <Typography variant="caption" sx={{ color: "#7f8c8d" }}>
            Alertas: 3
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SystemInstancesDashboard;
