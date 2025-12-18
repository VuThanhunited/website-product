import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "../styles/Profile.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  if (!user) return null;

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      console.log("🔄 Updating profile...");
      console.log("   Data:", profileData);
      console.log("   Token:", token ? "✅ Present" : "❌ Missing");

      const response = await axios.put(`${API_URL}/auth/profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Response received:");
      console.log("   Status:", response.status);
      console.log("   Data:", response.data);

      // If we got here without error, the update was successful
      // Update user state with the returned user data or refetch
      if (response.data && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else if (response.status === 200) {
        // If no user data but status 200, refetch user data
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      // Always show success message if we reach here
      setMessage({
        type: "success",
        text: response.data?.message || "Cập nhật thông tin thành công!",
      });
      setIsEditingProfile(false);

      console.log("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Update profile error:");
      console.error("   Status:", error.response?.status);
      console.error("   Data:", error.response?.data);
      console.error("   Message:", error.message);

      setMessage({
        type: "error",
        text: error.response?.data?.message || "Lỗi khi cập nhật thông tin",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu mới không khớp!" });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Mật khẩu mới phải có ít nhất 6 ký tự!",
      });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/auth/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setMessage({ type: "success", text: "Đổi mật khẩu thành công!" });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsChangingPassword(false);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Lỗi khi đổi mật khẩu",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <h1>{user.fullName || user.username}</h1>
            <p className="profile-email">{user.email}</p>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}

          {/* Profile Info Section */}
          {!isEditingProfile && !isChangingPassword && (
            <>
              <div className="profile-info">
                <div className="info-item">
                  <label>Tên đăng nhập:</label>
                  <span>{user.username}</span>
                </div>
                <div className="info-item">
                  <label>Họ và tên:</label>
                  <span>{user.fullName || "Chưa cập nhật"}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <label>Số điện thoại:</label>
                  <span>{user.phone || "Chưa cập nhật"}</span>
                </div>
                <div className="info-item">
                  <label>Địa chỉ:</label>
                  <span>{user.address || "Chưa cập nhật"}</span>
                </div>
                <div className="info-item">
                  <label>Vai trò:</label>
                  <span>
                    {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                  </span>
                </div>
              </div>

              <div className="profile-actions">
                <button
                  className="btn-primary"
                  onClick={() => setIsEditingProfile(true)}
                >
                  Chỉnh sửa thông tin
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Đổi mật khẩu
                </button>
              </div>
            </>
          )}

          {/* Edit Profile Form */}
          {isEditingProfile && (
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <h3>Chỉnh sửa thông tin</h3>
              <div className="form-group">
                <label>Họ và tên:</label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại:</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ:</label>
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileChange}
                  placeholder="Nhập địa chỉ (không bắt buộc)"
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setIsEditingProfile(false);
                    setMessage({ type: "", text: "" });
                  }}
                  disabled={loading}
                >
                  Hủy
                </button>
              </div>
            </form>
          )}

          {/* Change Password Form */}
          {isChangingPassword && (
            <form onSubmit={handleChangePassword} className="profile-form">
              <h3>Đổi mật khẩu</h3>
              <div className="form-group">
                <label>Mật khẩu hiện tại:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                />
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu mới:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Đang đổi..." : "Đổi mật khẩu"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setMessage({ type: "", text: "" });
                  }}
                  disabled={loading}
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
