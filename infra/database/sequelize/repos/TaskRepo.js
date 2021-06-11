const taskModel = require("../models/Task");

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

  async getTasks(userId, page, limit, startIndex, endIndex) {
    const result = {};
    if (
      endIndex <
      (await taskModel.count({
        where: {
          userId: userId,
        },
      }))
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
    return (result.results = await taskModel.findAll({
      where: {
        userId: userId,
      },
      order: [["createdAt", "ASC"]],
      offset: startIndex,
      limit: limit,
    }));
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
