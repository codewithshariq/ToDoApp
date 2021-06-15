const { serverConfig } = require("../../config");
const UserFactory = require("../../infra/database/factories/UserFactory");
const GoogleAuthService = require("../../infra/services/GoogleAuthService");
const JwtAuthService = require("../../infra/services/JwtAuthService");
const { AuthService } = require("../../application");
const handleError = require("../utils/exceptionHandler");
const { UserService } = require("../../application");

class AuthController {
  constructor() {
    this.userRepo = UserFactory.getRepo(serverConfig.db);
    this.userService = new UserService(this.userRepo);
    this.authSerivce = new AuthService(
      new JwtAuthService(),
      new GoogleAuthService(),
      this.userService
    );
  }

  generateAuthUrl(req, res) {
    res.status(200).send(this.authSerivce.generateAuthUrl());
  }

  async googleAuth(req, res) {
    const code = req.query.code;

    try {
      const result = await this.authSerivce.googleAuth(code);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async loginUser(req, res) {
    const { name, email } = req.body;

    try {
      const result = await this.authSerivce.loginUser(email);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }
}

module.exports = AuthController;
