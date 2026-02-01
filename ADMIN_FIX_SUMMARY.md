# Hướng Dẫn Sửa Lỗi Admin Panel - December 2025

## Tóm Tắt Các Vấn Đề Đã Sửa

### 1. ❌ Lỗi: Chỉnh sửa ở admin nhưng trang user không thay đổi

**Nguyên nhân:** Browser cache API responses

**Đã sửa:**

- ✅ Backend thêm `Cache-Control: no-cache` headers
- ✅ Admin thêm `Cache-Control: no-cache` trong request
- ✅ Response có headers: `no-store, no-cache, must-revalidate, private`

**Kết quả:** Sau khi lưu ở admin, trang user sẽ hiển thị nội dung mới khi refresh

### 2. ❌ Lỗi: Không lưu được nội dung (401 Unauthorized)

**Nguyên nhân:** Token đăng nhập hết hạn

**Đã sửa:**

- ✅ Admin kiểm tra token trước khi gọi API
- ✅ Phát hiện lỗi 401 và tự động redirect về login
- ✅ Hiển thị thông báo cụ thể: "Phiên đăng nhập hết hạn"
- ✅ Tự động xóa token hết hạn khỏi localStorage

**Kết quả:** User biết rõ cần đăng nhập lại thay vì chỉ thấy "Lỗi"

### 3. ❌ Lỗi: Upload ảnh media không được

**Nguyên nhân:** Routes thiếu authentication

**Đã sửa:**

- ✅ POST /api/media/slides → Yêu cầu admin token
- ✅ PUT /api/media/slides/:id → Yêu cầu admin token
- ✅ DELETE /api/media/slides/:id → Yêu cầu admin token

**Kết quả:** Chỉ admin mới upload/edit/delete được media

## Cách Sử Dụng

### Bước 1: Deploy Code Mới

#### Backend (Render.com)

```bash
cd backend
git add .
git commit -m "Fix: Add no-cache headers and improve admin error handling"
git push origin main
```

Render.com tự động deploy sau 2-3 phút.

#### Admin Panel (Vercel)

```bash
cd Admin
npm run build
# Hoặc commit và push, Vercel tự build
git add .
git commit -m "Fix: Add token validation and 401 error handling"
git push origin main
```

### Bước 2: Test Sau Khi Deploy

#### A. Test Admin Panel

1. Mở https://admin-eft.vercel.app/admin/login
2. Đăng nhập với tài khoản admin
3. Vào **Admin Home Content**
4. Chỉnh sửa bất kỳ nội dung nào (ví dụ: "Tính Năng Nổi Bật")
5. Click **Lưu**
6. ✅ Phải thấy: "Lưu thành công! Trang user sẽ cập nhật sau khi refresh."

#### B. Test Frontend

1. Mở https://eft-company.vercel.app (hoặc trang user)
2. **Hard refresh:** Ctrl+Shift+R (Windows) hoặc Cmd+Shift+R (Mac)
3. ✅ Phải thấy nội dung mới vừa sửa

#### C. Test Token Expiration

1. Mở Console (F12)
2. Chạy: `localStorage.removeItem('token')`
3. Thử lưu nội dung
4. ✅ Phải thấy: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại."
5. ✅ Tự động redirect về `/admin/login`

### Bước 3: Xử Lý Lỗi Thường Gặp

#### Lỗi 1: Vẫn không thấy thay đổi trên trang user

**Nguyên nhân:** Browser cache chưa clear

**Giải pháp:**

```
Chrome/Edge: Ctrl + Shift + R
Firefox: Ctrl + F5
Safari: Cmd + Option + R
```

Hoặc clear cache thủ công:

1. F12 → Network tab
2. Right-click → "Clear browser cache"
3. Refresh lại trang

#### Lỗi 2: "Phiên đăng nhập hết hạn"

**Giải pháp:** Đăng nhập lại

1. Click OK trên popup
2. Tự động chuyển về `/admin/login`
3. Đăng nhập lại
4. Token mới có hiệu lực **30 ngày**

#### Lỗi 3: Upload media bị lỗi 401

**Giải pháp:**

1. Token hết hạn → Đăng nhập lại
2. Kiểm tra user có role admin không:

```javascript
// Console:
const token = localStorage.getItem("token");
const payload = JSON.parse(atob(token.split(".")[1]));
console.log(payload); // Phải có role: 'admin'
```

## Kiểm Tra Kỹ Thuật

### Verify No-Cache Headers

```powershell
# Test backend trả về no-cache headers:
$response = Invoke-WebRequest -Uri "https://website-product-1.onrender.com/api/home-content"
$response.Headers['Cache-Control']
# Phải trả về: "no-store, no-cache, must-revalidate, private"
```

### Verify Token

```javascript
// Console (F12):
const token = localStorage.getItem("token");
if (token) {
  const parts = token.split(".");
  const payload = JSON.parse(atob(parts[1]));
  console.log("User ID:", payload.id);
  console.log("Issued:", new Date(payload.iat * 1000));
  console.log("Expires:", new Date(payload.exp * 1000));
  console.log("Valid:", new Date(payload.exp * 1000) > new Date());
} else {
  console.log("No token - please login");
}
```

## Files Đã Thay Đổi

### Backend

- ✅ `backend/controllers/homePageContentController.js`
  - Thêm no-cache headers trong `getHomePageContent()`
- ✅ `backend/controllers/companyPageContentController.js`
  - Thêm no-cache headers trong `getCompanyPageContent()`
- ✅ `backend/routes/mediaRoutes.js`
  - Thêm `protect, authorize("admin")` cho POST/PUT/DELETE

### Admin Panel

- ✅ `Admin/src/pages/AdminHomeContent.js`
  - Thêm token validation
  - Thêm 401 error handling
  - Thêm Cache-Control header trong requests
  - Cải thiện error messages
- ✅ `Admin/src/pages/AdminCompanyContent.js`
  - Tương tự AdminHomeContent.js

## Workflow Sau Khi Sửa

```
Admin chỉnh sửa content
         ↓
Click "Lưu" button
         ↓
Check token còn hạn?
    ├─→ NO: Redirect to login
    └─→ YES: Continue
         ↓
PUT /api/home-content
    ├─→ 401: "Token hết hạn" → Redirect login
    ├─→ 500: Show error message chi tiết
    └─→ 200: "Lưu thành công!"
         ↓
Backend save to MongoDB
         ↓
Response with no-cache headers
         ↓
User reload trang frontend
         ↓
GET /api/home-content (no cache)
         ↓
✅ Hiển thị nội dung mới!
```

## Notes

- Token JWT hết hạn sau **30 ngày** (cấu hình trong backend `.env`: `JWT_EXPIRE=30d`)
- Browser cache đã được vô hiệu hóa cho API responses
- Admin routes đều yêu cầu `Authorization: Bearer <token>`
- Frontend không cần authentication để xem nội dung (chỉ GET là public)

---

**Cập nhật:** December 12, 2025  
**Status:** ✅ Đã sửa tất cả lỗi
