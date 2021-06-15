const jwt = require("jsonwebtoken");
const AuthService = require("../../infra/services/JwtAuthService");
const authService = new AuthService();

verify = function (req, res, next) {
  const accessToken = req.headers["x-access-token"];
  if (!accessToken) {
    return res.status(403).send();
  }
  try {
    const { userId, name, email } = authService.verifyToken(accessToken);
    req.body["user"] = { userId, name, email };
    next();
  } catch (e) {
    return res.status(401).send(e);
  }
};

module.exports = verify;
