const { Command } = require("simple-command-bus");

class GetTasksCommand extends Command {
  constructor(userId, page, limit) {
    super();
    this.userId = userId;
    this.page = page;
    this.limit = limit;
  }
}

module.exports = GetTasksCommand;
