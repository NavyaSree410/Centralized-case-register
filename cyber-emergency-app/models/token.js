const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    userId: String,
    refreshToken: String
});

module.exports = mongoose.model("Token", tokenSchema);