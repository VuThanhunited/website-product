import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { getSupportArticleBySlug } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import "../styles/SupportDetail.css";

const SupportDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  const fetchArticle = useCallback(async () => {
    try {
      const response = await getSupportArticleBySlug(slug);
      setArticle(response.data);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  }, [slug]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (!article) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t.loadingText}</p>
      </div>
    );
  }

  return (
    <div className="support-detail-page">
      <div className="container">
        <div className="article-header">
          <h1>
            {language === "en" && article.titleEn
              ? article.titleEn
              : article.title}
          </h1>
          <div className="article-meta">
            <span className="views">
              👁 {article.views} {t.views}
            </span>
            <span className="date">
              📅{" "}
              {new Date(article.createdAt).toLocaleDateString(
                language === "vi" ? "vi-VN" : "en-US"
              )}
            </span>
          </div>
        </div>

        {/* Thumbnail chính */}
        {article.thumbnail && (
          <div className="article-hero">
            <img
              src={article.thumbnail}
              alt={
                language === "en" && article.titleEn
                  ? article.titleEn
                  : article.title
              }
            />
          </div>
        )}

        {/* Nội dung bài viết */}
        <div className="article-content">
          <div
            dangerouslySetInnerHTML={{
              __html:
                language === "en" && article.contentEn
                  ? article.contentEn
                  : article.content,
            }}
          />
        </div>

        {/* Hình ảnh bổ sung */}
        {article.images && article.images.length > 0 && (
          <div className="article-media-section">
            <h3>📷 {t.images}</h3>
            <div className="article-images">
              {article.images.map((image, index) => (
                <div key={index} className="media-item">
                  <img src={image} alt={`${t.images} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {article.videos && article.videos.length > 0 && (
          <div className="article-media-section">
            <h3>🎥 {t.videoGuide}</h3>
            <div className="article-videos">
              {article.videos.map((video, index) => (
                <div key={index} className="video-wrapper">
                  {video.includes("youtube.com") ||
                  video.includes("youtu.be") ? (
                    <iframe
                      src={video}
                      title={`Video ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video controls>
                      <source src={video} type="video/mp4" />
                      {t.browserNotSupport}
                    </video>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File đính kèm để download */}
        {article.attachments && article.attachments.length > 0 && (
          <div className="article-attachments-section">
            <h3>📎 {t.attachments}</h3>
            <div className="attachments-list">
              {article.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment.filepath}
                  download={attachment.filename}
                  className="attachment-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="attachment-icon">
                    <FaDownload />
                  </div>
                  <div className="attachment-info">
                    <span className="filename">{attachment.filename}</span>
                    <span className="filesize">
                      {(attachment.filesize / 1024).toFixed(2)} KB
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportDetail;
