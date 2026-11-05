import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_POSTS, Post } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() || '';

  if (!q) {
    // Return recent posts if no query
    return NextResponse.json({ results: MOCK_POSTS.slice(0, 5) });
  }

  const queryLower = q.toLowerCase();

  // Try querying Supabase if available
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,category.ilike.%${q}%,content.ilike.%${q}%`)
        .order('created_at', { ascending: false })
        .limit(8);

      if (!error && data && data.length > 0) {
        const results: Post[] = data.map((row) => ({
          id: row.id,
          slug: row.slug,
          title: row.title,
          excerpt: row.excerpt,
          category: row.category,
          categoryLabel:
            row.category === 'prompts'
              ? 'Guides'
              : row.category === 'alternatives'
              ? 'Tools'
              : 'Troubleshooting',
          featured_image: row.featured_image_url || '/images/card-1-brain.jpg',
          author: {
            name: row.author_name || 'PromptGrid Team',
            role: 'AI Specialist',
            avatar: row.author_avatar || '/images/author-avatar.jpg',
          },
          created_at: new Date(row.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          reading_time: `${row.reading_time_minutes || 3} min read`,
          content: row.content,
        }));

        return NextResponse.json({ results });
      }
    } catch {
      // Fallback to local filter below
    }
  }

  // Fallback to Mock Data search
  const filtered = MOCK_POSTS.filter((post) => {
    return (
      post.title.toLowerCase().includes(queryLower) ||
      post.excerpt.toLowerCase().includes(queryLower) ||
      post.category.toLowerCase().includes(queryLower) ||
      post.categoryLabel.toLowerCase().includes(queryLower) ||
      post.content.toLowerCase().includes(queryLower)
    );
  });

  return NextResponse.json({ results: filtered });
}
