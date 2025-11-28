# Hướng Dẫn Hệ Thống Quản Lý Nội Dung (CMS)

## Tổng Quan

Hệ thống CMS cho phép admin chỉnh sửa TẤT CẢ nội dung trên trang chủ (Home) và trang công ty (Company) mà không cần chỉnh sửa code.

## Các Thành Phần Đã Được Thêm

### Backend (API)

#### 1. Models (Mô hình dữ liệu)

**`backend/models/HomePageContent.js`**

- Quản lý nội dung trang chủ
- Bao gồm:
  - **Features** (Tính năng nổi bật): Mảng các thẻ tính năng với icon, tiêu đề, mô tả (song ngữ)
  - **Why Choose Us** (Tại sao chọn chúng tôi): Phần tiêu đề và mảng các lý do với icon, tiêu đề, mô tả (song ngữ)
  - **CTA** (Call to Action): Tiêu đề, mô tả, 2 nút hành động với text và link (song ngữ)

**`backend/models/CompanyPageContent.js`**

- Quản lý nội dung trang công ty
- Bao gồm:
  - **Hero Section**: Tiêu đề và phụ đề trang (song ngữ)
  - **Company Intro** (Giới thiệu): Tiêu đề và 2 đoạn văn (song ngữ)
  - **Core Values** (Giá trị cốt lõi): Tiêu đề phần và mảng các giá trị với icon, tiêu đề, mô tả (song ngữ)
  - **Achievements** (Thành tựu): Tiêu đề phần và mảng các con số với số, nhãn (song ngữ)
  - **Gallery** (Thư viện): Tiêu đề phần (song ngữ)
  - **CTA**: Tương tự như trang chủ

#### 2. Controllers (Bộ điều khiển)

**`backend/controllers/homePageContentController.js`**

- `getHomePageContent()` - Lấy nội dung trang chủ (public)
- `updateHomePageContent()` - Cập nhật toàn bộ nội dung (admin only)
- `addFeature()` - Thêm tính năng mới
- `updateFeature()` - Cập nhật tính năng
- `deleteFeature()` - Xóa tính năng
- `addWhyChooseUsItem()` - Thêm lý do chọn
- `updateWhyChooseUsItem()` - Cập nhật lý do chọn
- `deleteWhyChooseUsItem()` - Xóa lý do chọn

**`backend/controllers/companyPageContentController.js`**

- `getCompanyPageContent()` - Lấy nội dung trang công ty (public)
- `updateCompanyPageContent()` - Cập nhật toàn bộ nội dung (admin only)
- `addCoreValue()` - Thêm giá trị cốt lõi
- `updateCoreValue()` - Cập nhật giá trị cốt lõi
- `deleteCoreValue()` - Xóa giá trị cốt lõi
- `addAchievement()` - Thêm thành tựu
- `updateAchievement()` - Cập nhật thành tựu
- `deleteAchievement()` - Xóa thành tựu

#### 3. Routes (Đường dẫn API)

**`backend/routes/homePageContentRoutes.js`**

- `GET /api/home-content` - Lấy nội dung (public)
- `PUT /api/home-content` - Cập nhật toàn bộ (admin)
- `POST /api/home-content/features` - Thêm tính năng (admin)
- `PUT /api/home-content/features/:featureId` - Cập nhật tính năng (admin)
- `DELETE /api/home-content/features/:featureId` - Xóa tính năng (admin)
- `POST /api/home-content/why-choose-us` - Thêm lý do (admin)
- `PUT /api/home-content/why-choose-us/:itemId` - Cập nhật lý do (admin)
- `DELETE /api/home-content/why-choose-us/:itemId` - Xóa lý do (admin)

**`backend/routes/companyPageContentRoutes.js`**

- `GET /api/company-content` - Lấy nội dung (public)
- `PUT /api/company-content` - Cập nhật toàn bộ (admin)
- `POST /api/company-content/values` - Thêm giá trị (admin)
- `PUT /api/company-content/values/:valueId` - Cập nhật giá trị (admin)
- `DELETE /api/company-content/values/:valueId` - Xóa giá trị (admin)
- `POST /api/company-content/achievements` - Thêm thành tựu (admin)
- `PUT /api/company-content/achievements/:achievementId` - Cập nhật thành tựu (admin)
- `DELETE /api/company-content/achievements/:achievementId` - Xóa thành tựu (admin)

#### 4. Seed Script (Dữ liệu ban đầu)

**`backend/seedPageContent.js`**

- Script để khởi tạo dữ liệu ban đầu cho cả 2 trang
- Sử dụng nội dung hiện có từ code cũ
- Chạy một lần để tạo dữ liệu mặc định

### Admin Panel (Giao diện quản trị)

#### 1. Admin Home Content Page

**`Admin/src/pages/AdminHomeContent.js`**

- Giao diện quản lý nội dung trang chủ
- 3 tab chính:
  - **Tính Năng**: Quản lý các thẻ tính năng (thêm, sửa, xóa)
  - **Tại Sao Chọn Chúng Tôi**: Quản lý các lý do (thêm, sửa, xóa)
  - **Call To Action**: Chỉnh sửa CTA section

