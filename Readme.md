# 🚚 ExcelTrack – Courier Management System

**ExcelTrack** is a full-stack parcel management and courier tracking system supporting real-time location updates, agent assignment, delivery status updates, PDF exports, and a powerful admin dashboard.

---

## 🎯 Objective

To build a complete courier and parcel management system where:

- Customers can book parcels and track deliveries.
- Delivery agents can view assigned parcels and update status in real-time.
- Admins can manage users, assign agents, and generate reports.

---

## 🔗 Live Links

| Service          | URL                                                                  |
| ---------------- | -------------------------------------------------------------------- |
| 🖥 Frontend       | [http://203.190.9.175:5173](http://203.190.9.175:5173)               |
| 🛠 Backend API    | [http://203.190.9.175:5000](http://203.190.9.175:5000)               |
| 📦 Mongo Express | [http://203.190.9.175:8081](http://203.190.9.175:8081)               |
| 🎥 Demo Video    | [Google Drive](https://drive.google.com/file/d/1Krw_94OAfhlskMr2nqY) |
| 📁 GitHub Repo   | [Excel-demo](https://github.com/mdarifahammedreza/Excel-demo)        |

---

## 👥 User Roles & Features

| Role         | Features                                                      |
| ------------ | ------------------------------------------------------------- |
| **Customer** | Register, Login, Book Parcels, Track Status                   |
| **Agent**    | View Assigned Parcels, Update Status, Optimized Route         |
| **Admin**    | Dashboard Access, Assign Agents, Export Reports, Manage Users |

---

## 🧩 Project Structure

### 🔹 Frontend – `excel-front`

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Forms & State:** React Hook Form, TanStack Query, Zod
- **Real-time:** Socket.IO Client
- **Maps & Pagination:** React Leaflet, React Paginate
- **Notifications:** React Hot Toast

### 🔹 Backend – `courier-backend`

- **Framework:** Express.js (Node.js)
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (Admin, Customer, Agent roles)
- **Real-time:** Socket.IO
- **Validation:** Zod
- **PDF/CSV Reporting:** PDFKit, json2csv
- **Session/Cache:** Redis
- **Docs:** Swagger + YAML

---

## 🚀 Deployment Info

- **API Base URL:** `http://203.190.9.175:5000/api`

---

## 📁 API Endpoints Overview

### 🔐 Auth

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/auth/register` | Register as a Customer |
| POST   | `/auth/login`    | Login (All roles)      |

### 👤 Users (Admin Only)

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/users`     | Get all users    |
| PATCH  | `/users/:id` | Update user role |
| DELETE | `/users/:id` | Delete user      |

### 📦 Parcels

| Method | Endpoint                           | Description                    |
| ------ | ---------------------------------- | ------------------------------ |
| POST   | `/parcels`                         | Book parcel (Customer)         |
| GET    | `/parcels`                         | Get parcels (Role-based)       |
| PATCH  | `/parcels/:id`                     | Update parcel status           |
| PATCH  | `/parcels/assign-agent/:id`        | Assign agent (Admin)           |
| PATCH  | `/parcels/update-location/:id`     | Agent updates current location |
| GET    | `/parcels/track/:trackingCode`     | Track parcel by tracking code  |
| GET    | `/parcels/optimize-route-with-geo` | Route optimization for agents  |
| DELETE | `/parcels/:id`                     | Delete parcel (Admin)          |

### 📊 Reports

| Method | Endpoint                     | Description               |
| ------ | ---------------------------- | ------------------------- |
| GET    | `/reports/dashboard-metrics` | Get dashboard metrics     |
| GET    | `/reports/export`            | Export PDF report (Admin) |

---

## 🧪 API Testing Guide

### ✅ Authentication Flow

1. Register (Customer) via `/auth/register`
2. Login (Any role) via `/auth/login`
3. For protected routes, add this header:

```http
Authorization: Bearer <your_token>
```

---

## 🔑 Role Access Matrix

| Feature                | Customer | Agent | Admin |
| ---------------------- | -------- | ----- | ----- |
| Register/Login         | ✅       | ✅    | ✅    |
| View Parcels           | ✅ (own) | ✅    | ✅    |
| Book Parcels           | ✅       | ❌    | ✅    |
| Assign Agent           | ❌       | ❌    | ✅    |
| Update Parcel Location | ❌       | ✅    | ❌    |
| Export PDF Report      | ❌       | ❌    | ✅    |
| User Management        | ❌       | ❌    | ✅    |

---

## 📮 Postman Collection

### 📥 Import Instructions

- Download: `ExcelTrack-API-Postman-Collection.json`
- Open Postman → Import → Choose JSON file

### 🌐 Optional: Set Environment Variable

| Key      | Value                                                          |
| -------- | -------------------------------------------------------------- |
| base_url | [http://203.190.9.175:5000/api](http://203.190.9.175:5000/api) |

Use `{{base_url}}` in all requests.

---

## ⚙️ Tech Stack Summary

| Layer      | Tools / Libraries                                      |
| ---------- | ------------------------------------------------------ |
| Frontend   | React, Tailwind, React Query, Hook Form, Zod           |
| Backend    | Express.js, MongoDB, Redis, JWT                        |
| Real-Time  | Socket.IO                                              |
| Reporting  | PDFKit, json2csv                                       |
| Dev Tools  | Postman, Swagger, Mongo Express, Nodemon               |
| Deployment | Node.js, Vite, Docker (optional), EC2 (manual hosting) |

---

## 📦 Common Scripts

### 🔧 Frontend

```bash
# Start dev server
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Preview built app
npm run preview
```

### 🔧 Backend

```bash
# Development (with nodemon)
npx nodemon src/index.js

# Or
npm start
```

---

## ⚠️ Important Notes

- 📄 PDF export is **Admin-only**
- 🧭 Real-time tracking + route optimization uses **Leaflet + Geo-coordinates**
- 🔁 Real-time updates are powered by **Socket.IO**
- ✅ All forms are **Zod** validated
- ❌ Real-time location & Socket.IO cannot be tested via Postman

---

## 👨‍💻 Author

**Md Arif Ahammed Reza**
📧 Email: [mdarifahammedreza@gmail.com](mailto:mdarifahammedreza@gmail.com)

---

## 📜 License

This project is licensed for educational and personal use.
