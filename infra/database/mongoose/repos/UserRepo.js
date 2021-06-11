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
  async createUser(id, name, email) {
    let user = await userModel.findOne({ email: email }).exec();
    if (user) {
      throw new Error("User already registered");
    } else {
      return await userModel.create({ _id: id, name, email });
    }
  }
  async updateUser(id, name) {
    let user = await userModel.findById(id).exec();
    if (user) {
      user.name = name;
      return await user.save();
    } else {
      throw new Error("User with the given ID does not exist");
    }
  }
  async deleteUser(id) {
    let user = await userModel.findByIdAndDelete(id).exec();
    if (user) {
      return user;
    } else {
      throw new Error("User with the given ID does not exist");
    }
  }
}

module.exports = UserRepo;
