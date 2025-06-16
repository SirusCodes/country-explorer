"use client";

import type { User } from "@/lib/types";
import { authenticate } from "@/services/authService";
import type { ReactNode } from "react";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useTransition,
} from "react";

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
  const [loading, startTransition] = useTransition();

  useEffect(() => {
    try {
      startTransition(() => {
        const storedAuth = localStorage.getItem("countryExplorerAuth");
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          setIsAuthenticated(authData.isAuthenticated);
          setUser(authData.user);
        }
      });
    } catch (error) {
      console.error("Failed to load auth state from localStorage", error);
    }
  }, []);

  const login = (username: string, password: string) => {
    startTransition(async () => {
      const valid = await authenticate(username, password);
      if (valid) {
        const userData = { name: username };
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem(
          "countryExplorerAuth",
          JSON.stringify({ isAuthenticated: true, user: userData }),
        );
        return;
      }

      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("countryExplorerAuth");
    });
  };

  const logout = async () => {
    startTransition(() => {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("countryExplorerAuth");
    });
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
