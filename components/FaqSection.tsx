import React from 'react';
import { HelpCircle } from 'lucide-react';
import { FaqItem } from '@/lib/mock-data';

interface FaqSectionProps {
  faqs?: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-28 my-8 rounded-2xl bg-white dark:bg-[#131722] border border-gray-100 dark:border-gray-800/80 p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-colors"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <HelpCircle className="w-5 h-5 text-[#6C5CE7] dark:text-[#A78BFA]" />
        <h2
          id="faq-heading"
          className="text-lg sm:text-xl font-bold text-[#111827] dark:text-white tracking-tight"
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800/80">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group py-3.5 first:pt-0 last:pb-0"
            open={idx === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm sm:text-base font-semibold text-[#111827] dark:text-white hover:text-[#6C5CE7] dark:hover:text-[#A78BFA] transition-colors">
              <span>{faq.question}</span>
              <span className="text-gray-400 group-open:rotate-45 transition-transform text-lg leading-none">
                +
              </span>
            </summary>
            <p className="mt-2.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
