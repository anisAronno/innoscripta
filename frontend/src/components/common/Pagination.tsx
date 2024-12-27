import React from 'react';
import { PaginationProps } from '../../types/contact.type';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {/* First page */}
        <button
          onClick={() => onPageChange(1)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            currentPage === 1
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          1
        </button>

        {/* Ellipsis for skipped pages at start */}
        {currentPage > 3 && (
          <span className="px-2 py-2 text-gray-500">...</span>
        )}

        {/* Pages around current page */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page !== 1 &&
              page !== totalPages &&
              page >= currentPage - 1 &&
              page <= currentPage + 1
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}

        {/* Ellipsis for skipped pages at end */}
        {currentPage < totalPages - 2 && (
          <span className="px-2 py-2 text-gray-500">...</span>
        )}

        {/* Last page */}
        {totalPages > 1 && (
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {totalPages}
          </button>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
