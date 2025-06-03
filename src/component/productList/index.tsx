import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductDetailResponse } from "../../type/Product";
import axiosInstance from "../../api/axiosInstance";
import "./style.scss";

const fetchProducts = async (
  page: number,
  query: string,
  setProducts: (products: ProductDetailResponse[]) => void,
  setTotalPages: (total: number) => void,
  setError: (error: string | null) => void,
  setIsLoading: (loading: boolean) => void
) => {
  setIsLoading(true);
  try {
    const response = await axiosInstance.get(`/search/products?page=${page}&pageSize=10${query ? `&search=name:${encodeURIComponent(query)}` : ""}`);
    if (response.data.result && response.data.result.data) {
      setProducts(response.data.result.data);
      setTotalPages(response.data.result.totalPages);
    }
  } catch (err: any) {
    setError(`Lỗi: ${err.message}`);
  } finally {
    setIsLoading(false);
  }
};

const LoadingSpinner = () => (
  <div className="product-loading-spinner">
    <div></div>
  </div>
);

// Highlight từ khóa trong chuỗi
const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword) return text;
  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <mark key={i} style={{ backgroundColor: "#fde68a" }}>{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDetailResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState<string>("");

  useEffect(() => {
    fetchProducts(currentPage, submittedQuery, setProducts, setTotalPages, setError, setIsLoading);
  }, [currentPage, submittedQuery]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery.trim());
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="product-error-state">
        <p>{error}</p>
        <button onClick={() => fetchProducts(currentPage, submittedQuery, setProducts, setTotalPages, setError, setIsLoading)}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h1 className="product-list-title">
        Danh Sách Sản Phẩm {submittedQuery && <>cho từ khóa <strong>"{submittedQuery}"</strong></>}
      </h1>

      <form className="product-search-bar" onSubmit={handleSearchSubmit}>
        <div className="product-search-wrapper">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="product-search-input"
          />
          <span className="product-search-icon">
            <svg className="product-search-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
        <button type="submit" className="product-search-button">
          <svg className="product-search-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Tìm kiếm
        </button>
      </form>

      <div className="product-grid">
        {products.map((item) => (
          <div
            key={item.id}
            className="product-card"
            onClick={() => navigate(`/purchase/${item.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(`/purchase/${item.id}`);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Xem chi tiết ${item.name}`}
          >
            <div className="product-card-image">
              <img
                src={item.imageUrl}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
              <span className="product-card-label">{item.categoryName}</span>
              <span className="product-card-stock">Còn hàng</span>
            </div>
            <div className="product-card-content">
              <h3 className="product-card-title">{highlightKeyword(item.name, submittedQuery)}</h3>
              <p className="product-card-description">{item.description}</p>
              <div className="product-card-details">
                <p className="product-card-price">
                  Giá: {item.price.toLocaleString("vi-VN")} VNĐ
                </p>
                <p className="product-card-stock-info">
                  Số lượng còn: {item.stockQuantity}
                </p>
              </div>
              <button
                className="product-card-action"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/purchase/${item.id}`);
                }}
              >
                Đặt thuê ngay
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="product-pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="product-pagination-button"
        >
          Trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`product-pagination-button ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="product-pagination-button"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default ProductList;
