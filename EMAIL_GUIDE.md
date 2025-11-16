# Hướng dẫn Test Email Xác Nhận Đơn Hàng

## ✅ Đã hoàn thành:

### 1. Email Service (`backend/services/emailService.js`)

- ✅ Cấu hình Nodemailer với Gmail
- ✅ Template email đẹp mắt với HTML/CSS
- ✅ Hỗ trợ đa ngôn ngữ (Tiếng Việt/English)
- ✅ Email cho khách hàng với chi tiết đơn hàng
- ✅ Email thông báo cho admin
- ✅ Logo, màu sắc gradient đẹp mắt
- ✅ Responsive email template

### 2. Order Controller (`backend/controllers/orderController.js`)

- ✅ Tích hợp gửi email khi tạo đơn hàng
- ✅ Gửi email async (không block response)
- ✅ Nhận tham số `language` từ frontend
- ✅ Gửi 2 email: khách hàng + admin

### 3. Frontend Updates

- ✅ Checkout page gửi `language` trong orderData
- ✅ OrderSuccess page hiển thị thông báo kiểm tra email
- ✅ Translations cập nhật cho "checkEmail", "forOrderDetails"
- ✅ CSS cho email notice box

## 📧 Cấu hình Email (đã có trong .env):

```env
EMAIL_USER=vtu21102000@gmail.com
EMAIL_PASS=jujnhapozgyjaiuw
EMAIL_TO=vtu21102000@gmail.com
```

## 🧪 Cách Test:

### Bước 1: Khởi động Backend

```bash
cd "e:\Work Freelancer\Web bán hàng\backend"
node server.js
```

### Bước 2: Khởi động Frontend

```bash
cd "e:\Work Freelancer\Web bán hàng\frontend"
npm start
```

### Bước 3: Đặt Hàng Test

1. Mở trình duyệt: http://localhost:3000
2. Thêm sản phẩm vào giỏ hàng
3. Vào trang Checkout
4. Điền thông tin (sử dụng email thật của bạn để nhận email)
5. Chọn phương thức thanh toán
6. Nhấn "Đặt hàng"

### Bước 4: Kiểm Tra Email

1. ✅ Kiểm tra email khách hàng (email bạn điền ở form)
2. ✅ Kiểm tra email admin (vtu21102000@gmail.com)
3. ✅ Xem giao diện email có đẹp không
4. ✅ Kiểm tra thông tin đơn hàng có đầy đủ không

### Bước 5: Kiểm Tra Console

Backend console sẽ hiển thị:

```
✅ Order confirmation email sent: <messageId>
✅ Admin notification email sent: <messageId>
```

## 📝 Email Template Features:

### Email Khách Hàng:

- ✅ Header gradient đẹp mắt (purple gradient)
- ✅ Lời chào khách hàng (personalized)
- ✅ Mã đơn hàng, ngày đặt, phương thức thanh toán
- ✅ Địa chỉ giao hàng đầy đủ
- ✅ Bảng sản phẩm (tên, số lượng, giá, thành tiền)
- ✅ Tổng tiền (subtotal + shipping + total)
- ✅ Ghi chú đơn hàng (nếu có)
- ✅ Thông tin liên hệ (email, hotline, website)
- ✅ Footer đẹp mắt

### Email Admin:

- ✅ Thông báo đơn hàng mới
- ✅ Thông tin khách hàng
- ✅ Tổng tiền và phương thức thanh toán
- ✅ Link đến admin panel

## 🎨 Email Design:

- Gradient header: #667eea → #764ba2
- Responsive layout (600px width)
- Box shadows và border radius
- Color-coded sections
- Professional typography
- Mobile-friendly

## 🔧 Troubleshooting:

### Nếu email không gửi:

1. Kiểm tra EMAIL_USER và EMAIL_PASS trong .env
2. Kiểm tra internet connection
3. Xem console backend có lỗi gì không
4. Kiểm tra spam folder trong email

### Nếu email vào spam:

- Đây là normal với email test
- Gmail App Password có thể cần cấu hình lại
- Có thể cần xác thực domain (production)

## ⚡ Next Steps (Optional):

1. Thêm email templates khác:

   - Email xác nhận thanh toán
   - Email cập nhật trạng thái đơn hàng
   - Email giao hàng thành công

2. Cải thiện email:

   - Thêm tracking code
   - Thêm barcode/QR code đơn hàng
   - Thêm button "Track Order"

3. Production:
   - Sử dụng SMTP service chuyên nghiệp (SendGrid, Mailgun)
   - Thêm email domain verification
   - Setup DKIM, SPF records

## 📌 Lưu ý:

- Email được gửi async nên không làm chậm response
- Nếu email fail, đơn hàng vẫn được tạo thành công
- Console sẽ log kết quả gửi email
- Template hỗ trợ cả Tiếng Việt và English
