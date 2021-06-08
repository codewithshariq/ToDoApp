class Task {
  constructor(name, completed, id, userId) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.description = description;
    this.userId = userId;
  }

  updateStatus(completed) {
    this.completed = completed;
  }

  changeDescription(description) {
    this.description = description;
  }

  static create(name, completed, id, userId) {
    return new Task(name, completed, id, userId);
  }
}

module.exports = Task;
