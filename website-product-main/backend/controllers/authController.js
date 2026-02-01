const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Tokens (Access + Refresh)
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: process.env.JWT_EXPIRE || "1h",
  });

  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key", {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || "90d",
  });

  return { accessToken, refreshToken };
};

// Legacy function for backward compatibility
const generateToken = (userId) => {
  return generateTokens(userId).accessToken;
};

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "Email đã được sử dụng" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: "Tên đăng nhập đã được sử dụng" });
      }
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    });

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
    });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        fullName: user.fullName || "",
        phone: user.phone || "",
        address: user.address || "",
      },
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email hoặc tên đăng nhập đã tồn tại" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Vui lòng nhập email và mật khẩu" });
    }

    // Find user with password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ error: "Tài khoản không tồn tại" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Email hoặc mật khẩu không đúng" });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({ error: "Tài khoản đã bị khóa" });
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
      sameSite: "strict",
    });

    res.json({
      message: "Đăng nhập thành công",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        fullName: user.fullName || "",
        phone: user.phone || "",
        address: user.address || "",
      },
      token: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // Clear refresh token from database
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
    }

    // Clear cookies
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.cookie("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.json({ message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Refresh Access Token
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken || req.headers["x-refresh-token"];

    if (!refreshToken) {
      return res.status(401).json({
        error: "Không tìm thấy refresh token",
        message: "Vui lòng đăng nhập lại",
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key");

    // Find user and check if refresh token matches
    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        error: "Refresh token không hợp lệ",
        message: "Vui lòng đăng nhập lại",
      });
    }

    // Generate new access token
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    // Update refresh token in database
    user.refreshToken = newRefreshToken;
    await user.save();

    // Set new cookies
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "strict",
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
      sameSite: "strict",
    });

    res.json({
      success: true,
      message: "Token đã được làm mới",
      token: accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Refresh token đã hết hạn",
        message: "Vui lòng đăng nhập lại",
        expired: true,
      });
    }

    return res.status(401).json({
      error: "Refresh token không hợp lệ",
      message: error.message,
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        address: user.address || "",
        phone: user.phone || "",
        fullName: user.fullName || "",
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    console.log("📝 Updating profile...");
    console.log("   User ID:", req.user.id);
    console.log("   Request body:", req.body);

    const { fullName, phone, address, email } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      console.error("❌ User not found:", req.user.id);
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    console.log("   Current user:", {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    });

    // Update fields (only if provided)
    if (fullName !== undefined) user.fullName = fullName;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.error("❌ Email already in use:", email);
        return res.status(400).json({
          success: false,
          message: "Email này đã được sử dụng",
        });
      }
      user.email = email;
    }

    console.log("   Saving updated user...");
    await user.save({ validateBeforeSave: true });

    console.log("✅ Profile updated successfully!");

    res.json({
      success: true,
      message: "Cập nhật thông tin thành công",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("❌ Update profile error:");
    console.error("   Error name:", error.name);
    console.error("   Error message:", error.message);
    console.error("   Error stack:", error.stack);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Lỗi khi cập nhật thông tin",
    });
  }
};

// Verify token middleware
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check cookie
    if (req.cookies.token) {
      token = req.cookies.token;
    }
    // Check Authorization header
    else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        error: "Vui lòng đăng nhập",
        message: "Không tìm thấy token xác thực",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    // Get user
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        error: "Người dùng không tồn tại",
        message: "Tài khoản đã bị xóa hoặc không còn tồn tại",
      });
    }

    next();
  } catch (error) {
    // Check if token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Phiên đăng nhập đã hết hạn",
        message: "Token đã hết hạn. Vui lòng đăng nhập lại.",
        expired: true,
      });
    }

    // Other JWT errors
    return res.status(401).json({
      error: "Token không hợp lệ",
      message: error.message || "Xác thực thất bại",
    });
  }
};

// Authorize roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Vui lòng đăng nhập" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Bạn không có quyền truy cập chức năng này",
      });
    }

    next();
  };
};

