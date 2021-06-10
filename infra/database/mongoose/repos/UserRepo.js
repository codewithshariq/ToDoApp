const userModel = require("../models/user");

class UserRepo {
  async getUserByEmail(email) {
    let user = await userModel.findOne({ email: email }).exec();
    if (user) {
      return user;
    } else {
      let err = new Error();
      err.name = "unregistered_user";
      err.message = "User with the given email is not registered";
      throw err;
    }
  }
  async getUserById(id) {
    let user = await userModel.findById(id).exec();
    if (user) {
      return user;
    } else {
      throw new Error("User with the given ID does not exist");
    }
  }
  async createUser(name, email) {
    return await userModel.create({ name, email });
  }
  async updateUser({ id, name }) {
    let user = await userModel.findById(id).exec();
    if (user) {
      user.name = name;
      return await user.save();
    }
  }
  async deleteUser({ id }) {
    let user = await userModel.findByIdAndDelete(id).exec();
    if (user) {
      return user;
    } else {
      throw new Error("User with the given ID does not exist");
    }
  }
}

module.exports = UserRepo;
