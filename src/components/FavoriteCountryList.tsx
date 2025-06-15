"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { useMemo } from "react";
import { CountrySummary } from "@/lib/types";
import { CountriesExplorer } from "./CountriesExplorer";

type FavoriteCountryListProps = {
  countries: CountrySummary[];
  regions: string[];
};

export const FavoriteCountryList = ({
  countries,
  regions,
}: FavoriteCountryListProps) => {
  const { favoriteCountries } = useFavorites();

  const favoriteCountriesData = useMemo(() => {
    return countries.filter((country) =>
      favoriteCountries.includes(country.cca3),
    );
  }, [countries, favoriteCountries]);

  if (favoriteCountriesData.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center p-4">
        <h2 className="text-lg font-semibold mb-2">No Favorites Yet</h2>
        <p className="text-sm text-gray-500">
          Add countries to your favorites to see them here.
        </p>
      </div>
    );
  }

  return (
    <CountriesExplorer countries={favoriteCountriesData} regions={regions} />
  );
};
