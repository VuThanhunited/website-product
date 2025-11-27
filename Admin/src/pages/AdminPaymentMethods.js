import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaMoneyBillWave,
  FaSave,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import "./AdminPaymentMethods.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const AdminPaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    code: "cod",
    description: "",
    descriptionEn: "",
    icon: "💳",
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/payment-methods/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPaymentMethods(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (editingId) {
        await axios.put(`${API_URL}/payment-methods/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Cập nhật thành công!");
      } else {
        await axios.post(`${API_URL}/payment-methods`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Thêm mới thành công!");
      }
      resetForm();
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleEdit = (method) => {
    setIsEditing(true);
    setEditingId(method._id);
    setFormData({
      name: method.name || "",
      nameEn: method.nameEn || "",
      code: method.code || "cod",
      description: method.description || "",
      descriptionEn: method.descriptionEn || "",
      icon: method.icon || "💳",
      isActive: method.isActive !== undefined ? method.isActive : true,
      order: method.order || 0,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_URL}/payment-methods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Xóa thành công!");
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_URL}/payment-methods/${id}`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPaymentMethods();
    } catch (error) {
      console.error("Error toggling:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      nameEn: "",
      code: "cod",
      description: "",
      descriptionEn: "",
      icon: "💳",
      isActive: true,
      order: 0,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-payment-methods">
      <div className="admin-header">
        <h2>
          <FaMoneyBillWave /> Quản Lý Phương Thức Thanh Toán
        </h2>
        <button className="btn-add" onClick={() => setIsEditing(true)}>
          <FaPlus /> Thêm Phương Thức
        </button>
      </div>

      {isEditing && (
        <div className="payment-form-container">
          <div className="form-header">
            <h3>
              {editingId ? "Cập Nhật" : "Thêm Mới"} Phương Thức Thanh Toán
            </h3>
            <button className="btn-close" onClick={resetForm}>
              <FaTimes />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-row">
              <div className="form-group">
                <label>
                  Tên (VI) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  Tên (EN) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Mã <span className="required">*</span>
                </label>
                <select
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                >
                  <option value="cod">COD</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="momo">MoMo</option>
                  <option value="vnpay">VNPay</option>
                  <option value="zalopay">ZaloPay</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="atm_card">ATM Card</option>
                </select>
              </div>
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="💳"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mô tả (VI)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Mô tả (EN)</label>
              <textarea
                name="descriptionEn"
                value={formData.descriptionEn}
                onChange={handleChange}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span>Kích hoạt</span>
              </label>
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

      <div className="payment-list">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Tên</th>
              <th>Mã</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  Chưa có phương thức thanh toán
                </td>
              </tr>
            ) : (
              paymentMethods.map((method) => (
                <tr key={method._id}>
                  <td className="icon-cell">
                    <span className="payment-icon">{method.icon}</span>
                  </td>
                  <td>
                    <strong>{method.name}</strong>
                    <br />
                    <small className="text-muted">{method.nameEn}</small>
                  </td>
                  <td>
                    <code className="code-badge">{method.code}</code>
                  </td>
                  <td>
                    <small>{method.description}</small>
                  </td>
                  <td>
                    <button
                      className={`btn-toggle ${
                        method.isActive ? "active" : ""
                      }`}
                      onClick={() =>
                        handleToggleActive(method._id, method.isActive)
                      }
                    >
                      {method.isActive ? (
                        <>
                          <FaToggleOn /> Hoạt động
                        </>
                      ) : (
                        <>
                          <FaToggleOff /> Tạm ngưng
                        </>
                      )}
                    </button>
                  </td>
                  <td className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(method)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(method._id)}
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

export default AdminPaymentMethods;
