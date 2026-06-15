import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navbar } from "./Navbar-40VzOHb6.mjs";
import { F as Footer } from "./Footer-DQgxFWBD.mjs";
import { e as Route$9 } from "./router-BtWjLRvv.mjs";
import "../_libs/sonner.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./button-BC9oXVxV.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
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
import "../_libs/tslib.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./use-auth-KyRhbYaJ.mjs";
import "./client-Ek2-qFbi.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/lucide-react.mjs";
import "./input-C0QjszdI.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__zod-adapter.mjs";
import "../_libs/zod.mjs";
function ProfilePage() {
  const {
    user
  } = Route$9.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-4 py-12 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-10 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-2xl text-primary-foreground", children: (user.email ?? "?").charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground", children: "Your library" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-foreground", children: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your account details and preferences." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ProfilePage as component
};
