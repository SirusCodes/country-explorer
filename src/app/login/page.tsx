"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (username.trim() && password) {
      try {
        login(username.trim(), password);
        router.push("/");
      } catch (err: any) {
        setError(err.message || "Login failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] page-transition">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-center">
            Enter your username and password to explore and save your favorite
            countries.
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
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="focus:ring-primary focus:border-primary"
              />
            </div>
            {error && (
              <div className="text-destructive text-sm text-center">
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={!username.trim() || !password}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
