import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  totalItems?: number;
  itemsPerPage?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  totalItems,
  itemsPerPage = 6,
}: PaginationProps) {
  // Hide pagination if there is only 1 page
  if (totalPages <= 1) {
    return null;
  }

  const createPageUrl = (page: number) => {
    if (page <= 1) {
      return baseUrl;
    }
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}page=${page}`;
  };

  // Generate page numbers with ellipses
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Calculate item range summary
  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = totalItems
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : null;

  return (
    <nav
      aria-label="Pagination Navigation"
      className="pt-10 mt-6 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors"
    >
      {/* Item count summary */}
      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium order-2 sm:order-1">
        {totalItems && startItem && endItem ? (
          <>
            Showing <span className="font-semibold text-gray-900 dark:text-white">{startItem}</span> to{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{endItem}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> articles
          </>
        ) : (
          <>
            Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span>
          </>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        {/* Previous Page Button */}
        {hasPrev ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            aria-label="Go to previous page"
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131722] text-gray-700 dark:text-gray-300 hover:border-[#6C5CE7] hover:text-[#6C5CE7] dark:hover:border-[#6C5CE7] dark:hover:text-[#A78BFA] transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-gray-100 dark:border-gray-800/50 bg-gray-50 dark:bg-[#131722]/50 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </span>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, index) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-9 h-9 flex items-center justify-center text-xs text-gray-400 dark:text-gray-600 font-semibold"
                >
                  …
                </span>
              );
            }

            const pageNum = p as number;
            const isCurrent = pageNum === currentPage;

            return isCurrent ? (
              <span
                key={pageNum}
                aria-current="page"
                className="w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold bg-[#6C5CE7] text-white shadow-sm shadow-[#6C5CE7]/30 ring-2 ring-[#6C5CE7]/30"
              >
                {pageNum}
              </span>
            ) : (
              <Link
                key={pageNum}
                href={createPageUrl(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-[#131722] border border-gray-200 dark:border-gray-800 hover:border-[#6C5CE7] hover:text-[#6C5CE7] dark:hover:border-[#6C5CE7] dark:hover:text-[#A78BFA] transition-all shadow-sm"
              >
                {pageNum}
              </Link>
            );
          })}
        </div>

        {/* Next Page Button */}
        {hasNext ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            aria-label="Go to next page"
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#131722] text-gray-700 dark:text-gray-300 hover:border-[#6C5CE7] hover:text-[#6C5CE7] dark:hover:border-[#6C5CE7] dark:hover:text-[#A78BFA] transition-all shadow-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-gray-100 dark:border-gray-800/50 bg-gray-50 dark:bg-[#131722]/50 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-60"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </nav>
  );
}

