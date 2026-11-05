-- ==============================================================================
-- PromptGrid AI — Production Database Schema for Supabase
-- Target: Supabase SQL Editor
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create 'posts' Table
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  meta_title text,
  meta_description text,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL CHECK (category IN ('prompts', 'alternatives', 'fixes')),
  featured_image_url text,
  quick_answer jsonb DEFAULT '{"summary": "", "takeaways": []}'::jsonb,
  prompt_to_copy text,
  author_name text DEFAULT 'PromptGrid Team',
  author_avatar text DEFAULT '/images/author-avatar.jpg',
  reading_time_minutes integer DEFAULT 4,
  quality_score numeric(3, 1) DEFAULT 9.0,
  published boolean NOT NULL DEFAULT true,
  tags text[] DEFAULT '{}',
  faqs jsonb DEFAULT '[]'::jsonb,
  view_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. Create Indexes for High Performance Queries (Programmatic SEO)
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_tags ON public.posts USING GIN (tags);

-- 4. Create 'keyword_queue' Table (for n8n Automation Pipeline)
CREATE TABLE IF NOT EXISTS public.keyword_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL UNIQUE,
  category text NOT NULL CHECK (category IN ('prompts', 'alternatives', 'fixes')),
  search_volume integer DEFAULT 0,
  difficulty integer DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  post_id uuid REFERENCES public.posts(id) ON DELETE SET NULL,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_keyword_queue_status ON public.keyword_queue(status);
CREATE INDEX IF NOT EXISTS idx_keyword_queue_category ON public.keyword_queue(category);

-- 5. Auto-update 'updated_at' Timestamp Function & Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_posts_updated_at ON public.posts;
CREATE TRIGGER trigger_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_keywords_updated_at ON public.keyword_queue;
CREATE TRIGGER trigger_keywords_updated_at
  BEFORE UPDATE ON public.keyword_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 6. Row Level Security (RLS) Policies
-- Public can only READ published posts; service_role (n8n/Backend) can INSERT/UPDATE/DELETE
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keyword_queue ENABLE ROW LEVEL SECURITY;

-- Posts Table Policies
DROP POLICY IF EXISTS "Public can read published posts" ON public.posts;
CREATE POLICY "Public can read published posts"
  ON public.posts
  FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Service role full access on posts" ON public.posts;
CREATE POLICY "Service role full access on posts"
  ON public.posts
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Keyword Queue Policies
DROP POLICY IF EXISTS "Service role full access on keyword_queue" ON public.keyword_queue;
CREATE POLICY "Service role full access on keyword_queue"
  ON public.keyword_queue
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- 7. Supabase Storage: Public Bucket 'featured-images'
INSERT INTO storage.buckets (id, name, public)
VALUES ('featured-images', 'featured-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies
DROP POLICY IF EXISTS "Public image access" ON storage.objects;
CREATE POLICY "Public image access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'featured-images');

DROP POLICY IF EXISTS "Service role upload access" ON storage.objects;
CREATE POLICY "Service role upload access"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'featured-images' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role update access" ON storage.objects;
CREATE POLICY "Service role update access"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'featured-images' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role delete access" ON storage.objects;
CREATE POLICY "Service role delete access"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'featured-images' AND auth.role() = 'service_role');

-- 8. Seed Initial Sample Post (for instant testing)
INSERT INTO public.posts (
  slug,
  title,
  excerpt,
  category,
  featured_image_url,
  reading_time_minutes,
  quick_answer,
  prompt_to_copy,
  content,
  published
) VALUES (
  'mastering-the-power-of-ai-prompts-and-free-tools',
  'Mastering the Power of AI Prompts & Free Tools',
  'Learn how to streamline prompt engineering workflows with vetted formula templates that elevate generative output quality.',
  'prompts',
  '/images/card-1-brain.jpg',
  3,
  '{"summary": "Mastering AI prompts relies on strict modular framing: define the Persona, specify precise Output Constraints, supply 1-shot Examples, and lock temperature parameters between 0.2 and 0.7.", "takeaways": ["Use conversational descriptive prose instead of comma-separated keyword stuffing.", "Lock character consistency using --cref parameter for generative images.", "Always validate API outputs with deterministic JSON schemas."]}'::jsonb,
  'Act as a Principal AI Prompt Architect. Craft a production-ready system prompt for an autonomous code reviewer that flags security vulnerabilities in Next.js 15 apps.',
  '## 1. Understanding Prompt Structure

Modern Large Language Models prioritize semantic context over keyword frequency. Structuring prompts into designated sections ensures deterministic adherence and minimizes hallucination risk across production workflows.

## 2. Style References & Parameters

When engineering visual or text prompts, calibrating parameters like stylize weights and temperature values makes the difference between erratic output and repeatable high-converting assets.

- **Persona Specification:** Define the exact domain expertise and tone.
- **Negative Constraints:** Explicitly list what the model must never produce.
- **Output Schema:** Force strict JSON, Markdown, or tabular layout.',
  true
)
ON CONFLICT (slug) DO NOTHING;
