import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle, Reply } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { timeAgo } from "@/lib/helpers";

interface CommentRow {
  id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  likes: number;
  is_hidden: boolean;
  created_at: string;
  profiles?: { username: string | null; avatar_url: string | null } | null;
}

async function fetchComments(bookId: string, chapterId?: string): Promise<CommentRow[]> {
  // Fetch comments first (avoid embedding `profiles(...)` which requires a direct FK to `profiles`)
  let query = supabase
    .from("comments")
    .select("id, user_id, parent_id, content, likes, is_hidden, created_at")
    .eq("book_id", bookId)
    .eq("is_hidden", false);
  
  if (chapterId) {
    query = query.eq("chapter_id", chapterId);
  }
  
  const { data: commentsData, error: commentsError } = await query.order("created_at", { ascending: true });
  if (commentsError) throw commentsError;
  const comments = (commentsData ?? []) as unknown as CommentRow[];

  // Attach profile info by fetching profiles for the comment authors
  const userIds = Array.from(new Set(comments.map((c) => c.user_id))).filter(Boolean);
  if (userIds.length === 0) return comments;

  const { data: profilesData, error: profilesError } = await supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .in("id", userIds);
  if (profilesError) throw profilesError;

  const profileMap = new Map<string, { username: string | null; avatar_url: string | null }>();
  (profilesData ?? []).forEach((p: any) => profileMap.set(p.id, { username: p.username, avatar_url: p.avatar_url }));

  return comments.map((c) => ({ ...c, profiles: profileMap.get(c.user_id) ?? null }));
}

async function fetchMyLikes(userId: string, commentIds: string[]) {
  if (!commentIds.length) return new Set<string>();
  const { data } = await supabase
    .from("comment_likes")
    .select("comment_id")
    .eq("user_id", userId)
    .in("comment_id", commentIds);
  return new Set((data ?? []).map((d) => d.comment_id));
}

export function CommentThread({ bookId, chapterId }: { bookId: string; chapterId?: string }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const commentsQ = useQuery({
    queryKey: ["comments", bookId, chapterId],
    queryFn: () => fetchComments(bookId, chapterId),
    enabled: !!bookId,
  });
  const likesQ = useQuery({
    queryKey: ["comment-likes", bookId, chapterId, user?.id],
    queryFn: () => fetchMyLikes(user!.id, (commentsQ.data ?? []).map((c) => c.id)),
    enabled: !!user && !!commentsQ.data,
  });

  useEffect(() => {
    console.log("CommentThread: commentsQ", { data: commentsQ.data, error: commentsQ.error, status: commentsQ.status });
  }, [commentsQ.data, commentsQ.error, commentsQ.status]);

  const post = useMutation({
    mutationFn: async (vars: { text: string; parent_id: string | null }) => {
      if (!user) throw new Error("Sign in to comment");
      const { error } = await supabase.from("comments").insert({
        book_id: bookId,
        chapter_id: chapterId,
        user_id: user.id,
        content: vars.text.trim(),
        parent_id: vars.parent_id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", bookId, chapterId] });
      setContent("");
      setReplyContent("");
      setReplyTo(null);
      toast.success("Comment posted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleLike = useMutation({
    mutationFn: async (commentId: string) => {
      if (!user) throw new Error("Sign in to like comments");
      const liked = likesQ.data?.has(commentId);
      if (liked) {
        await supabase.from("comment_likes").delete().match({ comment_id: commentId, user_id: user.id });
        await supabase.rpc("decrement_likes" as never).select(); // ignore if missing
      } else {
        await supabase.from("comment_likes").insert({ comment_id: commentId, user_id: user.id });
      }
      // best-effort recount
      const { count } = await supabase
        .from("comment_likes")
        .select("comment_id", { count: "exact", head: true })
        .eq("comment_id", commentId);
      await supabase.from("comments").update({ likes: count ?? 0 }).eq("id", commentId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", bookId, chapterId] });
      qc.invalidateQueries({ queryKey: ["comment-likes", bookId, chapterId, user?.id] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (commentsQ.isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
      </div>
    );
  }

  const comments = commentsQ.data ?? [];
  const topLevel = comments.filter((c) => !c.parent_id);
  const repliesByParent = new Map<string, CommentRow[]>();
  comments.filter((c) => c.parent_id).forEach((c) => {
    const arr = repliesByParent.get(c.parent_id!) ?? [];
    arr.push(c);
    repliesByParent.set(c.parent_id!, arr);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Comments ({comments.length})</h3>
      </div>
      {/* New comment */}
      {user ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (content.trim()) post.mutate({ text: content, parent_id: null });
          }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts on this tale…"
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={post.isPending || !content.trim()} size="sm">
              <MessageCircle className="mr-1 h-4 w-4" /> Post
            </Button>
          </div>
        </form>
      ) : (
        <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          <Link to="/auth" className="text-primary underline">Sign in</Link> to join the discussion.
        </div>
      )}

      {topLevel.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Be the first to comment.</p>
      ) : (
        <ul className="space-y-4">
          {topLevel.map((c) => {
            const replies = repliesByParent.get(c.id) ?? [];
            const liked = likesQ.data?.has(c.id) ?? false;
            return (
              <li key={c.id} className="rounded-xl border border-border bg-card p-4">
                <CommentBody comment={c} liked={liked} onLike={() => toggleLike.mutate(c.id)} />
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}
                >
                  <Reply className="h-3 w-3" /> Reply
                </button>

                {replyTo === c.id && user && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (replyContent.trim()) post.mutate({ text: replyContent, parent_id: c.id });
                    }}
                    className="mt-3"
                  >
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      rows={2}
                      placeholder={`Reply to ${c.profiles?.username ?? "this comment"}…`}
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <Button type="button" variant="ghost" size="sm" onClick={() => setReplyTo(null)}>Cancel</Button>
                      <Button type="submit" size="sm" disabled={post.isPending}>Post reply</Button>
                    </div>
                  </form>
                )}

                {replies.length > 0 && (
                  <ul className="mt-3 space-y-3 border-l-2 border-border pl-4">
                    {replies.map((r) => {
                      const rLiked = likesQ.data?.has(r.id) ?? false;
                      return (
                        <li key={r.id}>
                          <CommentBody comment={r} liked={rLiked} onLike={() => toggleLike.mutate(r.id)} />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function CommentBody({
  comment,
  liked,
  onLike,
}: {
  comment: CommentRow;
  liked: boolean;
  onLike: () => void;
}) {
  const name = comment.profiles?.username ?? "Traveller";
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
        {comment.profiles?.avatar_url ? (
          <img src={comment.profiles.avatar_url} alt={name} className="h-full w-full rounded-full object-cover" />
        ) : initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs text-muted-foreground">{timeAgo(comment.created_at)}</span>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm text-foreground/90">{comment.content}</p>
        <button
          type="button"
          onClick={onLike}
          className={`mt-2 inline-flex items-center gap-1 text-xs transition-colors ${
            liked ? "text-[var(--crimson)]" : "text-muted-foreground hover:text-[var(--crimson)]"
          }`}
        >
          <Heart className="h-3 w-3" fill={liked ? "currentColor" : "transparent"} />
          {comment.likes}
        </button>
      </div>
    </div>
  );
}
