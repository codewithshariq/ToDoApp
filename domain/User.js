class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static create(id, name, email) {
    return new User(id, name, email);
  }
}

module.exports = User;
