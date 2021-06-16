const express = require("express");
const passport = require("passport");
const app = express();
const { taskRouter, authRouter, userRouter } = require("./routes");

// const authenticate = require("./middlewares/authenticate");

const initializePassport = require("../infra/services/PasportAuthService");
initializePassport(passport);

app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRouter);

// app.use("/tasks", authenticate, taskRouter);

app.use("/tasks", passport.authenticate("jwt", { session: false }), taskRouter);
app.use("/user", userRouter);

module.exports = app;
