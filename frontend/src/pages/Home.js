import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getProducts, getSlogans } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import "../styles/Home.css";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [slogans, setSlogans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [productsResponse, slogansResponse] = await Promise.all([
        getProducts(),
        getSlogans(),
      ]);
      // Lấy 6 sản phẩm featured hoặc 6 sản phẩm đầu tiên có hình ảnh
      const productsWithImages = productsResponse.data.filter(
        (product) => product.images && product.images.length > 0
      );
      // Ưu tiên sản phẩm featured, nếu không đủ thì lấy thêm sản phẩm khác
      const featuredProducts = productsWithImages.filter((p) => p.featured);
      const remainingProducts = productsWithImages.filter((p) => !p.featured);
      const selectedProducts = [
        ...featuredProducts,
        ...remainingProducts,
      ].slice(0, 6);

      setSlides(selectedProducts);
      setSlogans(slogansResponse.data);
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
            {slides.map((product, index) => (
              <div key={product._id} className="slide-item">
                <Link
                  to={`/products/${product._id}`}
                  className="slide-link-wrapper"
                >
                  <div className="slide-layout">
                    {/* Cột trái - Hình ảnh sản phẩm */}
                    <div className="slide-image-container">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="slide-image"
                      />
                    </div>

                    {/* Cột phải - Mô tả sản phẩm */}
                    <div className="slide-content-container">
                      <div className="slide-content">
                        <h3 className="slide-title">
                          {language === "en" && product.nameEn
                            ? product.nameEn
                            : product.name}
                        </h3>
                        <p className="slide-description">
                          {language === "en" && product.descriptionEn
                            ? product.descriptionEn
                            : product.description}
                        </p>
                        <button className="slide-cta">
                          {t.viewDetailsButton}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Số thứ tự slide */}
                  <div className="slide-number">
                    {index + 1} {t.slideNumber} {slides.length}
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="no-slides">
            <p>{t.noMedia}</p>
          </div>
        )}
      </section>

      {/* Phần slogan */}
      <section className="slogan-section">
        <div className="container">
          {slogans.map((slogan, index) => {
            const displayText =
              language === "en" && slogan.textEn ? slogan.textEn : slogan.text;

            return (
              <div key={index} className="slogan-item">
                <h2>{displayText}</h2>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>{t.freeShipping}</h3>
              <p>{t.freeShippingDesc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>{t.authentic}</h3>
              <p>{t.authenticDesc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>{t.flexiblePayment}</h3>
              <p>{t.flexiblePaymentDesc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>{t.attractiveOffers}</h3>
              <p>{t.attractiveOffersDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">{t.whyChooseUs}</h2>
          <div className="why-choose-grid">
            <div className="why-item">
              <div className="why-image">
                <div className="why-icon-bg">🏆</div>
              </div>
              <div className="why-content">
                <h3>{t.topReputation}</h3>
                <p>{t.topReputationDesc}</p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-image">
                <div className="why-icon-bg">🔬</div>
              </div>
              <div className="why-content">
                <h3>{t.guaranteedQuality}</h3>
                <p>{t.guaranteedQualityDesc}</p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-image">
                <div className="why-icon-bg">💬</div>
              </div>
              <div className="why-content">
                <h3>{t.support247}</h3>
                <p>{t.support247Desc}</p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-image">
                <div className="why-icon-bg">⚡</div>
              </div>
              <div className="why-content">
                <h3>{t.fastDelivery}</h3>
                <p>{t.fastDeliveryDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t.discoverProducts}</h2>
            <p>{t.discoverProductsDesc}</p>
            <Link to="/products" className="cta-button">
              {t.viewAllProducts}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
