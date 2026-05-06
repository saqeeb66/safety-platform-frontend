# 🚀 Safety Platform

A full-stack **Safety Issue Management System** built using:

* **Frontend:** React (Vite)
* **Backend:** NestJS (Node.js)
* **Database:** Mysql
* **ORM: ** TypeORM
* **Deployment:** Render

---

# 🌐 Live URLs

* 🔗 Backend: https://safety-platform-backend.onrender.com
* 🔗 Frontend: *(add your deployed frontend URL here)*

---

# 🔐 Login Credentials

## 👑 Admin

```
Email: saqeeb@example.com
Password: 123456
```

## 👤 User

```
Email: user@exaple.com
Password: 123456
```

---

# 📌 Features

## ✅ Authentication

* User Registration
* Login with JWT
* Role-based access (ADMIN / USER / AUDITOR)

---

## 🛠 Issue Management

### Create Issue

Users can create issues with:

* Description
* Reference Standard
* Action Plan
* Location (Building + Floor)
* Image upload

---

### Issue Workflow (STRICT FLOW)

```
OPEN → ASSIGNED → IN_PROGRESS → RESOLVED → APPROVED → CLOSED
```

### Rules:

* Only **ADMIN** can assign issues
* Only **ASSIGNED USER** can:

  * Start (IN_PROGRESS)
  * Resolve
* Only **ADMIN** can:

  * Approve
  * Close

---

## 📍 Location System (Hierarchy)

Locations are structured like:

```
Building → Floor
```

Example:

```
Building A
  ├── Floor 1
  ├── Floor 2
```

Used in:

* Issue creation dropdown
* Filtering

---

## 🖼 Image Upload

* Upload issue-related image
* Stored in backend
* View button to preview

---

## 📊 Audit Logs

Every action is tracked:

| Action        | Logged |
| ------------- | ------ |
| Login         | ✅      |
| Failed Login  | ✅      |
| Issue Created | ✅      |
| Status Change | ✅      |
| Assignment    | ✅      |
| Registration  | ✅      |

Audit API:

```
GET /audit
```

---

## 📄 Issue Listing Page

Shows:

* Description
* Reference Standard
* Action Plan
* Location
* Assigned User
* Created By
* Status
* Image (View button)

---

## 🎯 Filters

* Filter by status
* Pagination supported

---

# ⚙️ API Endpoints

## 🔐 Auth

```
POST /auth/register
POST /auth/login
```

---

## 🧾 Issues

```
POST /issues
GET /issues
POST /issues/:id/assign
POST /issues/:id/status
GET /issues/dashboard
```

---

## 📍 Locations

```
POST /locations
GET /locations
GET /locations/tree
DELETE /locations/:id
```

---

## 📊 Audit

```
GET /audit
```

---

# 🧪 How to Use (Step-by-Step)

## 1️⃣ Login

* Use Admin/User credentials

---

## 2️⃣ Create Location (Admin)

Example:

### Building

```json
{
  "name": "Building A",
  "type": "BUILDING"
}
```

### Floor

```json
{
  "name": "Floor 1",
  "type": "FLOOR",
  "parentId": 1
}
```

---

## 3️⃣ Create Issue

* Go to **Create Page**
* Fill:

  * Description
  * Reference Standard
  * Action Plan
  * Select Location
  * Upload Image

---

## 4️⃣ Issue Workflow

### Admin:

* Assign issue

### User:

* Start → Resolve

### Admin:

* Approve → Close

---

## 5️⃣ View Issues

* Navigate to **Issues page**
* Use filters
* View full details
* Click **View Image**

---

# 🧠 System Logic

## 🔒 Security

* JWT Authentication
* Password hashed using bcrypt

---

## 🚫 Failed Login Protection

* 5 failed attempts → Account locked for 15 mins

---

## 🔄 Auto Unlock

* After lock duration expires

---

## 📦 Backend Architecture

* NestJS modular structure
* TypeORM for DB
* PostgreSQL database

---

## 🎨 Frontend

* React + Vite
* Modern UI (Glassmorphism)
* Dynamic dropdown (location tree)

---

# 🚀 Deployment

## Backend (Render)

* Node service
* MySql DB
* Environment variables:

```
DATABASE_URL=
JWT_SECRET=
```

---

## Frontend (Render Static Site)

```
Build: npm install && npm run build
Publish: dist
```

Env:

```
VITE_API_URL=https://safety-platform-backend.onrender.com
```

---

# ⚠️ Known Notes

* Free Render instance may sleep (slow first request)
* Always use deployed backend URL (not localhost)

---

# 📌 Future Improvements

* Notifications 🔔
* Dashboard charts 📊
* Role-based UI enhancements 👥
* Real-time updates ⚡

---

# 👨‍💻 Author

**Syed Saqeeb**
Full Stack Developer (React + NestJS)

---

# ⭐ Final Output

✔ Full issue lifecycle
✔ Role-based system
✔ Audit tracking
✔ Image handling
✔ Location hierarchy

---

🔥 This is a production-ready safety tracking system.
