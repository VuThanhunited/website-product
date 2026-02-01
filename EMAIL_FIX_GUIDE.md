# 📧 Hướng Dẫn Sửa Lỗi Email Xác Nhận

## ✅ Đã Fix

### 1. **Code Improvements:**

- ✅ Thêm `transporter.verify()` để kiểm tra kết nối trước khi gửi
- ✅ Thêm `replyTo` field trong mailOptions
- ✅ Enhanced error logging với details (code, command, response)
- ✅ Console log chi tiết khi gửi email thành công

### 2. **Email Template:**

- ✅ Template HTML đã được kiểm tra và hoàn chỉnh
- ✅ Responsive design cho mobile
- ✅ Hỗ trợ đa ngôn ngữ (Vietnamese/English)

## 🔧 Cấu Hình Cần Thiết

### **Bước 1: Cấu hình Gmail App Password**

1. Truy cập: https://myaccount.google.com/security
2. Bật **2-Step Verification** (nếu chưa bật)
3. Tìm **App passwords** (Mật khẩu ứng dụng)
4. Chọn:
   - App: **Mail**
   - Device: **Other** (đặt tên: "EFT Backend")
5. Copy **16-digit password** được tạo ra

### **Bước 2: Update .env trên Render**

Vào Render Dashboard → Your Backend Service → Environment:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  (16-digit app password)
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin-email@gmail.com
```

### **Bước 3: Redeploy Backend**

Click **Manual Deploy** trên Render để áp dụng env mới.

## 🧪 Test Email

### **Test Local:**

```bash
cd backend
node testOrderEmail.js
```

### **Test Production:**

1. Đặt hàng thử trên website
2. Kiểm tra Render logs:
   ```
   📧 Email service ready
   ✅ Order confirmation email sent: <message-id>
   📦 Sent to: customer@email.com
   ```

## ❌ Troubleshooting

### **Lỗi: "Invalid login"**

- ✅ Kiểm tra EMAIL_USER và EMAIL_PASS đúng
- ✅ Dùng App Password, không phải password Gmail thường

### **Lỗi: "Connection timeout"**

- ✅ Kiểm tra Render có cho phép outbound SMTP
- ✅ Thử port 465 (SSL) thay vì 587 (TLS)

### **Email vào Spam:**

- ✅ Thêm SPF record cho domain
- ✅ Dùng email domain riêng thay vì Gmail
- ✅ Add recipient email vào contacts trước

## 📝 Alternative: Sử dụng SendGrid

Nếu Gmail không hoạt động, dùng SendGrid (free 100 emails/day):

```javascript
// In emailService.js
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

**Lấy API Key:**

1. Đăng ký: https://sendgrid.com/
2. Settings → API Keys → Create API Key
3. Copy và set `SENDGRID_API_KEY` trong .env

## 📊 Logs để Debug

Khi email gửi thành công, bạn sẽ thấy:

```
📧 Email service ready
✅ Order confirmation email sent: <message-id>
📦 Sent to: customer@example.com
```

Khi có lỗi:

```
❌ Error sending order confirmation email: [error message]
Error details: {
  code: 'EAUTH',
  command: 'AUTH PLAIN',
  response: '535-5.7.8 Username and Password not accepted'
}
```

## ✨ Next Steps

1. ✅ Cấu hình Gmail App Password
2. ✅ Update .env trên Render
3. ✅ Redeploy backend
4. ✅ Test bằng cách đặt hàng thử
5. ✅ Kiểm tra inbox (và spam folder)

---

**Support:** Nếu vẫn gặp lỗi, check Render logs và gửi error message cụ thể.
