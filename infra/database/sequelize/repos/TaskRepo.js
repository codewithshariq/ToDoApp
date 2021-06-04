const taskModel = require("../models/task");

class TaskRepository {
  static async getTask({ id }) {
    return await taskModel.findAll({
      where: {
        taskId: id,
      },
    });
  }
  static async createTask({ name }) {
    await taskModel.sync();
    return await taskModel.create({
      name,
    });
  }
  static async updateTask({ id, name, completed }) {
    return await taskModel.update(
      { name, completed },
      {
        where: {
          taskId: id,
        },
      }
    );
  }
  static async deleteTask({ id }) {
    return await taskModel.destroy({
      where: {
        taskId: id,
      },
    });
  }
}

module.exports = TaskRepository;
