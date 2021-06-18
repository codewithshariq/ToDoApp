const HttpError = require("../../../../http/exceptions/HttpError");

class GetTasksHandler {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async handle(command) {
    const { userId, page, limit } = command;
    const tasks = await this.taskRepo.getTasks(userId, page, limit);

    if (!tasks) {
      throw new HttpError(400, "This user does not have any tasks.");
    }

    return tasks;
  }
}

module.exports = GetTasksHandler;
