import React from "react";
import "./stye.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const goPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="home-filter__page">
      <span className="home-filter__page-num">
        <span className="home-filter__page-current">{currentPage}</span>/{totalPages}
      </span>
      <div className="home-filter__page-controls">
        <button
          className={`home-filter__page-btn ${currentPage === 1 ? "home-filter__page-btn--disable" : ""}`}
          onClick={goPrevPage}
          disabled={currentPage === 1}
          aria-label="Trang trước"
          type="button"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="home-filter__page-icon" />
        </button>
        <button
          className="home-filter__page-btn"
          onClick={goNextPage}
          disabled={currentPage === totalPages}
          aria-label="Trang sau"
          type="button"
        >
          <FontAwesomeIcon icon={faAngleRight} className="home-filter__page-icon" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
