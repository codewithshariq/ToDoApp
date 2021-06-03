const { mongoTaskModel, sqlTaskModel } = require("../models");

const TaskService = function () {
  const getTask = async ({ id }) => {
    return await mongoTaskModel.findById(id).exec();
  };

  const createTask = async ({ name, database }) => {
    if (database == "mongo") {
      return await mongoTaskModel.create({ name });
    } else {
      await sqlTaskModel.sync();
      return await sqlTaskModel.create({
        name,
      });
    }
  };

  const updateTask = async ({ id, name, completed }) => {
    let task = await mongoTaskModel.findById(id).exec();
    if (task) {
      task.name = name;
      task.completed = completed;
      return await task.save();
    } else {
      throw new Error("Task with the given ID does not exist");
    }
  };

  const deleteTask = async ({ id, database }) => {
    if (database == "mongo") {
      let task = await mongoTaskModel.findByIdAndDelete(id).exec();
      if (task) {
        return "Task succesfully deleted", task;
      } else {
        throw new Error("Task with the given ID does not exist");
      }
    } else {
      await sqlTaskModel.destroy({
        where: {
          taskId: id,
        },
      });
    }
  };

  return {
    getTask,
    createTask,
    updateTask,
    deleteTask,
  };
};

module.exports = TaskService();
