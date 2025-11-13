import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaTags,
  FaImages,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminMedia from "./pages/AdminMedia";
import AdminMessages from "./pages/AdminMessages";
import AdminSupport from "./pages/AdminSupport";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="admin-app">
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h2>🛒 Admin Panel</h2>
          </div>
          <nav className="sidebar-nav">
            <Link to="/products" className="nav-item">
              <FaBoxOpen /> Quản Lý Sản Phẩm
            </Link>
            <Link to="/categories" className="nav-item">
              <FaTags /> Quản Lý Danh Mục
            </Link>
            <Link to="/media" className="nav-item">
              <FaImages /> Quản Lý Media
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
          <Routes>
            <Route path="/" element={<AdminProducts />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/media" element={<AdminMedia />} />
            <Route path="/support" element={<AdminSupport />} />
            <Route path="/messages" element={<AdminMessages />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
