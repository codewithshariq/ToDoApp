const express = require("express");
var router = express.Router();
const AuthController = require("../controllers/AuthController");

router.get("/getUrl", async (req, res) => {
  AuthController.generateUrl(req, res);
});

router.get("/google/callback", async (req, res) => {
  AuthController.createUser(req, res);
});

module.exports = router;
