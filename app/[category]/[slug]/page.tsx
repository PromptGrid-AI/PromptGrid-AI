import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Clock, ChevronRight } from 'lucide-react';
import { getPostBySlug, getAdjacentPosts } from '@/lib/supabase';
import QuickAnswerBox from '@/components/QuickAnswerBox';
import CopyPromptBox from '@/components/CopyPromptBox';
import TableOfContents from '@/components/TableOfContents';
import Sidebar from '@/components/Sidebar';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import PostNavigation from '@/components/PostNavigation';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLdSchema';
import { extractTocFromMarkdown } from '@/lib/toc';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://promptgridai.com';

// 🎯 DYNAMIC METADATA PER POST (SEO Powerhouse)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: 'Article Not Found' };
  }

  const canonicalUrl = `${SITE_URL}/${category}/${slug}`;
  const ogImageUrl = post.featured_image.startsWith('http')
    ? post.featured_image
    : `${SITE_URL}${post.featured_image}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [
      post.categoryLabel,
      'AI Prompts',
      'Artificial Intelligence',
      'LLM Tools',
      ...post.title.split(' ').filter((w) => w.length > 4),
    ],
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'PromptGrid AI',
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author.name],
      section: post.categoryLabel,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
      creator: '@PromptGridAI',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = await getAdjacentPosts(slug, category);

  const tocItems = extractTocFromMarkdown(
    post.content,
    Boolean(post.quick_answer),
    Boolean(post.prompt_to_copy)
  );

  const canonicalUrl = `${SITE_URL}/${category}/${slug}`;
  const ogImageUrl = post.featured_image.startsWith('http')
    ? post.featured_image
    : `${SITE_URL}${post.featured_image}`;

  return (
    <>
      {/* 🌟 SEO Structured Data (JSON-LD) */}
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={canonicalUrl}
        imageUrl={ogImageUrl}
        datePublished={post.created_at}
        authorName={post.author.name}
        category={post.categoryLabel}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: post.categoryLabel, url: `${SITE_URL}/${category}` },
          { name: post.title, url: canonicalUrl },
        ]}
      />

      <article className="py-6 bg-[#FAF9FD] dark:bg-[#070A12] min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
            <Link href="/" className="hover:text-[#6C5CE7] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            <Link href="/prompts" className="hover:text-[#6C5CE7] transition-colors">Articles</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            <Link href={`/${category}`} className="hover:text-[#6C5CE7] capitalize transition-colors">
              {post.categoryLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            <span className="text-gray-900 dark:text-white font-semibold line-clamp-1">{post.title}</span>
          </nav>

          {/* Article Header (Editorial Serif Typography) */}
          <header className="space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-bold text-[#111827] dark:text-white tracking-tight leading-[1.18] font-serif transition-colors">
              {post.title}
            </h1>

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 pt-1">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-200">By {post.author.name}</span>
              </div>

              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span>Updated {post.created_at}</span>
              <span className="text-gray-300 dark:text-gray-700">·</span>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] font-semibold text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.reading_time}</span>
              </div>
            </div>
          </header>

          {/* Large Widescreen Featured Image */}
          <div className="relative aspect-[16/7] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-sm bg-purple-50">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>

          {/* 3-Column Reading Layout: TOC (left) | Content (center) | Sidebar (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            
            {/* Left Column: Table of Contents & Social Share (3 cols) */}
            <div className="hidden lg:block lg:col-span-3">
              <TableOfContents items={tocItems} />
            </div>

            {/* Center Column: Article Body (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Quick Answer Box (Google Featured Snippet Anchor) */}
              {post.quick_answer && (
                <div id="quick-answer" className="scroll-mt-28">
                  <QuickAnswerBox
                    summary={post.quick_answer.summary}
                    takeaways={post.quick_answer.takeaways}
                  />
                </div>
              )}

              {/* Article Content Rendered with Markdown Support */}
              <div>
                <MarkdownRenderer content={post.content} />
              </div>

              {/* Interactive Copy Prompt Box */}
              {post.prompt_to_copy && (
                <div id="interactive-prompt" className="scroll-mt-28">
                  <CopyPromptBox promptText={post.prompt_to_copy} />
                </div>
              )}

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-400 italic">
                  Last verified on {post.created_at} by the PromptGrid AI Editorial Team.
                </p>
              </div>

              {/* Previous / Next Article Pagination */}
              <PostNavigation prev={prev} next={next} />
            </div>

            {/* Right Column: Sidebar (3 cols) */}
            <div className="lg:col-span-3 space-y-8">
              <Sidebar />
            </div>

          </div>

        </div>
      </article>
    </>
  );
}
