"use client";

import { useState, type FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      login(username.trim());
      router.push('/');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] page-transition">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Welcome Back!</CardTitle>
          <CardDescription className="text-center">
            Enter a username to explore and save your favorite countries.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. explorer123"
                required
                className="focus:ring-primary focus:border-primary"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!username.trim()}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
