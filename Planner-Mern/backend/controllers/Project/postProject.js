const Project = require("../../models/project");
const { TaskModel } = require("../../models/task");

module.exports = function (req, res) {
  const project = new Project(req.body);
  async function fn() {
    let response = {};

    try {
      if (project.tasks)
        project.tasks.map((task) => {
          task.project = {
            id: project.id,
            name: project.name,
            description: project?.description,
          };
          // console.log(new TaskModel(task));
          new TaskModel(task).save();
        });
      else if (project.tasks.length < 1 || !project.tasks) {
        console.log("no tasks");
      }
      const dataToSave = await project.save();
      response = { statusCode: 200, body: dataToSave };
    } catch (e) {
      response = { statusCode: 200, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
