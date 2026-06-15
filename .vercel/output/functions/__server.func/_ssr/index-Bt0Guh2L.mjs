import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import { N as Navbar } from "./Navbar-40VzOHb6.mjs";
import { F as Footer } from "./Footer-DQgxFWBD.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, b as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { s as supabase } from "./client-Ek2-qFbi.mjs";
import { B as BookCard } from "./BookCard-CZw_xwFb.mjs";
import { a as Route$a, f as fetchBooks, b as fetchLastWeekBooks, c as fetchMostViewedBooks } from "./router-uehvGJ6U.mjs";
import { a as Bell, A as ArrowRight, C as CalendarDays, T as Trophy, F as Flame, b as Star, B as BookOpen, M as Megaphone, c as Flag, X } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./use-auth-KyRhbYaJ.mjs";
import "./input-C0QjszdI.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
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
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function FeedbackButton() {
  const [open, setOpen] = reactExports.useState(false);
  const [type, setType] = reactExports.useState("suggestion");
  const [message, setMessage] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  async function submit() {
    if (message.trim().length < 3) {
      toast.error("Please enter a longer message");
      return;
    }
    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("feedback").insert({ type, message: message.trim(), user_id: user?.id ?? null });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send feedback");
      return;
    }
    toast.success("Thanks! Your feedback was received.");
    setMessage("");
    setOpen(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "default",
        size: "icon",
        className: "fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full shadow-lg",
        "aria-label": "Send feedback",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-5 w-5" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: "Share your feedback" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: (v) => setType(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bug", children: "Bug Report" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "suggestion", children: "Suggestion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "content_issue", children: "Content Issue" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "Tell us what's on your mind…",
            rows: 5,
            value: message,
            onChange: (e) => setMessage(e.target.value),
            maxLength: 2e3
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: submitting, children: submitting ? "Sending…" : "Send feedback" }) })
    ] })
  ] });
}
function BookSlider({
  title,
  subtitle,
  books,
  isLoading,
  seeAllTo,
  emptyText,
  fullWidth = false,
  autoplay = false,
  scaleActive = true
}) {
  const containerRef = reactExports.useRef(null);
  const slideRefs = reactExports.useRef([]);
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!containerRef.current || !books || books.length === 0) return;
    const opts = {
      root: containerRef.current,
      threshold: 0.55
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const idx = Number(entry.target.getAttribute("data-index"));
        if (entry.isIntersecting) setActiveIndex(idx);
      });
    }, opts);
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [books]);
  reactExports.useEffect(() => {
    if (!autoplay || !books || books.length === 0 || !containerRef.current) return;
    let paused = false;
    let timer = null;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        if (paused) return;
        const next = (activeIndex + 1) % books.length;
        const nextEl = slideRefs.current[next];
        const container = containerRef.current;
        if (nextEl && container) {
          const target = nextEl.offsetLeft - (container.clientWidth - nextEl.clientWidth) / 2;
          container.scrollTo({ left: target, behavior: "smooth" });
        }
      }, 3500);
    };
    start();
    const el = containerRef.current;
    const onEnter = () => paused = true;
    const onLeave = () => paused = false;
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      if (timer) clearInterval(timer);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [autoplay, books, activeIndex]);
  const sectionClass = fullWidth ? "w-full overflow-hidden px-4 py-8 sm:px-6" : "mx-auto max-w-7xl px-4 py-10 sm:px-6";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: sectionClass, children: [
    (title || subtitle || seeAllTo) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-foreground", children: title }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })
      ] }),
      seeAllTo && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: seeAllTo, children: [
        "See all ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
      ] }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-hidden", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] w-44 shrink-0" }, i)) }) : books && books.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: containerRef,
        className: (fullWidth ? "px-3 sm:px-4 " : "-mx-4 px-4 sm:-mx-6 sm:px-6 ") + "flex snap-x snap-mandatory gap-4 overflow-x-auto py-3 pb-5 scrollbar-thin",
        children: books.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-index": i,
            ref: (el) => {
              if (!el) return;
              slideRefs.current[i] = el;
            },
            className: `w-44 shrink-0 origin-center snap-start sm:w-52 transition-transform duration-300 ${scaleActive && i === activeIndex ? "scale-105 z-10" : "scale-100"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookCard, { book: b, priority: i < 3 })
          },
          b.id
        ))
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: emptyText ?? "Nothing here yet." })
  ] });
}
function HomePage() {
  const loaderData = Route$a.useLoaderData();
  const latest = useQuery({
    queryKey: ["latest-books"],
    queryFn: () => fetchBooks({
      sort: "newest",
      limit: 12
    }),
    staleTime: 1e3 * 60 * 5,
    // 5 minutes
    initialData: loaderData.latest
  });
  const chapterReleases = useQuery({
    queryKey: ["homepage-chapter-releases"],
    queryFn: () => fetchLastWeekBooks(8),
    staleTime: 1e3 * 60 * 5,
    initialData: loaderData.chapterReleases
  });
  const popular = useQuery({
    queryKey: ["homepage-popular"],
    queryFn: () => fetchMostViewedBooks(8),
    staleTime: 1e3 * 60 * 10,
    initialData: loaderData.popular
  });
  const topRated = useQuery({
    queryKey: ["homepage-top-rated"],
    queryFn: () => fetchBooks({
      sort: "rating",
      limit: 6
    }),
    staleTime: 1e3 * 60 * 10,
    initialData: loaderData.topRated
  });
  const trendingBooks = chapterReleases.data?.length ? chapterReleases.data : popular.data;
  const latestUpdates = latest.data?.slice(0, 12);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "border-b border-border bg-card/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 pt-8 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-wrap items-end justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "mb-3 gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5" }),
              "Fresh releases"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-foreground sm:text-5xl", children: "Latest chapter releases" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: "New chapters and freshly updated tales, gathered into one quick reading lane." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/browse", children: [
            "Browse library ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookSlider, { title: "", books: chapterReleases.data, isLoading: chapterReleases.isLoading, emptyText: "No recent chapter releases yet.", fullWidth: true, autoplay: true, scaleActive: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingPanel, { books: trendingBooks, isLoading: chapterReleases.isLoading || popular.isLoading }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopularPanel, { books: popular.data, isLoading: popular.isLoading })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-10 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-5 w-5" }), title: "Latest updates", action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/browse", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
        ] }) }) }),
        latest.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({
          length: 6
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-lg" }, i)) }) : latestUpdates?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: latestUpdates.map((book) => /* @__PURE__ */ jsxRuntimeExports.jsx(UpdateCard, { book }, book.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground", children: "No latest updates yet." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdminAnnouncement, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopularPanel, { title: "Top rated", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5" }), books: topRated.data, isLoading: topRated.isLoading })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeedbackButton, {})
  ] });
}
function SectionHeader({
  icon,
  title,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--gold)]", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl", children: title })
    ] }),
    action
  ] });
}
function TrendingPanel({
  books,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5" }), title: "Trending today" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card p-4 shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-hidden", children: Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[2/3] w-44 shrink-0 rounded-lg" }, i)) }) : books?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:hidden", children: books.slice(0, 8).map((book) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookCard, { book }) }, book.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-4 hidden snap-x gap-4 overflow-x-auto px-4 pb-2 sm:flex", children: books.slice(0, 8).map((book) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-44 shrink-0 snap-start sm:w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookCard, { book }) }, book.id)) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Trending books will appear once readers start exploring." }) })
  ] });
}
function PopularPanel({
  title = "Popular",
  icon = /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5" }),
  books,
  isLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon, title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-card p-3 shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({
      length: 6
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, i)) }) : books?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: books.slice(0, 8).map((book, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(RankedBook, { book, rank: index + 1 }, book.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 text-sm text-muted-foreground", children: "No popular books yet." }) })
  ] });
}
function RankedBook({
  book,
  rank
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book/$slug", params: {
    slug: book.slug
  }, className: "group grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 rounded-md p-2 transition-colors hover:bg-muted", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[2/3] overflow-hidden rounded-md bg-muted", children: book.cover_image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: book.cover_image_url, alt: book.title, className: "h-full w-full object-cover", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 text-[var(--gold)]/70", strokeWidth: 1.5 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 py-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary", children: book.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs capitalize text-muted-foreground", children: book.type }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[var(--gold)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: cn("h-3 w-3", (book.rating_count ?? 0) > 0 && "fill-current") }),
          (book.avg_rating ?? 0) > 0 ? (book.avg_rating ?? 0).toFixed(1) : "New"
        ] }),
        book.latest_chapter_number != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground items-center rounded-full bg-gradient-to-r from-[var(--saffron)]/10 to-[var(--crimson)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--crimson)]", children: [
          "Chapter ",
          Number(book.latest_chapter_number)
        ] })
      ] })
    ] })
  ] });
}
function UpdateCard({
  book
}) {
  const chapters = makeChapterRows(book.latest_chapter_number);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { initial: {
    opacity: 0,
    y: 12
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    amount: 0.2
  }, className: "grid grid-cols-[5rem_minmax(0,1fr)] gap-4 rounded-lg border border-border bg-card p-3 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book/$slug", params: {
      slug: book.slug
    }, className: "aspect-[2/3] overflow-hidden rounded-md bg-muted", children: book.cover_image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: book.cover_image_url, alt: book.title, className: "h-full w-full object-cover", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-7 w-7 text-[var(--gold)]/70", strokeWidth: 1.5 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book/$slug", params: {
        slug: book.slug
      }, className: "line-clamp-1 font-display text-xl text-foreground hover:text-primary", children: book.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs capitalize text-muted-foreground", children: book.status }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: chapters.map((chapter) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-md bg-muted/70 px-3 py-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium text-foreground", children: chapter.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-muted-foreground", children: chapter.time })
      ] }, chapter.label)) })
    ] })
  ] });
}
function AdminAnnouncement() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-lg border border-border bg-card p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--gold)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-foreground", children: "Announcement" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--gold)]/10 via-transparent to-[var(--crimson)]/10 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "From admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-2xl text-foreground", children: "Welcome to the new reading hub" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-6 text-muted-foreground", children: "The homepage now puts fresh chapter releases, trending stories, popular books, and latest updates in one place. More announcement controls can be wired into the admin panel next." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/browse", children: "Start reading" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/search", children: "Search stories" }) })
      ] })
    ] })
  ] });
}
function makeChapterRows(latest) {
  if (latest == null) {
    return [{
      label: "Chapter coming soon",
      time: "New"
    }, {
      label: "Book added",
      time: "Recently"
    }];
  }
  return [{
    label: `Chapter ${latest}`,
    time: "Latest"
  }, ...latest > 1 ? [{
    label: `Chapter ${latest - 1}`,
    time: "Previous"
  }] : [], ...latest > 2 ? [{
    label: `Chapter ${latest - 2}`,
    time: "Archive"
  }] : []];
}
export {
  HomePage as component
};
