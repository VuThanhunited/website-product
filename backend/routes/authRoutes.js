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
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  changePassword,
  updateProfile,
  deleteUser,
  refreshToken,
  forgotPassword,
  verifyResetCode,
  resetPasswordWithCode,
} = require("../controllers/authController");
const { authorize } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.post("/refresh-token", refreshToken);

// Password reset routes (public)
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPasswordWithCode);

// Protected routes
router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, updateProfile);
router.post("/change-password", protect, changePassword);

// Admin only routes
router.get("/users", protect, authorize("admin"), getAllUsers);
router.put("/users/:userId/role", protect, authorize("admin"), updateUserRole);
router.put("/users/:userId/status", protect, authorize("admin"), updateUserStatus);
router.delete("/users/:userId", protect, authorize("admin"), deleteUser);

module.exports = router;
