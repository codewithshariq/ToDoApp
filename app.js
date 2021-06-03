const PORT = 8000;
const uri = "mongodb://localhost:27017/ToDoApp";
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { taskRouter } = require("./http/routes");

app.use(express.json());
// app.use(httpRequest());
app.use("/tasks", taskRouter);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((err) => {
    process.exit(1);
  });

app.listen(PORT);
