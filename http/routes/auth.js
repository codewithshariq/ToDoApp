const express = require("express");
var router = express.Router();
const Controller = require("../controllers/AuthController");
const authController = new Controller();

router.get("/getUrl", async (req, res) => {
  authController.generateUrl(req, res);
});

router.get("/google/callback", async (req, res) => {
  authController.createUser(req, res);
});

module.exports = router;
