const express = require("express");
const app = express();
const { taskRouter, authRouter, userRouter } = require("./routes");
const authenticate = require("./middlewares/authenticate");

app.use(express.json());
app.use("/auth", authRouter);
app.use("/tasks", authenticate, taskRouter);
app.use("/user", userRouter);

module.exports = app;
