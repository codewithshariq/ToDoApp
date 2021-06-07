const express = require("express");
var router = express.Router();
const TaskController = require("../controllers/TaskController");

router.get("/getTask", async (req, res) => {
  TaskController.getTask(req, res);
});

router.post("/createTask", async (req, res) => {
  TaskController.createTask(req, res);
});

router.put("/updateTask", async (req, res) => {
  TaskController.updateTask(req, res);
});

router.delete("/deleteTask", async (req, res) => {
  TaskController.deleteTask(req, res);
});

module.exports = router;
