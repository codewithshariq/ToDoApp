require("dotenv").config();
const { serverConfig } = require("../app/config");
const db = require("../app/infra/database");
const app = require("../app/http/app");
const log = require("../app/infra/services/BunyanLogger");

const { program } = require("commander");
program.version("0.0.1");
program.command("start").action(() => {
  //initiating connection to database
  db.connectToDb();

  //Statring server on given port
  app.listen(serverConfig.port, () => {
    log.info(`Server is listening on port:${serverConfig.port}`);
  });
});
program.parse(process.argv);
