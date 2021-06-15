const { serverConfig } = require("../../config");
const UserFactory = require("../../infra/database/factories/UserFactory");
const { UserService } = require("../../application");
const handleError = require("../utils/exceptionHandler");

class UserController {
  constructor() {
    this.userRepo = UserFactory.getRepo(serverConfig.db);
    this.userService = new UserService(this.userRepo);
  }

  async createUser(req, res) {
    const { name, email } = req.body;

    try {
      const result = await this.userService.createUser(name, email);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async updateUser(req, res) {
    const { id, name } = req.body;

    try {
      const result = await this.userService.updateUser(id, name);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async deleteUser(req, res) {
    const { id } = req.body;

    try {
      const result = await this.userService.deleteUser(id);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }
}

module.exports = UserController;
