-- Global SEO settings table
CREATE TABLE IF NOT EXISTS seo_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT NOT NULL DEFAULT 'KalpanikTales',
  site_description TEXT NOT NULL DEFAULT 'Read mythological, folklore, and fantasy story books from across Bharat.',
  default_og_image TEXT,
  twitter_handle TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  google_analytics_id TEXT,
  google_tag_manager_id TEXT,
  google_search_console_verification TEXT,
  bing_webmaster_verification TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page-specific SEO settings table
CREATE TABLE IF NOT EXISTS page_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  keywords TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  noindex BOOLEAN DEFAULT FALSE,
  nofollow BOOLEAN DEFAULT FALSE,
  exclude_from_sitemap BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Redirects table
CREATE TABLE IF NOT EXISTS redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path TEXT NOT NULL UNIQUE,
  target_path TEXT NOT NULL,
  status_code INTEGER DEFAULT 301,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sitemap settings table
CREATE TABLE IF NOT EXISTS sitemap_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enabled BOOLEAN DEFAULT TRUE,
  last_generated_at TIMESTAMP WITH TIME ZONE,
  changefreq_default TEXT DEFAULT 'weekly',
  priority_default DECIMAL DEFAULT 0.8,
  exclude_patterns TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default SEO settings
INSERT INTO seo_settings (site_title, site_description)
VALUES (
  'KalpanikTales',
  'Read mythological, folklore, and fantasy story books from across Bharat — chapter by chapter, page by page.'
)
ON CONFLICT DO NOTHING;

-- Insert default sitemap settings
INSERT INTO sitemap_settings (enabled, changefreq_default, priority_default)
VALUES (TRUE, 'weekly', 0.8)
ON CONFLICT DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_page_seo_path ON page_seo(path);
CREATE INDEX IF NOT EXISTS idx_redirects_source ON redirects(source_path);
CREATE INDEX IF NOT EXISTS idx_redirects_active ON redirects(active);

-- Enable RLS
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_seo ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE sitemap_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies (admin only access)
CREATE POLICY "Admins can manage seo_settings" ON seo_settings
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin'));

CREATE POLICY "Admins can manage page_seo" ON page_seo
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin'));

CREATE POLICY "Admins can manage redirects" ON redirects
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin'));

CREATE POLICY "Admins can manage sitemap_settings" ON sitemap_settings
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role = 'admin'));

-- Public read access for page_seo (for frontend)
CREATE POLICY "Public can read page_seo" ON page_seo
  FOR SELECT USING (TRUE);

-- Public read access for active redirects
CREATE POLICY "Public can read active redirects" ON redirects
  FOR SELECT USING (active = TRUE);

-- Public read access for sitemap settings
CREATE POLICY "Public can read sitemap_settings" ON sitemap_settings
  FOR SELECT USING (TRUE);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update updated_at
CREATE TRIGGER update_seo_settings_updated_at
  BEFORE UPDATE ON seo_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_seo_updated_at
  BEFORE UPDATE ON page_seo
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_redirects_updated_at
  BEFORE UPDATE ON redirects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sitemap_settings_updated_at
  BEFORE UPDATE ON sitemap_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
