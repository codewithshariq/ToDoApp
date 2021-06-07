const taskModel = require("../models/task");

class TaskRepo {
  static async getTask({ id }) {
    return await taskModel.findById(id).exec();
  }
  static async createTask({ name }) {
    return await taskModel.create({ name });
  }
  static async updateTask({ id, name, completed }) {
    let task = await taskModel.findById(id).exec();
    if (task) {
      task.name = name;
      task.completed = completed;
      return await task.save();
    }
  }
  static async deleteTask({ id }) {
    let task = await taskModel.findByIdAndDelete(id).exec();
    if (task) {
      return task;
    } else {
      throw new Error("Task with the given ID does not exist");
    }
  }
}

module.exports = TaskRepo;
