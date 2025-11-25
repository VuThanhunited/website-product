const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getCurrentUser,
  protect,
  verifyToken,
  adminLogin,
} = require("../controllers/authController");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);
router.post("/logout", logout);
router.get("/verify", verifyToken);

// Protected routes
router.get("/me", protect, getCurrentUser);

module.exports = router;
