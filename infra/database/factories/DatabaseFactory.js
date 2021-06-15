const mongoConnection = require("../mongoose/createConnection");
const sqlConnection = require("../sequelize/createConnection");

class DatabaseFactory {
  static getDatabase(db) {
    switch (db) {
      case "MONGO": {
        return mongoConnection;
      }
      case "SQL": {
        return sqlConnection;
      }
    }
  }
}

module.exports = DatabaseFactory;
