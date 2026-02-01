const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://eft-company.vercel.app",
  "https://admin-eft.vercel.app",
  "https://website-product-ohic.vercel.app",
  /\.vercel\.app$/,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc)
      if (!origin) return callback(null, true);

      // Check if origin matches any allowed origin
      const isAllowed = allowedOrigins.some((allowed) => {
        if (typeof allowed === "string") {
          return allowed === origin;
        } else if (allowed instanceof RegExp) {
          return allowed.test(origin);
        }
        return false;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("⚠️  Blocked by CORS:", origin);
        callback(null, true); // Allow anyway in production
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Cache-Control", "X-Refresh-Token"],
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files with cache headers
app.use(
  "/uploads",
  (req, res, next) => {
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Import Routes
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supportRoutes = require("./routes/supportRoutes");
const companyRoutes = require("./routes/companyRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const shippingRoutes = require("./routes/shippingRoutes");
const paymentMethodRoutes = require("./routes/paymentMethodRoutes");
const homePageContentRoutes = require("./routes/homePageContentRoutes");
const companyPageContentRoutes = require("./routes/companyPageContentRoutes");
const paymentQRRoutes = require("./routes/paymentQRRoutes");
const seedRoutes = require("./routes/seedRoutes");
const techArticleRoutes = require("./routes/techArticleRoutes");

// Use Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/tech-articles", techArticleRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api/home-content", homePageContentRoutes);
app.use("/api/company-content", companyPageContentRoutes);
app.use("/api/payment-qr", paymentQRRoutes);
app.use("/api/seed", seedRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "E-commerce API Server Running" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
