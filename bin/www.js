require("dotenv").config();
const { serverConfig } = require("../config");
const mongo = require("../infra/database/mongoose/createConnection");
const sql = require("../infra/database/sequelize/createConnection");
const app = require("../http/app");

const { program } = require("commander");
program.version("0.0.1");
program.command("start").action(() => {
  //Initialize connection to mongoDB
  mongo.connectToDb();

  //Initialize connection to MYSQl database
  sql.connectToDb();

  app.listen(serverConfig.port);
});
program.parse(process.argv);
