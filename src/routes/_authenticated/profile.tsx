import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [{ title: "Your library — KalpanikTales" }],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useRouteContext();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <header className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-2xl text-primary-foreground">
            {(user.email ?? "?").charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-3xl text-foreground">Your library</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </header>

        <section>
          <div className="mb-6">
            <h2 className="font-display text-2xl text-foreground">Profile</h2>
            <p className="text-sm text-muted-foreground">Manage your account details and preferences.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
