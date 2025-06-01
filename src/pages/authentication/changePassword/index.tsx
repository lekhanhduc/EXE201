// ChangePassword.tsx
import React, { useState } from "react";

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      alert("Mật khẩu đã được thay đổi!");
      setNewPassword("");
      setConfirmPassword("");
      onClose(); // Đóng form thay đổi mật khẩu
    } else {
      alert("Mật khẩu không khớp, vui lòng thử lại!");
    }
  };

  return (
    <div className="change-password-overlay">
      <div className="change-password-modal">
        <h3>Thay Đổi Mật Khẩu</h3>
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
