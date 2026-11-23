
const Application = require("../models/Application");
const Job = require("../models/Job");

// Student applies for a job
const applyForJob = async (req, res) => {
  try {
    const studentId = req.student.id;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required"
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    // Check application deadline
    if (new Date(job.applicationDeadline) < new Date()) {
      return res.status(400).json({
        message: "Application deadline has passed"
      });
    }

    // Check student eligibility
    const student = await require("../models/Student").findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    if (
      student.cgpa < job.eligibilityCGPA ||
      !job.eligibleBranches.includes(student.branch)
    ) {
      return res.status(403).json({
        message: "You are not eligible for this job"
      });
    }

    // Prevent duplicate applications
    const existingApplication = await Application.findOne({
      student: studentId,
      job: jobId
    });

    if (existingApplication) {
      return res.status(409).json({
        message: "You have already applied for this job"
      });
    }

    const application = await Application.create({
      student: studentId,
      job: jobId
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already applied for this job"
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = { applyForJob };
