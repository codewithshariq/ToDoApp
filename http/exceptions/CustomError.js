class httpError extends Error {
  constructor(code, message, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.name = "http";
    this.code = code;
    this.message = message;
  }
}

module.exports = CustomError;
