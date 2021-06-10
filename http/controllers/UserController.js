const { db } = require("../../config");
const UserFactory = require("../../infra/database/factories/UserFactory");
const { UserService } = require("../../application");
const GoogleApi = require("../../infra/services/GoogleApi");
const TokenService = require("../../infra/services/Token");

class UserController {
  constructor() {
    this.userRepo = UserFactory.getRepo(db);
    this.userService = new UserService(this.userRepo);
    this.authApi = new GoogleApi();
    this.tokenService = new TokenService();
  }

  async getUser(req, res) {
    const data = req.body;
    try {
      let result = await this.userService.getUser(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async updateUser(req, res) {
    const data = req.body;
    try {
      let result = await this.userService.updateUser(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async deleteUser(req, res) {
    const data = req.body;
    try {
      let result = await this.userService.deleteUser(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = UserController;
