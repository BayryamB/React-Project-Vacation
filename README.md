# Project Setup Guide

This project consists of two main components:

* **Client** (React + Vite)
* **Server** (Node.js + Express)

Both parts run independently but work together to create the full application.

---

## 📂 Project Structure

```
/root
│
├── Client/   → React Vite frontend
│
└── Server/   → Node.js Express backend
```

---

## 🚀 Getting Started

Follow these steps to start both the backend and frontend.

---

# 1. 🔧 Backend (Server)

Located in the `Server` folder.

### **Install dependencies**

```
cd Server
npm install
```

### **Start the server**

```
npm run start
```

This will start your Node.js server on **(http://localhost:3030)** (or whichever port is configured).

---

# 2. 🎨 Frontend (Client)

Located in the `Client` folder.

### **Install dependencies**

```
cd Client
npm install
```

### **Start the React app**

```
npm run dev
```

This will start the Vite development server, usually on:

```
http://localhost:5173
```

---

Make sure the backend server is running before testing features in the frontend.

---

# 🗄️ MongoDB Setup (Optional Section)

If using MongoDB locally:

* Install MongoDB Community Server
* Ensure `mongod` service is running

---

# 📦 Scripts Summary

| Location | Command         | Description                |
| -------- | --------------- | -------------------------- |
| Server   | `npm run start` | Starts Node.js backend     |
| Client   | `npm run dev`   | Starts React Vite frontend |

---

# ✔️ Final Notes

* Start the **Server** first
* Then start the **Client**
* Visit your frontend in the browser and ensure requests reach the backend

You are now ready to develop or deploy this full-stack project! 🎉
