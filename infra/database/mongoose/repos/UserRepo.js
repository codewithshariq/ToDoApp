const userModel = require("../models/user");

class UserRepo {
  static async getUser({ id }) {
    return await userModel.findById(id).exec();
  }
  static async createUser({ name, email }) {
    return await userModel.create({ name, email });
  }
  static async updateUser({ id, name }) {
    let user = await userModel.findById(id).exec();
    if (user) {
      user.name = name;
      return await user.save();
    }
  }
  static async deleteUser({ id }) {
    let user = await userModel.findByIdAndDelete(id).exec();
    if (user) {
      return user;
    } else {
      throw new Error("User with the given ID does not exist");
    }
  }
}

module.exports = UserRepo;
