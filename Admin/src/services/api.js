import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products API
export const getProducts = (categoryId = null) => {
  const params = categoryId ? { category: categoryId } : {};
  return api.get("/products", { params });
};

export const getProductById = (id) => api.get(`/products/id/${id}`);
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Categories API
export const getCategories = () => api.get("/categories");
export const createCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Media Slides API
export const getMediaSlides = () => api.get("/media/slides");
export const createMediaSlide = (data) => api.post("/media/slides", data);
export const updateMediaSlide = (id, data) =>
  api.put(`/media/slides/${id}`, data);
export const deleteMediaSlide = (id) => api.delete(`/media/slides/${id}`);

// Contact Messages API
export const getContactMessages = () => api.get("/contact");
export const deleteContactMessage = (id) => api.delete(`/contact/${id}`);

export default api;
