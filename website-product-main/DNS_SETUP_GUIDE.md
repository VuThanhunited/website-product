# Hướng dẫn cấu hình DNS để gửi email xác nhận đơn hàng

## Thông tin domain

Domain: **eft-chem.com**

## DNS Records cần thêm

### 1. DKIM Record (Xác thực email)

```
Type: TXT
Name: resend._domainkey.eft-chem.com
Value: [Lấy từ Resend Dashboard - mục DKIM]
TTL: Auto hoặc 3600
```

### 2. SPF Record (Chống spam)

```
Type: TXT
Name: @ (hoặc eft-chem.com)
Value: v=spf1 include:_spf.resend.com ~all
TTL: Auto hoặc 3600
```

### 3. Domain Verification (Xác minh domain)

```
Type: TXT
Name: @ (hoặc eft-chem.com)
Value: resend-verification=[Mã từ Resend]
TTL: Auto hoặc 3600
```

## Cách thêm DNS Records

### Nếu dùng Cloudflare:

1. Đăng nhập Cloudflare
2. Chọn domain `eft-chem.com`
3. Vào tab **DNS** → **Records**
4. Click **Add record**
5. Nhập thông tin theo bảng trên
6. Click **Save**

### Nếu dùng Namecheap:

1. Đăng nhập Namecheap
2. Domain List → Manage → Advanced DNS
3. Click **Add New Record**
4. Nhập thông tin theo bảng trên
5. Click Save

### Nếu dùng GoDaddy:

1. Đăng nhập GoDaddy
2. My Products → Domains → DNS
3. Click **Add**
4. Nhập thông tin theo bảng trên
5. Click Save

## Kiểm tra DNS đã hoạt động

Sau khi add DNS (chờ 15-30 phút), kiểm tra bằng:

### Online tool:

https://mxtoolbox.com/SuperTool.aspx

- Nhập: `resend._domainkey.eft-chem.com`
- Click TXT Lookup
- Phải thấy giá trị đã add

### Command line (Windows):

```powershell
nslookup -type=TXT resend._domainkey.eft-chem.com
```

### Command line (Mac/Linux):

```bash
dig TXT resend._domainkey.eft-chem.com
```

## Cập nhật code sau khi verify

Sau khi domain được verify thành công trên Resend, cần cập nhật:

**File: `backend/services/emailServiceResend.js`**

Thay đổi dòng:

```javascript
from: "EFT Technology <onboarding@resend.dev>";
```

Thành:

```javascript
from: "EFT Technology <noreply@eft-chem.com>";
```

Hoặc:

```javascript
from: "EFT Technology <info@eft-chem.com>";
```

## Lưu ý quan trọng

⚠️ **Thời gian lan truyền DNS**: 15 phút - 48 giờ (thường là 15-30 phút)

⚠️ **Test mode**: Trước khi verify domain, email chỉ gửi được đến email đã verify (vtu21102000@gmail.com)

✅ **Sau khi verify**: Email sẽ gửi được đến TẤT CẢ khách hàng

## Hỗ trợ

Nếu gặp vấn đề:

- Check DNS đã lan truyền chưa: https://dnschecker.org
- Check SPF record: https://mxtoolbox.com/spf.aspx
- Liên hệ: vtu21102000@gmail.com
