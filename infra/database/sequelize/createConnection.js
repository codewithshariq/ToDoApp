const { Sequelize } = require("sequelize");
const dbConfig = require("../../../config/sql");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
});

module.exports = {
  sequelize,
};
