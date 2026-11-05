'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface CopyPromptBoxProps {
  promptText: string;
}

export default function CopyPromptBox({ promptText }: CopyPromptBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-8 rounded-2xl bg-[#FAF9FF] dark:bg-[#131726] border border-[#DDD6FE] dark:border-purple-900/40 p-5 shadow-[0_2px_8px_rgba(108,92,231,0.04)] dark:shadow-none transition-colors">
      
      <h4 className="text-sm font-bold text-[#111827] dark:text-white mb-3 transition-colors">
        Copy Prompt Box
      </h4>

      {/* Code Text Area */}
      <div className="p-4 bg-white dark:bg-[#0B0F19] rounded-xl border border-gray-200/80 dark:border-gray-800 font-mono text-xs text-gray-800 dark:text-gray-200 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all transition-colors">
        {promptText}
      </div>

      {/* Full Width Purple Button - Exactly matching reference */}
      <div className="mt-4">
        <button
          onClick={handleCopy}
          className={`w-full py-3.5 rounded-xl font-semibold text-xs tracking-wide transition-all active:scale-[0.99] shadow-sm ${
            copied
              ? 'bg-emerald-600 text-white'
              : 'bg-[#6C5CE7] hover:bg-[#5B4BC4] text-white shadow-purple-200/50 dark:shadow-none hover:shadow-md'
          }`}
        >
          {copied ? (
            <span className="inline-flex items-center gap-1.5 justify-center">
              <Check className="w-4 h-4" /> Prompt Copied to Clipboard!
            </span>
          ) : (
            'Copy Prompt'
          )}
        </button>
      </div>

    </div>
  );
}
