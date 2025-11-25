import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import api from "../services/api";
import "../styles/Checkout.css";

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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      const shippingFee = getCartTotal() >= 500000 ? 0 : 30000;
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

  const shippingFee = getCartTotal() >= 500000 ? 0 : 30000;
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
                  <label>{t.city || "City"} *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? "error" : ""}
                  />
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
                />
              </div>

              <div className="form-group">
                <label>{t.notes || "Notes"}</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

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
                  <span>{t.cod || "Cash on Delivery (COD)"}</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{t.bankTransfer || "Bank Transfer"}</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="momo"
                    checked={paymentMethod === "momo"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{t.momo || "MoMo Wallet"}</span>
                </label>
              </div>

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
                  <span>
                    {shippingFee === 0
                      ? t.free || "Free"
                      : `${shippingFee.toLocaleString("vi-VN")} ₫`}
                  </span>
                </div>
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
