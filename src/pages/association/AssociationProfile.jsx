import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  CameraAlt as CameraIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  VerifiedUser as VerifiedIcon,
  CalendarToday as CalendarIcon,
  AccountBalance as BalanceIcon,
} from "@mui/icons-material";

const AssociationProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [editStatsMode, setEditStatsMode] = useState(false);

  // Datos de la asociación
  const [association, setAssociation] = useState({
    nombre: "Asociación Aduanal del Norte, S.A. de C.V.",
    rfc: "AAN240101XYZ",
    regimenFiscal: "Personas Morales con Fines No Lucrativos",
    fechaConstitucion: "15/01/2020",
    representanteLegal: "Luis Rodríguez Martínez",
    representanteRFC: "RODL800101ABC",
    telefono: "+52 55 1234 5678",
    email: "contacto@asociacionnorte.com",
    paginaWeb: "www.asociacionnorte.com",
    regimenSAT: "Régimen General",
    numeroCertificacionSAT: "SAT-2020-001234",
    vigenciaCertificacionSAT: "15/01/2026",

    // Dirección
    domicilioFiscal: "Av. Industrial 1234, Parque Industrial del Norte",
    colonia: "Parque Industrial",
    ciudad: "Monterrey",
    estado: "Nuevo León",
    codigoPostal: "66470",

    // Contactos adicionales
    contactoAdministrativo: "Ana Martínez González",
    telefonoAdministrativo: "+52 55 8765 4321",
    emailAdministrativo: "administracion@asociacionnorte.com",
    contactoTecnico: "Carlos López Hernández",
    telefonoTecnico: "+52 55 5555 5555",
    emailTecnico: "soporte@asociacionnorte.com",

    // Estadísticas de la asociación
    estadisticas: {
      totalAgentes: 45,
      agentesActivos: 28,
      agentesInactivos: 17,
      operacionesHoy: 156,
      promedioDiario: 180,
      cumplimientoSAT: 94,
      certificacionesActivas: 125,
      certificacionesPorVencer: 8,
      auditoriasPendientes: 3,
      satisfaccionClientes: 92,
    },
  });

  const handleChange = (field) => (e) => {
    setAssociation({
      ...association,
      [field]: e.target.value,
    });
  };

  const handleStatChange = (field) => (e) => {
    setAssociation({
      ...association,
      estadisticas: {
        ...association.estadisticas,
        [field]: parseInt(e.target.value) || 0,
      },
    });
  };

  const handleSave = () => {
    setEditMode(false);
    setEditStatsMode(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f5f7fa",
        overflow: "hidden",
      }}
    >
      {/* Header fijo - compacto */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 1,
          bgcolor: "white",
          borderRadius: 0,
          borderBottom: "1px solid #e0e0e0",
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <BusinessIcon sx={{ fontSize: 28, color: "#3498db" }} />
            <Box>
              <Typography
                variant="h6"
                sx={{ color: "#2c3e50", fontWeight: "bold", mb: 0.25 }}
              >
                Perfil de la Asociación
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Sistema de Gestión y Administración Aduanal
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1}>
            {!editMode ? (
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                onClick={() => setEditMode(true)}
                sx={{
                  fontWeight: "600",
                  textTransform: "none",
                  bgcolor: "#3498db",
                  minWidth: 120,
                  height: 34,
                  fontSize: "0.8rem",
                }}
              >
                Editar Perfil
              </Button>
            ) : (
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                color="success"
                onClick={handleSave}
                sx={{
                  fontWeight: "600",
                  textTransform: "none",
                  minWidth: 140,
                  height: 34,
                  fontSize: "0.8rem",
                }}
              >
                Guardar Cambios
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>

      <Box
        sx={{
          flex: 1,
          p: 1.5,
          overflow: "hidden",
          display: "flex",
          gap: 1.5,
        }}
      >
      
        
          <Card
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: 1.5,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                p: 2,
                "&:last-child": { pb: 2 },
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1.5,
                  pb: 1,
                  borderBottom: "2px solid #2c3e50",
                  flexShrink: 0,
                }}
              >
                <BalanceIcon sx={{ color: "#3498db", fontSize: 20, mr: 1 }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#2c3e50",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                  }}
                >
                  Datos Fiscales y Legales
                </Typography>
              </Box>

              {/* Contenedor con scroll */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  overflowX: "hidden",
                  pr: 0.5,
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#c1c1c1",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#a8a8a8",
                  },
                }}
              >
                <Stack spacing={1.5}>
                  <Card
                    sx={{
                      flex: "0 0 auto",
                      borderRadius: 1.5,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      border: "1px solid rgba(52, 152, 219, 0.1)",
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 70,
                            height: 70,
                            bgcolor: "#3498db",
                            border: "3px solid #e8f4fd",
                            flexShrink: 0,
                          }}
                        >
                          <BusinessIcon sx={{ fontSize: 32 }} />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{
                              color: "#2c3e50",
                              fontSize: "0.95rem",
                              lineHeight: 1.2,
                              mb: 0.5,
                            }}
                          >
                            {association.nombre}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={0.75}
                            sx={{ mb: 1, flexWrap: "wrap" }}
                          >
                            <Chip
                              label={`RFC: ${association.rfc}`}
                              color="primary"
                              variant="outlined"
                              size="small"
                              sx={{ fontWeight: "600", fontSize: "0.7rem" }}
                            />
                            <Chip
                              label="Certificada SAT"
                              color="success"
                              size="small"
                              sx={{ fontWeight: "600", fontSize: "0.7rem" }}
                            />
                          </Stack>

                          <Box
                            sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
                          >
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem" }}
                              >
                                Representante Legal
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#2c3e50",
                                  fontWeight: "600",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {association.representanteLegal}
                              </Typography>
                            </Box>

                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem" }}
                              >
                                Constitución
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#2c3e50",
                                  fontWeight: "600",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {association.fechaConstitucion}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1.5 }} />

                      <Stack spacing={0.75}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                          }}
                        >
                          <PhoneIcon sx={{ fontSize: 14, color: "#7f8c8d" }} />
                          <Typography
                            variant="caption"
                            sx={{ color: "#7f8c8d", fontSize: "0.75rem" }}
                          >
                            {association.telefono}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                          }}
                        >
                          <EmailIcon sx={{ fontSize: 14, color: "#7f8c8d" }} />
                          <Typography
                            variant="caption"
                            sx={{ color: "#7f8c8d", fontSize: "0.75rem" }}
                          >
                            {association.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                  
                  {/* Información fiscal */}
                  <Box>
                    <Typography
                      variant="caption"
                      fontWeight="600"
                      sx={{
                        color: "#2c3e50",
                        display: "block",
                        mb: 0.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      Información Fiscal
                    </Typography>

                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "#f8f9fa",
                        borderRadius: 1,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Stack spacing={1}>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            RFC
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "600", fontSize: "0.85rem" }}
                          >
                            {association.rfc}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            Régimen Fiscal
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.85rem" }}
                          >
                            {association.regimenFiscal}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            Certificación SAT
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontSize: "0.85rem" }}
                            >
                              {association.numeroCertificacionSAT}
                            </Typography>
                            <Chip
                              label={`Vence: ${association.vigenciaCertificacionSAT}`}
                              size="small"
                              color="success"
                              variant="outlined"
                              sx={{ fontSize: "0.65rem", height: 20 }}
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>

                  {/* Representante Legal */}
                  <Box>
                    <Typography
                      variant="caption"
                      fontWeight="600"
                      sx={{
                        color: "#2c3e50",
                        display: "block",
                        mb: 0.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      Representante Legal
                    </Typography>

                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "#f8f9fa",
                        borderRadius: 1,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Stack spacing={1}>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            Nombre
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "600", fontSize: "0.85rem" }}
                          >
                            {association.representanteLegal}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            RFC
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.85rem" }}
                          >
                            {association.representanteRFC}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>

                  {/* Domicilio Fiscal */}
                  <Box>
                    <Typography
                      variant="caption"
                      fontWeight="600"
                      sx={{
                        color: "#2c3e50",
                        display: "block",
                        mb: 0.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      Domicilio Fiscal
                    </Typography>

                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "#f8f9fa",
                        borderRadius: 1,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "0.85rem", mb: 0.5 }}
                        >
                          {association.domicilioFiscal}
                        </Typography>

                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem" }}
                              >
                                Ciudad
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ fontSize: "0.85rem" }}
                              >
                                {association.ciudad}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem" }}
                              >
                                Estado
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ fontSize: "0.85rem" }}
                              >
                                {association.estado}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem" }}
                              >
                                Colonia
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ fontSize: "0.85rem" }}
                              >
                                {association.colonia}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem" }}
                              >
                                Código Postal
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ fontSize: "0.85rem" }}
                              >
                                {association.codigoPostal}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Box>
                  </Box>

                  {/* Información de Contacto */}
                  <Box>
                    <Typography
                      variant="caption"
                      fontWeight="600"
                      sx={{
                        color: "#2c3e50",
                        display: "block",
                        mb: 0.5,
                        fontSize: "0.8rem",
                      }}
                    >
                      Información de Contacto
                    </Typography>

                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "#f8f9fa",
                        borderRadius: 1,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Stack spacing={1}>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            Teléfono
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.85rem" }}
                          >
                            {association.telefono}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            Correo Electrónico
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.85rem" }}
                          >
                            {association.email}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            Página Web
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.85rem" }}
                          >
                            {association.paginaWeb}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </Stack>
              </Box>


              
            </CardContent>
          </Card>


        </Box>
     
    </Box>
  );
};

export default AssociationProfile;
