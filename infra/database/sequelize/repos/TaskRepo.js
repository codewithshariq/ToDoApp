const taskModel = require("../models/Task");
const PaginationService = require("../../../../domain/utils/Pagination");

class TaskRepository {
  async getTask(id) {
    let task = await taskModel.findOne({
      where: {
        _id: id,
      },
    });
    if (task) {
      return task;
    } else {
      throw new Error("Task with the given ID does not exist");
    }
  }

  async getTasks(userId, page, limit) {
    let tasks = await taskModel.findAll({
      where: {
        userId: userId,
      },
      order: [["createdAt", "ASC"]],
    });
    const paginationService = new PaginationService(page, limit);
    return paginationService.paginate(tasks);
  }

  async createTask({ name, id, userId }) {
    let task = await taskModel.create({
      name,
      _id: id,
      userId: userId,
    });
  }

  async updateTask(id, completed) {
    await taskModel.update(
      { completed: completed },
      {
        where: {
          _id: id,
        },
      }
    );
    return await taskModel.findOne({
      where: {
        _id: id,
      },
    });
  }

  async deleteTask(id) {
    let task = await taskModel.findOne({
      where: {
        _id: id,
      },
    });
    if (task) {
      await taskModel.destroy({
        where: {
          _id: id,
        },
      });
      return task;
    } else {
      throw new Error("Task with the given ID does not exist");
    }
  }
}

module.exports = TaskRepository;
