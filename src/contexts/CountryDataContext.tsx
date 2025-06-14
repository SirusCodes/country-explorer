"use client";

import type { CountrySummary } from '@/lib/types';
import type { ReactNode} from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CountryDataContextType {
  countries: CountrySummary[];
  loading: boolean;
  error: string | null;
  getCountryByCca3: (cca3: string) => CountrySummary | undefined;
}

const CountryDataContext = createContext<CountryDataContextType | undefined>(undefined);

export const CountryDataProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3');
        if (!response.ok) {
          throw new Error(`Failed to fetch countries: ${response.statusText}`);
        }
        const data: CountrySummary[] = await response.json();
        setCountries(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const getCountryByCca3 = (cca3: string): CountrySummary | undefined => {
    return countries.find(country => country.cca3 === cca3);
  };

  return (
    <CountryDataContext.Provider value={{ countries, loading, error, getCountryByCca3 }}>
      {children}
    </CountryDataContext.Provider>
  );
};

export const useCountries = (): CountryDataContextType => {
  const context = useContext(CountryDataContext);
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountryDataProvider');
  }
  return context;
};
