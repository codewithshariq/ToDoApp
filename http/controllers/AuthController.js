const { db } = require("../../config");
const UserFactory = require("../../infra/database/factories/UserFactory");
const { UserService } = require("../../application");
const GoogleApi = require("../../infra/services/GoogleApi");
const TokenService = require("../../infra/services/Token");

class AuthController {
  constructor() {
    this.userRepo = UserFactory.getRepo(db);
    this.userService = new UserService(this.userRepo);
    this.authApi = new GoogleApi();
    this.tokenService = new TokenService();
  }

  generateUrl(req, res) {
    res.status(200).send(this.authApi.urlGoogle());
  }

  async googleAuth(req, res) {
    const code = req.query.code;
    try {
      let { name, email } = await this.authApi.getGoogleAccountFromCode(code);

      try {
        let {
          _id: userId,
          name: userName,
          email: userEmail,
        } = await this.userService.getUserByEmail(email);
        let accessToken = this.tokenService.createToken(
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
      let accessToken = this.tokenService.createToken(
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