// Verify token (public endpoint)
exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Tài khoản không tồn tại",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token không hợp lệ",
    });
  }
};

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập email và mật khẩu",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    // Kiểm tra role admin
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền truy cập trang quản trị",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Tài khoản đã bị khóa",
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user role (Admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Quyền không hợp lệ. Chỉ được phép: user hoặc admin",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: `Đã cập nhật quyền thành ${role}`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user status (Admin only)
exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    user.isActive = isActive;
    await user.save();

    res.json({
      success: true,
      message: `Đã ${isActive ? "kích hoạt" : "khóa"} tài khoản`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change own password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu mới phải có ít nhất 6 ký tự",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu hiện tại không đúng",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Không cho phép admin xóa chính mình
    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "Không thể xóa tài khoản của chính mình",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    // Lưu thông tin trước khi xóa
    const deletedUserInfo = {
      email: user.email,
      username: user.username,
    };

    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: `Đã xóa tài khoản ${deletedUserInfo.username} (${deletedUserInfo.email})`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password - Request reset code
exports.forgotPassword = async (req, res) => {
  try {
    const { identifier, method } = req.body; // identifier can be email or phone

    if (!identifier || !method) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập email hoặc số điện thoại và chọn phương thức nhận mã",
      });
    }

    if (!["email", "sms"].includes(method)) {
      return res.status(400).json({
        success: false,
        message: "Phương thức không hợp lệ",
      });
    }

    // Find user by email or phone
    let user;
    if (method === "email") {
      user = await User.findOne({ email: identifier });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy tài khoản với email này",
        });
      }
    } else {
      // SMS method - find by phone
      user = await User.findOne({ phone: identifier });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy tài khoản với số điện thoại này",
        });
      }
    }

    // Generate 6-digit code
    const { generateVerificationCode } = require("../services/smsService");
    const code = generateVerificationCode();

    // Save reset token
    const PasswordResetToken = require("../models/PasswordResetToken");

    // Delete old tokens for this user
    await PasswordResetToken.deleteMany({ userId: user._id, isUsed: false });

    // Create new token
    await PasswordResetToken.create({
      userId: user._id,
      code: code,
      method: method,
      contactInfo: identifier,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    });

    // Send code via email or SMS
    if (method === "email") {
      const { sendPasswordResetEmail } = require("../services/emailServiceBrevo");
      await sendPasswordResetEmail(identifier, code, user.username);

      res.json({
        success: true,
        message: "Mã xác thực đã được gửi đến email của bạn",
        method: "email",
      });
    } else {
      const { sendPasswordResetSMS } = require("../services/smsService");
      await sendPasswordResetSMS(identifier, code);

      res.json({
        success: true,
        message: "Mã xác thực đã được gửi đến số điện thoại của bạn",
        method: "sms",
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Lỗi khi gửi mã xác thực",
    });
  }
};

// Verify reset code
exports.verifyResetCode = async (req, res) => {
  try {
    const { identifier, code } = req.body;

    if (!identifier || !code) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    const PasswordResetToken = require("../models/PasswordResetToken");

    // Find valid token
    const resetToken = await PasswordResetToken.findOne({
      contactInfo: identifier,
      code: code,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: "Mã xác thực không hợp lệ hoặc đã hết hạn",
      });
    }

    res.json({
      success: true,
      message: "Mã xác thực hợp lệ",
      resetTokenId: resetToken._id,
    });
  } catch (error) {
    console.error("Verify reset code error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset password with code
exports.resetPasswordWithCode = async (req, res) => {
  try {
    const { identifier, code, newPassword } = req.body;

    if (!identifier || !code || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu mới phải có ít nhất 6 ký tự",
      });
    }

    const PasswordResetToken = require("../models/PasswordResetToken");

    // Find valid token
    const resetToken = await PasswordResetToken.findOne({
      contactInfo: identifier,
      code: code,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    }).populate("userId");

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        message: "Mã xác thực không hợp lệ hoặc đã hết hạn",
      });
    }

    // Update password
    const user = await User.findById(resetToken.userId).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    user.password = newPassword;
    await user.save();

    // Mark token as used
    resetToken.isUsed = true;
    await resetToken.save();

    res.json({
      success: true,
      message: "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập với mật khẩu mới.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
