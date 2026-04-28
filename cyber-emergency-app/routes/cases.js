const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
    res.json([
        { caseId: "CASE-1", type: "Phishing" },
        { caseId: "CASE-2", type: "Malware" }
    ]);
});

module.exports = router;