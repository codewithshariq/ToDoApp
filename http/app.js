const express = require("express");
const app = express();
const { taskRouter, authRouter } = require("./routes");
const authenticate = require("./middlewares/authenticate");

app.use(express.json());
app.use("/auth", authRouter);
app.use("/tasks", authenticate, taskRouter);

module.exports = app;
