import React, { useState, useEffect } from "react";
import { getCompanyInfo } from "../services/api";
import "../styles/Company.css";

const Company = () => {
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

  if (!companyInfo) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="company-page">
      {/* Hero Section */}
      <div className="company-hero">
        <div className="hero-overlay">
          <div className="container">
            <h1>Về chúng tôi - {companyInfo.companyName}</h1>
            <p className="hero-subtitle">
              Đối tác tin cậy của bạn trong lĩnh vực chăm sóc xe hơi
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Giới thiệu */}
        <div className="company-intro">
          <div className="intro-content">
            <h2>Câu Chuyện Của Chúng Tôi</h2>
            <p>
              Chúng tôi là nhà cung cấp hàng đầu các sản phẩm chăm sóc xe hơi
              chất lượng cao với giá cả cạnh tranh. Với nhiều năm kinh nghiệm
              trong ngành, chúng tôi cam kết mang đến cho khách hàng những sản
              phẩm tốt nhất và dịch vụ chăm sóc khách hàng xuất sắc.
            </p>
            <p>
              Sứ mệnh của chúng tôi là cung cấp các sản phẩm chất lượng cao từ
              thương hiệu Kuiper, đáp ứng nhu cầu đa dạng của khách hàng với giá
              cả hợp lý. Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng
              đầu.
            </p>
          </div>
          <div className="intro-image">
            {companyInfo.logo && (
              <img
                src={`http://localhost:5000${companyInfo.logo}`}
                alt={companyInfo.companyName}
                className="company-logo-large"
              />
            )}
          </div>
        </div>

        {/* Giá trị cốt lõi */}
        <div className="company-values">
          <h2>Giá Trị Cốt Lõi</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Chất Lượng</h3>
              <p>Sản phẩm Kuiper chính hãng, đảm bảo chất lượng cao nhất</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Uy Tín</h3>
              <p>Đối tác tin cậy của hàng nghìn khách hàng trên toàn quốc</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Sáng Tạo</h3>
              <p>Không ngừng cải tiến và phát triển sản phẩm mới</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Tận Tâm</h3>
              <p>Chăm sóc khách hàng tận tình, hỗ trợ 24/7</p>
            </div>
          </div>
        </div>

        {/* Thành tựu */}
        <div className="company-achievements">
          <h2>Thành Tựu Của Chúng Tôi</h2>
          <div className="achievements-grid">
            <div className="achievement-item">
              <div className="achievement-number">15+</div>
              <div className="achievement-label">Sản phẩm Kuiper</div>
            </div>
            <div className="achievement-item">
              <div className="achievement-number">1000+</div>
              <div className="achievement-label">Khách hàng hài lòng</div>
            </div>
            <div className="achievement-item">
              <div className="achievement-number">5+</div>
              <div className="achievement-label">Năm kinh nghiệm</div>
            </div>
            <div className="achievement-item">
              <div className="achievement-number">99%</div>
              <div className="achievement-label">Đánh giá 5 sao</div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {companyInfo.aboutImages && companyInfo.aboutImages.length > 0 && (
          <div className="company-gallery">
            <h2>Hình Ảnh Của Chúng Tôi</h2>
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
          <h2>Sẵn sàng trải nghiệm sản phẩm của chúng tôi?</h2>
          <p>
            Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn và hỗ trợ tốt
            nhất!
          </p>
          <div className="cta-buttons">
            <a href="/products" className="btn-primary">
              Xem Sản Phẩm
            </a>
            <a href="/contact" className="btn-secondary">
              Liên Hệ Ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
