import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { H as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-Ek2-qFbi.mjs";
import { z as zodValidator, f as fallback } from "../_libs/tanstack__zod-adapter.mjs";
import { o as object, _ as _enum, s as string } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-BejnJz2Y.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[10rem] leading-none text-[var(--gold)]", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-foreground", children: "This tale could not be found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-md text-sm text-muted-foreground", children: "The story you seek may have been moved, or perhaps it never existed in this realm." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Return home"
      }
    )
  ] });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "We hit a snag rendering this page. Try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$g = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KalpanikTales — Stories from Ancient Bharat" },
      { name: "description", content: "Read mythological, folklore, and fantasy story books from across Bharat — chapter by chapter, page by page." },
      { property: "og:title", content: "KalpanikTales — Stories from Ancient Bharat" },
      { property: "og:description", content: "Read mythological, folklore, and fantasy story books from across Bharat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Yatra+One&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `(function(){try{var t=localStorage.getItem('kalpanik_theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$g.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "bottom-right", richColors: true })
  ] });
}
const BASE_URL = "";
const Route$f = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/browse", changefreq: "daily", priority: "0.9" },
          { path: "/search", changefreq: "monthly", priority: "0.5" },
          { path: "/auth", changefreq: "monthly", priority: "0.3" }
        ];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
        });
      }
    }
  }
});
const $$splitComponentImporter$e = () => import("./search-tNJYiqvs.mjs");
const Route$e = createFileRoute("/search")({
  head: () => ({
    meta: [{
      title: "Search — KalpanikTales"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const TYPES = ["all", "mythology", "folklore", "fantasy", "epic", "fable"];
const STATUSES = ["all", "ongoing", "completed", "hiatus"];
const $$splitComponentImporter$d = () => import("./browse-ukmaxnei.mjs");
const SORTS = ["newest", "popular", "rating", "title"];
const searchSchema = object({
  type: fallback(_enum(TYPES), "all").default("all"),
  status: fallback(_enum(STATUSES), "all").default("all"),
  sort: fallback(_enum(SORTS), "newest").default("newest"),
  q: fallback(string(), "").default("")
});
const Route$d = createFileRoute("/browse")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [{
      title: "Browse stories — KalpanikTales"
    }, {
      name: "description",
      content: "Browse all books on KalpanikTales by genre, status, and rating."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./auth-CfqCo6ls.mjs");
const Route$c = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Sign in — KalpanikTales"
    }, {
      name: "description",
      content: "Sign in or create your KalpanikTales account."
    }]
  }),
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const {
      data
    } = await supabase.auth.getSession();
    if (data.session) throw redirect({
      to: "/"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./route-BFsOu0JM.mjs");
const Route$b = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
async function fetchBooks(opts) {
  let query = supabase.from("books").select("id, slug, title, cover_image_url, author, type, status, created_at, total_views");
  if (opts.type && opts.type !== "all") query = query.eq("type", opts.type);
  if (opts.status && opts.status !== "all") query = query.eq("status", opts.status);
  if (opts.q) query = query.ilike("title", `%${opts.q}%`);
  switch (opts.sort) {
    case "popular":
      query = query.order("total_views", { ascending: false });
      break;
    case "title":
      query = query.order("title", { ascending: true });
      break;
    case "rating":
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
  }
  if (opts.limit) query = query.limit(opts.limit);
  const { data, error } = await query;
  if (error) throw error;
  const books = data ?? [];
  const ids = books.map((b) => b.id);
  if (!ids.length) return [];
  const [{ data: ratings }, { data: chapters }] = await Promise.all([
    supabase.from("ratings").select("book_id, score").in("book_id", ids),
    supabase.from("chapters").select("book_id, chapter_number").eq("is_published", true).in("book_id", ids).order("chapter_number", { ascending: false })
  ]);
  const byBook = /* @__PURE__ */ new Map();
  (ratings ?? []).forEach((r) => {
    const arr = byBook.get(r.book_id) ?? [];
    arr.push(r.score);
    byBook.set(r.book_id, arr);
  });
  const latestChapterByBook = /* @__PURE__ */ new Map();
  (chapters ?? []).forEach((c) => {
    if (!latestChapterByBook.has(c.book_id)) {
      latestChapterByBook.set(c.book_id, Number(c.chapter_number));
    }
  });
  const enriched = books.map((b) => {
    const arr = byBook.get(b.id) ?? [];
    const avg = arr.length ? arr.reduce((a, c) => a + c, 0) / arr.length : 0;
    return {
      ...b,
      avg_rating: avg,
      rating_count: arr.length,
      latest_chapter_number: latestChapterByBook.get(b.id) ?? null
    };
  });
  if (opts.sort === "rating") {
    enriched.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
  }
  return enriched;
}
async function fetchMostViewedBooks(limit = 12) {
  const { data, error } = await supabase.from("books").select("id, slug, title, cover_image_url, author, type, status, created_at, total_views").order("total_views", { ascending: false }).limit(limit);
  if (error) throw error;
  return enrichBooks(data ?? []);
}
async function fetchLastWeekBooks(limit = 12) {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString();
  const { data: recentChapters } = await supabase.from("chapters").select("book_id").eq("is_published", true).gte("created_at", weekAgo);
  const bookIds = Array.from(new Set((recentChapters ?? []).map((c) => c.book_id)));
  if (!bookIds.length) {
    const { data: data2 } = await supabase.from("books").select("id, slug, title, cover_image_url, author, type, status, created_at, total_views").gte("updated_at", weekAgo).order("updated_at", { ascending: false }).limit(limit);
    return enrichBooks(data2 ?? []);
  }
  const { data, error } = await supabase.from("books").select("id, slug, title, cover_image_url, author, type, status, created_at, total_views").in("id", bookIds).order("updated_at", { ascending: false }).limit(limit);
  if (error) throw error;
  return enrichBooks(data ?? []);
}
async function fetchUserBookmarks(userId) {
  const { data: bms, error } = await supabase.from("bookmarks").select("book_id, created_at").eq("user_id", userId).order("created_at", { ascending: false });
  if (error) throw error;
  const ids = Array.from(new Set((bms ?? []).map((b) => b.book_id)));
  if (!ids.length) return [];
  const { data: books } = await supabase.from("books").select("id, slug, title, cover_image_url, author, type, status, created_at, total_views").in("id", ids);
  const order = new Map(ids.map((id, i) => [id, i]));
  const sorted = (books ?? []).slice().sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
  return enrichBooks(sorted);
}
async function enrichBooks(books) {
  const ids = books.map((b) => b.id);
  if (!ids.length) return [];
  const [{ data: ratings }, { data: chapters }] = await Promise.all([
    supabase.from("ratings").select("book_id, score").in("book_id", ids),
    supabase.from("chapters").select("book_id, chapter_number").eq("is_published", true).in("book_id", ids).order("chapter_number", { ascending: false })
  ]);
  const byBook = /* @__PURE__ */ new Map();
  (ratings ?? []).forEach((r) => {
    const arr = byBook.get(r.book_id) ?? [];
    arr.push(r.score);
    byBook.set(r.book_id, arr);
  });
  const latestChapter = /* @__PURE__ */ new Map();
  (chapters ?? []).forEach((c) => {
    if (!latestChapter.has(c.book_id)) latestChapter.set(c.book_id, Number(c.chapter_number));
  });
  return books.map((b) => {
    const arr = byBook.get(b.id) ?? [];
    const avg = arr.length ? arr.reduce((a, c) => a + c, 0) / arr.length : 0;
    return {
      ...b,
      avg_rating: avg,
      rating_count: arr.length,
      latest_chapter_number: latestChapter.get(b.id) ?? null
    };
  });
}
const $$splitComponentImporter$a = () => import("./index-Bt0Guh2L.mjs");
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "KalpanikTales - Latest Stories and Chapter Updates"
    }, {
      name: "description",
      content: "Read mythological, folklore, and fantasy story books from across Bharat with latest chapter releases, trending picks, and admin announcements."
    }]
  }),
  loader: async () => {
    const [latest, chapterReleases, popular, topRated] = await Promise.all([fetchBooks({
      sort: "newest",
      limit: 12
    }), fetchLastWeekBooks(8), fetchMostViewedBooks(8), fetchBooks({
      sort: "rating",
      limit: 6
    })]);
    return {
      latest,
      chapterReleases,
      popular,
      topRated
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitErrorComponentImporter = () => import("./book._slug-Bh83e0HJ.mjs");
const $$splitNotFoundComponentImporter = () => import("./book._slug-CqSJjr70.mjs");
const $$splitComponentImporter$9 = () => import("./book._slug-CRrFRbjH.mjs");
const Route$9 = createFileRoute("/book/$slug")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const $$splitComponentImporter$8 = () => import("./profile-DXz2_ovY.mjs");
const Route$8 = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [{
      title: "Your library — KalpanikTales"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./bookmarks-93PoDcN7.mjs");
const Route$7 = createFileRoute("/_authenticated/bookmarks")({
  head: () => ({
    meta: [{
      title: "Your bookmarks — KalpanikTales"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./route-CmUMTvP-.mjs");
const Route$6 = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({
    context
  }) => {
    const userId = context.user?.id;
    if (!userId) throw redirect({
      to: "/auth"
    });
    const {
      data,
      error
    } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
    if (error || !data) throw redirect({
      to: "/"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-Bb7t8SvU.mjs");
const Route$5 = createFileRoute("/_authenticated/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./read._bookSlug._chapterSlug-BO4JfwWE.mjs");
const Route$4 = createFileRoute("/read/$bookSlug/$chapterSlug")({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./categories-AOKd08X4.mjs");
const Route$3 = createFileRoute("/_authenticated/admin/categories")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./announcements-BIQfWo-7.mjs");
const Route$2 = createFileRoute("/_authenticated/admin/announcements")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_bookId.index-Cb_eXavJ.mjs");
const Route$1 = createFileRoute("/_authenticated/admin/$bookId/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_bookId._chapterId-ClBqhX1_.mjs");
const Route = createFileRoute("/_authenticated/admin/$bookId/$chapterId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$f.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$g
});
const SearchRoute = Route$e.update({
  id: "/search",
  path: "/search",
  getParentRoute: () => Route$g
});
const BrowseRoute = Route$d.update({
  id: "/browse",
  path: "/browse",
  getParentRoute: () => Route$g
});
const AuthRoute = Route$c.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$g
});
const AuthenticatedRouteRoute = Route$b.update({
  id: "/_authenticated",
  getParentRoute: () => Route$g
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$g
});
const BookSlugRoute = Route$9.update({
  id: "/book/$slug",
  path: "/book/$slug",
  getParentRoute: () => Route$g
});
const AuthenticatedProfileRoute = Route$8.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedBookmarksRoute = Route$7.update({
  id: "/bookmarks",
  path: "/bookmarks",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminRouteRoute = Route$6.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const ReadBookSlugChapterSlugRoute = Route$4.update({
  id: "/read/$bookSlug/$chapterSlug",
  path: "/read/$bookSlug/$chapterSlug",
  getParentRoute: () => Route$g
});
const AuthenticatedAdminCategoriesRoute = Route$3.update({
  id: "/categories",
  path: "/categories",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminAnnouncementsRoute = Route$2.update({
  id: "/announcements",
  path: "/announcements",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminBookIdIndexRoute = Route$1.update({
  id: "/$bookId/",
  path: "/$bookId/",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminBookIdChapterIdRoute = Route.update({
  id: "/$bookId/$chapterId",
  path: "/$bookId/$chapterId",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminRouteRouteChildren = {
  AuthenticatedAdminAnnouncementsRoute,
  AuthenticatedAdminCategoriesRoute,
  AuthenticatedAdminIndexRoute,
  AuthenticatedAdminBookIdChapterIdRoute,
  AuthenticatedAdminBookIdIndexRoute
};
const AuthenticatedAdminRouteRouteWithChildren = AuthenticatedAdminRouteRoute._addFileChildren(
  AuthenticatedAdminRouteRouteChildren
);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRouteRoute: AuthenticatedAdminRouteRouteWithChildren,
  AuthenticatedBookmarksRoute,
  AuthenticatedProfileRoute
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  BrowseRoute,
  SearchRoute,
  SitemapDotxmlRoute,
  BookSlugRoute,
  ReadBookSlugChapterSlugRoute
};
const routeTree = Route$g._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 1e3 * 60 * 5,
    // 5 minutes - preload routes that are fresh
    defaultPreload: "intent"
    // Preload routes on hover/intent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$d as R,
  STATUSES as S,
  TYPES as T,
  Route$a as a,
  fetchLastWeekBooks as b,
  fetchMostViewedBooks as c,
  Route$9 as d,
  Route$8 as e,
  fetchBooks as f,
  Route$7 as g,
  fetchUserBookmarks as h,
  Route$4 as i,
  Route$1 as j,
  Route as k,
  router as r
};
