const userModel = require("../models/User");
const User = require("../../../../domain/User");

class UserRepo {
  async getUserByEmail(email) {
    const user = await userModel.findOne({
      where: {
        email: email,
      },
    });

    return user ? User.create(user._id, user.name, user.email) : false;
  }

  async getUserById(id) {
    const user = await userModel.findOne({
      where: {
        _id: id,
      },
    });

    return user ? User.create(user._id, user.name, user.email) : false;
  }

  async createUser(user) {
    const createdUser = await userModel.create(user);

    return createdUser ? true : false;
  }

  async updateUser(user) {
    const updatedUser = await userModel.update(user, {
      where: {
        _id: user._id,
      },
    });

    return updatedUser.length > 0 ? true : false;
  }

  async deleteUser(user) {
    const deletedUser = await userModel.destroy({
      where: {
        _id: user._id,
      },
    });

    return deletedUser > 0 ? true : false;
  }
}

module.exports = UserRepo;
