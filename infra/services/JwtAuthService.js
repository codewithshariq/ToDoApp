const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../config");

class JwtAuthService {
  createToken(userId, name, email) {
    const payload = { userId, name, email };

    const accessToken = jwt.sign(payload, jwtConfig.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: parseInt(jwtConfig.ACCESS_TOKEN_LIFE),
    });

    return accessToken;
  }

  verifyToken(accessToken) {
    return jwt.verify(accessToken, jwtConfig.ACCESS_TOKEN_SECRET);
  }
}

module.exports = JwtAuthService;
