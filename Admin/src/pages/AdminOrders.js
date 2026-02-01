import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaShoppingCart,
  FaEye,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import "./AdminOrders.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://website-product-1.onrender.com/api"
    : "http://localhost:5000/api");

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, statusFilter, searchTerm]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Backend returns { success: true, data: orders }
      let ordersData = [];

      if (Array.isArray(response.data)) {
        ordersData = response.data;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        ordersData = response.data.data;
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        ordersData = response.data.orders;
      }

      // Ensure ordersData is an array before sorting
      if (Array.isArray(ordersData)) {
        setOrders(
          ordersData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } else {
        setOrders([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setMessage("Lỗi khi tải đơn hàng");
      setOrders([]);
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.customerInfo?.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.customerInfo?.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.customerInfo?.phone?.includes(searchTerm) ||
          order._id?.includes(searchTerm)
      );
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_URL}/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("✅ Cập nhật trạng thái đơn hàng thành công!");
      fetchOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error updating order:", error);
      setMessage("❌ Lỗi khi cập nhật đơn hàng");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "Chờ xử lý", class: "status-pending" },
      confirmed: { label: "Đã xác nhận", class: "status-confirmed" },
      shipping: { label: "Đang giao", class: "status-shipping" },
      delivered: { label: "Đã giao", class: "status-delivered" },
      cancelled: { label: "Đã hủy", class: "status-cancelled" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`status-badge ${config.class}`}>{config.label}</span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("vi-VN");
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-orders">
      <div className="admin-header">
        <h1>
          <FaShoppingCart /> Quản Lý Đơn Hàng
        </h1>
        <div className="order-stats">
          <div className="stat-card">
            <div className="stat-value">{orders.length}</div>
            <div className="stat-label">Tổng đơn</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {orders.filter((o) => o.status === "pending").length}
            </div>
            <div className="stat-label">Chờ xử lý</div>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`alert ${message.includes("✅") ? "success" : "error"}`}
        >
          {message}
        </div>
      )}

      <div className="filters-section">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, số điện thoại, mã đơn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <FaFilter />
          <button
            className={statusFilter === "all" ? "active" : ""}
            onClick={() => setStatusFilter("all")}
          >
            Tất cả
          </button>
          <button
            className={statusFilter === "pending" ? "active" : ""}
            onClick={() => setStatusFilter("pending")}
          >
            Chờ xử lý
          </button>
          <button
            className={statusFilter === "confirmed" ? "active" : ""}
            onClick={() => setStatusFilter("confirmed")}
          >
            Đã xác nhận
          </button>
          <button
            className={statusFilter === "shipping" ? "active" : ""}
            onClick={() => setStatusFilter("shipping")}
          >
            Đang giao
          </button>
          <button
            className={statusFilter === "delivered" ? "active" : ""}
            onClick={() => setStatusFilter("delivered")}
          >
            Đã giao
          </button>
        </div>
      </div>

      <div className="orders-container">
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <p>Không tìm thấy đơn hàng nào</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className={`order-card ${
                  selectedOrder && selectedOrder._id === order._id
                    ? "active"
                    : ""
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="order-header">
                  <div className="order-id">#{order._id?.slice(-8)}</div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="order-info">
                  <div className="customer-name">
                    {order.customerInfo?.fullName}
                  </div>
                  <div className="order-date">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    {formatCurrency(order.total || 0)}
                  </div>
                  <button className="btn-view">
                    <FaEye /> Xem chi tiết
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedOrder && (
          <div className="order-detail">
            <div className="detail-header">
              <h2>Chi Tiết Đơn Hàng</h2>
              <button
                className="btn-close"
                onClick={() => setSelectedOrder(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="detail-section">
              <h3>Thông tin khách hàng</h3>
              <div className="info-grid">
                <div className="info-item">
                  <label>Họ tên:</label>
                  <span>{selectedOrder.customerInfo?.fullName}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{selectedOrder.customerInfo?.email}</span>
                </div>
                <div className="info-item">
                  <label>Số điện thoại:</label>
                  <span>{selectedOrder.customerInfo?.phone}</span>
                </div>
                <div className="info-item full-width">
                  <label>Địa chỉ:</label>
                  <span>
                    {selectedOrder.customerInfo?.address},{" "}
                    {selectedOrder.customerInfo?.ward},{" "}
                    {selectedOrder.customerInfo?.district},{" "}
                    {selectedOrder.customerInfo?.city}
                  </span>
                </div>
                {selectedOrder.customerInfo?.notes && (
                  <div className="info-item full-width">
                    <label>Ghi chú:</label>
                    <span>{selectedOrder.customerInfo?.notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h3>Sản phẩm đặt hàng</h3>
              <div className="products-list">
                {selectedOrder.items?.map((item, index) => (
                  <div key={index} className="product-item">
                    <img
                      src={item.productId?.imageUrl || "/placeholder.png"}
                      alt={item.productId?.name}
                    />
                    <div className="product-info">
                      <div className="product-name">
                        {item.productId?.name || "Sản phẩm đã xóa"}
                      </div>
                      <div className="product-quantity">
                        Số lượng: {item.quantity}
                      </div>
                    </div>
                    <div className="product-price">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-summary">
                <div className="summary-row">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(selectedOrder.subtotal || 0)}</span>
                </div>
                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span>{formatCurrency(selectedOrder.shippingFee || 0)}</span>
                </div>
                <div className="summary-row total">
                  <strong>Tổng cộng:</strong>
                  <strong>{formatCurrency(selectedOrder.total || 0)}</strong>
                </div>
                <div className="summary-row">
                  <span>Phương thức thanh toán:</span>
                  <span>
                    {selectedOrder.paymentMethod === "cod"
                      ? "Thanh toán khi nhận hàng"
                      : selectedOrder.paymentMethod === "bank"
                      ? "Chuyển khoản"
                      : "MoMo"}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Trạng thái thanh toán:</span>
                  <span
                    className={selectedOrder.paidStatus ? "paid" : "unpaid"}
                  >
                    {selectedOrder.paidStatus
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Trạng thái đơn hàng</h3>
              <div className="status-actions">
                <button
                  className="btn-status confirmed"
                  onClick={() =>
                    updateOrderStatus(selectedOrder._id, "confirmed")
                  }
                  disabled={selectedOrder.status === "confirmed"}
                >
                  <FaCheck /> Xác nhận
                </button>
                <button
                  className="btn-status shipping"
                  onClick={() =>
                    updateOrderStatus(selectedOrder._id, "shipping")
                  }
                  disabled={selectedOrder.status === "shipping"}
                >
                  <FaShoppingCart /> Đang giao
                </button>
                <button
                  className="btn-status delivered"
                  onClick={() =>
                    updateOrderStatus(selectedOrder._id, "delivered")
                  }
                  disabled={selectedOrder.status === "delivered"}
                >
                  <FaCheck /> Đã giao
                </button>
                <button
                  className="btn-status cancelled"
                  onClick={() =>
                    updateOrderStatus(selectedOrder._id, "cancelled")
                  }
                  disabled={selectedOrder.status === "cancelled"}
                >
                  <FaTimes /> Hủy đơn
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
