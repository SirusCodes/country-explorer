"use client";

import type { ElementType } from 'react';
import { ExternalLink } from 'lucide-react';

interface DetailItemProps {
  icon: ElementType;
  label: string;
  value?: string | string[] | null;
  isLink?: boolean;
}

export function DetailItem({ icon: Icon, label, value, isLink = false }: DetailItemProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  const displayValue = Array.isArray(value) ? value.join(', ') : value;

  return (
    <div className="flex items-start space-x-3">
      <Icon className="h-5 w-5 text-primary mt-1 shrink-0" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        {isLink && typeof displayValue === 'string' ? (
          <a href={displayValue.startsWith('http') ? displayValue : `http://${displayValue}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent hover:underline">
            {displayValue} <ExternalLink className="inline h-4 w-4 ml-1" />
          </a>
        ) : (
          <p className="font-semibold">{displayValue}</p>
        )}
      </div>
    </div>
  );
}
