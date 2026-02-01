# Hướng dẫn quản lý Trung tâm hỗ trợ

## 📚 Tổng quan

Hệ thống Trung tâm hỗ trợ cho phép quản lý các bài viết hướng dẫn, chính sách với đầy đủ:

- Nội dung văn bản (HTML, song ngữ Việt-Anh)
- Hình ảnh minh họa
- Video hướng dẫn (YouTube hoặc file trực tiếp)
- File đính kèm để tải về (PDF, DOCX, XLSX, v.v.)

## 🎯 Tính năng chính

### 1. Quản lý qua Admin Panel

Truy cập: `https://admin-eft.vercel.app/support`

**Chức năng:**

- ✅ Xem danh sách tất cả bài viết
- ✅ Thêm bài viết mới
- ✅ Chỉnh sửa bài viết
- ✅ Xóa bài viết
- ✅ Quản lý trạng thái xuất bản
- ✅ Xem số lượt views

### 2. Hiển thị trên website

Truy cập: `https://eft-website.vercel.app/support`

**Tính năng:**

- Hiển thị danh sách bài viết (chỉ published)
- Xem chi tiết bài viết
- Tự động chuyển ngôn ngữ Việt/Anh
- Hiển thị đầy đủ media (ảnh, video, file)
- Tính năng download file
- Đếm lượt xem tự động

## 📝 Cấu trúc bài viết

### Thông tin cơ bản

```javascript
{
  title: "Tiêu đề tiếng Việt",           // Bắt buộc
  titleEn: "English Title",              // Tùy chọn
  content: "<h2>Nội dung HTML...</h2>",  // Bắt buộc
  contentEn: "<h2>English content...</h2>", // Tùy chọn
  slug: "url-slug",                      // Bắt buộc, duy nhất
  thumbnail: "https://...",              // URL ảnh đại diện
  published: true,                       // true/false
}
```

### Media

```javascript
{
  // Hình ảnh - Array of URLs
  images: [
    "https://images.unsplash.com/...",
    "https://...",
  ],

  // Video - YouTube embed hoặc file trực tiếp
  videos: [
    "https://www.youtube.com/embed/VIDEO_ID",
    "https://yourdomain.com/video.mp4",
  ],

  // File đính kèm
  attachments: [
    {
      filename: "Huong-dan.pdf",
      filepath: "/files/guide.pdf",
      filesize: 2458000  // bytes
    }
  ]
}
```

## 🔧 Quản lý nội dung

### Thêm bài viết mới qua Admin

1. **Đăng nhập Admin Panel**

   - URL: https://admin-eft.vercel.app
   - Vào mục "Bài Viết Hỗ Trợ"

2. **Nhấn "Thêm bài viết mới"**

3. **Điền thông tin:**

   - Tiêu đề (Việt & Anh)
   - Slug (ví dụ: `huong-dan-thanh-toan`)
   - Thumbnail URL
   - Nội dung (Việt & Anh) - Hỗ trợ HTML
   - Hình ảnh (mỗi URL một dòng)
   - Video (mỗi URL một dòng)
   - File đính kèm (dùng nút "Thêm file")
   - Trạng thái xuất bản

4. **Nhấn "Thêm mới" hoặc "Cập nhật"**

### Thêm bài viết qua Code

```bash
# 1. Chỉnh sửa file seed
cd backend
code seedSupportEnhanced.js

# 2. Thêm bài viết mới vào array supportArticles

# 3. Chạy script seed
node seedSupportEnhanced.js
```

## 🎨 Định dạng nội dung HTML

### Tiêu đề

```html
<h2>📱 Tiêu đề chính</h2>
<h3>Tiêu đề phụ</h3>
<h4>Tiêu đề nhỏ</h4>
```

### Đoạn văn và danh sách

```html
<p>Đoạn văn bản...</p>

<ul>
  <li>Mục 1</li>
  <li>Mục 2</li>
</ul>

<ol>
  <li>Bước 1</li>
  <li>Bước 2</li>
</ol>
```

### Boxes với màu sắc

