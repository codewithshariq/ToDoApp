class Task {
  constructor(name, completed, id, userId) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.userId = userId;
  }

  static create(name, id, userId, completed = false) {
    return new Task(name, completed, id, userId);
  }
}

module.exports = Task;
