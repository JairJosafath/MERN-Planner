const Project = require("../../models/project");

module.exports = function (req, res) {
  async function fn() {
    let response = {};
    try {
      const updated = Project.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      const result = await updated.exec();
      response = { statusCode: 200, body: result };
    } catch (e) {
      response = { statusCode: 400, body: { message: e.message } };
    }
    res.send(response);
  }

  fn();
};
