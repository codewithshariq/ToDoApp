const { db } = require("../../config");
const UserFactory = require("../../infra/database/factories/UserFactory");
const { UserService } = require("../../application");
const googleApi = require("../../infra/services/google-util");

class AuthController {
  static userRepo = UserFactory.getRepo(db);
  static userService = new UserService(this.userRepo);

  static async getUser(req, res) {
    const data = req.body;
    try {
      let result = await this.userService.getUser(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async createUser(req, res) {
    const code = req.query.code;
    try {
      let data = await googleApi.getGoogleAccountFromCode(code);
      let result = await this.userService.createUser(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async updateUser(req, res) {
    const data = req.body;
    try {
      let result = await this.userService.updateUser(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async deleteUser(req, res) {
    const data = req.body;
    try {
      let result = await this.userService.deleteUser(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static generateUrl(req, res) {
    res.status(200).send(googleApi.urlGoogle());
  }
}

module.exports = AuthController;
