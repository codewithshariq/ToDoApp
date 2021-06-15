const taskModel = require("../models/task");
const PaginationService = require("../../../../domain/utils/Pagination");
const Task = require("../../../../domain/Task");

class TaskRepo {
  async getTask(id) {
    const task = await taskModel.findById(id).exec();

    return task
      ? Task.create(task.name, task._id, task.userId, task.completed)
      : false;
  }

  async getTasks(userId, page, limit) {
    const tasks = await taskModel.find({ userId: userId });

    if (tasks.length == 0) {
      return false;
    }

    const paginationService = new PaginationService(page, limit);
    return paginationService.paginate(tasks);
  }

  async createTask(task) {
    const createdTask = await taskModel.create(task);
    return createdTask ? true : false;
  }

  async updateTask(task) {
    const updatedTask = await taskModel
      .findByIdAndUpdate(task._id, task)
      .exec();
    return updatedTask ? true : false;
  }

  async deleteTask(task) {
    const deletedTask = await taskModel.findByIdAndDelete(task._id).exec();
    return deletedTask ? true : false;
  }
}

module.exports = TaskRepo;
