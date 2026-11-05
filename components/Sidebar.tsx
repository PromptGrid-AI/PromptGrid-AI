import Image from 'next/image';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/supabase';
import SidebarSearchBox from './SidebarSearchBox';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/SocialIcons';

export default async function Sidebar() {
  const allPosts = await getPublishedPosts();
  const recentPosts = allPosts.slice(0, 4);

  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com';
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com';


  return (
    <aside className="space-y-6">

      {/* 1. Search Box (Client Component) */}
      <SidebarSearchBox />

      {/* 2. Author Bio Card */}
      <div className="bg-white dark:bg-[#131722] rounded-2xl p-6 border border-gray-100 dark:border-gray-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-center transition-colors">
        <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden mb-3 ring-2 ring-purple-100 dark:ring-purple-900/30">
          <Image
            src="/images/author-avatar-v2.jpg"
            alt="Author bio"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-sm font-bold text-[#111827] dark:text-white">PromptGrid Editorial</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed px-2">
          Curating production-ready AI system prompts, vetted developer toolchains, and runtime error diagnostics.
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-2.5 mt-4 text-gray-400">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-7 h-7 rounded-full bg-gray-50 dark:bg-[#1C2130] hover:bg-[#EDE9FE] dark:hover:bg-[#6C5CE7]/20 text-gray-500 dark:text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] flex items-center justify-center transition-colors"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-7 h-7 rounded-full bg-gray-50 dark:bg-[#1C2130] hover:bg-[#EDE9FE] dark:hover:bg-[#6C5CE7]/20 text-gray-500 dark:text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] flex items-center justify-center transition-colors"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-7 h-7 rounded-full bg-gray-50 dark:bg-[#1C2130] hover:bg-[#EDE9FE] dark:hover:bg-[#6C5CE7]/20 text-gray-500 dark:text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] flex items-center justify-center transition-colors"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 3. Recent Posts Widget */}
      <div className="bg-white dark:bg-[#131722] rounded-2xl p-5 border border-gray-100 dark:border-gray-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors">
        <h3 className="text-xs font-bold text-[#111827] dark:text-white mb-3.5">
          Recent Posts
        </h3>
        <div className="space-y-3.5">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.category}/${post.slug}`}
              className="group flex items-center gap-3"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-purple-50 dark:bg-gray-800">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[#6C5CE7] dark:group-hover:text-[#A78BFA] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                  {post.created_at}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Sponsored Card */}
      <div className="rounded-2xl p-7 bg-[#F3F4F6] dark:bg-[#131722] border border-gray-200/60 dark:border-gray-800/80 text-center transition-colors">
        <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">Sponsored</h4>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Sponsored card</p>
      </div>

    </aside>
  );
}
