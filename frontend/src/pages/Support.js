import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSupportArticles } from "../services/api";
import "../styles/Support.css";

const Support = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await getSupportArticles();
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return (
    <div className="support-page">
      <div className="container">
        <h1>Trung tâm hỗ trợ</h1>

        <div className="articles-grid">
          {articles.map((article) => (
            <Link
              to={`/support/${article.slug}`}
              key={article._id}
              className="article-card"
            >
              <div className="article-thumbnail">
                {article.thumbnail ? (
                  <img src={article.thumbnail} alt={article.title} />
                ) : (
                  <div className="no-thumbnail">
                    <span>📄</span>
                  </div>
                )}
              </div>
              <div className="article-info">
                <h3>{article.title}</h3>
                <p className="article-excerpt">
                  {article.content?.replace(/<[^>]*>/g, "").substring(0, 120)}
                  ...
                </p>
                <div className="article-meta">
                  <span className="views">👁 {article.views} lượt xem</span>
                  <span className="date">
                    {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
