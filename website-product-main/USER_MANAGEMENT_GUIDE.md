# 👥 HƯỚNG DẪN QUẢN LÝ TÀI KHOẢN

## 📋 Tổng Quan

Trang **Quản Lý Tài Khoản** cho phép admin xem danh sách tất cả users, thay đổi quyền và quản lý mật khẩu.

---

## 🔑 TÍNH NĂNG

### 1. Xem Danh Sách Tài Khoản

**Thông tin hiển thị:**

- ✅ STT
- ✅ Username
- ✅ Email
- ✅ Quyền (Admin/User)
- ✅ Trạng thái (Hoạt động/Đã khóa)
- ✅ Ngày tạo

**Thống kê:**

- 📊 Tổng số tài khoản
- 👮 Số lượng Admin
- 👤 Số lượng User
- ✅ Tài khoản đang hoạt động

### 2. Thay Đổi Quyền User

**Admin có thể:**

- ⬆️ **Thăng cấp User → Admin**

  - Nhấn nút "Lên Admin"
  - Xác nhận thay đổi
  - User sẽ có quyền truy cập admin panel

- ⬇️ **Hạ cấp Admin → User**
  - Nhấn nút "Hạ User"
  - Xác nhận thay đổi
  - Tài khoản sẽ mất quyền admin

**⚠️ Lưu ý:**

- Thay đổi có hiệu lực ngay lập tức
- User bị hạ cấp sẽ không thể đăng nhập admin panel nữa
- Không thể hạ quyền chính mình xuống user

### 3. Khóa/Mở Khóa Tài Khoản

**Admin có thể:**

- 🔒 **Khóa tài khoản**

  - Nhấn nút "Khóa"
  - Tài khoản không thể đăng nhập
  - Status chuyển sang "Đã khóa"

- 🔓 **Mở khóa tài khoản**
  - Nhấn nút "Mở"
  - Tài khoản có thể đăng nhập trở lại
  - Status chuyển sang "Hoạt động"

### 4. Đổi Mật Khẩu (Của Chính Admin)

**Cách thực hiện:**

1. Nhấn nút **"Đổi Mật Khẩu"** ở góc trên bên phải
2. Nhập thông tin:
   - Mật khẩu hiện tại
   - Mật khẩu mới (tối thiểu 6 ký tự)
   - Xác nhận mật khẩu mới
3. Nhấn **"Đổi Mật Khẩu"**

**Yêu cầu:**

- ✅ Mật khẩu hiện tại phải đúng
- ✅ Mật khẩu mới ≥ 6 ký tự
- ✅ Mật khẩu xác nhận phải khớp

---

## 🎯 HƯỚNG DẪN SỬ DỤNG

### Truy Cập Trang Quản Lý

1. Đăng nhập admin panel: `https://admin-eft.vercel.app`
2. Click vào **"Quản Lý Tài Khoản"** trong sidebar
3. Xem danh sách tất cả users

### Thay Đổi Quyền User

**Ví dụ: Thăng user lên admin**

```
1. Tìm user cần thăng cấp trong danh sách
2. Nhấn nút "Lên Admin" (màu tím)
3. Xác nhận: "Bạn có chắc muốn đổi quyền thành admin?"
4. ✅ Hoàn tất - User giờ có quyền admin
```

**Ví dụ: Hạ admin xuống user**

```
1. Tìm admin cần hạ cấp
2. Nhấn nút "Hạ User" (màu cam)
3. Xác nhận: "Bạn có chắc muốn đổi quyền thành user?"
4. ✅ Hoàn tất - Tài khoản mất quyền admin
```

### Khóa/Mở Tài Khoản

**Khóa tài khoản:**

```
1. Nhấn nút "Khóa" (màu đỏ)
2. Xác nhận
3. ✅ Tài khoản không thể đăng nhập
```

**Mở khóa:**

```
1. Nhấn nút "Mở" (màu xanh)
2. Xác nhận
3. ✅ Tài khoản có thể đăng nhập lại
```

### Đổi Mật Khẩu Admin

```
1. Nhấn "Đổi Mật Khẩu" (góc trên bên phải)
2. Nhập:
   - Mật khẩu cũ: Admin@123456
   - Mật khẩu mới: MyNewPass@2024
   - Xác nhận: MyNewPass@2024
3. Nhấn "Đổi Mật Khẩu"
4. ✅ Đổi mật khẩu thành công!
```

---

## 🔐 BẢO MẬT

### Quyền Truy Cập

**Chỉ Admin mới có thể:**

- ✅ Xem danh sách tất cả users
- ✅ Thay đổi quyền của users khác
- ✅ Khóa/mở khóa tài khoản
- ✅ Truy cập trang quản lý tài khoản

**Mọi user (bao gồm admin) có thể:**

- ✅ Đổi mật khẩu của chính mình

### Hạn Chế

**Không thể:**

- ❌ Xóa tài khoản (chỉ khóa)
- ❌ Đổi mật khẩu của người khác
- ❌ Thay đổi email/username sau khi tạo
- ❌ Hạ quyền chính mình (cần admin khác làm)

---

## 📊 THỐNG KÊ

Trang hiển thị 4 thẻ thống kê:

### 1. Tổng Tài Khoản

- Hiển thị tổng số users trong hệ thống
- Icon: 👥

