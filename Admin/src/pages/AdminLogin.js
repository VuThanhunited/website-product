import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://website-product-1.onrender.com/api"
    : "http://localhost:5000/api");

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/auth/admin/login`,
        formData
      );

      if (response.data.success) {
        // Lưu tokens vào localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("adminToken", response.data.token); // Backward compatibility
        localStorage.setItem("adminUser", JSON.stringify(response.data.user));

        // Show success message
        alert(
          "✅ Đăng nhập thành công! Token sẽ tự động làm mới, bạn không cần đăng nhập lại."
        );

        // Gọi callback
        if (onLoginSuccess) {
          onLoginSuccess(response.data.user);
        }

        // Redirect to dashboard
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">🛡️</div>
          <h1>Admin Panel</h1>
          <p>Đăng nhập để quản lý hệ thống</p>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">📧 Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@eft-company.com"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔒 Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "⏳ Đang đăng nhập..." : "🔓 Đăng nhập"}
          </button>
        </form>

        <div className="login-footer">
          <p>⚠️ Chỉ dành cho quản trị viên</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
