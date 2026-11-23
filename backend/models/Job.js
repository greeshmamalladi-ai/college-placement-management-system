const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eligibilityCGPA: {
      type: Number,
      required: true,
    },
    eligibleBranches: {
      type: [String],
      required: true,
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);