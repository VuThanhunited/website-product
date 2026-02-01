import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token with backend
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      // Token is invalid or expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { token, user: userData } = response.data;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Update state
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, message: "Đăng nhập thành công!" };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          "Đăng nhập thất bại. Vui lòng thử lại.",
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      await api.post(
        "/auth/register",
        { username, email, password },
        { withCredentials: true }
      );

      return {
        success: true,
        message: "Đăng ký thành công! Vui lòng đăng nhập.",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.error || "Đăng ký thất bại. Vui lòng thử lại.",
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state even if API call fails
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
