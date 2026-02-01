# Hướng Dẫn Quản Lý Phí Vận Chuyển

## Tính Năng Mới

### 1. Quản Lý Phí Vận Chuyển (Admin)

Admin có thể quản lý phí vận chuyển theo từng tỉnh/thành phố tại trang **Phí Vận Chuyển**.

#### Chức năng:

- ✅ Thêm phí vận chuyển cho từng tỉnh/thành phố
- ✅ Cập nhật phí và thời gian giao hàng ước tính
- ✅ Kích hoạt/Tạm ngưng phí vận chuyển
- ✅ Xóa phí vận chuyển

#### Cách sử dụng:

1. **Đăng nhập Admin Panel** → Vào mục **"Phí Vận Chuyển"**

2. **Thêm phí vận chuyển mới:**

   - Click nút **"Thêm Khu Vực"**
   - Chọn **Tỉnh/Thành phố** từ danh sách
   - Nhập **Phí vận chuyển** (VNĐ)
   - Nhập **Thời gian giao hàng ước tính** (ví dụ: "2-3 ngày")
   - Chọn **Kích hoạt** để áp dụng ngay
   - Click **"Thêm Mới"**

3. **Chỉnh sửa phí vận chuyển:**

   - Click nút **"Chỉnh sửa"** (✏️) trên hàng cần sửa
   - Cập nhật thông tin
   - Click **"Cập Nhật"**

4. **Xóa phí vận chuyển:**
   - Click nút **"Xóa"** (🗑️) trên hàng cần xóa
   - Xác nhận xóa

### 2. Tính Phí Vận Chuyển Tự Động (Frontend)

Khách hàng sẽ thấy phí vận chuyển tự động khi điền địa chỉ giao hàng.

#### Cách hoạt động:

1. **Trang Thanh Toán (Checkout):**

   - Khách hàng điền **Họ tên**, **Email**, **Số điện thoại**
   - Chọn **Tỉnh/Thành phố** từ dropdown
   - Nhập **Quận/Huyện**, **Phường/Xã** (tùy chọn)
   - Nhập **Địa chỉ chi tiết**

2. **Tự động hiển thị phí:**

   - Khi chọn tỉnh/thành phố → Hệ thống tự động tính và hiển thị phí vận chuyển
   - Hiển thị **Thời gian giao hàng ước tính**
   - Tổng tiền được cập nhật tự động

3. **Phương thức thanh toán mới:**

   - 💵 **COD (Cash on Delivery)** - Thanh toán khi nhận hàng
   - 🏦 **Chuyển khoản ngân hàng** - Chuyển khoản trực tiếp
   - 📱 **Ví MoMo** - Thanh toán qua ví MoMo
   - 💳 **VNPay** - Thanh toán qua cổng VNPay
   - 🔵 **ZaloPay** - Thanh toán qua ví ZaloPay

4. **Thông tin chuyển khoản:**
   - Nếu chọn **"Chuyển khoản ngân hàng"**, hệ thống hiển thị:
     - Tên ngân hàng
     - Số tài khoản
     - Chủ tài khoản
     - Nội dung chuyển khoản
   - Khách hàng nhập **Mã giao dịch** sau khi chuyển khoản

## API Endpoints

### Public APIs (Không cần xác thực)

#### 1. Lấy danh sách phí vận chuyển

```http
GET /api/shipping
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "province": "Hà Nội",
      "rate": 20000,
      "estimatedDays": "1-2 ngày",
      "isActive": true
    }
  ]
}
```

#### 2. Lấy phí vận chuyển theo tỉnh

```http
GET /api/shipping/:province
```

**Example:**

```http
GET /api/shipping/Hà Nội
```

**Response:**

```json
{
  "success": true,
  "data": {
    "rate": 20000,
    "estimatedDays": "1-2 ngày"
  }
}
```

### Admin APIs (Cần xác thực Admin)

#### 3. Tạo/Cập nhật phí vận chuyển

```http
POST /api/shipping
Authorization: Bearer {token}
```

**Body:**

```json
{
  "province": "Hà Nội",
  "rate": 20000,
  "estimatedDays": "1-2 ngày",
  "isActive": true
}
```

#### 4. Cập nhật phí vận chuyển

```http
PUT /api/shipping/:id
Authorization: Bearer {token}
```

**Body:**

```json
{
  "province": "Hà Nội",
  "rate": 25000,
  "estimatedDays": "1-2 ngày",
  "isActive": true
}
```

