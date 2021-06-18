const userModel = require("../models/user");
const User = require("../../../../domain/User");

class UserRepo {
  async getUserByEmail(email) {
    const user = await userModel.findOne({ email: email }).exec();
    return user ? User.create(user._id, user.name, user.email) : false;
  }

  async getUserById(id) {
    const user = await userModel.findById(id).exec();
    return user ? User.create(user._id, user.name, user.email) : false;
  }

  async createUser(user) {
    const createdUser = await userModel.create(user);
    return createdUser ? true : false;
  }

  async updateUser(user) {
    const updatedUser = await userModel
      .findByIdAndUpdate(user._id, user)
      .exec();
    return updatedUser ? true : false;
  }

  async deleteUser(user) {
    const deletedUser = await userModel.findByIdAndDelete(user._id).exec();
    return deletedUser ? true : false;
  }
}

module.exports = UserRepo;
