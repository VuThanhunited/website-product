import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
