const { TaskModel } = require("../../models/task");
const { todoModel } = require("../../models/todo");

module.exports = function (req, res) {
  async function fn() {
    let response = {};
    try {
      const tbUpdated = await todoModel
        .findByIdAndUpdate(
          req.params.id,
          {
            ...req.body,
          },
          { new: true }
        )
        .exec();
      const taskbyId = await TaskModel.findById(tbUpdated.task.id);

      taskbyId
        .updateOne({
          todos: [
            ...taskbyId.todos.filter((item) => item.id !== req.params.id),
            tbUpdated,
          ],
        })
        .exec();
      response = { statusCode: 200, body: { result: tbUpdated } };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
