import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <h1>{user.username}</h1>
            <p className="profile-email">{user.email}</p>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <label>Tên đăng nhập:</label>
              <span>{user.username}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>Vai trò:</label>
              <span>
                {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-primary">Chỉnh sửa thông tin</button>
            <button className="btn-secondary">Đổi mật khẩu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
