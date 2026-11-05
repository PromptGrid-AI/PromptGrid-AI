import { createClient } from '@supabase/supabase-js';
import { Post, MOCK_POSTS } from './mock-data';

export interface DatabasePost {
  id: string;
  slug: string;
  title: string;
  meta_title?: string;
  meta_description?: string;
  excerpt: string;
  content: string;
  category: 'prompts' | 'alternatives' | 'fixes';
  featured_image_url?: string;
  quick_answer?: {
    summary: string;
    takeaways: string[];
  };
  prompt_to_copy?: string;
  author_name?: string;
  author_avatar?: string;
  reading_time_minutes?: number;
  quality_score?: number;
  published: boolean;
  created_at: string;
  updated_at?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const POSTS_PER_PAGE = 6;

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface AdjacentPosts {
  prev: Post | null;
  next: Post | null;
}

// Helper: Get paginated published posts (with optional category filter)
export async function getPaginatedPosts({
  page = 1,
  limit = POSTS_PER_PAGE,
  category,
}: {
  page?: number;
  limit?: number;
  category?: string;
} = {}): Promise<PaginatedResult<Post>> {
  const validPage = Math.max(1, Number(page) || 1);

  if (!supabase) {
    let filtered = MOCK_POSTS;
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(validPage, totalPages);
    const from = (safePage - 1) * limit;
    const data = filtered.slice(from, from + limit);
    return { data, total, totalPages, currentPage: safePage, limit };
  }

  try {
    const from = (validPage - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('published', true);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error || !data) {
      return { data: [], total: 0, totalPages: 1, currentPage: validPage, limit };
    }

    const total = count ?? data.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
      data: data.map(mapDbPostToPost),
      total,
      totalPages,
      currentPage: validPage,
      limit,
    };
  } catch {
    return { data: [], total: 0, totalPages: 1, currentPage: validPage, limit };
  }
}

// Helper: Get adjacent (previous and next) posts for article navigation
export async function getAdjacentPosts(
  currentSlug: string,
  category?: string
): Promise<AdjacentPosts> {
  if (!supabase) {
    const list = category
      ? MOCK_POSTS.filter((p) => p.category === category)
      : MOCK_POSTS;
    const idx = list.findIndex((p) => p.slug === currentSlug);
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: idx < list.length - 1 ? list[idx + 1] : null,
      next: idx > 0 ? list[idx - 1] : null,
    };
  }

  try {
    const { data: current } = await supabase
      .from('posts')
      .select('created_at, category')
      .eq('slug', currentSlug)
      .single();

    if (!current) return { prev: null, next: null };

    const targetCategory = category || current.category;

    // Previous post (older)
    let prevQuery = supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .lt('created_at', current.created_at);
    if (targetCategory) {
      prevQuery = prevQuery.eq('category', targetCategory);
    }
    const { data: prevData } = await prevQuery
      .order('created_at', { ascending: false })
      .limit(1);

    // Next post (newer)
    let nextQuery = supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .gt('created_at', current.created_at);
    if (targetCategory) {
      nextQuery = nextQuery.eq('category', targetCategory);
    }
    const { data: nextData } = await nextQuery
      .order('created_at', { ascending: true })
      .limit(1);

    return {
      prev: prevData && prevData.length > 0 ? mapDbPostToPost(prevData[0]) : null,
      next: nextData && nextData.length > 0 ? mapDbPostToPost(nextData[0]) : null,
    };
  } catch {
    return { prev: null, next: null };
  }
}

// Helper: Get all published posts
export async function getPublishedPosts(): Promise<Post[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data.map(mapDbPostToPost);
  } catch {
    return [];
  }
}

// Helper: Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !data) return null;
    return mapDbPostToPost(data);
  } catch {
    return null;
  }
}

// Helper: Get posts by category
export async function getPostsByCategory(category: string): Promise<Post[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data.map(mapDbPostToPost);
  } catch {
    return [];
  }
}

function mapDbPostToPost(row: DatabasePost): Post {
  const categoryLabels: Record<string, string> = {
    prompts: 'Guides',
    alternatives: 'Tools',
    fixes: 'Troubleshooting',
  };

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    categoryLabel: categoryLabels[row.category] || 'Guides',
    featured_image: row.featured_image_url || '/images/card-1-brain.jpg',
    author: {
      name: row.author_name || 'Author Samer',
      role: 'Prompt Engineer',
      avatar: row.author_avatar || '/images/author-avatar.jpg',
    },
    created_at: new Date(row.created_at).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    reading_time: `${row.reading_time_minutes || 4} min read`,
    quick_answer: row.quick_answer,
    prompt_to_copy: row.prompt_to_copy,
    content: row.content,
  };
}
