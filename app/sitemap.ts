import { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/mock-data';
import { getPublishedPosts } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.promptgridai.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  // 1. Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. Category Pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // 3. Article Pages
  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const imageUrl = post.featured_image
      ? post.featured_image.startsWith('http')
        ? post.featured_image
        : `${SITE_URL}${post.featured_image}`
      : undefined;

    return {
      url: `${SITE_URL}/${post.category}/${post.slug}`,
      lastModified: new Date(post.updated_at_iso || post.published_at_iso || post.created_at || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: imageUrl ? [imageUrl] : undefined,
    };
  });

  return [...staticPages, ...categoryPages, ...postPages];
}
