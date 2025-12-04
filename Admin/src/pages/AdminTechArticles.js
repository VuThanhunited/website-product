import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminTechArticles.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

function AdminTechArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/tech-articles?limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(response.data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      alert("Lỗi khi tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData(e.target);

      const articleData = {
        title: formData.get("title"),
        titleEn: formData.get("titleEn"),
        content: formData.get("content"),
        contentEn: formData.get("contentEn"),
        thumbnail: formData.get("thumbnail"),
        slug: formData.get("slug"),
        images: formData
          .get("images")
          .split("\n")
          .filter((img) => img.trim()),
        videos: formData
          .get("videos")
          .split("\n")
          .filter((vid) => vid.trim()),
        published: formData.get("published") === "on",
      };

      if (editingArticle) {
        await axios.put(
          `${API_URL}/tech-articles/${editingArticle._id}`,
          articleData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Cập nhật bài viết thành công!");
      } else {
        await axios.post(`${API_URL}/tech-articles`, articleData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Thêm bài viết thành công!");
      }

      setShowForm(false);
      setEditingArticle(null);
      fetchArticles();
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Lỗi khi lưu bài viết");
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/tech-articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Xóa bài viết thành công!");
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Lỗi khi xóa bài viết");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingArticle(null);
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-tech-articles">
      <div className="admin-header">
        <h1>Quản Lý Bài Viết Công Nghệ</h1>
        {!showForm && (
          <button className="btn-add" onClick={() => setShowForm(true)}>
            ➕ Thêm Bài Viết Mới
          </button>
        )}
      </div>

      {showForm ? (
        <div className="article-form">
          <h2>{editingArticle ? "Chỉnh Sửa Bài Viết" : "Thêm Bài Viết Mới"}</h2>
          <form onSubmit={handleSave}>
            <div className="form-row">
              <div className="form-group">
                <label>Tiêu đề (Tiếng Việt) *</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingArticle?.title || ""}
                />
              </div>
              <div className="form-group">
                <label>Tiêu đề (English)</label>
                <input
                  type="text"
                  name="titleEn"
                  defaultValue={editingArticle?.titleEn || ""}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Slug (URL) *</label>
              <input
                type="text"
                name="slug"
                required
                defaultValue={editingArticle?.slug || ""}
                placeholder="vd: cong-nghe-xu-ly-nuoc"
              />
              <small>Chỉ dùng chữ thường, số và dấu gạch ngang</small>
            </div>

            <div className="form-group">
              <label>Ảnh thumbnail</label>
              <input
                type="url"
                name="thumbnail"
                defaultValue={editingArticle?.thumbnail || ""}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label>Nội dung (Tiếng Việt) * - Hỗ trợ HTML</label>
              <textarea
                name="content"
                rows="10"
                required
                defaultValue={editingArticle?.content || ""}
                placeholder="<h2>Tiêu đề</h2><p>Nội dung...</p>"
              />
            </div>

            <div className="form-group">
              <label>Nội dung (English) - Hỗ trợ HTML</label>
              <textarea
                name="contentEn"
                rows="10"
                defaultValue={editingArticle?.contentEn || ""}
                placeholder="<h2>Title</h2><p>Content...</p>"
              />
            </div>

            <div className="form-group">
              <label>Hình ảnh bổ sung (mỗi URL một dòng)</label>
              <textarea
                name="images"
                rows="4"
                defaultValue={editingArticle?.images?.join("\n") || ""}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              />
            </div>

            <div className="form-group">
              <label>Video URLs (mỗi URL một dòng)</label>
              <textarea
                name="videos"
                rows="3"
                defaultValue={editingArticle?.videos?.join("\n") || ""}
                placeholder="https://youtube.com/embed/..."
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={editingArticle?.published !== false}
                />
                <span>Xuất bản</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                💾 Lưu
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                ❌ Hủy
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="articles-list">
          <table className="articles-table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tiêu đề</th>
                <th>Slug</th>
                <th>Lượt xem</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id}>
                  <td>
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="article-thumbnail"
                      />
                    )}
                  </td>
                  <td>
                    <strong>{article.title}</strong>
                    {article.titleEn && (
                      <div className="subtitle">{article.titleEn}</div>
                    )}
                  </td>
                  <td>
                    <code>{article.slug}</code>
                  </td>
                  <td>{article.views || 0}</td>
                  <td>
                    <span
                      className={`status ${
                        article.published ? "published" : "draft"
                      }`}
                    >
                      {article.published ? "✅ Xuất bản" : "📝 Nháp"}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(article)}
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(article._id)}
                    >
                      🗑️ Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {articles.length === 0 && (
            <div className="no-data">Chưa có bài viết nào</div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminTechArticles;
