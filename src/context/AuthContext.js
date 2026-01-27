import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Datos mock para demo
  const mockUsers = {
    agente: {
      id: 1,
      name: 'Luis Rodriguez',
      email: 'luis@ejemplo.com',
      role: 'agente',
      region: 'Norte',
      avatar: 'LR'
    },
    comite: {
      id: 2,
      name: 'María González',
      email: 'maria@ejemplo.com',
      role: 'comite',
      region: 'Centro',
      avatar: 'MG'
    },
    admin: {
      id: 3,
      name: 'Admin Sistema',
      email: 'admin@ejemplo.com',
      role: 'admin',
      region: 'Todas',
      avatar: 'AS'
    },
    asociacion: { // ✅ NUEVO ROL
      id: 4,
      name: 'Asociación Aduanal',
      email: 'asociacion@ejemplo.com',
      role: 'asociacion',
      region: 'Regional',
      avatar: 'AA'
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('sicag_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Para demo, iniciar como agente por defecto
      setUser(mockUsers.agente);
    }
    setLoading(false);
  }, []);

  const login = (credentials) => {
    let userData;

    if (credentials.email.includes('comite')) {
      userData = mockUsers.comite;
    } else if (credentials.email.includes('admin')) {
      userData = mockUsers.admin;
    } else if (credentials.email.includes('asociacion')) {
      userData = mockUsers.asociacion; // ✅ ASOCIACIÓN
    } else {
      userData = mockUsers.agente;
    }

    setUser(userData);
    localStorage.setItem('sicag_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sicag_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('sicag_user', JSON.stringify(updatedUser));
  };

  const switchUserRole = (role) => {
    const userData = mockUsers[role];
    if (userData) {
      setUser(userData);
      localStorage.setItem('sicag_user', JSON.stringify(userData));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateUser,
      switchUserRole,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
