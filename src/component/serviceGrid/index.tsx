import React, { useEffect } from "react";
import "./style.scss";
import festivalBackground from "../../assets/ServiceGrid/festivalBackground.png";
import mediaBackground from "../../assets/ServiceGrid/mediaBackground.jpg";
import sportBackground from "../../assets/ServiceGrid/sportBackground.png";
import weddingBackground from "../../assets/ServiceGrid/weddingBackground.jpg";
import grandOpeningBackground from "../../assets/ServiceGrid/grandOpeningBackground.jpg";
import teamBuildingBackground from "../../assets/ServiceGrid/teamBuildingBackground.webp";
import Aos from "aos";
const services = [
  {
    name: "Festival",
    img: festivalBackground,
  },
  {
    name: "Sport",
    img: sportBackground,
  },
  {
    name: "Ceremonial Events",
    img: grandOpeningBackground,
  },
  {
    name: "Media Event",
    img: mediaBackground,
  },
  {
    name: "Personal Events",
    img: weddingBackground,
  },
  {
    name: "Corporate Events",
    img: teamBuildingBackground,
  },
];

const ServiceGrid: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);
  return (
    <div className="service-grid" >
      {services.map((item, index) => (
        <div className="service-card" key={index} >
          <img src={item.img} alt="" data-aos="fade-up"/>
          <div className="service-card__label">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default ServiceGrid;
