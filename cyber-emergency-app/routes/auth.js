const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/token"); // Ensure the filename is token.js
const { generateAccessToken, generateRefreshToken } = require("../utils/tokens"); // Adjust path if needed

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ error: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashed });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Incorrect password" });

        // Generate the two tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store Refresh Token in DB
        await Token.findOneAndUpdate(
            { userId: user._id },
            { refreshToken: refreshToken },
            { upsert: true, new: true }
        );

        // Send both to frontend
        res.json({ 
            accessToken, 
            refreshToken, 
            username: user.username,
            role: user.role 
        });
    } catch (err) {
        res.status(500).json({ error: "Login error" });
    }
});

module.exports = router;