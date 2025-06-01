import React, { useEffect } from "react";
import "./style.scss";
import festivalBackground from "../../assets/ServiceGrid/festivalBackground.png";
import mediaBackground from "../../assets/ServiceGrid/mediaBackground.jpg";
import sportBackground from "../../assets/ServiceGrid/sportBackground.png";
import weddingBackground from "../../assets/ServiceGrid/weddingBackground.jpg";
import grandOpeningBackground from "../../assets/ServiceGrid/grandOpeningBackground.jpg";
import teamBuildingBackground from "../../assets/ServiceGrid/teamBuildingBackground.webp";
import Aos from "aos";
import { Link } from "react-router-dom";
const services = [
  {
    name: "Festival",
    path: "/eventType",
    img: festivalBackground,
  },
  {
    name: "Sport",
    path: "/eventType",
    img: sportBackground,
  },
  {
    name: "Ceremonial Events",
    path: "/eventType",
    img: grandOpeningBackground,
  },
  {
    name: "Media Event",
    path: "/eventType",
    img: mediaBackground,
  },
  {
    name: "Personal Events",
    path: "/eventType",
    img: weddingBackground,
  },
  {
    name: "Corporate Events",
    path: "/eventType",
    img: teamBuildingBackground,
  },
];

const ServiceGrid: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);
  return (
    <div className="service-grid">
      {services.map((item, index) => (
        <div className="service-card" key={index}>
          <Link to={item.path}>
            <img src={item.img} alt="" data-aos="fade-up" />
            <div className="service-card__label">{item.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ServiceGrid;
