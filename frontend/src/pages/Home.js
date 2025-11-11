import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getMediaSlides, getSlogans } from "../services/api";
import "../styles/Home.css";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [slogans, setSlogans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [slidesResponse, slogansResponse] = await Promise.all([
        getMediaSlides(),
        getSlogans(),
      ]);
      setSlides(slidesResponse.data);
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
          <div className="loading">Đang tải slideshow...</div>
        ) : slides.length > 0 ? (
          <Slider {...sliderSettings}>
            {slides.map((slide, index) => (
              <div key={index} className="slide-item">
                {/* Bọc toàn bộ slide trong Link để có thể click */}
                {slide.linkToProduct ? (
                  <Link
                    to={`/products/${slide.linkToProduct._id}`}
                    className="slide-link-wrapper"
                  >
                    {/* Hình ảnh sản phẩm */}
                    {slide.type === "image" ? (
                      <img
                        src={slide.url}
                        alt={slide.caption || `Slide ${index + 1}`}
                        className="slide-image"
                      />
                    ) : (
                      <video className="slide-video">
                        <source src={slide.url} type="video/mp4" />
                        Trình duyệt không hỗ trợ video.
                      </video>
                    )}

                    {/* Overlay với caption và mô tả */}
                    <div className="slide-overlay">
                      <div className="slide-content">
                        {slide.caption && (
                          <h3 className="slide-title">{slide.caption}</h3>
                        )}
                        <p className="slide-description">
                          Click để xem chi tiết sản phẩm
                        </p>
                      </div>
                    </div>

                    {/* Số thứ tự slide */}
                    <div className="slide-number">
                      {index + 1} / {slides.length}
                    </div>
                  </Link>
                ) : (
                  <div className="slide-no-link">
                    {slide.type === "image" ? (
                      <img
                        src={slide.url}
                        alt={slide.caption || `Slide ${index + 1}`}
                        className="slide-image"
                      />
                    ) : (
                      <video controls className="slide-video">
                        <source src={slide.url} type="video/mp4" />
                        Trình duyệt không hỗ trợ video.
                      </video>
                    )}

                    {slide.caption && (
                      <div className="slide-overlay">
                        <div className="slide-content">
                          <h3 className="slide-title">{slide.caption}</h3>
                        </div>
                      </div>
                    )}

                    <div className="slide-number">
                      {index + 1} / {slides.length}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        ) : (
          <div className="no-slides">
            <p>Chưa có media nào để hiển thị</p>
          </div>
        )}
      </section>

      {/* Phần thống kê nhanh */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{slides.length}</span>
              <span className="stat-label">Sản phẩm nổi bật</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100+</span>
              <span className="stat-label">Sản phẩm</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Hỗ trợ 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Phần slogan */}
      <section className="slogan-section">
        <div className="container">
          {slogans.map((slogan, index) => {
            // Dịch slogans từ tiếng Anh sang tiếng Việt
            const translatedSlogan =
              slogan.text === "Quality Products at Affordable Prices"
                ? "Sản Phẩm Chất Lượng Với Giá Cả Phải Chăng"
                : slogan.text === "Fast Shipping Worldwide"
                ? "Giao Hàng Nhanh Toàn Quốc"
                : slogan.text === "Customer Satisfaction Guaranteed"
                ? "Cam Kết Hài Lòng Khách Hàng"
                : slogan.text;

            return (
              <div key={index} className="slogan-item">
                <h2>{translatedSlogan}</h2>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
