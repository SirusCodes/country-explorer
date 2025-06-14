"use client";

import type { User } from '@/lib/types';
import type { Dispatch, ReactNode, SetStateAction} from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('countryExplorerAuth');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(authData.isAuthenticated);
        setUser(authData.user);
      }
    } catch (error) {
      console.error("Failed to load auth state from localStorage", error);
    }
    setLoading(false);
  }, []);

  const login = (username: string) => {
    const userData = { name: username };
    setIsAuthenticated(true);
    setUser(userData);
    try {
      localStorage.setItem('countryExplorerAuth', JSON.stringify({ isAuthenticated: true, user: userData }));
    } catch (error) {
      console.error("Failed to save auth state to localStorage", error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem('countryExplorerAuth');
    } catch (error) {
      console.error("Failed to remove auth state from localStorage", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
