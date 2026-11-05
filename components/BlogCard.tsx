'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/mock-data';

export default function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group bg-white dark:bg-[#131722] rounded-2xl border border-gray-100 dark:border-gray-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(108,92,231,0.07)] dark:hover:border-purple-800/50 transition-all duration-300 flex flex-col overflow-hidden p-3.5">
      
      {/* Featured Thumbnail */}
      <Link href={`/${post.category}/${post.slug}`} className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-purple-50 dark:bg-gray-800 block">
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Card Body */}
      <div className="pt-3 px-1 pb-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h2 className="text-base font-bold text-[#111827] dark:text-white group-hover:text-[#6C5CE7] dark:group-hover:text-[#A78BFA] transition-colors line-clamp-2 leading-snug">
            <Link href={`/${post.category}/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Footer: Category & Read Button */}
        <div className="pt-3.5 mt-4 border-t border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <Link
            href={`/${post.category}`}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] hover:bg-[#DDD6FE] dark:hover:bg-[#6C5CE7]/30 transition-colors"
          >
            {post.categoryLabel || post.category}
          </Link>

          <Link
            href={`/${post.category}/${post.slug}`}
            className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-[#6C5CE7] dark:hover:bg-[#6C5CE7] dark:hover:text-white shadow-sm transition-all duration-200 group/btn"
          >
            <span>Read</span>
            <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>

    </article>
  );
}
