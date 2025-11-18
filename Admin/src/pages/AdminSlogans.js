import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaGlobe,
} from "react-icons/fa";
import "./AdminSlogans.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const AdminSlogans = () => {
  const [slogans, setSlogans] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    textEn: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSlogans();
  }, []);

  const fetchSlogans = async () => {
    try {
      const response = await axios.get(`${API_URL}/media/slogans`);
      setSlogans(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching slogans:", error);
      setMessage("Lỗi khi tải slogan");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/media/slogans/${editingId}`, formData);
        setMessage("✅ Cập nhật slogan thành công!");
      } else {
        await axios.post(`${API_URL}/media/slogans`, formData);
        setMessage("✅ Thêm slogan mới thành công!");
      }
      fetchSlogans();
      resetForm();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving slogan:", error);
      setMessage("❌ Lỗi khi lưu slogan");
    }
  };

  const handleEdit = (slogan) => {
    setEditingId(slogan._id);
    setFormData({
      text: slogan.text,
      textEn: slogan.textEn || "",
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa slogan này?")) return;

    try {
      await axios.delete(`${API_URL}/media/slogans/${id}`);
      setMessage("✅ Xóa slogan thành công!");
      fetchSlogans();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting slogan:", error);
      setMessage("❌ Lỗi khi xóa slogan");
    }
  };

  const resetForm = () => {
    setFormData({ text: "", textEn: "" });
    setIsAdding(false);
    setEditingId(null);
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-slogans">
      <div className="admin-header">
        <h1>💬 Quản Lý Slogan Trang Chủ</h1>
        {!isAdding && (
          <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
            <FaPlus /> Thêm Slogan Mới
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
        <form onSubmit={handleSubmit} className="slogan-form">
          <h2>{editingId ? "Chỉnh Sửa Slogan" : "Thêm Slogan Mới"}</h2>

          <div className="form-group">
            <label>
              <FaGlobe /> Slogan (Tiếng Việt) *
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows="3"
              placeholder="Nhập slogan tiếng Việt..."
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FaGlobe /> Slogan (English)
            </label>
            <textarea
              name="textEn"
              value={formData.textEn}
              onChange={handleChange}
              rows="3"
              placeholder="Enter slogan in English..."
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

      <div className="slogans-list">
        <h2>Danh Sách Slogan ({slogans.length})</h2>
        {slogans.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có slogan nào. Hãy thêm slogan đầu tiên!</p>
          </div>
        ) : (
          <div className="slogans-grid">
            {slogans.map((slogan, index) => (
              <div key={slogan._id} className="slogan-card">
                <div className="slogan-number">#{index + 1}</div>
                <div className="slogan-content">
                  <div className="slogan-text">
                    <strong>🇻🇳 Tiếng Việt:</strong>
                    <p>{slogan.text}</p>
                  </div>
                  {slogan.textEn && (
                    <div className="slogan-text">
                      <strong>🇬🇧 English:</strong>
                      <p>{slogan.textEn}</p>
                    </div>
                  )}
                </div>
                <div className="slogan-actions">
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => handleEdit(slogan)}
                    title="Chỉnh sửa"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-icon btn-delete"
                    onClick={() => handleDelete(slogan._id)}
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

export default AdminSlogans;
