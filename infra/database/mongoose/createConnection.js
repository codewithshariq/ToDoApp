const mongoose = require("mongoose");
const { dbConfig } = require("../../../config");
const log = require("../../services/Logger");

const connectToDb = () => {
  mongoose
    .connect(dbConfig.mongo.URI, {
      useNewUrlParser: true,
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
