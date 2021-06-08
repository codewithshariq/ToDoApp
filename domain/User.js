class User {
  constructor(name, id, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static create(name, completed, id, userId) {
    return new Task(name, completed, id, userId);
  }
}

module.exports = User;
