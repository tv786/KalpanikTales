import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEOMeta } from "@/components/seo/SEOMeta";

export const Route = createFileRoute("/404")({
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <>
      <SEOMeta
        title="Page Not Found — KalpanikTales"
        description="The page you're looking for could not be found. Browse our collection of mythological, folklore, and fantasy story books from across Bharat."
        noindex
      />
      <div className="min-h-screen bg-transparent">
        <Navbar />
        <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <h1 className="font-display text-9xl text-[var(--gold)] leading-none">404</h1>
              <h2 className="font-display text-3xl text-foreground mt-4">
                This tale could not be found
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The story you seek may have been moved, or perhaps it never existed in this realm.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Return home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/browse">
                  <Search className="mr-2 h-5 w-5" />
                  Browse stories
                </Link>
              </Button>
            </div>

            <div className="mt-12 rounded-lg border border-border bg-card/40 p-6">
              <h3 className="font-display text-lg text-foreground mb-3">Looking for something specific?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try searching for a book by title, author, or genre, or explore our categories to find your next great read.
              </p>
              <Button asChild variant="ghost" size="sm">
                <Link to="/search">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go to search
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
