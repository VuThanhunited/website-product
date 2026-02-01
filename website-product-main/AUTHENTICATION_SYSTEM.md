# 🔐 HỆ THỐNG XÁC THỰC VÀ PHÂN QUYỀN

## 📋 Tổng Quan

Hệ thống xác thực đầy đủ cho cả Admin Panel và Website User với phân quyền rõ ràng.

---

## 🛡️ TRANG ADMIN

### Đăng Nhập Admin

**URL:** `https://admin-eft.vercel.app/login`

**Tài khoản mặc định:**

- **Email:** admin@eft-company.com
- **Password:** Admin@123456

### Tính Năng

✅ **Chỉ admin mới được truy cập**

- Kiểm tra role = "admin" khi đăng nhập
- Từ chối truy cập nếu không phải admin

✅ **Bảo vệ tất cả routes**

- Redirect về /login nếu chưa đăng nhập
- Verify token mỗi lần truy cập
- Auto logout khi token hết hạn

✅ **Session Management**

- Token JWT lưu trong localStorage
- Cookie httpOnly cho bảo mật cao
- Expire sau 7 ngày

✅ **UI/UX**

- Trang login đẹp với gradient
- Animation mượt mà
- Error handling rõ ràng
- Loading states

---

## 👤 TRANG USER

### Đăng Ký / Đăng Nhập

**URL:** `https://eft-company.vercel.app`

**Tài khoản test:**

- **Email:** user@test.com
- **Password:** User@123456

### Tính Năng Yêu Cầu Đăng Nhập

❗ **Giỏ hàng (Cart)**

- Thêm sản phẩm vào giỏ: ✅ Cần đăng nhập
- Xem giỏ hàng: ✅ Cần đăng nhập
- Cập nhật số lượng: ✅ Cần đăng nhập
- Xóa sản phẩm: ✅ Cần đăng nhập

❗ **Đặt hàng (Checkout)**

- Xem thông tin đặt hàng: ✅ Cần đăng nhập
- Tạo đơn hàng: ✅ Cần đăng nhập
- Xem lịch sử đơn hàng: ✅ Cần đăng nhập

### Tính Năng Không Cần Đăng Nhập

✓ Xem sản phẩm
✓ Xem chi tiết sản phẩm
✓ Xem danh mục
✓ Xem bài viết hỗ trợ
✓ Liên hệ (gửi tin nhắn)

---

## 🔧 KỸ THUẬT

### Backend

**Auth Middleware** (`backend/middleware/auth.js`)

```javascript
// Protect route - yêu cầu đăng nhập
router.post("/cart/add", protect, cartController.addToCart);

// Authorize - yêu cầu role cụ thể
router.get(
  "/orders",
  protect,
  authorize("admin"),
  orderController.getAllOrders
);
```

**Protected Routes:**

- `/api/cart/*` - Tất cả cart routes
- `/api/orders/*` - Tất cả order routes (user: create, admin: manage)

### Frontend Admin

**PrivateRoute Component**

- Verify token với backend
- Kiểm tra role = "admin"
- Redirect về /login nếu unauthorized

**Flow:**

1. User truy cập admin panel
2. Check token trong localStorage
3. Call API verify token
4. Nếu valid + role admin → cho vào
5. Nếu không → redirect /login

### Frontend User

**AuthContext**

- Quản lý user state globally
- Provide auth methods (login, register, logout)
- Auto check auth khi app load

**Protected Actions:**

```javascript
const { isAuthenticated } = useAuth();

// Trong component
if (!isAuthenticated) {
  navigate("/login");
  return;
}
```

---

## 📝 API ENDPOINTS

### Auth

| Method | Endpoint                | Mô tả            | Auth |
| ------ | ----------------------- | ---------------- | ---- |
| POST   | `/api/auth/register`    | Đăng ký user     | ❌   |
| POST   | `/api/auth/login`       | Đăng nhập user   | ❌   |
| POST   | `/api/auth/admin/login` | Đăng nhập admin  | ❌   |
| GET    | `/api/auth/verify`      | Verify token     | ❌   |
| GET    | `/api/auth/me`          | Get current user | ✅   |
| POST   | `/api/auth/logout`      | Đăng xuất        | ❌   |

### Cart (Protected)

| Method | Endpoint               | Auth | Role |
| ------ | ---------------------- | ---- | ---- |
| GET    | `/api/cart`            | ✅   | user |
| POST   | `/api/cart/add`        | ✅   | user |
| PUT    | `/api/cart/update`     | ✅   | user |
| DELETE | `/api/cart/remove/:id` | ✅   | user |

### Orders (Protected)

| Method | Endpoint          | Auth | Role      |
| ------ | ----------------- | ---- | --------- |
| POST   | `/api/orders`     | ✅   | user      |
| GET    | `/api/orders/:id` | ✅   | user      |
| GET    | `/api/orders`     | ✅   | **admin** |
| PUT    | `/api/orders/:id` | ✅   | **admin** |
| DELETE | `/api/orders/:id` | ✅   | **admin** |

---

## 🎯 SỬ DỤNG

### Tạo Admin User Mới

```bash
cd backend
node createAdminUser.js
```

Script sẽ tạo:

- Admin user (admin@eft-company.com)
- Test user (user@test.com)

### Thay Đổi Password

Trong MongoDB, update trực tiếp hoặc tạo endpoint change password.

### Reset Token

Token tự động expire sau 7 ngày. User cần đăng nhập lại.

Manual reset:

```javascript
localStorage.removeItem("token");
localStorage.removeItem("adminToken");
```

---

## 🔒 BẢO MẬT

✅ **Đã implement:**

- JWT tokens với secret key
- Bcrypt hash passwords
- HttpOnly cookies
- CORS protection
- Token expiration
- Role-based access control

⚠️ **Lưu ý:**

- Không lưu password plain text
- Token chứa thông tin tối thiểu
- Verify token mỗi request quan trọng
- Luôn check role trước khi thực hiện action

---

## 🐛 TROUBLESHOOTING

**Lỗi: "Token không hợp lệ"**

- Token đã hết hạn → Đăng nhập lại
- Token bị xóa → Check localStorage
- JWT_SECRET không khớp → Check .env

**Lỗi: "Bạn không có quyền"**

- Role không đúng → Check user.role trong DB
- Chưa đăng nhập → Redirect về login
- Token không được gửi → Check Authorization header

**Admin không thể login**

- Check role = "admin" trong database
- Verify email/password đúng
- Check console logs

---

## 📊 THỐNG KÊ

**Files đã tạo:** 10 files mới
**Backend:**

- middleware/auth.js
- createAdminUser.js
- Updated: authController.js, authRoutes.js, orderRoutes.js

**Admin:**

- AdminLogin.js + CSS
- PrivateRoute.js
- Updated: App.js, App.css

**Database:**

- 2 users (1 admin, 1 test user)

---

## ✅ CHECKLIST

- [x] Tạo auth middleware
- [x] Protect cart routes
- [x] Protect order routes
- [x] Admin login page
- [x] Private route component
- [x] Create admin user
- [x] JWT token system
- [x] Role-based authorization
- [x] Session management
- [x] Error handling

---

**🎉 Hệ thống authentication đã hoàn thiện!**

Giờ đây:

- ✅ Chỉ admin mới vào được admin panel
- ✅ User phải đăng nhập để mua hàng
- ✅ Tất cả routes đã được bảo vệ
- ✅ Token-based authentication hoạt động
- ✅ UI/UX mượt mà, chuyên nghiệp
