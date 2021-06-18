const MongoTaskRepo = require("../mongoose/repos/TaskRepo");
const SqlTaskRepo = require("../sequelize/repos/TaskRepo");

class TaskFactory {
  static getRepo(db) {
    switch (db) {
      case "MONGO": {
        return new MongoTaskRepo();
      }
      case "SQL": {
        return new SqlTaskRepo();
      }
    }
  }
}

module.exports = TaskFactory;
