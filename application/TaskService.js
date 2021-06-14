const Task = require("../");
const { v4: uuidv4 } = require("uuid");

class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async getTask(id) {
    let task = await this.taskRepo.getTask(id);
    return Task.create(task);
  }

  async getTasks(userId, page, limit) {
    return await this.taskRepo.getTasks(userId, page, limit);
  }

  async createTask(name, userId) {
    let task = Task.create(name, uuidv4(), userId);
    await this.taskRepo.createTask(task);
    return task;
  }

  async updateTask({ id, completed }) {
    let {
      name,
      _id: taskId,
      userId,
      completed: taskStatus,
    } = await this.taskRepo.updateTask(id, completed);
    return Task.create(name, taskId, userId, taskStatus);
  }

  async deleteTask(id) {
    let task = await this.taskRepo.deleteTask(id);
    let { name, _id: taskId, userId, completed: taskStatus } = task;
    task = Task.create(name, taskId, userId, taskStatus);
    return task;
  }
}

module.exports = TaskService;
