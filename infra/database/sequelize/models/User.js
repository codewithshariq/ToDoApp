const { Model, DataTypes } = require("sequelize");
const sequelize = require("../createConnection");

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    _id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "User" }
);

User.sync();

module.exports = sequelize.models.User;
