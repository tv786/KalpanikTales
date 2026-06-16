import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-Ek2-qFbi.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { I as ImageUpload } from "./ImageUpload-chas_NVX.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { s as slugify } from "./helpers-BNSTMec-.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Plus, v as Pencil, w as Trash } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
function AdminBooks() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = reactExports.useState(false);
  const {
    data: books = [],
    isLoading
  } = useQuery({
    queryKey: ["admin", "books"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("books").select("id, slug, title, type, status, total_views, is_featured, created_at").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data ?? [];
    }
  });
  const {
    data: commentsForBooks = []
  } = useQuery({
    queryKey: ["admin", "comments-for-books", books.map((b) => b.id)],
    queryFn: async () => {
      const ids = books.map((b) => b.id);
      if (!ids.length) return [];
      const {
        data,
        error
      } = await supabase.from("comments").select("id, book_id").in("book_id", ids);
      if (error) throw error;
      return data ?? [];
    },
    enabled: books.length > 0
  });
  const commentCountByBook = commentsForBooks.reduce((acc, c) => {
    acc[c.book_id] = (acc[c.book_id] || 0) + 1;
    return acc;
  }, {});
  const [form, setForm] = reactExports.useState({
    title: "",
    synopsis: "",
    author: "",
    type: "fantasy",
    status: "ongoing",
    cover_image_url: ""
  });
  const create = useMutation({
    mutationFn: async () => {
      if (!form.title.trim()) throw new Error("Title required");
      const {
        data,
        error
      } = await supabase.from("books").insert({
        title: form.title,
        slug: slugify(form.title),
        synopsis: form.synopsis || null,
        author: form.author || null,
        type: form.type,
        status: form.status,
        cover_image_url: form.cover_image_url || null
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Book created");
      qc.invalidateQueries({
        queryKey: ["admin", "books"]
      });
      setShowForm(false);
      setForm({
        title: "",
        synopsis: "",
        author: "",
        type: "fantasy",
        status: "ongoing",
        cover_image_url: ""
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const remove = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: (_, id) => {
      toast.success("Book deleted");
      qc.invalidateQueries({
        queryKey: ["admin", "books"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold", children: "Books" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/categories", children: "Manage categories" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/announcements", children: "Announcements" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/users", children: "Users" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowForm((v) => !v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        " New book"
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-lg border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Author" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.author, onChange: (e) => setForm({
            ...form,
            author: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.type, onValueChange: (v) => setForm({
            ...form,
            type: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mythology", children: "Mythology" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "folklore", children: "Folklore" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fantasy", children: "Fantasy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "epic", children: "Epic" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.status, onValueChange: (v) => setForm({
            ...form,
            status: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ongoing", children: "Ongoing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "completed", children: "Completed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "hiatus", children: "Hiatus" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Cover image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: form.cover_image_url, onChange: (url) => setForm({
            ...form,
            cover_image_url: url
          }), folder: "covers", label: "Cover" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Synopsis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: form.synopsis, onChange: (e) => setForm({
            ...form,
            synopsis: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setShowForm(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => create.mutate(), disabled: create.isPending, children: create.isPending ? "Creating..." : "Create book" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading..." }) : books.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No books yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Views" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Comments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: books.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 font-medium", children: b.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 capitalize", children: b.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 capitalize", children: b.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: b.total_views }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: commentCountByBook[b.id] ?? 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/$bookId", params: {
            bookId: b.id
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1 h-4 w-4" }),
            " Manage"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
            if (!confirm(`Delete "${b.title}"? This cannot be undone.`)) return;
            remove.mutate(b.id);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash, { className: "ml-2 h-4 w-4 text-destructive" }) })
        ] })
      ] }, b.id)) })
    ] }) })
  ] });
}
export {
  AdminBooks as component
};
