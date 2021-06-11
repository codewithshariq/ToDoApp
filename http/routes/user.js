const express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");
const userController = new UserController();

router.post("/register", async (req, res) => {
  userController.createUser(req, res);
});

router.put("/update", async (req, res) => {
  userController.updateUser(req, res);
});

router.delete("/delete", async (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
