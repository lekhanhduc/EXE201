import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const categoryNames = ["Thiết bị điện tử", "Trang phục", "Âm thanh ánh sáng"];

const CategorySidebar: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categoryNames[0]);

  return (
    <div className="grid__column-2">
      <nav className="category">
        <h3 className="category__heading">
          <FontAwesomeIcon icon={faList} className="category__heading-icon" />
          Danh mục
        </h3>
        <ul className="category-list">
          {categoryNames.map((name, index) => (
            <li
              key={index}
              className={`category-item ${activeCategory === name ? "category-item--active" : ""}`}
              onClick={() => setActiveCategory(name)}
            >
              <a href="#" className="category-list-link">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CategorySidebar;
