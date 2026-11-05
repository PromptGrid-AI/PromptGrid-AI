import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import Pagination from '@/components/Pagination';
import { CATEGORIES } from '@/lib/mock-data';
import { getPaginatedPosts, POSTS_PER_PAGE } from '@/lib/supabase';
import { ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://promptgridai.com';

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const currentCat = CATEGORIES.find((c) => c.slug === category);
  if (!currentCat) {
    return { title: 'Category Not Found' };
  }
  const title = `${currentCat.name} — Free Resources & Guides`;
  const description = currentCat.desc;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${SITE_URL}/${category}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `${SITE_URL}/${category}`,
      siteName: 'PromptGrid AI',
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentPage = Math.max(1, parseInt(resolvedSearchParams.page || '1', 10) || 1);

  const currentCat = CATEGORIES.find((c) => c.slug === category);

  // Trigger custom 404 page if category is unknown
  if (!currentCat) {
    notFound();
  }

  const { data: displayPosts, total, totalPages } = await getPaginatedPosts({
    category,
    page: currentPage,
    limit: POSTS_PER_PAGE,
  });

  return (
    <div className="py-8 bg-[#FAF9FD] dark:bg-[#070A12] min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
          <Link href="/" className="hover:text-[#6C5CE7] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
          <span className="text-gray-900 dark:text-white capitalize font-semibold">
            {currentCat ? currentCat.name : category}
          </span>
        </nav>

        {/* Category Header Banner */}
        <div className="rounded-[28px] bg-[#E8E4FD] dark:bg-[#131726] p-8 sm:p-10 border border-purple-100 dark:border-purple-900/30 transition-colors">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-[#0D101A] text-[#6C5CE7] dark:text-[#A78BFA]">
            Category Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#111827] dark:text-white mt-3 transition-colors">
            {currentCat ? currentCat.name : category.toUpperCase()}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 max-w-2xl leading-relaxed transition-colors">
            {currentCat?.desc || 'Curated high-converting articles and resources.'}
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          <div className="lg:col-span-8 space-y-6">
            {displayPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-[#131722] rounded-2xl border border-gray-100 dark:border-gray-800/80 p-8">
                <p className="text-gray-500 dark:text-gray-400 text-sm">No articles found on this page.</p>
                <Link
                  href={`/${category}`}
                  className="inline-block mt-4 text-xs font-semibold text-[#6C5CE7] hover:underline"
                >
                  Return to first page →
                </Link>
              </div>
            )}

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={total}
              itemsPerPage={POSTS_PER_PAGE}
              baseUrl={`/${category}`}
            />
          </div>
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>

      </div>
    </div>
  );
}
