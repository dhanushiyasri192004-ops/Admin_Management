import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { getRoleDashboardPath } from '../utils/permissions';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [token, setToken] = useState(authService.getToken());
  const [loading, setLoading] = useState(true);
  const [demoAdmins, setDemoAdmins] = useState([]);

  useEffect(() => {
    async function initAuth() {
      try {
        if (token) {
          const res = await authService.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('ams_user', JSON.stringify(res.user));
          }
        }
      } catch (err) {
        console.warn('Session expired or invalid, logging out.');
        authService.logout();
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    }

    async function loadDemoAdmins() {
      try {
        const res = await authService.getDemoAdmins();
        if (res.success) {
          setDemoAdmins(res.admins);
        }
      } catch (e) {
        console.error('Could not load demo admins', e);
      }
    }

    initAuth();
    loadDemoAdmins();
  }, [token]);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res.success) {
      setUser(res.user);
      setToken(res.token);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const loginAsRole = async (email) => {
    // Quick demo 1-click login
    return await login(email, 'admin123');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      loginAsRole,
      logout,
      demoAdmins,
      isAuthenticated: !!token && !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
