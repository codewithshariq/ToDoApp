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
        _id: id,
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
      return await userModel.create({ _id: id, name, email });
    }
  }

  async updateUser(id, name) {
    await userModel.update(
      { name: name },
      {
        where: {
          _id: id,
        },
      }
    );
    return await userModel.findOne({
      where: {
        _id: id,
      },
    });
  }

  async deleteUser(id) {
    let user = await userModel.findOne({
      where: {
        _id: id,
      },
    });
    if (user) {
      await userModel.destroy({
        where: {
          _id: id,
        },
      });
      return user;
    } else {
      throw new Error("User with the given ID does not exist");
    }
  }
}

module.exports = UserRepo;
