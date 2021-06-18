const mongoose = require("mongoose");
const { dbConfig } = require("../../../config");
const log = require("../../services/BunyanLogger");

const connectToDb = () => {
  mongoose
    .connect(dbConfig.mongo.URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("mongoDB database connection is successfully established.");
    })
    .catch((err) => {
      log.error(err.message);
      process.exit(1);
    });
};

module.exports = {
  connectToDb,
};
