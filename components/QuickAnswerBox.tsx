'use client';

import React from 'react';

interface QuickAnswerBoxProps {
  summary: string;
  takeaways?: string[];
}

export default function QuickAnswerBox({ summary, takeaways = [] }: QuickAnswerBoxProps) {
  return (
    <div className="my-8 rounded-2xl bg-[#FAF9FF] dark:bg-[#131726] border border-[#DDD6FE] dark:border-purple-900/40 p-6 sm:p-7 shadow-[0_2px_8px_rgba(108,92,231,0.04)] dark:shadow-none transition-colors">
      
      {/* Box Header */}
      <h3 className="text-base font-bold text-[#111827] dark:text-white mb-3 transition-colors">
        Quick Answer
      </h3>

      {/* Main Snippet Summary */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-normal transition-colors">
        {summary}
      </p>

      {/* Bullet Key Takeaways */}
      {takeaways.length > 0 && (
        <ul className="mt-4 space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
          {takeaways.map((takeaway, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="text-gray-800 dark:text-gray-200">{takeaway}</span>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
