const project = require("../../models/project");
const { TaskModel } = require("../../models/task");

module.exports = function (req, res) {
  async function fn() {
    let response = {};
    try {
      const tbDeleted = await TaskModel.findById(req.params.id);
      const projectbyId = await project.findById(tbDeleted.project.id);
      projectbyId
        .updateOne({
          tasks: [
            ...projectbyId.tasks.filter((item) => item.id !== req.params.id),
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
