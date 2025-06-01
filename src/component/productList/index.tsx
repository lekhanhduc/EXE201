import React from "react";
import "./style.scss";
import ProductData from "../../pages/data/productData";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="event-equipment-list">
      <div className="grid__row">
        {ProductData.map((item, index) => (
          <div className="grid__column-2-4" key={index}>
            <div
              className="event-equipment-item"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/purchase/${item.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/purchase/${item.id}`);
                }
              }}
              style={{ cursor: "pointer" }}
              aria-label={`Xem chi tiết và đặt thuê ${item.name}`}
            >
              <div
                className="event-equipment-item__img"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-label={item.name}
              ></div>
              <h4 className="event-equipment-item__name">{item.name}</h4>

              <div className="event-equipment-item__price">
                <span className="event-equipment-item__deposit-label">Giá cọc:</span>
                <span className="event-equipment-item__deposit-price">{item.depositPrice}</span>
              </div>

              <div className="event-equipment-item__action">
                <span className="event-equipment-item__action-like" role="button" aria-pressed={item.isFavorite}>
                  <i className="fa-regular fa-heart"></i>
                </span>

                <div className="event-equipment-item__action-rating" aria-label={`Đánh giá: ${item.rating} sao`}>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star ${i < item.rating ? "event-equipment-item__star-gold" : ""}`}
                      aria-hidden="true"
                    ></i>
                  ))}
                </div>

                <span className="event-equipment-item__rented-count">{item.sold} lượt thuê</span>
              </div>

              {item.isFavorite && (
                <div className="event-equipment-item__favourite">
                  <i className="fa-solid fa-check" aria-hidden="true"></i>
                  <span>Yêu thích</span>
                </div>
              )}

              {item.discountPercent && (
                <div className="event-equipment-item__sale-off">
                  <span className="event-equipment-item__sale-off-percent">{item.discountPercent}</span>
                  <span className="event-equipment-item__sale-off-label">GIẢM</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
