# Complete Setup Instructions

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js installed (v14 or higher) - [Download](https://nodejs.org/)
- [ ] MongoDB installed and running - [Download](https://www.mongodb.com/try/download/community)
- [ ] Code editor (VS Code recommended) - [Download](https://code.visualstudio.com/)
- [ ] Git (optional) - [Download](https://git-scm.com/)

## 🚀 Step-by-Step Setup

### Step 1: Verify Prerequisites

Open PowerShell and verify installations:

```powershell
node --version    # Should show v14 or higher
npm --version     # Should show npm version
```

### Step 2: Install Backend Dependencies

```powershell
cd "e:\Work Freelancer\Web bán hàng\backend"
npm install
```

**Expected output:** Installation of all backend packages (express, mongoose, etc.)

### Step 3: Install Frontend Dependencies

```powershell
cd "e:\Work Freelancer\Web bán hàng\frontend"
npm install
```

**Expected output:** Installation of all frontend packages (react, axios, etc.)

### Step 4: Start MongoDB

**Option A - MongoDB Compass (Recommended for beginners):**

1. Open MongoDB Compass application
2. Connect to `mongodb://localhost:27017`

**Option B - Command Line:**

```powershell
mongod
```

**Option C - Windows Service (if installed as service):**

- MongoDB starts automatically

### Step 5: Seed Sample Data (Optional but Recommended)

This will populate your database with sample products, categories, and content:

```powershell
cd "e:\Work Freelancer\Web bán hàng\backend"
npm run seed
```

**Expected output:**

```
MongoDB Connected
Cleared existing data
Created company info
Created categories
Created products
Created media slides
Created slogans
Created support articles
✅ Sample data seeded successfully!
```

### Step 6: Configure Email (Optional)

Edit `backend\.env` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=company-email@example.com
```

**To get Gmail App Password:**

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to https://myaccount.google.com/apppasswords
4. Create an app password for "Mail"
5. Copy the 16-character password
6. Paste it in `EMAIL_PASS`

### Step 7: Start Backend Server

Open a PowerShell terminal:

```powershell
cd "e:\Work Freelancer\Web bán hàng\backend"
npm start
```

**Expected output:**

```
Server is running on port 5000
MongoDB Connected Successfully
```

**✅ Backend is ready!** - http://localhost:5000

### Step 8: Start Frontend Server

Open a **NEW** PowerShell terminal (keep backend running):

```powershell
cd "e:\Work Freelancer\Web bán hàng\frontend"
npm start
```

**Expected output:**

```
Compiled successfully!
You can now view ecommerce-frontend in the browser.
  Local:            http://localhost:3000
```

**✅ Website is ready!** - Your browser should automatically open http://localhost:3000

## 🎉 Success! Your Website is Running

You should now see:

- **HOME** page with slideshow and slogans
- **COMPANY** tab for company information
- **PRODUCT** tab with sample products
- **SUPPORT** tab with help articles
- **CONTACT** tab with a contact form

## 📝 Next Steps

### 1. Explore the Website

- Browse through all 5 tabs
- Click on products to see details
- Try the grid/list view toggle
- Test the contact form

### 2. Customize Company Information

The sample data includes placeholder information. You can:

- Update company name, address, phone
- Add company logo
- Add social media links
- Add partner logos

### 3. Add Your Own Products

- Create categories for your products
- Add product images (currently using placeholders)
- Set prices and product options
- Manage inventory

### 4. Customize Design

All CSS files are in `frontend\src\styles\`:

- Modify colors in CSS files
- Change layouts
- Update fonts
- Adjust spacing

## 🔧 Development Workflow

### For Backend Development:

```powershell
cd backend
npm run dev    # Auto-restarts on file changes
```

### For Frontend Development:

```powershell
cd frontend
npm start      # Already has hot reload
```

### View API Endpoints:

Open http://localhost:5000 in browser to see API info

## 📁 Important Files

### Configuration Files:

- `backend\.env` - Backend environment variables
- `frontend\.env` - Frontend API URL
- `backend\server.js` - Main server file
- `frontend\src\App.js` - Main React component

### Database Models (MongoDB Schema):

- `backend\models\Category.js`
- `backend\models\Product.js`
- `backend\models\CompanyInfo.js`
- `backend\models\SupportArticle.js`
- `backend\models\MediaSlide.js`
- `backend\models\Slogan.js`
- `backend\models\ContactMessage.js`

## ⚠️ Troubleshooting

### Problem: Port 5000 already in use

**Solution:** Edit `backend\.env`:

```env
PORT=5001
```

Then edit `frontend\.env`:

```env
REACT_APP_API_URL=http://localhost:5001/api
```

### Problem: MongoDB connection error

**Solutions:**

1. Check if MongoDB is running
2. Open MongoDB Compass and verify connection
3. Check `MONGODB_URI` in `backend\.env`

### Problem: "Module not found" errors

**Solution:**

```powershell
# In the folder with the error:
rm -r node_modules
rm package-lock.json
npm install
```

### Problem: Frontend won't connect to backend

**Solutions:**

1. Make sure backend is running first
2. Check backend console for errors
3. Verify URL in `frontend\.env`
4. Clear browser cache (Ctrl+Shift+Delete)

### Problem: Contact form not sending emails

**Solutions:**

1. Check email configuration in `backend\.env`
2. Use Gmail App Password (not regular password)
3. Check backend console for error messages
4. Test with a different email provider

### Problem: Images not displaying

**Causes:**

1. Using placeholder images (expected with sample data)
2. Upload real images through file upload
3. Or update image URLs in database

## 📚 Learning Resources

### Backend (Node.js/Express):

- Express.js documentation: https://expressjs.com/
- Mongoose documentation: https://mongoosejs.com/

### Frontend (React):

- React documentation: https://react.dev/
- React Router: https://reactrouter.com/

### Database (MongoDB):

- MongoDB documentation: https://docs.mongodb.com/

## 🎯 Production Deployment

Before deploying to production:

1. **Security:**

   - Add authentication/authorization
   - Implement input validation
   - Use HTTPS
   - Restrict CORS
   - Add rate limiting

2. **Environment:**

   - Use production MongoDB (MongoDB Atlas)
   - Set NODE_ENV=production
   - Use production build of React

3. **Build Frontend:**

   ```powershell
   cd frontend
   npm run build
   ```

4. **Deploy:**
   - Backend: Deploy to Heroku, DigitalOcean, AWS, etc.
   - Frontend: Deploy to Netlify, Vercel, or serve from backend
   - Database: MongoDB Atlas (cloud)

## ✅ Final Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected successfully
- [ ] Website opens in browser
- [ ] Can navigate between all tabs
- [ ] Products are displaying
- [ ] Contact form works (if email configured)
- [ ] Sample data is loaded

## 🆘 Need Help?

If you encounter any issues:

1. Check the console output for error messages
2. Review the troubleshooting section above
3. Consult the main README.md for detailed documentation
4. Check MongoDB connection status
5. Verify all environment variables are set correctly

## 📞 Support

For additional assistance, refer to:

- `README.md` - Complete documentation
- `QUICKSTART.md` - Quick reference guide
- Backend console output for error details
- Browser console (F12) for frontend errors

---

**Congratulations!** 🎊 Your e-commerce website is now set up and running!
