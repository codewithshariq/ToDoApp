const {
  CommandBus,
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  HandleInflector,
  LoggerMiddleware,
  NamespaceHandlerLocator,
} = require("simple-command-bus");

const CreateTaskHandler = require("../../../application/usecases/task/createTask/CreateTaskHandler");
const GetTaskHandler = require("../../../application/usecases/task/getTask/GetTaskHandler");
const GetTasksHandler = require("../../../application/usecases/task/getTasks/GetTasksHandler");
const UpdateTaskHandler = require("../../../application/usecases/task/updateTask/UpdateTaskHandler");
const DeleteTaskHandler = require("../../../application/usecases/task/deleteTask/DeleteTaskHandler");

class CmdBus {
  static create(taskRepo) {
    const commandHandlerMiddleware = new CommandHandlerMiddleware(
      new ClassNameExtractor(),
      new InMemoryLocator({
        CreateTaskHandler: new CreateTaskHandler(taskRepo),
        GetTaskHandler: new GetTaskHandler(taskRepo),
        GetTasksHandler: new GetTasksHandler(taskRepo),
        UpdateTaskHandler: new UpdateTaskHandler(taskRepo),
        DeleteTaskHandler: new DeleteTaskHandler(taskRepo),
      }),
      // new NamespaceHandlerLocator("./application/usecases/task/getTasks"),
      new HandleInflector()
    );

    const commandBus = new CommandBus([
      new LoggerMiddleware(console),
      commandHandlerMiddleware,
    ]);

    return commandBus;
  }
}

module.exports = CmdBus;
