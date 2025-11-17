// API Base URL Helper
const API_BASE_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.replace("/api", "")
  : process.env.NODE_ENV === "production"
  ? "https://website-product-1.onrender.com"
  : "http://localhost:5000";

// Placeholder image when original fails
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';

// Get full URL for static assets (images, uploads)
export const getAssetUrl = (path) => {
  if (!path) return PLACEHOLDER_IMAGE;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${API_BASE_URL}${path}`;
};

// Handle image load error
export const handleImageError = (e) => {
  e.target.onerror = null; // Prevent infinite loop
  e.target.src = PLACEHOLDER_IMAGE;
};

// Get API base URL
export const getApiBaseUrl = () => API_BASE_URL;

export default {
  getAssetUrl,
  getApiBaseUrl,
  handleImageError,
  PLACEHOLDER_IMAGE
};
