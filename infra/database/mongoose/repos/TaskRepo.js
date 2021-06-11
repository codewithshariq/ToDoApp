const taskModel = require("../models/task");

class TaskRepo {
  async getTask(id) {
    let task = await taskModel.findById(id).exec();
    if (task) {
      return task;
    } else {
      throw new Error("Task with the given ID does not exist");
    }
  }

  async getTasks(userId, page, limit, startIndex, endIndex) {
    const result = {};
    if (
      endIndex < (await taskModel.countDocuments({ userId: userId }).exec())
    ) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    return (result.results = await taskModel
      .find({ userId: userId })
      .limit(limit)
      .skip(startIndex));
  }

  async createTask({ name, id, userId }) {
    return await taskModel.create({ name, _id: id, userId });
  }

  async updateTask(id, completed) {
    let task = await taskModel.findById(id).exec();
    if (task) {
      task.completed = completed;
      return task.save();
    } else {
      throw new Error("Task with the given ID does not exist");
    }
  }

  async deleteTask(id) {
    let task = await taskModel.findByIdAndDelete(id).exec();
    if (task) {
      return task;
    } else {
      throw new Error("Task with the given ID does not exist");
    }
  }
}

module.exports = TaskRepo;
