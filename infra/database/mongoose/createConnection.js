const mongoose = require("mongoose");
const dbConfig = require("../../../config/mongo");

const connectToDb = () => {
  mongoose
    .connect(dbConfig.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((err) => {
      process.exit(1);
    });
};

module.exports = {
  connectToDb,
};
