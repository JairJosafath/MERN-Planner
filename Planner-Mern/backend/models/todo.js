const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
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
  dueDate: {
    required: false,
    type: Date,
  },
  status: {
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
  task: { id: String, name: String, color: String },
});

module.exports.Todo = todoSchema;
module.exports.todoModel = mongoose.model("Todo", todoSchema);
