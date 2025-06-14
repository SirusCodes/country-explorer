"use client";

import type { CountrySummary } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Landmark } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';

interface CountryCardProps {
  country: CountrySummary;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/${country.cca3.toLowerCase()}`} className="block group page-transition" aria-label={`View details for ${country.name.common}`}>
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative w-full aspect-[5/3] overflow-hidden">
            <Image
              src={country.flags.svg || country.flags.png || "https://placehold.co/300x180.png"}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              width={300}
              height={180}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              data-ai-hint="country flag"
            />
          </div>
          <div className="p-4">
            <CardTitle className="text-xl font-headline mb-1 truncate group-hover:text-primary transition-colors">
              {country.name.common}
            </CardTitle>
            <Badge variant="secondary" className="font-normal">{country.name.official}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 pt-0 space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Population: {country.population.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Region: {country.region}</span>
          </div>
          {country.capital && country.capital.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Landmark className="h-4 w-4" />
              <span>Capital: {country.capital.join(', ')}</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="flex justify-between items-center w-full">
             <span className="text-xs text-muted-foreground">CCA3: {country.cca3}</span>
            <FavoriteButton countryCca3={country.cca3} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
