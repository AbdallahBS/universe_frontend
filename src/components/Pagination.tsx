import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3;
    const halfVisible = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= halfVisible + 1) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - halfVisible) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - halfVisible + 1; i <= currentPage + halfVisible - 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 py-8 animate-fade-in-up">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="group inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 ${
                isActive
                  ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                  : 'border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="group inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default Pagination;
