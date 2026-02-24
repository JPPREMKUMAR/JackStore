# 🛒 JackStore – Full Stack MERN E-commerce Platform

## 📌 Project Overview

JackStore is a full-stack MERN e-commerce application featuring separate user and admin panels.  
The platform allows users to browse products, manage carts, and place orders, while administrators can manage products and update order statuses securely.

The system is built using the MERN stack with JWT-based authentication, Cloudinary image storage, and middleware-based route protection.

---

## 🌐 Live Links

👤 **User Panel:** http://jack-store-client.vercel.app/  
🛠 **Admin Panel:** https://jack-store-admin.vercel.app/  

💻 **GitHub Repository:**  
https://github.com/JPPREMKUMAR/JackStore.git

---

## 🛠 Tech Stack

### 🖥 Frontend (User Panel)
- React.js
- React Router DOM
- Context API
- Axios
- React Toastify
- Tailwind CSS
- JavaScript (ES6+)
- Vite

### 🛠 Admin Panel
- React.js
- React Router DOM
- Axios
- React Toastify
- Tailwind CSS
- Vite

### ⚙ Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Multer (file upload handling)
- Cloudinary (cloud image storage)
- CORS
- dotenv
- Validator

### ☁ Deployment & Tools
- Vercel (Frontend + Admin)
- MongoDB Atlas
- Git & GitHub
- Environment Variables

---

## 🚀 Key Features

### 👤 User Features
- User registration & login
- JWT-based authentication
- Product browsing
- Add to cart functionality
- Cart quantity management
- Place order system
- Order history

### 🛠 Admin Features
- Secure admin login
- Add new products
- Upload product images
- List all products
- Delete products
- View all orders
- Update order status
- Protected admin routes

---

## 🔐 Authentication & Security

- Password hashing using bcrypt
- JWT-based authentication
- Middleware-based route protection
- Role-based access control (adminAuth & authUser)
- Secure API endpoints
- Environment variable protection

---

## 🖼 Image Upload System

- Multer middleware for handling multipart/form-data
- Cloudinary for cloud image storage
- Secure image URL storage in MongoDB

---

## 🏗 Architecture

- MVC Pattern
- RESTful API Design
- Separate Client & Admin Applications
- Middleware-based Authorization
- Scalable MongoDB Schema Design

---

## 📂 Project Structure
JackStore/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── client/
├── admin/
└── README.md


---

## ⚙ Installation (Backend)

```bash
git clone https://github.com/JPPREMKUMAR/JackStore.git
cd JackStore
npm install
npm start

## ⚙ Environment Variables

Create a .env file in the backend root:

PORT=
MONGODB_URI=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=


## 📌 Future Improvements

Payment gateway integration (Razorpay / Stripe)

Product filtering & search optimization

Pagination for product listing

Role-based user management

Performance optimization


👨‍💻 Author

Prem Kumar
MERN Stack Developer

🌐 Portfolio: https://jppremkumar.vercel.app/

💻 GitHub: https://github.com/JPPREMKUMAR

🔗 LinkedIn: https://www.linkedin.com/in/jppremkumar/

🧠 LeetCode: https://leetcode.com/u/jppremkumar/