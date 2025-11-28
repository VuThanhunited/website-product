# Hướng dẫn kiểm tra và sửa lỗi Email không gửi được

## Vấn đề

- Đặt hàng thành công nhưng không nhận được email xác nhận
- Email service đã được test local và hoạt động tốt

## Nguyên nhân có thể

1. **Environment variables không được cấu hình trên Vercel**
2. Vercel serverless function có timeout
3. SMTP connection bị block trên Vercel

## Giải pháp

### 1. Kiểm tra Environment Variables trên Vercel

Backend cần các biến môi trường sau:

- `EMAIL_USER` = vtu21102000@gmail.com
- `EMAIL_PASS` = jujnhapozgyjaiuw (App Password)
- `EMAIL_TO` = vtu21102000@gmail.com (email nhận thông báo admin)

**Cách kiểm tra:**

1. Truy cập https://vercel.com/vuthanhuniteds-projects
2. Chọn project backend (website-product-1)
3. Vào Settings > Environment Variables
4. Đảm bảo có đầy đủ 3 biến trên
5. Nếu thêm mới hoặc sửa, cần **Redeploy** backend

### 2. Test Email Service trên Production

Sau khi deploy xong, kiểm tra logs:

1. Vào Deployments > Latest deployment
2. Click vào Functions > api/orders
3. Xem Runtime Logs để kiểm tra:
   - "Email service is ready to send messages" ✅
   - "Order saved to database" ✅
   - "Preparing to send order confirmation email..." ✅
   - "Customer email sent successfully" ✅

### 3. Nếu vẫn không gửi được

**Option A: Sử dụng SendGrid (Recommended cho Production)**

- Free tier: 100 emails/day
- Đăng ký tại: https://sendgrid.com/
- Thay đổi email service sang SendGrid

**Option B: Sử dụng Email API service khác**

- Mailgun
- AWS SES
- Postmark

**Option C: Webhook notification**

- Gửi request đến external service để gửi email
- Không bị giới hạn bởi Vercel timeout

### 4. Kiểm tra Email đã gửi chưa

Truy cập Gmail account vtu21102000@gmail.com:

1. Kiểm tra inbox
2. Kiểm tra Sent folder
3. Kiểm tra Spam folder

### 5. Test ngay trên website

1. Truy cập: https://eft-company.vercel.app
2. Thêm sản phẩm vào giỏ hàng
3. Checkout và điền thông tin
4. Chọn phương thức thanh toán COD hoặc Bank Transfer
5. Hoàn tất đặt hàng
6. Kiểm tra email tại: vtu21102000@gmail.com

### 6. Troubleshooting

**Nếu không thấy log "Email service is ready":**

- Environment variables chưa được set trên Vercel
- Cần redeploy sau khi thêm env vars

**Nếu thấy "Email service is ready" nhưng không thấy "email sent":**

- SMTP connection timeout
- Firewall/security blocking
- Cân nhắc chuyển sang SendGrid

**Nếu thấy error EAUTH:**

- App Password không đúng
- Kiểm tra lại EMAIL_PASS trên Vercel

**Nếu thấy error ETIMEDOUT:**

- Vercel không cho phép SMTP connection
- Phải dùng Email API service (SendGrid, Mailgun, etc)

## Current Status

✅ Email service tested locally - Working perfectly
✅ Code improvements deployed to GitHub
✅ Better error handling and logging added
⏳ Waiting for Vercel deployment to complete
⏳ Need to verify environment variables on Vercel
⏳ Need to check production logs

## Next Steps

1. Đợi Vercel deploy xong (2-3 phút)
2. Kiểm tra Environment Variables
3. Test đặt hàng trên production
4. Xem logs để debug nếu cần
5. Nếu Vercel block SMTP, migrate sang SendGrid
