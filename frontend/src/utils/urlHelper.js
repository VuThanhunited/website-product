// API Base URL Helper
const API_BASE_URL = process.env.REACT_APP_API_URL 
  ? process.env.REACT_APP_API_URL.replace('/api', '')
  : (process.env.NODE_ENV === 'production' 
      ? "https://website-product-1.onrender.com" 
      : "http://localhost:5000");

// Get full URL for static assets (images, uploads)
export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${API_BASE_URL}${path}`;
};

// Get API base URL
export const getApiBaseUrl = () => API_BASE_URL;

export default {
  getAssetUrl,
  getApiBaseUrl
};
