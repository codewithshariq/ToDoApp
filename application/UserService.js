const User = require("../domain/User");
const { v4: uuidv4 } = require("uuid");

class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  getUserByEmail(email) {
    return this.userRepo.getUserByEmail(email);
  }

  getUserById(id) {
    return this.userRepo.getUserById(id);
  }

  async createUser(name, email) {
    let user = User.create(uuidv4(), name, email);
    let userCreated = await this.userRepo.createUser(user);
    return userCreated;
  }

  async updateUser(id, name) {
    let user = await this.getUserById(id);
    user.updateName(name);
    let userUpdated = await this.userRepo.updateUser(user);
    return userUpdated;
  }

  async deleteUser(id) {
    let user = await this.getUserById(id);
    let userDeleted = await this.userRepo.deleteUser(user);
    return userDeleted;
  }
}

module.exports = UserService;
