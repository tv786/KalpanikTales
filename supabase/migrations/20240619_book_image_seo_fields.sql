-- Add SEO fields for book cover image
ALTER TABLE books ADD COLUMN cover_image_alt TEXT;
ALTER TABLE books ADD COLUMN cover_image_caption TEXT;
ALTER TABLE books ADD COLUMN cover_image_title TEXT;
