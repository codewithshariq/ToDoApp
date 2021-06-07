const express = require("express");
const app = express();
const { taskRouter, authRouter } = require("./routes");

app.use(express.json());
app.use("/tasks", taskRouter);
app.use("/auth", authRouter);

module.exports = app;
