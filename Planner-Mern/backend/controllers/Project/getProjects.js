const Project = require("../../models/project");

module.exports = function (res) {
  async function fn() {
    let response = {};
    try {
      const projects = await Project.find({});
      response = { statusCode: 200, body: { projects } };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
