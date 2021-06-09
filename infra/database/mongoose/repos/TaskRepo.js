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
