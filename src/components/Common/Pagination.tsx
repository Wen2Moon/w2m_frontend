import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Hiển thị tất cả các trang nếu tổng số trang <= 5
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`px-3 py-1 mx-1 ${
              currentPage === i
                ? "bg-orange-500 text-black font-bold"
                : "bg-gray-700 text-white"
            } rounded hover:bg-gray-600`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Hiển thị trang đầu, cuối và các dấu "..."
      if (currentPage > 3) {
        pages.push(
          <button
            key={1}
            className="px-3 py-1 mx-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
        );
        if (currentPage > 4) {
          pages.push(
            <span key="start-dots" className="px-3 py-1 mx-1 text-gray-400">
              ...
            </span>
          );
        }
      }

      // Hiển thị trang hiện tại và 2 trang trước, sau
      for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(totalPages, currentPage + 2);
        i++
      ) {
        pages.push(
          <button
            key={i}
            className={`px-3 py-1 mx-1 ${
              currentPage === i
                ? "bg-orange-500 text-black font-bold"
                : "bg-gray-700 text-white"
            } rounded hover:bg-gray-600`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }

      // Hiển thị các trang cuối
      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          pages.push(
            <span key="end-dots" className="px-3 py-1 mx-1 text-gray-400">
              ...
            </span>
          );
        }
        pages.push(
          <button
            key={totalPages}
            className="px-3 py-1 mx-1 bg-gray-700 text-white rounded hover:bg-gray-600"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="px-3 py-1 mx-1 bg-gray-700 text-white rounded hover:bg-gray-600"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {renderPageNumbers()}
      <button
        className="px-3 py-1 mx-1 bg-gray-700 text-white rounded hover:bg-gray-600"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
