import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";
import type { CountrySummary } from "@/lib/types";
import { getAllCountriesForList } from "@/services/countryService";
import React from "react";

export const revalidate = 86400; // Regenerate this page every 24 hours

export type CountryRegionWrapperProps = {
  children: (props: {
    countries: CountrySummary[];
    regions: string[];
  }) => React.ReactNode;
};

export async function CountryRegionWrapper({
  children,
}: CountryRegionWrapperProps) {
  let countries: CountrySummary[] = [];
  let error: string | null = null;
  try {
    const data = await getAllCountriesForList();
    countries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  const uniqueRegions = new Set(
    countries.map((country) => country.region).filter(Boolean),
  );
  const regions = Array.from(uniqueRegions).sort();

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <WifiOff className="h-4 w-4" />
        <AlertTitle>Error Fetching Countries</AlertTitle>
        <AlertDescription>
          Could not load country data. Please check your internet connection and
          try again. Details: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children({ countries, regions })}</>;
}
