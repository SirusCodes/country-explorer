"use client"; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center p-4">
      <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
      <h2 className="text-3xl font-bold mb-4 text-destructive">Something went wrong!</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        We encountered an unexpected issue. Please try again, or refresh the page.
      </p>
      <pre className="text-xs bg-muted p-4 rounded-md mb-8 max-w-full overflow-auto text-left">
        {error.message}
        {error.digest && `\nDigest: ${error.digest}`}
      </pre>
      <Button
        onClick={() => reset()}
        variant="destructive"
        size="lg"
      >
        Try again
      </Button>
    </div>
  );
}
