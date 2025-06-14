"use server";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid3X3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { CountryDetailData, CountrySummary } from "@/lib/types";
import { getAllCountriesForList } from "@/services/countryService";

interface CountryBordersSectionProps {
  country: CountryDetailData;
}

export async function CountryBordersSection({
  country,
}: CountryBordersSectionProps) {
  // Fetch countries data using the service
  let countries: CountrySummary[] = [];
  try {
    countries = await getAllCountriesForList();
  } catch (error: any) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to fetch border countries: {error.message}
        </AlertDescription>
      </Alert>
    );
  }
  const getCountryByCca3 = (cca3: string): CountrySummary | undefined => {
    return countries.find((country) => country.cca3 === cca3);
  };

  if (!country.borders || country.borders.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-headline mb-6 flex items-center">
        <Grid3X3 className="mr-3 h-6 w-6 text-primary" />
        Border Countries
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {country.borders.map((borderCode) => {
          const borderCountry = getCountryByCca3(borderCode);
          return borderCountry ? (
            <Button
              key={borderCode}
              variant="outline"
              asChild
              className="truncate justify-start text-left h-auto py-2 px-3 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all"
            >
              <Link
                href={`/country/${borderCountry.cca3.toLowerCase()}`}
                className="flex items-center gap-2"
              >
                {borderCountry.flags && borderCountry.flags.svg && (
                  <Image
                    src={borderCountry.flags.svg}
                    alt={`Flag of ${borderCountry.name.common}`}
                    width={24}
                    height={16}
                    className="rounded-sm object-contain shrink-0"
                    data-ai-hint="country flag small"
                  />
                )}
                <span className="truncate">{borderCountry.name.common}</span>
              </Link>
            </Button>
          ) : (
            <Badge key={borderCode} variant="secondary" className="py-2 px-3">
              {borderCode}
            </Badge>
          );
        })}
      </div>
    </section>
  );
}
