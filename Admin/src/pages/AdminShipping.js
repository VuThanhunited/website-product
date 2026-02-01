import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTruck,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import "./AdminShipping.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const AdminShipping = () => {
  const [shippingRates, setShippingRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    province: "",
    rate: "",
    estimatedDays: "2-3 ngày",
    isActive: true,
  });

  // Danh sách 34 tỉnh thành Việt Nam theo Nghị quyết sắp xếp ĐVHC năm 2025
  const vietnamProvinces = [
    // 6 Thành phố trực thuộc trung ương
    "Hà Nội",
    "Thành phố Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Huế",

    // 28 Tỉnh
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bạc Liêu",
    "Bắc Kạn",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Tĩnh",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ninh",
    "Quảng Trị",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];

  useEffect(() => {
    fetchShippingRates();
  }, []);

  const fetchShippingRates = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/shipping`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShippingRates(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shipping rates:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.province || !formData.rate) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");

      if (editingId) {
        // Update existing
        await axios.put(`${API_URL}/shipping/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Cập nhật phí vận chuyển thành công!");
      } else {
        // Create new
        await axios.post(`${API_URL}/shipping`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Thêm phí vận chuyển thành công!");
      }

      resetForm();
      fetchShippingRates();
    } catch (error) {
      console.error("Error saving shipping rate:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const handleEdit = (rate) => {
    setIsEditing(true);
    setEditingId(rate._id);
    setFormData({
      province: rate.province,
      rate: rate.rate,
      estimatedDays: rate.estimatedDays,
      isActive: rate.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phí vận chuyển này?")) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/shipping/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Xóa phí vận chuyển thành công!");
      fetchShippingRates();
    } catch (error) {
      console.error("Error deleting shipping rate:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const resetForm = () => {
    setFormData({
      province: "",
      rate: "",
      estimatedDays: "2-3 ngày",
      isActive: true,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-shipping">
      <div className="admin-header">
        <h2>
          <FaTruck /> Quản Lý Phí Vận Chuyển
        </h2>
        <button
          className="btn-add"
          onClick={() => {
            setIsEditing(true);
            resetForm();
          }}
        >
          <FaPlus /> Thêm Khu Vực
        </button>
      </div>

      {isEditing && (
        <div className="shipping-form-container">
          <div className="form-header">
            <h3>{editingId ? "Cập Nhật" : "Thêm Mới"} Phí Vận Chuyển</h3>
            <button className="btn-close" onClick={resetForm}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="shipping-form">
            <div className="form-row">
              <div className="form-group">
                <label>
                  Tỉnh/Thành phố <span className="required">*</span>
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Chọn tỉnh/thành phố --</option>
                  {vietnamProvinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  Phí vận chuyển (VNĐ) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: 30000"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Thời gian giao hàng ước tính</label>
                <input
                  type="text"
                  name="estimatedDays"
                  value={formData.estimatedDays}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: 2-3 ngày"
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <span>Kích hoạt</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                <FaSave /> {editingId ? "Cập Nhật" : "Thêm Mới"}
              </button>
              <button type="button" className="btn-cancel" onClick={resetForm}>
                <FaTimes /> Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="shipping-list">
        <table className="shipping-table">
          <thead>
            <tr>
              <th>Tỉnh/Thành phố</th>
              <th>Phí vận chuyển</th>
              <th>Thời gian giao</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {shippingRates.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  Chưa có phí vận chuyển nào
                </td>
              </tr>
            ) : (
              shippingRates.map((rate) => (
                <tr key={rate._id}>
                  <td>
                    <strong>{rate.province}</strong>
                  </td>
                  <td className="rate-cell">{formatCurrency(rate.rate)}</td>
                  <td>{rate.estimatedDays}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        rate.isActive ? "active" : "inactive"
                      }`}
                    >
                      {rate.isActive ? "Hoạt động" : "Tạm ngưng"}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(rate)}
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(rate._id)}
                      title="Xóa"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminShipping;
