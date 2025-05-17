import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.scss";

const AboutUS = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="aboutUS__container">
      <div className="background__item">
        <h1>About Us</h1>
        <div>
          <Link to={"/"} className="item__link">
            Home
          </Link>
          <p>About Us</p>
        </div>
      </div>

      <div className="about-event">
        <div className="about-event__content" data-aos="fade-right">
          <p className="section-label">ABOUT US</p>
          <h1 className="title">Welcome to the event service platform.</h1>
          <p className="description">
            Join us to discover cutting-edge technology, quality products and
            the best fit for your event.
          </p>

          <ul className="features">
            <li>🎤 Variety of quality event tools</li>
            <li>🤝 Interactive networking opportunities</li>
            <li>🚀 Showcase your startup or product</li>
            <li>🌍 Save time and experience efficiency</li>
          </ul>

          <button className="register-btn"><Link to={"/register"} className="register-text">Register Now</Link></button>
        </div>

        <div className="about-event__image" data-aos="fade-left" />
      </div>

      <div className="background__item2">
        <p>WE ARE THE LEADING EVENT SERVICES COMPANY</p>
        <h1>WE ARE AT THE FOREFRONT<br/> 
          OF EVENT SERVICE PROVISION!</h1>
        <button><Link to={"/contactUs"} className="button__contact">Contact Us</Link></button>
      </div>
    </div>
  );
};

export default AboutUS;
