const { mongoTaskModel, sqlTaskModel } = require("../infrastructure/database");

const TaskService = function () {
  const getTask = async ({ id, database }) => {
    if (database == "mongo") {
      return await mongoTaskModel.findById(id).exec();
    } else {
      return await sqlTaskModel.findAll({
        where: {
          taskId: id,
        },
      });
    }
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

  const updateTask = async ({ id, name, completed, database }) => {
    if (database == "mongo") {
      let task = await mongoTaskModel.findById(id).exec();
      if (task) {
        task.name = name;
        task.completed = completed;
        return await task.save();
      } else {
        throw new Error("Task with the given ID does not exist");
      }
    } else {
      return await sqlTaskModel.update(
        { name, completed },
        {
          where: {
            taskId: id,
          },
        }
      );
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
