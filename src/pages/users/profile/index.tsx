// Profile.tsx
import { useEffect, useState } from "react";
import "./style.scss";
import ChangePassword from "../../authentication/changePassword";
import { Link } from "react-router-dom";
import ChangeInfo from "../../../component/changeInfo";
import {
  getProfile,
  type ProfileDetailResponse,
} from "../../../api/profileApi";

const Profile = () => {
  const [profile, setProfile] = useState<ProfileDetailResponse | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeInfo, setShowChangeInfo] = useState(false);

  const handleShowChangeInfo = () => {
    setShowChangeInfo(true);
  };

  const handleCloseChangeInfo = () => {
    setShowChangeInfo(false);
  };

  const handleShowChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      console.log("Profile info: ", data);
      setProfile(data);
    } catch (err) {
      console.error("Get info profile error!", err);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

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
          <h2>
            {profile.firstName}
            {profile.lastName}
          </h2>
        </div>

        <div className="profile-info">
          <div className="profile-item">
            <label>Name:</label>
            <span>
              {profile.firstName}
              {profile.lastName}
            </span>
          </div>
          <div className="profile-item">
            <label>Phone:</label>
            <span>{profile.phone}</span>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <span>{profile.email}</span>
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
          {showChangeInfo && profile && (
            <ChangeInfo
              profile={{
                firstName: profile.firstName,
                lastName: profile.lastName,
                phone: profile.phone,
                email: profile.email,
              }}
              onClose={handleCloseChangeInfo}
              onUpdate={fetchProfile}
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
