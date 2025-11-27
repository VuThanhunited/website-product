import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import "./AdminCompany.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://website-product-1.onrender.com/api"
    : "http://localhost:5000/api");

const AdminCompany = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    phone: "",
    email: "",
    socialLinks: {
      facebook: "",
      youtube: "",
      zalo: "",
      instagram: "",
      whatsapp: "",
    },
    headerBgColor: "#ffffff",
    companyPageBgColor: "#f8f9fa",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await axios.get(`${API_URL}/company`);
      setCompanyInfo(response.data);
      setFormData({
        companyName: response.data.companyName || "",
        address: response.data.address || "",
        phone: response.data.phone || "",
        email: response.data.email || "",
        socialLinks: response.data.socialLinks || {
          facebook: "",
          youtube: "",
          zalo: "",
          instagram: "",
          whatsapp: "",
        },
        headerBgColor: response.data.headerBgColor || "#ffffff",
        companyPageBgColor: response.data.companyPageBgColor || "#f8f9fa",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching company info:", error);
      setMessage("Lỗi khi tải thông tin công ty");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social_")) {
      const socialKey = name.replace("social_", "");
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [socialKey]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/company`, formData);
      setCompanyInfo(response.data);
      setIsEditing(false);
      setMessage("✅ Cập nhật thông tin công ty thành công!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating company info:", error);
      setMessage("❌ Lỗi khi cập nhật thông tin công ty");
    }
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-company">
      <div className="admin-header">
        <h1>🏢 Quản Lý Thông Tin Công Ty</h1>
        {!isEditing && (
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Chỉnh Sửa
          </button>
        )}
      </div>

      {message && (
        <div
          className={`alert ${message.includes("✅") ? "success" : "error"}`}
        >
          {message}
        </div>
      )}

      {!isEditing ? (
        <div className="company-info-view">
          <div className="info-card">
            <h2>Thông Tin Cơ Bản</h2>
            <div className="info-row">
              <label>Tên Công Ty:</label>
              <span>{companyInfo?.companyName}</span>
            </div>
            <div className="info-row">
              <label>Địa Chỉ:</label>
              <span>{companyInfo?.address}</span>
            </div>
            <div className="info-row">
              <label>Số Điện Thoại:</label>
              <span>{companyInfo?.phone}</span>
            </div>
            <div className="info-row">
              <label>Email:</label>
              <span>{companyInfo?.email}</span>
            </div>
          </div>

          <div className="info-card">
            <h2>Tùy Chỉnh Màu Sắc</h2>
            <div className="info-row">
              <label>Màu Nền Header:</label>
              <span>
                <span
                  className="color-preview"
                  style={{ backgroundColor: companyInfo?.headerBgColor }}
                ></span>
                {companyInfo?.headerBgColor || "#ffffff"}
              </span>
            </div>
            <div className="info-row">
              <label>Màu Nền Trang Công Ty:</label>
              <span>
                <span
                  className="color-preview"
                  style={{ backgroundColor: companyInfo?.companyPageBgColor }}
                ></span>
                {companyInfo?.companyPageBgColor || "#f8f9fa"}
              </span>
            </div>
          </div>

          <div className="info-card">
            <h2>Mạng Xã Hội</h2>
            <div className="info-row">
              <label>Facebook:</label>
              <span>
                {companyInfo?.socialLinks?.facebook || "Chưa thiết lập"}
              </span>
            </div>
            <div className="info-row">
              <label>YouTube:</label>
              <span>
                {companyInfo?.socialLinks?.youtube || "Chưa thiết lập"}
              </span>
            </div>
            <div className="info-row">
              <label>Zalo:</label>
              <span>{companyInfo?.socialLinks?.zalo || "Chưa thiết lập"}</span>
            </div>
            <div className="info-row">
              <label>Instagram:</label>
              <span>
                {companyInfo?.socialLinks?.instagram || "Chưa thiết lập"}
              </span>
            </div>
            <div className="info-row">
              <label>WhatsApp:</label>
              <span>
                {companyInfo?.socialLinks?.whatsapp || "Chưa thiết lập"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="company-form">
          <div className="form-section">
            <h2>Thông Tin Cơ Bản</h2>

            <div className="form-group">
              <label>Tên Công Ty *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Địa Chỉ *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Số Điện Thoại *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Tùy Chỉnh Màu Sắc</h2>

            <div className="form-group">
              <label>Màu Nền Header</label>
              <div className="color-input-group">
                <input
                  type="color"
                  name="headerBgColor"
                  value={formData.headerBgColor}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="headerBgColor"
                  value={formData.headerBgColor}
                  onChange={handleChange}
                  placeholder="#ffffff"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
                <small>
                  Màu nền cho phần header trên cùng (logo, thông tin công ty)
                </small>
              </div>
            </div>

            <div className="form-group">
              <label>Màu Nền Hero Section Trang Công Ty</label>
              <div className="color-input-group">
                <input
                  type="color"
                  name="companyPageBgColor"
                  value={formData.companyPageBgColor}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="companyPageBgColor"
                  value={formData.companyPageBgColor}
                  onChange={handleChange}
                  placeholder="#667eea hoặc linear-gradient(...)"
                />
                <small>
                  Màu nền cho phần hero "Về chúng tôi - Công ty TNHH..." (hỗ trợ
                  mã màu hoặc gradient)
                </small>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Mạng Xã Hội</h2>

            <div className="form-group">
              <label>Facebook URL</label>
              <input
                type="url"
                name="social_facebook"
                value={formData.socialLinks.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
              />
            </div>

            <div className="form-group">
              <label>YouTube URL</label>
              <input
                type="url"
                name="social_youtube"
                value={formData.socialLinks.youtube}
                onChange={handleChange}
                placeholder="https://youtube.com/@yourchannel"
              />
            </div>

            <div className="form-group">
              <label>Zalo (Số điện thoại)</label>
              <input
                type="text"
                name="social_zalo"
                value={formData.socialLinks.zalo}
                onChange={handleChange}
                placeholder="0123456789"
              />
            </div>

            <div className="form-group">
              <label>Instagram URL</label>
              <input
                type="url"
                name="social_instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div className="form-group">
              <label>WhatsApp (Số điện thoại)</label>
              <input
                type="text"
                name="social_whatsapp"
                value={formData.socialLinks.whatsapp}
                onChange={handleChange}
                placeholder="84123456789"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              <FaSave /> Lưu Thay Đổi
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                fetchCompanyInfo();
              }}
            >
              <FaTimes /> Hủy
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminCompany;
