const TaskEntity = require("../domain/TaskEntity");
const { v4: uuidv4 } = require("uuid");

class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  getTask(data) {
    return this.taskRepo.getTask(data);
  }
  createTask(data) {
    let { name } = data;
    let task = TaskEntity.factoryMethod(name, false, uuidv4());
    return this.taskRepo.createTask(task);
  }
  updateTask(data) {
    return this.taskRepo.updateTask(data);
  }
  deleteTask(data) {
    return this.taskRepo.deleteTask(data);
  }
}

module.exports = TaskService;
