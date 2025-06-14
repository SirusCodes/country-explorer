"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Star, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FavoriteButtonProps {
  countryCca3: string;
}

export function FavoriteButton({ countryCca3 }: FavoriteButtonProps) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { addFavorite, removeFavorite, isFavorite, isLoading: favoritesLoading } = useFavorites();

  if (authLoading || favoritesLoading) {
    return (
      <Button variant="ghost" size="icon" disabled className="text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  if (!isAuthenticated) {
     return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" disabled className="text-muted-foreground cursor-not-allowed">
              <Star className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Login to add favorites</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const isFav = isFavorite(countryCca3);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if button is on a Link
    e.stopPropagation();
    if (isFav) {
      removeFavorite(countryCca3);
    } else {
      addFavorite(countryCca3);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleToggleFavorite}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            className={`transition-colors duration-200 ease-in-out ${isFav ? 'text-accent hover:text-accent/80' : 'text-muted-foreground hover:text-accent'}`}
          >
            <Star className={`h-5 w-5 ${isFav ? 'fill-accent' : ''}`} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFav ? 'Remove from favorites' : 'Add to favorites'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
