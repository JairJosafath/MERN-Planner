const { todoModel } = require("../../models/todo");

module.exports = function (id, res) {
  async function fn() {
    let response = {};
    try {
      const todo = await todoModel.findById(id);
      response = { statusCode: 200, body: { todo } };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }
  fn();
};
