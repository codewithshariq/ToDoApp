const Task = require("../../../../domain/Task");
const { v4: uuidv4 } = require("uuid");

class CreateTaskHandler {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async handle(command) {
    const { name, userId } = command;
    const task = Task.create(name, uuidv4(), userId);
    return await this.taskRepo.createTask(task);
  }
}

module.exports = CreateTaskHandler;
