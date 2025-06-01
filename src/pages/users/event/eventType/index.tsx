import { useState } from "react";
import "./style.scss";
import EventContent from "../../../data/eventContent";
import { Link } from "react-router-dom";

const EventType = () => {
  const [selectedEvent, setSelectedEvent] = useState(EventContent[0]);

  return (
    <div className="event__wrapper">
      <div className="event__buttonGroup">
        {EventContent.map((event, index) => (
          <button
            key={index}
            onClick={() => setSelectedEvent(event)}
            className={`event__button ${
              selectedEvent.name === event.name ? "active" : ""
            }`}
          >
            {event.name}
          </button>
        ))}
      </div>
      <div
        className={"event__banner"}
        style={{ backgroundImage: selectedEvent.backgroundImage }}
      >
        <h1 className="event__title">{selectedEvent.name}</h1>
        <div>
          <Link to={"/"} className="item__link">
            Home
          </Link>
          <p>{selectedEvent.name}</p>
        </div>
      </div>
    </div>
  );
};

export default EventType;
