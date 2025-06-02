import React, { useState } from "react";
import { changePassword } from "../../../api/authApi";
import axios from "axios";

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!oldPassword || !newPassword || !confirmPassword) {
    alert("Please enter complete information!");
    return;  
  }

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match, please try again!");
    return;
  }

  try {
    const result = await changePassword({ oldPassword, newPassword });
    console.log("Change password success", result);
    alert("Password changed successfully!");  
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose(); 
  } catch (err: unknown) {
    console.log("Change password failed", err);
    if (
      axios.isAxiosError(err) &&
      err.response &&
      err.response.data.message === "Old password is incorrect"
    ) {
      alert("Old password is incorrect!");
    } else {
      alert("Change password failed. Please try again!");
    }
  }
};

  return (
    <div className="change-password-overlay">
      <div className="change-password-modal">
        <h3>Thay Đổi Mật Khẩu</h3>
        <div className="password-field">
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
          />
        </div>
        <div className="password-field">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="password-field">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
        <button onClick={handlePasswordChange}>Change Password</button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
