import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug, getProductById } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { translations } from "../utils/translations";
import LazyImage from "../components/LazyImage";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const t = translations[language];

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert(t.loginRequired);
      navigate("/login");
      return;
    }
    addToCart(product, quantity);
    alert(t.addedToCart);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      alert(t.loginRequired);
      navigate("/login");
      return;
    }
    addToCart(product, quantity);
    navigate("/cart");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Kiểm tra xem slug có phải là MongoDB ID không (24 ký tự hex)
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(slug);

        let response;
        if (isMongoId) {
          response = await getProductById(slug);
        } else {
          response = await getProductBySlug(slug);
        }

        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(t.productNotFound);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug, t.productNotFound]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t.loadingProduct}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <div className="loading">{t.productNotFound}</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail">
          <div className="product-media">
            <div className="main-media">
              {product.images && product.images[selectedImage] && (
                <LazyImage
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="main-product-image"
                />
              )}
            </div>
            <div className="media-thumbnails">
              {product.images &&
                product.images.map((image, index) => (
                  <LazyImage
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={
                      selectedImage === index
                        ? "active thumbnail-image"
                        : "thumbnail-image"
                    }
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              {product.videos &&
                product.videos.map((video, index) => (
                  <div
                    key={`video-${index}`}
                    className="video-thumbnail"
                    onClick={() =>
                      setSelectedImage(product.images.length + index)
                    }
                  >
                    <span>Video {index + 1}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="product-info">
            <h1>
              {language === "en" && product.nameEn
                ? product.nameEn
                : product.name}
            </h1>
            <p className="price">{product.price.toLocaleString("vi-VN")} ₫</p>

            {product.options && product.options.length > 0 && (
              <div className="product-options">
                {product.options.map((option, index) => (
                  <div key={index} className="option-group">
                    <label>{option.name}:</label>
                    <select>
                      {option.values.map((value, vIndex) => (
                        <option key={vIndex}>{value}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            <div className="product-actions">
              <div className="quantity-selector">
                <label>{t.quantity || "Quantity"}:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    min="1"
                    className="quantity-input"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="action-buttons">
                <button className="btn-primary" onClick={handleAddToCart}>
                  {t.addToCart}
                </button>
                <button className="btn-buy-now" onClick={handleBuyNow}>
                  {t.buyNow || "Buy Now"}
                </button>
              </div>
            </div>

            <div className="product-category">
              <strong>{t.categories}:</strong>{" "}
              {language === "en" && product.category?.nameEn
                ? product.category.nameEn
                : product.category?.name}
            </div>
          </div>
        </div>

        <div className="product-description">
          <h2>{t.description}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html:
                language === "en" && product.descriptionEn
                  ? product.descriptionEn
                  : product.description,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
