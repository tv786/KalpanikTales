import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "./_libs/tanstack__react-query.mjs";
import { s as supabase } from "./_ssr/client-Ek2-qFbi.mjs";
import { B as Button } from "./_ssr/button-BC9oXVxV.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { T as Textarea } from "./_ssr/textarea-DSyJ1nlY.mjs";
import { R as Root, T as Thumb } from "./_libs/radix-ui__react-switch.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { I as ImageUpload } from "./_ssr/ImageUpload-chas_NVX.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./_ssr/select-CZRUt5a6.mjs";
import { s as slugify } from "./_ssr/helpers-BNSTMec-.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { j as Route$1 } from "./_ssr/router-BtWjLRvv.mjs";
import { r as ArrowLeft, P as Plus, p as Pencil, v as Trash2 } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "./_libs/tslib.mjs";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-select.mjs";
import "./_libs/radix-ui__number.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/tanstack__zod-adapter.mjs";
import "./_libs/zod.mjs";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root.displayName;
function AdminBookDetail() {
  const {
    bookId
  } = Route$1.useParams();
  const qc = useQueryClient();
  const {
    data: book
  } = useQuery({
    queryKey: ["admin", "book", bookId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("books").select("*").eq("id", bookId).single();
      if (error) throw error;
      return data;
    }
  });
  const {
    data: chapters = []
  } = useQuery({
    queryKey: ["admin", "chapters", bookId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("chapters").select("id, title, slug, chapter_number, is_published").eq("book_id", bookId).order("chapter_number", {
        ascending: true
      });
      if (error) throw error;
      return data ?? [];
    }
  });
  const [edit, setEdit] = reactExports.useState(null);
  reactExports.useEffect(() => setEdit(book ?? null), [book]);
  const saveBook = useMutation({
    mutationFn: async () => {
      if (!edit) return;
      const {
        error
      } = await supabase.from("books").update({
        title: edit.title,
        synopsis: edit.synopsis,
        author: edit.author,
        artist: edit.artist,
        type: edit.type,
        status: edit.status,
        cover_image_url: edit.cover_image_url,
        is_featured: edit.is_featured
      }).eq("id", bookId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({
        queryKey: ["admin", "book", bookId]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const [newChapterTitle, setNewChapterTitle] = reactExports.useState("");
  const [newChapterNumber, setNewChapterNumber] = reactExports.useState("");
  const createChapter = useMutation({
    mutationFn: async () => {
      const title = newChapterTitle.trim();
      const number = Number(newChapterNumber) || chapters.length + 1;
      if (!title) throw new Error("Chapter title required");
      const {
        error
      } = await supabase.from("chapters").insert({
        book_id: bookId,
        title,
        slug: slugify(`${number}-${title}`),
        chapter_number: number,
        content_type: "text",
        is_published: false
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Chapter created");
      setNewChapterTitle("");
      setNewChapterNumber("");
      qc.invalidateQueries({
        queryKey: ["admin", "chapters", bookId]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const togglePublish = useMutation({
    mutationFn: async (c) => {
      const {
        error
      } = await supabase.from("chapters").update({
        is_published: !c.is_published
      }).eq("id", c.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["admin", "chapters", bookId]
    })
  });
  const deleteChapter = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("chapters").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Chapter deleted");
      qc.invalidateQueries({
        queryKey: ["admin", "chapters", bookId]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const {
    data: comments = [],
    isLoading: commentsLoading
  } = useQuery({
    queryKey: ["admin", "comments", bookId],
    queryFn: async () => {
      const {
        data: commentsData,
        error: commentsError
      } = await supabase.from("comments").select("id, user_id, parent_id, content, likes, is_hidden, created_at").eq("book_id", bookId).order("created_at", {
        ascending: true
      });
      if (commentsError) throw commentsError;
      const commentsArr = commentsData ?? [];
      const userIds = Array.from(new Set(commentsArr.map((c) => c.user_id))).filter(Boolean);
      let profilesMap = /* @__PURE__ */ new Map();
      if (userIds.length) {
        const {
          data: profilesData
        } = await supabase.from("profiles").select("id, username, avatar_url").in("id", userIds);
        (profilesData ?? []).forEach((p) => profilesMap.set(p.id, p));
      }
      return commentsArr.map((c) => ({
        ...c,
        profile: profilesMap.get(c.user_id) ?? null
      }));
    },
    enabled: !!bookId
  });
  const deleteComment = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("comments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Comment deleted");
      qc.invalidateQueries({
        queryKey: ["admin", "comments", bookId]
      });
      qc.invalidateQueries({
        queryKey: ["admin", "books"]
      });
      qc.invalidateQueries({
        queryKey: ["admin", "comments-for-books"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (!edit) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1 h-4 w-4" }),
      " Back to books"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-lg border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Book details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: edit.title, onChange: (e) => setEdit({
            ...edit,
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Author" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: edit.author ?? "", onChange: (e) => setEdit({
            ...edit,
            author: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: edit.type, onValueChange: (v) => setEdit({
            ...edit,
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: edit.status, onValueChange: (v) => setEdit({
            ...edit,
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: edit.cover_image_url ?? "", onChange: (url) => setEdit({
            ...edit,
            cover_image_url: url
          }), folder: "covers", label: "Cover" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Synopsis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: edit.synopsis ?? "", onChange: (e) => setEdit({
            ...edit,
            synopsis: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => saveBook.mutate(), disabled: saveBook.isPending, children: saveBook.isPending ? "Saving..." : "Save book" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-lg border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Chapters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.1", className: "w-24", value: newChapterNumber, onChange: (e) => setNewChapterNumber(e.target.value), placeholder: String(chapters.length + 1) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Chapter title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newChapterTitle, onChange: (e) => setNewChapterTitle(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => createChapter.mutate(), disabled: createChapter.isPending, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " Add"
        ] })
      ] }),
      chapters.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No chapters yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border overflow-hidden rounded-md border border-border", children: chapters.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-12 text-sm text-muted-foreground", children: [
          "#",
          Number(c.chapter_number)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-medium", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: c.is_published, onCheckedChange: () => togglePublish.mutate({
            id: c.id,
            is_published: c.is_published
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: c.is_published ? "Published" : "Draft" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/$bookId/$chapterId", params: {
          bookId,
          chapterId: c.id
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1 h-4 w-4" }),
          " Pages"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
          if (confirm("Delete this chapter and all its pages?")) deleteChapter.mutate(c.id);
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-lg border border-border bg-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Comments" }),
      commentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading comments..." }) : comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No comments yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-border bg-background p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: c.profile?.username ?? "Traveller" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(c.created_at).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm whitespace-pre-wrap", children: c.content })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Likes: ",
            c.likes
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
            if (!confirm("Delete this comment?")) return;
            deleteComment.mutate(c.id);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) })
        ] })
      ] }) }, c.id)) })
    ] })
  ] });
}
export {
  AdminBookDetail as component
};
