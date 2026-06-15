import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
function EmptyState({ icon, title, description, action, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col items-center justify-center py-16 text-center", className), children: [
    icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 text-muted-foreground/60", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-foreground", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-md text-sm text-muted-foreground", children: description }),
    action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: action })
  ] });
}
export {
  EmptyState as E
};
