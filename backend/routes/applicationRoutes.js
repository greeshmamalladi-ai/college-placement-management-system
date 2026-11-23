
const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { applyForJob } = require("../controllers/applicationController");

// Student application route
router.post("/", verifyToken, applyForJob);

module.exports = router;
