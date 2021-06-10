const express = require("express");
var router = express.Router();
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const authController = new AuthController();
const userController = new UserController();

router.get("/getUrl", async (req, res) => {
  authController.generateUrl(req, res);
});

router.get("/google/callback", async (req, res) => {
  authController.googleAuth(req, res);
});

router.post("/login", async (req, res) => {
  authController.loginUser(req, res);
});

module.exports = router;
