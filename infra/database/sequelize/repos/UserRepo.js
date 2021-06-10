const userModel = require("../models/User");

class UserRepo {
  async getUserByEmail(email) {
    let user = await userModel.findOne({
      where: {
        email: email,
      },
    });
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
    let user = await userModel.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    } else {
      throw new Error("User with the given ID does not exist");
    }
  }

  async createUser(id, name, email) {
    let user = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      throw new Error("User already registered");
    } else {
      return await userModel.create({ id, name, email });
    }
  }

  async updateUser(id, name) {
    return await userModel.update(
      { name: name },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async deleteUser(id) {
    let user = await userModel.destroy({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    } else {
      throw new Error("User with the given ID does not exist");
    }
  }
}

module.exports = UserRepo;
