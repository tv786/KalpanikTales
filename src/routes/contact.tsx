import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MessageSquare, Mail, Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — KalpanikTales" },
      {
        name: "description",
        content: "Get in touch with the KalpanikTales team. Send us your feedback, report bugs, or share your suggestions.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user?.email ?? "");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to submit feedback");
      navigate({ to: "/auth" });
      return;
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    if (!message.trim()) {
      toast.error("Message is required");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("feedback").insert({
      user_id: user.id,
      type: category,
      message: message.trim(),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Thank you for your feedback!");
    setEmail(user?.email ?? "");
    setCategory("");
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="font-display text-4xl text-foreground sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a suggestion, found a bug, or want to report an issue? We'd love to hear from you.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">Send us a message</CardTitle>
            <CardDescription>
              {user ? (
                "Fill out the form below and we'll get back to you as soon as possible."
              ) : (
                <>
                  Please <Link to="/auth" className="text-[var(--gold)] hover:underline">log in</Link> to submit feedback.
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={!user}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={!user}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="bug">Report Bug</SelectItem>
                    <SelectItem value="content_issue">Content Issue</SelectItem>
                    <SelectItem value="copyright">Copyright</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more about your feedback..."
                  rows={8}
                  required
                  disabled={!user}
                />
              </div>

              <Button type="submit" disabled={busy || !user} className="w-full">
                {busy ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              {!user && (
                <p className="text-center text-sm text-muted-foreground">
                  <Link to="/auth" className="text-[var(--gold)] hover:underline">
                    Log in to your account
                  </Link>{" "}
                  to submit feedback
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold)]/10">
                  <Mail className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Email</CardTitle>
                  <CardDescription className="text-sm">support@kalpaniktales.com</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--gold)]/10">
                  <MessageSquare className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <CardTitle className="text-lg">Community</CardTitle>
                  <CardDescription className="text-sm">Join our Discord server</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
