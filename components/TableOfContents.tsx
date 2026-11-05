'use client';

import React, { useState, useEffect } from 'react';
import { ListFilter, Share2, Globe, Link as LinkIcon, Check } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 130;
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(item.id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 90;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveId(id);
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-28 space-y-6">
      
      {/* Table of Contents Box */}
      <div className="bg-white dark:bg-[#131722] rounded-2xl p-5 border border-gray-100 dark:border-gray-800/80 shadow-sm transition-colors">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white font-bold text-sm">
          <ListFilter className="w-4 h-4 text-[#6C5CE7] dark:text-[#A78BFA]" />
          <span>Table of Contents</span>
        </div>

        <nav className="space-y-1.5">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block text-xs py-1.5 px-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? 'bg-purple-50 dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] font-semibold border-l-2 border-[#6C5CE7]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {item.text}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Social Share Buttons */}
      <div className="bg-white dark:bg-[#131722] rounded-2xl p-5 border border-gray-100 dark:border-gray-800/80 shadow-sm transition-colors">
        <span className="block text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">
          Share Article
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-[#1C2130] hover:bg-purple-50 dark:hover:bg-[#6C5CE7]/20 hover:text-purple-600 dark:hover:text-[#A78BFA] text-gray-600 dark:text-gray-400 flex items-center justify-center transition-colors"
            title="Share Article"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <a
            href="#"
            className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-[#1C2130] hover:bg-purple-50 dark:hover:bg-[#6C5CE7]/20 hover:text-purple-600 dark:hover:text-[#A78BFA] text-gray-600 dark:text-gray-400 flex items-center justify-center transition-colors"
            title="Browse Network"
          >
            <Globe className="w-4 h-4" />
          </a>
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-[#1C2130] hover:bg-purple-50 dark:hover:bg-[#6C5CE7]/20 hover:text-purple-600 dark:hover:text-[#A78BFA] text-gray-600 dark:text-gray-400 flex items-center justify-center transition-colors relative"
            title="Copy Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <LinkIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

    </div>
  );
}
