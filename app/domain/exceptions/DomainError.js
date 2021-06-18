class DomainError extends Error {
  constructor(code, message, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.name = "domain";
    this.message = message;
  }
}

module.exports = DomainError;
