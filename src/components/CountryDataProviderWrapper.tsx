"use client";

import { useCountries } from '@/contexts/CountryDataContext';
import type { ReactNode } from 'react';
import type { CountrySummary } from '@/lib/types';

interface CountryDataProviderWrapperProps {
  children: (context: {
    getCountryByCca3: (cca3: string) => CountrySummary | undefined;
    countriesError: string | null;
    countriesLoading: boolean;
  }) => ReactNode;
}

export function CountryDataProviderWrapper({ children }: CountryDataProviderWrapperProps) {
  const { getCountryByCca3, error: countriesError, loading: countriesLoading } = useCountries();
  return <>{children({ getCountryByCca3, countriesError, countriesLoading })}</>;
}
