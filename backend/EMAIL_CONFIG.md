# Cấu Hình Email - Gmail SMTP

## ✅ Hiện Tại: Chỉ Sử Dụng Gmail SMTP

Hệ thống email đã được cấu hình để **CHỈ SỬ DỤNG GMAIL SMTP**.

### 📧 Service Đang Dùng:

- **Gmail SMTP** (`services/emailService.js`)
  - Sử dụng Nodemailer với Gmail
  - Không có giới hạn gửi email
  - Email gửi từ: `process.env.EMAIL_USER`

### 🚫 Services Đã Vô Hiệu Hóa:

- ~~Resend~~ → Đã đổi tên thành `.backup`
- ~~SendGrid~~ → Đã đổi tên thành `.backup`

## 🔧 Biến Môi Trường Cần Thiết

```env
# Gmail SMTP Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=admin@example.com
```

## 📝 Cách Lấy Gmail App Password

1. Đăng nhập Gmail
2. Vào **Google Account Settings** → **Security**
3. Bật **2-Step Verification**
4. Tạo **App Password** cho "Mail"
5. Sao chép mật khẩu 16 ký tự vào `EMAIL_PASS`

## 🎯 Luồng Gửi Email

```
Khách hàng đặt hàng
    ↓
Order saved to DB
    ↓
Email xác nhận gửi cho khách hàng (Gmail SMTP)
    ↓
✅ Hoàn tất
```

## ⚠️ Lưu Ý

- **KHÔNG** bật lại Resend hoặc SendGrid trừ khi cần thiết
- **KHÔNG** thay đổi `orderController.js` để dùng service khác
- Nếu Gmail SMTP lỗi, kiểm tra:
  - `EMAIL_USER` và `EMAIL_PASS` có đúng không
  - App Password có hết hạn không
  - Gmail account có bị khóa không

## 📂 File Quan Trọng

- `controllers/orderController.js` - Controller xử lý đơn hàng và gửi email
- `services/emailService.js` - Gmail SMTP service
- `services/emailServiceResend.js.backup` - Resend backup (không dùng)
- `services/emailServiceSendGrid.js.backup` - SendGrid backup (không dùng)

## 🚀 Deploy

Sau khi thay đổi, push code và redeploy trên Render.com:

```bash
git add .
git commit -m "Use Gmail SMTP only for email service"
git push
```

Render.com sẽ tự động deploy lại backend.
