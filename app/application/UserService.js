const User = require("../domain/User");
const { v4: uuidv4 } = require("uuid");
const HttpError = require("../http/exceptions/HttpError");

class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async isUserRegistered(email) {
    return await this.userRepo.getUserByEmail(email);
  }

  async getUserById(id) {
    const user = await this.userRepo.getUserById(id);

    if (!user) {
      throw new HttpError(400, "User with the given id does not exist.");
    }

    return user;
  }

  async createUser(name, email) {
    const userExists = await this.isUserRegistered(email);

    if (userExists) {
      throw new HttpError(400, "User with the given id is already registered.");
    }

    const user = User.create(uuidv4(), name, email);
    return await this.userRepo.createUser(user);
  }

  async updateUser(id, name) {
    const user = await this.getUserById(id);
    user.updateName(name);
    return await this.userRepo.updateUser(user);
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    return await this.userRepo.deleteUser(user);
  }
}

module.exports = UserService;
