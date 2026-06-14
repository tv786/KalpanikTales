import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

export function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setBusy(false);
    if (error) {
      if (error.code === "23505") toast("You're already subscribed");
      else toast.error("Could not subscribe");
      return;
    }
    toast.success("Subscribed! Stories await in your inbox.");
    setEmail("");
  }

  return (
    <footer className="mt-24 border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-[var(--gold)]" />
              <span className="font-display text-2xl text-[var(--gold)]">KalpanikTales</span>
            </Link>
            <p className="mt-3 font-reading italic text-muted-foreground">
              Stories from Ancient Bharat
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/browse" className="text-muted-foreground hover:text-primary">Browse</Link></li>
              <li><Link to="/search" className="text-muted-foreground hover:text-primary">Search</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg">Newsletter</h4>
            <form onSubmit={subscribe} className="mt-3 flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" disabled={busy} size="sm">
                {busy ? "…" : "Join"}
              </Button>
            </form>
          </div>
        </div>

        <div className="paisley-divider my-8" />
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} KalpanikTales — Woven from ancient threads.
        </p>
      </div>
    </footer>
  );
}
