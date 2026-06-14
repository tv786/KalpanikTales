import { useState } from "react";
import { Flag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

type FeedbackType = "bug" | "suggestion" | "content_issue";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>("suggestion");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (message.trim().length < 3) {
      toast.error("Please enter a longer message");
      return;
    }
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("feedback")
      .insert({ type, message: message.trim(), user_id: user?.id ?? null });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send feedback");
      return;
    }
    toast.success("Thanks! Your feedback was received.");
    setMessage("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full shadow-lg"
          aria-label="Send feedback"
        >
          <Flag className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Share your feedback</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={type} onValueChange={(v) => setType(v as FeedbackType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="content_issue">Content Issue</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Tell us what's on your mind…"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={2000}
          />
        </div>
        <DialogFooter>
          <Button onClick={submit} disabled={submitting}>
            {submitting ? "Sending…" : "Send feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
