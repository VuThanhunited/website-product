# Hướng Dẫn Cấu Hình SendGrid - Nhanh & Đơn Giản

## 🚀 Tại Sao Phải Dùng SendGrid?

**Vấn đề:** Render.com (và hầu hết hosting) **CHẶN cổng SMTP** (587, 465, 25) để tránh spam.

- ❌ Gmail SMTP → **KHÔNG hoạt động** (Connection timeout)
- ✅ SendGrid API → **Hoạt động hoàn hảo**

## 📝 Các Bước Cấu Hình (5 phút)

### 1️⃣ Đăng Ký SendGrid (Miễn Phí)

1. Truy cập: https://signup.sendgrid.com
2. Điền thông tin:
   - Email: `your-email@gmail.com`
   - Password: Tạo mật khẩu mạnh
   - Công ty: `EFT Technology` (hoặc tên bất kỳ)
3. Click **Get Started**
4. **Verify email** của bạn (check inbox/spam)

### 2️⃣ Lấy API Key

1. Đăng nhập SendGrid: https://app.sendgrid.com
2. Vào **Settings** → **API Keys** (menu bên trái)
3. Click **Create API Key**
4. Đặt tên: `EFT-Production`
5. Chọn quyền: **Full Access**
6. Click **Create & View**
7. **COPY API KEY** ngay (chỉ hiện 1 lần!)
   ```
   SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 3️⃣ Verify Email Sender

**QUAN TRỌNG:** SendGrid chỉ cho gửi từ email đã verify!

#### Option A: Single Sender Verification (Đơn giản - Khuyên dùng)

1. Vào **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Điền thông tin:
   - **From Name:** `EFT Technology`
   - **From Email Address:** `your-email@gmail.com` (email bạn muốn gửi)
   - **Reply To:** `your-email@gmail.com`
   - **Company Address:** `123 Street, City`
   - **Nickname:** `EFT-Sender`
4. Click **Create**
5. Check email → Click **Verify Single Sender**
6. ✅ **Done!** Email này giờ có thể gửi được

#### Option B: Domain Authentication (Nâng cao)

Nếu bạn có domain riêng (eft-chem.com):

1. Vào **Settings** → **Sender Authentication**
2. Click **Authenticate Your Domain**
3. Làm theo hướng dẫn thêm DNS records
4. Đợi verify (có thể mất 24-48h)

### 4️⃣ Cấu Hình Render.com

1. Vào https://dashboard.render.com
2. Chọn **backend service** của bạn
3. Vào tab **Environment**
4. Click **Add Environment Variable**
5. Thêm 2 biến:

```bash
SENDGRID_API_KEY=SG.xxxxx (paste API key từ bước 2)
SENDGRID_FROM_EMAIL=your-email@gmail.com (email đã verify ở bước 3)
```

6. Click **Save Changes**
7. Service sẽ tự động restart

### 5️⃣ Test Email

1. Đợi Render deploy xong (~2 phút)
2. Vào website → Đặt hàng thử
3. Check email → **Bạn sẽ nhận được email xác nhận!** 🎉

## ✅ Kết Quả Mong Đợi

```bash
✅ SendGrid email service initialized
✅ Email Service: SendGrid initialized
📧 Sending customer confirmation email via SendGrid...
✅ Order confirmation email sent successfully!
   Status: 202
```

## 🎯 Giới Hạn Miễn Phí

- **100 emails/ngày** - Đủ cho shop nhỏ
- Nếu cần nhiều hơn: Nâng cấp gói ($15/tháng = 40,000 emails)

## ❓ Xử Lý Lỗi Thường Gặp

### Lỗi: "The from address does not match a verified Sender Identity"

**Nguyên nhân:** Email gửi chưa được verify

**Giải pháp:**

1. Vào SendGrid → **Sender Authentication**
2. Verify email theo bước 3 ở trên
3. Đảm bảo `SENDGRID_FROM_EMAIL` = email đã verify

### Lỗi: "API key not configured"

**Nguyên nhân:** Thiếu hoặc sai `SENDGRID_API_KEY`

**Giải pháp:**

1. Check lại API key trên SendGrid
2. Copy lại API key (phải có prefix `SG.`)
3. Update lại trên Render Environment Variables

### Email không nhận được

**Kiểm tra:**

1. Check **Spam/Junk** folder
2. Vào SendGrid Dashboard → **Activity** → Xem log email
3. Kiểm tra email có đúng không

## 🔗 Links Hữu Ích

- SendGrid Dashboard: https://app.sendgrid.com
- SendGrid Docs: https://docs.sendgrid.com
- Render Dashboard: https://dashboard.render.com
- Support: Email me nếu cần help!

## 🎉 Xong Rồi!

Giờ hệ thống email đã hoạt động hoàn hảo trên Render.com! 🚀
