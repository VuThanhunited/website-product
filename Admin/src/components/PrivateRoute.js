import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://website-product-1.onrender.com/api"
    : "http://localhost:5000/api");

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.data.user.role === "admin") {
        setIsAuthenticated(true);
        setIsAdmin(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      }
    } catch (error) {
      console.error("Auth verification failed:", error);
      setIsAuthenticated(false);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    }
  };

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "24px",
          color: "#667eea",
        }}
      >
        ⏳ Đang xác thực...
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated
  return children;
};

export default PrivateRoute;
