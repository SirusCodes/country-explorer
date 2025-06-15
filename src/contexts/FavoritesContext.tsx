"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

interface FavoritesContextType {
  favoriteCountries: string[];
  addFavorite: (cca3: string) => void;
  removeFavorite: (cca3: string) => void;
  isFavorite: (cca3: string) => boolean;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [favoriteCountries, setFavoriteCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    setIsLoading(true);
    if (isAuthenticated && user) {
      try {
        const storedFavorites = localStorage.getItem(`favorites_${user.name}`);
        if (storedFavorites) {
          setFavoriteCountries(JSON.parse(storedFavorites));
        } else {
          setFavoriteCountries([]);
        }
      } catch (error) {
        console.error("Failed to load favorites from localStorage", error);
        setFavoriteCountries([]);
      }
    } else {
      setFavoriteCountries([]); // Clear favorites if not authenticated
    }
    setIsLoading(false);
  }, [isAuthenticated, user, authLoading]);

  useEffect(() => {
    if (isAuthenticated && user && !isLoading && !authLoading) {
      try {
        localStorage.setItem(
          `favorites_${user.name}`,
          JSON.stringify(favoriteCountries),
        );
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favoriteCountries, isAuthenticated, user, isLoading, authLoading]);

  const addFavorite = (cca3: string) => {
    if (!isAuthenticated) return;
    setFavoriteCountries((prevFavorites) => {
      if (prevFavorites.includes(cca3)) return prevFavorites;
      return [...prevFavorites, cca3];
    });
  };

  const removeFavorite = (cca3: string) => {
    if (!isAuthenticated) return;
    setFavoriteCountries((prevFavorites) =>
      prevFavorites.filter((favCca3) => favCca3 !== cca3),
    );
  };

  const isFavorite = (cca3: string): boolean => {
    if (!isAuthenticated) return false;
    return favoriteCountries.includes(cca3);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteCountries,
        addFavorite,
        removeFavorite,
        isFavorite,
        isLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
