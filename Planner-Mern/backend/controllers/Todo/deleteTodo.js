const { TaskModel } = require("../../models/task");
const { todoModel } = require("../../models/todo");

module.exports = function (req, res) {
  async function fn() {
    let response = {};
    try {
      const tbDeleted = await todoModel.findById(req.params.id);
      const taskbyId = await TaskModel.findById(tbDeleted.task.id);
      taskbyId
        .updateOne({
          todos: [
            ...taskbyId.todos.filter((item) => item.id !== req.params.id),
          ],
        })
        .exec();
      const result = tbDeleted.delete();
      response = { statusCode: 200, body: { result } };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
