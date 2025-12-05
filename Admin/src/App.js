import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
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
  FaUsersCog,
  FaTruck,
  FaMoneyBillWave,
  FaQrcode,
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
const AdminTechArticles = lazy(() => import("./pages/AdminTechArticles"));
const AdminCompany = lazy(() => import("./pages/AdminCompany"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const AdminPartners = lazy(() => import("./pages/AdminPartners"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminShipping = lazy(() => import("./pages/AdminShipping"));
const AdminPaymentMethods = lazy(() => import("./pages/AdminPaymentMethods"));
const AdminPaymentQR = lazy(() => import("./pages/AdminPaymentQR"));
const AdminHomeContent = lazy(() => import("./pages/AdminHomeContent"));
const AdminCompanyContent = lazy(() => import("./pages/AdminCompanyContent"));

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
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("adminUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Call logout API to clear backend cookie
      const token = localStorage.getItem("adminToken");
      if (token) {
        await fetch(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5000/api"
          }/auth/logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        ).catch((err) => console.error("Logout API error:", err));
      }

      // Clear local storage
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      setUser(null);
      setShowLogoutModal(false);

      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Still logout even if API fails
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      setUser(null);
      window.location.href = "/login";
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <AdminLogin onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="admin-app">
                <aside className="admin-sidebar">
                  <div className="sidebar-header">
                    <h2>🛒 Admin Panel</h2>
                    {user && (
                      <div className="user-info">
                        <FaUser /> {user.username}
                      </div>
                    )}
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
                    <Link to="/shipping" className="nav-item">
                      <FaTruck /> Phí Vận Chuyển
                    </Link>
                    <Link to="/payment-methods" className="nav-item">
                      <FaMoneyBillWave /> Phương Thức Thanh Toán
                    </Link>
                    <Link to="/payment-qr" className="nav-item">
                      <FaQrcode /> Mã QR Thanh Toán
                    </Link>
                    <Link to="/users" className="nav-item">
                      <FaUsersCog /> Quản Lý Tài Khoản
                    </Link>
                    <Link to="/media" className="nav-item">
                      <FaImages /> Quản Lý Media
                    </Link>
                    <Link to="/home-content" className="nav-item">
                      <FaImages /> Quản Lý Nội Dung Trang Chủ
                    </Link>
                    <Link to="/company" className="nav-item">
                      <FaBuilding /> Thông Tin Công Ty
                    </Link>
                    <Link to="/company-content" className="nav-item">
                      <FaBuilding /> Nội Dung Trang Công Ty
                    </Link>
                    <Link to="/partners" className="nav-item">
                      <FaHandshake /> Quản Lý Đối Tác
                    </Link>
                    <Link to="/support" className="nav-item">
                      <FaQuestionCircle /> Bài Viết Hỗ Trợ
                    </Link>
                    <Link to="/tech-articles" className="nav-item">
                      <FaQuestionCircle /> Bài Viết Công Nghệ
                    </Link>
                    <Link to="/messages" className="nav-item">
                      <FaEnvelope /> Tin Nhắn
                    </Link>
                    <button
                      onClick={handleLogoutClick}
                      className="nav-item logout-btn"
                    >
                      <FaSignOutAlt /> Đăng xuất
                    </button>
                  </nav>
                </aside>

                <main className="admin-main">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/products" element={<AdminProducts />} />
                      <Route path="/categories" element={<AdminCategories />} />
                      <Route path="/orders" element={<AdminOrders />} />
                      <Route path="/shipping" element={<AdminShipping />} />
                      <Route
                        path="/payment-methods"
                        element={<AdminPaymentMethods />}
                      />
                      <Route path="/payment-qr" element={<AdminPaymentQR />} />
                      <Route path="/users" element={<AdminUsers />} />
                      <Route path="/media" element={<AdminMedia />} />
                      <Route path="/support" element={<AdminSupport />} />
                      <Route
                        path="/tech-articles"
                        element={<AdminTechArticles />}
                      />
                      <Route path="/company" element={<AdminCompany />} />
                      <Route
                        path="/home-content"
                        element={<AdminHomeContent />}
                      />
                      <Route
                        path="/company-content"
                        element={<AdminCompanyContent />}
                      />
                      <Route path="/support" element={<AdminSupport />} />
                      <Route path="/messages" element={<AdminMessages />} />
                      <Route path="/partners" element={<AdminPartners />} />
                    </Routes>
                  </Suspense>
                </main>

                {/* Logout Confirmation Modal */}
                {showLogoutModal && (
                  <div className="modal-overlay" onClick={handleCancelLogout}>
                    <div
                      className="logout-modal"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="logout-modal-header">
                        <FaSignOutAlt className="logout-icon" />
                        <h2>Xác Nhận Đăng Xuất</h2>
                      </div>
                      <p>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?</p>
                      <div className="logout-modal-actions">
                        <button
                          className="btn-cancel"
                          onClick={handleCancelLogout}
                          disabled={isLoggingOut}
                        >
                          Hủy
                        </button>
                        <button
                          className="btn-logout"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                        >
                          {isLoggingOut ? "Đang đăng xuất..." : "Đăng Xuất"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
