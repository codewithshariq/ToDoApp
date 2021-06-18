const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize({
      colors: { info: "blue", error: "red" },
      message: true,
    }),
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Stream({ stream: process.stdout, level: "info" }),
  ],
});

module.exports = logger;
