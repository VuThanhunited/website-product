import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug, getProductById } from "../services/api";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError("Không tìm thấy sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải sản phẩm...</p>
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
    return <div className="loading">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail">
          <div className="product-media">
            <div className="main-media">
              {product.images && product.images[selectedImage] && (
                <img src={product.images[selectedImage]} alt={product.name} />
              )}
            </div>
            <div className="media-thumbnails">
              {product.images &&
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={selectedImage === index ? "active" : ""}
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
            <h1>{product.name}</h1>
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
              <button className="btn-primary">Thêm vào giỏ hàng</button>
            </div>

            <div className="product-category">
              <strong>Danh mục:</strong> {product.category?.name}
            </div>
          </div>
        </div>

        <div className="product-description">
          <h2>Mô tả sản phẩm</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
