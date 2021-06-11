const jwt = require("jsonwebtoken");
const AuthService = require("../../infra/services/AuthService");
const authService = new AuthService();

verify = function (req, res, next) {
  let accessToken = req.headers["x-access-token"];
  if (!accessToken) {
    return res.status(403).send();
  }
  try {
    let { userId, name, email } = authService.verifyToken(accessToken);
    req.body["userDetails"] = { userId, name, email };
    next();
  } catch (e) {
    return res.status(401).send(e);
  }
};

module.exports = verify;
