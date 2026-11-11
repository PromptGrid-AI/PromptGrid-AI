import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Post } from '@/lib/mock-data';

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-guides-heading"
      className="my-10 pt-8 border-t border-gray-100 dark:border-gray-800/80 transition-colors"
    >
      <div className="flex items-center gap-2 mb-4">
        <Compass className="w-4 h-4 text-[#6C5CE7] dark:text-[#A78BFA]" />
        <h2
          id="related-guides-heading"
          className="text-base sm:text-lg font-bold text-[#111827] dark:text-white"
        >
          Related Guides & Next Steps
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/${post.category}/${post.slug}`}
            className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131722] border border-gray-100 dark:border-gray-800/80 hover:border-[#6C5CE7] dark:hover:border-[#6C5CE7] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all"
          >
            <div>
              <span className="inline-block text-[11px] font-semibold text-[#6C5CE7] dark:text-[#A78BFA] bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 px-2.5 py-0.5 rounded-full mb-2">
                {post.categoryLabel}
              </span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#6C5CE7] dark:group-hover:text-[#A78BFA] transition-colors">
                {post.title}
              </h3>
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#6C5CE7] dark:text-[#A78BFA]">
              <span>Read guide</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
