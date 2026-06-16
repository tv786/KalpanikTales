import { supabase } from "@/integrations/supabase/client";
import type { BookCardData } from "@/components/BookCard";

export interface BookRow {
  id: string;
  slug: string;
  title: string;
  synopsis: string | null;
  cover_image_url: string | null;
  author: string | null;
  artist: string | null;
  type: string;
  status: string;
  tags: string[];
  total_views: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export async function fetchBooks(opts: {
  type?: string;
  status?: string;
  sort?: "newest" | "popular" | "rating" | "title";
  q?: string;
  limit?: number;
}): Promise<BookCardData[]> {
  let query = supabase
    .from("books")
    .select("id, slug, title, cover_image_url, author, type, status, created_at, total_views");

  if (opts.type && opts.type !== "all") query = query.eq("type", opts.type);
  if (opts.status && opts.status !== "all") query = query.eq("status", opts.status);
  if (opts.q) query = query.ilike("title", `%${opts.q}%`);

  switch (opts.sort) {
    case "popular":
      query = query.order("total_views", { ascending: false });
      break;
    case "title":
      query = query.order("title", { ascending: true });
      break;
    case "rating":
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
  }

  if (opts.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) throw error;
  const books = data ?? [];

  // Fetch ratings aggregate for these books
  const ids = books.map((b) => b.id);
  if (!ids.length) return [];
  const [{ data: ratings }, { data: chapters }] = await Promise.all([
    supabase.from("ratings").select("book_id, score").in("book_id", ids),
    supabase
      .from("chapters")
      .select("book_id, chapter_number, id")
      .eq("is_published", true)
      .in("book_id", ids)
      .order("chapter_number", { ascending: false }),
  ]);

  const byBook = new Map<string, number[]>();
  (ratings ?? []).forEach((r) => {
    const arr = byBook.get(r.book_id) ?? [];
    arr.push(r.score);
    byBook.set(r.book_id, arr);
  });

  const latestChapterByBook = new Map<string, number>();
  (chapters ?? []).forEach((c) => {
    if (!latestChapterByBook.has(c.book_id)) {
      latestChapterByBook.set(c.book_id, Number(c.chapter_number));
    }
  });

  // Fetch pages for all chapters
  const chapterIds = (chapters ?? []).map(c => c.id);
  const { data: pages } = await supabase
    .from("pages")
    .select("chapter_id, page_number")
    .in("chapter_id", chapterIds);

  // Calculate total pages per book and page ranges per chapter
  const pagesByChapter = new Map<string, number[]>();
  (pages ?? []).forEach((p) => {
    const arr = pagesByChapter.get(p.chapter_id) ?? [];
    arr.push(p.page_number);
    pagesByChapter.set(p.chapter_id, arr);
  });

  const totalPagesByBook = new Map<string, number>();
  const latestChapterPageRange = new Map<string, { start: number; end: number }>();
  
  // Calculate page offsets for continuous page numbering
  const chapterPageOffsets = new Map<string, number>();
  let offset = 0;
  const sortedChapters = (chapters ?? []).sort((a, b) => Number(a.chapter_number) - Number(b.chapter_number));
  
  for (const chapter of sortedChapters) {
    chapterPageOffsets.set(chapter.id, offset);
    const chapterPages = pagesByChapter.get(chapter.id) ?? [];
    offset += chapterPages.length;
  }

  // Calculate total pages and latest chapter page range
  (chapters ?? []).forEach((c) => {
    const chapterPages = pagesByChapter.get(c.id) ?? [];
    const count = totalPagesByBook.get(c.book_id) ?? 0;
    totalPagesByBook.set(c.book_id, count + chapterPages.length);
    
    // If this is the latest chapter for this book, calculate its page range
    const currentLatest = latestChapterByBook.get(c.book_id);
    if (currentLatest && Number(c.chapter_number) === currentLatest) {
      const chapterOffset = chapterPageOffsets.get(c.id) ?? 0;
      const startPage = chapterOffset + 1;
      const endPage = chapterOffset + chapterPages.length;
      latestChapterPageRange.set(c.book_id, { start: startPage, end: endPage });
    }
  });

  const enriched = books.map((b) => {
    const arr = byBook.get(b.id) ?? [];
    const avg = arr.length ? arr.reduce((a, c) => a + c, 0) / arr.length : 0;
    const totalPages = totalPagesByBook.get(b.id) ?? 0;
    const pageRange = latestChapterPageRange.get(b.id);
    return {
      ...b,
      avg_rating: avg,
      rating_count: arr.length,
      latest_chapter_number: latestChapterByBook.get(b.id) ?? null,
      latest_page_number: totalPages > 0 ? totalPages : null,
      total_pages: totalPages > 0 ? totalPages : null,
      latest_page_start: pageRange?.start ?? null,
      latest_page_end: pageRange?.end ?? null,
    };
  });

  if (opts.sort === "rating") {
    enriched.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
  }
  return enriched;
}

export async function fetchFeaturedBook(): Promise<BookRow | null> {
  const { data } = await supabase
    .from("books")
    .select("*")
    .eq("is_featured", true)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (data) return data as BookRow;
  // Fallback: latest book
  const { data: latest } = await supabase
    .from("books")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (latest as BookRow | null) ?? null;
}

export async function fetchSiteStats() {
  const [booksRes, chaptersRes, pagesRes] = await Promise.all([
    supabase.from("books").select("id", { count: "exact", head: true }),
    supabase.from("chapters").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("pages").select("id", { count: "exact", head: true }),
  ]);
  return {
    books: booksRes.count ?? 0,
    chapters: chaptersRes.count ?? 0,
    pages: pagesRes.count ?? 0,
  };
}

export async function fetchFeaturedBooks(limit = 12): Promise<BookCardData[]> {
  const { data, error } = await supabase
    .from("books")
    .select("id, slug, title, cover_image_url, author, type, status, created_at, total_views")
    .eq("is_featured", true)
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return enrichBooks(data ?? []);
}

export async function fetchMostViewedBooks(limit = 12): Promise<BookCardData[]> {
  const { data, error } = await supabase
    .from("books")
    .select("id, slug, title, cover_image_url, author, type, status, created_at, total_views")
    .order("total_views", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return enrichBooks(data ?? []);
}

export async function fetchLastWeekBooks(limit = 12): Promise<BookCardData[]> {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  // Books whose chapters were published in the last 7 days
  const { data: recentChapters } = await supabase
    .from("chapters")
    .select("book_id")
    .eq("is_published", true)
    .gte("created_at", weekAgo);
  const bookIds = Array.from(new Set((recentChapters ?? []).map((c) => c.book_id)));
  if (!bookIds.length) {
    // Fallback: recently updated books
    const { data } = await supabase
      .from("books")
      .select("id, slug, title, cover_image_url, author, type, status, created_at, total_views")
      .gte("updated_at", weekAgo)
      .order("updated_at", { ascending: false })
      .limit(limit);
    return enrichBooks(data ?? []);
  }
  const { data, error } = await supabase
    .from("books")
    .select("id, slug, title, cover_image_url, author, type, status, created_at, total_views")
    .in("id", bookIds)
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return enrichBooks(data ?? []);
}

export async function fetchUserBookmarks(userId: string): Promise<BookCardData[]> {
  const { data: bms, error } = await supabase
    .from("bookmarks")
    .select("book_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  const ids = Array.from(new Set((bms ?? []).map((b) => b.book_id)));
  if (!ids.length) return [];
  const { data: books } = await supabase
    .from("books")
    .select("id, slug, title, cover_image_url, author, type, status, created_at, total_views")
    .in("id", ids);
  const order = new Map(ids.map((id, i) => [id, i]));
  const sorted = (books ?? []).slice().sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
  return enrichBooks(sorted);
}

async function enrichBooks(books: any[]): Promise<BookCardData[]> {
  const ids = books.map((b) => b.id);
  if (!ids.length) return [];
  const [{ data: ratings }, { data: chapters }] = await Promise.all([
    supabase.from("ratings").select("book_id, score").in("book_id", ids),
    supabase
      .from("chapters")
      .select("book_id, chapter_number, id")
      .eq("is_published", true)
      .in("book_id", ids)
      .order("chapter_number", { ascending: false }),
  ]);
  
  const byBook = new Map<string, number[]>();
  (ratings ?? []).forEach((r) => {
    const arr = byBook.get(r.book_id) ?? [];
    arr.push(r.score);
    byBook.set(r.book_id, arr);
  });
  const latestChapter = new Map<string, number>();
  (chapters ?? []).forEach((c) => {
    if (!latestChapter.has(c.book_id)) latestChapter.set(c.book_id, Number(c.chapter_number));
  });
  
  // Fetch pages for all chapters
  const chapterIds = (chapters ?? []).map(c => c.id);
  const { data: pages } = await supabase
    .from("pages")
    .select("chapter_id, page_number")
    .in("chapter_id", chapterIds);
  
  // Calculate total pages per book and page ranges per chapter
  const pagesByChapter = new Map<string, number[]>();
  (pages ?? []).forEach((p) => {
    const arr = pagesByChapter.get(p.chapter_id) ?? [];
    arr.push(p.page_number);
    pagesByChapter.set(p.chapter_id, arr);
  });

  const totalPagesByBook = new Map<string, number>();
  const latestChapterPageRange = new Map<string, { start: number; end: number }>();
  
  // Calculate page offsets for continuous page numbering
  const chapterPageOffsets = new Map<string, number>();
  let offset = 0;
  const sortedChapters = (chapters ?? []).sort((a, b) => Number(a.chapter_number) - Number(b.chapter_number));
  
  for (const chapter of sortedChapters) {
    chapterPageOffsets.set(chapter.id, offset);
    const chapterPages = pagesByChapter.get(chapter.id) ?? [];
    offset += chapterPages.length;
  }

  // Calculate total pages and latest chapter page range
  (chapters ?? []).forEach((c) => {
    const chapterPages = pagesByChapter.get(c.id) ?? [];
    const count = totalPagesByBook.get(c.book_id) ?? 0;
    totalPagesByBook.set(c.book_id, count + chapterPages.length);
    
    // If this is the latest chapter for this book, calculate its page range
    const currentLatest = latestChapter.get(c.book_id);
    if (currentLatest && Number(c.chapter_number) === currentLatest) {
      const chapterOffset = chapterPageOffsets.get(c.id) ?? 0;
      const startPage = chapterOffset + 1;
      const endPage = chapterOffset + chapterPages.length;
      latestChapterPageRange.set(c.book_id, { start: startPage, end: endPage });
    }
  });
  
  return books.map((b) => {
    const arr = byBook.get(b.id) ?? [];
    const avg = arr.length ? arr.reduce((a, c) => a + c, 0) / arr.length : 0;
    const totalPages = totalPagesByBook.get(b.id) ?? 0;
    const pageRange = latestChapterPageRange.get(b.id);
    return {
      ...b,
      avg_rating: avg,
      rating_count: arr.length,
      latest_chapter_number: latestChapter.get(b.id) ?? null,
      latest_page_number: totalPages > 0 ? totalPages : null,
      total_pages: totalPages > 0 ? totalPages : null,
      latest_page_start: pageRange?.start ?? null,
      latest_page_end: pageRange?.end ?? null,
    };
  });
}
