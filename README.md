# 🛍️ Full-Stack MERN E-Commerce Platform

A **production-grade, full-stack E-commerce application** built with the **MERN stack**, featuring a modern customer storefront, a powerful admin dashboard, and a secure, scalable backend with multiple payment gateway integrations.

This project is designed to reflect **real-world architecture**, **industry best practices**, and **enterprise-level features**.

---

## 🌟 Project Overview

This platform provides:

- 🧑‍💻 **Customer-facing storefront** for browsing, cart, checkout & payments
- 🛠️ **Admin dashboard** for product, order & user management
- 🔐 **Secure backend API** with authentication & authorization
- 💳 **Multiple payment gateways** (Stripe, Razorpay, SSLCommerz)
- ☁️ **Cloud-based image storage**
- 📦 **Scalable & modular architecture**

Built to be:

- Clean
- Maintainable
- Expandable
- Deployment-ready

---

## 🎯 Vision & Goal

### Vision

To build a **realistic, production-ready E-commerce system** that mirrors how modern online stores operate — technically and functionally.

### Goals

- Implement **real payment workflows**
- Maintain **clean separation of concerns**
- Follow **industry folder & API structure**
- Create a **portfolio-grade project**
- Ensure **easy future scaling**

---

## 🧠 What’s Implemented (High Level)

### ✔️ Core Features

- User authentication & authorization (JWT)
- Product CRUD with image uploads
- Cart & checkout system
- Order lifecycle management
- Admin-only protected routes
- Secure API middleware
- Environment-based configuration
- Multiple payment gateways
- Cloudinary media storage

---

## 🏗️ Project Architecture

mern-ecommerce/
├── client/ # Customer-facing frontend (React + Tailwind)
├── admin/ # Admin dashboard (React + Tailwind)
├── server/ # Backend API (Node.js + Express)
├── .gitignore
└── README.md

Each part is **independently scalable** and deployable.

---

## ⚙️ Tech Stack (Complete)

### 🖥️ Frontend (Client)

- React 19
- Vite
- Tailwind CSS v4
- React Router v7
- Axios
- Framer Motion
- Swiper
- React Toastify
- Lucide & React Icons

---

### 🛠️ Admin Panel

- React 19
- Vite
- Tailwind CSS v4
- React Router
- Axios
- React Toastify

---

### 🔙 Backend (Server)

| Category      | Technology                   |
| ------------- | ---------------------------- |
| Runtime       | Node.js                      |
| Framework     | Express 5                    |
| Database      | MongoDB + Mongoose           |
| Auth          | JWT + Bcrypt                 |
| Uploads       | Multer                       |
| Media Storage | Cloudinary                   |
| Payments      | Stripe, Razorpay, SSLCommerz |
| Validation    | Validator                    |
| Env Config    | dotenv                       |
| Dev Tools     | Nodemon                      |

---

## 💳 Payment Gateways Implemented

### ✅ Stripe

- Card payments
- Secure checkout flow
- Payment verification

### ✅ Razorpay

- Order-based payment creation
- Payment signature verification

### ✅ SSLCommerz

- Sandbox & live mode support
- Bangladeshi payment options
- Redirect-based payment flow
- Success / Fail / Cancel handling

> Payment logic is abstracted for easy extension.

---

## 🔐 Authentication & Security

- JWT-based authentication
- Protected API routes
- Admin-only middleware
- Password hashing with bcrypt
- Secure environment variables
- Token-based frontend communication

---

## 📦 Product & Order System

### Product System

- Add / Edit / Delete products
- Category-based organization
- Image upload via Cloudinary
- Price & stock management

### Order System

- Order creation after checkout
- Payment status tracking
- Admin order updates
- User order history

---

## ☁️ Image Handling

- Image uploads handled with **Multer**
- Stored securely in **Cloudinary**
- Optimized for performance
- Clean URL-based access

---

## 🌍 Environment Variables

Each folder has its own `.env` file.

### 🔙 Backend (`server/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

STRIPE_SECRET_KEY=xxxx
RAZORPAY_KEY_ID=xxxx
RAZORPAY_KEY_SECRET=xxxx

SSL_STORE_ID=xxxx
SSL_STORE_PASSWORD=xxxx
SSL_IS_LIVE=false

🖥️ Client / Admin
VITE_BACKEND_URL=http://localhost:5000

=========================================
▶️ How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce

2️⃣ Backend Setup
cd server
npm install
npm run server

Runs on:
http://localhost:5000

3️⃣ Client Setup
cd client
npm install
npm run dev

4️⃣ Admin Setup
cd admin
npm install
npm run dev

🚀 Deployment Ready

This project can be deployed using:

Frontend: Vercel / Netlify

Backend: Render / Railway / VPS

Database: MongoDB Atlas

Media: Cloudinary

Environment-based configs ensure smooth deployment.

🧪 Development Best Practices

Modular code structure

Reusable components

Clean API separation

Centralized error handling

Scalable payment logic

Production-ready standards

📌 Future Enhancements

Wishlist system

Product reviews & ratings

Coupons & discounts

Email notifications

Admin analytics dashboard

Role-based access control

Multi-vendor support

👨‍💻 Author

Naimul Islam Omit
🎓 BSc in Computer Science & Engineering
💼 Full-Stack MERN Developer
🌐 Portfolio: https://nio420.github.io/Portfolio

🐙 GitHub: https://github.com/nio420

⭐ Final Note

This project is built with learning, scalability, and professionalism in mind.
If you find it useful or inspiring, consider giving it a ⭐ on GitHub.
```
