import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://website-product-1.onrender.com/api"
    : "http://localhost:5000/api");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Only redirect to login if not already on auth pages
      const currentPath = window.location.pathname;
      if (!["/login", "/register"].includes(currentPath)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Products
export const getProducts = (categoryId = null) => {
  const params = categoryId ? { category: categoryId } : {};
  return api.get("/products", { params });
};

export const getProductBySlug = (slug) => api.get(`/products/${slug}`);
export const getProductById = (id) => api.get(`/products/id/${id}`);
export const getFeaturedProducts = () => api.get("/products/featured");

// Categories
export const getCategories = () => api.get("/categories");
export const getCategoryBySlug = (slug) => api.get(`/categories/${slug}`);

// Support
export const getSupportArticles = () => api.get("/support");
export const getSupportArticleBySlug = (slug) => api.get(`/support/${slug}`);

// Company
export const getCompanyInfo = () => api.get("/company");

// Media
export const getMediaSlides = () => api.get("/media/slides");
export const getSlogans = () => api.get("/media/slogans");

// Contact
export const submitContactForm = (data) => api.post("/contact", data);

export default api;
