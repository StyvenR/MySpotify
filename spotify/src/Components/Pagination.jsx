import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = (total, max, current) => {
    const half = Math.floor(max / 2);
    let to = max;

    if (current + half >= total) {
      to = total;
    } else if (current > half) {
      to = current + half;
    }

    let from = Math.max(to - max, 0);

    return Array.from({ length: Math.min(total, max) }, (_, i) => i + 1 + from);
  };

  const maxPagesVisible = 5;
  const pages = pageNumbers(totalPages, maxPagesVisible, currentPage);

  return (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(1)}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === 1}
      >
        Start
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded ${
            currentPage === number
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        disabled={currentPage === totalPages}
      >
        End
      </button>
    </div>
  );
}

export default Pagination;