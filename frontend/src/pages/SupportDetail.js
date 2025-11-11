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
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="support-detail-page">
      <div className="container">
        <h1>{article.title}</h1>

        <div className="article-meta">
          <span>{article.views} views</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="article-media">
          {article.images &&
            article.images.map((image, index) => (
              <img key={index} src={image} alt={`Article ${index + 1}`} />
            ))}
          {article.videos &&
            article.videos.map((video, index) => (
              <video key={index} controls>
                <source src={video} type="video/mp4" />
              </video>
            ))}
        </div>

        <div className="article-content">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {article.attachments && article.attachments.length > 0 && (
          <div className="article-attachments">
            <h3>Attachments</h3>
            <ul>
              {article.attachments.map((attachment, index) => (
                <li key={index}>
                  <a href={attachment.filepath} download>
                    <FaDownload /> {attachment.filename} (
                    {(attachment.filesize / 1024).toFixed(2)} KB)
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportDetail;
