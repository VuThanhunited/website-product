import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import axios from "axios";
import "../styles/Profile.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Profile = () => {
  const { user, updateUser, checkAuth } = useAuth();
  const { language } = useLanguage();
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

    const token = localStorage.getItem("token");

    try {
      // Use XMLHttpRequest instead of fetch to avoid minification issues
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", `${API_URL}/auth/profile`, true);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      // Use arrow function to preserve context and access React state setters
      xhr.onload = () => {
        setLoading(false);

        console.log("XHR status:", xhr.status);
        console.log("XHR response:", xhr.responseText);

        // If status is 2xx, backend updated successfully - just show success
        if (xhr.status >= 200 && xhr.status < 300) {
          // Backend updated successfully, try to parse response
          let responseData = null;

          try {
            // Direct eval to avoid minification breaking JSON parse
            responseData = eval("(" + xhr.responseText + ")");
          } catch (parseErr) {
            console.log(
              "Parse failed but backend succeeded, showing success anyway"
            );
          }

          // Show success message regardless of parse result
          // because backend has already saved to MongoDB (status 2xx confirms this)
          if (responseData && responseData.user) {
            updateUser(responseData.user);
          }

          const msg =
            language === "vi"
              ? "Cập nhật thông tin thành công!"
              : "Profile updated successfully!";
          setMessage({ type: "success", text: msg });
          setIsEditingProfile(false);

          // Reload user data from backend to sync - use checkAuth instead of window.reload
          setTimeout(async () => {
            await checkAuth();
            setMessage({ type: "", text: "" }); // Clear message after reload
          }, 1500);
        } else {
          const msg =
            language === "vi"
              ? "Lỗi khi cập nhật thông tin"
              : "Error updating profile";
          setMessage({ type: "error", text: msg });
        }
      };

      xhr.onerror = () => {
        setLoading(false);
        const msg = language === "vi" ? "Lỗi kết nối" : "Connection error";
        setMessage({ type: "error", text: msg });
      };

      // Build body string manually
      const fn = profileData.fullName || "";
      const em = profileData.email || "";
      const ph = profileData.phone || "";
      const ad = profileData.address || "";

      const bodyString =
        "fullName=" +
        encodeURIComponent(fn) +
        "&email=" +
        encodeURIComponent(em) +
        "&phone=" +
        encodeURIComponent(ph) +
        "&address=" +
        encodeURIComponent(ad);

      xhr.send(bodyString);
    } catch (err) {
      console.error("Profile update error:", err);
      setLoading(false);
      const msg =
        language === "vi"
          ? "Lỗi khi cập nhật thông tin"
          : "Error updating profile";
      setMessage({ type: "error", text: msg });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: text.passwordMismatch });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: text.passwordLength,
      });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: text.passwordSuccess });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsChangingPassword(false);
      } else {
        setMessage({
          type: "error",
          text: data.message || text.passwordError,
        });
      }
    } catch (error) {
      console.error("Change password error:", error);
      setMessage({
        type: "error",
        text: text.passwordError,
      });
    } finally {
      setLoading(false);
    }
  };

  // Translations
  const t = {
    vi: {
      username: "Tên đăng nhập",
      fullName: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại",
      address: "Địa chỉ",
      role: "Vai trò",
      admin: "Quản trị viên",
      customer: "Khách hàng",
      notUpdated: "Chưa cập nhật",
      editProfile: "Chỉnh sửa thông tin",
      changePassword: "Đổi mật khẩu",
      editProfileTitle: "Chỉnh sửa thông tin",
      fullNamePlaceholder: "Nhập họ và tên",
      phonePlaceholder: "Nhập số điện thoại",
      addressPlaceholder: "Nhập địa chỉ (không bắt buộc)",
      saving: "Đang lưu...",
      saveChanges: "Lưu thay đổi",
      cancel: "Hủy",
      changePasswordTitle: "Đổi mật khẩu",
      currentPassword: "Mật khẩu hiện tại",
      newPassword: "Mật khẩu mới",
      confirmPassword: "Xác nhận mật khẩu mới",
      changing: "Đang đổi...",
      updateSuccess: "Cập nhật thông tin thành công!",
      passwordSuccess: "Đổi mật khẩu thành công!",
      updateError: "Lỗi khi cập nhật thông tin",
      passwordError: "Lỗi khi đổi mật khẩu",
      passwordMismatch: "Mật khẩu mới không khớp!",
      passwordLength: "Mật khẩu mới phải có ít nhất 6 ký tự!",
    },
    en: {
      username: "Username",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone Number",
      address: "Address",
      role: "Role",
      admin: "Administrator",
      customer: "Customer",
      notUpdated: "Not updated",
      editProfile: "Edit Profile",
      changePassword: "Change Password",
      editProfileTitle: "Edit Profile",
      fullNamePlaceholder: "Enter full name",
      phonePlaceholder: "Enter phone number",
      addressPlaceholder: "Enter address (optional)",
      saving: "Saving...",
      saveChanges: "Save Changes",
      cancel: "Cancel",
      changePasswordTitle: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      changing: "Changing...",
      updateSuccess: "Profile updated successfully!",
      passwordSuccess: "Password changed successfully!",
      updateError: "Error updating profile",
      passwordError: "Error changing password",
      passwordMismatch: "New passwords do not match!",
      passwordLength: "New password must be at least 6 characters!",
    },
  };

  const text = t[language] || t.vi;

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
                  <label>{text.username}:</label>
                  <span>{user.username}</span>
                </div>
                <div className="info-item">
                  <label>{text.fullName}:</label>
                  <span>{user.fullName || text.notUpdated}</span>
                </div>
                <div className="info-item">
                  <label>{text.email}:</label>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <label>{text.phone}:</label>
                  <span>{user.phone || text.notUpdated}</span>
                </div>
                <div className="info-item">
                  <label>{text.address}:</label>
                  <span>{user.address || text.notUpdated}</span>
                </div>
                <div className="info-item">
                  <label>{text.role}:</label>
                  <span>
                    {user.role === "admin" ? text.admin : text.customer}
                  </span>
                </div>
              </div>

              <div className="profile-actions">
                <button
                  className="btn-primary"
                  onClick={() => setIsEditingProfile(true)}
                >
                  {text.editProfile}
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setIsChangingPassword(true)}
                >
                  {text.changePassword}
                </button>
              </div>
            </>
          )}

          {/* Edit Profile Form */}
          {isEditingProfile && (
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <h3>{text.editProfileTitle}</h3>
              <div className="form-group">
                <label>{text.fullName}:</label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  placeholder={text.fullNamePlaceholder}
                />
              </div>
              <div className="form-group">
                <label>{text.email}:</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{text.phone}:</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder={text.phonePlaceholder}
                />
              </div>
              <div className="form-group">
                <label>{text.address}:</label>
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileChange}
                  placeholder={text.addressPlaceholder}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? text.saving : text.saveChanges}
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
                  {text.cancel}
                </button>
              </div>
            </form>
          )}

          {/* Change Password Form */}
          {isChangingPassword && (
            <form onSubmit={handleChangePassword} className="profile-form">
              <h3>{text.changePasswordTitle}</h3>
              <div className="form-group">
                <label>{text.currentPassword}:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>{text.newPassword}:</label>
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
                <label>{text.confirmPassword}:</label>
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
                  {loading ? text.changing : text.changePassword}
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
                  {text.cancel}
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
