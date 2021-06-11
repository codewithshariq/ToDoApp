const express = require("express");
var router = express.Router();
const Controller = require("../controllers/TaskController");
const taskController = new Controller();

router.get("/getTask", (req, res) => {
  taskController.getTask(req, res);
});

router.post("/createTask", (req, res) => {
  taskController.createTask(req, res);
});

router.put("/updateTask", (req, res) => {
  taskController.updateTask(req, res);
});

router.delete("/deleteTask", (req, res) => {
  taskController.deleteTask(req, res);
});

module.exports = router;
