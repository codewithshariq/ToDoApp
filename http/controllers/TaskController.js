const { db } = require("../../config");
const TaskFactory = require("../../infra/database/factories/TaskFactory");
const { TaskService } = require("../../application");

class TaskController {
  constructor() {
    this.taskRepo = TaskFactory.getRepo(db);
    this.taskService = new TaskService(this.taskRepo);
  }

  async getTask(req, res) {
    const { id } = req.body;
    try {
      let result = await this.taskService.getTask(id);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async createTask(req, res) {
    const {
      name,
      userDetails: { userId },
    } = req.body;
    try {
      let result = await this.taskService.createTask(name, userId);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async updateTask(req, res) {
    const { task } = req.body;
    try {
      let result = await this.taskService.updateTask(task);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async deleteTask(req, res) {
    const { id } = req.body;
    try {
      let result = await this.taskService.deleteTask(id);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = TaskController;
