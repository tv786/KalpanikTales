import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/feedback")({
  component: AdminFeedback,
});

function AdminFeedback() {
  const qc = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const { data: feedback = [], isLoading } = useQuery({
    queryKey: ["admin", "feedback", filterStatus, filterType],
    queryFn: async () => {
      let query = supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });

      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus);
      }
      if (filterType !== "all") {
        query = query.eq("type", filterType);
      }

      const { data, error } = await query;
      if (error) throw error;
      const feedbackData = data ?? [];

      // Fetch user profiles separately
      const userIds = Array.from(new Set(feedbackData.map((f: any) => f.user_id))).filter(Boolean);
      if (userIds.length === 0) return feedbackData;

      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .in("id", userIds);

      const profilesMap = new Map(profiles?.map((p: any) => [p.id, p]) ?? []);

      return feedbackData.map((f: any) => ({
        ...f,
        profiles: profilesMap.get(f.user_id) || null,
      }));
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("feedback")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["admin", "feedback"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteFeedback = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("feedback").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Feedback deleted");
      qc.invalidateQueries({ queryKey: ["admin", "feedback"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Resolved</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">In Progress</Badge>;
      case "pending":
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Pending</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "bug":
        return <Badge variant="destructive">Bug</Badge>;
      case "suggestion":
        return <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">Suggestion</Badge>;
      case "content_issue":
        return <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">Content Issue</Badge>;
      case "copyright":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Copyright</Badge>;
      case "complaint":
        return <Badge className="bg-pink-500/10 text-pink-500 hover:bg-pink-500/20">Complaint</Badge>;
      default:
        return <Badge>Other</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to admin
            </Link>
          </Button>
          <h2 className="text-xl font-semibold">Feedback Management</h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Status:</label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Type:</label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="suggestion">Suggestion</SelectItem>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="content_issue">Content Issue</SelectItem>
              <SelectItem value="copyright">Copyright</SelectItem>
              <SelectItem value="complaint">Complaint</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : feedback.length === 0 ? (
        <p className="text-muted-foreground">No feedback found.</p>
      ) : (
        <div className="space-y-4">
          {feedback.map((item: any) => (
            <div key={item.id} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {getStatusIcon(item.status)}
                    {getStatusBadge(item.status)}
                    {getTypeBadge(item.type)}
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {item.profiles?.avatar_url ? (
                      <img
                        src={item.profiles.avatar_url}
                        alt={item.profiles.username}
                        className="h-6 w-6 rounded-full"
                      />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-muted" />
                    )}
                    <span className="text-sm font-medium">
                      {item.profiles?.username || "Unknown user"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({item.user_id})
                    </span>
                  </div>

                  <p className="text-sm whitespace-pre-wrap">{item.message}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Select
                    value={item.status}
                    onValueChange={(value) => updateStatus.mutate({ id: item.id, status: value })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (!confirm("Delete this feedback?")) return;
                      deleteFeedback.mutate(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
