import { useState, useEffect } from "react";
import "./style.scss";
import { updateProfile } from "../../api/profileApi";

interface ChangeInfoProps {
  onClose: () => void;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onUpdate: () => void;
}

const ChangeInfo: React.FC<ChangeInfoProps> = ({ onClose, onUpdate, profile }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Khởi tạo state từ profile
  useEffect(() => {
    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setPhone(profile.phone || "");
    setEmail(profile.email || "");
  }, [profile]);

  const handleInfoChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !email) {
      alert("Please enter complete info!");
      return;
    }

    try {
      const result = await updateProfile({ firstName, lastName, email, phone });
      console.log("Update info success!", result);
      alert("Info updated successfully!");
      onClose();
      onUpdate();
    } catch (err) {
      console.log("Update info failed!", err);
      alert("Update failed. Please try again!");
    }
  };

  return (
    <div className="change-info-overlay">
      <div className="change-info-modal">
        <h3>Thay Đổi Thông Tin</h3>
        <form onSubmit={handleInfoChange}>
          <div className="info-field">
            <label>First name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter new name"
            />
          </div>
          <div className="info-field">
            <label>Last name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter new name"
            />
          </div>
          <div className="info-field">
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter new phone"
            />
          </div>
          <div className="info-field">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
            />
          </div>
          <div className="button-group">
            <button type="submit">Update Info</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeInfo;
