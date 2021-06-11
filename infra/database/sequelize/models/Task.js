const { Model, DataTypes } = require("sequelize");
const sequelize = require("../createConnection");
const User = require("./User");

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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "_id",
      },
    },
  },
  { sequelize, modelName: "Task" }
);

Task.sync();

module.exports = sequelize.models.Task;
