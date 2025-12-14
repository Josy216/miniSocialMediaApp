# 🎯 Mini Social Media - Backend Development Project

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6F61?style=for-the-badge&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

**A complete frontend demo for backend-focused social media development**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Click_Here-blue?style=for-the-badge&logo=vercel)](https://josephteka.com/detail)

</div>

## 📋 Table of Contents
- [🚀 Overview](#-overview)
- [🎯 Learning Objectives](#-learning-objectives)
- [🏗️ Project Structure](#️-project-structure)
- [📁 File Tree](#-file-tree)
- [🔧 Backend Challenges](#-backend-challenges)
- [📚 Setup Instructions](#-setup-instructions)
- [🔥 Features to Implement](#-features-to-implement)
- [🔐 Security Considerations](#-security-considerations)
- [📈 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)

## 🚀 Overview

This is a **fully functional frontend** for a mini social media application designed to help students focus on **backend development**. The frontend is complete and production-ready - students only need to build the backend API!

### 🎓 Purpose
- **For Students**: Focus on backend without UI struggles
- **For Teachers**: Clear grading criteria and expectations
- **For Employers**: Demonstrates full-stack understanding

### ✨ Demo Features
- ✅ **Complete UI/UX** - Modern, responsive design
- ✅ **User Authentication** - Register/Login flows
- ✅ **Posts Feed** - Public viewing without login
- ✅ **Create Posts** - Image upload with preview
- ✅ **Edit/Delete** - User-specific post management
- ✅ **Profile Management** - Update user information
- ✅ **Error Handling** - Beautiful error states
- ✅ **Loading States** - Smooth user experience

## 🎯 Learning Objectives

By completing this project, students will master:

### 🛠️ Core Backend Skills
| Skill | Description | Tools |
|-------|-------------|-------|
| **File Upload** | Handle image uploads securely | Multer, Express |
| **Authentication** | User auth with sessions/tokens | JWT, Bcrypt |
| **Database Design** | Schema design and relationships | PostgreSQL, Sequelize |
| **RESTful APIs** | Design clean, consistent APIs | Express.js |
| **Error Handling** | Graceful error responses | Express middleware |
| **Security** | Protect against common vulnerabilities | Helmet, CORS |

### 📚 Advanced Topics (Bonus)
- Image compression and optimization
- Pagination and infinite scroll
- Real-time notifications
- Search functionality
- Rate limiting and caching

## 🏗️ Project Structurelent/
├── 📁 public/ # Static assets
│ └── vite.svg
├── 📁 src/ # Source code
│ ├── 📁 assets/ # Images and icons
│ ├── 📁 components/ # React components
│ │ ├── 📁 addmenu/ # Post creation
│ │ ├── 📁 admin/ # Admin panels
│ │ ├── 📁 header/ # Navigation header
│ │ ├── 📁 hero/ # Landing page
│ │ ├── 📁 menu/ # Posts feed
│ │ ├── 📁 orders/ # User posts management
│ │ ├── 📁 register/ # Auth components
│ │ └── 📁 userAdmin/ # User management
│ ├── 📁 pages/ # Page components
│ ├── 📁 upload/ # File upload components
│ ├── App.jsx # Main app component
│ ├── Protected.jsx # Route protection
│ └── main.jsx # Entry point
├── package.json # Dependencies
└── vite.config.js # Build configuration

text

## 📁 Detailed File Tree

<details>
<summary><b>📂 Click to expand full file tree</b></summary>
lent/
├── public/
│ └── vite.svg
├── src/
│ ├── assets/
│ │ └── react.svg
│ ├── components/
│ │ ├── addmenu/
│ │ │ ├── Admenu.jsx
│ │ │ ├── Editmenu.jsx
│ │ │ └── admenu.css
│ │ ├── admin/
│ │ │ ├── Admin.jsx
│ │ │ ├── Randomadmin.jsx
│ │ │ └── admin.css
│ │ ├── header/
│ │ │ ├── Header.jsx
│ │ │ └── header.css
│ │ ├── hero/
│ │ │ ├── Hero.jsx
│ │ │ └── hero.css
│ │ ├── menu/
│ │ │ ├── Menu.jsx
│ │ │ ├── MenuDetails.jsx
│ │ │ ├── menu.css
│ │ │ └── menudetails.css
│ │ ├── orders/
│ │ │ ├── Order.jsx
│ │ │ └── order.css
│ │ ├── register/
│ │ │ ├── EditUser.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ └── register.css
│ │ └── userAdmin/
│ │ ├── UsersAdmin.jsx
│ │ └── useradmin.css
│ ├── pages/
│ │ └── menu.jsx
│ ├── upload/
│ │ ├── Getupload.jsx
│ │ └── Upload.jsx
│ ├── App.jsx
│ ├── Protected.jsx
│ ├── index.css
│ └── main.jsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js

text

</details>

## 🔧 Backend Challenges

### Challenge 1: Multer File Upload Implementation

```javascript
// Expected in backend: server.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});
Challenge 2: Database Schema Design
sql
-- PostgreSQL Schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  caption TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Challenge 3: Authentication with JWT
javascript
// Backend authentication middleware
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token required' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};
📚 Setup Instructions
Frontend Setup (Already Complete)
bash
# Clone the repository
git clone <repository-url>
cd lent

# Install dependencies
npm install

# Start development server
npm run dev

# The frontend will run on http://localhost:5173
Backend Setup (Student's Task)
bash
# Create backend directory
mkdir backend
cd backend

# Initialize Node.js project
npm init -y

# Install required packages
npm install express multer pg bcryptjs jsonwebtoken cors dotenv helmet

# Install dev dependencies
npm install -D nodemon
Environment Variables
Create .env file in backend:

env
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL=postgresql://username:password@localhost:5432/social_media_db
UPLOAD_DIR=./uploads
🔥 Features to Implement
Priority 1 (Required)
User Registration with avatar upload

User Login with JWT tokens

Create new posts with images

Get all posts (public feed)

Get user's own posts

Edit user's own posts

Delete user's own posts

Serve uploaded images statically

Priority 2 (Recommended)
User profile update

Password reset functionality

Input validation and sanitization

Error handling middleware

Rate limiting for API endpoints

Image compression on upload

Priority 3 (Bonus)
Google OAuth with Supabase

Post likes/comments system

Real-time notifications

Pagination for posts feed

Search functionality

Admin panel for user management

🔐 Security Considerations
File Upload Security
javascript
// Always validate on server-side
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

// Prevent:
// - Executable files
// - Files with double extensions
// - Files larger than limit
// - Too many uploads from one user
Database Security
Use parameterized queries to prevent SQL injection

Hash passwords with bcrypt (never store plain text)

Use environment variables for secrets

Implement proper CORS policies

Use HTTPS in production

📈 API Endpoints
Authentication
Method	Endpoint	Description	Protected
POST	/api/auth/register	Register new user	No
POST	/api/auth/login	Login user	No
GET	/api/auth/me	Get current user	Yes
Posts
Method	Endpoint	Description	Protected
GET	/api/posts	Get all posts	No
GET	/api/posts/my-posts	Get user's posts	Yes
POST	/api/posts	Create new post	Yes
PUT	/api/posts/:id	Update post	Yes
DELETE	/api/posts/:id	Delete post	Yes
Users
Method	Endpoint	Description	Protected
GET	/api/users/:id	Get user profile	Yes
PUT	/api/users/:id	Update profile	Yes
🤝 Contributing
This project is designed for educational purposes. To contribute:

Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

🏆 Student Contributions Welcome!
Add backend implementation examples

Improve documentation

Add more frontend features

Create tutorial videos

Share deployment guides
