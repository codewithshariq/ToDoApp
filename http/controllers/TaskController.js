const { serverConfig } = require("../../config");
const TaskFactory = require("../../infra/database/factories/TaskFactory");
const { TaskService } = require("../../application");
const handleError = require("../utils/exceptionHandler");

class TaskController {
  constructor() {
    this.taskRepo = TaskFactory.getRepo(serverConfig.db);
    this.taskService = new TaskService(this.taskRepo);
  }

  async getTask(req, res) {
    const { id } = req.body;

    try {
      const result = await this.taskService.getTask(id);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async getTasks(req, res) {
    const page = req.query.page;
    const limit = req.query.limit;
    const {
      user: { userId },
    } = req.body;

    try {
      const result = await this.taskService.getTasks(userId, page, limit);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async createTask(req, res) {
    const {
      name,
      user: { userId },
    } = req.body;

    try {
      const result = await this.taskService.createTask(name, userId);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async updateTask(req, res) {
    const { id, completed } = req.body;

    try {
      const result = await this.taskService.updateTask(id, completed);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  async deleteTask(req, res) {
    const { id } = req.body;

    try {
      const result = await this.taskService.deleteTask(id);
      res.status(200).send(result);
    } catch (err) {
      handleError(err, req, res);
    }
  }
}

module.exports = TaskController;
