# Cấu Hình Gmail để Gửi Email Liên Hệ

## Bước 1: Bật xác thực 2 bước cho Gmail

1. Truy cập: https://myaccount.google.com/security
2. Tìm mục "Xác minh 2 bước" và bật lên
3. Làm theo hướng dẫn để thiết lập xác minh 2 bước

## Bước 2: Tạo App Password cho ứng dụng

1. Sau khi bật xác thực 2 bước, truy cập: https://myaccount.google.com/apppasswords
2. Chọn "Mail" và "Windows Computer" (hoặc "Other")
3. Nhập tên: "Website Contact Form"
4. Click "Generate"
5. Sao chép mật khẩu ứng dụng 16 ký tự (dạng: xxxx xxxx xxxx xxxx)

## Bước 3: Cập nhật file .env

Mở file `backend/.env` và thay thế:

```
EMAIL_PASS=your-app-password
```

Bằng mật khẩu app vừa tạo (bỏ dấu cách):

```
EMAIL_PASS=xxxxxxxxxxxxxxxx
```

## Bước 4: Restart Backend Server

```bash
cd backend
node server.js
```

## Kiểm Tra

Sau khi cấu hình xong:

1. Vào trang Liên Hệ
2. Điền form và gửi
3. Kiểm tra email vtu21102000@gmail.com
4. Bạn sẽ nhận được email thông báo có tin nhắn liên hệ mới

## Lưu Ý

- Không chia sẻ App Password với ai
- Không commit file .env lên GitHub
- Nếu không nhận được email, kiểm tra thư mục Spam
