-- Migration: Ensure rock-solid RLS policies on public.destinations
-- Date: 2026-09-04

DO $$ BEGIN
  DROP POLICY IF EXISTS "Editors manage destinations" ON public.destinations;
  
  CREATE POLICY "Editors manage destinations"
    ON public.destinations
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
          AND user_roles.role IN ('admin', 'editor')
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
          AND user_roles.role IN ('admin', 'editor')
      )
    );
END $$;

NOTIFY pgrst, 'reload schema';
