const express = require("express");
var router = express.Router();
const { TaskService } = require("../../services");

router.get("/getTask", async (req, res) => {
  const data = req.body;
  try {
    let result = await TaskService.getTask(data);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/createTask", async (req, res) => {
  const data = req.body;
  try {
    let result = await TaskService.createTask(data);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/updateTask", async (req, res) => {
  const data = req.body;
  try {
    let result = await TaskService.updateTask(data);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/deleteTask", async (req, res) => {
  const data = req.body;
  try {
    let result = await TaskService.deleteTask(data);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
