import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaImage,
  FaUpload,
} from "react-icons/fa";
import shopeeLogo from "../assets/shopee-logo.jpg";
import lazadaLogo from "../assets/lazada-logo.png";
import tikiLogo from "../assets/tiki-logo.jpg";
import "./AdminPartners.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://website-product-1.onrender.com/api"
    : "http://localhost:5000/api");

// Mapping logo local
const partnerLogos = {
  Shopee: shopeeLogo,
  Lazada: lazadaLogo,
  Tiki: tikiLogo,
};

const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/admin/login";
        return;
      }
      const response = await axios.get(`${API_URL}/company/partners`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPartners(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching partners:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      } else {
        setMessage("Lỗi khi tải đối tác");
      }
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/admin/login";
        return;
      }

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("link", formData.link);

      if (imageFile) {
        submitData.append("logo", imageFile);
      } else if (formData.logo) {
        submitData.append("logoUrl", formData.logo);
      }

      if (editingId) {
        await axios.put(
          `${API_URL}/company/partners/${editingId}`,
          submitData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("✅ Cập nhật đối tác thành công!");
      } else {
        await axios.post(`${API_URL}/company/partners`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("✅ Thêm đối tác mới thành công!");
      }
      fetchPartners();
      resetForm();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving partner:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      } else {
        setMessage("❌ Lỗi khi lưu đối tác");
      }
    }
  };

  const handleEdit = (partner) => {
    setEditingId(partner._id);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      link: partner.link || "",
    });
    // Sử dụng ảnh local nếu có, nếu không dùng URL từ database
    const localLogo = partnerLogos[partner.name];
    setImagePreview(localLogo || partner.logo);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa đối tác này?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/admin/login";
        return;
      }

      await axios.delete(`${API_URL}/company/partners/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Xóa đối tác thành công!");
      fetchPartners();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting partner:", error);
      if (error.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      } else {
        setMessage("❌ Lỗi khi xóa đối tác");
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: "", logo: "", link: "" });
    setImageFile(null);
    setImagePreview("");
    setIsAdding(false);
    setEditingId(null);
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-partners">
      <div className="admin-header">
        <h1>🤝 Quản Lý Đối Tác</h1>
        {!isAdding && (
          <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
            <FaPlus /> Thêm Đối Tác Mới
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

      {isAdding && (
        <form onSubmit={handleSubmit} className="partner-form">
          <h2>{editingId ? "Chỉnh Sửa Đối Tác" : "Thêm Đối Tác Mới"}</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Tên đối tác *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="VD: Shopee, Lazada, Tiki..."
                required
              />
            </div>

            <div className="form-group">
              <label>Link website</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <FaImage /> Logo đối tác *
            </label>
            <div className="image-upload-area">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="btn-remove-image"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                      setFormData({ ...formData, logo: "" });
                    }}
                  >
                    <FaTimes /> Xóa
                  </button>
                </div>
              ) : (
                <label className="upload-label">
                  <FaUpload />
                  <span>Chọn ảnh logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              )}
            </div>
            <small>Hoặc nhập URL ảnh:</small>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              disabled={imageFile !== null}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              <FaSave /> {editingId ? "Cập Nhật" : "Thêm Mới"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              <FaTimes /> Hủy
            </button>
          </div>
        </form>
      )}

      <div className="partners-list">
        <h2>Danh Sách Đối Tác ({partners.length})</h2>
        {partners.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có đối tác nào. Hãy thêm đối tác đầu tiên!</p>
          </div>
        ) : (
          <div className="partners-grid">
            {partners.map((partner) => (
              <div key={partner._id} className="partner-card">
                <div className="partner-logo">
                  {partnerLogos[partner.name] ? (
                    <img src={partnerLogos[partner.name]} alt={partner.name} />
                  ) : partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f0f0f0" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" dy="105" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  ) : (
                    <div className="no-logo-placeholder">
                      <FaImage />
                      <span>No Logo</span>
                    </div>
                  )}
                </div>
                <div className="partner-info">
                  <h3>{partner.name}</h3>
                  {partner.link && (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="partner-link"
                    >
                      🔗 {partner.link}
                    </a>
                  )}
                </div>
                <div className="partner-actions">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => handleEdit(partner)}
                    title="Chỉnh sửa"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(partner._id)}
                    title="Xóa"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPartners;
