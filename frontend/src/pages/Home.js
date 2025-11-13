import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getProducts, getSlogans } from "../services/api";
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
          <div className="loading">Đang tải slideshow...</div>
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
                        <h3 className="slide-title">{product.name}</h3>
                        <p className="slide-description">
                          {product.description}
                        </p>
                        <button className="slide-cta">Xem chi tiết →</button>
                      </div>
                    </div>
                  </div>

                  {/* Số thứ tự slide */}
                  <div className="slide-number">
                    {index + 1} / {slides.length}
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="no-slides">
            <p>Chưa có sản phẩm nào để hiển thị</p>
          </div>
        )}
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

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Miễn Phí Vận Chuyển</h3>
              <p>Giao hàng miễn phí cho đơn hàng trên 500.000₫</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Chính Hãng 100%</h3>
              <p>Sản phẩm Kuiper chính hãng, bảo hành đầy đủ</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Thanh Toán Linh Hoạt</h3>
              <p>Hỗ trợ nhiều hình thức thanh toán an toàn</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎁</div>
              <h3>Ưu Đãi Hấp Dẫn</h3>
              <p>Nhiều chương trình khuyến mãi mỗi tuần</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">Tại Sao Chọn Chúng Tôi?</h2>
          <div className="why-choose-grid">
            <div className="why-item">
              <div className="why-image">
                <div className="why-icon-bg">🏆</div>
              </div>
              <div className="why-content">
                <h3>Uy Tín Hàng Đầu</h3>
                <p>
                  Đối tác tin cậy của hàng nghìn khách hàng trên toàn quốc với
                  5+ năm kinh nghiệm
                </p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-image">
                <div className="why-icon-bg">🔬</div>
              </div>
              <div className="why-content">
                <h3>Chất Lượng Đảm Bảo</h3>
                <p>
                  Sản phẩm được kiểm tra kỹ lưỡng, đạt chuẩn chất lượng quốc tế
                </p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-image">
                <div className="why-icon-bg">💬</div>
              </div>
              <div className="why-content">
                <h3>Hỗ Trợ 24/7</h3>
                <p>
                  Đội ngũ tư vấn chuyên nghiệp, nhiệt tình hỗ trợ mọi lúc mọi
                  nơi
                </p>
              </div>
            </div>
            <div className="why-item">
              <div className="why-image">
                <div className="why-icon-bg">⚡</div>
              </div>
              <div className="why-content">
                <h3>Giao Hàng Nhanh</h3>
                <p>Xử lý đơn hàng trong 24h, giao hàng toàn quốc 2-5 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Khám Phá Sản Phẩm Kuiper</h2>
            <p>
              15+ sản phẩm chăm sóc xe hơi chất lượng cao đang chờ bạn khám phá
            </p>
            <Link to="/products" className="cta-button">
              Xem Tất Cả Sản Phẩm →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
