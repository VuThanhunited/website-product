import React, { useState, useEffect } from "react";
import { FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { getCompanyInfo } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import "../styles/Footer.css";

const Footer = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const { language } = useLanguage();
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

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            {companyInfo?.logo ? (
              <img
                src={`http://localhost:5000${companyInfo.logo}`}
                alt={companyInfo.companyName}
                className="footer-logo"
              />
            ) : (
              <h3>{companyInfo?.companyName || t.company}</h3>
            )}
            <p>{companyInfo?.address}</p>
            <p>
              {t.phone}: {companyInfo?.phone}
            </p>
            <p>
              {t.email}: {companyInfo?.email}
            </p>
          </div>

          <div className="footer-section">
            <h3>{t.followUs}</h3>
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
              <h3>{t.ourPartners}</h3>
              <div className="partner-logos">
                {companyInfo.partners.map((partner, index) => (
                  <a
                    key={index}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-link"
                  >
                    <img
                      src={
                        partner.logo.startsWith("http")
                          ? partner.logo
                          : `http://localhost:5000${partner.logo}`
                      }
                      alt={partner.name}
                      className="partner-logo-img"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} {companyInfo?.companyName}.{" "}
            {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
