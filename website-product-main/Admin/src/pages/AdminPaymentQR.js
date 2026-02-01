import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaQrcode,
  FaSave,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
  FaImage,
} from "react-icons/fa";
import "./AdminPaymentQR.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const AdminPaymentQR = () => {
  const [paymentQRs, setPaymentQRs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    qrCodeImage: "",
    translations: {
      vi: {
        bankName: "",
        accountName: "",
        instructions: "",
      },
      en: {
        bankName: "",
        accountName: "",
        instructions: "",
      },
    },
    isActive: true,
    displayOrder: 0,
  });

  useEffect(() => {
    fetchPaymentQRs();
  }, []);

  const fetchPaymentQRs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/payment-qr`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPaymentQRs(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payment QRs:", error);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, qrCodeImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      if (editingId) {
        await axios.put(`${API_URL}/payment-qr/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Cập nhật thành công!");
      } else {
        await axios.post(`${API_URL}/payment-qr`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Thêm mới thành công!");
      }
      resetForm();
      fetchPaymentQRs();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const handleEdit = (qr) => {
    setIsEditing(true);
    setEditingId(qr._id);
    setFormData({
      bankName: qr.bankName || "",
      accountNumber: qr.accountNumber || "",
      accountName: qr.accountName || "",
      qrCodeImage: qr.qrCodeImage || "",
      translations: qr.translations || {
        vi: {
          bankName: "",
          accountName: "",
          instructions: "",
        },
        en: {
          bankName: "",
          accountName: "",
          instructions: "",
        },
      },
      isActive: qr.isActive !== undefined ? qr.isActive : true,
      displayOrder: qr.displayOrder || 0,
    });
    setImagePreview(qr.qrCodeImage || "");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`${API_URL}/payment-qr/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Xóa thành công!");
        fetchPaymentQRs();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Có lỗi xảy ra!");
      }
    }
  };

  const toggleActive = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${API_URL}/payment-qr/${id}/toggle-active`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPaymentQRs();
    } catch (error) {
      console.error("Error toggling active:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const resetForm = () => {
    setFormData({
      bankName: "",
      accountNumber: "",
      accountName: "",
      qrCodeImage: "",
      translations: {
        vi: {
          bankName: "",
          accountName: "",
          instructions: "",
        },
        en: {
          bankName: "",
          accountName: "",
          instructions: "",
        },
      },
      isActive: true,
      displayOrder: 0,
    });
    setImagePreview("");
    setIsEditing(false);
    setEditingId(null);
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="admin-payment-qr">
      <div className="page-header">
        <h1>
          <FaQrcode /> Quản Lý Mã QR Thanh Toán
        </h1>
        <button className="btn-add" onClick={() => setIsEditing(true)}>
          <FaPlus /> Thêm Mã QR
        </button>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? "Chỉnh Sửa Mã QR" : "Thêm Mã QR Mới"}</h2>
              <button className="btn-close" onClick={resetForm}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Thông Tin Ngân Hàng</h3>
                <div className="form-group">
                  <label>Tên Ngân Hàng *</label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) =>
                      setFormData({ ...formData, bankName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số Tài Khoản *</label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        accountNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tên Chủ Tài Khoản *</label>
                  <input
                    type="text"
                    value={formData.accountName}
                    onChange={(e) =>
                      setFormData({ ...formData, accountName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Mã QR Code</h3>
                <div className="form-group">
                  <label>
                    <FaImage /> Upload QR Code *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingId}
                  />
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="QR Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h3>Bản Dịch Tiếng Việt</h3>
                <div className="form-group">
                  <label>Tên Ngân Hàng (VI)</label>
                  <input
                    type="text"
                    value={formData.translations.vi.bankName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          vi: {
                            ...formData.translations.vi,
                            bankName: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Tên Chủ TK (VI)</label>
                  <input
                    type="text"
                    value={formData.translations.vi.accountName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          vi: {
                            ...formData.translations.vi,
                            accountName: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Hướng Dẫn (VI)</label>
                  <textarea
                    value={formData.translations.vi.instructions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          vi: {
                            ...formData.translations.vi,
                            instructions: e.target.value,
                          },
                        },
                      })
                    }
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Bản Dịch Tiếng Anh</h3>
                <div className="form-group">
                  <label>Bank Name (EN)</label>
                  <input
                    type="text"
                    value={formData.translations.en.bankName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          en: {
                            ...formData.translations.en,
                            bankName: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Account Name (EN)</label>
                  <input
                    type="text"
                    value={formData.translations.en.accountName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          en: {
                            ...formData.translations.en,
                            accountName: e.target.value,
                          },
                        },
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Instructions (EN)</label>
                  <textarea
                    value={formData.translations.en.instructions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        translations: {
                          ...formData.translations,
                          en: {
                            ...formData.translations.en,
                            instructions: e.target.value,
                          },
                        },
                      })
                    }
                    rows="3"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Cài Đặt</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Thứ Tự Hiển Thị</label>
                    <input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          displayOrder: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isActive: e.target.checked,
                          })
                        }
                      />
                      Kích hoạt
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save">
                  <FaSave /> {editingId ? "Cập Nhật" : "Thêm Mới"}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={resetForm}
                >
                  <FaTimes /> Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="qr-list">
        {paymentQRs.length === 0 ? (
          <div className="empty-state">
            <FaQrcode />
            <p>Chưa có mã QR nào. Thêm mã QR đầu tiên!</p>
          </div>
        ) : (
          <div className="qr-grid">
            {paymentQRs.map((qr) => (
              <div
                key={qr._id}
                className={`qr-card ${!qr.isActive ? "inactive" : ""}`}
              >
                <div className="qr-image">
                  <img src={qr.qrCodeImage} alt={qr.bankName} />
                </div>
                <div className="qr-info">
                  <h3>{qr.bankName}</h3>
                  <p>
                    <strong>STK:</strong> {qr.accountNumber}
                  </p>
                  <p>
                    <strong>Chủ TK:</strong> {qr.accountName}
                  </p>
                  <div className="qr-status">
                    <span
                      className={`badge ${qr.isActive ? "active" : "inactive"}`}
                    >
                      {qr.isActive ? "Kích hoạt" : "Tắt"}
                    </span>
                    <span className="order">Thứ tự: {qr.displayOrder}</span>
                  </div>
                </div>
                <div className="qr-actions">
                  <button
                    className="btn-toggle"
                    onClick={() => toggleActive(qr._id)}
                    title={qr.isActive ? "Tắt" : "Kích hoạt"}
                  >
                    {qr.isActive ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(qr)}
                    title="Chỉnh sửa"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(qr._id)}
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

export default AdminPaymentQR;
