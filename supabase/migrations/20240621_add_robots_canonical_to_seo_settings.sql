-- Add robots and canonical settings to seo_settings
ALTER TABLE seo_settings ADD COLUMN default_robots_index BOOLEAN DEFAULT TRUE;
ALTER TABLE seo_settings ADD COLUMN default_robots_follow BOOLEAN DEFAULT TRUE;
ALTER TABLE seo_settings ADD COLUMN default_canonical_url TEXT;
