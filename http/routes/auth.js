const express = require("express");
var router = express.Router();
const AuthController = require("../controllers/AuthController");
const authController = new AuthController();

router.get("/getUrl", async (req, res) => {
  authController.generateAuthUrl(req, res);
});

router.get("/google/callback", async (req, res) => {
  authController.googleAuth(req, res);
});

router.post("/login", async (req, res) => {
  authController.loginUser(req, res);
});

module.exports = router;
