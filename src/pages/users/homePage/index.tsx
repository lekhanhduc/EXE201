import "./style.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import background1 from "../../../assets/eventBackgorund.jpg";
import background2 from "../../../assets/eventBackgorund2.jpg";
import Categories from "../../../component/categories";
import ServiceGrid from "../../../component/serviceGrid";
import { Link } from "react-router-dom";

const slides = [
  {
    image: background1,
    date: "January 22, 2025",
    title: "Providing quality & reputation 2025",
    info: [ "10 Patner", "FPTU, DANANG"],
  },
  {
    image: background2,
    date: "March 12, 2025",
    title: "Provide the best event services",
    info: [ "10 Patner", "FPTI, TPHCM"],
  },
];

const HomePage = () => {
  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: false });
    window.scrollTo(0, 0);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    Aos.refresh();
  }, [currentIndex]);

  const handleNext = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setIsSliding(false);
    }, 1);
  };
  const handlePrev = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setIsSliding(false);
    }, 1);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="homePage_container">
      <div
        key={currentIndex}
        className={`slide-item ${isSliding ? "fade-out" : ""}`}
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        <div className="over-lay"></div>
        <div className="item-content">
          <p className="date" data-aos="fade-up">
            {currentSlide.date}
          </p>
          <h1 className="title" data-aos="fade-up">
            {currentSlide.title}
          </h1>
          <div className="info" data-aos="fade-up">
            {currentSlide.info.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
          <div data-aos="fade-up">
            <button className="book-btn"><Link to={"/decideEvent"} className="eventList_link">Book Now</Link></button>
          </div>
          <div className="next-icon" onClick={handleNext}>
            <FaArrowRight />
          </div>
          <div className="prev-icon" onClick={handlePrev}>
            <FaArrowLeft />
          </div>
        </div>
      </div>
      <Categories/>
      <ServiceGrid/>
    </div>
  );
};

export default HomePage;
