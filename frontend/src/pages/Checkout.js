import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import api from "../services/api";
import axios from "axios";
import "../styles/Checkout.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (!isAuthenticated) {
      alert(t.loginRequired || "Vui lòng đăng nhập để thanh toán!");
      navigate("/login");
    }
  }, [isAuthenticated, navigate, t.loginRequired]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentInfo, setPaymentInfo] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
    transactionId: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState(30000);
  const [estimatedDays, setEstimatedDays] = useState("2-3 ngày");
  const [provinces, setProvinces] = useState([]);

  // Vietnam provinces list
  const vietnamProvinces = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
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
      const response = await axios.get(`${API_URL}/shipping`);
      if (response.data.success) {
        setProvinces(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching shipping rates:", error);
    }
  };

  // Update shipping fee when city changes
  useEffect(() => {
    if (formData.city) {
      calculateShippingFee(formData.city);
    }
  }, [formData.city]);

  const calculateShippingFee = async (city) => {
    try {
      const response = await axios.get(`${API_URL}/shipping/${city}`);
      if (response.data.success) {
        setShippingFee(response.data.data.rate || 30000);
        setEstimatedDays(response.data.data.estimatedDays || "2-3 ngày");
      }
    } catch (error) {
      console.error("Error calculating shipping fee:", error);
      setShippingFee(30000); // Default fee
      setEstimatedDays("2-3 ngày");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.required || "Required field";
    }

    if (!formData.email.trim()) {
      newErrors.email = t.required || "Required field";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail || "Invalid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.required || "Required field";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = t.invalidPhone || "Invalid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = t.required || "Required field";
    }

    if (!formData.city.trim()) {
      newErrors.city = t.required || "Required field";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const total = getCartTotal() + shippingFee;

      const orderData = {
        customerInfo: formData,
        items: cart.map((item) => ({
          productId: item._id,
          productName:
            language === "en" && item.nameEn ? item.nameEn : item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: getCartTotal(),
        shippingFee,
        total,
        paymentMethod,
        paymentInfo:
          paymentMethod === "bank_transfer" ? paymentInfo : undefined,
        status: "pending",
        language: language,
      };

      console.log("📦 Sending order data:", orderData);

      const response = await api.post("/orders", orderData);

      console.log("✅ Order response:", response.data);

      clearCart();
      navigate(`/order-success/${response.data._id}`);
    } catch (error) {
      console.error("Order submission error:", error);
      alert(t.orderError || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const total = getCartTotal() + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart">
            <h2>{t.cartEmpty || "Your cart is empty"}</h2>
            <button
              onClick={() => navigate("/products")}
              className="btn-primary"
            >
              {t.continueShopping || "Continue Shopping"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>{t.checkout || "Checkout"}</h1>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2>{t.shippingInfo || "Shipping Information"}</h2>

              <div className="form-group">
                <label>{t.fullName || "Full Name"} *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? "error" : ""}
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>{t.phone || "Phone"} *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>{t.address || "Address"} *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "error" : ""}
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t.city || "City/Province"} *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? "error" : ""}
                  >
                    <option value="">-- Chọn Tỉnh/Thành phố --</option>
                    {vietnamProvinces.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <span className="error-message">{errors.city}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>{t.district || "District"}</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Nhập quận/huyện"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t.ward || "Ward"}</label>
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  placeholder="Nhập phường/xã"
                />
              </div>

              <div className="form-group">
                <label>{t.notes || "Notes"}</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Ghi chú về đơn hàng (tùy chọn)"
                />
              </div>

              {/* Shipping Fee Display */}
              {formData.city && (
                <div className="shipping-info">
                  <h3>📦 Thông tin vận chuyển</h3>
                  <div className="shipping-details">
                    <div className="shipping-row">
                      <span>Phí vận chuyển đến {formData.city}:</span>
                      <strong className="shipping-fee">
                        {shippingFee.toLocaleString("vi-VN")} ₫
                      </strong>
                    </div>
                    <div className="shipping-row">
                      <span>Thời gian giao hàng dự kiến:</span>
                      <strong className="estimated-time">
                        {estimatedDays}
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              <h2>{t.paymentMethod || "Payment Method"}</h2>

              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-content">
                    <span className="payment-icon">💵</span>
                    <div className="payment-info">
                      <strong>Thanh toán khi nhận hàng (COD)</strong>
                      <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                    </div>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-content">
                    <span className="payment-icon">🏦</span>
                    <div className="payment-info">
                      <strong>Chuyển khoản ngân hàng</strong>
                      <p>Chuyển khoản qua tài khoản ngân hàng</p>
                    </div>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-content">
                    <span className="payment-icon">📱</span>
                    <div className="payment-info">
                      <strong>Ví MoMo</strong>
                      <p>Thanh toán qua ví điện tử MoMo</p>
                    </div>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="vnpay"
                    checked={paymentMethod === "vnpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-content">
                    <span className="payment-icon">💳</span>
                    <div className="payment-info">
                      <strong>VNPay</strong>
                      <p>Thanh toán qua cổng VNPay</p>
                    </div>
                  </div>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="zalopay"
                    checked={paymentMethod === "zalopay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-content">
                    <span className="payment-icon">🔵</span>
                    <div className="payment-info">
                      <strong>ZaloPay</strong>
                      <p>Thanh toán qua ví ZaloPay</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Bank Transfer Info */}
              {paymentMethod === "bank_transfer" && (
                <div className="bank-info-section">
                  <h3>Thông tin chuyển khoản</h3>
                  <div className="bank-details">
                    <p>
                      <strong>Ngân hàng:</strong> Vietcombank
                    </p>
                    <p>
                      <strong>Số tài khoản:</strong> 1234567890
                    </p>
                    <p>
                      <strong>Chủ tài khoản:</strong> CÔNG TY EFT TECHNOLOGY
                    </p>
                    <p>
                      <strong>Nội dung:</strong> Thanh toán đơn hàng [Tên của
                      bạn]
                    </p>
                  </div>
                  <div className="form-group">
                    <label>Mã giao dịch (sau khi chuyển khoản)</label>
                    <input
                      type="text"
                      value={paymentInfo.transactionId}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          transactionId: e.target.value,
                        })
                      }
                      placeholder="Nhập mã giao dịch"
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading
                  ? t.processing || "Processing..."
                  : t.placeOrder || "Place Order"}
              </button>
            </form>
          </div>

          <div className="order-summary-section">
            <div className="order-summary">
              <h2>{t.orderSummary || "Order Summary"}</h2>

              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item._id} className="summary-item">
                    <span className="item-name">
                      {language === "vi"
                        ? item.name_vi
                        : item.name_en || item.name_vi}{" "}
                      x {item.quantity}
                    </span>
                    <span className="item-price">
                      {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>{t.subtotal || "Subtotal"}:</span>
                  <span>{getCartTotal().toLocaleString("vi-VN")} ₫</span>
                </div>
                <div className="summary-row">
                  <span>{t.shipping || "Shipping"}:</span>
                  <span className="shipping-fee-value">
                    {shippingFee.toLocaleString("vi-VN")} ₫
                  </span>
                </div>
                {formData.city && (
                  <div className="summary-note">
                    <small>
                      🚚 Giao hàng đến {formData.city} ({estimatedDays})
                    </small>
                  </div>
                )}
                <div className="summary-row total">
                  <span>{t.total || "Total"}:</span>
                  <span>{total.toLocaleString("vi-VN")} ₫</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
