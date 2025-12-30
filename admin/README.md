# 🛠️ Admin Panel — E-commerce Dashboard

This is the **Admin Dashboard** of a full-stack MERN E-commerce application.  
It is designed for **store owners and administrators** to manage products, orders, and platform content efficiently through a clean and responsive interface.

> ⚠️ This README covers **admin-side features only**. Backend implementation details are intentionally excluded.

---

## 🚀 Tech Stack

- **React 19** — Modern component-based UI
- **Vite** — Fast build & development environment
- **Tailwind CSS v4** — Clean, utility-first styling
- **React Router v7** — Admin route management
- **Axios** — API communication
- **React Toastify** — Action feedback & alerts

---

## 🎯 Admin Capabilities

### 📦 Product Management
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 🖼️ Upload product images
- 🏷️ Manage categories & pricing

---

### 📑 Order Management
- 📋 View all customer orders
- 🔍 Check order details
- 🔄 Update order status (Pending / Paid / Shipped / Delivered)
- 💳 Monitor payment status

---

### 👤 User Oversight
- 👀 View registered users
- 📊 Track user order activity
- 🛡️ Secure access for admins only

---

### 📊 Dashboard Experience
- ⚡ Fast-loading admin pages
- 📱 Fully responsive (desktop & tablet friendly)
- 🎨 Minimal, distraction-free UI
- 🔔 Toast notifications for actions

---

## 📂 Project Structure

admin/
├── src/
│ ├── components/ # Admin UI components
│ ├── pages/ # Dashboard pages
│ ├── routes/ # Protected admin routes
│ ├── assets/ # Icons & static files
│ └── main.jsx # Admin entry point
├── public/
├── index.html
└── package.json

# Install dependencies
npm install

# Start admin dashboard
npm run dev
http://localhost:5174
