# 📚 Hướng Dẫn Sử Dụng Admin Panel

## Tổng Quan

Admin Panel hiện tại đã được nâng cấp để quản lý **TOÀN BỘ** nội dung trang web mà không cần chỉnh sửa code. Bạn có thể thay đổi mọi thứ từ sản phẩm, danh mục, đơn hàng, đến thông tin công ty, slogan, và đối tác.

## 🚀 Cách Truy Cập Admin Panel

### Local Development
```bash
cd Admin
npm install  # Chỉ cần chạy lần đầu
npm start    # Sẽ mở tại http://localhost:3001
```

### Production
- Deploy Admin folder lên hosting riêng biệt (Vercel, Netlify, etc.)
- Cấu hình `REACT_APP_API_URL` trỏ đến backend API

## 📋 Các Trang Quản Lý

### 1. 📦 Quản Lý Sản Phẩm
**Chức năng:**
- Xem danh sách tất cả sản phẩm
- Thêm sản phẩm mới với đầy đủ thông tin (tên, mô tả, giá, ảnh, danh mục)
- Chỉnh sửa thông tin sản phẩm
- Xóa sản phẩm
- Đánh dấu sản phẩm nổi bật (Featured)
- Upload ảnh sản phẩm
- Hỗ trợ đa ngôn ngữ (Tiếng Việt + English)

**Các trường quan trọng:**
- **Tên sản phẩm**: Tên hiển thị chính
- **Slug**: URL thân thiện (VD: son-moi-do -> /products/son-moi-do)
- **Danh mục**: Chọn từ danh sách có sẵn
- **Giá**: Giá bán (VNĐ)
- **Ảnh**: URL hoặc upload file
- **Featured**: Hiển thị trên trang chủ

### 2. 🏷️ Quản Lý Danh Mục
**Chức năng:**
- Tạo danh mục mới
- Chỉnh sửa tên danh mục
- Xóa danh mục (chỉ khi không còn sản phẩm nào)
- Hỗ trợ đa ngôn ngữ

**Lưu ý:**
- Mỗi danh mục có slug riêng để tạo URL
- Danh mục có sản phẩm không thể xóa

### 3. 🛒 Quản Lý Đơn Hàng
**Chức năng:**
- Xem tất cả đơn hàng
- Lọc theo trạng thái (Chờ xử lý, Đã xác nhận, Đang giao, Đã giao)
- Tìm kiếm theo tên, email, số điện thoại
- Xem chi tiết đơn hàng (khách hàng, sản phẩm, tổng tiền)
- Cập nhật trạng thái đơn hàng
- Thống kê nhanh (tổng đơn, đơn chờ xử lý)

**Trạng thái đơn hàng:**
- **Pending**: Chờ xử lý (mới đặt)
- **Confirmed**: Đã xác nhận
- **Shipping**: Đang giao hàng
- **Delivered**: Đã giao thành công
- **Cancelled**: Đã hủy

### 4. 🖼️ Quản Lý Media
**Chức năng:**
- Quản lý slideshow trang chủ
- Upload ảnh slideshow
- Thêm/sửa/xóa slide
- Sắp xếp thứ tự hiển thị
- Thêm link cho mỗi slide (optional)

### 5. 💬 Quản Lý Slogan
**Chức năng:**
- Thêm slogan hiển thị trên trang chủ
- Chỉnh sửa nội dung slogan
- Xóa slogan
- Hỗ trợ đa ngôn ngữ (Tiếng Việt + English)

**Sử dụng:**
- Slogan xuất hiện dưới banner chính trang chủ
- Có thể có nhiều slogan, hiển thị theo thứ tự thêm vào
- Mỗi slogan nên ngắn gọn, thu hút (1-2 câu)

### 6. 🏢 Thông Tin Công Ty
**Chức năng:**
- Cập nhật tên công ty
- Địa chỉ, số điện thoại, email liên hệ
- Các liên kết mạng xã hội:
  - Facebook
  - YouTube
  - Zalo
  - Instagram
  - WhatsApp

