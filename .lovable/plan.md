
# KalpanikTales — Chunk 1: Foundation

Adapting the spec to the existing TanStack Start scaffold. This chunk lays the foundation; Chunks 2 and 3 will follow once you approve and review.

## What this chunk delivers

1. **Database schema** — full migration with all missing tables, RLS policies, GRANTs, and the `increment_book_views` RPC
2. **Auth scaffolding** — Supabase email/password auth, `_authenticated/route.tsx` gate, `attachSupabaseAuth`, profile auto-creation on signup, role-based admin check via `has_role()` + `user_roles` table (per security guidelines — roles MUST be in their own table, NOT on profiles)
3. **Design system** — `src/styles.css` with brand tokens (saffron, crimson, gold, ivory, indigo, etc.) in `oklch`, Yatra One / Lora / Inter fonts, dark mode tokens
4. **Layout shell** — `Navbar`, `Footer`, root layout, theme toggle, placeholder Home page so the app builds
5. **Shared UI primitives** — `Button` variants, `Badge`, `StarRating`, `Modal`, `Skeleton`, `EmptyState`, `FeedbackButton`
6. **`/auth` page** — login + register tabs
7. **404 page** — themed not-found

## Chunks 2 & 3 (later, not in this delivery)

- **Chunk 2 — Public reader experience**: Home (featured/continue/latest/carousels/stats), Browse (filters/sort), Book Detail (rating, comments, replies), Reader (single/scroll modes, settings persistence, progress save, view tracking), Search, Profile (library/history/ratings/comments)
- **Chunk 3 — Admin panel**: AdminLayout + sidebar, Dashboard, Books CRUD with cover upload, Chapters CRUD, Pages list, TipTap PageEditor with image upload, Comments moderation, Feedback, Users role toggle, Newsletter export

## Key adaptations from your spec

| Spec said | We're doing | Why |
|---|---|---|
| Vite + React Router v6 | TanStack Start file routes | Existing scaffold; better SSR/SEO |
| Role on `profiles.role` | Separate `user_roles` table + `has_role()` SECURITY DEFINER | Required by platform security rules — role-on-profile = privilege escalation risk |
| `slug` on `books` | Add `slug` column to existing `books` table | Existing schema uses `id` text PK with no slug |
| Zustand `authStore` | TanStack Router context + `useAuth` hook + `requireSupabaseAuth` server middleware | Native to this stack |
| Helmet | TanStack Router `head()` per route | Native SSR meta |
| `_redirects` for SPA | Not needed | TanStack handles routing on Lovable hosting |
| Existing `books`/`chapters`/`pages` data | Migrate to spec schema (new UUID PKs, add missing columns, drop unused like `emoji`/`chapters jsonb`) | Existing schema is incompatible (text IDs, jsonb chapters embedded) |

## ⚠️ Destructive migration warning

The existing `books`, `chapters`, `pages` tables have an incompatible shape (text IDs, embedded jsonb chapters, no slug, no FK to auth users). To match the spec I'll **drop and recreate** them with the new structure. **Any existing data in those 3 tables will be lost.** Tell me if you have data to preserve and I'll write a data-migration step instead.

## Technical details

**New/changed tables**: `profiles` (FK auth.users), `app_role` enum, `user_roles` (FK auth.users), `books` (recreated with uuid PK, slug, type, status, tags, is_featured, total_views), `chapters` (recreated, FK books, slug, chapter_number decimal, content_type, is_published), `pages` (recreated, FK chapters, jsonb content, image_url), `ratings`, `comments` (self-FK for replies), `bookmarks`, `reading_history`, `comment_likes`, `feedback`, `newsletter_subscribers`.

**Storage buckets**: `book-covers`, `chapter-images`, `avatars` (all public).

**RLS**: public read on books/chapters/pages where published; auth-scoped writes on ratings/comments/bookmarks/history/comment_likes; admin-only on feedback management and user_roles writes via `has_role(auth.uid(),'admin')`.

**Trigger**: auto-create row in `profiles` on `auth.users` insert; `updated_at` triggers on mutable tables.

**RPC**: `increment_book_views(book_id_param uuid)` SECURITY DEFINER.

**Auth flow**: signup → trigger creates profile → user has no roles → admin must grant via `user_roles` (first admin granted manually via SQL after first signup; I'll include instructions).

**Fonts**: loaded via `<link>` in `__root.tsx` head().

## After you approve

1. I submit the migration for your approval
2. Once approved & types regenerate, I write all the code in this chunk
3. You review the running preview; if good, I start Chunk 2

Sound good?
