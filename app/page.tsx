import React from 'react';
import HeroBanner from '@/components/HeroBanner';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import Pagination from '@/components/Pagination';
import { getPaginatedPosts, POSTS_PER_PAGE } from '@/lib/supabase';
import Link from 'next/link';

interface HomePageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentPage = Math.max(1, parseInt(resolvedSearchParams.page || '1', 10) || 1);

  const { data: posts, total, totalPages } = await getPaginatedPosts({
    page: currentPage,
    limit: POSTS_PER_PAGE,
  });

  return (
    <div className="bg-[#FAF9FD] dark:bg-[#070A12] min-h-screen transition-colors">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Main Content: 2-Columns Cards on Left + Sidebar on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Feed: 8 Columns -> 2-Column Cards Grid */}
          <div className="lg:col-span-8 space-y-6">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-[#131722] rounded-2xl border border-gray-100 dark:border-gray-800/80 p-8">
                <p className="text-gray-500 dark:text-gray-400 text-sm">No articles found on this page.</p>
                <Link
                  href="/"
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
              baseUrl="/"
            />
          </div>

          {/* Sidebar: 4 Columns */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>

        </div>
      </div>
    </div>
  );
}
