# 🚗 Ride Booking System

A **role-based backend API** for a ride booking platform — built with **Node.js**, **Express**, **TypeScript**, and **Mongoose**.  
The system enables **riders**, **drivers**, and **admins** to interact securely with custom authentication, real-time ride management, and flexible role controls.

---

## 🏗️ Project Structure

````bash
src/
├── modules/
│   ├── admin/
│   ├── auth/
│   ├── user/
│   ├── driver/
│   ├── ride/
├── middlewares/
├── config/
├── utils/
├── app.ts
└── server.ts






---

## ⚙️ Technologies Used

| Category | Stack |
|-----------|--------|
| **Runtime & Framework** | Node.js, Express.js |
| **Language** | TypeScript |
| **Database** | MongoDB (Mongoose ORM) |
| **Validation** | Zod |
| **Authentication** | Custom Auth, Passport.js |
| **Security & Tokens** | JWT, bcrypt.js, cookie-parser |
| **Utilities** | http-status-codes |
| **Architecture** | MVC + Modular Structure |

---

## 🚀 Project Overview

This backend system is designed to manage a **ride-sharing workflow** similar to Uber or Pathao.

### User Flow

1. A **User** can:
   - Register and log in.
   - Request rides.
   - View their ride history.

2. A **Driver** can:
   - Create an account and submit required information.
   - Be approved or suspended by the **Admin**.
   - Accept, cancel, and update ride statuses.
   - Toggle **availability** (ONLINE / OFFLINE).
   - View their total **earnings**.

3. An **Admin** can:
   - Manage all **users**, **drivers**, and **rides**.
   - Assign or remove driver roles.
   - Block/unblock users.
   - Approve or suspend drivers.

---

## 🔐 Authentication Flow

- **JWT tokens** for access & refresh authentication.
- **Passport.js** for session handling.
- **Cookies** for secure token storage.
- **Custom middleware** for role-based access control.

---

## 📦 API Endpoints

### 👤 Users
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/v1/user/register` | Register a new user |
| PATCH | `/api/v1/user/:userId` | Update user info |
| GET | `/api/v1/user/me` | Get logged-in user profile |

---

### 🔑 Auth
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/logout` | Logout user |
| POST | `/api/v1/auth/refresh-token` | Refresh JWT token |

---

### 🚘 Rides
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/v1/rides/request` | Request a ride |
| GET | `/api/v1/rides/my-rides` | View user’s rides |
| PATCH | `/api/v1/rides/cancel-ride/:rideId` | Cancel a ride |

---

### 🚖 Drivers
| Method | Endpoint | Description |
|---------|-----------|-------------|
| PATCH | `/api/v1/drivers/approve/:rideId` | Accept a ride request |
| PATCH | `/api/v1/drivers/:rideId/update-status` | Update ride status (PICKED_UP, IN_TRANSIT, COMPLETE) |
| PATCH | `/api/v1/update-driver-availability` | Set availability (ONLINE / OFFLINE) |
| PATCH | `/api/v1/drivers/rides/cancel-ride/:rideId` | Cancel ride |
| GET | `/api/v1/drivers/driver-earning` | View driver earnings |

---

### 🛠️ Admin
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/v1/site-admin/all-rides` | Get all rides |
| GET | `/api/v1/site-admin/all-users` | Get all users |
| GET | `/api/v1/site-admin/all-drivers` | Get all drivers |
| PATCH | `/api/v1/site-admin/accept-driver-role/:driverId` | Approve driver |
| PATCH | `/api/v1/site-admin/remove-driver-role/:driverId` | Remove driver role |
| PATCH | `/api/v1/site-admin/suspend-driver/:driverId` | Suspend driver |
| PATCH | `/api/v1/site-admin/update-user-activity/:userId` | Update user activity (ACTIVE / BLOCKED) |

---

## 🧠 Additional Features

- **Pagination & Filtering** (via QueryBuilder)
- **Global Custom Error Handler**
- **Custom Middleware Pipeline**
- **Aggregate Query Support**
- **Type-Safe Validation with Zod**
- **Secure Password Hashing using bcrypt.js**
- **Token Management with Cookie Parser & JWT**

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js >= 18
- MongoDB (local or cloud)
- TypeScript globally installed (optional)

### Steps

```bash
# Clone repository
git clone https://github.com/RajuM1997/ride-booking-api.git

# Navigate
cd ride-booking-system

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# (Update your MongoDB URI, JWT secrets, etc.)

# Build TypeScript
npm run build

# Run in development
npm run dev

# Run in production
npm start

🧩 Environment Variables
| Variable             | Description               |
| -------------------- | ------------------------- |
| `PORT`               | Server port               |
| `MONGO_URI`          | MongoDB connection string |
| `JWT_SECRET`         | JWT signing key           |
| `JWT_EXPIRES_IN`     | JWT token lifespan        |
| `REFRESH_SECRET`     | Refresh token key         |
| `REFRESH_EXPIRES_IN` | Refresh token lifespan    |
| `COOKIE_SECRET`      | Cookie parser secret      |
````
