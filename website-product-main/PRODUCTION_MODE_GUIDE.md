# 🔧 CÁCH BẬT PRODUCTION MODE CHO EMAIL

## 📧 Hiện Trạng

**TEST MODE đang bật:**

- Email gửi đến: `vtu21102000@gmail.com` (admin)
- Subject có prefix: `[KH: customer@email.com]`
- Email body có warning banner màu vàng
- Reply-To: địa chỉ email khách hàng

## ✅ Khi Nào Bật Production Mode?

Sau khi đã **VERIFY DOMAIN** tại Resend:

1. Đã add domain tại: https://resend.com/domains
2. Đã thêm DNS records (TXT, MX, CNAME)
3. Domain status: ✅ Verified
4. Đã có email address với domain (vd: `orders@efttech.vn`)

## 🚀 Cách Chuyển Sang Production Mode

### Bước 1: Mở file emailServiceResend.js

File: `backend/services/emailServiceResend.js`

### Bước 2: Tìm dòng này (khoảng dòng 171)

```javascript
const isTestMode = true; // Set false khi đã verify domain
```

### Bước 3: Đổi thành

```javascript
const isTestMode = false; // Production mode - gửi đến email khách hàng
```

### Bước 4: Update FROM address

Tìm dòng:

```javascript
from: "EFT Technology <onboarding@resend.dev>", // Resend test domain
```

Đổi thành:

```javascript
from: "EFT Technology <orders@yourdomain.com>", // Domain đã verify
```

### Bước 5: Restart Server

```bash
# Stop server (Ctrl+C)
# Start lại
npm start
```

### Bước 6: Test

Tạo order test → Email sẽ gửi đến đúng email khách hàng! ✅

## 📋 Checklist Production

- [ ] Domain đã verify tại Resend
- [ ] DNS records đã được thêm và active
- [ ] Đã có email address với domain verified
- [ ] `isTestMode = false` trong code
- [ ] `from` address dùng domain đã verify
- [ ] Đã restart server
- [ ] Test với email thật
- [ ] Kiểm tra spam folder
- [ ] Verify deliverability

## ⚠️ Lưu Ý

**KHÔNG BẬT production mode nếu:**

- Chưa verify domain
- Domain verification đang pending
- Chưa test kỹ

**NẾU BẬT MÀ CHƯA VERIFY:**

- Email sẽ bị lỗi 403
- Không gửi được
- Backend sẽ log error

## 🔄 Rollback

Nếu có vấn đề, đổi lại:

```javascript
const isTestMode = true; // Back to test mode
```

---

**Current Status:** TEST MODE (Safe for development)  
**Production Ready:** After domain verification  
**Updated:** December 3, 2025
