import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as Navbar } from "./Navbar-40VzOHb6.mjs";
import { F as Footer } from "./Footer-vQx19yLA.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { a as Shield, D as Database, E as Eye, c as UserCheck, R as RefreshCw, M as Mail } from "../_libs/lucide-react.mjs";
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
import "./input-C0QjszdI.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const sections = [{
  icon: Database,
  number: "01",
  title: "Information We Collect",
  content: "We may collect personal information such as your name and email address when you register an account or subscribe to our newsletter. We also collect usage data such as pages visited, time spent on the site, and interactions with content — all to improve your experience."
}, {
  icon: Eye,
  number: "02",
  title: "How We Use Your Information",
  content: "The information we collect is used to provide and improve our services, send you updates about new stories and chapter releases (if you subscribed), communicate important service announcements, and personalize your reading experience on KalpanikTales."
}, {
  icon: Shield,
  number: "03",
  title: "Data Protection",
  content: "We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. Your data is stored on secure servers with appropriate encryption and access controls."
}, {
  icon: UserCheck,
  number: "04",
  title: "Third-Party Services",
  content: "We use trusted third-party services such as Supabase for database and authentication, and Google Fonts for typography. These providers have their own privacy policies. We do not sell or rent your personal information to any third party for marketing purposes."
}, {
  icon: RefreshCw,
  number: "05",
  title: "Cookies & Local Storage",
  content: "KalpanikTales uses browser local storage to remember your theme preference (light/dark mode) and session data. We do not use tracking cookies for advertising. You can clear your browser storage at any time through your browser settings."
}, {
  icon: Mail,
  number: "06",
  title: "Contact & Policy Updates",
  content: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised date. If you have questions about your data or this policy, please reach out to us through the website."
}];
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};
function PrivacyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-transparent", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border bg-card/30 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--crimson)]/5 via-transparent to-[var(--gold)]/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6
        }, className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 text-[var(--gold)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-reading text-sm uppercase tracking-widest text-[var(--gold)]", children: "Legal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
          opacity: 0,
          y: 24
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.1,
          duration: 0.6
        }, className: "mt-4 font-display text-5xl text-foreground sm:text-6xl", children: "Privacy Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 24
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.2,
          duration: 0.6
        }, className: "mt-4 max-w-2xl font-reading text-muted-foreground", children: "Your privacy matters to us. This policy explains how we collect, use, and safeguard your personal information when you visit KalpanikTales." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          delay: 0.3,
          duration: 0.6
        }, className: "mt-3 text-xs text-muted-foreground/60", children: "Last updated: June 2025" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-4 py-16 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: sections.map((section, i) => {
        const Icon = section.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { custom: i, initial: "hidden", whileInView: "visible", viewport: {
          once: true,
          amount: 0.15
        }, variants: fadeUp, className: "group relative overflow-hidden rounded-xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--gold)]/30 hover:bg-card/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-[var(--crimson)]/60 via-[var(--crimson)]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--gold)]/20 bg-[var(--gold)]/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-[var(--gold)]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-reading text-xs font-semibold tracking-widest text-[var(--gold)]/60", children: section.number }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-foreground", children: section.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-7 text-muted-foreground", children: section.content })
            ] })
          ] })
        ] }, section.number);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5
      }, className: "mt-12 rounded-xl border border-[var(--gold)]/20 bg-gradient-to-br from-[var(--crimson)]/10 via-transparent to-[var(--gold)]/10 p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-reading text-muted-foreground", children: [
        "By using KalpanikTales you also agree to our",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "font-semibold text-[var(--gold)] underline-offset-2 hover:underline", children: "Terms & Conditions" }),
        "."
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  PrivacyPage as component
};
