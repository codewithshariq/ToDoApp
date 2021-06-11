const Task = require("../domain/Task");
const { v4: uuidv4 } = require("uuid");

class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  async getTask(id) {
    let task = await this.taskRepo.getTask(id);
    let { name, _id: taskId, userId, completed: taskStatus } = task;
    task = Task.create(name, taskId, userId, taskStatus);
    return task;
  }

  async getTasks(userId, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let tasks = await this.taskRepo.getTasks(
      userId,
      page,
      limit,
      startIndex,
      endIndex
    );
    tasks = tasks.map((task) => {
      let { name, _id: taskId, userId, completed: taskStatus } = task;
      task = Task.create(name, taskId, userId, taskStatus);
      return task;
    });
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
