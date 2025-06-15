"use client";

import Link from "next/link";
import { AuthButton } from "./AuthButton";
import { Globe } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-headline font-semibold hover:opacity-80 transition-opacity"
        >
          <Globe className="w-7 h-7 sm:w-8 sm:h-8" />
          Country Explorer
        </Link>
        <AuthButton />
      </div>
    </header>
  );
}
