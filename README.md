# 🚀 Dhruv Dubey - Fullstack Portfolio

A modern, responsive fullstack developer portfolio website built with **React + Vite** on the frontend, and a **Node.js + Express** serverless backend deployed on **Vercel**, backed by **MongoDB Atlas** and **Telegram Bot** notifications.

---

## 🏗️ Architecture Overview

- **Frontend:** React (Vite), Modern UI/UX, Glassmorphism, Tailwind / Vanilla CSS.
- **Backend:** Express.js running on Vercel Serverless Functions (`@vercel/node`).
- **Database:** MongoDB Atlas (Mongoose ODM).
- **Notifications:** Telegram Bot API for instant lead alerts upon contact form submission.
- **Hosting:**
  - Frontend: [Vercel](https://dhruv-dubey-portfolio.vercel.app)
  - Backend: [Vercel Serverless](https://dhruv-dubey-backend.vercel.app)

---

## ⚙️ Environment Variables Setup

### 1. Frontend (`frontend/.env`)
```env
# Production backend URL ya Local ke liye http://localhost:5001
VITE_API_URL=https://dhruv-dubey-backend.vercel.app
```

### 2. Backend (`backend/.env`)
```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.fgy2qyl.mongodb.net/<dbname>
TELEGRAM_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
FRONTEND_URL=https://dhruv-dubey-portfolio.vercel.app
```

---

## 🚨 Critical Issue & Resolution (Main Highlight)

### 🔥 Issue: `Operation 'formdatas.insertOne()' buffering timed out after 10000ms` & `MongooseServerSelectionError`

#### 🔴 Kyu Aaya (Root Cause):
1. **MongoDB Atlas IP Whitelisting (Vercel Block):**
   - MongoDB Atlas by default sirf whitelisted IP addresses se connections allow karta hai.
   - Vercel ek serverless platform hai jisme har request alag-alag dynamic cloud IP (AWS Lambda regions) se aati hai.
   - Jab tak Atlas Network Access me `0.0.0.0/0` (Allow Access from Anywhere) enabled nahi hota, MongoDB Atlas Vercel ke sabhi connection requests ko reject kar deta hai (`MongooseServerSelectionError`).
2. **Mongoose Buffering Timeout (10 Seconds Freeze):**
   - Mongoose ka default behavior hota hai ki agar database connect nahi hai, toh wo request ko 10 second (`bufferTimeoutMS`) tak hold karke wait karta hai.
   - Connection fail hone ke 10 second baad Mongoose error throw karta hai:
     ```text
     Operation 'formdatas.insertOne()' buffering timed out after 10000ms
     ```
3. **Serverless Lifecycle Cold Start Issue:**
   - Pehle backend me `mongoose.connect()` bina wait kiye top-level par asynchronously call ho raha tha.
   - Vercel ke cold start ke dauraan request aate hi route handler chal jata tha jabki MongoDB handshake complete nahi hua hota tha.

#### 🟢 Kaise Solve Kiya (Step-by-Step Fix):

1. **MongoDB Atlas Network Access Fix:**
   - MongoDB Atlas dashboard (`cloud.mongodb.com`) par jaakar **Security > Network Access** open kiya.
   - **Add IP Address** par click karke **Allow Access from Anywhere (`0.0.0.0/0`)** add kiya aur confirm kiya.
   - Status **Active** hote hi Vercel aur dynamic networks ko database access mil gaya.

2. **Serverless Cached Connection Implementation (`backend/src/server.js`):**
   - Vercel serverless environment ke liye reusable connection caching aur middleware banaya:
   ```javascript
   let isConnecting = null;

   const connectDB = async () => {
       if (mongoose.connection.readyState === 1) return;
       if (!process.env.MONGO_URI) {
           throw new Error("MONGO_URI environment variable is not defined.");
       }
       if (!isConnecting) {
           isConnecting = mongoose.connect(process.env.MONGO_URI, {
               serverSelectionTimeoutMS: 5000,
           }).then((m) => {
               console.log("MongoDB Connected");
               return m;
           }).catch((err) => {
               isConnecting = null;
               throw err;
           });
       }
       await isConnecting;
   };

   // Route middleware to ensure DB connection before executing queries
   app.use(async (req, res, next) => {
       if (req.path === '/' || req.path === '/api/health') return next();
       try {
           await connectDB();
           next();
       } catch (err) {
           console.error("Database connection error:", err.message);
           return res.status(503).json({
               success: false,
               error: "Database connection failed. Please ensure MongoDB Atlas Network Access has 0.0.0.0/0 allowed."
           });
       }
   });
   ```

3. **Active Health Check Endpoint (`/api/health`):**
   - Health check route ko update kiya taaki wo sirf status string na de, balki actively database connection test karke real-time status bata sake:
   ```javascript
   app.get('/api/health', async (req, res) => {
       let dbStatus = "Disconnected";
       try {
           await connectDB();
           dbStatus = "Connected";
       } catch (e) {
           dbStatus = `Error: ${e.message}`;
       }
       res.json({
           success: true,
           status: "Backend Running",
           mongodb: dbStatus,
           time: new Date().toISOString()
       });
   });
   ```

---

## 🛠️ Summary of All Issues Encountered & Resolved

| # | Issue / Error | Kyo Aaya (Cause) | Kaise Solve Kiya (Solution) |
|---|---------------|------------------|-----------------------------|
| **1** | **MongoDB Buffering Timeout (10000ms)** | Atlas IP restricted thi + Serverless cold start me connection await nahi tha. | Atlas me `0.0.0.0/0` add kiya + `server.js` me cached serverless connection implement kiya. |
| **2** | **Vercel Serverless 404 / Cannot GET** | Vercel traditional Express `app.listen()` ko handle nahi karta without routing config. | `backend/vercel.json` create kiya aur `module.exports = app` export kiya conditionally (`process.env.NODE_ENV !== 'production'`). |
| **3** | **CORS (Cross-Origin) Error** | Frontend origin aur backend origin alag hone ki wajah se browser API call block kar raha tha. | `cors({ origin: "*", methods: ["GET", "POST", "OPTIONS"] })` middleware add kiya. |
| **4** | **Frontend API URL Mismatch** | Local frontend `VITE_API_URL` ke through deployed backend se baat kar raha tha bina connected DB ke. | `frontend/.env` me `VITE_API_URL` ko environment ke hisaab se configure kiya + `ContactModal.jsx` me fallback support diya. |
| **5** | **Sensitive `.env` Git Tracking** | Credentials (`MONGO_URI`, Telegram Tokens) git repo me commit hone ka risk tha. | `.gitignore` me `.env` add kiya aur `git rm --cached` chala kar repo se sensitive files hatayi. |

---

## 🏃 Quick Start / Local Development Guide

### 1. Backend Run Karein:
```bash
cd backend
npm install
npm run dev
# Server running at http://localhost:5001
```

### 2. Frontend Run Karein:
```bash
cd frontend
npm install
npm run dev
# Frontend running at http://localhost:5173
```

---

## 🚢 Production Deployment Checklist (Vercel)

- [x] **MongoDB Atlas:** Network Access me `0.0.0.0/0` (Allow Anywhere) status **Active** hona chahiye.
- [x] **Vercel Backend Settings:** Environment Variables me `MONGO_URI`, `TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID` added hone chahiye.
- [x] **Vercel Frontend Settings:** Environment Variables me `VITE_API_URL=https://<your-backend>.vercel.app` configured hona chahiye.
- [x] **Health Check Test:** `curl https://<your-backend>.vercel.app/api/health` hamesha `{"mongodb": "Connected"}` return karna chahiye.
