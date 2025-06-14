import type { CountryDetailData, CountrySummary } from "@/lib/types";

const BASE_URL = "https://restcountries.com/v3.1";

export async function getAllCountriesForList(): Promise<CountrySummary[]> {
  const response = await fetch(
    `${BASE_URL}/all?fields=name,population,region,capital,flags,cca3`,
    { next: { revalidate: 86400 } }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }
  return response.json();
}

export async function getCountryByCode(
  code: string
): Promise<CountryDetailData> {
  // Ensure code is lowercase for API consistency, although API might handle mixed case
  const response = await fetch(
    `${BASE_URL}/alpha/${code.toLowerCase()}?fields=name,population,region,subregion,capital,tld,currencies,languages,flags,borders,cca3`,
    { next: { revalidate: 86400 } }
  );
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Country with code ${code} not found.`);
    }
    throw new Error(`Failed to fetch country ${code}: ${response.statusText}`);
  }
  return response.json();
}
