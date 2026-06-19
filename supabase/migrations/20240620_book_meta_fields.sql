-- Add meta fields for books
ALTER TABLE books ADD COLUMN meta_title TEXT;
ALTER TABLE books ADD COLUMN meta_description TEXT;
ALTER TABLE books ADD COLUMN meta_keywords TEXT;
