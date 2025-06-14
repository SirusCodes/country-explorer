import { CountriesExplorer } from "@/components/CountriesExplorer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";
import type { CountrySummary } from "@/lib/types";
import { getAllCountriesForList } from "@/services/countryService";

export const revalidate = 86400; // Regenerate this page every 24 hours

export default async function HomePage() {
  let countries: CountrySummary[] = [];
  let error: string | null = null;
  try {
    countries = await getAllCountriesForList();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

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

  return <CountriesExplorer countries={countries} />;
}
