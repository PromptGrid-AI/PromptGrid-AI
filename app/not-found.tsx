import React from 'react';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] text-xs font-bold uppercase tracking-wider">
          Error 404
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[#111827] dark:text-white tracking-tight transition-colors">
          Page Not Found
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
          The article, prompt, or tool you are looking for does not exist or may have been relocated.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6C5CE7] hover:bg-[#5B4BC4] text-white text-xs font-semibold shadow-md shadow-purple-200 dark:shadow-none transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/prompts"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-[#131722] hover:bg-gray-50 dark:hover:bg-[#1C2130] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold transition-all shadow-sm"
          >
            <Search className="w-4 h-4" />
            Explore Prompts
          </Link>
        </div>

      </div>
    </div>
  );
}
