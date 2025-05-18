import { Link } from "react-router-dom";
import "./style.scss";
import { useState, type ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareDribbble,
  faSquareFacebook,
  faSquarePinterest,
  faSquareTwitter,
} from "@fortawesome/free-brands-svg-icons";
import FormInput from "../../../component/formInput";

const ContactUS = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data: ", formData);
  };

  return (
    <div className="contactUS_container">
      <div className="background__item">
        <h1>Contact Us</h1>
        <div>
          <Link to="/" className="item__link">
            Home
          </Link>
          <p>Contact</p>
        </div>
      </div>
      <div className="contact__contact">
        <div className="contact__form">
          <h1>Get in Touch</h1>
          <div className="contact__content">
            <div className="form__row">
              <div className="form__column">
                <FormInput
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  className="form__input"
                />
                <FormInput
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  className="form__input"
                />
              </div>
              <div className="form__column">
                <FormInput
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                  className="form__input"
                />
                <FormInput
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  name="subject"
                  className="form__input"
                />
              </div>
            </div>
            <FormInput
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              name="message"
              className="message__input"
              type="textarea"
            />
            <button className="submit__btn" onClick={handleSubmit}>
              Submit Now
            </button>
          </div>
        </div>

        <div className="contact__info">
          <h1>Contact Info</h1>
          <div className="info__item">
            <div className="icon__wrapper">
              <span className="location__icon">📍</span>
            </div>
            <div>
              <h3>Da Nang City</h3>
              <p>FPT, Ngu Hanh Son, Da Nang</p>
            </div>
          </div>
          <div className="info__item">
            <div className="icon__wrapper">
              <span className="phone__icon">📞</span>
            </div>
            <div>
              <h3>Call Us</h3>
              <p>+84-925-767</p>
            </div>
          </div>
          <div className="info__item">
            <div className="icon__wrapper">
              <span className="email__icon">✉️</span>
            </div>
            <div>
              <h3>Mail Us</h3>
              <p>support@example.com</p>
            </div>
          </div>

          <div className="footer_socialIcon">
            <a href="#">
              <FontAwesomeIcon className="fa" icon={faSquareFacebook} size="2x" />
            </a>
            <a href="#">
              <FontAwesomeIcon className="fa" icon={faSquareTwitter} size="2x" />
            </a>
            <a href="#">
              <FontAwesomeIcon className="fa" icon={faSquarePinterest} size="2x" />
            </a>
            <a href="#">
              <FontAwesomeIcon className="fa" icon={faSquareDribbble} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;