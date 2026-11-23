const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// View all jobs
router.get("/", getAllJobs);

// Admin-only operations
router.post("/", verifyToken, adminMiddleware, createJob);
router.put("/:id", verifyToken, adminMiddleware, updateJob);
router.delete("/:id", verifyToken, adminMiddleware, deleteJob);

module.exports = router;