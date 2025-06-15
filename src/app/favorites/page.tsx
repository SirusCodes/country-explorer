import { CountryRegionWrapper } from "@/components/CountryRegionWrapper";
import { FavoriteCountryList } from "@/components/FavoriteCountryList";

export default async function FavoritesPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Your Favorite Countries</h1>
      <CountryRegionWrapper>
        {({ countries, regions }) => (
          <FavoriteCountryList countries={countries} regions={regions} />
        )}
      </CountryRegionWrapper>
    </>
  );
}
