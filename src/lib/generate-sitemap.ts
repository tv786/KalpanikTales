import { supabase } from "@/integrations/supabase/client";

const SITE_URL = "https://kalpaniktales.com";

interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

async function generateSitemap(): Promise<string> {
  const entries: SitemapEntry[] = [];

  // Static pages
  entries.push(
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/browse`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/search`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/terms`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/disclaimer`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  );

  // Fetch all published books
  const { data: books } = await supabase
    .from("books")
    .select("slug, updated_at")
    .eq("status", "published")
    .order("updated_at", { ascending: false });

  if (books) {
    books.forEach((book) => {
      entries.push({
        url: `${SITE_URL}/book/${book.slug}`,
        lastModified: book.updated_at,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : ""}
    ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ""}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

// For server-side usage (if using a server framework)
export async function GET() {
  const sitemap = await generateSitemap();
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

// For client-side usage or manual generation
export { generateSitemap };
