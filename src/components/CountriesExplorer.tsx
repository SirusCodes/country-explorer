"use client";

import { useState, useMemo, useEffect } from "react";
import { CountryCard } from "@/components/CountryCard";
import { SearchBar } from "@/components/SearchBar";
import { RegionFilter } from "@/components/RegionFilter";
import { useDebounce } from "@/hooks/use-debounce";
import type { CountrySummary } from "@/lib/types";

interface CountriesExplorerProps {
  countries: CountrySummary[];
}

export function CountriesExplorer({ countries }: CountriesExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const regions = useMemo(() => {
    if (!countries) return [];
    const uniqueRegions = new Set(
      countries.map((country) => country.region).filter(Boolean),
    );
    return Array.from(uniqueRegions).sort();
  }, [countries]);

  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    return countries
      .filter(
        (country) =>
          selectedRegion === "all" || country.region === selectedRegion,
      )
      .filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()) ||
          country.name.official
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase()),
      );
  }, [countries, debouncedSearchTerm, selectedRegion]);

  return (
    <div className="space-y-8 page-transition">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center sticky top-[65px] sm:top-[69px] bg-background/80 backdrop-blur-md py-4 z-40 -mx-4 px-4 border-b">
        <SearchBar onSearch={setSearchTerm} />
        <RegionFilter
          regions={regions}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />
      </div>

      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            No countries found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
