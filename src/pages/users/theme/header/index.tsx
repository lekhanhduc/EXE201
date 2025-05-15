import "./style.scss"
import HeaderContent from "../../../data/headerContent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <header className="header_container">
      <div className="nav_header-logo">

      </div>
      <div className="nav_header-content">
        <nav className="nav_header-item">
          <ul>
            {HeaderContent.map((item, index) => (
              <li key={index} className="nav_header-list">
                <a
                  href={item.path}
                  className="nav_header-link"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{
              color: "#fff",
              width: "20px",
              height: "20px",
              cursor: "pointer",
              padding: "0 10px" 
            }}
            />
            <div className="nav_header-button">
              <button>Login</button>
            </div>
          </ul>
        </nav>


      </div>
    </header>
  )
}

export default Header
