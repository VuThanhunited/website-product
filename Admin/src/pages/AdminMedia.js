import React, { useState, useEffect } from "react";
import {
  getMediaSlides,
  createMediaSlide,
  updateMediaSlide,
  deleteMediaSlide,
  getProducts,
} from "../services/api";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaImages,
  FaLink,
} from "react-icons/fa";
import "./AdminMedia.css";

const AdminMedia = () => {
  const [mediaSlides, setMediaSlides] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "image",
    url: "",
    caption: "",
    linkToProduct: "",
  });

  useEffect(() => {
    fetchMediaSlides();
    fetchProducts();
  }, []);

  const fetchMediaSlides = async () => {
    try {
      setLoading(true);
      const response = await getMediaSlides();
      setMediaSlides(response.data);
    } catch (error) {
      console.error("Error fetching media slides:", error);
      alert("Lỗi khi tải danh sách media");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        linkToProduct: formData.linkToProduct || null,
      };

      if (editingMedia) {
        await updateMediaSlide(editingMedia._id, dataToSend);
        alert("✅ Cập nhật media thành công!");
      } else {
        await createMediaSlide(dataToSend);
        alert("✅ Thêm media thành công!");
      }
      resetForm();
      fetchMediaSlides();
    } catch (error) {
      console.error("Error saving media:", error);
      alert("❌ Lỗi: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (media) => {
    setEditingMedia(media);
    setFormData({
      type: media.type,
      url: media.url,
      caption: media.caption || "",
      linkToProduct: media.linkToProduct?._id || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa media này?")) {
      try {
        setLoading(true);
        await deleteMediaSlide(id);
        alert("✅ Xóa media thành công!");
        fetchMediaSlides();
      } catch (error) {
        console.error("Error deleting media:", error);
        alert("❌ Lỗi khi xóa media");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      type: "image",
      url: "",
      caption: "",
      linkToProduct: "",
    });
    setEditingMedia(null);
    setShowForm(false);
  };

  return (
    <div className="admin-media-page">
      <div className="page-header">
        <h1>
          <FaImages /> Quản Lý Media Slideshow
        </h1>
        <button
          className="btn-add"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? (
            <>
              <FaTimes /> Đóng
            </>
          ) : (
            <>
              <FaPlus /> Thêm Media
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-container">
            <h2>{editingMedia ? "✏️ Sửa Media" : "➕ Thêm Media Mới"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Loại media *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="image">Hình ảnh</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div className="form-group">
                <label>URL Media *</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com/image.jpg"
                />
                <small>
                  Nhập URL trực tiếp của hình ảnh hoặc video (https://...)
                </small>
              </div>

              <div className="form-group">
                <label>Tiêu đề / Caption</label>
                <input
                  type="text"
                  name="caption"
                  value={formData.caption}
                  onChange={handleInputChange}
                  placeholder="VD: Sản phẩm mới nhất"
                />
              </div>

              <div className="form-group">
                <label>
                  <FaLink /> Liên kết đến sản phẩm (tùy chọn)
                </label>
                <select
                  name="linkToProduct"
                  value={formData.linkToProduct}
                  onChange={handleInputChange}
                >
                  <option value="">-- Không liên kết --</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading
                    ? "⏳ Đang xử lý..."
                    : editingMedia
                    ? "💾 Cập Nhật"
                    : "➕ Thêm Mới"}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={resetForm}
                  disabled={loading}
                >
                  ❌ Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="media-grid">
        {loading && !showForm ? (
          <div className="loading">⏳ Đang tải...</div>
        ) : mediaSlides.length === 0 ? (
          <div className="no-data">📭 Chưa có media nào</div>
        ) : (
          mediaSlides.map((media, index) => (
            <div key={media._id} className="media-card">
              <div className="media-number">#{index + 1}</div>
              <div className="media-preview">
                {media.type === "image" ? (
                  <img src={media.url} alt={media.caption} />
                ) : (
                  <video src={media.url} controls />
                )}
              </div>
              <div className="media-info">
                <div className="media-type-badge">
                  {media.type === "image" ? "🖼️ Hình ảnh" : "🎥 Video"}
                </div>
                {media.caption && <h4>{media.caption}</h4>}
                {media.linkToProduct && (
                  <div className="media-link">
                    <FaLink /> Liên kết: {media.linkToProduct.name}
                  </div>
                )}
              </div>
              <div className="media-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(media)}
                  title="Sửa"
                >
                  <FaEdit /> Sửa
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(media._id)}
                  title="Xóa"
                >
                  <FaTrash /> Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="page-footer">
        <p>
          Tổng số: <strong>{mediaSlides.length}</strong> media slides
        </p>
      </div>
    </div>
  );
};

export default AdminMedia;
