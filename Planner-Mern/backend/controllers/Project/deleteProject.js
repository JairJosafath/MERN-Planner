const Project = require("../../models/project");
const { TaskModel } = require("../../models/task");
const { todoModel } = require("../../models/todo");

module.exports = function (req, res) {
  async function fn() {
    let response = {};
    try {
      const temp = await Project.findById(req.params.id);
      // const updated = await Project.findByIdAndDelete(req.params.id);

      if (temp.tasks)
        temp.tasks.map(async (task) => {
          const tempTask = await TaskModel.findById(task.id);
          if (tempTask.todos) {
            tempTask.todos.map(async (todo) => {
              const tempTodo = await todoModel.findByIdAndDelete(todo.id);
              // tempTodo.exec();
            });
          }

          tempTask.delete();
        });
      else if (temp?.tasks?.length < 1 || !temp.tasks) {
        console.log("no tasks");
      }
      temp.delete();
      // const result = await updated.exec();
      response = { statusCode: 200, body: "{ result }" };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
