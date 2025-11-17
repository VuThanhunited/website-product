import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import axios from "axios";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { language } = useLanguage();
  const t = translations[language];
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t.loadingText || "Đang tải..."}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-success-page">
        <div className="container">
          <div className="order-not-found">
            <h2>{t.orderNotFound || "Không tìm thấy đơn hàng"}</h2>
            <Link to="/" className="btn-primary">
              {t.home || "Về trang chủ"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-content">
          <FaCheckCircle className="success-icon" />
          <h1>{t.orderSuccess || "Đặt hàng thành công!"}</h1>
          <p className="success-message">
            {t.orderSuccessMessage ||
              "Cảm ơn bạn đã đặt hàng. Chúng tôi đã gửi email xác nhận đến địa chỉ của bạn."}
          </p>
          <p className="email-notice">
            📧 {t.checkEmail || "Vui lòng kiểm tra email"}{" "}
            <strong>{order.customerInfo?.email}</strong>{" "}
            {t.forOrderDetails || "để xem chi tiết đơn hàng"}
          </p>

          <div className="order-info">
            <h2>{t.orderDetails || "Thông tin đơn hàng"}</h2>

            <div className="info-row">
              <span className="info-label">
                {t.orderNumber || "Mã đơn hàng"}:
              </span>
              <span className="info-value">{order.orderNumber}</span>
            </div>

            <div className="info-row">
              <span className="info-label">{t.orderDate || "Ngày đặt"}:</span>
              <span className="info-value">
                {new Date(order.createdAt).toLocaleDateString(
                  language === "vi" ? "vi-VN" : "en-US"
                )}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">{t.status || "Trạng thái"}:</span>
              <span className="info-value status-pending">
                {t.orderPending || "Đang xử lý"}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">
                {t.paymentMethod || "Phương thức thanh toán"}:
              </span>
              <span className="info-value">
                {order.paymentMethod === "cod"
                  ? t.cod || "COD"
                  : order.paymentMethod === "bank"
                  ? t.bankTransfer || "Chuyển khoản"
                  : t.momo || "MoMo"}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">{t.total || "Tổng tiền"}:</span>
              <span className="info-value total-amount">
                {order.total.toLocaleString("vi-VN")} ₫
              </span>
            </div>
          </div>

          <div className="customer-info">
            <h3>{t.shippingInfo || "Thông tin giao hàng"}</h3>
            <p>
              <strong>{t.fullName || "Họ tên"}:</strong>{" "}
              {order.customerInfo.fullName}
            </p>
            <p>
              <strong>{t.phone || "Điện thoại"}:</strong>{" "}
              {order.customerInfo.phone}
            </p>
            <p>
              <strong>Email:</strong> {order.customerInfo.email}
            </p>
            <p>
              <strong>{t.address || "Địa chỉ"}:</strong>{" "}
              {order.customerInfo.address}, {order.customerInfo.ward},{" "}
              {order.customerInfo.district}, {order.customerInfo.city}
            </p>
            {order.customerInfo.notes && (
              <p>
                <strong>{t.notes || "Ghi chú"}:</strong>{" "}
                {order.customerInfo.notes}
              </p>
            )}
          </div>

          <div className="order-items">
            <h3>{t.orderItems || "Sản phẩm đã đặt"}</h3>
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <span className="item-name">{item.productName}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">
                  {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                </span>
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <Link to="/" className="btn-secondary">
              {t.home || "Về trang chủ"}
            </Link>
            <Link to="/products" className="btn-primary">
              {t.continueShopping || "Tiếp tục mua sắm"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
