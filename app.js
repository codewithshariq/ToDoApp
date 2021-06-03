const PORT = 8000;
const uri = "mongodb://localhost:27017/ToDoApp";
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { httpRequest } = require("./middleware");
const { taskRouter } = require("./routes");

app.use(express.json());
// app.use(httpRequest());
app.use("/tasks", taskRouter);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => {
    console.log("Could not connect to the databse:", err);
    process.exit(1);
  });

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
