const { Command } = require("simple-command-bus");

class CreateTaskCommand extends Command {
  constructor(name, userId) {
    super();
    this.name = name;
    this.userId = userId;
  }
}

module.exports = CreateTaskCommand;
