const express = require("express");
var router = express.Router();
const { taskController } = require("../controller");

router.get("/getTask", async (req, res) => {
  if (req.body.id) {
    res.status(200).send(await taskController.getTask({ id: req.body.id }));
  } else res.status(400).send("Bad Request: Task ID is not provided!");
});

router.post("/createTask", async (req, res) => {
  try {
    let result = await taskController.createTask({ name: req.body.name });
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send("Error while creating task:", err.message);
  }
});

module.exports = router;
