"use client";

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
      <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
      <p className="text-xl text-muted-foreground font-semibold">Loading content...</p>
    </div>
  );
}
