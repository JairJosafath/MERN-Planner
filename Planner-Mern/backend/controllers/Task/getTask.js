const { TaskModel } = require("../../models/task");

module.exports = function (id, res) {
  async function fn() {
    let response = {};
    try {
      const task = await TaskModel.findById(id);
      response = { statusCode: 200, body: { task } };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }
  fn();
};
