REVOKE ALL ON TABLE public.contact_submissions FROM anon, authenticated;
GRANT ALL ON TABLE public.contact_submissions TO service_role;