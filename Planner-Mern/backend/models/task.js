const mongoose = require("mongoose");
const { Todo } = require("./todo");

const taskSchema = new mongoose.Schema(
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
    todos: [Todo],
  },
  { timestamps: true }
);

module.exports.TaskModel = mongoose.model("Task", taskSchema);
module.exports.Task = taskSchema;
