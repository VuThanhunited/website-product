import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getMediaSlides } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import LazyImage from "../components/LazyImage";
import "../styles/Home.css";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [techArticles, setTechArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const articlesPerPage = 3;

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [mediaSlidesResponse, contentResponse, techArticlesResponse] =
        await Promise.all([
          getMediaSlides(),
          fetch(
            `${
              process.env.REACT_APP_API_URL || "http://localhost:5000/api"
            }/home-content`
          ).then((res) => res.json()),
          fetch(
            `${
              process.env.REACT_APP_API_URL || "http://localhost:5000/api"
            }/tech-articles?limit=100`
          ).then((res) => res.json()),
        ]);

      // Use media slides data (already populated with product info)
      setSlides(mediaSlidesResponse.data || []);

      // Use tech articles from API
      const articles = techArticlesResponse.articles || [];
      setTechArticles(articles);
      setTotalPages(Math.ceil(articles.length / articlesPerPage));
      setHomeContent(contentResponse);
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    pauseOnHover: true,
    fade: true,
  };

  return (
    <div className="home-page">
      {/* Slideshow chiếm toàn bộ width */}
      <section className="hero-slideshow-section">
        {loading ? (
          <div className="loading">{t.loading}</div>
        ) : slides.length > 0 ? (
          <Slider {...sliderSettings}>
            {slides.map((slide, index) => {
              const product = slide.linkToProduct;
              const imageUrl =
                slide.url || (product?.images && product.images[0]);
              const productId = product?._id;

              return (
                <div key={slide._id} className="slide-item">
                  <Link
                    to={productId ? `/products/${productId}` : "#"}
                    className="slide-link-wrapper"
                  >
                    <div className="slide-layout">
                      {/* Cột trái - Hình ảnh slide */}
                      <div className="slide-image-container">
                        <LazyImage
                          src={imageUrl}
                          alt={slide.caption || product?.name || "Slide"}
                          className="slide-image"
                        />
                      </div>

                      {/* Cột phải - Mô tả */}
                      <div className="slide-content-container">
                        <div className="slide-content">
                          <h3 className="slide-title">
                            {slide.caption ||
                              (language === "en" && product?.nameEn
                                ? product.nameEn
                                : product?.name || "Slide")}
                          </h3>
                          {product && (
                            <>
                              <p className="slide-description">
                                {language === "en" && product.descriptionEn
                                  ? product.descriptionEn
                                  : product.description}
                              </p>
                              <button className="slide-cta">
                                {t.viewDetailsButton}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Số thứ tự slide */}
                    <div className="slide-number">
                      {index + 1} {t.slideNumber} {slides.length}
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="no-slides">
            <p>{t.noMedia}</p>
          </div>
        )}
      </section>

      {/* Phần Thông tin công nghệ kỹ thuật */}
      <section className="tech-articles-section">
        <div className="container">
          <h2 className="section-title">
            {homeContent && homeContent.techArticlesTitle
              ? language === "en" && homeContent.techArticlesTitle.titleEn
                ? homeContent.techArticlesTitle.titleEn
                : homeContent.techArticlesTitle.title
              : language === "vi"
              ? "Thông tin công nghệ kỹ thuật"
              : "Technical Information"}
          </h2>
          <div className="tech-articles-grid">
            {techArticles
              .slice(
                (currentPage - 1) * articlesPerPage,
                currentPage * articlesPerPage
              )
              .map((article, index) => (
                <Link
                  to={`/tech-articles/${article.slug}`}
                  key={index}
                  className="tech-article-card"
                >
                  {article.thumbnail && (
                    <div className="tech-article-image">
                      <LazyImage
                        src={article.thumbnail}
                        alt={
                          language === "en" && article.titleEn
                            ? article.titleEn
                            : article.title
                        }
                      />
                    </div>
                  )}
                  <div className="tech-article-content">
                    <h3 className="tech-article-title">
                      {language === "en" && article.titleEn
                        ? article.titleEn
                        : article.title}
                    </h3>
                    <p className="tech-article-excerpt">
                      {language === "en" && article.contentEn
                        ? article.contentEn
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150)
                        : article.content
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150)}
                      ...
                    </p>
                    <span className="tech-article-read-more">
                      {language === "vi" ? "Xem chi tiết →" : "Read more →"}
                    </span>
                  </div>
                </Link>
              ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`pagination-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            {homeContent && homeContent.featuresTitle
              ? language === "en" && homeContent.featuresTitle.titleEn
                ? homeContent.featuresTitle.titleEn
                : homeContent.featuresTitle.title
              : language === "vi"
              ? "Tính Năng Nổi Bật"
              : "Outstanding Features"}
          </h2>
          <div className="features-grid">
            {homeContent &&
            homeContent.features &&
            homeContent.features.length > 0
              ? homeContent.features
                  .sort((a, b) => a.order - b.order)
                  .map((feature, index) => (
                    <div key={index} className="feature-card">
                      <div className="feature-icon">{feature.icon}</div>
                      <h3>
                        {language === "en" && feature.titleEn
                          ? feature.titleEn
                          : feature.title}
                      </h3>
                      <p>
                        {language === "en" && feature.descriptionEn
                          ? feature.descriptionEn
                          : feature.description}
                      </p>
                    </div>
                  ))
              : // Fallback to translations
                [
                  {
                    icon: "🚚",
                    title: t.freeShipping,
                    desc: t.freeShippingDesc,
                  },
                  {
                    icon: "✅",
                    title: t.authentic,
                    desc: t.authenticDesc,
                  },
                  {
                    icon: "💳",
                    title: t.flexiblePayment,
                    desc: t.flexiblePaymentDesc,
                  },
                  {
                    icon: "🎁",
                    title: t.attractiveOffers,
                    desc: t.attractiveOffersDesc,
                  },
                ].map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">
            {homeContent && homeContent.whyChooseUs
              ? language === "en" && homeContent.whyChooseUs.titleEn
                ? homeContent.whyChooseUs.titleEn
                : homeContent.whyChooseUs.title
              : t.whyChooseUs}
          </h2>
          <div className="why-choose-grid">
            {homeContent &&
            homeContent.whyChooseUs &&
            homeContent.whyChooseUs.items &&
            homeContent.whyChooseUs.items.length > 0
              ? homeContent.whyChooseUs.items
                  .sort((a, b) => a.order - b.order)
                  .map((item, index) => (
                    <div key={index} className="why-item">
                      <div className="why-image">
                        <div className="why-icon-bg">{item.icon}</div>
                      </div>
                      <div className="why-content">
                        <h3>
                          {language === "en" && item.titleEn
                            ? item.titleEn
                            : item.title}
                        </h3>
                        <p>
                          {language === "en" && item.descriptionEn
                            ? item.descriptionEn
                            : item.description}
                        </p>
                      </div>
                    </div>
                  ))
              : // Fallback to translations
                [
                  {
                    icon: "🏆",
                    title: t.topReputation,
                    desc: t.topReputationDesc,
                  },
                  {
                    icon: "🔬",
                    title: t.guaranteedQuality,
                    desc: t.guaranteedQualityDesc,
                  },
                  { icon: "💬", title: t.support247, desc: t.support247Desc },
                  {
                    icon: "⚡",
                    title: t.fastDelivery,
                    desc: t.fastDeliveryDesc,
                  },
                ].map((item, index) => (
                  <div key={index} className="why-item">
                    <div className="why-image">
                      <div className="why-icon-bg">{item.icon}</div>
                    </div>
                    <div className="why-content">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>
              {homeContent && homeContent.cta
                ? language === "en" && homeContent.cta.titleEn
                  ? homeContent.cta.titleEn
                  : homeContent.cta.title
                : t.discoverProducts}
            </h2>
            <p>
              {homeContent && homeContent.cta
                ? language === "en" && homeContent.cta.descriptionEn
                  ? homeContent.cta.descriptionEn
                  : homeContent.cta.description
                : t.discoverProductsDesc}
            </p>
            <div className="cta-buttons">
              <Link
                to={
                  homeContent && homeContent.cta
                    ? homeContent.cta.primaryButtonLink
                    : "/products"
                }
                className="cta-button primary"
              >
                {homeContent && homeContent.cta
                  ? language === "en" && homeContent.cta.primaryButtonTextEn
                    ? homeContent.cta.primaryButtonTextEn
                    : homeContent.cta.primaryButtonText
                  : t.viewAllProducts}
              </Link>
              {homeContent &&
                homeContent.cta &&
                homeContent.cta.secondaryButtonText && (
                  <Link
                    to={homeContent.cta.secondaryButtonLink}
                    className="cta-button secondary"
                  >
                    {language === "en" && homeContent.cta.secondaryButtonTextEn
                      ? homeContent.cta.secondaryButtonTextEn
                      : homeContent.cta.secondaryButtonText}
                  </Link>
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
