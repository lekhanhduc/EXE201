import festivalBackground from "../../../assets/ServiceGrid/festivalBackground.png"
import grandOpeningBackground from "../../../assets/ServiceGrid/grandOpeningBackground.jpg"
import mediaBackground from "../../../assets/ServiceGrid/mediaBackground.jpg"
import sportBackground from "../../../assets/ServiceGrid/sportBackground.png"
import teamBuildingBackground from "../../../assets/ServiceGrid/teamBuildingBackground.webp"
import weddingBackground from "../../../assets/ServiceGrid/weddingBackground.jpg"
const EventContent = [
  { name: "Festival event" , backgroundImage: `url(${festivalBackground})`},
  { name: "Sport event" , backgroundImage: `url(${sportBackground})`},
  { name: "Ceremonial events", backgroundImage: `url(${grandOpeningBackground})` },
  { name: "Media event", backgroundImage: `url(${mediaBackground})` },
  { name: "Personal event", backgroundImage: `url(${weddingBackground})` },
  { name: "Corporate event", backgroundImage: `url(${teamBuildingBackground})` },
];
export default EventContent;
