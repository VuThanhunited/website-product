# Hướng Dẫn Kiểm Tra Hệ Thống Auth

## 🧪 Test Cases

### 1. Đăng Ký Tài Khoản Mới

**Bước thực hiện:**

1. Mở trình duyệt và truy cập `http://localhost:3000/register`
2. Điền thông tin:
   - Tên đăng nhập: `testuser`
   - Email: `test@example.com`
   - Mật khẩu: `123456`
   - Xác nhận mật khẩu: `123456`
3. Click "Đăng Ký"

**Kết quả mong đợi:**

- ✅ Hiển thị alert "Đăng ký thành công! Vui lòng đăng nhập."
- ✅ Tự động chuyển đến trang `/login`
- ✅ Tài khoản được tạo trong database

---

### 2. Đăng Nhập

**Bước thực hiện:**

1. Tại trang `/login`, nhập:
   - Email: `test@example.com`
   - Mật khẩu: `123456`
2. (Tùy chọn) Check "Ghi nhớ đăng nhập"
3. Click "Đăng Nhập"

**Kết quả mong đợi:**

- ✅ Hiển thị alert "Đăng nhập thành công!"
- ✅ Chuyển về trang chủ `/`
- ✅ Header hiển thị tên user "testuser" với gradient xanh tím
- ✅ Hiển thị nút đăng xuất (icon màu đỏ)
- ✅ Ẩn nút đăng nhập và đăng ký
- ✅ Token được lưu trong localStorage

---

### 3. Kiểm Tra Trạng Thái Đăng Nhập

**Bước thực hiện:**

1. Sau khi đăng nhập, refresh trang (F5)
2. Mở tab mới với cùng website

**Kết quả mong đợi:**

- ✅ Vẫn hiển thị trạng thái đã đăng nhập
- ✅ Tên user vẫn hiển thị trên header
- ✅ Không bị đăng xuất

---

### 4. Truy Cập Trang Profile

**Bước thực hiện:**

1. Đã đăng nhập
2. Click vào tên user trên header (phần gradient)
3. Hoặc truy cập trực tiếp `http://localhost:3000/profile`

**Kết quả mong đợi:**

- ✅ Chuyển đến trang Profile
- ✅ Hiển thị thông tin user:
  - Avatar (chữ cái đầu tên)
  - Tên đăng nhập
  - Email
  - Vai trò
- ✅ Có nút "Chỉnh sửa thông tin" và "Đổi mật khẩu"

---

### 5. Protected Route - Chưa Đăng Nhập

**Bước thực hiện:**

1. Đăng xuất nếu đang đăng nhập
2. Truy cập trực tiếp `http://localhost:3000/profile`

**Kết quả mong đợi:**

- ✅ Tự động redirect đến `/login`
- ✅ Sau khi đăng nhập thành công, tự động quay lại `/profile`

---

### 6. Đăng Xuất

**Bước thực hiện:**

1. Click vào icon đăng xuất (màu đỏ) trên header
2. Xác nhận trong dialog

**Kết quả mong đợi:**

- ✅ Hiển thị confirm dialog "Bạn có chắc muốn đăng xuất?"
- ✅ Sau khi confirm, hiển thị alert "Đăng xuất thành công!"
- ✅ Header không còn hiển thị tên user
- ✅ Hiển thị lại nút đăng nhập và đăng ký
- ✅ Chuyển về trang chủ `/`
- ✅ Token bị xóa khỏi localStorage
- ✅ **Tài khoản VẪN CÒN trong database** (kiểm tra bằng cách đăng nhập lại)

---

### 7. Token Hết Hạn

**Bước thực hiện:**

1. Đăng nhập
2. Mở DevTools > Application > Local Storage
3. Xóa token hoặc sửa thành giá trị không hợp lệ
4. Refresh trang hoặc gọi API

**Kết quả mong đợi:**

- ✅ Tự động đăng xuất
- ✅ Redirect đến trang login
- ✅ Token invalid bị xóa khỏi localStorage

---

### 8. Validation Form Đăng Ký

**Test Case 8.1: Username quá ngắn**

- Nhập username: `ab` (dưới 3 ký tự)
- ❌ Hiển thị lỗi: "Tên đăng nhập phải có ít nhất 3 ký tự"

**Test Case 8.2: Password quá ngắn**

- Nhập password: `12345` (dưới 6 ký tự)
- ❌ Hiển thị lỗi: "Mật khẩu phải có ít nhất 6 ký tự"

**Test Case 8.3: Password không khớp**

- Password: `123456`
- Confirm: `123457`
- ❌ Hiển thị lỗi: "Mật khẩu xác nhận không khớp"

**Test Case 8.4: Email đã tồn tại**

- Đăng ký với email đã có trong database
- ❌ Hiển thị lỗi: "Email đã được sử dụng"

---

