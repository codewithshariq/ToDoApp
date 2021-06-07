const { db } = require("../../config");
const TaskFactory = require("../../infra/database/factories/TaskFactory");
const { TaskService } = require("../../services");

class TaskController {
  static taskRepo = TaskFactory.getRepo(db);
  static taskService = new TaskService(this.taskRepo);

  static async getTask(req, res) {
    const data = req.body;
    try {
      let result = await this.taskService.getTask(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async createTask(req, res) {
    const data = req.body;
    try {
      let result = await this.taskService.createTask(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async updateTask(req, res) {
    const data = req.body;
    try {
      let result = await this.taskService.updateTask(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  static async deleteTask(req, res) {
    const data = req.body;
    try {
      let result = await this.taskService.deleteTask(data);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = TaskController;
