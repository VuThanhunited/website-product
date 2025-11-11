# E-Commerce Website

A full-stack e-commerce website built with React.js (frontend), Node.js/Express (backend), and MongoDB (database).

## Features

### Main Tabs

- **HOME**: Landing page with company info, media slideshow, and slogans
- **COMPANY**: Company introduction with media and text content
- **PRODUCT**: Product catalog with category filtering and grid/list view
- **SUPPORT**: Support articles with file attachments and media
- **CONTACT**: Contact form with email notifications

### Key Features

- Responsive design for mobile, tablet, and desktop
- Product catalog with category filtering
- Grid and list view for products
- Media slideshow on homepage
- Support articles with file attachments
- Contact form with email notifications
- Social media integration (Zalo, YouTube, Instagram, WhatsApp)
- Partner logos display

## Tech Stack

### Frontend

- React.js 18
- React Router DOM (routing)
- Axios (API calls)
- React Slick (carousel)
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Multer (file uploads)
- Nodemailer (email)
- CORS

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4 or higher)
- npm or yarn package manager

## Installation

### 1. Clone or Download the Project

```bash
cd "e:\Work Freelancer\Web bán hàng"
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit the .env file with your settings:
# - PORT=5000
# - MONGODB_URI=mongodb://localhost:27017/ecommerce
# - EMAIL_USER=your-email@gmail.com
# - EMAIL_PASS=your-app-password
# - EMAIL_TO=company-email@example.com

# Start MongoDB (if not running as service)
# Windows: Open MongoDB Compass or start mongod service
# Or run: mongod

# Start the backend server
npm start

# For development with auto-restart:
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will run on `http://localhost:3000`

## Configuration

### Backend Environment Variables (.env)

Create or edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=company-email@example.com
```

### Email Configuration

For Gmail:

1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `EMAIL_PASS`

### Frontend Configuration

The frontend is configured to connect to `http://localhost:5000/api` by default. To change this, edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Structure

```
├── backend/
│   ├── config/
│   │   └── upload.js          # File upload configuration
│   ├── controllers/           # Business logic
│   │   ├── categoryController.js
│   │   ├── companyController.js
│   │   ├── contactController.js
│   │   ├── mediaController.js
│   │   ├── productController.js
│   │   └── supportController.js
│   ├── models/               # MongoDB schemas
│   │   ├── Category.js
│   │   ├── CompanyInfo.js
│   │   ├── ContactMessage.js
│   │   ├── MediaSlide.js
│   │   ├── Product.js
│   │   ├── Slogan.js
│   │   └── SupportArticle.js
│   ├── routes/              # API routes
│   │   ├── categoryRoutes.js
│   │   ├── companyRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── mediaRoutes.js
│   │   ├── productRoutes.js
│   │   └── supportRoutes.js
│   ├── uploads/            # Uploaded files
│   ├── .env                # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js           # Main server file
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Footer.js
│   │   │   └── Header.js
│   │   ├── pages/         # Page components
│   │   │   ├── Company.js
│   │   │   ├── Contact.js
│   │   │   ├── Home.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Products.js
│   │   │   ├── Support.js
│   │   │   └── SupportDetail.js
│   │   ├── services/      # API service
│   │   │   └── api.js
│   │   ├── styles/        # CSS files
│   │   │   ├── App.css
│   │   │   ├── Company.css
│   │   │   ├── Contact.css
│   │   │   ├── Footer.css
│   │   │   ├── Header.css
│   │   │   ├── Home.css
│   │   │   ├── ProductDetail.css
│   │   │   ├── Products.css
│   │   │   ├── Support.css
│   │   │   ├── SupportDetail.css
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
```

## API Endpoints

### Products

- `GET /api/products` - Get all products (with optional category filter)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:slug` - Get product by slug
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Support

- `GET /api/support` - Get all support articles
- `GET /api/support/:slug` - Get article by slug
- `POST /api/support` - Create article
- `PUT /api/support/:id` - Update article
- `DELETE /api/support/:id` - Delete article

### Company

- `GET /api/company` - Get company info
- `PUT /api/company` - Update company info

### Media

- `GET /api/media/slides` - Get media slides
- `POST /api/media/slides` - Create slide
- `PUT /api/media/slides/:id` - Update slide
- `DELETE /api/media/slides/:id` - Delete slide
- `GET /api/media/slogans` - Get slogans
- `POST /api/media/slogans` - Create slogan
- `PUT /api/media/slogans/:id` - Update slogan
- `DELETE /api/media/slogans/:id` - Delete slogan

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `PUT /api/contact/:id/read` - Mark as read
- `DELETE /api/contact/:id` - Delete message

## Usage

### Running the Application

1. **Start MongoDB** (if not running as a service)
2. **Start Backend Server**:
   ```bash
   cd backend
   npm start
   ```
3. **Start Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```
4. **Access the application** at `http://localhost:3000`

### Building for Production

Frontend:

```bash
cd frontend
npm run build
```

The build folder will contain optimized production files.

## Development

### Adding New Features

1. **Backend**: Add models, controllers, and routes in respective folders
2. **Frontend**: Add components in `src/components` or pages in `src/pages`
3. **Styling**: Add corresponding CSS files in `src/styles`

### Database Schema

The MongoDB database includes these collections:

- `categories` - Product categories
- `products` - Products with images, videos, and options
- `supportarticles` - Support articles with attachments
- `companyinfos` - Company information
- `mediaslides` - Homepage slideshow
- `slogans` - Homepage slogans
- `contactmessages` - Contact form submissions

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check the `MONGODB_URI` in `.env`
- Verify MongoDB service is started

### Port Already in Use

- Change `PORT` in `backend/.env`
- Kill the process using the port

### Email Not Sending

- Verify Gmail credentials
- Use App Password instead of regular password
- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`

### CORS Issues

- Backend CORS is enabled for all origins
- For production, restrict CORS to specific domains

## Security Notes

For production deployment:

1. Use environment variables for sensitive data
2. Implement authentication/authorization
3. Add input validation and sanitization
4. Use HTTPS
5. Restrict CORS to specific domains
6. Add rate limiting
7. Implement proper error handling

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
