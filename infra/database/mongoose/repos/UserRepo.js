const userModel = require("../models/user");
const User = require("../../../../domain/User");

class UserRepo {
  async getUserByEmail(email) {
    let user = await userModel.findOne({ email: email }).exec();
    if (user) {
      return User.create(user);
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
      return User.create(user._id, user.name, user.email);
    } else {
      throw new Error("User with the given ID does not exist");
    }
  }

  async createUser(user) {
    let registeredUser = await userModel.findOne({ email: user.email }).exec();
    if (registeredUser) {
      throw new Error("User already registered");
    } else {
      await userModel.create(user);
      return true;
    }
  }

  async updateUser(user) {
    await userModel.findByIdAndUpdate(user.id, user).exec();
    return true;
  }

  async deleteUser(user) {
    await userModel.findByIdAndDelete(id).exec();
    return true;
  }
}

module.exports = UserRepo;
