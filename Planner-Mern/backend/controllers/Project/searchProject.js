const Project = require("../../models/project");
const uniqueArray = require("../../utils/uniqueArray");
module.exports = function (query, res) {
  async function fn() {
    let response = {};
    try {
      const byname = await Project.find({ name: new RegExp(query.value, "i") });
      const bydescr = await Project.find({
        description: new RegExp(query.value, "i"),
      });
      const unique = uniqueArray([...byname, ...bydescr]);
      response = {
        statusCode: 200,
        body: { projects: unique },
      };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }
  fn();
};