**Lưu ý:**
- Thông tin này hiển thị ở Footer và trang Contact
- Các link mạng xã hội phải bắt đầu bằng `https://`

### 7. 🤝 Quản Lý Đối Tác
**Chức năng:**
- Thêm logo đối tác/nhà phân phối
- Upload ảnh logo
- Thêm link website đối tác
- Chỉnh sửa/xóa đối tác

**Sử dụng:**
- Logo hiển thị ở Footer trang chủ
- Khuyến nghị kích thước logo: 150x150px đến 200x200px
- Định dạng: PNG với nền trong suốt (hoặc JPG nền trắng)

### 8. ❓ Bài Viết Hỗ Trợ
**Chức năng:**
- Tạo bài viết FAQ/Support
- Chỉnh sửa nội dung
- Xóa bài viết
- Hỗ trợ đa ngôn ngữ

### 9. ✉️ Tin Nhắn
**Chức năng:**
- Xem tin nhắn từ khách hàng (form Contact)
- Đánh dấu đã đọc/chưa đọc
- Xóa tin nhắn

## 🎨 Tips Sử Dụng

### Upload Ảnh
1. **Sản phẩm**: Nên dùng ảnh nền trắng, tỷ lệ 1:1 hoặc 4:3
2. **Slideshow**: Tỷ lệ 16:9, kích thước tối thiểu 1920x1080px
3. **Logo đối tác**: Nền trong suốt, 200x200px

### SEO-Friendly Slugs
- Slug tự động tạo từ tên (VD: "Son Môi Đỏ" -> "son-moi-do")
- Không dấu, không khoảng trắng, chỉ dùng dấu gạch ngang
- Slug phải **duy nhất** (không trùng với sản phẩm/danh mục khác)

### Đa Ngôn Ngữ
- **Tiếng Việt** (bắt buộc): Nội dung chính
- **English** (tùy chọn): Dành cho khách hàng quốc tế
- Trang web tự động chuyển đổi ngôn ngữ dựa trên lựa chọn người dùng

## 🔧 Troubleshooting

### Không tải được dữ liệu
**Giải pháp:**
1. Kiểm tra backend có đang chạy không (http://localhost:5000)
2. Kiểm tra `REACT_APP_API_URL` trong `.env`
3. Xem Console log trong trình duyệt (F12)

### Upload ảnh thất bại
**Giải pháp:**
1. Kiểm tra dung lượng file (nên < 5MB)
2. Định dạng hỗ trợ: JPG, PNG, WEBP
3. Kiểm tra backend có folder `uploads/` với quyền ghi

### Lỗi "Network Error"
**Nguyên nhân:**
- Backend chưa chạy
- CORS configuration chưa đúng
- API URL sai

**Giải pháp:**
```bash
# 1. Kiểm tra backend
cd backend
npm start

# 2. Kiểm tra CORS trong backend/server.js
# Đảm bảo có:
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
```

## 📱 Responsive Design

Admin Panel hoạt động tốt trên:
- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768+)
- ✅ Tablet (768px+)
- ⚠️ Mobile (Hạn chế - nên dùng desktop để quản lý)

## 🔒 Bảo Mật

**Lưu ý quan trọng:**
- Admin Panel hiện tại **CHƯA CÓ** xác thực (authentication)
- Không public Admin URL ra internet
- Chỉ truy cập từ mạng nội bộ hoặc VPN

**TODO (nếu cần):**
- Thêm login/logout
- Phân quyền user (admin, editor, viewer)
- Logging các thay đổi

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra Console log (F12 trong trình duyệt)
2. Kiểm tra backend logs
3. Xem file `README.md` và `SETUP.md`
4. Liên hệ developer

---

**Cập nhật:** 18/11/2025  
**Version:** 2.0 - Full CMS Implementation
