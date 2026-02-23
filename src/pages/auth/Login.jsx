// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Lock as LockIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    // Validaciones
    let isValid = true;

    if (!email) {
      setEmailError("El email es obligatorio");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Formato de email inválido");
      isValid = false;
    }

    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    // Simular login
    setTimeout(() => {
      try {
        const userData = login({ email, password });

        switch (userData.role) {
          case "supera":
            navigate("/supera/dashboard");
            break;
          case "comite":
            navigate("/committee/dashboard");
            break;
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "asociacion":
            navigate("/association/dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } catch (err) {
        setError("Credenciales inválidas");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleDemoLogin = (role) => {
    const demos = {
      supera: { email: "supera@vugaa.com", label: "Super Admin" },
      admin: { email: "admin@caaarem.com", label: "Admin" },
      comite: { email: "comite@caaarem.com", label: "Comité" },
      asociacion: { email: "asociacion@caaarem.com", label: "Asociación" },
      agente: { email: "agente@caaarem.com", label: "Agente" },
    };

    if (demos[role]) {
      setEmail(demos[role].email);
      setPassword("demo123");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0D2A4D 0%, #133B6B 50%, #1E4A7A 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            bgcolor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          {/* Header con gradiente institucional */}
          <Box
            sx={{
              bgcolor: "#133B6B",
              p: 4,
              textAlign: "center",
              background: "linear-gradient(135deg, #0D2A4D 0%, #133B6B 100%)",
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
                boxShadow: "0 4px 15px rgba(0,194,209,0.3)",
              }}
            >
              V
            </Avatar>
            <Typography
              variant="h3"
              sx={{ color: "white", fontWeight: 700, letterSpacing: 1, mb: 1 }}
            >
              VUGAA
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 300 }}>
              Ventanilla Única de Gestión de Agentes Aduanales
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* Email */}
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                  required
                  variant="outlined"
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
                    },
                  }}
                />

                {/* Password */}
                <TextField
                  fullWidth
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#64748b" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                  sx={{
                    py: 1.5,
                    bgcolor: "#133B6B",
                    "&:hover": {
                      bgcolor: "#0D2A4D",
                    },
                    textTransform: "none",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  }}
                >
                  {loading ? "Iniciando sesión..." : "Ingresar al sistema"}
                </Button>
              </Stack>
            </Box>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Link
                to="/forgot-password"
                style={{
                  textDecoration: "none",
                  color: "#00C2D1",
                  fontWeight: 500,
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" sx={{ color: "#94a3b8", px: 2 }}>
                DEMO
              </Typography>
            </Divider>

            {/* Demo Login Buttons */}
            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" useFlexGap>
              {[
                { role: "supera", label: "Super", color: "#6C5CE7" },
                { role: "admin", label: "Admin", color: "#133B6B" },
                { role: "comite", label: "Comité", color: "#00C2D1" },
                { role: "asociacion", label: "Asociación", color: "#00A8A8" },
                { role: "agente", label: "Agente", color: "#35D0FF" },
              ].map((item) => (
                <Button
                  key={item.role}
                  variant="outlined"
                  size="small"
                  onClick={() => handleDemoLogin(item.role)}
                  sx={{
                    textTransform: "capitalize",
                    borderColor: item.color,
                    color: item.color,
                    "&:hover": {
                      borderColor: item.color,
                      bgcolor: `${item.color}10`,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;