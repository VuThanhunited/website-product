import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ForgotPassword.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter email, 2: Enter code, 3: New password
  const [identifier, setIdentifier] = useState(""); // email
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Step 1: Request reset code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        identifier,
        method: "email",
      });

      if (response.data.success) {
        setMessage({ type: "success", text: response.data.message });
        setTimeout(() => {
          setStep(2);
          setMessage({ type: "", text: "" });
        }, 2000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Lỗi khi gửi mã xác thực",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(`${API_URL}/auth/verify-reset-code`, {
        identifier,
        code,
      });

      if (response.data.success) {
        setMessage({ type: "success", text: "Mã xác thực hợp lệ!" });
        setTimeout(() => {
          setStep(3);
          setMessage({ type: "", text: "" });
        }, 1500);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Mã xác thực không hợp lệ",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Mật khẩu xác nhận không khớp!" });
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Mật khẩu phải có ít nhất 6 ký tự!" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        identifier,
        code,
        newPassword,
      });

      if (response.data.success) {
        setMessage({ type: "success", text: response.data.message });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Lỗi khi đặt lại mật khẩu",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    setStep(1);
    setCode("");
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="forgot-password-page">
      <div className="container">
        <div className="forgot-password-card">
          <div className="forgot-password-header">
            <h1>🔐 Quên Mật Khẩu</h1>
            <p>
              {step === 1 && "Nhập email của bạn để nhận mã xác thực"}
              {step === 2 && "Nhập mã xác thực đã được gửi đến email"}
              {step === 3 && "Đặt mật khẩu mới cho tài khoản"}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="progress-indicator">
            <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <span>Xác thực</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <span>Nhập mã</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <span>Mật khẩu mới</span>
            </div>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}

          {/* Step 1: Enter Email/Phone */}

          {step === 1 && (
            <form onSubmit={handleRequestCode} className="forgot-password-form">
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Nhập email của bạn"
                  equired
                />
              </div>{" "}
              <button
                type="submit"
                className="btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Gửi mã xác thực"}
              </button>
            </form>
          )}

          {/* Step 2: Enter Code */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="forgot-password-form">
              <div className="form-group">
                <label>Mã xác thực (6 số):</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Nhập mã 6 số"
                  maxLength="6"
                  pattern="[0-9]{6}"
                  required
                />
                <small>
                  Mã đã được gửi đến email: <strong>{identifier}</strong>
                </small>
              </div>

              <button
                type="submit"
                className="btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "Đang xác thực..." : "Xác thực mã"}
              </button>

              <button
                type="button"
                className="btn-link"
                onClick={handleResendCode}
              >
                Không nhận được mã? Gửi lại
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form
              onSubmit={handleResetPassword}
              className="forgot-password-form"
            >
              <div className="form-group">
                <label>Mật khẩu mới:</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  minLength="6"
                  required
                />
              </div>

              <div className="form-group">
                <label>Xác nhận mật khẩu:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  minLength="6"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
              </button>
            </form>
          )}

          <div className="forgot-password-footer">
            <Link to="/login" className="back-link">
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
