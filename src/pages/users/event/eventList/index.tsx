import { Link } from "react-router-dom";
import "./style.scss";
import { useEffect} from "react";
import Aos from "aos";
import { FaMapMarkerAlt } from "react-icons/fa";
import patnerContent from "../../../data/patnerContent";

const EventList = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

 
  return (
    <div className="ourPatner__container">
      <div className="background__item">
        <h1>Event</h1>
        <div>
          <Link to="/" className="item__link">Home</Link>
          <p>Event List</p>
        </div>
      </div>

      <div className="ourPatner__title">
        <h3>E V E N T &nbsp; L I S T</h3>
      </div>

      <div className="event__listWrapper">
        {patnerContent.map((item, index) => (
          <div className="event__card" key={index} data-aos="fade-up">
            <div className="event__imageSection">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="event__contentSection">
              <h2 className="event__title">{item.title}</h2>
              <div className="event__location">
                <FaMapMarkerAlt className="event__icon" />
                <span>{item.address}</span>
              </div>
              <div className="event__author">
                <img
                  src={item.image || "https://via.placeholder.com/40"}
                  alt={item.name}
                  className="event__avatar"
                />
                <div>
                  <p className="event__authorName">{item.name}</p>
                </div>
              </div>
              <div className="event__footer">
                <button className="event__viewMoreBtn"><Link to={"/eventDetails"} className="eventDetailsP__link">View More</Link></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
