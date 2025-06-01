import React, { useState } from "react";
import "./style.scss";

interface ChangeInfoProps {
  onClose: () => void;
  initialName: string;
  initialPhone: string;
  initialEmail: string;
  onUpdateInfo: (newName: string, newPhone: string, newEmail: string) => void;
}

const ChangeInfo: React.FC<ChangeInfoProps> = ({
  onClose,
  initialName,
  initialPhone,
  initialEmail,
  onUpdateInfo,
}) => {
  const [newName, setNewName] = useState(initialName);
  const [newPhone, setNewPhone] = useState(initialPhone);
  const [newEmail, setNewEmail] = useState(initialEmail);

  const handleInfoChange = () => {
    // Validation (you can add more validation as needed)
    if (newName && newPhone && newEmail) {
      onUpdateInfo(newName, newPhone, newEmail); // Update parent component
      alert("Thông tin đã được cập nhật!");
      onClose(); // Close the form
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  };

  return (
    <div className="change-info-overlay">
      <div className="change-info-modal">
        <h3>Thay Đổi Thông Tin</h3>
        <div className="info-field">
          <label>Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
          />
        </div>
        <div className="info-field">
          <label>Phone:</label>
          <input
            type="text"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="Enter new phone"
          />
        </div>
        <div className="info-field">
          <label>Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
          />
        </div>
        <button onClick={handleInfoChange}>Update Info</button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangeInfo;
