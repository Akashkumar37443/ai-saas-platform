import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: string;
  credits_remaining: number;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  adminLogin: (email: string, pass: string) => Promise<void>;
  demoLogin: (type: 'user' | 'admin') => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const u = localStorage.getItem('user') || localStorage.getItem('adminUser');
    return u ? JSON.parse(u) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token') || localStorage.getItem('adminToken');
  });

  useEffect(() => {
    // Optionally refresh user on mount
    if (token) {
      api.auth.me().then((freshUser) => {
        if (freshUser) {
          setUser(freshUser);
          localStorage.setItem(freshUser.role === 'admin' ? 'adminUser' : 'user', JSON.stringify(freshUser));
        }
      }).catch(() => {});
    }
  }, [token]);

  const login = async (email: string, pass: string) => {
    const res = await api.auth.login(email, pass);
    setUser(res.user);
    setToken(res.access_token);
  };

  const adminLogin = async (email: string, pass: string) => {
    const res = await api.auth.adminLogin(email, pass);
    setUser(res.user);
    setToken(res.access_token);
  };

  const demoLogin = async (type: 'user' | 'admin') => {
    const res = await api.auth.demoLogin(type);
    setUser(res.user);
    setToken(res.access_token);
  };

  const logout = () => {
    api.auth.logout();
    setUser(null);
    setToken(null);
  };

  const refreshUser = async () => {
    const freshUser = await api.auth.me();
    if (freshUser) {
      setUser(freshUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        adminLogin,
        demoLogin,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
