"use client";

import type { User } from "@/lib/types";
import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => void;
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
      const storedAuth = localStorage.getItem("countryExplorerAuth");
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

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        const userData = { name: username };
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem(
          "countryExplorerAuth",
          JSON.stringify({ isAuthenticated: true, user: userData }),
        );
      } else {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("countryExplorerAuth");
        throw new Error(data.error || "Login failed");
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("countryExplorerAuth");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      await fetch("/api/logout", { method: "POST" });
      localStorage.removeItem("countryExplorerAuth");
    } catch (error) {
      console.error("Failed to logout on server", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
