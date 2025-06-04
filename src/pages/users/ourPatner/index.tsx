import { Link } from "react-router-dom";
import "./style.scss";
import { useEffect } from "react";
import Aos from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import patnerContent from "../../data/patnerContent";

const OurPatner = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="ourPatner__container">
      <div className="background__item1">
        <h1>Our Partner</h1>
        <div>
          <Link to="/" className="item__link">
            Home
          </Link>
          <p>Our Partner</p>
        </div>
      </div>

      <div className="ourPatner__title">
        <h3>O U R P A R T N E R</h3>
        <h2>Quality & Reputation</h2>
      </div>

      <div className="partner-grid">
        {patnerContent.map((partner, index) => (
          <div key={index} className="partner-card" data-aos="fade-up">
            <div className="partner-avatar">
              <img src={partner.image[0]} alt={partner.name} />
            </div>
            <div className="partner-header">
              <h3>{partner.name}</h3>
              <p>{partner.address}</p>
            </div>
            <div className="partner-social">
              {partner.socialIcon.map((item, idx) => (
                <span key={idx}>
                  <FontAwesomeIcon icon={item.icon} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPatner;
