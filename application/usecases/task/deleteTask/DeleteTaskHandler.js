const HttpError = require("../../../../http/exceptions/HttpError");

class DeleteTaskHandler {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async handle(command) {
    const { id } = command;

    const task = await this.taskRepo.getTask(id);

    if (!task) {
      throw new HttpError(400, "Task with the given id does not exist.");
    }

    return await this.taskRepo.deleteTask(task);
  }
}

module.exports = DeleteTaskHandler;
