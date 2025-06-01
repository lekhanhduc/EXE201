// Profile.tsx
import { useState } from "react";
import "./style.scss";
import ChangePassword from "../../authentication/changePassword";
import { Link } from "react-router-dom";
import ChangeInfo from "../../../component/changeInfo";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("123-456-7890");
  const [email, setEmail] = useState("johndoe@example.com");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeInfo, setShowChangeInfo] = useState(false);

  const handleShowChangeInfo = () => {
    setShowChangeInfo(true);
  };

  const handleCloseChangeInfo = () => {
    setShowChangeInfo(false);
  };

  const handleUpdateInfo = (
    newName: string,
    newPhone: string,
    newEmail: string
  ) => {
    setName(newName);
    setPhone(newPhone);
    setEmail(newEmail);
  };
  const handleShowChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };

  return (
    <div className="profile-container">
      <div className="background__item">
        <h1>Profile</h1>
        <div>
          <Link to="/" className="item__link">
            Home
          </Link>
          <p>Profile</p>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src="https://www.w3schools.com/w3images/avatar2.png"
              alt="Profile Avatar"
            />
          </div>
          <h2>{name}</h2>
        </div>

        <div className="profile-info">
          <div className="profile-item">
            <label>Name:</label>
            <span>{name}</span>
          </div>
          <div className="profile-item">
            <label>Phone:</label>
            <span>{phone}</span>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <span>{email}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button
            className="change-password-btn"
            onClick={handleShowChangePassword}
          >
            Change Password
          </button>
        </div>
        <div>
          {/* Other Profile Content */}
          <button className="change-info-btn" onClick={handleShowChangeInfo}>
            Change Info
          </button>
          {showChangeInfo && (
            <ChangeInfo
              onClose={handleCloseChangeInfo}
              initialName={name}
              initialPhone={phone}
              initialEmail={email}
              onUpdateInfo={handleUpdateInfo}
            />
          )}
        </div>
      </div>

      {/* Hiển thị ChangePassword khi người dùng yêu cầu */}
      {showChangePassword && (
        <ChangePassword onClose={handleCloseChangePassword} />
      )}
    </div>
  );
};

export default Profile;
