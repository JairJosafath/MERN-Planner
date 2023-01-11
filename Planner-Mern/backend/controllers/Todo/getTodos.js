const { todoModel } = require("../../models/todo");

module.exports = function (res) {
  async function fn() {
    let response = {};
    try {
      const todos = await todoModel.find({});
      response = { statusCode: 200, body: { todos } };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
