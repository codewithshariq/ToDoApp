const HttpError = require("../exceptions/HttpError");

const handleError = (err, req, res) => {
  if (err instanceof HttpError) {
    res.status(err.code).send(err.message);
  } else {
    res.status(500).send(err.message);
  }
};

module.exports = handleError;
