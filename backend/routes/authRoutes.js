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
} = require("../controllers/authController");
const { authorize } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);
router.post("/logout", logout);
router.get("/verify", verifyToken);

// Protected routes
router.get("/me", protect, getCurrentUser);
router.post("/change-password", protect, changePassword);

// Admin only routes
router.get("/users", protect, authorize("admin"), getAllUsers);
router.put("/users/:userId/role", protect, authorize("admin"), updateUserRole);
router.put(
  "/users/:userId/status",
  protect,
  authorize("admin"),
  updateUserStatus
);

module.exports = router;
