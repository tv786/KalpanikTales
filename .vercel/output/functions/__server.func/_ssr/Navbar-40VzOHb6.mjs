import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, I as Item2, S as Separator2, a as SubTrigger2, b as SubContent2, c as CheckboxItem2, d as ItemIndicator2, e as RadioItem2, L as Label2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { u as useAuth } from "./use-auth-KyRhbYaJ.mjs";
import { k as Bookmark, b as Search, X, o as Menu, p as User, a as Shield, L as LogOut, B as BookOpen, q as Sun, r as Moon, s as ChevronRight, t as Check, u as Circle } from "../_libs/lucide-react.mjs";
const KEY = "kalpanik_theme";
function useTheme() {
  const [theme, setTheme] = reactExports.useState("light");
  reactExports.useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem(KEY);
    const prefersDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    const onThemeEvent = (e) => {
      const detail = e.detail;
      if (detail) {
        setTheme(detail);
      }
    };
    document.addEventListener("kalpanik:theme", onThemeEvent);
    return () => document.removeEventListener("kalpanik:theme", onThemeEvent);
  }, []);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(KEY, next);
    try {
      document.dispatchEvent(new CustomEvent("kalpanik:theme", { detail: next }));
    } catch (err) {
    }
  }
  return { theme, toggleTheme };
}
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: toggleTheme,
      "aria-label": "Toggle theme",
      className: "text-foreground hover:text-primary",
      children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5" })
    }
  );
}
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function Navbar() {
  const { user, profile, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const initial = (profile?.username || user?.email || "?").charAt(0).toUpperCase();
  const { theme } = useTheme();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-17 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: theme === "dark" ? "/assets/white-logo.png" : "/assets/dark-logo.png",
        alt: "KalpanikTales",
        className: "h-12 w-auto"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-6 md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/browse",
          className: "text-sm font-medium text-foreground/80 transition-colors hover:text-primary",
          activeProps: { className: "text-primary" },
          children: "Browse"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/bookmarks",
          className: "text-sm font-medium text-foreground/80 transition-colors hover:text-primary",
          activeProps: { className: "text-primary" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/search",
          className: "text-sm font-medium text-foreground/80 transition-colors hover:text-primary",
          activeProps: { className: "text-primary" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setMobileOpen((s) => !s),
          className: "inline-flex items-center justify-center rounded-md p-2 hover:bg-muted md:hidden",
          "aria-label": "Open menu",
          children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
        }
      ),
      user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "flex h-9 w-9 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground",
            "aria-label": "Account menu",
            children: initial
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-48", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => navigate({ to: "/profile" }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "mr-2 h-4 w-4" }),
            " Profile"
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => navigate({ to: "/admin" }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "mr-2 h-4 w-4" }),
            " Admin"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: logout, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            " Log out"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: "Sign in" }) })
    ] }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 top-16 z-40 w-48 rounded-lg bg-background/95 p-2 shadow-lg md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/bookmarks",
          className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent",
          onClick: () => setMobileOpen(false),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" }),
            " Bookmarks"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/search",
          className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent",
          onClick: () => setMobileOpen(false),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
            " Search"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/browse",
          className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent",
          onClick: () => setMobileOpen(false),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
            " Browse"
          ]
        }
      )
    ] }) })
  ] }) });
}
export {
  Navbar as N
};
