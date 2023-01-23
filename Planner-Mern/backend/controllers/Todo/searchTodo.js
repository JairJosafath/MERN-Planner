const { todoModel } = require("../../models/todo");
const uniqueArray = require("../../utils/uniqueArray");
module.exports = function (query, res) {
  async function fn() {
    let response = {};
    try {
      const byname = await todoModel.find({
        title: new RegExp(query.value, "i"),
      });
      const bydescr = await todoModel.find({
        description: new RegExp(query.value, "i"),
      });
      const unique = uniqueArray([...byname, ...bydescr]);
      response = {
        statusCode: 200,
        body: { todos: unique },
      };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }
  fn();
};
