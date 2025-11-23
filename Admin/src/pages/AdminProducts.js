import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  getProducts,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/api";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    images: [],
    featured: false,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleImagesChange = useCallback((e) => {
    const urls = e.target.value.split("\n").filter((url) => url.trim());
    setFormData((prev) => ({ ...prev, images: urls }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        alert("✅ Cập nhật sản phẩm thành công!");
      } else {
        await createProduct(formData);
        alert("✅ Thêm sản phẩm thành công!");
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("❌ Lỗi: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category?._id || product.category,
      images: product.images || [],
      featured: product.featured || false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${name}"?`)) {
      try {
        setLoading(true);
        await deleteProduct(id);
        alert("✅ Xóa sản phẩm thành công!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("❌ Lỗi khi xóa sản phẩm");
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
      price: "",
      category: "",
      images: [],
      featured: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="admin-products-page">
      <div className="page-header">
        <h1>📦 Quản Lý Sản Phẩm</h1>
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
              <FaPlus /> Thêm Sản Phẩm
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-container">
            <h2>
              {editingProduct ? "✏️ Sửa Sản Phẩm" : "➕ Thêm Sản Phẩm Mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Tên sản phẩm *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="VD: Tai nghe Bluetooth"
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
                    placeholder="VD: tai-nghe-bluetooth"
                  />
                </div>

                <div className="form-group">
                  <label>Giá ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                    placeholder="VD: 99.99"
                  />
                </div>

                <div className="form-group">
                  <label>Danh mục *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả sản phẩm</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Nhập mô tả chi tiết về sản phẩm..."
                />
              </div>

              <div className="form-group">
                <label>URLs Hình ảnh (mỗi dòng một URL)</label>
                <textarea
                  name="images"
                  value={formData.images.join("\n")}
                  onChange={handleImagesChange}
                  rows="4"
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <span>⭐ Sản phẩm nổi bật</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading
                    ? "⏳ Đang xử lý..."
                    : editingProduct
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

      <div className="table-container">
        {loading && !showForm ? (
          <div className="loading">⏳ Đang tải...</div>
        ) : products.length === 0 ? (
          <div className="no-data">📭 Chưa có sản phẩm nào</div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Nổi bật</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="product-thumb"
                      />
                    ) : (
                      <div className="no-image">📷</div>
                    )}
                  </td>
                  <td className="product-name">{product.name}</td>
                  <td>{product.category?.name || "N/A"}</td>
                  <td className="price">${product.price}</td>
                  <td className="featured">{product.featured ? "⭐" : "-"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(product)}
                        title="Sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(product._id, product.name)}
                        title="Xóa"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="table-footer">
        <p>
          Tổng số: <strong>{products.length}</strong> sản phẩm
        </p>
      </div>
    </div>
  );
};

export default AdminProducts;
