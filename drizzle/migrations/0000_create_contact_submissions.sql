CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  interest text NOT NULL CHECK (interest IN ('Early access', 'A team conversation', 'Something else')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 5000)
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE INDEX contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);
COMMENT ON TABLE public.contact_submissions IS 'Private public-site enquiries. Owner review through Lovable Database; no visitor Data API privileges or read policies.';