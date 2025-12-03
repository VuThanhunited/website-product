# 🔧 Hướng Dẫn Khắc Phục Vấn Đề Email

## ⚠️ Vấn Đề

Email xác nhận đơn hàng có vẻ như chỉ gửi về `vtu21102000@gmail.com` thay vì email khách hàng nhập vào form.

## 🔍 Nguyên Nhân

### 1. **Gmail SMTP Limitations**

Khi sử dụng Gmail SMTP với Nodemailer (hiện tại):
- Email được gửi **FROM**: `vtu21102000@gmail.com`
- Email được gửi **TO**: `order.customerInfo.email` (đúng!)
- **NHƯNG**: Gmail có các giới hạn:
  - Nếu địa chỉ TO không hợp lệ → email bounce về sender
  - Gmail có thể filter hoặc redirect email trong một số trường hợp
  - Sandbox mode: chỉ gửi được đến verified emails

### 2. **Code Đúng Nhưng Configuration Sai**

Code trong tất cả các file email service đều ĐÚNG:
```javascript
// emailService.js
to: order.customerInfo.email  // ✅ Đúng

// emailServiceResend.js  
to: [order.customerInfo.email]  // ✅ Đúng

// emailServiceSendGrid.js
to: order.customerInfo.email  // ✅ Đúng
```

### 3. **Không Có RESEND_API_KEY**

File `.env` hiện tại không có `RESEND_API_KEY`, nên hệ thống đang fallback về Gmail SMTP.

## ✅ Giải Pháp

### **Giải pháp 1: Sử dụng Resend (Recommended)**

1. **Đăng ký Resend** (miễn phí):
   - Truy cập: https://resend.com
   - Đăng ký tài khoản
   - Verify domain của bạn (hoặc dùng test domain)
   - Lấy API Key

2. **Thêm vào `.env`**:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

3. **Restart server**:
   ```bash
   npm start
   ```

4. **Lợi ích**:
   - ✅ Gửi được đến BẤT KỲ email nào
   - ✅ Delivery rate cao
   - ✅ Analytics & tracking
   - ✅ Không bị giới hạn như Gmail

### **Giải pháp 2: Test với Gmail SMTP**

Để kiểm tra email có thực sự gửi đến đúng địa chỉ không:

1. **Kiểm tra server logs** khi tạo order:
   ```
   📧 EMAIL DETAILS:
   FROM: vtu21102000@gmail.com
   TO: customer@example.com  ← Xem địa chỉ này có đúng không
   ```

2. **Test với email thật**:
   - Nhập email của bạn (Gmail, Outlook, Yahoo)
   - Tạo order test
   - Kiểm tra inbox (và spam folder)

3. **Chạy test script**:
   ```bash
   node testOrderCustomerEmail.js
   ```

### **Giải pháp 3: Verify Email Configuration**

1. **Kiểm tra email khách hàng có hợp lệ không**:
   ```javascript
   // Frontend validation
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     alert("Email không hợp lệ!");
   }
   ```

2. **Kiểm tra data gửi lên server**:
   - Mở DevTools → Network
   - Tạo order
   - Xem request body có `customerInfo.email` đúng không

## 🧪 Debug Steps

### 1. Check Server Console

Khi tạo order, xem trong console:
```
📧 EMAIL DETAILS:
FROM: vtu21102000@gmail.com
TO: [Email Address Here]  ← Địa chỉ này phải là email khách hàng
```

### 2. Check Gmail Sent Folder

Vào Gmail `vtu21102000@gmail.com`:
- Mở **Sent** folder
- Tìm email vừa gửi
- Xem **TO:** field có đúng địa chỉ khách hàng không

### 3. Check Customer Email

Yêu cầu khách hàng:
- Kiểm tra **Inbox**
- Kiểm tra **Spam/Junk** folder
- Kiểm tra email có bị filter không

## 📊 Comparison: Email Services

| Service | Pros | Cons | Cost |
|---------|------|------|------|
| **Gmail SMTP** | Free, Easy setup | Limited, Low deliverability, Branded as personal | Free |
| **Resend** | High deliverability, Modern, Good docs | Need API key | Free tier: 3k emails/month |
| **SendGrid** | Reliable, Industry standard | Complex setup | Free tier: 100 emails/day |

## 🎯 Recommended Action

**Dùng Resend ngay**:

1. Đăng ký tại: https://resend.com
2. Lấy API key
3. Thêm vào `.env`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
4. Restart server
5. Test order → Email sẽ gửi đến đúng địa chỉ khách hàng

## 📝 Notes

- Code hiện tại **KHÔNG CÓ LỖI**
- Vấn đề nằm ở **infrastructure** (Gmail SMTP limitations)
- Best practice: Dùng transactional email service cho production
- Gmail SMTP chỉ nên dùng cho development/testing

## 🔗 Resources

- Resend Docs: https://resend.com/docs
- Gmail SMTP Limits: https://support.google.com/mail/answer/22839
- Nodemailer Docs: https://nodemailer.com

---

**Updated**: December 3, 2025  
**Status**: Waiting for RESEND_API_KEY to fully resolve issue
