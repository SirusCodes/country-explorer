"use client";

import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import type { ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchBar({ onSearch, initialQuery = '' }: SearchBarProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search for a country..."
        defaultValue={initialQuery}
        onChange={handleInputChange}
        className="pl-10 pr-4 py-2 shadow-sm focus:ring-primary focus:border-primary"
        aria-label="Search for a country by name"
      />
    </div>
  );
}
