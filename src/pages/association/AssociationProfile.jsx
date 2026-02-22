import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";

import {
  Edit as EditIcon,
  Save as SaveIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
  AccountBalance as BalanceIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

const AssociationProfile = () => {
  const [editMode, setEditMode] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: "Asociación Aduanal del Norte, S.A. de C.V.",
    rfc: "AAN240101XYZ",
    regimenFiscal: "Personas Morales con Fines No Lucrativos",
    fechaConstitucion: "15/01/2020",
    representanteLegal: "Luis Rodríguez Martínez",
    telefono: "+52 55 1234 5678",
    email: "contacto@asociacionnorte.com",
    paginaWeb: "www.asociacionnorte.com",
    numeroCertificacionSAT: "SAT-2020-001234",
    vigenciaCertificacionSAT: "15/01/2026",
    domicilioFiscalLinea1: "Av. Industrial 1234, Parque Industrial del Norte",
    domicilioFiscalLinea2: "Monterrey, Nuevo León, CP 66470",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Aquí puedes agregar la lógica para guardar los datos en tu backend
    console.log("Datos guardados:", formData);
  };

  const cardStyle = {
    height: "100%",
    borderRadius: 3,
    bgcolor: "#f9fafb",
    border: "1px solid #e5e7eb",
  };

  const renderTextField = (name, label, value, multiline = false, rows = 1) => (
    editMode ? (
      <TextField
        fullWidth
        size="small"
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        variant="outlined"
        multiline={multiline}
        rows={rows}
        sx={{ mt: 0.5 }}
      />
    ) : (
      <Typography>{value || "No especificado"}</Typography>
    )
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      {/* HEADER */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderBottom: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <BusinessIcon sx={{ fontSize: 32, color: "#1976d2" }} />

            <Box>
              <Typography variant="h6" fontWeight="bold">
                Perfil de la Asociación
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Datos fiscales y legales
              </Typography>
            </Box>
          </Box>

          <Button
            startIcon={editMode ? <SaveIcon /> : <EditIcon />}
            variant="contained"
            color={editMode ? "success" : "primary"}
            onClick={editMode ? handleSave : () => setEditMode(true)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
          >
            {editMode ? "Guardar Cambios" : "Editar Perfil"}
          </Button>
        </Box>
      </Paper>

      {/* CONTENIDO */}
      <Box sx={{ maxWidth: 1400, mx: "auto", p: 3 }}>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            {/* CABECERA SUPERIOR */}
            <Grid container spacing={3} alignItems="center">
              {/* Avatar */}
              <Grid item xs={12} md="auto">
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    bgcolor: "#1976d2",
                  }}
                >
                  <BusinessIcon sx={{ fontSize: 50 }} />
                </Avatar>
              </Grid>

              {/* Info principal */}
              <Grid item xs>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="nombre"
                    label="Nombre de la Asociación"
                    value={formData.nombre}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                ) : (
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {formData.nombre}
                  </Typography>
                )}

                <Stack direction="row" spacing={1} mb={2}>
                  <Chip
                    label={`RFC: ${formData.rfc}`}
                    variant="outlined"
                    color="primary"
                  />

                  <Chip
                    label="Certificada SAT"
                    color="success"
                    icon={<BadgeIcon />}
                  />
                </Stack>

                <Stack direction="row" spacing={3} flexWrap="wrap">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      <b>Representante:</b> {formData.representanteLegal}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      <b>Constitución:</b> {formData.fechaConstitucion}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* GRID PRINCIPAL */}
<Grid container spacing={3} columns={12} wrap="nowrap">
              {/* Fiscal */}
  <Grid item xs={3}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Stack direction="row" spacing={1} mb={2}>
                      <BalanceIcon color="primary" />
                      <Typography fontWeight="bold">
                        Información Fiscal
                      </Typography>
                    </Stack>

                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          RFC
                        </Typography>
                        {renderTextField("rfc", "RFC", formData.rfc)}
                      </Box>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Régimen
                        </Typography>
                        {renderTextField("regimenFiscal", "Régimen Fiscal", formData.regimenFiscal)}
                      </Box>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Certificación SAT
                        </Typography>
                        {renderTextField("numeroCertificacionSAT", "Número de Certificación", formData.numeroCertificacionSAT)}
                        
                        <Box sx={{ mt: 1 }}>
                          {renderTextField("vigenciaCertificacionSAT", "Vigencia", formData.vigenciaCertificacionSAT)}
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Representante */}
  <Grid item xs={3}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Stack direction="row" spacing={1} mb={2}>
                      <PersonIcon color="primary" />
                      <Typography fontWeight="bold">
                        Representante Legal
                      </Typography>
                    </Stack>

                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption">Nombre</Typography>
                        {renderTextField("representanteLegal", "Representante Legal", formData.representanteLegal)}
                      </Box>

                      <Box>
                        <Typography variant="caption">
                          Fecha designación
                        </Typography>
                        {renderTextField("fechaConstitucion", "Fecha de Constitución", formData.fechaConstitucion)}
                      </Box>

                      <Box>
                        <Typography variant="caption">Vigencia</Typography>
                        {renderTextField("vigenciaCertificacionSAT", "Vigencia", formData.vigenciaCertificacionSAT)}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Domicilio */}
  <Grid item xs={3}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Stack direction="row" spacing={1} mb={2}>
                      <LocationIcon color="primary" />
                      <Typography fontWeight="bold">
                        Domicilio Fiscal
                      </Typography>
                    </Stack>
                    
                    <Box mb={1}>
                      {renderTextField("domicilioFiscalLinea1", "Línea 1", formData.domicilioFiscalLinea1)}
                    </Box>
                    
                    <Box>
                      {renderTextField("domicilioFiscalLinea2", "Línea 2", formData.domicilioFiscalLinea2)}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Contacto */}
  <Grid item xs={3}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <Stack direction="row" spacing={1} mb={2}>
                      <PhoneIcon color="primary" />
                      <Typography fontWeight="bold">Contacto</Typography>
                    </Stack>

                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <PhoneIcon fontSize="small" />
                        {editMode ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography>{formData.telefono}</Typography>
                        )}
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <EmailIcon fontSize="small" />
                        {editMode ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography>{formData.email}</Typography>
                        )}
                      </Stack>

                      <Stack direction="row" spacing={1} alignItems="center">
                        <LanguageIcon fontSize="small" />
                        {editMode ? (
                          <TextField
                            fullWidth
                            size="small"
                            name="paginaWeb"
                            value={formData.paginaWeb}
                            onChange={handleChange}
                          />
                        ) : (
                          <Typography>{formData.paginaWeb}</Typography>
                        )}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* CERTIFICACION */}
            <Card
              sx={{
                mt: 3,
                borderRadius: 3,
                bgcolor: "#eef6ff",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="caption">Certificación SAT</Typography>
                  <Typography fontWeight="bold">
                    {formData.numeroCertificacionSAT}
                  </Typography>
                </Box>

                <Chip
                  color="success"
                  label={`Vigente hasta ${formData.vigenciaCertificacionSAT}`}
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AssociationProfile;