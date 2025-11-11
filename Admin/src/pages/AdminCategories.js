import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/api";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaTags } from "react-icons/fa";
import "./AdminCategories.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Lỗi khi tải danh sách danh mục");
    } finally {
      setLoading(false);
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
      if (editingCategory) {
        await updateCategory(editingCategory._id, formData);
        alert("✅ Cập nhật danh mục thành công!");
      } else {
        await createCategory(formData);
        alert("✅ Thêm danh mục thành công!");
      }
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("❌ Lỗi: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) {
      try {
        setLoading(true);
        await deleteCategory(id);
        alert("✅ Xóa danh mục thành công!");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("❌ Lỗi khi xóa danh mục");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
    });
    setEditingCategory(null);
    setShowForm(false);
  };

  return (
    <div className="admin-categories-page">
      <div className="page-header">
        <h1>
          <FaTags /> Quản Lý Danh Mục
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
              <FaPlus /> Thêm Danh Mục
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-container">
            <h2>
              {editingCategory ? "✏️ Sửa Danh Mục" : "➕ Thêm Danh Mục Mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên danh mục *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="VD: Điện tử"
                />
              </div>

              <div className="form-group">
                <label>Slug (URL) *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="VD: dien-tu"
                />
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Nhập mô tả cho danh mục..."
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading
                    ? "⏳ Đang xử lý..."
                    : editingCategory
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

      <div className="categories-grid">
        {loading && !showForm ? (
          <div className="loading">⏳ Đang tải...</div>
        ) : categories.length === 0 ? (
          <div className="no-data">📭 Chưa có danh mục nào</div>
        ) : (
          categories.map((category) => (
            <div key={category._id} className="category-card">
              <div className="category-icon">
                <FaTags />
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p className="category-slug">/{category.slug}</p>
                {category.description && (
                  <p className="category-desc">{category.description}</p>
                )}
              </div>
              <div className="category-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(category)}
                  title="Sửa"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(category._id, category.name)}
                  title="Xóa"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="page-footer">
        <p>
          Tổng số: <strong>{categories.length}</strong> danh mục
        </p>
      </div>
    </div>
  );
};

export default AdminCategories;
