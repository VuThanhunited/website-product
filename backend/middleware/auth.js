const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware xác thực token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Lấy token từ header hoặc cookie
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Vui lòng đăng nhập để truy cập",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Lấy thông tin user từ database
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Tài khoản không tồn tại",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token không hợp lệ hoặc đã hết hạn",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi xác thực",
    });
  }
};

// Middleware phân quyền admin
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Vui lòng đăng nhập",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Chỉ có ${roles.join(", ")} mới có quyền truy cập`,
      });
    }

    next();
  };
};

// Middleware optional auth (không bắt buộc đăng nhập)
exports.optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
      } catch (error) {
        // Token invalid nhưng không block request
        req.user = null;
      }
    }

    next();
  } catch (error) {
    next();
  }
};
