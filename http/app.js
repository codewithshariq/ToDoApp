const express = require("express");
const app = express();
const { taskRouter } = require("./routes");

app.use(express.json());
app.use("/tasks", taskRouter);

module.exports = app;
