import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import LazyImage from "../components/LazyImage";
import "../styles/TechArticleDetail.css";

const TechArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5000/api"
        }/tech-articles/slug/${slug}`
      );
      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!article) {
    return <div className="error">Không tìm thấy bài viết</div>;
  }

  const title =
    language === "en" && article.titleEn ? article.titleEn : article.title;
  const content =
    language === "en" && article.contentEn
      ? article.contentEn
      : article.content;

  return (
    <div className="tech-article-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← {language === "en" ? "Back" : "Quay lại"}
        </button>

        <article className="article-content">
          <h1 className="article-title">{title}</h1>

          {article.thumbnail && (
            <div className="article-thumbnail">
              <LazyImage src={article.thumbnail} alt={title} />
            </div>
          )}

          <div className="article-meta">
            <span className="article-date">
              {new Date(article.createdAt).toLocaleDateString("vi-VN")}
            </span>
            <span className="article-views">
              👁️ {article.views} {language === "en" ? "views" : "lượt xem"}
            </span>
          </div>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {article.images && article.images.length > 0 && (
            <div className="article-gallery">
              <h3>{language === "en" ? "Gallery" : "Thư viện ảnh"}</h3>
              <div className="gallery-grid">
                {article.images.map((img, index) => (
                  <div key={index} className="gallery-item">
                    <LazyImage src={img} alt={`${title} - ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {article.videos && article.videos.length > 0 && (
            <div className="article-videos">
              <h3>{language === "en" ? "Videos" : "Video"}</h3>
              {article.videos.map((video, index) => (
                <div key={index} className="video-wrapper">
                  <iframe
                    src={video}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default TechArticleDetail;