### 2. Admin

- Số lượng tài khoản có quyền admin
- Icon: 🛡️
- Màu: Gradient hồng

### 3. User

- Số lượng tài khoản user thường
- Icon: 👤
- Màu: Gradient xanh

### 4. Đang Hoạt Động

- Số tài khoản isActive = true
- Icon: ✅
- Màu: Gradient xanh lá

---

## 🎨 GIAO DIỆN

### Bảng Danh Sách

**Màu sắc:**

- 🟣 **Admin badge**: Gradient tím
- 🔵 **User badge**: Gradient xanh dương
- 🟢 **Active badge**: Gradient xanh lá
- 🔴 **Inactive badge**: Đỏ

**Nút thao tác:**

- 🟣 **Lên Admin**: Gradient tím
- 🟠 **Hạ User**: Gradient cam
- 🔴 **Khóa**: Đỏ
- 🟢 **Mở**: Xanh lá

### Modal Đổi Mật Khẩu

**Thiết kế:**

- 🎨 Giao diện hiện đại với gradient
- 📝 Form validation real-time
- ⚠️ Hiển thị lỗi rõ ràng
- ✅ Thông báo thành công

---

## 🔧 API ENDPOINTS

### Quản Lý Users (Admin only)

```javascript
// Lấy danh sách tất cả users
GET /api/auth/users
Headers: { Authorization: "Bearer {token}" }
Response: {
  success: true,
  count: 10,
  users: [...]
}

// Thay đổi quyền user
PUT /api/auth/users/:userId/role
Body: { role: "admin" | "user" }
Response: {
  success: true,
  message: "Đã cập nhật quyền thành admin",
  user: {...}
}

// Khóa/mở tài khoản
PUT /api/auth/users/:userId/status
Body: { isActive: true | false }
Response: {
  success: true,
  message: "Đã khóa tài khoản",
  user: {...}
}
```

### Đổi Mật Khẩu (Authenticated)

```javascript
POST /api/auth/change-password
Headers: { Authorization: "Bearer {token}" }
Body: {
  currentPassword: "oldpass",
  newPassword: "newpass"
}
Response: {
  success: true,
  message: "Đổi mật khẩu thành công"
}
```

---

## 🐛 XỬ LÝ LỖI

### Lỗi Thường Gặp

**1. "Mật khẩu hiện tại không đúng"**

- ❌ Nguyên nhân: Nhập sai mật khẩu cũ
- ✅ Giải pháp: Kiểm tra lại mật khẩu

**2. "Mật khẩu xác nhận không khớp"**

- ❌ Nguyên nhân: Mật khẩu mới và xác nhận khác nhau
- ✅ Giải pháp: Nhập lại cho khớp

**3. "Mật khẩu mới phải có ít nhất 6 ký tự"**

- ❌ Nguyên nhân: Mật khẩu quá ngắn
- ✅ Giải pháp: Dùng mật khẩu dài hơn

**4. "Không tìm thấy người dùng"**

- ❌ Nguyên nhân: User đã bị xóa hoặc ID sai
- ✅ Giải pháp: Refresh lại trang

**5. "Quyền không hợp lệ"**

- ❌ Nguyên nhân: Role không phải "user" hoặc "admin"
- ✅ Giải pháp: Chỉ chọn 2 quyền có sẵn

---

## ✅ CHECKLIST

Sau khi triển khai, kiểm tra:

- [x] Trang load đầy đủ danh sách users
- [x] Thống kê hiển thị chính xác
- [x] Nút "Lên Admin" hoạt động
- [x] Nút "Hạ User" hoạt động
- [x] Nút "Khóa" hoạt động
- [x] Nút "Mở" hoạt động
- [x] Modal đổi mật khẩu mở ra
- [x] Validation mật khẩu hoạt động
- [x] Đổi mật khẩu thành công
- [x] Thông báo lỗi/thành công hiển thị
- [x] Responsive trên mobile

---

## 🎓 MẸO SỬ DỤNG

### Best Practices

1. **Quản lý quyền:**

   - Chỉ cấp quyền admin cho người tin cậy
   - Định kỳ review danh sách admin
   - Hạ quyền khi không còn cần thiết

2. **Bảo mật:**

   - Đổi mật khẩu định kỳ (3-6 tháng)
   - Dùng mật khẩu mạnh (≥8 ký tự, chữ hoa, số, ký tự đặc biệt)
   - Không chia sẻ mật khẩu

3. **Khóa tài khoản:**
   - Khóa thay vì xóa (giữ lại data)
   - Khóa tạm thời khi phát hiện bất thường
   - Có thể mở khóa sau nếu cần

---

## 📞 HỖ TRỢ

**Nếu gặp vấn đề:**

1. Kiểm tra console browser (F12) xem lỗi
2. Kiểm tra network tab xem API response
3. Refresh lại trang
4. Đăng xuất và đăng nhập lại
5. Liên hệ IT support nếu vẫn lỗi

---

**🎉 Tính năng quản lý tài khoản đã hoàn thiện!**

- ✅ Xem danh sách users
- ✅ Thay đổi quyền (admin/user)
- ✅ Khóa/mở tài khoản
- ✅ Đổi mật khẩu
- ✅ UI/UX đẹp với gradient
- ✅ Real-time updates
- ✅ Error handling đầy đủ
