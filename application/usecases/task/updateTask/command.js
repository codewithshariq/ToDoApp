const { Command } = require("simple-command-bus");

class UpdateTaskCommand extends Command {
  constructor(id, completed) {
    super();
    this.id = id;
    this.completed = completed;
  }
}

module.exports = UpdateTaskCommand;
