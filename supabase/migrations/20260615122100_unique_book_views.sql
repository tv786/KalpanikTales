-- Create table for tracking unique book views by IP/session
CREATE TABLE IF NOT EXISTS public.book_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (book_id, session_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_book_views_book_session ON public.book_views(book_id, session_id);
CREATE INDEX IF NOT EXISTS idx_book_views_viewed_at ON public.book_views(viewed_at);

-- Grant permissions
GRANT SELECT ON public.book_views TO anon, authenticated;
GRANT INSERT ON public.book_views TO anon, authenticated;
GRANT ALL ON public.book_views TO service_role;

-- Enable RLS
ALTER TABLE public.book_views ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "book_views_select_all" ON public.book_views FOR SELECT USING (true);
CREATE POLICY "book_views_insert_any" ON public.book_views FOR INSERT WITH CHECK (true);

-- Replace the increment function to check for unique views
CREATE OR REPLACE FUNCTION public.increment_book_views(book_id_param UUID, session_id_param TEXT DEFAULT NULL)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  session_id TEXT := COALESCE(session_id_param, encode(gen_random_bytes(16), 'hex'));
BEGIN
  -- Insert view record if it doesn't exist for this session
  INSERT INTO public.book_views (book_id, session_id, ip_address, user_agent)
  VALUES (book_id_param, session_id, inet_client_addr(), substring(user_agent from 1 for 500))
  ON CONFLICT (book_id, session_id) DO NOTHING;
  
  -- Only increment book views if this was a new unique view
  IF FOUND THEN
    UPDATE public.books SET total_views = total_views + 1 WHERE id = book_id_param;
  END IF;
END;
$$;

-- Update grant for the new function signature
GRANT EXECUTE ON FUNCTION public.increment_book_views(UUID, TEXT) TO anon, authenticated;
