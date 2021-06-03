const mongoTaskModel = require("./mongoose/task");
const sqlTaskModel = require("./sequelize/task");

module.exports = {
  mongoTaskModel,
  sqlTaskModel,
};
