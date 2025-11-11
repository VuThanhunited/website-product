import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { getCompanyInfo } from "../services/api";
import "../styles/Header.css";

const Header = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className="header">
      <div
        className="top-section"
        style={{
          backgroundColor: companyInfo?.topSectionBgColor,
          backgroundImage: companyInfo?.topSectionBg
            ? `url(${companyInfo.topSectionBg})`
            : "none",
        }}
      >
        <div className="container">
          <div className="top-content">
            <Link to="/" className="logo-section">
              {companyInfo?.logo && (
                <img src={companyInfo.logo} alt="Logo" className="logo" />
              )}
              <h1 className="company-name">
                {companyInfo?.companyName || "Company Name"}
              </h1>
            </Link>
            <div className="header-right">
              <div className="contact-info">
                <p className="address">{companyInfo?.address}</p>
                <p className="phone">{companyInfo?.phone}</p>
              </div>
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
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                TRANG CHỦ
              </Link>
            </li>
            <li>
              <Link to="/company" onClick={() => setMenuOpen(false)}>
                CÔNG TY
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setMenuOpen(false)}>
                SẢN PHẨM
              </Link>
            </li>
            <li>
              <Link to="/support" onClick={() => setMenuOpen(false)}>
                HỖ TRỢ
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                LIÊN HỆ
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
