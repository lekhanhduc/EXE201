import React from "react";
import "./style.scss"
interface LogoutProps {
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  return (
    <div>
      <button className="dropdown-item" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
