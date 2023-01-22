const express = require("express");
const router = express.Router();
const postProject = require("../controllers/Project/postProject");
const getProjects = require("../controllers/Project/getProjects");
const getProject = require("../controllers/Project/getProject");
const updateProject = require("../controllers/Project/updateProject");
const deleteProject = require("../controllers/Project/deleteProject");

const postTask = require("../controllers/Task/postTask");
const getTasks = require("../controllers/Task/getTasks");
const getTask = require("../controllers/Task/getTask");
const updateTask = require("../controllers/Task/updateTask");
const deleteTask = require("../controllers/Task/deleteTask");

const postTodo = require("../controllers/Todo/postTodo");
const getTodos = require("../controllers/Todo/getTodos");
const getTodo = require("../controllers/Todo/getTodo");
const updateTodo = require("../controllers/Todo/updateTodo");
const deleteTodo = require("../controllers/Todo/deleteTodo");

//PROJECT
//post
router.post("/addproject", (req, res) => {
  postProject(req, res);
});
//get

router.get("/getprojects", (req, res) => {
  getProjects(res);
});
//getOne
router.get("/getproject/:id", (req, res) => {
  getProject(req.params.id, res);
});
//update
router.post("/updateproject/:id", (req, res) => {
  updateProject(req, res);
});
//delete
router.delete("/deleteproject/:id", (req, res) => {
  deleteProject(req, res);
});

//TASK
router.post("/addtask", (req, res) => {
  postTask(req, res);
});
//get
router.get("/gettasks", (req, res) => {
  getTasks(res);
});
//getOne
router.get("/gettask/:id", (req, res) => {
  getTask(req.params.id, res);
});
//update
router.post("/updatetask/:id", (req, res) => {
  updateTask(req, res);
});
//delete
router.delete("/deletetask/:id", (req, res) => {
  deleteTask(req, res);
});

//POST
router.post("/addtodo", (req, res) => {
  postTodo(req, res);
});
//get
router.get("/gettodos", (req, res) => {
  getTodos(res);
});
//getOne
router.get("/gettodo/:id", (req, res) => {
  getTodo(req.params.id, res);
});
//update
router.post("/updatetodo/:id", (req, res) => {
  updateTodo(req, res);
});
//delete
router.delete("/deletetodo/:id", (req, res) => {
  deleteTodo(req, res);
});

module.exports = router;
