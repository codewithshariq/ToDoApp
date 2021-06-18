class User {
  constructor(_id, name, email) {
    this._id = _id;
    this.name = name;
    this.email = email;
  }

  updateName(name) {
    this.name = name;
  }

  static create(_id, name, email) {
    return new User(_id, name, email);
  }
}

module.exports = User;
