const { v4: uuidv4 } = require("uuid");
const HttpError = require("../http/exceptions/HttpError");
const Task = require("../domain/Task");

class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async getTask(id) {
    const task = await this.taskRepo.getTask(id);

    if (!task) {
      throw new HttpError(400, "Task with the given id does not exist.");
    }

    return task;
  }

  async getTasks(userId, page, limit) {
    const tasks = await this.taskRepo.getTasks(userId, page, limit);

    if (!tasks) {
      throw new HttpError(400, "This user does not have any tasks.");
    }

    return tasks;
  }

  async createTask(name, userId) {
    const task = Task.create(name, uuidv4(), userId);
    return await this.taskRepo.createTask(task);
  }

  async updateTask(id, completed) {
    const task = await this.getTask(id);
    task.updateStatus(completed);
    return await this.taskRepo.updateTask(task);
  }

  async deleteTask(id) {
    const task = await this.getTask(id);
    return await this.taskRepo.deleteTask(task);
  }
}

module.exports = TaskService;
