import React, { useState, useEffect } from "react";
import { FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { getCompanyInfo } from "../services/api";
import "../styles/Footer.css";

const Footer = () => {
  const [companyInfo, setCompanyInfo] = useState(null);

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

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{companyInfo?.companyName || "Công ty"}</h3>
            <p>{companyInfo?.address}</p>
            <p>Điện thoại: {companyInfo?.phone}</p>
            <p>Email: {companyInfo?.email}</p>
          </div>

          <div className="footer-section">
            <h3>Theo dõi chúng tôi</h3>
            <div className="social-links">
              {companyInfo?.socialLinks?.zalo && (
                <a
                  href={companyInfo.socialLinks.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiZalo />
                </a>
              )}
              {companyInfo?.socialLinks?.youtube && (
                <a
                  href={companyInfo.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube />
                </a>
              )}
              {companyInfo?.socialLinks?.instagram && (
                <a
                  href={companyInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              )}
              {companyInfo?.socialLinks?.whatsapp && (
                <a
                  href={`https://wa.me/${companyInfo.socialLinks.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
              )}
            </div>
          </div>

          {companyInfo?.partners && companyInfo.partners.length > 0 && (
            <div className="footer-section partners">
              <h3>Đối tác</h3>
              <div className="partner-logos">
                {companyInfo.partners.map((partner, index) => (
                  <a
                    key={index}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={partner.logo} alt={partner.name} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {companyInfo?.companyName}. Bản
            quyền thuộc về
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
