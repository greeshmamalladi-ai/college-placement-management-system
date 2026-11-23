const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const verifyToken = require("../middleware/authMiddleware");

// Get logged-in student's profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Profile retrieved successfully",
      student
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;