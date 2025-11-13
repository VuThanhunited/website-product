import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { getSupportArticleBySlug } from "../services/api";
import "../styles/SupportDetail.css";

const SupportDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

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
        <p>Đang tải bài viết...</p>
      </div>
    );
  }

  return (
    <div className="support-detail-page">
      <div className="container">
        <div className="article-header">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="views">👁 {article.views} lượt xem</span>
            <span className="date">
              📅 {new Date(article.createdAt).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>

        {/* Thumbnail chính */}
        {article.thumbnail && (
          <div className="article-hero">
            <img src={article.thumbnail} alt={article.title} />
          </div>
        )}

        {/* Nội dung bài viết */}
        <div className="article-content">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Hình ảnh bổ sung */}
        {article.images && article.images.length > 0 && (
          <div className="article-media-section">
            <h3>📷 Hình ảnh</h3>
            <div className="article-images">
              {article.images.map((image, index) => (
                <div key={index} className="media-item">
                  <img src={image} alt={`Hình ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {article.videos && article.videos.length > 0 && (
          <div className="article-media-section">
            <h3>🎥 Video hướng dẫn</h3>
            <div className="article-videos">
              {article.videos.map((video, index) => (
                <div key={index} className="media-item">
                  <video controls>
                    <source src={video} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File đính kèm để download */}
        {article.attachments && article.attachments.length > 0 && (
          <div className="article-attachments-section">
            <h3>📎 Tài liệu đính kèm</h3>
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
