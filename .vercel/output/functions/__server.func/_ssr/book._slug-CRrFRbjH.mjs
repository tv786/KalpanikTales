import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { N as Navbar } from "./Navbar-40VzOHb6.mjs";
import { F as Footer } from "./Footer-DQgxFWBD.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { s as supabase } from "./client-Ek2-qFbi.mjs";
import { u as useAuth } from "./use-auth-KyRhbYaJ.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { f as formatNumber, t as timeAgo } from "./helpers-BNSTMec-.mjs";
import { E as EmptyState } from "./empty-state-CTkbzlv9.mjs";
import { g as getSessionId, h as hasViewedBook, m as markBookAsViewed } from "./view-tracking-D0fDKBit.mjs";
import { d as Route$9 } from "./router-uehvGJ6U.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { B as BookOpen, E as Eye, d as Calendar, e as BookmarkCheck, f as Bookmark, b as Star, g as MessageCircle, R as Reply, H as Heart } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./input-C0QjszdI.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__zod-adapter.mjs";
import "../_libs/zod.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const SIZE = { sm: "h-3.5 w-3.5", md: "h-5 w-5", lg: "h-7 w-7" };
function StarRating({ value, onChange, readOnly, size = "md", className }) {
  const [hover, setHover] = reactExports.useState(null);
  const display = hover ?? value;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("inline-flex items-center gap-0.5", className), children: [1, 2, 3, 4, 5].map((i) => {
    const filled = i <= Math.floor(display);
    const half = !filled && i - 0.5 <= display;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: readOnly,
        onMouseEnter: () => !readOnly && setHover(i),
        onMouseLeave: () => !readOnly && setHover(null),
        onClick: () => !readOnly && onChange?.(i),
        className: cn(
          "transition-colors",
          !readOnly && "cursor-pointer hover:scale-110",
          readOnly && "cursor-default"
        ),
        "aria-label": `${i} star${i > 1 ? "s" : ""}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: cn(
              SIZE[size],
              filled || half ? "fill-[var(--gold)] text-[var(--gold)]" : "fill-transparent text-muted-foreground"
            )
          }
        )
      },
      i
    );
  }) });
}
function RatingDistribution({ scores }) {
  const total = scores.length;
  const buckets = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: scores.filter((s) => Math.round(s) === star).length
  }));
  const avg = total ? scores.reduce((a, c) => a + c, 0) / total : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-card p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl text-[var(--gold)]", children: avg.toFixed(1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex items-center justify-center gap-0.5 text-[var(--gold)]", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Star,
        {
          className: "h-4 w-4",
          fill: i <= Math.round(avg) ? "currentColor" : "transparent"
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
        total,
        " ",
        total === 1 ? "rating" : "ratings"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1.5", children: buckets.map((b) => {
      const pct = total ? b.count / total * 100 : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 text-muted-foreground", children: b.star }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-[var(--gold)] text-[var(--gold)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 flex-1 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[var(--gold)]", style: { width: `${pct}%` } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-right text-muted-foreground", children: b.count })
      ] }, b.star);
    }) })
  ] }) });
}
async function fetchComments(bookId) {
  const { data: commentsData, error: commentsError } = await supabase.from("comments").select("id, user_id, parent_id, content, likes, is_hidden, created_at").eq("book_id", bookId).eq("is_hidden", false).order("created_at", { ascending: true });
  if (commentsError) throw commentsError;
  const comments = commentsData ?? [];
  const userIds = Array.from(new Set(comments.map((c) => c.user_id))).filter(Boolean);
  if (userIds.length === 0) return comments;
  const { data: profilesData, error: profilesError } = await supabase.from("profiles").select("id, username, avatar_url").in("id", userIds);
  if (profilesError) throw profilesError;
  const profileMap = /* @__PURE__ */ new Map();
  (profilesData ?? []).forEach((p) => profileMap.set(p.id, { username: p.username, avatar_url: p.avatar_url }));
  return comments.map((c) => ({ ...c, profiles: profileMap.get(c.user_id) ?? null }));
}
async function fetchMyLikes(userId, commentIds) {
  if (!commentIds.length) return /* @__PURE__ */ new Set();
  const { data } = await supabase.from("comment_likes").select("comment_id").eq("user_id", userId).in("comment_id", commentIds);
  return new Set((data ?? []).map((d) => d.comment_id));
}
function CommentThread({ bookId }) {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [content, setContent] = reactExports.useState("");
  const [replyTo, setReplyTo] = reactExports.useState(null);
  const [replyContent, setReplyContent] = reactExports.useState("");
  const commentsQ = useQuery({
    queryKey: ["comments", bookId],
    queryFn: () => fetchComments(bookId),
    enabled: !!bookId
  });
  const likesQ = useQuery({
    queryKey: ["comment-likes", bookId, user?.id],
    queryFn: () => fetchMyLikes(user.id, (commentsQ.data ?? []).map((c) => c.id)),
    enabled: !!user && !!commentsQ.data
  });
  reactExports.useEffect(() => {
    console.log("CommentThread: commentsQ", { data: commentsQ.data, error: commentsQ.error, status: commentsQ.status });
  }, [commentsQ.data, commentsQ.error, commentsQ.status]);
  const post = useMutation({
    mutationFn: async (vars) => {
      if (!user) throw new Error("Sign in to comment");
      const { error } = await supabase.from("comments").insert({
        book_id: bookId,
        user_id: user.id,
        content: vars.text.trim(),
        parent_id: vars.parent_id
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", bookId] });
      setContent("");
      setReplyContent("");
      setReplyTo(null);
      toast.success("Comment posted");
    },
    onError: (e) => toast.error(e.message)
  });
  const toggleLike = useMutation({
    mutationFn: async (commentId) => {
      if (!user) throw new Error("Sign in to like comments");
      const liked = likesQ.data?.has(commentId);
      if (liked) {
        await supabase.from("comment_likes").delete().match({ comment_id: commentId, user_id: user.id });
        await supabase.rpc("decrement_likes").select();
      } else {
        await supabase.from("comment_likes").insert({ comment_id: commentId, user_id: user.id });
      }
      const { count } = await supabase.from("comment_likes").select("comment_id", { count: "exact", head: true }).eq("comment_id", commentId);
      await supabase.from("comments").update({ likes: count ?? 0 }).eq("id", commentId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", bookId] });
      qc.invalidateQueries({ queryKey: ["comment-likes", bookId, user?.id] });
    },
    onError: (e) => toast.error(e.message)
  });
  if (commentsQ.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }, i)) });
  }
  const comments = commentsQ.data ?? [];
  const topLevel = comments.filter((c) => !c.parent_id);
  const repliesByParent = /* @__PURE__ */ new Map();
  comments.filter((c) => c.parent_id).forEach((c) => {
    const arr = repliesByParent.get(c.parent_id) ?? [];
    arr.push(c);
    repliesByParent.set(c.parent_id, arr);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-medium", children: [
      "Comments (",
      comments.length,
      ")"
    ] }) }),
    user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          if (content.trim()) post.mutate({ text: content, parent_id: null });
        },
        className: "rounded-xl border border-border bg-card p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              value: content,
              onChange: (e) => setContent(e.target.value),
              placeholder: "Share your thoughts on this tale…",
              rows: 3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: post.isPending || !content.trim(), size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-1 h-4 w-4" }),
            " Post"
          ] }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "text-primary underline", children: "Sign in" }),
      " to join the discussion."
    ] }),
    topLevel.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-muted-foreground", children: "Be the first to comment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: topLevel.map((c) => {
      const replies = repliesByParent.get(c.id) ?? [];
      const liked = likesQ.data?.has(c.id) ?? false;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CommentBody, { comment: c, liked, onLike: () => toggleLike.mutate(c.id) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary",
            onClick: () => setReplyTo(replyTo === c.id ? null : c.id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { className: "h-3 w-3" }),
              " Reply"
            ]
          }
        ),
        replyTo === c.id && user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              if (replyContent.trim()) post.mutate({ text: replyContent, parent_id: c.id });
            },
            className: "mt-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: replyContent,
                  onChange: (e) => setReplyContent(e.target.value),
                  rows: 2,
                  placeholder: `Reply to ${c.profiles?.username ?? "this comment"}…`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: () => setReplyTo(null), children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "sm", disabled: post.isPending, children: "Post reply" })
              ] })
            ]
          }
        ),
        replies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-3 border-l-2 border-border pl-4", children: replies.map((r) => {
          const rLiked = likesQ.data?.has(r.id) ?? false;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommentBody, { comment: r, liked: rLiked, onLike: () => toggleLike.mutate(r.id) }) }, r.id);
        }) })
      ] }, c.id);
    }) })
  ] });
}
function CommentBody({
  comment,
  liked,
  onLike
}) {
  const name = comment.profiles?.username ?? "Traveller";
  const initial = name.charAt(0).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground", children: comment.profiles?.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: comment.profiles.avatar_url, alt: name, className: "h-full w-full rounded-full object-cover" }) : initial }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: timeAgo(comment.created_at) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-sm text-foreground/90", children: comment.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onLike,
          className: `mt-2 inline-flex items-center gap-1 text-xs transition-colors ${liked ? "text-[var(--crimson)]" : "text-muted-foreground hover:text-[var(--crimson)]"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3 w-3", fill: liked ? "currentColor" : "transparent" }),
            comment.likes
          ]
        }
      )
    ] })
  ] });
}
async function fetchBookDetail(slug) {
  const {
    data,
    error
  } = await supabase.from("books").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  if (!data) throw notFound();
  return data;
}
async function fetchChapters(bookId) {
  const {
    data,
    error
  } = await supabase.from("chapters").select("id, slug, title, chapter_number, is_published, created_at").eq("book_id", bookId).eq("is_published", true).order("chapter_number", {
    ascending: true
  });
  if (error) throw error;
  return data ?? [];
}
async function fetchRatings(bookId) {
  const {
    data
  } = await supabase.from("ratings").select("score").eq("book_id", bookId);
  return (data ?? []).map((r) => r.score);
}
async function fetchCommentCount(bookId) {
  const {
    count,
    error
  } = await supabase.from("comments").select("id", {
    count: "exact",
    head: true
  }).eq("book_id", bookId).eq("is_hidden", false);
  if (error) throw error;
  return count ?? 0;
}
async function fetchMyRating(bookId, userId) {
  const {
    data
  } = await supabase.from("ratings").select("score").eq("book_id", bookId).eq("user_id", userId).maybeSingle();
  return data?.score ?? 0;
}
async function fetchMyBookmark(bookId, userId) {
  const {
    data
  } = await supabase.from("bookmarks").select("id").eq("book_id", bookId).eq("user_id", userId).is("chapter_id", null).maybeSingle();
  return data?.id ?? null;
}
function BookDetailPage() {
  const {
    slug
  } = Route$9.useParams();
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const bookQ = useQuery({
    queryKey: ["book", slug],
    queryFn: () => fetchBookDetail(slug)
  });
  const book = bookQ.data;
  const chaptersQ = useQuery({
    queryKey: ["chapters", book?.id],
    queryFn: () => fetchChapters(book.id),
    enabled: !!book
  });
  const ratingsQ = useQuery({
    queryKey: ["ratings", book?.id],
    queryFn: () => fetchRatings(book.id),
    enabled: !!book
  });
  const myRatingQ = useQuery({
    queryKey: ["my-rating", book?.id, user?.id],
    queryFn: () => fetchMyRating(book.id, user.id),
    enabled: !!book && !!user
  });
  const bookmarkQ = useQuery({
    queryKey: ["bookmark", book?.id, user?.id],
    queryFn: () => fetchMyBookmark(book.id, user.id),
    enabled: !!book && !!user
  });
  const commentsCountQ = useQuery({
    queryKey: ["comments-count", book?.id],
    queryFn: () => fetchCommentCount(book.id),
    enabled: !!book
  });
  reactExports.useEffect(() => {
    if (book?.id) {
      const sessionId = getSessionId();
      const alreadyViewed = hasViewedBook(book.id);
      console.log("Book ID:", book.id, "Session ID:", sessionId, "Already viewed:", alreadyViewed);
      if (!alreadyViewed) {
        console.log("Attempting to increment views for book:", book.id);
        supabase.rpc("increment_book_views", {
          book_id_param: book.id,
          session_id_param: sessionId
        }).then(({
          error
        }) => {
          if (error) {
            console.error("Failed to increment book views:", error);
          } else {
            console.log("Successfully incremented views for book:", book.id);
            markBookAsViewed(book.id);
            qc.invalidateQueries({
              queryKey: ["book", slug]
            });
          }
        });
      } else {
        console.log("Book already viewed in this session, skipping increment");
      }
    }
  }, [book?.id, slug, qc]);
  const rate = useMutation({
    mutationFn: async (score) => {
      if (!user || !book) throw new Error("Sign in to rate");
      const {
        error
      } = await supabase.from("ratings").upsert({
        book_id: book.id,
        user_id: user.id,
        score
      }, {
        onConflict: "book_id,user_id"
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["ratings", book?.id]
      });
      qc.invalidateQueries({
        queryKey: ["my-rating", book?.id, user?.id]
      });
      toast.success("Rating saved");
    },
    onError: (e) => toast.error(e.message)
  });
  const toggleBookmark = useMutation({
    mutationFn: async () => {
      if (!user || !book) throw new Error("Sign in to bookmark");
      if (bookmarkQ.data) {
        await supabase.from("bookmarks").delete().eq("id", bookmarkQ.data);
      } else {
        await supabase.from("bookmarks").insert({
          book_id: book.id,
          user_id: user.id
        });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["bookmark", book?.id, user?.id]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (bookQ.isLoading || !book) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 w-full" }) })
    ] });
  }
  const ratings = ratingsQ.data ?? [];
  const avg = ratings.length ? ratings.reduce((a, c) => a + c, 0) / ratings.length : 0;
  const firstChapter = chaptersQ.data?.[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20", style: {
          background: "var(--gradient-warm)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[260px_1fr] md:py-14", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
            opacity: 0,
            scale: 0.95
          }, animate: {
            opacity: 1,
            scale: 1
          }, className: "mx-auto w-full max-w-[260px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[2/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-[var(--saffron)]/30 to-[var(--crimson)]/30 shadow-[var(--shadow-elegant)]", children: book.cover_image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: book.cover_image_url, alt: book.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-16 w-16 text-[var(--gold)]/60", strokeWidth: 1 }) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            delay: 0.1
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "capitalize", children: book.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: book.status }),
              book.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[var(--gold)] text-[var(--indigo-deep)]", children: "Featured" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl text-foreground md:text-5xl", children: book.title }),
            book.author && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-reading italic text-muted-foreground", children: [
              "by ",
              book.author,
              book.artist && book.artist !== book.author ? ` · art by ${book.artist}` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: avg, readOnly: true, size: "sm" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  avg.toFixed(1),
                  " (",
                  ratings.length,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
                " ",
                formatNumber(book.total_views)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
                " ",
                timeAgo(book.updated_at)
              ] })
            ] }),
            book.synopsis && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-2xl font-reading text-foreground/90", children: book.synopsis }),
            book.tags?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: book.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground", children: [
              "#",
              t
            ] }, t)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
              firstChapter ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/read/$bookSlug/$chapterSlug", params: {
                bookSlug: book.slug,
                chapterSlug: firstChapter.slug
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mr-2 h-5 w-5" }),
                "Start: ",
                firstChapter.title
              ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", disabled: true, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mr-2 h-5 w-5" }),
                "No chapters yet"
              ] }),
              user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => toggleBookmark.mutate(), disabled: toggleBookmark.isPending, children: [
                bookmarkQ.data ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "mr-2 h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "mr-2 h-4 w-4" }),
                bookmarkQ.data ? "Bookmarked" : "Bookmark"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "Sign in to bookmark" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "chapters", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "chapters", children: [
            "Chapters (",
            chaptersQ.data?.length ?? 0,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "ratings", children: "Ratings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "comments", children: [
            "Comments (",
            commentsCountQ.data ?? 0,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "chapters", className: "mt-6", children: chaptersQ.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Array.from({
          length: 4
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full" }, i)) }) : (chaptersQ.data?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12" }), title: "No chapters published yet", description: "The author is weaving — check back soon." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border rounded-xl border border-border bg-card", children: chaptersQ.data.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-4 px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[var(--gold)]", children: [
                "#",
                ch.chapter_number
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: ch.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: timeAgo(ch.created_at) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/read/$bookSlug/$chapterSlug", params: {
            bookSlug: book.slug,
            chapterSlug: ch.slug
          }, children: "Read" }) })
        ] }, ch.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "ratings", className: "mt-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RatingDistribution, { scores: ratings }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl", children: "Your rating" }),
            user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: myRatingQ.data ?? 0, onChange: (v) => rate.mutate(v), size: "lg" }),
              myRatingQ.data ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                "You rated this ",
                myRatingQ.data,
                " star",
                myRatingQ.data > 1 ? "s" : ""
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Tap a star to rate" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "text-primary underline", children: "Sign in" }),
              " to share your rating."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "comments", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommentThread, { bookId: book.id }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  BookDetailPage as component
};
