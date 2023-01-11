const { TaskModel } = require("../../models/task");

module.exports = function (res) {
  async function fn() {
    let response = {};
    try {
      const tasks = await TaskModel.find({});
      response = { statusCode: 200, body: { tasks } };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