**`Admin/src/pages/AdminHomeContent.css`**

- Styling cho trang quản lý nội dung trang chủ
- Responsive design
- Form layouts, buttons, tabs

#### 2. Admin Company Content Page

**`Admin/src/pages/AdminCompanyContent.js`**

- Giao diện quản lý nội dung trang công ty
- 6 tab chính:
  - **Hero Section**: Tiêu đề và phụ đề
  - **Giới Thiệu**: Tiêu đề và 2 đoạn văn
  - **Giá Trị Cốt Lõi**: Quản lý các giá trị (thêm, sửa, xóa)
  - **Thành Tựu**: Quản lý các con số thành tựu (thêm, sửa, xóa)
  - **Thư Viện**: Tiêu đề thư viện
  - **Call To Action**: CTA section

**`Admin/src/pages/AdminCompanyContent.css`**

- Styling cho trang quản lý nội dung trang công ty
- Tương tự AdminHomeContent.css

#### 3. Admin App Routes

**`Admin/src/App.js`**

- Thêm 2 menu items mới:
  - "Nội Dung Trang Chủ" → `/home-content`
  - "Nội Dung Trang Công Ty" → `/company-content`
- Thêm 2 routes mới cho các trang quản lý

### Frontend (Giao diện người dùng)

#### 1. Home Page Updates

**`frontend/src/pages/Home.js`**

- Cập nhật để fetch nội dung từ API `/api/home-content`
- Hiển thị nội dung động từ database
- Fallback về translations cũ nếu API fail
- Hỗ trợ song ngữ (Tiếng Việt/English)
- Features, Why Choose Us, và CTA đều động

**`frontend/src/styles/Home.css`**

- Thêm styles cho 2 nút CTA (primary và secondary)
- `.cta-buttons` container với flexbox
- `.cta-button.primary` - nút chính (trắng)
- `.cta-button.secondary` - nút phụ (trong suốt với border)

#### 2. Company Page Updates

**`frontend/src/pages/Company.js`**

- Cập nhật để fetch nội dung từ API `/api/company-content`
- Hero section, intro, values, achievements, gallery, CTA đều động
- Fallback về translations cũ nếu API fail
- Hỗ trợ song ngữ đầy đủ

## Cách Sử Dụng

### 1. Khởi Tạo Dữ Liệu Ban Đầu

Chạy script seed một lần để tạo dữ liệu mặc định:

```bash
cd backend
node seedPageContent.js
```

### 2. Truy Cập Admin Panel

1. Đăng nhập vào Admin Panel
2. Chọn menu "Nội Dung Trang Chủ" hoặc "Nội Dung Trang Công Ty"
3. Chỉnh sửa nội dung theo ý muốn
4. Nhấn "Lưu Thay Đổi"

### 3. Quản Lý Trang Chủ

**Tab Tính Năng:**

- Nhập icon (emoji như 🚚, ✅, 💳, 🎁)
- Nhập tiêu đề và mô tả (cả Tiếng Việt và English)
- Đặt thứ tự hiển thị
- Thêm/Xóa tính năng

**Tab Tại Sao Chọn Chúng Tôi:**

- Chỉnh sửa tiêu đề phần (song ngữ)
- Quản lý các mục (icon, tiêu đề, mô tả song ngữ)
- Đặt thứ tự hiển thị
- Thêm/Xóa mục

**Tab Call To Action:**

- Chỉnh sửa tiêu đề và mô tả (song ngữ)
- Nút chính: text và link (song ngữ)
- Nút phụ: text và link (song ngữ)

### 4. Quản Lý Trang Công Ty

**Tab Hero Section:**

- Tiêu đề và phụ đề trang (song ngữ)

**Tab Giới Thiệu:**

- Tiêu đề phần (song ngữ)
- Đoạn văn 1 và 2 (song ngữ)

**Tab Giá Trị Cốt Lõi:**

- Tiêu đề phần (song ngữ)
- Quản lý các giá trị (icon, tiêu đề, mô tả song ngữ)
- Thêm/Xóa giá trị

**Tab Thành Tựu:**

- Tiêu đề phần (song ngữ)
- Quản lý các con số (số, nhãn song ngữ)
- VD: "15+", "1000+", "99%"
- Thêm/Xóa thành tựu

**Tab Thư Viện:**

- Tiêu đề phần (song ngữ)
- (Ảnh được quản lý ở phần Media Slides)

**Tab Call To Action:**

- Tương tự trang chủ

## Tính Năng Chính

### 1. Song Ngữ (Bilingual)

- Tất cả nội dung hỗ trợ Tiếng Việt và English
- Tự động chuyển đổi theo ngôn ngữ người dùng chọn

### 2. Thứ Tự Tùy Chỉnh

- Mỗi item có trường `order` để sắp xếp
- Hiển thị theo thứ tự tăng dần

### 3. CRUD Đầy Đủ

- **Create**: Thêm mục mới
- **Read**: Xem nội dung hiện tại
- **Update**: Chỉnh sửa mục
- **Delete**: Xóa mục

