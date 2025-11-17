# 🚀 Hướng dẫn Deploy Frontend lên Vercel

## ✅ Đã hoàn thành tự động

Các file sau đã được tạo/cập nhật:

- ✅ `.env.production` - Production environment variables
- ✅ `vercel.json` - Vercel configuration
- ✅ `src/services/api.js` - Tự động dùng production URL
- ✅ `src/pages/Checkout.js` - Sử dụng api service

## 🔧 Cấu hình trên Vercel Dashboard

### 1. Environment Variables (Nếu cần override)

Vào Vercel Dashboard → Your Project → Settings → Environment Variables

Thêm biến sau (optional - đã có trong vercel.json):

```
REACT_APP_API_URL = https://website-product-1.onrender.com/api
```

### 2. Build Settings

Vercel tự động detect React app, nhưng đảm bảo:

```
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### 3. Deploy

```bash
# Push code lên GitHub
git add .
git commit -m "Configure production settings"
git push origin main
```

Vercel sẽ tự động deploy khi có commit mới.

## 🔄 Cập nhật Backend Render

Vào Render Dashboard → Your Backend Service → Environment

Thêm/Cập nhật biến:

```
FRONTEND_URL=https://website-product-ohic.vercel.app
```

Sau đó click "Manual Deploy" để redeploy với config mới.

## ✅ Checklist

- [x] Frontend code đã cập nhật để dùng production API
- [x] Backend CORS đã thêm frontend URL
- [x] Environment variables đã set
- [x] MongoDB deprecated warnings đã fix
- [ ] Backend redeploy với CORS mới
- [ ] Frontend redeploy trên Vercel
- [ ] Test đặt hàng trên production

## 🧪 Test Production

Sau khi deploy xong:

1. Mở: https://website-product-ohic.vercel.app
2. Test các chức năng:
   - ✅ Xem sản phẩm
   - ✅ Tìm kiếm
   - ✅ Đăng ký/Đăng nhập
   - ✅ Thêm vào giỏ hàng
   - ✅ Đặt hàng
   - ✅ Nhận email xác nhận

## 🐛 Troubleshooting

### CORS Error

- Check backend logs: https://dashboard.render.com
- Đảm bảo FRONTEND_URL đã set đúng
- Redeploy backend

### API Connection Failed

- Check backend status: https://website-product-1.onrender.com/api/health
- Check Network tab trong Chrome DevTools
- Verify REACT_APP_API_URL

### Build Failed

- Check Vercel logs
- Run `npm run build` locally để test
- Check package.json dependencies

## 📊 URLs Chính

- **Frontend**: https://website-product-ohic.vercel.app
- **Backend**: https://website-product-1.onrender.com
- **Backend Health**: https://website-product-1.onrender.com/api/health
- **API Base**: https://website-product-1.onrender.com/api

## 🎉 Hoàn thành!

Website của bạn đã sẵn sàng hoạt động trên production!
