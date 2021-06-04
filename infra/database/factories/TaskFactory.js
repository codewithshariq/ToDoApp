class TaskFactory {
  static getRepo(db) {
    switch (db) {
      case "MONGO": {
        let taskRepo = require("../mongoose/repos/TaskRepo");
        return taskRepo;
      }
      case "SQL": {
        let taskRepo = require("../sequelize/repos/TaskRepo");
        return taskRepo;
      }
    }
  }
}

module.exports = TaskFactory;
