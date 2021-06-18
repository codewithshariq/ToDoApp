const { serverConfig } = require("../../config");
const DatabaseFactory = require("./factories/DatabaseFactory");

const initiateConnection = () => {
  const connectToDb = DatabaseFactory.getDatabase(serverConfig.db);
  return connectToDb;
};

module.exports = initiateConnection();
