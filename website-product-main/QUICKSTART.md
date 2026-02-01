# Quick Start Guide

## First Time Setup

### 1. Install Dependencies

**Backend:**

```powershell
cd backend
npm install
```

**Frontend:**

```powershell
cd frontend
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running on your system. You can:

- Start MongoDB Compass (GUI)
- Or run MongoDB as a Windows service
- Or start manually: `mongod`

### 3. Configure Email (Optional)

Edit `backend/.env` to add your email credentials for the contact form:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=company-email@example.com
```

**To get Gmail App Password:**

1. Go to your Google Account
2. Security → 2-Step Verification → App passwords
3. Generate a new app password
4. Use that password in EMAIL_PASS

### 4. Start the Application

**Terminal 1 - Backend:**

```powershell
cd backend
npm start
```

Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**

```powershell
cd frontend
npm start
```

Frontend runs on: http://localhost:3000

The website will automatically open in your browser!

## Default Database

The website will work with an empty database. You'll need to add data through API calls or a future admin panel.

## Next Steps

1. **Add Company Information**: Make a PUT request to `/api/company`
2. **Add Categories**: POST to `/api/categories`
3. **Add Products**: POST to `/api/products`
4. **Add Media Slides**: POST to `/api/media/slides`
5. **Add Slogans**: POST to `/api/media/slogans`
6. **Add Support Articles**: POST to `/api/support`

## Testing the Contact Form

1. Navigate to the CONTACT page
2. Fill in the form
3. Submit
4. Check the email inbox configured in `EMAIL_TO`

## Common Commands

### Development Mode (with auto-reload)

```powershell
# Backend
cd backend
npm run dev

# Frontend (always runs in dev mode with npm start)
cd frontend
npm start
```

### Build for Production

```powershell
cd frontend
npm run build
```

## File Uploads

Uploaded files are stored in `backend/uploads/` directory. Make sure this folder exists and has write permissions.

## Troubleshooting

**Port 5000 already in use:**

- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update REACT_APP_API_URL in `frontend/.env` accordingly

**MongoDB connection error:**

- Ensure MongoDB is running
- Check MONGODB_URI in `backend/.env`

**Module not found errors:**

- Run `npm install` in the respective folder

**CORS errors:**

- Backend already has CORS enabled for all origins
- Make sure backend is running before frontend

## Project Structure Quick Reference

```
backend/
├── models/        → Database schemas
├── controllers/   → Business logic
├── routes/        → API endpoints
├── config/        → Configuration files
└── uploads/       → Uploaded files

frontend/
├── src/
│   ├── components/  → Reusable components (Header, Footer)
│   ├── pages/       → Page components (Home, Products, etc.)
│   ├── services/    → API service (api.js)
│   └── styles/      → CSS files
```

## Need Help?

Check the main README.md for detailed documentation including:

- Complete API endpoints
- Database schema
- Security considerations
- Production deployment tips
