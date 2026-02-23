// src/pages/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Avatar,
  Divider,
  InputAdornment,
  CircularProgress
} from "@mui/material";

import {
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  LockReset as LockResetIcon
} from "@mui/icons-material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setMessage(`Se han enviado instrucciones a ${email}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #ffffff 0%, #133B6B 50%, #1E4A7A 100%)",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
     

      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            bgcolor: "rgba(255,255,255,0.95)",
          }}
        >
          {/* Header igual que Login */}
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              background:
                "linear-gradient(135deg, #0D2A4D 0%, #133B6B 100%)",
            }}
          >
            <Avatar
              sx={{
                width: 90,
                height: 90,
                mx: "auto",
                mb: 2,
                bgcolor: "#00C2D1",
                color: "#0D2A4D",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              V
            </Avatar>

            <Typography
              variant="h3"
              sx={{ color: "white", fontWeight: 700 }}
            >
              VUGAA
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ color: "rgba(255,255,255,0.85)" }}
            >
              Recuperar contraseña
            </Typography>
          </Box>

          {/* Formulario */}
          <Box sx={{ p: 4 }}>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#64748b", mb: 3 }}
            >
              Ingresa tu correo electrónico y recibirás instrucciones para restablecer tu contraseña.
            </Typography>

            {message && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {message}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#64748b" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#00C2D1",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00C2D1",
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <LockResetIcon />
                    )
                  }
                  sx={{
                    py: 1.5,
                    bgcolor: "#133B6B",
                    "&:hover": {
                      bgcolor: "#0D2A4D",
                    },
                    textTransform: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  {loading
                    ? "Enviando..."
                    : "Enviar instrucciones"}
                </Button>
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: "center" }}>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#00C2D1",
                  fontWeight: 500,
                }}
              >
                Volver al inicio de sesión
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;