import React, { useState, useEffect } from "react";
import { getCompanyInfo } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import { getAssetUrl } from "../utils/urlHelper";
import "../styles/Company.css";

const Company = () => {
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

  if (!companyInfo) {
    return <div className="loading">{t.loadingText}</div>;
  }

  return (
    <div className="company-page">
      {/* Hero Section */}
      <div
        className="company-hero"
        style={{
          background: companyInfo?.companyPageBgColor
            ? companyInfo.companyPageBgColor
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="hero-overlay">
          <div className="container">
            <h1>
              {t.aboutCompany} - {t.companyName}
            </h1>
            <p className="hero-subtitle">{t.trustedPartner}</p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Giới thiệu */}
        <div className="company-intro">
          <div className="intro-content">
            <h2>{t.ourStory}</h2>
            <p>{t.companyIntro1}</p>
            <p>{t.companyIntro2}</p>
          </div>
          <div className="intro-image">
            {companyInfo.logo && (
              <img
                src={getAssetUrl(companyInfo.logo)}
                alt={companyInfo.companyName}
                className="company-logo-large"
              />
            )}
          </div>
        </div>

        {/* Giá trị cốt lõi */}
        <div className="company-values">
          <h2>{t.ourValues}</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>{t.valueQuality}</h3>
              <p>{t.valueQualityDesc}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>{t.valueReputation}</h3>
              <p>{t.valueReputationDesc}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>{t.valueInnovation}</h3>
              <p>{t.valueInnovationDesc}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>{t.valueDedication}</h3>
              <p>{t.valueDedicationDesc}</p>
            </div>
          </div>
        </div>

        {/* Thành tựu */}
        <div className="company-achievements">
          <h2>{t.ourAchievements}</h2>
          <div className="achievements-grid">
            <div className="achievement-item">
              <div className="achievement-number">15+</div>
              <div className="achievement-label">{t.kuiperProducts}</div>
            </div>
            <div className="achievement-item">
              <div className="achievement-number">1000+</div>
              <div className="achievement-label">{t.satisfiedCustomers}</div>
            </div>
            <div className="achievement-item">
              <div className="achievement-number">5+</div>
              <div className="achievement-label">{t.yearsExperience}</div>
            </div>
            <div className="achievement-item">
              <div className="achievement-number">99%</div>
              <div className="achievement-label">{t.fiveStarRating}</div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {companyInfo.aboutImages && companyInfo.aboutImages.length > 0 && (
          <div className="company-gallery">
            <h2>{t.ourGallery}</h2>
            <div className="gallery-grid">
              {companyInfo.aboutImages.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="gallery-image"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="company-cta">
          <h2>{t.readyToExperience}</h2>
          <p>{t.contactUsToday}</p>
          <div className="cta-buttons">
            <a href="/products" className="btn-primary">
              {t.viewProducts}
            </a>
            <a href="/contact" className="btn-secondary">
              {t.contactNow}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
