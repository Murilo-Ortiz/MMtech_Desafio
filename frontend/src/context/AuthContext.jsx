import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import * as api from '../services/api'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); 

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      api.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const decodedUser = jwtDecode(token);
      setUser(decodedUser.user);
    } else {
      localStorage.removeItem('token');
      delete api.api.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await api.login(email, password);
    setToken(response.data.token);
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
