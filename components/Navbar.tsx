'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';
import SearchModal from '@/components/SearchModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleOpenSearch = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setSearchInitialQuery(customEvent.detail?.query || '');
      setSearchOpen(true);
    };

    window.addEventListener('open-search', handleOpenSearch);
    return () => window.removeEventListener('open-search', handleOpenSearch);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'AI Prompts', href: '/prompts' },
    { name: 'Free Alternatives', href: '/alternatives' },
    { name: 'Errors & Fixes', href: '/fixes' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo className="w-9 h-9" />
          <span className="text-xl font-semibold text-[#111827] dark:text-white tracking-tight transition-colors">
            PromptGrid <span className="text-[#6C5CE7]">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full transition-all text-xs font-semibold ${
                  active
                    ? 'bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => {
              setSearchInitialQuery('');
              setSearchOpen(true);
            }}
            aria-label="Search articles" 
            title="Search articles (Ctrl+K)"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors cursor-pointer group"
          >
            <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>

          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />
          
          <button className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium text-xs text-white bg-[#6C5CE7] hover:bg-[#5B4BC4] shadow-sm shadow-purple-300 dark:shadow-none transition-all active:scale-95">
            Subscribe
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0B0F19] border-b border-gray-100 dark:border-gray-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-xs font-semibold ${
                  active
                    ? 'bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA]'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* Interactive Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        initialQuery={searchInitialQuery}
      />
    </header>
  );
}
