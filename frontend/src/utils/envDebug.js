// Debug script to check environment
console.log("=== ENVIRONMENT DEBUG ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("REACT_APP_API_URL:", process.env.REACT_APP_API_URL);

// Check what urlHelper will return
const API_BASE_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.replace("/api", "")
  : process.env.NODE_ENV === "production"
  ? "https://website-product-1.onrender.com"
  : "http://localhost:5000";

console.log("API_BASE_URL calculated:", API_BASE_URL);
console.log("========================");

export default API_BASE_URL;
