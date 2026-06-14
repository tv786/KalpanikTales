import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const slug = args[0] || "the-siddhas-of-himalayas";

// Load .env into process.env for the script
const envPath = path.join(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*["']?(.*?)["']?\s*$/);
    if (m) process.env[m[1]] = m[2];
  }
}

import { supabase } from "../src/integrations/supabase/client";

async function main() {
  console.log(`Checking comments for slug: ${slug}`);
  const { data: book, error: be } = await supabase
    .from("books")
    .select("id,title")
    .eq("slug", slug)
    .maybeSingle();
  if (be) {
    console.error("Error fetching book:", be);
    process.exit(1);
  }
  if (!book) {
    console.log("No book found for slug", slug);
    process.exit(0);
  }
  console.log("Found book:", book);

  const { data, error } = await supabase
    .from("comments")
    .select("id, user_id, parent_id, content, likes, is_hidden, created_at")
    .eq("book_id", book.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    process.exit(1);
  }

  console.log(`Comments returned: ${((data || []) as any[]).length}`);
  console.log(JSON.stringify(data, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
