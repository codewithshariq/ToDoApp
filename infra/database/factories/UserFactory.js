class UserFactory {
  static getRepo(db) {
    switch (db) {
      case "MONGO": {
        let userRepo = require("../mongoose/repos/UserRepo");
        return userRepo;
      }
      case "SQL": {
        let userRepo = require("../sequelize/repos/UserRepo");
        return userRepo;
      }
    }
  }
}

module.exports = UserFactory;
