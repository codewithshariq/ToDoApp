require("dotenv").config();
const config = require("./config");
const mongo = require("./infra/database/mongoose/createConnection");
const sql = require("./infra/database/sequelize/createConnection");
const app = require("./http/app");

//Initialize connection to mongoDB
mongo.connectToDb();

//Initialize connection to MYSQl database
sql.sequelize.sync();

app.listen(config.port);