### 4. Fallback an toàn

- Nếu API fail, sử dụng translations cũ
- Đảm bảo website vẫn hoạt động bình thường

### 5. Real-time Updates

- Thay đổi trong admin → Hiển thị ngay trên website
- Không cần reload hoặc deploy lại

## Cấu Trúc Dữ Liệu

### Home Page Content

```javascript
{
  features: [
    {
      icon: "🚚",
      title: "Miễn Phí Vận Chuyển",
      titleEn: "Free Shipping",
      description: "Cho đơn hàng trên 500K",
      descriptionEn: "For orders over 500K",
      order: 1
    }
  ],
  whyChooseUs: {
    title: "Tại Sao Chọn Chúng Tôi",
    titleEn: "Why Choose Us",
    items: [
      {
        icon: "🏆",
        title: "Uy Tín Hàng Đầu",
        titleEn: "Top Reputation",
        description: "Được khách hàng tin tưởng",
        descriptionEn: "Trusted by customers",
        order: 1
      }
    ]
  },
  cta: {
    title: "Sẵn Sàng Mua Sắm?",
    titleEn: "Ready to Shop?",
    description: "Khám phá bộ sưu tập...",
    descriptionEn: "Explore our collection...",
    primaryButtonText: "Xem Sản Phẩm",
    primaryButtonTextEn: "View Products",
    primaryButtonLink: "/products",
    secondaryButtonText: "Liên Hệ Ngay",
    secondaryButtonTextEn: "Contact Now",
    secondaryButtonLink: "/contact"
  }
}
```

### Company Page Content

```javascript
{
  hero: {
    title: "Về Chúng Tôi - Công Ty TNHH...",
    titleEn: "About Us - EFT Technology...",
    subtitle: "Đối tác tin cậy...",
    subtitleEn: "Your Trusted Partner..."
  },
  intro: {
    title: "Câu Chuyện Của Chúng Tôi",
    titleEn: "Our Story",
    paragraph1: "Công ty được thành lập...",
    paragraph1En: "The company was established...",
    paragraph2: "Với đội ngũ chuyên gia...",
    paragraph2En: "With a team of experts..."
  },
  values: {
    title: "Giá Trị Cốt Lõi",
    titleEn: "Our Core Values",
    items: [...]
  },
  achievements: {
    title: "Thành Tựu Của Chúng Tôi",
    titleEn: "Our Achievements",
    items: [
      {
        number: "15+",
        label: "Sản Phẩm",
        labelEn: "Products",
        order: 1
      }
    ]
  },
  gallery: {
    title: "Thư Viện Ảnh",
    titleEn: "Our Gallery"
  },
  cta: { ... }
}
```

## API Endpoints

### Public Endpoints

- `GET /api/home-content` - Lấy nội dung trang chủ
- `GET /api/company-content` - Lấy nội dung trang công ty

### Admin Endpoints (Yêu cầu Authentication)

- `PUT /api/home-content` - Cập nhật nội dung trang chủ
- `POST/PUT/DELETE /api/home-content/features/:id` - Quản lý features
- `POST/PUT/DELETE /api/home-content/why-choose-us/:id` - Quản lý why choose us
- `PUT /api/company-content` - Cập nhật nội dung trang công ty
- `POST/PUT/DELETE /api/company-content/values/:id` - Quản lý values
- `POST/PUT/DELETE /api/company-content/achievements/:id` - Quản lý achievements

## Lưu Ý Quan Trọng

1. **Emoji Icons**: Sử dụng emoji thật, không phải icon font. Copy/paste emoji từ emojipedia.org
2. **Thứ Tự**: Số thứ tự càng nhỏ hiển thị càng đầu tiên
3. **Song Ngữ**: Điền đầy đủ cả 2 ngôn ngữ để trải nghiệm tốt nhất
4. **Links**: Đường dẫn có thể là relative (`/products`) hoặc absolute (`https://...`)
5. **Seed Script**: Chỉ chạy một lần khi khởi tạo, không chạy lại sẽ không tạo duplicate

## Troubleshooting

**Nếu nội dung không hiển thị:**

1. Kiểm tra backend đã chạy chưa
2. Kiểm tra đã seed dữ liệu chưa
3. Mở Developer Console xem có lỗi API không
4. Kiểm tra token admin còn hạn không

**Nếu không lưu được:**

1. Kiểm tra đã đăng nhập admin chưa
2. Kiểm tra token còn hạn không
3. Xem Network tab trong Developer Tools
4. Kiểm tra backend logs

## Kết Luận

Hệ thống CMS này cho phép admin:

- ✅ Chỉnh sửa TẤT CẢ nội dung trang chủ và trang công ty
- ✅ Không cần chỉnh sửa code
- ✅ Quản lý song ngữ dễ dàng
- ✅ Thêm/Xóa/Sửa các phần tử động
- ✅ Sắp xếp thứ tự hiển thị
- ✅ Cập nhật real-time

Khách hàng hoàn toàn có thể tự quản lý nội dung website mà không cần developer!
