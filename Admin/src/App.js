import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
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
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import "./App.css";

// Import AdminLogin không lazy
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";

// Lazy load các component
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

const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px', color: '#667eea' }}>
    <div>⏳ Đang tải...</div>
  </div>
);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("adminUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setUser(null);
    window.location.href = "/login";
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <AdminLogin onLoginSuccess={handleLoginSuccess} />} />
        
        <Route path="/*" element={
          <PrivateRoute>
            <div className="admin-app">
              <aside className="admin-sidebar">
                <div className="sidebar-header">
                  <h2>🛒 Admin Panel</h2>
                  {user && <div className="user-info"><FaUser /> {user.username}</div>}
                </div>
                <nav className="sidebar-nav">
                  <Link to="/" className="nav-item"><FaChartLine /> Dashboard</Link>
                  <Link to="/products" className="nav-item"><FaBoxOpen /> Quản Lý Sản Phẩm</Link>
                  <Link to="/categories" className="nav-item"><FaTags /> Quản Lý Danh Mục</Link>
                  <Link to="/orders" className="nav-item"><FaShoppingCart /> Quản Lý Đơn Hàng</Link>
                  <Link to="/media" className="nav-item"><FaImages /> Quản Lý Media</Link>
                  <Link to="/slogans" className="nav-item"><FaCommentDots /> Quản Lý Slogan</Link>
                  <Link to="/company" className="nav-item"><FaBuilding /> Thông Tin Công Ty</Link>
                  <Link to="/partners" className="nav-item"><FaHandshake /> Quản Lý Đối Tác</Link>
                  <Link to="/support" className="nav-item"><FaQuestionCircle /> Bài Viết Hỗ Trợ</Link>
                  <Link to="/messages" className="nav-item"><FaEnvelope /> Tin Nhắn</Link>
                  <button onClick={handleLogout} className="nav-item logout-btn"><FaSignOutAlt /> Đăng xuất</button>
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
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
