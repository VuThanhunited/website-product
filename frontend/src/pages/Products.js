import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTh, FaList } from "react-icons/fa";
import { getProducts, getCategories } from "../services/api";
import "../styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (categoryId = null) => {
    try {
      const response = await getProducts(categoryId);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          <aside className="sidebar">
            <h3>Danh mục</h3>
            <ul className="category-list">
              <li
                className={!selectedCategory ? "active" : ""}
                onClick={() => setSelectedCategory(null)}
              >
                Tất cả sản phẩm
              </li>
              {categories.map((category) => {
                // Dịch tên danh mục
                const categoryNames = {
                  Electronics: "Điện tử",
                  Clothing: "Quần áo",
                  "Home & Garden": "Nhà cửa & Vườn",
                  Sports: "Thể thao",
                };
                const translatedName =
                  categoryNames[category.name] || category.name;

                return (
                  <li
                    key={category._id}
                    className={
                      selectedCategory === category._id ? "active" : ""
                    }
                    onClick={() => setSelectedCategory(category._id)}
                  >
                    {translatedName}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="products-content">
            <div className="products-header">
              <h1>Sản phẩm</h1>
              <div className="view-toggle">
                <button
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <FaTh />
                </button>
                <button
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <FaList />
                </button>
              </div>
            </div>

            <div className={`products-grid ${viewMode}`}>
              {products.map((product) => (
                <Link
                  to={`/products/${product.slug}`}
                  key={product._id}
                  className="product-card"
                >
                  {product.images && product.images[0] && (
                    <img src={product.images[0]} alt={product.name} />
                  )}
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">
                      {product.price.toLocaleString("vi-VN")} ₫
                    </p>
                    {viewMode === "list" && (
                      <p className="description">
                        {product.description?.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
