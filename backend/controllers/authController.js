
const mongoose = require("mongoose");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Student Registration
exports.registerStudent = async (req, res) => {
  console.log("REGISTER REQUEST RECEIVED");
  console.log("REGISTER CONTROLLER EXECUTED");
  try {
    const { name, email, password, branch, cgpa, skills } = req.body;

    if (!name || !email || !password || !branch || cgpa === undefined) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    if (Number.isNaN(Number(cgpa)) || Number(cgpa) < 0 || Number(cgpa) > 10) {
      return res.status(400).json({ message: "CGPA must be between 0 and 10" });
    }
    console.log("Mongoose state:", mongoose.connection.readyState);
    console.log("Student model state:", Student.db.readyState);
    console.log("Same connection:", Student.db === mongoose.connection);

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      branch,
      cgpa: Number(cgpa),
      skills: skills || [],
    });

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student Login
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        branch: student.branch,
        cgpa: student.cgpa,
        skills: student.skills,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
