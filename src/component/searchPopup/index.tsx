import { useState, type ChangeEvent } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
interface SearchPopupProps {
  onClose: () => void;
}
const SearchPopup: React.FC<SearchPopupProps> = ({ onClose }) => {
  const [isSearch, setIsSearch] = useState("");
  const handleSearch = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsSearch(e.target.value);
  };
  return (
    <div className="searchPopup__overlay" onClick={onClose}>
      <div
        className="searchPopup__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="searchPopup__input">
          <input
            type="text"
            placeholder="Search..."
            value={isSearch}
            onChange={handleSearch}
            name="search"
            className="formInpumt__Search-popup"
          />
          <button>SEARCH</button>
        </div>
        <div className="search-popup__keywords">
          <h3>Recent Search Keywords</h3>
          <div className="search-popup__tags">
            {["Festival", "Sport", "Ceremonial", "Media", "Personal"].map(
              (tag) => (
                <button key={tag} className="search-popup__tag">
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <button className="searchPopup__close" onClick={onClose}>
        <FontAwesomeIcon
          icon={faXmark}
          style={{
            cursor: "pointer",
            padding: "0 5px",
          }}
        />
      </button>
    </div>
  );
};

export default SearchPopup;
