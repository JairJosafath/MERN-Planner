const project = require("../../models/project");
const { TaskModel } = require("../../models/task");

module.exports = function (req, res) {
  async function fn() {
    let response = {};
    try {
      const tbUpdated = await TaskModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      ).exec();
      const projectbyId = await project.findById(tbUpdated.project.id);

      projectbyId
        .updateOne({
          tasks: [
            ...projectbyId.tasks.filter((item) => item.id !== req.params.id),
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
