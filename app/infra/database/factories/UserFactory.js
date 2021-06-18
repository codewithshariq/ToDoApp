const MongoUserRepo = require("../mongoose/repos/UserRepo");
const SqlUserRepo = require("../sequelize/repos/UserRepo");

class UserFactory {
  static getRepo(db) {
    switch (db) {
      case "MONGO": {
        return new MongoUserRepo();
      }
      case "SQL": {
        return new SqlUserRepo();
      }
    }
  }
}

module.exports = UserFactory;
