const { Model, DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

class Task extends Model {}

Task.init(
  {
    name: DataTypes.STRING,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    taskId: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
    },
  },
  { sequelize, modelName: "Task" }
);

module.exports = Task;
