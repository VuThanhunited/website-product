import React, { useState, useEffect } from "react";
import { getCompanyInfo } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import { getAssetUrl } from "../utils/urlHelper";
import "../styles/Company.css";

const Company = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [companyContent, setCompanyContent] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const [infoResponse, contentResponse] = await Promise.all([
        getCompanyInfo(),
        fetch(
          `${
            process.env.REACT_APP_API_URL || "http://localhost:5000/api"
          }/company-content`
        ).then((res) => res.json()),
      ]);
      setCompanyInfo(infoResponse.data);
      setCompanyContent(contentResponse);
    } catch (error) {
      console.error("Error fetching company data:", error);
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
          backgroundImage: companyInfo?.companyPageBgImage
            ? `url(${companyInfo.companyPageBgImage})`
            : companyInfo?.companyPageBgColor
            ? `linear-gradient(135deg, ${companyInfo.companyPageBgColor} 0%, ${companyInfo.companyPageBgColor}dd 100%)`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundColor: companyInfo?.companyPageBgColor || "#667eea",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-overlay">
          <div className="container">
            <h1>
              {companyContent && companyContent.hero
                ? language === "en" && companyContent.hero.titleEn
                  ? companyContent.hero.titleEn
                  : companyContent.hero.title
                : `${t.aboutCompany} - ${t.companyName}`}
            </h1>
            <p className="hero-subtitle">
              {companyContent && companyContent.hero
                ? language === "en" && companyContent.hero.subtitleEn
                  ? companyContent.hero.subtitleEn
                  : companyContent.hero.subtitle
                : t.trustedPartner}
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Giới thiệu */}
        <div className="company-intro">
          <div className="intro-content">
            <h2>
              {companyContent && companyContent.intro
                ? language === "en" && companyContent.intro.titleEn
                  ? companyContent.intro.titleEn
                  : companyContent.intro.title
                : t.ourStory}
            </h2>
            <p>
              {companyContent && companyContent.intro
                ? language === "en" && companyContent.intro.paragraph1En
                  ? companyContent.intro.paragraph1En
                  : companyContent.intro.paragraph1
                : t.companyIntro1}
            </p>
            <p>
              {companyContent && companyContent.intro
                ? language === "en" && companyContent.intro.paragraph2En
                  ? companyContent.intro.paragraph2En
                  : companyContent.intro.paragraph2
                : t.companyIntro2}
            </p>
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
          <h2>
            {companyContent && companyContent.values
              ? language === "en" && companyContent.values.titleEn
                ? companyContent.values.titleEn
                : companyContent.values.title
              : t.ourValues}
          </h2>
          <div className="values-grid">
            {companyContent &&
            companyContent.values &&
            companyContent.values.items &&
            companyContent.values.items.length > 0
              ? companyContent.values.items
                  .sort((a, b) => a.order - b.order)
                  .map((value, index) => (
                    <div key={index} className="value-card">
                      <div className="value-icon">{value.icon}</div>
                      <h3>
                        {language === "en" && value.titleEn
                          ? value.titleEn
                          : value.title}
                      </h3>
                      <p>
                        {language === "en" && value.descriptionEn
                          ? value.descriptionEn
                          : value.description}
                      </p>
                    </div>
                  ))
              : // Fallback to translations
                [
                  {
                    icon: "🎯",
                    title: t.valueQuality,
                    desc: t.valueQualityDesc,
                  },
                  {
                    icon: "🤝",
                    title: t.valueReputation,
                    desc: t.valueReputationDesc,
                  },
                  {
                    icon: "💡",
                    title: t.valueInnovation,
                    desc: t.valueInnovationDesc,
                  },
                  {
                    icon: "❤️",
                    title: t.valueDedication,
                    desc: t.valueDedicationDesc,
                  },
                ].map((value, index) => (
                  <div key={index} className="value-card">
                    <div className="value-icon">{value.icon}</div>
                    <h3>{value.title}</h3>
                    <p>{value.desc}</p>
                  </div>
                ))}
          </div>
        </div>

        {/* Thành tựu */}
        <div className="company-achievements">
          <h2>
            {companyContent && companyContent.achievements
              ? language === "en" && companyContent.achievements.titleEn
                ? companyContent.achievements.titleEn
                : companyContent.achievements.title
              : t.ourAchievements}
          </h2>
          <div className="achievements-grid">
            {companyContent &&
            companyContent.achievements &&
            companyContent.achievements.items &&
            companyContent.achievements.items.length > 0
              ? companyContent.achievements.items
                  .sort((a, b) => a.order - b.order)
                  .map((achievement, index) => (
                    <div key={index} className="achievement-item">
                      <div className="achievement-number">
                        {achievement.number}
                      </div>
                      <div className="achievement-label">
                        {language === "en" && achievement.labelEn
                          ? achievement.labelEn
                          : achievement.label}
                      </div>
                    </div>
                  ))
              : // Fallback to translations
                [
                  { number: "15+", label: t.kuiperProducts },
                  { number: "1000+", label: t.satisfiedCustomers },
                  { number: "5+", label: t.yearsExperience },
                  { number: "99%", label: t.fiveStarRating },
                ].map((achievement, index) => (
                  <div key={index} className="achievement-item">
                    <div className="achievement-number">
                      {achievement.number}
                    </div>
                    <div className="achievement-label">{achievement.label}</div>
                  </div>
                ))}
          </div>
        </div>

        {/* Gallery */}
        {companyInfo.aboutImages && companyInfo.aboutImages.length > 0 && (
          <div className="company-gallery">
            <h2>
              {companyContent && companyContent.gallery
                ? language === "en" && companyContent.gallery.titleEn
                  ? companyContent.gallery.titleEn
                  : companyContent.gallery.title
                : t.ourGallery}
            </h2>
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
          <h2>
            {companyContent && companyContent.cta
              ? language === "en" && companyContent.cta.titleEn
                ? companyContent.cta.titleEn
                : companyContent.cta.title
              : t.readyToExperience}
          </h2>
          <p>
            {companyContent && companyContent.cta
              ? language === "en" && companyContent.cta.descriptionEn
                ? companyContent.cta.descriptionEn
                : companyContent.cta.description
              : t.contactUsToday}
          </p>
          <div className="cta-buttons">
            <a
              href={
                companyContent && companyContent.cta
                  ? companyContent.cta.primaryButtonLink
                  : "/products"
              }
              className="btn-primary"
            >
              {companyContent && companyContent.cta
                ? language === "en" && companyContent.cta.primaryButtonTextEn
                  ? companyContent.cta.primaryButtonTextEn
                  : companyContent.cta.primaryButtonText
                : t.viewProducts}
            </a>
            <a
              href={
                companyContent && companyContent.cta
                  ? companyContent.cta.secondaryButtonLink
                  : "/contact"
              }
              className="btn-secondary"
            >
              {companyContent && companyContent.cta
                ? language === "en" && companyContent.cta.secondaryButtonTextEn
                  ? companyContent.cta.secondaryButtonTextEn
                  : companyContent.cta.secondaryButtonText
                : t.contactNow}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
