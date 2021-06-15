const taskModel = require("../models/Task");
const PaginationService = require("../../../../domain/utils/Pagination");
const Task = require("../../../../domain/Task");

class TaskRepository {
  async getTask(id) {
    const task = await taskModel.findOne({
      where: {
        _id: id,
      },
    });

    return task
      ? Task.create(task.name, task._id, task.userId, task.completed)
      : false;
  }

  async getTasks(userId, page, limit) {
    const tasks = await taskModel.findAll({
      where: {
        userId: userId,
      },
      order: [["createdAt", "ASC"]],
    });

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
    const updatedTask = await taskModel.update(task, {
      where: {
        _id: task._id,
      },
    });

    return updatedTask.length > 0 ? true : false;
  }

  async deleteTask(task) {
    const deletedTask = await taskModel.findOne({
      where: {
        _id: task._id,
      },
    });

    return deletedTask > 0 ? true : false;
  }
}

module.exports = TaskRepository;
