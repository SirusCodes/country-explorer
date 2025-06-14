"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Star, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

interface FavoriteButtonProps {
  countryCca3: string;
}

export function FavoriteButton({ countryCca3 }: FavoriteButtonProps) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
    isLoading: favoritesLoading,
  } = useFavorites();

  if (authLoading || favoritesLoading) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="text-muted-foreground"
      >
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  const isFav = isFavorite(countryCca3);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      redirect("/login");
    }
    if (isFav) {
      removeFavorite(countryCca3);
    } else {
      addFavorite(countryCca3);
    }
  };

  return (
    <Button
      variant="secondary"
      className="p-0 hover:bg-secondary/80"
      size="icon"
      onClick={handleClick}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
    >
      <Star className={`h-5 w-5 ${isFav ? "fill-accent" : ""}`} />
    </Button>
  );
}
