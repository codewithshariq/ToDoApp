const jwt = require("json-web-token");
const jwtConfig = require("../../config/jwt");

class Token {
  createToken(name, email) {
    let payload = { name, email };
    let accessToken = jwt.sign(payload, jwtConfig.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: jwtConfig.ACCESS_TOKEN_LIFE,
    });
    return accessToken;
  }

  refreshToken(name, email) {
    let payload = { name, email };
    let refreshToken = jwt.sign(payload, jwtConfig.REFRESH_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: jwtConfig.REFRESH_TOKEN_LIFE,
    });
    return refreshToken;
  }
}

module.exports = Token;
