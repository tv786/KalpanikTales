import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, b as useMutation, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-Cv-Zy4CN.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-B4h29_rw.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { U as Users, G as Trash2 } from "../_libs/lucide-react.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const listAdminUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("ed3ceab58a919703a723479fbecac5a7d57863588d1ff985f9c8d6a6260910ba"));
const deleteAdminUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(createSsrRpc("0e9b8a18e7961a2b705a6ce9c7508d1b2ba0c69a04f5015a48eb872375110502"));
function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(void 0, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function UserAvatar({
  username,
  email,
  avatarUrl
}) {
  const label = username ?? email ?? "?";
  const initial = label.charAt(0).toUpperCase();
  if (avatarUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: "", className: "h-9 w-9 rounded-full object-cover" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium", children: initial });
}
function AdminUsers() {
  const [search, setSearch] = reactExports.useState("");
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAdminUser({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["admin", "users"]
      });
    },
    onError: (error2) => {
      toast.error(error2.message || "Failed to delete user");
    }
  });
  const handleDeleteUser = (id, username) => {
    if (window.confirm(`Are you sure you want to delete user ${username || id}? This action cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => listAdminUsers()
  });
  const filteredUsers = reactExports.useMemo(() => {
    const users = data?.users ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((user) => {
      const haystack = [user.username, user.email, user.bio, user.roles.join(" ")].filter(Boolean).join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [data?.users, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Registered accounts with profile and sign-in details." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold leading-none", children: data?.total ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total users" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by username, email, or role...", value: search, onChange: (e) => setSearch(e.target.value), className: "max-w-md" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading users..." }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive", children: error instanceof Error ? error.message : "Failed to load users" }) : filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: search ? "No users match your search." : "No users yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm whitespace-nowrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Joined" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Last sign-in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Bio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { username: user.username, email: user.email, avatarUrl: user.avatarUrl }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: user.username ?? "—" }),
            !user.emailConfirmed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email unverified" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: user.email ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: user.roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: role === "admin" ? "default" : "secondary", className: "capitalize", children: role }, role)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: formatDate(user.createdAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: user.lastSignInAt ? formatDate(user.lastSignInAt) : "Never" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-xs truncate px-4 py-3 text-muted-foreground", children: user.bio ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDeleteUser(user.id, user.username), disabled: deleteMutation.isPending, className: "text-destructive hover:bg-destructive/10 hover:text-destructive", title: "Delete user", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) })
      ] }, user.id)) })
    ] }) }),
    !isLoading && !error && search && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "Showing ",
      filteredUsers.length,
      " of ",
      data?.total ?? 0,
      " users"
    ] })
  ] });
}
export {
  AdminUsers as component
};
