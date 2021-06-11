const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt");

class AuthService {
  createToken(userId, name, email) {
    let payload = { userId, name, email };
    let accessToken = jwt.sign(payload, jwtConfig.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: jwtConfig.ACCESS_TOKEN_LIFE,
    });
    return accessToken;
  }
  verifyToken(accessToken) {
    return jwt.verify(accessToken, jwtConfig.ACCESS_TOKEN_SECRET);
  }
}

module.exports = AuthService;
