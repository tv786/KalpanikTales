import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { B as BookOpen, f as Star } from "../_libs/lucide-react.mjs";
function BookCard({ book, className, priority = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      whileHover: { y: -4 },
      transition: { type: "spring", stiffness: 300, damping: 25 },
      className: cn("group rounded-lg", className),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/book/$slug",
          params: { slug: book.slug },
          className: "relative isolate block overflow-hidden rounded-lg shadow-sm transition-shadow [clip-path:inset(0_round_var(--radius-lg))] hover:shadow-[var(--shadow-elegant)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[2/3] overflow-hidden rounded-lg bg-gradient-to-br from-[var(--saffron)]/30 to-[var(--crimson)]/30", children: [
              book.cover_image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: book.cover_image_url,
                  alt: book.title,
                  loading: priority ? "eager" : "lazy",
                  decoding: "async",
                  className: "h-full w-full rounded-t-lg object-cover transition-transform group-hover:scale-105"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-[var(--gold)]/60", strokeWidth: 1 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-2 top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[var(--saffron)]/10 to-[var(--crimson)]/10 px-2 py-1 text-xs font-semibold text-[var(--gold)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
                (book.avg_rating ?? 0) > 0 ? (book.avg_rating ?? 0).toFixed(1) : "New"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "line-clamp-1 text-base font-medium text-foreground", children: book.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs flex items-center justify-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                book.latest_chapter_number != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center rounded-full bg-gradient-to-r from-[var(--saffron)]/10 to-[var(--crimson)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--crimson)]", children: [
                  "Chapter. ",
                  Number(book.latest_chapter_number)
                ] })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  BookCard as B
};
