const Project = require("../../models/project");

module.exports = function (id, res) {
  async function fn() {
    let response = {};
    try {
      const project = await Project.findById(id);
      response = { statusCode: 200, body: { project } };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }
  fn();
};
