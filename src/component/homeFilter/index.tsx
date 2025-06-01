import React, { useState } from "react";
import Pagination from "../pagination";
import "./style.scss"

type SortType = "popular" | "newest" | "bestSeller";
type PriceOrder = "asc" | "desc" | null;

const HomeFilter: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const [priceOrder, setPriceOrder] = useState<PriceOrder>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 14;
  const [showPriceList, setShowPriceList] = useState<boolean>(false);

  const handleSortClick = (type: SortType) => {
    setSortBy(type);
  };

  const handlePriceSelect = (order: PriceOrder) => {
    setPriceOrder(order);
    setShowPriceList(false);
  };

  return (
    <div className="home-filter">
      <span className="home-filter__label">Sắp xếp theo</span>

      <button
        className={`btn ${sortBy === "popular" ? "btn--primary" : ""}`}
        onClick={() => handleSortClick("popular")}
        type="button"
      >
        Phổ biến
      </button>

      <button
        className={`btn ${sortBy === "newest" ? "btn--primary" : ""}`}
        onClick={() => handleSortClick("newest")}
        type="button"
      >
        Mới nhất
      </button>

      <button
        className={`btn ${sortBy === "bestSeller" ? "btn--primary" : ""}`}
        onClick={() => handleSortClick("bestSeller")}
        type="button"
      >
        Bán chạy
      </button>

      <div
        className="select-input select-input__has-input"
        onClick={() => setShowPriceList(!showPriceList)}
        style={{ position: "relative", cursor: "pointer", userSelect: "none" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setShowPriceList(!showPriceList);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={showPriceList}
      >
        <span className="select-input__label">Giá</span>
        <i className="fas fa-angle-down"></i>

        {showPriceList && (
          <ul
            className="select-input__list"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              listStyle: "none",
              margin: 0,
              padding: 0,
              width: "150px",
              zIndex: 1000,
            }}
            role="listbox"
            tabIndex={-1}
          >
            <li
              className="select-input__item"
              onClick={() => handlePriceSelect("asc")}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: priceOrder === "asc" ? "#eee" : "transparent",
              }}
              role="option"
              aria-selected={priceOrder === "asc"}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handlePriceSelect("asc");
                }
              }}
            >
              Giá: Thấp đến Cao
            </li>
            <li
              className="select-input__item"
              onClick={() => handlePriceSelect("desc")}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: priceOrder === "desc" ? "#eee" : "transparent",
              }}
              role="option"
              aria-selected={priceOrder === "desc"}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handlePriceSelect("desc");
                }
              }}
            >
              Giá: Cao đến Thấp
            </li>
          </ul>
        )}
      </div>

      {/* Thay thế phần phân trang bằng component Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default HomeFilter;