#### 5. Xóa phí vận chuyển

```http
DELETE /api/shipping/:id
Authorization: Bearer {token}
```

## Database Schema

### ShippingRate Model

```javascript
{
  province: String (unique),      // Tên tỉnh/thành phố
  rate: Number,                   // Phí vận chuyển (VNĐ)
  estimatedDays: String,          // Thời gian giao hàng
  isActive: Boolean,              // Kích hoạt
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model (Đã cập nhật)

```javascript
{
  customerInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,              // Tỉnh/Thành phố (dropdown)
    district: String,
    ward: String,
    notes: String
  },
  shippingFee: Number,         // Phí vận chuyển động
  paymentMethod: String,       // cod, bank_transfer, momo, vnpay, zalopay
  paymentInfo: {               // Thông tin thanh toán (cho bank_transfer)
    bankName: String,
    accountNumber: String,
    accountName: String,
    transactionId: String
  }
}
```

## Seed Data

Đã tạo sẵn **20 phí vận chuyển mẫu** cho các tỉnh/thành phố chính:

| Tỉnh/Thành phố | Phí vận chuyển | Thời gian |
| -------------- | -------------- | --------- |
| Hà Nội         | 20,000 ₫       | 1-2 ngày  |
| Hồ Chí Minh    | 25,000 ₫       | 2-3 ngày  |
| Đà Nẵng        | 30,000 ₫       | 2-3 ngày  |
| Hải Phòng      | 25,000 ₫       | 1-2 ngày  |
| Cần Thơ        | 35,000 ₫       | 3-4 ngày  |
| ...            | ...            | ...       |

**Chạy lại seed:**

```bash
cd backend
node seedShippingRates.js
```

## UI/UX Improvements

### Trang Thanh Toán (Checkout)

1. **Địa chỉ giao hàng:**

   - Dropdown chọn tỉnh/thành phố (63 tỉnh Việt Nam)
   - Input text cho quận/huyện, phường/xã
   - Placeholder rõ ràng: "Nhập quận/huyện", "Nhập phường/xã"

2. **Hiển thị phí vận chuyển:**

   - Box màu xanh nổi bật
   - Icon 📦 Thông tin vận chuyển
   - Hiển thị rõ: "Phí vận chuyển đến [Tỉnh]: XX,XXX ₫"
   - Thời gian giao hàng ước tính

3. **Phương thức thanh toán:**

   - Design card đẹp với icon riêng
   - Mô tả ngắn gọn cho từng phương thức
   - Hover effect tương tác
   - Box thông tin chuyển khoản (cho bank_transfer)

4. **Summary Order:**
   - Hiển thị phí vận chuyển rõ ràng
   - Note nhỏ: "🚚 Giao hàng đến [Tỉnh] (X-Y ngày)"
   - Màu xanh cho shipping fee

## Testing

### Test Admin Panel:

1. Đăng nhập Admin → Vào "Phí Vận Chuyển"
2. Thêm phí vận chuyển cho "Hà Nội": 20,000 ₫
3. Kiểm tra hiển thị trong danh sách
4. Chỉnh sửa thành 25,000 ₫
5. Xóa và kiểm tra

### Test Frontend:

1. Vào trang Products → Thêm sản phẩm vào giỏ
2. Đăng nhập user → Vào Checkout
3. Chọn tỉnh "Hà Nội" → Kiểm tra phí 20,000 ₫ hiển thị
4. Chọn tỉnh "Hồ Chí Minh" → Kiểm tra phí thay đổi thành 25,000 ₫
5. Chọn phương thức "Chuyển khoản ngân hàng" → Kiểm tra hiển thị thông tin
6. Đặt hàng và kiểm tra Order

## Notes

- ⚠️ **Phí mặc định:** Nếu tỉnh chưa có trong database, hệ thống dùng phí mặc định 30,000 ₫
- 💡 **Free shipping:** Admin có thể set phí = 0 cho tỉnh nào đó để miễn phí ship
- 🔒 **Bảo mật:** Chỉ Admin mới được thêm/sửa/xóa phí vận chuyển
- 📱 **Responsive:** UI hoàn toàn tương thích mobile

## Support

Nếu có vấn đề, kiểm tra:

1. Backend server đang chạy: `http://localhost:5000/api/health`
2. MongoDB đã connect thành công
3. Đã seed shipping rates: `node seedShippingRates.js`
4. Token admin còn hạn (7 ngày)
