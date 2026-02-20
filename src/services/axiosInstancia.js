import axios from "axios";

// ==========================================
// CONFIGURACIÓN BASE
// ==========================================

// Cambia esto por tu URL real del backend
const API_BASE_URL = "http://localhost:8080/instancias";

// Crear instancia de axios
const axiosInstancia = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// INTERCEPTOR (OPCIONAL PARA JWT FUTURO)
// ==========================================

axiosInstancia.interceptors.request.use(
  (config) => {
    // Si después usas JWT
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// API METHODS
// ==========================================

// Obtener todas las instancias
export const getInstancias = async () => {
  try {
    const response = await axiosInstancia.get("/");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo instancias:", error);
    throw error;
  }
};

// Obtener instancia por código
export const getInstanciaByCodigo = async (codigo) => {
  try {
    const response = await axiosInstancia.get(`/${codigo}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo instancia:", error);
    throw error;
  }
};

// Crear instancia
export const crearInstancia = async (data) => {
  try {
    const response = await axiosInstancia.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Error creando instancia:", error);
    throw error;
  }
};

// Editar instancia
export const editarInstancia = async (codigo, data) => {
  try {
    const response = await axiosInstancia.put(`/${codigo}`, data);
    return response.data;
  } catch (error) {
    console.error("Error editando instancia:", error);
    throw error;
  }
};

// Activar / desactivar instancia
export const cambiarEstadoInstancia = async (codigo, activa) => {
  try {
    const response = await axiosInstancia.patch(
      `/${codigo}/estado?activa=${activa}`
    );
    return response.data;
  } catch (error) {
    console.error("Error cambiando estado:", error);
    throw error;
  }
};

export default axiosInstancia;
