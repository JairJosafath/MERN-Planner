const project = require("../../models/project");
const Project = require("../../models/project");
const { TaskModel } = require("../../models/task");

module.exports = function (req, res) {
  const task = new TaskModel(req.body);
  async function fn() {
    let response = {};

    try {
      const parentProject = await Project.findById(task.project.id);
      task.project = {
        id: parentProject.id,
        name: parentProject.name,
        description: parentProject.description,
      };
      const dataToSave = await task.save();
      parentProject
        .updateOne({ tasks: [...parentProject.tasks, dataToSave] })
        .exec();
      response = { statusCode: 200, body: dataToSave };
    } catch (e) {
      response = { statusCode: 200, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
