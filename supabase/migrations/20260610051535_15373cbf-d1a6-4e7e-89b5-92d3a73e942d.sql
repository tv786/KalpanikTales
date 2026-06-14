
DROP POLICY IF EXISTS "Public can read book images" ON storage.objects;
CREATE POLICY "Public can read book images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'book-images');

DROP POLICY IF EXISTS "Admins can upload book images" ON storage.objects;
CREATE POLICY "Admins can upload book images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'book-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update book images" ON storage.objects;
CREATE POLICY "Admins can update book images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'book-images' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete book images" ON storage.objects;
CREATE POLICY "Admins can delete book images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'book-images' AND public.has_role(auth.uid(), 'admin'));
