"use client";

import { FavoriteButton } from './FavoriteButton';

interface FavoriteButtonWrapperProps {
  countryCca3: string;
}

export function FavoriteButtonWrapper({ countryCca3 }: FavoriteButtonWrapperProps) {
  return <FavoriteButton countryCca3={countryCca3} />;
}
