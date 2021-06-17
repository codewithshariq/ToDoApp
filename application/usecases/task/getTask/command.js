const { Command } = require("simple-command-bus");

class GetTaskCommand extends Command {
  constructor(id) {
    super();
    this.id = id;
  }
}

module.exports = GetTaskCommand;
