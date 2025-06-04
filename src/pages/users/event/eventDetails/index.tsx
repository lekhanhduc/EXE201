import { useState } from "react";
import patnerContent from "../../../data/patnerContent";
import "./style.scss";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
interface PartnerItem {
  id: number;
  name: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  image: string | string[];
  video?: string;
}

function EventDetails() {
  const [selected, setSelected] = useState(patnerContent[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSelect = (item: PartnerItem) => {
    setSelected(item);
    setCurrentImageIndex(0);
  };

  const images = selected.image || (selected.image ? [selected.image] : []);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className="main-container">
      <div className="eventBackground__item">
        <h1>{selected.name}</h1>
        <div>
          <Link to="/" className="item__link">
            Home
          </Link>
          <p>{selected.name}</p>
        </div>
      </div>
      <div className="left">
        {selected.video ? (
          <video
            className="main-video"
            controls
            autoPlay
            muted
            key={selected.video}
          >
            <source src={selected.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="image-slider">
            <img
              src={currentImage}
              alt={selected.name}
              className="patner_image"
            />
            {images.length > 1 && (
              <div className="slider-controls">
                <div className="next-icon" onClick={handleNext}>
                  <FaArrowRight />
                </div>
                <div className="prev-icon" onClick={handlePrev}>
                  <FaArrowLeft />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="right">
        <div className="ticket">
          <img src={images[0]} alt="avatar" className="avatar" />
          <h3>{selected.name}</h3>
          <p>{selected.title}</p>
          <p>📞 {selected.phone}</p>
          <p>📧 {selected.email}</p>
          <button>
            <Link
              to={"/decideEvent"}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Booking Now
            </Link>
          </button>
        </div>

        <div className="location">
          <h4>Event Location</h4>
          <p>📍 {selected.address}</p>
        </div>

        <div className="selector">
          {patnerContent.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              className={selected.id === item.id ? "active" : ""}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
