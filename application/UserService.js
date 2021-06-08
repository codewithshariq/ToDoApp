class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  getUser(data) {
    return this.userRepo.getUser(data);
  }
  createUser(data) {
    return this.userRepo.createUser(data);
  }
  updateUser(data) {
    return this.userRepo.updateUser(data);
  }
  deleteUser(data) {
    return this.userRepo.deleteUser(data);
  }
}

module.exports = UserService;
