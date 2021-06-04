class TaskService {
  constructor(taskRepo) {
    this.taskRepo = taskRepo;
  }

  getTask(data) {
    return this.taskRepo.getTask(data);
  }
  createTask(data) {
    return this.taskRepo.createTask(data);
  }
  updateTask(data) {
    return await this.taskRepo.updateTask(data);
  }
  deleteTask(data) {
    return this.taskRepo.deleteTask(data);
  }
}

module.exports = TaskService;
