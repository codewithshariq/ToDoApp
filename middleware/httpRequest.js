module.exports = function (req, res, next) {
  req && req.secure && next();
  res.status(400).send("Bad Request");
};
