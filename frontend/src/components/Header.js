import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUserPlus,
  FaGlobe,
  FaSignOutAlt,
} from "react-icons/fa";
import { getCompanyInfo } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { translations } from "../utils/translations";
import logoImage from "../assets/logo.png";
import "../styles/Header.css";

const Header = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const { getCartCount, clearCart, setIsLoggedIn } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const t = translations[language];

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await getCompanyInfo();
      setCompanyInfo(response.data);
    } catch (error) {
      console.error("Error fetching company info:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    if (window.confirm(t.confirmLogout || "Bạn có chắc muốn đăng xuất?")) {
      await logout();
      setIsLoggedIn(false);
      clearCart(); // Clear cart on logout
      alert(t.logoutSuccess);
      navigate("/");
    }
  };

  const menuItems =
    language === "vi"
      ? ["TRANG CHỦ", "CÔNG TY", "SẢN PHẨM", "HỖ TRỢ", "LIÊN HỆ"]
      : ["HOME", "COMPANY", "PRODUCTS", "SUPPORT", "CONTACT"];

  const menuLinks = ["/", "/company", "/products", "/support", "/contact"];

  return (
    <header className="header">
      <div
        className="top-section"
        style={{
          background: companyInfo?.headerBgColor
            ? companyInfo.headerBgColor
            : "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      >
        <div className="container">
          <div className="top-content">
            {/* Bên trái - Logo, địa chỉ, số điện thoại */}
            <div className="header-left">
              <Link to="/" className="logo-section">
                <img
                  src={logoImage}
                  alt={companyInfo?.companyName || "EFT Technology"}
                  className="logo"
                />
              </Link>
              <div className="company-details">
                <p className="address">📍 {companyInfo?.address}</p>
                <p className="phone">📞 {companyInfo?.phone}</p>
              </div>
            </div>

            {/* Bên phải - Tìm kiếm, giỏ hàng, đăng nhập, đăng ký, ngôn ngữ */}
            <div className="header-right">
              {/* Thanh tìm kiếm */}
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder={t.searchProducts}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <FaSearch />
                </button>
              </form>

              {/* Giỏ hàng */}
              <Link to="/cart" className="header-icon cart-icon">
                <FaShoppingCart />
                {getCartCount() > 0 && (
                  <span className="cart-badge">{getCartCount()}</span>
                )}
              </Link>

              {/* Đăng nhập/Đăng xuất */}
              {isAuthenticated && user ? (
                <>
                  <Link to="/profile" className="user-info" title={user.email}>
                    <FaUser /> <span>{user.username}</span>
                  </Link>
                  <button
                    className="header-icon logout-icon"
                    onClick={handleLogout}
                    title={t.logout}
                  >
                    <FaSignOutAlt />
                  </button>
                </>
              ) : (
                <>
                  {/* Đăng nhập */}
                  <Link
                    to="/login"
                    className="header-icon login-icon"
                    title={t.login}
                  >
                    <FaUser />
                  </Link>

                  {/* Đăng ký */}
                  <Link
                    to="/register"
                    className="header-icon register-icon"
                    title={t.register}
                  >
                    <FaUserPlus />
                  </Link>
                </>
              )}

              {/* Chuyển đổi ngôn ngữ */}
              <button
                className="language-toggle"
                onClick={toggleLanguage}
                title={language === "vi" ? "English" : "Tiếng Việt"}
              >
                <FaGlobe />
                <span>{language === "vi" ? "EN" : "VI"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={menuLinks[index]} onClick={() => setMenuOpen(false)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
