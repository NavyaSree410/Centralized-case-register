const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    caseId: String,
    name: String,
    incidentType: String,
    country: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Case", caseSchema);