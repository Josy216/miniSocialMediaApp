# 📱 Mini Social Media - Backend Project

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-F7786B?style=flat)

**Frontend is ready! Build the backend!**

[![Live Demo](https://img.shields.io/badge/Live_Demo-blue?style=flat)](https://jocodeadminme.josephteka.com/)

</div>

## 📖 Overview

Complete React frontend for a social media app. You just need to build the backend with Express + MySQL.

### ✨ Frontend Features Ready:
- ✅ User registration/login with avatar
- ✅ Create posts with images
- ✅ View all posts (public feed)
- ✅ Edit/delete your own posts
- ✅ Modern, responsive design

## 🎯 What You Need to Build

### 1️⃣ Backend Setup
```bash
mkdir backend
cd backend
npm init -y
npm install express mysql2 multer bcryptjs jsonwebtoken cors dotenv
```

### 2️⃣ MySQL Database
```sql
[CREATE DATABASE social_media;

USE social_media;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  caption TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3️⃣ File Upload with Multer
```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const mimetype = allowed.test(file.mimetype);
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Images only!'));
  }
});
```](https://jocodeadminme.josephteka.com/)

### 4️⃣ API Endpoints Needed

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register user |
| POST | `/api/login` | Login user |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/my-posts` | Get user's posts |
| POST | `/api/posts` | Create post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

## 🚀 Quick Start

### Frontend (Already Done):
```bash
git clone <repo>
npm install
npm run dev
# Runs on http://localhost:5173
```

### Backend (Your Job):
1. Create `backend/` folder
2. Install packages above
3. Create `server.js` with Express app
4. Connect to MySQL database
5. Implement authentication (JWT)
6. Add file upload endpoints
7. Create CRUD APIs for posts
8. Serve static files from `uploads/` folder

## 🔧 Tech Stack

**Frontend:** React, CSS, Vite  
**Backend:** Node.js, Express, MySQL, Multer, JWT  
**Storage:** Local file system (upload to `uploads/` folder)

## 📁 Project Structure
```
lent/ (Frontend - ready!)
├── src/
│   ├── components/
│   │   ├── register/  # Login/Register pages
│   │   ├── menu/      # Posts feed
│   │   ├── orders/    # My posts (edit/delete)
│   │   └── addmenu/   # Create post
│   └── App.jsx

backend/ (You create this!)
├── server.js
├── uploads/
├── controllers/
├── routes/
└── .env
```

## 💡 Tips

1. **Start Simple**: Get basic endpoints working first
2. **Test with Postman**: Before connecting frontend
3. **Use Postman**: Test APIs before frontend integration
4. **Check Console**: Frontend shows API errors in browser console
5. **CORS**: Enable CORS in Express (`app.use(cors())`)
6. **Static Files**: Serve uploads: `app.use('/uploads', express.static('uploads'))`

## 🎓 What You'll Learn

- ✅ REST API design
- ✅ MySQL database queries
- ✅ File uploads with Multer
- ✅ JWT authentication
- ✅ Express middleware
- ✅ Error handling
- ✅ Security best practices

## 📞 Need Help?

Check the frontend components - they show what API calls to make!

---

<div align="center">

**Frontend: ✅ Done**  
**Backend: 🔨 Your Turn!**

</div>
