const { db } = require("../../config");
const UserFactory = require("../../infra/database/factories/UserFactory");
const { UserService } = require("../../application");
const GoogleAuthService = require("../../infra/services/GoogleAuthService");

class UserController {
  constructor() {
    this.userRepo = UserFactory.getRepo(db);
    this.userService = new UserService(this.userRepo);
    this.authApi = new GoogleAuthService();
  }

  async createUser(req, res) {
    const { name, email } = req.body;
    try {
      let result = await this.userService.createUser(name, email);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async updateUser(req, res) {
    const { id, name } = req.body;
    try {
      let result = await this.userService.updateUser(id, name);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async deleteUser(req, res) {
    const { id } = req.body;
    try {
      let result = await this.userService.deleteUser(id);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = UserController;
