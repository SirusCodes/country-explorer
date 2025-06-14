import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCountryByCode } from "@/services/countryService";
import { FavoriteButtonWrapper } from "@/components/FavoriteButtonWrapper"; // Helper for FavoriteButton
import { DetailItem } from "@/components/DetailItem"; // Import the new client component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Users,
  MapPin,
  Globe,
  Banknote,
  Languages,
  ServerCrash,
  Landmark,
  ExternalLink,
} from "lucide-react";
import type { CountryDetailData, CountrySummary } from "@/lib/types";
import { CountryBordersSection } from "@/components/CountryBordersSection";

export const revalidate = 86400; // Regenerate this page every 24 hours

interface CountryDetailPageProps {
  params: Promise<{ countryCode: string }>;
}

// This function fetches data at build time or on request
async function getCountryData(code: string): Promise<CountryDetailData | null> {
  try {
    return await getCountryByCode(code);
  } catch (error) {
    console.error(`Error fetching country ${code}:`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: CountryDetailPageProps): Promise<Metadata> {
  const country = await getCountryData((await params).countryCode);
  if (!country) {
    return {
      title: "Country Not Found",
    };
  }
  return {
    title: `${country.name.common} | Country Explorer`,
    description: `Detailed information about ${country.name.common}, including population, region, capital, and more.`,
  };
}

export default async function CountryDetailPage({
  params,
}: CountryDetailPageProps) {
  const { countryCode } = await params;
  const country = await getCountryData(countryCode);

  if (!country) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center page-transition">
        <ServerCrash className="h-24 w-24 text-destructive mb-4" />
        <h1 className="text-4xl font-bold mb-2">Country Not Found</h1>
        <p className="text-xl text-muted-foreground mb-6">
          The country with code "{countryCode}" could not be found or there was
          an error fetching its data.
        </p>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back to Homepage
          </Link>
        </Button>
      </div>
    );
  }

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common || country.name.common
    : country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <>
      <CountryBordersSection country={country} />
      <div className="max-w-4xl mx-auto page-transition">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="p-0 relative">
            <div className="relative w-full aspect-[2/1] max-h-[400px] bg-muted overflow-hidden">
              <Image
                src={
                  country.flags.svg ||
                  country.flags.png ||
                  "https://placehold.co/800x400.png"
                }
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                fill
                className="object-cover"
                priority
                data-ai-hint="country flag large"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <CardTitle className="text-3xl md:text-4xl font-headline mb-2 sm:mb-0">
                  {country.name.common}
                </CardTitle>
                <FavoriteButtonWrapper countryCca3={country.cca3} />
              </div>
              <Badge variant="secondary" className="font-normal text-lg">
                {country.name.official}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <DetailItem
              icon={Users}
              label="Population"
              value={country.population.toLocaleString()}
            />
            <DetailItem icon={MapPin} label="Region" value={country.region} />
            <DetailItem
              icon={MapPin}
              label="Subregion"
              value={country.subregion}
            />
            {country.capital && country.capital.length > 0 && (
              <DetailItem
                icon={Landmark}
                label="Capital(s)"
                value={country.capital}
              />
            )}
            <DetailItem icon={Globe} label="Native Name" value={nativeName} />
            {country.tld && country.tld.length > 0 && (
              <DetailItem
                icon={ExternalLink}
                label="Top Level Domain(s)"
                value={country.tld}
              />
            )}
            <DetailItem icon={Banknote} label="Currencies" value={currencies} />
            <DetailItem icon={Languages} label="Languages" value={languages} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
