const express = require("express");
var router = express.Router();
const Controller = require("../controllers/TaskController");
const TaskController = new Controller();

router.get("/getTask", (req, res) => {
  TaskController.getTask(req, res);
});

router.post("/createTask", (req, res) => {
  TaskController.createTask(req, res);
});

router.put("/updateTask", (req, res) => {
  TaskController.updateTask(req, res);
});

router.delete("/deleteTask", (req, res) => {
  TaskController.deleteTask(req, res);
});

module.exports = router;
