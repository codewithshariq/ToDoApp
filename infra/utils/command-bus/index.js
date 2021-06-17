const {
  CommandBus,
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  HandleInflector,
  LoggerMiddleware,
} = require("simple-command-bus");

const CreateTaskHandler = require("../../../application/usecases/task/createTask/handler");
const GetTaskHandler = require("../../../application/usecases/task/getTask/handler");
const GetTasksHandler = require("../../../application/usecases/task/getTasks/handler");
const UpdateTaskHandler = require("../../../application/usecases/task/updateTask/handler");
const DeleteTaskHandler = require("../../../application/usecases/task/deleteTask/handler");

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
