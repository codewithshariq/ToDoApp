const { Task } = require("../model");

const taskController = function () {
  const getTask = async ({ id }) => {
    try {
      return await Task.findById(id).exec();
    } catch (err) {
      console.log("Could not find task:", err);
    }
  };

  const createTask = async ({ name }) => {
    try {
      let task = await Task.create({ name });
      console.log("Task successfully created\n", task);
      return task;
    } catch (err) {
      return err;
    }
  };

  const updateTask = async ({ id, name, completed }) => {
    try {
      let task = await Task.findById(id);
      task.name = name;
      task.completed = completed;
      await task.save();
      console.log("Task successfully updated\n", task);
    } catch (error) {
      console.log("Could not update task:", error);
    }
  };

  const deleteTask = async ({ id }) => {
    try {
      let task = await Task.findByIdAndDelete(id);
      console.log("Task successfully deleted\n", task);
    } catch (error) {
      console.log("Could not update task:", error);
    }
  };

  return {
    getTask,
    createTask,
    updateTask,
    deleteTask,
  };
};

module.exports = taskController();
