# 🚀 HƯỚNG DẪN DEPLOY - FIX EMAIL & LOGO

## ✅ ĐÃ FIX

### 1. **Email Service - ✅ Working Locally**

- ✅ Đổi từ `service: "gmail"` sang config SMTP chi tiết
- ✅ Port: 587 (TLS)
- ✅ Add timeout settings
- ✅ Test thành công local: `node testEmailDirect.js`

### 2. **Partner Logos - ✅ Fixed**

- ✅ Shopee: Wikipedia CDN
- ✅ Lazada: Wikipedia CDN
- ✅ Tiki: Tiki CDN official
- ✅ Database đã update

## 🔧 DEPLOY LÊN RENDER (QUAN TRỌNG!)

### **Bước 1: Update Environment Variables**

Vào **Render Dashboard** → Backend Service → **Environment**:

```env
# Email Configuration
EMAIL_USER=vtu21102000@gmail.com
EMAIL_PASS=jujnhapozgyjaiuw

# Database (đã có)
MONGODB_URI=mongodb+srv://vtu21102000:Vuthanh1810%40@cluster0.7t35nab.mongodb.net/lisse_beauty

# JWT (đã có)
JWT_SECRET=kuiper-ecommerce-secret-key-2025-secure

# Other
PORT=5000
NODE_ENV=production
```

### **Bước 2: Manual Deploy**

1. Click **"Manual Deploy"** button
2. Chọn branch: `main`
3. Đợi 2-3 phút để deploy

### **Bước 3: Verify Deploy**

**Check Logs:**

```
✅ MongoDB Connected Successfully
✅ Server is running on port 5000
```

**Test API:**

- Health: https://website-product-1.onrender.com/api/health
- Products: https://website-product-1.onrender.com/api/products

## 🧪 TEST EMAIL PRODUCTION

### **Cách 1: Đặt hàng thử trên website**

1. Vào https://eft-company.vercel.app
2. Thêm sản phẩm vào giỏ
3. Checkout với email thật
4. Check email inbox (và spam folder)

### **Cách 2: Check Render Logs**

Sau khi đặt hàng, xem logs trên Render:

```
📧 Email service ready
✅ Order confirmation email sent: <message-id>
📬 Sent to: customer@email.com
```

## ✅ PARTNER LOGOS

Database đã update với URLs working:

- **Shopee**: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/512px-Shopee_logo.svg.png`
- **Lazada**: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Lazada_2023.svg/512px-Lazada_2023.svg.png`
- **Tiki**: `https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png`

Refresh website để thấy logos mới!

## 📊 CHECKLIST

- [x] Email config đã fix trong `emailService.js`
- [x] Test email thành công local
- [x] Partner logos updated trong database
- [x] Code đã push lên GitHub
- [ ] **Environment variables updated trên Render** ← BẠN CẦN LÀM
- [ ] **Manual deploy trên Render** ← BẠN CẦN LÀM
- [ ] Test email production bằng đặt hàng thử
- [ ] Verify partner logos hiển thị

## ⚠️ LƯU Ý

**Email password đang dùng App Password của Gmail:**

- User: `vtu21102000@gmail.com`
- Pass: `jujnhapozgyjaiuw` (16 chars App Password)

**Nếu email vẫn fail trên Render:**

1. Check Render có block outbound port 587 không
2. Thử đổi sang port 465 (SSL)
3. Hoặc dùng SendGrid (free tier)

## 🎯 KẾT QUẢ MONG ĐỢI

Sau khi deploy:

- ✅ Customer nhận email xác nhận đơn hàng
- ✅ Admin nhận thông báo đơn hàng mới
- ✅ 3 logo partner (Shopee, Lazada, Tiki) hiển thị rõ ràng
- ✅ Website load nhanh với lazy loading

---

**Deploy ngay:** https://dashboard.render.com/web/srv-d4ct3mfdiees73c8ltc0
