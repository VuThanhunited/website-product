import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTh, FaList, FaSearch, FaTimes } from "react-icons/fa";
import { getProducts, getCategories } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import LazyImage from "../components/LazyImage";
import "../styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    // Check for search query in URL
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
      setIsSearching(true);
      handleSearchFilter(search, allProducts);
    }
  }, [location.search, allProducts]);

  useEffect(() => {
    if (!isSearching) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory, isSearching]);

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
      if (!categoryId) {
        setAllProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchFilter = (query, productsToFilter) => {
    if (!query.trim()) {
      setProducts(productsToFilter);
      return;
    }

    const searchLower = query.toLowerCase().trim();
    const filtered = productsToFilter.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const nameEn = product.nameEn?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      const descriptionEn = product.descriptionEn?.toLowerCase() || "";

      return (
        name.includes(searchLower) ||
        nameEn.includes(searchLower) ||
        description.includes(searchLower) ||
        descriptionEn.includes(searchLower)
      );
    });

    setProducts(filtered);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      setSelectedCategory(null);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    navigate("/products");
    fetchProducts();
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          <aside className="sidebar">
            <h3>{t.productCategories}</h3>
            <ul className="category-list">
              <li
                className={!selectedCategory ? "active" : ""}
                onClick={() => setSelectedCategory(null)}
              >
                {t.allProducts}
              </li>
              {categories.map((category) => {
                const displayName =
                  language === "en" && category.nameEn
                    ? category.nameEn
                    : category.name;

                return (
                  <li
                    key={category._id}
                    className={
                      selectedCategory === category._id ? "active" : ""
                    }
                    onClick={() => setSelectedCategory(category._id)}
                  >
                    {displayName}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="products-content">
            <div className="products-header">
              <h1>{t.products}</h1>
              <div className="products-controls">
                <form
                  className="products-search-form"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    type="text"
                    placeholder={t.searchProducts}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="products-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="clear-search-btn"
                    >
                      <FaTimes />
                    </button>
                  )}
                  <button type="submit" className="products-search-btn">
                    <FaSearch />
                  </button>
                </form>
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
            </div>

            {isSearching && (
              <div className="search-info">
                <p>
                  {t.searchResults || "Kết quả tìm kiếm"}:{" "}
                  <strong>"{searchQuery}"</strong> ({products.length}{" "}
                  {t.products?.toLowerCase() || "sản phẩm"})
                </p>
                <button onClick={clearSearch} className="clear-search-link">
                  {t.clearSearch || "Xóa tìm kiếm"}
                </button>
              </div>
            )}

            <div className={`products-grid ${viewMode}`}>
              {products.map((product) => (
                <Link
                  to={`/products/${product.slug}`}
                  key={product._id}
                  className="product-card"
                >
                  {product.images && product.images[0] && (
                    <LazyImage
                      src={product.images[0]}
                      alt={
                        language === "en" && product.nameEn
                          ? product.nameEn
                          : product.name
                      }
                      className="product-image"
                    />
                  )}
                  <div className="product-info">
                    <h3>
                      {language === "en" && product.nameEn
                        ? product.nameEn
                        : product.name}
                    </h3>
                    <p className="price">
                      {product.price.toLocaleString("vi-VN")} ₫
                    </p>
                    {viewMode === "list" && (
                      <p className="description">
                        {(language === "en" && product.descriptionEn
                          ? product.descriptionEn
                          : product.description
                        )?.substring(0, 100)}
                        ...
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
