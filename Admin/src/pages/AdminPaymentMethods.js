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
    config: {
      // Bank Transfer
      bankName: "",
      accountNumber: "",
      accountName: "",
      // E-wallets & Payment Gateways
      apiKey: "",
      secretKey: "",
      merchantId: "",
      returnUrl: "",
      notifyUrl: "",
    },
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
      config: {
        bankName: method.config?.bankName || "",
        accountNumber: method.config?.accountNumber || "",
        accountName: method.config?.accountName || "",
        apiKey: method.config?.apiKey || "",
        secretKey: method.config?.secretKey || "",
        merchantId: method.config?.merchantId || "",
        returnUrl: method.config?.returnUrl || "",
        notifyUrl: method.config?.notifyUrl || "",
      },
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
      config: {
        bankName: "",
        accountNumber: "",
        accountName: "",
        apiKey: "",
        secretKey: "",
        merchantId: "",
        returnUrl: "",
        notifyUrl: "",
      },
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested config fields
    if (name.startsWith("config.")) {
      const configField = name.split(".")[1];
      setFormData({
        ...formData,
        config: {
          ...formData.config,
          [configField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
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

            {/* Bank Transfer Configuration */}
            {formData.code === "bank_transfer" && (
              <div className="config-section">
                <h4>🏦 Thông Tin Chuyển Khoản</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tên ngân hàng</label>
                    <input
                      type="text"
                      name="config.bankName"
                      value={formData.config.bankName}
                      onChange={handleChange}
                      placeholder="VD: Vietcombank"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số tài khoản</label>
                    <input
                      type="text"
                      name="config.accountNumber"
                      value={formData.config.accountNumber}
                      onChange={handleChange}
                      placeholder="VD: 1234567890"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Tên chủ tài khoản</label>
                  <input
                    type="text"
                    name="config.accountName"
                    value={formData.config.accountName}
                    onChange={handleChange}
                    placeholder="VD: CONG TY TNHH ABC"
                  />
                </div>
              </div>
            )}

            {/* MoMo Configuration */}
            {formData.code === "momo" && (
              <div className="config-section">
                <h4>📱 Cấu Hình MoMo</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Partner Code</label>
                    <input
                      type="text"
                      name="config.merchantId"
                      value={formData.config.merchantId}
                      onChange={handleChange}
                      placeholder="Partner Code từ MoMo"
                    />
                  </div>
                  <div className="form-group">
                    <label>Access Key</label>
                    <input
                      type="text"
                      name="config.apiKey"
                      value={formData.config.apiKey}
                      onChange={handleChange}
                      placeholder="Access Key từ MoMo"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Secret Key</label>
                  <input
                    type="password"
                    name="config.secretKey"
                    value={formData.config.secretKey}
                    onChange={handleChange}
                    placeholder="Secret Key từ MoMo"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Return URL</label>
                    <input
                      type="text"
                      name="config.returnUrl"
                      value={formData.config.returnUrl}
                      onChange={handleChange}
                      placeholder="URL trả về sau khi thanh toán"
                    />
                  </div>
                  <div className="form-group">
                    <label>Notify URL</label>
                    <input
                      type="text"
                      name="config.notifyUrl"
                      value={formData.config.notifyUrl}
                      onChange={handleChange}
                      placeholder="URL nhận thông báo IPN"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* VNPay Configuration */}
            {formData.code === "vnpay" && (
              <div className="config-section">
                <h4>💳 Cấu Hình VNPay</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>TMN Code</label>
                    <input
                      type="text"
                      name="config.merchantId"
                      value={formData.config.merchantId}
                      onChange={handleChange}
                      placeholder="Mã website từ VNPay"
                    />
                  </div>
                  <div className="form-group">
                    <label>Hash Secret</label>
                    <input
                      type="password"
                      name="config.secretKey"
                      value={formData.config.secretKey}
                      onChange={handleChange}
                      placeholder="Hash Secret từ VNPay"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Return URL</label>
                    <input
                      type="text"
                      name="config.returnUrl"
                      value={formData.config.returnUrl}
                      onChange={handleChange}
                      placeholder="URL trả về sau khi thanh toán"
                    />
                  </div>
                  <div className="form-group">
                    <label>API URL</label>
                    <input
                      type="text"
                      name="config.apiKey"
                      value={formData.config.apiKey}
                      onChange={handleChange}
                      placeholder="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ZaloPay Configuration */}
            {formData.code === "zalopay" && (
              <div className="config-section">
                <h4>🔵 Cấu Hình ZaloPay</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>App ID</label>
                    <input
                      type="text"
                      name="config.merchantId"
                      value={formData.config.merchantId}
                      onChange={handleChange}
                      placeholder="App ID từ ZaloPay"
                    />
                  </div>
                  <div className="form-group">
                    <label>Key 1</label>
                    <input
                      type="password"
                      name="config.apiKey"
                      value={formData.config.apiKey}
                      onChange={handleChange}
                      placeholder="Key 1 từ ZaloPay"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Key 2</label>
                  <input
                    type="password"
                    name="config.secretKey"
                    value={formData.config.secretKey}
                    onChange={handleChange}
                    placeholder="Key 2 từ ZaloPay"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Callback URL</label>
                    <input
                      type="text"
                      name="config.notifyUrl"
                      value={formData.config.notifyUrl}
                      onChange={handleChange}
                      placeholder="URL nhận callback"
                    />
                  </div>
                  <div className="form-group">
                    <label>Redirect URL</label>
                    <input
                      type="text"
                      name="config.returnUrl"
                      value={formData.config.returnUrl}
                      onChange={handleChange}
                      placeholder="URL redirect sau thanh toán"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Credit Card & ATM Card Configuration */}
            {(formData.code === "credit_card" || formData.code === "atm_card") && (
              <div className="config-section">
                <h4>💳 Cấu Hình Cổng Thanh Toán</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Merchant ID</label>
                    <input
                      type="text"
                      name="config.merchantId"
                      value={formData.config.merchantId}
                      onChange={handleChange}
                      placeholder="Mã merchant từ ngân hàng"
                    />
                  </div>
                  <div className="form-group">
                    <label>API Key</label>
                    <input
                      type="text"
                      name="config.apiKey"
                      value={formData.config.apiKey}
                      onChange={handleChange}
                      placeholder="API Key"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Secret Key</label>
                  <input
                    type="password"
                    name="config.secretKey"
                    value={formData.config.secretKey}
                    onChange={handleChange}
                    placeholder="Secret Key để mã hóa"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Return URL</label>
                    <input
                      type="text"
                      name="config.returnUrl"
                      value={formData.config.returnUrl}
                      onChange={handleChange}
                      placeholder="URL trả về"
                    />
                  </div>
                  <div className="form-group">
                    <label>Notify URL</label>
                    <input
                      type="text"
                      name="config.notifyUrl"
                      value={formData.config.notifyUrl}
                      onChange={handleChange}
                      placeholder="URL nhận thông báo"
                    />
                  </div>
                </div>
              </div>
            )}

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
                    {method.code === "bank_transfer" && method.config && (
                      <div style={{ marginTop: "8px", fontSize: "12px" }}>
                        <strong>🏦 Thông tin chuyển khoản:</strong>
                        <br />
                        {method.config.bankName && (
                          <>
                            Ngân hàng: <strong>{method.config.bankName}</strong>
                            <br />
                          </>
                        )}
                        {method.config.accountNumber && (
                          <>
                            STK: <strong>{method.config.accountNumber}</strong>
                            <br />
                          </>
                        )}
                        {method.config.accountName && (
                          <>
                            Chủ TK: <strong>{method.config.accountName}</strong>
                          </>
                        )}
                      </div>
                    )}
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
