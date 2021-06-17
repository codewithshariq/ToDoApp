const HttpError = require("../../../../http/exceptions/HttpError");

class GetTaskHandler {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async handle(command) {
    const { id } = command;
    const task = await this.taskRepo.getTask(id);

    if (!task) {
      throw new HttpError(400, "Task with the given id does not exist.");
    }

    return task;
  }
}

module.exports = GetTaskHandler;
