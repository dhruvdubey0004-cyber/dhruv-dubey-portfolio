const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

// 1. Middleware - CORS sabse pehle
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// 2. MongoDB Connect (Serverless & Local Friendly)
let isConnecting = null;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
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

// Database connection check middleware
app.use(async (req, res, next) => {
    if (req.path === '/' || req.path === '/api/health') {
        return next();
    }
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

// 3. Model
const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    projectType: { type: String, default: 'Fullstack Web App' },
    budget: { type: String, default: '$1k - $3k' },
    phone: { type: String }
}, { timestamps: true });

const FormData = mongoose.model('FormData', formSchema);

// 4. Health Check
app.get('/', (req, res) => res.send("Backend Running"));
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

// 5. Main API - Form submit
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message, projectType, budget, phone } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: "Name, email and message are required." });
        }
        const newEntry = new FormData({
            name, email, message,
            projectType: projectType || 'Fullstack Web App',
            budget: budget || '$1k - $3k',
            phone: phone || ''
        });
        await newEntry.save();

        let telegramSent = false;
        try {
            if (process.env.TELEGRAM_TOKEN && process.env.TELEGRAM_CHAT_ID) {
                const telegramText = `🔥 New Portfolio Lead!\n\n👤 Name: ${name}\n📧 Email: ${email}\n💼 Project: ${projectType || 'Fullstack Web App'}\n💰 Budget: ${budget || 'Not specified'}\n📝 Message:\n${message}`;
                await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: telegramText
                });
                telegramSent = true;
            }
        } catch (teleErr) {
            console.error("Telegram error:", teleErr.response?.data || teleErr.message);
        }

        res.status(201).json({ success: true, msg: telegramSent ? "Saved & Notified" : "Saved in Database", data: newEntry });
    } catch (error) {
        console.error("Contact API error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/contact', async (req, res) => {
    try {
        const leads = await FormData.find().sort({ createdAt: -1 });
        res.json({ success: true, count: leads.length, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 6. Vercel ke liye export, Local ke liye listen
if (process.env.NODE_ENV !== 'production') {
    connectDB().catch(err => console.error("Initial MongoDB Connection Error:", err.message));
    app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
}

module.exports = app;