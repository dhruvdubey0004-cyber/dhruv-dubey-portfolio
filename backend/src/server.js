const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({ origin: "*" })); // abhi ke liye sab allow, baad me frontend ka link daal dena
app.use(express.json());

// 1. MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// 2. Model - Form ka data kaisa save hoga
const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    projectType: { type: String, default: 'Fullstack Web App' },
    budget: { type: String, default: '$1k - $3k' },
    phone: { type: String }
}, { timestamps: true });

const FormData = mongoose.model('FormData', formSchema);

// 3. Main API - Form submit hote hi MongoDB me save + Telegram Notification
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message, projectType, budget, phone } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: "Name, email and message are required."
            });
        }

        // A. MongoDB me save
        const newEntry = new FormData({
            name,
            email,
            message,
            projectType: projectType || 'Fullstack Web App',
            budget: budget || '$1k - $3k',
            phone: phone || ''
        });
        await newEntry.save();
        console.log("Saved lead to MongoDB:", name, email);

        // B. Phone pe Telegram Notification
        let telegramSent = false;
        try {
            if (process.env.TELEGRAM_TOKEN && process.env.TELEGRAM_CHAT_ID) {
                const telegramText = `🔥 New Portfolio Lead!\n\n👤 Name: ${name}\n📧 Email: ${email}\n💼 Project: ${projectType || 'Fullstack Web App'}\n💰 Budget: ${budget || 'Not specified'}\n📝 Message:\n${message}`;

                await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: telegramText
                });
                telegramSent = true;
                console.log("Telegram notification sent successfully!");
            }
        } catch (teleErr) {
            console.error("Telegram notification error:", teleErr.response?.data || teleErr.message);
        }

        res.status(201).json({
            success: true,
            msg: telegramSent ? "Saved & Notified" : "Saved in Database",
            data: newEntry
        });

    } catch (error) {
        console.error("Contact API error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. GET API - Frontend ya Admin me data dekhne ke liye
app.get('/api/contact', async (req, res) => {
    try {
        const leads = await FormData.find().sort({ createdAt: -1 });
        res.json({ success: true, count: leads.length, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 5. Health Check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: "Backend Running",
        mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
        time: new Date().toISOString()
    });
});

app.get('/', (req, res) => res.send("Backend Running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));