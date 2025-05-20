import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.scss";

const categories = ["All", "BUSINESS", "BRANDING", "SPORT", "RENTING", "MORE"];

const Categories: React.FC = () => {
  const [active, setActive] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="categories__container" >
      <div className="categories__tittle" data-aos="fade-up">
        <h1>CATEGORIES</h1>
        <div className="categories__list">
          {categories.map((item) => (
            <button
              key={item}
              className={`categories__item ${active === item ? "active" : ""}`}
              onClick={() => setActive(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
