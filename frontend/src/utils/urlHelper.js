// API Base URL Helper
const API_BASE_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.replace("/api", "")
  : process.env.NODE_ENV === "production"
  ? "https://website-product-1.onrender.com"
  : "http://localhost:5000";

// Debug log - Always show to verify environment
console.log("🔧 [urlHelper] API_BASE_URL:", API_BASE_URL);
console.log("🔧 [urlHelper] NODE_ENV:", process.env.NODE_ENV);
console.log("🔧 [urlHelper] REACT_APP_API_URL:", process.env.REACT_APP_API_URL);
console.log(
  "🔧 [urlHelper] window.location.hostname:",
  window.location.hostname
);
console.log("🔧 [urlHelper] Version: 2.0 - Data URL support added");

// Placeholder image when original fails
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';

// Get full URL for static assets (images, uploads)
export const getAssetUrl = (path) => {
  if (!path) return PLACEHOLDER_IMAGE;
  // Handle data URLs (inline SVG, base64, etc.)
  if (path.startsWith("data:")) {
    return path;
  }
  // Handle external URLs
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Handle relative paths
  return `${API_BASE_URL}${path}`;
};

// Handle image load error
export const handleImageError = (e) => {
  e.target.onerror = null; // Prevent infinite loop
  e.target.src = PLACEHOLDER_IMAGE;
};

// Get API base URL
export const getApiBaseUrl = () => API_BASE_URL;

const urlHelper = {
  getAssetUrl,
  getApiBaseUrl,
  handleImageError,
  PLACEHOLDER_IMAGE,
};

export default urlHelper;
