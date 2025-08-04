# 🚚 ExcelTrack – Courier Management System

ExcelTrack is a full-stack courier parcel management system that supports real-time tracking, agent assignment, status updates, PDF exports, and role-based dashboards.

---

## 🧩 Project Structure

### 🖥 Frontend – `excel-front`

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State & Forms**: React Hook Form, TanStack Query, Zod
- **Map & Pagination**: React Leaflet, React Paginate
- **Notifications**: React Hot Toast
- **Real-Time Updates**: Socket.IO client

### 🖥 Backend – `courier-backend`

- **Framework**: Express.js (Node.js)
- **Database**: MongoDB (with Mongoose)
- **Auth**: JWT-based (role: admin, customer, agent)
- **Real-Time**: Socket.IO
- **PDF & CSV Reports**: PDFKit, json2csv
- **Validation**: Zod
- **API Docs**: Swagger + YAML
- **Cache/Session**: Redis

---

## 🚀 Deployment

- **API Base URL**: `http://203.190.9.175:5000/api`

---

## 📁 API Endpoints

### 🔐 Auth

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/auth/register` | Customer registration |
| POST   | `/auth/login`    | Login (any role)      |

---

### 👤 Users (Admin only)

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| GET    | `/users`     | Get all users    |
| PATCH  | `/users/:id` | Update user role |
| DELETE | `/users/:id` | Delete user      |

---

### 📦 Parcels

| Method | Endpoint                           | Description                      |
| ------ | ---------------------------------- | -------------------------------- |
| POST   | `/parcels`                         | Book parcel (Customer only)      |
| GET    | `/parcels`                         | Get parcels (role-based)         |
| PATCH  | `/parcels/:id`                     | Update parcel status             |
| PATCH  | `/parcels/assign-agent/:id`        | Assign agent                     |
| PATCH  | `/parcels/update-location/:id`     | Agent updates current location   |
| GET    | `/parcels/track/:trackingCode`     | Track parcel by code             |
| GET    | `/parcels/optimize-route-with-geo` | Get optimized route (Agent only) |
| DELETE | `/parcels/:id`                     | Delete parcel (Admin only)       |

---

### 📊 Reports

| Method | Endpoint                     | Description                        |
| ------ | ---------------------------- | ---------------------------------- |
| GET    | `/reports/dashboard-metrics` | Dashboard metrics                  |
| GET    | `/reports/export`            | Export parcels as PDF (Admin only) |

---

## 🧪 API Testing Guide

### ✅ Authentication

1. Register as a `customer` using `/auth/register`
2. Login using `/auth/login`
3. For protected routes, set the header:

```
Authorization: Bearer <your_token_here>
```

---

## 🔑 Role Access Matrix

| Feature Area     | Customer | Agent         | Admin    |
| ---------------- | -------- | ------------- | -------- |
| Register/Login   | ✅       | ✅            | ✅       |
| View parcels     | ✅ (own) | ✅ (assigned) | ✅ (all) |
| Book parcels     | ✅       | ❌            | ✅       |
| Assign agent     | ❌       | ❌            | ✅       |
| Update location  | ❌       | ✅            | ❌       |
| Export report    | ❌       | ❌            | ✅       |
| Users management | ❌       | ❌            | ✅       |

---

## 🧾 Postman Usage

### 📥 Import Collection

1. Download: `ExcelTrack-API-Postman-Collection.json`
2. Open Postman → **Import** → Select JSON file

### 🌐 Set Environment Variable (Optional)

| Key      | Value                           |
| -------- | ------------------------------- |
| base_url | `http://203.190.9.175:5000/api` |

Update all requests using:

```
{{base_url}}/parcels
```

---

## ⚙️ Tech Stack Overview

| Layer      | Tools                                             |
| ---------- | ------------------------------------------------- |
| Frontend   | React, Tailwind CSS, React Query, React Hook Form |
| Backend    | Express.js, MongoDB, Redis, JWT, Zod              |
| Real-Time  | Socket.IO                                         |
| Reporting  | PDFKit, json2csv                                  |
| Testing    | Postman                                           |
| Deployment | Vite (Frontend), Nodemon (Dev), Node.js           |

---

## 📦 Scripts

### Frontend

```bash
# Development
npm run dev

# Production Build
npm run build

# Linting
npm run lint

# Preview
npm run preview
```

### Backend

```bash
# Run in dev mode
npx nodemon src/index.js

# Or
npm start
```

---

## ⚠️ Notes

- PDF export only works for admins.
- Parcel tracking supports geo-location logs & route optimization using Leaflet.
- Real-time location updates require Socket.IO – not testable in Postman.
- All form validations use `Zod` schema validation.

---

## 👨‍💻 Author

**Md Arif Ahammed Reza**
📧 [mdarifahammedreza@gmail.com](mailto:mdarifahammedreza@gmail.com)
