import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchPopup from "../../../../component/searchPopup";
import HeaderContent from "../../../data/headerContent";
import logo2 from "../../../../assets/logo.png";
import Logout from "../../../authentication/logout";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập

  // Giả lập kiểm tra đăng nhập (dữ liệu giả)
  const handleLogin = () => {

  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    setIsLoggedIn(false); // Đăng xuất
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(()=> {
    const token = localStorage.getItem("accessToken");
    if(token){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  })

  return (
    <header className="header_container">
      <div className="nav_header-logo">
        <img src={logo2} alt="" />
        <h3>SOARING EVENT</h3>
      </div>
      <div className="nav_header-content">
        <nav className="nav_header-item">
          <ul>
            {HeaderContent.map((item, index) => (
              <li key={index} className="nav_header-list">
                <Link to={item.path} className="nav_header-link">
                  {item.name}
                </Link>
              </li>
            ))}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{
                color: "#fff",
                width: "20px",
                height: "20px",
                cursor: "pointer",
                padding: "0 10px",
              }}
              onClick={toggleSearch}
            />
            <div className="nav_header-button">
              {isLoggedIn ? (
                <div className="dropdown">
                  <button className="button__link">Profile</button>
                  <div className="dropdown-content">
                    <Link to={"/profile"} className="dropdown-link" >Profile</Link>
                    <Link to={"/mycart"} className="dropdown-link">My Cart</Link>
                    <Logout onLogout={handleLogout} />
                  </div>
                </div>
              ) : (
                <div>
                  <button onClick={handleLogin}><Link to={"/login"} className="button__link-login">Login</Link></button>
                </div>
              )}
            </div>
          </ul>
        </nav>
      </div>
      {showSearch && <SearchPopup onClose={toggleSearch} />}
    </header>
  );
};

export default Header;
