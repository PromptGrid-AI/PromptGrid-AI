'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SidebarSearchBox() {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-search', { detail: { query } }));
    }
  };

  return (
    <div className="bg-white dark:bg-[#131722] rounded-2xl p-4 border border-gray-100 dark:border-gray-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          placeholder="Search guides & prompts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-[#6C5CE7] transition-all"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-[#6C5CE7] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
