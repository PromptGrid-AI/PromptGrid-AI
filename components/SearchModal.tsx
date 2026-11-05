'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Search, X, ArrowRight, BookOpen, Wrench, AlertCircle, Loader2 } from 'lucide-react';
import { Post } from '@/lib/mock-data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export default function SearchModal({ isOpen, onClose, initialQuery = '' }: SearchModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // SSR mount guard for createPortal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync initial query when opened
  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen, initialQuery]);

  // Handle global shortcut Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent('open-search'));
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search fetch
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Filter results by category pill if selected
  const filteredResults =
    selectedCategory === 'all'
      ? results
      : results.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'prompts':
        return <BookOpen className="w-3.5 h-3.5 text-blue-500" />;
      case 'alternatives':
        return <Wrench className="w-3.5 h-3.5 text-green-500" />;
      case 'fixes':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-purple-500" />;
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Floating Close 'X' Button on top-right of page */}
      <button
        onClick={onClose}
        aria-label="Close search"
        title="Close search (Esc)"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[101] p-2.5 rounded-full bg-gray-900/70 hover:bg-gray-900 text-white dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-white/15 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center group"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
      </button>

      {/* Main Modal Card */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#111624] border border-gray-200 dark:border-gray-800/90 rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 transform scale-100 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-gray-100 dark:border-gray-800/80 gap-2">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI system prompts, free tools, runtime error fixes..."
            className="w-full bg-transparent text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
          />

          {loading ? (
            <Loader2 className="w-4 h-4 text-gray-400 animate-spin flex-shrink-0" />
          ) : query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear query text"
              title="Clear text"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}

          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50/80 dark:bg-[#0B0F19]/60 border-b border-gray-100 dark:border-gray-800/80 text-xs overflow-x-auto">
          <span className="text-gray-400 dark:text-gray-500 mr-1 hidden sm:inline">Filter:</span>
          {[
            { id: 'all', label: 'All Results' },
            { id: 'prompts', label: 'AI Prompts' },
            { id: 'alternatives', label: 'Free Alternatives' },
            { id: 'fixes', label: 'Errors & Fixes' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#6C5CE7] text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3 divide-y divide-gray-50 dark:divide-gray-800/40">
          {filteredResults.length > 0 ? (
            filteredResults.map((post) => (
              <Link
                key={post.id}
                href={`/${post.category}/${post.slug}`}
                onClick={onClose}
                className="group flex items-start justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#171C2E] transition-colors"
              >
                <div className="space-y-1 pr-4 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {getCategoryIcon(post.category)}
                      {post.categoryLabel}
                    </span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                      {post.reading_time}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#6C5CE7] dark:group-hover:text-[#A78BFA] transition-colors truncate">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-600 group-hover:text-[#6C5CE7] dark:group-hover:text-[#A78BFA] group-hover:translate-x-0.5 transition-all flex-shrink-0 self-center" />
              </Link>
            ))
          ) : query ? (
            <div className="py-12 text-center">
              <Search className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-sm mx-auto">
                Try searching for keywords like <span className="text-[#6C5CE7] font-semibold">prompts</span>,{' '}
                <span className="text-[#6C5CE7] font-semibold">alternatives</span>,{' '}
                <span className="text-[#6C5CE7] font-semibold">error 429</span>, or{' '}
                <span className="text-[#6C5CE7] font-semibold">metrics</span>.
              </p>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-gray-400 dark:text-gray-500">
              Type to search guides, system prompts, and diagnostics...
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-[#0B0F19] border-t border-gray-100 dark:border-gray-800/80 text-[11px] text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-semibold text-gray-600 dark:text-gray-400">Ctrl</kbd> +{' '}
              <kbd className="font-semibold text-gray-600 dark:text-gray-400">K</kbd> to toggle
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              <kbd className="font-semibold text-gray-600 dark:text-gray-400">ESC</kbd> to close
            </span>
          </div>
          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
            PromptGrid <span className="text-[#6C5CE7]">AI Search</span>
          </span>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
