# Cấu Hình Email - SendGrid

## ✅ Hiện Tại: Sử Dụng SendGrid API

Hệ thống email đã được cấu hình để **SỬ DỤNG SENDGRID** vì:
- ❌ Gmail SMTP **KHÔNG hoạt động** trên Render.com (bị chặn port 587/465)
- ✅ SendGrid API hoạt động tốt trên mọi hosting
- ✅ Miễn phí 100 emails/ngày

### 📧 Service Đang Dùng:

- **SendGrid API** (`services/emailServiceSendGrid.js`)
  - Sử dụng @sendgrid/mail package
  - Miễn phí 100 emails/ngày
  - Email gửi từ: `process.env.SENDGRID_FROM_EMAIL`

### 🚫 Services Đã Xóa Hoàn Toàn:

- ~~Resend~~ → **ĐÃ XÓA** 
- ~~Gmail SMTP~~ → **KHÔNG dùng được trên Render.com** (port bị chặn)

## 🔧 Biến Môi Trường Cần Thiết

```env
# SendGrid Configuration (BẮT BUỘC)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=your-verified-email@domain.com

# Admin Email (Tùy chọn)
EMAIL_TO=admin@example.com
```

## 📝 Cách Lấy SendGrid API Key

1. Đăng ký tài khoản miễn phí tại https://sendgrid.com
2. Verify email của bạn
3. Vào **Settings** → **API Keys** → **Create API Key**
4. Chọn **Full Access** → Copy API key
5. Paste vào `SENDGRID_API_KEY` trên Render.com Environment Variables
6. Set `SENDGRID_FROM_EMAIL` = email bạn đã verify

### ⚠️ Quan Trọng:
- Email gửi (`SENDGRID_FROM_EMAIL`) phải được **verify** trên SendGrid
- Miễn phí: 100 emails/ngày
- Nếu cần nhiều hơn: Nâng cấp gói

## 🎯 Luồng Gửi Email

```
Khách hàng đặt hàng
    ↓
Order saved to DB
    ↓
Email xác nhận gửi cho khách hàng (SendGrid API)
    ↓
✅ Hoàn tất
```

## ⚠️ Lưu Ý

- **KHÔNG** dùng Gmail SMTP trên Render.com (bị chặn port)
- SendGrid miễn phí 100 emails/ngày, đủ dùng
- Nếu SendGrid lỗi, kiểm tra:
  - `SENDGRID_API_KEY` có đúng không
  - `SENDGRID_FROM_EMAIL` đã verify chưa
  - API Key còn hiệu lực không

## 📂 File Quan Trọng

- `controllers/orderController.js` - Controller xử lý đơn hàng và gửi email
- `services/emailServiceSendGrid.js` - **SendGrid service (DUY NHẤT)**
- `services/emailService.js` - Gmail SMTP (không dùng được trên Render)
- `package.json` - Đã thêm `@sendgrid/mail`

## 🚀 Deploy

Sau khi thay đổi, push code và redeploy trên Render.com:

```bash
git add .
git commit -m "Chuyển sang SendGrid API - Fix SMTP timeout trên Render"
git push
```

**Render.com sẽ tự động deploy lại backend.**

### ⚙️ Cấu Hình Environment Variables trên Render.com:

Vào Render Dashboard → Backend Service → Environment → Add:

```
SENDGRID_API_KEY=SG.your-api-key-here
SENDGRID_FROM_EMAIL=your-verified-email@domain.com
EMAIL_TO=admin-email@example.com
```

**Sau khi thêm, click "Save Changes" và service sẽ tự động restart.**
