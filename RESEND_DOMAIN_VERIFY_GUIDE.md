# 🚀 RESEND EMAIL - HƯỚNG DẪN VERIFY DOMAIN

## ⚠️ VẤN ĐỀ HIỆN TẠI

Resend API đang hoạt động **NHƯNG ở chế độ TEST MODE**:

- ✅ Email gửi thành công
- ❌ Chỉ gửi được đến: `vtu21102000@gmail.com` (email đã đăng ký)
- ❌ Không gửi được đến email khách hàng khác

## ✅ GIẢI PHÁP: VERIFY DOMAIN

Để gửi email đến **BẤT KỲ** địa chỉ khách hàng nào, cần verify domain.

### Bước 1: Truy cập Resend Dashboard

1. Đăng nhập: https://resend.com/login
2. Vào phần **Domains**: https://resend.com/domains
3. Click **Add Domain**

### Bước 2: Thêm Domain

Có 2 options:

#### Option A: Domain Riêng (Recommended - Production)

```
Domain: efttech.vn (hoặc domain của bạn)
FROM email: orders@efttech.vn
```

**Yêu cầu:**

- Phải có domain name
- Phải có quyền truy cập DNS settings
- Cần thêm DNS records (TXT, MX, CNAME)

#### Option B: Subdomain (Easier)

```
Domain: mail.yourdomain.com
FROM email: noreply@mail.yourdomain.com
```

### Bước 3: Verify DNS Records

Resend sẽ cung cấp DNS records cần thêm:

```
TXT Record:
Name: _resend
Value: resend-verification-xxxxx

MX Records:
Priority: 10
Value: feedback-smtp.us-east-1.amazonses.com

CNAME Records:
Name: resend._domainkey
Value: resend._domainkey.resend.com
```

**Thêm vào DNS Provider:**

- Cloudflare
- GoDaddy
- Namecheap
- etc.

### Bước 4: Đợi Verification

- Thời gian: 15 phút - 48 giờ
- Status: Pending → Verified ✅

### Bước 5: Cập Nhật Code

Sau khi domain verified, cập nhật `emailServiceResend.js`:

```javascript
// BEFORE (Test mode)
from: "EFT Technology <onboarding@resend.dev>";

// AFTER (Production)
from: "EFT Technology <orders@yourdomain.com>";
```

## 🔧 WORKAROUND TẠM THỜI

Nếu **chưa có domain** hoặc **chưa verify được**, có thể dùng workaround:

### Cách 1: Dùng Gmail SMTP (Hiện tại)

```javascript
// Backend sẽ tự động fallback về Gmail
// Nhưng vẫn bị giới hạn Gmail
```

### Cách 2: Mock Customer Email

Trong development, tạm thời gửi tất cả email test đến `vtu21102000@gmail.com`:

```javascript
// orderController.js (TẠM THỜI - CHỈ ĐỂ TEST)
const emailForTesting =
  process.env.NODE_ENV === "development"
    ? "vtu21102000@gmail.com" // Override trong dev
    : order.customerInfo.email; // Dùng thật trong production

sendOrderConfirmationEmail(
  {
    ...order,
    customerInfo: {
      ...order.customerInfo,
      email: emailForTesting,
    },
  },
  language
);
```

## 📋 CHECKLIST PRODUCTION

Để deploy production với email hoạt động 100%:

- [ ] Mua/có domain name (ví dụ: efttech.vn)
- [ ] Truy cập DNS settings của domain
- [ ] Add domain vào Resend
- [ ] Thêm DNS records (TXT, MX, CNAME)
- [ ] Đợi verification (check status)
- [ ] Update FROM address trong code
- [ ] Test với email thật
- [ ] Deploy lên production

## 🎯 RECOMMENDED TIMELINE

| Nếu có domain          | Timeline                       |
| ---------------------- | ------------------------------ |
| Có domain + DNS access | 1-2 giờ                        |
| Chưa có domain         | 1-3 ngày (mua + verify)        |
| Không dùng domain      | Dùng SendGrid/Mailgun thay thế |

## 🔄 TẠM THỜI: TEST VỚI GMAIL

Hiện tại, để test tính năng order:

1. **Backend server đã có RESEND_API_KEY** ✅
2. **Nhưng chỉ gửi được đến:** `vtu21102000@gmail.com`
3. **Khi tạo order test:** Nhập email bất kỳ → Email vẫn chỉ đến `vtu21102000@gmail.com`

**Để test:**

```bash
# Tạo order với email test
# Email sẽ gửi đến: vtu21102000@gmail.com (không phải email khách)
# Đây là hạn chế của Resend test mode
```

## 🚀 NEXT STEPS

### Ngay lập tức:

1. ✅ RESEND_API_KEY đã được thêm vào `.env`
2. ✅ Backend đã test thành công gửi email
3. ⏳ Email hiện chỉ gửi đến verified address

### Để production-ready:

1. **Verify domain tại Resend** (Quan trọng nhất!)
2. Hoặc dùng alternative: SendGrid, Mailgun, AWS SES
3. Update FROM address trong code

## 📞 SUPPORT

Nếu cần hỗ trợ verify domain:

- Resend Docs: https://resend.com/docs/dashboard/domains/introduction
- Support: https://resend.com/support
- Community: https://resend.com/discord

---

**Status**: Resend configured ✅ but in TEST MODE ⚠️  
**Action Required**: Verify domain để gửi email đến mọi khách hàng  
**Updated**: December 3, 2025
