const { serverConfig } = require("../../config");
const TaskFactory = require("../../infra/database/factories/TaskFactory");
const handleError = require("../utils/exceptionHandler");

const CreateTaskCommand = require("../../application/usecases/task/createTask/command");
const GetTaskCommand = require("../../application/usecases/task/getTask/command");
const GetTasksCommand = require("../../application/usecases/task/getTasks/command");
const UpdateTaskCommand = require("../../application/usecases/task/updateTask/command");
const DeleteTaskCommand = require("../../application/usecases/task/deleteTask/command");

const TaskCommandBus = require("../../infra/utils/command-bus");

class TaskController {
  constructor() {
    this.taskRepo = TaskFactory.getRepo(serverConfig.db);
    this.commandBus = TaskCommandBus.create(this.taskRepo);
  }

  async getTask(req, res) {
    const { id } = req.body;

    try {
      const getTaskCommand = new GetTaskCommand(id);
      const result = await this.commandBus.handle(getTaskCommand);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async getTasks(req, res) {
    const page = req.query.page;
    const limit = req.query.limit;

    const { _id: userId } = req.user;

    try {
      const getTasksCommand = new GetTasksCommand(userId, page, limit);
      const result = await this.commandBus.handle(getTasksCommand);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async createTask(req, res) {
    const { name } = req.body;
    const { _id: userId } = req.user;

    try {
      const creatTaskCommand = new CreateTaskCommand(name, userId);
      const result = await this.commandBus.handle(creatTaskCommand);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async updateTask(req, res) {
    const { id, completed } = req.body;

    try {
      const updateTaskCommand = new UpdateTaskCommand(id, completed);
      const result = await this.commandBus.handle(updateTaskCommand);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async deleteTask(req, res) {
    const { id } = req.body;

    try {
      const deleteTaskCommand = new DeleteTaskCommand(id);
      const result = await this.commandBus.handle(deleteTaskCommand);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }
}

module.exports = TaskController;
