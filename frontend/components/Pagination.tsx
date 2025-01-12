import { IoIosArrowBack } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  let pages: (number | string)[] = [];

  if (totalPages > 5) {
    if (currentPage < 4) {
      pages = [1, 2, 3, 4, totalPages];
    } else if (totalPages - currentPage < 3) {
      pages = [
        1,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = [
        1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        totalPages,
      ];
    }
  } else {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  return (
    <div className="flex justify-center mt-5 space-x-2">
      <button
        key="pagination-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 md:px-4 md:py-2 text-xs sm:text-sm md:text-base rounded-lg shadow-sm font-medium transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-teal-100 disabled:opacity-50 disabled:hover:bg-gray-200`}
      >
        <IoIosArrowBack className="text-gray-700" />
      </button>
      {pages.map((page, index) => (
        <button
          key={`${page}-${index}`}
          onClick={() => page !== "..." && onPageChange(page as number)}
          disabled={page === "..." || page === currentPage}
          className={`px-3 py-2 md:px-4 md:py-2 text-xs sm:text-sm md:text-base rounded-lg shadow-sm font-medium transition-all duration-300 ${
            page === currentPage
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-teal-100"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        key="pagination-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 md:px-4 md:py-2 text-xs sm:text-sm md:text-base rounded-lg shadow-sm font-medium transition-all duration-300 bg-gray-200 text-gray-700 hover:bg-teal-100 disabled:opacity-50 disabled:hover:bg-gray-200`}
      >
        <IoIosArrowBack className="rotate-180 text-gray-700" />
      </button>
    </div>
  );
}

export default Pagination;
