"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

interface RegionFilterProps {
  regions: string[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export function RegionFilter({
  regions,
  selectedRegion,
  onRegionChange,
}: RegionFilterProps) {
  return (
    <div className="relative w-full max-w-xs">
      <Select
        onValueChange={onRegionChange}
        defaultValue={selectedRegion || "all"}
      >
        <SelectTrigger
          className="shadow-sm focus:ring-primary focus:border-primary"
          aria-label="Filter by region"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <SelectValue placeholder="Filter by Region" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Regions</SelectItem>
          {regions.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
