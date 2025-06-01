import { useState } from "react";
import patnerContent from "../../../data/patnerContent";
import "./style.scss";
import { Link } from "react-router-dom";
function EventDetails() {
  const [selected, setSelected] = useState(patnerContent[0]);

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
        {/* <img src={selected.video} alt="presentation" className="main-image" /> */}
        <video className="main-video" controls autoPlay muted>
          <source src={selected.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="right">
        <div className="ticket">
          <img src={selected.image} alt="avatar" className="avatar" />
          <h3>{selected.name}</h3>
          <p>{selected.title}</p>
          <p>📞 {selected.phone}</p>
          <p>📧 {selected.email}</p>
          <button>Booking Now</button>
        </div>

        <div className="location">
          <h4>Event Location</h4>
          <p>📍 {selected.address}</p>
        </div>

        <div className="selector">
          {patnerContent.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
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
