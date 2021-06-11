const Task = require("../domain/Task");
const { v4: uuidv4 } = require("uuid");
const PaginationService = require("./Pagination");

class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
    this.paginationService = new PaginationService();
  }

  async getTask(id) {
    let task = await this.taskRepo.getTask(id);
    let { name, _id: taskId, userId, completed: taskStatus } = task;
    task = Task.create(name, taskId, userId, taskStatus);
    return task;
  }

  async getTasks(userId, page, limit) {
    let tasks = await this.taskRepo.getTasks(userId);
    tasks = this.paginationService.paginate(tasks, page, limit);
    return tasks;
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
