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
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage (for non-logged users)
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Save to localStorage for non-logged users OR sync to backend for logged users
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  // Load cart from backend when user logs in
  const loadCartFromBackend = async () => {
    try {
      const response = await api.get("/cart");
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
      if (cartItems.length > 0) {
        await api.post("/cart/sync", { items: cartItems });
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
    if (isLoggedIn) {
      try {
        const response = await api.delete(`/cart/remove/${productId}`);
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
        console.error("Error removing from cart:", error);
      }
    } else {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
