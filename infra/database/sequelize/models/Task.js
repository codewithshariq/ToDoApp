const { Model, DataTypes } = require("sequelize");
const sequelize = require("../createConnection");

class Task extends Model {}

Task.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "Task" }
);

Task.sync();

module.exports = sequelize.models.Task;
