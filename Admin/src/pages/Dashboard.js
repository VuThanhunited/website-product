import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaMoneyBillWave,
  FaChartLine,
  FaEye,
  FaArrowUp,
} from "react-icons/fa";
import { format, subDays, startOfDay } from "date-fns";
import "./Dashboard.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://website-product-1.onrender.com/api"
    : "http://localhost:5000/api");

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    totalVisitors: 0,
    pendingOrders: 0,
    todayOrders: 0,
    monthRevenue: 0,
    conversionRate: 0,
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7days");

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const [ordersRes, productsRes] = await Promise.all([
        axios.get(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${API_URL}/products`),
      ]);

      const ordersData = Array.isArray(ordersRes.data) ? ordersRes.data : [];
      const productsData = Array.isArray(productsRes.data)
        ? productsRes.data
        : [];

      setOrders(ordersData);

      // Calculate statistics
      const totalRevenue = ordersData.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
      );

      const today = startOfDay(new Date());
      const todayOrders = ordersData.filter(
        (order) => startOfDay(new Date(order.createdAt)) >= today
      ).length;

      const pendingOrders = ordersData.filter(
        (order) => order.status === "pending"
      ).length;

      const thirtyDaysAgo = subDays(new Date(), 30);
      const monthRevenue = ordersData
        .filter((order) => new Date(order.createdAt) >= thirtyDaysAgo)
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      // Simulated visitor data (in real app, track with analytics)
      const totalVisitors = Math.floor(
        ordersData.length * 15 + Math.random() * 100
      );
      const conversionRate =
        ordersData.length > 0
          ? ((ordersData.length / totalVisitors) * 100).toFixed(2)
          : 0;

      setStats({
        totalOrders: ordersData.length,
        totalProducts: productsData.length,
        totalRevenue,
        totalVisitors,
        pendingOrders,
        todayOrders,
        monthRevenue,
        conversionRate,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  // Prepare chart data
  const getOrdersChartData = () => {
    if (!Array.isArray(orders) || orders.length === 0) {
      return [];
    }

    const days = timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90;
    const chartData = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, "MM/dd");
      const dayOrders = orders.filter(
        (order) =>
          order &&
          order.createdAt &&
          format(new Date(order.createdAt), "MM/dd") === dateStr
      );

      chartData.push({
        date: dateStr,
        orders: dayOrders.length,
        revenue:
          dayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0) /
          1000000,
        visitors: Math.floor(Math.random() * 50 + 30),
      });
    }

    return chartData;
  };

  // Order status distribution
  const getOrderStatusData = () => {
    if (!Array.isArray(orders) || orders.length === 0) {
      return [];
    }

    const statusCount = {
      pending: 0,
      confirmed: 0,
      shipping: 0,
      delivered: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      if (order && order.status) {
        statusCount[order.status] = (statusCount[order.status] || 0) + 1;
      }
    });

    return [
      { name: "Chờ xử lý", value: statusCount.pending, color: "#ffc107" },
      { name: "Đã xác nhận", value: statusCount.confirmed, color: "#17a2b8" },
      { name: "Đang giao", value: statusCount.shipping, color: "#007bff" },
      { name: "Đã giao", value: statusCount.delivered, color: "#28a745" },
      { name: "Đã hủy", value: statusCount.cancelled, color: "#dc3545" },
    ].filter((item) => item.value > 0);
  };

  // Top selling products
  const getTopProducts = () => {
    if (!Array.isArray(orders) || orders.length === 0) {
      return [];
    }

    const productSales = {};

    orders.forEach((order) => {
      if (order && Array.isArray(order.items)) {
        order.items.forEach((item) => {
          if (item && item.productId) {
            const productId = item.productId._id || item.productId;
            const productName = item.productId.name || "Unknown";

            if (!productSales[productId]) {
              productSales[productId] = {
                name: productName,
                quantity: 0,
                revenue: 0,
              };
            }

            productSales[productId].quantity += item.quantity || 0;
            productSales[productId].revenue +=
              (item.price || 0) * (item.quantity || 0);
          }
        });
      }
    });

    return Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map((product) => ({
        name:
          product.name.length > 20
            ? product.name.substring(0, 20) + "..."
            : product.name,
        quantity: product.quantity,
        revenue: product.revenue / 1000000,
      }));
  };

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) {
      return "0 ₫";
    }
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const chartData = getOrdersChartData();
  const statusData = getOrderStatusData();
  const topProducts = getTopProducts();

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu thống kê...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>📊 Dashboard</h1>
          <p className="dashboard-subtitle">Tổng quan hoạt động kinh doanh</p>
        </div>
        <div className="time-range-selector">
          <button
            className={timeRange === "7days" ? "active" : ""}
            onClick={() => setTimeRange("7days")}
          >
            7 ngày
          </button>
          <button
            className={timeRange === "30days" ? "active" : ""}
            onClick={() => setTimeRange("30days")}
          >
            30 ngày
          </button>
          <button
            className={timeRange === "90days" ? "active" : ""}
            onClick={() => setTimeRange("90days")}
          >
            90 ngày
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card gradient-blue">
          <div className="stat-icon">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <div className="stat-label">Tổng Đơn Hàng</div>
            <div className="stat-value">{stats.totalOrders}</div>
            <div className="stat-change positive">
              <FaArrowUp /> {stats.todayOrders} hôm nay
            </div>
          </div>
        </div>

        <div className="stat-card gradient-green">
          <div className="stat-icon">
            <FaMoneyBillWave />
          </div>
          <div className="stat-content">
            <div className="stat-label">Tổng Doanh Thu</div>
            <div className="stat-value">
              {(stats.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="stat-change positive">
              <FaArrowUp /> {(stats.monthRevenue / 1000000).toFixed(1)}M tháng
              này
            </div>
          </div>
        </div>

        <div className="stat-card gradient-purple">
          <div className="stat-icon">
            <FaBoxOpen />
          </div>
          <div className="stat-content">
            <div className="stat-label">Sản Phẩm</div>
            <div className="stat-value">{stats.totalProducts}</div>
            <div className="stat-change">
              {stats.pendingOrders} đơn chờ xử lý
            </div>
          </div>
        </div>

        <div className="stat-card gradient-orange">
          <div className="stat-icon">
            <FaEye />
          </div>
          <div className="stat-content">
            <div className="stat-label">Lượt Truy Cập</div>
            <div className="stat-value">{stats.totalVisitors}</div>
            <div className="stat-change positive">
              <FaChartLine /> {stats.conversionRate}% chuyển đổi
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row">
        <div className="chart-card large">
          <div className="chart-header">
            <h3>📈 Doanh Thu & Đơn Hàng</h3>
            <span className="chart-subtitle">Theo ngày</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#28a745" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#28a745" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis yAxisId="left" stroke="#666" />
              <YAxis yAxisId="right" orientation="right" stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#667eea"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Doanh thu (triệu)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#28a745"
                fillOpacity={1}
                fill="url(#colorOrders)"
                name="Đơn hàng"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>🎯 Trạng Thái Đơn Hàng</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-row">
        <div className="chart-card large">
          <div className="chart-header">
            <h3>🏆 Top 5 Sản Phẩm Bán Chạy</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Bar
                dataKey="quantity"
                fill="#667eea"
                name="Số lượng bán"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="revenue"
                fill="#28a745"
                name="Doanh thu (triệu)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>👥 Lượt Truy Cập</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#ff6b6b"
                strokeWidth={3}
                name="Số người truy cập"
                dot={{ fill: "#ff6b6b", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="recent-orders">
        <div className="chart-header">
          <h3>🕒 Đơn Hàng Gần Đây</h3>
        </div>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Mã ĐH</th>
                <th>Khách Hàng</th>
                <th>Sản Phẩm</th>
                <th>Tổng Tiền</th>
                <th>Trạng Thái</th>
                <th>Ngày Đặt</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((order) => (
                <tr key={order._id}>
                  <td>
                    <code>#{order._id?.slice(-8)}</code>
                  </td>
                  <td>{order.customerName}</td>
                  <td>{order.items?.length || 0} sản phẩm</td>
                  <td className="amount">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {order.status === "pending" && "Chờ xử lý"}
                      {order.status === "confirmed" && "Đã xác nhận"}
                      {order.status === "shipping" && "Đang giao"}
                      {order.status === "delivered" && "Đã giao"}
                      {order.status === "cancelled" && "Đã hủy"}
                    </span>
                  </td>
                  <td>
                    {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
