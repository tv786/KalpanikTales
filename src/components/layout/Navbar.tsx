import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Search, LogOut, User, Shield, Bookmark, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/hooks/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const { user, profile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const initial = (profile?.username || user?.email || "?").charAt(0).toUpperCase();
  const { theme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={theme === "dark" ? "/assets/white-logo.png" : "/assets/dark-logo.png"}
            alt="KalpanikTales"
            className="h-12 w-auto"
          />   
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/browse"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Browse
          </Link>
          <Link
            to="/bookmarks"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            <Bookmark className="h-4 w-4" />
          </Link>
          <Link
            to="/search"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            <Search className="h-4 w-4" />
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-muted md:hidden"
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground"
                  aria-label="Account menu"
                >
                  {initial}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>
                    <Shield className="mr-2 h-4 w-4" /> Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
        </div>
        {mobileOpen && (
          <div className="absolute right-4 top-16 z-40 w-48 rounded-lg bg-background/95 p-2 shadow-lg md:hidden">
            <nav className="flex flex-col">
              <Link
                to="/bookmarks"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                <Bookmark className="h-4 w-4" /> Bookmarks
              </Link>
              <Link
                to="/search"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                <Search className="h-4 w-4" /> Search
              </Link>
              <Link
                to="/browse"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                <BookOpen className="h-4 w-4" /> Browse
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
