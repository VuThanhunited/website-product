import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";
import "../styles/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, isLoading } =
    useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (!authLoading && !hasChecked) {
      setHasChecked(true);
      if (!isAuthenticated) {
        alert(t.loginRequired);
        navigate("/login");
      }
    }
  }, [isAuthenticated, authLoading, navigate, t.loginRequired, hasChecked]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert(t.loginRequired);
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) {
      alert(t.cartEmpty);
      return;
    }
    navigate("/checkout");
  };

  if (!isAuthenticated && !authLoading) {
    return null;
  }

  if (isLoading || authLoading) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Đang tải giỏ hàng...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <FaShoppingCart className="empty-cart-icon" />
            <h2>{t.cartEmpty || "Giỏ hàng trống"}</h2>
            <p>
              {t.cartEmptyDesc || "Bạn chưa có sản phẩm nào trong giỏ hàng"}
            </p>
            <Link to="/products" className="btn-primary">
              {t.continueShopping || "Tiếp tục mua sắm"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>{t.shoppingCart || "Giỏ hàng của bạn"}</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  {item.images && item.images[0] && (
                    <img
                      src={item.images[0]}
                      alt={
                        language === "en" && item.nameEn
                          ? item.nameEn
                          : item.name
                      }
                    />
                  )}
                </div>

                <div className="cart-item-info">
                  <h3>
                    {language === "en" && item.nameEn ? item.nameEn : item.name}
                  </h3>
                  <p className="cart-item-price">
                    {item.price.toLocaleString("vi-VN")} ₫
                  </p>
                </div>

                <div className="cart-item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    <FaMinus />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>

                <div className="cart-item-total">
                  <p>
                    {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                  </p>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => {
                    console.log("Removing item:", item._id);
                    removeFromCart(item._id);
                  }}
                  title={t.remove || "Xóa"}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>{t.orderSummary || "Tóm tắt đơn hàng"}</h2>

            <div className="summary-row">
              <span>{t.subtotal || "Tạm tính"}:</span>
              <span>{getCartTotal().toLocaleString("vi-VN")} ₫</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>{t.total || "Tổng cộng"}:</span>
              <span className="total-amount">
                {getCartTotal().toLocaleString("vi-VN")} ₫
              </span>
            </div>

            <div className="shipping-note">
              <p
                style={{ fontSize: "0.9em", color: "#666", marginTop: "10px" }}
              >
                {language === "vi"
                  ? "* Phí vận chuyển sẽ được tính ở bước thanh toán dựa trên địa chỉ giao hàng"
                  : "* Shipping fee will be calculated at checkout based on delivery address"}
              </p>
            </div>

            <button className="btn-checkout" onClick={handleCheckout}>
              {t.proceedToCheckout || "Tiến hành thanh toán"}
            </button>

            <Link to="/products" className="continue-shopping-link">
              {t.continueShopping || "Tiếp tục mua sắm"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
