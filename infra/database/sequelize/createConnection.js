const { Sequelize } = require("sequelize");
const { dbConfig } = require("../../../config");
const log = require("../../services/BunyanLogger");

const sequelize = new Sequelize(
  dbConfig.sql.DB,
  dbConfig.sql.USER,
  dbConfig.sql.PASSWORD,
  {
    host: dbConfig.sql.HOST,
    dialect: dbConfig.sql.DIALECT,
    operatorsAliases: 0,
    logging: false,
  }
);

const connectToDb = () => {
  sequelize
    .sync()
    .then(() => {
      log.info("mysql database connection is successfully established.");
    })
    .catch((err) => {
      log.error(err);
      process.exit(1);
    });
};

module.exports = {
  sequelize,
  connectToDb,
};
