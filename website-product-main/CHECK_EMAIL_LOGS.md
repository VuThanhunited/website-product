# Kiểm tra Email Service trên Vercel

## Sau khi Redeploy xong, làm theo:

### 1. Kiểm tra Runtime Logs

**Bước 1: Vào Functions**

1. Deployments > Click vào deployment mới nhất (vừa redeploy)
2. Scroll xuống phần "Functions"
3. Tìm function: `/api/orders.func`
4. Click vào function đó

**Bước 2: Xem Logs**

- Tab "Logs" sẽ hiển thị các log từ function
- Tìm các dòng log sau:
  ```
  ✅ Email service is ready to send messages
  📧 Preparing to send order confirmation email...
  ✅ Order confirmation email sent successfully!
  ```

### 2. Test Đặt Hàng Thực Tế

1. Vào https://eft-company.vercel.app
2. Thêm sản phẩm vào giỏ hàng
3. Click "Thanh toán"
4. Điền thông tin (dùng email: vtu21102000@gmail.com)
5. Chọn COD hoặc Bank Transfer
6. Hoàn tất đặt hàng

### 3. Kiểm tra Email

**Nơi cần kiểm tra:**

- ✉️ Gmail Inbox: vtu21102000@gmail.com
- 🗑️ Gmail Spam/Junk folder
- 📤 Gmail Sent folder (nếu bạn là người gửi)

**Email sẽ có:**

- Tiêu đề: "Xác nhận đơn hàng #XXXXXXXX - EFT Technology"
- Từ: EFT Technology (vtu21102000@gmail.com)
- Nội dung: Chi tiết đơn hàng với thiết kế đẹp

### 4. Debug nếu vẫn không nhận được

**A. Kiểm tra Logs có lỗi không:**

Nếu thấy lỗi như:

- `❌ EAUTH` → Sai EMAIL_PASS, kiểm tra lại App Password
- `❌ ETIMEDOUT` → Vercel chặn SMTP, cần chuyển sang SendGrid
- `❌ ECONNECTION` → Network issue, retry hoặc dùng SendGrid

**B. Nếu Vercel chặn SMTP:**

Vercel có thể chặn outbound SMTP connections. Nếu thấy timeout/connection errors, cần migrate sang SendGrid:

```javascript
// Dùng SendGrid thay vì SMTP
npm install @sendgrid/mail

// Thay đổi emailService.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

**C. Workaround tạm thời:**

Nếu cần gửi email ngay, có thể:

1. Dùng service bên thứ 3: Zapier, Make.com
2. Webhook sang service khác để gửi email
3. Dùng Vercel Edge Functions với Resend.com

### 5. Test với curl

Sau khi redeploy, test API trực tiếp:

```bash
curl -X POST https://website-product-1.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerInfo": {
      "fullName": "Test User",
      "email": "vtu21102000@gmail.com",
      "phone": "0123456789",
      "address": "123 Test St",
      "city": "Ha Noi"
    },
    "items": [{
      "productId": "test",
      "productName": "Test Product",
      "quantity": 1,
      "price": 100000
    }],
    "subtotal": 100000,
    "shippingFee": 30000,
    "total": 130000,
    "paymentMethod": "cod",
    "language": "vi"
  }'
```

### 6. Kiểm tra Environment Variables đã được load chưa

Thêm log vào orderController.js để debug:

```javascript
console.log("Email config check:");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✓ Set" : "✗ Not set");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✓ Set" : "✗ Not set");
console.log("EMAIL_TO:", process.env.EMAIL_TO ? "✓ Set" : "✗ Not set");
```

## Checklist

- [ ] Đã redeploy backend sau khi thêm env vars
- [ ] Đợi deploy hoàn tất (status: Ready)
- [ ] Kiểm tra Runtime Logs của /api/orders
- [ ] Test đặt hàng trên production
- [ ] Check email inbox và spam folder
- [ ] Nếu có lỗi SMTP, xem xét dùng SendGrid

## Thời gian xử lý

- ⚡ Redeploy: ~2-3 phút
- 📧 Email gửi đi: ~10-30 giây sau khi đặt hàng
- 📬 Email đến inbox: ~30 giây - 2 phút

## Lưu ý

- Vercel serverless functions có timeout 10s (Hobby plan) hoặc 60s (Pro plan)
- Email service nên chạy async để không block response
- Nếu Vercel chặn SMTP (port 587), PHẢI chuyển sang API-based email service
