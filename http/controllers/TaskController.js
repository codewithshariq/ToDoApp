const { db } = require("../../config");
const TaskFactory = require("../../infra/database/factories/TaskFactory");
const { TaskService } = require("../../services");

class TaskController {
  taskRepo = TaskFactory.getRepo(db);
  taskService = new TaskService(taskRepo);
}

module.exports = TaskController;
