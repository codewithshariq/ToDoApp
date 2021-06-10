class User {
  constructor(name, id, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static create(id, name, email) {
    return new Task(id, name, email);
  }
}

module.exports = User;
