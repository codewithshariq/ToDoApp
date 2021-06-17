const { Command } = require("simple-command-bus");

class DeleteTaskCommand extends Command {
  constructor(id) {
    super();
    this.id = id;
  }
}

module.exports = DeleteTaskCommand;
