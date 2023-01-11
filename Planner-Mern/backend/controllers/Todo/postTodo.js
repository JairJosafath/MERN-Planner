const project = require("../../models/project");
const Project = require("../../models/project");
const { TaskModel } = require("../../models/task");
const { todoModel } = require("../../models/todo");

module.exports = function (req, res) {
  const todo = new todoModel(req.body);
  async function fn() {
    let response = {};

    try {
      const parentTask = await TaskModel.findById(todo.task.id);
      todo.task = {
        id: parentTask.id,
        name: parentTask.name,
        description: parentTask.description,
      };
      const dataToSave = await todo.save();
      parentTask
        .updateOne({
          todos: parentTask.todos
            ? [...parentTask.todos, dataToSave]
            : dataToSave,
        })
        .exec();
      response = { statusCode: 200, body: dataToSave };
    } catch (e) {
      response = { statusCode: 200, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
