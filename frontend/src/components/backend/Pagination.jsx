import React from "react";
import useAdminForm from "../../hooks/useAdminForm";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) => {
  const { form } = useAdminForm();

  const getPageNumbers = () => {
    const pageNumbers = [];
    pageNumbers.push(1);
    const leftSibling = Math.max(2, currentPage - siblingCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount);
    if (leftSibling > 2) pageNumbers.push("...");
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) pageNumbers.push(i);
    }
    if (rightSibling < totalPages - 1) pageNumbers.push("...");
    if (totalPages > 1) pageNumbers.push(totalPages);
    return pageNumbers;
  };

  const isSmallScreen = () => window.innerWidth < 400;

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="pagination-nav">
      <ul className="pagination pagination-sm flex-wrap m-0">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label={form.prev_page}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>

        {!isSmallScreen() &&
          getPageNumbers().map((page, index) => (
            <li
              key={index}
              className={`page-item ${page === currentPage ? "active" : ""} ${
                page === "..." ? "disabled" : ""
              }`}
            >
              <button
                type="button"
                className="page-link"
                onClick={() => page !== "..." && onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ))}

        {isSmallScreen() && (
          <li className="page-item disabled">
            <span className="page-link border-0 bg-transparent">
              {currentPage} / {totalPages}
            </span>
          </li>
        )}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label={form.next_page}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
