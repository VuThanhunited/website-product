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
      <div className="container">
        <h1>Về chúng tôi {companyInfo.companyName}</h1>

        <div className="company-content">
          <div className="company-media">
            {companyInfo.aboutImages &&
              companyInfo.aboutImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`About ${index + 1}`}
                  className="company-image"
                />
              ))}
            {companyInfo.aboutVideos &&
              companyInfo.aboutVideos.map((video, index) => (
                <video key={index} controls className="company-video">
                  <source src={video} type="video/mp4" />
                </video>
              ))}
          </div>

          <div className="company-text">
            <h2>Về Công Ty Chúng Tôi</h2>
            <p>
              Chúng tôi là nhà cung cấp hàng đầu các sản phẩm chất lượng với giá
              cả cạnh tranh. Với nhiều năm kinh nghiệm trong ngành, chúng tôi
              cam kết mang đến cho khách hàng những sản phẩm tốt nhất và dịch vụ
              chăm sóc khách hàng xuất sắc.
            </p>
            <p>
              Sứ mệnh của chúng tôi là cung cấp các sản phẩm chất lượng cao, đáp
              ứng nhu cầu đa dạng của khách hàng với giá cả hợp lý. Chúng tôi
              luôn đặt sự hài lòng của khách hàng lên hàng đầu.
            </p>
            <p>
              Hãy liên hệ với chúng tôi để biết thêm thông tin về các sản phẩm
              và dịch vụ của chúng tôi. Chúng tôi luôn sẵn sàng phục vụ bạn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
