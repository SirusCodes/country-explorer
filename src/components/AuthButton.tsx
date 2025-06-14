"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LogIn, LogOut, User as UserIcon, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AuthButton() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <Button variant="outline" size="sm" disabled className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading...
      </Button>;
  }

  if (isAuthenticated && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://avatar.vercel.sh/${user.name}.png`} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{user.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
      variant="outline" 
      onClick={() => router.push('/login')}
      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
    >
      <LogIn className="mr-2 h-4 w-4" />
      Login
    </Button>
  );
}
