import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize cart on mount
  useEffect(() => {
    initializeCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        // User is logged in, load from backend
        setIsLoggedIn(true);
        await loadCartFromBackend();
      } else {
        // User not logged in, load from localStorage
        setIsLoggedIn(false);
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
    } catch (error) {
      console.error("Error initializing cart:", error);
      // Fallback to localStorage
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Save to localStorage for non-logged users
  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn, isLoading]);

  // Load cart from backend when user logs in
  const loadCartFromBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.items) {
        const formattedItems = response.data.items.map((item) => ({
          _id: item.productId._id || item.productId,
          name: item.name,
          nameEn: item.nameEn,
          price: item.price,
          images: item.images,
          quantity: item.quantity,
        }));
        setCartItems(formattedItems);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  // Sync local cart to backend when user logs in
  const syncCartToBackend = async () => {
    try {
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        const items = JSON.parse(localCart);
        if (items.length > 0) {
          await api.post("/cart/sync", { items });
        }
      }
      await loadCartFromBackend();
      localStorage.removeItem("cart"); // Clear local cart after sync
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (isLoggedIn) {
      try {
        const response = await api.post("/cart/add", {
          productId: product._id,
          quantity,
        });
        if (response.data && response.data.items) {
          const formattedItems = response.data.items.map((item) => ({
            _id: item.productId._id || item.productId,
            name: item.name,
            nameEn: item.nameEn,
            price: item.price,
            images: item.images,
            quantity: item.quantity,
          }));
          setCartItems(formattedItems);
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item._id === product._id);

        if (existingItem) {
          return prevItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevItems, { ...product, quantity }];
        }
      });
    }
  };

  const removeFromCart = async (productId) => {
    console.log("🗑️ Removing product from cart:", productId);
    if (isLoggedIn) {
      try {
        const response = await api.delete(`/cart/remove/${productId}`);
        console.log("✅ Remove response:", response.data);
        if (response.data && response.data.items) {
          const formattedItems = response.data.items.map((item) => ({
            _id: item.productId._id || item.productId,
            name: item.name,
            nameEn: item.nameEn,
            price: item.price,
            images: item.images,
            quantity: item.quantity,
          }));
          setCartItems(formattedItems);
          console.log("✅ Item removed successfully");
        }
      } catch (error) {
        console.error("❌ Error removing from cart:", error);
        alert("Không thể xóa sản phẩm. Vui lòng thử lại!");
      }
    } else {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );
      console.log("✅ Item removed from local cart");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (isLoggedIn) {
      try {
        const response = await api.put("/cart/update", {
          productId,
          quantity,
        });
        if (response.data && response.data.items) {
          const formattedItems = response.data.items.map((item) => ({
            _id: item.productId._id || item.productId,
            name: item.name,
            nameEn: item.nameEn,
            price: item.price,
            images: item.images,
            quantity: item.quantity,
          }));
          setCartItems(formattedItems);
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (isLoggedIn) {
      try {
        await api.delete("/cart/clear");
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart: cartItems,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    syncCartToBackend,
    loadCartFromBackend,
    setIsLoggedIn,
    isLoading,
    initializeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
