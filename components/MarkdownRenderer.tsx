'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

import { slugifyHeading } from '@/lib/toc';

function getNodeText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(getNodeText).join('');
  if (React.isValidElement(children) && children.props && (children.props as { children?: React.ReactNode }).children) {
    return getNodeText((children.props as { children?: React.ReactNode }).children);
  }
  return '';
}

interface MarkdownRendererProps {
  content: string;
}

// Helper to remove accidental leading spaces from template literals (prevents false code blocks)
function cleanMarkdown(raw: string): string {
  if (!raw) return '';
  const lines = raw.split('\n');
  const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
  if (nonEmptyLines.length === 0) return raw.trim();

  // Find minimum leading whitespace
  const minIndent = Math.min(
    ...nonEmptyLines.map((l) => {
      const match = l.match(/^(\s*)/);
      return match ? match[1].length : 0;
    })
  );

  if (minIndent > 0) {
    return lines.map((l) => (l.length >= minIndent ? l.slice(minIndent) : l)).join('\n').trim();
  }
  return raw.trim();
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const sanitizedContent = cleanMarkdown(content);

  return (
    <div className="prose prose-purple dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-sans space-y-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h2: ({ node, children, ...props }) => {
            const text = getNodeText(children);
            const id = slugifyHeading(text);
            return (
              <h2
                id={id}
                className="scroll-mt-28 text-xl sm:text-2xl font-bold text-[#111827] dark:text-white mt-8 mb-3 pt-2 tracking-tight transition-colors"
                {...props}
              >
                {children}
              </h2>
            );
          },
          h3: ({ node, children, ...props }) => {
            const text = getNodeText(children);
            const id = slugifyHeading(text);
            return (
              <h3
                id={id}
                className="scroll-mt-28 text-lg sm:text-xl font-bold text-[#111827] dark:text-white mt-6 mb-2 tracking-tight transition-colors"
                {...props}
              >
                {children}
              </h3>
            );
          },
          p: ({ node, ...props }) => (
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed my-3" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 my-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 my-4" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-gray-700 dark:text-gray-300" {...props} />
          ),
          code: ({ node, className, children, ...props }) => {
            const codeString = String(children);
            const isMultiLine = codeString.includes('\n');
            const hasLang = Boolean(className);

            if (!hasLang && !isMultiLine) {
              return (
                <code className="px-1.5 py-0.5 rounded-md bg-[#EDE9FE] dark:bg-[#6C5CE7]/20 text-[#6C5CE7] dark:text-[#A78BFA] font-mono text-xs font-semibold" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="p-4 rounded-xl bg-gray-900 dark:bg-[#07090F] text-gray-100 font-mono text-xs overflow-x-auto my-4 border border-gray-800">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-[#6C5CE7] bg-[#FAF9FF] dark:bg-[#131726] p-4 rounded-r-xl italic text-gray-700 dark:text-gray-300 my-4" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-gray-100 dark:border-gray-800">
              <table className="w-full text-left border-collapse text-xs sm:text-sm" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border-b border-gray-200 dark:border-gray-800 bg-[#FAF9FF] dark:bg-[#131726] p-3 font-bold text-gray-900 dark:text-white" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border-b border-gray-100 dark:border-gray-800/80 p-3 text-gray-700 dark:text-gray-300" {...props} />
          ),
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
}
