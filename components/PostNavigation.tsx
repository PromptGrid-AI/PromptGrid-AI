import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Post } from '@/lib/mock-data';

interface PostNavigationProps {
  prev: Post | null;
  next: Post | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Post Navigation"
      className="my-10 pt-8 border-t border-gray-100 dark:border-gray-800/80 transition-colors"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Article */}
        {prev ? (
          <Link
            href={`/${prev.category}/${prev.slug}`}
            className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131722] border border-gray-100 dark:border-gray-800/80 hover:border-[#6C5CE7] dark:hover:border-[#6C5CE7] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all sm:col-start-1"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-[#6C5CE7] dark:group-hover:text-[#A78BFA] transition-colors mb-2">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Previous Article</span>
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#6C5CE7] dark:group-hover:text-[#A78BFA] transition-colors">
              {prev.title}
            </h4>
            <div className="mt-3">
              <span className="inline-block text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#1C2130] px-2.5 py-0.5 rounded-full">
                {prev.categoryLabel}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Next Article */}
        {next ? (
          <Link
            href={`/${next.category}/${next.slug}`}
            className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131722] border border-gray-100 dark:border-gray-800/80 hover:border-[#6C5CE7] dark:hover:border-[#6C5CE7] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all sm:col-start-2 text-left sm:text-right"
          >
            <div className="flex items-center sm:justify-end gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-[#6C5CE7] dark:group-hover:text-[#A78BFA] transition-colors mb-2">
              <span>Next Article</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#6C5CE7] dark:group-hover:text-[#A78BFA] transition-colors">
              {next.title}
            </h4>
            <div className="mt-3 sm:text-right">
              <span className="inline-block text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#1C2130] px-2.5 py-0.5 rounded-full">
                {next.categoryLabel}
              </span>
            </div>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

