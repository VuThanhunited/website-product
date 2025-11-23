import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaTags,
  FaImages,
  FaEnvelope,
  FaQuestionCircle,
  FaBuilding,
  FaCommentDots,
  FaShoppingCart,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";
import "./App.css";

// Lazy load các component để tăng tốc độ load ban đầu
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));
const AdminCategories = lazy(() => import("./pages/AdminCategories"));
const AdminMedia = lazy(() => import("./pages/AdminMedia"));
const AdminMessages = lazy(() => import("./pages/AdminMessages"));
const AdminSupport = lazy(() => import("./pages/AdminSupport"));
const AdminCompany = lazy(() => import("./pages/AdminCompany"));
const AdminSlogans = lazy(() => import("./pages/AdminSlogans"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const AdminPartners = lazy(() => import("./pages/AdminPartners"));

// Loading component
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "24px",
      color: "#667eea",
    }}
  >
    <div>⏳ Đang tải...</div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="admin-app">
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2>🛒 Admin Panel</h2>
          </div>
          <nav className="sidebar-nav">
            <Link to="/" className="nav-item">
              <FaChartLine /> Dashboard
            </Link>
            <Link to="/products" className="nav-item">
              <FaBoxOpen /> Quản Lý Sản Phẩm
            </Link>
            <Link to="/categories" className="nav-item">
              <FaTags /> Quản Lý Danh Mục
            </Link>
            <Link to="/orders" className="nav-item">
              <FaShoppingCart /> Quản Lý Đơn Hàng
            </Link>
            <Link to="/media" className="nav-item">
              <FaImages /> Quản Lý Media
            </Link>
            <Link to="/slogans" className="nav-item">
              <FaCommentDots /> Quản Lý Slogan
            </Link>
            <Link to="/company" className="nav-item">
              <FaBuilding /> Thông Tin Công Ty
            </Link>
            <Link to="/partners" className="nav-item">
              <FaHandshake /> Quản Lý Đối Tác
            </Link>
            <Link to="/support" className="nav-item">
              <FaQuestionCircle /> Bài Viết Hỗ Trợ
            </Link>
            <Link to="/messages" className="nav-item">
              <FaEnvelope /> Tin Nhắn
            </Link>
          </nav>
        </aside>

        <main className="admin-main">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<AdminProducts />} />
              <Route path="/categories" element={<AdminCategories />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/media" element={<AdminMedia />} />
              <Route path="/slogans" element={<AdminSlogans />} />
              <Route path="/company" element={<AdminCompany />} />
              <Route path="/support" element={<AdminSupport />} />
              <Route path="/messages" element={<AdminMessages />} />
              <Route path="/partners" element={<AdminPartners />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
