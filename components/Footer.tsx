import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import Logo from '@/components/Logo';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/SocialIcons';

export default function Footer() {
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com';
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com';

  return (
    <footer className="mt-20 bg-white dark:bg-[#0B0F19] border-t border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Brand Column (takes 5 of 12 columns for balanced typography) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-semibold text-[#111827] dark:text-white tracking-tight transition-colors">
                PromptGrid <span className="text-[#6C5CE7]">AI</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm transition-colors">
              Your ultimate hub for mastering the power of AI prompts & free tools. Discover vetted system templates, open-source alternatives, and actionable developer guides.
            </p>

            {/* Social & Community Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-50 dark:bg-[#151928] hover:bg-[#EDE9FE] dark:hover:bg-[#6C5CE7]/20 text-gray-500 dark:text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-gray-50 dark:bg-[#151928] hover:bg-[#EDE9FE] dark:hover:bg-[#6C5CE7]/20 text-gray-500 dark:text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] flex items-center justify-center transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-gray-50 dark:bg-[#151928] hover:bg-[#EDE9FE] dark:hover:bg-[#6C5CE7]/20 text-gray-500 dark:text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] flex items-center justify-center transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories Column (2 of 12) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4 transition-colors">
              Categories
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/prompts" className="hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors">
                  AI Prompts
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors">
                  Free Alternatives
                </Link>
              </li>
              <li>
                <Link href="/fixes" className="hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors">
                  Errors & Fixes
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column (2 of 12) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4 transition-colors">
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="/prompts" className="hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors">
                  Prompt Library
                </Link>
              </li>
              <li>
                <Link href="/alternatives" className="hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors">
                  Free LLM Tools
                </Link>
              </li>
              <li>
                <Link href="/fixes" className="hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors">
                  API Diagnostics
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column (3 of 12) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4 transition-colors">
              Legal & Policy
            </h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <span className="text-gray-400 dark:text-gray-600">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-gray-400 dark:text-gray-600">
                  Editorial Guidelines
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4 transition-colors">
          <p>© {new Date().getFullYear()} PromptGrid AI. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <span>Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for the AI generation.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
