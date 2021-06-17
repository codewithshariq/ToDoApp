const HttpError = require("../../../../http/exceptions/HttpError");

class UpdateTaskHandler {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async handle(command) {
    const { id, completed } = command;

    const task = await this.taskRepo.getTask(id);

    if (!task) {
      throw new HttpError(400, "Task with the given id does not exist.");
    }

    task.updateStatus(completed);
    return await this.taskRepo.updateTask(task);
  }
}

module.exports = UpdateTaskHandler;
