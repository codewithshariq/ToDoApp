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
  createUser(name, email) {
    return this.userRepo.createUser(name, email);
  }
  updateUser(data) {
    return this.userRepo.updateUser(data);
  }
  deleteUser(data) {
    return this.userRepo.deleteUser(data);
  }
}

module.exports = UserService;
