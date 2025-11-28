import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";
import api from "../services/api";
import "../styles/Payment.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Get data from checkout page
    if (!location.state) {
      navigate("/checkout");
      return;
    }

    const { paymentMethod: method, orderData: data } = location.state;
    setPaymentMethod(method);
    setOrderData(data);
  }, [location, navigate]);

  const handleCODPayment = async () => {
    setLoading(true);
    try {
      const response = await api.post("/orders", orderData);
      clearCart();
      navigate(`/order-success/${response.data._id}`);
    } catch (error) {
      console.error("Order error:", error);
      alert("Đặt hàng thất bại. Vui lòng thử lại!");
      setLoading(false);
    }
  };

  const handleBankTransferPayment = async () => {
    setLoading(true);
    try {
      const response = await api.post("/orders", orderData);
      clearCart();
      navigate(`/order-success/${response.data._id}`);
    } catch (error) {
      console.error("Order error:", error);
      alert("Đặt hàng thất bại. Vui lòng thử lại!");
      setLoading(false);
    }
  };

  if (!paymentMethod || !orderData) {
    return (
      <div className="payment-page">
        <div className="container">
          <div className="loading">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-container">
          <h1>🔒 Thanh Toán An Toàn</h1>

          {/* COD Payment */}
          {paymentMethod.code === "cod" && (
            <div className="payment-method-details">
              <div className="payment-icon-large">{paymentMethod.icon}</div>
              <h2>{paymentMethod.name}</h2>
              <p className="payment-description">{paymentMethod.description}</p>

              <div className="order-summary">
                <h3>📋 Thông Tin Đơn Hàng</h3>
                <div className="summary-row">
                  <span>Tổng giá trị sản phẩm:</span>
                  <strong>
                    {orderData.subtotal.toLocaleString("vi-VN")} ₫
                  </strong>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <strong>
                    {orderData.shippingFee.toLocaleString("vi-VN")} ₫
                  </strong>
                </div>
                <div className="summary-row total">
                  <span>Tổng thanh toán:</span>
                  <strong className="total-amount">
                    {orderData.total.toLocaleString("vi-VN")} ₫
                  </strong>
                </div>
              </div>

              <div className="payment-instructions">
                <h4>📝 Hướng dẫn thanh toán:</h4>
                <ul>
                  <li>✓ Kiểm tra sản phẩm trước khi thanh toán</li>
                  <li>✓ Thanh toán bằng tiền mặt cho nhân viên giao hàng</li>
                  <li>✓ Nhận hóa đơn VAT (nếu có yêu cầu)</li>
                  <li>✓ Giữ lại phiếu giao hàng để đối chiếu</li>
                </ul>
              </div>

              <button
                className="btn-confirm-payment"
                onClick={handleCODPayment}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Xác Nhận Đặt Hàng"}
              </button>
            </div>
          )}

          {/* Bank Transfer Payment */}
          {paymentMethod.code === "bank_transfer" && paymentMethod.config && (
            <div className="payment-method-details">
              <div className="payment-icon-large">{paymentMethod.icon}</div>
              <h2>{paymentMethod.name}</h2>
              <p className="payment-description">{paymentMethod.description}</p>

              <div className="bank-info-card">
                <h3>🏦 Thông Tin Chuyển Khoản</h3>
                <div className="bank-detail">
                  <span className="label">Ngân hàng:</span>
                  <strong>{paymentMethod.config.bankName}</strong>
                </div>
                <div className="bank-detail">
                  <span className="label">Số tài khoản:</span>
                  <strong className="account-number">
                    {paymentMethod.config.accountNumber}
                  </strong>
                  <button
                    className="btn-copy"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        paymentMethod.config.accountNumber
                      );
                      alert("Đã sao chép số tài khoản!");
                    }}
                  >
                    📋 Sao chép
                  </button>
                </div>
                <div className="bank-detail">
                  <span className="label">Chủ tài khoản:</span>
                  <strong>{paymentMethod.config.accountName}</strong>
                </div>
                <div className="bank-detail">
                  <span className="label">Số tiền:</span>
                  <strong className="transfer-amount">
                    {orderData.total.toLocaleString("vi-VN")} ₫
                  </strong>
                  <button
                    className="btn-copy"
                    onClick={() => {
                      navigator.clipboard.writeText(orderData.total.toString());
                      alert("Đã sao chép số tiền!");
                    }}
                  >
                    📋 Sao chép
                  </button>
                </div>
                <div className="bank-detail">
                  <span className="label">Nội dung chuyển khoản:</span>
                  <strong className="transfer-content">
                    {orderData.customerInfo.phone}{" "}
                    {orderData.customerInfo.fullName}
                  </strong>
                  <button
                    className="btn-copy"
                    onClick={() => {
                      const content = `${orderData.customerInfo.phone} ${orderData.customerInfo.fullName}`;
                      navigator.clipboard.writeText(content);
                      alert("Đã sao chép nội dung chuyển khoản!");
                    }}
                  >
                    📋 Sao chép
                  </button>
                </div>
              </div>

              <div className="payment-instructions">
                <h4>📝 Hướng dẫn thanh toán:</h4>
                <ul>
                  <li>✓ Chuyển khoản đúng số tiền và nội dung phía trên</li>
                  <li>
                    ✓ Đơn hàng sẽ được xử lý sau khi xác nhận chuyển khoản
                  </li>
                  <li>✓ Thời gian xác nhận: trong vòng 1-2 giờ</li>
                  <li>✓ Liên hệ hotline nếu cần hỗ trợ</li>
                </ul>
              </div>

              <button
                className="btn-confirm-payment"
                onClick={handleBankTransferPayment}
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Tôi Đã Chuyển Khoản"}
              </button>
            </div>
          )}

          <button className="btn-back" onClick={() => navigate("/checkout")}>
            ← Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
