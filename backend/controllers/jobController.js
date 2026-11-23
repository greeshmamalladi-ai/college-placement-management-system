const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      eligibilityCGPA,
      eligibleBranches,
      requiredSkills,
      applicationDeadline
    } = req.body;

    if (
      !title ||
      !company ||
      !description ||
      eligibilityCGPA === undefined ||
      !eligibleBranches ||
      !applicationDeadline
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }

    const job = await Job.create({
      title,
      company,
      description,
      eligibilityCGPA,
      eligibleBranches,
      requiredSkills: requiredSkills || [],
      applicationDeadline,
      createdBy: req.student.id
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");

    res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      message: "Job updated successfully",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};