### 9. Validation Form Đăng Nhập

**Test Case 9.1: Thiếu thông tin**

- Để trống email hoặc password
- ❌ Hiển thị lỗi: "Vui lòng nhập email và mật khẩu"

**Test Case 9.2: Email không tồn tại**

- Nhập email chưa đăng ký
- ❌ Hiển thị lỗi: "Email hoặc mật khẩu không đúng"

**Test Case 9.3: Sai mật khẩu**

- Email đúng nhưng password sai
- ❌ Hiển thị lỗi: "Email hoặc mật khẩu không đúng"

---

### 10. UI/UX

**Test Case 10.1: Loading State**

- Khi submit form đăng nhập/đăng ký
- ✅ Button hiển thị "Đang xử lý..."
- ✅ Button bị disable
- ✅ Input fields bị disable

**Test Case 10.2: Show/Hide Password**

- Click icon mắt bên phải input password
- ✅ Toggle giữa text và password type
- ✅ Icon đổi giữa FaEye và FaEyeSlash

**Test Case 10.3: Error Animation**

- Khi có lỗi
- ✅ Error box xuất hiện với animation shake
- ✅ Màu đỏ với border trái

**Test Case 10.4: Responsive**

- Test trên mobile (375px width)
- ✅ Form responsive đúng
- ✅ Button full width
- ✅ Padding phù hợp

---

### 11. Multiple Tabs

**Bước thực hiện:**

1. Đăng nhập ở tab 1
2. Mở tab 2 với cùng website
3. Đăng xuất ở tab 2
4. Quay lại tab 1 và thử truy cập protected route

**Kết quả mong đợi:**

- ✅ Tab 1 cũng bị đăng xuất khi gọi API
- ✅ Redirect đến login khi API trả về 401

---

### 12. Browser Storage

**Kiểm tra LocalStorage:**

```javascript
// Mở DevTools > Console
localStorage.getItem("token"); // Should return JWT token
localStorage.getItem("user"); // Should return user JSON
```

**Sau khi đăng xuất:**

```javascript
localStorage.getItem("token"); // Should return null
localStorage.getItem("user"); // Should return null
```

---

### 13. API Calls với Token

**Bước thực hiện:**

1. Đăng nhập
2. Mở DevTools > Network
3. Gọi bất kỳ API nào (ví dụ: tạo order)

**Kết quả mong đợi:**

- ✅ Request headers có `Authorization: Bearer <token>`
- ✅ Request headers có `Cookie` với token

---

### 14. Redirect Flow

**Test Case 14.1: Đăng nhập từ trang protected**

1. Chưa đăng nhập, truy cập `/profile`
2. Redirect đến `/login`
3. Đăng nhập thành công

- ✅ Redirect về `/profile` (trang ban đầu muốn truy cập)

**Test Case 14.2: Đã đăng nhập truy cập login**

1. Đã đăng nhập
2. Truy cập `/login` hoặc `/register`

- ✅ Tự động redirect về `/`

---

## 🛠 Công Cụ Test

### Manual Testing

- Chrome DevTools
- Network tab để xem requests
- Application > Local Storage
- Console để check errors

### Database Check

```bash
# Kết nối MongoDB và kiểm tra users
cd backend
node
> const mongoose = require('mongoose')
> mongoose.connect('your-mongodb-uri')
> const User = require('./models/User')
> User.find().then(users => console.log(users))
```

---

## ✅ Checklist Tổng Hợp

- [ ] Đăng ký thành công và redirect đến login
- [ ] Đăng nhập thành công và hiển thị user info
- [ ] Tên user hiển thị trên header
- [ ] Nút đăng xuất hoạt động
- [ ] Confirm dialog trước khi logout
- [ ] Logout không xóa account trong database
- [ ] Protected route redirect đến login
- [ ] Token được thêm vào API calls
- [ ] 401 error tự động đăng xuất
- [ ] Remember me checkbox hiển thị
- [ ] Forgot password link hiển thị
- [ ] Validation form hoạt động
- [ ] Loading states hiển thị đúng
- [ ] Error messages hiển thị đúng
- [ ] Responsive trên mobile
- [ ] Đa ngôn ngữ hoạt động
- [ ] Profile page hoạt động
- [ ] Refresh page vẫn giữ login state

---

## 🐛 Common Issues & Solutions

### Issue 1: Token không được gửi

**Solution:** Kiểm tra API interceptor trong `services/api.js`

### Issue 2: Không redirect sau login

**Solution:** Kiểm tra `useEffect` trong Login.js

### Issue 3: User info không cập nhật

**Solution:** Kiểm tra AuthContext provider trong App.js

### Issue 4: CORS errors

**Solution:** Backend cần cấu hình:

```javascript
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
```

### Issue 5: Cookie không được set

**Solution:** Kiểm tra `withCredentials: true` trong axios calls
