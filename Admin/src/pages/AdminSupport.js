import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaFile } from "react-icons/fa";
import axios from "axios";
import "./AdminSupport.css";

const AdminSupport = () => {
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: "",
    images: "",
    videos: "",
    attachments: [],
    slug: "",
    published: true,
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/support");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const articleData = {
        ...formData,
        images: formData.images
          .split("\n")
          .filter((url) => url.trim())
          .map((url) => url.trim()),
        videos: formData.videos
          .split("\n")
          .filter((url) => url.trim())
          .map((url) => url.trim()),
      };

      if (editingArticle) {
        await axios.put(`/api/support/${editingArticle._id}`, articleData);
      } else {
        await axios.post("/api/support", articleData);
      }

      setShowModal(false);
      resetForm();
      fetchArticles();
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Lỗi khi lưu bài viết: " + error.message);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      thumbnail: article.thumbnail || "",
      images: article.images ? article.images.join("\n") : "",
      videos: article.videos ? article.videos.join("\n") : "",
      attachments: article.attachments || [],
      slug: article.slug,
      published: article.published,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      try {
        await axios.delete(`/api/support/${id}`);
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      thumbnail: "",
      images: "",
      videos: "",
      attachments: [],
      slug: "",
      published: true,
    });
    setEditingArticle(null);
  };

  const handleAddAttachment = () => {
    const filename = prompt("Nhập tên file:");
    const filepath = prompt("Nhập URL file:");
    const filesize = prompt("Nhập kích thước file (bytes):");

    if (filename && filepath && filesize) {
      setFormData({
        ...formData,
        attachments: [
          ...formData.attachments,
          {
            filename,
            filepath,
            filesize: parseInt(filesize),
          },
        ],
      });
    }
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      attachments: newAttachments,
    });
  };

  return (
    <div className="admin-support">
      <div className="page-header">
        <h1>Quản lý bài viết hỗ trợ</h1>
        <button
          className="btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FaPlus /> Thêm bài viết mới
        </button>
      </div>

      <div className="articles-table">
        <table>
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Tiêu đề</th>
              <th>Slug</th>
              <th>Lượt xem</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>
                  {article.thumbnail ? (
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="thumbnail-preview"
                    />
                  ) : (
                    <div className="no-thumbnail">📄</div>
                  )}
                </td>
                <td className="article-title">{article.title}</td>
                <td className="article-slug">{article.slug}</td>
                <td>
                  <span className="views">
                    <FaEye /> {article.views}
                  </span>
                </td>
                <td>
                  <span
                    className={`status ${
                      article.published ? "published" : "draft"
                    }`}
                  >
                    {article.published ? "Đã xuất bản" : "Bản nháp"}
                  </span>
                </td>
                <td>
                  {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(article)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(article._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {editingArticle ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
              </h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tiêu đề *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="vd: huong-dan-su-dung-san-pham"
                  required
                />
              </div>

              <div className="form-group">
                <label>Thumbnail URL</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  placeholder="URL hình ảnh đại diện"
                />
                {formData.thumbnail && (
                  <img
                    src={formData.thumbnail}
                    alt="Preview"
                    className="thumbnail-preview-large"
                  />
                )}
              </div>

              <div className="form-group">
                <label>Nội dung *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows="10"
                  placeholder="Nội dung bài viết (hỗ trợ HTML)"
                  required
                />
              </div>

              <div className="form-group">
                <label>Hình ảnh (mỗi URL một dòng)</label>
                <textarea
                  value={formData.images}
                  onChange={(e) =>
                    setFormData({ ...formData, images: e.target.value })
                  }
                  rows="3"
                  placeholder="URL hình ảnh&#10;Mỗi URL một dòng"
                />
              </div>

              <div className="form-group">
                <label>Video (mỗi URL một dòng)</label>
                <textarea
                  value={formData.videos}
                  onChange={(e) =>
                    setFormData({ ...formData, videos: e.target.value })
                  }
                  rows="3"
                  placeholder="URL video&#10;Mỗi URL một dòng"
                />
              </div>

              <div className="form-group">
                <label>File đính kèm</label>
                <button
                  type="button"
                  className="btn-add-attachment"
                  onClick={handleAddAttachment}
                >
                  <FaFile /> Thêm file
                </button>
                <div className="attachments-list">
                  {formData.attachments.map((attachment, index) => (
                    <div key={index} className="attachment-item">
                      <span className="attachment-name">
                        <FaFile /> {attachment.filename}
                      </span>
                      <span className="attachment-size">
                        {(attachment.filesize / 1024).toFixed(2)} KB
                      </span>
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => handleRemoveAttachment(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                  />
                  Xuất bản ngay
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingArticle ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;
