import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('phasecore_admin');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('phasecore_token', data.token);
      localStorage.setItem('phasecore_admin', JSON.stringify(data.admin));
      setAdmin(data.admin);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('phasecore_token');
    localStorage.removeItem('phasecore_admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
