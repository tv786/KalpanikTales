import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useLocation, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function AdminLayout() {
  const {
    pathname
  } = useLocation();
  const tabs = [{
    to: "/admin",
    label: "Books",
    exact: true
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Admin" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mb-6 flex gap-2 border-b border-border", children: tabs.map((t) => {
      const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: t.to, className: cn("border-b-2 px-3 py-2 text-sm", active ? "border-primary font-medium text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"), children: t.label }, t.to);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  AdminLayout as component
};
