const mongoose = require("mongoose");

const task = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: false,
      type: String,
    },
    color: {
      required: false,
      type: String,
    },
    status: {
      required: false,
      type: String,
    },
    dueDate: {
      required: false,
      type: Date,
    },
    startDate: {
      required: false,
      type: Date,
    },
    priority: {
      required: false,
      type: Number,
    },
    project: { id: String, name: String, description: String },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: false,
      type: String,
    },
    banner: {
      required: false,
      type: Number,
    },
    dueDate: {
      required: false,
      type: Date,
    },
    status: {
      required: false,
      type: String,
    },
    color: {
      required: false,
      type: String,
    },
    startDate: {
      required: false,
      type: Date,
    },
    priority: {
      required: false,
      type: Number,
    },
    tasks: [task],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
