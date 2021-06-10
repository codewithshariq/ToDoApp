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
    return this.userRepo.getUserByEmail(id);
  }
  async createUser(name, email) {
    let user = User.create(uuidv4(), name, email);
    await this.userRepo.createUser(user.id, user.name, user.email);
    return user;
  }
  async updateUser(id, name) {
    let {
      name: userName,
      _id: userId,
      email,
    } = await this.userRepo.updateUser(id, name);
    return User.create(userId, userName, email);
  }
  async deleteUser(id) {
    let user = await this.userRepo.deleteUser(id);
    return User.create(user._id, user.name, user.email);
  }
}

module.exports = UserService;
