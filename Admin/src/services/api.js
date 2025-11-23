import axios from "axios";
import { cacheService } from "./cacheService";

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
  timeout: 10000, // 10 seconds timeout
});

// Helper function để sử dụng cache
const cachedRequest = async (cacheKey, requestFn) => {
  // Kiểm tra cache trước
  const cached = cacheService.get(cacheKey);
  if (cached) {
    console.log(`📦 Cache hit: ${cacheKey}`);
    return Promise.resolve(cached);
  }

  // Nếu không có cache, thực hiện request
  console.log(`🌐 API call: ${cacheKey}`);
  const response = await requestFn();
  cacheService.set(cacheKey, response);
  return response;
};

// Products API
export const getProducts = (categoryId = null) => {
  const cacheKey = `products_${categoryId || "all"}`;
  const params = categoryId ? { category: categoryId } : {};
  return cachedRequest(cacheKey, () => api.get("/products", { params }));
};

export const getProductById = (id) => {
  const cacheKey = `product_${id}`;
  return cachedRequest(cacheKey, () => api.get(`/products/id/${id}`));
};

export const createProduct = (data) => {
  cacheService.clear(); // Clear all cache khi tạo mới
  return api.post("/products", data);
};

export const updateProduct = (id, data) => {
  cacheService.clear(); // Clear all cache khi update
  return api.put(`/products/${id}`, data);
};

export const deleteProduct = (id) => {
  cacheService.clear(); // Clear all cache khi xóa
  return api.delete(`/products/${id}`);
};

// Categories API
export const getCategories = () => {
  return cachedRequest("categories", () => api.get("/categories"));
};

export const createCategory = (data) => {
  cacheService.clear("categories");
  return api.post("/categories", data);
};

export const updateCategory = (id, data) => {
  cacheService.clear("categories");
  return api.put(`/categories/${id}`, data);
};

export const deleteCategory = (id) => {
  cacheService.clear("categories");
  return api.delete(`/categories/${id}`);
};

// Media Slides API
export const getMediaSlides = () => {
  return cachedRequest("media_slides", () => api.get("/media/slides"));
};

export const createMediaSlide = (data) => {
  cacheService.clear("media_slides");
  return api.post("/media/slides", data);
};

export const updateMediaSlide = (id, data) => {
  cacheService.clear("media_slides");
  return api.put(`/media/slides/${id}`, data);
};

export const deleteMediaSlide = (id) => {
  cacheService.clear("media_slides");
  return api.delete(`/media/slides/${id}`);
};

// Contact Messages API
export const getContactMessages = () => {
  return cachedRequest("contact_messages", () => api.get("/contact"));
};

export const deleteContactMessage = (id) => {
  cacheService.clear("contact_messages");
  return api.delete(`/contact/${id}`);
};

export default api;
