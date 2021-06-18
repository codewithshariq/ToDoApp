const bunyan = require("bunyan");
const log = bunyan.createLogger({
  name: "Backend",
  streams: [
    {
      level: "debug",
      stream: process.stdout,
    },
    {
      level: "error",
      stream: process.stdout,
    },
  ],
});

module.exports = log;
