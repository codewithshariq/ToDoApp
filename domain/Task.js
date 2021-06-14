class Task {
  constructor(name, completed, _id, userId) {
    this._id = _id;
    this.name = name;
    this.completed = completed;
    this.userId = userId;
  }

  static create(name, _id, userId, completed = false) {
    return new Task(name, completed, _id, userId);
  }
}

module.exports = Task;
