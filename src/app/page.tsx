import { CountriesExplorer } from "@/components/CountriesExplorer";
import { CountryRegionWrapper } from "@/components/CountryRegionWrapper";

export const revalidate = 86400; // Regenerate this page every 24 hours

export default function HomePage() {
  return (
    <CountryRegionWrapper>
      {({ countries, regions }) => {
        return <CountriesExplorer countries={countries} regions={regions} />;
      }}
    </CountryRegionWrapper>
  );
}
