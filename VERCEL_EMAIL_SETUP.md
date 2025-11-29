# QUAN TRỌNG: CẤU HÌNH EMAIL TRÊN VERCEL

## Vấn đề hiện tại

❌ Không nhận được email xác nhận đơn hàng

## Nguyên nhân

Backend trên Vercel **CHƯA CÓ** environment variables cho email service!

## Giải pháp - THỰC HIỆN NGAY:

### Bước 1: Truy cập Vercel Dashboard

1. Đi tới: https://vercel.com/vuthanhuniteds-projects
2. Chọn project: **website-product-1** (backend)

### Bước 2: Thêm Environment Variables

1. Click vào **Settings** tab
2. Click vào **Environment Variables**
3. Thêm 3 biến sau:

```
EMAIL_USER = vtu21102000@gmail.com
EMAIL_PASS = jujnhapozgyjaiuw
EMAIL_TO = vtu21102000@gmail.com
```

**Lưu ý quan trọng:**

- Chọn **All Environments** (Production, Preview, Development)
- Click **Save** sau mỗi biến

### Bước 3: Redeploy Backend

**BẮT BUỘC phải redeploy để áp dụng env vars!**

1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Click nút **⋯** (3 chấm) > **Redeploy**
4. Chọn **Redeploy** (không cần **Use existing Build Cache**)
5. Đợi 2-3 phút để deploy xong

### Bước 4: Kiểm tra Email Service

Sau khi redeploy xong:

1. Vào **Deployments** > Latest deployment
2. Click vào **Functions** tab
3. Tìm function `/api/orders`
4. Click để xem **Runtime Logs**
5. Tìm dòng log: "✅ Email service is ready to send messages"

### Bước 5: Test Đặt Hàng

1. Vào https://eft-company.vercel.app
2. Thêm sản phẩm vào giỏ
3. Checkout và điền thông tin
4. Đặt hàng
5. Kiểm tra email inbox và spam

## Alternative: Nếu Vercel chặn SMTP

Nếu sau khi làm theo hướng dẫn trên mà vẫn không nhận được email, có thể Vercel đang chặn SMTP connection.

### Giải pháp thay thế: SendGrid

SendGrid free tier: 100 emails/day

**Setup SendGrid:**

1. Đăng ký tại: https://sendgrid.com/
2. Tạo API Key
3. Thêm env var trên Vercel:
   ```
   SENDGRID_API_KEY = your_api_key_here
   ```
4. Thay đổi code email service để dùng SendGrid

## Checklist

- [ ] Đã thêm EMAIL_USER trên Vercel
- [ ] Đã thêm EMAIL_PASS trên Vercel
- [ ] Đã thêm EMAIL_TO trên Vercel
- [ ] Đã Redeploy backend
- [ ] Đã kiểm tra logs "Email service is ready"
- [ ] Đã test đặt hàng và kiểm tra email

## Tại sao local hoạt động nhưng production không?

- Local: Đọc file `.env` từ thư mục backend
- Vercel: Phải config env vars qua dashboard
- File `.env` **KHÔNG** được push lên Git (trong .gitignore)
- Do đó Vercel không biết các giá trị email config

## Hỗ trợ thêm

Nếu cần hỗ trợ:

1. Share screenshot của Environment Variables trên Vercel
2. Share Runtime Logs của function `/api/orders`
3. Share error message nếu có
