# Admin Panel - Hệ Thống Quản Trị Website

## 🚀 Tổng Quan

Admin Panel là hệ thống quản trị toàn diện cho phép quản lý tất cả nội dung website mà không cần chỉnh sửa code.

**URL:** http://localhost:3001 (Development)

## 📋 Tính Năng

### 1. **Quản Lý Sản Phẩm** (`/products`)

- Xem danh sách tất cả sản phẩm
- Thêm sản phẩm mới với hình ảnh
- Chỉnh sửa thông tin sản phẩm
- Xóa sản phẩm
- Tìm kiếm và lọc sản phẩm theo danh mục
- Quản lý nội dung đa ngôn ngữ (Tiếng Việt & English)

### 2. **Quản Lý Danh Mục** (`/categories`)

- Thêm/sửa/xóa danh mục sản phẩm
- Quản lý icon và mô tả danh mục
- Hỗ trợ đa ngôn ngữ

### 3. **Quản Lý Đơn Hàng** (`/orders`) ⭐ NEW

- Xem danh sách tất cả đơn hàng
- Lọc đơn hàng theo trạng thái (Chờ xử lý, Đã xác nhận, Đang giao, Đã giao)
- Tìm kiếm đơn hàng theo tên, email, số điện thoại
- Xem chi tiết đơn hàng (thông tin khách hàng, sản phẩm)
- Cập nhật trạng thái đơn hàng
- Hủy đơn hàng

### 4. **Quản Lý Media Slideshow** (`/media`)

- Thêm/sửa/xóa ảnh slideshow trang chủ
- Upload ảnh hoặc dùng URL
- Quản lý thứ tự hiển thị

### 5. **Quản Lý Slogan Trang Chủ** (`/slogans`) ⭐ NEW

- Thêm/sửa/xóa slogan hiển thị trên homepage
- Hỗ trợ Tiếng Việt và English
- Hiển thị theo thứ tự được thêm

### 6. **Thông Tin Công Ty** (`/company`) ⭐ NEW

- Cập nhật tên công ty, địa chỉ, số điện thoại, email
- Quản lý link mạng xã hội (Zalo, YouTube, Instagram, WhatsApp)
- Chế độ View/Edit mode
- Lưu và hủy thay đổi dễ dàng

### 7. **Quản Lý Đối Tác** (`/partners`) ⭐ NEW

- Thêm/sửa/xóa logo đối tác (Shopee, Lazada, Tiki, v.v.)
- Upload ảnh logo hoặc dùng URL
- Thêm link website đối tác
- Hiển thị dạng grid với preview ảnh

### 8. **Bài Viết Hỗ Trợ** (`/support`)

- Tạo và quản lý các bài viết hướng dẫn
- Editor WYSIWYG
- Quản lý categories cho bài viết

### 9. **Tin Nhắn Liên Hệ** (`/messages`)

- Xem tin nhắn từ form liên hệ trên website
- Đánh dấu đã đọc/chưa đọc
- Xóa tin nhắn

## 🛠️ Cài Đặt & Chạy

### Yêu Cầu

- Node.js 14+
- Backend server chạy trên port 5000

### Bước 1: Cài đặt dependencies

```bash
cd Admin
npm install
```

### Bước 2: Chạy development server

```bash
npm start
```

Admin panel sẽ chạy tại: http://localhost:3001

## 🔧 Cấu Hình

### Environment Variables

Tạo file `.env` trong thư mục Admin:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Trong production (Vercel/Netlify):

```env
REACT_APP_API_URL=https://website-product-1.onrender.com/api
```

### Proxy Configuration

File `package.json` đã được cấu hình proxy tự động:

```json
"proxy": "http://localhost:5000"
```

## 📦 Build Production

```bash
npm run build
```

Output sẽ được tạo trong thư mục `build/`.

## 🎨 Giao Diện

- **Sidebar Navigation**: Điều hướng giữa các trang quản lý
- **Responsive Design**: Hoạt động tốt trên desktop & tablet
- **Modern UI**: Gradient colors, smooth transitions, card-based layout
- **Icons**: React Icons (Font Awesome)

## 🔐 Bảo Mật

**LƯU Ý**: Admin panel hiện tại chưa có authentication. Để sử dụng trong production, cần:

1. Thêm login/logout functionality
2. JWT authentication với backend
3. Protected routes
4. Role-based access control

## 📝 API Endpoints Sử Dụng

### Products

- `GET /api/products` - Lấy danh sách sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### Categories

- `GET /api/categories` - Lấy danh sách danh mục
- `POST /api/categories` - Tạo danh mục mới
- `PUT /api/categories/:id` - Cập nhật danh mục
- `DELETE /api/categories/:id` - Xóa danh mục

### Orders

- `GET /api/orders` - Lấy tất cả đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `PUT /api/orders/:id` - Cập nhật trạng thái đơn hàng
- `DELETE /api/orders/:id` - Xóa đơn hàng

### Media

- `GET /api/media/slides` - Lấy slideshow images
- `POST /api/media/slides` - Thêm slide mới
- `PUT /api/media/slides/:id` - Cập nhật slide
- `DELETE /api/media/slides/:id` - Xóa slide

### Slogans

- `GET /api/media/slogans` - Lấy danh sách slogan
- `POST /api/media/slogans` - Thêm slogan mới
- `PUT /api/media/slogans/:id` - Cập nhật slogan
- `DELETE /api/media/slogans/:id` - Xóa slogan

### Company

- `GET /api/company` - Lấy thông tin công ty
- `PUT /api/company` - Cập nhật thông tin công ty

### Partners

- `GET /api/company/partners` - Lấy danh sách đối tác
- `POST /api/company/partners` - Thêm đối tác mới
- `PUT /api/company/partners/:id` - Cập nhật đối tác
- `DELETE /api/company/partners/:id` - Xóa đối tác

### Support

- `GET /api/support` - Lấy bài viết hỗ trợ
- `POST /api/support` - Tạo bài viết mới
- `PUT /api/support/:id` - Cập nhật bài viết
- `DELETE /api/support/:id` - Xóa bài viết

### Messages

- `GET /api/contact` - Lấy tin nhắn liên hệ
- `DELETE /api/contact/:id` - Xóa tin nhắn

## 🚀 Deployment

### Deploy Admin Panel lên Vercel

1. Đẩy code lên GitHub
2. Kết nối repository với Vercel
3. Cấu hình environment variable:
   - `REACT_APP_API_URL=https://website-product-1.onrender.com/api`
4. Deploy

### Deploy lên Netlify

```bash
npm run build
netlify deploy --prod --dir=build
```

## 📱 Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

## 🎯 Roadmap

- [ ] Authentication & Authorization
- [ ] Dashboard với statistics
- [ ] Bulk operations (xóa nhiều items cùng lúc)
- [ ] Export orders to Excel/CSV
- [ ] Email notification settings
- [ ] User management
- [ ] Activity logs
- [ ] Dark mode

## 🐛 Troubleshooting

### Port đã được sử dụng

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Không kết nối được backend

1. Kiểm tra backend server đang chạy trên port 5000
2. Kiểm tra CORS settings trong backend
3. Kiểm tra proxy configuration trong package.json

### Build errors

```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Hỗ Trợ

Nếu gặp vấn đề, hãy kiểm tra:

1. Backend server đang chạy
2. MongoDB connection đang hoạt động
3. Console log trong browser (F12)
4. Terminal output của React app

## 📄 License

MIT License - Tự do sử dụng cho dự án cá nhân và thương mại.
