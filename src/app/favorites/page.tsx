"use client";

import { useFavorites } from "@/contexts/FavoritesContext";
import { useEffect, useState } from "react";
import { getAllCountriesForList } from "@/services/countryService";
import type { CountrySummary } from "@/lib/types";
import { CountryCard } from "@/components/CountryCard";

export default function FavoritesPage() {
  const { favoriteCountries, isLoading: favLoading } = useFavorites();
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      setLoading(true);
      try {
        const all = await getAllCountriesForList();
        setCountries(all.filter((c) => favoriteCountries.includes(c.cca3)));
      } catch (e) {
        setCountries([]);
      }
      setLoading(false);
    }
    if (!favLoading) fetchCountries();
  }, [favoriteCountries, favLoading]);

  if (favLoading || loading) {
    return <div className="p-8 text-center">Loading favourites...</div>;
  }

  if (countries.length === 0) {
    return <div className="p-8 text-center">No favourites yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}
