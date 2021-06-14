const { serverConfig } = require("../../config");
const UserFactory = require("../../infra/database/factories/UserFactory");
const { UserService } = require("../../application");
const GoogleAuthService = require("../../infra/services/GoogleAuthService");
const AuthService = require("../../infra/services/AuthService");

class AuthController {
  constructor() {
    this.userRepo = UserFactory.getRepo(serverConfig.db);
    this.userService = new UserService(this.userRepo);
    this.googleAuthService = new GoogleAuthService();
    this.authService = new AuthService();
  }

  generateUrl(req, res) {
    res.status(200).send(this.googleAuthService.urlGoogle());
  }

  async googleAuth(req, res) {
    const code = req.query.code;
    try {
      let { name, email } =
        await this.googleAuthService.getGoogleAccountFromCode(code);

      try {
        let {
          _id: userId,
          name: userName,
          email: userEmail,
        } = await this.userService.getUserByEmail(email);
        let accessToken = this.authService.createToken(
          userId,
          userName,
          userEmail
        );
        res.status(200).json({ "access-token": accessToken });
      } catch (err) {
        if (err.name == "unregistered_user") {
          let result = await this.userService.createUser(name, email);
          res.status(200).send(result);
        } else res.status(400).send(err.message);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async loginUser(req, res) {
    const { name, email } = req.body;
    try {
      let {
        _id: userId,
        name: userName,
        email: userEmail,
      } = await this.userService.getUserByEmail(email);
      let accessToken = this.authService.createToken(
        userId,
        userName,
        userEmail
      );
      res.status(200).json({ "access-token": accessToken });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = AuthController;