```html
<!-- Box cảnh báo (vàng) -->
<div
  style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;"
>
  <h3>⚠️ Lưu ý quan trọng</h3>
  <p>Nội dung cảnh báo...</p>
</div>

<!-- Box thông tin (xanh) -->
<div
  style="background: #d1ecf1; padding: 15px; border-left: 4px solid #17a2b8; margin: 20px 0;"
>
  <h3>💡 Mẹo hữu ích</h3>
  <p>Nội dung mẹo...</p>
</div>

<!-- Box thành công (xanh lá) -->
<div
  style="background: #d4edda; padding: 15px; border-left: 4px solid #28a745; margin: 20px 0;"
>
  <h3>✅ Thành công</h3>
  <p>Nội dung...</p>
</div>

<!-- Box nguy hiểm (đỏ) -->
<div
  style="background: #f8d7da; padding: 15px; border-left: 4px solid #dc3545; margin: 20px 0;"
>
  <h3>🔴 Cảnh báo nghiêm trọng</h3>
  <p>Nội dung nguy hiểm...</p>
</div>
```

### Bảng

```html
<table style="width:100%; border-collapse: collapse; margin: 15px 0;">
  <tr style="background: #f5f5f5;">
    <th style="padding: 10px; border: 1px solid #ddd;">Cột 1</th>
    <th style="padding: 10px; border: 1px solid #ddd;">Cột 2</th>
  </tr>
  <tr>
    <td style="padding: 10px; border: 1px solid #ddd;">Dữ liệu 1</td>
    <td style="padding: 10px; border: 1px solid #ddd;">Dữ liệu 2</td>
  </tr>
</table>
```

## 📦 Quản lý File đính kèm

### Chuẩn bị file

1. Upload file lên server/cloud storage
2. Lấy URL public của file
3. Note lại tên file và kích thước (bytes)

### Thêm vào bài viết

```javascript
attachments: [
  {
    filename: "Ten-file.pdf", // Tên hiển thị
    filepath: "/files/file.pdf", // URL hoặc đường dẫn
    filesize: 2458000, // Kích thước (bytes)
  },
];
```

### Tính filesize

- 1 KB = 1024 bytes
- 1 MB = 1024 KB = 1,048,576 bytes
- Ví dụ: File 2.4 MB = 2,458,000 bytes

## 🎬 Quản lý Video

### YouTube Video

```javascript
// Cách 1: YouTube embed URL
"https://www.youtube.com/embed/VIDEO_ID";

// Cách 2: YouTube watch URL (sẽ tự convert)
"https://www.youtube.com/watch?v=VIDEO_ID";
```

### Video tự host

```javascript
// Upload file video lên server và dùng URL
"https://yourdomain.com/videos/tutorial.mp4";
```

## 🌐 API Endpoints

### Public (Frontend)

```
GET /api/support              # Lấy tất cả bài viết published
GET /api/support/:slug        # Lấy chi tiết bài viết (tăng views)
```

### Admin

```
GET  /api/support/admin/all   # Lấy tất cả bài viết (cả unpublished)
POST /api/support             # Tạo bài viết mới
PUT  /api/support/:id         # Cập nhật bài viết
DELETE /api/support/:id       # Xóa bài viết
```

## 📊 Best Practices

### Nội dung

- ✅ Viết rõ ràng, dễ hiểu
- ✅ Chia nhỏ thành các phần với tiêu đề
- ✅ Sử dụng emoji để làm nổi bật
- ✅ Thêm ảnh minh họa cho từng bước
- ✅ Cung cấp video hướng dẫn nếu có thể
- ✅ Đính kèm file mẫu, template

### SEO & UX

- ✅ Slug ngắn gọn, có nghĩa
- ✅ Thumbnail chất lượng cao
- ✅ Nội dung song ngữ đầy đủ
- ✅ Cập nhật định kỳ
- ✅ Theo dõi lượt views để biết bài viết nào phổ biến

### Technical

- ✅ Optimize kích thước hình ảnh (< 500KB)
- ✅ Video nên dùng YouTube embed (tiết kiệm bandwidth)
- ✅ File đính kèm < 10MB
- ✅ Test trên mobile và desktop
- ✅ Backup database thường xuyên

## 🔒 Bảo mật

- Admin routes cần authentication
- Validate input khi tạo/sửa bài viết
- Sanitize HTML content để tránh XSS
- Giới hạn upload file size
- Rate limiting cho API

## 📞 Hỗ trợ

Nếu gặp vấn đề:

1. Check logs: `backend/logs/`
2. Kiểm tra MongoDB connection
3. Verify API endpoints hoạt động
4. Test trên local trước khi deploy

---

**Tạo bởi:** GitHub Copilot
**Ngày cập nhật:** 20/11/2025
